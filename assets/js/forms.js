import { loadProgrammes } from "./data.js";

const AX = window.AX = window.AX || {};
const FORM_ENDPOINT = "{{PLACEHOLDER: enquiry form endpoint}}";

const setFieldState = (field, message = "") => {
  const wrapper = field.closest(".ax-form-field");
  if (!wrapper) return false;
  const messageElement = wrapper.querySelector(".ax-form-field__message");
  wrapper.classList.toggle("ax-form-field--error", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (messageElement) messageElement.textContent = message;
  return !message;
};

const validateField = (field) => {
  if (field.required && !field.value.trim()) return setFieldState(field, "This field is required.");
  if (field.type === "email" && field.value && !field.validity.valid) return setFieldState(field, "Enter a valid email address.");
  if (field.type === "tel" && field.value && !/^[+()\d\s-]{7,}$/.test(field.value)) return setFieldState(field, "Enter a valid phone number.");
  return setFieldState(field);
};

const init = () => {
  document.querySelectorAll("[data-programme-select]").forEach(async (select) => {
    const programmes = await loadProgrammes();
    programmes.forEach((programme) => {
      const option = document.createElement("option");
      option.value = programme.code;
      option.textContent = `${programme.code} · ${programme.programme}`;
      select.append(option);
    });
    const requested = new URLSearchParams(window.location.search).get("programme");
    if (requested) select.value = requested;
  });
  document.querySelectorAll("[data-enquiry-form]").forEach((form) => {
    form.querySelectorAll("input, select, textarea").forEach((field) => field.addEventListener("blur", () => validateField(field)));
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const fields = [...form.querySelectorAll("input, select, textarea")];
      const valid = fields.map(validateField).every(Boolean);
      const status = form.querySelector("[data-form-status]");
      if (!valid) {
        status.textContent = "Review the highlighted fields before sending your enquiry.";
        status.className = "ax-form-status ax-form-status--error";
        return;
      }
      const submit = form.querySelector("[type=submit]");
      submit.disabled = true;
      status.textContent = FORM_ENDPOINT.startsWith("{{PLACEHOLDER") ? "Your enquiry is ready. The enquiry endpoint will be connected by the institute." : "Sending your enquiry...";
      status.className = "ax-form-status";
      if (!FORM_ENDPOINT.startsWith("{{PLACEHOLDER")) {
        try {
          await fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form) });
        } catch {
          status.textContent = "The enquiry could not be sent. Please try again.";
          status.className = "ax-form-status ax-form-status--error";
          submit.disabled = false;
          return;
        }
      }
      form.reset();
      status.textContent = "Your enquiry details are ready for the admissions team.";
      status.className = "ax-form-status ax-form-status--success";
      submit.disabled = false;
    });
  });
};

AX.forms = { init, FORM_ENDPOINT };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

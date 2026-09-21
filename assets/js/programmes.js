import { groupNames, loadProgrammes, normalise, programmeSearchText } from "./data.js";

const AX = window.AX = window.AX || {};
const viewStorageKey = "ax-programmes-view";

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

const queryState = () => {
  const params = new URLSearchParams(window.location.search);
  return { search: params.get("search") || "", group: params.get("group") || "", division: params.get("division") || "" };
};

const updateUrl = (state) => {
  const params = new URLSearchParams();
  if (state.search) params.set("search", state.search);
  if (state.group) params.set("group", state.group);
  if (state.division) params.set("division", state.division);
  const query = params.toString();
  window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
};

const cardMarkup = (programme) => `
  <article class="ax-card ax-programme-card">
    <div class="ax-programme-card__body">
      <span class="ax-code-badge">${escapeHtml(programme.code)}</span>
      <h2>${escapeHtml(programme.division)}</h2>
      <p class="ax-programme-card__certificate">${escapeHtml(programme.programme)}</p>
      <p class="ax-styleguide__label">Career-oriented roles this programme trains for</p>
      <ul class="ax-programme-card__roles">${programme.careerRoles.slice(0, 3).map((role) => `<li>${escapeHtml(role)}</li>`).join("")}</ul>
      <div class="ax-programme-card__footer"><a class="ax-button ax-button--outline ax-button--sm" href="programme.html?code=${encodeURIComponent(programme.code)}">View programme</a></div>
    </div>
  </article>
`;

const registerMarkup = (programme) => `
  <div class="ax-register-row" role="row">
    <strong class="ax-register-row__code" role="cell">${escapeHtml(programme.code)}</strong>
    <span role="cell">${escapeHtml(programme.division)}</span>
    <span role="cell">${escapeHtml(programme.programme)}</span>
    <span class="ax-register-row__meta" role="cell">${programme.careerRoles.slice(0, 3).map(escapeHtml).join(" · ")}</span>
  </div>
`;

const init = async () => {
  const root = document.querySelector("[data-programmes-page]");
  if (!root) return;
  const searchInput = root.querySelector("[data-programmes-search]");
  const filterList = root.querySelector("[data-programmes-filters]");
  const results = root.querySelector("[data-programmes-results]");
  const count = root.querySelector("[data-programmes-count]");
  const empty = root.querySelector("[data-programmes-empty]");
  const cardView = root.querySelector("[data-view=cards]");
  const registerView = root.querySelector("[data-view=register]");
  const viewButtons = root.querySelectorAll("[data-view-toggle]");
  let programmes;
  let state = queryState();

  try {
    programmes = await loadProgrammes();
  } catch (error) {
    results.innerHTML = `<p class="ax-load-error">${escapeHtml(error.message)}</p>`;
    return;
  }

  const setView = (view) => {
    const isRegister = view === "register";
    cardView.hidden = isRegister;
    registerView.hidden = !isRegister;
    viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.viewToggle === view)));
    localStorage.setItem(viewStorageKey, view);
  };

  const filtered = () => {
    const search = normalise(state.search);
    return programmes.filter((programme) => {
      const matchesSearch = !search || normalise(programmeSearchText(programme)).includes(search);
      const matchesGroup = !state.group || programme.group === state.group;
      const matchesDivision = !state.division || normalise(programme.division).includes(normalise(state.division));
      return matchesSearch && matchesGroup && matchesDivision;
    });
  };

  const render = () => {
    const visible = filtered();
    results.classList.toggle("ax-results--empty", visible.length === 0);
    count.textContent = `${visible.length} programme${visible.length === 1 ? "" : "s"}`;
    cardView.innerHTML = visible.map(cardMarkup).join("");
    registerView.innerHTML = `<div class="ax-register-row ax-register-row--heading" role="row"><strong role="columnheader">Code</strong><strong role="columnheader">Division</strong><strong role="columnheader">Programme</strong><strong role="columnheader">Career-oriented roles</strong></div>${visible.map(registerMarkup).join("")}`;
    empty.hidden = visible.length > 0;
    updateUrl(state);
  };

  searchInput.value = state.search;
  filterList.innerHTML = `<button class="ax-filter-pill" type="button" data-group="">All groups</button>${groupNames(programmes).map((group) => `<button class="ax-filter-pill" type="button" data-group="${escapeHtml(group)}">${escapeHtml(group)}</button>`).join("")}`;
  filterList.querySelectorAll("[data-group]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.group === state.group));
    button.addEventListener("click", () => {
      state.group = button.dataset.group;
      filterList.querySelectorAll("[data-group]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      render();
    });
  });
  searchInput.addEventListener("input", () => { state.search = searchInput.value; render(); });
  viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.viewToggle)));
  setView(localStorage.getItem(viewStorageKey) || "cards");
  render();
};

AX.programmes = { init };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

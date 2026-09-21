import { loadProgrammes, normalise } from "./data.js";

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
const nonGuarantee = "Completion of a training programme does not automatically guarantee employment, appointment, government recruitment, professional registration or a particular salary.";

const init = async () => {
  const root = document.querySelector("[data-careers-page]");
  if (!root) return;
  const roleSearch = root.querySelector("[data-role-search]");
  const roleList = root.querySelector("[data-role-list]");
  const rolePanel = root.querySelector("[data-role-panel]");
  const count = root.querySelector("[data-role-count]");
  const programmes = await loadProgrammes();
  const roleIndex = new Map();
  programmes.forEach((programme) => programme.careerRoles.forEach((role) => {
    if (!roleIndex.has(role)) roleIndex.set(role, []);
    roleIndex.get(role).push(programme);
  }));
  const roles = [...roleIndex.keys()].sort((first, second) => first.localeCompare(second));
  let activeRole = new URLSearchParams(window.location.search).get("role") || roles[0];

  const renderPanel = (role) => {
    const matches = roleIndex.get(role) || [];
    activeRole = role;
    rolePanel.innerHTML = `<div class="ax-role-panel__header"><p class="ax-styleguide__label">Selected role</p><h2>${escapeHtml(role)}</h2><p>${matches.length} programme${matches.length === 1 ? "" : "s"} in the current register train for this career-oriented role.</p></div><div class="ax-role-panel__programmes">${matches.map((programme) => `<article class="ax-card ax-programme-card"><div class="ax-programme-card__body"><span class="ax-code-badge">${escapeHtml(programme.code)}</span><h3>${escapeHtml(programme.division)}</h3><p class="ax-programme-card__certificate">${escapeHtml(programme.programme)}</p><div class="ax-programme-card__footer"><a class="ax-button ax-button--outline ax-button--sm" href="programme.html?code=${encodeURIComponent(programme.code)}">View programme</a></div></div></article>`).join("")}</div>`;
    roleList.querySelectorAll("[data-role]").forEach((button) => button.setAttribute("aria-current", String(button.dataset.role === role)));
    const params = new URLSearchParams(window.location.search);
    params.set("role", role);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  const renderRoles = () => {
    const search = normalise(roleSearch.value);
    const visible = roles.filter((role) => normalise(role).includes(search));
    count.textContent = `${visible.length} role${visible.length === 1 ? "" : "s"}`;
    roleList.innerHTML = visible.map((role) => `<button class="ax-role-index__item" type="button" data-role="${escapeHtml(role)}" aria-current="${role === activeRole}"><span>${escapeHtml(role)}</span><strong>${roleIndex.get(role).length}</strong></button>`).join("");
    roleList.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => renderPanel(button.dataset.role)));
    if (visible.length && !visible.includes(activeRole)) renderPanel(visible[0]);
    if (!visible.length) rolePanel.innerHTML = `<div class="ax-empty-state"><h2>No roles match that search.</h2><p>Try another role title.</p></div>`;
  };

  root.querySelector("[data-non-guarantee]").textContent = nonGuarantee;
  roleSearch.addEventListener("input", renderRoles);
  renderRoles();
  if (roles.includes(activeRole)) renderPanel(activeRole);
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

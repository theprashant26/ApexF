import { loadProgrammes } from "./data.js";

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
const nonGuarantee = "Completion of a training programme does not automatically guarantee employment, appointment, government recruitment, professional registration or a particular salary.";
const features = ["Classroom or online learning", "Industry-oriented curriculum", "Practical-oriented training", "Assignments and assessments", "Professional communication training", "Interview preparation", "Career guidance", "Resume/CV assistance", "Course completion certificate, subject to institute requirements"];

const programmeIntro = (programme) => `This programme covers ${programme.trainingAreas.slice(0, 3).join(", ")}, with additional training in ${programme.trainingAreas.slice(3, 5).join(" and ")}. It is designed to build sector-focused knowledge, workplace skills, and professional readiness in the ${programme.division.toLocaleLowerCase().replace(" division", "")} context.`;

const init = async () => {
  const root = document.querySelector("[data-programme-detail]");
  if (!root) return;
  const code = new URLSearchParams(window.location.search).get("code");
  const programmes = await loadProgrammes();
  const programme = programmes.find((item) => item.code.toLocaleLowerCase() === (code || "").toLocaleLowerCase());
  if (!programme) {
    root.innerHTML = `<section class="ax-section ax-surface-light"><div class="ax-container ax-empty-state"><p class="ax-styleguide__label">Programme not found</p><h1>That programme code is not in the current register.</h1><p>Return to the catalogue to browse all available programmes.</p><a class="ax-button ax-button--navy" href="programmes.html">Browse programmes</a></div></section>`;
    document.title = "Programme not found | Apex Professional Academy";
    return;
  }

  document.title = `${programme.programme} | Apex Professional Academy`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${programme.programme} in the ${programme.division}. Explore training areas and career-oriented roles at Apex Professional Academy.`);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `${window.location.pathname}?code=${encodeURIComponent(programme.code)}`;
  const courseSchema = document.createElement("script");
  courseSchema.type = "application/ld+json";
  courseSchema.dataset.axSchema = "course";
  courseSchema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: programme.programme, description: programmeIntro(programme), provider: { "@type": "EducationalOrganization", name: "Apex Professional Academy" }, occupationalCategory: programme.careerRoles });
  document.head.append(courseSchema);
  const related = programmes.filter((item) => item.group === programme.group && item.code !== programme.code).slice(0, 3);
  root.innerHTML = `
    <section class="ax-programme-banner ax-surface-dark">
      <div class="ax-container ax-programme-banner__inner"><span class="ax-code-badge">${escapeHtml(programme.code)}</span><p class="ax-styleguide__label ax-styleguide__label--dark">${escapeHtml(programme.division)}</p><h1>${escapeHtml(programme.programme)}</h1><p>${escapeHtml(programme.certificate)}</p></div>
    </section>
    <section class="ax-section ax-surface-light">
      <div class="ax-container ax-programme-detail-grid">
        <div>
          <div class="ax-section__header"><p class="ax-styleguide__label">Programme overview</p><h2>Practical preparation for a focused sector.</h2><p>${escapeHtml(programmeIntro(programme))}</p><div class="ax-section__rule" aria-hidden="true"></div></div>
          <section class="ax-detail-block" aria-labelledby="areas-heading"><h2 id="areas-heading">Training areas</h2><div class="ax-training-grid">${programme.trainingAreas.map((area) => `<span>${escapeHtml(area)}</span>`).join("")}</div></section>
          <section class="ax-detail-block" aria-labelledby="roles-heading"><h2 id="roles-heading">Career-oriented roles this programme trains for</h2><div class="ax-role-chips">${programme.careerRoles.map((role) => `<a class="ax-role-chip" href="careers.html?role=${encodeURIComponent(role)}">${escapeHtml(role)}</a>`).join("")}</div><p class="ax-compliance-note">${nonGuarantee}</p></section>
          <section class="ax-detail-block" aria-labelledby="features-heading"><h2 id="features-heading">Common programme features</h2><ul class="ax-checklist ax-checklist--light">${features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul></section>
        </div>
        <aside class="ax-enquiry-card"><p class="ax-styleguide__label">Start a conversation</p><h2>Ask about this programme.</h2><p>Share your details and a preferred contact route. The admissions team can provide programme information and next steps.</p><a class="ax-button ax-button--gold ax-button--lg" href="admissions.html?programme=${encodeURIComponent(programme.code)}#enquiry">Make an enquiry</a></aside>
      </div>
    </section>
    <section class="ax-section ax-surface-light ax-related-section" aria-labelledby="related-heading"><div class="ax-container"><div class="ax-section__header"><p class="ax-styleguide__label">Same programme group</p><h2 id="related-heading">You may also explore</h2><div class="ax-section__rule" aria-hidden="true"></div></div><div class="ax-grid ax-grid--3">${related.map((item) => `<article class="ax-card ax-programme-card"><div class="ax-programme-card__body"><span class="ax-code-badge">${escapeHtml(item.code)}</span><h3>${escapeHtml(item.division)}</h3><p class="ax-programme-card__certificate">${escapeHtml(item.programme)}</p><div class="ax-programme-card__footer"><a class="ax-button ax-button--outline ax-button--sm" href="programme.html?code=${encodeURIComponent(item.code)}">View programme</a></div></div></article>`).join("")}</div></div></section>
  `;
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

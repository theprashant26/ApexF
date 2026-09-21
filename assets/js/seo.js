(() => {
  const descriptions = {
    "index.html": "Explore Apex Professional Academy's sector-focused professional training programmes and the career-oriented roles they train for.",
    "about.html": "Learn about Apex Professional Academy's sector-focused professional training approach.",
    "programmes.html": "Browse Apex Professional Academy's 21 sector-focused professional training programmes.",
    "careers.html": "Browse career-oriented roles and the Apex programmes that train for them.",
    "admissions.html": "Learn about the Apex Professional Academy enquiry and enrolment process.",
    "gallery.html": "Explore Apex Professional Academy campus, training, and learner image slots.",
    "contact.html": "Contact Apex Professional Academy with a programme or admissions enquiry.",
    "disclaimer.html": "Read Apex Professional Academy's institute policy and programme disclaimer."
  };
  const page = window.location.pathname.split("/").pop() || "index.html";
  const description = document.querySelector('meta[name="description"]')?.content || descriptions[page] || document.title;
  const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
  const addMeta = (attribute, key, content) => {
    if (document.querySelector(`meta[${attribute}="${key}"]`)) return;
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    meta.content = content;
    document.head.append(meta);
  };
  addMeta("property", "og:type", "website");
  addMeta("property", "og:title", document.title);
  addMeta("property", "og:description", description);
  addMeta("property", "og:url", canonical);
  addMeta("property", "og:site_name", "Apex Professional Academy");
  addMeta("name", "twitter:card", "summary");
  addMeta("name", "twitter:title", document.title);
  addMeta("name", "twitter:description", description);
  if (page === "index.html" && !document.querySelector('script[data-ax-schema="organization"]')) {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.axSchema = "organization";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Apex Professional Academy",
      alternateName: "Apex Institute of Multidisciplinary Professional Studies",
      description,
      url: canonical
    });
    document.head.append(schema);
  }
})();

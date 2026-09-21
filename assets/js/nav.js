(() => {
  const AX = window.AX = window.AX || {};
  const institutePolicy = "Apex Professional Academy clearly distinguishes its own training certificates from government, university, statutory-board or professional-licensing qualifications. Any claim of affiliation, approval, accreditation or recognition is published only when supported by the applicable official authorisation or agreement.";
  const programmeGroups = [
    {
      title: "Transport, Aviation & Logistics",
      items: ["Metro & Rail", "Railway", "Aviation", "Logistics", "Driver Services"]
    },
    {
      title: "Hospitality, Travel & Retail",
      items: ["Hospitality", "Travel & Tourism", "Retail", "Security"]
    },
    {
      title: "Health & Pharma",
      items: ["Medical", "Pharmaceutical", "Healthcare"]
    },
    {
      title: "Business, Technical & Engineering",
      items: ["Banking", "Finance & Accounting", "IT & Technology", "Education", "Electrical", "Electrical Engineering", "Civil Engineering", "Manufacturing", "Professional Skill Development"]
    }
  ];

  const primaryLinks = [
    ["About", "about.html"],
    ["Careers", "careers.html"],
    ["Admissions", "admissions.html"],
    ["Gallery", "gallery.html"],
    ["Contact", "contact.html"]
  ];

  const currentPage = () => {
    const page = window.location.pathname.split("/").pop();
    return page || "index.html";
  };

  const linkClass = (href) => currentPage() === href ? "ax-nav__link ax-nav__link--active" : "ax-nav__link";

  const programmeMenu = programmeGroups.map((group) => `
    <section class="ax-mega-menu__group">
      <h3>${group.title}</h3>
      <ul>${group.items.map((item) => `<li><a href="programmes.html?group=${encodeURIComponent(group.title)}&division=${encodeURIComponent(item)}">${item}</a></li>`).join("")}</ul>
    </section>
  `).join("");

  const headerMarkup = () => `
    <a class="ax-skip-link" href="#main-content">Skip to content</a>
    <header class="ax-site-header" data-ax-header>
      <div class="ax-container ax-site-header__inner">
        <a class="ax-brand" href="index.html" aria-label="Apex Professional Academy home">
          <img src="assets/brand/apexlogo.jpeg" width="72" height="72" alt="Apex Professional Academy logo">
          <span class="ax-brand__text"><strong>APEX</strong><small>Professional Academy</small></span>
        </a>
        <nav class="ax-site-nav" aria-label="Primary navigation">
          <a class="${linkClass("index.html")}" href="index.html">Home</a>
          <a class="${linkClass("about.html")}" href="about.html">About</a>
          <div class="ax-nav__menu-wrap">
            <button class="ax-nav__link ax-nav__trigger" type="button" aria-expanded="false" aria-controls="ax-mega-menu">Programmes <span aria-hidden="true">+</span></button>
            <div class="ax-mega-menu" id="ax-mega-menu" hidden>
              <div class="ax-mega-menu__inner">
                <div class="ax-mega-menu__intro"><p class="ax-nav__eyebrow">21 programmes</p><h2>Choose a direction.</h2><p>Browse Apex programmes by the industries they serve.</p><a class="ax-button ax-button--outline ax-button--sm" href="programmes.html">View all programmes</a></div>
                <div class="ax-mega-menu__groups">${programmeMenu}</div>
              </div>
            </div>
          </div>
          ${primaryLinks.slice(1).map(([label, href]) => `<a class="${linkClass(href)}" href="${href}">${label}</a>`).join("")}
          <a class="ax-button ax-button--gold ax-button--sm ax-site-nav__cta" href="admissions.html#enquiry">Apply now</a>
        </nav>
        <button class="ax-menu-toggle" type="button" aria-expanded="false" aria-controls="ax-mobile-drawer"><span class="ax-visually-hidden">Open navigation</span><span aria-hidden="true">☰</span></button>
      </div>
    </header>
    <aside class="ax-mobile-drawer" id="ax-mobile-drawer" hidden aria-label="Mobile navigation">
      <div class="ax-mobile-drawer__header"><strong>APEX</strong><button class="ax-button ax-button--ghost ax-mobile-drawer__close" type="button"><span class="ax-visually-hidden">Close navigation</span>×</button></div>
      <nav class="ax-mobile-nav" aria-label="Mobile primary navigation">
        <a href="index.html">Home</a><a href="about.html">About</a>
        <details><summary>Programmes</summary><a href="programmes.html">All programmes</a>${programmeGroups.map((group) => `<details><summary>${group.title}</summary>${group.items.map((item) => `<a href="programmes.html?group=${encodeURIComponent(group.title)}&division=${encodeURIComponent(item)}">${item}</a>`).join("")}</details>`).join("")}</details>
        ${primaryLinks.slice(1).map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
        <a class="ax-button ax-button--gold" href="admissions.html#enquiry">Apply now</a>
      </nav>
    </aside>
  `;

  const footerMarkup = () => `
    <footer class="ax-site-footer ax-surface-dark">
      <div class="ax-container">
        <div class="ax-site-footer__grid">
          <div><a class="ax-brand ax-brand--footer" href="index.html"><img src="assets/brand/apexlogo.jpeg" width="72" height="72" alt="Apex Professional Academy logo"><span class="ax-brand__text"><strong>APEX</strong><small>Professional Academy</small></span></a><p class="ax-site-footer__muted">Sector-focused professional training across 21 diploma and certificate programmes.</p></div>
          <div><h2>Explore</h2><a href="about.html">About</a><a href="programmes.html">Programmes</a><a href="careers.html">Careers</a><a href="gallery.html">Gallery</a></div>
          <div><h2>Start here</h2><a href="admissions.html">Admissions</a><a href="admissions.html#faq">FAQs</a><a href="contact.html">Contact</a><a href="disclaimer.html">Disclaimer</a></div>
          <div><h2>Contact</h2><p class="ax-site-footer__muted">{{PLACEHOLDER: institute address}}</p><p class="ax-site-footer__muted">{{PLACEHOLDER: phone number}}<br>{{PLACEHOLDER: email address}}</p></div>
        </div>
        <div class="ax-site-footer__policy"><p>${institutePolicy}</p></div>
        <div class="ax-site-footer__bottom"><span>© ${new Date().getFullYear()} Apex Professional Academy</span><span>AIMPS</span></div>
      </div>
    </footer>
  `;

  const focusable = (container) => [...container.querySelectorAll("a[href], button:not([disabled]), input, select, textarea, summary")];

  const ensureMotion = () => {
    if (document.querySelector('script[src$="motion.js"]')) return;
    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.append(script);
    });
    const base = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/";
    const motion = "assets/js/motion.js";
    const load = window.gsap ? Promise.resolve() : loadScript(`${base}gsap.min.js`).then(() => loadScript(`${base}ScrollTrigger.min.js`));
    load.then(() => loadScript(motion)).catch(() => {});
  };

  const ensureSeo = () => {
    if (document.querySelector('script[src$="seo.js"]')) return;
    const script = document.createElement("script");
    script.src = "assets/js/seo.js";
    document.body.append(script);
  };

  const init = () => {
    document.querySelectorAll("[data-ax-header-mount]").forEach((mount) => { mount.innerHTML = headerMarkup(); });
    document.querySelectorAll("[data-ax-footer-mount]").forEach((mount) => { mount.innerHTML = footerMarkup(); });
    const header = document.querySelector("[data-ax-header]");
    const trigger = document.querySelector(".ax-nav__trigger");
    const megaMenu = document.getElementById("ax-mega-menu");
    const drawer = document.getElementById("ax-mobile-drawer");
    const menuToggle = document.querySelector(".ax-menu-toggle");
    const drawerClose = document.querySelector(".ax-mobile-drawer__close");
    let lastFocus = null;

    if (header) {
      const hasHero = Boolean(document.querySelector(".ax-home-hero"));
      const onScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const solid = !hasHero || scrollTop > 80;
        header.classList.toggle("ax-site-header--solid", solid);
        header.style.setProperty("color", solid ? "var(--ax-navy)" : "var(--ax-white)", "important");
        header.style.setProperty("background-color", solid ? "var(--ax-white)" : "transparent", "important");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("scroll", onScroll, { passive: true, capture: true });
      window.setTimeout(onScroll, 0);
    }

    const closeMega = () => {
      if (!trigger || !megaMenu) return;
      trigger.setAttribute("aria-expanded", "false");
      megaMenu.hidden = true;
    };

    trigger?.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!open));
      megaMenu.hidden = open;
      if (!open) megaMenu.querySelector("a")?.focus();
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".ax-nav__menu-wrap")) closeMega();
    });

    const closeDrawer = () => {
      if (!drawer || !menuToggle) return;
      drawer.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      lastFocus?.focus();
    };

    menuToggle?.addEventListener("click", () => {
      if (!drawer) return;
      lastFocus = document.activeElement;
      drawer.hidden = false;
      menuToggle.setAttribute("aria-expanded", "true");
      drawerClose?.focus();
    });
    drawerClose?.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMega();
        if (drawer && !drawer.hidden) closeDrawer();
      }
      if (event.key === "Tab" && drawer && !drawer.hidden) {
        const elements = focusable(drawer);
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    ensureMotion();
    ensureSeo();
  };

  AX.nav = { init, institutePolicy };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ==========================================================================
   APEX — core runtime.  One global: window.AX
   Responsibilities: data access, shared chrome (header/footer), navigation,
   scroll motion, and the small UI primitives every page reuses.
   Page-specific behaviour lives in pages.js.
   ========================================================================== */
(function () {
  "use strict";

  var AX = (window.AX = window.AX || {});

  /* ── 0. Small helpers ─────────────────────────────────────────────────── */
  var $ = (AX.$ = function (sel, root) { return (root || document).querySelector(sel); });
  var $$ = (AX.$$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  });

  AX.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  AX.slugParam = function (s) { return encodeURIComponent(String(s)); };

  AX.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  AX.debounce = function (fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait || 150);
    };
  };

  /* Icons kept in one place so they stay visually consistent. */
  var ICON = (AX.icon = {
    arrow: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    caret: '<svg class="ax-nav__caret" width="10" height="7" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.6" stroke="currentColor" stroke-width="1.5"/><path d="M12.2 12.2L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    info: '<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7.4" stroke="currentColor" stroke-width="1.3"/><path d="M9 8.1v4.3M9 5.7v.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    phone: '<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M6.3 2.6l1.6 3-1.3 1.5a9.6 9.6 0 004.3 4.3l1.5-1.3 3 1.6-.5 2.4c-.1.6-.7 1-1.3.9C8.2 14.2 3.8 9.8 3 3.4c-.1-.6.3-1.2.9-1.3l2.4-.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    mail: '<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="4" width="14" height="10" rx="1.6" stroke="currentColor" stroke-width="1.3"/><path d="M2.6 5l6.4 4.4L15.4 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    pin: '<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 16s5.2-4.6 5.2-8.4A5.2 5.2 0 009 2.4a5.2 5.2 0 00-5.2 5.2C3.8 11.4 9 16 9 16z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="9" cy="7.5" r="1.9" stroke="currentColor" stroke-width="1.3"/></svg>',
    clock: '<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.3"/><path d="M9 5v4.2l2.6 1.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7.4l3.4 3.4L12 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    empty: '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><circle cx="11.5" cy="11.5" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M17.6 17.6L23 23M8.6 11.5h5.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
  });

  /* ── 1. Placeholders ──────────────────────────────────────────────────────
     Every unknown real-world fact lives here and nowhere else, so the client
     can fill them in one pass. Listed in REQUIREMENTS.md. */
  AX.PH = {
    /* Still outstanding from the client. Everything they have confirmed now
       lives in AX_ACADEMY (assets/data/programmes.js) instead of here. */
    phone: "{{PLACEHOLDER: primary phone number}}",
    whatsapp: "{{PLACEHOLDER: WhatsApp number}}",
    phoneAlt: "{{PLACEHOLDER: secondary phone number}}",
    email: "{{PLACEHOLDER: admissions email address}}",
    emailGeneral: "{{PLACEHOLDER: general enquiries email address}}",
    formEndpoint: "{{PLACEHOLDER: form submission endpoint URL}}",
    mapEmbed: "{{PLACEHOLDER: Google Maps embed URL}}",
    social: "{{PLACEHOLDER: official profile URL}}",
    duration: "{{PLACEHOLDER: duration}}",
    trainingHours: "{{PLACEHOLDER: training hours}}",
    eligibility: "{{PLACEHOLDER: eligibility}}",
    nextBatch: "{{PLACEHOLDER: next batch date}}",
    registration: "{{PLACEHOLDER: legal / registration status}}",
    faculty: "{{PLACEHOLDER: faculty names and profiles}}",
    transferPeriod: "{{PLACEHOLDER: transfer request period}}",
    enquiryRetention: "{{PLACEHOLDER: enquiry record retention period}}",
    recordRetention: "{{PLACEHOLDER: student academic record retention period}}",
    policyUpdated: "{{PLACEHOLDER: policy last-updated date}}",
    policyEffective: "{{PLACEHOLDER: policy effective date}}",
    policyVersion: "{{PLACEHOLDER: policy version}}"
  };

  AX.ph = function (key) {
    return '<span class="ax-ph">' + AX.esc(AX.PH[key] || key) + "</span>";
  };

  /* ── 2. Data ──────────────────────────────────────────────────────────── */
  var DATA = window.AX_PROGRAMMES || [];
  var GROUPS = window.AX_GROUPS || [];

  AX.programmes = DATA;
  AX.groups = GROUPS;
  AX.features = window.AX_FEATURES || [];
  AX.compliance = window.AX_COMPLIANCE || { policy: "", roles: "" };
  AX.academy = window.AX_ACADEMY || {};

  AX.byCode = function (code) {
    if (!code) return null;
    var want = String(code).toUpperCase();
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].code.toUpperCase() === want) return DATA[i];
    }
    return null;
  };

  AX.inGroup = function (name) {
    return DATA.filter(function (p) { return p.group === name; });
  };

  /* The role → programmes reverse index. Derived once, from the data only. */
  var _roleIndex = null;
  AX.roleIndex = function () {
    if (_roleIndex) return _roleIndex;
    var map = Object.create(null);
    DATA.forEach(function (p) {
      p.careerRoles.forEach(function (role) {
        if (!map[role]) map[role] = [];
        // Guard against a role listed twice inside one programme.
        if (map[role].indexOf(p) === -1) map[role].push(p);
      });
    });
    _roleIndex = Object.keys(map)
      .sort(function (a, b) { return a.localeCompare(b); })
      .map(function (role) { return { role: role, programmes: map[role] }; });
    return _roleIndex;
  };

  AX.stats = function () {
    return {
      programmes: DATA.length,
      roles: AX.roleIndex().length,
      groups: GROUPS.length,
      areas: (function () {
        var s = Object.create(null);
        DATA.forEach(function (p) { p.trainingAreas.forEach(function (a) { s[a] = 1; }); });
        return Object.keys(s).length;
      })()
    };
  };

  /* Shared compliance blocks — one wording, rendered identically everywhere. */
  AX.noticeRoles = function (extraClass) {
    return '<p class="ax-notice ' + (extraClass || "") + '">' + ICON.info +
      "<span>" + AX.esc(AX.compliance.roles) + "</span></p>";
  };

  /* ── 3. Shared chrome ─────────────────────────────────────────────────── */
  var NAV = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Programmes", href: "programmes.html", mega: true },
    { label: "Careers", href: "careers.html" },
    { label: "Admissions", href: "admissions.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Contact", href: "contact.html" }
  ];

  function currentPage() {
    var file = location.pathname.split("/").pop();
    return !file || file === "" ? "index.html" : file;
  }

  function brandHTML(sub) {
    return '<a class="ax-brand" href="index.html">' +
      '<img class="ax-brand__mark" src="assets/brand/apexlogo.jpeg" width="40" height="40" alt="Apex Professional Academy">' +
      '<span class="ax-brand__text">' +
        '<span class="ax-brand__name">APEX</span>' +
        (sub === false ? "" : '<span class="ax-brand__sub">Professional Academy</span>') +
      "</span></a>";
  }

  function megaHTML() {
    var cols = GROUPS.map(function (g) {
      var items = AX.inGroup(g.name).map(function (p) {
        return '<li><a class="ax-mega__item" href="programme.html?code=' + AX.esc(p.code) + '">' +
          '<span class="ax-mega__code">' + AX.esc(p.code) + "</span>" +
          "<span>" + AX.esc(p.division) + "</span></a></li>";
      }).join("");
      return '<div><p class="ax-mega__title">' + AX.esc(g.short) + "</p>" +
        '<ul class="ax-mega__list">' + items + "</ul></div>";
    }).join("");

    var s = AX.stats();
    return '<div class="ax-mega" id="ax-mega" role="region" aria-label="All programmes">' +
      '<div class="ax-mega__grid">' + cols + "</div>" +
      '<div class="ax-mega__foot">' +
        '<p class="ax-small">' + s.programmes + " programmes · " + s.roles +
          " career-oriented roles · " + s.groups + " sector groups</p>" +
        '<div class="ax-cluster">' +
          '<a class="ax-link" href="programmes.html">All programmes ' + ICON.arrow + "</a>" +
          '<a class="ax-link" href="careers.html">Browse by role ' + ICON.arrow + "</a>" +
        "</div>" +
      "</div></div>";
  }

  function headerHTML() {
    var here = currentPage();
    var links = NAV.map(function (n) {
      var cur = n.href === here ? ' aria-current="page"' : "";
      if (n.mega) {
        return '<button class="ax-nav__link" type="button" id="ax-mega-btn" ' +
          'aria-expanded="false" aria-controls="ax-mega"' + cur + ">" +
          AX.esc(n.label) + ICON.caret + "</button>";
      }
      return '<a class="ax-nav__link" href="' + n.href + '"' + cur + ">" + AX.esc(n.label) + "</a>";
    }).join("");

    return '<header class="ax-header" id="ax-header">' +
      '<div class="ax-header__inner">' +
        brandHTML() +
        '<nav class="ax-nav" aria-label="Primary">' + links + "</nav>" +
        '<a class="ax-btn ax-btn--gold ax-btn--sm ax-header__cta" href="admissions.html#enquiry">Apply now</a>' +
        '<button class="ax-burger" type="button" id="ax-burger" aria-expanded="false" ' +
          'aria-controls="ax-drawer" aria-label="Open menu"><span></span></button>' +
      "</div>" + megaHTML() + "</header>";
  }

  function drawerHTML() {
    var here = currentPage();
    var groupBlocks = GROUPS.map(function (g) {
      var items = AX.inGroup(g.name).map(function (p) {
        return '<li><a href="programme.html?code=' + AX.esc(p.code) + '">' +
          AX.esc(p.code) + " · " + AX.esc(p.division) + "</a></li>";
      }).join("");
      return '<details class="ax-drawer__group"><summary>' + AX.esc(g.short) + "</summary>" +
        '<ul class="ax-drawer__sub">' + items + "</ul></details>";
    }).join("");

    var simple = NAV.filter(function (n) { return !n.mega; }).map(function (n) {
      var cur = n.href === here ? ' aria-current="page"' : "";
      return '<a class="ax-drawer__link" href="' + n.href + '"' + cur + ">" + AX.esc(n.label) + "</a>";
    });

    return '<div class="ax-scrim" id="ax-scrim" hidden></div>' +
      '<div class="ax-drawer" id="ax-drawer" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<div class="ax-drawer__head">' + brandHTML() +
          '<button class="ax-drawer__close" type="button" id="ax-drawer-close" aria-label="Close menu">&times;</button>' +
        "</div>" +
        '<nav aria-label="Mobile">' +
          simple.slice(0, 2).join("") +
          '<a class="ax-drawer__link" href="programmes.html">All programmes</a>' +
          groupBlocks +
          simple.slice(2).join("") +
        "</nav>" +
        '<a class="ax-btn ax-btn--gold ax-btn--block ax-mt-4" href="admissions.html#enquiry">Apply now</a>' +
      "</div>";
  }

  function footerHTML() {
    var s = AX.stats();
    var ACAD = AX.academy || {};
    var groupLinks = GROUPS.map(function (g) {
      return '<li><a href="programmes.html?group=' + AX.slugParam(g.name) + '">' + AX.esc(g.short) + "</a></li>";
    }).join("");

    var pageLinks = [
      ["About the academy", "about.html"],
      ["All programmes", "programmes.html"],
      ["Role finder", "careers.html"],
      ["Admissions", "admissions.html"],
      ["Gallery", "gallery.html"],
      ["Contact", "contact.html"],
      ["Institute policy", "disclaimer.html"]
    ].map(function (l) {
      return '<li><a href="' + l[1] + '">' + AX.esc(l[0]) + "</a></li>";
    }).join("");

    var topRoles = AX.roleIndex()
      .slice()
      .sort(function (a, b) { return b.programmes.length - a.programmes.length; })
      .slice(0, 7)
      .map(function (r) {
        return '<li><a href="careers.html?role=' + AX.slugParam(r.role) + '">' + AX.esc(r.role) + "</a></li>";
      }).join("");

    var socials = ["Facebook", "Instagram", "LinkedIn", "YouTube"].map(function (n) {
      return '<a href="' + AX.esc(AX.PH.social) + '" aria-label="' + n +
        '" title="' + n + ' — ' + AX.esc(AX.PH.social) + '">' +
        '<span aria-hidden="true" class="ax-social__tag">' + n.slice(0, 2) + "</span></a>";
    }).join("");

    return '<footer class="ax-footer">' +
      '<div class="ax-container">' +
        '<div class="ax-footer__grid">' +
          "<div>" + brandHTML() +
            '<p class="ax-body ax-body--sm ax-mt-3">Apex Institute of Multidisciplinary Professional Studies — APA / AIMPS. ' +
            s.programmes + " sector-focused training programmes mapped to " + s.roles + " career-oriented roles.</p>" +
            (ACAD.address
              ? '<p class="ax-small ax-mt-3">' + AX.esc(ACAD.address.oneLine) + "</p>" : "") +
            (ACAD.hours
              ? '<p class="ax-small ax-mt-1">' + AX.esc(ACAD.hours.weekdays) + " · " +
                AX.esc(ACAD.hours.sunday) + "</p>" : "") +
            '<div class="ax-social ax-mt-4">' + socials + "</div>" +
          "</div>" +
          '<div><p class="ax-footer__title">Explore</p><ul class="ax-footer__list">' + pageLinks + "</ul></div>" +
          '<div><p class="ax-footer__title">Sector groups</p><ul class="ax-footer__list">' + groupLinks +
            '<li><a href="careers.html">All ' + s.roles + " roles</a></li></ul></div>" +
          '<div><p class="ax-footer__title">Popular roles</p><ul class="ax-footer__list">' + topRoles + "</ul></div>" +
        "</div>" +
        '<div class="ax-footer__policy"><strong class="ax-gold">Institute policy statement.</strong> ' +
          AX.esc(AX.compliance.policy) + "</div>" +
        '<div class="ax-footer__bar">' +
          "<span>© " + new Date().getFullYear() + " Apex Professional Academy. All rights reserved.</span>" +
          '<span><a href="disclaimer.html">Disclaimer, terms &amp; privacy</a></span>' +
        "</div>" +
      "</div></footer>";
  }

  function mountChrome() {
    var hMount = $("[data-ax-header]");
    if (hMount) hMount.outerHTML = headerHTML() + drawerHTML();
    var fMount = $("[data-ax-footer]");
    if (fMount) fMount.outerHTML = footerHTML();
  }

  /* ── 4. Navigation behaviour ──────────────────────────────────────────── */
  function initHeader() {
    var header = $("#ax-header");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Mega menu */
    var btn = $("#ax-mega-btn");
    var mega = $("#ax-mega");
    if (btn && mega) {
      var closeTimer;
      // Hover opens the menu casually; a click pins it open. Without the pin,
      // hovering and then clicking would open on mouseenter and immediately
      // close again on click.
      var pinned = false;

      var open = function () {
        clearTimeout(closeTimer);
        mega.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      };
      var close = function () {
        pinned = false;
        mega.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      };
      var lazyClose = function () {
        if (pinned) return;
        closeTimer = setTimeout(close, 180);
      };

      btn.addEventListener("click", function () {
        if (pinned) { close(); return; }
        pinned = true;
        open();
      });
      btn.addEventListener("mouseenter", open);
      btn.addEventListener("mouseleave", lazyClose);
      mega.addEventListener("mouseenter", function () { clearTimeout(closeTimer); });
      mega.addEventListener("mouseleave", lazyClose);
      btn.addEventListener("focus", open);

      // Focus leaving the menu entirely closes it; Escape returns focus to the trigger.
      header.addEventListener("focusout", function (e) {
        if (!header.contains(e.relatedTarget)) close();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mega.classList.contains("is-open")) {
          close();
          btn.focus();
        }
      });
      document.addEventListener("click", function (e) {
        if (!header.contains(e.target)) close();
      });
    }

    /* Drawer */
    var burger = $("#ax-burger");
    var drawer = $("#ax-drawer");
    var scrim = $("#ax-scrim");
    var closeBtn = $("#ax-drawer-close");
    if (!burger || !drawer || !scrim) return;

    var lastFocus = null;

    function trap(e) {
      if (e.key !== "Tab") return;
      var f = $$('a[href],button:not([disabled]),summary,input,select,textarea', drawer)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function openDrawer() {
      lastFocus = document.activeElement;
      scrim.hidden = false;
      // Next frame, so the transition runs from the hidden state.
      requestAnimationFrame(function () {
        drawer.classList.add("is-open");
        scrim.classList.add("is-open");
      });
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", trap);
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      scrim.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trap);
      setTimeout(function () { if (!drawer.classList.contains("is-open")) scrim.hidden = true; }, 400);
      if (lastFocus) lastFocus.focus();
    }

    burger.addEventListener("click", function () {
      drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    });
    scrim.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
    });
    $$("a", drawer).forEach(function (a) { a.addEventListener("click", closeDrawer); });
  }

  /* ── 5. Motion ────────────────────────────────────────────────────────── */
  /* Generic scroll reveal. IntersectionObserver rather than one ScrollTrigger
     per element — cheaper, and it degrades to "always visible" without JS. */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;
    if (AX.reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var step = parseInt(el.getAttribute("data-reveal"), 10);
        el.style.setProperty("--d", (isNaN(step) ? 0 : step * 70) + "ms");
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Pointer-tracked gold bloom on glass surfaces. */
  function initSpotlight() {
    if (AX.reducedMotion) return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest ? e.target.closest(".ax-spot") : null;
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--ax-mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--ax-my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* Hero entrance. Runs once per session so repeat visits feel instant. */
  function initHero() {
    var hero = $(".ax-hero");
    if (!hero) return;

    var lines = $$(".ax-hero__title .ax-line > span", hero);
    var reveal = $$("[data-hero]", hero);

    function settle() {
      lines.forEach(function (l) { l.style.transform = "none"; });
      reveal.forEach(function (el) { el.style.opacity = 1; el.style.transform = "none"; });
    }

    var seen = false;
    try { seen = sessionStorage.getItem("ax-hero") === "1"; } catch (err) { /* private mode */ }

    if (AX.reducedMotion || seen || !window.gsap) { settle(); return; }
    try { sessionStorage.setItem("ax-hero", "1"); } catch (err) { /* ignore */ }

    var gsap = window.gsap;
    gsap.set(reveal, { opacity: 0, y: 18 });

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".ax-header", { opacity: 1, duration: 0.35 }, 0)
      .to(lines, { y: "0%", duration: 0.85, stagger: 0.085 }, 0.1);

    var dLine = $(".ax-hero .ax-diagonal__line");
    if (dLine && dLine.getTotalLength) {
      var len = dLine.getTotalLength();
      gsap.set(dLine, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(dLine, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.3);
    }
    tl.to(reveal, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.55);

    // Hand the inline styles back to CSS once the intro is done.
    tl.eventCallback("onComplete", function () {
      gsap.set(reveal, { clearProps: "opacity,transform" });
    });

    // Failsafe on the wall clock, not on rAF. If the frame loop is throttled
    // — a backgrounded tab, a stalled device — the hero must never be left
    // sitting at opacity 0. setTimeout keeps running when rAF does not.
    setTimeout(function () {
      if (tl.progress() < 1) tl.progress(1);
    }, 2500);
  }

  /* Infinite marquee. Pauses on hover, on keyboard focus, and off-screen. */
  function initMarquee() {
    $$(".ax-marquee").forEach(function (wrap) {
      var track = $(".ax-marquee__track", wrap);
      if (!track) return;

      // Duplicate the content once so the loop has no visible seam.
      var original = track.innerHTML;
      track.innerHTML = original + original;

      if (AX.reducedMotion || !window.gsap) return;

      var half = track.scrollWidth / 2;
      if (!half) return;

      var tween = window.gsap.to(track, {
        x: -half,
        duration: half / 42,          // constant speed regardless of content width
        ease: "none",
        repeat: -1
      });

      var pause = function () { tween.pause(); };
      var play = function () { tween.play(); };
      wrap.addEventListener("mouseenter", pause);
      wrap.addEventListener("mouseleave", play);
      wrap.addEventListener("focusin", pause);
      wrap.addEventListener("focusout", play);

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) {
          e[0].isIntersecting ? tween.play() : tween.pause();
        }, { threshold: 0 }).observe(wrap);
      }
    });
  }

  /* Career pathways: nodes light up in sequence as the section is pinned. */
  function initPathways() {
    var section = $(".ax-pathways");
    if (!section) return;
    var rows = $$(".ax-path", section);
    if (!rows.length) return;

    if (AX.reducedMotion || !window.gsap || !window.ScrollTrigger) {
      rows.forEach(function (r) { r.classList.add("is-lit"); });
      return;
    }

    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    // Pinning only makes sense when the section comfortably fits the viewport.
    var canPin = window.innerWidth > 1024 && section.offsetHeight < window.innerHeight * 1.05;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: canPin ? "top top" : "top 78%",
        end: canPin ? "+=150%" : "bottom 60%",
        pin: canPin,
        scrub: canPin ? 0.6 : false,
        invalidateOnRefresh: true
      }
    });

    // Only the node markers are scrubbed. The row content itself is revealed
    // by the ordinary IntersectionObserver pass, so scrubbing back up never
    // leaves the programme names hidden.
    rows.forEach(function (row, i) {
      tl.call(function () { row.classList.add("is-lit"); }, null, i * 0.12);
    });
    tl.to({}, { duration: 0.2 });

    var dLine = $(".ax-diagonal__line", section);
    if (dLine && dLine.getTotalLength) {
      var len = dLine.getTotalLength();
      gsap.fromTo(dLine,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 40%", scrub: 0.5 }
        });
    }

    window.addEventListener("resize", AX.debounce(function () {
      window.ScrollTrigger.refresh();
    }, 220));
  }

  /* Count-up on the hero stats. Values are read from the data, never typed. */
  function initCounters() {
    var els = $$("[data-count]");
    if (!els.length) return;
    if (AX.reducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var start = performance.now();
        var dur = 1100;
        (function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── 6. UI primitives ─────────────────────────────────────────────────── */
  function initAccordion() {
    $$(".ax-acc").forEach(function (acc) {
      $$(".ax-acc__btn", acc).forEach(function (btn) {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (!panel) return;
        btn.addEventListener("click", function () {
          var open = btn.getAttribute("aria-expanded") === "true";
          // One panel at a time keeps long FAQ lists scannable.
          $$(".ax-acc__btn", acc).forEach(function (other) {
            if (other === btn) return;
            var op = document.getElementById(other.getAttribute("aria-controls"));
            other.setAttribute("aria-expanded", "false");
            if (op) op.style.height = "0px";
          });
          btn.setAttribute("aria-expanded", String(!open));
          panel.style.height = open ? "0px" : panel.scrollHeight + "px";
        });
        panel.style.height = btn.getAttribute("aria-expanded") === "true"
          ? panel.scrollHeight + "px" : "0px";
        panel.style.transition = AX.reducedMotion ? "none" : "height .35s cubic-bezier(.22,.61,.36,1)";
      });
    });
  }

  AX.toast = function (msg) {
    var t = $("#ax-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "ax-toast";
      t.className = "ax-toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("is-visible"); }, 2600);
  };

  /* Lightbox shared by the gallery and the home image strip. */
  AX.lightbox = function (triggers) {
    if (!triggers.length) return;
    var box = $("#ax-lightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "ax-lightbox";
      box.className = "ax-lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Image viewer");
      box.innerHTML =
        '<button class="ax-lightbox__btn ax-lightbox__close" type="button" aria-label="Close">&times;</button>' +
        '<button class="ax-lightbox__btn ax-lightbox__prev" type="button" aria-label="Previous image">&#8249;</button>' +
        '<button class="ax-lightbox__btn ax-lightbox__next" type="button" aria-label="Next image">&#8250;</button>' +
        '<figure class="ax-lightbox__fig"><img alt=""><figcaption class="ax-lightbox__cap"></figcaption></figure>';
      document.body.appendChild(box);
    }

    var img = $("img", box);
    var cap = $(".ax-lightbox__cap", box);
    var idx = 0;
    var opener = null;

    function show(i) {
      idx = (i + triggers.length) % triggers.length;
      var src = triggers[idx];
      var thumb = src.querySelector("img");
      if (!thumb) return;
      img.src = thumb.currentSrc || thumb.src;
      img.alt = thumb.alt || "";
      cap.textContent = src.getAttribute("data-caption") || thumb.alt || "";
    }

    function open(i) {
      opener = document.activeElement;
      show(i);
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $(".ax-lightbox__close", box).focus();
    }

    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }

    triggers.forEach(function (t, i) {
      t.addEventListener("click", function () { open(i); });
    });
    $(".ax-lightbox__close", box).addEventListener("click", close);
    $(".ax-lightbox__prev", box).addEventListener("click", function () { show(idx - 1); });
    $(".ax-lightbox__next", box).addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "Tab") {
        var f = $$("button", box);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Touch swipe
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 48) show(dx > 0 ? idx - 1 : idx + 1);
      x0 = null;
    }, { passive: true });
  };

  /* ── 7. Boot ──────────────────────────────────────────────────────────── */
  function boot() {
    document.documentElement.classList.add("ax-ready");
    mountChrome();
    initHeader();

    // The page script runs early because it injects content — programme cards,
    // sector tiles, pathway rows, the marquee's division names. Everything
    // below observes or animates that content, so it has to exist first.
    if (window.AX_PAGE) {
      try { window.AX_PAGE(); } catch (err) { console.error("[AX] page script:", err); }
    }

    initHero();
    initMarquee();
    initReveal();
    initSpotlight();
    initCounters();
    initAccordion();
    initPathways();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

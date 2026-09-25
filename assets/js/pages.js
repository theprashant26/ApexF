/* ==========================================================================
   APEX — page behaviour. Loaded BEFORE apex.js, which calls window.AX_PAGE()
   once the shared chrome is mounted. Dispatch is driven by <body data-page>.
   Every DOM query is guarded: a page missing a block must never throw.
   ========================================================================== */
(function () {
  "use strict";

  function ready(fn) {
    // AX is defined by apex.js, which runs after this file. Everything here
    // executes inside AX_PAGE(), by which time AX exists.
    return fn;
  }


  /* The "Programme Details" table the client specified. Confirmed facts come
     from AX_ACADEMY; the per-programme fields they have not supplied yet render
     as visible placeholder chips rather than being guessed at. */
  function detailsBlock(p) {
    var AX = window.AX, a = AX.academy || {}, fee = a.fee || {};
    var durations = a.durations || [];
    var fees = p.fees || [];

    function feeFor(months) {
      for (var i = 0; i < fees.length; i++) if (fees[i].months === months) return fees[i];
      return {};
    }

    /* One row per length: what it is called, what it awards, what it costs. */
    var tierRows = durations.map(function (d) {
      var f = feeFor(d.months);
      return "<tr>" +
        '<th scope="row">' + AX.esc(d.label) + "<br>" +
          '<span class="ax-small">' + AX.esc(d.category) + "</span></th>" +
        '<td data-th="Training hours">' + AX.esc(d.hours || "") + "</td>" +
        '<td data-th="Award">' + AX.esc(d.award) + "</td>" +
        '<td data-th="Total fee"><b class="ax-gold">' + AX.esc(f.total || "") + "</b></td>" +
        '<td data-th="First instalment">' +
          (f.first ? AX.esc(f.first)
                   : '<span class="ax-gold">' + AX.esc(fee.emiOnRequest || "EMI on request") + "</span>") +
        "</td>" +
      "</tr>";
    }).join("");

    var specRows = [
      ["Programme code", '<span class="ax-code">' + AX.esc(p.code) + "</span>"],
      ["Division certificate", AX.esc(p.certificate)],
      ["Eligibility", AX.esc(a.eligibility || "")],
      ["Age requirement", "No general age restriction, unless specified for this programme"],
      ["Learning mode", AX.esc(a.batch ? a.batch.types : "")],
      ["Instalment facility", AX.esc(fee.instalment || "")],
      ["Admission", AX.esc(a.batch ? a.batch.open : "") +
        ' <span class="ax-small">— admission is open all year</span>']
    ].map(function (r) {
      return '<tr><th scope="row">' + AX.esc(r[0]) + "</th><td>" + r[1] + "</td></tr>";
    }).join("");

    return '<h2 class="ax-h2 ax-h2--sm ax-mt-6" data-reveal>Choose your programme length</h2>' +
      '<p class="ax-body ax-mt-2" data-reveal>This programme runs at three lengths. The award ' +
        "you receive depends on the length you take.</p>" +
      '<div class="ax-table-wrap ax-mt-3" data-reveal>' +
        '<table class="ax-table ax-table--spec"><thead><tr>' +
          '<th scope="col">Length</th><th scope="col">Training hours</th>' +
          '<th scope="col">Award</th>' +
          '<th scope="col">Total fee</th><th scope="col">First instalment</th>' +
        "</tr></thead><tbody>" + tierRows + "</tbody></table>" +
      "</div>" +
      '<p class="ax-small ax-mt-2">The first instalment is part of the total fee, not a charge ' +
        "on top of it. " + AX.esc(fee.emiOnRequestNote || "") + "</p>" +

      '<h2 class="ax-h2 ax-h2--sm ax-mt-6" data-reveal>Programme details</h2>' +
      '<div class="ax-table-wrap ax-mt-3" data-reveal>' +
        '<table class="ax-table ax-table--spec"><tbody>' + specRows + "</tbody></table>" +
      "</div>" +
      '<p class="ax-small ax-mt-2">Fees, inclusions and exclusions are confirmed before ' +
        'enrolment. See <a class="ax-link" href="admissions.html">admissions</a> for the full ' +
        "fee breakdown and the document list.</p>";
  }

  /* ── Shared renderers ─────────────────────────────────────────────────── */
  function pcard(p, roleLimit) {
    var AX = window.AX;
    var limit = roleLimit || 3;
    var roles = p.careerRoles.slice(0, limit).map(function (r) {
      return "<li>" + AX.esc(r) + "</li>";
    }).join("");
    var extra = p.careerRoles.length - limit;

    /* A division on the register whose curriculum has not been published yet.
       Better to say so than to show an empty roles list. */
    var rolesBlock = p.pending
      ? '<p class="ax-pcard__label">Curriculum</p>' +
        '<p class="ax-body ax-body--sm ax-mt-1">Being finalised — training areas and career-oriented roles are published once confirmed.</p>'
      : '<p class="ax-pcard__label">Career-oriented roles this programme trains for</p>' +
        '<ul class="ax-pcard__roles">' + roles + "</ul>";

    return '<article class="ax-panel ax-spot ax-pcard" data-reveal>' +
      '<div class="ax-pcard__top">' +
        '<span class="ax-code">' + AX.esc(p.code) + "</span>" +
        '<span class="ax-pcard__num">' + String(p.number).padStart(2, "0") + "</span>" +
      "</div>" +
      '<h3 class="ax-h3 ax-pcard__division">' + AX.esc(p.division) + "</h3>" +
      '<p class="ax-pcard__cert">' + AX.esc(p.programme) + "</p>" +
      rolesBlock +
      '<div class="ax-pcard__foot">' +
        '<a class="ax-link" href="programme.html?code=' + AX.esc(p.code) + '">View programme ' + AX.icon.arrow + "</a>" +
        (!p.pending && extra > 0 ? '<span class="ax-pcard__more">+' + extra + " more</span>" : "") +
      "</div></article>";
  }

  function trow(p) {
    var AX = window.AX;
    return "<tr>" +
      '<td data-th="Code"><span class="ax-code">' + AX.esc(p.code) + "</span></td>" +
      '<td data-th="Division"><a href="programme.html?code=' + AX.esc(p.code) + '">' + AX.esc(p.division) + "</a></td>" +
      '<td data-th="Programme">' + AX.esc(p.programme) + "</td>" +
      '<td data-th="Career-oriented roles">' +
        (p.pending ? '<span class="ax-small">Curriculum being finalised</span>'
                   : AX.esc(p.careerRoles.join(" · "))) + "</td>" +
      "</tr>";
  }

  function emptyState(msg, action) {
    var AX = window.AX;
    return '<div class="ax-empty">' +
      '<div class="ax-empty__mark">' + AX.icon.empty + "</div>" +
      '<h3 class="ax-h3">Nothing matches that yet</h3>' +
      '<p class="ax-body">' + AX.esc(msg) + "</p>" +
      (action || "") + "</div>";
  }

  /* ── Home ─────────────────────────────────────────────────────────────── */
  function initHome() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;

    /* Marquee content: the 21 division names, straight from the data. */
    var track = $(".ax-marquee__track");
    if (track && !track.children.length) {
      track.innerHTML = AX.programmes.map(function (p) {
        return '<span class="ax-marquee__item">' + AX.esc(p.division.replace(/ Division$/, "")) + "</span>";
      }).join("");
    }

    /* Sector group tiles */
    var bento = $("[data-ax-groups]");
    if (bento) {
      bento.innerHTML = AX.groups.map(function (g, i) {
        var list = AX.inGroup(g.name);
        var roles = {};
        list.forEach(function (p) { p.careerRoles.forEach(function (r) { roles[r] = 1; }); });
        return '<a class="ax-tile' + (i === 0 ? " ax-tile--feature" : "") +
            '" href="programmes.html?group=' + AX.slugParam(g.name) + '" data-reveal="' + i + '">' +
          '<span class="ax-tile__img"><img src="assets/img/ph-group-' + (i + 1) + '.svg" ' +
            'width="900" height="1100" loading="lazy" alt=""></span>' +
          '<span class="ax-tile__veil"></span>' +
          '<span class="ax-tile__count">' + list.length + " divisions · " + Object.keys(roles).length + " roles</span>" +
          '<h3 class="ax-h3 ax-tile__name">' + AX.esc(g.name) + "</h3>" +
          '<span class="ax-tile__roles">' + AX.esc(g.blurb) + "</span>" +
          '<span class="ax-tile__go">Browse the group ' + AX.icon.arrow + "</span>" +
        "</a>";
      }).join("");
    }

    /* Career pathways: the roles shared by the most programmes. */
    var rail = $("[data-ax-pathways]");
    if (rail) {
      var top = AX.roleIndex()
        .filter(function (r) { return r.programmes.length > 1; })
        .sort(function (a, b) {
          if (b.programmes.length !== a.programmes.length) return b.programmes.length - a.programmes.length;
          return a.role.localeCompare(b.role);
        })
        .slice(0, 6);

      rail.innerHTML = top.map(function (r, i) {
        var progs = r.programmes.map(function (p) {
          return '<span class="ax-path__prog">' + AX.esc(p.division.replace(/ Division$/, "")) + "</span>";
        }).join("");
        return '<a class="ax-path" data-reveal="' + i + '" href="careers.html?role=' + AX.slugParam(r.role) + '">' +
          '<span class="ax-path__role"><span class="ax-path__n">' + String(i + 1).padStart(2, "0") + "</span>" +
            AX.esc(r.role) + "</span>" +
          '<span class="ax-path__progs">' + progs + "</span>" +
        "</a>";
      }).join("");
    }

    /* Register: the first nine programmes */
    var reg = $("[data-ax-register]");
    if (reg) {
      reg.innerHTML = AX.programmes.slice(0, 9).map(function (p) { return pcard(p); }).join("");
    }

    /* Common features */
    var feat = $("[data-ax-features]");
    if (feat) {
      feat.innerHTML = AX.features.map(function (f) { return "<li>" + AX.esc(f) + "</li>"; }).join("");
    }

    AX.lightbox($$("[data-lightbox]"));
  }

  /* ── Programmes listing ───────────────────────────────────────────────── */
  function initProgrammes() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;

    var grid = $("[data-ax-results]");
    var table = $("[data-ax-table]");
    var tbody = table ? $("tbody", table) : null;
    var countEl = $("[data-ax-count]");
    var search = $("#ax-q");
    var pills = $$("[data-group]");
    var toggles = $$("[data-view]");
    if (!grid) return;

    var params = new URLSearchParams(location.search);
    var state = {
      q: params.get("q") || "",
      group: params.get("group") || "",
      view: params.get("view") || readView()
    };

    function readView() {
      try { return localStorage.getItem("ax-view") || "cards"; }
      catch (e) { return "cards"; }
    }
    function saveView(v) {
      try { localStorage.setItem("ax-view", v); } catch (e) { /* storage blocked */ }
    }

    /* A programme matches if the query appears anywhere in its text, its
       training areas, or its career roles — roles are searchable by design. */
    function matches(p, q) {
      if (!q) return true;
      var hay = [p.division, p.code, p.certificate, p.programme, p.group]
        .concat(p.trainingAreas, p.careerRoles).join(" ").toLowerCase();
      return q.split(/\s+/).filter(Boolean).every(function (term) {
        return hay.indexOf(term) !== -1;
      });
    }

    function apply() {
      var q = state.q.trim().toLowerCase();
      var list = AX.programmes.filter(function (p) {
        return (!state.group || p.group === state.group) && matches(p, q);
      });

      if (countEl) {
        countEl.innerHTML = list.length === AX.programmes.length
          ? "Showing all <b>" + list.length + "</b> programmes"
          : "Showing <b>" + list.length + "</b> of " + AX.programmes.length + " programmes";
      }

      if (!list.length) {
        grid.innerHTML = emptyState(
          "No programme matches that search or filter. Try a role name such as Ticketing Executive, a code such as AATC, or clear the filters.",
          '<button class="ax-btn ax-btn--outline ax-btn--sm ax-mt-4" type="button" data-ax-clear>Clear filters</button>'
        );
        grid.hidden = false;
        if (table) table.hidden = true;
        var clear = $("[data-ax-clear]", grid);
        if (clear) clear.addEventListener("click", function () {
          state.q = ""; state.group = "";
          if (search) search.value = "";
          syncPills(); apply(); push();
        });
        return;
      }

      if (state.view === "register" && tbody) {
        tbody.innerHTML = list.map(trow).join("");
        table.hidden = false;
        grid.hidden = true;
      } else {
        grid.innerHTML = list.map(function (p) { return pcard(p); }).join("");
        grid.hidden = false;
        if (table) table.hidden = true;
        // Newly injected cards need their reveal observer.
        stagger($$("[data-reveal]", grid));
      }
    }

    function stagger(els) {
      if (AX.reducedMotion || !("IntersectionObserver" in window)) {
        els.forEach(function (el) { el.classList.add("is-in"); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = els.indexOf(e.target);
          e.target.style.setProperty("--d", Math.min(i, 8) * 45 + "ms");
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });
      els.forEach(function (el) { io.observe(el); });
    }

    function push() {
      var p = new URLSearchParams();
      if (state.q) p.set("q", state.q);
      if (state.group) p.set("group", state.group);
      if (state.view !== "cards") p.set("view", state.view);
      var qs = p.toString();
      history.replaceState(null, "", qs ? "?" + qs : location.pathname);
    }

    function syncPills() {
      pills.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-group") === state.group));
      });
    }

    function syncToggles() {
      toggles.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === state.view));
      });
    }

    if (search) {
      search.value = state.q;
      search.addEventListener("input", AX.debounce(function () {
        state.q = search.value;
        apply(); push();
      }, 180));
    }

    pills.forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.getAttribute("data-group");
        state.group = state.group === g ? "" : g;
        syncPills(); apply(); push();
      });
    });

    toggles.forEach(function (b) {
      b.addEventListener("click", function () {
        state.view = b.getAttribute("data-view");
        saveView(state.view);
        syncToggles(); apply(); push();
      });
    });

    syncPills();
    syncToggles();
    apply();
  }

  /* ── Programme detail ─────────────────────────────────────────────────── */
  function initDetail() {
    var AX = window.AX, $ = AX.$;
    var root = $("[data-ax-detail]");
    if (!root) return;

    var code = new URLSearchParams(location.search).get("code");
    var p = AX.byCode(code);

    if (!p) {
      document.title = "Programme not found | Apex Professional Academy";
      root.innerHTML = '<div class="ax-container">' + emptyState(
        code
          ? 'No programme uses the code "' + AX.esc(code) + '". It may have been renamed or the link may be incomplete.'
          : "No programme code was supplied in the link.",
        '<div class="ax-cluster ax-mt-4">' +
          '<a class="ax-btn ax-btn--gold ax-btn--sm" href="programmes.html">All 21 programmes</a>' +
          '<a class="ax-btn ax-btn--glass ax-btn--sm" href="careers.html">Browse by role</a></div>'
      ) + "</div>";
      return;
    }

    /* Per-page metadata */
    var title = p.division + " — " + p.programme + " | Apex Professional Academy";
    document.title = title;
    var desc = p.certificate + ". Training areas include " +
      p.trainingAreas.slice(0, 4).join(", ") + ". Career-oriented roles: " +
      p.careerRoles.slice(0, 3).join(", ") + ".";
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", "programme.html?code=" + p.code);

    /* Course JSON-LD */
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: p.programme,
      alternateName: p.certificate,
      courseCode: p.code,
      description: p.intro,
      teaches: p.trainingAreas,
      provider: {
        "@type": "EducationalOrganization",
        name: "Apex Professional Academy",
        alternateName: "Apex Institute of Multidisciplinary Professional Studies (AIMPS)"
      }
    });
    document.head.appendChild(ld);

    var related = AX.inGroup(p.group).filter(function (x) { return x.code !== p.code; }).slice(0, 3);

    var areas = p.trainingAreas.map(function (a) {
      return "<li>" + AX.esc(a) + "</li>";
    }).join("");

    var roles = p.careerRoles.map(function (r) {
      return '<a class="ax-chip" href="careers.html?role=' + AX.slugParam(r) + '">' + AX.esc(r) +
        '<span class="ax-chip__count">' + AX.icon.arrow + "</span></a>";
    }).join("");

    var features = AX.features.map(function (f) { return "<li>" + AX.esc(f) + "</li>"; }).join("");

    var relatedHTML = related.length
      ? '<section class="ax-section ax-section--tight"><div class="ax-container">' +
          '<div class="ax-sec-head"><p class="ax-eyebrow">Same sector group</p>' +
            '<h2 class="ax-h2">More in ' + AX.esc(p.group) + "</h2></div>" +
          '<div class="ax-grid ax-grid--3">' + related.map(function (r) { return pcard(r); }).join("") + "</div>" +
        "</div></section>"
      : "";

    var bodyBlocks = p.pending
      ? '<p class="ax-notice" data-reveal>' + AX.icon.info + "<span>" +
          AX.esc((AX.academy || {}).pendingCurriculum || "") + "</span></p>"
      : '<p class="ax-lead" data-reveal>' + AX.esc(p.intro) + "</p>" +

        '<h2 class="ax-h2 ax-h2--sm ax-mt-6" data-reveal>Training areas</h2>' +
        '<ul class="ax-areas ax-mt-3" data-reveal>' + areas + "</ul>" +

        '<h2 class="ax-h2 ax-h2--sm ax-mt-6" data-reveal>' +
          "Career-oriented roles this programme trains for</h2>" +
        '<p class="ax-body ax-mt-2" data-reveal>' + AX.esc((AX.academy || {}).careerStatement || "") + "</p>" +
        '<div class="ax-cluster ax-mt-3" data-reveal>' + roles + "</div>" +
        '<div class="ax-mt-3" data-reveal>' + AX.noticeRoles() + "</div>";

    root.innerHTML =
      '<section class="ax-phero"><div class="ax-container">' +
        '<nav class="ax-crumbs" aria-label="Breadcrumb">' +
          '<a href="index.html">Home</a><span aria-hidden="true">/</span>' +
          '<a href="programmes.html">Programmes</a><span aria-hidden="true">/</span>' +
          '<a href="programmes.html?group=' + AX.slugParam(p.group) + '">' + AX.esc(p.group) + "</a>" +
          '<span aria-hidden="true">/</span><span>' + AX.esc(p.code) + "</span>" +
        "</nav>" +
        '<div class="ax-phero__inner">' +
          '<div class="ax-cluster ax-mb-3">' +
            '<span class="ax-code ax-code--lg">' + AX.esc(p.code) + "</span>" +
            '<span class="ax-small">Programme ' + String(p.number).padStart(2, "0") + " of " + AX.programmes.length + "</span>" +
          "</div>" +
          '<h1 class="ax-h1 ax-h1--page">' + AX.esc(p.division) + "</h1>" +
          '<p class="ax-lead ax-mt-3"><span class="ax-gold-text">' + AX.esc(p.certificate) + "</span><br>" +
            AX.esc(p.programme) + "</p>" +
        "</div></div></section>" +

      '<section class="ax-section ax-section--top-tight"><div class="ax-container">' +
        '<div class="ax-detail-layout">' +
          "<div>" +
            bodyBlocks +

            '<h2 class="ax-h2 ax-h2--sm ax-mt-6" data-reveal>Common programme features</h2>' +
            '<p class="ax-body ax-mt-2">Depending on the programme, students may receive:</p>' +
            '<ul class="ax-checklist ax-mt-3" data-reveal>' + features + "</ul>" +

            detailsBlock(p) +
          "</div>" +

          '<aside class="ax-sticky">' +
            '<div class="ax-panel ax-panel--pad ax-spot">' +
              '<p class="ax-eyebrow">Enquire</p>' +
              '<h3 class="ax-h3 ax-mt-2">Ask about ' + AX.esc(p.division.replace(/ Division$/, "")) + "</h3>" +
              '<p class="ax-body ax-body--sm ax-mt-2">Send an enquiry and the team will walk you through the programme scope, learning mode and next steps.</p>' +
              '<a class="ax-btn ax-btn--gold ax-btn--block ax-mt-3" href="admissions.html?code=' +
                AX.esc(p.code) + '#enquiry">Make an enquiry</a>' +
              '<a class="ax-btn ax-btn--glass ax-btn--block ax-mt-1" href="contact.html">Contact the academy</a>' +
              '<div class="ax-divider">' +
                '<p class="ax-small">Sector group</p>' +
                '<a class="ax-link ax-mt-1" href="programmes.html?group=' + AX.slugParam(p.group) + '">' +
                  AX.esc(p.group) + " " + AX.icon.arrow + "</a>" +
              "</div>" +
            "</div>" +
          "</aside>" +
        "</div>" +
      "</div></section>" + relatedHTML;
  }

  function setMeta(attr, key, value) {
    var el = document.head.querySelector("meta[" + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  /* ── Careers / role finder ────────────────────────────────────────────── */
  function initCareers() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;
    var listEl = $("[data-ax-rolelist]");
    var panelEl = $("[data-ax-rolepanel]");
    var search = $("#ax-role-q");
    var countEl = $("[data-ax-rolecount]");
    if (!listEl || !panelEl) return;

    var index = AX.roleIndex();
    var active = null;

    function render(filter) {
      var q = (filter || "").trim().toLowerCase();
      var list = index.filter(function (r) {
        if (!q) return true;
        if (r.role.toLowerCase().indexOf(q) !== -1) return true;
        // Searching a sector should also surface its roles.
        return r.programmes.some(function (p) {
          return (p.division + " " + p.code + " " + p.group).toLowerCase().indexOf(q) !== -1;
        });
      });

      if (countEl) {
        countEl.innerHTML = "<b>" + list.length + "</b> of " + index.length + " career-oriented roles";
      }

      if (!list.length) {
        listEl.innerHTML = '<p class="ax-body ax-pad">No role matches that search. Try a broader word such as "executive", "assistant" or "operations".</p>';
        return;
      }

      listEl.innerHTML = list.map(function (r) {
        var on = r.role === active;
        return '<button class="ax-rolebtn" type="button" data-role="' + AX.esc(r.role) +
          '" aria-pressed="' + on + '">' +
          '<span class="ax-rolebtn__name">' + AX.esc(r.role) + "</span>" +
          '<span class="ax-rolebtn__n">' + r.programmes.length + "</span></button>";
      }).join("");

      $$(".ax-rolebtn", listEl).forEach(function (b) {
        b.addEventListener("click", function () {
          select(b.getAttribute("data-role"));
        });
      });
    }

    function select(role, skipUrl) {
      var entry = index.filter(function (r) { return r.role === role; })[0];
      if (!entry) return;
      active = role;

      $$(".ax-rolebtn", listEl).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-role") === role));
      });

      var cards = entry.programmes.map(function (p) {
        return '<a class="ax-panel ax-spot ax-pcard" href="programme.html?code=' + AX.esc(p.code) + '">' +
          '<div class="ax-pcard__top"><span class="ax-code">' + AX.esc(p.code) + "</span>" +
          '<span class="ax-pcard__num">' + AX.esc(p.group) + "</span></div>" +
          '<h4 class="ax-h3 ax-h3--sm ax-pcard__division">' + AX.esc(p.division) + "</h4>" +
          '<p class="ax-pcard__cert">' + AX.esc(p.programme) + "</p>" +
          '<p class="ax-pcard__label">Also trains for</p>' +
          '<p class="ax-body ax-body--sm ax-mt-1">' +
            AX.esc(p.careerRoles.filter(function (r) { return r !== role; }).join(" · ") || "—") + "</p>" +
        "</a>";
      }).join("");

      panelEl.innerHTML =
        '<div class="ax-panel ax-panel--pad">' +
          '<p class="ax-eyebrow">Career-oriented role</p>' +
          '<h2 class="ax-h2 ax-h2--sm ax-mt-2">' + AX.esc(role) + "</h2>" +
          '<p class="ax-body ax-mt-2">Trained for by <b class="ax-gold">' +
            entry.programmes.length + "</b> " +
            (entry.programmes.length === 1 ? "programme" : "programmes") + " at Apex.</p>" +
          '<div class="ax-grid ax-gap-md ax-mt-4">' + cards + "</div>" +
        "</div>";

      if (!skipUrl) {
        history.replaceState(null, "", "?role=" + AX.slugParam(role));
      }
      if (window.innerWidth <= 1024) {
        panelEl.scrollIntoView({ behavior: AX.reducedMotion ? "auto" : "smooth", block: "start" });
      }
    }

    if (search) {
      search.addEventListener("input", AX.debounce(function () { render(search.value); }, 160));
    }

    render("");

    var wanted = new URLSearchParams(location.search).get("role");
    if (wanted && index.some(function (r) { return r.role === wanted; })) {
      select(wanted, true);
    } else {
      // Open on the most widely shared role so the panel is never empty.
      var busiest = index.slice().sort(function (a, b) {
        return b.programmes.length - a.programmes.length || a.role.localeCompare(b.role);
      })[0];
      if (busiest) select(busiest.role, true);
    }
  }

  /* ── Gallery ──────────────────────────────────────────────────────────── */
  function initGallery() {
    var AX = window.AX, $$ = AX.$$;
    var items = $$("[data-cat]");
    var filters = $$("[data-filter]");

    filters.forEach(function (b) {
      b.addEventListener("click", function () {
        var cat = b.getAttribute("data-filter");
        filters.forEach(function (o) {
          o.setAttribute("aria-pressed", String(o === b));
        });
        items.forEach(function (it) {
          var show = cat === "all" || it.getAttribute("data-cat") === cat;
          it.hidden = !show;
        });
        AX.lightbox($$("[data-cat]").filter(function (i) { return !i.hidden; }));
      });
    });

    AX.lightbox(items);
  }

  /* ── Forms ────────────────────────────────────────────────────────────── */
  function initForms() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;

    /* Fill any programme <select> from the data, so it can never drift. */
    $$("[data-ax-programme-select]").forEach(function (sel) {
      var opts = AX.groups.map(function (g) {
        var inner = AX.inGroup(g.name).map(function (p) {
          return '<option value="' + AX.esc(p.code) + '">' + AX.esc(p.division) + " — " + AX.esc(p.code) + "</option>";
        }).join("");
        return '<optgroup label="' + AX.esc(g.name) + '">' + inner + "</optgroup>";
      }).join("");
      sel.innerHTML = '<option value="">Select a programme</option>' + opts +
        '<option value="undecided">Not decided yet</option>';

      // A ?code= or #enquiry?code= link preselects the programme.
      var m = (location.search + location.hash).match(/code=([A-Za-z]+)/);
      if (m && AX.byCode(m[1])) sel.value = AX.byCode(m[1]).code;
    });

    $$("[data-ax-form]").forEach(function (form) {
      var success = $("[data-ax-success]", form);
      var submit = $('[type="submit"]', form);

      function fieldOf(input) { return input.closest(".ax-field"); }

      function validate(input) {
        var field = fieldOf(input);
        if (!field) return true;
        var err = $(".ax-error", field);
        var value = (input.value || "").trim();
        var msg = "";

        /* A required checkbox is about checkedness, not about its value —
           an unchecked box still reports value "on". */
        if (input.type === "checkbox") {
          msg = (input.required && !input.checked)
            ? "Please tick this box to continue." : "";
          field.classList.toggle("is-invalid", !!msg);
          input.setAttribute("aria-invalid", msg ? "true" : "false");
          if (err) {
            err.textContent = msg;
            if (msg && err.id) input.setAttribute("aria-describedby", err.id);
            else input.removeAttribute("aria-describedby");
          }
          return !msg;
        }

        var matchId = input.getAttribute("data-ax-match");
        var pattern = input.getAttribute("pattern");

        if (input.required && !value) {
          msg = "This field is required.";
        } else if (matchId && value && value !== (document.getElementById(matchId) || {}).value) {
          msg = "This does not match the password above.";
        } else if (value && pattern && !new RegExp("^(?:" + pattern + ")$").test(value)) {
          msg = input.getAttribute("data-ax-pattern-msg") || "Please check the format.";
        } else if (value && input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          msg = "Enter a valid email address, for example name@example.com.";
        } else if (value && input.type === "tel" && !/^[+\d][\d\s()-]{7,17}$/.test(value)) {
          msg = "Enter a valid phone number with 8 to 18 digits.";
        } else if (value && input.minLength > 0 && value.length < input.minLength) {
          msg = "Please write at least " + input.minLength + " characters.";
        }

        field.classList.toggle("is-invalid", !!msg);
        input.setAttribute("aria-invalid", msg ? "true" : "false");
        if (err) {
          err.textContent = msg;
          // Point the control at its message so screen readers announce it.
          if (msg && err.id) input.setAttribute("aria-describedby", err.id);
          else input.removeAttribute("aria-describedby");
        }
        return !msg;
      }

      var inputs = $$("input,select,textarea", form).filter(function (i) {
        return i.type !== "submit" && i.type !== "radio";
      });

      /* Only validate a field the user has actually touched, or once the form
         has been submitted. Validating an untouched field on blur is noisy,
         and worse: the error message appears between mousedown and mouseup on
         the submit button, pushing the button away so the click never lands. */
      var submitted = false;

      inputs.forEach(function (input) {
        input.addEventListener("input", function () {
          input._axTouched = true;
          var f = fieldOf(input);
          if (f && f.classList.contains("is-invalid")) validate(input);
        });
        input.addEventListener("change", function () {
          input._axTouched = true;
          if (input.type === "checkbox" || input.tagName === "SELECT") validate(input);
        });
        input.addEventListener("blur", function () {
          if (input._axTouched || submitted) validate(input);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        submitted = true;
        var ok = true;
        var firstBad = null;
        inputs.forEach(function (input) {
          if (!validate(input)) {
            ok = false;
            if (!firstBad) firstBad = input;
          }
        });

        if (!ok) {
          if (firstBad) firstBad.focus();
          AX.toast("Please correct the highlighted fields.");
          return;
        }

        /* No endpoint is configured yet — see AX.PH.formEndpoint. The form is
           validated and acknowledged locally so the flow can be demonstrated. */
        if (submit) submit.classList.add("is-loading");
        setTimeout(function () {
          if (submit) submit.classList.remove("is-loading");
          form.reset();
          if (success) {
            success.classList.add("is-visible");
            success.setAttribute("tabindex", "-1");
            success.focus();
          }
          AX.toast("Enquiry captured.");
        }, 700);
      });
    });
  }


  /* ── Academy facts ────────────────────────────────────────────────────
     Fills every mount point that displays client-confirmed copy. Runs on
     every page; each lookup is guarded, so a page without a given mount
     simply skips it. One source of truth: AX_ACADEMY. */
  function initAcademy() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;
    var a = AX.academy || {};
    if (!a.name) return;
    var fee = a.fee || {}, batch = a.batch || {}, legal = a.legal || {};

    function put(sel, html) {
      var el = $(sel);
      if (el) el.innerHTML = html;
    }
    function list(sel, items, tag) {
      var el = $(sel);
      if (!el || !items) return;
      el.innerHTML = items.map(function (i) {
        return "<" + (tag || "li") + ">" + AX.esc(i) + "</" + (tag || "li") + ">";
      }).join("");
    }

    /* Fees. Every figure is derived from the 21 programme entries so the
       headline numbers can never drift from the programme pages. */
    function money(v) { return parseInt(String(v).replace(/[^0-9]/g, ""), 10) || 0; }
    var allFees = [];
    AX.programmes.forEach(function (pr) {
      (pr.fees || []).forEach(function (f) { if (f.total) allFees.push(f.total); });
    });
    function span(vals) {
      if (!vals.length) return "";
      var sorted = vals.slice().sort(function (x, y) { return money(x) - money(y); });
      var lo = sorted[0], hi = sorted[sorted.length - 1];
      return lo === hi ? AX.esc(lo) : AX.esc(lo) + " – " + AX.esc(hi);
    }
    put("[data-ax-fee-total]", span(allFees));
    var firsts = [];
    AX.programmes.forEach(function (pr) {
      (pr.fees || []).forEach(function (f) { if (f.first) firsts.push(f.first); });
    });
    put("[data-ax-fee-reg]", span(firsts));
    put("[data-ax-fee-emi]", AX.esc(fee.instalment || ""));
    put("[data-ax-fee-structure]", AX.esc(fee.structureNote || ""));

    /* What each length is called and what it awards. */
    var dt = $("[data-ax-durations]");
    if (dt && a.durations) {
      dt.innerHTML = '<table class="ax-table"><thead><tr>' +
        '<th scope="col">Length</th><th scope="col">Training hours</th>' +
        '<th scope="col">Course category</th>' +
        '<th scope="col">Award on completion</th></tr></thead><tbody>' +
        a.durations.map(function (d) {
          return '<tr><td data-th="Length"><b class="ax-gold">' + AX.esc(d.label) + "</b></td>" +
            '<td data-th="Training hours">' + AX.esc(d.hours || "") + "</td>" +
            '<td data-th="Category">' + AX.esc(d.category) + "</td>" +
            '<td data-th="Award">' + AX.esc(d.award) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }

    /* The full fee matrix: 21 programmes x 3 lengths. */
    var ft = $("[data-ax-fee-table]");
    if (ft && a.durations) {
      var head = a.durations.map(function (d) {
        return '<th scope="col">' + AX.esc(d.label) + "</th>";
      }).join("");
      ft.innerHTML = '<table class="ax-table"><caption class="ax-sr">Programme fees by length</caption>' +
        '<thead><tr><th scope="col">Code</th><th scope="col">Division</th>' + head +
        "</tr></thead><tbody>" +
        AX.programmes.map(function (pr) {
          var cells = a.durations.map(function (d) {
            var f = (pr.fees || []).filter(function (x) { return x.months === d.months; })[0] || {};
            return '<td data-th="' + AX.esc(d.label) + '">' + AX.esc(f.total || "—") + "</td>";
          }).join("");
          return '<tr><td data-th="Code"><span class="ax-code">' + AX.esc(pr.code) + "</span></td>" +
            '<td data-th="Division"><a href="programme.html?code=' + AX.esc(pr.code) + '">' +
              AX.esc(pr.division) + "</a></td>" + cells + "</tr>";
        }).join("") + "</tbody></table>";
    }

    /* Eligibility + age */
    var elig = $("[data-ax-eligibility]");
    if (elig && a.eligibilityOptions) {
      elig.setAttribute("data-note", a.eligibility || "");
      elig.innerHTML = '<table class="ax-table ax-table--spec"><tbody>' +
        a.eligibilityOptions.map(function (r) {
          return '<tr><th scope="row">' + AX.esc(r[0]) + "</th><td>" + AX.esc(r[1]) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    put("[data-ax-eligibility-note]", AX.esc(a.eligibilityNote || ""));
    put("[data-ax-batch-open]", AX.esc(a.batch ? a.batch.open : ""));
    put("[data-ax-age]", "<strong class=\"ax-gold\">Age requirement.</strong> " + AX.esc(a.ageRequirement || ""));

    /* Documents */
    list("[data-ax-documents]", a.documents);
    put("[data-ax-doc-warning]", AX.icon.info + "<span>" + AX.esc(a.documentsWarning || "") + "</span>");

    /* Batches and modes */
    put("[data-ax-batch-types]", AX.esc(batch.types || ""));
    put("[data-ax-batch-rolling]", AX.esc(batch.rolling || ""));
    list("[data-ax-modes]", a.learningModes);
    put("[data-ax-mode-note]", AX.esc(a.learningModeNote || ""));

    /* About */
    put("[data-ax-about-intro]", AX.esc(a.about ? a.about.intro : ""));
    put("[data-ax-about-aim]", AX.esc(a.about ? a.about.aim : ""));
    put("[data-ax-about-audience]", AX.esc(a.about ? a.about.audience : ""));
    put("[data-ax-about-background]", AX.esc(a.about ? a.about.background : ""));
    list("[data-ax-approach]", a.approach);
    put("[data-ax-established]", AX.esc(a.established || ""));
    put("[data-ax-founder]", AX.esc(a.founder || ""));
    put("[data-ax-positioning]", AX.esc(a.positioning || ""));
    put("[data-ax-supporting]", AX.esc(a.supportingLine || ""));
    put("[data-ax-career-statement]", AX.esc(a.careerStatement || ""));
    put("[data-ax-certificate-desc]", AX.esc(a.certificate ? a.certificate.description : ""));
    put("[data-ax-certificate-caution]",
        AX.icon.info + "<span>" + AX.esc(a.certificate ? a.certificate.caution : "") + "</span>");

    /* Contact */
    var addr = $("[data-ax-address]");
    if (addr && a.address) {
      addr.innerHTML = a.address.lines.map(AX.esc).join("<br>");
    }
    put("[data-ax-hours]", a.hours
      ? AX.esc(a.hours.weekdays) + "<br>" + AX.esc(a.hours.sunday) : "");
    put("[data-ax-desk]", AX.esc(a.admissionsDesk || ""));

    /* Map. Built from AX_ACADEMY.mapQuery; output=embed needs no API key. */
    var map = $("[data-ax-map]");
    if (map && a.mapQuery) {
      var q = encodeURIComponent(a.mapQuery);
      map.innerHTML =
        '<div class="ax-map ax-map--live">' +
          '<iframe src="https://www.google.com/maps?q=' + q + '&output=embed" ' +
            'title="Map showing the location of Apex Professional Academy, Puncha, Purulia" ' +
            'loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
            'allowfullscreen></iframe>' +
        "</div>" +
        '<a class="ax-link ax-mt-3" target="_blank" rel="noopener noreferrer" ' +
          'href="https://www.google.com/maps/search/?api=1&query=' + q + '">' +
          "Open in Google Maps " + AX.icon.arrow + "</a>";
    }

    /* Legal */
    list("[data-ax-fee-policy]", legal.feePolicy, "p");
    put("[data-ax-refund-intro]", AX.esc(legal.refundIntro || ""));
    var refund = $("[data-ax-refund]");
    if (refund && legal.refundSections) {
      refund.innerHTML = legal.refundSections.map(function (sec) {
        return "<h3>" + AX.esc(sec[0]) + "</h3>" +
          sec[1].map(function (t) { return "<p>" + AX.esc(t) + "</p>"; }).join("");
      }).join("");
    }
    put("[data-ax-refund-processing]", AX.esc(legal.refundProcessing || ""));
    put("[data-ax-transfer-intro]", AX.esc(legal.transferIntro || ""));
    list("[data-ax-transfer-factors]", legal.transferFactors);
    put("[data-ax-transfer-fee]", AX.esc(legal.transferFee || ""));
    list("[data-ax-data-purposes]", legal.dataPurposes);
    put("[data-ax-data-retention]", AX.esc(legal.dataRetention || ""));
    list("[data-ax-disclaimer]", legal.disclaimer, "p");
  }

  /* ── Portal, application and payment ─────────────────────────────────
     None of these submit anywhere yet. They validate, calculate and show
     state so the flow can be reviewed and wired to a backend later. */

  function money(v) { return parseInt(String(v).replace(/[^0-9]/g, ""), 10) || 0; }
  function rupees(n) { return "₹" + n.toLocaleString("en-IN"); }

  function feeOf(prog, months) {
    var list = (prog && prog.fees) || [];
    for (var i = 0; i < list.length; i++) if (list[i].months === months) return list[i];
    return null;
  }

  /* Reveal control on password fields. */
  function initPasswordToggles() {
    var AX = window.AX;
    AX.$$("[data-ax-pw-toggle]").forEach(function (btn) {
      var input = document.getElementById(btn.getAttribute("aria-controls"));
      if (!input) return;
      btn.addEventListener("click", function () {
        var shown = input.type === "text";
        input.type = shown ? "password" : "text";
        btn.textContent = shown ? "Show" : "Hide";
        btn.setAttribute("aria-pressed", String(!shown));
        input.focus();
      });
    });
  }

  /* "Forgot password" has nowhere to go until auth exists — say so plainly
     rather than leaving a dead link. */
  function initAuth() {
    var AX = window.AX;
    initPasswordToggles();
    var forgot = AX.$("[data-ax-forgot]");
    if (forgot) {
      forgot.addEventListener("click", function (e) {
        e.preventDefault();
        AX.toast("Password reset needs the authentication service to be connected.");
      });
    }
  }

  /* Fills a length <select> from AX_ACADEMY.durations. */
  function fillLengthSelect(sel, months) {
    var AX = window.AX, ds = (AX.academy || {}).durations || [];
    sel.innerHTML = ds.map(function (d) {
      return '<option value="' + d.months + '"' +
        (d.months === months ? " selected" : "") + ">" +
        AX.esc(d.label + " — " + d.category) + "</option>";
    }).join("");
  }

  /* ── Admission form ─────────────────────────────────────────────────── */
  function initApply() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;
    var progSel = $("#a-prog");
    var lenWrap = $("[data-ax-lengths]");
    if (!progSel || !lenWrap) return;

    var ds = (AX.academy || {}).durations || [];
    var chosenMonths = 3;

    /* Document checklist, from the same list the admissions page shows. */
    var ul = $("[data-ax-upload-list]");
    if (ul) {
      ul.innerHTML = ((AX.academy || {}).documents || []).map(function (d) {
        return '<li><span class="ax-uploads__name">' + AX.esc(d) + "</span>" +
          '<span class="ax-small">to bring</span></li>';
      }).join("");
    }

    function renderLengths() {
      var prog = AX.byCode(progSel.value);
      lenWrap.innerHTML = ds.map(function (d) {
        var f = prog ? feeOf(prog, d.months) : null;
        return '<label><input type="radio" name="months" value="' + d.months + '"' +
            (d.months === chosenMonths ? " checked" : "") + ">" +
          '<span class="ax-payopt__body">' +
            '<span class="ax-payopt__title">' + AX.esc(d.label) +
              '<span class="ax-payopt__amount">' +
                (f ? AX.esc(f.total) : "—") + "</span></span>" +
            '<span class="ax-payopt__note">' + AX.esc(d.category + " · " + d.award) +
            "</span>" +
          "</span></label>";
      }).join("");
      $$('input[name="months"]', lenWrap).forEach(function (r) {
        r.addEventListener("change", function () {
          chosenMonths = parseInt(r.value, 10);
          renderSummary();
        });
      });
    }

    function renderSummary() {
      var prog = AX.byCode(progSel.value);
      var d = ds.filter(function (x) { return x.months === chosenMonths; })[0];
      var title = $("[data-ax-sum-title]"), sub = $("[data-ax-sum-sub]");
      var rows = $("[data-ax-sum-rows]"), link = $("[data-ax-sum-link]");

      if (!prog) {
        if (title) title.textContent = "No programme selected";
        if (sub) sub.textContent = "Choose a programme and length to see the fee.";
        if (rows) rows.innerHTML = "";
        if (link) { link.textContent = "Compare all programmes"; link.href = "programmes.html"; }
        return;
      }

      var f = feeOf(prog, chosenMonths) || {};
      if (title) title.textContent = prog.division;
      if (sub) sub.textContent = prog.programme;
      if (link) {
        link.textContent = "View programme details";
        link.href = "programme.html?code=" + encodeURIComponent(prog.code);
      }
      if (!rows) return;

      var balance = f.first ? rupees(money(f.total) - money(f.first)) : null;
      rows.innerHTML =
        '<div class="ax-summary__row"><span>Programme code</span><span>' + AX.esc(prog.code) + "</span></div>" +
        '<div class="ax-summary__row"><span>Length</span><span>' + AX.esc(d ? d.label : "") + "</span></div>" +
        '<div class="ax-summary__row"><span>Award</span><span>' + AX.esc(d ? d.award : "") + "</span></div>" +
        '<div class="ax-summary__row"><span>First instalment</span><span>' +
          (f.first ? AX.esc(f.first)
                   : AX.esc(((AX.academy || {}).fee || {}).emiOnRequest || "EMI on request")) +
        "</span></div>" +
        (balance
          ? '<div class="ax-summary__row"><span>Balance</span><span>' + balance + "</span></div>"
          : "") +
        '<div class="ax-summary__row ax-summary__row--total"><span>Total fee</span><span>' +
          AX.esc(f.total || "—") + "</span></div>";
    }

    progSel.addEventListener("change", function () { renderLengths(); renderSummary(); });
    renderLengths();
    renderSummary();
    initPasswordToggles();

    /* A ?code= link from a programme page preselects it. */
    var wanted = new URLSearchParams(location.search).get("code");
    if (wanted && AX.byCode(wanted)) {
      progSel.value = AX.byCode(wanted).code;
      renderLengths();
      renderSummary();
    }
  }

  /* ── Payment ────────────────────────────────────────────────────────── */
  function initPayment() {
    var AX = window.AX, $ = AX.$, $$ = AX.$$;
    var progSel = $("#p-prog"), lenSel = $("[data-ax-length-select]");
    var opts = $("[data-ax-payopts]");
    if (!progSel || !lenSel || !opts) return;

    var params = new URLSearchParams(location.search);
    var months = parseInt(params.get("months"), 10) || 3;
    fillLengthSelect(lenSel, months);

    var code = params.get("code");
    if (code && AX.byCode(code)) progSel.value = AX.byCode(code).code;

    function current() {
      var prog = AX.byCode(progSel.value);
      var m = parseInt(lenSel.value, 10) || 3;
      return { prog: prog, months: m, fee: prog ? feeOf(prog, m) : null };
    }

    function renderOptions() {
      var c = current();
      if (!c.prog || !c.fee) {
        opts.innerHTML = '<p class="ax-body ax-body--sm">Select a programme to see the amounts.</p>';
        return;
      }
      var total = money(c.fee.total);
      var first = c.fee.first ? money(c.fee.first) : null;
      var choices = [];
      if (first) {
        choices.push(["first", "Pay the first instalment", rupees(first),
          "Secures your place. The balance of " + rupees(total - first) +
          " is payable on the schedule agreed at enrolment."]);
      }
      choices.push(["full", "Pay the full fee", rupees(total),
        "Settles the programme fee in one payment."]);

      opts.innerHTML = choices.map(function (c2, i) {
        return '<label><input type="radio" name="payAmount" value="' + c2[0] + '"' +
            (i === 0 ? " checked" : "") + ">" +
          '<span class="ax-payopt__body"><span class="ax-payopt__title">' + AX.esc(c2[1]) +
            '<span class="ax-payopt__amount">' + AX.esc(c2[2]) + "</span></span>" +
            '<span class="ax-payopt__note">' + AX.esc(c2[3]) + "</span></span></label>";
      }).join("");
      $$('input[name="payAmount"]', opts).forEach(function (r) {
        r.addEventListener("change", renderSummary);
      });
      if (!first) {
        var note = ((AX.academy || {}).fee || {}).emiOnRequestNote || "";
        opts.insertAdjacentHTML("beforeend",
          '<p class="ax-small">' + AX.esc(note) +
          " Only the full fee can be paid online here.</p>");
      }
    }

    function renderSummary() {
      var c = current();
      var title = $("[data-ax-pay-title]"), box = $("[data-ax-pay-summary]");
      var btn = $("[data-ax-pay-btn]");
      if (!box) return;

      if (!c.prog || !c.fee) {
        if (title) title.textContent = "No programme selected";
        box.innerHTML = '<p class="ax-body ax-body--sm">Choose a programme and length.</p>';
        if (btn) btn.setAttribute("aria-disabled", "true");
        return;
      }
      if (btn) btn.removeAttribute("aria-disabled");

      var picked = $('input[name="payAmount"]:checked');
      var payFull = !picked || picked.value === "full";
      var total = money(c.fee.total);
      var first = c.fee.first ? money(c.fee.first) : null;
      var amount = (!payFull && first) ? first : total;
      var d = ((AX.academy || {}).durations || [])
        .filter(function (x) { return x.months === c.months; })[0];

      if (title) title.textContent = c.prog.division;
      box.innerHTML =
        '<div class="ax-summary__row"><span>Programme</span><span>' + AX.esc(c.prog.code) + "</span></div>" +
        '<div class="ax-summary__row"><span>Length</span><span>' + AX.esc(d ? d.label : "") + "</span></div>" +
        '<div class="ax-summary__row"><span>Total programme fee</span><span>' + AX.esc(c.fee.total) + "</span></div>" +
        (!payFull && first
          ? '<div class="ax-summary__row"><span>Balance after this payment</span><span>' +
            rupees(total - first) + "</span></div>"
          : "") +
        '<div class="ax-summary__row ax-summary__row--total"><span>Paying now</span><span>' +
          rupees(amount) + "</span></div>";
    }

    progSel.addEventListener("change", function () { renderOptions(); renderSummary(); });
    lenSel.addEventListener("change", function () { renderOptions(); renderSummary(); });
    renderOptions();
    renderSummary();
  }

  /* ── Payment outcome ────────────────────────────────────────────────── */
  function initPaymentStatus() {
    var AX = window.AX;
    var root = AX.$("[data-ax-status]");
    if (!root) return;

    var params = new URLSearchParams(location.search);
    var status = (params.get("status") || "pending").toLowerCase();
    var ref = params.get("ref") || "";

    var STATES = {
      success: ["ok",
        '<path d="M6 15.5l6 6 13-13" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
        "Payment received",
        "Thank you. Your payment has been recorded and a receipt will be sent to the email address on your application.",
        "What happens next: the Admissions Desk confirms your enrolment and shares your batch details."],
      failed: ["bad",
        '<path d="M9 9l14 14M23 9L9 23" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>',
        "Payment not completed",
        "The payment did not go through and you have not been charged. This is usually a bank timeout or a cancelled transaction.",
        "You can try again, or pay at the Admissions Desk during office hours."],
      pending: ["",
        '<circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="3" fill="none"/><path d="M16 9v7.5l5 3" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>',
        "Payment pending",
        "Your bank has not confirmed this payment yet. It can take a few minutes. Please do not pay again until this clears.",
        "If the amount has left your account but this page still says pending after 30 minutes, contact the Admissions Desk with your reference number."]
    };
    var st = STATES[status] || STATES.pending;

    root.innerHTML = '<div class="ax-container ax-container--narrow">' +
      '<div class="ax-outcome">' +
        '<div class="ax-outcome__mark' + (st[0] ? " ax-outcome__mark--" + st[0] : "") + '">' +
          '<svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">' + st[1] + "</svg>" +
        "</div>" +
        '<h1 class="ax-h2 ax-h2--sm">' + AX.esc(st[2]) + "</h1>" +
        '<p class="ax-lead ax-mt-3">' + AX.esc(st[3]) + "</p>" +
        '<p class="ax-body ax-mt-3">' + AX.esc(st[4]) + "</p>" +
        (ref
          ? '<div class="ax-panel ax-panel--pad ax-mt-4"><div class="ax-summary__row">' +
            "<span>Reference</span><span>" + AX.esc(ref) + "</span></div></div>"
          : "") +
        '<div class="ax-cluster ax-mt-5">' +
          (status === "failed"
            ? '<a class="ax-btn ax-btn--gold ax-btn--lg" href="payment.html">Try again</a>'
            : '<a class="ax-btn ax-btn--gold ax-btn--lg" href="index.html">Back to home</a>') +
          '<a class="ax-btn ax-btn--glass ax-btn--lg" href="contact.html">Contact admissions</a>' +
        "</div>" +
        '<p class="ax-small ax-mt-5">This page reads the outcome from the link the payment ' +
          "gateway returns. Until a gateway is connected it shows the pending state by default.</p>" +
      "</div></div>";

    document.title = st[2] + " | Apex Professional Academy";
  }

  /* ── Dispatch ─────────────────────────────────────────────────────────── */
  var PAGES = {
    home: initHome,
    programmes: initProgrammes,
    programme: initDetail,
    careers: initCareers,
    gallery: initGallery,
    auth: initAuth,
    apply: initApply,
    payment: initPayment,
    "payment-status": initPaymentStatus
  };

  window.AX_PAGE = ready(function () {
    /* These run first because they populate shared controls — notably the
       programme <select>, which the apply and payment modules then read and
       preselect from a ?code= link. */
    initAcademy();
    initForms();

    var key = document.body.getAttribute("data-page");
    if (PAGES[key]) PAGES[key]();
  });
})();

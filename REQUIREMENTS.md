# Apex Professional Academy — requirements & handover

The single reference file for this project. **Section 1 is what is still needed**;
everything after it is reference for building and maintaining the site.

- **Client:** Apex Professional Academy, under Apex Institute of Multidisciplinary
  Professional Studies (APA / AIMPS).
- **The one idea:** every programme maps to named **career-oriented roles**, and the site
  works in both directions — programme → roles, and role → programmes.
- **Status:** 15 pages, 21 divisions, 82 career-oriented roles, all delivered online.
  80/80 functional checks and 210/210 responsive combinations passing, no console
  errors. Not yet live.

---

## 1. Outstanding

All front-end content is complete and approved. **18 placeholder tokens remain**, and
every one of them is waiting on the backend phase or the graphics team rather than on a
content decision. Each renders as a visible gold dashed chip on the page, so nothing can
ship unnoticed.

### 1.1 From the client — contact details

Being handled as part of the backend work, but the values still have to come from the
Academy.

| Needed | Appears on |
|---|---|
| Primary phone number | contact, admissions, apply |
| WhatsApp number | contact |
| Secondary phone number | contact |
| Admissions email address | contact, disclaimer |
| General enquiries email address | contact |

### 1.2 From the client — legal

Also flagged for the backend work; the values are the Academy’s to set.

| Needed | Appears on |
|---|---|
| Legal / registration status | about, disclaimer |
| Transfer request period | disclaimer |
| Enquiry record retention period | disclaimer |
| Student academic record retention period | disclaimer |
| Policy effective date | disclaimer |
| Policy last-updated date | disclaimer |
| Policy version | disclaimer |

The policy page should not go live with the dates unfilled.

### 1.3 Deferred to the backend phase

Confirmed as not blocking the front end; values still come from the Academy.

| Needed | Appears on |
|---|---|
| Faculty names, designations, qualifications and profiles | about |
| Official social profile URLs ×4 | footer, every page |

### 1.4 Settled — do not re-ask the client

Training hours (120 / 240 / 480 by length) · eligibility (Intermediate, Class 12 or above,
uniform across the register) · admission open all year with no fixed intakes · **all
training delivered online**, no classroom attendance · all 63 fee figures · EMI on request
for the 6- and 12-month courses · the refund, transfer and privacy policies · address,
office hours, established 2010, founder · the full division list.

**Division list — complete.** Three renames kept their code, training areas and roles;
three were withdrawn; three are new:

| Change | Divisions |
|---|---|
| Renamed | IT & Technology → **Information Technology** (ITITC) · Civil Engineering → **Construction** (CETC) · Finance & Accounting → **Finance** (FITC) |
| Withdrawn | Healthcare (HIMTC) · Driver Services (DITC) · Electrical Engineering (EETC) |
| New | **Infrastructure** (IITC) · **Agriculture** (AITC) · **Insurance** (INITC) |

The register holds 21 divisions and the role index stands at **82 roles**. Withdrawn
divisions' old URLs show a "programme not found" page.

**Provenance worth keeping.** For the three new divisions, the certificate codes and the
curriculum — training areas and career-oriented roles — were **drafted by the developer,
not supplied by the Academy, and then reviewed and approved by the client.** They follow
the pattern of the other 18 and reuse existing role names where the work genuinely
overlaps, so the role finder cross-links correctly (Documentation Executive now spans 4
programmes, Customer Service Executive 6). If anyone later asks where Agriculture's
syllabus came from, this is the answer.

**One loose end from going online-only:** the gallery still has a "Classrooms" filter with
classroom captions, and the About page references the campus. That is arguably fine — the
Academy has a physical office and Admissions Desk — but if it should read as fully remote,
those captions and that filter need rewording once the real photography lands.

### 1.5 From the graphics team

19 image slots still show generated placeholders — full spec in section 7. Plus the logo
files, which is the one place the dark design is currently compromised: the header shows
the supplied JPEG on a white chip because it has no transparency.

| Asset | Size | Format |
|---|---|---|
| Transparent logo | 1200 × 1200 | PNG with alpha |
| Vector master | — | SVG |
| Horizontal lockup | 1600 × 400 | PNG + SVG |
| **Reversed lockup** (white/gold on navy) | 1600 × 400 | PNG + SVG |
| Monogram favicon | 512 × 512 | PNG |

### 1.6 Backend and hosting — your side, not the client's

| Needed | Unblocks |
|---|---|
| Form submission endpoint | enquiry, contact and admission forms |
| Authentication service | login, register |
| Payment gateway + merchant key | payment, payment-status |
| Document upload / storage service | document upload on the admission form |
| Live domain | replaces `https://example.com/` in `sitemap.xml` and `robots.txt` |

Section 8 has the wiring instructions for each.

### 1.7 QA not yet performed

- **Lighthouse.** Targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95,
  SEO ≥ 95. Run against a served URL, not `file://`, or the numbers are meaningless.
- **Real iOS Safari and Android Chrome.** All automated testing is Chromium.
  `backdrop-filter`, `100svh` and `text-wrap:balance` are the most likely to differ.
- **The Google Map** renders blank in headless Chromium (no GPU). The embed is confirmed
  working by HTTP check, but open `contact.html` in a normal browser to see it paint.

---

## 2. How to run it

It is a static site with no build step.

```
# Option A — just open it
double-click index.html

# Option B — any static server (nicer URLs, correct caching)
python -m http.server 8000      # then open http://localhost:8000
npx serve .
```

The programme data ships as `assets/data/programmes.js` (a plain script setting
`window.AX_PROGRAMMES`) rather than JSON, specifically so **Option A works** — a `fetch()`
of a local `.json` file is blocked by the browser's `file://` origin rules.

---

## 3. File structure

```
ApexF/
├─ index.html            Home
├─ about.html            About + training approach
├─ programmes.html       All 21, searchable + static A–Z index
├─ programme.html        Detail template, driven by ?code=
├─ careers.html          Role finder (reverse index)
├─ admissions.html       Process, fees, documents, FAQ, enquiry form
├─ gallery.html          Filterable mosaic + lightbox
├─ contact.html          Contact details, live map, message form
├─ disclaimer.html       Institute policy, refund policy, terms, privacy
├─ 404.html
├─ apply.html            Admission form, live fee summary
├─ login.html            Student portal sign in
├─ register.html         Student account creation
├─ payment.html          Fee payment, gateway handoff
├─ payment-status.html   Gateway return (?status=success|failed|pending)
├─ REQUIREMENTS.md       ← this file
├─ robots.txt            transactional pages disallowed
├─ sitemap.xml           30 URLs: 9 pages + 21 programmes
└─ assets/
   ├─ css/apex.css       The whole design system, one file, 19 numbered sections
   ├─ js/
   │  ├─ apex.js         Core: data, header/footer, nav, motion, UI primitives
   │  └─ pages.js        Page behaviour, dispatched by <body data-page>
   ├─ data/programmes.js SINGLE SOURCE OF TRUTH — programmes, fees, academy, legal copy
   ├─ brand/apexlogo.jpeg
   └─ img/               19 generated SVG placeholders
```

**Load order matters:** GSAP → `programmes.js` → `pages.js` → `apex.js`. `pages.js` only
defines `window.AX_PAGE`; `apex.js` mounts the chrome then calls it. Inside `AX_PAGE`,
shared controls are populated *before* the page module runs, because the apply and
payment modules read the programme `<select>` to preselect from a `?code=` link.

---

## 4. Design system — "Midnight Luxe"

Dark-first throughout: one continuous midnight-navy room with fixed gold and azure light
blooms behind every page, rather than alternating light/dark chapters. Glass panels catch
a gold bevel along their top edge, and a gold bloom tracks the pointer across them.

### Colour tokens (`assets/css/apex.css`)

| Token | Value | Use |
|---|---|---|
| `--ax-void` | `#04070E` | page base |
| `--ax-ink` / `--ax-ink-2` / `--ax-ink-3` / `--ax-ink-4` | `#070C18` → `#14203E` | raised surfaces |
| `--ax-navy` | `#143163` | the logo navy, brand moments only |
| `--ax-azure` | `#3E7BFA` | cool light in blooms only, never a brand colour |
| `--ax-gold` | `#C9A24B` | the logo swoosh — primary accent |
| `--ax-gold-2` | `#E6C97E` | gold text on dark (this is the one used for body-adjacent gold) |
| `--ax-gold-3` | `#F6E7C0` | gradient highlight |
| `--ax-text` | `#EDF1F9` | body text |
| `--ax-muted` | `#9DABC6` | secondary text |
| `--ax-dim` | `#6B7A99` | meta text |

**Colour discipline.** Navy is the structure, gold is the emphasis. Gold appears on
primary CTAs, rules, active states, badges and role markers. Gold is never a large
background and never small body text. On this dark background `--ax-gold-2` is used for
gold text (contrast ≈ 9.6:1 on `--ax-void`); raw `--ax-gold` is reserved for borders,
icons and 20px+ display type.

### Typography

| Role | Family | Notes |
|---|---|---|
| Display / headings / buttons / nav | **Sora** 400–800 | geometric, tight tracking |
| Accent word inside a headline | **Instrument Serif** 400 italic | set in a gold gradient, `.ax-serif` |
| Body / UI | **Inter** 400–600 | 1.7 line-height, 62–68ch measure |

The signature move is one italic serif word in gold inside an otherwise tight sans
headline — *role*, *place*, *course*, *move*, *work*, *seat*, *frames*. Use it once per
headline, never twice.

### Geometry & depth

- Radii: 6px controls · 10px inputs/small · 16px media · 22px cards/panels · 30px CTA band · pill buttons.
- Depth on glass: 1px `rgba(255,255,255,.08)` border + `0 24px 70px -34px rgba(0,0,0,.9)`.
- Hover on a card: `translateY(-6px)`, border turns gold, gold-tinted shadow.
- The gold hairline frame (`.ax-framed`) sits 8px outside the image edge — the container
  carries the offset, the photo is never cropped for it.

### The rising diagonal

The logo's gold swoosh, abstracted. It appears **exactly three times**: the hero, the
career-pathways section, and the closing CTA on the homepage. It is never used as
decoration anywhere else. All three instances share one `<linearGradient id="axGoldGrad">`
defined once per page in a zero-size `<svg class="ax-defs">`.

### Explicitly avoided

Cream backgrounds, terracotta, ALL-CAPS eyebrows on every section, `01/02/03` numbering on
non-sequential content, `→` appended to every link, middle-dot meta strings, identical
grey-shadowed cards, and the glassmorphism-on-a-gradient-blob hero.

---

### Two CSS ordering traps

Both of these have already caused a visible bug once:

1. **Section 19 is appended after the responsive section.** A touch override written into
   the `@media (max-width:1024px)` block in section 18 is overruled by a base rule in
   section 19. Put the media query next to the rule it overrides.
2. **Never lift content with a `body > *` rule.** That selector outranks the single-class
   rules on `.ax-header`, `.ax-drawer` and `.ax-skip` and drops them out of fixed
   positioning. The atmosphere sits at `z-index:-1` instead.

---

## 5. Motion

| # | What | How |
|---|---|---|
| 1 | Hero load | One GSAP timeline under 2.2s: nav fade → headline lines unmask from below (stagger .085) → gold diagonal draws upward via `strokeDashoffset` → copy and image cluster settle. Runs **once per session** (`sessionStorage`). |
| 2 | Career pathways | The only pinned scroll on the site. Pinned ~1.5 viewports above 1024px; role nodes light in sequence and programme chips fade in. Falls back to a non-pinned scrub on small screens. |
| 3 | Marquee | GSAP infinite loop of the 21 division names, speed normalised to content width. Pauses on hover, on `focusin`, and when off-screen (IntersectionObserver). |
| 4 | Card reveals | `IntersectionObserver` + CSS transition, staggered by `--d`. One observer, not one trigger per card. |
| 5 | Interaction | Mega-menu, drawer, accordion, lightbox, view toggle: 0.2–0.35s, `power2.out` equivalent easing. |

**Reduced motion.** `prefers-reduced-motion` is checked once at boot. When set: everything
jumps to its final state, the marquee never starts, pinning is skipped, counters print
their final value, and the atmospheric orbs stop drifting.

`ScrollTrigger.refresh()` is debounced on resize (220ms). Every timeline guards for a
missing trigger element, so no page throws because it lacks a given block.

---

## 6. Content rules

### Compliance copy — mandatory, unaltered

Both statements live in **one place** (`AX_COMPLIANCE` in `assets/data/programmes.js`) and
are rendered from there wherever JavaScript builds the markup. Where they are hand-written
into a page, the wording is identical.

**A. Institute policy — footer of every page, and `disclaimer.html`:**

> Apex Professional Academy clearly distinguishes its own training certificates from
> government, university, statutory-board or professional-licensing qualifications. Any
> claim of affiliation, approval, accreditation or recognition is published only when
> supported by the applicable official authorisation or agreement.

**B. Non-guarantee — every programme detail page directly beneath the roles list, the
career-support block, the top of `careers.html`, the programmes listing, the admissions
form, and `disclaimer.html`:**

> Completion of a training programme does not automatically guarantee employment,
> appointment, government recruitment, professional registration or a particular salary.

### Framing of roles

Roles are always labelled **"Career-oriented roles this programme trains for"**. Never
"jobs you will get", never "guaranteed placements", never accompanied by a salary figure.

### Voice

Plain, confident, specific. Sentence case. Active voice. No *world-class*, *unmatched*,
*100% placement*, *transform your life*.

### No invented facts

Accreditation, placement rates, fees, batch sizes, year established, faculty, testimonials
and partner companies are **not** on this site. Anything unknown is a `{{PLACEHOLDER}}`
token, listed in section 1.

---

### Payments — a standing constraint

**No card fields anywhere on this site.** Collecting card numbers in our own form pulls
the Academy into PCI-DSS scope and real liability. `payment.html` collects payer identity
only and hands off to a gateway, which takes card, UPI and net-banking details on its own
secure page. When wiring the gateway, integrate its checkout — **do not add card fields.**

---

## 7. Image schedule

19 slots render a generated SVG placeholder from `assets/img/`. Each placeholder prints
its own slot name and required pixel size, so a screenshot of any page doubles as a brief.

- Every `<img>` already has explicit `width`/`height` and a descriptive `alt`. Keep them.
- Hero images are `fetchpriority="high"`; everything below the fold is `loading="lazy"`.
- Containers use `aspect-ratio`, so nothing shifts when real photos land.
- Deliver **WebP + JPEG** for every photographic slot; swap `.svg` for `.webp`/`.jpg` in
  the `src` and add a `<picture>` wrapper with the WebP source.
- Naming convention for finals: `ax-[page]-[slot]-[index].jpg`, e.g. `ax-home-hero-01.jpg`.
- The gold hairline frame needs 8px of breathing room around framed images — that is
  handled in CSS, so **do not** add a border to the photo itself.
- No faces of identifiable students without written consent.

| # | Slot | Current file | Exact size (px) | Ratio | Max size | Subject |
|---|---|---|---|---|---|---|
| 1 | Home hero — tall | `ph-hero-tall.svg` | 1000 × 1400 | 5:7 | 300 KB | A training session in progress, vertical crop, people mid-task rather than posed |
| 2 | Home hero — cluster A | `ph-hero-sq-1.svg` | 700 × 700 | 1:1 | 150 KB | Close detail: hands, equipment, a document or a counter |
| 3 | Home hero — cluster B | `ph-hero-sq-2.svg` | 700 × 700 | 1:1 | 150 KB | Two or three learners working together |
| 4 | Group tile — Transport | `ph-group-1.svg` | 900 × 1100 | 9:11 | 220 KB | Station, platform, airport counter or warehouse floor |
| 5 | Group tile — Hospitality | `ph-group-2.svg` | 900 × 1100 | 9:11 | 220 KB | Hotel front desk, travel counter or store floor |
| 6 | Group tile — Health | `ph-group-3.svg` | 900 × 1100 | 9:11 | 220 KB | Hospital reception or pharmacy counter (no patients) |
| 7 | Group tile — Business | `ph-group-4.svg` | 900 × 1100 | 9:11 | 220 KB | Office, computer lab or workshop bench |
| 8 | About — wide | `ph-about-wide.svg` | 1600 × 1067 | 3:2 | 280 KB | The academy building or main hall |
| 9 | About — tall | `ph-about-tall.svg` | 1067 × 1600 | 2:3 | 280 KB | Training in progress, vertical |
| 10–13 | Gallery — landscape ×4 | `ph-gallery-land-1…4.svg` | 1600 × 1067 | 3:2 | 280 KB | Entrance/reception · communication training · study area · main hall |
| 14–15 | Gallery — portrait ×2 | `ph-gallery-port-1…2.svg` | 1067 × 1600 | 2:3 | 280 KB | Practical session · student portrait |
| 16–18 | Gallery — square ×3 | `ph-gallery-sq-1…3.svg` | 1200 × 1200 | 1:1 | 220 KB | Classroom · students together · equipment handling |
| 19 | OG / social share | `ph-og.svg` | 1200 × 630 | 1.91:1 | 200 KB | Logo lockup on navy with the academy name, safe margins |

Four slots the layout does **not** currently use, kept here because the client
may want them later. No placeholder ships for them, so nothing is broken by
their absence: a programme-detail banner (1920 × 720, 8:3), a career-pathways
background (2400 × 1400, 12:7), a closing-CTA background (2400 × 900, 8:3) and
faculty portraits (800 × 1000, 4:5). The Midnight Luxe direction uses light and
gradient in those places rather than photography; faculty portraits go in once
names are confirmed — see the `faculty names and profiles` placeholder.

Four slots the layout does not currently use, kept in case they are wanted later: a
programme-detail banner (1920 × 720), a career-pathways background (2400 × 1400), a
closing-CTA background (2400 × 900) and faculty portraits (800 × 1000). The design uses
light and gradient in those places instead; faculty portraits go in once names are
confirmed.

---

## 8. How to extend it

### Add or edit a programme

Edit **`assets/data/programmes.js` only**. Append an object with the full schema
(`id, number, division, code, certificate, programme, group, intro, trainingAreas[],
careerRoles[], slug`). Everything updates automatically: the listing, the register table,
the mega-menu, the drawer, the marquee, the footer's popular roles, the hero counters, the
programme select in both forms, and the role reverse-index.

Two manual follow-ups, because they are static by design:
1. Add the code to the A–Z index at the bottom of `programmes.html` (crawlable without JS).
2. Add the `programme.html?code=XXX` URL to `sitemap.xml`.

### How the role index is derived

`AX.roleIndex()` in `apex.js` walks every programme's `careerRoles`, builds a
`role → programmes[]` map, sorts it alphabetically and memoises it. **There is no second
list of roles anywhere in the codebase**, and there must never be. A role that appears in
five programmes is correct automatically because it is counted, not typed.

Verified shared roles (count of programmes): Customer Service Executive 5 · Ticketing
Executive 3 · Passenger Service Executive 3 · Technical Support Assistant 3 · Front Office
Executive 2 · Inventory Executive 2 · Inventory Assistant 2 · Documentation Executive 2 ·
Administrative Assistant 2 · Electrical Maintenance Assistant 2 · Electrical Operations
Assistant 2.

### Swap a placeholder image

Replace the file in `assets/img/` keeping the same base name, or point the `src` at the
new file. Update `width`/`height` if the ratio changes, and keep the `alt` descriptive.

### Wire up the forms

Set `AX.PH.formEndpoint` in `apex.js` to a real URL, then replace the simulated submit in
`initForms()` (`pages.js`) with a `fetch(endpoint, {method:"POST", body:new FormData(form)})`.
Validation, error display, the loading state and the success panel already work.

### Change a fee

Edit the `fees` array on that programme in `assets/data/programmes.js`. Nothing else —
the admissions range, the 21 × 3 matrix and the programme page all derive from it. There
is deliberately **no** academy-wide fee figure; an earlier one was removed because it was
a second source of truth waiting to drift. Programme lengths and award titles live once
in `AX_ACADEMY.durations`.

### Wire up auth, payment and uploads

- **Auth** — replace the simulated submit on `login.html` / `register.html`, and swap the
  forgot-password toast in `initAuth()` for the real flow.
- **Payment** — in `initPayment()`, replace the submit with the gateway's checkout call,
  passing the amount already computed in the summary. Point the gateway's return URL at
  `payment-status.html?status=…&ref=…`; that page already renders all three outcomes.
- **Uploads** — the document checklist on `apply.html` is rendered from
  `AX_ACADEMY.documents`; attach the upload widget to those rows.

---

## 9. Accessibility & QA — current state

Verified by an 80-check functional suite and a 210-combination responsive sweep
(15 pages × 14 viewports from 320px to 1920px, including phone landscape and four tablet
sizes). Both run clean, with no console errors and no failed requests.

| Item | State |
|---|---|
| One `<h1>` per page, correct heading order | ✅ |
| Landmarks and labelled sections | ✅ |
| Skip-to-content link on every page | ✅ |
| Mega-menu: opens, Escape closes, focus returns to trigger | ✅ |
| Drawer: focus trapped, Escape closes, focus restored | ✅ |
| Lightbox: focus trapped, arrows, Escape, focus restored, touch swipe | ✅ |
| Focus ring visible on every surface | ✅ |
| `aria-pressed` / `aria-expanded` / `aria-controls` on all toggles | ✅ |
| Form errors: `aria-invalid` + `aria-describedby`, focus to first bad field | ✅ |
| Fields validate on blur only once touched, or after first submit | ✅ |
| Live regions on result counts and form status | ✅ |
| Touch targets ≥ 46px; text links ≥ 24px | ✅ |
| No text under 12px | ✅ |
| No horizontal overflow and no clipped content, at any viewport | ✅ |
| `prefers-reduced-motion` fully honoured | ✅ |
| Contrast: text 17:1 · muted 8.4:1 · gold-2 9.6:1 · gold 6.2:1 · gold button 9:1 | ✅ |
| Contrast: `--ax-dim` ≈ 4.5:1 | ⚠️ meta text only, never body copy |
| In-sentence links on `disclaimer.html` are 20px tall | ⚠️ WCAG 2.5.8 exempts targets inside a block of text |
| Readable with JavaScript disabled | ⚠️ partial — see below |

**Note on the JS-disabled case.** Header and footer are mounted by `apex.js` so that
navigation is generated from the data and can never drift from the programme list. With
scripting off, page content, the static A–Z index and `sitemap.xml` keep every URL
reachable, but the nav chrome and the `?code=` detail pages do not render. If a full
no-JS experience becomes a requirement, pre-render the chrome into each page at build
time.

---

## 10. SEO

- Unique `<title>`, `<meta name="description">` and `<link rel="canonical">` per page.
- Open Graph + Twitter card on every page; `programme.html` rewrites title, description,
  canonical and OG tags per `?code=`.
- JSON-LD: `EducationalOrganization` on the home page, `Course` injected per programme.
- `sitemap.xml` covers 8 pages + all 21 programme URLs. `robots.txt` excludes only `404.html`.
- `programmes.html` carries a static A–Z index of all 21 detail URLs as real anchors.

---

## 11. Technical constraints held to

| Item | Status |
|---|---|
| Hand-written semantic HTML5, no build step | ✅ |
| Bootstrap 5.3 via CDN as the grid/utility layer only; all look from custom CSS | ✅ |
| CSS loaded after Bootstrap; **zero** `!important` | ✅ |
| Vanilla ES5-compatible JS, no framework | ✅ |
| GSAP 3 + ScrollTrigger via CDN; no AOS, no Animate.css | ✅ |
| Google Fonts only: Sora, Instrument Serif, Inter — `preconnect` + `display=swap` | ✅ |
| Icons: inline SVG from one set in `AX.icon` | ✅ |
| **Zero inline `style=` attributes** — a small utility layer covers one-off spacing | ✅ |
| Relative paths only, static hosting ready | ✅ |
| BEM-ish naming under the `ax-` prefix | ✅ |
| One global, `window.AX`; every DOM query guarded | ✅ |
| Role reverse-index derived at runtime, never hand-maintained | ✅ |

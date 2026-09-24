# Apex Professional Academy — project requirements & handover

**The single reference file for this project.** Design system, content rules, image
schedule, placeholder register, and how to run and extend the site. Nothing else in the
repo is documentation.

- **Client:** Apex Professional Academy, operating under Apex Institute of
  Multidisciplinary Professional Studies (short code **AIMPS**).
- **What the site is:** a marketing and admissions site for 21 sector-focused
  diploma/certificate programmes.
- **The one idea:** every programme maps to **named career-oriented roles**, and the site
  is built around that mapping in both directions — programme → roles, and role →
  programmes.

---

## 1. How to run it

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

## 2. File structure

```
ApexF/
├─ index.html            Home
├─ about.html            About + training approach
├─ programmes.html       All 21, searchable/filterable + static A–Z index
├─ programme.html        Detail template, driven by ?code=
├─ careers.html          Role finder (reverse index)
├─ admissions.html       Process, eligibility, FAQ, enquiry form
├─ gallery.html          Filterable mosaic + lightbox
├─ contact.html          Contact details, map slot, message form
├─ disclaimer.html       Institute policy, terms, privacy
├─ 404.html
├─ REQUIREMENTS.md       ← this file
├─ robots.txt
├─ sitemap.xml           8 pages + 21 programme URLs
└─ assets/
   ├─ css/apex.css       The entire design system, one file, 18 numbered sections
   ├─ js/
   │  ├─ apex.js         Core: data access, header/footer, nav, motion, UI primitives
   │  └─ pages.js        Page behaviour, dispatched by <body data-page>
   ├─ data/programmes.js SINGLE SOURCE OF TRUTH — 21 programmes + groups + compliance copy
   ├─ brand/apexlogo.jpeg
   └─ img/               19 generated SVG placeholders
```

**Load order matters:** GSAP → `programmes.js` → `pages.js` → `apex.js`. `pages.js` only
defines `window.AX_PAGE`; `apex.js` mounts the chrome and then calls it.

---

## 3. Design system — "Midnight Luxe"

Dark-first throughout: one continuous midnight-navy room with fixed gold and azure light
blooms behind every page, rather than alternating light/dark chapters. Glass panels catch
a gold bevel along their top edge, and a gold bloom tracks the pointer across them.

### Colour tokens (`assets/css/apex.css`, section 1)

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

## 4. Motion

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

## 5. Content rules

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
token (section 7).

---

## 6. Image schedule — what to send the client

All 19 slots currently render a generated SVG placeholder from `assets/img/`. Each
placeholder prints its own slot name and required pixel size, so a screenshot of any page
doubles as a brief.

**Rules for the real photography**

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

### Logo files still needed from the client

The supplied `assets/brand/apexlogo.jpeg` is a JPEG on a near-white background, which is
why the header shows it on a white chip. Please supply:

| Asset | Size | Format | Note |
|---|---|---|---|
| Transparent logo | 1200 × 1200 | PNG | alpha background |
| Vector master | — | SVG | for crisp scaling |
| Horizontal lockup | 1600 × 400 | PNG + SVG | for the header |
| Reversed lockup | 1600 × 400 | PNG + SVG | white/gold on navy, for this dark site |
| Monogram favicon | 512 × 512 | PNG | the "A" alone |

---

## 7. Placeholder register

The client supplied a content pack on 24 Sep 2026. Everything they confirmed now lives in
`AX_ACADEMY` (`assets/data/programmes.js`); what follows is only what is **still open**.
Each renders as a visible dashed gold chip on the page, so nothing can ship unnoticed.

### Still outstanding

| Token | Where it appears |
|---|---|
| `primary phone number` | contact, admissions |
| `WhatsApp number` | contact |
| `secondary phone number` | contact |
| `admissions email address` | contact, disclaimer |
| `general enquiries email address` | contact |
| `official profile URL` | footer, ×4 networks |
| `form submission endpoint URL` | admissions, contact |
| `Google Maps embed URL` | contact |
| `duration` | every programme page |
| `training hours` | every programme page |
| `eligibility` | every programme page (which of 10th / 12th / Graduate / Other) |
| `next batch date` | programme pages, admissions |
| `module outline` | reserved — the client's "What You Will Learn" block |
| `legal / registration status` | about, disclaimer |
| `faculty names and profiles` | about |
| `cancellation window` | reserved |
| `transfer request period` | disclaimer |
| `enquiry record retention period` | disclaimer |
| `student academic record retention period` | disclaimer |
| `policy effective date` / `policy last-updated date` / `policy version` | disclaimer |

### Now supplied and live on the site

Fee (₹43,999 total, ₹13,999 registration, instalment available) with full inclusion and
exclusion lists · the four eligibility bands · age requirement · the ten enrolment
documents and the false-documents warning · batch types · the four learning modes ·
certificate wording and its caution · positioning and supporting lines · the
programme-to-career statement · About Us, aim, audience and background copy · the
seven-point training approach · established 2010 · founder Pareshnath Shutradhar · full
campus address · office hours · admissions desk · fee policy · the eight-section refund
policy · transfer policy · data-processing purposes and retention wording · the website
disclaimer.

### Fees — confirmed

All 21 fees are client-confirmed (24 Sep 2026). Two bands:

| Band | Total | First instalment | Programmes |
|---|---|---|---|
| Sector-specialist | ₹43,999 | ₹13,999 | AATC Aviation, MIRTC Metro & Rail, RIATC Railway, HITC Hospitality, TTMC Travel & Tourism |
| Standard | ₹25,500 | ₹10,500 | The other 16, including PITC Pharmaceutical |

Notes on how this is wired:

- Each programme carries its own `fee: { total, first, confirmed }` in
  `assets/data/programmes.js`. **That is the only place a fee is written.**
- The headline range on admissions (₹25,500 – ₹43,999) and the 21-row fee table are
  derived from that array at runtime, so they cannot drift from the programme pages.
- There is deliberately **no** academy-wide fee figure in `AX_ACADEMY`; an earlier one was
  removed because it would have been a second, competing source of truth.
- The first instalment is stated everywhere as part of the total, not an additional
  charge — this was an explicit client clarification.
- The `confirmed` flag drives a "(provisional)" marker on the programme page. All 21 are
  now `true`, so nothing renders. Keep the flag: if a programme is added with an unsettled
  fee, set it to `false` and the marker returns automatically.

Superseded along the way: an earlier ₹19,999 / ₹9,999 figure for the Pharmaceutical
Division, and a provisional five-tier spread. Neither survives in the data.

### Refund policy — resolved

The contradiction is settled: fees remain **strictly non-refundable** under the
eight-section policy, and where the Academy exercises its discretion to approve a refund,
the approved amount is processed within **5–7 working days**. Both statements are now on
the legal page, the second under a "Refund processing" heading.

Also still to replace before launch: `https://example.com/` in `sitemap.xml` and
`robots.txt`, and the `og:image` paths once the real social card exists.

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

---

## 9. Accessibility & QA checklist

| Item | State |
|---|---|
| One `<h1>` per page, correct heading order | ✅ |
| Landmarks: `header`, `nav`, `main`, `footer`, labelled sections | ✅ |
| Skip-to-content link on every page | ✅ |
| Keyboard: mega-menu opens/closes, Escape returns focus to the trigger | ✅ |
| Keyboard: drawer traps focus, Escape closes, focus restored | ✅ |
| Keyboard: lightbox traps focus, arrows navigate, Escape closes, focus restored | ✅ |
| Lightbox touch swipe | ✅ |
| Focus ring visible on every surface (2px `--ax-gold-2`, 3px offset) | ✅ |
| `aria-pressed` on filter pills, view toggle and role buttons | ✅ |
| `aria-expanded` + `aria-controls` on accordion and mega-menu | ✅ |
| Form errors: `aria-invalid` + `aria-describedby`, inline message, focus moves to first bad field | ✅ |
| Live regions on result counts and form status | ✅ |
| Touch targets ≥ 44px | ✅ |
| `prefers-reduced-motion` fully honoured | ✅ |
| Works with JavaScript disabled for reading (chrome is JS-mounted; the A–Z index and all page copy are static) | ⚠️ partial — see note |
| No horizontal overflow, all 10 pages × 14 viewports | ✅ measured, see below |
| Contrast — `--ax-text` on `--ax-void` | ✅ ≈ 17:1 |
| Contrast — `--ax-muted` on `--ax-void` | ✅ ≈ 8.4:1 |
| Contrast — `--ax-gold-2` on `--ax-void` | ✅ ≈ 9.6:1 |
| Contrast — `--ax-gold` on `--ax-void` | ✅ ≈ 6.2:1 |
| Contrast — `#100A02` on the gold button gradient | ✅ ≈ 9:1 |
| Contrast — `--ax-dim` on `--ax-void` | ⚠️ ≈ 4.5:1 — meta text only, never body copy |

**Note on the JS-disabled case.** The header and footer are mounted by `apex.js` so that
navigation is generated from the data and can never drift out of sync with the 21
programmes. With scripting off, page content, the static A–Z programme index and
`sitemap.xml` keep every URL reachable, but the nav chrome and the `?code=` detail pages do
not render. If a fully no-JS experience becomes a requirement, the fix is to pre-render the
chrome into each page at build time.

### Responsive QA — 10 pages × 14 viewports

Every page was measured at every breakpoint (140 combinations), not sampled:

| Class | Widths tested |
|---|---|
| Phones | 320, 360, 375, 390, 414, 430 |
| Phone landscape | 844 × 390 |
| Tablets | 768, 834, 1024, 1180 |
| Laptop / desktop | 1280, 1440, 1920 |

Each combination was checked for: horizontal document overflow, any element
extending past the viewport, any element clipping its own content, touch-target
size, and text below 12px.

**Result: 0 horizontal overflow, 0 clipped content, 0 undersized touch targets,
0 text under 12px.** Six defects were found and fixed in this pass:

1. Long button labels (`Explore the programmes`) were clipped by `white-space:nowrap`
   inside a 280px column at 320px — buttons now wrap below 1024px.
2. The search field's fixed `min-width:240px` overflowed its panel at 320px — now
   `min(240px,100%)`.
3. The card/register view-toggle buttons were 37px tall — now 44px on touch widths.
4. Filter pills dropped to 40px under the 560px breakpoint — now 44px.
5. Role chips were 43px — now 44px.
6. Twelve micro-labels sat between 9.9px and 11.8px (the header's
   "PROFESSIONAL ACADEMY" line was the worst at 9.9px). All raised to a 12px floor;
   footer and drawer links given a 24px minimum target.

One finding is deliberately left: the `contact page` link inside a sentence on
`disclaimer.html` is 20px tall. WCAG 2.5.8 explicitly exempts targets embedded in a
block of text, and enlarging it would break the line it sits in.

**Still not covered by this pass:** real iOS Safari and Android Chrome (all of the
above is Chromium), and visual sign-off at every breakpoint — layout was verified
programmatically plus spot-checked by screenshot at 320, 390, 768 and 1440.

### What was actually tested, and how

An 80-check browser audit was run against a served build (headless Chromium via
Playwright) covering every page. **80 passed, 0 failed, with no JavaScript errors and no
failed requests.** It verifies:

- **Rendering from data** — 21 cards on the listing, 9 on the home register, 4 sector
  tiles, 6 pathway rows, 9 feature items, 21 marquee names, 21 mega-menu entries,
  exactly 3 rising diagonals on the home page.
- **Role index correctness** — all 83 roles listed, and every shared role resolves to the
  right programmes: Customer Service Executive → 5, Ticketing Executive → 3, Passenger
  Service Executive → 3, Technical Support Assistant → 3, Inventory Executive → 2,
  Documentation Executive → 2, Front Office Executive → 2. Deep links (`?role=`) open the
  right panel.
- **Search and filter** — free text, certificate code, group pills, card/register toggle,
  live count, URL state, designed empty state, and the view choice surviving a reload.
- **Programme detail** — `?code=AATC` rewrites the title, renders 8 training areas and
  5 role chips, injects `Course` JSON-LD, shows 3 related programmes and the non-guarantee
  notice; an unknown code degrades to the empty state rather than a blank page.
- **Forms** — empty submit blocked with 5 inline errors and `aria-invalid`, a malformed
  email rejected with a specific message, a valid submit reaching the success state, and
  `?code=HITC` preselecting the programme.
- **Interaction** — mega-menu opens and Escape closes it with focus returned to the
  trigger, the lightbox opens and Escape closes it, the accordion toggles, the gallery
  filter narrows to 3 campus tiles, and the mobile drawer opens and closes on Escape.
- **Layout** — no horizontal overflow on any of index/programmes/careers/admissions at
  320, 375, 390, 768, 1024, 1280 and 1920 px.

Four defects were found and fixed during this pass, all of which broke real pages:
a `body > *` rule whose specificity knocked the header, drawer and skip link out of
`position:fixed` (the hidden drawer then pushed `<main>` off-screen); the page script
running after the reveal observer and the marquee, leaving injected content invisible and
the marquee empty; hover-then-click closing the mega-menu instead of opening it; and a
310px minimum grid track overflowing a 320px screen.

**Not yet run:** Lighthouse. Targets are Performance ≥ 90, Accessibility ≥ 95, Best
Practices ≥ 95, SEO ≥ 95 on both desktop and mobile. Run it against a served URL
(`python -m http.server`), not `file://`, or the numbers will be meaningless.

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

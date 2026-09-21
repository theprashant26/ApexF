# Apex Professional Academy

Static HTML5 website for Apex Professional Academy, built in phases from the supplied project brief.

## Current status

Phase 0 foundation is complete. The design plan, tokens, programme source data, validation check, and initial image register are present. UI implementation begins after design-plan approval.

## Phase 0 validation

Run:

```text
node tools/validate-programmes.mjs
```

The programme dataset is the single source of truth for listing, detail, and role-finder views.

## Phase 8 QA status

- Static audit passed for one `h1` per page, shared landmarks, image dimensions, alt text, loading attributes, and no inline styles.
- Responsive CSS includes 44px controls, visible focus rings, mobile navigation, and narrow-screen wrapping for page-banner headings.
- Browser smoke checks passed for the home page, programme catalogue, careers role finder, programme detail, and admissions selector.
- Verified catalogue search: `Ticketing Executive` returns 3 programmes.
- Verified role finder: `Inventory Executive` returns 2 programmes.
- Verified admissions preselection: `?programme=AATC` selects the Aviation programme and loads 21 options.
- Verified no horizontal overflow at the tested browser widths, including a narrow 256px rendered viewport.
- Lighthouse scores and a full device matrix remain pending because Lighthouse has not been run in this environment.

## Phase 9 handover status

- SEO metadata, runtime Open Graph/Twitter tags, and structured data are wired.
- Home injects `EducationalOrganization` schema; programme detail injects `Course` schema.
- `programmes.html` contains 21 crawlable no-JavaScript programme anchors.
- `sitemap.xml` contains 30 URLs: 9 site routes and 21 programme detail URLs.
- `robots.txt` allows crawling and points to the sitemap placeholder.
- Replace the production-origin placeholder before deployment; no domain was invented in this build.

## Run locally

This is a static site. Open `index.html` through a local static server so ES modules, JSON loading, and browser navigation behave as they will in hosting. For example, use any static file server available in your editor or environment.

## Add a programme

Edit `assets/data/programmes.json` and add one complete entry with a unique `code`, `slug`, `trainingAreas`, and `careerRoles`. The programmes listing, detail template, enquiry selectors, and careers reverse index read this file at runtime. Run `tools/validate-programmes.mjs` where Node.js is available, or repeat the equivalent JSON checks documented in the project history.

## Swap images

Replace the local SVG in `assets/img/placeholders/` with the matching client JPEG/WebP files named in `IMAGE-REQUIREMENTS.md`. Keep explicit width, height, loading, alt text, `<picture>` fallbacks, and the registered aspect ratio. Update the relevant `src` and `srcset` values when a real image arrives.

## SEO and deployment

`assets/js/seo.js` adds Open Graph, Twitter, and runtime structured data without inventing a production domain. Before deployment, replace `{{PLACEHOLDER: production site origin}}` in `sitemap.xml` and `robots.txt`, and set absolute production canonical and social URLs if the host requires them.

## Placeholders remaining

- Production site origin
- Institute address, phone number, email address, and contact hours
- Eligibility requirements and required documents
- Fees and batch information
- Privacy policy and website terms
- Map embed or map image
- Enquiry form endpoint
- Client brand masters and photography listed in `IMAGE-REQUIREMENTS.md`

# StreamLinx — Implementation Plan

## Scope
Build a static, responsive, image-rich multi-page internet information and inquiry website for the temporary brand StreamLinx. The site is independent and must not imply provider affiliation or make unverified technical, coverage, pricing, performance, compliance, or business-history claims.

## Implementation approach
- React + Vite static frontend with client-side routing using the browser History API and a small route table.
- Shared layout primitives for header, footer, page intro, imagery, editorial sections, CTA panels, FAQ accordions, and legal pages.
- CSS-first art direction: warm ivory canvas, navy type, pale blue/lavender surfaces, restrained electric-blue actions, asymmetrical editorial compositions, and responsive breakpoints.
- Project-hosted image assets uploaded to `/manus-storage/` for stable rendering.
- Contact form performs client-side validation only and presents a transparent not-connected demonstration state without persistence or network submission.
- `public/manus-routes.json` declares every page route for Webdev tooling.
- Metadata and favicon are included in the document shell; brand text remains centralized for easy replacement.

## Page structure
- `/` — asymmetric hero, lifestyle transition, connected-life editorial composition, service exploration, inquiry timeline, lifestyle feature, FAQ, contact finale.
- `/about` — photographic hero, purpose, connected-lifestyle editorial, inquiry process, CTA.
- `/services` — wide image introduction, three distinct service treatments, location exploration, FAQ, CTA.
- `/contact` — contact instructions, exact temporary phone number, accessible local-only form.
- `/privacy`, `/terms`, `/disclaimer` — editable draft legal pages.

## Design system
- Design movement: editorial architectural lifestyle design with calm digital utility.
- Core principles: generous whitespace, asymmetric pacing, honest microcopy, purposeful imagery.
- Color philosophy: ivory and white create trust and daylight; sky blue/lavender add a quiet digital atmosphere; navy anchors readability; electric blue is reserved for action.
- Layout paradigm: offset panels, split compositions, varied image ratios, fine rules, and broad horizontal bands rather than repeated card grids.
- Signature elements: a small wave-line motif, offset ivory information panels, and numbered editorial wayfinding.
- Interaction philosophy: restrained hover lift, gentle reveal, keyboard-visible focus, and no motion that blocks access.
- Typography: Manrope for all UI and display text, using dramatic but readable desktop headlines and compact uppercase eyebrows.
- Brand essence: an independent guide for finding a more suitable home connection; calm, clear, human.
- Brand voice: direct, considered, transparent. Example lines: “Your world moves. Your connection should too.” and “Tell us what you need; we’ll help you see what comes next.”
- Wordmark: typographic StreamLinx lockup with a custom wave underline accent.
- Signature brand color: restrained electric blue `#3978F6`.

## Project structure
- `src/` — React app, route table, reusable components, page modules, and CSS.
- `public/` — favicon, route manifest, and static metadata assets.
- `app.config.ts` — platform project logo metadata.
- `package.json` / `vite.config.ts` — build and preview commands.

## Revision: compliance and discoverability
The campaign is now positioned as an independent third-party service assistance provider, with the exact non-affiliation sentence reused near the hero, About, contact, CTA, footer, and disclaimer. The visual system now favors router, modem, ethernet, fiber, Wi-Fi extender, mesh, and installation imagery. The build includes prerendered route HTML, route-specific metadata, clean trailing-slash output folders, robots.txt, sitemap.xml, schema for Organization, WebSite, FAQ, and breadcrumbs, and optional analytics hooks that activate only with real GA4/GTM environment variables. LocalBusiness schema and production HTTPS redirects remain intentionally unconfigured because no verified address, legal identity, production domain, or provider relationship was supplied.

## Revision: simplified public messaging
The visible marketing copy now uses neutral service language such as “Internet & Cable Service Guidance” and “Talk to an Internet Advisor.” Independent, third-party, non-affiliation, and ISP-disclaimer wording is intentionally limited to the footer and legal pages. The homepage hero top padding is reduced to 42px on desktop and mobile so the hero enters the viewport sooner.

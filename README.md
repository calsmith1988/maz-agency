# MAZ - Amazon Ads Agency website

Marketing site for **MAZ**, rebranded from AMZ PPC Management. Built with
Astro 6, Tailwind v4, and MDX for case studies. Deploys statically to Vercel
(or any static host).

- **Palette**: Forest Ink, Moss Grey, Putty, Champagne, Ivory, Muted Gold
- **Type**: Fraunces (serif, display) + Inter (sans, UI), self-hosted via Fontsource
- **Analytics**: Plausible (privacy-friendly, no cookie banner needed)

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # preview the production build locally
```

---

## Environment variables

Create a `.env` in the project root (never commit it). All are optional - the
site renders sensible fallbacks when they're missing.

```
PUBLIC_CALENDLY_URL=https://calendly.com/your-link/strategy-call
PUBLIC_AUDIT_TOOL_URL=https://audit.maz.agency
PUBLIC_VSL_URL=https://www.youtube.com/watch?v=xxxxxxxxxxx
PUBLIC_PLAUSIBLE_DOMAIN=www.wearemaz.com
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GOOGLE_ADS_ID=AW-123456789
PUBLIC_META_PIXEL_ID=123456789012345
```

The defaults live in [`src/config/site.ts`](src/config/site.ts). Edit that
file to change contact details, social links, or stat values.

Tracking note: Plausible, Google Analytics, Google Ads and Meta Pixel are all
consent-gated. Analytics tools only load after the user opts into the
`analytics` category, and Google Ads / Meta only load after the user opts into
the `advertising` category via the built-in cookie banner.

---

## Where to drop real assets

Every placeholder is designed so that dropping a real file at the exact path
below replaces it with zero code changes.

### Brand

| File | Purpose | Recommended |
| --- | --- | --- |
| `public/brand/maz-logo.svg` | Horizontal wordmark (swap when ready) | SVG, any size |
| `public/brand/maz-mark.svg` | Monogram / avatar mark | SVG, 512x512 |
| `public/favicon.svg` | Browser tab icon (already placeholder) | SVG, 64x64 |
| `public/og-default.svg` | Default social share image | 1200x630 |

Note: some social platforms prefer PNG/JPG over SVG for OG images. When you
have a designed OG card, drop it as `og-default.png` and change `ogImage` in
[`src/layouts/Base.astro`](src/layouts/Base.astro) to `.png`.

### Client logos

Six slots used by the home page logo bar. PNG, JPG or SVG all work - each
logo is constrained to a uniform height and treated with a greyscale
filter + `mix-blend-mode: multiply` so a mixed set of brand colours (and
PNGs with light-grey backgrounds) sits calmly on the champagne surface.

| File | | File | |
| --- | --- | --- | --- |
| `public/logos/logo-01.png` | | `public/logos/logo-04.png` | |
| `public/logos/logo-02.png` | | `public/logos/logo-05.png` | |
| `public/logos/logo-03.png` | | `public/logos/logo-06.png` | |

Recommended: 2x-resolution PNG or JPG, ideally with a transparent or
near-white background, aiming for a visual height around 48-64px.

**Per-logo tuning.** Because each source file has different amounts of
built-in padding, you can nudge any slot up or down via a `scale` value
in the `logos` array in
[`src/components/LogoBar.astro`](src/components/LogoBar.astro):

```ts
const logos = [
  { src: "/logos/logo-01.png", alt: "Client logo 01" },
  { src: "/logos/logo-02.png", alt: "Client logo 02", scale: 1.25 }, // bigger
  { src: "/logos/logo-03.png", alt: "Client logo 03", scale: 0.85 }, // smaller
  // ...
];
```

Values in the 0.7-1.3 range look clean; past that the row rhythm breaks.

If a logo's source PNG is already a light grey and looks washed-out next
to the darker marks, add `boost: true` to its slot — this darkens and
lifts contrast to pull it back to the same visual weight.

If a specific logo looks wrong in greyscale (e.g. it's already dark-on-dark),
add `untreated: true` to its slot to opt it out of the filter entirely.

To change the total number of slots, add or remove entries in the `logos`
array and adjust the desktop grid (`lg:grid-cols-6`) to match.

### Team portraits

| File | Person | Recommended |
| --- | --- | --- |
| `public/team/calum.jpg` | Calum - Founder & Ad Strategist | 960x1200, 4:5 |
| `public/team/genny.jpg` | Genny - Amazon Ads Manager | 960x1200, 4:5 |
| `public/team/eir.jpg` | Eir - Operations & VA | 960x1200, 4:5 |

Until you supply photos, the Team component shows a typographic fallback
with the person's name.

### Case study card images

| File | Case study |
| --- | --- |
| `public/case-studies/suri.png` | SURI |
| `public/case-studies/brand-hatchers.png` | Brand Hatchers |
| `public/case-studies/sho.png` | SHO |

Recommended: 1200x900, 4:3. PNG or JPG both work — update the
`cardImage` field in the matching MDX frontmatter to match your
extension. Missing files fall back cleanly to a typographic card using
the client name.

Cards are rendered with a shared greyscale treatment (with a subtle
colour reveal on hover) so colour and B&W source photos sit together as
one cohesive set. The treatment lives in
[`src/components/CaseStudyCard.astro`](src/components/CaseStudyCard.astro).

### VSL (Video Sales Letter)

1. Drop the poster frame at `public/vsl/poster.jpg` (1920x1080, 16:9).
2. Paste your YouTube or Vimeo watch URL into `PUBLIC_VSL_URL` (or directly
   into `site.vslUrl` in `src/config/site.ts`).
3. The [`VSL`](src/components/VSL.astro) component converts the URL to the
   correct embed format automatically.

If no video URL is set, the section renders a "Video coming soon" state so
the page still flows correctly.

---

## Editing content

### Case studies

Each case study is a single MDX file. To add one:

1. Create `src/content/case-studies/your-slug.mdx`.
2. Fill in the frontmatter (schema enforced in
   [`src/content.config.ts`](src/content.config.ts)):

   ```mdx
   ---
   title: "Client X - headline metric"
   client: "Client X"
   tagline: "One-sentence headline for the case study card."
   summary: "One-paragraph summary for meta and hero."
   region: "UK"
   category: "Consumer goods"
   heroMetrics:
     - value: "+185%"
       label: "Sales growth"
     - value: "3.2"
       label: "ROAS"
     - value: "£132k"
       label: "New monthly record"
   cardImage: "/case-studies/client-x.png"
   featured: true
   order: 4
   ---

   ## The situation
   ...
   ```

3. Drop the card image at the path referenced by `cardImage`.

### Copy tweaks

All section copy lives in the component that renders it, inside
`src/components/`. Palette and type live in
[`src/styles/tokens.css`](src/styles/tokens.css).

### Navigation / footer

Edit `navLinks` at the top of
[`src/components/Nav.astro`](src/components/Nav.astro) and the `columns`
array in [`src/components/Footer.astro`](src/components/Footer.astro).

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel - it auto-detects Astro.
3. Add the `PUBLIC_*` environment variables in Project Settings > Environment.
4. Add your domain (e.g. `www.wearemaz.com`) in Project Settings > Domains. Point
   your DNS at Vercel's name servers (or add the Vercel A / CNAME records).
5. Set the primary domain and Vercel will issue an SSL certificate
   automatically.

Any static host works too (Netlify, Cloudflare Pages, S3+CloudFront,
any nginx). `npm run build` outputs a fully static site in `dist/`.

---

## Phase 2 - audit tool integration

The free instant audit tool is a separate codebase / deployment. This site
currently links out to it from:

- The hero secondary CTA
- The dedicated `/audit` landing page
- The `AuditCTA` band (used on home, about, case study index, and individual
  case studies)

All links run through
[`withUtm()`](src/config/site.ts) so you can attribute sessions inside the
audit tool by `utm_source=maz_site` and `utm_medium` describing the slot.

When you're ready to tighten the integration:

1. Deploy the audit tool to `audit.maz.agency` (or your chosen subdomain)
   and set `PUBLIC_AUDIT_TOOL_URL` accordingly.
2. Extract the palette and type tokens in `src/styles/tokens.css` into a
   small `@maz/tokens` package (or just copy-paste) so the audit tool feels
   identical to the marketing site.
3. Add a persistent "Back to wearemaz.com" link and a "Book a call" CTA inside
   the audit results view so the funnel closes.
4. (Later) Share auth/session if you want saved audits or account history.

---

## File map

```
maz-site/
├── astro.config.mjs
├── tsconfig.json
├── vercel.json
├── public/
│   ├── brand/            final logo assets (drop-in)
│   ├── logos/            client logos (placeholders shipped)
│   ├── team/             team portraits (drop-in)
│   ├── case-studies/     card images (drop-in)
│   ├── vsl/              poster image (drop-in)
│   ├── favicon.svg
│   ├── og-default.svg
│   └── robots.txt
└── src/
    ├── config/site.ts    contact, socials, stats, URLs
    ├── styles/
    │   ├── tokens.css    single source of truth for palette + type
    │   └── global.css    Tailwind + base layers + utility classes
    ├── layouts/Base.astro   meta, Nav, Footer, JSON-LD
    ├── components/
    │   ├── Nav.astro           sticky nav + mobile menu
    │   ├── Footer.astro
    │   ├── Logo.astro          MAZ wordmark placeholder
    │   ├── CTAButton.astro     primary / secondary / ghost / light variants
    │   ├── Hero.astro
    │   ├── LogoBar.astro
    │   ├── VSL.astro           poster + modal player
    │   ├── Positioning.astro
    │   ├── Process.astro       4-phase editorial grid
    │   ├── CaseStudies.astro   home grid (reads from collection)
    │   ├── CaseStudyCard.astro
    │   ├── StatStrip.astro     dark Forest Ink section
    │   ├── Team.astro
    │   ├── Pricing.astro
    │   ├── FAQ.astro           accordion + JSON-LD FAQPage
    │   ├── AuditCTA.astro      reusable dark audit band
    │   └── BookCall.astro      inline Calendly OR button fallback
    ├── content/case-studies/   MDX files
    ├── content.config.ts       collection schema
    └── pages/
        ├── index.astro
        ├── about.astro
        ├── audit.astro
        ├── book-a-call.astro
        ├── contact.astro
        ├── privacy.astro
        ├── terms.astro
        └── case-studies/
            ├── index.astro
            └── [...slug].astro
```

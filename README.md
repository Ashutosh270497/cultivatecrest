# CultivateCrest Storefront

A premium, responsive CultivateCrest storefront built with Next.js 16 and React 19. The current release keeps retail checkout on Amazon India while establishing a professional product, brand, editorial and bulk-order experience for India and Middle East growth.

## What is included

- Product-led homepage and complete responsive design system
- Collection and static product-detail routes sourced from `src/data/products.json`
- Clear Amazon India handoff for retail purchases
- Dedicated bulk-order journey for retail, hospitality, gifting and distribution enquiries
- Brand story, journal, contact, shipping/returns, privacy and terms pages
- Open Graph metadata, JSON-LD product data, sitemap, robots and web manifest
- Legacy `.html` redirects to preserve existing links
- Next Image optimisation, semantic structure, keyboard focus states and reduced-motion support

## Local development

Use Node.js 22 (`.nvmrc` and `package.json` are aligned with the deployment runtime).

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run check
```

`check` runs ESLint, TypeScript validation and a complete production build.

## Project structure

```text
src/
  app/                 App Router pages, metadata routes and global styles
  components/          Shared storefront components
  config/site.ts       Canonical URL, contact, social and Amazon settings
  data/products.json   Current product catalogue and Amazon links
  lib/catalog.ts       Typed catalogue normalisation and helpers
public/
  images/              Existing CultivateCrest product and brand assets
  og.png               Storefront social-sharing artwork
```

## Content updates

Product names, prices, pack variants, benefits, images and Amazon destinations live in `src/data/products.json`. The storefront currently treats displayed prices as indicative; Amazon confirms final price, stock, delivery and returns.

Site-wide URLs, contact addresses, social profiles and the Amazon storefront URL live in `src/config/site.ts`.

## Vercel deployment

Vercel detects this repository as Next.js and does not require a custom `vercel.json`.

1. Import the GitHub repository into Vercel.
2. Keep the project root at the repository root and select the Next.js framework preset.
3. Keep the default install command (`npm install`), build command (`npm run build`) and `.next` output handling.
4. Use Node.js 22.x. The `engines` field enforces this automatically.
5. Deploy the feature branch as a preview and validate it before promoting the deployment.
6. Add `cultivatecrest.in` and, if required, `www.cultivatecrest.in` in the Vercel Domains settings. Choose one as canonical and redirect the other.

No environment variables are required. `NEXT_PUBLIC_SITE_URL` is optional and defaults to `https://cultivatecrest.in`; set it only when a different canonical production origin is required.

The former GitHub Pages `CNAME` and static HTML/CSS/JavaScript application have been removed. Legacy `.html` URLs are preserved through permanent Next.js redirects.

## Future commerce phase

Native cart, checkout, customer accounts, order management and fulfilment are intentionally out of scope for this visual release. When that phase starts, introduce payment and logistics providers based on the selected markets, with Supabase for managed Postgres/Auth/Storage and NestJS only where a dedicated commerce API or operations layer is justified.

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

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
  app/                 App Router pages, metadata routes and global styles
  components/          Shared storefront components
  data/products.json   Current product catalogue and Amazon links
  lib/catalog.ts       Typed catalogue normalisation and helpers
public/
  images/              Existing CultivateCrest product and brand assets
  og.png               Storefront social-sharing artwork
```

## Content updates

Product names, prices, pack variants, benefits, images and Amazon destinations live in `src/data/products.json`. The storefront currently treats displayed prices as indicative; Amazon confirms final price, stock, delivery and returns.

## Vercel deployment

Import the repository into Vercel and use the default Next.js settings. No runtime environment variables are required for the current Amazon-led release. Connect `cultivatecrest.in` only after validating the preview deployment and updating DNS from the existing GitHub Pages target.

## Future commerce phase

Native cart, checkout, customer accounts, order management and fulfilment are intentionally out of scope for this visual release. When that phase starts, introduce payment and logistics providers based on the selected markets, with Supabase for managed Postgres/Auth/Storage and NestJS only where a dedicated commerce API or operations layer is justified.

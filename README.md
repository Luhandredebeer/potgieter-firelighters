# Potgieter Firelighters

A modern ecommerce frontend for a South African firelighter & braai utility brand.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

---

## ✦ What's Built

### Pages
- **Home** — Hero with floating product + embers, Bestsellers, Local Roots, Categories, Bundles, Fire Tips, Founder Story, Reviews, Email signup
- **Shop** — Product grid, category filter, sticky cart, delivery/pickup toggle, bundle recommendations, FAQ
- **Quiz** — 4-question branching quiz with weighted scoring, 4 outcomes, email capture, product recommendations
- **Reviews / Gallery** — Masonry photo gallery, testimonials, customer submission CTA

### Features
- Mobile-first responsive (375px → 1920px tested)
- Floating WhatsApp button with pre-filled messages
- Yoco-ready Shopify integration (Yoco enabled as payment gateway in Shopify admin)
- SEO metadata + OpenGraph
- `prefers-reduced-motion` support
- Accessible: semantic HTML, ARIA labels, keyboard nav
- Zero hydration errors (deterministic ember animation seeds)

### Design System
- **Colors**: cream base, burnt-orange & ember accents, warm coal/charcoal, subtle bushveld green
- **Type**: Bebas Neue (display) + Inter (body)
- **Motion**: Framer Motion with restrained, premium animations — scroll-reveal, parallax, ember particles, hover states

---

## ✦ Quick Start

```bash
# 1. Install
npm install

# 2. Copy environment template
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site **runs fully without any integrations configured** — uses the mock catalog in `src/data/products.ts`. Connect Shopify, Yoco, and your WhatsApp number when you're ready.

---

## ✦ Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (fonts, header, footer, WhatsApp)
│   ├── page.tsx          # Home
│   ├── shop/page.tsx
│   ├── quiz/page.tsx
│   └── reviews/page.tsx
├── components/
│   ├── layout/           # Header, Footer, WhatsAppButton
│   ├── sections/         # Hero, Bestsellers, LocalRoots, etc.
│   ├── product/          # ProductCard, BundleCard
│   └── ui/               # Button, Container, SectionHeading, Reveal
├── data/products.ts      # Mock catalog — replace with Shopify later
├── lib/
│   ├── shopify.ts        # Storefront API client + checkout
│   ├── yoco.ts           # Yoco payment helper (optional)
│   ├── constants.ts      # SITE config, nav, formatZAR
│   └── utils.ts          # cn(), whatsappUrl()
└── types/index.ts        # Shared TypeScript types
```

---

## ✦ Integrations

### 1. Shopify Storefront API

**Quickest path** (recommended for a small SA business):

1. In Shopify admin, create products matching the handles in `src/data/products.ts`
   (`rings-of-fire`, `cubes-of-fire`, `sticks-of-fire`, `bush-box`, etc.)
2. Set prices in ZAR
3. Go to **Apps → Develop apps → Create app** → enable Storefront API
4. Copy the Storefront access token into `.env.local`:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=potgieter-firelighters.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here
   ```
5. Update each product in `src/data/products.ts` with its `shopifyVariantId`
   (find this in Shopify admin: Products → variant → URL contains the variant ID)
6. In `src/app/shop/page.tsx`, replace the `handleCheckout` alert with:
   ```ts
   import { createCheckoutUrl } from '@/lib/shopify';

   const url = await createCheckoutUrl(
     cart.map(i => ({
       merchandiseId: `gid://shopify/ProductVariant/${i.product.shopifyVariantId}`,
       quantity: i.qty,
     }))
   );
   window.location.href = url;
   ```

This way Shopify handles inventory, checkout, payment (via Yoco), order admin, and emails — you keep the custom storefront.

### 2. Yoco Payments

In Shopify admin: **Settings → Payments → Add provider → Yoco**.
Shopify checkout will route payment through Yoco automatically.
No frontend code needed.

(If you ever need a standalone Yoco checkout outside Shopify, the helper in
`src/lib/yoco.ts` is ready.)

### 3. WhatsApp

Edit `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`. International format, no `+`, no spaces:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=27821234567
```

The floating button and any `whatsappUrl()` call will use this number.

### 4. Email Capture (Newsletter + Quiz)

The forms in `src/components/sections/EmailSignup.tsx` and `src/app/quiz/page.tsx`
just simulate success right now. To wire them up, pick one:

- **Klaviyo** (recommended for ecommerce) — POST to their API in the form handler
- **Mailchimp** — same, via their API or embedded forms
- **Shopify Customer API** — keep all customer data in Shopify
- **Typeform** — embed Typeform via their JS SDK if you'd rather they run the form

### 5. Typeform (Quiz Alternative)

The quiz is built natively because it gives you more control and looks better embedded.
But if you want to use Typeform's logic engine instead, replace the contents of
`src/app/quiz/page.tsx` with:
```tsx
'use client';
import { Widget } from '@typeform/embed-react';
export default function QuizPage() {
  return <Widget id={process.env.NEXT_PUBLIC_TYPEFORM_QUIZ_ID!} style={{ width: '100%', height: '100vh' }} />;
}
```
Install: `npm i @typeform/embed-react`

---

## ✦ Customizing Content

### Products & Bundles
Edit `src/data/products.ts`. Each product has a `handle` (URL slug), `name`, `price`
(in ZAR), `image`, and `category`. Bundles work the same way.

### Brand info
`src/lib/constants.ts` — site name, WhatsApp, email, location, delivery fee, pickup areas.

### Colors
`tailwind.config.ts` under `theme.extend.colors`. The `cream`, `ember`, `flame`,
`coal`, and `veld` palettes are all there.

### Fonts
`src/app/layout.tsx`. To swap Bebas Neue for Anton or Oswald:
```tsx
import { Anton } from 'next/font/google';
const display = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
```

### Images
All placeholder images are pulled from Unsplash. Replace by either:
- Adding files to `/public/images/` and updating image URLs in components
- Uploading to Shopify and using the Shopify CDN URLs
- Using a Cloudinary / Imgix account for a hosted CMS-style flow

---

## ✦ Deployment

See **DEPLOYMENT.md** for the full Hostinger setup.

**TL;DR**: Deploy to Vercel (free, made for Next.js), then point your Hostinger
domain DNS at Vercel. Hostinger's standard shared hosting can't run Next.js
server features — you'd lose Server Components, ISR, and the API routes.

---

## ✦ Performance & SEO

- Next.js Image component with proper `sizes` everywhere
- Font subsetting + `display: swap`
- Static generation by default; only interactive sections are `'use client'`
- Lighthouse target: ≥95 across the board
- Sitemap auto-generated by Next.js; add `app/sitemap.ts` if you want custom logic
- Metadata configured in `src/app/layout.tsx`

---

## ✦ What's Not Built (Yet)

To keep this focused for a small SA business, the following are intentionally
left for Shopify to handle:
- Order management dashboard
- Inventory tracking
- Email transactional flows (Shopify sends order confirmations automatically)
- User accounts (Shopify has a built-in customer login if you want it)
- Reviews capture form (Shopify reviews app, or use Judge.me / Loox)

If you ever need any of these as custom features, the architecture is ready —
add routes under `src/app/` and components under `src/components/`.

---

## ✦ Future Upgrades

When the business grows, consider:
- **Product detail pages**: Currently `/shop?product=handle`. Move to `/products/[handle]` for SEO + better UX
- **Search**: Algolia or Shopify's native predictive search
- **Reviews integration**: Judge.me or Loox via Shopify
- **CMS for content sections**: Sanity or Contentful for the FireTips / Story / Gallery
- **A/B testing**: Vercel Analytics + Optimizely or PostHog
- **Loadshedding banner**: Pull EskomSePush API to show stage status

---

Built with care for South African weekends. 🇿🇦

# Deployment Guide — Potgieter Firelighters

This is a **Next.js 14 application**. It needs a Node.js runtime — not the standard Hostinger shared hosting (which is PHP/static only). The cleanest, cheapest, fastest path is:

> **Deploy the app on Vercel. Point your Hostinger domain at it via DNS.**

You keep your domain at Hostinger. You keep your email at Hostinger. Only the website itself lives on Vercel — and Vercel is free for a project this size and made by the team that builds Next.js.

---

## Option A — Vercel + Hostinger DNS (recommended)

### 1. Push the code to GitHub

```bash
cd potgieter-firelighters
git init
git add .
git commit -m "Initial Potgieter Firelighters build"
git branch -M main
# create a new empty repo on github.com, then:
git remote add origin https://github.com/YOUR-USERNAME/potgieter-firelighters.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project**.
3. Import the `potgieter-firelighters` repo.
4. Vercel detects Next.js automatically — leave the build settings as default.
5. Open **Environment Variables** and paste in each line from `.env.local.example`, filling in the real values:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` — e.g. `potgieter-firelighters.myshopify.com`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` — from Shopify admin → Apps → Headless / Storefront API
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — your WhatsApp number in international format, no `+`, e.g. `27821234567`
   - `NEXT_PUBLIC_SITE_URL` — `https://potgieterfirelighters.co.za` (or whatever your final domain is)
   - The Yoco / Typeform keys are only needed once you wire those integrations in.
6. Click **Deploy**. First build takes ~2 minutes.
7. You now have a live URL like `potgieter-firelighters.vercel.app`.

### 3. Point your Hostinger domain at Vercel

In Vercel:

1. Open the project → **Settings → Domains**.
2. Add `potgieterfirelighters.co.za` and `www.potgieterfirelighters.co.za`.
3. Vercel shows you the DNS records you need. They will look roughly like this:
   - **A record** for `@` (the root domain) → `76.76.21.21`
   - **CNAME** for `www` → `cname.vercel-dns.com`

In Hostinger:

1. Log in → **Domains** → click your domain → **DNS / Nameservers** → **DNS Records**.
2. Delete any existing `A` record on `@` that points to Hostinger's parking page, and any existing `CNAME` on `www`.
3. Add the two records Vercel gave you exactly as shown.
4. Save. Propagation usually takes 5–30 minutes, occasionally up to a few hours.

Vercel will automatically issue an SSL certificate once DNS resolves — no extra steps.

> Heads up: leave your **MX records** (email) untouched. You're only changing the records that point to the website, not your email.

### 4. Future updates

Every `git push` to the `main` branch triggers a new deployment automatically. Push to any other branch and Vercel gives you a preview URL — handy for showing clients work-in-progress.

---

## Option B — Hostinger VPS (only if you must keep everything on Hostinger)

Hostinger's *shared* hosting plans cannot run a Next.js app. Their **VPS plans** can, but they require you to manage a Linux server yourself: installing Node.js, running the app under PM2, setting up Nginx as a reverse proxy, renewing SSL with Certbot, and so on.

For a one-person agency with limited daytime hours, this is more maintenance than it's worth. Use Option A unless you have a specific reason not to.

If you really do want this path: install Node 20+, `git clone` the repo, `npm install`, `npm run build`, then `pm2 start npm --name potgieter -- start` and put Nginx in front of port 3000. Hostinger has VPS tutorials for the Nginx and SSL parts.

---

## Option C — Static export (only if you remove ecommerce)

If you ever decide to drop Shopify integration and turn this into a brochure / lead-capture site only, you can `next build && next export` to static HTML/CSS/JS and upload the `out/` folder to Hostinger's regular shared hosting via FTP. **The current build will not work as a static export** because it uses client-side data fetching and dynamic routes. Stick with Vercel.

---

## Wiring up the integrations after deploy

The site runs out of the box on mock data so you can show it to people and click around. Before going live with real money, do these in order:

### Shopify

1. Create your Shopify store at shopify.com.
2. **Add each product** under the exact same handle used in `src/data/products.ts`:
   `rings-of-fire`, `cubes-of-fire`, `sticks-of-fire`, `bush-box`, `citronella-candles`, `insect-repellent`, `survival-tin`.
3. Set up the bundles as Shopify products too (`weekend-braai-kit`, `bushveld-box`, `loadshedding-box`) — the simplest approach is one Shopify product per bundle with the combined price.
4. Shopify admin → **Settings → Apps and sales channels → Develop apps** → Create app → enable the **Storefront API** → grant `unauthenticated_read_product_listings` and `unauthenticated_write_checkouts` scopes.
5. Copy the **Storefront access token** into Vercel env as `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`.
6. In `src/app/shop/page.tsx`, find the `TODO: replace with Shopify checkout` block and call `createCheckoutUrl()` from `src/lib/shopify.ts` instead of the mock alert.
7. Replace `src/data/products.ts` with live fetches if you'd rather not duplicate product data — or keep it as a fallback if Shopify is slow.

### Yoco

The path of least resistance: **don't write any frontend code for Yoco**. Just enable Yoco as a payment provider inside Shopify admin → **Settings → Payments → Add provider → Yoco**. Shopify's checkout will use Yoco automatically. The `src/lib/yoco.ts` file is left as a stub in case you ever want to bypass Shopify checkout.

### WhatsApp

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel env. The floating button and inline help links already use it via `whatsappUrl()` in `src/lib/utils.ts`.

### Quiz / Typeform

The custom quiz at `/quiz` works as-is. If you'd rather embed Typeform, swap `src/app/quiz/page.tsx` for an embedded Typeform iframe and set `NEXT_PUBLIC_TYPEFORM_QUIZ_ID`.

### Email signup

The form in `src/components/sections/EmailSignup.tsx` just `console.log`s the email. To collect real emails, wire it to **Klaviyo** (Shopify's preferred partner), **Mailchimp**, or even just Shopify's built-in customer list via their Admin API. Around 5 lines of code in that component.

---

## Performance & SEO checklist before launch

- Replace every Unsplash placeholder in `public/` with real product photography — keep filenames identical so no code changes are needed.
- Add a real `og-image.jpg` to `public/` (1200×630) — referenced in `src/app/layout.tsx`.
- Add a `favicon.ico` and `apple-touch-icon.png` to `public/`.
- Submit `https://potgieterfirelighters.co.za/sitemap.xml` to Google Search Console. (Optional: add a `next-sitemap` build step.)
- Run Lighthouse from Chrome DevTools after deploy. You should see 95+ on Performance and 100 on SEO/Accessibility/Best Practices without any extra work.

# /public — Static assets

Drop your real images and icons here. Anything in this folder is served from the root of the site, e.g. `public/og-image.jpg` becomes `https://yourdomain.com/og-image.jpg`.

## What to add before launch

- `favicon.ico` — 32×32, browser tab icon
- `apple-touch-icon.png` — 180×180, iOS home screen icon
- `og-image.jpg` — 1200×630, social share preview (referenced in `src/app/layout.tsx`)
- Product photography — see suggested filenames below

## Product image filenames

The mock catalog in `src/data/products.ts` currently points at Unsplash URLs. When you have real photos, the cleanest move is to add them here and update the `images` array on each product to use local paths like `/products/rings-of-fire-1.jpg`.

Suggested structure:

```
public/
├── og-image.jpg
├── favicon.ico
├── apple-touch-icon.png
├── products/
│   ├── rings-of-fire-1.jpg
│   ├── rings-of-fire-2.jpg
│   ├── cubes-of-fire-1.jpg
│   ├── sticks-of-fire-1.jpg
│   ├── bush-box-1.jpg
│   ├── citronella-candles-1.jpg
│   ├── insect-repellent-1.jpg
│   └── survival-tin-1.jpg
├── bundles/
│   ├── weekend-braai-kit.jpg
│   ├── bushveld-box.jpg
│   └── loadshedding-box.jpg
└── gallery/
    ├── braai-1.jpg
    ├── camping-1.jpg
    └── ... (user-submitted photos for /reviews)
```

## Image guidelines

- Shoot 4:5 portrait for product cards.
- Square or 16:9 works fine for the hero.
- Aim for under 500KB per image after compression — use https://squoosh.app or `sharp` if you want to script it. Next.js will further optimise them at request time via `<Image>`.
- Keep gallery photos slightly imperfect — that's the trust signal the brief calls for.

import { Product, Bundle, QuizResult } from '@/types';

// =================================================================
// PRODUCTS
// Replace `image` URLs with real product photography later.
// Wire `shopifyVariantId` once products exist in Shopify admin.
// =================================================================
export const PRODUCTS: Product[] = [
  {
    id: 'rings-of-fire',
    handle: 'rings-of-fire',
    name: 'Rings of Fire',
    tagline: 'The original — lights every time',
    description:
      'Our signature firelighter rings. Wax-impregnated for reliable ignition in any weather. One ring per braai, no kindling needed.',
    price: 49,
    category: 'fire-starters',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80',
    bestseller: true,
  },
  {
    id: 'cubes-of-fire',
    handle: 'cubes-of-fire',
    name: 'Cubes of Fire',
    tagline: 'Compact, fast, no mess',
    description:
      'Pre-cut cubes that burn long and hot. Perfect for quick weeknight braais and small fires.',
    price: 40,
    category: 'fire-starters',
    image:
      'https://images.unsplash.com/photo-1469731026835-7ca093451dde?w=1200&q=80',
    bestseller: true,
  },
  {
    id: 'sticks-of-fire',
    handle: 'sticks-of-fire',
    name: 'Sticks of Fire',
    tagline: 'Long-burn for big braais',
    description:
      'Extended-burn firelighter sticks. Built for larger fires, big braais and stubborn wood.',
    price: 49,
    category: 'fire-starters',
    image:
      'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=1200&q=80',
    bestseller: true,
  },
  {
    id: 'bush-box',
    handle: 'bush-box',
    name: 'Bush Box',
    tagline: 'Lucky packet for the outdoors',
    description:
      'A practical bundle for the boot of your bakkie. Includes Rings of Fire, a survival tin and matches.',
    price: 195,
    category: 'outdoor-utility',
    image:
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80',
    bestseller: true,
  },
  {
    id: 'citronella-candles',
    handle: 'citronella-candles',
    name: 'Citronella Candles',
    tagline: 'Keep the mossies at bay',
    description:
      'Locally made citronella candles. Burns clean for summer evenings on the stoep.',
    price: 45,
    category: 'outdoor-utility',
    image:
      'https://images.unsplash.com/photo-1602874801006-94d31c4f31ac?w=1200&q=80',
  },
  {
    id: 'insect-repellent',
    handle: 'insect-repellent',
    name: 'Insect Repellent',
    tagline: 'Bushveld-tested',
    description:
      'Practical, no-nonsense insect repellent for outdoor weekends and bushveld trips.',
    price: 45,
    category: 'outdoor-utility',
    image:
      'https://images.unsplash.com/photo-1611174340467-3d0ad8e1d44c?w=1200&q=80',
  },
  {
    id: 'survival-tin',
    handle: 'survival-tin',
    name: 'Survival Tin',
    tagline: 'Pocket-sized peace of mind',
    description:
      'A compact tin of essentials for camping, hiking and the unexpected. Slips into any pack or glove box.',
    price: 45,
    category: 'camping',
    image:
      'https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=1200&q=80',
  },
];

// =================================================================
// BUNDLES
// =================================================================
export const BUNDLES: Bundle[] = [
  {
    id: 'weekend-braai-kit',
    handle: 'weekend-braai-kit',
    name: 'Weekend Braai Kit',
    tagline: 'Everything for Saturday',
    description:
      'Built for the standard Saturday braai. Rings of Fire, Cubes of Fire and a Citronella Candle for the evening.',
    price: 119,
    saves: 15,
    contents: ['Rings of Fire', 'Cubes of Fire', 'Citronella Candle'],
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
  },
  {
    id: 'bushveld-box',
    handle: 'bushveld-box',
    name: 'Bushveld Box',
    tagline: 'For the long weekend away',
    description:
      'Made for camping, hunting and bushveld trips. Sticks of Fire for the big fires, Survival Tin and Insect Repellent.',
    price: 129,
    saves: 14,
    contents: ['Sticks of Fire', 'Survival Tin', 'Insect Repellent'],
    image:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
  },
  {
    id: 'loadshedding-box',
    handle: 'loadshedding-box',
    name: 'Loadshedding Box',
    tagline: 'Stage 6 ready',
    description:
      'Keep this in the kitchen cupboard. Citronella Candles, matches and Cubes of Fire to get a fire going when the lights go out.',
    price: 109,
    saves: 16,
    contents: ['Citronella Candles x2', 'Cubes of Fire', 'Matches'],
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
  },
];

// =================================================================
// QUIZ OUTCOMES
// =================================================================
export const QUIZ_OUTCOMES: Record<string, QuizResult> = {
  'braai-night': {
    outcome: 'braai-night',
    title: 'You\'re ready for a Saturday braai',
    blurb:
      'Classic weekend braai energy. Family, friends, a cold one in hand. You need fire that lights first time and stays out of the way.',
    recommendedProductIds: ['rings-of-fire', 'cubes-of-fire'],
    recommendedBundleIds: ['weekend-braai-kit'],
  },
  'camping-weekend': {
    outcome: 'camping-weekend',
    title: 'You\'re packing for a camping weekend',
    blurb:
      'Out in the open, away from the noise. You need fire that works in wind, dew and damp wood — and a survival tin in the bakkie.',
    recommendedProductIds: ['sticks-of-fire', 'survival-tin', 'insect-repellent'],
    recommendedBundleIds: ['bushveld-box'],
  },
  'loadshedding-prep': {
    outcome: 'loadshedding-prep',
    title: 'You\'re preparing for loadshedding',
    blurb:
      'Stage 4, 6, whatever Eskom decides. Keep the kitchen stocked with what you need to cook, see and stay comfortable.',
    recommendedProductIds: ['citronella-candles', 'cubes-of-fire'],
    recommendedBundleIds: ['loadshedding-box'],
  },
  'bushveld-trip': {
    outcome: 'bushveld-trip',
    title: 'You\'re heading to the bushveld',
    blurb:
      'Long weekend in the bush. Lapa fires, late nights, early mornings. You need utility that goes the distance.',
    recommendedProductIds: ['sticks-of-fire', 'bush-box', 'insect-repellent'],
    recommendedBundleIds: ['bushveld-box'],
  },
};

// =================================================================
// LOOKUP HELPERS
// =================================================================
export const getProductByHandle = (handle: string) =>
  PRODUCTS.find((p) => p.handle === handle);

export const getProductById = (id: string) =>
  PRODUCTS.find((p) => p.id === id);

export const getBundleById = (id: string) =>
  BUNDLES.find((b) => b.id === id);

export const getBestsellers = () => PRODUCTS.filter((p) => p.bestseller);

export const getProductsByCategory = (cat: Product['category']) =>
  PRODUCTS.filter((p) => p.category === cat);

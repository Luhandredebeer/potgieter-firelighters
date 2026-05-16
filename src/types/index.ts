export type ProductCategory =
  | 'fire-starters'
  | 'braai-essentials'
  | 'outdoor-utility'
  | 'camping';

export interface Product {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // ZAR
  category: ProductCategory;
  image: string;
  bestseller?: boolean;
  shopifyVariantId?: string; // wire up when Shopify is connected
}

export interface Bundle {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  saves: number; // R amount saved vs buying individually
  contents: string[];
  image: string;
  shopifyVariantId?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variantId?: string;
}

export type QuizOutcome =
  | 'braai-night'
  | 'camping-weekend'
  | 'loadshedding-prep'
  | 'bushveld-trip';

export interface QuizResult {
  outcome: QuizOutcome;
  title: string;
  blurb: string;
  recommendedProductIds: string[];
  recommendedBundleIds: string[];
}

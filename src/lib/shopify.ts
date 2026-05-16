/**
 * Shopify Storefront API client.
 *
 * For now the site uses the mock catalog in `src/data/products.ts`.
 * When you're ready to go live:
 *   1. Create products in Shopify admin matching the handles in `products.ts`
 *   2. Enable Storefront API in Shopify (Apps → Develop apps)
 *   3. Add the env vars in `.env.local`
 *   4. Swap the data imports in pages from `@/data/products` to call these helpers
 */

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2024-07';

export const shopifyConfigured = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
}

async function shopifyFetch<T>({ query, variables }: ShopifyFetchOptions): Promise<T> {
  if (!shopifyConfigured) {
    throw new Error('Shopify not configured. Set NEXT_PUBLIC_SHOPIFY_* env vars.');
  }

  const endpoint = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data as T;
}

// =================================================================
// CHECKOUT
// =================================================================
// Creates a Shopify cart and returns the checkout URL.
// Yoco is enabled inside Shopify as a payment gateway, so the same
// checkout URL routes customers through Yoco automatically.
export async function createCheckoutUrl(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<string> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartCreate: { cart: { checkoutUrl: string }; userErrors: { message: string }[] };
  }>({
    query,
    variables: { input: { lines } },
  });

  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(', '));
  }
  return data.cartCreate.cart.checkoutUrl;
}

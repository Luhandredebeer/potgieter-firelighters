/**
 * Yoco integration.
 *
 * The recommended flow for a small SA business:
 *   - Enable Yoco as a payment gateway inside Shopify admin
 *     (Settings → Payments → Add provider → Yoco)
 *   - Shopify checkout then routes payment through Yoco automatically
 *   - No direct Yoco SDK call is needed in the storefront
 *
 * If you ever need a standalone Yoco checkout (outside Shopify),
 * use the Yoco Online Payments API:
 *   https://developer.yoco.com/online/api-reference/
 */

export interface YocoCheckoutInput {
  amountInCents: number;
  currency: 'ZAR';
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createYocoCheckout(input: YocoCheckoutInput): Promise<string> {
  const secret = process.env.YOCO_SECRET_KEY;
  if (!secret) {
    throw new Error('YOCO_SECRET_KEY not set');
  }

  const res = await fetch('https://payments.yoco.com/api/checkouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      amount: input.amountInCents,
      currency: input.currency,
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
      metadata: input.metadata,
    }),
  });

  if (!res.ok) {
    throw new Error(`Yoco checkout creation failed: ${res.status}`);
  }
  const json = (await res.json()) as { redirectUrl: string };
  return json.redirectUrl;
}

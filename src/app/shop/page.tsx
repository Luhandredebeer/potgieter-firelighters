'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { BundleCard } from '@/components/product/BundleCard';
import { Reveal } from '@/components/ui/Reveal';
import { PRODUCTS, BUNDLES } from '@/data/products';
import { SITE, formatZAR } from '@/lib/constants';
import { whatsappUrl } from '@/lib/utils';
import type { Product, ProductCategory } from '@/types';

type FilterOption = 'all' | ProductCategory;

const FILTERS: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Fire Starters', value: 'fire-starters' },
  { label: 'Braai Essentials', value: 'braai-essentials' },
  { label: 'Outdoor Utility', value: 'outdoor-utility' },
  { label: 'Camping', value: 'camping' },
];

const FAQ = [
  {
    q: 'How fast is delivery?',
    a: 'Same-day in Krugersdorp and surrounding areas. 2-3 working days for the rest of South Africa. Flat fee of R120 nationwide, free pickup available.',
  },
  {
    q: 'Can I collect my order?',
    a: 'Yes — free pickup from our workshop in Krugersdorp. We\'ll send you the address and a time when your order is ready.',
  },
  {
    q: 'How do payments work?',
    a: 'We use Yoco for secure card payments. EFT is also available — just WhatsApp us and we\'ll send the details.',
  },
  {
    q: 'Are firelighters safe to store?',
    a: 'Yes, our wax-impregnated firelighters are stable at room temperature. Keep them away from direct heat and out of reach of children.',
  },
  {
    q: 'Do you ship outside South Africa?',
    a: 'Currently South Africa only. Send us a WhatsApp if you have a specific request.',
  },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [delivery, setDelivery] = useState<'delivery' | 'pickup'>('delivery');

  const visibleProducts = useMemo(
    () => (filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const deliveryFee = delivery === 'pickup' || subtotal === 0 ? 0 : SITE.delivery.flatFee;
  const total = subtotal + deliveryFee;
  const itemCount = cart.reduce((n, i) => n + i.qty, 0);

  const handleCheckout = async () => {
    // TODO: Replace mock alert with Shopify cart creation:
    //   const url = await createCheckoutUrl(
    //     cart.map(i => ({ merchandiseId: i.product.shopifyVariantId!, quantity: i.qty }))
    //   );
    //   window.location.href = url;
    alert(
      `Checkout coming through Shopify + Yoco.\n\nItems: ${itemCount}\nDelivery: ${delivery}\nTotal: ${formatZAR(total)}`,
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-coal-900 text-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1473662711507-13345f9d447b?w=2400&q=80"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coal-900/40 to-coal-900" />
        </div>
        <Container className="relative z-10">
          <p className="eyebrow text-ember-400">The Shop</p>
          <h1 className="mt-4 font-display uppercase text-display-sm sm:text-display-md md:text-display-lg tracking-wide leading-[0.9] text-balance">
            Built For The <span className="text-ember-500">Weekend.</span>
          </h1>
          <p className="mt-6 max-w-xl text-cream-200/80">
            Order online for delivery anywhere in South Africa, or pick up from our
            Krugersdorp workshop.
          </p>
        </Container>
      </section>

      {/* Filters + grid */}
      <section className="py-16 lg:py-20 bg-cream-50">
        <Container>
          <div className="flex flex-wrap items-center gap-2 mb-10 sticky top-16 sm:top-20 bg-cream-50 z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 border-b border-coal-900/10">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`font-display tracking-widest text-xs sm:text-sm px-4 py-2 transition-colors border ${
                  filter === f.value
                    ? 'bg-coal-900 text-cream-50 border-coal-900'
                    : 'bg-transparent text-coal-900 border-coal-900/20 hover:border-coal-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-12">
            {visibleProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} onAddToCart={addToCart} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Bundle recommendations */}
      <section className="py-20 bg-cream-100">
        <Container>
          <div className="mb-10">
            <p className="eyebrow">Save With A Kit</p>
            <h2 className="mt-3 font-display text-display-xs sm:text-display-sm tracking-wide leading-[0.95]">
              Bundle Recommendations
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BUNDLES.map((b) => (
              <BundleCard key={b.id} bundle={b} />
            ))}
          </div>
        </Container>
      </section>

      {/* WhatsApp help */}
      <section className="py-16 bg-coal-900 text-cream-50">
        <Container className="text-center">
          <p className="eyebrow text-ember-400">Not Sure What You Need?</p>
          <h2 className="mt-3 font-display text-display-xs sm:text-display-sm tracking-wide leading-[0.95]">
            We'll Help You Choose
          </h2>
          <p className="mt-4 text-cream-200/80 max-w-md mx-auto">
            Send us a WhatsApp message — we usually reply within an hour during business
            days.
          </p>
          <Button
            href={whatsappUrl("Hi Potgieter, I'd like help choosing the right products.")}
            target="_blank"
            rel="noopener"
            variant="secondary"
            size="lg"
            className="mt-7"
          >
            Chat On WhatsApp
          </Button>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream-50">
        <Container size="narrow">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-display text-display-xs sm:text-display-sm tracking-wide leading-[0.95] mb-10">
            Frequently Asked
          </h2>
          <div className="divide-y divide-coal-900/10 border-y border-coal-900/10">
            {FAQ.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Sticky cart — only when items present */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.aside
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 inset-x-0 z-30 bg-coal-900 text-cream-50 border-t border-cream-50/10"
          >
            <Container className="py-4 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="font-display tracking-widest text-xs text-ember-400">
                  Your cart · {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
                <p className="text-sm text-cream-200/70 truncate">
                  {cart.map((i) => `${i.product.name} ×${i.qty}`).join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-1 bg-cream-50/5 p-1">
                <button
                  onClick={() => setDelivery('delivery')}
                  className={`font-display tracking-widest text-xs px-3 py-2 transition-colors ${
                    delivery === 'delivery'
                      ? 'bg-ember-500 text-cream-50'
                      : 'text-cream-200/70 hover:text-cream-50'
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setDelivery('pickup')}
                  className={`font-display tracking-widest text-xs px-3 py-2 transition-colors ${
                    delivery === 'pickup'
                      ? 'bg-ember-500 text-cream-50'
                      : 'text-cream-200/70 hover:text-cream-50'
                  }`}
                >
                  Pickup
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-cream-200/60 tracking-widest uppercase">
                  Total
                </p>
                <p className="font-display tracking-wide text-2xl">
                  {formatZAR(total)}
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="font-display tracking-widest text-sm bg-ember-500 hover:bg-ember-600 text-cream-50 px-6 py-3 transition-colors"
              >
                Checkout →
              </button>
            </Container>

            {/* Mini cart line items */}
            <div className="bg-coal-800 border-t border-cream-50/5">
              <Container className="py-3 flex gap-3 overflow-x-auto">
                {cart.map((i) => (
                  <div
                    key={i.product.id}
                    className="flex items-center gap-3 shrink-0 bg-coal-900 px-3 py-2"
                  >
                    <span className="text-sm">{i.product.name}</span>
                    <div className="flex items-center gap-2 text-cream-200/80">
                      <button
                        onClick={() => updateQty(i.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-cream-50/10 hover:bg-cream-50/20"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="text-sm w-5 text-center">{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-cream-50/10 hover:bg-cream-50/20"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </Container>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full py-5 flex items-center justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-display tracking-wide text-lg sm:text-xl text-coal-900 group-hover:text-ember-600 transition-colors">
          {q}
        </span>
        <span
          className={`w-8 h-8 rounded-full border border-coal-900/20 flex items-center justify-center shrink-0 transition-transform ${
            open ? 'rotate-45' : ''
          }`}
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-coal-700 leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, FormEvent } from 'react';
import { Container } from '@/components/ui/Container';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    // TODO: Wire to Shopify Customer API, Mailchimp, or Klaviyo
    // For now this just simulates success after a delay
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-24 lg:py-32 bg-cream-100">
      <Container size="narrow">
        <div className="text-center">
          <p className="eyebrow">Saturday Mornings, Sorted</p>
          <h2 className="mt-4 font-display uppercase text-display-xs sm:text-display-sm md:text-display-md tracking-wide leading-[0.95] text-coal-900 text-balance">
            Join The <span className="text-ember-500">Weekend List</span>
          </h2>
          <p className="mt-5 text-coal-700 max-w-md mx-auto">
            One email a month. New products, braai tips, occasional weekend discounts.
            No spam, no fluff.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-cream-50 border border-coal-900/15 p-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.co.za"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-transparent px-4 py-3 outline-none text-coal-900 placeholder:text-coal-700/50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="font-display tracking-widest text-sm bg-coal-900 hover:bg-ember-600 text-cream-50 px-6 py-3 transition-colors disabled:opacity-50"
              >
                {status === 'loading'
                  ? 'Joining...'
                  : status === 'success'
                  ? 'You\'re in'
                  : 'Sign Up'}
              </button>
            </div>
            {status === 'success' && (
              <p className="mt-4 text-sm text-veld-600">
                Welkom — keep an eye on your inbox.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-flame-600">
                Something went wrong. Try again?
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

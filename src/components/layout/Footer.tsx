import Link from 'next/link';
import { NAV, SITE } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { whatsappUrl } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-coal-900 text-cream-100 mt-24">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-4xl sm:text-5xl tracking-wide text-cream-50 leading-none">
              POTGIETER
            </p>
            <p className="font-display tracking-widest text-ember-400 text-sm mt-2">
              FIRELIGHTERS
            </p>
            <p className="mt-6 text-cream-200/70 max-w-md text-sm leading-relaxed">
              Reliable firelighting and braai utility. Made locally, built for
              South African weekends.
            </p>
          </div>

          <div>
            <p className="eyebrow text-ember-400 mb-4">Shop</p>
            <ul className="space-y-2 text-cream-200/80">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-ember-400 transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-ember-400 mb-4">Contact</p>
            <ul className="space-y-2 text-cream-200/80 text-sm">
              <li>{SITE.location}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-ember-400">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl('Hi Potgieter, I have a question about an order.')}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-ember-400"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-50/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-cream-200/50">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Made in {SITE.location} 🇿🇦</p>
        </div>
      </Container>
    </footer>
  );
}

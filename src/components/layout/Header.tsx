'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-md border-b border-coal-900/5'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto max-w-7xl container-px h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="font-display text-xl tracking-widest text-coal-900 hidden sm:inline">
            POTGIETER
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display tracking-widest text-sm text-coal-900 hover:text-ember-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="font-display tracking-widest text-sm bg-coal-900 text-cream-50 px-5 py-2.5 hover:bg-ember-600 transition-colors"
          >
            Shop Now
          </Link>
        </nav>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 text-coal-900"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={cn(
                'block h-[2px] bg-current transition-transform duration-300 origin-left',
                open && 'rotate-45 translate-x-[2px]',
              )}
            />
            <span
              className={cn(
                'block h-[2px] bg-current transition-opacity duration-200',
                open && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block h-[2px] bg-current transition-transform duration-300 origin-left',
                open && '-rotate-45 translate-x-[2px]',
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-cream-50 z-30 flex flex-col"
          >
            <nav className="flex flex-col container-px py-8 gap-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl tracking-wide text-coal-900 py-3 hover:text-ember-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="inline-block font-display tracking-widest text-base bg-coal-900 text-cream-50 px-7 py-4"
                >
                  Shop Now
                </Link>
              </motion.div>
              <div className="mt-auto pt-12 text-sm text-coal-700">
                <p>{SITE.location}</p>
                <p className="mt-1">{SITE.email}</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 bg-coal-900 group-hover:bg-ember-500 transition-colors">
      <svg viewBox="0 0 20 24" className="w-4 h-5" fill="none">
        <path
          d="M10 1c2 4 6 6 6 12a6 6 0 11-12 0c0-3 1-4 3-6-1 3 1 4 2 4 1-1 0-4-1-6 1-2 1-3 2-4z"
          fill="#E0743A"
        />
      </svg>
    </span>
  );
}

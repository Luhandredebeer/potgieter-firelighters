'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const productY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-coal-900 text-cream-50 flex items-center"
    >
      {/* Background image — fire/coals */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1473662711507-13345f9d447b?w=2400&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal-900/60 via-coal-900/40 to-coal-900" />
      </div>

      {/* Ember glow */}
      <div className="absolute inset-0 bg-ember-glow opacity-60 pointer-events-none" />

      {/* Floating embers */}
      {!reduce && <Embers />}

      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 mx-auto max-w-7xl container-px py-32 sm:py-40 w-full"
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Headline */}
          <motion.div style={{ y: headlineY }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="eyebrow text-ember-400"
            >
              Locally Made · Krugersdorp
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
              }}
              className="mt-5 font-display uppercase text-display-sm sm:text-display-md lg:text-display-lg leading-[0.88] tracking-wide text-balance"
            >
              {['Made For', 'South African', 'Weekends'].map((line, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="block"
                >
                  {i === 1 ? (
                    <span className="text-ember-500">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 text-base sm:text-lg max-w-md text-cream-200/80 leading-relaxed"
            >
              Firelighters, braai essentials and outdoor utility that work the first time —
              wet wood, wind or loadshedding.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="/shop" variant="secondary" size="lg">
                Shop Now
              </Button>
              <Button
                href="/quiz"
                variant="outline"
                size="lg"
                className="border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-coal-900"
              >
                Take The Quiz
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating product */}
          <motion.div
            style={{ y: productY }}
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative aspect-square w-full max-w-md mx-auto"
          >
            <motion.div
              animate={
                reduce
                  ? {}
                  : { y: [0, -16, 0], rotate: [-2, 1, -2] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 bg-ember-glow blur-2xl scale-110" />
              <Image
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80"
                alt="Potgieter firelighters"
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-xs tracking-widest text-cream-200/60"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-cream-200/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Embers() {
  // Deterministic ember positions — avoids hydration mismatch
  const embers = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: (i * 53) % 100,
    delay: (i % 6) * 0.7,
    size: 2 + (i % 4),
    duration: 6 + (i % 5),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {embers.map((e) => (
        <motion.span
          key={e.id}
          initial={{ y: '100%', opacity: 0 }}
          animate={{
            y: '-20%',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
          }}
          className="absolute bottom-0 rounded-full bg-ember-400 shadow-[0_0_8px_rgba(224,116,58,0.8)]"
        />
      ))}
    </div>
  );
}

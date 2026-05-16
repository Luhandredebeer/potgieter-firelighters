'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { whatsappUrl } from '@/lib/utils';

// =================================================================
// COMMUNITY PHOTOS — replace with real customer submissions
// =================================================================
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80', alt: 'Saturday braai', tall: true },
  { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80', alt: 'Camping fire' },
  { src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80', alt: 'Bushveld lapa' },
  { src: 'https://images.unsplash.com/photo-1473662711507-13345f9d447b?w=1200&q=80', alt: 'Fire coals', tall: true },
  { src: 'https://images.unsplash.com/photo-1469731026835-7ca093451dde?w=1200&q=80', alt: 'Braai wood' },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80', alt: 'Firelighter rings' },
  { src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=80', alt: 'Workshop', tall: true },
  { src: 'https://images.unsplash.com/photo-1500817487388-039e623edc21?w=1200&q=80', alt: 'Highveld' },
  { src: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=1200&q=80', alt: 'Fire detail' },
];

const TESTIMONIALS = [
  {
    quote:
      "We've been buying Potgieter for over a year now. Three kids, two dogs, every Saturday a braai. Never had one fail to light.",
    name: 'Riaan & Susan',
    location: 'Roodepoort',
  },
  {
    quote:
      'I took the Bushveld Box on our Limpopo trip. Lit a fire in the rain on day three. The okes were impressed.',
    name: 'Marius J.',
    location: 'Polokwane',
  },
  {
    quote:
      "Best part is supporting a local business. The old man's products are properly made.",
    name: 'Jaco V.',
    location: 'Bloemfontein',
  },
  {
    quote:
      'Bought the Loadshedding Box during stage 6 — saved my marriage when the dinner party still happened.',
    name: 'Andre L.',
    location: 'Centurion',
  },
];

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream-50 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container>
          <p className="eyebrow">The Gallery</p>
          <h1 className="mt-4 font-display uppercase text-display-sm sm:text-display-md md:text-display-lg tracking-wide leading-[0.88] text-balance max-w-4xl">
            Real Weekends. <br />
            <span className="text-ember-500">Real Photos.</span>
          </h1>
          <p className="mt-6 max-w-lg text-coal-700 leading-relaxed">
            Sent in by customers across the country. Camp fires, family braais, bushveld
            trips — wherever you take Potgieter, we want to see it.
          </p>
          <Button
            href={whatsappUrl("Hi Potgieter, I'd like to submit a photo for the gallery.")}
            target="_blank"
            rel="noopener"
            variant="secondary"
            size="md"
            className="mt-7"
          >
            Submit Your Photo
          </Button>
        </Container>
      </section>

      {/* Masonry gallery */}
      <section className="pb-24 lg:pb-32">
        <Container size="wide">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
            {GALLERY.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
                className={`relative overflow-hidden break-inside-avoid bg-coal-900 ${
                  img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-coal-900 text-cream-50">
        <Container>
          <div className="text-center mb-14">
            <p className="eyebrow text-ember-400">From The Crew</p>
            <h2 className="mt-3 font-display uppercase text-display-xs sm:text-display-sm md:text-display-md tracking-wide leading-[0.95]">
              Word Of Mouth
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article className="bg-coal-800 p-7 sm:p-8 h-full flex flex-col">
                  <svg
                    viewBox="0 0 40 32"
                    className="w-10 h-8 text-ember-500 mb-5 shrink-0"
                    fill="currentColor"
                  >
                    <path d="M0 32V20c0-7 4-14 12-20l4 4c-4 4-6 8-6 10h6v18H0zm22 0V20c0-7 4-14 12-20l4 4c-4 4-6 8-6 10h6v18H22z" />
                  </svg>
                  <p className="text-cream-100 text-lg leading-relaxed flex-1 italic">
                    "{t.quote}"
                  </p>
                  <p className="mt-6 pt-5 border-t border-cream-50/10">
                    <span className="font-display tracking-wide text-cream-50">
                      {t.name}
                    </span>
                    <span className="text-cream-200/60 ml-2 text-sm">— {t.location}</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-100">
        <Container className="text-center">
          <h2 className="font-display uppercase text-display-xs sm:text-display-sm tracking-wide leading-[0.95] text-balance">
            Light A Fire This Weekend.
          </h2>
          <Button href="/shop" variant="primary" size="lg" className="mt-8">
            Shop Now
          </Button>
        </Container>
      </section>
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CATEGORIES = [
  {
    label: 'Fire Starters',
    slug: 'fire-starters',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80',
  },
  {
    label: 'Braai Essentials',
    slug: 'braai-essentials',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
  },
  {
    label: 'Outdoor Utility',
    slug: 'outdoor-utility',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80',
  },
  {
    label: 'Camping',
    slug: 'camping',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
  },
];

export function Categories() {
  return (
    <section className="py-24 lg:py-32 bg-cream-100">
      <Container>
        <SectionHeading
          eyebrow="Built For The Weekend"
          title="Shop By Category"
          className="mb-14"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/shop?category=${c.slug}`}
                className="group relative aspect-[3/4] block overflow-hidden bg-coal-900"
              >
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal-900 via-coal-900/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-5 sm:p-7">
                  <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-cream-50 leading-none">
                    {c.label}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-50/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-cream-50">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

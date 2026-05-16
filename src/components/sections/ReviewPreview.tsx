import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const REVIEWS = [
  {
    quote: "These rings light first time every time. Even in the rain. Won't buy anything else.",
    name: 'Pieter S.',
    location: 'Centurion',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  },
  {
    quote: "Took the Bush Box on our Kruger trip. Honestly, best R195 I've spent on outdoor gear.",
    name: 'Hannes M.',
    location: 'Pretoria',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
  },
  {
    quote: 'Loadshedding hit during a dinner party. Cubes of Fire saved the night. Boet, ek vra jou.',
    name: 'Werner K.',
    location: 'Randburg',
    image: 'https://images.unsplash.com/photo-1469731026835-7ca093451dde?w=800&q=80',
  },
];

export function ReviewPreview() {
  return (
    <section className="py-24 lg:py-32 bg-coal-900 text-cream-50">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="The Crew"
            title="From Real South African Weekends"
            light
          />
          <Link
            href="/reviews"
            className="font-display tracking-widest text-sm text-ember-400 hover:text-ember-500 transition-colors border-b border-ember-400 pb-1"
          >
            See the gallery →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <article className="bg-coal-800 flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={r.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex gap-0.5 text-ember-500 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} />
                    ))}
                  </div>
                  <p className="text-cream-100 leading-relaxed italic flex-1">
                    "{r.quote}"
                  </p>
                  <p className="mt-5 pt-5 border-t border-cream-50/10 text-sm">
                    <span className="font-display tracking-wide text-cream-50">
                      {r.name}
                    </span>
                    <span className="text-cream-200/60 ml-2">— {r.location}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.852 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.748l8.332-1.73z" />
    </svg>
  );
}

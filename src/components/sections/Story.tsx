import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

export function Story() {
  return (
    <section className="py-24 lg:py-32 bg-cream-100 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=80"
                alt="Potgieter family workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-ember-500 text-cream-50 p-6 max-w-xs hidden sm:block">
                <p className="font-display text-2xl tracking-wide leading-none">
                  Est. 2019
                </p>
                <p className="mt-2 text-xs tracking-widest uppercase opacity-80">
                  West Rand, Gauteng
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-display uppercase text-display-xs sm:text-display-sm md:text-display-md tracking-wide leading-[0.95] text-balance">
              A Family Workshop, <br />
              <span className="text-ember-500">A Better Firelighter.</span>
            </h2>

            <div className="mt-8 space-y-5 text-coal-700 leading-relaxed max-w-lg">
              <p>
                It started in a small workshop in Krugersdorp. The old man was tired of
                buying firelighters that didn't work — wax cubes that fell apart, paraffin
                sticks that smelled wrong and refused to light.
              </p>
              <p>
                So we made our own. Tested them on every braai for two years. Refined the
                wax mix until it lit first time in winter, summer, dew, wind. Then we
                started making them for the neighbours.
              </p>
              <p>
                Today, Potgieter is still a family business. Same workshop, same standards.
                Now we just ship a bit further.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-cream-200 overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt=""
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display tracking-wide text-coal-900">Jan Potgieter</p>
                <p className="text-xs text-coal-700 tracking-widest uppercase">Founder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

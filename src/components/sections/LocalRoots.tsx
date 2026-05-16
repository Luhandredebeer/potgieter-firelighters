import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

const POINTS = [
  {
    title: 'Locally Made',
    body: 'Sourced and produced in South Africa. Real local product, no imported gimmicks.',
  },
  {
    title: 'Weather Tested',
    body: 'Built for Highveld winters, summer dew and Cape wind. If it lights here, it lights anywhere.',
  },
  {
    title: 'Braai-Focused',
    body: 'We started with one product and one job: get the braai going first time, every time.',
  },
  {
    title: 'Practical Pricing',
    body: 'No premium markup. Fair pricing on products that actually work.',
  },
];

export function LocalRoots() {
  return (
    <section className="py-24 lg:py-32 bg-coal-900 text-cream-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1500817487388-039e623edc21?w=2000&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coal-900 via-coal-900/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="eyebrow text-ember-400">Local Roots</p>
            <h2 className="mt-4 font-display uppercase text-display-xs sm:text-display-sm md:text-display-md tracking-wide leading-[0.95] text-balance">
              From Krugersdorp <br />
              <span className="text-ember-500">To Your Braai.</span>
            </h2>
            <p className="mt-6 text-cream-200/80 max-w-md leading-relaxed">
              Potgieter started as a family workshop on the West Rand. We make firelighters
              the way they should be made — properly. No shortcuts, no fluff. Just product
              that works when you need it.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div>
                  <div className="w-10 h-px bg-ember-500 mb-4" />
                  <h3 className="font-display tracking-wide text-xl text-cream-50">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream-200/70 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

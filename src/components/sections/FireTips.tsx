import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const TIPS = [
  {
    n: '01',
    title: 'Start With Dry Wood',
    body: 'Sounds obvious, but stack your wood off the ground a day before. Damp wood is half the battle.',
  },
  {
    n: '02',
    title: 'One Ring, Not Five',
    body: 'A single Ring of Fire is enough for most braais. Place it under the wood, not on top — heat rises.',
  },
  {
    n: '03',
    title: 'For Windy Conditions',
    body: 'Stack the wood in a tight teepee around the firelighter. Use a braai cover or a windbreak on the side the wind is coming from.',
  },
  {
    n: '04',
    title: 'Camping Fires',
    body: 'Build a small base of kindling first, then stack progressively bigger pieces. Use Sticks of Fire — they burn long enough to get green wood going.',
  },
];

export function FireTips() {
  return (
    <section className="py-24 lg:py-32 bg-cream-50">
      <Container>
        <SectionHeading
          eyebrow="The Manual"
          title="How To Start A Fire Properly"
          intro="Quick tips from years of getting it wrong before getting it right."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl">
          {TIPS.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.08}>
              <div className="flex gap-5">
                <span className="font-display text-4xl text-ember-500 tracking-wide leading-none shrink-0">
                  {t.n}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-wide text-coal-900 leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm text-coal-700 leading-relaxed">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

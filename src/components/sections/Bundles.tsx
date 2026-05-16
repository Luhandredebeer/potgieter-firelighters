import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BundleCard } from '@/components/product/BundleCard';
import { Reveal } from '@/components/ui/Reveal';
import { BUNDLES } from '@/data/products';

export function Bundles() {
  return (
    <section className="py-24 lg:py-32 bg-cream-50 relative">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Bundles"
            title="Grab-And-Go Kits"
            intro="Hand-picked combinations for the most common weekends. Save a bit, miss nothing."
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {BUNDLES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1}>
              <BundleCard bundle={b} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

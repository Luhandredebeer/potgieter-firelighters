import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { getBestsellers } from '@/data/products';

export function Bestsellers() {
  const products = getBestsellers();

  return (
    <section className="py-24 lg:py-32 bg-cream-50">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="The Workhorses"
            title="Built To Light, Every Time"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-12">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

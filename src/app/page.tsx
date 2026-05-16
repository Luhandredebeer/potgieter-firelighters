import { Hero } from '@/components/sections/Hero';
import { Bestsellers } from '@/components/sections/Bestsellers';
import { LocalRoots } from '@/components/sections/LocalRoots';
import { Categories } from '@/components/sections/Categories';
import { Bundles } from '@/components/sections/Bundles';
import { FireTips } from '@/components/sections/FireTips';
import { Story } from '@/components/sections/Story';
import { ReviewPreview } from '@/components/sections/ReviewPreview';
import { EmailSignup } from '@/components/sections/EmailSignup';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bestsellers />
      <LocalRoots />
      <Categories />
      <Bundles />
      <FireTips />
      <Story />
      <ReviewPreview />
      <EmailSignup />
    </>
  );
}

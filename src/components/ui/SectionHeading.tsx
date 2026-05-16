import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow mb-4', light && 'text-ember-400')}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          'text-display-xs sm:text-display-sm md:text-display-md text-balance leading-[0.95]',
          light ? 'text-cream-50' : 'text-coal-900',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 text-base sm:text-lg max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-cream-200/80' : 'text-coal-700',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

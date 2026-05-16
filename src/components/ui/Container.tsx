import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}) {
  return (
    <div
      className={cn(
        'mx-auto container-px',
        size === 'default' && 'max-w-7xl',
        size === 'wide' && 'max-w-[1600px]',
        size === 'narrow' && 'max-w-4xl',
        className,
      )}
    >
      {children}
    </div>
  );
}

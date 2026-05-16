import Link from 'next/link';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-display tracking-widest uppercase transition-all duration-200 relative overflow-hidden';

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-lg',
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-coal-900 text-cream-50 hover:bg-ember-600 active:scale-[0.98]',
  secondary:
    'bg-ember-500 text-cream-50 hover:bg-ember-600 active:scale-[0.98]',
  ghost:
    'bg-transparent text-coal-900 hover:bg-coal-900/5',
  outline:
    'border border-coal-900 text-coal-900 hover:bg-coal-900 hover:text-cream-50',
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

    if ('href' in rest && rest.href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={rest.href}
          target={rest.target}
          rel={rest.rel}
          className={classes}
        >
          {children}
        </Link>
      );
    }
    const { href: _ignore, ...buttonProps } = rest as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

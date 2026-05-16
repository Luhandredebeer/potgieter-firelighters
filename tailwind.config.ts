import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Warm earthy base
        cream: {
          50: '#FBF7F0',
          100: '#F5EEE1',
          200: '#EBE0C9',
          300: '#DCC9A5',
        },
        // Burnt orange / ember
        ember: {
          400: '#E0743A',
          500: '#C95A1F',
          600: '#A8451A',
          700: '#7E3214',
        },
        // Warm reds for fire accents
        flame: {
          500: '#B23A0F',
          600: '#8E2D0B',
        },
        // Warm black / charcoal
        coal: {
          700: '#2A241F',
          800: '#1C1815',
          900: '#0F0D0B',
        },
        // Subtle bushveld green
        veld: {
          600: '#4A5A3A',
          700: '#39472C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display scale for big headings
        'display-xs': ['2.5rem', { lineHeight: '0.95', letterSpacing: '0.01em' }],
        'display-sm': ['3.5rem', { lineHeight: '0.95', letterSpacing: '0.01em' }],
        'display-md': ['5rem', { lineHeight: '0.92', letterSpacing: '0.01em' }],
        'display-lg': ['7rem', { lineHeight: '0.9', letterSpacing: '0.01em' }],
        'display-xl': ['9rem', { lineHeight: '0.88', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'ember-glow': 'radial-gradient(ellipse at center, rgba(201,90,31,0.35) 0%, rgba(178,58,15,0.15) 40%, transparent 70%)',
      },
      animation: {
        'ember-float': 'emberFloat 8s ease-in-out infinite',
        'smoke-drift': 'smokeDrift 14s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        emberFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(-30px) translateX(10px)', opacity: '1' },
        },
        smokeDrift: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translateY(-40px) scale(1.1)', opacity: '0.4' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

export const SITE = {
  name: 'Potgieter Firelighters',
  shortName: 'Potgieter',
  tagline: 'Made For South African Weekends',
  description:
    'Reliable firelighters and braai utility, locally made and built for South African weekends. Fire starters, braai essentials and outdoor utility you can trust.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://potgieterfirelighters.co.za',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27821234567',
  email: 'hello@potgieterfirelighters.co.za',
  location: 'Krugersdorp, Gauteng',
  delivery: {
    flatFee: 120,
    sameDayAreas: ['Krugersdorp', 'Roodepoort', 'Randburg', 'Honeydew'],
    pickupAvailable: true,
  },
};

export const NAV = [
  { label: 'Shop', href: '/shop' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Gallery', href: '/reviews' },
];

export const formatZAR = (amount: number) =>
  `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0 })}`;

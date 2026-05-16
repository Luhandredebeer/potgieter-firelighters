import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SITE } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappUrl(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${SITE.whatsapp}${text}`;
}

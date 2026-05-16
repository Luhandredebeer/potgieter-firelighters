'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatZAR } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onAddToCart?: (p: Product) => void;
}

export function ProductCard({ product, priority, onAddToCart }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <Link
        href={`/shop?product=${product.handle}`}
        className="relative aspect-[4/5] bg-cream-100 overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-ember-500 text-cream-50 text-[10px] font-display tracking-widest px-2.5 py-1">
            Bestseller
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-coal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <div className="pt-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl tracking-wide text-coal-900 leading-none">
            {product.name}
          </h3>
          <span className="font-display tracking-wide text-coal-900 text-lg">
            {formatZAR(product.price)}
          </span>
        </div>
        <p className="mt-2 text-sm text-coal-700 leading-relaxed">{product.tagline}</p>

        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="mt-5 self-start font-display tracking-widest text-xs text-coal-900 border-b border-coal-900 pb-1 hover:text-ember-600 hover:border-ember-600 transition-colors"
          >
            Add to cart →
          </button>
        )}
      </div>
    </motion.article>
  );
}

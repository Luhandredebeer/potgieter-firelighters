'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Bundle } from '@/types';
import { formatZAR } from '@/lib/constants';

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden bg-coal-900 text-cream-50 flex flex-col"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal-900 via-coal-900/40 to-transparent" />
        {bundle.saves > 0 && (
          <span className="absolute top-4 left-4 bg-ember-500 text-cream-50 text-[10px] font-display tracking-widest px-2.5 py-1">
            Save {formatZAR(bundle.saves)}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <p className="eyebrow text-ember-400">{bundle.tagline}</p>
        <h3 className="mt-2 font-display text-3xl sm:text-4xl tracking-wide leading-none">
          {bundle.name}
        </h3>
        <p className="mt-4 text-sm text-cream-200/70 leading-relaxed line-clamp-3">
          {bundle.description}
        </p>

        <ul className="mt-5 space-y-1.5 text-sm text-cream-200/80">
          {bundle.contents.map((c) => (
            <li key={c} className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-ember-500 shrink-0" />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-baseline justify-between gap-4 pt-5 border-t border-cream-50/10">
          <span className="font-display text-2xl tracking-wide">
            {formatZAR(bundle.price)}
          </span>
          <Link
            href={`/shop?bundle=${bundle.handle}`}
            className="font-display tracking-widest text-sm bg-ember-500 hover:bg-ember-600 text-cream-50 px-5 py-2.5 transition-colors"
          >
            Add Bundle
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

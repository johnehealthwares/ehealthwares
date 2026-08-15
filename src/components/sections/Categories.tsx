import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import type { ProductCategory } from '@/lib/types';
import { AccentTile, SectionHeader, SiteImage, getAccent, PRODUCT_ACCENTS } from '@/components/shared';

interface CategoriesProps {
  categories: ProductCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  if (!categories?.length) return null;

  const cards = categories.slice(0, 6);

  return (
    <section id="categories" className="relative overflow-hidden bg-hero-gradient py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          chip="Solutions by Category"
          title={
            <>
              One platform, <span className="text-gradient">intelligent modules</span>
            </>
          }
          subtitle="Specialized healthcare technology across every department — from the pharmacy counter to the radiology suite."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((cat, i) => {
            const accent = getAccent(cat.slug, PRODUCT_ACCENTS);
            const big = i === 0;
            const slug = cat.slug ?? '';
            return (
              <Link
                key={cat._id}
                href={`/products/${slug}`}
                className={`bento-card group flex min-h-[280px] flex-col justify-end p-6 ${big ? 'sm:col-span-2 sm:row-span-2 min-h-[440px] p-8' : ''}`}
              >
                {cat.imageUrl ? (
                  <div className="absolute inset-0 -z-10">
                    <SiteImage
                      src={cat.imageUrl}
                      alt={cat.name}
                      sizes={big ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 100vw, 30vw'}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-navy-900/10" />
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 -z-10"
                    style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, opacity: 0.92 }}
                  />
                )}

                <div className="mb-4">
                  <AccentTile accent={accent} size={big ? 60 : 48} />
                </div>
                <h3 className={`font-display font-bold text-white ${big ? 'text-2xl' : 'text-lg'}`}>
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className={`mt-2 text-sm leading-relaxed text-white/75 ${big ? 'max-w-md' : ''}`}>
                    {cat.description}
                  </p>
                )}
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${
                    big ? 'text-amber-300' : 'text-white/90'
                  }`}
                >
                  Explore
                  <IconArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>

                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
                  style={{ background: `radial-gradient(circle, ${accent.from}, transparent 70%)` }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

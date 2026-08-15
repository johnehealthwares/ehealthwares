import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import type { Product } from '@/lib/types';
import { SectionHeader, SiteImage, getAccent, PRODUCT_ACCENTS, type Accent } from '@/components/shared';

interface ProductsGridProps {
  products: Product[];
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products?.length) return null;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 hex-pattern opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          chip="Our Products"
          title={
            <>
              Enterprise platforms for <span className="text-gradient">every care pathway</span>
            </>
          }
          subtitle="Deep, domain-specific software that streamlines diagnostics, pharmacy, laboratory, radiology, training, and virtual care workflows."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const accent = getAccent(product.slug, PRODUCT_ACCENTS);
            return (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="bento-card group flex flex-col"
              >
                <ProductImage product={product} accent={accent} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-blue-600">
                    {product.name}
                  </h3>
                  {product.tagline && (
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{product.tagline}</p>
                  )}

                  {product.features?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                          style={{ backgroundColor: accent.soft, color: accent.text }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold"
                    style={{ color: accent.text }}
                  >
                    Explore module
                    <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
                  style={{ backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductImage({ product, accent }: { product: Product; accent: Accent }) {
  const src = product.imageUrl || DEFAULT_IMAGE;
  const Icon = accent.icon;

  return (
    <div className="relative h-44 w-full overflow-hidden">
      <SiteImage
        src={src}
        alt={product.name}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${accent.from}22 0%, transparent 40%, ${accent.to}33 100%)` }}
      />
      <span
        className="absolute bottom-3 left-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
        style={{
          backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          boxShadow: `0 12px 32px -8px ${accent.ring}`,
        }}
      >
        <Icon size={22} stroke={2} />
      </span>
    </div>
  );
}

import type { Metadata } from 'next';
import { IconCheck, IconArrowRight, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';
import { ehealthwaresApi } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AccentTile, SiteImage, getAccent, PRODUCT_ACCENTS } from '@/components/shared';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await ehealthwaresApi.getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.metaTitle || product.name,
    description:
      product.metaDescription ||
      product.tagline ||
      `${product.name} — enterprise healthcare technology from eHealthwares.`,
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await ehealthwaresApi.getProductBySlug(slug);
  if (!product) notFound();

  const accent = getAccent(product.slug, PRODUCT_ACCENTS);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0">
          <SiteImage
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={product.name}
            priority
            sizes="100vw"
            className="opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/60" />
          <div
            className="absolute inset-0 opacity-25"
            style={{ background: `radial-gradient(ellipse 60% 55% at 75% 20%, ${accent.from}, transparent 70%)` }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 sm:pt-44">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
            <IconSparkles size={13} style={{ color: '#F59E0B' }} />
            eHealthWares Module
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{product.tagline}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gradient !px-7 !py-3.5 !text-base">
              Book a Demo
              <IconArrowRight size={18} />
            </Link>
            <Link href="/products-services" className="btn-ghost-light !px-7 !py-3.5 !text-base">
              View All Modules
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <AccentTile accent={accent} size={60} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: accent.text }}>
                  {product.name}
                </span>
              </div>

              {product.description && (
                <div
                  className="prose max-w-none text-navy-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-navy-900 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {product.features?.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-extrabold text-navy-900">
                    Capabilities
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white/70 p-4"
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                        >
                          <IconCheck size={12} stroke={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-navy-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky CTA card */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass-card rounded-2xl p-7">
                <div
                  className="rounded-2xl p-6 text-white"
                  style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                >
                  <h3 className="font-display text-lg font-bold">See {product.name} in action</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    Book a tailored walkthrough with our solutions team — no obligation.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-navy-900 transition-transform hover:-translate-y-0.5"
                  >
                    Contact Sales
                    <IconArrowRight size={16} />
                  </Link>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-navy-400">
                  Deployed across hospitals, clinics, pharmacies, and laboratories in Africa and
                  beyond.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

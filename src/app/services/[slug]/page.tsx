import type { Metadata } from 'next';
import { IconArrowRight, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';
import { ehealthwaresApi } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AccentTile, getAccent, SERVICE_ACCENTS } from '@/components/shared';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await ehealthwaresApi.getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description:
      service.tagline ||
      `${service.name} — healthcare technology services from eHealthwares.`,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await ehealthwaresApi.getServiceBySlug(slug);
  if (!service) notFound();

  const accent = getAccent(service.slug, SERVICE_ACCENTS);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(ellipse 55% 60% at 80% 15%, ${accent.from}, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <div className="mb-6 flex items-center gap-4">
            <AccentTile accent={accent} size={64} />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
              <IconSparkles size={13} className="text-amber-300" />
              eHealthWares Service
            </span>
          </div>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            {service.name}
          </h1>
          {service.tagline && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{service.tagline}</p>
          )}
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              {service.description && (
                <div
                  className="prose max-w-none leading-relaxed text-navy-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-navy-900 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass-card rounded-2xl p-7">
                <div
                  className="rounded-2xl p-6 text-white"
                  style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                >
                  <h2 className="font-display text-lg font-bold">Ready to get started?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    Talk to our solutions team about {service.name} for your organization.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-navy-900 transition-transform hover:-translate-y-0.5"
                  >
                    Contact Sales
                    <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

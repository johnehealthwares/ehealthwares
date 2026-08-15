import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { ehealthwaresApi } from '@/lib/api';
import { AccentTile, SectionHeader, SiteImage, getAccent, PRODUCT_ACCENTS, SERVICE_ACCENTS } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Products & Services — Healthcare Technology Solutions',
  description:
    'Explore eHealthwares products and services: PrognoCare EMR, RxSoft pharmacy management, laboratory information systems, radiology systems, telemedicine, healthcare interoperability, and digital transformation services.',
  alternates: { canonical: '/products-services' },
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';

export default async function ProductsServicesPage() {
  let products: any[] = [], services: any[] = [];
  try {
    const result = await Promise.all([
      ehealthwaresApi.getProducts(),
      ehealthwaresApi.getServices(),
    ]);
    products = result[0] ?? [];
    services = result[1] ?? [];
  } catch (e) {
    console.error('ProductsServicesPage data fetch failed:', e);
  }

  return (
    <div className="relative overflow-hidden bg-hero-gradient">
      <div className="pointer-events-none absolute inset-0 hex-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 sm:pt-40">
        <SectionHeader
          chip="What We Build"
          title={
            <>
              Products & <span className="text-gradient">Services</span>
            </>
          }
          subtitle="Enterprise healthcare technology platforms and expert services designed to transform operations — from the pharmacy counter to the radiology suite."
        />

        {products.length > 0 && (
          <div className="mt-4">
            <h2 className="mb-6 font-display text-2xl font-extrabold text-navy-900">Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p: any) => {
                const accent = getAccent(p.slug, PRODUCT_ACCENTS);
                return (
                  <Link
                    key={p._id}
                    href={`/products/${p.slug}`}
                    className="bento-card group flex flex-col"
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <SiteImage
                        src={p.imageUrl || DEFAULT_IMAGE}
                        alt={p.name}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${accent.to}33 100%)` }} />
                      <div className="absolute bottom-3 left-4">
                        <AccentTile accent={accent} size={48} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-blue-600">
                        {p.name}
                      </h3>
                      {p.tagline && <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{p.tagline}</p>}
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-blue-600">
                        Explore
                        <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-extrabold text-navy-900">Services</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((s: any) => {
                const accent = getAccent(s.slug, SERVICE_ACCENTS);
                return (
                  <Link
                    key={s._id}
                    href={`/services/${s.slug}`}
                    className="glass-card group flex items-start gap-5 rounded-2xl p-7"
                  >
                    <AccentTile accent={accent} size={54} />
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-blue-600">
                        {s.name}
                      </h3>
                      {s.tagline && <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{s.tagline}</p>}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                        Learn more
                        <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

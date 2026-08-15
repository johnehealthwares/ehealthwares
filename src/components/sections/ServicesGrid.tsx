import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import type { Service } from '@/lib/types';
import { AccentTile, ArrowLink, SectionHeader, getAccent, SERVICE_ACCENTS } from '@/components/shared';

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (!services?.length) return null;

  return (
    <section className="relative overflow-hidden bg-section-gradient py-24">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          chip="Expert Services"
          title={
            <>
              Strategy and engineering that <span className="text-gradient">accelerate your journey</span>
            </>
          }
          subtitle="From digital transformation roadmaps to custom healthcare software, our teams embed with yours to deliver measurable outcomes."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const accent = getAccent(service.slug, SERVICE_ACCENTS);
            return (
              <Link
                key={service._id}
                href={`/services/${service.slug}`}
                className="glass-card group relative flex items-start gap-5 overflow-hidden rounded-2xl p-7"
              >
                <AccentTile accent={accent} size={56} />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-blue-600">
                    {service.name}
                  </h3>
                  {service.tagline && (
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{service.tagline}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                    Learn more
                    <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <span
                  className="pointer-events-none absolute -bottom-14 -right-14 h-40 w-40 rounded-full opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-35"
                  style={{ background: `radial-gradient(circle, ${accent.from}, transparent 70%)` }}
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <ArrowLink href="/products-services">View all products &amp; services</ArrowLink>
        </div>
      </div>
    </section>
  );
}

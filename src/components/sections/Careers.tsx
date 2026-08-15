import Link from 'next/link';
import { IconArrowRight, IconMapPin } from '@tabler/icons-react';
import type { Career } from '@/lib/types';
import { SectionHeader } from '@/components/shared';

interface CareersProps {
  careers: Career[];
}

const TYPE_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  'full-time': { label: 'Full-time', bg: 'rgba(37,99,235,0.12)', text: '#1D4ED8' },
  contract: { label: 'Contract', bg: 'rgba(245,158,11,0.15)', text: '#B45309' },
  remote: { label: 'Remote', bg: 'rgba(13,148,136,0.12)', text: '#0F766E' },
};

export function Careers({ careers }: CareersProps) {
  if (!careers?.length) return null;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          chip="Careers"
          title={
            <>
              Build software that <span className="text-gradient">matters</span>
            </>
          }
          subtitle="Join a team shipping enterprise healthcare technology across Africa — engineering, product, and clinical systems."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {careers.map((c) => {
            const typeStyle = TYPE_STYLES[c.type] ?? TYPE_STYLES['full-time'];
            return (
              <Link
                key={c._id}
                href={`/careers/${c.slug}`}
                className="glass-card group flex flex-col rounded-2xl p-7"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: typeStyle.bg, color: typeStyle.text }}
                  >
                    {typeStyle.label}
                  </span>
                  {c.department && (
                    <span className="rounded-full border border-navy-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-500">
                      {c.department}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-blue-600">
                  {c.title}
                </h3>
                {c.location && (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-navy-500">
                    <IconMapPin size={15} className="text-coral-500" />
                    {c.location}
                  </span>
                )}
                {c.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy-500">
                    {c.description.replace(/<[^>]+>/g, '')}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-blue-600">
                  View position
                  <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

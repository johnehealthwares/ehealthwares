import type { Partner } from '@/lib/types';
import { SectionHeader } from '@/components/shared';

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  if (!partners?.length) return null;

  const doubled = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          chip="Strategic Partnerships"
          title={
            <>
              Growing the <span className="text-gradient">connected ecosystem</span>
            </>
          }
          subtitle="We partner with EMR vendors, labs, pharmacies, and technology teams to extend digital care beyond the core record."
        />
      </div>

      <div className="relative mt-2 overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#f7f9fd] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#f7f9fd] to-transparent" />
        <div className="marquee-track gap-5 px-5">
          {doubled.map((p, i) => (
            <div
              key={`${p._id}-${i}`}
              className="glass flex h-20 w-64 shrink-0 items-center justify-center rounded-2xl px-6"
            >
              <span className="font-display text-base font-bold text-navy-700">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

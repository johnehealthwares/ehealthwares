import type { InvestorData } from '@/lib/types';
import { SectionHeader } from '@/components/shared';

interface InvestorsProps {
  data: InvestorData[];
}

const GRADIENTS = [
  'linear-gradient(135deg, #2563EB, #7C3AED)',
  'linear-gradient(135deg, #0D9488, #16A34A)',
  'linear-gradient(135deg, #F59E0B, #F43F5E)',
  'linear-gradient(135deg, #7C3AED, #2563EB)',
  'linear-gradient(135deg, #16A34A, #0D9488)',
];

export function Investors({ data }: InvestorsProps) {
  if (!data?.length) return null;

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24">
      <div className="pointer-events-none absolute inset-0 hex-pattern opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          dark
          chip="Impact & Growth"
          title={
            <>
              A platform that is <span className="text-gradient">gaining real traction</span>
            </>
          }
          subtitle="Enterprise-grade reliability and expanding deployments across the African healthcare market."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {data.map((d, i) => (
            <div key={d._id} className="glass-dark rounded-2xl p-6 text-center">
              <div
                className="bg-clip-text font-display text-4xl font-extrabold tracking-tight text-transparent"
                style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
              >
                {d.value}
              </div>
              <div className="mt-2 text-sm font-bold text-white">{d.label}</div>
              {d.description && <div className="mt-1 text-xs leading-relaxed text-white/55">{d.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

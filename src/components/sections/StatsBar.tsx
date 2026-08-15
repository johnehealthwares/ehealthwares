import { IconActivity, IconBuildingHospital, IconPlugConnected, IconShieldCheck } from '@tabler/icons-react';

const stats = [
  { value: '10+', label: 'Years of Experience', icon: IconShieldCheck, color: '#2563EB' },
  { value: '50+', label: 'Healthcare Organizations', icon: IconBuildingHospital, color: '#7C3AED' },
  { value: '200+', label: 'Integrations Delivered', icon: IconPlugConnected, color: '#0D9488' },
  { value: '99.9%', label: 'Platform Uptime', icon: IconActivity, color: '#F59E0B' },
];

export function StatsBar() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-cta-gradient p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 dots-pattern opacity-20" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                  style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <stat.icon size={22} style={{ color: stat.color }} />
                </span>
                <div>
                  <div className="font-display text-3xl font-extrabold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-white/70">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

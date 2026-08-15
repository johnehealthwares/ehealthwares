import type { Metadata } from 'next';
import { IconArrowRight, IconTarget, IconEye, IconHeartHandshake } from '@tabler/icons-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared';

export const metadata: Metadata = {
  title: 'About Us — eHealthwares Healthcare Technology Solutions',
  description:
    'eHealthwares designs and delivers enterprise healthcare technology solutions that connect patients, providers, clinical teams, and operational systems — EMR, pharmacy, laboratory, radiology, telemedicine, and interoperability.',
  alternates: { canonical: '/about' },
};

const TEAM = [
  {
    name: 'John Alade',
    role: 'Chief Executive Officer',
    bio: 'Visionary leader with 14+ years in healthcare technology, building the connected care ecosystem behind eHealthwares.',
    gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
  },
  {
    name: 'Jane Smith',
    role: 'Chief Technology Officer',
    bio: 'Expert in healthcare systems architecture and interoperability — from HL7 and FHIR to enterprise platform design.',
    gradient: 'linear-gradient(135deg, #0D9488, #2563EB)',
  },
  {
    name: 'Dr. Michael Ade',
    role: 'VP of Healthcare Solutions',
    bio: 'Physician and technologist bridging clinical and digital domains to keep every platform grounded in frontline care.',
    gradient: 'linear-gradient(135deg, #F43F5E, #F59E0B)',
  },
];

const PILLARS = [
  {
    icon: IconTarget,
    title: 'Mission',
    text: 'Give healthcare organizations a single, secure source of clinical truth — so care teams spend less time on paperwork and more time with patients.',
  },
  {
    icon: IconEye,
    title: 'Vision',
    text: 'Make health records work for every clinician, connecting hospitals, clinics, labs, and pharmacies into one seamless care ecosystem.',
  },
  {
    icon: IconHeartHandshake,
    title: 'Approach',
    text: 'Combine healthcare software engineering, interoperability, workflow automation, and intelligent data — delivered with clinical empathy.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <span className="chip chip-dark">About</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Transforming healthcare through <span className="text-gradient">connected technology</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            eHealthwares designs and delivers enterprise healthcare technology solutions that
            connect patients, providers, clinical teams, and operational systems through
            integrated digital platforms.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gradient !px-7 !py-3.5 !text-base">
              Talk to Our Team
              <IconArrowRight size={18} />
            </Link>
            <Link href="/products-services" className="btn-ghost-light !px-7 !py-3.5 !text-base">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Story + pillars */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeader
                align="left"
                chip="Our Story"
                title={
                  <>
                    One healthcare platform. <span className="text-gradient">Multiple intelligent modules.</span>
                  </>
                }
              />
              <div className="space-y-4 leading-relaxed text-navy-600">
                <p>
                  We help healthcare organizations transform care delivery by combining healthcare
                  software engineering, interoperability, workflow automation, communication
                  platforms, and intelligent data solutions.
                </p>
                <p>
                  Through strategic partnerships such as HealthStack (EMR) and products such as
                  RxSoft Pharmacy Management System, PrognoCare EMR, MedTrain, and Myaia,
                  eHealthwares enables healthcare providers to extend their digital capabilities
                  beyond the core record.
                </p>
                <p>
                  From the pharmacy counter to the radiology suite — from the lab bench to the
                  telemedicine consult — we build the modules that make one connected care
                  ecosystem.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {PILLARS.map((pillar, i) => (
                <div key={pillar.title} className="glass-card flex items-start gap-5 rounded-2xl p-6">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{
                      backgroundImage: ['linear-gradient(135deg,#2563EB,#7C3AED)', 'linear-gradient(135deg,#0D9488,#2563EB)', 'linear-gradient(135deg,#F59E0B,#F43F5E)'][i],
                    }}
                  >
                    <pillar.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">{pillar.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{pillar.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-section-gradient py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            chip="Leadership"
            title={
              <>
                The team behind <span className="text-gradient">the ecosystem</span>
              </>
            }
            subtitle="Clinicians, engineers, and operators building healthcare technology that works at the point of care."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="glass-card rounded-2xl p-8 text-center">
                <span
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl font-display text-3xl font-extrabold text-white shadow-lg"
                  style={{ backgroundImage: member.gradient }}
                >
                  {member.name.charAt(0)}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{member.name}</h3>
                <p className="mt-1 text-sm font-bold" style={{ color: '#2563EB' }}>
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrowRight, IconPlugConnected, IconBuildingSkyscraper, IconUsers, IconFlask } from '@tabler/icons-react';
import { SectionHeader } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Partnerships — Integrate and Grow with eHealthwares',
  description:
    'Partner with eHealthwares: healthcare integration partnerships, technology alliances, and channel partnerships that extend EMR, pharmacy, laboratory, and radiology ecosystems.',
  alternates: { canonical: '/partnerships' },
};

const PARTNERSHIPS = [
  {
    title: 'Healthcare Integration Partners',
    description:
      'Labs, pharmacies, imaging centers, and EMR vendors that connect with the eHealthwares ecosystem through HL7, FHIR, and DICOM interoperability.',
    icon: IconPlugConnected,
    gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
  },
  {
    title: 'Technology Alliances',
    description:
      'Cloud, infrastructure, and software vendors co-building the digital health platforms of the future with eHealthwares.',
    icon: IconBuildingSkyscraper,
    gradient: 'linear-gradient(135deg, #0D9488, #2563EB)',
  },
  {
    title: 'Channel & Reseller Partners',
    description:
      'Healthcare IT resellers and consultants who bring eHealthwares products — PrognoCare EMR, RxSoft pharmacy, LIS, and RIS — to their clients.',
    icon: IconUsers,
    gradient: 'linear-gradient(135deg, #F59E0B, #F43F5E)',
  },
  {
    title: 'Clinical & Research Collaborations',
    description:
      'Hospitals, universities, and research groups exploring AI in healthcare, clinical informatics, and next-generation care delivery.',
    icon: IconFlask,
    gradient: 'linear-gradient(135deg, #7C3AED, #0D9488)',
  },
];

export default function PartnershipsPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <span className="chip chip-dark">Partnerships</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Partner with <span className="text-gradient">eHealthwares</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            eHealthwares builds connected healthcare technology ecosystems. We partner with
            healthcare organizations, technology vendors, and channel partners to extend digital
            capabilities across EMR, pharmacy, laboratory, radiology, and patient engagement.
          </p>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            chip="Ways to Partner"
            title={
              <>
                Four ways to <span className="text-gradient">build together</span>
              </>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {PARTNERSHIPS.map((p) => (
              <div key={p.title} className="glass-card group flex items-start gap-5 rounded-2xl p-7">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{ backgroundImage: p.gradient }}
                >
                  <p.icon size={26} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-navy-900">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{p.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-3xl bg-cta-gradient p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 dots-pattern opacity-20" />
            <div className="relative">
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Let&apos;s Build Together
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/75">
                Interested in partnering with eHealthwares? Reach out to our partnerships team.
              </p>
              <Link href="/contact" className="btn-gradient mt-7 !bg-white !px-8 !py-3.5 !text-base !text-navy-900">
                Contact Us
                <IconArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { IconArrowLeft, IconMapPin, IconMail, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { ehealthwaresApi } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const careers = await ehealthwaresApi.getCareers();
  const career = careers?.find((c) => c.slug === slug);
  if (!career) return {};
  return {
    title: `${career.title} — Careers`,
    description: career.description?.replace(/<[^>]+>/g, '') || career.title,
    alternates: { canonical: `/careers/${slug}` },
  };
}

export default async function CareerPage({ params }: PageProps) {
  const { slug } = await params;
  const careers = await ehealthwaresApi.getCareers();
  const career = careers?.find((c) => c.slug === slug);
  if (!career) notFound();

  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white">
            <IconArrowLeft size={16} />
            All positions
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {career.type?.replace('-', ' ')}
            </span>
            {career.department && (
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/70">
                {career.department}
              </span>
            )}
          </div>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            {career.title}
          </h1>
          {career.location && (
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-white/70">
              <IconMapPin size={15} className="text-coral-400" />
              {career.location}
            </span>
          )}
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-6">
          {career.description && (
            <p className="text-lg leading-relaxed text-navy-700">
              {career.description.replace(/<[^>]+>/g, '')}
            </p>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Type', value: career.type?.replace('-', ' ') ?? 'Full-time' },
              { label: 'Department', value: career.department ?? 'General' },
              { label: 'Location', value: career.location ?? 'Remote' },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                  {item.label}
                </div>
                <div className="mt-1 text-sm font-bold text-navy-900">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">How to apply</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Send your CV and a short cover letter to our team — we typically respond within one
              week.
            </p>
            <a
              href={`mailto:info@ehealthwares.com?subject=Application: ${encodeURIComponent(career.title)}`}
              className="btn-gradient mt-5 inline-flex !px-6 !py-3"
            >
              <IconMail size={16} />
              Apply for this role
            </a>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-navy-900">Why eHealthwares?</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                'Real impact in African healthcare',
                'Modern stack — NestJS, React, MongoDB, PostgreSQL',
                'Remote-friendly and hybrid roles',
                'Grow with the product and the platform',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-navy-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <IconCheck size={12} stroke={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

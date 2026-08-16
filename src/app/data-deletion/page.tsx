import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrowRight, IconTrash, IconMail, IconClock, IconShieldCheck } from '@tabler/icons-react';
import { SectionHeader } from '@/components/shared';
import { DataDeletionForm } from './DataDeletionForm';

export const metadata: Metadata = {
  title: 'Data Deletion Request — eHealthwares',
  description:
    'Request deletion of your personal data from eHealthwares. Instructions on how our data deletion process works and a form to submit your request.',
  alternates: { canonical: '/data-deletion' },
};

const STEPS = [
  {
    icon: IconMail,
    title: 'Submit the form',
    text: 'Fill in the request form below with the account details (name, email, and username) tied to the data you want deleted.',
  },
  {
    icon: IconClock,
    title: 'We verify & review',
    text: 'Our privacy team verifies your identity and reviews the request within a few business days. We may contact you if we need more information.',
  },
  {
    icon: IconTrash,
    title: 'Data is deleted',
    text: 'We delete your personal data from our systems within 30 days, in line with the Nigeria Data Protection Act 2023 (NDPA). Certain records may be retained where required by law.',
  },
];

export default function DataDeletionPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-rose-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <span className="chip chip-dark">Privacy</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Delete your <span className="text-gradient">data</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            You have the right to request deletion of your personal data at any time. Here&apos;s
            how we handle it — and how to submit your request.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#request-form" className="btn-gradient !px-7 !py-3.5 !text-base">
              Submit a Request
              <IconArrowRight size={18} />
            </a>
            <Link href="/privacy-policy" className="btn-ghost-light !px-7 !py-3.5 !text-base">
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            chip="How It Works"
            title={
              <>
                Three simple steps to <span className="text-gradient">delete your data</span>
              </>
            }
            subtitle="We make exercising your data rights straightforward and responsive."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="glass-card relative rounded-2xl p-7">
                <span className="absolute right-5 top-4 font-display text-6xl font-extrabold text-navy-100">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-blue-600 text-white shadow-lg">
                  <step.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-navy-100 bg-navy-50/60 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-blue-600 text-white shadow-lg">
              <IconShieldCheck size={20} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-navy-900">Good to know</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                Deleting your personal data does not affect the lawfulness of processing carried out
                before deletion (NDPA Section 35). Some records — such as those needed for
                regulatory, legal, or billing purposes — may be retained for the period required by
                law. You can also email your request directly to{' '}
                <a href="mailto:privacy@ehealthwares.com" className="font-semibold text-blue-600 hover:text-blue-700">
                  privacy@ehealthwares.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request-form" className="relative overflow-hidden bg-section-gradient py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader
            chip="Request Form"
            title={
              <>
                Submit your <span className="text-gradient">deletion request</span>
              </>
            }
            subtitle="Please provide the details below. Requests are processed within 30 days."
          />
          <div className="glass-card mt-10 rounded-2xl p-7 sm:p-10">
            <DataDeletionForm />
          </div>
        </div>
      </section>
    </div>
  );
}
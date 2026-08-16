import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrowRight, IconScale } from '@tabler/icons-react';
import { SectionHeader } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Terms of Service — eHealthwares',
  description:
    'Terms of service governing the use of eHealthwares products and services, including PrognoCare EMR, RxSoft Pharmacy, laboratory, radiology, telemedicine, and interoperability platforms.',
  alternates: { canonical: '/terms-of-service' },
};

const TOS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using eHealthwares websites, products, and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.',
      'These terms may be updated from time to time. We will post any changes on this page, and continued use of our services after changes take effect constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: '2. Description of Services',
    paragraphs: [
      'eHealthwares provides enterprise healthcare technology platforms, including electronic health records (EHR), pharmacy management, laboratory and radiology information systems, telemedicine, and interoperability solutions. Services are provided to organizations and their authorized users under separate subscription or license agreements.',
    ],
  },
  {
    title: '3. Accounts and Responsibilities',
    paragraphs: [
      'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized access or use.',
      'You agree to provide accurate and complete information and to keep your account information current. You may only use the services for lawful healthcare operations and in compliance with applicable laws, including data protection regulations.',
    ],
  },
  {
    title: '4. Acceptable Use',
    paragraphs: [
      'You agree not to misuse our services, including but not limited to: attempting to gain unauthorized access, interfering with service operation, transmitting malicious code, or using the services in any way that violates applicable law or the rights of others.',
    ],
  },
  {
    title: '5. Intellectual Property',
    paragraphs: [
      'All software, designs, content, and materials provided by eHealthwares are the property of eHealthwares or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without prior written consent.',
    ],
  },
  {
    title: '6. Privacy and Data Protection',
    paragraphs: [
      'Our handling of personal and health information is described in our Privacy Policy. Where applicable, we comply with the Nigeria Data Protection Act 2023 (NDPA) and US HIPAA. You may request deletion of your personal data at any time by following the instructions on our Data Deletion page.',
    ],
  },
  {
    title: '7. Disclaimers and Limitation of Liability',
    paragraphs: [
      'Services are provided "as is" without warranties of any kind, whether express or implied. To the maximum extent permitted by law, eHealthwares shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of our services.',
      'Healthcare decisions remain the responsibility of licensed professionals and organizations. Our technology supports — but does not replace — clinical judgment.',
    ],
  },
  {
    title: '8. Termination',
    paragraphs: [
      'We may suspend or terminate access to services for violations of these terms or applicable law. Upon termination, you remain responsible for obligations accrued before termination, and provisions that by their nature survive termination remain in effect.',
    ],
  },
  {
    title: '9. Contact',
    paragraphs: [
      'Questions about these Terms of Service? Contact us at info@ehealthwares.com or via our contact page.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <span className="chip chip-dark">Legal</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            The terms governing your use of eHealthwares products, platforms, and websites.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="btn-gradient !px-7 !py-3.5 !text-base">
              Read Our Privacy Policy
              <IconArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-ghost-light !px-7 !py-3.5 !text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Terms body */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader
            align="left"
            chip="Our Agreement"
            title={
              <>
                Clear terms for <span className="text-gradient">every user</span>
              </>
            }
            subtitle="Last updated: August 2026. These terms form a binding agreement between you and eHealthwares."
          />

          <div className="mt-12 space-y-8">
            {TOS_SECTIONS.map((section, i) => (
              <article
                key={section.title}
                className="glass-card rounded-3xl scroll-mt-28 p-7 sm:p-9"
                id={`section-${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">
                    <IconScale size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy-900">{section.title}</h2>
                    <div className="mt-3 space-y-4">
                      {section.paragraphs.map((paragraph, j) => (
                        <p
                          key={j}
                          className={`leading-relaxed text-navy-600 ${j > 0 ? 'text-sm' : ''}`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-navy-100 bg-navy-50/60 p-7 text-center sm:p-9">
            <h2 className="font-display text-lg font-bold text-navy-900">Questions about these terms?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-navy-500">
              Reach out to us at{' '}
              <a href="mailto:info@ehealthwares.com" className="font-semibold text-blue-600 hover:text-blue-700">
                info@ehealthwares.com
              </a>{' '}
              and we&apos;ll be happy to help.
            </p>
            <Link href="/contact" className="btn-gradient mt-6">
              Get in Touch
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
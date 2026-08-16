import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrowRight, IconShieldLock } from '@tabler/icons-react';
import { SectionHeader } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Privacy Policy — eHealthwares | NDPA 2023 & HIPAA Privacy Practices',
  description:
    'eHealthwares privacy policy: how we handle protected health information under the Nigeria Data Protection Act 2023 (NDPA) and US HIPAA, including e-prescribing and health information exchange practices.',
  alternates: { canonical: '/privacy-policy' },
};

const PRIVACY_SECTIONS = [
  {
    title: 'NDPA 2023 — Privacy Notice (Nigeria Data Protection Act)',
    paragraphs: [
      'As required by the Nigeria Data Protection Act 2023 (NDPA), we provide a clear Privacy Notice describing how personal health information is collected, used, and safeguarded. Health status, genetic data, and biometric data constitute sensitive personal data under Section 30 of the NDPA and are processed only with your explicit consent or as otherwise permitted by law.',
      'You have the right to withdraw your consent at any time under Section 35 of the NDPA. Withdrawal does not affect the lawfulness of processing carried out before withdrawal. If you believe your data has not been handled in line with the NDPA, you may lodge a complaint with the Nigeria Data Protection Commission (NDPC).',
      'Data Controller: eHealthwares Ltd. | DPO Contact: privacy@ehealthwares.com | NDPC: www.ndpc.gov.ng',
    ],
  },
  {
    title: 'Notice of Privacy Practices (HIPAA)',
    paragraphs: [
      'For users under US jurisdiction, we provide a Notice of Privacy Practices that describes your rights regarding protected health information, how it may be used and disclosed, and your rights to access, amend, and request an accounting of disclosures.',
      'Where written acknowledgment of receipt of the Notice of Privacy Practices could not be obtained, the reason is documented in accordance with applicable regulation. Health information is used and disclosed only for treatment, payment, and healthcare operations, or where otherwise permitted or required by law.',
      'Medical doctors and the practice are licensed and regulated by the Medical Board of CA, 800-633-3233, www.mbc.ca.gov.',
    ],
  },
  {
    title: 'E-Prescribing & Health Information Exchange',
    paragraphs: [
      'In the interest of improving quality of care, eHealthwares platforms utilize electronic health record (EHR) and electronic prescribing (e-prescribing) systems to manage patient information, send prescriptions to pharmacies, and share relevant health information with authorised healthcare providers involved in your care.',
      'For patients under Nigerian jurisdiction, processing complies with the National Health Information Technology (NHIT) framework and National Health Insurance Authority (NHIA) guidelines for electronic health information exchange.',
      'For patients under US jurisdiction, the Medicare Modernization Act of 2003 lists standards that must be included as part of the e-prescribing program. This information is maintained by third party administrators known as Pharmacy Benefits Managers (PBM). By using our services, you understand that your provider may request and use your prescription medication history from other healthcare providers and/or third party PBM payers for treatment purposes.',
    ],
  },
  {
    title: 'Consent & Permission (NDPA Section 26)',
    paragraphs: [
      'We process sensitive personal data — including health data — on the basis of your explicit consent as described in the applicable Privacy Notice and Notice of Privacy Practices. Consent is given freely, and you have the right to withdraw your consent at any time under Section 35 of the Nigeria Data Protection Act 2023.',
      'Where required, information about your medical problems and/or diagnostic results may be shared with individuals you have specified or with authorised persons involved in your care. We will not discuss your medical case or leave messages on your personal voicemail without your permission.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <span className="chip chip-dark">Privacy</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            How eHealthwares collects, uses, and protects personal and health information — in
            line with the Nigeria Data Protection Act 2023 (NDPA) and US HIPAA.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gradient !px-7 !py-3.5 !text-base">
              Questions? Contact Us
              <IconArrowRight size={18} />
            </Link>
            <Link href="/products-services" className="btn-ghost-light !px-7 !py-3.5 !text-base">
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* Policy body */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader
            align="left"
            chip="Our Commitment"
            title={
              <>
                Your information is <span className="text-gradient">handled with care</span>
              </>
            }
            subtitle="We are committed to safeguarding the confidentiality, integrity, and availability of the personal and health information entrusted to us."
          />

          <div className="mt-12 space-y-8">
            {PRIVACY_SECTIONS.map((section, i) => (
              <article
                key={section.title}
                className="glass-card rounded-3xl scroll-mt-28 p-7 sm:p-9"
                id={`section-${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">
                    <IconShieldLock size={20} />
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
            <h2 className="font-display text-lg font-bold text-navy-900">Have privacy questions?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-navy-500">
              Contact our Data Protection Officer at{' '}
              <a href="mailto:privacy@ehealthwares.com" className="font-semibold text-blue-600 hover:text-blue-700">
                privacy@ehealthwares.com
              </a>{' '}
              or reach us through our contact page. You may also lodge a complaint with the Nigeria
              Data Protection Commission at{' '}
              <a
                href="https://www.ndpc.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                www.ndpc.gov.ng
              </a>
              .
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
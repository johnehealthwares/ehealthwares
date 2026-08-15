import type { Metadata } from 'next';
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Talk to the eHealthwares Team',
  description:
    'Get in touch with the eHealthwares team about EMR, pharmacy management, laboratory, radiology, telemedicine, interoperability, or digital health solutions for your organization.',
  alternates: { canonical: '/contact' },
};

const CONTACTS = [
  {
    icon: IconMail,
    label: 'Email Us',
    value: 'info@ehealthwares.com',
    href: 'mailto:info@ehealthwares.com',
    gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
  },
  {
    icon: IconPhone,
    label: 'Call Us',
    value: '+234-80-2222-4166',
    href: 'tel:+2348022224166',
    gradient: 'linear-gradient(135deg, #0D9488, #2563EB)',
  },
  {
    icon: IconMapPin,
    label: 'Location',
    value: 'Lagos, Nigeria',
    href: null,
    gradient: 'linear-gradient(135deg, #F59E0B, #F43F5E)',
  },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-44">
          <span className="chip chip-dark">Contact</span>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Let&apos;s build your <span className="text-gradient">healthcare technology</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Ready to transform your healthcare operations? Tell us about your organization and
            we&apos;ll show you how eHealthwares can help.
          </p>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
            {/* Contact details */}
            <div className="space-y-4">
              {CONTACTS.map((c) => (
                <div key={c.label} className="glass-card flex items-center gap-4 rounded-2xl p-5">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundImage: c.gradient }}
                  >
                    <c.icon size={21} />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-navy-400">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-semibold text-navy-800 hover:text-blue-600">
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-navy-800">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
              <div className="glass-card rounded-2xl p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-navy-400">Office Hours</div>
                <div className="mt-2 text-sm text-navy-700">
                  Monday – Friday · 9:00 AM – 6:00 PM (WAT)
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="glass-card rounded-2xl p-7 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

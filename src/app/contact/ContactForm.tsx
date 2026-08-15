'use client';

import { useState } from 'react';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import { ehealthwaresApi } from '@/lib/api';

const inputClass =
  'w-full rounded-xl border border-navy-200 bg-white/80 px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-500';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setFieldErrors((f) => ({ ...f, [key]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!values.name.trim()) errors.name = 'Name is required';
    if (!/^\S+@\S+$/.test(values.email)) errors.email = 'A valid email is required';
    if (!values.subject.trim()) errors.subject = 'Subject is required';
    if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      setError(null);
      await ehealthwaresApi.submitContact(values);
      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-lg" style={{ backgroundImage: 'linear-gradient(135deg, #2563EB, #16A34A)' }}>
          <IconCircleCheck size={30} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-navy-900">Message Sent!</h2>
        <p className="mt-2 text-navy-500">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input id="cf-name" className={inputClass} placeholder="Your name" value={values.name} onChange={set('name')} />
          {fieldErrors.name && <p className="mt-1 text-xs text-coral-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email</label>
          <input id="cf-email" type="email" className={inputClass} placeholder="you@organization.com" value={values.email} onChange={set('email')} />
          {fieldErrors.email && <p className="mt-1 text-xs text-coral-600">{fieldErrors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Phone (optional)</label>
          <input id="cf-phone" className={inputClass} placeholder="+234-800-000-000" value={values.phone} onChange={set('phone')} />
        </div>
        <div>
          <label htmlFor="cf-subject" className={labelClass}>Subject</label>
          <input id="cf-subject" className={inputClass} placeholder="How can we help?" value={values.subject} onChange={set('subject')} />
          {fieldErrors.subject && <p className="mt-1 text-xs text-coral-600">{fieldErrors.subject}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>Message</label>
        <textarea id="cf-message" rows={5} className={inputClass} placeholder="Tell us about your organization and needs..." value={values.message} onChange={set('message')} />
        {fieldErrors.message && <p className="mt-1 text-xs text-coral-600">{fieldErrors.message}</p>}
      </div>
      {error && <p className="text-sm text-coral-600">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" className="btn-gradient !px-8 !py-3">
          Send Message
          <IconArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}

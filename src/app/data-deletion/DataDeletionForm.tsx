'use client';

import { useState } from 'react';
import { IconArrowRight, IconCircleCheck, IconTrash } from '@tabler/icons-react';
import { ehealthwaresApi } from '@/lib/api';

const inputClass =
  'w-full rounded-xl border border-navy-200 bg-white/80 px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-500';

export function DataDeletionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    accountUsername: '',
    reason: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setFieldErrors((f) => ({ ...f, [key]: '' }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!values.name.trim()) errors.name = 'Name is required';
    if (!/^\S+@\S+$/.test(values.email)) errors.email = 'A valid email is required';
    if (!values.accountUsername.trim()) errors.accountUsername = 'Account username is required';
    if (values.reason.trim().length < 10) errors.reason = 'Refund or deletion reason must be at least 10 characters';
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    const message = [
      `Account username: ${values.accountUsername}`,
      `Phone: ${values.phone || 'n/a'}`,
      '',
      'Reason for deletion:',
      values.reason,
    ].join('\n');

    try {
      setError(null);
      await ehealthwaresApi.submitContact({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: 'Data Deletion Request',
        message,
      });
      setSubmitted(true);
    } catch {
      setError('Failed to submit request. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <span
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-lg"
          style={{ backgroundImage: 'linear-gradient(135deg, #F43F5E, #2563EB)' }}
        >
          <IconCircleCheck size={30} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-navy-900">Request Submitted!</h2>
        <p className="mt-2 text-navy-500">
          We&apos;ll review your data deletion request and process it in line with our policy
          within 30 days. A confirmation will be sent to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dd-name" className={labelClass}>Full Name</label>
          <input id="dd-name" className={inputClass} placeholder="Your name" value={values.name} onChange={set('name')} />
          {fieldErrors.name && <p className="mt-1 text-xs text-coral-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="dd-email" className={labelClass}>Email</label>
          <input id="dd-email" type="email" className={inputClass} placeholder="you@organization.com" value={values.email} onChange={set('email')} />
          {fieldErrors.email && <p className="mt-1 text-xs text-coral-600">{fieldErrors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dd-phone" className={labelClass}>Phone (optional)</label>
          <input id="dd-phone" className={inputClass} placeholder="+234-800-000-000" value={values.phone} onChange={set('phone')} />
        </div>
        <div>
          <label htmlFor="dd-username" className={labelClass}>Account Username</label>
          <input id="dd-username" className={inputClass} placeholder="The username you signed in with" value={values.accountUsername} onChange={set('accountUsername')} />
          {fieldErrors.accountUsername && <p className="mt-1 text-xs text-coral-600">{fieldErrors.accountUsername}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="dd-reason" className={labelClass}>Reason for Deletion</label>
        <textarea id="dd-reason" rows={4} className={inputClass} placeholder="Tell us why you are requesting deletion of your data..." value={values.reason} onChange={set('reason')} />
        {fieldErrors.reason && <p className="mt-1 text-xs text-coral-600">{fieldErrors.reason}</p>}
      </div>
      {error && <p className="text-sm text-coral-600">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" className="btn-gradient !bg-gradient-to-r !from-rose-600 !to-blue-600 !px-8 !py-3">
          Submit Deletion Request
          <IconArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}
'use client';

import { useState } from 'react';
import { ehealthwaresApi } from '@/lib/api';

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const INITIAL: FormValues = { fullName: '', email: '', phone: '', company: '', message: '' };

type Status = 'idle' | 'sending' | 'success' | 'error';

export function EMRContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const setField = (key: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.fullName.trim()) next.fullName = 'This field is required';
    if (!values.email.trim()) {
      next.email = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Valid email required';
    }
    if (!values.phone.trim()) next.phone = 'This field is required';
    if (!values.message.trim()) next.message = 'This field is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending' || !validate()) return;
    setStatus('sending');
    try {
      await ehealthwaresApi.submitContact({
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        subject: values.company.trim()
          ? `EMR inquiry — ${values.company.trim()}`
          : 'EMR inquiry',
        message: values.message.trim(),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-card" style={{ textAlign: 'center', padding: 48 }}>
        <i
          className="fas fa-check-circle"
          style={{ fontSize: 44, color: '#22c55e', marginBottom: 16 }}
        />
        <h3 style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 800, marginBottom: 8 }}>
          Message Sent
        </h3>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Thank you — our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emrFullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="emrFullName"
              type="text"
              placeholder="John Doe"
              value={values.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              className={errors.fullName ? 'input-error' : undefined}
            />
            <span className="error-msg" style={{ display: errors.fullName ? 'block' : 'none' }}>
              {errors.fullName}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="emrEmail">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="emrEmail"
              type="email"
              placeholder="john@example.com"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              className={errors.email ? 'input-error' : undefined}
            />
            <span className="error-msg" style={{ display: errors.email ? 'block' : 'none' }}>
              {errors.email}
            </span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emrPhone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              id="emrPhone"
              type="tel"
              placeholder="+234 800 000 000"
              value={values.phone}
              onChange={(e) => setField('phone', e.target.value)}
              className={errors.phone ? 'input-error' : undefined}
            />
            <span className="error-msg" style={{ display: errors.phone ? 'block' : 'none' }}>
              {errors.phone}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="emrCompany">Clinic / Hospital</label>
            <input
              id="emrCompany"
              type="text"
              placeholder="Medical Center Name"
              value={values.company}
              onChange={(e) => setField('company', e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="emrMessage">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="emrMessage"
            rows={4}
            placeholder="Tell us about your organization and what you need..."
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            className={errors.message ? 'input-error' : undefined}
          />
          <span className="error-msg" style={{ display: errors.message ? 'block' : 'none' }}>
            {errors.message}
          </span>
        </div>
        {status === 'error' && (
          <div
            style={{
              background: 'rgba(239,68,68,.08)',
              border: '1px solid rgba(239,68,68,.3)',
              color: '#dc2626',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: '.82rem',
              marginBottom: 14,
            }}
          >
            Something went wrong sending your message. Please try again or email us directly at
            info@ehealthwares.com.
          </div>
        )}
        <div className="form-action">
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
            {status !== 'sending' && (
              <i className="fas fa-paper-plane" style={{ marginLeft: 8, fontSize: '.82rem' }} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

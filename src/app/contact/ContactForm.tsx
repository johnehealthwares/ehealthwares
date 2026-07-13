'use client';

import { Button, Group, TextInput, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { ehealthwaresApi } from '@/lib/api';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: { name: '', email: '', phone: '', subject: '', message: '' },
    validate: {
      name: (v) => (v.trim() ? null : 'Name is required'),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Valid email is required'),
      subject: (v) => (v.trim() ? null : 'Subject is required'),
      message: (v) => (v.trim().length >= 10 ? null : 'Message must be at least 10 characters'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
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
      <div className="text-center py-12">
        <Text size="xl" fw={600} className="text-brand-600 mb-2">
          Message Sent!
        </Text>
        <Text className="text-gray-500">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </Text>
      </div>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
      <TextInput label="Name" placeholder="Your name" {...form.getInputProps('name')} required />
      <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps('email')} required />
      <TextInput label="Phone" placeholder="+234-800-000-000" {...form.getInputProps('phone')} />
      <TextInput label="Subject" placeholder="How can we help?" {...form.getInputProps('subject')} required />
      <Textarea label="Message" placeholder="Tell us about your needs..." minRows={4} {...form.getInputProps('message')} required />
      {error && <Text size="sm" className="text-red-600">{error}</Text>}
      <Group justify="flex-end">
        <Button type="submit" color="teal" size="md">Send Message</Button>
      </Group>
    </form>
  );
}

'use client';

import { Carousel } from '@mantine/carousel';
import { IconQuote } from '@tabler/icons-react';
import type { Testimonial } from '@/lib/types';
import { SectionHeader } from '@/components/shared';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #2563EB, #7C3AED)',
  'linear-gradient(135deg, #0D9488, #16A34A)',
  'linear-gradient(135deg, #F43F5E, #F59E0B)',
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="relative overflow-hidden bg-section-gradient py-24">
      <div className="pointer-events-none absolute inset-0 dots-pattern opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          chip="Testimonials"
          title={
            <>
              Trusted by <span className="text-gradient">healthcare leaders</span>
            </>
          }
          subtitle="Hear from the clinicians, administrators, and partners building with eHealthwares every day."
        />

        <Carousel
          slideSize={{ base: '100%', sm: '50%', lg: '33.333%' }}
          slideGap="lg"
          loop
          withControls
          withIndicators
          styles={{
            control: {
              background: 'white',
              border: '1px solid rgba(15,42,67,0.1)',
              color: '#0F2A43',
              width: 42,
              height: 42,
              boxShadow: '0 8px 24px -8px rgba(15,42,67,0.25)',
            },
            indicator: { width: 8, height: 8, background: 'rgba(15,42,67,0.2)' },
            indicators: { bottom: -36 },
          }}
        >
          {testimonials.map((t, i) => (
            <Carousel.Slide key={t._id}>
              <figure className="glass-card relative flex h-full flex-col rounded-2xl p-7">
                <IconQuote size={36} className="text-blue-200" fill="currentColor" stroke={1.5} />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-700">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full font-display text-base font-bold text-white"
                    style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{t.name}</span>
                    <span className="block text-xs text-navy-400">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

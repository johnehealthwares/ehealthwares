import { Container, Text, Title } from '@mantine/core';
import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="py-20 bg-white">
      <Container size="lg">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Title order={2} className="text-4xl font-extrabold text-gray-900">
            What Our Clients Say
          </Title>
          <Text className="text-gray-500 mt-3">
            Trusted by healthcare organizations across Africa
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="p-6 rounded-lg border border-gray-100 bg-white shadow-sm">
              <Text size="sm" className="text-gray-600 italic leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </Text>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <Text fw={600} size="sm" className="text-gray-900">
                    {t.name}
                  </Text>
                  {(t.role || t.company) && (
                    <Text size="xs" className="text-gray-400">
                      {[t.role, t.company].filter(Boolean).join(', ')}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

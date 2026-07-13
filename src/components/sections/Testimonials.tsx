'use client';

import { Carousel } from '@mantine/carousel';
import { Container, Card, Avatar, Title, Text, Box } from '@mantine/core';
import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>What Our Clients Say</Title>
          <Text c="gray.6" mt="sm">Trusted by healthcare organizations across Africa</Text>
        </Box>
        <Carousel slideSize="33.333%" slideGap="md" loop withControls withIndicators>
          {testimonials.map((t) => (
            <Carousel.Slide key={t._id}>
              <Card padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                <Text size="sm" c="gray.7" fs="italic" lh={1.6}>
                  &ldquo;{t.text}&rdquo;
                </Text>
                <Box mt="md" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar color="brand" radius="xl" size="md">
                    {t.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Text fw={600} size="sm">{t.name}</Text>
                    {(t.role || t.company) && (
                      <Text size="xs" c="gray.5">
                        {[t.role, t.company].filter(Boolean).join(', ')}
                      </Text>
                    )}
                  </Box>
                </Box>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}

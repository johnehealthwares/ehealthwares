import { Card, Container, SimpleGrid, Text, Title } from '@mantine/core';
import Link from 'next/link';
import type { Service } from '@/lib/types';

const FALLBACKS = [
  '/images/img1.jpg',
  '/images/img8.jpg',
  '/images/img9.jpg',
  '/images/img2.jpg',
];

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (!services?.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <Container size="lg">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Title order={2} className="text-4xl font-extrabold text-gray-900">
            Our Services
          </Title>
          <Text className="text-gray-500 mt-3">
            Expert consulting and engineering to accelerate your healthcare technology journey
          </Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {services.map((service, i) => (
            <Card
              key={service._id}
              component={Link}
              href={`/services/${service.slug}`}
              padding={0}
              radius="lg"
              className="overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-200 no-underline group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.imageUrl || FALLBACKS[i % FALLBACKS.length]}
                  alt={service.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Text fw={700} size="lg" className="text-gray-900 mb-1">
                  {service.name}
                </Text>
                {service.tagline && (
                  <Text size="sm" className="text-gray-500">
                    {service.tagline}
                  </Text>
                )}
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}

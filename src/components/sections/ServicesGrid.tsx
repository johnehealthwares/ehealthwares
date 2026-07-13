import { Card, Container, SimpleGrid, Image, Title, Text, Badge, Box } from '@mantine/core';
import Link from 'next/link';
import type { Service } from '@/lib/types';

const FALLBACKS = ['/images/img1.jpg', '/images/img8.jpg', '/images/img9.jpg', '/images/img2.jpg'];

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (!services?.length) return null;

  return (
    <Box component="section" py={80}>
      <Container size="lg">
        <Box ta="center" mb="xl" maw={560} mx="auto">
          <Title order={2}>Our Services</Title>
          <Text c="gray.6" mt="sm">Expert consulting and engineering to accelerate your healthcare technology journey</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {services.map((service, i) => (
            <Card
              key={service._id}
              component={Link}
              href={`/services/${service.slug}`}
              padding={0}
              radius="lg"
              withBorder
              style={{ textDecoration: 'none', transition: 'box-shadow 0.2s' }}
            >
              <Card.Section>
                <Image src={service.imageUrl || FALLBACKS[i % FALLBACKS.length]} alt={service.name} h={192} fit="cover" />
              </Card.Section>
              <Box p="lg">
                <Title order={4} c="gray.9">{service.name}</Title>
                {service.tagline && (
                  <Text size="sm" c="gray.6" mt={4}>{service.tagline}</Text>
                )}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

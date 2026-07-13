import { Container, SimpleGrid, Text, Title } from '@mantine/core';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Healthcare Organizations' },
  { value: '200+', label: 'Integrations Delivered' },
  { value: '99.9%', label: 'Platform Uptime' },
];

export function StatsBar() {
  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <Title order={2} className="text-4xl md:text-5xl font-display text-brand-600 mb-1">
                {stat.value}
              </Title>
              <Text size="sm" className="text-gray-500 uppercase tracking-wider">
                {stat.label}
              </Text>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}

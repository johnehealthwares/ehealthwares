import { Container, SimpleGrid, Paper, Title, Text, Box } from '@mantine/core';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Healthcare Organizations' },
  { value: '200+', label: 'Integrations Delivered' },
  { value: '99.9%', label: 'Platform Uptime' },
];

export function StatsBar() {
  return (
    <Box component="section" py={64}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
          {stats.map((stat) => (
            <Paper key={stat.label} ta="center" p="md" bg="transparent">
              <Title order={2} c="brand.6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {stat.value}
              </Title>
              <Text size="sm" c="gray.5" tt="uppercase">{stat.label}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

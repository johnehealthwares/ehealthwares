import { Container, SimpleGrid, Paper, Title, Text, Box } from '@mantine/core';
import type { InvestorData } from '@/lib/types';

interface InvestorsProps {
  data: InvestorData[];
}

export function Investors({ data }: InvestorsProps) {
  if (!data?.length) return null;

  return (
    <Box component="section" py={80}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Investor Highlights</Title>
          <Text c="gray.6" mt="sm">Key metrics and growth indicators for eHealthwares</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="lg">
          {data.map((d) => (
            <Paper key={d._id} p="xl" radius="md" withBorder ta="center" className="card-brand">
              <Title order={1} c="brand.6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {d.value}
              </Title>
              <Text fw={600} size="sm" c="gray.8" mt={4}>{d.label}</Text>
              {d.description && (
                <Text size="xs" c="gray.5" mt={4}>{d.description}</Text>
              )}
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

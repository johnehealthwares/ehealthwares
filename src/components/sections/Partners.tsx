import { Container, Group, Paper, Image, Title, Text, Box } from '@mantine/core';
import type { Partner } from '@/lib/types';

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  if (!partners?.length) return null;

  return (
    <Box component="section" py={64} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Title order={3} ta="center" mb="lg">Strategic Partnerships</Title>
        <Group justify="center" gap="lg">
          {partners.map((p) => (
            <Paper key={p._id} p="md" withBorder radius="md" style={{ minWidth: 140, textAlign: 'center' }}>
              {p.logoUrl ? (
                <Image src={p.logoUrl} alt={p.name} h={40} fit="contain" />
              ) : (
                <Text fw={600} c="gray.7">{p.name}</Text>
              )}
            </Paper>
          ))}
        </Group>
      </Container>
    </Box>
  );
}

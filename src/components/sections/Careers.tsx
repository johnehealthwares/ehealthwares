import { Container, SimpleGrid, Card, Image, Title, Text, Badge, Button, Box, Group } from '@mantine/core';
import Link from 'next/link';
import type { Career } from '@/lib/types';

interface CareersProps {
  careers: Career[];
}

export function Careers({ careers }: CareersProps) {
  if (!careers?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Career Opportunities</Title>
          <Text c="gray.6" mt="sm">Join our team and help build the future of healthcare technology</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {careers.map((c) => (
            <Card key={c._id} padding={0} radius="md" withBorder>
              {c.imageUrl && (
                <Card.Section>
                  <Image src={c.imageUrl} alt={c.title} h={160} fit="cover" />
                </Card.Section>
              )}
              <Box p="md">
                <Title order={4}>{c.title}</Title>
                <Group gap="xs" mt="sm">
                  {c.department && <Badge variant="light" color="brand" size="sm">{c.department}</Badge>}
                  {c.location && <Badge variant="outline" color="gray" size="sm">{c.location}</Badge>}
                  <Badge variant="filled" color={c.type === 'remote' ? 'green' : 'blue'} size="sm">
                    {c.type}
                  </Badge>
                </Group>
                {c.description && (
                  <Text size="sm" c="gray.6" mt="sm" lineClamp={3}>
                    {c.description}
                  </Text>
                )}
                <Button component={Link} href={`/careers/${c.slug}`} variant="light" color="brand" fullWidth mt="md">
                  View Position
                </Button>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

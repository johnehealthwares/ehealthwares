import { Container, SimpleGrid, Card, CardSection, Image, Title, Text, Box } from '@mantine/core';
import Link from 'next/link';
import type { ProductCategory } from '@/lib/types';

interface CategoriesProps {
  categories: ProductCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  if (!categories?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Solutions by Category</Title>
          <Text c="gray.6" mt="sm">Enterprise healthcare technology platforms designed for every department</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {categories.map((cat) => (
            <Card
              key={cat._id}
              component={Link}
              href={`/products/${cat.slug}`}
              padding={0}
              radius="md"
              style={{ textDecoration: 'none' }}
            >
              <CardSection>
                <Image src={cat.imageUrl || ''} alt={cat.name} h={160} fit="cover" />
              </CardSection>
              <Box p="md">
                <Title order={4} c="gray.9">{cat.name}</Title>
                {cat.description && (
                  <Text size="sm" c="gray.6" mt={4}>{cat.description}</Text>
                )}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

import { Card, Container, SimpleGrid, CardSection, Image, Title, Text, Badge, Box } from '@mantine/core';
import Link from 'next/link';
import type { Product } from '@/lib/types';

const FALLBACKS = [
  '/images/img2.jpg', '/images/img3.jpg', '/images/img4.jpg',
  '/images/img5.jpg', '/images/img6.jpg', '/images/img7.jpg',
];

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl" maw={560} mx="auto">
          <Title order={2}>Our Products</Title>
          <Text c="gray.6" mt="sm">Enterprise healthcare technology platforms designed to transform operations</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {products.map((product, i) => (
            <Card
              key={product._id}
              component={Link}
              href={`/products/${product.slug}`}
              padding={0}
              radius="lg"
              withBorder
              className="card-brand"
              style={{ textDecoration: 'none' }}
            >
              <CardSection>
                <Image
                  src={product.imageUrl || FALLBACKS[i % FALLBACKS.length]}
                  alt={product.name}
                  h={176}
                  fit="cover"
                />
              </CardSection>
              <Box p="lg">
                <Title order={4} c="gray.9">{product.name}</Title>
                {product.tagline && (
                  <Text size="sm" c="gray.6" mt={4}>{product.tagline}</Text>
                )}
                {product.features?.length > 0 && (
                  <Box mt="sm">
                    {product.features.slice(0, 3).map((f) => (
                      <Badge key={f} variant="light" color="brand" size="sm" mr={4} mb={4}>
                        {f}
                      </Badge>
                    ))}
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

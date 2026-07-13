import { Card, Container, SimpleGrid, Text, Title } from '@mantine/core';
import Link from 'next/link';
import type { Product } from '@/lib/types';

const FALLBACKS = [
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
  '/images/img7.jpg',
];

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products?.length) return null;

  return (
    <section className="py-20 bg-white">
      <Container size="lg">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Title order={2} className="text-4xl font-extrabold text-gray-900">
            Our Products
          </Title>
          <Text className="text-gray-500 mt-3">
            Enterprise healthcare technology platforms designed to transform operations
          </Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {products.map((product, i) => (
            <Card
              key={product._id}
              component={Link}
              href={`/products/${product.slug}`}
              padding={0}
              radius="lg"
              className="overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-200 no-underline group"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={product.imageUrl || FALLBACKS[i % FALLBACKS.length]}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Text fw={700} size="lg" className="text-gray-900 mb-1">
                  {product.name}
                </Text>
                {product.tagline && (
                  <Text size="sm" className="text-gray-500 leading-relaxed">
                    {product.tagline}
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

import { Container, Title, Text, SimpleGrid, Card, CardSection, Image, Badge, Group, Box } from '@mantine/core';
import Link from 'next/link';
import { ehealthwaresApi } from '@/lib/api';

const productImages = [
  '/assets/pexels-shvetsa-4225925.jpg',
  '/assets/pexels-mart-production-7089011.jpg',
  '/assets/pexels-tima-miroshnichenko-6234976.jpg',
  '/assets/pexels-daliladalprat-5875565.jpg',
  '/assets/pexels-tima-miroshnichenko-6234978.jpg',
];

const serviceImages = [
  '/images/img1.jpg',
  '/images/img8.jpg',
  '/images/img9.jpg',
  '/images/img2.jpg',
];

export default async function ProductsServicesPage() {
  let products: any[] = [], services: any[] = [];
  try {
    const result = await Promise.all([
      ehealthwaresApi.getProducts(),
      ehealthwaresApi.getServices(),
    ]);
    products = result[0] ?? [];
    services = result[1] ?? [];
  } catch (e) {
    console.error('ProductsServicesPage data fetch failed:', e);
  }

  return (
    <Box pt={96} pb={80}>
      <Container size="lg">
        <Box ta="center" mb="xl" maw={640} mx="auto">
          <Title order={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Products & Services
          </Title>
          <Text c="gray.6" mt="sm" size="lg">
            Enterprise healthcare technology platforms and expert services designed to transform healthcare operations
          </Text>
        </Box>

        {products.length > 0 && (
          <Box mb={64}>
            <Title order={2} mb="md">Products</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {(products ?? []).map((p: any, i: number) => (
                  <Card
                    key={p._id}
                    component={Link}
                    href={`/products/${p.slug}`}
                    padding={0}
                    radius="md"
                    withBorder
                    className="card-brand"
                    style={{ textDecoration: 'none' }}
                  >
                  <CardSection>
                    <Image src={p.imageUrl || productImages[i % productImages.length]} alt={p.name} h={180} fit="cover" />
                  </CardSection>
                  <Box p="md">
                    <Title order={4} c="dark">{p.name}</Title>
                    {p.tagline && <Text size="sm" c="gray.6" mt={4}>{p.tagline}</Text>}
                    {p.features?.length > 0 && (
                      <Group gap={4} mt="sm">
                        {p.features.slice(0, 3).map((f: string) => (
                          <Badge key={f} variant="light" color="brand" size="sm">{f}</Badge>
                        ))}
                      </Group>
                    )}
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {services.length > 0 && (
          <Box>
            <Title order={2} mb="md">Services</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              {(services ?? []).map((s: any, i: number) => (
                <Card
                  key={s._id}
                  component={Link}
                  href={`/services/${s.slug}`}
                  padding={0}
                  radius="md"
                  withBorder
                  className="card-brand"
                  style={{ textDecoration: 'none' }}
                >
                  <CardSection>
                    <Image src={s.imageUrl || serviceImages[i % serviceImages.length]} alt={s.name} h={180} fit="cover" />
                  </CardSection>
                  <Box p="md">
                    <Title order={4} c="dark">{s.name}</Title>
                    {s.tagline && <Text size="sm" c="gray.6" mt={4}>{s.tagline}</Text>}
                    {s.description && (
                      <Text size="xs" c="gray.5" mt={4} lineClamp={2}>{s.description.replace(/<[^>]+>/g, '')}</Text>
                    )}
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

import { Container, SimpleGrid, Card, CardSection, Image, Title, Text, Anchor, Box } from '@mantine/core';
import Link from 'next/link';
import type { Article } from '@/lib/types';

interface LatestTopicsProps {
  articles: Article[];
}

export function LatestTopics({ articles }: LatestTopicsProps) {
  if (!articles?.length) return null;

  return (
    <Box component="section" py={80}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Latest Topics</Title>
          <Text c="gray.6" mt="sm">Insights and innovations in healthcare technology</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {articles.slice(0, 6).map((article) => (
            <Card key={article._id} padding={0} radius="md" withBorder className="card-brand">
              {article.imageUrl && (
                <CardSection>
                  <Image src={article.imageUrl} alt={article.title} h={180} fit="cover" />
                </CardSection>
              )}
              <Box p="md">
                {article.category && (
                  <Text size="xs" tt="uppercase" c="brand.6" fw={600} mb={4}>
                    {article.category}
                  </Text>
                )}
                <Title order={4} lh={1.3}>
                  {article.title}
                </Title>
                {article.excerpt && (
                  <Text size="sm" c="gray.6" mt={4}>
                    {article.excerpt}
                  </Text>
                )}
                <Anchor component={Link} href={`/articles/${article.slug}`} size="sm" mt="sm" display="inline-block">
                  Read more →
                </Anchor>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

import { Container, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { ehealthwaresApi } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await ehealthwaresApi.getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Container size="lg" className="py-16">
        <div className="max-w-3xl">
          <Text size="sm" className="text-brand-600 uppercase tracking-wider mb-2 font-semibold">
            Product
          </Text>
          <Title order={1} className="text-4xl md:text-5xl font-display text-gray-900 mb-3">
            {product.name}
          </Title>
          {product.tagline && (
            <Text size="lg" className="text-gray-500 mb-8 leading-relaxed">
              {product.tagline}
            </Text>
          )}
          {product.description && (
            <div
              className="prose prose-gray max-w-none mb-10 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          {product.features?.length > 0 && (
            <>
              <Title order={2} className="text-2xl font-display text-gray-900 mb-4">
                Capabilities
              </Title>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ThemeIcon color="teal" size={22} radius="xl" className="mt-0.5 shrink-0">
                      <IconCircleCheck size={14} />
                    </ThemeIcon>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Container>
      <div className="bg-brand-50 py-14">
        <Container size="lg" className="text-center">
          <Title order={2} className="text-3xl font-display text-gray-900 mb-3">
            Ready to see it in action?
          </Title>
          <Text className="text-gray-600 mb-6">
            Book a demo of {product.name} with our solutions team.
          </Text>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Contact Sales
          </a>
        </Container>
      </div>
    </>
  );
}

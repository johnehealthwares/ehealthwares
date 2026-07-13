import { Container, Text, Title } from '@mantine/core';
import { ehealthwaresApi } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await ehealthwaresApi.getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <div className="relative h-[320px] w-full overflow-hidden">
        <img src="/images/img8.jpg" alt={service.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Container size="lg" className="absolute inset-x-0 bottom-0 pb-8">
          <Text size="sm" className="text-white/80 uppercase tracking-wider mb-2 font-semibold">
            Service
          </Text>
          <Title order={1} className="text-4xl md:text-5xl text-white font-display">
            {service.name}
          </Title>
        </Container>
      </div>
      <Container size="lg" className="py-16">
        <div className="max-w-3xl">
          {service.tagline && (
            <Text size="lg" className="text-gray-500 mb-8 leading-relaxed">
              {service.tagline}
            </Text>
          )}
          {service.description && (
            <div
              className="prose prose-gray max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          )}
        </div>
      </Container>
      <div className="bg-brand-50 py-14">
        <Container size="lg" className="text-center">
          <Title order={2} className="text-3xl font-display text-gray-900 mb-3">
            Ready to get started?
          </Title>
          <Text className="text-gray-600 mb-6">
            Talk to our solutions team about {service.name}.
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

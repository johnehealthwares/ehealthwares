import { Button, Container, Text, Title } from '@mantine/core';
import Link from 'next/link';
import type { SiteSection } from '@/lib/types';

interface CTABannerProps {
  section: SiteSection;
}

export function CTABanner({ section }: CTABannerProps) {
  if (!section) return null;

  return (
    <section className="py-20 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
      <Container size="lg" className="text-center">
        <Title order={2} className="text-4xl font-display mb-4 text-white">
          {section.title}
        </Title>
        {section.subtitle && (
          <Text size="lg" className="text-brand-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {section.subtitle}
          </Text>
        )}
        <Button
          component={Link}
          href="/contact"
          size="lg"
          variant="white"
          className="text-brand-700 font-semibold"
        >
          Get in Touch
        </Button>
      </Container>
    </section>
  );
}

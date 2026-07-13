import { Button, Container, Title, Text, Box } from '@mantine/core';
import Link from 'next/link';
import type { SiteSection } from '@/lib/types';

interface CTABannerProps {
  section: SiteSection;
}

export function CTABanner({ section }: CTABannerProps) {
  if (!section) return null;

  return (
    <Box
      component="section"
      py={80}
      style={{
        background: 'linear-gradient(135deg, var(--mantine-color-brand-7) 0%, var(--mantine-color-brand-9) 100%)',
      }}
    >
      <Container size="lg" ta="center">
        <Title order={2} c="white">{section.title}</Title>
        {section.subtitle && (
          <Text size="lg" c="brand.1" mx="auto" maw={560} mt="sm" mb="lg">
            {section.subtitle}
          </Text>
        )}
        <Button component={Link} href="/contact" size="lg" variant="white" c="brand.7">
          Get in Touch
        </Button>
      </Container>
    </Box>
  );
}

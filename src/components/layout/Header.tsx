'use client';

import { useState } from 'react';
import { Group, Burger, Drawer, Stack, Image, Anchor, Title, UnstyledButton, Container, Box } from '@mantine/core';
import Link from 'next/link';

const links = [
  { label: 'Products', href: '/products/rxsoft-pharmacy' },
  { label: 'Services', href: '/services/digital-transformation' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <Box component="header" className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="lg">
        <Group h={64} justify="space-between">
          <UnstyledButton component={Link} href="/" style={{ textDecoration: 'none' }}>
            <Group gap="sm">
              <Image src="/logo.jpg" alt="eHealthwares" h={32} w="auto" />
              <Title order={4} c="brand.7">eHealthwares</Title>
            </Group>
          </UnstyledButton>

          <Group visibleFrom="sm" gap="lg">
            {links.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                size="sm"
                c="gray.6"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" title="Menu" size="sm">
        <Stack>
          {links.map((link) => (
            <UnstyledButton
              key={link.href}
              onClick={() => setOpened(false)}
              component={Link}
              href={link.href}
            >
              <Title order={5} c="gray.7">{link.label}</Title>
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}

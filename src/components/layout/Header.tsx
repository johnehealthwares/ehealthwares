'use client';

import { useState } from 'react';
import { Burger, Container, Drawer, Group, Stack, Text, UnstyledButton } from '@mantine/core';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Container size="lg">
        <Group h={64} justify="space-between">
          <Link href="/" className="no-underline flex items-center gap-2">
            <img src="/logo.jpg" alt="eHealthwares" className="h-8 w-auto" />
            <span className="text-lg font-bold text-brand-700">eHealthwares</span>
          </Link>

          <Group visibleFrom="sm" gap="lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="no-underline text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
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
              className="py-2 text-lg font-medium text-gray-700 hover:text-brand-600"
            >
              {link.label}
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}

'use client';

import { useState } from 'react';
import { Group, Burger, Drawer, Stack, Image, Anchor, UnstyledButton, Container, Box, Button } from '@mantine/core';
import Link from 'next/link';

const links = [
  { label: 'Products & Services', href: '/products-services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <Box component="header" className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="lg">
        <Group h={72} justify="space-between">
          <UnstyledButton component={Link} href="/" style={{ textDecoration: 'none' }}>
            <Image src="/logo-rect.png" alt="eHealthwares" h={40} w="auto" />
          </UnstyledButton>

          <Group visibleFrom="sm" gap={32}>
            {links.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                size="sm"
                fw={500}
                c="dark"
                style={{ textDecoration: 'none', letterSpacing: '0.01em' }}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          <Button component={Link} href="/contact" visibleFrom="sm" size="sm" color="brand" radius="md">
            Get in Touch
          </Button>

          <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" title={() => <Image src="/logo-rect.png" alt="eHealthwares" h={32} w="auto" />} size="sm">
        <Stack>
          {links.map((link) => (
            <UnstyledButton key={link.href} onClick={() => setOpened(false)} component={Link} href={link.href}>
              <Anchor component="span" size="lg" fw={500} c="dark">{link.label}</Anchor>
            </UnstyledButton>
          ))}
          <Button component={Link} href="/contact" size="md" color="brand" radius="md" mt="md" fullWidth>
            Get in Touch
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}

'use client';

import { useState } from 'react';
import { Group, Burger, Drawer, Stack, Image, Anchor, UnstyledButton, Container, Box, Button, Title } from '@mantine/core';
import Link from 'next/link';

const links = [
  { label: 'Products & Services', href: '/products-services' },
  { label: 'Careers', href: '/careers' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <Box component="header" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="lg">
        <Group h={72} justify="space-between">
          <UnstyledButton component={Link} href="/" style={{ textDecoration: 'none' }}>
            <Group gap={6}>
              <Box style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #059669, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V6h16v12z"/><path d="M8 8h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/></svg>
              </Box>
              <Title order={3} style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #047857, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                eHealthwares
              </Title>
            </Group>
          </UnstyledButton>

          <Group visibleFrom="sm" gap={28}>
            {links.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                size="sm"
                fw={700}
                c="dark"
                style={{ textDecoration: 'none', letterSpacing: '0.01em' }}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          <Group visibleFrom="sm" gap="sm">
            <Button component={Link} href="/sign-in" variant="subtle" color="gray" size="sm" fw={600}>
              Sign In
            </Button>
            <Button component={Link} href="/contact" size="sm" color="brand" radius="md" fw={600}>
              Get in Touch
            </Button>
          </Group>

          <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" title={null} size="sm">
        <Stack>
          <Group gap={6} mb="md">
            <Box style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #059669, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V6h16v12z"/><path d="M8 8h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/></svg>
            </Box>
            <Title order={4} style={{ fontWeight: 700, color: '#059669' }}>eHealthwares</Title>
          </Group>
          {links.map((link) => (
            <UnstyledButton key={link.href} onClick={() => setOpened(false)} component={Link} href={link.href}>
              <Anchor component="span" size="md" fw={700} c="dark">{link.label}</Anchor>
            </UnstyledButton>
          ))}
          <Box mt="md">
            <Button component={Link} href="/sign-in" variant="subtle" color="gray" fullWidth fw={600}>Sign In</Button>
            <Button component={Link} href="/contact" color="brand" fullWidth mt="sm" fw={600}>Get in Touch</Button>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}

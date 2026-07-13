import { Container, SimpleGrid, Stack, Title, Text, Anchor, Image, Group, Box } from '@mantine/core';
import Link from 'next/link';

const productLinks = [
  { label: 'RxSoft Pharmacy', href: '/products/rxsoft-pharmacy' },
  { label: 'Laboratory Information System', href: '/products/lis' },
  { label: 'Radiology Information System', href: '/products/ris' },
  { label: 'Interoperability', href: '/products/healthcare-interoperability' },
];

export function Footer() {
  return (
    <Box component="footer" style={{ backgroundColor: 'var(--mantine-color-gray-9)', color: 'var(--mantine-color-gray-3)' }} py={48}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb={32}>
          <Stack>
            <Group gap="sm">
              <Image src="/logo.jpg" alt="eHealthwares" h={36} w="auto" />
              <Title order={4} c="white">eHealthwares</Title>
            </Group>
            <Text size="sm" c="gray.5" maw={280}>
              Building Connected Healthcare Technology Ecosystems
            </Text>
          </Stack>

          <Stack>
            <Title order={6} c="white" tt="uppercase">Products</Title>
            {productLinks.map((link) => (
              <Anchor key={link.href} component={Link} href={link.href} size="sm" c="gray.5">
                {link.label}
              </Anchor>
            ))}
          </Stack>

          <Stack>
            <Title order={6} c="white" tt="uppercase">Contact</Title>
            <Text size="sm" c="gray.5">info@ehealthwares.com</Text>
            <Text size="sm" c="gray.5">+234-800-HEALTH</Text>
          </Stack>
        </SimpleGrid>

        <Box style={{ borderTop: '1px solid var(--mantine-color-gray-8)', paddingTop: '24px' }}>
          <Text ta="center" size="sm" c="gray.6">
            &copy; {new Date().getFullYear()} eHealthwares. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

import { Container, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.jpg" alt="eHealthwares" className="h-9 w-auto" />
              <span className="text-lg font-bold text-white">eHealthwares</span>
            </div>
            <Text size="sm" className="max-w-xs text-gray-400">
              Building Connected Healthcare Technology Ecosystems
            </Text>
          </div>
          <div>
            <Text fw={600} size="sm" className="text-white mb-3 uppercase tracking-wider">
              Products
            </Text>
            <Stack>
              <Link href="/products/rxsoft-pharmacy" className="text-sm text-gray-400 hover:text-white no-underline">RxSoft Pharmacy</Link>
              <Link href="/products/lis" className="text-sm text-gray-400 hover:text-white no-underline">Laboratory Information System</Link>
              <Link href="/products/ris" className="text-sm text-gray-400 hover:text-white no-underline">Radiology Information System</Link>
              <Link href="/products/healthcare-interoperability" className="text-sm text-gray-400 hover:text-white no-underline">Interoperability</Link>
            </Stack>
          </div>
          <div>
            <Text fw={600} size="sm" className="text-white mb-3 uppercase tracking-wider">
              Contact
            </Text>
            <Text size="sm">info@ehealthwares.com</Text>
            <Text size="sm">+234-800-HEALTH</Text>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} eHealthwares. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

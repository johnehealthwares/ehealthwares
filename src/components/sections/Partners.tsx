import { Container, Text, Title } from '@mantine/core';
import type { Partner } from '@/lib/types';

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  if (!partners?.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <Container size="lg">
        <Title order={3} className="text-2xl font-display text-gray-900 mb-8 text-center">
          Strategic Partnerships
        </Title>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((p) => (
            <div key={p._id} className="flex items-center justify-center px-8 py-4 bg-white rounded-lg border border-gray-100">
              <Text fw={600} className="text-gray-700">{p.name}</Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container, SimpleGrid, Text, Title } from '@mantine/core';

const TEAM = [
  {
    name: 'Dr. Alan Stone',
    role: 'Chief Medical Officer',
    bio: 'Clinician-executive bridging patient care and software, ensuring every eHealthwares platform meets real frontline needs.',
  },
  {
    name: 'Amara Okafor',
    role: 'Head of Interoperability',
    bio: 'Leads HL7 / FHIR integration strategy, connecting disparate health systems into a single source of truth.',
  },
  {
    name: 'David Chen',
    role: 'VP of Engineering',
    bio: 'Scales our pharmacy, lab and radiology platforms with a focus on reliability and regulatory-grade quality.',
  },
];

export default function AboutPage() {
  return (
    <Container size="lg" className="py-16">
      <div className="max-w-3xl mb-16">
        <Text size="sm" className="text-brand-600 uppercase tracking-wider mb-2 font-semibold">
          About
        </Text>
        <Title order={1} className="text-4xl md:text-5xl font-display text-gray-900 mb-6">
          About eHealthwares
        </Title>
        <div className="prose prose-gray leading-relaxed">
          <p>
            eHealthwares designs and delivers enterprise healthcare technology solutions that
            connect patients, healthcare providers, clinical teams, and operational systems
            through integrated digital platforms.
          </p>
          <p>
            We help healthcare organizations transform care delivery by combining healthcare
            software engineering, interoperability, workflow automation, communication
            platforms, and intelligent data solutions.
          </p>
          <p>
            Through strategic partnerships such as HealthStack (EMR) and products such as
            RxSoft Pharmacy Management System, eHealthwares enables healthcare providers to
            extend their digital capabilities beyond the core EMR.
          </p>
        </div>
      </div>

      <Title order={2} className="text-3xl font-display text-gray-900 mb-8">
        Our Team
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {TEAM.map((member) => (
          <div key={member.name} className="p-6 rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white mb-4">
              {member.name.charAt(0)}
            </div>
            <Text fw={600} size="lg" className="text-gray-900 mb-1">
              {member.name}
            </Text>
            <Text size="sm" className="text-brand-600 mb-2">
              {member.role}
            </Text>
            <Text size="sm" className="text-gray-500 leading-relaxed">
              {member.bio}
            </Text>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
}

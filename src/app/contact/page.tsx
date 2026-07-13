import { Container, Text, Title } from '@mantine/core';
import { ContactForm } from './ContactForm';

export default function ContactPage() {
  return (
    <Container size="sm" className="py-16">
      <Text size="sm" className="text-brand-600 uppercase tracking-wider mb-2 font-semibold text-center">
        Contact
      </Text>
      <Title order={1} className="text-4xl md:text-5xl font-display text-gray-900 mb-4 text-center">
        Get in Touch
      </Title>
      <Text className="text-gray-500 text-center mb-10 max-w-lg mx-auto">
        Ready to transform your healthcare operations? Let&apos;s discuss how eHealthwares can help.
      </Text>
      <ContactForm />
    </Container>
  );
}

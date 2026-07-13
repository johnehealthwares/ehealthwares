import Link from 'next/link';
import { Container, Text, Title } from '@mantine/core';
import type { SiteSection } from '@/lib/types';

interface HeroProps {
  section: SiteSection;
}

export function Hero({ section }: HeroProps) {
  if (!section) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand-100 blur-3xl opacity-70" />
      <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-brand-50 blur-3xl opacity-70" />
      <Container size="lg" className="relative grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-28">
        <div>
          <span className="inline-block px-3 py-1 mb-5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            Enterprise Healthcare Technology
          </span>
          <Title order={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight">
            {section.title}
          </Title>
          {section.subtitle && (
            <Text className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
              {section.subtitle}
            </Text>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products/rxsoft-pharmacy"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Contact Sales
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="text-brand-600">✓</span> HIPAA-ready</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-600">✓</span> HL7 / FHIR interoperable</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-600">✓</span> 24/7 support</span>
          </div>
        </div>
        <div className="relative">
          <img
            src="/images/img3.jpg"
            alt="Healthcare professionals using technology"
            className="w-full h-[380px] lg:h-[440px] rounded-2xl object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <div className="text-2xl font-bold text-brand-700">500+</div>
            <div className="text-xs text-gray-500">Facilities empowered</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

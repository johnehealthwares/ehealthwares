import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import {
  IconActivity,
  IconArrowRight,
  IconBuilding,
  IconCode,
  IconFlask,
  IconHeartbeat,
  IconLink,
  IconMicroscope,
  IconNetwork,
  IconPill,
  IconRobot,
  IconScan,
  IconSchool,
  IconVideo,
  IconArrowBigRight,
} from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Section header                                                    */
/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  chip: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}

export function SectionHeader({ chip, title, subtitle, align = 'center', dark = false }: SectionHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div className={`mb-12 max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      <span className={dark ? 'chip chip-dark' : 'chip'}>{chip}</span>
      <h2
        className={`mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base leading-relaxed ${dark ? 'text-white/65' : 'text-navy-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Responsive image (Next Image) with context-aware alt fallback     */
/* ------------------------------------------------------------------ */

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function SiteImage({ src, alt, className = '', priority, sizes, quality }: SiteImageProps) {
  const isRemote = src.startsWith('http');
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
      quality={quality ?? 80}
      priority={priority}
      className={`object-cover ${className}`}
      unoptimized={!isRemote}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Product accent system — every module inherits a brand color       */
/* ------------------------------------------------------------------ */

export interface Accent {
  from: string;
  to: string;
  text: string;
  soft: string;
  ring: string;
  icon: ComponentType<{ size?: number | string; stroke?: number | string; className?: string }>;
}

export const PRODUCT_ACCENTS: Record<string, Accent> = {
  'rxsoft-pharmacy': {
    from: '#16A34A',
    to: '#0D9488',
    text: '#15803D',
    soft: 'rgba(22,163,74,0.10)',
    ring: 'rgba(22,163,74,0.35)',
    icon: IconPill,
  },
  emr: {
    from: '#2563EB',
    to: '#7C3AED',
    text: '#1D4ED8',
    soft: 'rgba(37,99,235,0.10)',
    ring: 'rgba(37,99,235,0.35)',
    icon: IconHeartbeat,
  },
  lis: {
    from: '#0D9488',
    to: '#2563EB',
    text: '#0F766E',
    soft: 'rgba(13,148,136,0.10)',
    ring: 'rgba(13,148,136,0.35)',
    icon: IconMicroscope,
  },
  ris: {
    from: '#F43F5E',
    to: '#7C3AED',
    text: '#E11D48',
    soft: 'rgba(244,63,94,0.10)',
    ring: 'rgba(244,63,94,0.35)',
    icon: IconScan,
  },
  telemedicine: {
    from: '#7C3AED',
    to: '#2563EB',
    text: '#6D28D9',
    soft: 'rgba(124,58,237,0.10)',
    ring: 'rgba(124,58,237,0.35)',
    icon: IconVideo,
  },
  'healthcare-interoperability': {
    from: '#0F2A43',
    to: '#2563EB',
    text: '#1E40AF',
    soft: 'rgba(37,99,235,0.10)',
    ring: 'rgba(37,99,235,0.35)',
    icon: IconNetwork,
  },
  'ai-automation': {
    from: '#F59E0B',
    to: '#F43F5E',
    text: '#B45309',
    soft: 'rgba(245,158,11,0.12)',
    ring: 'rgba(245,158,11,0.4)',
    icon: IconRobot,
  },
  medtrain: {
    from: '#0D9488',
    to: '#16A34A',
    text: '#0F766E',
    soft: 'rgba(13,148,136,0.10)',
    ring: 'rgba(13,148,136,0.35)',
    icon: IconSchool,
  },
  echo: {
    from: '#2563EB',
    to: '#0D9488',
    text: '#1D4ED8',
    soft: 'rgba(37,99,235,0.10)',
    ring: 'rgba(37,99,235,0.35)',
    icon: IconActivity,
  },
  research: {
    from: '#7C3AED',
    to: '#0D9488',
    text: '#6D28D9',
    soft: 'rgba(124,58,237,0.10)',
    ring: 'rgba(124,58,237,0.35)',
    icon: IconFlask,
  },
  monitoring: {
    from: '#2563EB',
    to: '#16A34A',
    text: '#1D4ED8',
    soft: 'rgba(37,99,235,0.10)',
    ring: 'rgba(37,99,235,0.35)',
    icon: IconHeartbeat,
  },
};

export const SERVICE_ACCENTS: Record<string, Accent> = {
  'digital-transformation': {
    from: '#2563EB',
    to: '#7C3AED',
    text: '#1D4ED8',
    soft: 'rgba(37,99,235,0.10)',
    ring: 'rgba(37,99,235,0.35)',
    icon: IconArrowBigRight,
  },
  'enterprise-architecture': {
    from: '#0F2A43',
    to: '#2563EB',
    text: '#1E40AF',
    soft: 'rgba(15,42,67,0.08)',
    ring: 'rgba(15,42,67,0.3)',
    icon: IconBuilding,
  },
  'custom-software-development': {
    from: '#7C3AED',
    to: '#F43F5E',
    text: '#6D28D9',
    soft: 'rgba(124,58,237,0.10)',
    ring: 'rgba(124,58,237,0.35)',
    icon: IconCode,
  },
  'healthcare-integration': {
    from: '#0D9488',
    to: '#2563EB',
    text: '#0F766E',
    soft: 'rgba(13,148,136,0.10)',
    ring: 'rgba(13,148,136,0.35)',
    icon: IconLink,
  },
};

export function getAccent(slug: string | null | undefined, map: Record<string, Accent>): Accent {
  return (slug && map[slug]) || PRODUCT_ACCENTS['emr'];
}

/* ------------------------------------------------------------------ */
/*  Icon tile with brand gradient                                     */
/* ------------------------------------------------------------------ */

export function AccentTile({ accent, size = 52 }: { accent: Accent; size?: number }) {
  const Icon = accent.icon;
  return (
    <span
      className="inline-flex items-center justify-center rounded-2xl text-white shadow-lg"
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
        boxShadow: `0 10px 28px -8px ${accent.ring}`,
      }}
    >
      <Icon size={size * 0.48} stroke={2} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow link                                                       */
/* ------------------------------------------------------------------ */

export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${
        dark ? 'text-blue-300 hover:text-white' : 'text-blue-600 hover:text-blue-700'
      }`}
    >
      {children}
      <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

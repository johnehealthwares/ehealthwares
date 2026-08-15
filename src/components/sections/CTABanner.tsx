import Link from 'next/link';
import { IconArrowRight, IconMessageCircle } from '@tabler/icons-react';
import type { SiteSection } from '@/lib/types';

interface CTABannerProps {
  section: SiteSection;
}

export function CTABanner({ section }: CTABannerProps) {
  if (!section) return null;

  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-cta-gradient-alt p-10 text-center sm:p-16">
          {/* Animated glow blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-glow-pulse rounded-full bg-white/15 blur-3xl" />
          <div
            className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 animate-glow-pulse rounded-full bg-amber-300/20 blur-3xl"
            style={{ animationDelay: '2s' }}
          />
          <div className="pointer-events-none absolute inset-0 hex-pattern opacity-20" />

          <div className="relative mx-auto max-w-3xl">
            <span className="chip chip-dark">Get Started</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {section.subtitle}
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-gradient !px-8 !py-4 !text-base">
                Get in Touch
                <IconArrowRight size={18} />
              </Link>
              <Link
                href="/products-services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/20"
              >
                <IconMessageCircle size={18} />
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

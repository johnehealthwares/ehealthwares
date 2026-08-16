'use client';

import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight, IconChevronDown, IconSparkles } from '@tabler/icons-react';
import type { HeroSlide } from '@/lib/types';
import { SiteImage } from '@/components/shared';

interface HeroProps {
  slides: HeroSlide[];
  interval?: number;
}

export function Hero({ slides, interval = 6000 }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: interval, stopOnInteraction: false }));

  if (!slides?.length) return null;

  return (
    <section className="relative">
      <Carousel
        withIndicators
        withControls
        height="88vh"
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
        styles={{
          control: {
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff',
            width: 46,
            height: 46,
          },
          controls: { paddingInline: 20 },
          indicator: {
            width: 28,
            height: 4,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.35)',
            transition: 'all 0.3s ease',
          },
          indicators: { bottom: 28 },
        }}
      >
        {slides.map((slide) => (
          <Carousel.Slide key={slide._id}>
            <div className="relative h-[88vh] w-full overflow-hidden bg-navy-900">
              {slide.mediaType === 'video' ? (
                <video
                  src={slide.mediaUrl ?? ''}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <SiteImage
                  src={slide.mediaUrl ?? ''}
                  alt={slide.title ?? 'eHealthwares hero image'}
                  priority
                  sizes="100vw"
                />
              )}

              {/* Layered gradients for legibility + vibrancy */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-navy-900/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(124,58,237,0.18),transparent_70%)]" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-6">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
                      <IconSparkles size={13} className="text-amber-300" />
                      eHealthWares Ecosystem
                    </span>

                    {slide.title && (
                      <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                    )}

                    {slide.subtitle && (
                      <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                        {slide.subtitle}
                      </p>
                    )}

                    {slide.ctaText && slide.ctaLink && (
                      <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Link href={slide.ctaLink} className="btn-gradient !px-7 !py-3.5 text-base">
                          {slide.ctaText}
                          <IconArrowRight size={18} />
                        </Link>
                        <Link
                          href="/products-services"
                          className="btn-ghost-light !px-7 !py-3.5 text-base"
                        >
                          Explore Solutions
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      <a
        href="#categories"
        className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
        aria-label="Scroll to solutions"
      >
        <IconChevronDown size={30} className="animate-bounce" />
      </a>
    </section>
  );
}

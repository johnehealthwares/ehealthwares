'use client';

import { Carousel } from '@mantine/carousel';
import { Container, Title, Text, Button, Overlay, Box, Group, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import type { HeroSlide } from '@/lib/types';

interface HeroProps {
  slides: HeroSlide[];
  interval?: number;
}

export function Hero({ slides, interval = 5000 }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: interval, stopOnInteraction: false }));

  if (!slides?.length) return null;

  return (
    <Box component="section" style={{ position: 'relative' }}>
      <Carousel
        withIndicators
        withControls
        height="70vh"
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={{
          control: {
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            width: 48,
            height: 48,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
          indicator: {
            width: 10,
            height: 10,
            borderRadius: '50%',
          },
        }}
      >
        {slides.map((slide) => (
          <Carousel.Slide key={slide._id}>
            <Box style={{ position: 'relative', height: '70vh', width: '100%', overflow: 'hidden' }}>
              {slide.mediaType === 'video' ? (
                <Box
                  component="video"
                  src={slide.mediaUrl ?? ''}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Box
                  style={{
                    width: '100%', height: '100%',
                    backgroundImage: slide.mediaUrl ? `url(${slide.mediaUrl})` : 'none',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }}
                />
              )}
              <Overlay gradient="linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%)" zIndex={1} />
              <Container
                size="lg"
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2,
                  display: 'flex', alignItems: 'center',
                }}
              >
                <Box maw={640}>
                  {slide.title && (
                    <Title order={1} c="white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                      {slide.title}
                    </Title>
                  )}
                  {slide.subtitle && (
                    <Text size="lg" c="gray.3" mt="md" style={{ maxWidth: 520 }}>
                      {slide.subtitle}
                    </Text>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Group mt="xl">
                      <Button component={Link} href={slide.ctaLink} size="lg" variant="filled" color="brand">
                        {slide.ctaText}
                      </Button>
                    </Group>
                  )}
                </Box>
              </Container>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Box style={{ position: 'absolute', bottom: 24, left: 0, right: 0, zIndex: 3, textAlign: 'center' }}>
        <ActionIcon
          component="a"
          href="#categories"
          variant="transparent"
          size="lg"
          style={{ color: 'white', opacity: 0.8, cursor: 'pointer' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </ActionIcon>
      </Box>
    </Box>
  );
}

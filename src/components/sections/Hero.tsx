'use client';

import { Carousel } from '@mantine/carousel';
import { Container, Title, Text, Button, Overlay, Box, Group } from '@mantine/core';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import type { HeroSlide } from '@/lib/types';

interface HeroProps {
  slides: HeroSlide[];
  interval?: number;
}

export function Hero({ slides, interval = 20000 }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: interval, stopOnInteraction: false }));

  if (!slides?.length) return null;

  return (
    <Box component="section">
      <Carousel
        withIndicators
        withControls
        height="90vh"
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={{
          control: {
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            width: 48,
            height: 48,
          },
        }}
      >
        {slides.map((slide) => (
          <Carousel.Slide key={slide._id}>
            <Box style={{ position: 'relative', height: '90vh', width: '100%', overflow: 'hidden' }}>
              {slide.mediaType === 'video' ? (
                <Box
                  component="video"
                  src={slide.mediaUrl ?? ''}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: slide.mediaUrl ? `url(${slide.mediaUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <Overlay gradient="linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" zIndex={1} />
              <Container
                size="lg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
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
    </Box>
  );
}

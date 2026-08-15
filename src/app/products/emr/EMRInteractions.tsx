'use client';

import { useEffect } from 'react';

export function EMRInteractions() {
  useEffect(() => {
    const root = document.querySelector('.emr') as HTMLElement | null;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    // Scrolled header shadow
    try {
      const hdr = document.getElementById('mainHeader');
      const onScroll = () => hdr?.classList.toggle('scrolled', window.scrollY > 40);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    } catch (e) {
      console.error('EMR header scroll wiring failed:', e);
    }

    // Mobile menu
    try {
      const mobToggle = root.querySelector<HTMLElement>('#mobToggle');
      const mobNav = root.querySelector<HTMLElement>('#mobNav');
      const mobIcon = root.querySelector<HTMLElement>('#mobIcon');
      const setIcon = (open: boolean) => {
        if (mobIcon) mobIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
      };
      const toggleMobile = () => {
        if (!mobNav) return;
        const open = mobNav.classList.toggle('open');
        setIcon(open);
      };
      mobToggle?.addEventListener('click', toggleMobile);
      mobNav?.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
          mobNav.classList.remove('open');
          setIcon(false);
        })
      );
      cleanups.push(() => {
        mobToggle?.removeEventListener('click', toggleMobile);
      });
    } catch (e) {
      console.error('EMR mobile menu wiring failed:', e);
    }

    // Stat counters
    try {
      const animateCounter = (el: HTMLElement) => {
        const target = parseInt(el.dataset.target || '0', 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const statsBar = root.querySelector('.stats-bar');
      if (statsBar && typeof IntersectionObserver !== 'undefined') {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target
                  .querySelectorAll('.stat-number')
                  .forEach((n) => animateCounter(n as HTMLElement));
                obs.disconnect();
              }
            });
          },
          { threshold: 0.4 }
        );
        obs.observe(statsBar);
        cleanups.push(() => obs.disconnect());
      }
    } catch (e) {
      console.error('EMR stat counter wiring failed:', e);
    }

    // Scroll reveal
    try {
      const reveals = root.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      if (reveals.length && typeof IntersectionObserver !== 'undefined') {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        reveals.forEach((r) => obs.observe(r));
        cleanups.push(() => obs.disconnect());
      }
    } catch (e) {
      console.error('EMR reveal wiring failed:', e);
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}

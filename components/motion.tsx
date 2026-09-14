'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PENDING = "[data-reveal]:not([data-reveal$='-shown'])";
const REDUCED = '(prefers-reduced-motion: reduce)';
const FINE_POINTER =
  '(pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Ease matching --ease-out, for values JavaScript has to interpolate itself. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function runCounter(el: HTMLElement) {
  const to = Number(el.dataset.countTo);
  const from = Number(el.dataset.countFrom ?? 0);
  if (Number.isNaN(to) || Number.isNaN(from)) return;
  const duration = 1100;
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    el.textContent = String(Math.round(from + (to - from) * easeOut(progress)));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Document-level motion wiring, so static sections opt into scroll reveals,
 * counters, and cursor effects with an attribute instead of becoming client
 * components. Every effect is a no-op under prefers-reduced-motion.
 */
export function MotionRoot() {
  const pathname = usePathname();

  // Scroll reveals and counters, re-armed on every navigation.
  useEffect(() => {
    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>(PENDING));
    const counters = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));

    if (window.matchMedia(REDUCED).matches) {
      targets().forEach((el) => {
        el.setAttribute('data-reveal', `${el.dataset.reveal || 'fade'}-shown`);
      });
      counters().forEach((el) => {
        el.textContent = String(el.dataset.countTo);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute(
            'data-reveal',
            `${el.dataset.reveal || 'fade'}-shown`,
          );
          el.querySelectorAll<HTMLElement>('[data-count-to]').forEach(
            runCounter,
          );
          observer.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    // Stagger is scoped per container, so each group counts from zero.
    const groups = new Map<Element | null, number>();
    targets().forEach((el) => {
      const parent = el.parentElement;
      const index = groups.get(parent) ?? 0;
      groups.set(parent, index + 1);
      el.style.setProperty('--reveal-index', String(Math.min(index, 6)));
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Cursor tracking, scroll progress, and the magnetic call to action.
  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return;
    const fine = window.matchMedia(FINE_POINTER).matches;
    const root = document.documentElement;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!fine) return;
      const spot = (event.target as Element | null)?.closest<HTMLElement>(
        '.spotlight',
      );
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${event.clientX - box.left}px`);
        spot.style.setProperty('--my', `${event.clientY - box.top}px`);
      }
      const grid = document.querySelector<HTMLElement>('[data-cursor-grid]');
      if (grid) {
        const box = grid.getBoundingClientRect();
        grid.style.setProperty('--gx', `${event.clientX - box.left}px`);
        grid.style.setProperty('--gy', `${event.clientY - box.top}px`);
      }
      document
        .querySelectorAll<HTMLElement>('[data-magnetic]')
        .forEach((el) => {
          const box = el.getBoundingClientRect();
          const dx = event.clientX - (box.left + box.width / 2);
          const dy = event.clientY - (box.top + box.height / 2);
          const near =
            Math.abs(dx) < box.width && Math.abs(dy) < box.height * 2.5;
          el.style.setProperty('--tx', near ? `${dx * 0.18}px` : '0px');
          el.style.setProperty('--ty', near ? `${dy * 0.18}px` : '0px');
        });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.body.scrollHeight - window.innerHeight;
        root.style.setProperty(
          '--scroll-progress',
          String(max > 0 ? Math.min(1, window.scrollY / max) : 0),
        );
        root.toggleAttribute('data-scrolled', window.scrollY > 8);
      });
    };

    onScroll();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}

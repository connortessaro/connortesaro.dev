'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

const PENDING = "[data-reveal]:not([data-reveal$='-shown'])";
const REDUCED = '(prefers-reduced-motion: reduce)';
const FINE_POINTER =
  '(pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * A media query as reactive state, so switching the OS motion setting or
 * plugging in a mouse re-runs the effects below instead of leaving them on
 * whatever was true at mount.
 */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    // Server render assumes no preference; the client corrects on hydration.
    () => false,
  );
}

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
  const reduced = useMediaQuery(REDUCED);
  const fine = useMediaQuery(FINE_POINTER);

  // Scroll reveals and counters, re-armed on every navigation.
  useEffect(() => {
    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>(PENDING));
    const counters = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));

    if (reduced) {
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
  }, [pathname, reduced]);

  // Infinite decorative loops keep the compositor and the main thread busy for
  // as long as the page is open, including well past the section they belong
  // to. Pausing them off screen costs one observer and saves the battery.
  useEffect(() => {
    const scopes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-animate-scope]'),
    );
    if (!scopes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).toggleAttribute(
            'data-inview',
            entry.isIntersecting,
          );
        }
      },
      { rootMargin: '200px 0px' },
    );
    scopes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Cursor tracking, scroll progress, and the magnetic call to action.
  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    let frame = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let spot: HTMLElement | null = null;

    // Queried once per effect run rather than per pointer event. Both live in
    // page chrome that outlives any single move.
    const grid = document.querySelector<HTMLElement>('[data-cursor-grid]');
    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-magnetic]'),
    );

    const applyPointer = () => {
      pointerFrame = 0;
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${pointerX - box.left}px`);
        spot.style.setProperty('--my', `${pointerY - box.top}px`);
      }
      if (grid) {
        const box = grid.getBoundingClientRect();
        grid.style.setProperty('--gx', `${pointerX - box.left}px`);
        grid.style.setProperty('--gy', `${pointerY - box.top}px`);
      }
      for (const el of magnets) {
        const box = el.getBoundingClientRect();
        const dx = pointerX - (box.left + box.width / 2);
        const dy = pointerY - (box.top + box.height / 2);
        const near =
          Math.abs(dx) < box.width && Math.abs(dy) < box.height * 2.5;
        el.style.setProperty('--tx', near ? `${dx * 0.18}px` : '0px');
        el.style.setProperty('--ty', near ? `${dy * 0.18}px` : '0px');
      }
    };

    // Coalesced to one frame. A pointer can fire well above display rate, and
    // every handler here reads layout.
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      spot =
        (event.target as Element | null)?.closest<HTMLElement>(
          '.spotlight, [data-lit]',
        ) ?? null;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointer);
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
    // Scroll progress is not a pointer effect, so it runs on touch too.
    if (fine) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, fine]);

  return null;
}

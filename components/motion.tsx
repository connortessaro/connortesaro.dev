'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_PENDING = "[data-reveal]:not([data-reveal='shown'])";

/**
 * Document-level motion wiring, so static sections can opt into scroll reveals
 * and cursor highlights with an attribute instead of becoming client components.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>(REVEAL_PENDING));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pending().forEach((el) => el.setAttribute('data-reveal', 'shown'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-reveal', 'shown');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    pending().forEach((el, index) => {
      el.style.setProperty('--reveal-index', String(index % 6));
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '.spotlight',
      );
      if (!target) return;
      const box = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${event.clientX - box.left}px`);
      target.style.setProperty('--my', `${event.clientY - box.top}px`);
    };
    const onScroll = () =>
      document.documentElement.toggleAttribute('data-scrolled', scrollY > 8);

    onScroll();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}

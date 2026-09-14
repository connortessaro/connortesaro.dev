'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
};

/**
 * Offset of an element within an ancestor, accumulated through the offsetParent
 * chain. The scenes sit inside a rotated, translated card, and
 * getBoundingClientRect would report screen-space coordinates while this SVG
 * draws in the parent's local space — the beam would drift off its nodes as the
 * rotation changes between demo steps. Offsets ignore transforms entirely.
 */
function offsetWithin(el: HTMLElement, container: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function center(el: HTMLElement, container: HTMLElement) {
  const { x, y } = offsetWithin(el, container);
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

/**
 * Adapted from Magic UI's AnimatedBeam (MIT). The original ships Tailwind
 * classes and measures with getBoundingClientRect; this repo has neither
 * Tailwind nor an untransformed container.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 3,
  delay = 0,
  pathColor = '#2e2e2e',
  pathWidth = 1.5,
  pathOpacity = 1,
  gradientStartColor = '#52a8ff',
  gradientStopColor = '#a0d4ff',
}: AnimatedBeamProps) {
  const id = useId();
  const reduced = useReducedMotion();
  const [path, setPath] = useState('');
  const [size, setSize] = useState({ width: 0, height: 0 });
  const frame = useRef(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;
    const start = center(from, container);
    const end = center(to, container);
    const controlY = (start.y + end.y) / 2 - curvature;
    setSize({ width: container.offsetWidth, height: container.offsetHeight });
    setPath(
      `M ${start.x},${start.y} Q ${(start.x + end.x) / 2},${controlY} ${end.x},${end.y}`,
    );
  }, [containerRef, fromRef, toRef, curvature]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const schedule = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    // Fonts settle after first paint and shift the node boxes.
    document.fonts?.ready.then(schedule).catch(() => {});
    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
    };
  }, [containerRef, measure]);

  if (!path) return null;

  return (
    <svg
      className="beam"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {!reduced && (
        <>
          <path
            d={path}
            stroke={`url(#${id})`}
            strokeWidth={pathWidth}
            strokeLinecap="round"
          />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: '-20%', x2: '0%' }}
              animate={{ x1: ['-20%', '100%'], x2: ['0%', '120%'] }}
              transition={{
                delay,
                duration,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop offset="0.4" stopColor={gradientStartColor} />
              <stop offset="0.6" stopColor={gradientStopColor} />
              <stop offset="1" stopColor={gradientStopColor} stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}

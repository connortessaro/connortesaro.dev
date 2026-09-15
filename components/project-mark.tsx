'use client';
import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Project } from '@/content/projects';
import { TechPill } from '@/components/tech';
import s from './project-mark.module.css';

/**
 * Three marks, one per project, each drawn from its own product rather than
 * from a shared device.
 *
 * The depth is layered planes under `transform-style: preserve-3d`, not WebGL.
 * Rotating a stack of composited layers costs nothing, where a transmission
 * material cost two thirds of the frame budget the last time this site tried
 * real 3D. The parallax between planes is the whole effect.
 */

const TILTABLE = '(pointer:fine) and (prefers-reduced-motion:no-preference)';

/** Ringi: a hanko. The seal is the decision, pressed once and kept. */
function RingiMark() {
  return (
    <>
      <span
        className={s.layer}
        style={{ '--z': '-18px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className={s.ghost} />
        </svg>
      </span>
      <span className={s.layer} style={{ '--z': '0px' } as React.CSSProperties}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <rect
            x="10"
            y="10"
            width="100"
            height="100"
            rx="14"
            className={s.ring}
          />
        </svg>
      </span>
      <span
        className={s.layer}
        style={{ '--z': '14px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="40" className={s.ringThin} />
        </svg>
      </span>
      <span
        className={`${s.layer} ${s.glyph}`}
        style={{ '--z': '30px' } as React.CSSProperties}
      >
        稟
      </span>
    </>
  );
}

/** Phantom: a metered stream, the tail of it receding out of the ledger. */
function PhantomMark() {
  const bars = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      {bars.map((i) => (
        <span
          key={i}
          className={s.layer}
          style={
            {
              '--z': `${28 - i * 9}px`,
              opacity: 1 - i * 0.13,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <rect
              x={22 + i * 12}
              y={60 - (34 - i * 3.4)}
              width="7"
              height={(34 - i * 3.4) * 2}
              rx="3.5"
              className={s.bar}
            />
          </svg>
        </span>
      ))}
      <span
        className={s.layer}
        style={{ '--z': '30px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path d="M14 98 H106" className={s.rule} />
        </svg>
      </span>
    </>
  );
}

/** Kizuki: the stored record and the claim about it, and the gap between. */
function KizukiMark() {
  return (
    <>
      <span
        className={s.layer}
        style={{ '--z': '-16px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <rect
            x="20"
            y="26"
            width="74"
            height="62"
            rx="8"
            className={s.ghost}
          />
        </svg>
      </span>
      <span className={s.layer} style={{ '--z': '4px' } as React.CSSProperties}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <rect
            x="14"
            y="20"
            width="74"
            height="62"
            rx="8"
            className={s.ring}
          />
          <path d="M26 38 H60 M26 50 H72 M26 62 H52" className={s.ruleFaint} />
        </svg>
      </span>
      <span
        className={s.layer}
        style={{ '--z': '26px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <rect
            x="34"
            y="40"
            width="74"
            height="62"
            rx="8"
            className={s.ringThin}
          />
          <path d="M46 58 H92 M46 70 H80" className={s.ruleFaint} />
        </svg>
      </span>
      {/* The discrepancy: one mark sitting exactly where the two disagree. */}
      <span
        className={s.layer}
        style={{ '--z': '40px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="88" cy="46" r="7" className={s.dot} />
        </svg>
      </span>
    </>
  );
}

const MARKS = { ringi: RingiMark, phantom: PhantomMark, kizuki: KizukiMark };

export function ProjectMark({ project }: { project: Project }) {
  const stage = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const tiltable = useRef(false);
  const Mark = MARKS[project.slug];

  useEffect(() => {
    const list = window.matchMedia(TILTABLE);
    const sync = () => {
      tiltable.current = list.matches;
      if (!list.matches) {
        stage.current?.style.setProperty('--rx', '0deg');
        stage.current?.style.setProperty('--ry', '0deg');
      }
    };
    sync();
    list.addEventListener('change', sync);
    return () => {
      list.removeEventListener('change', sync);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  // Coalesced to a frame: the handler reads layout and a pointer fires faster
  // than the display refreshes.
  const onMove = useCallback((event: React.PointerEvent) => {
    if (!tiltable.current || frame.current) return;
    const { clientX, clientY } = event;
    const target = event.currentTarget;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const box = target.getBoundingClientRect();
      stage.current?.style.setProperty(
        '--rx',
        `${-(clientY - box.top - box.height / 2) / 9}deg`,
      );
      stage.current?.style.setProperty(
        '--ry',
        `${(clientX - box.left - box.width / 2) / 9}deg`,
      );
    });
  }, []);

  const reset = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    stage.current?.style.setProperty('--rx', '0deg');
    stage.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <span
      className={s.mark}
      style={{ '--accent': project.accent } as React.CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <span className={s.stage} ref={stage}>
        <Mark />
      </span>
    </span>
  );
}

/**
 * The homepage entry for a project. The demo it replaces still exists — it
 * lives on the case study, which is the page that wanted it.
 */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className={s.row}
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      <ProjectMark project={project} />
      <div className={s.body}>
        <div className={s.kicker}>
          <span className="eyebrow">{project.discipline}</span>
          <span className={`eyebrow ${s.status}`}>{project.status}</span>
        </div>
        <h2>
          {project.name}
          <span aria-hidden="true">
            {project.slug === 'ringi'
              ? '稟議'
              : project.slug === 'kizuki'
                ? '気づき'
                : 'AI'}
          </span>
        </h2>
        <h3>{project.headline}</h3>
        <Link href={`/work/${project.slug}`} className="line-link">
          Read the case study{' '}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
      <div className={s.meta}>
        {project.stack.slice(0, 3).map((t) => (
          <TechPill key={t} label={t} />
        ))}
      </div>
    </article>
  );
}

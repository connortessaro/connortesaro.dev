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

/**
 * The real marks, lifted from each project's own repo rather than invented.
 * Ringi and Kizuki both document the hanko as their primary logo; Phantom's is
 * the pixel ghost its app already ships. Colours are handed to the page via
 * currentColor so each takes the accent it already had here.
 *
 * Kizuki's own seal file is a 100KB photographed paper stamp with a white
 * background — a bright block on a black page — so it is rebuilt here from
 * Ringi's vector, which its brand doc calls the same hierarchy.
 */

/** Ringi: the hanko. Its brand doc calls this the primary logo mark. */
function RingiMark() {
  return (
    <>
      <span
        className={s.layer}
        style={{ '--z': '-20px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true" className={s.echo}>
          <defs>
            <filter id="bleedRin" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="7"
                result="n"
              />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
            </filter>
            <filter id="grainRin">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="11"
                result="g"
              />
              <feColorMatrix
                in="g"
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"
                result="holes"
              />
              <feComposite in="SourceGraphic" in2="holes" operator="out" />
            </filter>
          </defs>
          <g transform="rotate(-4 60 60)" filter="url(#bleedRin)">
            <g filter="url(#grainRin)">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
              />
              <text
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Shippori Mincho','Hiragino Mincho ProN',serif"
                fontSize="58"
                fontWeight="700"
                fill="currentColor"
              >
                稟
              </text>
            </g>
          </g>
        </svg>
      </span>
      <span
        className={s.layer}
        style={{ '--z': '18px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <filter id="bleedRin" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="7"
                result="n"
              />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
            </filter>
            <filter id="grainRin">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="11"
                result="g"
              />
              <feColorMatrix
                in="g"
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"
                result="holes"
              />
              <feComposite in="SourceGraphic" in2="holes" operator="out" />
            </filter>
          </defs>
          <g transform="rotate(-4 60 60)" filter="url(#bleedRin)">
            <g filter="url(#grainRin)">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
              />
              <text
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Shippori Mincho','Hiragino Mincho ProN',serif"
                fontSize="58"
                fontWeight="700"
                fill="currentColor"
              >
                稟
              </text>
            </g>
          </g>
        </svg>
      </span>
    </>
  );
}

/** Phantom: the pixel ghost from its own logo.svg. */
function PhantomMark() {
  return (
    <>
      <span
        className={s.layer}
        style={{ '--z': '-22px' } as React.CSSProperties}
      >
        <svg
          viewBox="0 0 17 8"
          aria-hidden="true"
          className={`${s.echo} ${s.wide}`}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4 0h9v1h-9zM3 1h11v1h-11zM2 2h13v1h-13zM1 3h15v1h-15zM0 4h17v1h-17zM0 5h17v1h-17zM0 6h17v1h-17zM0 7h2v1h-2zM3 7h2v1h-2zM6 7h2v1h-2zM9 7h2v1h-2zM12 7h2v1h-2zM15 7h2v1h-2zM5 2h2v1h-2zM10 2h2v1h-2zM5 3h2v1h-2zM10 3h2v1h-2z"
          />
        </svg>
      </span>
      <span
        className={s.layer}
        style={{ '--z': '20px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 17 8" aria-hidden="true" className={s.wide}>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4 0h9v1h-9zM3 1h11v1h-11zM2 2h13v1h-13zM1 3h15v1h-15zM0 4h17v1h-17zM0 5h17v1h-17zM0 6h17v1h-17zM0 7h2v1h-2zM3 7h2v1h-2zM6 7h2v1h-2zM9 7h2v1h-2zM12 7h2v1h-2zM15 7h2v1h-2zM5 2h2v1h-2zM10 2h2v1h-2zM5 3h2v1h-2zM10 3h2v1h-2z"
          />
        </svg>
      </span>
    </>
  );
}

/** Kizuki: the 気 seal, its documented primary mark. */
function KizukiMark() {
  return (
    <>
      <span
        className={s.layer}
        style={{ '--z': '-20px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true" className={s.echo}>
          <defs>
            <filter id="bleedKi" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="19"
                result="n"
              />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
            </filter>
            <filter id="grainKi">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="23"
                result="g"
              />
              <feColorMatrix
                in="g"
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"
                result="holes"
              />
              <feComposite in="SourceGraphic" in2="holes" operator="out" />
            </filter>
          </defs>
          <g transform="rotate(3 60 60)" filter="url(#bleedKi)">
            <g filter="url(#grainKi)">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
              />
              <text
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Shippori Mincho','Hiragino Mincho ProN',serif"
                fontSize="58"
                fontWeight="700"
                fill="currentColor"
              >
                気
              </text>
            </g>
          </g>
        </svg>
      </span>
      <span
        className={s.layer}
        style={{ '--z': '18px' } as React.CSSProperties}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <filter id="bleedKi" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="19"
                result="n"
              />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
            </filter>
            <filter id="grainKi">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="23"
                result="g"
              />
              <feColorMatrix
                in="g"
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"
                result="holes"
              />
              <feComposite in="SourceGraphic" in2="holes" operator="out" />
            </filter>
          </defs>
          <g transform="rotate(3 60 60)" filter="url(#bleedKi)">
            <g filter="url(#grainKi)">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
              />
              <text
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Shippori Mincho','Hiragino Mincho ProN',serif"
                fontSize="58"
                fontWeight="700"
                fill="currentColor"
              >
                気
              </text>
            </g>
          </g>
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

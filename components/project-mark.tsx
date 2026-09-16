'use client';

import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Project } from '@/content/projects';
import { ProjectMascot } from '@/components/project-mascot';
import { TechPill } from '@/components/tech';
import s from './project-mark.module.css';

const TILTABLE = '(pointer:fine) and (prefers-reduced-motion:no-preference)';

export function ProjectMark({ project }: { project: Project }) {
  const stage = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const tiltable = useRef(false);

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

  const onMove = useCallback((event: React.PointerEvent) => {
    if (!tiltable.current || frame.current) return;
    const { clientX, clientY } = event;
    const target = event.currentTarget;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const box = target.getBoundingClientRect();
      stage.current?.style.setProperty(
        '--rx',
        `${-(clientY - box.top - box.height / 2) / 18}deg`,
      );
      stage.current?.style.setProperty(
        '--ry',
        `${(clientX - box.left - box.width / 2) / 18}deg`,
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
        <ProjectMascot slug={project.slug} className={s.mascot} />
      </span>
    </span>
  );
}

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

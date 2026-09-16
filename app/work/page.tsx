import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { ProjectMascot } from '@/components/project-mascot';
import s from '@/components/home.module.css';
export const metadata: Metadata = {
  title: 'Selected work',
  description:
    'Ringi, Phantom, and Kizuki — three independent projects addressing decision capture, inference accounting, and context verification.',
  alternates: { canonical: '/work' },
};
export default function WorkPage() {
  return (
    <main id="main">
      <div className="shell">
        <header className="route-intro">
          <span className="eyebrow muted">Selected work</span>
          <h1>Three systems for information that degrades in transit.</h1>
        </header>
        <div className={s.workGrid}>
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`${s.workEntry} spotlight`}
              data-reveal=""
            >
              <div
                className={s.workVisual}
                style={{ '--accent': p.accent } as React.CSSProperties}
              >
                <ProjectMascot
                  slug={p.slug}
                  sizes="(max-width: 899px) calc(100vw - 80px), 540px"
                  preload={p.slug === 'ringi'}
                />
              </div>
              <div>
                <span className="eyebrow" style={{ color: p.accent }}>
                  {p.discipline}
                </span>
                <h2>{p.name}</h2>
                <p>{p.headline}</p>
                <span className="line-link">
                  Read the case study{' '}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

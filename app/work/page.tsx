import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { ProjectArt } from '@/components/scenes';
import { Experiments } from '@/components/sections';
import s from '@/components/home.module.css';
export const metadata: Metadata = {
  title: 'Selected work',
  description:
    'Ringi, Phantom, and Kizuki: independent projects by Connor Tessaro.',
  alternates: { canonical: '/work' },
};
export default function WorkPage() {
  return (
    <main id="main">
      <div className="shell">
        <header className="route-intro">
          <span className="eyebrow muted">Selected work / 01—03</span>
          <h1>
            Questions.
            <br />
            Made tangible.
          </h1>
          <p>
            Tools for making decisions, running inference, and keeping context
            trustworthy. Built from the interface down to the system underneath.
          </p>
        </header>
        <div className={s.workGrid}>
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`${s.workEntry} spotlight`}
              data-reveal=""
            >
              <ProjectArt slug={p.slug} />
              <div>
                <span className="eyebrow" style={{ color: p.accent }}>
                  {p.number} / {p.category}
                </span>
                <h2>{p.name}</h2>
                <p>{p.summary}</p>
                <span className="line-link">
                  Explore the project{' '}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Experiments />
    </main>
  );
}

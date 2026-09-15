import Link from 'next/link';
import { projects } from '@/content/projects';
import s from './home.module.css';

/**
 * The ruled index under the masthead. A visitor otherwise has to scroll three
 * full chapters before learning what the three projects are.
 *
 * Deliberately not a `[data-reveal]` target: the rows sit just under the fold
 * on a short viewport, and a wipe there would hide the one scannable summary on
 * the page behind a scroll.
 */
export function ProjectIndex() {
  return (
    <nav className={s.index} aria-label="Projects">
      <ol className={s.indexList}>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`#${project.slug}`}>
              <span className={s.indexName}>{project.name}</span>
              <span className={s.indexNote}>{project.discipline}</span>
              <span className={s.indexStatus}>{project.status}</span>
              <span className={s.indexArrow} aria-hidden="true">
                ↓
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

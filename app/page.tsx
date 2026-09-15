import Link from 'next/link';
import { Orbit } from '@/components/orbit';
import { ProjectChapter } from '@/components/scenes';
import { ProjectIndex } from '@/components/project-index';
import { Experiments, Experience } from '@/components/sections';
import { projects } from '@/content/projects';
import s from '@/components/home.module.css';

export default function HomePage() {
  return (
    <main id="main">
      <div className={s.heroWrap} data-animate-scope="">
        <div className={s.heroGrid} aria-hidden="true" data-cursor-grid="" />
        <section className={`shell ${s.hero}`} aria-labelledby="hero-name">
          <div className={s.heroHead}>
            <span>Boston, Massachusetts</span>
            <span>Open to engineering roles and collaboration</span>
          </div>
          <div className={s.heroTop}>
            <div className={s.heroStatement}>
              <p>
                I build systems that reduce the administrative overhead{' '}
                <span>between a team’s intent and its execution.</span>
              </p>
              <div className={s.heroSmall}>
                Currently a software engineering co-op at Chewy, working on
                labor and capacity planning across Snowflake pipelines, AWS
                infrastructure, and the interfaces that carry forecasts to
                fulfillment-center teams.
              </div>
            </div>
            <Orbit />
          </div>
          <h1 className={s.name} id="hero-name">
            <span>CONNOR</span>
            <span>
              TESSARO
              <span className={s.nameStar} aria-hidden="true">
                ✳
              </span>
            </span>
          </h1>
          <ProjectIndex />
        </section>
      </div>
      <section
        id="selected-work"
        className="shell"
        aria-labelledby="work-title"
      >
        <div className={s.sectionHead} data-reveal="mask">
          <span className="eyebrow muted">Selected work</span>
          <h2 id="work-title">
            Three independent projects addressing decision capture,{' '}
            <span>inference accounting, and context verification.</span>
          </h2>
          <p>
            Each one began as a question about where a system loses information,
            and each is built from the interface down to the data layer
            underneath it.
          </p>
        </div>
        {projects.map((project) => (
          <ProjectChapter key={project.slug} project={project} />
        ))}
      </section>
      <Experience />
      <section
        className={`shell ${s.aboutPreview}`}
        aria-labelledby="about-heading"
      >
        <div data-reveal="">
          <span className="eyebrow muted">Background</span>
          <div className={s.aboutMark} aria-hidden="true">
            ct<span>✳</span>
            <small>
              BOSTON, MA
              <br />
              42.36° N / 71.06° W
            </small>
          </div>
        </div>
        <div data-reveal="">
          <h2 id="about-heading" data-reveal="mask">
            I work on problems where understanding the system{' '}
            <span>is half of the work.</span>
          </h2>
          <p>
            I am a computer science student at Northeastern University with a
            mathematics minor, currently on co-op as a software engineer at
            Chewy in Boston. The problems I return to are the ones where
            information degrades as it moves between people and systems — a
            disagreement that never gets stated, a billing path that opens when
            a stream disconnects, a stored assumption that quietly stops being
            true.
          </p>
          <p>
            Each of those questions became a project, and each required building
            across the full stack: the interface, the application state
            underneath it, and the evidence that the two still agree.
          </p>
          <Link href="/about" className="line-link">
            Read the full background{' '}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
      <Experiments />
    </main>
  );
}

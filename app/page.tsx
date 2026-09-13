import Link from 'next/link';
import { Orbit } from '@/components/orbit';
import { ProjectChapter } from '@/components/scenes';
import { Experiments, Experience } from '@/components/sections';
import { projects } from '@/content/projects';
import s from '@/components/home.module.css';

export default function HomePage() {
  return (
    <main id="main">
      <div className={s.heroWrap}>
        <div className={s.heroGrid} aria-hidden="true" />
        <section className={`shell ${s.hero}`} aria-labelledby="hero-name">
          <div className={s.heroTop}>
            <div className={s.heroStatement}>
              <div className={s.availability}>
                <span />
                Software engineer & curious human
              </div>
              <p>
                I make complex things
                <br />
                <span>make sense.</span>
              </p>
              <div className={s.heroSmall}>
                Currently building at Chewy.
                <br />
                Computer science at Northeastern.
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
          <div className={s.heroBottom}>
            <span className="eyebrow muted">
              Independent projects. Shared curiosity.
            </span>
            <a href="#selected-work" className={s.scrollLink}>
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
            <span className={`eyebrow muted ${s.edition}`}>
              Portfolio / 2026
            </span>
          </div>
        </section>
      </div>
      <section
        id="selected-work"
        className="shell"
        aria-labelledby="work-title"
      >
        <div className={s.sectionHead} data-reveal="">
          <span className="eyebrow muted">01 — Selected work</span>
          <h2 id="work-title">
            From a question.
            <br />
            <span>To something real.</span>
          </h2>
          <p>
            Three projects at the intersection
            <br />
            of people, systems, and AI.
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
          <span className="eyebrow muted">03 — A little about me</span>
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
          <h2 id="about-heading">
            Curiosity is the
            <br />
            <span>common thread.</span>
          </h2>
          <p>
            I’m Connor, a computer science student at Northeastern and a
            software engineering co-op at Chewy. I like getting inside a
            complicated problem and building something that makes it easier to
            understand.
          </p>
          <p>
            That takes me from team decisions and AI infrastructure to game
            timelines and visual experiments. The domain changes. The curiosity
            stays.
          </p>
          <Link href="/about" className="line-link">
            More about me{' '}
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

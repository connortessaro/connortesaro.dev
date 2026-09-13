import type { Metadata } from 'next';
import Link from 'next/link';
import { Experiments } from '@/components/sections';
import s from '@/components/home.module.css';
export const metadata: Metadata = {
  title: 'About',
  description:
    'A little about Connor Tessaro: Northeastern CS, engineering at Chewy, and independent projects in AI, games, and visualization.',
  alternates: { canonical: '/about' },
};
export default function AboutPage() {
  return (
    <main id="main">
      <div className="shell">
        <header className="route-intro">
          <span className="eyebrow muted">The person behind the projects</span>
          <h1>
            Hi. I’m Connor.
            <br />I follow the questions.
          </h1>
        </header>
        <article className={s.aboutPage}>
          <p>
            I’m a computer science student at Northeastern University, with a
            mathematics minor, and a software engineering co-op at Chewy in
            Boston.
          </p>
          <p>
            I like problems where understanding the system is half the work. How
            does a team find the real disagreement? What happens to billing when
            a stream disconnects? How do you know whether the context an agent
            uses is still true?
          </p>
          <p>
            Those questions became{' '}
            <Link href="/work/ringi" className="text-link">
              Ringi
            </Link>
            ,{' '}
            <Link href="/work/phantom" className="text-link">
              Phantom
            </Link>
            , and{' '}
            <Link href="/work/kizuki" className="text-link">
              Kizuki
            </Link>
            . Each has a different interface, but they share a concern: making
            complicated work more understandable.
          </p>
          <h2>Building with the whole system in view.</h2>
          <p>
            At Chewy, I work on labor and capacity planning, from data pipelines
            and cloud infrastructure to the interfaces that bring forecasts to
            fulfillment teams. In open source, I’ve contributed a DateTime fix
            and documentation improvements to Prisma.
          </p>
          <p>
            I enjoy the movement between those layers. An interface raises
            questions about the data. A failure reveals something about the
            model. A small change in the workflow can make the whole product
            clearer.
          </p>
          <h2>There are other threads, too.</h2>
          <p>
            I’ve explored League of Legends match timelines through LeagueIQ,
            looking at decisions and participation over the course of a game.
            For a music course, I used Python to create a visual listening score
            for Le1f’s “Wut”. Different inputs, the same interest in finding a
            useful way to see them.
          </p>
          <dl className={s.aboutFacts} data-reveal="">
            <div>
              <dt>BASED IN</dt>
              <dd>Boston, Massachusetts</dd>
            </div>
            <div>
              <dt>EDUCATION</dt>
              <dd>
                Northeastern University
                <br />
                BS Computer Science · Mathematics minor
                <br />
                Expected May 2028
              </dd>
            </div>
            <div>
              <dt>CURRENTLY</dt>
              <dd>
                Software Engineer Co-op at Chewy
                <br />
                June–December 2026
              </dd>
            </div>
            <div>
              <dt>WORKING WITH</dt>
              <dd>
                TypeScript, Python, SQL, React,
                <br />
                Node.js, PostgreSQL, and AWS
              </dd>
            </div>
          </dl>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="line-link"
            style={{ marginTop: 30 }}
          >
            Download my résumé <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
      <Experiments />
    </main>
  );
}

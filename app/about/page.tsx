import type { Metadata } from 'next';
import Link from 'next/link';
import { Experiments } from '@/components/sections';
import s from '@/components/home.module.css';
export const metadata: Metadata = {
  title: 'About',
  description:
    'I am a computer science student at Northeastern University and a software engineering co-op at Chewy, building systems for decision capture, inference accounting, and context verification.',
  alternates: { canonical: '/about' },
};
export default function AboutPage() {
  return (
    <main id="main">
      <div className="shell">
        <header className="route-intro">
          <span className="eyebrow muted">About</span>
          <h1>
            I build systems for the places where information degrades in
            transit.
          </h1>
        </header>
        <article className={s.aboutPage}>
          <p>
            I am a computer science student at Northeastern University with a
            mathematics minor, currently on co-op as a software engineer at
            Chewy in Boston. My work concentrates on a specific class of
            problem: the points where information loses fidelity as it moves
            between people and systems, and where the loss is invisible until
            something downstream depends on it.
          </p>
          <p>
            Three questions have held my attention long enough to become
            projects. How does a distributed team locate the disagreement its
            thread never made explicit? What is the correct accounting path when
            a billable stream terminates before it reports final usage? How does
            a person, or an agent acting for them, establish that stored context
            is still true before relying on it?
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
            . The interfaces differ — a Slack agent, an inference gateway, a
            local-first CLI — but each addresses the same structural problem:
            preserving the evidence behind a claim so the claim remains
            checkable after the moment that produced it has passed.
          </p>
          <h2>Working across the full depth of a system.</h2>
          <p>
            At Chewy I work on labor and capacity planning, spanning the
            Snowflake pipelines that generate the forecast, the AWS
            infrastructure they run on, and the interfaces that deliver the
            output to fulfillment teams. Rewriting the labor-planning pipeline
            reduced its runtime from roughly 60 minutes to 10. In open source I
            have contributed to Prisma ORM, fixing millisecond DateTime
            precision loss in the SQLite driver adapter with regression coverage
            attached, alongside a documentation correction.
          </p>
          <p>
            I work deliberately across those layers, because the information
            each one produces is difficult to obtain from the others. An
            interface exposes assumptions the schema left implicit. A production
            failure describes the data model more precisely than the data model
            does. A change in the workflow can eliminate a problem that appeared
            to require an engineering solution.
          </p>
          <h2>Exploratory work.</h2>
          <p>
            LeagueIQ reads a League of Legends match through its decision points
            — objective contests, rotations, and participation across the
            timeline — on the premise that the scoreboard records the outcome
            while the timeline records the reasoning. For a music course I used
            Python to generate a visual listening score for Le1f’s “Wut”,
            rendering rhythm, texture, and structural repetition as a single
            readable artifact. Both apply the same method to different inputs:
            take a record that is already complete and find the representation
            that makes its structure legible.
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

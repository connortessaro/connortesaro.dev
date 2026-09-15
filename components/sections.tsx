import Link from 'next/link';
import Image from 'next/image';
import { experiments } from '@/content/projects';
import s from './home.module.css';

export function Experience() {
  return (
    <section className={s.experience} aria-labelledby="experience-heading">
      <div className="shell">
        <div className={s.experienceHeading} data-reveal="">
          <h2 id="experience-heading">Professional and open source</h2>
          <p>
            Production systems, delivered on teams that were already running.
          </p>
        </div>
        <div className={`${s.experienceRow} spotlight`} data-reveal="">
          <div className={s.company}>
            Chewy<span>Co-op, June–December 2026</span>
          </div>
          <div>
            <h3>Software Engineer Co-op</h3>
            <p>
              I work on labor and capacity planning, spanning the Snowflake
              pipelines that produce the forecast, the AWS infrastructure the
              pipelines run on, and the interfaces that carry the resulting
              numbers to fulfillment-center teams. Rewriting the labor-planning
              pipeline reduced its runtime from roughly 60 minutes to 10,
              measured against its scheduled production runs.
            </p>
          </div>
          <div>
            <div className={s.metric}>
              <span data-count-to="60">60</span> <small>→</small>{' '}
              <span data-count-from="60" data-count-to="10">
                10
              </span>{' '}
              <small>min</small>
            </div>
            <p className={s.metricCaption}>Labor-planning pipeline runtime</p>
          </div>
        </div>
        <div className={`${s.experienceRow} spotlight`} data-reveal="">
          <div className={s.company}>
            Prisma<span>Open source, March 2026</span>
          </div>
          <div>
            <h3>Contributions to Prisma ORM</h3>
            <p>
              I fixed millisecond DateTime handling in the SQLite driver
              adapter, where values were losing sub-second precision on the
              round trip, and added regression coverage so the behavior stays
              pinned. A second change corrected the distinct-field
              documentation.
            </p>
          </div>
          <div className={s.prLinks}>
            <a
              href="https://github.com/prisma/orm/pull/29274"
              target="_blank"
              rel="noreferrer"
            >
              #29274 · SQLite DateTime precision{' '}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/prisma/orm/pull/29269"
              target="_blank"
              rel="noreferrer"
            >
              #29269 · Documentation <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Experiments() {
  return (
    <section
      className={`shell ${s.experiments}`}
      aria-labelledby="experiments-heading"
    >
      <div className={s.experimentHeading} data-reveal="mask">
        <div>
          <span className={s.runningHead}>Exploratory work</span>
          <h2 id="experiments-heading">
            Smaller projects, built to answer a single question.
          </h2>
        </div>
        <p>Match data and music, treated as systems worth reading carefully.</p>
      </div>
      <div className={s.experimentGrid}>
        {experiments.map((e) => (
          <a
            key={e.name}
            href={e.href}
            target="_blank"
            rel="noreferrer"
            className={`${s.experimentLink} spotlight`}
            data-reveal=""
          >
            <div className={s.experimentArt}>
              {e.kind === 'score' ? (
                <Image
                  src="/images/listening-score.png"
                  fill
                  sizes="(max-width: 480px) 100vw, 50vw"
                  alt="Connor’s visual listening score for Le1f’s Wut, showing its musical structure"
                />
              ) : (
                <>
                  <span className={s.experimentLabel}>
                    LeagueIQ / illustrative event timeline
                  </span>
                  <svg viewBox="0 0 600 220" aria-hidden="true">
                    <g stroke="#242424" strokeWidth="1">
                      {[60, 110, 160].map((y) => (
                        <path key={y} d={`M35 ${y}H565`} />
                      ))}
                      {[100, 200, 300, 400, 500].map((x) => (
                        <path
                          key={x}
                          d={`M${x} 45V180`}
                          strokeDasharray="2 6"
                        />
                      ))}
                    </g>
                    <path
                      d="M35 163L98 161 145 134 207 142 255 104 309 113 365 73 420 97 478 62 565 51"
                      fill="none"
                      stroke="#52a8ff"
                      strokeWidth="2"
                    />
                    {[
                      [145, 134],
                      [255, 104],
                      [365, 73],
                      [478, 62],
                    ].map(([x, y], i) => (
                      <g key={x}>
                        <circle cx={x} cy={y} r="5" fill="#52a8ff" />
                        <circle
                          cx={x}
                          cy={y}
                          r="13"
                          fill="none"
                          stroke="#52a8ff44"
                        />
                        <text
                          x={x - 12}
                          y={y - 22}
                          fill="#8f8f8f"
                          fontSize="8"
                          fontFamily="monospace"
                        >
                          0{i + 1}
                        </text>
                      </g>
                    ))}
                    <text
                      x="35"
                      y="200"
                      fill="#6e6e6e"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      00:00
                    </text>
                    <text
                      x="525"
                      y="200"
                      fill="#6e6e6e"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      32:00
                    </text>
                  </svg>
                </>
              )}
            </div>
            <h3>
              {e.name}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </h3>
            <p>{e.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
export function BackToWork() {
  return (
    <Link href="/work" className="line-link">
      ← All projects
    </Link>
  );
}

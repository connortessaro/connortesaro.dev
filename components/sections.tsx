import Link from 'next/link';
import Image from 'next/image';
import { experiments } from '@/content/projects';
import s from './home.module.css';

export function Experience() {
  return (
    <section className={s.experience} aria-labelledby="experience-heading">
      <div className="shell">
        <div className={s.experienceHeading} data-reveal="">
          <h2 id="experience-heading" className="eyebrow muted">
            02 — Alongside the independent work
          </h2>
          <p>Real teams. Real systems. A few contributions.</p>
        </div>
        <div className={`${s.experienceRow} spotlight`} data-reveal="">
          <div className={s.company}>
            Chewy<span>JUN — DEC 2026 · CO-OP</span>
          </div>
          <div>
            <h3>Software Engineer Co-op</h3>
            <p>
              Working on labor and capacity planning: Snowflake pipelines, AWS
              infrastructure, and the interfaces that bring forecasts to
              fulfillment-center teams.
            </p>
          </div>
          <div>
            <div className={s.metric}>
              60 <small>→</small> 10 <small>min</small>
            </div>
            <p className={s.metricCaption}>Labor-planning pipeline runtime</p>
          </div>
        </div>
        <div className={`${s.experienceRow} spotlight`} data-reveal="">
          <div className={s.company}>
            Prisma<span>MAR 2026 · OPEN SOURCE</span>
          </div>
          <div>
            <h3>Small changes, upstream.</h3>
            <p>
              Fixed millisecond DateTime handling in the SQLite driver adapter
              with regression coverage, and improved distinct-field
              documentation.
            </p>
          </div>
          <div className={s.prLinks}>
            <a
              href="https://github.com/prisma/orm/pull/29274"
              target="_blank"
              rel="noreferrer"
            >
              #29274 · DateTime fix <span aria-hidden="true">↗</span>
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
      <div className={s.experimentHeading} data-reveal="">
        <div>
          <span className="eyebrow muted">
            04 — Following a different thread
          </span>
          <h2 id="experiments-heading">A little off the main path.</h2>
        </div>
        <p>Games, music, and things worth understanding.</p>
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

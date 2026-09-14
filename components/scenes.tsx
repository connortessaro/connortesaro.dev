'use client';
import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project, ProjectSlug } from '@/content/projects';
import { AnimatedBeam } from '@/components/animated-beam';
import { TechPill } from '@/components/tech';
gsap.registerPlugin(useGSAP, ScrollTrigger);

function RingiScene() {
  return (
    <div className="ringi-art">
      <div className="ringi-thread thread-one">
        <span className="avatar red">P</span>
        <div>
          <b>Product</b>
          <p>Can we ship the whole release Friday?</p>
        </div>
        <span className="thread-time">09:41</span>
      </div>
      <div className="ringi-thread thread-two">
        <span className="avatar blue">E</span>
        <div>
          <b>Engineering</b>
          <p>Web is ready. Mobile needs another week.</p>
        </div>
        <span className="thread-time">09:43</span>
      </div>
      <div className="ringi-thread thread-three">
        <span className="avatar green">D</span>
        <div>
          <b>Design</b>
          <p>Let’s keep the mobile experience complete.</p>
        </div>
        <span className="thread-time">09:46</span>
      </div>
      <div className="ringi-brief">
        <div className="brief-heading">
          <span>稟議書</span>
          <span>DECISION DOCUMENT / 001</span>
        </div>
        <h4>
          The release.
          <br />A way forward.
        </h4>
        <div className="brief-rule" />
        <span className="brief-label">THE CRUX</span>
        <p>
          The deadline is shared.
          <br />
          Readiness isn’t.
        </p>
        <div className="brief-resolution">
          <span className="brief-label">RECOMMENDATION</span>
          <p>
            Web on Friday.
            <br />
            Mobile next week, complete.
          </p>
        </div>
        <div className="stamp-row">
          <span className="stamp">
            PRODUCT
            <br />✓
          </span>
          <span className="stamp">
            ENG
            <br />✓
          </span>
          <span className="stamp">
            DESIGN
            <br />✓
          </span>
        </div>
        <div className="brief-footer">
          <span>Ringi 稟議</span>
          <span>Three perspectives. One decision.</span>
        </div>
      </div>
      <span className="art-tag">POSITIONS GATHERED · CRUX STATED</span>
    </div>
  );
}
function PhantomScene({ disconnected }: { disconnected: boolean }) {
  const pathRow = useRef<HTMLDivElement>(null);
  const keyNode = useRef<HTMLSpanElement>(null);
  const routeNode = useRef<HTMLSpanElement>(null);
  const modelNode = useRef<HTMLSpanElement>(null);
  return (
    <div className="phantom-art">
      <div className="phantom-terminal">
        <div className="terminal-top">
          <span>
            <i />
            <i />
            <i />
          </span>
          <b>phantom / request inspector</b>
          <span className="terminal-status">● GATEWAY</span>
        </div>
        <div className="terminal-body">
          <span className="code-comment">{'// One familiar interface.'}</span>
          <p>
            <span className="code-blue">POST</span> /v1/chat/completions
          </p>
          <div className="code-lines">
            <p>{'{'}</p>
            <p>
              &nbsp; <span>&quot;model&quot;</span>:{' '}
              <em>&quot;example-model&quot;</em>,
            </p>
            <p>
              &nbsp; <span>&quot;stream&quot;</span>: <em>true</em>
            </p>
            <p>{'}'}</p>
          </div>
          <div className="request-path" ref={pathRow}>
            <span ref={keyNode}>KEY</span>
            <span ref={routeNode}>ROUTE</span>
            <span ref={modelNode}>MODEL</span>
            <AnimatedBeam
              containerRef={pathRow}
              fromRef={keyNode}
              toRef={routeNode}
              curvature={14}
            />
            <AnimatedBeam
              containerRef={pathRow}
              fromRef={routeNode}
              toRef={modelNode}
              curvature={-14}
              delay={0.7}
            />
          </div>
          <div className="stream-output">
            <span className="code-comment">
              {'// '}
              {disconnected
                ? 'Client disconnects mid-stream.'
                : 'The response arrives, token by token.'}
            </span>
            <p>
              Usage accrues while the
              <br />
              stream is still open.<span className="terminal-caret">▌</span>
            </p>
            <div className="signal-bars">
              {Array.from({ length: 42 }, (_, i) => (
                <i
                  key={i}
                  style={
                    {
                      height: `${9 + ((i * 17 + 13) % 31)}px`,
                      '--bar': i,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="terminal-bottom">
          <span>stream: {disconnected ? 'interrupted' : 'complete'}</span>
          <span>
            usage: {disconnected ? 'estimated on abort' : 'upstream-reported'}
          </span>
        </div>
      </div>
      <div className="usage-card">
        <span className="eyebrow">SETTLEMENT RECEIPT</span>
        <b>
          {disconnected
            ? 'Account for the interruption.'
            : 'Every token, accounted for.'}
        </b>
        <div>
          <span>Prompt + completion</span>
          <span>{disconnected ? 'Estimate fallback' : 'Reported usage'}</span>
        </div>
        <div>
          <span>Billing unit</span>
          <span>Integer micro-USD</span>
        </div>
        <footer>
          ✓ {disconnected ? 'Disconnect path settled' : 'Request settled'}
        </footer>
      </div>
    </div>
  );
}
function KizukiScene() {
  return (
    <div className="kizuki-art">
      <div className="evidence-card">
        <div className="evidence-top">
          <span>↳ SOURCE RECEIPT</span>
          <span>01</span>
        </div>
        <b>Release standup</b>
        <p>“The mobile release moves to next Friday. Web stays on schedule.”</p>
        <footer>Meeting transcript · Example workspace</footer>
      </div>
      <div className="vault-card">
        <div className="vault-top">
          <span>気づき / KIZUKI</span>
          <span>LOCAL VAULT</span>
        </div>
        <div className="vault-file">projects / release.md</div>
        <h4>Before you send.</h4>
        <p className="draft-label">YOUR DRAFT</p>
        <p className="draft-text">
          “Everything is on track
          <br />
          to ship this Friday.”
        </p>
        <div className="conflict-note">
          <span>↗</span>
          <div>
            <b>One thing doesn’t line up.</b>
            <p>Mobile moved. Your source says next Friday.</p>
          </div>
        </div>
        <div className="corrected-note">
          <span className="brief-label">WITH THE EVIDENCE IN VIEW</span>
          <p>Web ships Friday. Mobile follows next week.</p>
        </div>
        <div className="vault-footer">
          <span>Source attached</span>
          <span>You decide what to send ↗</span>
        </div>
      </div>
      <div className="source-connector" />
      <span className="art-tag">EVERY CLAIM CARRIES ITS SOURCE</span>
    </div>
  );
}
export function ProjectArt({
  slug,
  step = 2,
  disconnected = false,
}: {
  slug: ProjectSlug;
  step?: number;
  disconnected?: boolean;
}) {
  return (
    <div
      className={`project-art art-${slug}`}
      data-step={step}
      aria-hidden="true"
    >
      {slug === 'ringi' ? (
        <RingiScene />
      ) : slug === 'phantom' ? (
        <PhantomScene disconnected={disconnected} />
      ) : (
        <KizukiScene />
      )}
    </div>
  );
}
export function ProjectChapter({
  project,
  standalone = false,
}: {
  project: Project;
  standalone?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [disconnected, setDisconnected] = useState(false);
  const [manual, setManual] = useState(false);
  // Set synchronously on interaction. The scroll trigger stays live until React
  // commits `manual` and the effect tears it down, and an update landing in that
  // window would otherwise overwrite the step the visitor just chose.
  const manualRef = useRef(false);
  const takeControl = useCallback(() => {
    manualRef.current = true;
    setManual(true);
  }, []);
  useGSAP(
    () => {
      if (standalone || manual) return;
      const media = gsap.matchMedia();
      media.add(
        '(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)',
        () => {
          ScrollTrigger.create({
            trigger: root.current,
            start: 'top 22%',
            end: 'bottom 85%',
            onUpdate: (self) => {
              if (manualRef.current) return;
              setStep(Math.min(2, Math.floor(self.progress * 3)));
            },
          });
          gsap.fromTo(
            '.project-art',
            { y: 35 },
            {
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [standalone, manual], revertOnUpdate: true },
  );
  return (
    <section
      ref={root}
      className={`project-chapter ${standalone ? 'standalone' : ''}`}
      id={standalone ? 'demo' : project.slug}
      style={{ '--accent': project.accent } as React.CSSProperties}
      aria-label={`${project.name} ${standalone ? 'interactive demonstration' : 'showcase'}`}
    >
      <div className="chapter-sticky">
        <div className="chapter-copy">
          <div className="chapter-kicker">
            <span className="eyebrow">
              {project.number} / {project.category}
            </span>
            <span className="chapter-status">{project.status}</span>
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
          <p className="chapter-summary">{project.summary}</p>
          <div className="chapter-tags">
            {project.stack.slice(0, 3).map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </div>
          {!standalone && (
            <Link href={`/work/${project.slug}`} className="line-link">
              Read the case study{' '}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          )}
          <div className="chapter-controls">
            <div
              className="step-buttons"
              role="group"
              aria-label={`${project.name} demonstration steps`}
            >
              {project.steps.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={step === index}
                  onClick={() => {
                    takeControl();
                    setStep(index);
                  }}
                >
                  <span>0{index + 1}</span> {label}
                </button>
              ))}
            </div>
            <p className="step-caption" aria-live={manual ? 'polite' : 'off'}>
              {project.slug === 'phantom' && step === 2
                ? disconnected
                  ? 'Client disconnected. Missing final usage is estimated, and the request is settled in integer micro-USD.'
                  : 'Stream complete. The request is settled using upstream-reported usage in integer micro-USD.'
                : project.captions[step]}
            </p>
            <button
              className="replay"
              type="button"
              onClick={() => {
                takeControl();
                setStep(0);
                setDisconnected(false);
              }}
            >
              ↺ Reset demo
            </button>
          </div>
        </div>
        <figure className="chapter-figure">
          <ProjectArt
            slug={project.slug}
            step={step}
            disconnected={disconnected}
          />
          <figcaption>
            <span>INTERACTIVE DEMONSTRATION · SYNTHETIC DATA</span>
            {project.slug === 'phantom' ? (
              <button
                type="button"
                aria-pressed={disconnected}
                className="scenario-toggle"
                onClick={() => {
                  takeControl();
                  setDisconnected((v) => !v);
                  setStep(2);
                }}
              >
                {disconnected
                  ? '↺ Show normal completion'
                  : '↳ Simulate disconnect'}
              </button>
            ) : (
              <span>{step + 1} / 3</span>
            )}
          </figcaption>
        </figure>
      </div>
      <noscript>
        <p>Demonstration overview: {project.captions.join(' ')}</p>
      </noscript>
    </section>
  );
}

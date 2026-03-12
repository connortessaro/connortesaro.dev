'use client'

import { motion } from 'motion/react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Spotlight } from '@/components/ui/spotlight'
import {
  ADDITIONAL_PROJECTS,
  EMAIL,
  FEATURED_PROJECTS,
  GITHUB_URL,
  PRINCIPLES,
  RESUME_PATH,
  SNAPSHOT_ITEMS,
  STRENGTHS,
} from './data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35 },
  },
}

function ExternalLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 transition-colors duration-200 hover:text-emerald-950"
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function HomePage() {
  return (
    <motion.main
      id="content"
      className="space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        id="home"
        variants={sectionVariants}
        className="grid scroll-mt-24 gap-6 lg:grid-cols-[minmax(0,1.2fr)_340px]"
      >
        <div className="rounded-[2rem] border border-black/8 bg-white px-6 py-7 shadow-[0_18px_60px_rgba(18,24,22,0.08)] sm:px-8 sm:py-9">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Full-stack systems. Automation workflows. Product-minded engineering.
          </p>
          <h1 className="max-w-[12ch] text-[clamp(2.8rem,7vw,5.9rem)] leading-[0.94] font-semibold tracking-[-0.08em] text-zinc-950">
            Connor Tessaro builds production-minded software across full-stack apps, automation systems, and revenue-linked products.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            I build software that has to work in the real world: clear interfaces, durable backend workflows, measurable operations,
            and enough engineering rigor to keep the system understandable after launch.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-800"
            >
              View Projects
            </a>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/8 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition-colors duration-200 hover:bg-zinc-100"
            >
              Download Resume
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-600">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-zinc-950">
              GitHub
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-zinc-950">
              Email
            </a>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-emerald-200/70 bg-[linear-gradient(180deg,rgba(235,248,242,0.92),rgba(255,255,255,0.96))] p-4 shadow-[0_18px_60px_rgba(18,24,22,0.05)]">
          <div className="rounded-[1.5rem] border border-black/6 bg-white/90 p-5">
            <p className="text-sm font-medium text-zinc-500">Engineering snapshot</p>
            <div className="mt-5 space-y-4">
              {SNAPSHOT_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-black/6 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-black/6 bg-zinc-950 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Current focus</p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                Building product systems that combine clear UX, operational workflows, and strong implementation guardrails.
              </p>
            </div>
          </div>
        </aside>
      </motion.section>

      <motion.section variants={sectionVariants} className="scroll-mt-24" id="strengths">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">What I’m best at</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
            I work best on systems that connect product decisions to real operational behavior.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {STRENGTHS.map((strength) => (
            <article
              key={strength.title}
              className="rounded-[1.6rem] border border-black/6 bg-white p-5 shadow-[0_12px_36px_rgba(18,24,22,0.05)]"
            >
              <h3 className="text-lg font-semibold tracking-[-0.04em] text-zinc-950">
                {strength.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{strength.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="work" variants={sectionVariants} className="scroll-mt-24">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Featured work</p>
          <h2 className="mt-3 max-w-4xl text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
            Selected projects that show how I build across frontend, backend, and operations.
          </h2>
        </div>

        <div className="space-y-5">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.name}
              className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-white p-5 shadow-[0_18px_60px_rgba(18,24,22,0.06)]"
            >
              <Spotlight
                className="from-emerald-200 via-emerald-100 to-white opacity-60"
                size={320}
              />
              <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.9fr)]">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">Featured</span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">{project.status}</span>
                    <span className="rounded-full border border-black/8 px-3 py-1 text-zinc-500">Case study</span>
                  </div>

                  <div>
                    <h3 className="text-[clamp(1.45rem,3vw,2.2rem)] font-semibold tracking-[-0.05em] text-zinc-950">
                      {project.name}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
                      {project.tagline}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2 text-sm text-zinc-600">
                    {project.stack.map((tag) => (
                      <li key={tag} className="rounded-full bg-zinc-100 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-black/6 bg-zinc-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">What I built</p>
                      <p className="mt-3 text-sm leading-7 text-zinc-700">{project.built}</p>
                    </div>
                    <div className="rounded-[1.35rem] border border-black/6 bg-zinc-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Why it matters</p>
                      <p className="mt-3 text-sm leading-7 text-zinc-700">{project.mattered}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.primaryLink ? (
                      <ExternalLink href={project.primaryLink.href} label={project.primaryLink.label} />
                    ) : null}
                    {project.secondaryLink ? (
                      <ExternalLink href={project.secondaryLink.href} label={project.secondaryLink.label} />
                    ) : null}
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(236,248,243,0.96),rgba(255,255,255,0.98))] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    {project.artifactTitle}
                  </p>
                  <div className="mt-4 overflow-hidden rounded-[1.3rem] border border-black/8 bg-zinc-950 text-sm text-zinc-100">
                    <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-zinc-400">
                      artifact
                    </div>
                    <pre className="overflow-x-auto px-4 py-4 font-[family-name:var(--font-geist-mono)] leading-6 text-zinc-200">
                      <code>{project.artifactLines.join('\n')}</code>
                    </pre>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{project.artifactNote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">More projects</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.06em]">
            Additional work that adds breadth across ecommerce, developer tools, and analysis systems.
          </h2>
        </div>

        <AnimatedBackground
          enableHover
          className="rounded-[1.5rem] bg-emerald-50/90"
          transition={{ type: 'spring', duration: 0.25, bounce: 0 }}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ADDITIONAL_PROJECTS.map((project) => (
              <article
                key={project.name}
                data-id={project.name}
                className="rounded-[1.5rem] border border-black/8 bg-white p-5 shadow-[0_10px_30px_rgba(18,24,22,0.04)]"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.04em] text-zinc-950">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{project.description}</p>
                <div className="mt-5">
                  <ExternalLink href={project.href} label={project.linkLabel} />
                </div>
              </article>
            ))}
          </div>
        </AnimatedBackground>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">How I think</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.06em]">
            The engineering habits I bring to product work.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[1.6rem] border border-black/6 bg-zinc-950 p-5 text-zinc-100 shadow-[0_18px_48px_rgba(18,24,22,0.12)]"
            >
              <h3 className="text-lg font-semibold tracking-[-0.04em]">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{principle.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="about"
        variants={sectionVariants}
        className="grid scroll-mt-24 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
      >
        <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_12px_36px_rgba(18,24,22,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">About</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.9rem)] leading-[1.04] font-semibold tracking-[-0.06em]">
            I’m a builder who likes software that connects interfaces, systems, and execution.
          </h2>
        </div>
        <div className="rounded-[2rem] border border-black/8 bg-white p-6 text-sm leading-8 text-zinc-600 shadow-[0_12px_36px_rgba(18,24,22,0.05)] sm:text-base">
          <p>
            I’m a computer science student at Northeastern University with a strong interest in software systems, product engineering,
            and the operational side of how software gets used in practice.
          </p>
          <p className="mt-4">
            A lot of my best work sits in the space between product and infrastructure: ecommerce systems, workflow automation, and internal tooling
            that needs to be understandable, testable, and usable by real people.
          </p>
          <p className="mt-4">
            I’m especially interested in SWE roles where I can own features end to end, work across the stack, and help shape both implementation quality and product behavior.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="resume"
        variants={sectionVariants}
        className="grid scroll-mt-24 gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.8fr)]"
      >
        <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_12px_36px_rgba(18,24,22,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Resume</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.9rem)] leading-[1.04] font-semibold tracking-[-0.06em]">
            A concise technical snapshot for recruiters and hiring managers.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Download the current PDF for experience, education, and contact details.
          </p>
          <div className="mt-6">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-800"
            >
              Open Resume PDF
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(236,248,243,0.96),rgba(255,255,255,0.98))] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">Highlights</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-700">
            <li>Northeastern University, B.S. in Computer Science</li>
            <li>Interested in SWE internships, new grad, and product engineering roles</li>
            <li>Experience across product systems, automation, and developer tooling</li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        variants={sectionVariants}
        className="scroll-mt-24 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(18,24,22,0.06)]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Contact</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.8rem,3vw,2.9rem)] leading-[1.04] font-semibold tracking-[-0.06em]">
          If you’re hiring for SWE roles, I’d be glad to talk.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          I’m most interested in product engineering, full-stack software, and systems-oriented roles where I can build and ship real software.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full border border-black/8 bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-800"
          >
            {EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-black/8 bg-white px-4 py-3 text-sm font-medium text-zinc-950 transition-colors duration-200 hover:bg-zinc-100"
          >
            github.com/connortessaro
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 transition-colors duration-200 hover:bg-emerald-100"
          >
            Resume PDF
          </a>
        </div>
      </motion.section>
    </motion.main>
  )
}

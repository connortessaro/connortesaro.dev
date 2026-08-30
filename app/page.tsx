'use client'

import { motion } from 'motion/react'
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
      staggerChildren: 0.06,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.28 },
  },
}

function ExternalLink({ href, label }: { href: string; label: string }) {
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
      className="space-y-16 pb-8 md:space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        id="home"
        variants={sectionVariants}
        className="grid scroll-mt-24 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]"
      >
        <div className="rounded-3xl border border-zinc-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(10,14,12,0.06)] sm:px-8 sm:py-9">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Full-stack systems. Automation workflows. Product-minded engineering.
          </p>
          <h1 className="max-w-[14ch] font-[family-name:var(--font-heading)] text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.96] tracking-[-0.06em] text-zinc-950">
            Connor Tessaro builds production-minded software across full-stack apps, automation systems, and revenue-linked products.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600">
            I build software that has to work in real operations: clear interfaces, durable backend workflows, measurable execution, and maintainable systems.
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
              className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition-colors duration-200 hover:bg-zinc-100"
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

        <aside className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_16px_40px_rgba(10,14,12,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Snapshot</p>
          <div className="mt-4 space-y-3">
            {SNAPSHOT_ITEMS.map((item) => (
              <div key={item.label} className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-800">Current focus</p>
            <p className="mt-1 text-sm text-emerald-900">
              Product systems that combine usable UX, workflow reliability, and implementation guardrails.
            </p>
          </div>
        </aside>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">What I’m best at</p>
          <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.7rem,3.5vw,2.9rem)] leading-[1.05] tracking-[-0.05em]">
            I work best on systems that connect product decisions to real operational behavior.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {STRENGTHS.map((strength) => (
            <article key={strength.title} className="rounded-2xl border border-zinc-200 bg-white p-5">
              <h3 className="font-[family-name:var(--font-heading)] text-lg tracking-[-0.03em] text-zinc-950">
                {strength.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{strength.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="work" variants={sectionVariants} className="scroll-mt-24">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Featured work</p>
          <h2 className="mt-2 max-w-4xl font-[family-name:var(--font-heading)] text-[clamp(1.7rem,3.5vw,2.9rem)] leading-[1.05] tracking-[-0.05em]">
            Selected projects that show how I build across frontend, backend, and operations.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((project) => (
            <article key={project.name} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_28px_rgba(10,14,12,0.04)]">
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">Featured</span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">{project.status}</span>
                <span className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-500">Case study</span>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-[1.45rem] leading-tight tracking-[-0.04em] text-zinc-950">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{project.tagline}</p>

              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                {project.stack.map((tag) => (
                  <li key={tag} className="rounded-full bg-zinc-100 px-3 py-1">
                    {tag}
                  </li>
                ))}
              </ul>

              <details className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                <summary className="cursor-pointer text-sm font-medium text-zinc-900">
                  Expand technical details
                </summary>
                <div className="mt-3 grid gap-3 text-sm leading-7 text-zinc-700">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">What I built</p>
                    <p>{project.built}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Why it matters</p>
                    <p>{project.mattered}</p>
                  </div>
                </div>
              </details>

              <div className="mt-4 flex flex-wrap gap-4">
                {project.primaryLink ? <ExternalLink href={project.primaryLink.href} label={project.primaryLink.label} /> : null}
                {project.secondaryLink ? <ExternalLink href={project.secondaryLink.href} label={project.secondaryLink.label} /> : null}
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">More projects</p>
          <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] tracking-[-0.04em]">
            Additional work across ecommerce, developer tools, and analysis systems.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ADDITIONAL_PROJECTS.map((project) => (
            <article key={project.name} className="rounded-2xl border border-zinc-200 bg-white p-5">
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-700">
                {project.status}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg tracking-[-0.03em] text-zinc-950">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{project.description}</p>
              <div className="mt-4">
                <ExternalLink href={project.href} label={project.linkLabel} />
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">How I think</p>
          <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] tracking-[-0.04em]">
            The engineering habits I bring to product work.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article key={principle.title} className="rounded-2xl border border-zinc-200 bg-zinc-950 p-5 text-zinc-100">
              <h3 className="font-[family-name:var(--font-heading)] text-lg tracking-[-0.03em]">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-300">{principle.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="about" variants={sectionVariants} className="grid scroll-mt-24 gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 lg:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">About</p>
          <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-heading)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] tracking-[-0.04em]">
            I’m a builder who likes software that connects interfaces, systems, and execution.
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-600 sm:text-base">
            <p>
              I’m a computer science student at Northeastern University with a strong interest in software systems, product engineering, and the operational side of how software gets used in practice.
            </p>
            <p>
              My best work sits between product and infrastructure: ecommerce systems, workflow automation, and internal tooling that needs to be understandable, testable, and usable by real teams.
            </p>
          </div>
        </article>

        <article id="resume" className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">Resume</p>
          <p className="mt-2 text-sm leading-7 text-emerald-900">
            Current PDF with experience, education, and contact details.
          </p>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-800"
          >
            Open Resume PDF
          </a>
        </article>
      </motion.section>

      <motion.section
        id="contact"
        variants={sectionVariants}
        className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(10,14,12,0.04)]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Contact</p>
        <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] tracking-[-0.04em]">
          If you’re hiring for SWE roles, I’d be glad to talk.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
          I’m focused on product engineering, full-stack systems, and workflow-oriented software roles.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full border border-zinc-200 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-800"
          >
            {EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors duration-200 hover:bg-zinc-100"
          >
            github.com/connortessaro
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 transition-colors duration-200 hover:bg-emerald-100"
          >
            Resume PDF
          </a>
        </div>
      </motion.section>
    </motion.main>
  )
}

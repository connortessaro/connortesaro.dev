export type NavItem = {
  label: string
  href: string
}

export type SnapshotItem = {
  label: string
  value: string
}

export type StrengthItem = {
  title: string
  description: string
}

export type FeaturedProject = {
  name: string
  status: 'Private repo' | 'Public code'
  tagline: string
  stack: string[]
  built: string
  mattered: string
  primaryLink?: {
    label: string
    href: string
  }
  secondaryLink?: {
    label: string
    href: string
  }
  artifactTitle: string
  artifactLines: string[]
  artifactNote: string
}

export type AdditionalProject = {
  name: string
  status: 'Private repo' | 'Public code'
  description: string
  href: string
  linkLabel: string
}

export type Principle = {
  title: string
  description: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export const SNAPSHOT_ITEMS: SnapshotItem[] = [
  { label: 'Location', value: 'Boston, MA' },
  { label: 'Education', value: 'Computer Science student' },
  { label: 'Current', value: 'Currently at Chewy' },
  { label: 'Core languages', value: 'TypeScript / Python / Java' },
]

export const STRENGTHS: StrengthItem[] = [
  {
    title: 'Full-stack product engineering',
    description:
      'I ship interfaces with enough backend structure behind them to support payments, state changes, and long-term maintenance.',
  },
  {
    title: 'Workflow and automation systems',
    description:
      'I like building governed flows for approvals, content generation, sourcing, and daily execution instead of one-off scripts.',
  },
  {
    title: 'Production-minded tooling',
    description:
      'I care about observability, test coverage, repeatable commands, and making operator-facing systems harder to misuse.',
  },
]

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: 'Tidypilot Store',
    status: 'Private repo',
    tagline:
      'Built a multi-product storefront with Stripe checkout, fulfillment routing, product catalog controls, and conversion-focused UI.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
    built:
      'A production-style ecommerce system with three products, server-resolved checkout pricing, webhook handling, manual CJ fulfillment tooling, and operational guardrails around catalog and paid media workflows.',
    mattered:
      'This project shows that I can own the full loop: interface quality, payment integrity, product data, fulfillment logic, and the scripts that keep a storefront usable after launch.',
    primaryLink: {
      label: 'Live site',
      href: 'https://tidypilot.store',
    },
    artifactTitle: 'Server-side checkout integrity',
    artifactLines: [
      '{',
      '  "productSlug": "washable-hair-collector-roller",',
      '  "quantity": 2,',
      '  "canonicalPrice": 999,',
      '  "resolvedBy": "server-side catalog",',
      '  "fulfillmentMode": "manual CJ"',
      '}',
    ],
    artifactNote:
      'Client-provided names and prices are ignored. Stripe line items resolve from the server catalog.',
  },
  {
    name: 'Resume Review Engine',
    status: 'Public code',
    tagline:
      'Built an AI-assisted resume review app with rewrite generation, explanation flows, and evaluation-aware UX.',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind', 'Hugging Face API'],
    built:
      'A resume analysis tool that rewrites content, explains the reasoning behind edits, preserves comparison context, and supports iterative improvement rather than one-click replacement.',
    mattered:
      'It demonstrates product judgment around AI UX: separating generation from explanation, keeping outputs interpretable, and making the interface useful for real revision work.',
    primaryLink: {
      label: 'GitHub',
      href: 'https://github.com/connortessaro/resume-review-engine',
    },
    artifactTitle: 'Rewrite + explanation flow',
    artifactLines: [
      'Original',
      'Built dashboards and helped with reports.',
      '',
      'Rewritten',
      'Built reporting dashboards and clarified',
      'decision-support workflows for stakeholders.',
    ],
    artifactNote:
      'Generation and explanation are separated so users can understand why the output changed.',
  },
  {
    name: 'Experiment Factory',
    status: 'Private repo',
    tagline:
      'Built a deterministic TypeScript CLI that turns structured product inputs into repeatable testing assets and machine-readable output contracts.',
    stack: ['TypeScript', 'Node.js', 'CSV pipelines', 'JSON contracts', 'CLI tooling'],
    built:
      'A local CLI that takes product CSV inputs and generates consistent landing-page copy, ad variants, UGC scripts, manifests, and schema-safe outputs per angle.',
    mattered:
      'This work reflects how I think about tooling: deterministic outputs, clear contracts, and pipelines that can be reused instead of reworked every time a new test starts.',
    artifactTitle: 'Output contract',
    artifactLines: [
      'experiments/',
      '  product-slug/',
      '    manifest.json',
      '    angle-1/landing.json',
      '    angle-1/ads.json',
      '    angle-1/ugc.json',
    ],
    artifactNote:
      'The pipeline is designed around repeatable generation and validation, not ad hoc content dumping.',
  },
  {
    name: 'B2B Appointment Workflow',
    status: 'Private repo',
    tagline:
      'Built workflow automation for outreach, approvals, execution queues, and operational reporting with strong process guardrails.',
    stack: ['Python', 'Local automation', 'CSV workflows', 'Obsidian', 'Operations tooling'],
    built:
      'A local-first system for sourcing, QA, draft generation, reply handling, and sprint execution with readiness checks, sender enforcement, and controlled lifecycle transitions.',
    mattered:
      'It shows backend-heavy process design: not just generating data, but creating approval gates, operational safety checks, and repeatable daily flows that people can actually run.',
    artifactTitle: 'Daily execution path',
    artifactLines: [
      '1. source and rank agencies',
      '2. run quality and guardrail checks',
      '3. build approved draft packets',
      '4. execute daily send quota',
      '5. triage replies safely',
    ],
    artifactNote:
      'The system is designed to be operationally safe before it is designed to be fast.',
  },
]

export const ADDITIONAL_PROJECTS: AdditionalProject[] = [
  {
    name: 'Posture Store',
    status: 'Private repo',
    description:
      'One-product ecommerce storefront with Stripe checkout, manual fulfillment tooling, and economics-first guardrails.',
    href: 'https://github.com/connortessaro/posture-store',
    linkLabel: 'Repository',
  },
  {
    name: 'logging-utility',
    status: 'Public code',
    description:
      'Python logging utility with structured JSON output, runtime metadata capture, disk persistence, and full pytest coverage.',
    href: 'https://github.com/connortessaro/logging-utility',
    linkLabel: 'GitHub',
  },
  {
    name: 'leagueiq',
    status: 'Public code',
    description:
      'Rules-based post-game match impact analysis using Riot match and timeline data to produce explainable outputs.',
    href: 'https://github.com/connortessaro/leagueiq',
    linkLabel: 'GitHub',
  },
  {
    name: 'vscode-todo-parser',
    status: 'Public code',
    description:
      'Maintained and extended a VS Code extension for parsing TODOs across projects, including test coverage improvements.',
    href: 'https://github.com/connortessaro/vscode-todo-parser',
    linkLabel: 'GitHub',
  },
]

export const PRINCIPLES: Principle[] = [
  {
    title: 'Build for real use, not demos',
    description:
      'I want software to support a workflow that someone can rely on, not just look convincing in a screenshot.',
  },
  {
    title: 'Keep systems observable and testable',
    description:
      'I like clear commands, explicit state transitions, and enough verification that a system can survive iteration.',
  },
  {
    title: 'Care about product clarity',
    description:
      'Code quality matters, but so does whether a user or operator immediately understands what the software is doing.',
  },
]

export const EMAIL = 'tessaro.c@northeastern.edu'
export const GITHUB_URL = 'https://github.com/connortessaro'
export const RESUME_PATH = '/Connor-Tessaro-Resume.pdf'

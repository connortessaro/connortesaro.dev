export type ProjectSlug = 'ringi' | 'phantom' | 'kizuki';
export type Project = {
  slug: ProjectSlug;
  number: string;
  name: string;
  category: string;
  /** One-line predicate for the ruled index under the masthead. Keep it under
      42 characters; `headline` is a sentence and `summary` is a paragraph, and
      truncating either is fragile. */
  discipline: string;
  headline: string;
  summary: string;
  contribution: string;
  status: string;
  stack: string[];
  accent: string;
  link: string;
  source?: string;
  steps: [string, string, string];
  captions: [string, string, string];
};
export const projects: Project[] = [
  {
    slug: 'ringi',
    discipline: 'Decision capture in Slack',
    number: '01',
    name: 'Ringi',
    category: 'AI × collaboration',
    headline:
      'A thread records what a team said. It does not record what the team decided.',
    summary:
      'Ringi operates as a structured decision instrument inside Slack. On session initiation, the platform messages each stakeholder independently, capturing their position and the constraints underneath it before anyone sees another participant’s answer, then synthesizes those responses into a brief that names the crux, presents the options, and returns a recommendation to the people the decision affects.',
    contribution:
      'I designed the product and built the typed conversation state machine, the multi-workspace Slack OAuth installation, the PostgreSQL persistence layer through Drizzle, and the Langfuse instrumentation covering model cost, latency, and output quality.',
    status: 'Early access',
    accent: '#ff5f7e',
    stack: ['TypeScript', 'Slack Bolt', 'PostgreSQL', 'Drizzle', 'Langfuse'],
    link: 'https://ringi.dev',
    steps: ['Gather', 'Synthesize', 'Resolve'],
    captions: [
      'Each stakeholder receives a direct message and answers without visibility into the other responses, which captures the constraint underneath a position rather than a reaction to whoever answered first.',
      'The synthesis pass separates the disagreement from the discussion surrounding it and states the crux as a single contested question with its options attached.',
      'The brief returns to the affected participants for explicit agreement. An objection opens a revision round rather than a new thread, and the decision record retains who agreed and what remained contested.',
    ],
  },
  {
    slug: 'phantom',
    discipline: 'Inference accounting and settlement',
    number: '02',
    name: 'Phantom',
    category: 'AI × infrastructure',
    headline:
      'A streaming request can stop being visible to the client before the system has finished accounting for it.',
    summary:
      'Phantom operates as an OpenAI-compatible inference gateway with prepaid keys. The platform verifies the key and its available budget before routing a request through Vercel AI Gateway, captures usage while the response streams rather than after it completes, and settles every request in integer micro-USD against a PostgreSQL ledger — including requests the client abandons mid-stream.',
    contribution:
      'I built the gateway, the streaming usage capture and disconnect settlement path, the Stripe payment integration with webhook validation, the model catalog synchronization against the upstream contract, and the product interface.',
    status: 'Live product',
    accent: '#52a8ff',
    stack: [
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'Vercel AI Gateway',
      'Stripe',
    ],
    link: 'https://phantom.codes',
    steps: ['Route', 'Stream', 'Settle'],
    captions: [
      'The request arrives against the OpenAI-compatible contract that existing clients already target. The gateway authenticates the prepaid key and confirms available budget before any upstream call is made.',
      'Usage accounting stays attached to the stream while tokens are still arriving, because a response that terminates early will never produce a final usage report to reconcile against.',
      'A completed stream settles against upstream-reported usage. An abandoned stream settles against an estimate, explicitly flagged as such, so that a disconnect resolves to a defined accounting path instead of an unbilled request.',
    ],
  },
  {
    slug: 'kizuki',
    discipline: 'Context verification against sources',
    number: '03',
    name: 'Kizuki',
    category: 'AI × developer tools',
    headline:
      'Stored context is only useful for as long as it survives new evidence.',
    summary:
      'Kizuki operates as a local-first intelligence layer that organizes scattered work activity into a Markdown vault on the user’s own filesystem. The agent returns a structured payload and deterministic JavaScript applies the write, which keeps file mutation separate from model reasoning, preserves handwritten notes outside the managed section, and attaches a source receipt to every signal so any claim can be traced back to the meeting or update that supports it.',
    contribution:
      'I built the CLI, the deterministic vault-update path, the append-only JSONL source tracking, the MCP server integration, and the web dashboard.',
    status: 'Open source',
    accent: '#f5a623',
    stack: ['Node.js', 'MCP', 'Markdown', 'JSONL', 'Next.js'],
    link: 'https://kizuki.dev',
    source: 'https://github.com/connortessaro/kizuki',
    steps: ['Capture', 'Check', 'Reconcile'],
    captions: [
      'A proposed update arrives alongside the vault record the workspace already holds, so the draft is evaluated against existing evidence rather than in isolation.',
      'The comparison surfaces a specific contradiction rather than a general warning, and the signal carries the source receipt that produced it.',
      'The user revises with the evidence in view. Kizuki observes and advises; it does not transmit the update or commit the user to an external action.',
    ],
  },
];
export const site = {
  name: 'Connor Tessaro',
  url: 'https://connortessaro.dev',
  email: 'tessaro.c@northeastern.edu',
  github: 'https://github.com/connortessaro',
  linkedin: 'https://www.linkedin.com/in/connortessaro',
  description:
    'I am a software engineer and Northeastern computer science student building systems that reduce administrative overhead in team decision-making, inference accounting, and work context verification.',
};
export const experiments = [
  {
    name: 'LeagueIQ',
    label: 'Game data → better questions',
    description:
      'A match analysis tool that reads a League of Legends game through its decision points — objective contests, rotations, and participation across the timeline — rather than through the final scoreboard.',
    href: 'https://github.com/connortessaro/leagueiq',
    kind: 'timeline',
  },
  {
    name: 'A score for listening',
    label: 'Music → visual language',
    description:
      'A Python-generated listening map of Le1f’s “Wut”, rendering rhythm, texture, and structural repetition as a single visual score for a music course.',
    href: 'https://github.com/connortessaro/music-visualization',
    kind: 'score',
  },
];

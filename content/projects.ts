export type ProjectSlug = 'ringi' | 'phantom' | 'kizuki';
export type Project = {
  slug: ProjectSlug;
  number: string;
  name: string;
  category: string;
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
    number: '01',
    name: 'Ringi',
    category: 'AI × collaboration',
    headline: 'Good decisions start with being heard.',
    summary:
      'A Slack agent that gathers individual perspectives, finds the real disagreement, and brings a team to a decision.',
    contribution:
      'Product design, conversation state machine, Slack integration, and full-stack implementation.',
    status: 'Early access',
    accent: '#ff5f7e',
    stack: ['TypeScript', 'Slack Bolt', 'PostgreSQL', 'Drizzle', 'Langfuse'],
    link: 'https://ringi.dev',
    steps: ['Gather', 'Find the crux', 'Decide'],
    captions: [
      'Give each stakeholder room to say what they actually think.',
      'Separate the disagreement from the conversation around it.',
      'One brief. A clear recommendation. Everyone has a say.',
    ],
  },
  {
    slug: 'phantom',
    number: '02',
    name: 'Phantom',
    category: 'AI × infrastructure',
    headline: 'Every request has a story. And a cost.',
    summary:
      'An OpenAI-compatible inference gateway with prepaid keys, streaming-aware metering, and a deliberately transparent accounting model.',
    contribution:
      'Gateway implementation, streaming metering, payments, model catalog, and product interface.',
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
      'A familiar API, a prepaid key, and one place to route inference.',
      'Keep usage accounting connected to the life of the stream.',
      'A disconnect still needs an explicit settlement path.',
    ],
  },
  {
    slug: 'kizuki',
    number: '03',
    name: 'Kizuki',
    category: 'AI × developer tools',
    headline: 'Context is only useful if you can trust it.',
    summary:
      'A local-first intelligence layer that turns scattered work into source-backed context for you and your coding agents.',
    contribution:
      'CLI, deterministic vault updates, evidence tracking, MCP server, and web dashboard.',
    status: 'Open source',
    accent: '#f5a623',
    stack: ['Node.js', 'MCP', 'Markdown', 'JSONL', 'Next.js'],
    link: 'https://kizuki.dev',
    source: 'https://github.com/connortessaro/kizuki',
    steps: ['Capture', 'Check', 'Understand'],
    captions: [
      'Bring a proposed update alongside what the team already knows.',
      'Spot a contradiction and trace it to the original evidence.',
      'Revise the update with the source in view. You decide what to send.',
    ],
  },
];
export const site = {
  name: 'Connor Tessaro',
  url: 'https://connortesaro.dev',
  email: 'tessaro.c@northeastern.edu',
  github: 'https://github.com/connortessaro',
  linkedin: 'https://www.linkedin.com/in/connortessaro',
  description:
    'Connor Tessaro is a software engineer and Northeastern CS student building tools for team decisions, AI infrastructure, and source-backed work context.',
};
export const experiments = [
  {
    name: 'LeagueIQ',
    label: 'Game data → better questions',
    description:
      'Reading a League of Legends match through its decisions, not just the final scoreboard.',
    href: 'https://github.com/connortessaro/leagueiq',
    kind: 'timeline',
  },
  {
    name: 'A score for listening',
    label: 'Music → visual language',
    description:
      'A Python-generated listening map of rhythm, texture, and structure in Le1f’s “Wut”.',
    href: 'https://github.com/connortessaro/music-visualization',
    kind: 'score',
  },
];

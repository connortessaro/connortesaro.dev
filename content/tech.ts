import {
  siDrizzle,
  siJson,
  siMarkdown,
  siModelcontextprotocol,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siStripe,
  siTypescript,
  siVercel,
} from 'simple-icons';

/**
 * Stack label to its Simple Icons glyph. Marks are rendered monochrome, so only
 * the path is kept. Slack and Langfuse have no entry in the set, and a label
 * missing here renders as text rather than borrowing an unrelated mark.
 */
export const techIcons: Record<string, string> = {
  TypeScript: siTypescript.path,
  PostgreSQL: siPostgresql.path,
  Drizzle: siDrizzle.path,
  'Next.js': siNextdotjs.path,
  Stripe: siStripe.path,
  'Node.js': siNodedotjs.path,
  Markdown: siMarkdown.path,
  MCP: siModelcontextprotocol.path,
  JSONL: siJson.path,
  'Vercel AI Gateway': siVercel.path,
};

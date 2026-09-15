import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, site } from '@/content/projects';
import { ProjectChapter } from '@/components/scenes';
import { TechList } from '@/components/tech';
import Ringi from '@/content/ringi.mdx';
import Phantom from '@/content/phantom.mdx';
import Kizuki from '@/content/kizuki.mdx';
import s from './project.module.css';
const articles = { ringi: Ringi, phantom: Phantom, kizuki: Kizuki };
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.name} — Connor Tessaro`,
      description: p.summary,
      url: `${site.url}/work/${p.slug}`,
      images: [
        { url: `/work/${p.slug}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} — Connor Tessaro`,
      description: p.summary,
      images: [`/work/${p.slug}/opengraph-image`],
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const Article = articles[p.slug];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main
      id="main"
      className="shell"
      style={{ '--accent': p.accent } as React.CSSProperties}
    >
      <header className={s.hero}>
        <Link href="/work" className="eyebrow muted">
          ← Selected work
        </Link>
        <div className={s.titleRow}>
          <h1>{p.name}</h1>
          <span className="pill">{p.status}</span>
        </div>
        <p className={s.headline}>{p.headline}</p>
        <div className={`${s.details} spotlight`} data-reveal="">
          <div>
            <span>My contribution</span>
            <p>{p.contribution}</p>
          </div>
          <div>
            <span>Built with</span>
            <TechList labels={p.stack} />
          </div>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="line-link"
          >
            Visit {p.name} ↗
          </a>
        </div>
      </header>
      <ProjectChapter project={p} standalone />
      <div className={s.story}>
        <aside>
          <span className="eyebrow muted">Behind the build</span>
          <p>{p.discipline}</p>
          {p.source && (
            <a href={p.source} target="_blank" rel="noreferrer">
              Source on GitHub ↗
            </a>
          )}
        </aside>
        <article className={s.article}>
          <Article />
        </article>
      </div>
      <Link href={`/work/${next.slug}`} className={s.next}>
        <span className="eyebrow muted">Next project / {next.number}</span>
        <span>
          {next.name}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </span>
      </Link>
    </main>
  );
}

import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="shell not-found">
      <span className="eyebrow muted">404 · Route not found</span>
      <h1>
        404<span style={{ color: 'var(--accent)' }}>✳</span>
      </h1>
      <p>
        This route does not resolve to a page. The selected work is the more
        useful destination from here.
      </p>
      <Link className="line-link" href="/work">
        Back to the work ↗
      </Link>
    </main>
  );
}

import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="shell not-found">
      <span className="eyebrow muted">A thread that goes nowhere.</span>
      <h1>
        404<span style={{ color: 'var(--accent)' }}>✳</span>
      </h1>
      <p>
        This page doesn’t exist. There are a few good projects in the other
        direction.
      </p>
      <Link className="line-link" href="/work">
        Back to the work ↗
      </Link>
    </main>
  );
}

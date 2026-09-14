import { techIcons } from '@/content/tech';

/** Hook-free so both the client scenes and the server project page can use it. */
export function TechPill({ label }: { label: string }) {
  const path = techIcons[label];
  return (
    <span className="tech-pill">
      {path && (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={path} />
        </svg>
      )}
      {label}
    </span>
  );
}

export function TechList({ labels }: { labels: string[] }) {
  return (
    <div className="tech-list">
      {labels.map((label) => (
        <TechPill key={label} label={label} />
      ))}
    </div>
  );
}

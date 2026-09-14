import Link from 'next/link';
import { site } from '@/content/projects';
import s from './chrome.module.css';
export function Navigation() {
  return (
    <header className={s.header}>
      <div className={`shell ${s.bar}`}>
        <Link href="/" aria-label="Connor Tessaro, home" className={s.logo}>
          ct<span>✳</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/work">
            Work <span>03</span>
          </Link>
          <Link href="/about">About</Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <a className={s.contact} href={`mailto:${site.email}`}>
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className={s.footer} id="contact">
      <div className="shell">
        <div className={s.top}>
          <p className="eyebrow muted">
            Open to engineering roles and collaboration
          </p>
          <span className="eyebrow muted">Boston, MA · Northeastern 2028</span>
        </div>
        <a href={`mailto:${site.email}`} className={s.hello}>
          If you are building something
          <br />
          <span>in this territory, I would like to hear about it.</span>
          <span className={s.bigArrow} aria-hidden="true">
            ↗
          </span>
        </a>
        <div className={s.bottom}>
          <Link href="/" className={s.signature}>
            Connor Tessaro <span>© {new Date().getFullYear()}</span>
          </Link>
          <div>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

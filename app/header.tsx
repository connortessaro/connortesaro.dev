import Link from 'next/link'
import { NAV_ITEMS, GITHUB_URL, RESUME_PATH } from './data'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[rgba(246,244,239,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-[180px]">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-base font-semibold tracking-[-0.03em] text-zinc-950"
          >
            Connor Tessaro
          </Link>
          <p className="text-sm text-zinc-600">Software Engineer</p>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-end gap-1 text-sm text-zinc-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-white hover:text-zinc-950"
            >
              {item.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-zinc-950 transition-colors duration-200 hover:bg-zinc-100"
          >
            GitHub
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-700 px-3 py-2 font-medium text-white transition-colors duration-200 hover:bg-emerald-800"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { TextEffect } from '@/components/ui/text-effect'
import { NAV_ITEMS, GITHUB_URL, RESUME_PATH } from './data'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/6 bg-[rgba(246,244,239,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <Link
            href="/"
            className="font-[family-name:var(--font-geist)] text-sm font-semibold tracking-[-0.02em] text-zinc-950"
          >
            Connor Tessaro
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-sm text-zinc-600"
            delay={0.15}
          >
            Software Engineer
          </TextEffect>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-end gap-2 text-sm text-zinc-600"
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
            className="rounded-full border border-black/8 bg-white px-3 py-2 text-zinc-950 transition-colors duration-200 hover:bg-zinc-100"
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

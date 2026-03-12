import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f4ef',
}

export const metadata: Metadata = {
  title: 'Connor Tessaro | Software Engineer',
  description:
    'Connor Tessaro builds production-minded software across full-stack apps, automation systems, and revenue-linked products.',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} bg-[var(--page-bg)] text-zinc-950 antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="min-h-screen">
          <Header />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}

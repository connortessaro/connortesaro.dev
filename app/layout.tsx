import type { Metadata, Viewport } from 'next';
import { Newsreader } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { Navigation, Footer } from '@/components/chrome';
import { MotionRoot } from '@/components/motion';
import { site } from '@/content/projects';
import './globals.css';

// `weight` is deliberately omitted: next/font rejects `axes` on any call that
// pins a weight, and without the opsz axis Google serves the 16pt text cut —
// the wrong optical design for a 180px nameplate.
//
// Roman only. Nothing on the site sets italic today, and the one place `<em>`
// appears is a JSON code sample that resets it to normal, so shipping the
// italic subset would preload a second file to render nothing. Add
// `style: ['normal', 'italic']` here the moment real emphasis lands — a
// synthetic oblique on a high-contrast serif is worse than no italic at all.
const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Connor Tessaro — Software engineer, Northeastern University',
    template: '%s — Connor Tessaro',
  },
  description: site.description,
  alternates: { canonical: '/' },
  robots:
    process.env.VERCEL_ENV === 'preview'
      ? { index: false, follow: false }
      : { index: true, follow: true },
  openGraph: {
    title: 'Connor Tessaro',
    description: site.description,
    type: 'website',
    url: '/',
    siteName: 'Connor Tessaro',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connor Tessaro',
    description: site.description,
    images: ['/opengraph-image'],
  },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${GeistMono.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none;filter:none;-webkit-mask-image:none;mask-image:none}`}</style>
        </noscript>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <MotionRoot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: site.name,
              url: site.url,
              sameAs: [site.github, site.linkedin],
            }),
          }}
        />
      </body>
    </html>
  );
}

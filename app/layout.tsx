import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navigation, Footer } from '@/components/chrome';
import { MotionRoot } from '@/components/motion';
import { site } from '@/content/projects';
import './globals.css';
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
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

import type { MetadataRoute } from 'next';
import { site } from '@/content/projects';
export default function robots(): MetadataRoute.Robots {
  return process.env.VERCEL_ENV === 'preview'
    ? { rules: { userAgent: '*', disallow: '/' } }
    : {
        rules: { userAgent: '*', allow: '/' },
        sitemap: `${site.url}/sitemap.xml`,
      };
}

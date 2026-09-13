import type { MetadataRoute } from 'next';
import { projects, site } from '@/content/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/work', '/about', ...projects.map((p) => `/work/${p.slug}`)].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
    }),
  );
}

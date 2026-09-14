import type { MetadataRoute } from 'next';
import { projects, site } from '@/content/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ['', '/work', '/about', ...projects.map((p) => `/work/${p.slug}`)].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
    }),
  );
}

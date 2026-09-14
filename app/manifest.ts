import type { MetadataRoute } from 'next';
import { site } from '@/content/projects';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Tessaro',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}

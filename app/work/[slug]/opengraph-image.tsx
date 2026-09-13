import { socialImage } from '@/components/social-image';
import { projects } from '@/content/projects';
export const alt = 'Selected work by Connor Tessaro';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return socialImage(
    project?.name ?? 'Selected work',
    project?.headline ?? 'Software, thoughtfully built.',
    project?.accent,
  );
}

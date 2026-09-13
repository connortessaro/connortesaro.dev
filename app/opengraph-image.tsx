import { socialImage } from '@/components/social-image';
export const alt = 'Connor Tessaro — Software, thoughtfully built.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return socialImage(
    'Connor Tessaro',
    'Team decisions. AI infrastructure. Context you can trust.',
  );
}

import { socialImage } from '@/components/social-image';
export const alt =
  'Connor Tessaro — Software engineer, Northeastern University';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image() {
  return socialImage(
    'Connor Tessaro',
    'Decision capture, inference accounting, and context verification.',
  );
}

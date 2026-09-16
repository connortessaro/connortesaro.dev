import Image from 'next/image';
import type { ProjectSlug } from '@/content/projects';
import kizukiMascot from '@/public/images/projects/kizuki-mascot.webp';
import phantomMascot from '@/public/images/projects/phantom-mascot.webp';
import ringiMascot from '@/public/images/projects/ringi-mascot.webp';
import s from './project-mascot.module.css';

const MASCOTS = {
  ringi: ringiMascot,
  phantom: phantomMascot,
  kizuki: kizukiMascot,
};

export function ProjectMascot({
  slug,
  className,
  sizes = '240px',
  preload = false,
}: {
  slug: ProjectSlug;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <span
      className={`${s.mascot} ${className ?? ''}`}
      data-mascot={slug}
      aria-hidden="true"
    >
      <Image
        src={MASCOTS[slug]}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
      />
    </span>
  );
}

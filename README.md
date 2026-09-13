# connortesaro.dev

Connor Tessaro’s personal website: a dark editorial homepage with interactive Ringi, Phantom, and Kizuki showcases, MDX case studies, an About page, and personal experiments.

## Development

Node.js 24 LTS and npm. Install with `npm ci`, then run `npm run dev`.

```sh
npm run build
npm run start
npm run lint
npm run typecheck
npx playwright install chromium firefox webkit
npm run test:e2e
```

Tests run against the production build on port 3100. They cover three browser engines, responsive layouts, keyboard interaction, reduced motion, accessibility, metadata, assets, and reading without JavaScript.

## Content

- `content/projects.ts`: project metadata, links, and authored demo captions.
- `content/*.mdx`: case studies. Sources are project documentation and the public Prisma contributions; private research remains outside this repository.
- `content/resume.txt`: public résumé source. `python3 scripts/build_resume.py` regenerates `public/resume.pdf` using an installed Chrome/Chromium browser.

Project scenes use synthetic fixtures and perform no inference or paid requests. The LeagueIQ graphic is illustrative. The music score is Connor’s original exported project image from the public music-visualization repository.

## Motion

GSAP ScrollTrigger advances the desktop chapters through three states. Controls switch to manual mode so scrolling does not override a visitor’s selection. Mobile and reduced-motion modes use normal document flow. Native scrolling, direct project URLs, and server-rendered case studies remain available independently of animation.

## Hosting

GitHub: `connortessaro/connortesaro.dev` (private). Vercel: `connortesaro-dev` in `connor-tessaros-projects`, connected through the GitHub integration. `main` is the production branch; other branches receive preview deployments. Production domain: `connortesaro.dev`; `www` redirects to the apex.

Preview builds set both robots metadata and robots.txt to disallow indexing. No database, application secrets, analytics, or external font requests are required at runtime. Vercel’s local CLI environment file is ignored by Git.

## Attribution

Repository history began with the `ibelick/nim` portfolio starter. The current redesign replaces its presentation and components. Typeface families: Syne and Manrope, distributed through Google Fonts and self-hosted by Next.js.

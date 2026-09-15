import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const FONT_DIR = join(process.cwd(), 'assets/fonts');

/**
 * Satori substitutes a color emoji for the ✳ mark — the Newsreader latin subset
 * has no glyph for it either — so the mark is drawn rather than typed.
 */
function Asterisk({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 3v18M3.9 7.5l16.2 9M3.9 16.5l16.2-9" />
      </g>
    </svg>
  );
}

export async function socialImage(
  title: string,
  subtitle: string,
  accent = '#52a8ff',
) {
  // Satori renders a variable font at its default instance only, so these are
  // static optical cuts rather than the variable file the site loads: 72pt for
  // the display line, 16pt for the subtitle.
  const [display, text, mono] = await Promise.all([
    readFile(join(FONT_DIR, 'Newsreader72pt-SemiBold.ttf')),
    readFile(join(FONT_DIR, 'Newsreader16pt-Regular.ttf')),
    readFile(join(FONT_DIR, 'GeistMono-Regular.ttf')),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#000000',
        color: '#ededed',
        padding: '65px 70px',
        fontFamily: 'Newsreader',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Geist Mono',
          fontSize: 19,
          letterSpacing: '0.5px',
          color: '#a1a1a1',
        }}
      >
        <span>Connor Tessaro</span>
        <span>Software engineer, Northeastern University</span>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 24,
          fontFamily: 'Newsreader Display',
          fontSize: title.length > 17 ? 88 : 130,
          fontWeight: 600,
          // -5px was tuned for Geist Sans at -0.04em; on a serif at 130px it
          // jams the entering and exiting serifs together.
          letterSpacing: '-1px',
        }}
      >
        {title}
        <Asterisk size={title.length > 17 ? 42 : 58} color={accent} />
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #2e2e2e',
          paddingTop: 28,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 50,
        }}
      >
        <span
          style={{
            fontSize: subtitle.length > 70 ? 22 : 26,
            lineHeight: 1.35,
            color: accent,
            maxWidth: 820,
          }}
        >
          {subtitle}
        </span>
        <span
          style={{ fontFamily: 'Geist Mono', fontSize: 15, color: '#a1a1a1' }}
        >
          connortessaro.dev
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        // Two named families rather than one with two weights: the optical size
        // is what is being switched, and Satori has no way to express that.
        {
          name: 'Newsreader Display',
          data: display,
          weight: 600,
          style: 'normal',
        },
        { name: 'Newsreader', data: text, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}

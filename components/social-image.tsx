import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const FONT_DIR = join(process.cwd(), 'assets/fonts');

/**
 * Satori has no Geist glyph for the ✳ mark and substitutes a color emoji, so the
 * mark is drawn rather than typed.
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
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(FONT_DIR, 'Geist-Regular.ttf')),
    readFile(join(FONT_DIR, 'Geist-SemiBold.ttf')),
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
        fontFamily: 'Geist',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Geist Mono',
          fontSize: 19,
          letterSpacing: '1px',
          color: '#a1a1a1',
        }}
      >
        <span>CONNOR TESSARO</span>
        <span>SOFTWARE ENGINEER · NORTHEASTERN UNIVERSITY</span>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 24,
          fontSize: title.length > 17 ? 88 : 130,
          fontWeight: 600,
          letterSpacing: '-5px',
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
          connortesaro.dev
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}

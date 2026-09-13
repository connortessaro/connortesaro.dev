import { ImageResponse } from 'next/og';
export function socialImage(
  title: string,
  subtitle: string,
  accent = '#52a8ff',
) {
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
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 20,
          color: '#a1a1a1',
        }}
      >
        <span>CONNOR TESSARO</span>
        <span>SOFTWARE, THOUGHTFULLY BUILT.</span>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          fontSize: title.length > 17 ? 88 : 130,
          letterSpacing: '-6px',
        }}
      >
        {title}
        <span style={{ color: accent, marginLeft: 25 }}>✳</span>
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
        <span style={{ fontSize: 26, color: accent, maxWidth: 780 }}>
          {subtitle}
        </span>
        <span style={{ fontSize: 16, color: '#a1a1a1' }}>connortesaro.dev</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}

import { ImageResponse } from 'next/og';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
// Safari ignores SVG touch icons, so this mirrors icon.svg as a raster.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
      }}
    >
      <svg width="132" height="132" viewBox="0 0 64 64" fill="none">
        <g stroke="#ededed" strokeWidth="6" strokeLinecap="round">
          <path d="M32 10v44M10 32h44M17 17l30 30M17 47l30-30" />
        </g>
        <circle cx="32" cy="32" r="7" fill="#52a8ff" />
      </svg>
    </div>,
    size,
  );
}

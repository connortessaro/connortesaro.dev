'use client';
import { useRef } from 'react';
import s from './home.module.css';
export function Orbit() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={s.orbit}
      aria-hidden="true"
      onPointerMove={(event) => {
        if (
          !window.matchMedia(
            '(pointer:fine) and (prefers-reduced-motion:no-preference)',
          ).matches
        )
          return;
        const box = event.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          '--rx',
          `${(event.clientY - box.top - box.height / 2) / 35}deg`,
        );
        ref.current?.style.setProperty(
          '--ry',
          `${(event.clientX - box.left - box.width / 2) / 35}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--rx', '0deg');
        ref.current?.style.setProperty('--ry', '0deg');
      }}
    >
      <svg viewBox="0 0 640 500" className={s.orbitSvg}>
        <defs>
          <linearGradient id="wire" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#1f1f1f" />
            <stop offset=".34" stopColor="#ededed" />
            <stop offset=".65" stopColor="#454545" />
            <stop offset="1" stopColor="#8f8f8f" />
          </linearGradient>
        </defs>
        <g opacity=".5" stroke="#242424" strokeWidth=".6">
          <path d="M50 250H590M320 35V465" />
          <circle cx="320" cy="250" r="198" fill="none" strokeDasharray="2 7" />
          <path d="M70 70l500 360M70 430L570 70" strokeDasharray="2 7" />
        </g>
        <g fill="none" stroke="url(#wire)" strokeWidth="1.05">
          {Array.from({ length: 34 }, (_, i) => (
            <ellipse
              key={i}
              cx="320"
              cy="250"
              rx={98 + i * 2.25}
              ry={184 - i * 1.1}
              transform={`rotate(${i * 5.3 - 68} 320 250)`}
            />
          ))}
        </g>
        <g fill="#52a8ff">
          <circle cx="132" cy="192" r="4" />
          <circle cx="493" cy="157" r="4" />
          <circle cx="421" cy="414" r="4" />
        </g>
        <g fill="#8f8f8f" fontFamily="monospace" fontSize="9" letterSpacing="2">
          <text x="61" y="176">
            01 / RINGI
          </text>
          <text x="491" y="139">
            02 / PHANTOM
          </text>
          <text x="435" y="435">
            03 / KIZUKI
          </text>
        </g>
        <g stroke="#454545" strokeWidth=".8">
          <path d="M40 40v13m-6-6h12M600 450v13m-6-6h12" />
        </g>
      </svg>
      <span className={s.orbitNote}>A few things, connected.</span>
    </div>
  );
}

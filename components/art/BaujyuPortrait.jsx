'use client';

import { useId } from 'react';
import styles from './BaujyuPortrait.module.css';

// Baujyu, drawn as a flat 2D illustration in SVG: Pahadi topi, white hair,
// curled mustache, dark vest, off-white kurta and a patterned shawl.
// He blinks, and his mustache twitches now and then (see the CSS module).
export default function BaujyuPortrait({ className = '', background = true, title = 'Baujyu, a Kumaoni grandfather' }) {
  // Unique ids so two portraits on one page don't share <defs>.
  const uid = useId().replace(/:/g, '');
  const shawlId = `${uid}-shawl`;
  const frameId = `${uid}-frame`;
  return (
    <svg viewBox="0 0 400 460" className={`${styles.portrait} ${className}`} role="img">
      <title>{title}</title>
      <defs>
        <pattern id={shawlId} width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <rect width="28" height="28" fill="#9f3519" />
          <rect width="28" height="6" fill="#f6a53a" />
          <rect y="14" width="28" height="2" fill="#f6ecdb" />
          <path d="M7 20 l4 4 l-4 4 l-4 -4 Z M21 20 l4 4 l-4 4 l-4 -4 Z" fill="#26110a" />
        </pattern>
        <clipPath id={frameId}>
          <circle cx="200" cy="230" r="196" />
        </clipPath>
      </defs>

      {background && <circle cx="200" cy="230" r="196" fill="#f6ecdb" />}
      {background && <circle cx="200" cy="230" r="170" fill="none" stroke="#f6a53a" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />}

      <g clipPath={`url(#${frameId})`}>
        <g className={styles.body}>
          {/* Kurta */}
          <path d="M62 470 C70 372 132 334 200 332 C268 334 330 372 338 470 Z" fill="#f3e6cf" />
          <path d="M172 338 L200 384 L228 338" fill="none" stroke="#d8c6a8" strokeWidth="4" strokeLinejoin="round" />
          {/* Vest */}
          <path d="M88 470 C92 386 128 350 172 338 L194 470 Z" fill="#2b1810" />
          <path d="M312 470 C308 386 272 350 228 338 L206 470 Z" fill="#2b1810" />
          {[400, 430].map((y) => (
            <circle key={y} cx="214" cy={y} r="5" fill="#f6a53a" />
          ))}
          {/* Shawl over the left shoulder */}
          <path d="M44 470 C56 380 96 342 150 334 C156 384 196 436 224 470 Z" fill={`url(#${shawlId})`} />
          <path d="M150 334 C156 384 196 436 224 470" fill="none" stroke="#f6a53a" strokeWidth="5" strokeDasharray="3 5" />
        </g>

        <g className={styles.head}>
          {/* Neck */}
          <path d="M174 296 L226 296 L230 342 C214 354 186 354 170 342 Z" fill="#b0704a" />
          {/* Hair at the sides, behind the ears */}
          <ellipse cx="128" cy="222" rx="20" ry="36" fill="#f8f3ea" />
          <ellipse cx="272" cy="222" rx="20" ry="36" fill="#f8f3ea" />
          {/* Ears */}
          <ellipse cx="126" cy="236" rx="13" ry="21" fill="#bd7c52" />
          <ellipse cx="274" cy="236" rx="13" ry="21" fill="#bd7c52" />
          {/* Face */}
          <ellipse cx="200" cy="228" rx="76" ry="88" fill="#c98a5f" />
          {/* Forehead lines */}
          <path d="M168 176 Q200 168 232 176 M174 188 Q200 181 226 188" fill="none" stroke="#a96a42" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pithya (tilak) */}
          <ellipse cx="200" cy="198" rx="4" ry="9" fill="#c4271b" />
          {/* Eyebrows */}
          <path d="M150 210 Q168 196 186 208" fill="none" stroke="#fbf6ee" strokeWidth="9" strokeLinecap="round" />
          <path d="M214 208 Q232 196 250 210" fill="none" stroke="#fbf6ee" strokeWidth="9" strokeLinecap="round" />
          {/* Eyes */}
          <g className={styles.eyes}>
            <ellipse cx="168" cy="228" rx="7" ry="8" fill="#140c08" />
            <ellipse cx="232" cy="228" rx="7" ry="8" fill="#140c08" />
            <circle cx="170" cy="225" r="2.2" fill="#fff" />
            <circle cx="234" cy="225" r="2.2" fill="#fff" />
          </g>
          {/* Laugh lines */}
          <path d="M146 228 l-8 -4 M146 236 l-8 2 M254 228 l8 -4 M254 236 l8 2" stroke="#a96a42" strokeWidth="2.5" strokeLinecap="round" />
          {/* Nose */}
          <path d="M200 222 C193 244 188 258 196 264 C202 268 210 264 212 258" fill="none" stroke="#a5653d" strokeWidth="4" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="150" cy="262" r="15" fill="#e0603a" opacity="0.3" />
          <circle cx="250" cy="262" r="15" fill="#e0603a" opacity="0.3" />
          {/* Smile */}
          <path d="M180 294 Q200 310 220 294" fill="#7a2a14" stroke="#5a2414" strokeWidth="3" strokeLinecap="round" />
          {/* Curled mustache */}
          <path
            className={styles.mustache}
            d="M200 270 C184 262 160 262 146 274 C138 282 128 280 128 268 C124 284 138 296 154 292 C172 288 186 282 200 282 C214 282 228 288 246 292 C262 296 276 284 272 268 C272 280 262 282 254 274 C240 262 216 262 200 270 Z"
            fill="#fbf6ee"
            stroke="#e3d9cb"
            strokeWidth="2"
          />
          {/* Pahadi topi */}
          <g transform="rotate(-7 200 150)">
            <path d="M114 170 C124 116 276 116 286 170 C252 160 148 160 114 170 Z" fill="#2b1810" />
            <path d="M118 166 C150 156 250 156 282 166" fill="none" stroke="#f6a53a" strokeWidth="5" />
            <path d="M120 172 C152 162 248 162 280 172" fill="none" stroke="#c4271b" strokeWidth="3" strokeDasharray="6 4" />
            <path d="M200 122 C196 138 196 150 200 160" fill="none" stroke="#5a2414" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}

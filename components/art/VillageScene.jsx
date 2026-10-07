import styles from './VillageScene.module.css';

// Foreground of the hero: a Kumaoni stone house with a slate roof, carved
// wooden door (kholi), Aipan on the threshold, a marigold toran, deodars,
// chimney smoke and birds. It sits on top of the three.js mountains.

const dots = (x, y, count, gap, r = 2.4) =>
  Array.from({ length: count }, (_, i) => <circle key={i} cx={x + i * gap} cy={y} r={r} />);

function Deodar({ x, y, scale = 1, tone = '#26110a' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={styles.tree}>
      <rect x="-5" y="-10" width="10" height="40" fill="#140c08" />
      <path d="M0 -150 L-28 -95 L-14 -98 L-44 -45 L-22 -48 L-60 10 L60 10 L22 -48 L44 -45 L14 -98 L28 -95 Z" fill={tone} />
    </g>
  );
}

function Garland({ x1, x2, y, sag }) {
  const count = 14;
  const flowers = Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count;
    const fx = x1 + (x2 - x1) * t;
    const fy = y + Math.sin(t * Math.PI) * sag;
    return <circle key={i} cx={fx} cy={fy} r={i % 2 ? 6 : 7.5} fill={i % 3 === 0 ? '#c4271b' : '#f6a53a'} />;
  });
  return (
    <g className={styles.garland}>
      <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} fill="none" stroke="#3a1d10" strokeWidth="2" />
      {flowers}
    </g>
  );
}

export default function VillageScene({ className = '' }) {
  return (
    <svg
      className={`${styles.scene} ${className}`}
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* Each data-depth group is moved by the hero parallax (components/home/Hero.jsx).
          Bigger depth = further away = drifts more against the scroll. */}
      <g data-depth="0.9">
      {/* Birds */}
      <g className={styles.birds} fill="none" stroke="#26110a" strokeWidth="3" strokeLinecap="round">
        <path d="M560 70 q10 -10 20 0 q10 -10 20 0" />
        <path d="M610 50 q7 -7 14 0 q7 -7 14 0" />
        <path d="M530 96 q6 -6 12 0 q6 -6 12 0" />
      </g>
      </g>

      <g data-depth="0.35">
      {/* Ground */}
      <path d="M0 420 L0 318 C180 284 380 300 560 310 C760 320 960 270 1200 290 L1200 420 Z" fill="#140c08" />

      <Deodar x={90} y={318} scale={1.1} />
      <Deodar x={170} y={330} scale={0.8} tone="#3a1d10" />
      <Deodar x={1150} y={300} scale={1.25} />

      {/* Small house, far left */}
      <g transform="translate(250 236) scale(0.55)">
        <rect x="0" y="80" width="220" height="110" fill="#5a2414" />
        <rect x="0" y="20" width="220" height="62" fill="#f6ecdb" />
        <path d="M-20 26 L110 -40 L240 26 Z" fill="#3a1d10" />
        <rect x="40" y="36" width="34" height="34" fill="#9f3519" />
        <rect x="146" y="36" width="34" height="34" fill="#9f3519" />
        <rect x="92" y="110" width="36" height="80" rx="18" fill="#140c08" />
      </g>

      </g>

      <g data-depth="0.12">
      {/* Main house */}
      <g className={styles.house}>
        {/* Chimney smoke */}
        <g className={styles.smoke} fill="#fbf6ee">
          <circle cx="990" cy="70" r="10" />
          <circle cx="1000" cy="48" r="13" />
          <circle cx="985" cy="22" r="16" />
        </g>
        <rect x="978" y="84" width="24" height="44" fill="#3a1d10" />

        {/* Ground floor: stone */}
        <rect x="760" y="246" width="300" height="104" fill="#5a2414" />
        <g stroke="#7a3a22" strokeWidth="3">
          <path d="M760 272 H1060 M760 298 H1060 M760 324 H1060" />
          <path d="M800 246 v26 M860 272 v26 M820 298 v26 M960 246 v26 M1010 272 v26 M990 298 v26 M1040 324 v26 M780 324 v26" />
        </g>

        {/* Upper floor: whitewashed with a geru band */}
        <rect x="760" y="160" width="300" height="88" fill="#f6ecdb" />
        <rect x="760" y="226" width="300" height="22" fill="#c4271b" />
        <g fill="#fbf6ee">{dots(770, 237, 25, 12)}</g>

        {/* Carved windows */}
        {[790, 970].map((x) => (
          <g key={x}>
            <rect x={x - 6} y="170" width="72" height="54" fill="#9f3519" />
            <rect x={x} y="176" width="60" height="42" fill="#26110a" />
            <path d={`M${x + 30} 176 V218 M${x} 197 H${x + 60}`} stroke="#9f3519" strokeWidth="4" />
            <g fill="#f6a53a">{dots(x - 2, 166, 7, 11, 2.6)}</g>
          </g>
        ))}

        {/* Slate roof */}
        <path d="M736 168 L910 92 L1084 168 Z" fill="#3a1d10" />
        <g stroke="#5a2414" strokeWidth="3">
          <path d="M790 145 H1030 M840 122 H980 M878 105 H942" />
        </g>
        <path d="M736 168 H1084" stroke="#140c08" strokeWidth="6" />

        {/* Kholi: carved door */}
        <rect x="868" y="262" width="84" height="88" fill="#f07a26" />
        <rect x="878" y="272" width="64" height="78" rx="32" fill="#26110a" />
        <path d="M910 272 V350" stroke="#3a1d10" strokeWidth="4" />
        <g fill="#140c08">{dots(874, 258, 8, 10.5, 2.2)}</g>
        <Garland x1={862} x2={958} y={258} sag={14} />

        {/* Aipan threshold */}
        <rect x="846" y="350" width="128" height="18" fill="#c4271b" />
        <g fill="#fbf6ee">{dots(852, 359, 16, 7.8, 2)}</g>
        <rect x="830" y="368" width="160" height="14" fill="#9f3519" />
      </g>

      {/* Front slope */}
      <path d="M0 420 L0 380 C260 360 520 392 800 382 C980 376 1100 386 1200 378 L1200 420 Z" fill="#26110a" />
      </g>
    </svg>
  );
}

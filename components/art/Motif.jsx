// Hand-built SVG motifs used for feature cards and badges.
// All strokes use currentColor, so the parent decides the colour.
//
// motif: 'aipan' | 'chowki' | 'madhubani' | 'himalaya' | 'topi' | 'diyo'

const ring = (count, radius, cx = 50, cy = 50) =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, a];
  });

function Aipan() {
  return (
    <g>
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      {ring(8, 0).map(([, , a], i) => {
        const tipX = 50 + Math.cos(a) * 30;
        const tipY = 50 + Math.sin(a) * 30;
        const l = a - 0.38;
        const r = a + 0.38;
        return (
          <path
            key={i}
            d={`M${50 + Math.cos(l) * 11} ${50 + Math.sin(l) * 11} Q${50 + Math.cos(l) * 27} ${50 + Math.sin(l) * 27} ${tipX} ${tipY} Q${50 + Math.cos(r) * 27} ${50 + Math.sin(r) * 27} ${50 + Math.cos(r) * 11} ${50 + Math.sin(r) * 11}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        );
      })}
      {ring(24, 40).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="currentColor" />
      ))}
    </g>
  );
}

function Chowki() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
      <rect x="14" y="14" width="72" height="72" />
      <rect x="28" y="28" width="44" height="44" transform="rotate(45 50 50)" />
      <rect x="38" y="38" width="24" height="24" />
      {[
        [14, 14],
        [86, 14],
        [14, 86],
        [86, 86],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="currentColor" />
      ))}
      {ring(12, 6).map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="1.5" fill="currentColor" stroke="none" />
      ))}
    </g>
  );
}

function Madhubani() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 50 C28 24 58 22 74 50 C58 78 28 76 12 50 Z" />
      <path d="M74 50 L92 34 L88 50 L92 66 Z" />
      <circle cx="26" cy="46" r="4" fill="currentColor" />
      <path d="M36 32 C40 44 40 56 36 68" />
      {[44, 52, 60].map((x) => (
        <path key={x} d={`M${x} 34 l4 6 l-4 6 l4 6 l-4 6 l4 6 l-4 6`} strokeWidth="2" />
      ))}
    </g>
  );
}

function Himalaya() {
  return (
    <g strokeLinejoin="round">
      <circle cx="72" cy="28" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M6 82 L34 38 L48 58 L62 30 L94 82 Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M28 47 L34 38 L40 47 L35 45 Z M55 41 L62 30 L69 41 L62 38 Z" fill="currentColor" />
      <path d="M10 90 H90" stroke="currentColor" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
    </g>
  );
}

function Topi() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 66 C18 34 82 34 88 66 C70 60 30 60 12 66 Z" />
      <path d="M50 38 C48 48 48 56 50 62" />
      <path d="M16 70 C34 64 66 64 84 70" strokeDasharray="1 6" />
    </g>
  );
}

function Diyo() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M14 62 C22 82 78 82 86 62 C70 66 30 66 14 62 Z" />
      <path d="M50 58 C38 46 44 30 50 18 C56 30 62 46 50 58 Z" fill="currentColor" />
      {ring(5, 0).map((_, i) => (
        <circle key={i} cx={26 + i * 12} cy="72" r="1.6" fill="currentColor" stroke="none" />
      ))}
    </g>
  );
}

const MOTIFS = {
  aipan: Aipan,
  chowki: Chowki,
  madhubani: Madhubani,
  himalaya: Himalaya,
  topi: Topi,
  diyo: Diyo,
};

export default function Motif({ motif = 'aipan', size = 64, className = '', title }) {
  const Shape = MOTIFS[motif] || Aipan;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <Shape />
    </svg>
  );
}

// Solid, chunky folk-art glyphs drawn to match the Boli logo: filled
// shapes with cut-out details (like the leaves in the logo's diya).
// Each glyph is ONE path with fill-rule "evenodd", so inner shapes become
// holes. Everything uses currentColor, so the parent decides the colour.
//
// motif: 'diyo' | 'home' | 'book' | 'aipan' | 'chowki' | 'madhubani' | 'himalaya' | 'topi'

const n = (v) => Math.round(v * 100) / 100;

const circle = (cx, cy, r) => `M${n(cx - r)} ${n(cy)}a${r} ${r} 0 1 0 ${n(2 * r)} 0a${r} ${r} 0 1 0 ${n(-2 * r)} 0Z`;

// A pointed leaf / petal from (x, y), `length` long, pointing at `angle` degrees.
const leaf = (x, y, length, width, angle) => {
  const a = (angle * Math.PI) / 180;
  const tx = x + Math.cos(a) * length;
  const ty = y + Math.sin(a) * length;
  const mx = (x + tx) / 2;
  const my = (y + ty) / 2;
  const nx = -Math.sin(a) * width;
  const ny = Math.cos(a) * width;
  return `M${n(x)} ${n(y)}Q${n(mx + nx)} ${n(my + ny)} ${n(tx)} ${n(ty)}Q${n(mx - nx)} ${n(my - ny)} ${n(x)} ${n(y)}Z`;
};

const bar = (x, y, w, h) => {
  const r = h / 2;
  return `M${x + r} ${y}H${x + w - r}a${r} ${r} 0 0 1 0 ${h}H${x + r}a${r} ${r} 0 0 1 0 ${-h}Z`;
};

const ring = (count, radius, fn) =>
  Array.from({ length: count }, (_, i) => fn((i / count) * 360 - 90, radius)).join('');

const GLYPHS = {
  // The lamp from the logo: flame with an inner flame, rim, bowl with three leaves
  diyo: [
    'M50 6C63 20 71 34 65 47C61 55 39 55 35 47C29 34 37 20 50 6Z',
    leaf(50, 52, 20, 11, -90),
    'M6 59Q30 51 50 61Q70 51 94 59Q50 71 6 59Z',
    'M13 67Q50 78 87 67C85 84 70 95 50 95C30 95 15 84 13 67Z',
    leaf(50, 91, 14, 9, -90),
    leaf(43, 91, 12, 8, -140),
    leaf(57, 91, 12, 8, -40),
  ],
  // A Kumaoni house with an arched door and a round window
  home: [
    'M10 48L50 12L90 48L80 48L80 90L20 90L20 48Z',
    'M42 84V70a8 8 0 0 1 16 0V84Z',
    circle(50, 42, 6),
  ],
  // An open book with lines cut out
  book: [
    'M47 30C38 22 24 21 10 25V80C24 76 38 77 47 85Z',
    'M53 30C62 22 76 21 90 25V80C76 76 62 77 53 85Z',
    bar(17, 38, 22, 5),
    bar(17, 50, 22, 5),
    bar(17, 62, 16, 5),
    bar(61, 38, 22, 5),
    bar(61, 50, 22, 5),
    bar(67, 62, 16, 5),
  ],
  // Lotus flower: eight petals, each with a leaf cut out, and a centre bindu
  aipan: [
    ring(8, 12, (deg, r) => {
      const a = (deg * Math.PI) / 180;
      return leaf(50 + Math.cos(a) * r, 50 + Math.sin(a) * r, 34, 22, deg);
    }),
    ring(8, 22, (deg, r) => {
      const a = (deg * Math.PI) / 180;
      return leaf(50 + Math.cos(a) * r, 50 + Math.sin(a) * r, 15, 7, deg);
    }),
    circle(50, 50, 8),
    circle(50, 50, 3),
  ],
  // Chowki: a ritual square with a diamond, a bindu and corner dots
  chowki: [
    'M22 10H78Q90 10 90 22V78Q90 90 78 90H22Q10 90 10 78V22Q10 10 22 10Z',
    'M50 22L78 50L50 78L22 50Z',
    circle(50, 50, 9),
    circle(23, 23, 5),
    circle(77, 23, 5),
    circle(23, 77, 5),
    circle(77, 77, 5),
  ],
  // Madhubani fish with an eye and curved scale cut-outs
  madhubani: [
    'M6 50C22 25 54 23 70 50C54 77 22 75 6 50Z',
    'M74 50L94 31C89 44 89 56 94 69Z',
    circle(22, 47, 4.5),
    leaf(38, 66, 30, 8, -90),
    leaf(53, 63, 26, 8, -90),
  ],
  // Two peaks with snow caps cut out, and the sun
  himalaya: [
    'M4 88L34 40L46 58L62 28L96 88Z',
    'M62 37L70 50L65 48L62 53L58 48L54 50Z',
    'M34 48L40 58L36 56L33 60L30 56L28 58Z',
    circle(82, 18, 9),
  ],
  // Pahadi topi with a crease and a band cut out
  topi: [
    'M8 76C10 18 90 18 92 76C72 68 28 68 8 76Z',
    'M15 66C35 55 65 55 85 66C65 62 35 62 15 66Z',
    leaf(50, 56, 20, 9, -90),
  ],
};

export default function Motif({ motif = 'aipan', size = 64, className = '', title }) {
  const d = (GLYPHS[motif] || GLYPHS.aipan).join('');
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
      <path d={d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

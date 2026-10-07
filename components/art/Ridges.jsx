import styles from './Ridges.module.css';

// Static layered ridgelines in the hero's mountain colours. Placed at the
// bottom of a section, they tie every section to the same Himalayan dusk.
// `to` is the colour of the nearest ridge, so it can blend into whatever
// comes next (e.g. the dark footer).
const LAYERS = [
  { color: '#f1c09a', d: 'M0 70 L90 30 L150 55 L260 10 L340 50 L430 22 L520 60 L610 18 L700 52 L800 26 L890 58 L980 20 L1080 54 L1200 30 L1200 140 L0 140 Z' },
  { color: '#e98f52', d: 'M0 90 C120 60 220 95 340 70 C460 45 560 92 700 74 C840 56 960 96 1080 70 C1140 58 1180 66 1200 70 L1200 140 L0 140 Z' },
  { color: '#d4582a', d: 'M0 110 C150 88 300 118 460 100 C620 82 760 120 920 104 C1040 92 1120 108 1200 100 L1200 140 L0 140 Z' },
];

export default function Ridges({ to = '#9f3519', className = '' }) {
  return (
    <svg className={`${styles.ridges} ${className}`} viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
      {LAYERS.map((layer) => (
        <path key={layer.color} d={layer.d} fill={layer.color} />
      ))}
      <path d="M0 128 C200 118 380 134 600 124 C820 114 1000 132 1200 122 L1200 140 L0 140 Z" fill={to} />
    </svg>
  );
}

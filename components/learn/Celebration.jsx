import styles from './Celebration.module.css';

// A shower of marigold petals, pure CSS. Positions are fixed (not random)
// so the server and browser render the same markup.
const PETALS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: ((i * 13) % 20) / 10,
  duration: 2.6 + ((i * 7) % 10) / 5,
  size: 10 + ((i * 5) % 12),
  hue: i % 3,
}));

export default function Celebration() {
  return (
    <div className={styles.shower} aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`${styles.petal} ${styles[`h${p.hue}`]}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

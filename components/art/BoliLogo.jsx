import styles from './BoliLogo.module.css';

// The Boli logo: "B·L·I" with a diya for the O.
// The artwork lives in public/brand/*.png and is used as a CSS mask, so the
// logo can be painted with any colour or gradient from the palette.
//   variant: 'wordmark' (full logo) | 'diya' (the lamp on its own)
//   fill:    any CSS background, e.g. 'var(--ink)' or 'var(--grad-fire)'
export default function BoliLogo({ variant = 'wordmark', fill = 'var(--ink)', className = '', label = 'Boli' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`${styles.logo} ${styles[variant]} ${className}`}
      style={{ '--logo-fill': fill }}
    />
  );
}

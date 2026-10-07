import styles from './Wordmark.module.css';

// The BOLI wordmark in the site's display font (Rubik Black), with a diya
// standing in for the O. Letters use the fire gradient; the diya is the
// lamp from the Boli artwork (public/brand/diya.png) used as a CSS mask.
//
//   outlined: adds the ink outline + hard offset shadow (used in the hero)
//   Size it with font-size from the parent or via className.
export default function Wordmark({ outlined = false, className = '' }) {
  return (
    <span className={`${styles.wordmark} ${outlined ? styles.outlined : ''} ${className}`} role="img" aria-label="Boli">
      <span aria-hidden="true">B</span>
      {/* wrapper carries the outline: a mask would clip a filter on the lamp itself */}
      <span className={styles.diyaWrap} aria-hidden="true">
        <span className={styles.diya} />
      </span>
      <span aria-hidden="true">LI</span>
    </span>
  );
}

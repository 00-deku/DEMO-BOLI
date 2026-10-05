import Link from 'next/link';
import styles from './Button.module.css';

// Chunky, sticker-like button. Renders a Next <Link> when `href` is given,
// otherwise a <button>.
// variant: 'fire' | 'ink' | 'paper'
export default function Button({ href, variant = 'fire', size = 'm', className = '', children, ...rest }) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}

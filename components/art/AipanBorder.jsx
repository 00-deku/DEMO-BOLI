import styles from './AipanBorder.module.css';

// A repeating Aipan strip (white rice-paste lines on red ochre), used
// between sections. It is an SVG <pattern>, so it tiles to any width.
export default function AipanBorder({ id = 'aipan', tone = 'geru', className = '' }) {
  const patternId = `${id}-pattern`;
  return (
    <div className={`${styles.border} ${styles[tone]} ${className}`} aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern id={patternId} width="64" height="48" patternUnits="userSpaceOnUse">
            <path d="M0 24 Q16 4 32 24 T64 24" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M0 24 Q16 44 32 24 T64 24" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="16" cy="24" r="3.5" fill="currentColor" />
            <circle cx="48" cy="24" r="3.5" fill="currentColor" />
            <circle cx="32" cy="6" r="1.8" fill="currentColor" />
            <circle cx="32" cy="42" r="1.8" fill="currentColor" />
            <circle cx="0" cy="6" r="1.8" fill="currentColor" />
            <circle cx="0" cy="42" r="1.8" fill="currentColor" />
            <circle cx="64" cy="6" r="1.8" fill="currentColor" />
            <circle cx="64" cy="42" r="1.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

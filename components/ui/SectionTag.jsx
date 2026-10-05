import styles from './SectionTag.module.css';

// Small pill label above section headings: "01 — Lessons · पाठ"
export default function SectionTag({ number, children, deva, tone = 'ink' }) {
  return (
    <p className={`${styles.tag} ${styles[tone]}`}>
      {number && <span className={styles.number}>{number}</span>}
      <span>{children}</span>
      {deva && <span className={`deva ${styles.deva}`}>{deva}</span>}
    </p>
  );
}

import Parallax from './Parallax';
import styles from './GiantWord.module.css';

// A huge outlined Devanagari word that slides sideways behind a section
// as you scroll past it.
export default function GiantWord({ children, tone = 'ink', speed = 0.25, top = '8%' }) {
  return (
    <div className={styles.track} style={{ top }} aria-hidden="true">
      <Parallax axis="x" speed={speed} className={`deva ${styles.word} ${styles[tone]}`}>
        {children}
      </Parallax>
    </div>
  );
}

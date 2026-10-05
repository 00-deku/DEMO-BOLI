import { marqueeWords } from '@/data/site';
import styles from './Marquee.module.css';

// An endless strip of Kumaoni words. The list is rendered twice so the CSS
// animation can loop without a gap.
export default function Marquee({ tone = 'fire', reverse = false }) {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className={`${styles.marquee} ${styles[tone]}`} aria-label="Kumaoni words">
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {items.map((word, i) => (
          <span key={i} className={styles.item} aria-hidden={i >= marqueeWords.length}>
            <span className="deva">{word.deva}</span>
            <span className={styles.roman}>{word.roman}</span>
            <span className={styles.star} aria-hidden="true">
              ✺
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

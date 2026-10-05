import Motif from './Motif';
import styles from './BadgeMedal.module.css';

const TONES = {
  aipan: 'geru',
  chowki: 'geru',
  madhubani: 'fire',
  himalaya: 'earth',
  diyo: 'fire',
};

// A round, scalloped medal with a motif in the middle.
// Locked badges are drawn as an outline only.
export default function BadgeMedal({ badge, earned = true, size = 'm' }) {
  return (
    <figure className={`${styles.medal} ${styles[size]} ${earned ? styles[TONES[badge.motif] || 'fire'] : styles.locked}`}>
      <div className={styles.coin}>
        <Motif motif={badge.motif} size={size === 's' ? 44 : 64} title={badge.name} />
      </div>
      <figcaption className={styles.caption}>
        <strong>{badge.name}</strong>
        <span>{badge.description}</span>
      </figcaption>
    </figure>
  );
}

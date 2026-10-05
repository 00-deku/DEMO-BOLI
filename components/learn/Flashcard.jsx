'use client';

import { useState } from 'react';
import styles from './Flashcard.module.css';

// A word card that flips in 3D: Kumaoni on the front, meaning on the back.
export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? `Meaning: ${card.meaning}. Tap to see the word again.` : `${card.roman}. Tap to see the meaning.`}
      >
        <span className={`${styles.face} ${styles.front}`}>
          <span className={styles.corner}>Kumaoni</span>
          <span className={`deva ${styles.deva}`}>{card.deva}</span>
          <span className={styles.roman}>{card.roman}</span>
          <span className={styles.hint}>Tap to flip</span>
        </span>
        <span className={`${styles.face} ${styles.back}`}>
          <span className={styles.corner}>Meaning</span>
          <span className={styles.meaning}>{card.meaning}</span>
          {card.note && <span className={styles.note}>{card.note}</span>}
        </span>
      </button>
      <p className={styles.audio}>Native-speaker audio is coming soon.</p>
    </div>
  );
}

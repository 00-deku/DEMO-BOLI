import BaujyuPortrait from '@/components/art/BaujyuPortrait';
import Button from '@/components/ui/Button';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import { baujyu } from '@/data/baujyu';
import styles from './BaujyuIntro.module.css';

export default function BaujyuIntro() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.frame}>
          <div className={styles.arch}>
            <Parallax speed={0.06} className={styles.portraitLayer}>
              <BaujyuPortrait />
            </Parallax>
          </div>
          <Parallax speed={-0.6} className={styles.bubbleLayer}>
          <p className={styles.bubble}>
            <span className="deva">पैलाग, नाति!</span>
            <span>Sit, sit. Today we learn to ask “kas chha?” properly.</span>
          </p>
          </Parallax>
        </Reveal>

        <div className={styles.copy}>
          <SectionTag deva={baujyu.deva} tone="paper">
            Your companion
          </SectionTag>
          <h2 className={styles.title}>
            Meet <span className={styles.name}>Baujyu</span>
          </h2>
          <p className={styles.summary}>{baujyu.summary}</p>
          <ul className={styles.traits}>
            {baujyu.traits.map((trait, i) => (
              <li key={trait} style={{ '--r': `${(i % 2 ? 1 : -1) * (2 + i)}deg` }}>
                {trait}
              </li>
            ))}
          </ul>
          <p className={styles.status}>
            <span className={styles.dot} /> Baujyu is still learning to talk. His conversations arrive in a later
            version.
          </p>
          <Button href="/baujyu" variant="ink">
            Read his character sheet
          </Button>
        </div>
      </div>
    </section>
  );
}

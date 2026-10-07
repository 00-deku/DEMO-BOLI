import Motif from '@/components/art/Motif';
import GiantWord from '@/components/motion/GiantWord';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import { features } from '@/data/site';
import styles from './Features.module.css';

// Cards float at slightly different speeds, like prints on a moving wall.
const CARD_SPEEDS = [0.04, 0.16, 0.08, 0.2];

export default function Features() {
  return (
    <section className={styles.section}>
      <GiantWord tone="fire" top="4%">
        बोलि
      </GiantWord>
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <SectionTag number="02">
            What&apos;s inside
          </SectionTag>
          <h2 className={styles.title}>
            Not a textbook. <span className="serif">Not a dictionary.</span> A courtyard.
          </h2>
        </header>

        <ul className={styles.grid}>
          {features.map((feature, i) => (
            <Reveal as="li" key={feature.key} delay={i * 110} className={styles.cell}>
              <Parallax speed={CARD_SPEEDS[i]}>
              <div className={`${styles.card} ${styles[feature.key]}`}>
                <div className={styles.cardTop}>
                  <span className={styles.index}>0{i + 1}</span>
                  <span className={`deva ${styles.deva}`}>{feature.kumaoni}</span>
                </div>
                <Motif motif={feature.motif} size={96} className={styles.motif} />
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.body}>{feature.body}</p>
              </div>
              </Parallax>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

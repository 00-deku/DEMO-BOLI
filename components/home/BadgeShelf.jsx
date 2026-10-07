import BadgeMedal from '@/components/art/BadgeMedal';
import GiantWord from '@/components/motion/GiantWord';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import { badges } from '@/data/badges';
import styles from './BadgeShelf.module.css';

export default function BadgeShelf() {
  return (
    <section className={styles.section}>
      <GiantWord tone="ink" top="10%">
        खेल
      </GiantWord>
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <SectionTag number="05" deva="खेल">
            Play
          </SectionTag>
          <h2 className={styles.title}>
            Badges you&apos;d hang <span className="serif">on the kitchen wall.</span>
          </h2>
          <p className={styles.lede}>
            XP for every lesson, a streak for every day, and medals drawn from Aipan, Madhubani and Himalayan motifs.
          </p>
        </header>
        <div className={styles.shelf}>
          {badges.map((badge, i) => (
            <Reveal key={badge.id} delay={i * 90}>
              <Parallax speed={i % 2 ? 0.35 : 0.1}>
                <BadgeMedal badge={badge} />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

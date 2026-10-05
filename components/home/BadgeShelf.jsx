import BadgeMedal from '@/components/art/BadgeMedal';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import { badges } from '@/data/badges';
import styles from './BadgeShelf.module.css';

export default function BadgeShelf() {
  return (
    <section className={styles.section}>
      <div className="container">
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
              <BadgeMedal badge={badge} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

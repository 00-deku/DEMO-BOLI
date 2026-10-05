import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import { units } from '@/data/lessons';
import styles from './LessonTrail.module.css';

// The learning path as a mountain trail: each unit is a stop.
export default function LessonTrail() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <SectionTag number="04" deva="पाठ" tone="paper">
            The trail
          </SectionTag>
          <h2 className={styles.title}>
            Walk up the hill, <span className="serif">one stop at a time.</span>
          </h2>
        </header>

        <ol className={styles.trail}>
          {units.map((unit, i) => (
            <Reveal as="li" key={unit.id} delay={i * 140} className={styles.stop}>
              <Link href={`/learn#${unit.id}`} className={`${styles.card} ${styles[unit.color]}`}>
                <span className={styles.number}>{unit.number}</span>
                <span className={`deva ${styles.deva}`}>{unit.kumaoni}</span>
                <span className={styles.unitTitle}>{unit.title}</span>
                <span className={styles.blurb}>{unit.blurb}</span>
                <span className={styles.meta}>
                  {unit.lessons.length} lesson{unit.lessons.length > 1 ? 's' : ''} ·{' '}
                  {unit.lessons.reduce((sum, l) => sum + l.xp, 0)} XP
                </span>
              </Link>
            </Reveal>
          ))}
          <li className={`${styles.stop} ${styles.summit}`} aria-label="More units coming soon">
            <span className={styles.flag}>More soon</span>
          </li>
        </ol>
      </div>
    </section>
  );
}

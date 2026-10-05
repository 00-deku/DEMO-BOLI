'use client';

import Link from 'next/link';
import BadgeMedal from '@/components/art/BadgeMedal';
import Button from '@/components/ui/Button';
import useProgress from '@/hooks/useProgress';
import { badges } from '@/data/badges';
import { units } from '@/data/lessons';
import styles from './LearnDashboard.module.css';

export default function LearnDashboard() {
  const { xp, streak, completed, badges: earned, reset } = useProgress();
  const totalLessons = units.reduce((sum, unit) => sum + unit.lessons.length, 0);

  return (
    <div className={`container ${styles.layout}`}>
      <aside className={styles.panel} aria-label="Your progress">
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{xp}</span>
            <span className={styles.statLabel}>XP</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{streak}</span>
            <span className={styles.statLabel}>Day streak</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {completed.length}/{totalLessons}
            </span>
            <span className={styles.statLabel}>Lessons</span>
          </div>
        </div>

        <h2 className={styles.panelTitle}>Badges</h2>
        <div className={styles.badges}>
          {badges.map((badge) => (
            <BadgeMedal key={badge.id} badge={badge} earned={earned.includes(badge.id)} size="s" />
          ))}
        </div>

        {completed.length > 0 && (
          <button type="button" className={styles.reset} onClick={reset}>
            Reset demo progress
          </button>
        )}
      </aside>

      <div className={styles.units}>
        {units.map((unit) => (
          <section key={unit.id} id={unit.id} className={`${styles.unit} ${styles[unit.color]}`}>
            <header className={styles.unitHeader}>
              <span className={styles.unitNumber}>Unit {unit.number}</span>
              <span className={`deva ${styles.unitDeva}`}>{unit.kumaoni}</span>
              <h2 className={styles.unitTitle}>{unit.title}</h2>
              <p>{unit.blurb}</p>
            </header>
            <ol className={styles.lessons}>
              {unit.lessons.map((lesson, i) => {
                const done = completed.includes(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link href={`/learn/${lesson.id}`} className={`${styles.lesson} ${done ? styles.done : ''}`}>
                      <span className={styles.check} aria-hidden="true">
                        {done ? '✓' : i + 1}
                      </span>
                      <span className={styles.lessonText}>
                        <strong>{lesson.title}</strong>
                        <span>
                          {lesson.cards.length} words · {lesson.minutes} min · {lesson.xp} XP
                        </span>
                      </span>
                      <span className={styles.go}>{done ? 'Again' : 'Start'}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <div className={styles.more}>
          <p>More units are being written with Kumaoni speakers.</p>
          <Button href="/stories" variant="ink" size="s">
            Read stories meanwhile
          </Button>
        </div>
      </div>
    </div>
  );
}

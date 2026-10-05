'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import BadgeMedal from '@/components/art/BadgeMedal';
import Button from '@/components/ui/Button';
import useProgress from '@/hooks/useProgress';
import { badges } from '@/data/badges';
import { earnedBadges, loadProgress } from '@/lib/progress';
import Flashcard from './Flashcard';
import QuizCard from './QuizCard';
import Celebration from './Celebration';
import styles from './LessonPlayer.module.css';

// One lesson, start to finish: intro -> word cards -> quiz -> done.
// Every card and question is one "step", which drives the progress bar.
export default function LessonPlayer({ lesson, nextLesson }) {
  const { finishLesson } = useProgress();
  const steps = useMemo(
    () => [
      { type: 'intro' },
      ...lesson.cards.map((card) => ({ type: 'card', card })),
      ...lesson.quiz.map((question) => ({ type: 'quiz', question })),
    ],
    [lesson],
  );

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState(null);

  const step = steps[index];
  const isDone = result !== null;
  const progress = isDone ? 1 : index / steps.length;

  const next = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1);
      return;
    }
    const before = earnedBadges(loadProgress());
    const after = finishLesson(lesson.id, lesson.xp);
    const fresh = earnedBadges(after).filter((id) => !before.includes(id));
    setResult({ xp: after.xp, streak: after.streak.count, newBadges: fresh });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onAnswer = (wasRight) => {
    if (wasRight) setCorrect((c) => c + 1);
  };

  return (
    <div className={styles.page}>
      <div className={`container ${styles.top}`}>
        <Link href="/learn" className={styles.close} aria-label="Back to all lessons">
          ✕
        </Link>
        <div
          className={styles.bar}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <span className={styles.xp}>+{lesson.xp} XP</span>
      </div>

      <div className={`container ${styles.stage}`}>
        {isDone ? (
          <div className={styles.done}>
            <Celebration />
            <p className={`deva ${styles.doneDeva}`}>स्याबास!</p>
            <h1 className={styles.doneTitle}>Lesson done</h1>
            <p className={styles.doneText}>
              {correct} of {lesson.quiz.length} right first time. You now have <strong>{result.xp} XP</strong> and a{' '}
              <strong>{result.streak}-day</strong> streak.
            </p>
            {result.newBadges.length > 0 && (
              <div className={styles.newBadges}>
                <p className={styles.newBadgesLabel}>New badge!</p>
                {badges
                  .filter((badge) => result.newBadges.includes(badge.id))
                  .map((badge) => (
                    <BadgeMedal key={badge.id} badge={badge} />
                  ))}
              </div>
            )}
            <div className={styles.doneActions}>
              {nextLesson && (
                <Button href={`/learn/${nextLesson.id}`} size="l">
                  Next: {nextLesson.title}
                </Button>
              )}
              <Button href="/learn" variant="paper" size="l">
                Back to the trail
              </Button>
            </div>
          </div>
        ) : (
          <div key={index} className={styles.step}>
            {step.type === 'intro' && (
              <div className={styles.intro}>
                <p className={styles.unit}>
                  {lesson.unitTitle} · <span className="deva">{lesson.unitKumaoni}</span>
                </p>
                <h1 className={styles.introTitle}>{lesson.title}</h1>
                <p className={styles.introText}>{lesson.intro}</p>
                <p className={styles.introMeta}>
                  {lesson.cards.length} words · {lesson.quiz.length} questions · about {lesson.minutes} minutes
                </p>
                <Button onClick={next} size="l">
                  Let&apos;s begin
                </Button>
              </div>
            )}

            {step.type === 'card' && (
              <>
                <Flashcard card={step.card} />
                <Button onClick={next} size="l" className={styles.continue}>
                  Got it
                </Button>
              </>
            )}

            {step.type === 'quiz' && <QuizCard question={step.question} onAnswer={onAnswer} onContinue={next} />}
          </div>
        )}
      </div>
    </div>
  );
}

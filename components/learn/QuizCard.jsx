'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import styles from './QuizCard.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

// One multiple-choice question. A wrong pick shakes and reveals the right
// answer; either way the learner moves on with "Continue".
export default function QuizCard({ question, onAnswer, onContinue }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  const right = picked === question.answer;

  const choose = (i) => {
    if (answered) return;
    setPicked(i);
    onAnswer(i === question.answer);
  };

  const stateOf = (i) => {
    if (!answered) return '';
    if (i === question.answer) return styles.correct;
    if (i === picked) return styles.wrong;
    return styles.dim;
  };

  return (
    <div className={styles.quiz}>
      <p className={styles.label}>Quick check</p>
      <h2 className={styles.prompt}>{question.prompt}</h2>

      <div className={styles.options} role="radiogroup" aria-label="Answers">
        {question.options.map((option, i) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={picked === i}
            className={`${styles.option} ${stateOf(i)}`}
            onClick={() => choose(i)}
            disabled={answered && i !== picked && i !== question.answer}
          >
            <span className={styles.letter}>{LETTERS[i]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div className={`${styles.feedback} ${right ? styles.good : styles.bad}`} role="status">
          <p>
            {right ? (
              <>
                <strong>Bhal!</strong> That&apos;s right.
              </>
            ) : (
              <>
                <strong>Not quite.</strong> The answer is “{question.options[question.answer]}”.
              </>
            )}
          </p>
          <Button onClick={onContinue} variant={right ? 'fire' : 'ink'}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  completeLesson,
  earnedBadges,
  emptyProgress,
  liveStreak,
  loadProgress,
  PROGRESS_EVENT,
  saveProgress,
} from '@/lib/progress';

// Reads and updates learner progress. Starts with empty progress on the
// server render, then loads the saved copy after mount (avoids hydration
// mismatches).
export default function useProgress() {
  const [progress, setProgress] = useState(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);

    // Another component (or another tab) saved progress: reload it.
    const sync = () => setProgress(loadProgress());
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const finishLesson = useCallback((lessonId, xp) => {
    const next = completeLesson(loadProgress(), lessonId, xp);
    saveProgress(next);
    return next;
  }, []);

  const reset = useCallback(() => saveProgress(emptyProgress), []);

  return {
    ready,
    progress,
    xp: progress.xp,
    streak: liveStreak(progress),
    completed: progress.completed,
    badges: earnedBadges(progress),
    finishLesson,
    reset,
  };
}

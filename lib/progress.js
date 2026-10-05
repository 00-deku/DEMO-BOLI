// Pure functions for learner progress (XP, streak, completed lessons).
// No backend yet, so progress lives in the browser's localStorage.

import { badges } from '@/data/badges';

export const STORAGE_KEY = 'boli.progress.v1';
// Fired on window after every save, so the navbar and pages stay in sync.
export const PROGRESS_EVENT = 'boli:progress';

export const emptyProgress = {
  xp: 0,
  completed: [],
  streak: { count: 0, lastDay: null },
};

// "2026-10-05" in the learner's local time zone.
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysBetween(a, b) {
  const ms = new Date(`${b}T00:00:00`) - new Date(`${a}T00:00:00`);
  return Math.round(ms / 86400000);
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw);
    return {
      ...emptyProgress,
      ...parsed,
      streak: { ...emptyProgress.streak, ...(parsed.streak || {}) },
    };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Private mode or storage blocked: progress just won't persist.
  }
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: progress }));
}

// The streak still counts if you practised today or yesterday.
export function liveStreak(progress, today = dayKey()) {
  const { lastDay, count } = progress.streak;
  if (!lastDay) return 0;
  return daysBetween(lastDay, today) <= 1 ? count : 0;
}

export function completeLesson(progress, lessonId, xp, today = dayKey()) {
  const firstTime = !progress.completed.includes(lessonId);
  const { lastDay, count } = progress.streak;

  let streakCount = count;
  if (!lastDay) streakCount = 1;
  else {
    const gap = daysBetween(lastDay, today);
    if (gap === 1) streakCount = count + 1;
    else if (gap > 1) streakCount = 1;
  }

  return {
    xp: progress.xp + (firstTime ? xp : Math.round(xp / 4)),
    completed: firstTime ? [...progress.completed, lessonId] : progress.completed,
    streak: { count: streakCount, lastDay: today },
  };
}

export function earnedBadges(progress) {
  const view = { ...progress, streak: { ...progress.streak, count: liveStreak(progress) } };
  return badges.filter((badge) => badge.check(view)).map((badge) => badge.id);
}

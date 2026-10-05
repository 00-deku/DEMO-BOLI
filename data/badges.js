// Badges are drawn from three visual traditions: Aipan (Kumaon),
// Madhubani (Mithila) and Himalayan landscape motifs.
// `check` receives the learner's progress object and returns true when earned.

export const badges = [
  {
    id: 'pailaag',
    name: 'Pailaag',
    motif: 'aipan',
    description: 'Finish your first lesson.',
    check: (p) => p.completed.length >= 1,
  },
  {
    id: 'chowki',
    name: 'Chowki',
    motif: 'chowki',
    description: 'Finish three lessons. Named after the Aipan square drawn for rituals.',
    check: (p) => p.completed.length >= 3,
  },
  {
    id: 'machhi',
    name: 'Machhi',
    motif: 'madhubani',
    description: 'Keep a three-day streak. In Madhubani art the fish stands for good fortune.',
    check: (p) => p.streak.count >= 3,
  },
  {
    id: 'bugyal',
    name: 'Bugyal',
    motif: 'himalaya',
    description: 'Earn 100 XP. Bugyals are the high meadows above the tree line.',
    check: (p) => p.xp >= 100,
  },
  {
    id: 'diyo',
    name: 'Diyo',
    motif: 'diyo',
    description: 'Keep a seven-day streak so the lamp stays lit.',
    check: (p) => p.streak.count >= 7,
  },
];

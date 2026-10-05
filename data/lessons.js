// Demo lesson content for the Kumaoni pilot.
//
// IMPORTANT: this vocabulary is placeholder content written for the prototype.
// Spellings, romanisation and meanings must be checked by native Kumaoni
// speakers before any public release. See docs/CONTENT.md.

export const units = [
  {
    id: 'pailaag',
    number: 1,
    title: 'Greetings',
    kumaoni: 'पैलाग',
    blurb: 'How to greet elders, ask how someone is, and say your name.',
    color: 'sindoor',
    lessons: [
      {
        id: 'greet-elders',
        title: 'Greeting your elders',
        minutes: 3,
        xp: 20,
        intro:
          'In Kumaon you do not just say hello to an elder, you show respect. One word does both.',
        cards: [
          {
            deva: 'पैलाग',
            roman: 'pailaag',
            meaning: 'A respectful greeting to elders',
            note: 'Said while bowing or touching an elder’s feet. Elders often reply with a blessing.',
          },
          {
            deva: 'कस छा?',
            roman: 'kas chha?',
            meaning: 'How are you? (respectful)',
            note: 'The respectful form, good for elders and people you have just met.',
          },
          {
            deva: 'भल छु',
            roman: 'bhal chhu',
            meaning: 'I am well',
            note: '“Bhal” means good or well. You will hear it everywhere.',
          },
        ],
        quiz: [
          {
            prompt: 'You meet Baujyu at the village gate. What do you say first?',
            options: ['Bhal chhu', 'Pailaag', 'Kaafal'],
            answer: 1,
          },
          {
            prompt: 'Baujyu asks “Kas chha?”. How do you answer?',
            options: ['Bhal chhu', 'Pailaag', 'Ija'],
            answer: 0,
          },
        ],
      },
      {
        id: 'my-name',
        title: 'Saying your name',
        minutes: 3,
        xp: 20,
        intro: 'Asking a name and giving your own is the first real conversation.',
        cards: [
          {
            deva: 'तुमर नाम के छ?',
            roman: 'tumar naam ke chha?',
            meaning: 'What is your name?',
            note: '“Tumar” is “your”. “Ke” asks “what”.',
          },
          {
            deva: 'म्यर नाम … छ',
            roman: 'myar naam … chha',
            meaning: 'My name is …',
            note: 'Put your name in the gap: “Myar naam Asha chha.”',
          },
        ],
        quiz: [
          {
            prompt: 'Which phrase asks someone their name?',
            options: ['Myar naam chha', 'Tumar naam ke chha?', 'Bhal chhu'],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'ghar',
    number: 2,
    title: 'Family',
    kumaoni: 'घर-परिवार',
    blurb: 'The people around the hearth: mother, grandparents, siblings.',
    color: 'saffron',
    lessons: [
      {
        id: 'family-words',
        title: 'Who is at home?',
        minutes: 4,
        xp: 25,
        intro: 'Family words come first, because they are the words you hear first.',
        cards: [
          { deva: 'इजा', roman: 'ija', meaning: 'Mother', note: 'Often the first word a child says.' },
          { deva: 'आमा', roman: 'aama', meaning: 'Grandmother', note: 'Keeper of songs, recipes and scoldings.' },
          { deva: 'बुबु', roman: 'bubu', meaning: 'Grandfather', note: 'Baujyu would like you to know he is a very good bubu.' },
          { deva: 'दाज्यू', roman: 'daajyu', meaning: 'Elder brother', note: 'Also a respectful way to address an older man.' },
        ],
        quiz: [
          { prompt: 'What does “ija” mean?', options: ['Grandmother', 'Mother', 'Elder brother'], answer: 1 },
          { prompt: 'Who is “aama”?', options: ['Grandmother', 'Sister', 'Aunt'], answer: 0 },
        ],
      },
    ],
  },
  {
    id: 'bhaat',
    number: 3,
    title: 'Food',
    kumaoni: 'भात-पाणि',
    blurb: 'Rice, water and the wild berry every Kumaoni child dreams about.',
    color: 'umber',
    lessons: [
      {
        id: 'kitchen',
        title: 'In aama’s kitchen',
        minutes: 3,
        xp: 20,
        intro: 'You cannot visit a Kumaoni home without being fed. Learn what you are being offered.',
        cards: [
          { deva: 'भात', roman: 'bhaat', meaning: 'Cooked rice', note: 'The centre of most meals.' },
          { deva: 'पाणि', roman: 'paani', meaning: 'Water', note: 'Written with “ण”, unlike Hindi “पानी”.' },
          { deva: 'काफल', roman: 'kaafal', meaning: 'Bayberry, a wild summer fruit', note: 'There is a famous folk song about kaafal ripening in the hills.' },
        ],
        quiz: [
          { prompt: 'Aama offers you “bhaat”. What is it?', options: ['Water', 'Rice', 'Berries'], answer: 1 },
          { prompt: 'Which one is a fruit?', options: ['Kaafal', 'Paani', 'Bhaat'], answer: 0 },
        ],
      },
    ],
  },
];

export const allLessons = units.flatMap((unit) =>
  unit.lessons.map((lesson) => ({
    ...lesson,
    unitId: unit.id,
    unitTitle: unit.title,
    unitKumaoni: unit.kumaoni,
  })),
);

export function getLesson(id) {
  return allLessons.find((lesson) => lesson.id === id) || null;
}

export function getNextLesson(id) {
  const index = allLessons.findIndex((lesson) => lesson.id === id);
  return index >= 0 && index < allLessons.length - 1 ? allLessons[index + 1] : null;
}

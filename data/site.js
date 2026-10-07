// Site-wide copy and navigation. Change words here, not inside components.

export const site = {
  name: 'Boli',
  tagline: "A gamified learning platform for India's endangered mother tongues.",
  pilotLanguage: 'Kumaoni',
  region: 'Kumaon, Uttarakhand',
};

export const navLinks = [
  { href: '/', label: 'Home', kumaoni: 'घर' },
  { href: '/learn', label: 'Learn', kumaoni: 'पाठ' },
  { href: '/stories', label: 'Stories', kumaoni: 'कथा' },
  { href: '/baujyu', label: 'Baujyu', kumaoni: 'बौज्यू' },
];

export const manifesto =
  'Every mother tongue is a way of seeing. Kumaoni carries the mountains, the monsoon, the jokes of grandparents and the songs of Harela. When a language goes quiet, a whole world goes quiet with it. Boli exists so that it does not.';

export const features = [
  {
    key: 'lessons',
    title: 'Small lessons',
    kumaoni: 'नान पाठ',
    body: 'Three-minute lessons on words, phrases, pronunciation and a little grammar. Short enough for a chai break.',
    motif: 'aipan',
  },
  {
    key: 'stories',
    title: 'Stories & folklore',
    kumaoni: 'कथा',
    body: 'Festivals, ballads and village tales, so every word you learn has somewhere to live.',
    motif: 'himalaya',
  },
  {
    key: 'play',
    title: 'XP, streaks, badges',
    kumaoni: 'खेल',
    body: 'Earn badges drawn from Aipan, Madhubani and Himalayan motifs. Keep your diyo lit with a daily streak.',
    motif: 'madhubani',
  },
  {
    key: 'baujyu',
    title: 'Baujyu',
    kumaoni: 'बौज्यू',
    body: 'A warm, slightly cheeky Kumaoni grandfather who teaches by talking with you. He is still learning to talk.',
    motif: 'topi',
  },
];

// Short retellings written for the prototype. Each should be reviewed with
// community storytellers before release. See docs/CONTENT.md.

export const stories = [
  {
    slug: 'ghughutiya',
    title: 'Ghughutiya',
    kumaoni: 'घुघुतिया',
    kind: 'Festival',
    season: 'Winter · Makar Sankranti',
    palette: 'saffron',
    excerpt: 'The morning children of Kumaon wear sweets around their necks and call the crows home.',
    body: [
      'On the morning of Makar Sankranti, children across Kumaon wake up wearing garlands. The garlands are not flowers. They are ghughute: little sweets of flour and jaggery, fried and shaped like drums, swords and knots.',
      'The children run to the rooftops and courtyards and call out to the crows: “Kale kauwa kale!” The crows are invited to come and eat, and to carry the cold of winter away with them.',
      'Grandparents tell different versions of why. In some, a crow once saved a prince. In others, the birds simply deserve thanks for surviving the snow with us. Everyone agrees on one thing: the children get to eat the leftover ghughute.',
    ],
    words: [
      { deva: 'कौव', roman: 'kauw', meaning: 'Crow' },
      { deva: 'घुघुत', roman: 'ghughut', meaning: 'The festival sweet' },
    ],
  },
  {
    slug: 'phool-dei',
    title: 'Phool Dei',
    kumaoni: 'फूल देई',
    kind: 'Festival',
    season: 'Spring · Chaitra',
    palette: 'marigold',
    excerpt: 'In early spring, children leave fresh flowers on every doorstep in the village.',
    body: [
      'When the first rhododendrons and wild flowers open in Chaitra, children gather baskets of petals before sunrise.',
      'They go from house to house and scatter flowers on each threshold, singing a blessing for the home. The families give them rice, jaggery and coins in return.',
      'It is a festival with no priests and no temple. The children are the ones who bless the village.',
    ],
    words: [
      { deva: 'फूल', roman: 'phool', meaning: 'Flower' },
      { deva: 'देई', roman: 'dei', meaning: 'Threshold, doorstep' },
    ],
  },
  {
    slug: 'harela',
    title: 'Harela',
    kumaoni: 'हरेला',
    kind: 'Festival',
    season: 'Monsoon · Shravan',
    palette: 'umber',
    excerpt: 'Seeds are sown in small baskets and grown in the dark for nine days. Then the green is worn as a blessing.',
    body: [
      'About ten days before the festival, families sow five or seven kinds of grain in small baskets of soil and keep them in a dark corner of the house.',
      'On the day of Harela, the pale green shoots are cut. Elders place them on the heads of the young and give a blessing that they grow tall and live long, like the deodar.',
      'Today Harela is also a day for planting trees across Uttarakhand.',
    ],
    words: [
      { deva: 'हरिय', roman: 'hariy', meaning: 'Green' },
      { deva: 'बीज', roman: 'beej', meaning: 'Seed' },
    ],
  },
  {
    slug: 'golu-devta',
    title: 'Golu Devta',
    kumaoni: 'गोल्ज्यू',
    kind: 'Folk deity',
    season: 'All year',
    palette: 'sindoor',
    excerpt: 'The god of justice who reads your letters. His temples ring with thousands of bells.',
    body: [
      'Golu Devta, called Goljyu with affection, is remembered as a just king who became a god of justice.',
      'At his temples, people write their troubles on paper and hang the letters on the walls, like petitions to a court. When a wish is granted, they come back and tie a bell.',
      'Walk into the temple at Chitai near Almora and you walk under thousands of bells, each one a story that ended well.',
    ],
    words: [
      { deva: 'घांड', roman: 'ghaand', meaning: 'Bell' },
      { deva: 'न्याय', roman: 'nyaay', meaning: 'Justice' },
    ],
  },
];

export function getStory(slug) {
  return stories.find((story) => story.slug === slug) || null;
}

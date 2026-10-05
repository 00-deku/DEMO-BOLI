# `data/`: all the content

Writers and language experts can edit these files without touching components.

| File | Holds |
| --- | --- |
| `site.js` | Site name, navigation, marquee words, manifesto, home-page feature cards |
| `lessons.js` | Units → lessons → word cards and quiz questions; helpers `getLesson`, `getNextLesson` |
| `stories.js` | Stories (title, Devanagari title, season, paragraphs, words to keep) |
| `badges.js` | Badges and the rule (`check`) that unlocks each one |
| `baujyu.js` | The companion's character sheet and open questions |

## Add a lesson

Add an object to the `lessons` array of a unit in `lessons.js`:

```js
{
  id: 'numbers-1',            // becomes /learn/numbers-1 (must be unique)
  title: 'Counting to five',
  minutes: 3,
  xp: 20,
  intro: 'One line that sets the scene.',
  cards: [
    { deva: '…', roman: '…', meaning: '…', note: 'optional tip' },
  ],
  quiz: [
    { prompt: 'Question?', options: ['A', 'B', 'C'], answer: 1 }, // index of the right option
  ],
}
```

The route, the dashboard and the home-page trail update automatically.

> ⚠️ All Kumaoni here is placeholder content and needs review by native speakers. See [`docs/CONTENT.md`](../docs/CONTENT.md).

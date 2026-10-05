# Content and project brief

## 1. Project concept

**Boli** is *a gamified learning platform for India's endangered mother tongues.*

The first pilot language is **Kumaoni** (Uttarakhand). Learning should feel **personal and cultural**, not like a textbook or a dictionary. It uses short interactive lessons, an AI companion, and Indian regional art as the visual language.

## 2. Main features

| Feature | Status in this prototype |
| --- | --- |
| Short interactive lessons: vocabulary, phrases, pronunciation, basic grammar | ✅ Vocabulary and phrases (flip cards + quiz). Pronunciation audio not yet recorded. |
| Cultural content, stories and folklore | ✅ Four short retellings with vocabulary |
| Gamification: XP, streaks, badges (Aipan, Madhubani, Himalayan motifs) | ✅ Working in the browser (localStorage) |
| Baujyu, an AI companion who teaches through conversation | 🚧 Character sheet and static chat mock-up only. **Not built.** |

## 3. Baujyu: character and role

- A **warm, patient, slightly humorous Kumaoni grandfather**. His job is to teach Kumaoni language and culture **through conversation**, not to answer random questions.
- **Look:** Pahadi topi, white hair and curled mustache, dark vest, off-white kurta, patterned shawl, warm earthy palette. A 2D version came first, then a 3D version in the same style on a cream background.
- The 2D portrait in this repo is `components/art/BaujyuPortrait.jsx`. His data is in `data/baujyu.js`.

### Open gap in the brief

The personality section of the original brief was **cut off mid-way**. These still need to be written before the companion is built:

- [ ] **Teaching approach**: how he introduces new words, how often he repeats, how he corrects.
- [ ] **Sample dialogue**: a few complete example conversations at beginner level.
- [ ] **Speaking rules**: how much Kumaoni versus English or Hindi, sentence length, tone, what he refuses to talk about.

These appear as an "unfinished page" on `/baujyu` so the gap stays visible.

## 4. Language accuracy ⚠️

All Kumaoni vocabulary, Devanagari spellings, romanisations and story retellings in `data/` are **placeholder content** written for the prototype. Kumaoni varies from valley to valley, and several words here may have regional alternatives.

Before any public release:

1. Have every word in `data/lessons.js`, `data/stories.js` and `data/site.js` checked by **native Kumaoni speakers**, ideally from more than one region.
2. Agree on one **romanisation scheme** and apply it everywhere.
3. Record **native-speaker audio** for every word card.
4. Review story retellings with **community storytellers** and credit them.

## 5. Current vocabulary

| Kumaoni | Romanised | Meaning | Lesson |
| --- | --- | --- | --- |
| पैलाग | pailaag | Respectful greeting to elders | greet-elders |
| कस छा? | kas chha? | How are you? (respectful) | greet-elders |
| भल छु | bhal chhu | I am well | greet-elders |
| तुमर नाम के छ? | tumar naam ke chha? | What is your name? | my-name |
| म्यर नाम … छ | myar naam … chha | My name is … | my-name |
| इजा | ija | Mother | family-words |
| आमा | aama | Grandmother | family-words |
| बुबु | bubu | Grandfather | family-words |
| दाज्यू | daajyu | Elder brother | family-words |
| भात | bhaat | Cooked rice | kitchen |
| पाणि | paani | Water | kitchen |
| काफल | kaafal | Bayberry (wild summer fruit) | kitchen |

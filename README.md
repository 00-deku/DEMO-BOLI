# Boli · बोलि

**A gamified learning platform for India's endangered mother tongues.**
The first pilot language is **Kumaoni**, spoken in the Kumaon hills of Uttarakhand.

This repository holds the **frontend prototype**: a Next.js + React website with three.js scenes, hand-built SVG art and a working demo of the lesson flow. There is no backend yet, and **Baujyu, the AI companion, is not built**. Only his character page and a static mock-up of the chat screen are included.

---

## Contents

- [What's in the prototype](#whats-in-the-prototype)
- [Tech stack (and what is deliberately not used)](#tech-stack)
- [Run it locally](#run-it-locally)
- [Project structure](#project-structure)
- [How the pieces fit together](#how-the-pieces-fit-together)
- [Design language](#design-language)
- [Editing content](#editing-content)
- [Roadmap](#roadmap)
- [Learning resources](#learning-resources)

---

## What's in the prototype

| Page | Route | What it does |
| --- | --- | --- |
| Home | `/` | Hero with a **three.js Himalayan ridge scene** behind an SVG Kumaoni village, a scrolling word marquee, a manifesto that lights up word by word as you scroll, feature cards, Baujyu intro, the lesson trail, badges, stories, and a **three.js Aipan mandala** call to action. |
| Learn | `/learn` | Progress panel (XP, streak, badges) and all units and lessons. |
| Lesson | `/learn/[lessonId]` | A short lesson: intro → 3D flip word cards → multiple-choice quiz → celebration. XP and streak are saved in the browser. |
| Stories | `/stories` | Festivals and folklore as poster cards. |
| Story | `/stories/[slug]` | A retold story with "words to keep". |
| Baujyu | `/baujyu` | Character sheet for the companion, open questions from the brief, and a static chat mock-up. |

**Gamification in the demo**

- **XP**: full XP the first time you finish a lesson, a quarter on repeats.
- **Streak**: goes up when you practise on consecutive days, resets after a missed day.
- **Badges**: *Pailaag*, *Chowki* (Aipan), *Machhi* (Madhubani fish), *Bugyal* (Himalayan meadow), *Diyo* (lamp).

Progress is stored in `localStorage` under `boli.progress.v1`. Clear it with the "Reset demo progress" link on `/learn`.

---

## Tech stack

| Tool | Version | Used for |
| --- | --- | --- |
| [Next.js](https://nextjs.org/) (App Router) | 14.2 | Routing, static pre-rendering, font loading |
| [React](https://react.dev/) | 18.3 | Components and state |
| [three.js](https://threejs.org/) | 0.169 | The two WebGL scenes (mountains, Aipan mandala) |
| HTML + CSS | n/a | CSS Modules for each component, one global stylesheet for design tokens |

**Deliberately not used:** TypeScript, Tailwind, UI kits, animation libraries (GSAP, Framer Motion), react-three-fiber, or GLSL shaders. Every animation is plain CSS, a little React state, or three.js's built-in materials. That keeps the project easy to read for anyone who knows HTML, CSS and JavaScript.

---

## Run it locally

You need **Node.js 18.17 or newer** ([download](https://nodejs.org/)).

```bash
git clone https://github.com/00-deku/DEMO-BOLI.git
cd DEMO-BOLI
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (pre-renders every page) |
| `npm start` | Serve the production build |

---

## Project structure

```
DEMO-BOLI/
├── app/                      # Routes (Next.js App Router). One folder = one URL.
│   ├── layout.jsx            # Shared shell: fonts, navbar, footer
│   ├── globals.css           # Design tokens (colours, gradients, type) + resets
│   ├── page.jsx              # Home page: stacks the home sections
│   ├── learn/                # /learn and /learn/[lessonId]
│   ├── stories/              # /stories and /stories/[slug]
│   ├── baujyu/               # /baujyu
│   └── not-found.jsx         # 404 page
├── components/
│   ├── layout/               # Navbar, Footer, PageHeader
│   ├── home/                 # One file per home-page section
│   ├── learn/                # LessonPlayer, Flashcard, QuizCard, dashboard
│   ├── stories/              # StoryCard
│   ├── baujyu/               # Chat mock-up
│   ├── three/                # React wrappers that mount three.js scenes
│   ├── art/                  # Hand-drawn SVG: Baujyu, village, motifs, badges
│   └── ui/                   # Button, Reveal (scroll animation), SectionTag
├── data/                     # All words, lessons, stories, badges, copy
├── hooks/                    # useThreeScene, useProgress, useReveal
├── lib/
│   ├── progress.js           # XP / streak / badge logic (pure functions)
│   └── three/                # The three.js scenes themselves
├── docs/                     # Longer write-ups (architecture, design, content, resources)
└── public/                   # Static files (favicon)
```

Each main folder has its own short `README.md` explaining what lives there.

---

## How the pieces fit together

```
data/*.js  ──►  pages in app/  ──►  components/  ──►  CSS Modules
                                     │
                                     ├─► hooks/useProgress ─► lib/progress ─► localStorage
                                     └─► components/three ─► hooks/useThreeScene ─► lib/three/*
```

- **Content is data.** Words, lessons, stories and badges live in `data/`. Components only render them.
- **Server first.** Pages are React Server Components and are pre-rendered at build time. Only parts that need the browser (scroll effects, lessons, three.js, the navbar menu) are marked `'use client'`.
- **three.js scenes are plain functions** in `lib/three/`. They receive `{ THREE, scene, camera, pointer, ... }` and return `update()`. The `useThreeScene` hook owns the renderer, resizing, pausing when off-screen, `prefers-reduced-motion`, and cleanup.

More detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Design language

The brief asked for something that **feels like art, not a template**, in shades of **orange, red, white, black and brown**, in the spirit of illustrated, scroll-driven sites like *edhseries.com*.

- **Palette:** sindoor red, saffron, marigold, haldi, geru (red ochre), umber, bark, soot and ink, on cream paper.
- **Visual sources:** Aipan (white rice-paste patterns on geru), Madhubani line work, and Himalayan ridgelines.
- **Type:** Rubik (chunky display), Fraunces italic (warm accent), Tiro Devanagari Hindi (Kumaoni script).
- **Texture:** thick ink outlines, hard offset shadows, slight tilts and a paper-grain overlay, so it looks printed rather than digital.
- **Motion:** parallax mountains, drifting marigold petals, word-by-word scroll reveal, flip cards, a blinking and nodding Baujyu. Everything respects `prefers-reduced-motion`.

More detail: [docs/DESIGN.md](docs/DESIGN.md).

---

## Editing content

| To change… | Edit |
| --- | --- |
| Lessons, words, quiz questions | `data/lessons.js` |
| Stories | `data/stories.js` |
| Badges and their unlock rules | `data/badges.js` |
| Baujyu's character sheet | `data/baujyu.js` |
| Navigation, marquee words, home-page copy | `data/site.js` |

> ⚠️ **Language accuracy:** the Kumaoni words and story retellings are **placeholder content** written for the prototype. They must be checked by native speakers before any public release. See [docs/CONTENT.md](docs/CONTENT.md).

---

## Roadmap

- [ ] Native-speaker review of all vocabulary and stories
- [ ] Recorded pronunciation audio for every word
- [ ] Baujyu: finish the personality section (teaching approach, sample dialogue, speaking rules), then build the conversational companion
- [ ] Baujyu 3D model in the same style as the 2D reference
- [ ] Backend: accounts, synced progress, content management
- [ ] More units (numbers, village life, festivals) and more languages

---

## Learning resources

New to any of this? Start here. A longer, annotated list is in [docs/RESOURCES.md](docs/RESOURCES.md).

**Next.js and React**
- [Next.js docs](https://nextjs.org/docs) and the free [Next.js Learn course](https://nextjs.org/learn)
- [App Router: routing basics](https://nextjs.org/docs/app/building-your-application/routing)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [React: Quick Start](https://react.dev/learn) and [Thinking in React](https://react.dev/learn/thinking-in-react)

**three.js**
- [three.js manual](https://threejs.org/manual/) (start with "Fundamentals")
- [three.js docs](https://threejs.org/docs/) and [examples](https://threejs.org/examples/)
- [Discover three.js](https://discoverthreejs.com/), a free online book

**CSS**
- [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) and [3D transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms)

**Culture and language**
- [Kumaoni language](https://en.wikipedia.org/wiki/Kumaoni_language)
- [Aipan](https://en.wikipedia.org/wiki/Aipan) · [Madhubani art](https://en.wikipedia.org/wiki/Madhubani_art)
- [UNESCO World Atlas of Languages](https://en.wal.unesco.org/)

---

*Frontend prototype. Built with Next.js, React and three.js.*

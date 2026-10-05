# `components/`

Every component is a `.jsx` file with a matching `.module.css` file next to it.

| Folder | What's inside |
| --- | --- |
| `layout/` | `Navbar` (sticker logo, pill nav, XP chip, full-screen menu), `Footer`, `PageHeader` (banner for inner pages) |
| `home/` | One file per home-page section, in page order: `Hero`, `Marquee`, `Manifesto`, `Features`, `BaujyuIntro`, `LessonTrail`, `BadgeShelf`, `StoriesStrip`, `FinalCta` |
| `learn/` | `LearnDashboard`, `LessonPlayer` (the step machine), `Flashcard` (3D flip), `QuizCard`, `Celebration` (petal shower) |
| `stories/` | `StoryCard` |
| `baujyu/` | `ChatPreview` (static mock-up, no AI) |
| `three/` | `HillsCanvas`, `AipanCanvas`: tiny React wrappers around the scenes in `lib/three/` |
| `art/` | Hand-written SVG illustrations: `BaujyuPortrait`, `VillageScene`, `Motif` (aipan, chowki, madhubani, himalaya, topi, diyo), `AipanBorder`, `BadgeMedal` |
| `ui/` | Small building blocks: `Button`, `Reveal` (scroll-in animation), `SectionTag` |

## Conventions

- **Server by default.** Add `'use client'` only when a component needs state, effects or browser APIs.
- **No hard-coded content.** Text that a writer might change belongs in `data/`.
- **Colours come from tokens** (`var(--sindoor)`, `var(--grad-fire)`…) defined in `app/globals.css`.
- To style a global class inside a module, use `:global(.className)`.

**Learn more:** [Thinking in React](https://react.dev/learn/thinking-in-react) · [CSS Modules](https://github.com/css-modules/css-modules)

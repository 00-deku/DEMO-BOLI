# `components/`

Every component is a `.jsx` file with a matching `.module.css` file next to it.

| Folder | What's inside |
| --- | --- |
| `layout/` | `Navbar` (BOLI wordmark top-left + slim vertical rail on the right with one icon per page), `Footer`, `PageHeader` (banner for inner pages) |
| `home/` | One file per home-page section, in page order: `Opening`, `Hero`, `Manifesto`, `Features`, `BaujyuIntro`, `LessonTrail`, `BadgeShelf`, `StoriesStrip` |
| `learn/` | `LearnDashboard`, `LessonPlayer` (the step machine), `Flashcard` (3D flip), `QuizCard`, `Celebration` (petal shower) |
| `stories/` | `StoryCard` |
| `baujyu/` | `ChatPreview` (static mock-up, no AI) |
| `motion/` | `SmoothScroll` (Lenis, mounted once in the layout), `Parallax` (wrap anything to give it scroll depth) |
| `three/` | `HillsCanvas`, `AipanCanvas`: tiny React wrappers around the scenes in `lib/three/` |
| `art/` | `Wordmark` (BOLI in the display font with a diya for the O; used in the navbar, hero and footer), hand-written SVG illustrations: `BaujyuPortrait`, `VillageScene`, `Ridges` (static ridgeline section edge), `Motif` (aipan, chowki, madhubani, himalaya, topi, diyo), `AipanBorder`, `BadgeMedal` |
| `ui/` | Small building blocks: `Button`, `Reveal` (scroll-in animation), `SectionTag` |

## Conventions

- **Server by default.** Add `'use client'` only when a component needs state, effects or browser APIs.
- **No hard-coded content.** Text that a writer might change belongs in `data/`.
- **Colours come from tokens** (`var(--sindoor)`, `var(--grad-fire)`…) defined in `app/globals.css`.
- To style a global class inside a module, use `:global(.className)`.

**Learn more:** [Thinking in React](https://react.dev/learn/thinking-in-react) · [CSS Modules](https://github.com/css-modules/css-modules)

# Architecture

How the Boli frontend is put together, and why.

## 1. Rendering model

Boli uses the **Next.js App Router**. Every file named `page.jsx` inside `app/` becomes a URL:

| File | URL |
| --- | --- |
| `app/page.jsx` | `/` |
| `app/learn/page.jsx` | `/learn` |
| `app/learn/[lessonId]/page.jsx` | `/learn/greet-elders`, `/learn/my-name`, … |
| `app/stories/[slug]/page.jsx` | `/stories/harela`, … |
| `app/baujyu/page.jsx` | `/baujyu` |

Dynamic routes (`[lessonId]`, `[slug]`) export `generateStaticParams()`, so **every page is pre-rendered to static HTML at build time**. There is no server-side data fetching yet.

### Server vs client components

By default every component is a **Server Component**: it renders to HTML on the server and ships no JavaScript. A file only becomes a **Client Component** when it starts with `'use client'`. We do that only when the browser is needed:

| Client component | Why it needs the browser |
| --- | --- |
| `components/layout/Navbar.jsx` | Menu open/close state, scroll position, live XP |
| `components/home/Manifesto.jsx` | Scroll-linked word highlighting |
| `components/ui/Reveal.jsx` | IntersectionObserver for scroll reveals |
| `components/three/*` | WebGL canvas |
| `components/learn/*` (most) | Lesson state, localStorage |
| `components/art/BaujyuPortrait.jsx` | `useId` for unique SVG ids |

Server components can render client components (and pass them children), but not the other way round, unless the child is passed as `children`.

## 2. Data flow

```
data/lessons.js ─┐
data/stories.js ─┼─► app/**/page.jsx ─► components ─► HTML
data/badges.js  ─┤
data/site.js    ─┘
```

All content is plain JavaScript objects. To add a lesson, add an object to `units[].lessons` in `data/lessons.js`; the route, the dashboard and the home-page trail pick it up automatically.

## 3. Progress (XP, streak, badges)

```
LessonPlayer ──finishLesson()──► hooks/useProgress ──► lib/progress.completeLesson()
                                         │                        │
                                         ▼                        ▼
                                 window event "boli:progress"   localStorage["boli.progress.v1"]
                                         │
                                         ▼
                           Navbar / LearnDashboard re-read progress
```

- `lib/progress.js` holds **pure functions** (`completeLesson`, `liveStreak`, `earnedBadges`). They are easy to test and do not touch React.
- `hooks/useProgress.js` connects those functions to React state. It starts from empty progress on the first render (so server and client HTML match) and loads the saved copy after mount.
- After every save a `boli:progress` event is fired, so every mounted component that uses the hook stays in sync (the navbar updates the moment a lesson ends). The browser's `storage` event keeps other tabs in sync too.
- When a backend arrives, only `loadProgress` and `saveProgress` need to change.

## 4. three.js scenes

```
components/three/HillsCanvas.jsx ──► hooks/useThreeScene(buildHills) ──► lib/three/hills.js
components/three/AipanCanvas.jsx ──► hooks/useThreeScene(buildAipan) ──► lib/three/aipan.js
```

**`useThreeScene(setup)`** owns all the WebGL plumbing:

1. Creates a `WebGLRenderer` (transparent, so CSS gradients show behind it) and a camera.
2. Calls `setup(ctx)` once. `ctx` contains `THREE`, `scene`, `camera`, a smoothed `pointer` (−1…1), `scroll`, `size` and `reduceMotion`.
3. Resizes with a `ResizeObserver`.
4. Runs a `requestAnimationFrame` loop that **pauses when the canvas is off-screen** (IntersectionObserver) or the tab is hidden.
5. With `prefers-reduced-motion`, renders a single still frame instead of animating.
6. On unmount: cancels the loop, removes listeners, disposes every geometry, material and texture, and the renderer.

If WebGL is unavailable the hook quietly does nothing, and the CSS background behind the canvas still looks complete.

**Scene files** (`lib/three/*.js`) are plain functions with no React in them, so they can be tested in a bare HTML page.

## 5. Smooth scroll and parallax

```
app/layout.jsx ──► components/motion/SmoothScroll ──► Lenis ◄── gsap.ticker
                                                        │
                                                        └─► ScrollTrigger.update()
Hero / Parallax / GiantWord / Manifesto ──► useGSAP() ──► ScrollTrigger (scrub)
```

- **`lib/motion.js`** registers the GSAP plugins once and holds the Lenis instance (`getLenis()`), so the navbar can pause scrolling while the menu is open.
- **`SmoothScroll`** creates Lenis, feeds it from `gsap.ticker` and forwards Lenis scroll events to `ScrollTrigger.update`. On route change it jumps to the top and calls `ScrollTrigger.refresh()`.
- **`Parallax`** is a reusable wrapper: `<Parallax speed={0.2}>` moves its children between `-20%` and `+20%` of their own height as they cross the viewport. Positive = slower than the page (further away), negative = faster (closer). `axis="x"` slides sideways.
- **`GiantWord`** is a huge outlined Devanagari word behind a section, sliding sideways with `Parallax axis="x"`.
- **Hero** animates its own layers: the title and copy lift and fade, and each `<g data-depth>` group in `VillageScene` sinks by `depth × 260px` over the hero's height.
- Everything sits inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` and `useGSAP`, so it switches off for reduced motion and cleans up on unmount.

## 6. Styling

- `app/globals.css` holds **design tokens** (CSS custom properties), resets, the paper-grain overlay and a few utilities (`.container`, `.deva`, `.serif`, `.reveal`).
- Every component has its own **CSS Module** (`Component.module.css`). Class names are scoped automatically, so `.card` in one file never clashes with `.card` in another.
- To style a global class from inside a module, wrap it: `.lede :global(.serif) { … }`.

## 7. Accessibility notes

- All decorative canvases and SVGs are `aria-hidden`; meaningful SVGs (Baujyu, badges) have `<title>`.
- The menu closes with <kbd>Esc</kbd>, and its links are removed from the tab order while closed.
- Quiz options use `role="radio"`; feedback uses `role="status"` so screen readers announce it.
- `prefers-reduced-motion` turns off CSS animation, Lenis and all parallax, and stops the three.js loops.

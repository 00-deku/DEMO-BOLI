# `hooks/`: custom React hooks

| Hook | Returns | Used by |
| --- | --- | --- |
| `useThreeScene(setup)` | a `ref` for the container `<div>` | `components/three/*` |
| `useProgress()` | `{ xp, streak, completed, badges, finishLesson, reset, ready }` | Navbar, LearnDashboard, LessonPlayer |
| `useReveal(options)` | `[ref, visible]` | `components/ui/Reveal` |

## `useThreeScene`

Creates the WebGL renderer and camera, calls your scene's `setup(ctx)`, keeps it sized to its container, smooths the pointer, pauses when off-screen or when the tab is hidden, honours `prefers-reduced-motion`, and disposes everything on unmount. See [`lib/three/README.md`](../lib/three/README.md).

## `useProgress`

A thin React layer over the pure functions in `lib/progress.js`. It starts with empty progress (so the server-rendered HTML matches the first client render) and loads `localStorage` after mount. Every save fires a `boli:progress` window event, so all components using the hook stay in sync.

## `useReveal`

Uses an `IntersectionObserver` to flip `visible` to `true` the first time the element enters the viewport.

**Learn more:** [Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

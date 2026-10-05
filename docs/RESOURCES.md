# Resources

Everything used to build Boli, with places to learn more. Grouped from "start here" to "go deeper".

---

## Next.js

| Resource | Why read it |
| --- | --- |
| [Next.js documentation](https://nextjs.org/docs) | The official reference |
| [Next.js Learn](https://nextjs.org/learn) | Free, hands-on course; the best place to start |
| [Routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing) | How folders in `app/` become URLs |
| [Dynamic routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) | `[lessonId]` and `[slug]` folders |
| [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) | Pre-rendering every lesson and story at build time |
| [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering) | When to write `'use client'` |
| [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) | Page titles and descriptions |
| [Font optimisation (`next/font`)](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) | How Rubik, Fraunces and Tiro Devanagari are loaded |
| [CSS Modules in Next.js](https://nextjs.org/docs/app/building-your-application/styling/css) | Scoped `*.module.css` files |

## React

| Resource | Why read it |
| --- | --- |
| [React Quick Start](https://react.dev/learn) | Components, props, state in one page |
| [Thinking in React](https://react.dev/learn/thinking-in-react) | How to split a UI into components |
| [`useState`](https://react.dev/reference/react/useState) | Lesson steps, menu open/close |
| [`useEffect`](https://react.dev/reference/react/useEffect) | Mounting three.js, listening to scroll |
| [`useRef`](https://react.dev/reference/react/useRef) | Holding the canvas container and word nodes |
| [`useId`](https://react.dev/reference/react/useId) | Unique SVG ids in the Baujyu portrait |
| [Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) | The pattern behind `useThreeScene`, `useProgress`, `useReveal` |
| [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) | Why every effect cleans up after itself |

## three.js

| Resource | Why read it |
| --- | --- |
| [three.js manual: Fundamentals](https://threejs.org/manual/#en/fundamentals) | Scene, camera, renderer, mesh |
| [three.js documentation](https://threejs.org/docs/) | API reference |
| [three.js examples](https://threejs.org/examples/) | Hundreds of live demos with source |
| [Discover three.js](https://discoverthreejs.com/) | Free book; great on structuring an app |
| [Responsive design (manual)](https://threejs.org/manual/#en/responsive) | Resizing the canvas and camera, as `useThreeScene` does |
| [Cleanup (manual)](https://threejs.org/manual/#en/cleanup) | Disposing geometries, materials and textures |
| [`Shape` / `ShapeGeometry`](https://threejs.org/docs/#api/en/extras/core/Shape) | How the mountain ridges and lotus petals are drawn |
| [`Points` / `PointsMaterial`](https://threejs.org/docs/#api/en/objects/Points) | Marigold petals and Aipan dots |
| [`Fog`](https://threejs.org/docs/#api/en/scenes/Fog) | Atmospheric haze on the far ridges |
| [`CanvasTexture`](https://threejs.org/docs/#api/en/textures/CanvasTexture) | The round dot sprite drawn with the 2D canvas API |

## HTML, CSS and browser APIs

| Resource | Why read it |
| --- | --- |
| [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | Reference for everything in the stylesheets |
| [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) | The colour and spacing tokens |
| [MDN: CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) | Birds, smoke, blinking, marquee |
| [MDN: CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms) | The 3D flip cards (`perspective`, `backface-visibility`) |
| [MDN: `clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) | The circular menu wipe |
| [MDN: `background-clip: text`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip) | The gradient BOLI wordmark |
| [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) | Almost every layout |
| [MDN: SVG tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) | How the hand-drawn art is built |
| [MDN: SVG `<pattern>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern) | The Aipan border and Baujyu's shawl |
| [MDN: `feTurbulence`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence) | The paper-grain overlay |
| [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | Scroll reveals, pausing three.js off-screen |
| [MDN: `localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Saving XP and streaks |
| [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Respecting users who turn animation off |
| [CSS Modules](https://github.com/css-modules/css-modules) | The scoping idea behind `*.module.css` |

## Fonts

- [Rubik](https://fonts.google.com/specimen/Rubik)
- [Fraunces](https://fonts.google.com/specimen/Fraunces)
- [Tiro Devanagari Hindi](https://fonts.google.com/specimen/Tiro+Devanagari+Hindi)

## Culture, art and language

| Resource | Topic |
| --- | --- |
| [Kumaoni language (Wikipedia)](https://en.wikipedia.org/wiki/Kumaoni_language) | Overview, dialects, script |
| [Kumaon division (Wikipedia)](https://en.wikipedia.org/wiki/Kumaon_division) | The region |
| [Aipan (Wikipedia)](https://en.wikipedia.org/wiki/Aipan) | Kumaoni ritual floor and wall art |
| [Madhubani art (Wikipedia)](https://en.wikipedia.org/wiki/Madhubani_art) | Mithila painting tradition |
| [Harela (Wikipedia)](https://en.wikipedia.org/wiki/Harela) | Monsoon festival in the stories section |
| [Golu Devta (Wikipedia)](https://en.wikipedia.org/wiki/Golu_Devta) | Folk deity of justice |
| [UNESCO World Atlas of Languages](https://en.wal.unesco.org/) | Language vitality and endangerment data |

## Design inspiration

- [edhseries.com](https://www.edhseries.com/): illustrated, scroll-driven storytelling, bold type, framed cards.

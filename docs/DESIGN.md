# Design language

> Boli should feel like a painted courtyard wall, not a SaaS dashboard.

## 1. Direction

The visual brief: **art, not "AI slop"**. Illustrated, playful and scroll-driven, in the spirit of *edhseries.com* (flat illustrated scenes, chunky type, thick outlines, framed cards), but rooted in Kumaoni and wider Indian folk art.

Three visual sources:

| Source | What we borrow |
| --- | --- |
| **Aipan** (Kumaon) | White dots and lines on red ochre (*geru*): borders, the mandala scene, flashcard fronts, the threshold of the village house |
| **Madhubani** (Mithila) | Bold outlines, hatching and the fish motif: badges and feature icons |
| **Himalayan landscape** | Layered ridgelines, snow caps, deodars, slate-roofed stone houses: the hero |

## 2. Logo and icons

**Logo:** "B·L·I" in chunky, hand-drawn letters, with a **diya** (oil lamp) standing in for the O, a flame for light, and three leaves on the bowl for growth.

- Source artwork: `public/brand/boli-logo.png` (full wordmark) and `public/brand/diya.png` (lamp only), both transparent PNGs.
- `components/art/BoliLogo.jsx` uses them as a **CSS mask**, so the logo takes any `fill`: ink in the navbar, the fire gradient in the hero and footer.
- Favicons (`public/brand/favicon.png`, `apple-touch-icon.png`) are the diya in sindoor red on a cream tile.

**Icons** (`components/art/Motif.jsx`) follow the logo: **solid filled shapes with cut-out details**, like the leaves in the diya's bowl. Each icon is one SVG path with `fill-rule="evenodd"`, so inner shapes become holes.

| Icon | Used for |
| --- | --- |
| `home` (house with arched door) | Nav: Home |
| `book` (open book) | Nav: Learn |
| `himalaya` (peaks with snow, sun) | Nav: Stories, feature card, badge |
| `topi` (Pahadi cap) | Nav: Baujyu, feature card |
| `diyo` (the logo's lamp) | Streak badge, story card |
| `aipan` (lotus) | Feature card, first badge |
| `chowki` (ritual square) | Badge, story card |
| `madhubani` (fish) | Feature card, streak badge |

## 3. Colour

All colours are CSS custom properties in `app/globals.css`.

| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#140c08` | Outlines, text, darkest backgrounds |
| `--soot` | `#26110a` | Nearest ridge, deep shadows |
| `--umber` | `#3a1d10` | Roofs, dark gradients |
| `--bark` | `#5a2414` | Stone walls, Baujyu card |
| `--clay` | `#9f3519` | Geru (red ochre), labels |
| `--sindoor` | `#c4271b` | Primary red, logo |
| `--chili` | `#e0401f` | Hot accents |
| `--saffron` | `#f07a26` | Primary orange |
| `--marigold` | `#f6a53a` | Highlights, petals |
| `--haldi` | `#f9d27a` | Sun, hover states |
| `--peach` | `#f8cf9c` | Haze, far mountains |
| `--cream` | `#f6ecdb` | Secondary paper |
| `--paper` | `#fbf6ee` | Page background |

**Gradients**

- `--grad-dusk`: the hero sky, from cream through peach to saffron.
- `--grad-dusk-rise`, `--grad-sky`, `--grad-sky-down`, `--grad-sky-glow`: slices of the same sky. **Every home section uses one of these**, so the whole page reads as one Himalayan dusk. The opening keeps its red-ochre Aipan ground and fades at the bottom into the hero's sky; a static `Ridges` silhouette joins the last section to the footer.
- `--grad-fire`: marigold → saffron → sindoor. Buttons, the BOLI wordmark.
- `--grad-geru`: radial red ochre. The opening section, Aipan borders and flashcard fronts.
- `--grad-earth`: umber → ink. Dark sections.

## 4. Type

| Font | Variable | Use |
| --- | --- | --- |
| [Rubik](https://fonts.google.com/specimen/Rubik) 400–900 | `--font-display` | Everything; 800–900 uppercase for headings |
| [Fraunces](https://fonts.google.com/specimen/Fraunces) italic | `--font-serif` | Warm, handwritten-feeling accents (`.serif`) and story text |
| [Tiro Devanagari Hindi](https://fonts.google.com/specimen/Tiro+Devanagari+Hindi) | `--font-deva` | All Kumaoni in Devanagari (`.deva`) |

Fonts load through `next/font/google`, which downloads them at build time and serves them from our own domain (no layout shift, no request to Google at runtime).

## 5. Shape and texture

- **Outlines:** `3px solid var(--ink)` on almost every card and button.
- **Hard shadows:** `6px 6px 0 var(--ink)`. No blur, like a screen-print offset.
- **Tilt:** cards sit at −2° to +2°, like prints pinned to a wall; they straighten or tilt further on hover.
- **Radius:** generous (`22px` to `36px`) and pill buttons.
- **Grain:** a fixed SVG `feTurbulence` noise layer at 9% opacity, blended with `multiply`, over the whole page.

## 6. Motion

| Where | What | How |
| --- | --- | --- |
| Whole site | Smooth, gliding scroll | Lenis (`components/motion/SmoothScroll.jsx`) |
| Opening | Rotating white Aipan mandala on geru that tilts toward the pointer; text rises slightly faster than the page | three.js (`lib/three/aipan.js`) + `Parallax` |
| Hero | Layered parallax: title lifts, village layers sink at three depths | GSAP ScrollTrigger (`components/home/Hero.jsx`) |
| Hero backdrop | **Static** mountains; only the sky moves (drifting clouds, falling marigold petals, turning sun halo) | three.js (`lib/three/hills.js`) |
| Sections | Cards and medals floating at slightly different speeds | GSAP `Parallax` |
| Navigation | Logo and slim right-hand rail slide away while scrolling down, return on scroll up | CSS transform transition |
| Hero foreground | Birds, chimney smoke, swaying toran | CSS keyframes on SVG |
| Manifesto | Words light up as you scroll | ScrollTrigger progress + `data-lit` attributes |
| Sections | Fade and rise on enter | `Reveal` + IntersectionObserver |
| Lesson | 3D flip cards, shaking wrong answers, petal shower | CSS 3D transforms and keyframes |
| Baujyu | Blinks, nods and twitches his mustache | CSS keyframes on SVG groups |

Rules:

1. Motion should feel **hand-made**: bouncy easing (`--ease-bounce`) for interactions, long soft easing (`--ease-out`) for reveals.
2. Nothing loops fast. Ambient loops are 4 seconds or longer.
3. `prefers-reduced-motion: reduce` disables all of it.

## 7. Illustration

All illustrations are **hand-written SVG in React components** (`components/art/`), not image files, so they:

- scale crisply to any size,
- use the same colour tokens,
- can be animated with CSS.

Baujyu's 2D look follows the brief: Pahadi topi, white hair, curled white mustache, dark vest, off-white kurta, patterned shawl, warm earthy palette on cream. A red *pithya* (tilak) is added as a cultural detail.

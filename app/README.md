# `app/`: routes

Next.js App Router. **Each folder is a URL segment, and `page.jsx` is the page shown there.**

| File | URL | Notes |
| --- | --- | --- |
| `layout.jsx` | (all pages) | Loads fonts, wraps every page in Navbar + Footer, sets default `<title>` |
| `globals.css` | (all pages) | Design tokens, resets, grain overlay, `.reveal` animation |
| `page.jsx` | `/` | Stacks the sections from `components/home/` |
| `learn/page.jsx` | `/learn` | Progress panel and lesson list |
| `learn/[lessonId]/page.jsx` | `/learn/:lessonId` | One lesson. Pre-rendered for every lesson in `data/lessons.js` |
| `stories/page.jsx` | `/stories` | All stories |
| `stories/[slug]/page.jsx` | `/stories/:slug` | One story |
| `baujyu/page.jsx` | `/baujyu` | Companion character sheet + chat mock-up |
| `not-found.jsx` | any unknown URL | 404 page |

Pages stay thin: they fetch data from `data/` and hand it to components.

**Learn more:** [Next.js routing](https://nextjs.org/docs/app/building-your-application/routing) · [Layouts and pages](https://nextjs.org/docs/app/building-your-application/routing/pages)

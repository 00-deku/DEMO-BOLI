'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AipanCanvas from '@/components/three/AipanCanvas';
import Wordmark from '@/components/art/Wordmark';
import Button from '@/components/ui/Button';
import { gsap, getLenis } from '@/lib/motion';
import { OpeningText } from '@/components/home/Opening';
import navStyles from '@/components/layout/Navbar.module.css';
import styles from './StartScreen.module.css';

// The first screen of the site. Two Aipan wheels roll in from the left and
// right edges, then the BOLI wordmark and the buttons appear between them.
// The footer from the layout follows below.
//
// "Continue without login" hands the screen over to /home so smoothly that
// the page change can't be seen:
//   1. All the text except BOLI fades away.
//   2. The two wheels slide together. They are already exactly the size of
//      the home page's mandala, so they only move, never scale; the right
//      one fades out as they meet, leaving one mandala exactly where the
//      home page draws its own. The home opening grows with its text, so
//      its size is measured from an invisible copy of that text (below).
//   3. The home opening's shading fades in over it.
//   4. BOLI flies into the exact box of the navbar logo on /home.
//   5. The browser freezes that final frame (View Transitions API) while
//      /home mounts and draws its mandala, then cross-fades to it. Both
//      mandalas run on the wall clock, so their rings are at the same angles.
//
// "I already have an account" opens the learner dashboard for now: there are
// no accounts yet, progress is saved in this browser.

// Resolves once the home page's mandala has drawn its first frame.
// Polls with setTimeout: animation frames are paused during a view transition.
function homeMandalaDrawn(timeout = 3000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      if (document.querySelector('[data-opening-mandala] [data-drawn]') || Date.now() - start > timeout) resolve();
      else setTimeout(check, 16);
    };
    check();
  });
}

export default function StartScreen() {
  const root = useRef(null);
  const target = useRef(null);
  const router = useRouter();
  const measure = useRef(null);
  const [leaving, setLeaving] = useState(false);

  // How tall the home opening will be: one screen, or its text if taller.
  // Its mandala fills it, so this sets the wheels' size and destination.
  useLayoutEffect(() => {
    const update = () => {
      const width = document.documentElement.clientWidth;
      const homeHeight = Math.max(window.innerHeight, measure.current.offsetHeight);
      // 1.345 = 7.8 / (14 x tan 22.5deg): see the two cameras in lib/three/aipan.js
      const wheel = 1.345 * Math.min(width, homeHeight);
      root.current.style.setProperty('--home-h', `${homeHeight}px`);
      root.current.style.setProperty('--wheel-size', `${wheel}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Fetch /home in the background so the swap at the end is instant.
  useEffect(() => {
    router.prefetch('/home');
  }, [router]);

  const goHome = () => {
    getLenis()?.start();
    if (!document.startViewTransition) {
      router.push('/home');
      return;
    }
    document.startViewTransition(async () => {
      router.push('/home');
      await homeMandalaDrawn();
    });
  };

  const continueWithoutLogin = () => {
    if (leaving) return;
    setLeaving(true);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push('/home');
      return;
    }

    const scope = root.current;
    const left = scope.querySelector('[data-wheel="left"]');
    const right = scope.querySelector('[data-wheel="right"]');
    const heading = scope.querySelector('[data-start="word"]');
    const word = heading.querySelector('[role="img"]');
    const fading = scope.querySelectorAll('[data-start="fade"]');
    const glow = scope.querySelector('[data-start="glow"]');
    const handoff = scope.querySelectorAll('[data-start="handoff"]');
    const landing = target.current.querySelector('[role="img"]');

    getLenis()?.stop();
    window.scrollTo(0, 0);

    // CSS entrance animations keep control of `transform`; switch them off
    // (they have already finished, so nothing visibly changes).
    gsap.set([left, right, heading, ...fading], { animation: 'none' });

    // Each wheel's centre travels to the centre of the home opening, which
    // is where the home page centres its mandala.
    const cx = document.documentElement.clientWidth / 2;
    const cy = parseFloat(scope.style.getPropertyValue('--home-h')) / 2 || window.innerHeight / 2;
    const toCentre = (el) => {
      const r = el.getBoundingClientRect();
      return { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2) };
    };
    const l = toCentre(left);
    const r = toCentre(right);

    // Pin the wordmark where it is (so nothing can shift it mid-flight),
    // keep its heading's height so nothing around it jumps, then FLIP it
    // onto the navbar logo's exact box.
    const from = word.getBoundingClientRect();
    gsap.set(heading, { height: heading.offsetHeight });
    gsap.set(word, { position: 'fixed', left: from.left, top: from.top, margin: 0, zIndex: 5 });
    const to = landing.getBoundingClientRect();

    gsap
      .timeline({ defaults: { ease: 'power3.inOut' }, onComplete: goHome })
      // 1. every other text simply disappears
      .to(fading, { opacity: 0, y: 12, duration: 0.45, ease: 'power2.out', stagger: 0.04 }, 0)
      // 2. the wheels slide together; the right one dissolves as they meet
      .to(left, { x: l.x, y: l.y, duration: 1.5 }, 0)
      .to(right, { x: r.x, y: r.y, duration: 1.5 }, 0)
      .to(right, { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 0.7)
      // 3. swap this screen's glow for the home opening's shading
      .to(glow, { opacity: 0, duration: 1.1, ease: 'power1.inOut' }, 0.4)
      .to(handoff, { opacity: 1, duration: 1.1, ease: 'power1.inOut' }, 0.4)
      // 4. BOLI flies into the navbar, its outline thinning away
      .to(
        word,
        {
          transformOrigin: '0 0',
          x: to.left - from.left,
          y: to.top - from.top,
          scale: to.width / from.width,
          '--wm-stroke': '0em',
          '--wm-shadow': '0em',
          duration: 1.3,
        },
        0.15,
      );
  };

  return (
    <section ref={root} className={`${styles.screen} ${leaving ? styles.leaving : ''}`}>
      <div className={`${styles.wheel} ${styles.left}`} data-wheel="left" aria-hidden="true">
        <AipanCanvas fit />
      </div>
      <div className={`${styles.wheel} ${styles.right}`} data-wheel="right" aria-hidden="true">
        <AipanCanvas fit />
      </div>
      <div className={styles.handoffGround} data-start="handoff" aria-hidden="true" />
      <div className={styles.handoff} data-start="handoff" aria-hidden="true" />
      <div className={styles.glow} data-start="glow" aria-hidden="true" />

      <div className={styles.center}>
        <h1 className={styles.logo} data-start="word">
          <Wordmark outlined />
        </h1>
        <div className={styles.actions} data-start="fade">
          <Button href="/home" variant="paper" size="l">
            Get started
          </Button>
          <Button href="/learn" variant="ink" size="l">
            I already have an account
          </Button>
        </div>
        <button type="button" className={styles.guest} data-start="fade" onClick={continueWithoutLogin}>
          Continue without login
        </button>
      </div>

      {/* Invisible copy of the home opening's text, measured for its height */}
      <div ref={measure} className={styles.measure} aria-hidden="true">
        <OpeningText />
      </div>

      {/* Invisible copy of the navbar logo: the exact place the wordmark flies to */}
      <span ref={target} className={`${navStyles.logo} ${styles.landing}`} aria-hidden="true">
        <Wordmark className={navStyles.logoArt} />
      </span>
    </section>
  );
}

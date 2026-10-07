'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AipanCanvas from '@/components/three/AipanCanvas';
import Wordmark from '@/components/art/Wordmark';
import Button from '@/components/ui/Button';
import { gsap, getLenis } from '@/lib/motion';
import navStyles from '@/components/layout/Navbar.module.css';
import styles from './StartScreen.module.css';

// The first screen of the site. Two Aipan wheels roll in from the left and
// right edges (only half of each is on screen), then the BOLI wordmark and
// the buttons appear between them. The footer from the layout follows below.
//
// "Continue without login" plays a hand-off into the home page: the two half
// wheels slide together into one mandala in the centre (the home page opens
// on a centred mandala), and the wordmark flies up into the exact spot where
// the navbar logo sits on /home, so the page swap is seamless.
//
// "I already have an account" opens the learner dashboard for now: there are
// no accounts yet, progress is saved in this browser.
export default function StartScreen() {
  const root = useRef(null);
  const target = useRef(null);
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  // Fetch /home in the background so the swap at the end is instant.
  useEffect(() => {
    router.prefetch('/home');
  }, [router]);

  const continueWithoutLogin = () => {
    if (leaving) return;
    setLeaving(true);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      router.push('/home');
      return;
    }

    const scope = root.current;
    const left = scope.querySelector('[data-wheel="left"]');
    const right = scope.querySelector('[data-wheel="right"]');
    const word = scope.querySelector('[data-start="word"] [role="img"]');
    const fading = scope.querySelectorAll('[data-start="fade"]');
    const landing = target.current.querySelector('[role="img"]');

    getLenis()?.stop();
    window.scrollTo(0, 0);

    // CSS entrance animations keep control of `transform`; switch them off
    // (they have already finished, so nothing visibly changes).
    gsap.set([left, right, word.closest('[data-start="word"]'), ...fading], { animation: 'none' });

    // Where each wheel's centre must travel to reach the middle of the screen.
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const toCentre = (el) => {
      const r = el.getBoundingClientRect();
      return { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2) };
    };
    const l = toCentre(left);
    const r = toCentre(right);

    // FLIP the wordmark onto the navbar logo's exact box. First pin it where
    // it is (position: fixed), so nothing can shift it mid-flight, e.g. the
    // window resizing while it is centred. Keep its heading's height so the
    // layout around it doesn't jump.
    const heading = word.closest('[data-start="word"]');
    const from = word.getBoundingClientRect();
    gsap.set(heading, { height: heading.offsetHeight });
    gsap.set(word, { position: 'fixed', left: from.left, top: from.top, margin: 0, zIndex: 5 });
    const to = landing.getBoundingClientRect();
    const scale = to.width / from.width;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        getLenis()?.start();
        router.push('/home');
      },
    });

    tl.to(fading, { opacity: 0, y: 24, duration: 0.4, ease: 'power2.in', stagger: 0.05 }, 0)
      .to(left, { x: l.x, y: l.y, rotate: 140, scale: 1.12, duration: 1.25 }, 0.1)
      .to(right, { x: r.x, y: r.y, rotate: -140, scale: 1.12, duration: 1.25 }, 0.1)
      .to(
        word,
        {
          transformOrigin: '0 0',
          x: to.left - from.left,
          y: to.top - from.top,
          scale,
          '--wm-stroke': '0em',
          '--wm-shadow': '0em',
          duration: 1.15,
        },
        0.2,
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

      {/* Invisible copy of the navbar logo: the exact place the wordmark flies to */}
      <span ref={target} className={`${navStyles.logo} ${styles.landing}`} aria-hidden="true">
        <Wordmark className={navStyles.logoArt} />
      </span>
    </section>
  );
}

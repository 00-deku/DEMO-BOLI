'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';

// Moves its children at a different speed from the page while scrolling.
//   speed > 0  → drifts slower than the page (feels further away)
//   speed < 0  → moves faster than the page (feels closer)
// `axis="x"` slides sideways instead, used for the giant background words.
export default function Parallax({ speed = 0.2, axis = 'y', as: Tag = 'div', className = '', style, children }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const distance = speed * 100;
        gsap.fromTo(
          ref.current,
          { [axis === 'x' ? 'xPercent' : 'yPercent']: -distance },
          {
            [axis === 'x' ? 'xPercent' : 'yPercent']: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed, axis] },
  );

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </Tag>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Wordmark from '@/components/art/Wordmark';
import Motif from '@/components/art/Motif';
import { navLinks } from '@/data/site';
import styles from './Navbar.module.css';

// Navigation in two parts:
//  - the BOLI wordmark pinned top-left (same as the footer's),
//  - a slim vertical rail on the right edge, one icon per page.
// Both slide away while you scroll down and return when you scroll up.
// The rail hides inside a lesson (it has its own close button), and both
// hide on the start screen, which has its own logo and buttons.

const ICONS = { '/home': 'home', '/learn': 'book', '/stories': 'himalaya', '/baujyu': 'topi' };

const isActive = (pathname, href) => pathname.startsWith(href);

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const inLesson = /^\/learn\/.+/.test(pathname);
  // The start screen at "/" has its own centred logo and buttons.
  const onStart = pathname === '/';

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Always show the rail again on a new page.
  useEffect(() => setHidden(false), [pathname]);

  return (
    <>
      {!onStart && (
        <Link href="/home" className={`${styles.logo} ${hidden ? styles.logoHidden : ''}`} aria-label="Boli home">
          <Wordmark className={styles.logoArt} />
        </Link>
      )}

      {!inLesson && !onStart && (
        <nav className={`${styles.rail} ${hidden ? styles.hidden : ''}`} aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.item} ${active ? styles.active : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Motif motif={ICONS[link.href]} size={20} />
                <span className={styles.label}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}

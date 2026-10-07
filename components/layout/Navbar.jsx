'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Motif from '@/components/art/Motif';
import { navLinks } from '@/data/site';
import useProgress from '@/hooks/useProgress';
import styles from './Navbar.module.css';

// Navigation in two parts:
//  - a small sticker logo pinned top-left,
//  - a floating dock at the bottom centre with one folk-art icon per page.
// The dock tucks away while you scroll down and returns when you scroll up.
// It hides inside a lesson, which has its own close button.

const ICONS = { '/': 'aipan', '/learn': 'chowki', '/stories': 'himalaya', '/baujyu': 'topi' };

const isActive = (pathname, href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const { ready, xp, streak } = useProgress();
  const inLesson = /^\/learn\/.+/.test(pathname);

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

  // Always show the dock again on a new page.
  useEffect(() => setHidden(false), [pathname]);

  return (
    <>
      <Link href="/" className={styles.logo} aria-label="Boli home">
        <span className={`deva ${styles.logoMark}`}>बो</span>
        <span className={styles.logoWord}>Boli</span>
      </Link>

      {!inLesson && (
        <nav className={`${styles.dock} ${hidden ? styles.hidden : ''}`} aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.item} ${active ? styles.active : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Motif motif={ICONS[link.href]} size={22} />
                <span className={styles.label}>{link.label}</span>
              </Link>
            );
          })}

          {ready && (
            <Link href="/learn" className={styles.stats} title={`${xp} XP, ${streak}-day streak`}>
              <strong>{xp}</strong>
              <span>XP</span>
              <span className={styles.dot} aria-hidden="true" />
              <strong>{streak}</strong>
              <span>{streak === 1 ? 'day' : 'days'}</span>
            </Link>
          )}
        </nav>
      )}
    </>
  );
}

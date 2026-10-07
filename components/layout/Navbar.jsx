'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Motif from '@/components/art/Motif';
import { navLinks } from '@/data/site';
import styles from './Navbar.module.css';

// Navigation in two parts:
//  - a small sticker logo pinned top-left,
//  - a vertical rail on the right edge, one folk-art icon per page.
// Both slide away while you scroll down and return when you scroll up.
// The rail hides inside a lesson, which has its own close button.

const ICONS = { '/': 'aipan', '/learn': 'chowki', '/stories': 'himalaya', '/baujyu': 'topi' };

const isActive = (pathname, href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
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

  // Always show the rail again on a new page.
  useEffect(() => setHidden(false), [pathname]);

  return (
    <>
      <Link href="/" className={`${styles.logo} ${hidden ? styles.logoHidden : ''}`} aria-label="Boli home">
        <span className={`deva ${styles.logoMark}`}>बो</span>
        <span className={styles.logoWord}>Boli</span>
      </Link>

      {!inLesson && (
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
                <Motif motif={ICONS[link.href]} size={24} />
                <span className={styles.label}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BoliLogo from '@/components/art/BoliLogo';
import Motif from '@/components/art/Motif';
import { navLinks } from '@/data/site';
import styles from './Navbar.module.css';

// Navigation in two parts:
//  - the Boli logo pinned top-left,
//  - a slim vertical rail on the right edge, one icon per page.
// Both slide away while you scroll down and return when you scroll up.
// The rail hides inside a lesson, which has its own close button.

const ICONS = { '/': 'home', '/learn': 'book', '/stories': 'himalaya', '/baujyu': 'topi' };

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
        <BoliLogo className={styles.logoArt} />
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

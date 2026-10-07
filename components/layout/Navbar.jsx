'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from '@/data/site';
import useProgress from '@/hooks/useProgress';
import { getLenis } from '@/lib/motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ready, xp, streak } = useProgress();

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const lenis = getLenis();
    if (lenis && open) lenis.stop();
    else if (lenis) lenis.start();
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo} aria-label="Boli home">
          <span className={`deva ${styles.logoMark}`}>बो</span>
          <span className={styles.logoWord}>Boli</span>
        </Link>

        <nav className={styles.links} aria-label="Main">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname.startsWith(link.href) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          {ready && (
            <Link href="/learn" className={styles.stats} title="Your XP and streak">
              <span>{xp} XP</span>
              <span className={styles.flame} aria-hidden="true">
                ◆
              </span>
              <span>{streak}d</span>
            </Link>
          )}
          <button
            type="button"
            className={`${styles.menuButton} ${open ? styles.menuOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="site-menu" className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`} aria-hidden={!open}>
        <nav className={styles.overlayNav} aria-label="Full menu">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.overlayLink}
              style={{ '--i': i }}
              tabIndex={open ? 0 : -1}
            >
              <span className={styles.overlayNum}>0{i + 1}</span>
              <span className={styles.overlayLabel}>{link.label}</span>
              <span className={`deva ${styles.overlayDeva}`}>{link.kumaoni}</span>
            </Link>
          ))}
        </nav>
        <p className={styles.overlayNote}>
          Pilot language: <strong>Kumaoni</strong>, from the hills of Uttarakhand.
        </p>
      </div>
    </>
  );
}

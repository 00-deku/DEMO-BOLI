import Link from 'next/link';
import AipanBorder from '@/components/art/AipanBorder';
import Wordmark from '@/components/art/Wordmark';
import { navLinks, site } from '@/data/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <AipanBorder id="footer" tone="geru" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.lead}>
          <p className={`deva ${styles.deva}`}>पैलाग!</p>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Wordmark className={styles.wordmark} />

        <div className={styles.meta}>
          <span>Pilot: {site.pilotLanguage} · {site.region}</span>
          <span>Frontend prototype. Built with Next.js, React and three.js.</span>
        </div>
      </div>
    </footer>
  );
}

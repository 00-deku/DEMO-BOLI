import Motif from '@/components/art/Motif';
import Parallax from '@/components/motion/Parallax';
import SectionTag from '@/components/ui/SectionTag';
import styles from './PageHeader.module.css';

// The big coloured banner at the top of inner pages.
// tone: 'fire' | 'geru' | 'earth'
export default function PageHeader({ tag, deva, title, lede, tone = 'fire', motif = 'aipan', children }) {
  return (
    <header className={`${styles.header} ${styles[tone]}`}>
      <Motif motif={motif} size={520} className={styles.motif} />
      <Parallax speed={-0.12}>
      <div className={`container ${styles.inner}`}>
        <SectionTag deva={deva} tone="paper">
          {tag}
        </SectionTag>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {children}
      </div>
      </Parallax>
    </header>
  );
}

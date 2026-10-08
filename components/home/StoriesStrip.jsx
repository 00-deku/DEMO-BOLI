import Button from '@/components/ui/Button';
import Ridges from '@/components/art/Ridges';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import StoryCard from '@/components/stories/StoryCard';
import { stories } from '@/data/stories';
import styles from './StoriesStrip.module.css';

export default function StoriesStrip() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <div className={styles.headText}>
            <SectionTag deva="कथा" tone="paper">
              Stories
            </SectionTag>
            <h2 className={styles.title}>
              Words need <span className="serif">somewhere to live.</span>
            </h2>
          </div>
          <Button href="/stories" variant="paper">
            All stories
          </Button>
        </header>

        <div className={styles.grid}>
          {stories.slice(0, 3).map((story, i) => (
            <Reveal key={story.slug} delay={i * 120}>
              <Parallax speed={[0.05, 0.14, 0.08][i]}>
                <StoryCard story={story} index={i} />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
      <Ridges to="#140c08" />
    </section>
  );
}

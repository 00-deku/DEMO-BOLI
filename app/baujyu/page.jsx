import BaujyuPortrait from '@/components/art/BaujyuPortrait';
import PageHeader from '@/components/layout/PageHeader';
import ChatPreview from '@/components/baujyu/ChatPreview';
import Reveal from '@/components/ui/Reveal';
import { baujyu } from '@/data/baujyu';
import styles from './baujyu.module.css';

export const metadata = {
  title: 'Baujyu',
  description: 'Meet Baujyu, the Kumaoni grandfather who will teach you through conversation.',
};

export default function BaujyuPage() {
  return (
    <>
      <PageHeader
        tag="Character sheet"
        deva={baujyu.deva}
        title={
          <>
            Baujyu, <span className="serif">your grandfather in the hills.</span>
          </>
        }
        lede={baujyu.summary}
        tone="geru"
        motif="topi"
      />

      <div className={`container ${styles.layout}`}>
        <Reveal className={styles.portraitCol}>
          <div className={styles.arch}>
            <BaujyuPortrait />
          </div>
          <p className={styles.caption}>2D reference. A 3D version in the same style is planned.</p>
        </Reveal>

        <div className={styles.sheet}>
          <Reveal as="section" className={styles.panel}>
            <h2 className={styles.panelTitle}>The look</h2>
            <dl className={styles.look}>
              {baujyu.look.map((item) => (
                <div key={item.part}>
                  <dt>{item.part}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className={styles.split}>
            <Reveal as="section" className={`${styles.panel} ${styles.does}`}>
              <h2 className={styles.panelTitle}>He will</h2>
              <ul>
                {baujyu.does.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal as="section" delay={120} className={`${styles.panel} ${styles.doesNot}`}>
              <h2 className={styles.panelTitle}>He won&apos;t</h2>
              <ul>
                {baujyu.doesNot.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal as="section" className={`${styles.panel} ${styles.unfinished}`}>
            <h2 className={styles.panelTitle}>Still being written</h2>
            <p>The personality section of the brief was cut off. These parts are open:</p>
            <ul className={styles.todo}>
              {baujyu.openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <ChatPreview />
    </>
  );
}

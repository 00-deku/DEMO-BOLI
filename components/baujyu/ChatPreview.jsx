import BaujyuPortrait from '@/components/art/BaujyuPortrait';
import styles from './ChatPreview.module.css';

// A static mock-up of the future conversation screen. Nothing here talks to
// an AI: the companion is not built yet. The input is disabled on purpose.
const MOCK = [
  { from: 'baujyu', text: 'Pailaag! Come, sit by the fire.', deva: 'पैलाग!' },
  { from: 'you', text: 'Pailaag, Baujyu. Kas chha?' },
  { from: 'baujyu', text: 'Bhal chhu! And look at you, already asking properly. Your aama would be proud.' },
];

export default function ChatPreview() {
  return (
    <section className={styles.section} aria-labelledby="chat-preview-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>Design preview</p>
          <h2 id="chat-preview-title" className={styles.title}>
            Talking with Baujyu
          </h2>
          <p>
            This is how a conversation could look. The companion itself is not built yet, so this screen is a mock-up
            and the input is switched off.
          </p>
        </div>

        <div className={styles.phone}>
          <div className={styles.phoneHead}>
            <div className={styles.avatar}>
              <BaujyuPortrait background={false} title="Baujyu avatar" />
            </div>
            <div>
              <strong>Baujyu</strong>
              <span>is still learning to talk…</span>
            </div>
          </div>

          <ol className={styles.messages}>
            {MOCK.map((m, i) => (
              <li key={i} className={`${styles.message} ${styles[m.from]}`} style={{ '--i': i }}>
                {m.deva && <span className="deva">{m.deva} </span>}
                {m.deva ? m.text.replace('Pailaag! ', '') : m.text}
              </li>
            ))}
          </ol>

          <form className={styles.input} aria-disabled="true">
            <label htmlFor="chat-input" className="visually-hidden">
              Message Baujyu (coming soon)
            </label>
            <input id="chat-input" type="text" placeholder="Coming soon" disabled />
            <button type="button" disabled aria-label="Send (coming soon)">
              →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import BaujyuPortrait from '@/components/art/BaujyuPortrait';
import styles from './ChatPreview.module.css';

const INITIAL_MESSAGES = [
  {
    from: 'baujyu',
    text: 'पैलाग नाती (Pailaag nati)! Come, sit by the warm chulha.\nWhat would you like to learn in Kumaoni today?',
    deva: 'पैलाग!',
  },
];

export default function ChatPreview() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeContext, setActiveContext] = useState(null);
  const [retrievalMeta, setRetrievalMeta] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const newMessages = [...messages, { from: 'you', text: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: newMessages.slice(-6),
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            from: 'baujyu',
            text: data.reply,
          },
        ]);
        if (data.retrieved && data.retrieved.length > 0) {
          setActiveContext(data.retrieved[0]);
        }
        setRetrievalMeta({
          intent: data.intent,
          grounded: data.hasGroundedMatch,
          score: data.topScore,
          threshold: data.threshold,
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: 'baujyu',
            text: 'Arrey bal! The hill connection dropped for a moment. Try asking Baujyu again.',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: 'baujyu',
          text: 'The signal through the pine trees is fuzzy today. Could you repeat that, bal?',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="chat-preview-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>Live RAG Prototype</p>
          <h2 id="chat-preview-title" className={styles.title}>
            Talking with Baujyu
          </h2>
          <p>
            Baujyu is guarded by a <strong>Dynamic Intent & Scoring Threshold engine</strong>. Off-topic questions (tech, stocks, random trivia) and unsupported words are gracefully handled without hallucinations.
          </p>

          {/* Strategy 3: Dynamic Intent & Threshold Badge */}
          {retrievalMeta && (
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
            }}>
              <span style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background:
                  retrievalMeta.intent === 'GROUNDED_KUMAONI'
                    ? 'rgba(34, 197, 94, 0.12)'
                    : retrievalMeta.intent === 'OFF_TOPIC'
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(234, 179, 8, 0.15)',
                color:
                  retrievalMeta.intent === 'GROUNDED_KUMAONI'
                    ? '#15803d'
                    : retrievalMeta.intent === 'OFF_TOPIC'
                    ? '#b91c1c'
                    : '#854d0e',
                border: `1px solid ${
                  retrievalMeta.intent === 'GROUNDED_KUMAONI'
                    ? '#86efac'
                    : retrievalMeta.intent === 'OFF_TOPIC'
                    ? '#fca5a5'
                    : '#fde047'
                }`
              }}>
                {retrievalMeta.intent === 'GROUNDED_KUMAONI' && '🛡️ Intent: Grounded Kumaoni'}
                {retrievalMeta.intent === 'OFF_TOPIC' && '🧭 Intent: Off-Topic (Refocused)'}
                {retrievalMeta.intent === 'UNSUPPORTED_VOCABULARY' && '🔍 Intent: Unsupported Word'}
              </span>

              <span style={{
                fontSize: '0.72rem',
                color: 'var(--color-text-dim, #666)',
                fontFamily: 'monospace',
                background: 'rgba(0,0,0,0.04)',
                padding: '0.2rem 0.5rem',
                borderRadius: '6px'
              }}>
                Score: {retrievalMeta.score} / {retrievalMeta.threshold} min
              </span>
            </div>
          )}

          {activeContext && (
            <div style={{
              marginTop: '1.2rem',
              padding: '1rem',
              background: 'var(--color-surface-2, rgba(0,0,0,0.03))',
              borderRadius: '12px',
              border: '1px solid var(--color-border, #e5e5e5)',
              fontSize: '0.85rem'
            }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c2410c', fontWeight: 600 }}>
                ⚡ Retrieved Knowledge ({activeContext.category})
              </span>
              <p style={{ margin: '0.3rem 0 0.2rem', fontWeight: 600, fontSize: '1rem' }}>
                {activeContext.kumaoni} <span style={{ fontWeight: 400, opacity: 0.8 }}>({activeContext.transliteration})</span>
              </p>
              <p style={{ margin: '0 0 0.4rem 0', opacity: 0.85 }}>{activeContext.english} / {activeContext.hindi}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', fontStyle: 'italic', opacity: 0.7 }}>
                {activeContext.usage_notes}
              </p>
            </div>
          )}
        </div>

        <div className={styles.phone}>
          <div className={styles.phoneHead}>
            <div className={styles.avatar}>
              <BaujyuPortrait background={false} title="Baujyu avatar" />
            </div>
            <div>
              <strong>Baujyu (बौज्यू)</strong>
              <span>{loading ? 'Thinking by the chulha…' : 'Online & ready to teach'}</span>
            </div>
          </div>

          <ol className={styles.messages}>
            {messages.map((m, i) => (
              <li key={i} className={`${styles.message} ${styles[m.from]}`} style={{ '--i': i }}>
                {m.deva && <span className="deva">{m.deva} </span>}
                <span style={{ whiteSpace: 'pre-line' }}>{m.text}</span>
              </li>
            ))}
            {loading && (
              <li className={`${styles.message} ${styles.baujyu}`} style={{ opacity: 0.7 }}>
                <em>Baujyu is adjusting his topi and thinking…</em>
              </li>
            )}
            <div ref={messagesEndRef} />
          </ol>

          <form className={styles.input} onSubmit={handleSend}>
            <label htmlFor="chat-input" className="visually-hidden">
              Ask Baujyu something
            </label>
            <input
              id="chat-input"
              type="text"
              placeholder="Ask a question or try an off-topic question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
              →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { retrieveKumaoniContext, formatRetrievedContext } from '@/lib/rag';

/**
 * Strategy 3: Dynamic Intent Handler & Guardrail Verifier
 */
function verifyAndEnforceIntent(replyText, intent, retrievedItems, rawUserMessage) {
  const topItem = retrievedItems[0];

  // If user is completely off-topic (e.g. asking about Python coding, stock market, world history)
  if (intent === 'OFF_TOPIC') {
    const isRedirecting =
      replyText.toLowerCase().includes('kumaoni') ||
      replyText.toLowerCase().includes('pahaad') ||
      replyText.includes('कुमाऊँनी') ||
      replyText.includes('पहाड़') ||
      replyText.includes('बौज्यू');

    if (!isRedirecting) {
      return {
        verifiedText: `अर्रे नाती (Arrey nati)! Old Baujyu sits here on the mountain porch to teach you the sweet language and traditions of our Kumaon hills, not modern world trivia.\n\nCome, leave those worldly thoughts aside! Let me teach you a nice Pahadi phrase instead:\n🏔️ **${topItem.kumaoni}** (${topItem.transliteration})\n📖 Meaning: "${topItem.english}"\n\nWould you like to learn how to pronounce this?`,
        wasIntercepted: true,
      };
    }
  }

  // If user is asking for a word not currently in our authentic corpus
  if (intent === 'UNSUPPORTED_VOCABULARY') {
    const admitsUnknown =
      replyText.toLowerCase().includes('not have') ||
      replyText.toLowerCase().includes('slips') ||
      replyText.toLowerCase().includes('records') ||
      replyText.toLowerCase().includes('memory') ||
      replyText.includes('याद नी') ||
      replyText.includes('नी छ');

    if (!admitsUnknown) {
      return {
        verifiedText: `अर्रे नाती (Arrey nati)! In our hills, every valley has its own dialect, but Baujyu does not have that exact word in his records right now. Old Baujyu will never make up a fake word for you!\n\nInstead, let me teach you something every Pahadi knows:\n🏔️ **${topItem.kumaoni}** (${topItem.transliteration})\n📖 Meaning: "${topItem.english}" (${topItem.hindi})\n\n💡 *Tip*: ${topItem.usage_notes}\n\nTry repeating "${topItem.transliteration}" with me!`,
        wasIntercepted: true,
      };
    }
  }

  return { verifiedText: replyText, wasIntercepted: false };
}

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Retrieve grounded Kumaoni context + evaluate threshold & intent (Strategy 3)
    const {
      items: retrievedItems,
      intent,
      hasGroundedMatch,
      topScore,
      threshold,
    } = retrieveKumaoniContext(message, 3);

    const contextPrompt = formatRetrievedContext(retrievedItems);

    // 2. Strict system prompt with intent routing instructions
    const systemPrompt = `You are Baujyu (बौज्यू), a wise, warm, and affectionate Kumaoni grandfather living in Almora, Uttarakhand.
You are dedicated strictly to teaching your grandchild (the user) the authentic Kumaoni language (कुमाऊँनी) and Himalayan Pahadi culture.

RETRIEVAL STATUS:
- Classification Intent: ${intent}
- Match Score: ${topScore} (Threshold required: ${threshold})
- Grounded in Corpus: ${hasGroundedMatch}

STRATEGY 3 INTENT HANDLING RULES:
1. When intent is 'GROUNDED_KUMAONI':
   - Teach the verified phrase from the GROUNDED KNOWLEDGE BASE.
   - Show Devanagari, Transliteration, English/Hindi meaning, and a cultural note.
   - Ask the learner to practice pronouncing or using it.

2. When intent is 'OFF_TOPIC' (e.g. general knowledge, tech, math, other languages):
   - In a humorous, grandfatherly way, tell the learner that Baujyu's old head only cares about Kumaon, pine trees, and Pahadi boli!
   - Politely refuse the off-topic query and immediately pivot to teach one of the verified phrases from the Knowledge Base below.

3. When intent is 'UNSUPPORTED_VOCABULARY' (asking for a word not in Knowledge Base):
   - Never invent or fabricate words.
   - Honestly say in Baujyu's voice: "अर्रे नाती! Baujyu does not have that exact word in his memory right now. A true elder never teaches wrong words!"
   - Teach them the related verified entry from the Knowledge Base below instead.

---
GROUNDED KNOWLEDGE BASE:
${contextPrompt}
---`;

    const apiKey = process.env.GEMINI_API_KEY;

    // 3. Fallback when running without GEMINI_API_KEY
    if (!apiKey) {
      const topMatch = retrievedItems[0];
      let fallbackReply = '';

      if (intent === 'GROUNDED_KUMAONI') {
        fallbackReply = `पैलाग नाती (Pailaag nati)! Baujyu is here.\n\nRegarding "${message}": in our hills, we say:\n🏔️ **${topMatch.kumaoni}** (${topMatch.transliteration})\n📖 Meaning: "${topMatch.english}" (${topMatch.hindi})\n\n💡 *Baujyu's note*: ${topMatch.usage_notes}\n\nCan you try saying "${topMatch.transliteration}" to Baujyu?`;
      } else if (intent === 'OFF_TOPIC') {
        fallbackReply = `अर्रे नाती! Baujyu is an old Pahadi grandfather sitting on the hill veranda. I know about cold winds, buransh flowers, and our sweet Kumaoni language—not about "${message}"!\n\nCome, sit down and learn something useful:\n🏔️ **${topMatch.kumaoni}** (${topMatch.transliteration})\n📖 Meaning: "${topMatch.english}"\n\nTry saying "Pailaag Baujyu"!`;
      } else {
        fallbackReply = `अर्रे नाती! Baujyu does not have that exact Kumaoni word in mind right now. Mountain memories can slip, and I will never teach you a fake word.\n\nInstead, let's learn this:\n🏔️ **${topMatch.kumaoni}** (${topMatch.transliteration})\n📖 Meaning: "${topMatch.english}"\n\nHow does that sound, bal?`;
      }

      return Response.json({
        reply: fallbackReply,
        retrieved: retrievedItems,
        intent,
        hasGroundedMatch,
        topScore,
        threshold,
        isMock: true,
      });
    }

    // 4. Generative LLM with Low Temperature
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            ...history.map((h) => ({
              role: h.from === 'baujyu' ? 'model' : 'user',
              parts: [{ text: h.text }],
            })),
            {
              role: 'user',
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.15,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      throw new Error(`Gemini API error ${response.status}`);
    }

    const data = await response.json();
    const rawReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Pailaag! Baujyu was listening to the mountain breeze. Say that again, bal?';

    // 5. Verification & Intent Enforcement
    const { verifiedText, wasIntercepted } = verifyAndEnforceIntent(
      rawReply,
      intent,
      retrievedItems,
      message
    );

    return Response.json({
      reply: verifiedText,
      retrieved: retrievedItems,
      intent,
      hasGroundedMatch,
      topScore,
      threshold,
      wasIntercepted,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json(
      { error: 'Failed to process conversation', details: error.message },
      { status: 500 }
    );
  }
}

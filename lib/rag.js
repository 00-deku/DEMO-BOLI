import corpus from '@/data/kumaoni_corpus.json';

/**
 * Stopwords that do not carry topical Kumaoni semantic meaning
 */
const STOPWORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'and', 'or', 'for', 'of',
  'to', 'how', 'what', 'where', 'when', 'who', 'why', 'can', 'you', 'tell', 'me',
  'say', 'kya', 'hai', 'kaise', 'batao', 'bolte', 'hain', 'mein', 'ko', 'se', 'par'
]);

/**
 * Tokenizes and normalizes text, extracting meaningful keywords
 */
function tokenize(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

/**
 * Calculates a scored hybrid match between query and a knowledge item
 */
function scoreItem(item, queryTokens, rawQuery) {
  let score = 0;
  const rawLower = rawQuery.toLowerCase();

  // Primary searchable fields
  const primaryField = [
    item.kumaoni,
    item.transliteration,
    ...(item.tags || []),
  ].join(' ').toLowerCase();

  // Secondary descriptive fields
  const secondaryField = [
    item.hindi,
    item.english,
    item.category,
    item.usage_notes,
  ].join(' ').toLowerCase();

  // 1. Direct multi-word substring match in primary fields
  if (primaryField.includes(rawLower) && rawLower.length > 2) {
    score += 30;
  }

  // 2. Token scoring with field weighting
  for (const token of queryTokens) {
    // Exact tag hit
    if (item.tags?.some((tag) => tag.toLowerCase() === token)) {
      score += 15;
    } else if (item.tags?.some((tag) => tag.toLowerCase().includes(token))) {
      score += 8;
    }

    // Direct Kumaoni script or transliteration match
    if (item.kumaoni.toLowerCase().includes(token) || item.transliteration.toLowerCase().includes(token)) {
      score += 14;
    }

    // Meaning translation hit (English/Hindi)
    if (item.hindi.toLowerCase().includes(token) || item.english.toLowerCase().includes(token)) {
      score += 8;
    }

    // Category hit
    if (item.category?.toLowerCase() === token) {
      score += 6;
    }

    // Context / notes hit
    if (item.usage_notes.toLowerCase().includes(token)) {
      score += 3;
    }
  }

  return score;
}

/**
 * Strategy 3: Dynamic Threshold & Intent Analysis
 * Classifies query intent into:
 *  - 'GROUNDED_KUMAONI': strong corpus match above threshold
 *  - 'OFF_TOPIC': user asking general non-Kumaoni questions (e.g., coding, math, world news)
 *  - 'UNSUPPORTED_VOCABULARY': user asking how to say a specific word that isn't in our corpus yet
 */
export function retrieveKumaoniContext(query, topK = 3) {
  if (!query || typeof query !== 'string') {
    return {
      items: [corpus[0]],
      intent: 'GROUNDED_KUMAONI',
      hasGroundedMatch: true,
      topScore: 20,
    };
  }

  const queryTokens = tokenize(query);

  // If query is empty or only stopwords
  if (queryTokens.length === 0) {
    return {
      items: [corpus[0], corpus[2]],
      intent: 'GROUNDED_KUMAONI',
      hasGroundedMatch: true,
      topScore: 10,
    };
  }

  // Score all corpus entries
  const scored = corpus.map((item) => ({
    item,
    score: scoreItem(item, queryTokens, query),
  }));

  scored.sort((a, b) => b.score - a.score);

  const topScore = scored[0]?.score || 0;

  // THRESHOLD EVALUATION:
  // - Top score >= 8: Confirmed Grounded Match
  // - Top score < 8: Weak or No Match -> Needs intent classification
  const MATCH_THRESHOLD = 8;
  const hasGroundedMatch = topScore >= MATCH_THRESHOLD;

  let intent = 'GROUNDED_KUMAONI';

  if (!hasGroundedMatch) {
    // Check if user is asking for a translation/Kumaoni lesson
    const qLower = query.toLowerCase();
    const isAskingTranslation =
      qLower.includes('how to say') ||
      qLower.includes('meaning') ||
      qLower.includes('kumaoni for') ||
      qLower.includes('in kumaoni') ||
      qLower.includes('kumaoni mein') ||
      qLower.includes('kaise bole') ||
      qLower.includes('kya kehte');

    if (isAskingTranslation) {
      intent = 'UNSUPPORTED_VOCABULARY';
    } else {
      intent = 'OFF_TOPIC';
    }
  }

  // Pick top results (or fallback to foundation entries if off-topic)
  let results = scored.filter((s) => s.score > 0).slice(0, topK).map((s) => s.item);

  if (results.length === 0) {
    // Provide a relevant conversational anchor (Greetings or Daily)
    results = [corpus[0], corpus[2]];
  }

  return {
    items: results,
    intent, // 'GROUNDED_KUMAONI' | 'UNSUPPORTED_VOCABULARY' | 'OFF_TOPIC'
    hasGroundedMatch,
    topScore,
    threshold: MATCH_THRESHOLD,
  };
}

/**
 * Formats context for the LLM
 */
export function formatRetrievedContext(items) {
  if (!items || items.length === 0) return 'No specific dictionary entries found.';

  return items
    .map((entry, idx) => {
      return `[Entry ${idx + 1} (${entry.category})]
- Kumaoni (कुमाऊँनी): ${entry.kumaoni}
- Transliteration: ${entry.transliteration}
- Meaning: ${entry.english} / ${entry.hindi}
- Cultural Context: ${entry.usage_notes}`;
    })
    .join('\n\n');
}

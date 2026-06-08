import { useFadeIn } from '../hooks/useFadeIn'

const STEPS = [
  {
    num: '1',
    color: 'var(--jade)',
    title: 'Tokenize',
    subtitle: 'jieba NLP',
    body: 'Each Mandarin judgment is word-segmented with jieba. Domain-specific stopwords (procedural phrases, boilerplate) are removed, leaving substantive legal vocabulary.',
    badge: 'Chinese NLP',
  },
  {
    num: '2',
    color: 'var(--gold)',
    title: 'Extract Keywords',
    subtitle: 'TF-IDF',
    body: 'TF-IDF scoring surfaces the 50 most informative keywords per case — terms that are frequent in that case but rare across the corpus, capturing the dispute\'s unique signal.',
    badge: '50 keywords / case',
  },
  {
    num: '3',
    color: 'var(--steel)',
    title: 'Build Topic Model',
    subtitle: 'LDA',
    body: 'Latent Dirichlet Allocation is trained on the 79-case document-term matrix. The number of topics (8) is chosen by minimizing held-out perplexity across 3–10 topic solutions.',
    badge: '8 topics',
  },
  {
    num: '4',
    color: 'var(--plum)',
    title: 'Identify Gender',
    subtitle: 'Name registry',
    body: 'Litigant names are matched against a national athlete registry to assign binary gender labels. 68 of 79 litigants are uniquely matched.',
    badge: '68 / 79 matched',
  },
]

export default function MethodSection() {
  const ref = useFadeIn()

  return (
    <section id="method" className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <p className="label-tag">Method</p>
          <h2 className="section-title">From Legal Text to Structured Topics</h2>
          <p className="section-body" style={{ marginBottom: '3.5rem' }}>
            Raw Chinese court judgments pass through a four-stage NLP pipeline.
            No hand-labeling: the topics emerge from the text itself.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                {/* Timeline connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: '50%',
                    background: `${s.color}18`,
                    border: `2px solid ${s.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem', fontWeight: 600,
                    color: s.color,
                    flexShrink: 0,
                  }}>{s.num}</div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 28, background: 'var(--border)', marginTop: 4 }} />
                  )}
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '1.25rem 1.5rem',
                  marginBottom: i < STEPS.length - 1 ? '0.1rem' : 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {s.title}
                    </span>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: s.color,
                      background: `${s.color}14`,
                      border: `1px solid ${s.color}33`,
                      borderRadius: 6,
                      padding: '0.2rem 0.6rem',
                    }}>{s.subtitle}</span>
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '0.7rem', color: 'var(--text-muted)',
                      border: '1px solid var(--border)', borderRadius: 6,
                      padding: '0.2rem 0.55rem',
                    }}>{s.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Model selection note */}
          <div style={{
            marginTop: '2.5rem',
            padding: '1rem 1.25rem',
            background: 'var(--ink-mark)',
            borderLeft: '2px solid var(--accent)',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}>
            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.25rem' }}>
              Why 8 topics?
            </strong>
            Perplexity was computed for 3–10 topic solutions. The 8-topic model produced the lowest
            held-out perplexity while keeping topics substantively interpretable — no degenerate or
            near-duplicate clusters. Each topic maps to a coherent class of legal dispute.
          </div>
        </div>
      </div>
    </section>
  )
}

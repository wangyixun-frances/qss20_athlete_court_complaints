import { useFadeIn } from '../hooks/useFadeIn'

const STEPS = [
  {
    num: '01', color: 'var(--jade)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Search',
    body: 'Queried China Judgements Online (中国裁判文书网) using the term 退役运动员 (retired athlete). Searched 164 million+ records spanning 2009–2024.',
    stat: '164M+',
    statLabel: 'records searched',
  },
  {
    num: '02', color: 'var(--gold)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
    title: 'Screen',
    body: 'Manually reviewed each hit. Retained only cases where a retired athlete was the named primary litigant — excluding sports organizations and tangential mentions.',
    stat: '81',
    statLabel: 'cases found',
  },
  {
    num: '03', color: 'var(--steel)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Extract',
    body: 'Parsed case metadata and full judgment text via the court API. Filtered to individual litigants, yielding the final analytical corpus.',
    stat: '79',
    statLabel: 'litigant cases analyzed',
  },
]

const FIELDS = [
  { field: 'Case Name', desc: 'Parties and dispute type' },
  { field: 'Case Type', desc: 'Civil / Administrative / Criminal / Execution' },
  { field: 'Court',     desc: 'Issuing court and province' },
  { field: 'Date',      desc: 'Judgment date (2009–2024)' },
  { field: 'Full Text', desc: 'Complete judgment in Mandarin' },
]

export default function DataSection() {
  const ref = useFadeIn()

  return (
    <section id="data" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <p className="label-tag">Data</p>
          <h2 className="section-title">79 Court Cases, Decades of Disputes</h2>
          <p className="section-body" style={{ marginBottom: '3rem' }}>
            China Judgements Online is the world's largest public court database. We searched it
            with a single query — 退役运动员 — and traced every case where a retired athlete
            went to court.
          </p>

          {/* Pipeline steps */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ flex: '1 1 220px', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                {i > 0 && (
                  <div style={{
                    alignSelf: 'center', color: 'var(--text-muted)', flexShrink: 0,
                    fontSize: '1.2rem', marginLeft: -4, marginRight: -4,
                  }}>→</div>
                )}
                <div style={{
                  flex: 1,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '1.25rem',
                  borderTop: `3px solid ${s.color}`,
                }}>
                  <div style={{ color: s.color, marginBottom: '0.75rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Step {s.num} · {s.title}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
                    {s.body}
                  </p>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 300, color: s.color, lineHeight: 1 }}>
                    {s.stat}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                    {s.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data fields */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
          }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Fields Collected per Case
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {FIELDS.map(({ field, desc }) => (
                <div key={field} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 0.85rem',
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: '0.82rem',
                }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{field}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>— {desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

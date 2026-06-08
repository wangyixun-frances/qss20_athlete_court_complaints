import { useFadeIn } from '../hooks/useFadeIn'
import SectionHeader from './SectionHeader'

const INSIGHTS = [
  { color: '#1E8449', text: 'Sports Bureau (体育局) tops all keywords — named in 32 of 79 cases, spanning personnel, injury, and admin topics.' },
  { color: '#2980B9', text: 'Medical & injury terms (补偿费, 退役, 运动员) cluster together, confirming that T3 and T4 share vocabulary.' },
  { color: '#7D3C98', text: 'Commercial topic T2 is nearly absent from the top 15 — its vocabulary is specialised, concentrated in a smaller case cluster.' },
]

export default function KeywordSection() {
  const ref = useFadeIn()

  return (
    <section id="keywords" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <SectionHeader
            number="III"
            finding="Results III"
            title="Which Topics Own the Most Common Words?"
            body="Each bar shows one of the 15 most frequent keywords across all 79 cases. Bar length = total documents containing that keyword. Colors show how the LDA model distributes each keyword's probability mass across the 8 topics."
          />

          {/* Keyword chart */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            marginBottom: '1.75rem',
          }}>
            <div style={{
              padding: '0.65rem 1.1rem', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Top 15 Keywords · Document frequency by LDA topic · 8-Topic Model
              </span>
            </div>
            <div style={{ background: '#f8f9fa', padding: '0.5rem' }}>
              <img
                src="/keyword_distrib.png"
                alt="Stacked bar chart: top 15 corpus keywords by document frequency, colored by LDA topic"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
              />
            </div>
          </div>

          {/* Insight bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {INSIGHTS.map((ins, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                padding: '0.85rem 1.1rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                borderLeft: `3px solid ${ins.color}`,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ins.color, flexShrink: 0, marginTop: 5 }} />
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

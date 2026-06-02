import { useRef } from 'react'
import { topicsData } from '../data/topicsData'
import SectionHeader from './SectionHeader'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Finding2() {
  const ref = useFadeIn()

  return (
    <section id="finding2" className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <SectionHeader
            number="02"
            finding="Finding II"
            title="Main Topics of Concern"
            body="Using Latent Dirichlet Allocation (LDA) topic modeling on case text, five dominant themes emerge from athletes' judicial complaints. Labor and benefit disputes account for nearly half of all discussion."
          />

          {/* Topic pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
            {topicsData.map(t => (
              <TopicPill key={t.id} topic={t} />
            ))}
          </div>

          {/* LDA iframe */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                INTERACTIVE LDA VISUALIZATION · Click topics to explore term weights
              </span>
            </div>
            <iframe
              src="/lda_vis_en.html"
              title="LDA Topic Model Visualization"
              style={{
                width: '100%',
                height: '620px', // 720
                border: 'none',
                display: 'block',
                background: '#fff',
              }}
              loading="lazy"
            />
          </div>

          <p style={{
            marginTop: '1rem',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}>
            LDA model trained on segmented Mandarin case text using jieba tokenization · 5 topics · λ slider adjusts term relevance weighting
          </p>
        </div>
      </div>
    </section>
  )
}

function TopicPill({ topic }) {
  return (
    <div style={{
      border: `1px solid ${topic.color}33`,
      background: `${topic.color}11`,
      borderRadius: 100,
      padding: '0.45rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      cursor: 'default',
    }}>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: `${topic.color}22`,
        border: `1px solid ${topic.color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.65rem',
        fontWeight: 700,
        color: topic.color,
        flexShrink: 0,
      }}>
        T{topic.id}
      </div>
      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {topic.label}
        </div>
        <div style={{ fontSize: '0.68rem', color: topic.color }}>{topic.pct}%</div>
      </div>
    </div>
  )
}

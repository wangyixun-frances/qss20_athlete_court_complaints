import { useState } from 'react'
import { topicsData } from '../data/topicsData'
import SectionHeader from './SectionHeader'
import { useFadeIn } from '../hooks/useFadeIn'

const CLUSTER_COLORS = {
  'Personnel & Admin': '#1D6A39',
  'Medical & Injury':  '#154360',
  'Commercial':        '#6C3483',
}

const TOPIC_CLUSTERS = {
  1: 'Personnel & Admin',
  2: 'Commercial',
  3: 'Medical & Injury',
  4: 'Medical & Injury',
  5: 'Commercial',
  6: 'Personnel & Admin',
  7: 'Medical & Injury',
  8: 'Personnel & Admin',
}

export default function Finding2() {
  const ref = useFadeIn()
  const [activeId, setActiveId] = useState(null)

  const active = activeId ? topicsData.find(t => t.id === activeId) : null

  return (
    <section id="topics" className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <SectionHeader
            number="II"
            finding="Results II"
            title="Eight Dispute Clusters Emerge from the Text"
            body="LDA topic modeling on the case corpus surfaces 8 coherent dispute themes. Sports-HR and commercial cases each account for roughly a fifth of the corpus; medical/injury topics together represent another third."
          />

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Left: topic pills */}
            <div style={{ flex: '1 1 280px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Hover a topic to explore
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                {topicsData.map(t => (
                  <TopicRow
                    key={t.id} topic={t}
                    cluster={TOPIC_CLUSTERS[t.id]}
                    clusterColor={CLUSTER_COLORS[TOPIC_CLUSTERS[t.id]]}
                    isActive={activeId === t.id}
                    dimmed={activeId !== null && activeId !== t.id}
                    onEnter={() => setActiveId(t.id)}
                    onLeave={() => setActiveId(null)}
                  />
                ))}
              </div>

              {/* Cluster legend */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {Object.entries(CLUSTER_COLORS).map(([label, color]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: topic pie chart PNG */}
            <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '0.65rem 1.1rem',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Topic Distribution · 8-Topic LDA · n = 79 cases
                  </span>
                </div>
                <img
                  src="/topic_pie_n8.png"
                  alt="8-topic LDA pie chart with nested cluster arcs"
                  style={{ width: '100%', height: 'auto', display: 'block', background: '#fff' }}
                />
              </div>

              {/* Active topic detail card */}
              {active ? (
                <div style={{
                  background: 'var(--surface)',
                  border: `1px solid ${active.color}44`,
                  borderRadius: 'var(--radius)',
                  padding: '1.1rem 1.25rem',
                  borderLeft: `3px solid ${active.color}`,
                  transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.color, marginBottom: '0.3rem' }}>
                    T{active.id} · {active.pct}% of corpus
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {active.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{active.zh}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {active.keywords.map(kw => (
                      <span key={kw} style={{
                        fontSize: '0.72rem', padding: '0.2rem 0.55rem',
                        background: `${active.color}14`,
                        border: `1px solid ${active.color}30`,
                        borderRadius: 20, color: active.color,
                      }}>{kw}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--ink-mark)',
                  borderLeft: '2px solid var(--accent)',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                }}>
                  <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.2rem' }}>Key Insight</strong>
                  Sports-HR disputes (T1, T6, T8) and commercial cases (T2, T5) each account for ~31% of the corpus.
                  Medical and injury topics (T3, T4, T7) together cover another 34%.
                </div>
              )}
            </div>
          </div>

          {/* Interactive LDA */}
          <div style={{ marginTop: '3rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Interactive · Explore Term Weights
            </p>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.65rem 1.1rem', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--jade)' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  pyLDAvis · Click topics to see top terms · λ slider adjusts term weighting
                </span>
              </div>
              <iframe
                src="/lda_vis_en.html"
                title="Interactive LDA Topic Model"
                style={{ width: '100%', height: '580px', border: 'none', display: 'block', background: '#fff' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TopicRow({ topic, cluster, clusterColor, isActive, dimmed, onEnter, onLeave }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.55rem 0.85rem',
        background: isActive ? `${topic.color}14` : 'var(--surface)',
        border: `1px solid ${isActive ? topic.color + '44' : 'var(--border)'}`,
        borderRadius: 8,
        opacity: dimmed ? 0.35 : 1,
        transition: 'all 0.18s',
        cursor: 'default',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
        background: `${topic.color}22`, border: `1.5px solid ${topic.color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.62rem', fontWeight: 700, color: topic.color,
      }}>T{topic.id}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {topic.label}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 1 }}>{topic.zh}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <div style={{
          fontSize: '0.7rem', padding: '0.15rem 0.45rem',
          background: `${clusterColor}18`, border: `1px solid ${clusterColor}33`,
          borderRadius: 6, color: clusterColor, whiteSpace: 'nowrap',
        }}>{cluster}</div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: topic.color, width: 34, textAlign: 'right' }}>
          {topic.pct}%
        </span>
      </div>
    </div>
  )
}

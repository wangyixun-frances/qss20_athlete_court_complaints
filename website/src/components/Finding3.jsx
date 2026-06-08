import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { genderData, gapPct } from '../data/genderData'
import SectionHeader from './SectionHeader'
import { useFadeIn } from '../hooks/useFadeIn'

const MALE_COLOR = '#6B7DB3'
const FEMALE_COLOR = '#C8607A'

const COLORS = {
  Male: MALE_COLOR,
  Female: FEMALE_COLOR,
}

export default function Finding3() {
  const ref = useFadeIn()
  const svgRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false, data: null })

  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const size = Math.min(el.clientWidth || 420, 420)
    const W = size, H = size
    const r = size * 0.38
    const innerR = size * 0.22

    d3.select(el).selectAll('*').remove()

    const svg = d3.select(el)
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width', '100%')
      .attr('height', '100%')

    const g = svg.append('g').attr('transform', `translate(${W / 2},${H / 2})`)

    const pie = d3.pie().value(d => d.count).sort(null).padAngle(0.03)
    const arc = d3.arc().innerRadius(innerR).outerRadius(r).cornerRadius(3)
    const arcHover = d3.arc().innerRadius(innerR).outerRadius(r + 14).cornerRadius(3)

    const arcs = pie(genderData)

    const paths = g.selectAll('path')
      .data(arcs)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => COLORS[d.data.gender])
      .attr('opacity', 0.88)
      .style('cursor', 'pointer')

    paths
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(180).attr('d', arcHover).attr('opacity', 1)
        setHovered(d.data.gender)
        const rect = el.getBoundingClientRect()
        setTooltip({ visible: true, data: d.data, x: event.clientX - rect.left, y: event.clientY - rect.top })
        paths.filter(dd => dd.data.gender !== d.data.gender).attr('opacity', 0.28)
      })
      .on('mousemove', function (event) {
        const rect = el.getBoundingClientRect()
        setTooltip(t => ({ ...t, x: event.clientX - rect.left, y: event.clientY - rect.top }))
      })
      .on('mouseleave', function () {
        d3.select(this).transition().duration(180).attr('d', arc).attr('opacity', 0.88)
        setHovered(null)
        setTooltip(t => ({ ...t, visible: false }))
        paths.attr('opacity', 0.88)
      })

    // Animate in
    paths.attr('opacity', 0)
      .transition().duration(900).delay((d, i) => i * 150)
      .attr('opacity', 0.88)

    // Center label — updates on hover via separate React state, so just show total here
    const centerG = g.append('g')

    centerG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3em')
      .attr('font-family', 'var(--font-serif)')
      .attr('font-size', size * 0.07)
      .attr('fill', 'var(--text-primary)')
      .text('68')

    centerG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('font-size', size * 0.033)
      .attr('fill', 'var(--text-muted)')
      .attr('letter-spacing', '0.08em')
      .text('LITIGANTS')

  }, [])

  return (
    <section id="gender" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <SectionHeader
            number="IV"
            finding="Results IV"
            title="Females Athletes are Less Visible in Court"
            body="Despite comprising a large share of China's elite sports workforce, female athletes appear in only one-third of retired-athlete court cases. This 35-percentage-point gap is the study's most striking finding."
          />

          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>

            {/* Pie chart */}
            <div style={{ position: 'relative', flexShrink: 0, width: 'min(420px, 100%)' }}>
              <svg ref={svgRef} style={{ width: '100%', height: 'auto', aspectRatio: '1' }} />
              {tooltip.visible && tooltip.data && (
                <div style={{
                  position: 'absolute',
                  top: tooltip.y + 12,
                  left: tooltip.x + 12,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '0.6rem 1rem',
                  fontSize: '0.85rem',
                  pointerEvents: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                  zIndex: 10,
                  minWidth: 130,
                }}>
                  <div style={{ fontWeight: 600, color: COLORS[tooltip.data.gender], marginBottom: 2 }}>
                    {tooltip.data.gender}
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>{tooltip.data.count} litigants</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{tooltip.data.pct}% of total</div>
                </div>
              )}
            </div>

            {/* Insight panel */}
            <div style={{ flex: 1, minWidth: 200 }}>
              {/* Big stat */}
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                borderTop: `3px solid var(--accent)`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '3.5rem',
                  fontWeight: 300,
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {gapPct}%
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  less judicially visible —<br />
                  <strong style={{ color: 'var(--text-primary)' }}>female athletes</strong> vs. male counterparts
                </div>
              </div>

              {/* Legend with bars */}
              {[
                { gender: 'Male', count: 46, pct: 67.6, color: MALE_COLOR },
                { gender: 'Female', count: 22, pct: 32.4, color: FEMALE_COLOR },
              ].map(d => (
                <div key={d.gender} style={{
                  marginBottom: '1.25rem',
                  opacity: hovered && hovered !== d.gender ? 0.35 : 1,
                  transition: 'opacity 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {d.gender}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {d.count} · {d.pct}%
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${d.pct}%`,
                      background: d.color,
                      borderRadius: 2,
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: '1.5rem',
                padding: '0.9rem 1.1rem',
                background: 'var(--ink-mark)',
                borderLeft: '2px solid var(--accent)',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.2rem' }}>Interpretation</strong>
                This gap may reflect structural barriers in athletes' access to legal resources, differences in contract types, or social pressures that discourage female athletes from pursuing litigation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { genderData, gapPct } from '../data/genderData'
import SectionHeader from './SectionHeader'
import { useFadeIn } from '../hooks/useFadeIn'

const MALE_COLOR = '#6B7DB3'
const FEMALE_COLOR = '#C8607A'

export default function Finding3() {
  const ref = useFadeIn()
  const svgRef = useRef(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const W = Math.min(el.clientWidth || 500, 500)
    const H = 320
    const margin = { top: 30, right: 30, bottom: 40, left: 30 }

    d3.select(el).selectAll('*').remove()

    const svg = d3.select(el)
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width', '100%')
      .attr('height', '100%')

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    const innerW = W - margin.left - margin.right
    const innerH = H - margin.top - margin.bottom

    // Two large arcs — one per gender, centered in left/right halves
    const total = genderData.reduce((s, d) => s + d.count, 0)
    const maxR = Math.min(innerH * 0.85, innerW * 0.4) / 2

    const genders = [
      { ...genderData[0], x: innerW * 0.27, color: MALE_COLOR },    // Male left
      { ...genderData[1], x: innerW * 0.73, color: FEMALE_COLOR },  // Female right
    ]

    const centerY = innerH * 0.52

    genders.forEach(gd => {
      const r = maxR * Math.sqrt(gd.count / total) * 1.95
      const circleG = g.append('g').attr('transform', `translate(${gd.x},${centerY})`)

      // Background ring
      circleG.append('circle')
        .attr('r', maxR)
        .attr('fill', 'none')
        .attr('stroke', `${gd.color}18`)
        .attr('stroke-width', 2)

      // Filled arc arc (draws in)
      const arcPath = d3.arc()
        .innerRadius(maxR * 0.52)
        .outerRadius(maxR)
        .startAngle(-Math.PI / 2)
        .cornerRadius(4)

      const endAngle = -Math.PI / 2 + (gd.pct / 100) * Math.PI * 2

      circleG.append('path')
        .datum({ endAngle })
        .attr('d', arcPath.endAngle(-Math.PI / 2))
        .attr('fill', gd.color)
        .attr('opacity', 0.88)
        .transition()
        .duration(1100)
        .delay(gd.gender === 'Male' ? 100 : 300)
        .ease(d3.easeCubicOut)
        .attrTween('d', function (dd) {
          const interp = d3.interpolate(-Math.PI / 2, dd.endAngle)
          return t => arcPath.endAngle(interp(t))()
        })

      // Inner dot
      circleG.append('circle')
        .attr('r', maxR * 0.12)
        .attr('fill', gd.color)
        .attr('opacity', 0.4)

      // Percentage text
      circleG.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.15em')
        .attr('font-family', 'var(--font-serif)')
        .attr('font-size', maxR * 0.42)
        .attr('fill', gd.color)
        .attr('font-weight', '300')
        .text(`${gd.pct}%`)

      circleG.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.4em')
        .attr('font-size', maxR * 0.185)
        .attr('fill', 'var(--text-muted)')
        .attr('letter-spacing', '0.08em')
        .text(gd.gender.toUpperCase())

      // Count badge
      circleG.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', maxR + 22)
        .attr('font-size', maxR * 0.21)
        .attr('fill', 'var(--text-secondary)')
        .text(`n = ${gd.count}`)
    })

    // Center gap annotation
    const midX = innerW * 0.5
    svg.append('line')
      .attr('x1', margin.left + midX)
      .attr('y1', margin.top + centerY - maxR * 0.3)
      .attr('x2', margin.left + midX)
      .attr('y2', margin.top + centerY + maxR * 0.3)
      .attr('stroke', 'var(--border)')
      .attr('stroke-dasharray', '4,4')
      .attr('stroke-width', 1)

  }, [])

  return (
    <section id="finding3" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <SectionHeader
            number="03"
            finding="Finding III"
            title="Disparity of Gender Visibility"
            body="Female athletes are significantly underrepresented in judicial records. Despite comprising a substantial share of China's competitive sports workforce, they appear in only one-third of court cases involving retired athletes."
          />

          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Chart */}
            <div style={{ flex: '0 0 auto', width: 'min(480px, 100%)' }}>
              <svg ref={svgRef} style={{ width: '100%', height: 'auto', aspectRatio: '500/320', overflow: 'visible' }} />
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

              {/* Gender bars */}
              {[
                { gender: 'Male', count: 46, pct: 67.6, color: MALE_COLOR },
                { gender: 'Female', count: 22, pct: 32.4, color: FEMALE_COLOR },
              ].map(d => (
                <div key={d.gender} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {d.gender}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {d.count} cases · {d.pct}%
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${d.pct}%`,
                      background: d.color,
                      borderRadius: 3,
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

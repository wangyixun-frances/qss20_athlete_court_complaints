import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { lawsuitData, foundCases, totalCases } from '../data/lawsuitData'
import SectionHeader from './SectionHeader'
import { useFadeIn } from '../hooks/useFadeIn'

const COLORS = {
  Civil: '#4E9E7A',
  Administrative: '#C8102E',
  Criminal: '#C9A84C',
  Execution: '#6B7DB3',
}

export default function Finding1() {
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

    const pie = d3.pie().value(d => d.count).sort(null).padAngle(0.025)
    const arc = d3.arc().innerRadius(innerR).outerRadius(r).cornerRadius(3)
    const arcHover = d3.arc().innerRadius(innerR).outerRadius(r + 14).cornerRadius(3)

    const arcs = pie(lawsuitData)

    const paths = g.selectAll('path')
      .data(arcs)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => COLORS[d.data.category])
      .attr('opacity', 0.88)
      .style('cursor', 'pointer')
      .style('transition', 'opacity 0.2s')

    paths
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(180).attr('d', arcHover).attr('opacity', 1)
        setHovered(d.data.category)
        const rect = el.getBoundingClientRect()
        setTooltip({ visible: true, data: d.data, x: event.clientX - rect.left, y: event.clientY - rect.top })
        // dim others
        paths.filter(dd => dd.data.category !== d.data.category).attr('opacity', 0.3)
      })
      .on('mousemove', function (event) {
        const rect = el.getBoundingClientRect()
        setTooltip(t => ({ ...t, x: event.clientX - rect.left, y: event.clientY - rect.top }))
      })
      .on('mouseleave', function (event, d) {
        d3.select(this).transition().duration(180).attr('d', arc).attr('opacity', 0.88)
        setHovered(null)
        setTooltip(t => ({ ...t, visible: false }))
        paths.attr('opacity', 0.88)
      })

    // Animate arcs drawing in
    paths.attr('opacity', 0).transition().duration(900).delay((d, i) => i * 120).attr('opacity', 0.88)

    // Center label
    const centerG = g.append('g').attr('class', 'center-label')
    centerG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3em')
      .attr('font-family', 'var(--font-serif)')
      .attr('font-size', size * 0.07)
      .attr('fill', 'var(--text-primary)')
      .text(foundCases)

    centerG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('font-size', size * 0.035)
      .attr('fill', 'var(--text-muted)')
      .attr('letter-spacing', '0.08em')
      .text('CASES')

  }, [])

  return (
    <section id="finding1" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="section-inner">
        <div ref={ref} className="fade-in">
          <SectionHeader
            number="01"
            finding="Finding I"
            title="Complaints by Judicial Category"
            body="The vast majority of cases brought by retired athletes are civil suits — disputes over contracts, unpaid wages, and personal injury — rather than criminal or administrative proceedings."
          />

          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>

            {/* Donut chart */}
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
                  minWidth: 140,
                }}>
                  <div style={{ fontWeight: 600, color: COLORS[tooltip.data.category], marginBottom: 2 }}>
                    {tooltip.data.category}
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>{tooltip.data.count} cases</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{tooltip.data.pct}% of total</div>
                </div>
              )}
            </div>

            {/* Legend + insight */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {lawsuitData.map(d => (
                  <div
                    key={d.category}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      opacity: hovered && hovered !== d.category ? 0.35 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <div style={{
                      width: 10, height: 10,
                      borderRadius: '50%',
                      background: COLORS[d.category],
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {d.category}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {d.pct}%
                        </span>
                      </div>
                      <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${d.pct}%`,
                          background: COLORS[d.category],
                          borderRadius: 2,
                          transition: 'width 0.8s ease',
                        }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', width: 18, textAlign: 'right' }}>
                      {d.count}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1rem 1.25rem',
                background: 'var(--ink-mark)',
                borderLeft: '2px solid var(--accent)',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.25rem' }}>
                  Key Insight
                </strong>
                Civil cases dominate at 82.7%, primarily over labor disputes, retirement benefits, and contractual obligations with sports organizations.
              </div>

              <p style={{
                marginTop: '1.5rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
              }}>
                {foundCases} cases found out of {totalCases.toLocaleString()} total · Source: China Judgements Online
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

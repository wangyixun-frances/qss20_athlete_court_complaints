import { useFadeIn } from '../hooks/useFadeIn'

export default function Opening() {
  const ref = useFadeIn()

  return (
    <section id="question" className="section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <InkDecor />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="fade-in">
          <br /><br />

          <p className="label-tag">Research Question</p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 300,
            lineHeight: 1.12,
            color: 'var(--text-primary)',
            maxWidth: 820,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            In Court: what do{' '}
            <em style={{ color: 'var(--accent)' }}>retired Chinese athletes</em>{' '}
            actually sue about?
          </h1>

          <div className="accent-line" />

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: 600,
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            When professional sports careers end in China, grievances often end up in court.
            This study mines 164 million public court records to find those cases,
            classify their disputes by topic, and ask: whose voice is missing?
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Data Source</span>
            <a
              href="https://wenshu.court.gov.cn/website/wenshu/181029CR4M5A62CH/index.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.85rem', color: 'var(--text-secondary)',
                border: '1px solid var(--border)', borderRadius: 6,
                padding: '0.35rem 0.85rem', transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              China Judgements Online · 中国裁判文书网
            </a>
          </div>

          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { num: '81',    label: 'Cases Found' },
              { num: '164M+', label: 'Records Searched' },
              { num: '8',     label: 'Dispute Topics' },
              { num: '35%',   label: 'Gender Visibility Gap' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: '2.2rem',
                  fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1,
                }}>{num}</div>
                <div style={{
                  fontSize: '0.7rem', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.35rem',
                }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll to explore</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              style={{ animation: 'bounce 2s infinite' }}>
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </svg>
          </div>
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }`}</style>
    </section>
  )
}

function InkDecor() {
  return (
    <svg style={{ position: 'absolute', right: '-5%', top: '10%', opacity: 0.045, pointerEvents: 'none' }}
      width="600" height="600" viewBox="0 0 600 600">
      <circle cx="300" cy="300" r="280" fill="var(--accent)" />
      <circle cx="300" cy="300" r="200" fill="var(--bg)" />
      <circle cx="300" cy="300" r="140" fill="var(--accent)" />
      <circle cx="300" cy="300" r="80"  fill="var(--bg)" />
    </svg>
  )
}

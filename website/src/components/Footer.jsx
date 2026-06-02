export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 2.5rem',
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
            运动·法庭
          </span>
          <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Athlete · Court · Complaints
          </span>
        </div>
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
          lineHeight: 1.8,
        }}>
          Yixun Wang · Spring 2026 · QSS20 Modern Statistical Computing Final Project
          <br />
          Dartmouth College · Data: China Judgements Online (中国裁判文书网)
        </p>
      </div>
    </footer>
  )
}

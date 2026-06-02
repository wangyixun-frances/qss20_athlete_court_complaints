export default function SectionHeader({ number, finding, title, body }) {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="seal">{number}</div>
      </div>
      <h2 className="section-title">{title}</h2>
      {body && <p className="section-body">{body}</p>}
      <div className="accent-line" />
    </div>
  )
}

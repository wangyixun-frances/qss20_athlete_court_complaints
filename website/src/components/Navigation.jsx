import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'question', label: 'Question' },
  { id: 'data',     label: 'Data' },
  { id: 'method',   label: 'Method' },
  { id: 'results',  label: 'Results' },
  { id: 'takeaway', label: 'Takeaway' },
]

// Map every scroll-section id → the nav item it belongs to
const SECTION_NAV_MAP = {
  question: 'question',
  data:     'data',
  method:   'method',
  results:  'results',
  topics:   'results',
  keywords: 'results',
  gender:   'results',
  takeaway: 'takeaway',
}

export default function Navigation({ theme, setTheme }) {
  const [active, setActive] = useState('question')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = Object.keys(SECTION_NAV_MAP)
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(SECTION_NAV_MAP[id]) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <nav style={navStyle(scrolled)}>
      <div style={innerStyle}>
        <span style={brandStyle}>
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
            中国退役运动员诉讼研究
          </span>
        </span>

        <ul style={linksStyle}>
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                style={linkStyle(active === id)}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          style={toggleStyle}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

const navStyle = scrolled => ({
  position: 'fixed', top: 0, left: 0, right: 0,
  height: 'var(--nav-h)', zIndex: 100,
  background: 'var(--nav-bg)',
  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
  borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  transition: 'border-color 0.3s',
})

const innerStyle = {
  maxWidth: 1080, margin: '0 auto', height: '100%',
  padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
}

const brandStyle = { fontSize: '1.05rem', letterSpacing: '0.03em' }

const linksStyle = { listStyle: 'none', display: 'flex', gap: '2rem' }

const linkStyle = active => ({
  fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: active ? 'var(--accent)' : 'var(--text-secondary)',
  transition: 'color 0.2s', paddingBottom: '2px',
  borderBottom: active ? '1px solid var(--accent)' : '1px solid transparent',
})

const toggleStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 36, height: 36, borderRadius: '50%',
  border: '1px solid var(--border)', color: 'var(--text-secondary)',
  transition: 'color 0.2s, border-color 0.2s',
}

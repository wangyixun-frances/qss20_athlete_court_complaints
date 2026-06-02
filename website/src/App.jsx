import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Opening from './components/Opening'
import Finding1 from './components/Finding1'
import Finding2 from './components/Finding2'
import Finding3 from './components/Finding3'
import Auxiliary from './components/Auxiliary'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Navigation theme={theme} setTheme={setTheme} />
      <Opening />
      <Finding1 />
      <Finding2 />
      <Finding3 />
      <Auxiliary />
      <Footer />
    </div>
  )
}

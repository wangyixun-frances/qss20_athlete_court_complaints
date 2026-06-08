import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Opening from './components/Opening'
import DataSection from './components/DataSection'
import MethodSection from './components/MethodSection'
import Finding1 from './components/Finding1'
import Finding2 from './components/Finding2'
import KeywordSection from './components/KeywordSection'
import Finding3 from './components/Finding3'
import Auxiliary from './components/Auxiliary'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Navigation theme={theme} setTheme={setTheme} />
      <Opening />       {/* Question  */}
      <DataSection />   {/* Data      */}
      <MethodSection /> {/* Method    */}
      <Finding1 />      {/* Results I   – Case types        */}
      <Finding2 />      {/* Results II  – 8-Topic model     */}
      <KeywordSection />{/* Results III – Keyword frequency */}
      <Finding3 />      {/* Results IV  – Gender gap        */}
      <Auxiliary />     {/* Takeaway                        */}
      <Footer />
    </div>
  )
}

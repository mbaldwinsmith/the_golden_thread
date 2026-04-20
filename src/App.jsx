import { useEffect } from 'react'
import Garden from './components/Garden.jsx'

export default function App() {
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, window.scrollY / scrollable))
      const bar = document.getElementById('compass-bar')
      if (bar) bar.style.setProperty('--p', (p * 100) + '%')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="thread-compass">
        <span>the thread</span>
        <div className="thread-compass-bar" id="compass-bar" />
      </div>
      <div className="colophon">the golden thread · a garden of thirteen</div>
      <Garden />
    </>
  )
}

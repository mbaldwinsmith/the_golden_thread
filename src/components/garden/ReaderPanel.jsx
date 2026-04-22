import { useEffect, useRef } from 'react'
import Motif from '../Motif.jsx'

const BASE = import.meta.env.BASE_URL

export default function ReaderPanel({ poem, onClose, onPrev, onNext, fading, index, total }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [poem, onClose, onPrev, onNext])

  useEffect(() => {
    const prev = document.title
    if (poem) document.title = `${poem.title} — The Golden Thread`
    return () => { document.title = prev }
  }, [poem])

  if (!poem) return null

  return (
    <div className="reader-backdrop" onClick={onClose}>
      <div
        className="reader-panel"
        onClick={e => e.stopPropagation()}
        ref={ref}
        style={{ "--wash": poem.palette.wash, "--ink": poem.palette.ink }}
      >
        <button className="reader-close" onClick={onClose} aria-label="Close">×</button>
        <div className="reader-wash" />
        <div className={`reader-inner${fading ? ' reader-fading' : ''}`}>
          <div className="reader-motif">
            {poem.image ? (
              <img
                src={BASE + poem.image}
                alt=""
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 18px rgba(60,40,10,0.18)" }}
              />
            ) : (
              <Motif kind={poem.motif} size={68} color={poem.palette.ink} />
            )}
          </div>
          <div className="reader-eyebrow">From the garden</div>
          <h1 className="reader-title">{poem.title}</h1>
          {poem.epigraph && (
            <p className="reader-epigraph">{poem.epigraph}</p>
          )}
          <div className="reader-rule" />
          <div className="reader-body">{poem.body}</div>
          <div className="reader-nav">
            <button onClick={onPrev}>← along the thread</button>
            <span className="reader-count">{index + 1} / {total}</span>
            <button onClick={onNext}>further along →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

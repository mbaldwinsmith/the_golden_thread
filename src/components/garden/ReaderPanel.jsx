import { useEffect, useRef } from 'react'
import Motif from '../Motif.jsx'

import { author, poemPath, neighbour, followLink } from '../../publication.js'

const BASE = import.meta.env.BASE_URL

export default function ReaderPanel({ poem, onClose, onPrev, onNext, fading, index, total }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!poem) return
    ref.current.scrollTop = 0
    ref.current.focus({ preventScroll: true })
  }, [poem])

  useEffect(() => {
    if (!poem) return
    function onKey(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [poem, onClose, onPrev, onNext])

  if (!poem) return null

  return (
    <div className="reader-backdrop" onClick={onClose}>
      <article
        aria-labelledby="poem-title" tabIndex={-1}
        className="reader-panel"
        onClick={e => e.stopPropagation()}
        ref={ref}
        style={{ "--wash": poem.palette.wash, "--ink": poem.palette.ink }}
      >
        <a href="/" className="reader-close" onClick={e => followLink(e, onClose)} aria-label="Return to the garden">×</a>
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
          <div className="reader-eyebrow">{poem.label}</div>
          <h1 id="poem-title" className="reader-title">{poem.title}</h1>
          <p className="reader-credit">{author} · <a href="/poems/">The Golden Thread</a></p>
          {poem.epigraph && (
            <p className="reader-epigraph">{poem.epigraph}</p>
          )}
          <div className="reader-rule" />
          <div className="reader-body">
            {poem.body.split(/\r?\n\r?\n/).map((stanza, i) => (
              <p key={i}>{stanza.split(/\r?\n/).map((line, j) => (
                <span key={j}>{j > 0 && <br />}{line}</span>
              ))}</p>
            ))}
          </div>
          <nav aria-label="Poem navigation" className="reader-nav">
            <a href={poemPath(neighbour(index, -1))} onClick={e => followLink(e, onPrev)}>← along the thread</a>
            <span className="reader-count">{index + 1} / {total}</span>
            <a href={poemPath(neighbour(index, 1))} onClick={e => followLink(e, onNext)}>further along →</a>
          </nav>
        </div>
      </article>
    </div>
  )
}

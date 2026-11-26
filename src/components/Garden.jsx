import { useState, useEffect, useRef, useMemo } from 'react'
import { POEMS } from '../data/poems.js'
import { buildThreadPath } from '../utils/thread.js'
import Bloom from './garden/Bloom.jsx'
import Grasses from './garden/Grasses.jsx'
import PoemNode from './garden/PoemNode.jsx'
import ReaderPanel from './garden/ReaderPanel.jsx'

import { poemAt, poemPath, neighbour } from '../publication.js'

const W = 1000
const H = 2800

export default function Garden({ path }) {
  const poems = POEMS
  const activePoem = poemAt(path)
  const activeId = activePoem?.id
  const [visibleIds, setVisibleIds] = useState(new Set())
  const [threadProgress, setThreadProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const pathRef = useRef(null)
  const svgRef = useRef(null)
  const [pathLen, setPathLen] = useState(0)

  const threadD = useMemo(() => buildThreadPath(poems, W, H), [poems])

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength())
  }, [threadD])

  useEffect(() => {
    const onScroll = () => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const svgTop = rect.top
      const svgH = rect.height

      const newVisible = new Set()
      for (const poem of poems) {
        if (svgTop + poem.y * svgH < vh * 0.80) newVisible.add(poem.id)
      }
      setVisibleIds(newVisible)

      const firstY = poems[0].y * svgH
      const lastY = poems[poems.length - 1].y * svgH
      const threadSpan = lastY - firstY
      const scrolledIntoThread = vh * 0.5 - svgTop - firstY
      const raw = threadSpan > 0 ? scrolledIntoThread / threadSpan : 0
      setThreadProgress(isFinite(raw) ? Math.max(0, Math.min(1, raw)) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [poems])

  useEffect(() => {
    document.body.style.overflow = activeId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeId])

  const activeIdx = poems.indexOf(activePoem)
  const timer = useRef(null)
  const openingNode = useRef(null)

  useEffect(() => {
    if (!activeId && openingNode.current) {
      openingNode.current.focus({ preventScroll: true })
      openingNode.current = null
    }
  }, [activeId])

  useEffect(() => {
    const cancel = () => { clearTimeout(timer.current); setFading(false) }
    window.addEventListener('popstate', cancel)
    return () => { window.removeEventListener('popstate', cancel); clearTimeout(timer.current) }
  }, [])

  function openPoem(poem) {
    const depth = history.state?.gardenDepth ?? (path === '/' ? 0 : null)
    history.pushState({ gardenDepth: depth === null ? null : depth + 1 }, '', poemPath(poem))
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  function closeReader() {
    clearTimeout(timer.current)
    if (history.state?.gardenDepth > 0) history.go(-history.state.gardenDepth)
    else {
      history.replaceState(null, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  function navigate(step) {
    clearTimeout(timer.current)
    setFading(true)
    timer.current = setTimeout(() => openPoem(neighbour(activeIdx, step)), 180)
  }

  let threadHead = null
  if (pathRef.current && pathLen > 0 && isFinite(pathLen)) {
    try {
      const pt = pathRef.current.getPointAtLength(pathLen * Math.max(0, Math.min(1, threadProgress)))
      if (pt && isFinite(pt.x) && isFinite(pt.y)) threadHead = pt
    } catch (e) { /* ignore */ }
  }

  const dashOffset = isFinite(pathLen) && pathLen > 0
    ? pathLen * (1 - (isFinite(threadProgress) ? threadProgress : 0))
    : 0

  return (
    <>
      <section className="hero" inert={activeId ? '' : undefined}>
        <div className="hero-inner">
          <div className="hero-eyebrow">a poetic cycle by Mark Baldwin-Smith</div>
          <h1 className="hero-title">The Golden<br/>Thread</h1>
          <div className="hero-sub">Thirteen poems. One journey. Follow the thread.</div>
          <a className="contents-link" href="/poems/">All poems</a>
          <div className="hero-scroll">
            <span>scroll to begin</span>
            <div className="hero-caret">↓</div>
          </div>
        </div>
      </section>

      <div className="garden-wrap" inert={activeId ? '' : undefined}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="garden-svg"
        >
          <defs>
            <radialGradient id="paper-vignette" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#fbf5e6" />
              <stop offset="70%" stopColor="#f4ecd6" />
              <stop offset="100%" stopColor="#e7dcc0" />
            </radialGradient>
            {poems.map(p => (
              <filter key={p.id} id={`watercolour-${p.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={p.id.length} />
                <feDisplacementMap in="SourceGraphic" scale="8" />
              </filter>
            ))}
            <linearGradient id="thread-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9a436" />
              <stop offset="50%" stopColor="#c48624" />
              <stop offset="100%" stopColor="#a6701b" />
            </linearGradient>
            <filter id="thread-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={W} height={H} fill="url(#paper-vignette)" />

          <g opacity={0.55} style={{ mixBlendMode: "multiply" }}>
            {poems.map((p, i) => (
              <ellipse key={`field-${p.id}`}
                cx={p.x * W + (i % 2 ? 60 : -60)}
                cy={p.y * H + 40}
                rx={280} ry={180}
                fill={p.palette.wash}
              />
            ))}
          </g>

          <Grasses w={W} h={H} seed={3} />

          {poems.map(p => (
            <Bloom key={`bloom-${p.id}`} x={p.x * W} y={p.y * H} r={95} hue={p.palette.wash} id={p.id} />
          ))}

          <path d={threadD} fill="none" stroke="#d8c892" strokeWidth={1.8} strokeDasharray="4 8" opacity={0.55} />

          <path
            ref={pathRef}
            d={threadD}
            fill="none"
            stroke="url(#thread-grad)"
            strokeWidth={3.5}
            strokeLinecap="round"
            filter="url(#thread-glow)"
            style={{
              strokeDasharray: isFinite(pathLen) && pathLen > 0 ? pathLen : 0,
              strokeDashoffset: dashOffset,
              transition: "stroke-dashoffset 150ms linear",
            }}
          />

          {threadHead && (
            <g>
              <circle cx={threadHead.x} cy={threadHead.y} r={12} fill="#f7d97a" opacity={0.4} />
              <circle cx={threadHead.x} cy={threadHead.y} r={5} fill="#f5c23a" />
            </g>
          )}

          {poems.map((p, i) => (
            <PoemNode
              key={p.id}
              poem={p}
              index={i}
              cx={p.x * W}
              cy={p.y * H}
              visible={visibleIds.has(p.id)}
              active={activeId === p.id}
              onClick={node => {
                openingNode.current = node
                openPoem(p)
              }}
            />
          ))}
        </svg>
      </div>

      <section className="coda" inert={activeId ? '' : undefined}>
        <div className="coda-inner">
          <div className="coda-ornament">
            <span>✦</span><span>✦</span><span>✦</span>
          </div>
          <div className="coda-text">Home, at last,<br/>an exile no more.</div>
          <div className="coda-sub">— The Exile</div>
          <button className="coda-return" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ return to the beginning
          </button>
        </div>
      </section>

      <ReaderPanel
        poem={activePoem}
        onClose={closeReader}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        fading={fading}
        index={activeIdx}
        total={poems.length}
      />
    </>
  )
}

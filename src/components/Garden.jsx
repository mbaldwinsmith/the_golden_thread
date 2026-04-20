import { useState, useEffect, useRef, useMemo } from 'react'
import { POEMS } from '../data/poems.js'
import Motif from './Motif.jsx'

const BASE = import.meta.env.BASE_URL

function buildThreadPath(nodes, w, h) {
  if (nodes.length < 2) return ""
  const pts = nodes.map(n => ({ x: n.x * w, y: n.y * h }))
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const t = 0.5
    const cp1x = p1.x + (p2.x - p0.x) / 6 * (1/t)
    const cp1y = p1.y + (p2.y - p0.y) / 6 * (1/t)
    const cp2x = p2.x - (p3.x - p1.x) / 6 * (1/t)
    const cp2y = p2.y - (p3.y - p1.y) / 6 * (1/t)
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

const Bloom = ({ x, y, r, hue, id }) => (
  <g style={{ filter: `url(#watercolour-${id})`, mixBlendMode: "multiply" }}>
    <circle cx={x} cy={y} r={r} fill={hue} opacity={0.55} />
    <circle cx={x - r*0.3} cy={y - r*0.2} r={r*0.7} fill={hue} opacity={0.35} />
    <circle cx={x + r*0.25} cy={y + r*0.25} r={r*0.75} fill={hue} opacity={0.4} />
  </g>
)

const Grasses = ({ w, h, seed = 1 }) => {
  const rand = (n) => {
    const x = Math.sin(n * 9301 + seed * 49297) * 233280
    return x - Math.floor(x)
  }
  const blades = []
  for (let i = 0; i < 140; i++) {
    const x = rand(i) * w
    const y = rand(i + 1000) * h
    const len = 22 + rand(i + 2000) * 34
    const tilt = (rand(i + 3000) - 0.5) * 14
    const hueShift = rand(i + 4000)
    const color = hueShift < 0.33 ? "#a8b58a" : hueShift < 0.66 ? "#8fa078" : "#c7b98a"
    blades.push(
      <path key={i}
        d={`M ${x} ${y} Q ${x + tilt} ${y - len*0.6} ${x + tilt*1.5} ${y - len}`}
        stroke={color} strokeWidth={1} fill="none" opacity={0.5} strokeLinecap="round" />
    )
  }
  const dots = []
  for (let i = 0; i < 90; i++) {
    const x = rand(i + 5000) * w
    const y = rand(i + 6000) * h
    const r = 1.5 + rand(i + 7000) * 2.2
    const hue = rand(i + 8000)
    const color = hue < 0.5 ? "#d6b27a" : "#b89a5a"
    dots.push(<circle key={"d" + i} cx={x} cy={y} r={r} fill={color} opacity={0.4} />)
  }
  return <g>{blades}{dots}</g>
}

function wrapTitle(title, maxLen = 18) {
  const words = title.split(' ')
  const lines = []
  let current = ''
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxLen && current) {
      lines.push(current)
      current = w
    } else {
      current = (current + ' ' + w).trim()
    }
  }
  if (current) lines.push(current)
  return lines
}

function PoemNode({ poem, cx, cy, active, visible, onClick, index }) {
  const size = 180
  const titleLines = wrapTitle(poem.title)
  const lineH = 34
  return (
    <g
      style={{
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: `translate(${cx - size/2}px, ${cy - size/2}px) scale(${visible ? 1 : 0.7})`,
        transformOrigin: `${cx}px ${cy}px`,
        transition: `opacity 900ms ease ${index * 60}ms, transform 900ms cubic-bezier(.2,.8,.3,1.2) ${index * 60}ms`,
      }}
      onClick={onClick}
    >
      <circle cx={size/2} cy={size/2} r={size*0.52} fill={poem.palette.wash} opacity={0.9} />
      {poem.image ? (
        <>
          <defs>
            <clipPath id={`node-clip-${poem.id}`}>
              <circle cx={size/2} cy={size/2} r={size*0.42} />
            </clipPath>
          </defs>
          <image
            href={BASE + poem.image}
            x={size/2 - size*0.42}
            y={size/2 - size*0.42}
            width={size*0.84}
            height={size*0.84}
            clipPath={`url(#node-clip-${poem.id})`}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      ) : (
        <>
          <circle cx={size/2} cy={size/2} r={size*0.4} fill="#fffaf0" opacity={0.7} />
          <g transform={`translate(${size/2 - 55} ${size/2 - 55})`}>
            <Motif kind={poem.motif} size={110} color={poem.palette.ink} />
          </g>
        </>
      )}
      <circle cx={size/2} cy={size/2} r={size*0.42}
        fill="none"
        stroke={active ? "#b8892b" : "#c9b68a"}
        strokeWidth={active ? 2.2 : 1.2}
        strokeDasharray={active ? "0" : "3 4"}
        opacity={0.9}
      />
      <text
        x={size/2}
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'EB Garamond', serif"
        fontSize={30}
        fontStyle="italic"
        fill="#3a2e1a"
        fontWeight="500"
        style={{ pointerEvents: "none", letterSpacing: "0.01em" }}
      >
        {titleLines.map((line, i) => (
          <tspan key={i} x={size/2} dy={i === 0 ? size + 36 : lineH}>{line}</tspan>
        ))}
      </text>
      <text
        x={size/2} y={28}
        textAnchor="middle"
        fontFamily="'EB Garamond', serif"
        fontSize={17}
        fontStyle="italic"
        fill="#b8892b"
        style={{ pointerEvents: "none", letterSpacing: "0.22em" }}
      >
        {String(index + 1).padStart(2, "0")}
      </text>
    </g>
  )
}

function ReaderPanel({ poem, onClose, onPrev, onNext }) {
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

  if (!poem) return null

  return (
    <div className="reader-backdrop" onClick={onClose}>
      <div className="reader-panel" onClick={e => e.stopPropagation()} ref={ref}
        style={{ "--wash": poem.palette.wash, "--ink": poem.palette.ink }}>
        <button className="reader-close" onClick={onClose} aria-label="Close">×</button>
        <div className="reader-wash" />
        <div className="reader-inner">
          <div className="reader-motif">
            {poem.image ? (
              <img src={BASE + poem.image} alt="" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 18px rgba(60,40,10,0.18)" }} />
            ) : (
              <Motif kind={poem.motif} size={68} color={poem.palette.ink} />
            )}
          </div>
          <div className="reader-eyebrow">From the garden</div>
          <h1 className="reader-title">{poem.title}</h1>
          <div className="reader-rule" />
          <pre className="reader-body">{poem.body}</pre>
          <div className="reader-nav">
            <button onClick={onPrev}>← along the thread</button>
            <button onClick={onNext}>further along →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Garden() {
  const poems = POEMS
  const W = 1000
  const H = 2800
  const [activeId, setActiveId] = useState(null)
  const [visibleIds, setVisibleIds] = useState(new Set())
  const [threadProgress, setThreadProgress] = useState(0)
  const pathRef = useRef(null)
  const svgRef = useRef(null)
  const [pathLen, setPathLen] = useState(0)

  const threadD = useMemo(() => buildThreadPath(poems, W, H), [poems])

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength())
    }
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
        const poemScreenY = svgTop + (poem.y * svgH)
        if (poemScreenY < vh * 0.80) {
          newVisible.add(poem.id)
        }
      }
      setVisibleIds(newVisible)

      const firstY = poems[0].y * svgH
      const lastY = poems[poems.length - 1].y * svgH
      const threadSpan = lastY - firstY
      const scrolledIntoThread = (vh * 0.5) - svgTop - firstY
      const threadRaw = threadSpan > 0 ? scrolledIntoThread / threadSpan : 0
      const threadP = isFinite(threadRaw) ? Math.max(0, Math.min(1, threadRaw)) : 0
      setThreadProgress(threadP)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [poems])

  const activePoem = poems.find(p => p.id === activeId)
  const activeIdx = poems.findIndex(p => p.id === activeId)
  const goPrev = () => setActiveId(poems[(activeIdx - 1 + poems.length) % poems.length].id)
  const goNext = () => setActiveId(poems[(activeIdx + 1) % poems.length].id)

  let threadHead = null
  if (pathRef.current && pathLen > 0 && isFinite(pathLen)) {
    try {
      const t = Math.max(0, Math.min(1, threadProgress))
      const pt = pathRef.current.getPointAtLength(pathLen * t)
      if (pt && isFinite(pt.x) && isFinite(pt.y)) threadHead = pt
    } catch (e) { /* ignore */ }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">a poetic cycle by Mark Oriel</div>
          <h1 className="hero-title">The Golden<br/>Thread</h1>
          <div className="hero-sub">
            Thirteen poems. One journey. Follow the thread.
          </div>
          <div className="hero-scroll">
            <span>scroll to begin</span>
            <div className="hero-caret">↓</div>
          </div>
        </div>
      </section>

      <div className="garden-wrap">
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
            <Bloom key={"bloom-" + p.id}
              x={p.x * W} y={p.y * H}
              r={95}
              hue={p.palette.wash}
              id={p.id}
            />
          ))}

          <path d={threadD}
            fill="none"
            stroke="#d8c892"
            strokeWidth={1.8}
            strokeDasharray="4 8"
            opacity={0.55}
          />

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
              strokeDashoffset: (() => {
                const tp = isFinite(threadProgress) ? threadProgress : 0
                return isFinite(pathLen) && pathLen > 0 ? pathLen * (1 - tp) : 0
              })(),
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
              onClick={() => setActiveId(p.id)}
            />
          ))}
        </svg>
      </div>

      <section className="coda">
        <div className="coda-inner">
          <div className="coda-mark">✦</div>
          <div className="coda-text">
            Home, at last,<br/>an exile no more.
          </div>
          <div className="coda-sub">— The Exile</div>
        </div>
      </section>

      <ReaderPanel
        poem={activePoem}
        onClose={() => setActiveId(null)}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  )
}

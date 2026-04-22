import { memo } from 'react'
import Motif from '../Motif.jsx'
import { wrapTitle } from '../../utils/text.js'

const BASE = import.meta.env.BASE_URL
const NODE_SIZE = 180
const LINE_H = 34

const PoemNode = memo(function PoemNode({ poem, cx, cy, active, visible, onClick, index }) {
  const titleLines = wrapTitle(poem.title)
  const s = NODE_SIZE

  return (
    <g
      style={{
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: `translate(${cx - s / 2}px, ${cy - s / 2}px) scale(${visible ? 1 : 0.7})`,
        transformOrigin: `${cx}px ${cy}px`,
        transition: `opacity 900ms ease ${index * 60}ms, transform 900ms cubic-bezier(.2,.8,.3,1.2) ${index * 60}ms`,
      }}
      onClick={onClick}
    >
      <circle cx={s / 2} cy={s / 2} r={s * 0.52} fill={poem.palette.wash} opacity={0.9} />
      {poem.image ? (
        <>
          <defs>
            <clipPath id={`node-clip-${poem.id}`}>
              <circle cx={s / 2} cy={s / 2} r={s * 0.42} />
            </clipPath>
          </defs>
          <image
            href={BASE + poem.image}
            x={s / 2 - s * 0.42}
            y={s / 2 - s * 0.42}
            width={s * 0.84}
            height={s * 0.84}
            clipPath={`url(#node-clip-${poem.id})`}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      ) : (
        <>
          <circle cx={s / 2} cy={s / 2} r={s * 0.4} fill="#fffaf0" opacity={0.7} />
          <g transform={`translate(${s / 2 - 55} ${s / 2 - 55})`}>
            <Motif kind={poem.motif} size={110} color={poem.palette.ink} />
          </g>
        </>
      )}
      <circle
        cx={s / 2} cy={s / 2} r={s * 0.42}
        fill="none"
        stroke={active ? "#b8892b" : "#c9b68a"}
        strokeWidth={active ? 2.2 : 1.2}
        strokeDasharray={active ? "0" : "3 4"}
        opacity={0.9}
      />
      <text
        x={s / 2}
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'EB Garamond', serif"
        fontSize={30}
        fontStyle="italic"
        fill="#3a2e1a"
        fontWeight="500"
        style={{ pointerEvents: "none", letterSpacing: "0.01em" }}
      >
        {titleLines.map((line, i) => (
          <tspan key={i} x={s / 2} dy={i === 0 ? s + 36 : LINE_H}>{line}</tspan>
        ))}
      </text>
      <text
        x={s / 2} y={28}
        textAnchor="middle"
        fontFamily="'EB Garamond', serif"
        fontSize={17}
        fontStyle="italic"
        fill="#b8892b"
        style={{ pointerEvents: "none", letterSpacing: "0.22em" }}
      >
        {String(index + 1).padStart(2, "0")}
      </text>
      <text
        className="node-hint"
        x={s / 2} y={s / 2 + s * 0.36}
        textAnchor="middle"
        fontFamily="'EB Garamond', serif"
        fontSize={13}
        fontStyle="italic"
        fill="#b8892b"
        style={{ pointerEvents: "none", letterSpacing: "0.2em" }}
      >
        read
      </text>
    </g>
  )
})

export default PoemNode

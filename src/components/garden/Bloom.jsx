export default function Bloom({ x, y, r, hue, id }) {
  return (
    <g style={{ filter: `url(#watercolour-${id})`, mixBlendMode: "multiply" }}>
      <circle cx={x} cy={y} r={r} fill={hue} opacity={0.55} />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.7} fill={hue} opacity={0.35} />
      <circle cx={x + r * 0.25} cy={y + r * 0.25} r={r * 0.75} fill={hue} opacity={0.4} />
    </g>
  )
}

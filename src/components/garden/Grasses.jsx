import { memo } from 'react'

const Grasses = memo(function Grasses({ w, h, seed = 1 }) {
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
        d={`M ${x} ${y} Q ${x + tilt} ${y - len * 0.6} ${x + tilt * 1.5} ${y - len}`}
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
})

export default Grasses

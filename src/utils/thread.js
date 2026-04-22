export function buildThreadPath(nodes, w, h) {
  if (nodes.length < 2) return ""
  const pts = nodes.map(n => ({ x: n.x * w, y: n.y * h }))
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const t = 0.5
    const cp1x = p1.x + (p2.x - p0.x) / 6 * (1 / t)
    const cp1y = p1.y + (p2.y - p0.y) / 6 * (1 / t)
    const cp2x = p2.x - (p3.x - p1.x) / 6 * (1 / t)
    const cp2y = p2.y - (p3.y - p1.y) / 6 * (1 / t)
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

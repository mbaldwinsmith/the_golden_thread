export function wrapTitle(title, maxLen = 18) {
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

export function initialsUri(name: string, bg = '636150'): string {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/)
  const text =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  const encoded = encodeURIComponent(text)
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='6' fill='%23${bg}'/><text x='20' y='26' text-anchor='middle' fill='white' font-family='system-ui,sans-serif' font-weight='700' font-size='16'>${encoded}</text></svg>`
}

export function onLogoError(e: Event, name: string) {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallback) return
  img.dataset.fallback = '1'
  img.src = initialsUri(name)
}

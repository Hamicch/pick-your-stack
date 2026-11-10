import { toPng } from 'html-to-image'
import type { Tool, Category } from '@/data/categories'
import { diagramLayerOrder } from '@/data/categories'

interface Selection {
  category: Category
  tool: Tool
}

function download(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}

function createHiddenContainer(): HTMLDivElement {
  const el = document.createElement('div')
  el.style.position = 'fixed'
  el.style.left = '-9999px'
  el.style.top = '0'
  el.style.zIndex = '-1'
  document.body.appendChild(el)
  return el
}

function initialsUri(name: string): string {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/)
  const text =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  const encoded = encodeURIComponent(text)
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23636150'/><text x='20' y='26' text-anchor='middle' fill='white' font-family='system-ui,sans-serif' font-weight='700' font-size='16'>${encoded}</text></svg>`
}

async function toDataUri(url: string): Promise<string> {
  if (url.startsWith('data:')) return url
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(String(res.status))
    const blob = await res.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return ''
  }
}

async function resolveLogos(
  selections: Selection[]
): Promise<Map<string, string>> {
  const entries: { url: string; name: string }[] = []
  for (const s of selections) {
    entries.push({ url: s.tool.logo, name: s.tool.name })
  }
  const map = new Map<string, string>()
  await Promise.all(
    entries.map(async ({ url, name }) => {
      if (map.has(url)) return
      const dataUri = await toDataUri(url)
      map.set(url, dataUri || initialsUri(name))
    })
  )
  return map
}

const CAPTURE_OPTIONS = {
  pixelRatio: 2,
  skipFonts: true,
  imagePlaceholder:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23eeeeee'/></svg>",
}

export async function exportStackPng(selections: Selection[]) {
  const logos = await resolveLogos(selections)
  const container = createHiddenContainer()
  const year = new Date().getFullYear()

  container.innerHTML = `
    <div id="export-stack" style="
      width: 1200px;
      padding: 56px;
      background: #f7f7f7;
      font-family: Inter, Helvetica Neue, Arial, sans-serif;
      color: #26251f;
    ">
      <div style="
        font-family: Space Mono, monospace;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #636150;
        margin-bottom: 8px;
      ">YOUR STACK · ${year}</div>
      <h1 style="
        font-size: 48px;
        font-weight: 900;
        margin: 0 0 40px 0;
        line-height: 1.1;
      ">My ${year} Stack.</h1>
      <div style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      ">
        ${selections
          .map(
            (s) => `
          <div style="
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 24px;
            background: #ffffff;
            border: 2px solid #26251f;
            box-shadow: 4px 4px 0 #26251f;
          ">
            <img src="${logos.get(s.tool.logo)}" width="48" height="48" style="object-fit: contain;" />
            <div>
              <div style="
                font-family: Space Mono, monospace;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: #3b55c4;
                margin-bottom: 4px;
              ">${s.category.label.toUpperCase()}</div>
              <div style="
                font-size: 20px;
                font-weight: 700;
              ">${s.tool.name}</div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
      <div style="
        margin-top: 40px;
        font-family: Space Mono, monospace;
        font-size: 12px;
        color: #636150;
        letter-spacing: 0.04em;
      ">${selections.length} LAYERS · HAYATUSANUSI.COM</div>
    </div>
  `

  const node = container.querySelector('#export-stack') as HTMLElement
  const dataUrl = await toPng(node, CAPTURE_OPTIONS)
  download(dataUrl, `my-${year}-stack.png`)
  container.remove()
}

export async function exportDiagramPng(selections: Selection[]) {
  const logos = await resolveLogos(selections)
  const container = createHiddenContainer()
  const year = new Date().getFullYear()

  const layers = new Map<string, Selection[]>()
  for (const s of selections) {
    const layer = s.category.diagramLayer
    if (!layers.has(layer)) layers.set(layer, [])
    layers.get(layer)!.push(s)
  }

  const orderedLayers = diagramLayerOrder
    .filter((l) => layers.has(l))
    .map((l) => ({ name: l, items: layers.get(l)! }))

  const entryLayer = `
    <div style="text-align: center; margin-bottom: 8px;">
      <div style="
        font-family: Space Mono, monospace;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #636150;
        margin-bottom: 8px;
      ">ENTRY</div>
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        background: #ffffff;
        border: 2px solid #26251f;
        box-shadow: 4px 4px 0 #26251f;
      ">
        <div style="
          width: 40px; height: 40px;
          background: #3b55c4;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 900;
          font-size: 16px;
        ">U</div>
        <div>
          <div style="
            font-family: Space Mono, monospace;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #3b55c4;
            margin-bottom: 2px;
          ">ENTRY POINT</div>
          <div style="font-size: 16px; font-weight: 700;">User · Browser</div>
        </div>
      </div>
    </div>
  `

  const arrow = `
    <div style="text-align: center; padding: 12px 0;">
      <svg width="20" height="28" viewBox="0 0 20 28">
        <line x1="10" y1="0" x2="10" y2="22" stroke="#26251f" stroke-width="2"/>
        <polygon points="4,18 10,26 16,18" fill="#26251f"/>
      </svg>
    </div>
  `

  const layerHtml = orderedLayers
    .map(
      (layer, i) => `
    ${i > 0 || true ? arrow : ''}
    <div>
      <div style="
        font-family: Space Mono, monospace;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #636150;
        margin-bottom: 8px;
        ${layer.items.length > 1 ? '' : 'text-align: center;'}
      ">${layer.name.toUpperCase()}</div>
      <div style="
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
      ">
        ${layer.items
          .map(
            (s) => `
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            background: #ffffff;
            border: 2px solid #26251f;
            box-shadow: 4px 4px 0 #26251f;
            min-width: 180px;
          ">
            <img src="${logos.get(s.tool.logo)}" width="36" height="36" style="object-fit: contain;" />
            <div>
              <div style="
                font-family: Space Mono, monospace;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: #3b55c4;
                margin-bottom: 2px;
              ">${s.category.label.toUpperCase()}</div>
              <div style="font-size: 15px; font-weight: 700;">${s.tool.name}</div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
    )
    .join('')

  container.innerHTML = `
    <div id="export-diagram" style="
      width: 900px;
      padding: 56px;
      background: #f7f7f7;
      font-family: Inter, Helvetica Neue, Arial, sans-serif;
      color: #26251f;
    ">
      <div style="
        font-family: Space Mono, monospace;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #636150;
        margin-bottom: 8px;
      ">SYSTEM DESIGN · ARCHITECTURE</div>
      <h1 style="
        font-size: 40px;
        font-weight: 900;
        margin: 0 0 40px 0;
        line-height: 1.1;
      ">My ${year} Stack.</h1>
      ${entryLayer}
      ${layerHtml}
      <div style="
        margin-top: 40px;
        font-family: Space Mono, monospace;
        font-size: 12px;
        color: #636150;
        letter-spacing: 0.04em;
      ">${orderedLayers.length} LAYERS · HAYATUSANUSI.COM</div>
    </div>
  `

  const node = container.querySelector('#export-diagram') as HTMLElement
  const dataUrl = await toPng(node, CAPTURE_OPTIONS)
  download(dataUrl, `my-${year}-stack-diagram.png`)
  container.remove()
}

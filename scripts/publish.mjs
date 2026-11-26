import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createServer } from 'vite'
import { POEMS } from '../src/data/poems.js'
import { origin, poemPath } from '../src/publication.js'

const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<!--publication-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('The built HTML template is missing the publication head or React root.')
}
const paths = ['/', '/poems/', ...POEMS.map(poemPath)]
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { render } = await server.ssrLoadModule('/src/prerender.jsx')
  for (const path of paths) {
    const { head, body } = render(path)
    const directory = join('dist', path)
    await mkdir(directory, { recursive: true })
    await writeFile(join(directory, 'index.html'), template
      .replace('<!--publication-head-->', () => head)
      .replace('<div id="root"></div>', () => '<div id="root">' + body + '</div>'))
  }
} finally {
  await server.close()
}

const entries = paths.map(path => '  <url><loc>' + origin + path + '</loc></url>')
await writeFile('dist/sitemap.xml', ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...entries, '</urlset>', ''].join('\n'))
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n')

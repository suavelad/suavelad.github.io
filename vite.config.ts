import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { headHtml, pages, robotsTxt, sitemapXml } from './src/seo'

const START = '<!--seo:start-->'
const END = '<!--seo:end-->'
const block = (path: string) => `${START}\n    ${headHtml(path)}\n    ${END}`

/**
 * Static SEO for GitHub Pages:
 *  - injects per-page <title>, description, canonical, Open Graph, Twitter and JSON-LD
 *  - writes dist/<route>/index.html for every page so crawlers and link previews
 *    get the right metadata without running JavaScript
 *  - writes 404.html (SPA fallback), sitemap.xml and robots.txt
 */
function seo(): Plugin {
  let outDir = 'dist'
  return {
    name: 'static-seo',
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir)
    },
    transformIndexHtml(html) {
      return html.replace('<!--seo-->', block('/'))
    },
    closeBundle() {
      const home = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const swap = (path: string) => home.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block(path))
      for (const p of pages) {
        if (p.path === '/') continue
        const dir = resolve(outDir, p.path.slice(1))
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), swap(p.path))
      }
      writeFileSync(
        resolve(outDir, '404.html'),
        home
          .replace(new RegExp(`${START}[\\s\\S]*?${END}`), '<title>Page not found | Sunday Ajayi</title>\n    <meta name="robots" content="noindex" />'),
      )
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemapXml())
      writeFileSync(resolve(outDir, 'robots.txt'), robotsTxt())
    },
  }
}

// For a repo named <username>.github.io keep base '/'.
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  base: '/',
})

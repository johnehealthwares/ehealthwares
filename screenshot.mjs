import puppeteer from '/Users/john/develop/puppeteer/node_modules/puppeteer/index.js'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, 'temporary_screenshots')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const CHROME = '/Users/john/chrome/.cache/puppeteer/chrome/mac-149.0.7827.22/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'

const base = process.argv[2] || 'http://localhost:3000'
const paths = ['/', '/about', '/contact', '/products/rxsoft-pharmacy', '/services/digital-transformation']
const urls = paths.map((p) => base + p)

let n = 1
const cf = join(outDir, '.counter')
if (existsSync(cf)) n = parseInt(readFileSync(cf, 'utf8') || '1', 10) || 1
function next() {
  const c = n++
  writeFileSync(cf, String(n))
  return c
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const u of urls) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  try {
    await page.goto(u, { waitUntil: 'networkidle0', timeout: 60000 })
  } catch (e) {
    console.error('goto failed', u, e.message)
  }
  const name = `screenshot-${next()}.png`
  await page.screenshot({ path: join(outDir, name), fullPage: true })
  console.log('saved', name, '->', u)
  await page.close()
}

await browser.close()
console.log('DONE')

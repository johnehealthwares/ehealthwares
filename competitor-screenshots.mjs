import puppeteer from '/Users/john/develop/puppeteer/node_modules/puppeteer/index.js'
import { mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, 'temporary_screenshots/competitors')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const CHROME = '/Users/john/chrome/.cache/puppeteer/chrome/mac-149.0.7827.22/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

async function screenshot(url, name, selector, wait = 3000) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
    await new Promise(r => setTimeout(r, wait))
    if (selector) {
      const el = await page.$(selector)
      if (el) {
        await el.screenshot({ path: join(outDir, `${name}.png`) })
        console.log(`saved ${name}.png (section: ${selector}) -> ${url}`)
      } else {
        console.log(`WARN: selector "${selector}" not found on ${url}`)
        await page.screenshot({ path: join(outDir, `${name}.png`), fullPage: false })
        console.log(`saved ${name}.png (fallback full viewport)`)
      }
    } else {
      await page.screenshot({ path: join(outDir, `${name}.png`), fullPage: false })
      console.log(`saved ${name}.png (viewport) -> ${url}`)
    }
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`)
  }
  await page.close()
}

// GE Healthcare - Category section
await screenshot('https://www.gehealthcare.com/en-us#', 'ge-category', 'section', 4000)
// GE Healthcare - Investors section
await screenshot('https://www.gehealthcare.com/en-us#', 'ge-investors', null, 4000)
// GE Healthcare - Career opportunities (scroll to bottom)
await screenshot('https://www.gehealthcare.com/en-us#', 'ge-careers', null, 4000)
// Philips Nigeria - Hero section
await screenshot('https://www.philips.ng/healthcare', 'philips-hero', null, 4000)
// Siemens Healthineers - Hero section
await screenshot('https://www.siemens-healthineers.com/', 'siemens-hero', null, 4000)
// Siemens Healthineers - Latest topics
await screenshot('https://www.siemens-healthineers.com/', 'siemens-latest-topics', null, 4000)
// Siemens Healthineers - Products & Services page
await screenshot('https://www.siemens-healthineers.com/products-services', 'siemens-products-services', null, 4000)

await browser.close()
console.log('ALL DONE')

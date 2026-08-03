#!/usr/bin/env node
// render-og-default.mjs — one-time local generator for the site's default
// Open Graph card (ADDENDUM-3 §4, design 1a). Run after a normal Hugo build:
//
//   hugo && npm run og:default
//
// then commit the resulting static/og-default.png. This does NOT run in CI —
// the default card only changes when the wordmark or tagline changes, so
// regenerating it on every build would just be repo churn for no reason.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_PATH = path.join(ROOT, 'static', 'og-default.png');
const PORT = 4174;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
};

function serveStatic() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(req.url.split('?')[0]);
        if (urlPath.endsWith('/')) urlPath += 'index.html';
        const body = await readFile(path.join(PUBLIC_DIR, urlPath));
        res.writeHead(200, { 'Content-Type': MIME[path.extname(urlPath)] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end();
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  const server = await serveStatic();
  const browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {}
  );
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
    await page.goto(`http://localhost:${PORT}/ogcard.html`, { waitUntil: 'networkidle' });
    // Known failure modes A and B (redline sheet 5) — see render-og-cards.mjs.
    await page.waitForSelector('#broadsheet-print-plates', { state: 'attached', timeout: 5000 });
    await page.evaluate(() => document.fonts.ready);
    const shot = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
    await page.close();
    await sharp(shot).png({ palette: true }).toFile(OUT_PATH);
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`[og] wrote ${path.relative(ROOT, OUT_PATH)} — review it, then commit.`);
}

main();

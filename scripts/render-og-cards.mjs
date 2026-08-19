#!/usr/bin/env node
// render-og-cards.mjs — rasterizes the per-post Open Graph cards (ADDENDUM-3
// §4, option A from the Part 2 write-up).
//
// Hugo already built public/, including one bare 1200x630 card page per post
// at public/posts/<slug>/ogcard.html (see layouts/posts/single.ogcard.html
// and the OGCARD output format in hugo.toml). This script:
//   1. serves public/ over local HTTP (the card pages use absolute asset
//      paths, so file:// won't resolve them),
//   2. screenshots each ogcard.html into public/og/<slug>.png, skipping any
//      post whose ogcard.html is byte-identical to last run (cached in
//      .og-cache/, restored/saved by the CI workflow via actions/cache),
//   3. guarantees every post ends up with SOME image at public/og/<slug>.png
//      — falling back to a copy of the site default if a render throws —
//      and deletes the source ogcard.html pages so they never get published.
//
// Never exits non-zero: a broken renderer must not fail the site build. The
// workflow also runs an unconditional (`if: always()`) shell backfill after
// this script as a second, independent safety net — see .github/workflows/hugo.yml.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, rm, copyFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OG_DIR = path.join(PUBLIC_DIR, 'og');
const CACHE_DIR = path.join(ROOT, '.og-cache');
const MANIFEST_PATH = path.join(CACHE_DIR, 'manifest.json');
const DEFAULT_CARD = path.join(PUBLIC_DIR, 'og-default.png');
const PORT = 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon',
};

function serveStatic() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(req.url.split('?')[0]);
        if (urlPath.endsWith('/')) urlPath += 'index.html';
        const filePath = path.join(PUBLIC_DIR, urlPath);
        if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end(); return; }
        const body = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end();
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function findPostSlugs() {
  const postsDir = path.join(PUBLIC_DIR, 'posts');
  const entries = await readdir(postsDir, { withFileTypes: true });
  const slugs = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const cardPath = path.join(postsDir, e.name, 'ogcard.html');
    if (await stat(cardPath).catch(() => null)) slugs.push(e.name);
  }
  return slugs;
}

async function loadManifest() {
  return JSON.parse(await readFile(MANIFEST_PATH, 'utf8').catch(() => '{}'));
}

function hashOf(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

async function ensureFallback(slug, reason) {
  try {
    await copyFile(DEFAULT_CARD, path.join(OG_DIR, `${slug}.png`));
    console.warn(`[og] ${slug}: falling back to default card (${reason})`);
  } catch (err) {
    console.error(`[og] ${slug}: fallback copy also failed — ${err.message}`);
  }
}

async function main() {
  await mkdir(OG_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const slugs = await findPostSlugs();
  const manifest = await loadManifest();
  const nextManifest = {};
  let rendered = 0, cached = 0, fellBack = 0;

  const server = await serveStatic();
  const browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {}
  );

  try {
    for (const slug of slugs) {
      const cardHtmlPath = path.join(PUBLIC_DIR, 'posts', slug, 'ogcard.html');
      const html = await readFile(cardHtmlPath);
      const hash = hashOf(html);
      const cachedPngPath = path.join(CACHE_DIR, `${slug}.png`);
      const outPngPath = path.join(OG_DIR, `${slug}.png`);

      if (manifest[slug] === hash && await stat(cachedPngPath).catch(() => null)) {
        await copyFile(cachedPngPath, outPngPath);
        nextManifest[slug] = hash;
        cached++;
        continue;
      }

      try {
        const page = await browser.newPage({
          viewport: { width: 1200, height: 630 },
          reducedMotion: 'reduce',
        });
        await page.goto(`http://localhost:${PORT}/posts/${slug}/ogcard.html`, { waitUntil: 'networkidle', timeout: 15000 });
        // Known failure modes A and B (redline sheet 5): a flat black headline
        // (the print-plates.js SVG defs weren't in the document yet) or a
        // fallback serif (Source Serif 4 wasn't ready). networkidle alone
        // doesn't guarantee either, so wait for them explicitly.
        await page.waitForSelector('#broadsheet-print-plates', { state: 'attached', timeout: 5000 });
        await page.evaluate(() => document.fonts.ready);
        // nb-og-fit.js waits for the 600 face, then picks a rung. Screenshot
        // before that lands on fallback-font metrics (and a four-line title).
        await page.waitForSelector('[data-og-fit="done"]', { timeout: 5000 });
        const shot = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
        await page.close();
        // sRGB PNG per requirement #1; palette-quantize since these are flat
        // design graphics (paper ground, ink, a handful of plate colors) —
        // cuts a ~600KB raw screenshot to ~200KB with no visible banding.
        await sharp(shot).png({ palette: true }).toFile(outPngPath);
        await copyFile(outPngPath, cachedPngPath);
        nextManifest[slug] = hash;
        rendered++;
      } catch (err) {
        await ensureFallback(slug, err.message);
        fellBack++;
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(nextManifest, null, 2));

  // Belt-and-suspenders: any post that still has no card at all (a crash
  // before its turn, an unexpected exception) gets the default card too.
  for (const slug of slugs) {
    const outPngPath = path.join(OG_DIR, `${slug}.png`);
    if (!(await stat(outPngPath).catch(() => null))) {
      await ensureFallback(slug, 'no card produced');
      fellBack++;
    }
  }

  // The card source pages are a build-time implementation detail, never a
  // real page — remove them so nothing extra ships to Pages.
  await rm(path.join(PUBLIC_DIR, 'ogcard.html'), { force: true });
  for (const slug of slugs) {
    await rm(path.join(PUBLIC_DIR, 'posts', slug, 'ogcard.html'), { force: true });
  }
  for (const f of await readdir(path.join(PUBLIC_DIR, 'css')).catch(() => [])) {
    if (f.startsWith('ogcard-') && f.endsWith('.css')) {
      await rm(path.join(PUBLIC_DIR, 'css', f), { force: true });
    }
  }

  console.log(`[og] ${slugs.length} posts — ${rendered} rendered, ${cached} cached, ${fellBack} fell back to default`);
}

main().catch((err) => {
  // Never fail the build over this — log loudly and let the workflow's
  // unconditional backfill step cover whatever this run didn't get to.
  console.error('[og] render step failed entirely:', err);
  process.exitCode = 0;
});

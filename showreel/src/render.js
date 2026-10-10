// uso: node render.js stills <dir> f1,f2,...   |  node render.js video <out.mp4> <start> <end> [mb]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path'), fs = require('fs');
(async () => {
  const [mode, outp, a, b, mb] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', m => console.log('[page]', m.text()));
  page.on('pageerror', e => { console.error('[pageerror]', e.message); process.exit(1); });
  await page.goto('file://' + path.resolve(__dirname, 'reel.html') + (mb ? '?mb=' + mb : ''));
  const gl = await page.evaluate(() => window.ready);
  console.error('webgl:', gl);
  const clip = { x: 0, y: 0, width: 1920, height: 1080 };
  if (mode === 'stills') {
    fs.mkdirSync(outp, { recursive: true });
    for (const f of a.split(',').map(Number)) {
      await page.evaluate(f => window.renderFrame(f), f);
      await page.screenshot({ path: `${outp}/f${String(f).padStart(4, '0')}.png`, clip });
    }
  } else {
    const s = +a, e = +b;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '60', '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '10', '-pix_fmt', 'yuv444p', '-r', '60', outp], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let f = s; f < e; f++) {
      await page.evaluate(f => window.renderFrame(f), f);
      const buf = await page.screenshot({ type: 'png', clip });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if ((f - s) % 60 == 0) console.error(`${outp}: ${f - s}/${e - s} ${((Date.now() - t0) / (f - s + 1)).toFixed(0)}ms/f`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();

// uso:
//   node render_ads.js stills <outdir> <copyIdx> <fmt> <t1,t2,...>      (tiempos en segundos)
//   node render_ads.js batch  <outdir> <workers> <jobs: "i:fmt,i:fmt,...">
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path'), fs = require('fs');
const ARGS = ['--allow-file-access-from-files', '--disable-gpu']; // raster 2D por CPU: ~6x más rápido que SwiftShader
async function openPage(browser, fmt) {
  const page = await browser.newPage({ viewport: { width: 1080, height: fmt === 'reel' ? 1920 : 1080 } });
  page.on('pageerror', e => { console.error('[pageerror]', e.message); process.exit(1); });
  page.on('console', m => console.log('[page]', m.text()));
  await page.goto('file://' + path.resolve(__dirname, 'ads.html') + `?fmt=${fmt}`);
  await page.evaluate(() => window.ready);
  return page;
}
(async () => {
  const [mode, outdir] = process.argv.slice(2);
  fs.mkdirSync(outdir, { recursive: true });
  const browser = await chromium.launch({ args: ARGS });
  if (mode === 'stills') {
    const [, , , , idx, fmt, ts] = process.argv;
    const page = await openPage(browser, fmt);
    await page.evaluate(([i, f]) => window.setup(i, f, 1), [+idx, fmt]);
    for (const t of ts.split(',').map(Number)) {
      await page.evaluate(f => window.renderFrame(f), Math.round(t * 30));
      await page.screenshot({ path: `${outdir}/c${idx}_${fmt}_${t.toFixed(2).padStart(5, '0')}.png`, clip: { x: 0, y: 0, width: 1080, height: fmt === 'reel' ? 1920 : 1080 } });
    }
  } else {
    const [, , , , workers, jobsStr] = process.argv;
    const jobs = jobsStr.split(',').map(s => { const [i, f] = s.split(':'); return { i: +i, fmt: f }; });
    let next = 0;
    const worker = async (wid) => {
      const browser = await chromium.launch({ args: ARGS }); // un navegador por worker = render en paralelo real
      const pages = {};
      while (next < jobs.length) {
        const job = jobs[next++];
        if (!pages[job.fmt]) pages[job.fmt] = await openPage(browser, job.fmt);
        const page = pages[job.fmt];
        const info = await page.evaluate(([i, f]) => window.setup(i, f, 3), [job.i, job.fmt]);
        const out = `${outdir}/${info.id}_${job.fmt}.mp4`;
        const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', '-r', '30', out], { stdio: ['pipe', 'inherit', 'inherit'] });
        const t0 = Date.now();
        for (let f = 0; f < info.frames; f++) {
          const url = await page.evaluate(f => { window.renderFrame(f); return document.getElementById('c').toDataURL('image/png'); }, f);
          const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
          if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
        }
        ff.stdin.end(); await new Promise(r => ff.on('close', r));
        console.log(`[w${wid}] ${info.id}_${job.fmt} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      }
      await browser.close();
    };
    await Promise.all(Array.from({ length: +workers }, (_, k) => worker(k)));
  }
  await browser.close();
})();

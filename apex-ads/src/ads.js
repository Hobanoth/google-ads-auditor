// ============================================================================
//  APEX BLENDED SCHOOL — plantilla de anuncios animados (100% código)
//  Formatos: reel 1080x1920 · square 1080x1080 · 30 fps · 15 s
// ============================================================================
const FPS = 30, DUR = 15, TAU = Math.PI * 2;
const C = {
  navy: '#22192E', logoNavy: '#21182B', purple: '#453B87', purpleD: '#2D2462', deep: '#25172E',
  coral: '#DD3113', coralL: '#FF5B3A', coralD: '#B4260C', orange: '#DF6441', star: '#E23E21',
  lav: '#8786C1', lavL: '#D9D6F0', lavXL: '#EEECF7', cream: '#FBF7F1', grid: '#EAE4F0', white: '#FFFFFF', ink2: '#5E5672',
};
let FMT, W, H, COPY, TL, LY, MB = 3;

// ---------------------------------------------------------------- utilidades
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  outCubic: t => 1 - Math.pow(1 - t, 3), inCubic: t => t * t * t,
  inOutCubic: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outQuint: t => 1 - Math.pow(1 - t, 5), outExpo: t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  outBack: (t, s = 1.70158) => t <= 0 ? 0 : 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
};
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function mix(a, b, t) { const A = hexRgb(a), Bc = hexRgb(b); t = clamp(t); return `rgb(${Math.round(lerp(A[0], Bc[0], t))},${Math.round(lerp(A[1], Bc[1], t))},${Math.round(lerp(A[2], Bc[2], t))})`; }
function font(ctx, w, size, fam = 'Pop') { ctx.font = `${w} ${size}px ${fam}`; }
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.max(0, Math.min(r, w / 2, h / 2))); }

const cv = document.getElementById('c'), octx = cv.getContext('2d');
const sc = document.createElement('canvas'), sctx = sc.getContext('2d');

// ---------------------------------------------------------------- formas polares
function starR(a, inner = 0.47) {
  const k = 5, sec = TAU / k, half = Math.PI / k;
  let x = (((a + Math.PI / 2) % sec) + sec) % sec; if (x > half) x = sec - x;
  const x1 = 1, y1 = 0, x2 = inner * Math.cos(half), y2 = inner * Math.sin(half);
  const dx = x2 - x1, dy = y2 - y1;
  return (x1 * dy - y1 * dx) / (Math.cos(x) * dy - Math.sin(x) * dx);
}
const heartR = (function () {
  const pol = [];
  for (let k = 0; k < 3000; k++) {
    const t = k / 3000 * TAU, x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) - 2.5;
    pol.push([Math.atan2(y, x), Math.hypot(x, y)]);
  }
  pol.sort((a, b) => a[0] - b[0]);
  const N = 720, tab = new Float32Array(N); let j = 0;
  for (let k = 0; k < N; k++) {
    const a = -Math.PI + k / N * TAU;
    while (j < pol.length - 2 && pol[j + 1][0] < a) j++;
    const p0 = pol[j], p1 = pol[j + 1];
    tab[k] = lerp(p0[1], p1[1], p1[0] > p0[0] ? clamp((a - p0[0]) / (p1[0] - p0[0])) : 0);
  }
  let mx = 0; for (const v of tab) mx = Math.max(mx, v); for (let k = 0; k < N; k++) tab[k] /= mx;
  return a => { let f = (a + Math.PI) / TAU * N; f = ((f % N) + N) % N; const i0 = Math.floor(f); return lerp(tab[i0], tab[(i0 + 1) % N], f - i0); };
})();
const shapeR = (type, a) => type === 'heart' ? heartR(a) * 1.05 : type === 'star' ? starR(a) : 1;
function polarPath(ctx, x, y, R, fn, rot = 0, n = 160) {
  ctx.beginPath();
  for (let i = 0; i <= n; i++) { const a = -Math.PI + i / n * TAU; const r = R * fn(a - rot); const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath();
}
function starPath(ctx, x, y, R, inner = 0.47, rot = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) { const r = i % 2 ? R * inner : R, a = rot + i * Math.PI / 5; i ? ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
  ctx.closePath();
}
function sparkle(ctx, x, y, r, color, a = 1) {
  if (r <= 0.5) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = color; ctx.beginPath();
  ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill(); ctx.restore();
}
function heartPath(ctx, x, y, s) { ctx.beginPath(); ctx.moveTo(x, y + s * 0.75); ctx.bezierCurveTo(x - s * 1.25, y - s * 0.05, x - s * 0.6, y - s * 1.0, x, y - s * 0.38); ctx.bezierCurveTo(x + s * 0.6, y - s * 1.0, x + s * 1.25, y - s * 0.05, x, y + s * 0.75); ctx.closePath(); }

// ---------------------------------------------------------------- logo por capas
const LOGO = { meta: null, layers: {}, full: null };
async function loadLogo() {
  LOGO.meta = window.LOGO_META;
  const tint = { laurel_l: C.logoNavy, laurel_r: C.logoNavy, icon: C.logoNavy, est: C.logoNavy, y2020: C.logoNavy, globe: C.orange, star0: C.star, star1: C.star, star2: C.star };
  const full = document.createElement('canvas'); full.width = full.height = 800; const fx = full.getContext('2d');
  for (const k of Object.keys(tint)) {
    const img = new Image(); img.src = `../assets/logo_${k}.png`; await img.decode();
    const c = document.createElement('canvas'); c.width = c.height = 800; const x = c.getContext('2d');
    x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = tint[k]; x.fillRect(0, 0, 800, 800);
    LOGO.layers[k] = c; fx.drawImage(c, 0, 0);
  }
  LOGO.full = full;
}

// ---------------------------------------------------------------- texto
function measureW(ctx, w, size, wf) { font(ctx, wf(w), size); return ctx.measureText(w.text).width; }
function wrap(ctx, words, size, maxW, wf) {
  font(ctx, wf({}), size); const sp = ctx.measureText(' ').width;
  // unidades: una frase resaltada viaja junta (si cabe en una línea)
  const units = []; let run = null;
  for (const w0 of words) {
    const w = { ...w0, w: measureW(ctx, w0, size, wf) };
    if (w.hl && run) { run.push(w); continue; }
    if (run) { units.push(run); run = null; }
    if (w.hl) run = [w]; else units.push([w]);
  }
  if (run) units.push(run);
  const flat = [];
  for (const u of units) { const uw = u.reduce((a, w) => a + w.w, 0) + sp * (u.length - 1); if (u.length > 1 && uw > maxW) u.forEach(w => flat.push([w])); else flat.push(u); }
  const lines = []; let cur = [], cw = 0;
  for (const u of flat) {
    const uw = u.reduce((a, w) => a + w.w, 0) + sp * (u.length - 1), add = cur.length ? sp + uw : uw;
    if (cur.length && cw + add > maxW) { lines.push({ words: cur, w: cw }); cur = []; cw = 0; }
    cw += cur.length ? sp + uw : uw; cur.push(...u);
  }
  if (cur.length) lines.push({ words: cur, w: cw });
  for (const L of lines) { let x = 0; for (const w of L.words) { w.x = x; x += w.w + sp; } }
  return { lines, sp };
}
// Corte de líneas óptimo (programación dinámica): líneas parejas, sin "viudas" y sin partir la frase resaltada.
function layoutDP(ctx, words, size, maxW, wf, maxLines) {
  font(ctx, wf({}), size); const sp = ctx.measureText(' ').width;
  const ws = words.map(w => ({ ...w, w: measureW(ctx, w, size, wf) }));
  const units = [];
  for (let i = 0; i < ws.length;) {
    let j = i, uw = ws[i].w;
    if (ws[i].hl) while (j + 1 < ws.length && ws[j + 1].hl) { j++; uw += sp + ws[j].w; }
    if (j > i && uw > maxW) { for (let k = i; k <= j; k++) units.push({ a: k, b: k, w: ws[k].w }); }
    else units.push({ a: i, b: j, w: uw });
    i = j + 1;
  }
  const n = units.length, INF = 1e30;
  const lw = (p, q) => { let w = 0; for (let k = p; k < q; k++) w += units[k].w + (k > p ? sp : 0); return w; };
  const dp = [], pv = [];
  for (let k = 0; k <= maxLines; k++) { dp.push(new Array(n + 1).fill(INF)); pv.push(new Array(n + 1).fill(-1)); }
  dp[0][0] = 0;
  for (let k = 1; k <= maxLines; k++) for (let j = 1; j <= n; j++) for (let p = 0; p < j; p++) {
    if (dp[k - 1][p] >= INF) continue;
    const w = lw(p, j); if (w > maxW + 0.5) continue;
    let c = (maxW - w) * (maxW - w);
    const lone = j - p === 1 && units[p].a === units[p].b; // una sola palabra en la línea
    if (lone && j === n && k > 1 && w < 0.5 * maxW) c += 1e15; // viuda al final
    else if (lone && !(k === 1 && j === n) && w < 0.4 * maxW) c += 1e15; // palabra corta aislada a media frase
    if (dp[k - 1][p] + c < dp[k][j]) { dp[k][j] = dp[k - 1][p] + c; pv[k][j] = p; }
  }
  let bk = -1; for (let k = 1; k <= maxLines; k++) if (dp[k][n] < INF && (bk < 0 || dp[k][n] < dp[bk][n])) bk = k;
  if (bk < 0) return null;
  const cuts = []; for (let k = bk, j = n; k > 0; j = pv[k][j], k--) cuts.unshift([pv[k][j], j]);
  const lines = cuts.map(([p, q]) => {
    const lws = []; for (let u = p; u < q; u++) for (let k = units[u].a; k <= units[u].b; k++) lws.push({ ...ws[k] });
    let x = 0; for (const w of lws) { w.x = x; x += w.w + sp; }
    return { words: lws, w: x - sp };
  });
  return { lines, sp, orphan: dp[bk][n] >= 1e15 };
}
function fit(ctx, words, bw, bh, o) {
  for (let size = o.max; size >= o.min; size -= 2) {
    const maxLines = Math.min(o.maxLines || 99, Math.floor(bh / (size * o.lh) + 1e-6));
    if (maxLines < 1) continue;
    let r = layoutDP(ctx, words, size, bw, o.wf, maxLines);
    if (!r || r.orphan) continue;
    if (o.balance && r.lines.length > 1) { // ancho mínimo que conserva el mismo número de líneas → bloque parejo
      font(ctx, o.wf({}), size); const sp = ctx.measureText(' ').width; let run = 0, cur = -1;
      for (const w of words) { const ww = measureW(ctx, w, size, o.wf); if (w.hl) { cur = cur < 0 ? ww : cur + sp + ww; run = Math.max(run, cur); } else cur = -1; }
      const k = r.lines.length; let lo = Math.max(bw * 0.35, run <= bw ? run + 1 : 0), hi = bw;
      for (let it = 0; it < 14; it++) { const mid = (lo + hi) / 2, t = layoutDP(ctx, words, size, mid, o.wf, k); if (t && !t.orphan && t.lines.length <= k) hi = mid; else lo = mid; }
      r = layoutDP(ctx, words, size, hi, o.wf, k) || r;
    }
    return { size, lh: o.lh, lines: r.lines, sp: r.sp };
  }
  const r = layoutDP(ctx, words, o.min, bw, o.wf, 99);
  return { size: o.min, lh: o.lh, lines: r.lines, sp: r.sp };
}

// ---------------------------------------------------------------- layout por formato
function makeLayout(fmt) {
  if (fmt === 'reel') return {
    chip: { y: 318, s: 1.22 }, hook: { x: 80, y: 385, w: 920, h: 450, max: 100, min: 50 },
    ill: { cx: 540, cy: 1060, u: 405 }, grid: 60,
    tab: { h: 455, size: 108, textY: 392, pad: 70 },
    stack: { x: 78, y: 500, w: 924, h: 760 }, card: { h: 152, size: 52 }, st: { max: 90, min: 46 }, plusH: 70, gap: 38,
    logo: { cx: 540, cy: 600, s: 0.7 }, lock: { y: 905 }, pill: { cy: 1170, h: 124, size: 48, maxW: 920 },
    bar: { y: 1475, w: 780, h: 116 }, doodles: 'reel',
  };
  return {
    chip: { y: 74, s: 0.9 }, hook: { x: 80, y: 128, w: 920, h: 330, max: 84, min: 42 },
    ill: { cx: 540, cy: 778, u: 345 }, grid: 54,
    tab: { h: 196, size: 86, textY: 146, pad: 60 },
    stack: { x: 112, y: 236, w: 856, h: 790 }, card: { h: 120, size: 42 }, st: { max: 72, min: 40 }, plusH: 58, gap: 28,
    logo: { cx: 540, cy: 338, s: 0.5 }, lock: { y: 595 }, pill: { cy: 858, h: 108, size: 42, maxW: 860 },
    bar: { y: 968, w: 660, h: 104 }, doodles: 'square',
  };
}

function buildRows(ctx, card, stc, gap, plusH, stShare) {
  const S = STK; ROWS = [];
  const onlySt = COPY.items.filter(i => i.card).length === 0;
  COPY.items.forEach((it, k) => {
    const row = { t: TL.items[k].t, k };
    if (it.st) {
      const words = APEX_TL.parseRich(it.st);
      const mx = onlySt ? stc.max * 1.12 : stc.max;
      row.type = 'st'; row.f = fit(ctx, words, S.w, S.h * (stShare || (onlySt ? 0.62 : 0.42)), { max: Math.round(mx), min: stc.min, lh: 1.14, balance: false, wf: w => w.hl ? 800 : 700 });
      row.h = row.f.lines.length * row.f.size * row.f.lh;
    } else if (it.card) {
      row.type = 'card'; row.icon = it.card; row.h = card.h;
      const words = APEX_TL.parseRich(it.text), inner = S.w - card.h * 0.62 - 64;
      let size = card.size, r;
      for (; size > 24; size -= 1) { r = wrap(ctx, words, size, 1e9, w => w.b ? 700 : 500); if (r.lines[0].w <= inner) break; }
      row.size = size; row.line = r.lines[0];
    } else if (it.plus) { row.type = 'plus'; row.h = plusH; }
    else if (it.icons) { row.type = 'icons'; row.icons = it.icons; row.h = card.h * 1.25; }
    ROWS.push(row);
  });
  let total = 0; ROWS.forEach((r, i) => { total += r.h + (i ? (r.type === 'plus' || ROWS[i - 1].type === 'plus' ? 6 : gap) : 0); });
  ROWS.total = total;
  let y = S.y + Math.max(0, (S.h - total) / 2);
  ROWS.forEach((r, i) => { if (i) y += (r.type === 'plus' || ROWS[i - 1].type === 'plus' ? 6 : gap); r.y = y; y += r.h; });
}

let HOOK, ROWS, TAB, PILL, DOODLES, CONF, LOCK, STK, HDR, PANEL;
function prepare() {
  const ctx = sctx;
  // gancho
  HOOK = fit(ctx, TL.words, LY.hook.w, LY.hook.h, { max: LY.hook.max, min: LY.hook.min, lh: 1.13, balance: true, maxLines: 4, wf: w => w.hl ? 800 : 700 });
  { const g = hookGeo(); HOOK.bottom = g.geo[g.geo.length - 1].y + g.size * 0.4; }
  // pestaña
  font(ctx, 400, LY.tab.size, 'Scr'); TAB = { tw: ctx.measureText(COPY.tab).width }; TAB.w = TAB.tw + LY.tab.pad * 2;
  if (TL.v === 2) {
    // encabezado: la pregunta se encoge y sube; el panel morado ocupa el resto
    const reel = FMT === 'reel', total = HOOK.lines.length * HOOK.size * HOOK.lh;
    HDR = { top: LY.hook.y + (LY.hook.h - total) / 2, hs: reel ? 0.62 : 0.66, HT: reel ? 300 : 40 };
    HDR.bottom = HDR.HT + total * HDR.hs;
    PANEL = { top: HDR.bottom + (reel ? 34 : 24), tabH: reel ? 150 : 112, tabSize: reel ? 88 : 68, tabPad: reel ? 56 : 46 };
    PANEL.textY = PANEL.tabH * 0.7;
    const bottom = reel ? 1255 : 1042, sy = PANEL.top + PANEL.tabH + (reel ? 30 : 22);
    STK = { x: reel ? 78 : 112, y: sy, w: reel ? 924 : 856, h: bottom - sy };
    let card = reel ? { h: 124, size: 46 } : { h: 112, size: 40 }, st = reel ? { max: 74, min: 38 } : { max: 64, min: 34 };
    let gap = reel ? 26 : 22, plusH = reel ? 54 : 48;
    for (let k = 0; k < 8; k++) {
      buildRows(ctx, card, st, gap, plusH, 0.5);
      if (ROWS.total <= STK.h) break;
      card = { h: card.h * 0.93, size: Math.max(28, Math.round(card.size * 0.93)) }; st = { max: Math.round(st.max * 0.93), min: st.min }; gap *= 0.9; plusH *= 0.93;
    }
  } else {
    STK = LY.stack;
    buildRows(ctx, LY.card, LY.st, LY.gap, LY.plusH, null);
  }
  // CTA
  const P = LY.pill; let size = P.size;
  for (; size > 24; size--) { font(ctx, 700, size); const tw = ctx.measureText(COPY.cta).width; if (tw + P.h * 1.1 + 96 <= P.maxW) break; }
  font(ctx, 700, size); PILL = { size, tw: ctx.measureText(COPY.cta).width }; PILL.w = PILL.tw + P.h * 1.1 + 96;
  // garabatos de fondo (deterministas)
  const r = rng(5 + COPY.id.length);
  const spots = LY.doodles === 'reel'
    ? [[110, 1450], [960, 1520], [180, 1700], [880, 1760], [520, 1640], [70, 880], [1010, 760], [330, 1820], [720, 1830], [990, 1180]]
    : [[60, 560], [1020, 520], [70, 1010], [1015, 1000], [120, 300], [960, 250]];
  const types = ['star', 'plus', 'circle', 'squiggle', 'tri'];
  DOODLES = spots.map((p, i) => ({ x: p[0], y: p[1], type: types[i % 5], s: 16 + r() * 16, rot: r() * TAU, ph: r() * TAU, t0: 0.4 + i * 0.07 }));
  // confeti
  const rc = rng(99); CONF = [];
  for (let i = 0; i < 80; i++) CONF.push({ a: -Math.PI / 2 + (rc() - 0.5) * 2.9, v: 0.9 + rc() * 1.3, rot: rc() * TAU, vr: (rc() - 0.5) * 14, s: 0.02 + rc() * 0.03, type: Math.floor(rc() * 4), col: [C.coral, C.orange, C.lav, C.purple, C.coralL][Math.floor(rc() * 5)] });
}

// ============================================================================
//  FONDO + DETALLES
// ============================================================================
function paper(ctx, t, intro) {
  ctx.fillStyle = C.cream; ctx.fillRect(0, 0, W, H);
  const g = LY.grid;
  ctx.fillStyle = C.grid;
  for (let y = g * 0.5, i = 0; y < H; y += g, i++) {
    const p = intro ? E.outCubic(prog(t, 0.02 + (y / H) * 0.35, 0.55 + (y / H) * 0.35)) : 1;
    if (p > 0) ctx.fillRect(0, y - 1, W * p, 2);
  }
  ctx.globalAlpha = 0.55;
  for (let x = g * 0.5; x < W; x += g) {
    const p = intro ? E.outCubic(prog(t, 0.1 + (x / W) * 0.3, 0.65 + (x / W) * 0.3)) : 1;
    if (p > 0) ctx.fillRect(x - 1, 0, 2, H * p);
  }
  ctx.globalAlpha = 1;
}
function doodles(ctx, t, alpha = 1) {
  ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const d of DOODLES) {
    const p = E.outBack(prog(t, d.t0, d.t0 + 0.4), 2); if (p <= 0) continue;
    const x = d.x, y = d.y + Math.sin(t * 1.4 + d.ph) * 7, s = d.s * p;
    ctx.save(); ctx.translate(x, y); ctx.rotate(d.rot + Math.sin(t * 0.9 + d.ph) * 0.25);
    ctx.globalAlpha = 0.6 * alpha; ctx.strokeStyle = d.type === 'star' || d.type === 'tri' ? C.coral : C.lav; ctx.fillStyle = ctx.strokeStyle;
    ctx.globalAlpha *= d.type === 'star' || d.type === 'tri' ? 0.55 : 1;
    if (d.type === 'star') { starPath(ctx, 0, 0, s, 0.45); ctx.stroke(); }
    else if (d.type === 'plus') { ctx.beginPath(); ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.moveTo(0, -s); ctx.lineTo(0, s); ctx.stroke(); }
    else if (d.type === 'circle') { ctx.beginPath(); ctx.arc(0, 0, s * 0.8, 0, TAU); ctx.stroke(); }
    else if (d.type === 'squiggle') { ctx.beginPath(); for (let k = 0; k <= 24; k++) { const xx = -s * 1.4 + k / 24 * s * 2.8, yy = Math.sin(k / 24 * TAU * 1.5) * s * 0.35; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.9, s * 0.6); ctx.lineTo(-s * 0.9, s * 0.6); ctx.closePath(); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
}
function chip(ctx, t, a = 1) {
  const p = E.outCubic(prog(t, 0.08, 0.6)); if (p <= 0) return;
  const s = LY.chip.s, lg = 82 * s;
  font(ctx, 800, 30 * s); const w1 = ctx.measureText('BLENDED ').width, w2 = ctx.measureText('SCHOOL').width;
  const tw = w1 + w2, total = lg + 16 * s + tw, x0 = W / 2 - total / 2, y = LY.chip.y + (1 - p) * -24;
  ctx.save(); ctx.globalAlpha = p * a;
  ctx.drawImage(LOGO.full, x0, y - lg / 2, lg, lg);
  const tx = x0 + lg + 16 * s;
  font(ctx, 600, 15 * s); ctx.letterSpacing = '0.62em'; ctx.fillStyle = C.purple; ctx.fillText('APEX', tx + 2, y - 8 * s); ctx.letterSpacing = '0px';
  font(ctx, 800, 30 * s); ctx.fillStyle = C.navy; ctx.fillText('BLENDED ', tx, y + 24 * s); ctx.fillStyle = C.coral; ctx.fillText('SCHOOL', tx + w1, y + 24 * s);
  ctx.restore();
}

// ============================================================================
//  GANCHO: la pregunta palabra por palabra + resaltado
// ============================================================================
function hookGeo() {
  const F = HOOK, size = F.size, lh = size * F.lh, total = F.lines.length * lh;
  const y0 = LY.hook.y + (LY.hook.h - total) / 2 + size * 0.86;
  const geo = []; let i = 0;
  F.lines.forEach((L, li) => { const lx = W / 2 - L.w / 2, by = y0 + li * lh; L.words.forEach(w => geo.push({ w, x: lx + w.x, y: by, i: i++, li })); });
  const segs = [];
  geo.forEach(g => {
    if (!g.w.hl) return;
    const last = segs[segs.length - 1];
    if (last && last.li === g.li && last.end === g.i - 1) { last.x1 = g.x + g.w.w; last.end = g.i; }
    else segs.push({ li: g.li, x0: g.x, x1: g.x + g.w.w, y: g.y, start: g.i, end: g.i });
  });
  let acc = 0; segs.forEach(s => { s.a = acc; acc += s.x1 - s.x0; }); segs.forEach(s => { s.a /= acc; s.b = s.a + (s.x1 - s.x0) / acc; });
  return { geo, segs, size };
}
function drawHook(ctx, t) {
  if (TL.v === 2) {
    const hp = E.inOutCubic(prog(t, TL.panelT - 0.3, TL.panelT + 0.3)); // el encabezado se adelanta al panel
    const pop = 1 + 0.035 * (1 - E.outCubic(prog(t, 0, 0.4)));
    const sc = lerp(1, HDR.hs, hp) * pop, ty = lerp(HDR.top, HDR.HT, hp);
    ctx.save(); ctx.translate(W / 2, ty); ctx.scale(sc, sc); ctx.translate(-W / 2, -HDR.top);
    drawHookText(ctx, t); ctx.restore(); return;
  }
  drawHookText(ctx, t);
}
function drawHookText(ctx, t) {
  const { geo, segs, size } = hookGeo();
  const hp = prog(t, TL.hlT, TL.hlT + 0.5);
  const segP = s => clamp((hp - s.a) / (s.b - s.a));
  const deco = COPY.deco;
  if (deco === 'marker') {
    segs.forEach(s => {
      const p = E.outCubic(segP(s)); if (p <= 0) return;
      const pad = size * 0.11, x0 = s.x0 - pad, x1 = lerp(x0, s.x1 + pad, p);
      ctx.save(); ctx.translate(x0, s.y); ctx.rotate(-0.012);
      ctx.fillStyle = C.coral; rr(ctx, 0, -size * 0.8, x1 - x0, size * 1.02, size * 0.14); ctx.fill(); ctx.restore();
      s.mx = x1;
    });
  }
  geo.forEach(g => {
    const ta = TL.wordT[g.i], p = prog(t, ta, ta + 0.5); if (p <= 0) return;
    const e = E.outCubic(p);
    let col = C.navy;
    if (g.w.hl) {
      if (deco === 'marker') { const s = segs.find(s => g.i >= s.start && g.i <= s.end); const k = s && s.mx ? clamp((s.mx - (g.x + g.w.w * 0.3)) / (g.w.w * 0.4)) : 0; col = mix(C.navy, C.white, k); }
      else col = mix(C.navy, C.coral, E.outCubic(prog(t, TL.hlT, TL.hlT + 0.35)));
    }
    ctx.save(); ctx.globalAlpha = clamp(p * 3);
    ctx.translate(g.x + g.w.w / 2, g.y + (1 - e) * size * 0.5); ctx.rotate((1 - e) * 0.07);
    font(ctx, g.w.hl ? 800 : 700, size); ctx.fillStyle = col; ctx.fillText(g.w.text, -g.w.w / 2, 0);
    ctx.restore();
  });
  if (deco === 'underline' || deco === 'circle') {
    ctx.save(); ctx.strokeStyle = C.coral; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    segs.forEach((s, si) => {
      const p = segP(s); if (p <= 0) return;
      ctx.beginPath();
      if (deco === 'underline') {
        ctx.lineWidth = size * 0.085;
        const n = 40, x0 = s.x0 - size * 0.05, x1 = s.x1 + size * 0.08;
        for (let k = 0; k <= n * p; k++) { const u = k / n; const x = lerp(x0, x1, u), y = s.y + size * 0.2 + Math.sin(u * TAU * 1.2 + si) * size * 0.03 - u * size * 0.04; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      } else {
        ctx.lineWidth = size * 0.07;
        const cx = (s.x0 + s.x1) / 2, cy = s.y - size * 0.3, rx = (s.x1 - s.x0) / 2 + size * 0.24, ry = size * 0.68;
        const a0 = -2.5, n = 70;
        for (let k = 0; k <= n * p; k++) { const u = k / n, a = a0 + u * TAU * 1.1; const sp = 1 + 0.07 * u; const x = cx + Math.cos(a) * rx * sp, y = cy + Math.sin(a) * ry * sp * (1 + 0.04 * Math.sin(3 * a)); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      }
      ctx.stroke();
    });
    ctx.restore();
  }
}

// ============================================================================
//  METÁFORAS VISUALES DEL GANCHO
// ============================================================================
function figure(ctx, x, y, s, fill, stroke, lw) {
  ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.fillStyle = fill;
  ctx.beginPath(); ctx.moveTo(x - s * 0.62, y); ctx.bezierCurveTo(x - s * 0.62, y - s * 0.8, x + s * 0.62, y - s * 0.8, x + s * 0.62, y); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y - s * 1.2, s * 0.36, 0, TAU); ctx.fill(); ctx.stroke();
}
function openBook(ctx, x, y, w, h, lw) {
  ctx.lineWidth = lw; ctx.strokeStyle = C.navy; ctx.lineJoin = 'round';
  ctx.fillStyle = C.purple; ctx.beginPath(); ctx.moveTo(x, y + h * 0.72); ctx.quadraticCurveTo(x - w * 0.27, y + h * 0.5, x - w * 0.55, y + h * 0.62); ctx.lineTo(x - w * 0.55, y - h * 0.32); ctx.lineTo(x + w * 0.55, y - h * 0.32); ctx.lineTo(x + w * 0.55, y + h * 0.62); ctx.quadraticCurveTo(x + w * 0.27, y + h * 0.5, x, y + h * 0.72); ctx.closePath(); ctx.fill(); ctx.stroke();
  for (const sd of [-1, 1]) {
    ctx.fillStyle = C.white; ctx.beginPath(); ctx.moveTo(x, y - h * 0.2);
    ctx.quadraticCurveTo(x + sd * w * 0.25, y - h * 0.62, x + sd * w * 0.5, y - h * 0.45); ctx.lineTo(x + sd * w * 0.5, y + h * 0.5);
    ctx.quadraticCurveTo(x + sd * w * 0.25, y + h * 0.33, x, y + h * 0.6); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = C.lavL; ctx.lineWidth = lw * 0.7;
    for (let k = 0; k < 3; k++) { const yy = y - h * 0.18 + k * h * 0.2; ctx.beginPath(); ctx.moveTo(x + sd * w * 0.12, yy); ctx.quadraticCurveTo(x + sd * w * 0.25, yy - h * 0.1, x + sd * w * 0.4, yy - h * 0.04); ctx.stroke(); }
    ctx.strokeStyle = C.navy; ctx.lineWidth = lw;
  }
}

// A — la pieza que no cabía: el hueco se adapta a ella
function mShapes(ctx, t, X, v) {
  const { cx, cy, u } = X, P = TL.P, fitT = P + 0.22;
  const R = u * 0.25, bw = u * 1.7, bh = u * 0.6, by = cy + u * 0.36, hx = cx, hy = by - bh * 0.04;
  const piece = v.piece || 'star', lw = u * 0.022;
  const bp = E.outBack(prog(t, 0.12, 0.6), 1.4);
  const bb = t > fitT ? Math.exp(-(t - fitT) * 6) * Math.sin((t - fitT) * 22) * 0.06 : 0;
  if (bp > 0) {
    ctx.save(); ctx.translate(cx, by + bh / 2); ctx.scale(lerp(0.5, 1, bp) * (1 + bb), Math.max(0.01, bp) * (1 - bb)); ctx.translate(-cx, -(by + bh / 2));
    ctx.fillStyle = C.purpleD; rr(ctx, cx - bw / 2, by - bh / 2 + u * 0.07, bw, bh, u * 0.1); ctx.fill();
    ctx.fillStyle = C.purple; rr(ctx, cx - bw / 2, by - bh / 2, bw, bh, u * 0.1); ctx.fill();
    ctx.fillStyle = C.lav; for (const sx of [-1, 1]) for (const sy of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + sx * (bw / 2 - u * 0.09), by + sy * (bh / 2 - u * 0.09), u * 0.022, 0, TAU); ctx.fill(); }
    const m = E.inOutCubic(prog(t, 2.5, 3.05));
    polarPath(ctx, hx, hy, R, a => lerp(1, shapeR(piece, a), m)); ctx.fillStyle = '#17102B'; ctx.fill();
    ctx.restore();
  }
  // destellos durante el cambio del hueco
  const mp = prog(t, 2.45, 3.15);
  if (mp > 0 && mp < 1) for (let k = 0; k < 6; k++) { const a = k / 6 * TAU + t * 1.5, d = R * (1.5 + 0.2 * Math.sin(k * 3 + t * 6)); sparkle(ctx, hx + Math.cos(a) * d, hy + Math.sin(a) * d * 0.8, u * 0.05 * Math.sin(Math.PI * mp) * (0.6 + 0.4 * Math.sin(t * 20 + k)), k % 2 ? C.lav : C.orange); }
  // pieza
  const ap = E.outBack(prog(t, 0.35, 0.75), 2.2); if (ap <= 0) return;
  const hoverY = hy - u * 0.62, upY = hy - u * 0.5;
  let y, rot = 0, sx = 1, sy = 1, sc = ap;
  if (t < 1.0) { y = hoverY + Math.sin(t * 5) * u * 0.02; rot = Math.sin(t * 3) * 0.08; }
  else if (t < 1.35) { y = lerp(hoverY, hy - R * 0.2, E.inCubic(prog(t, 1.0, 1.35))); }
  else if (t < 1.9) { const q = prog(t, 1.35, 1.9); y = lerp(hy - R * 0.2, upY, E.outCubic(q)); const sp = Math.exp(-(t - 1.35) * 9); sx = 1 + 0.25 * sp * Math.cos((t - 1.35) * 30); sy = 1 - 0.2 * sp * Math.cos((t - 1.35) * 30); rot = 0.35 * Math.exp(-(t - 1.35) * 5) * Math.sin((t - 1.35) * 18); }
  else if (t < P) { y = upY + Math.sin((t - 1.9) * 5) * u * 0.018; rot = 0.05 * Math.sin((t - 1.9) * 3) * (1 - prog(t, 2.6, 3.0)); }
  else if (t < fitT) { y = lerp(upY, hy, E.inCubic(prog(t, P, fitT))); }
  else { y = hy; sc = 1; const sp = Math.exp(-(t - fitT) * 8); sx = 1 + 0.12 * sp * Math.cos((t - fitT) * 28); sy = 1 - 0.12 * sp * Math.cos((t - fitT) * 28); const br = 1 + 0.035 * Math.sin((t - fitT) * 4.2) * prog(t, fitT + 1.2, fitT + 1.8); sx *= br; sy *= br; }
  const Rp = R * 0.96;
  ctx.save(); ctx.translate(hx, y); ctx.rotate(rot); ctx.scale(sx * sc, sy * sc);
  polarPath(ctx, 0, u * 0.03, Rp, a => shapeR(piece, a)); ctx.fillStyle = C.coralD; ctx.fill();
  polarPath(ctx, 0, 0, Rp, a => shapeR(piece, a)); ctx.fillStyle = C.coral; ctx.fill();
  ctx.globalAlpha = 0.35; polarPath(ctx, -Rp * 0.08, -Rp * 0.1, Rp * 0.55, a => shapeR(piece, a)); ctx.fillStyle = C.coralL; ctx.fill(); ctx.globalAlpha = 1;
  ctx.restore();
  // "?" de duda tras el choque
  const qp = prog(t, 1.45, 2.6);
  if (qp > 0 && qp < 1) { const a = Math.sin(Math.PI * qp); font(ctx, 700, u * 0.3, 'Hand'); ctx.fillStyle = C.navy; ctx.globalAlpha = clamp(a * 2); ctx.save(); ctx.translate(hx + R * 1.5, upY - R * 0.9 - a * u * 0.05); ctx.rotate(0.2); ctx.scale(E.outBack(clamp(qp * 4), 2), E.outBack(clamp(qp * 4), 2)); ctx.fillText('?', -u * 0.05, 0); ctx.restore(); ctx.globalAlpha = 1; }
  // destello por beat cuando la escena ya terminó (ganchos largos)
  if (t > fitT + 1.3) { const bt = (t - fitT - 1.3) / TL.B, k = Math.floor(bt), f = bt - k, a = k * 2.2 + 0.6; sparkle(ctx, hx + Math.cos(a) * R * 1.9, hy + Math.sin(a) * R * 1.25, u * 0.05 * Math.sin(Math.PI * f), k % 2 ? C.orange : C.lav); }
  // celebración
  if (t > fitT) {
    const q = t - fitT;
    for (let k = 0; k < 2; k++) { const p = prog(q, k * 0.12, k * 0.12 + 0.7); if (p > 0 && p < 1) { ctx.strokeStyle = k ? C.orange : C.coral; ctx.lineWidth = u * 0.025 * (1 - p); ctx.beginPath(); ctx.ellipse(hx, hy, R * (1.1 + 1.6 * E.outCubic(p)), R * (1.0 + 1.3 * E.outCubic(p)), 0, 0, TAU); ctx.stroke(); } }
    [[-0.95, -0.9, C.star], [0, -1.25, C.orange], [0.95, -0.9, C.lav]].forEach(([dx, dy, col], k) => {
      const p = E.outCubic(prog(q, 0.02 + k * 0.05, 0.75 + k * 0.05)), f = 1 - prog(q, 1.2, 1.6);
      if (p <= 0 || f <= 0) return;
      ctx.save(); ctx.globalAlpha = f; ctx.translate(hx + dx * u * 0.55 * p, hy + dy * u * 0.5 * p); ctx.rotate(p * 2 + k); starPath(ctx, 0, 0, u * 0.07 * (0.5 + 0.5 * p)); ctx.fillStyle = col; ctx.fill(); ctx.restore();
    });
  }
}

// B — entre muchos iguales, uno importa
function mSpotlight(ctx, t, X, v) {
  const { cx, cy, u } = X, P = TL.P, B = TL.B, va = v.variant || 'basic';
  const cols = va === 'crowd' ? 6 : 5, rows = 3;
  const gw = u * 1.95, gh = u * 1.2, cw = gw / cols, rh = gh / rows, s = Math.min(cw, rh) * 0.47, lw = u * 0.018;
  const chosen = va === 'crowd' ? { c: 3, r: 1 } : va === 'glass' ? { c: 1, r: 1 } : { c: 2, r: 1 };
  const pos = (c, r) => [cx - gw / 2 + (c + 0.5) * cw, cy - gh / 2 + (r + 0.5) * rh + s * 0.75];
  const k = E.outBack(prog(t, P, P + 0.45), 1.8), kc = E.outCubic(prog(t, P, P + 0.3)), fade = E.outCubic(prog(t, P, P + 0.5));
  const list = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) list.push({ c, r, isC: c === chosen.c && r === chosen.r });
  list.sort((a, b) => (a.isC && va === 'crowd') - (b.isC && va === 'crowd'));
  for (const f of list) {
    const d = Math.hypot(f.c - (cols - 1) / 2, f.r - (rows - 1) / 2), t0 = 0.25 + d * 0.09;
    const ap = E.outBack(prog(t, t0, t0 + 0.4), 2); if (ap <= 0) continue;
    let [x, y] = pos(f.c, f.r);
    let sc = ap, bob = Math.abs(Math.sin(Math.PI * (t - 0.6) / B)) * s * 0.16 * prog(t, 0.6, 1.0);
    let fill = C.lavL, stroke = C.navy, a = 1;
    if (f.isC) {
      bob *= (1 - kc);
      if (t > P) bob += Math.abs(Math.sin(Math.PI * (t - P) / (B / 2))) * s * 0.22 * (1 - prog(t, P + 1.0, P + 1.4));
      sc *= (va === 'crowd' ? 1 + 0.75 * k : 1 + 0.45 * k) * (1 + 0.03 * Math.sin((t - P) * 4) * prog(t, P + 1.4, P + 1.9));
      if (va === 'crowd') y += E.outCubic(prog(t, P, P + 0.5)) * u * 0.32;
      fill = mix(C.lavL, C.coral, kc);
    } else { bob *= (1 - fade); fill = mix(C.lavL, '#EFEDF6', fade); a = 1 - 0.55 * fade; }
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y - bob); ctx.scale(sc, sc);
    figure(ctx, 0, 0, s, fill, stroke, lw / sc * Math.min(1, sc)); ctx.restore();
  }
  // halo + corazón para el elegido
  let [hx, hy] = pos(chosen.c, chosen.r); if (va === 'crowd') hy += E.outCubic(prog(t, P, P + 0.5)) * u * 0.32;
  const sz = va === 'crowd' ? 1.75 : 1.45;
  const rings = [P, P + 0.3]; for (let k = 2; k < 12; k++) rings.push(P + k * TL.B);
  for (let i = 0; i < rings.length; i++) { const p = prog(t, rings[i], rings[i] + 0.9); if (p > 0 && p < 1) { ctx.strokeStyle = C.coral; ctx.globalAlpha = (1 - p) * (i < 2 ? 1 : 0.55); ctx.lineWidth = u * 0.02; ctx.beginPath(); ctx.arc(hx, hy - s * 0.7 * sz, s * sz * (0.9 + 1.3 * E.outCubic(p)), 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; } }
  const hp = E.outBack(prog(t, P + 0.15, P + 0.55), 2.4);
  if (hp > 0) { heartPath(ctx, hx + s * 0.9 * sz, hy - s * 2.1 * sz - Math.sin(t * 4) * u * 0.01, s * 0.38 * hp); ctx.fillStyle = C.coral; ctx.fill(); }
  // lupa que busca (variante "conocerlo")
  if (va === 'glass') {
    const way = [[cx + u * 1.3, cy - u * 0.2, 0.9], [...pos(4, 0), 1.45], [...pos(3, 2), 2.05], [...pos(0, 0), 2.65], [hx, hy, P]];
    let gx = way[0][0], gy = way[0][1];
    for (let i = 1; i < way.length; i++) { const tA = way[i - 1][2], tB = way[i][2]; if (t >= tA) { const e = E.inOutCubic(prog(t, tA, tB)); gx = lerp(way[i - 1][0], way[i][0], e); gy = lerp(way[i - 1][1], way[i][1], e); } }
    gy -= s * 0.7 * (t > P ? sz : 1);
    const ga = prog(t, 0.85, 1.1), lr = s * 1.35 * (t > P ? 1.25 : 1);
    if (ga > 0) {
      ctx.save(); ctx.globalAlpha = ga;
      ctx.lineCap = 'round'; ctx.strokeStyle = t > P ? C.coral : C.navy; ctx.lineWidth = u * 0.055;
      ctx.beginPath(); ctx.moveTo(gx + lr * 0.72, gy + lr * 0.72); ctx.lineTo(gx + lr * 1.55, gy + lr * 1.55); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.beginPath(); ctx.arc(gx, gy, lr, 0, TAU); ctx.fill();
      ctx.lineWidth = u * 0.03; ctx.stroke();
      ctx.restore();
    }
  }
}

// C — todos al mismo paso vs. cada quien a su ritmo
function mLockstep(ctx, t, X, v) {
  const { cx, cy, u } = X, P = TL.P, B = TL.B, va = v.variant || 'basic';
  const x0 = cx - u * 0.9, x1 = cx + u * 0.9, ly = k => cy - u * 0.5 + k * u * 0.36, lw = u * 0.016;
  const lp = E.outCubic(prog(t, 0.1, 0.7));
  ctx.save(); ctx.setLineDash([u * 0.04, u * 0.035]); ctx.lineCap = 'round'; ctx.strokeStyle = C.lav; ctx.lineWidth = lw;
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x0, ly(k)); ctx.lineTo(lerp(x0, x1, lp), ly(k)); ctx.stroke(); }
  ctx.restore();
  let steps = 0; for (let b = 1; b <= 4; b++) steps += E.inOutCubic(prog(t, b * B - 0.05, b * B + 0.16));
  const base = x0 + u * 0.14 + steps * u * 0.22, baseP = x0 + u * 0.14 + 4 * u * 0.22;
  const m = E.inOutCubic(prog(t, P, P + 0.35)), q = Math.max(0, t - P);
  const flagX = x1 - u * 0.04;
  if (va === 'flag') {
    const fp = E.outBack(prog(t, 0.5, 0.9), 2);
    if (fp > 0) {
      ctx.save(); ctx.translate(flagX, ly(2)); ctx.scale(fp, fp);
      ctx.strokeStyle = C.navy; ctx.lineWidth = u * 0.018; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, u * 0.02); ctx.lineTo(0, -u * 0.26); ctx.stroke();
      const wv = Math.sin(t * 7) * u * 0.012; ctx.fillStyle = C.coral; ctx.beginPath(); ctx.moveTo(0, -u * 0.26); ctx.quadraticCurveTo(u * 0.08, -u * 0.25 + wv, u * 0.16, -u * 0.21); ctx.quadraticCurveTo(u * 0.08, -u * 0.17 - wv, 0, -u * 0.15); ctx.fill();
      ctx.restore();
    }
  }
  const cfg = [
    { col: C.purple, shape: 'sq' }, { col: C.lav, shape: 'tri' }, { col: C.coral, shape: 'star' }, { col: C.orange, shape: 'circ' },
  ];
  for (let k = 0; k < 4; k++) {
    const ap = E.outBack(prog(t, 0.2 + k * 0.07, 0.6 + k * 0.07), 2); if (ap <= 0) continue;
    let x = base, y = ly(k), rot = 0, r = u * 0.085;
    if (t > P) { // cada quien llega a su propio lugar y se queda con su propio ritmo
      if (k === 0) { x = lerp(baseP, baseP + u * 0.35, E.inOutCubic(prog(q, 0, 1.6))); rot = q * 0.6; y -= Math.abs(Math.sin(q * Math.PI / 0.9)) * u * 0.03; }
      else if (k === 1) { x = lerp(baseP, baseP + u * 0.6, prog(q, 0, 2.0)); y -= Math.abs(Math.sin(q * Math.PI / 0.4)) * u * 0.1; }
      else if (k === 2) {
        const tgt = va === 'flag' ? flagX - u * 0.11 : x1 - u * 0.1;
        x = lerp(baseP, tgt, E.inOutCubic(prog(q, 0, 1.35)));
        const lp2 = prog(q, 0.3, 0.9); x += Math.sin(lp2 * TAU) * u * 0.07; y -= (1 - Math.cos(lp2 * TAU)) * u * 0.07; rot = lp2 * TAU + q * 2;
      } else { x = lerp(baseP, baseP + u * 0.45, E.outCubic(prog(q, 0, 2.2))) + Math.sin(q * 9) * u * 0.03; y += Math.sin(q * 6) * u * 0.035; }
      x = Math.min(x, x1 - u * 0.08);
    }
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    const s0 = (1 - m) * ap, s1 = m * ap;
    if (s0 > 0.01) { ctx.fillStyle = C.navy; ctx.beginPath(); ctx.arc(0, 0, r * s0, 0, TAU); ctx.fill(); }
    if (s1 > 0.01) {
      ctx.fillStyle = cfg[k].col; ctx.scale(s1, s1);
      if (cfg[k].shape === 'sq') { rr(ctx, -r, -r, r * 2, r * 2, r * 0.25); ctx.fill(); }
      else if (cfg[k].shape === 'tri') { ctx.beginPath(); ctx.moveTo(0, -r * 1.15); ctx.lineTo(r * 1.1, r * 0.8); ctx.lineTo(-r * 1.1, r * 0.8); ctx.closePath(); ctx.fill(); }
      else if (cfg[k].shape === 'star') { starPath(ctx, 0, 0, r * 1.35); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); }
    }
    ctx.restore();
  }
  // marcas de compás (rigidez) antes del cambio
  if (t < P + 0.3) {
    ctx.save(); ctx.globalAlpha = 1 - prog(t, P, P + 0.3);
    for (let b = 1; b <= 4; b++) { const p = prog(t, b * B, b * B + 0.45); if (p > 0 && p < 1) { ctx.strokeStyle = C.lav; ctx.lineWidth = lw * 1.5; ctx.globalAlpha *= 1 - p; ctx.beginPath(); ctx.arc(base, ly(0) - u * 0.2, u * 0.04 + p * u * 0.08, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1 - prog(t, P, P + 0.3); } }
    ctx.restore();
  }
}

// D — potencial: de un libro brota una estrella
function mGrowth(ctx, t, X) {
  const { cx, cy, u } = X, P = TL.P, lw = u * 0.02;
  const by = cy + u * 0.58;
  const bp = E.outBack(prog(t, 0.2, 0.6), 1.8);
  if (bp > 0) { ctx.save(); ctx.translate(cx, by); ctx.scale(bp, bp); openBook(ctx, 0, 0, u * 0.95, u * 0.3, lw / bp); ctx.restore(); }
  const p0 = [cx, by - u * 0.12], c1 = [cx + u * 0.34, cy + u * 0.24], c2 = [cx - u * 0.34, cy], p3 = [cx, cy - u * 0.22];
  const bez = s => { const a = 1 - s; return [a * a * a * p0[0] + 3 * a * a * s * c1[0] + 3 * a * s * s * c2[0] + s * s * s * p3[0], a * a * a * p0[1] + 3 * a * a * s * c1[1] + 3 * a * s * s * c2[1] + s * s * s * p3[1]]; };
  const gp = prog(t, 0.7, 2.95);
  if (gp > 0) {
    ctx.strokeStyle = C.purple; ctx.lineWidth = u * 0.035; ctx.lineCap = 'round'; ctx.beginPath();
    for (let k = 0; k <= 60 * gp; k++) { const [x, y] = bez(k / 60); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  }
  [[0.26, 1, 1.3], [0.52, -1, 1.9], [0.78, 1, 2.5]].forEach(([s, sd, tt]) => {
    const p = E.outBack(prog(t, tt, tt + 0.4), 2.2); if (p <= 0) return;
    const [x, y] = bez(s), len = u * 0.26 * p, ang = sd > 0 ? -0.5 : Math.PI + 0.5;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang + Math.sin(t * 2.5 + s * 9) * 0.06);
    ctx.fillStyle = sd > 0 ? C.lav : C.purple; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.5, -len * 0.4, len, 0); ctx.quadraticCurveTo(len * 0.5, len * 0.4, 0, 0); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = u * 0.008; ctx.beginPath(); ctx.moveTo(len * 0.1, 0); ctx.lineTo(len * 0.8, 0); ctx.stroke();
    ctx.restore();
  });
  const sp = prog(t, P, P + 0.5);
  if (sp > 0) {
    const [x, y] = p3, e = E.outBack(sp, 2.6);
    const g = ctx.createRadialGradient(x, y, 0, x, y, u * 0.55); g.addColorStop(0, 'rgba(255,91,58,0.35)'); g.addColorStop(1, 'rgba(255,91,58,0)');
    ctx.fillStyle = g; ctx.globalAlpha = clamp(sp * 2); ctx.fillRect(x - u * 0.6, y - u * 0.6, u * 1.2, u * 1.2); ctx.globalAlpha = 1;
    const rp = prog(t, P, P + 0.7);
    if (rp < 1) { ctx.strokeStyle = C.orange; ctx.lineWidth = u * 0.018; ctx.lineCap = 'round'; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU, r0 = u * (0.2 + 0.25 * E.outCubic(rp)), r1 = r0 + u * 0.1 * (1 - rp); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); ctx.stroke(); } }
    ctx.save(); ctx.translate(x, y); ctx.rotate((1 - E.outCubic(sp)) * -1.5 + Math.sin(t * 2) * 0.05); starPath(ctx, 0, 0, u * 0.2 * e); ctx.fillStyle = C.coral; ctx.fill(); ctx.restore();
    for (let k = 0; k < 9; k++) { const q = prog(t, P + 0.1 + k * 0.12, P + 1.4 + k * 0.12); if (q <= 0 || q >= 1) continue; const a = k * 2.4; sparkle(ctx, x + Math.cos(a) * u * (0.25 + 0.35 * q), y - u * 0.1 - q * u * 0.45 + Math.sin(a) * u * 0.1, u * 0.035 * Math.sin(Math.PI * q), k % 2 ? C.orange : C.lav); }
  }
}

// E — aprender emocionante: el libro que explota en confeti
function mBookburst(ctx, t, X) {
  const { cx, cy, u } = X, P = TL.P, B = TL.B, lw = u * 0.02;
  const ap = E.outBack(prog(t, 0.3, 0.7), 2); if (ap <= 0) return;
  const bx = cx, by = cy + u * 0.18;
  if (t < P) {
    let rot = 0, hop = 0;
    [2, 3, 4].forEach((b, i) => { const tr = b * B; if (t > tr) { const d = t - tr; rot += Math.exp(-d * 7) * Math.sin(d * 38) * (0.06 + i * 0.035); hop += Math.exp(-d * 9) * Math.abs(Math.sin(d * 16)) * u * (0.03 + i * 0.02); } });
    const bw = u * 0.62, bh = u * 0.8;
    ctx.save(); ctx.translate(bx, by - hop); ctx.rotate(rot); ctx.scale(ap, ap);
    ctx.fillStyle = C.coral; ctx.fillRect(bw * 0.18, bh * 0.38, u * 0.08, u * 0.24); ctx.beginPath(); ctx.moveTo(bw * 0.18, bh * 0.38 + u * 0.24); ctx.lineTo(bw * 0.22, bh * 0.38 + u * 0.2); ctx.lineTo(bw * 0.18 + u * 0.08, bh * 0.38 + u * 0.24); ctx.fill();
    ctx.fillStyle = C.white; rr(ctx, -bw / 2 + u * 0.03, -bh / 2 + u * 0.03, bw, bh, u * 0.05); ctx.fill(); ctx.strokeStyle = C.navy; ctx.lineWidth = lw; ctx.stroke();
    ctx.fillStyle = C.purple; rr(ctx, -bw / 2, -bh / 2, bw, bh, u * 0.05); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.purpleD; ctx.fillRect(-bw / 2, -bh / 2 + u * 0.01, u * 0.07, bh - u * 0.02);
    ctx.fillStyle = C.lav; rr(ctx, -bw * 0.22, -bh * 0.22, bw * 0.55, u * 0.035, u * 0.02); ctx.fill(); rr(ctx, -bw * 0.22, -bh * 0.22 + u * 0.07, bw * 0.38, u * 0.035, u * 0.02); ctx.fill();
    starPath(ctx, bw * 0.06, bh * 0.15, u * 0.09); ctx.fillStyle = C.orange; ctx.fill();
    ctx.restore();
    return;
  }
  const q = t - P, op = E.outBack(prog(q, 0, 0.35), 2.2);
  const g = ctx.createRadialGradient(bx, by - u * 0.1, 0, bx, by - u * 0.1, u * 0.9); g.addColorStop(0, 'rgba(255,214,120,0.5)'); g.addColorStop(1, 'rgba(255,214,120,0)');
  ctx.globalAlpha = clamp(1 - q * 0.6); ctx.fillStyle = g; ctx.fillRect(bx - u, by - u, u * 2, u * 2); ctx.globalAlpha = 1;
  for (const p of CONF) {
    const tt = q, vx = Math.cos(p.a) * p.v * u, vy = Math.sin(p.a) * p.v * u, dr = 1.6;
    const x = bx + vx * (1 - Math.exp(-dr * tt)) / dr, y = by - u * 0.1 + vy * (1 - Math.exp(-dr * tt)) / dr + 0.55 * u * tt * tt;
    const s = p.s * u * (1 - prog(tt, 1.2, 1.9)); if (s <= 0.3) continue;
    const fa = clamp((y - HOOK.bottom) / (u * 0.15)); if (fa <= 0) continue;
    ctx.save(); ctx.globalAlpha = fa; ctx.translate(x, y); ctx.rotate(p.rot + p.vr * tt); ctx.fillStyle = p.col; ctx.strokeStyle = p.col;
    if (p.type === 0) ctx.fillRect(-s, -s * 0.5, s * 2, s);
    else if (p.type === 1) { ctx.beginPath(); ctx.arc(0, 0, s * 0.7, 0, TAU); ctx.fill(); }
    else if (p.type === 2) { starPath(ctx, 0, 0, s * 1.1); ctx.fill(); }
    else { ctx.lineWidth = s * 0.45; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s, 0); ctx.quadraticCurveTo(-s * 0.5, -s, 0, 0); ctx.quadraticCurveTo(s * 0.5, s, s, 0); ctx.stroke(); }
    ctx.restore();
  }
  ctx.save(); ctx.translate(bx, by); ctx.scale(op, op); openBook(ctx, 0, 0, u * 1.0, u * 0.34, lw / Math.max(op, 0.2)); ctx.restore();
  ['a', 'b', 'c', '1', '2', '3'].forEach((ch, k) => {
    const p = prog(q, 0.1 + k * 0.1, 1.5 + k * 0.1); if (p <= 0 || p >= 1) return;
    const x = bx + (k - 2.5) * u * 0.2 + Math.sin(p * 5 + k) * u * 0.04, y = by - u * 0.15 - E.outCubic(p) * u * 0.7;
    ctx.globalAlpha = Math.sin(Math.PI * p) * clamp((y - u * 0.15 - HOOK.bottom) / (u * 0.15)); font(ctx, 700, u * 0.2, 'Hand'); ctx.fillStyle = k % 2 ? C.purple : C.coral; ctx.textAlign = 'center'; ctx.fillText(ch, x, y); ctx.textAlign = 'left'; ctx.globalAlpha = 1;
  });
}

// F — confianza: escalón por escalón, acompañado
function mSteps(ctx, t, X) {
  const { cx, cy, u } = X, P = TL.P, B = TL.B, lw = u * 0.016;
  const sw = u * 0.42, sh = u * 0.2, base = cy + u * 0.55, xs = cx - u * 0.84;
  for (let k = 0; k < 4; k++) {
    const p = E.outBack(prog(t, 0.2 + k * 0.13, 0.55 + k * 0.13), 1.6); if (p <= 0) continue;
    const top = base - (k + 1) * sh * p;
    ctx.fillStyle = [C.lavXL, C.lavL, C.lav, C.purple][k]; ctx.strokeStyle = C.navy; ctx.lineWidth = lw;
    rr(ctx, xs + k * sw, top, sw, base - top, u * 0.02); ctx.fill(); ctx.stroke();
  }
  const spot = k => k < 0 ? [xs - sw * 0.5, base] : [xs + k * sw + sw / 2, base - (k + 1) * sh];
  const hops = [2, 3, 4, 5].map(b => b * B - 0.05);
  let k = -1, x, y, sx = 1, sy = 1;
  for (let i = 0; i < 4; i++) if (t >= hops[i]) k = i;
  const cur = spot(k); x = cur[0]; y = cur[1];
  const trail = [];
  if (k < 3 && t >= hops[k + 1] - 0.4) { /* anticipación */ }
  for (let i = 0; i < 4; i++) {
    const p = prog(t, hops[i], hops[i] + 0.38);
    if (p > 0 && p < 1) { const a = spot(i - 1), b = spot(i), e = E.inOutSine(p); x = lerp(a[0], b[0], e); y = lerp(a[1], b[1], e) - Math.sin(Math.PI * e) * u * 0.2; sx = 0.9; sy = 1.12; }
    const land = t - (hops[i] + 0.38); if (land > 0 && land < 0.5) { const sp = Math.exp(-land * 10) * Math.cos(land * 30); sx = 1 + 0.18 * sp; sy = 1 - 0.18 * sp; }
    const pre = prog(t, hops[i] - 0.12, hops[i]); if (pre > 0 && pre < 1) { sx = 1 + 0.12 * Math.sin(Math.PI * pre); sy = 1 - 0.15 * Math.sin(Math.PI * pre); }
  }
  // camino guía punteado
  ctx.save(); ctx.setLineDash([u * 0.025, u * 0.03]); ctx.strokeStyle = C.coral; ctx.globalAlpha = 0.5; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); for (let i = 0; i <= Math.min(3, k + 1); i++) { const a = spot(i - 1), b = spot(i); const lim = i <= k ? 1 : clamp(prog(t, hops[i], hops[i] + 0.38)); for (let j = 0; j <= 20 * lim; j++) { const e = j / 20; const px = lerp(a[0], b[0], e), py = lerp(a[1], b[1], e) - Math.sin(Math.PI * e) * u * 0.2 - u * 0.12; (i === 0 && j === 0) ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } } ctx.stroke();
  ctx.restore();
  const ap = E.outBack(prog(t, 0.45, 0.85), 2);
  if (ap > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(sx * ap, sy * ap); figure(ctx, 0, 0, u * 0.11, C.coral, C.navy, lw / ap); ctx.restore(); }
  const top = spot(3);
  const fp = E.outBack(prog(t, P + 0.25, P + 0.6), 2);
  if (fp > 0) {
    ctx.save(); ctx.translate(top[0] + sw * 0.32, top[1]); ctx.scale(fp, fp);
    ctx.strokeStyle = C.navy; ctx.lineWidth = u * 0.016; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -u * 0.3); ctx.stroke();
    const wv = Math.sin(t * 7) * u * 0.012; ctx.fillStyle = C.coral; ctx.beginPath(); ctx.moveTo(0, -u * 0.3); ctx.quadraticCurveTo(u * 0.09, -u * 0.29 + wv, u * 0.18, -u * 0.25); ctx.quadraticCurveTo(u * 0.09, -u * 0.2 - wv, 0, -u * 0.19); ctx.fill();
    ctx.restore();
  }
  const shp = E.outBack(prog(t, P + 0.4, P + 0.8), 2);
  if (shp > 0) {
    const sx2 = cx - u * 0.5, sy2 = cy - u * 0.2 + Math.sin(t * 2.4) * u * 0.02, r = u * 0.16 * shp;
    ctx.save(); ctx.translate(sx2, sy2); ctx.scale(r, r);
    ctx.fillStyle = C.purple; ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0.85, -0.65); ctx.lineTo(0.85, 0.05); ctx.quadraticCurveTo(0.85, 0.7, 0, 1.05); ctx.quadraticCurveTo(-0.85, 0.7, -0.85, 0.05); ctx.lineTo(-0.85, -0.65); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.white; ctx.lineWidth = 0.16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-0.38, 0.02); ctx.lineTo(-0.08, 0.32); ctx.lineTo(0.42, -0.25); ctx.stroke();
    ctx.restore();
    for (let i = 0; i < 4; i++) { const a = i * 1.57 + 0.6; sparkle(ctx, sx2 + Math.cos(a) * u * 0.26, sy2 + Math.sin(a) * u * 0.24, u * 0.03 * (0.5 + 0.5 * Math.sin(t * 6 + i)) * shp, C.orange); }
  }
}

// G — del salón tradicional a grupos reducidos
function mDesks(ctx, t, X) {
  const { cx, cy, u } = X, P = TL.P, B = TL.B, lw = u * 0.014;
  const bp = E.outBack(prog(t, 0.15, 0.5), 1.6) * (1 - E.inCubic(prog(t, P, P + 0.3)));
  if (bp > 0.01) {
    ctx.save(); ctx.translate(cx, cy - u * 0.42); ctx.scale(bp, bp);
    ctx.fillStyle = C.navy; rr(ctx, -u * 0.48, -u * 0.09, u * 0.96, u * 0.18, u * 0.02); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = u * 0.01; ctx.lineCap = 'round';
    [[-0.38, -0.03, -0.05], [-0.38, 0.03, 0.12], [0.1, -0.02, 0.32]].forEach(([a, y, b]) => { ctx.beginPath(); ctx.moveTo(u * a, u * y); ctx.lineTo(u * b, u * y); ctx.stroke(); });
    ctx.restore();
  }
  const blp = E.outBack(prog(t, P + 0.75, P + 1.1), 2.2);
  if (blp > 0) {
    ctx.save(); ctx.translate(cx, cy - u * 0.42 + Math.sin(t * 3) * u * 0.01); ctx.scale(blp, blp);
    ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(0, 0, u * 0.13, 0, TAU); ctx.fill();
    ctx.scale(u * 0.075, u * 0.075); ctx.strokeStyle = C.white; ctx.lineWidth = 0.18; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, -0.25, 0.6, Math.PI * 0.78, Math.PI * 2.22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-0.3, 0.55); ctx.lineTo(0.3, 0.55); ctx.moveTo(-0.22, 0.85); ctx.lineTo(0.22, 0.85); ctx.stroke();
    ctx.restore();
  }
  const clusters = [[cx - u * 0.64, cy + u * 0.26], [cx, cy + u * 0.02], [cx + u * 0.64, cy + u * 0.26]];
  clusters.forEach(([x, y], i) => {
    const p = E.outBack(prog(t, P + 0.2 + i * 0.06, P + 0.55 + i * 0.06), 2); if (p <= 0) return;
    ctx.fillStyle = i === 1 ? C.coral : C.purple; ctx.beginPath(); ctx.arc(x, y, u * 0.1 * p, 0, TAU); ctx.fill();
  });
  const pulse = t < P ? [2, 3, 4].reduce((a, b) => a + Math.exp(-Math.max(0, t - b * B) * 10) * (t > b * B ? 1 : 0), 0) * 0.07 : 0;
  for (let k = 0; k < 12; k++) {
    const c = k % 4, r = Math.floor(k / 4);
    const ap = E.outBack(prog(t, 0.25 + k * 0.05, 0.6 + k * 0.05), 2); if (ap <= 0) continue;
    const gx = cx - u * 0.66 + c * u * 0.44, gy = cy - u * 0.12 + r * u * 0.27;
    const cl = clusters[Math.floor(k / 3) % 3], slot = k % 3, sa = -Math.PI / 2 + (slot - 1) * 2.1 + (Math.floor(k / 3) === 3 ? 1.05 : 0);
    const ci = Math.floor(k / 4), si = k % 4, ang = si * Math.PI / 2 + Math.PI / 4;
    const tc = clusters[ci];
    const m = E.inOutCubic(prog(t, P + k * 0.03, P + 0.55 + k * 0.03));
    const tx = tc[0] + Math.cos(ang) * u * 0.25, ty = tc[1] + Math.sin(ang) * u * 0.25;
    const x = lerp(gx, tx, m), y = lerp(gy, ty, m) - Math.sin(Math.PI * m) * u * 0.05, rot = lerp(0, ang - Math.PI / 2, m); // la silla queda hacia afuera, el pupitre mira a la mesa
    const s = ap * (1 + pulse);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    ctx.fillStyle = mix('#E3E0EC', C.lavL, m); ctx.strokeStyle = C.navy; ctx.lineWidth = lw / s;
    rr(ctx, -u * 0.05, u * 0.06, u * 0.1, u * 0.05, u * 0.012); ctx.fill(); ctx.stroke();
    ctx.fillStyle = mix('#F3F1F7', C.white, m); rr(ctx, -u * 0.11, -u * 0.05, u * 0.22, u * 0.1, u * 0.016); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
}

const METAS = { shapes: mShapes, spotlight: mSpotlight, lockstep: mLockstep, growth: mGrowth, bookburst: mBookburst, steps: mSteps, desks: mDesks };

// ============================================================================
//  RESPUESTA: pestaña + afirmación + tarjetas
// ============================================================================
const ICONS = {
  user(c) { c.beginPath(); c.arc(0, -0.38, 0.3, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(-0.62, 0.7); c.bezierCurveTo(-0.62, 0.02, 0.62, 0.02, 0.62, 0.7); c.stroke(); },
  duo(c) { c.save(); c.translate(-0.32, 0.02); c.scale(0.78, 0.78); ICONS.user(c); c.restore(); c.save(); c.translate(0.42, 0.14); c.scale(0.62, 0.62); ICONS.user(c); c.restore(); },
  group(c) { c.save(); c.translate(0, -0.06); c.scale(0.66, 0.66); ICONS.user(c); c.restore(); for (const sd of [-1, 1]) { c.save(); c.translate(sd * 0.66, 0.16); c.scale(0.48, 0.48); ICONS.user(c); c.restore(); } },
  heart(c) { heartPath(c, 0, 0.05, 0.75); c.stroke(); },
  shield(c) { c.beginPath(); c.moveTo(0, -0.85); c.lineTo(0.72, -0.55); c.lineTo(0.72, 0.05); c.quadraticCurveTo(0.72, 0.6, 0, 0.9); c.quadraticCurveTo(-0.72, 0.6, -0.72, 0.05); c.lineTo(-0.72, -0.55); c.closePath(); c.stroke(); c.beginPath(); c.moveTo(-0.32, 0.02); c.lineTo(-0.06, 0.3); c.lineTo(0.36, -0.2); c.stroke(); },
  star(c) { starPath(c, 0, 0.04, 0.85, 0.45); c.stroke(); },
  book(c) { c.beginPath(); c.moveTo(0, -0.42); c.quadraticCurveTo(-0.45, -0.72, -0.88, -0.52); c.lineTo(-0.88, 0.55); c.quadraticCurveTo(-0.45, 0.36, 0, 0.62); c.quadraticCurveTo(0.45, 0.36, 0.88, 0.55); c.lineTo(0.88, -0.52); c.quadraticCurveTo(0.45, -0.72, 0, -0.42); c.closePath(); c.stroke(); c.beginPath(); c.moveTo(0, -0.42); c.lineTo(0, 0.62); c.stroke(); },
  compass(c) { c.beginPath(); c.arc(0, 0, 0.82, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(0.42, -0.42); c.lineTo(0.12, 0.12); c.lineTo(-0.42, 0.42); c.lineTo(-0.12, -0.12); c.closePath(); c.stroke(); },
  sliders(c) { for (const [y, k] of [[-0.5, -0.3], [0, 0.35], [0.5, -0.05]]) { c.beginPath(); c.moveTo(-0.8, y); c.lineTo(0.8, y); c.stroke(); c.beginPath(); c.arc(k, y, 0.17, 0, TAU); c.fill(); } },
  steps(c) { c.beginPath(); c.moveTo(-0.85, 0.7); c.lineTo(-0.85, 0.3); c.lineTo(-0.3, 0.3); c.lineTo(-0.3, -0.1); c.lineTo(0.25, -0.1); c.lineTo(0.25, -0.5); c.lineTo(0.85, -0.5); c.stroke(); c.beginPath(); c.moveTo(0.55, -0.5); c.lineTo(0.55, -0.95); c.lineTo(0.85, -0.82); c.lineTo(0.55, -0.7); c.stroke(); },
  target(c) { c.beginPath(); c.arc(0, 0.05, 0.78, 0, TAU); c.stroke(); c.beginPath(); c.arc(0, 0.05, 0.4, 0, TAU); c.stroke(); c.beginPath(); c.arc(0, 0.05, 0.1, 0, TAU); c.fill(); },
};
function iconCircle(ctx, x, y, r, name, sc = 1) {
  if (sc <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(0, 0, r + r * 0.09, 0, TAU); ctx.fill();
  ctx.fillStyle = C.purple; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  const k = r * 0.52; ctx.scale(k, k); ctx.strokeStyle = C.white; ctx.fillStyle = C.white; ctx.lineWidth = 0.13; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ICONS[name](ctx); ctx.restore();
}
function purpleBg(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#34265E'); g.addColorStop(1, '#1D1330');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,0.055)'; const s = 54;
  for (let y = s / 2; y < H; y += s) for (let x = s / 2; x < W; x += s) { ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill(); }
  const lt = t - 5;
  [[0.85, 0.22, 0.42, C.lav], [0.1, 0.8, 0.5, C.coral]].forEach(([fx, fy, fr, col], i) => {
    const x = W * fx + Math.sin(lt * 0.7 + i) * 30, y = H * fy + Math.cos(lt * 0.6 + i) * 30, r = W * fr;
    const gg = ctx.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, col + '33'); gg.addColorStop(1, col + '00'); ctx.fillStyle = gg; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  });
}
function drawTab(ctx, t, top, h, size, pad, textY) {
  const tp = E.outExpo(prog(t, TL.tabT, TL.tabT + 0.6)), te = E.inCubic(prog(t, TL.exitT, TL.exitT + 0.35));
  if (tp <= 0) return;
  font(ctx, 400, size, 'Scr'); const tw = ctx.measureText(COPY.tab).width, tabW = tw + pad * 2;
  const x0 = -tabW * (1 - tp) - tabW * te, r = h * 0.2;
  ctx.fillStyle = C.coral; ctx.beginPath(); ctx.moveTo(x0 - 20, top - 20); ctx.lineTo(x0 + tabW, top - 20); ctx.lineTo(x0 + tabW, top + h - r); ctx.quadraticCurveTo(x0 + tabW, top + h, x0 + tabW - r, top + h); ctx.lineTo(x0 - 20, top + h); ctx.closePath(); ctx.fill();
  const wp = E.inOutSine(prog(t, TL.tabT + 0.2, TL.tabT + 0.8));
  ctx.save(); ctx.beginPath(); ctx.rect(x0 + pad - 10, top, (tw + 40) * wp, h); ctx.clip();
  ctx.fillStyle = C.white; ctx.fillText(COPY.tab, x0 + pad, top + textY); ctx.restore();
}
function drawBenefits(ctx, t) {
  purpleBg(ctx, t);
  // pestaña coral (eco de "Conociendo / Descubriendo" de sus artes)
  const T = LY.tab; drawTab(ctx, t, 0, T.h, T.size, T.pad, T.textY);
  drawRows(ctx, t);
}
// v2: panel morado que sube debajo de la pregunta (que se queda como encabezado)
function panelY(t) { return lerp(H + 60, PANEL.top, E.outCubic(prog(t, TL.panelT, TL.panelT + 0.65))); }
function drawPanel(ctx, t) {
  const y = panelY(t); if (y >= H) return;
  ctx.save(); rr(ctx, -2, y, W + 4, H - y + 120, FMT === 'reel' ? 60 : 48); ctx.clip();
  purpleBg(ctx, t); ctx.translate(0, y - PANEL.top);
  drawTab(ctx, t, PANEL.top, PANEL.tabH, PANEL.tabSize, PANEL.tabPad, PANEL.textY);
  drawRows(ctx, t);
  ctx.restore();
}
function drawRows(ctx, t) {
  const S = STK;
  ROWS.forEach((row, i) => {
    const ex = E.inCubic(prog(t, TL.exitT + i * 0.05, TL.exitT + 0.35 + i * 0.05));
    ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, -ex * 140);
    if (row.type === 'st') {
      const f = row.f, size = f.size, lh = size * f.lh; let wi = 0;
      f.lines.forEach((L, li) => {
        const by = row.y + size * 0.86 + li * lh;
        L.words.forEach(w => {
          const ta = row.t + wi * 0.05, p = prog(t, ta, ta + 0.45); wi++; if (p <= 0) return;
          const e = E.outCubic(p);
          ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(S.x + w.x, by + (1 - e) * size * 0.45);
          font(ctx, w.hl ? 800 : 700, size); ctx.fillStyle = w.hl ? C.coralL : C.white; ctx.fillText(w.text, 0, 0); ctx.restore();
        });
      });
    } else if (row.type === 'card') {
      const p = prog(t, row.t, row.t + 0.55); if (p > 0) {
        const e = E.outBack(p, 1.5), h = row.h, cxL = S.x + h * 0.42, x = cxL, w = S.w - h * 0.42;
        ctx.save(); ctx.globalAlpha *= clamp(p * 3);
        ctx.translate(S.x + S.w / 2, row.y + h / 2 + (1 - E.outCubic(p)) * 70); ctx.scale(lerp(0.75, 1, e), lerp(0.75, 1, e)); ctx.translate(-(S.x + S.w / 2), -(row.y + h / 2));
        ctx.shadowColor = 'rgba(10,4,20,0.35)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12;
        ctx.fillStyle = C.white; rr(ctx, x, row.y, w, h, h * 0.22); ctx.fill();
        ctx.shadowColor = 'transparent';
        iconCircle(ctx, cxL, row.y + h / 2, h * 0.38, row.icon, E.outBack(prog(t, row.t + 0.1, row.t + 0.5), 2.4));
        let tx = cxL + h * 0.38 + 34; const by = row.y + h / 2 + row.size * 0.36;
        row.line.words.forEach(wd => { font(ctx, wd.b ? 700 : 500, row.size); ctx.fillStyle = wd.b ? C.navy : C.ink2; ctx.fillText(wd.text, tx + wd.x, by); });
        ctx.restore();
      }
    } else if (row.type === 'plus') {
      const p = E.outBack(prog(t, row.t, row.t + 0.4), 2.5); if (p > 0) {
        const x = S.x + S.w / 2, y = row.y + row.h / 2, r = row.h * 0.46 * p;
        ctx.save(); ctx.translate(x, y); ctx.rotate((1 - p) * 1.5); ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
        ctx.fillStyle = C.white; const a = r * 0.55, b = r * 0.14; ctx.fillRect(-a, -b, a * 2, b * 2); ctx.fillRect(-b, -a, b * 2, a * 2); ctx.restore();
      }
    } else if (row.type === 'icons') {
      row.icons.forEach((ic, k) => {
        const p = E.outBack(prog(t, row.t + k * 0.2, row.t + k * 0.2 + 0.45), 2.2);
        const x = S.x + S.w * (0.2 + 0.3 * k), y = row.y + row.h / 2 + Math.sin(t * 2.2 + k) * 6;
        iconCircle(ctx, x, y, row.h * 0.36, ic, p);
      });
    }
    ctx.restore();
  });
}

// ============================================================================
//  CIERRE: logo que se construye + CTA
// ============================================================================
function drawLogoBuild(ctx, t) {
  const L = LY.logo, lt = (t - TL.ctaT) * TL.logoSpeed, M = LOGO.meta, Ly = LOGO.layers;
  const breath = 1 + 0.012 * Math.sin((t - TL.ctaT - 2) * 2.4) * prog(t, TL.ctaT + 2, TL.ctaT + 2.6);
  ctx.save(); ctx.translate(L.cx, L.cy); ctx.scale(L.s * breath, L.s * breath); ctx.translate(-400, -400);
  const wp = E.outCubic(prog(lt, 0.05, 0.95)), sw = wp * Math.PI * 1.04, ox = 400, oy = 440;
  if (wp > 0) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, 760, Math.PI / 2, Math.PI / 2 + sw, false); ctx.closePath(); ctx.clip(); ctx.drawImage(Ly.laurel_l, 0, 0); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, 760, Math.PI / 2 - sw, Math.PI / 2, false); ctx.closePath(); ctx.clip(); ctx.drawImage(Ly.laurel_r, 0, 0); ctx.restore();
  }
  const ip = prog(lt, 0.25, 0.7);
  if (ip > 0) { const e = E.outBack(ip, 1.8); ctx.save(); ctx.translate(400, 530); ctx.scale(lerp(0.3, 1, e), e); ctx.translate(-400, -530); ctx.drawImage(Ly.icon, 0, 0); ctx.restore(); }
  const gp = prog(t, TL.globeT, TL.globeT + 0.45);
  if (gp > 0) {
    const [gx, gy, gr] = M.globe_c, e = E.outBack(gp, 2.4);
    ctx.save(); ctx.translate(gx, gy); ctx.rotate((1 - E.outCubic(gp)) * -1.4); ctx.scale(e, e); ctx.translate(-gx, -gy); ctx.drawImage(Ly.globe, 0, 0); ctx.restore();
    const op = prog(t, TL.globeT, TL.globeT + 0.7); if (op < 1) { ctx.strokeStyle = C.orange; ctx.globalAlpha = 1 - op; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(gx, gy, gr * (1.2 + op * 0.9), gr * (0.45 + op * 0.4), -0.35, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
  }
  const tp = E.outCubic(prog(lt, 0.9, 1.3));
  if (tp > 0) { ctx.globalAlpha = tp; ctx.drawImage(Ly.est, 0, (1 - tp) * 16); ctx.drawImage(Ly.y2020, 0, (1 - tp) * 16); ctx.globalAlpha = 1; }
  TL.starT.forEach((st, i) => {
    const p = prog(t, st, st + 0.42); if (p <= 0) return;
    const [sx, sy] = M[`star${i}_c`], e = E.outBack(p, 3);
    ctx.save(); ctx.translate(sx, sy); ctx.rotate((1 - E.outCubic(p)) * -1.6); ctx.scale(e, e); ctx.translate(-sx, -sy); ctx.drawImage(Ly[`star${i}`], 0, 0); ctx.restore();
    const q = prog(t, st, st + 0.45); if (q < 1) { ctx.strokeStyle = C.orange; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.globalAlpha = 1 - q; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU - Math.PI / 2, r0 = 40 + 50 * E.outCubic(q), r1 = r0 + 26 * (1 - q); ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * r0, sy + Math.sin(a) * r0); ctx.lineTo(sx + Math.cos(a) * r1, sy + Math.sin(a) * r1); ctx.stroke(); } ctx.globalAlpha = 1; }
  });
  ctx.restore();
}
function drawLockup(ctx, t) {
  const y0 = LY.lock.y, sc = FMT === 'reel' ? 1 : 0.86;
  const lines = [
    { k: 'apex', size: 28 * sc, gap: 0 },
    { k: 'blended', size: 72 * sc, gap: 14 * sc },
    { k: 'school', size: 72 * sc, gap: -6 * sc },
    { k: 'tag', size: 19 * sc, gap: 22 * sc },
  ];
  let y = y0;
  lines.forEach((L, i) => {
    y += L.gap + L.size * (i === 0 ? 0 : 0.92);
    const p = E.outCubic(prog(t, TL.lockT + i * 0.08, TL.lockT + 0.45 + i * 0.08)); if (p <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.rect(0, y - L.size * 1.0, W, L.size * 1.25); ctx.clip();
    const dy = (1 - p) * L.size * 1.1; ctx.textAlign = 'center';
    if (L.k === 'apex') { font(ctx, 600, L.size); ctx.letterSpacing = '0.7em'; ctx.fillStyle = C.purple; ctx.fillText('APEX', W / 2 + L.size * 0.35, y + dy); }
    else if (L.k === 'blended') { font(ctx, 800, L.size); ctx.fillStyle = C.navy; ctx.fillText('BLENDED', W / 2, y + dy); }
    else if (L.k === 'school') { font(ctx, 800, L.size); ctx.fillStyle = C.coral; ctx.fillText('SCHOOL', W / 2, y + dy); }
    else { font(ctx, 600, L.size); ctx.letterSpacing = '0.18em'; ctx.fillStyle = C.ink2; ctx.fillText('INNOVATING TOWARDS A BIGGER FUTURE', W / 2 + L.size * 0.09, y + dy); }
    ctx.letterSpacing = '0px'; ctx.textAlign = 'left'; ctx.restore();
  });
}
function drawPill(ctx, t) {
  const P = LY.pill, p = prog(t, TL.pillT, TL.pillT + 0.5); if (p <= 0) return;
  const e = E.outBack(p, 1.7);
  let press = 0; TL.taps.forEach(tp => { const q = prog(t, tp - 0.06, tp + 0.22); if (q > 0 && q < 1) press += Math.sin(Math.PI * q) * 0.05; });
  const w = PILL.w, h = P.h, x = W / 2 - w / 2, y = P.cy - h / 2, s = lerp(0.6, 1, e) * (1 - press);
  ctx.save(); ctx.globalAlpha = clamp(p * 3); ctx.translate(W / 2, P.cy); ctx.scale(s, s); ctx.translate(-W / 2, -P.cy);
  ctx.shadowColor = 'rgba(37,23,46,0.35)'; ctx.shadowBlur = 34; ctx.shadowOffsetY = 14;
  ctx.fillStyle = C.deep; rr(ctx, x, y, w, h, h / 2); ctx.fill(); ctx.shadowColor = 'transparent';
  font(ctx, 700, PILL.size); ctx.fillStyle = C.white; ctx.fillText(COPY.cta, x + 52, P.cy + PILL.size * 0.36);
  const ar = h * 0.36, ax = x + w - h * 0.5 - 6, ay = P.cy;
  ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(ax, ay, ar, 0, TAU); ctx.fill();
  const nud = Math.abs(Math.sin(Math.PI * (t - TL.pillT) / TL.B)) * ar * 0.16 * prog(t, TL.pillT + 0.4, TL.pillT + 0.7);
  ctx.strokeStyle = C.white; ctx.lineWidth = ar * 0.16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(ax - ar * 0.42 + nud, ay); ctx.lineTo(ax + ar * 0.42 + nud, ay); ctx.moveTo(ax + ar * 0.08 + nud, ay - ar * 0.34); ctx.lineTo(ax + ar * 0.42 + nud, ay); ctx.lineTo(ax + ar * 0.08 + nud, ay + ar * 0.34); ctx.stroke();
  ctx.restore();
  TL.taps.forEach(tp => {
    const q = prog(t, tp, tp + 0.6), ax2 = W / 2 + w / 2 - h * 0.5 - 6;
    if (q > 0 && q < 1) { ctx.strokeStyle = C.coral; ctx.globalAlpha = 1 - q; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(ax2, P.cy, h * 0.4 + q * h * 0.7, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
    const f = prog(t, tp - 0.3, tp + 0.35);
    if (f > 0 && f < 1) { const a = Math.sin(Math.PI * f), pr = t > tp ? 0.85 : 1; ctx.save(); ctx.globalAlpha = a * 0.9; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.strokeStyle = C.lav; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(ax2 + 18, P.cy + 22, h * 0.2 * pr, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
  });
}
function drawCTA(ctx, t) {
  paper(ctx, t, false);
  const L = LY.logo, gr = 460 * L.s * 1.1;
  const g = ctx.createRadialGradient(L.cx, L.cy, 0, L.cx, L.cy, gr); g.addColorStop(0, 'rgba(135,134,193,0.28)'); g.addColorStop(1, 'rgba(135,134,193,0)');
  ctx.fillStyle = g; ctx.fillRect(L.cx - gr, L.cy - gr, gr * 2, gr * 2);
  drawLogoBuild(ctx, t); drawLockup(ctx, t); drawPill(ctx, t);
}

// ============================================================================
//  COMPOSICIÓN + TRANSICIONES
// ============================================================================
function drawHookScene(ctx, t, withText = true) {
  const v2 = TL.v === 2;
  paper(ctx, t, false); doodles(ctx, t + 0.4); chip(ctx, t + (v2 ? 1 : 0.35), v2 ? 1 - prog(t, TL.panelT, TL.panelT + 0.35) : 1);
  const I = LY.ill; METAS[COPY.meta.type](ctx, t - TL.metaOff, { cx: I.cx, cy: I.cy, u: I.u }, COPY.meta);
  if (withText) drawHook(ctx, t);
}
function barRect(t) {
  const L = LY.bar; if (t < 4.55) return null;
  if (t < 4.85) { const p = E.outBack(prog(t, 4.55, 4.85), 1.3), w = Math.max(1, L.w * p); return { x: W / 2 - w / 2, y: L.y - L.h / 2, w, h: L.h, r: L.h / 2, small: true }; }
  const p = E.inOutCubic(prog(t, 4.85, 5.3));
  return { x: lerp(W / 2 - L.w / 2, 0, p), y: lerp(L.y - L.h / 2, 0, p), w: lerp(L.w, W, p), h: lerp(L.h, H, p), r: lerp(L.h / 2, 0, p), small: false, p };
}
function renderScene(ctx, t) {
  ctx.save(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (TL.v === 2) {
    const a = TL.ctaT - 0.25, b = TL.ctaT + 0.3;
    if (t < b) { drawHookScene(ctx, t, false); drawPanel(ctx, t); drawHook(ctx, t); } // la pregunta siempre encima
    const L = LY.logo, p = E.inOutCubic(prog(t, a, b)), R = Math.hypot(W, H) * p;
    if (p > 0) {
      ctx.save(); ctx.beginPath(); ctx.arc(L.cx, L.cy, R, 0, TAU); ctx.clip(); drawCTA(ctx, t); ctx.restore();
      if (p < 1) { ctx.strokeStyle = C.coral; ctx.lineWidth = 18 * (1 - p) + 4; ctx.beginPath(); ctx.arc(L.cx, L.cy, R, 0, TAU); ctx.stroke(); }
    }
    ctx.restore(); return;
  }
  if (t < 5.3) {
    drawHookScene(ctx, t);
    const R = barRect(t);
    if (R) {
      ctx.save(); rr(ctx, R.x, R.y, R.w, R.h, R.r); ctx.clip(); drawBenefits(ctx, Math.max(t, 5.0));
      if (R.small || (R.p !== undefined && R.p < 0.35)) {
        const a = R.small ? 1 : 1 - R.p / 0.35, ax = R.x + R.w - L_arrowPad(R), ay = R.y + R.h / 2, s = R.h * 0.22;
        ctx.globalAlpha = a; ctx.strokeStyle = C.white; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        rr(ctx, ax - s * 2.4, ay - s * 1.3, s * 4.8, s * 2.6, s * 1.3); ctx.stroke();
        const nx = Math.sin(t * 14) * 4; ctx.beginPath(); ctx.moveTo(ax - s * 1.1 + nx, ay); ctx.lineTo(ax + s * 1.1 + nx, ay); ctx.moveTo(ax + s * 0.5 + nx, ay - s * 0.6); ctx.lineTo(ax + s * 1.1 + nx, ay); ctx.lineTo(ax + s * 0.5 + nx, ay + s * 0.6); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }
  } else if (t < 9.75) drawBenefits(ctx, t);
  else {
    drawBenefits(ctx, Math.min(t, 10.4));
    const L = LY.logo, p = E.inOutCubic(prog(t, 9.75, 10.3)), R = Math.hypot(W, H) * p;
    if (p > 0) {
      ctx.save(); ctx.beginPath(); ctx.arc(L.cx, L.cy, R, 0, TAU); ctx.clip(); drawCTA(ctx, t); ctx.restore();
      if (p < 1) { ctx.strokeStyle = C.coral; ctx.lineWidth = 18 * (1 - p) + 4; ctx.beginPath(); ctx.arc(L.cx, L.cy, R, 0, TAU); ctx.stroke(); }
    }
  }
  ctx.restore();
}
function L_arrowPad(R) { return R.h * 0.95; }

window.renderFrame = function (frame) {
  const t0 = frame / FPS;
  for (let k = 0; k < MB; k++) {
    const ts = Math.min(DUR - 1e-4, t0 + (MB === 1 ? 0 : (k / MB) * 0.5 / FPS));
    renderScene(sctx, ts);
    octx.globalAlpha = 1 / (k + 1); octx.drawImage(sc, 0, 0);
  }
  octx.globalAlpha = 1;
  return true;
};
window.setup = function (i, fmt, mb, v) {
  FMT = fmt; W = 1080; H = fmt === 'reel' ? 1920 : 1080; MB = mb || 3;
  for (const c of [cv, sc]) { c.width = W; c.height = H; }
  COPY = APEX_COPIES[i]; TL = APEX_TL.build(COPY, { v: v || 1 }); LY = makeLayout(fmt);
  prepare();
  return { id: COPY.id, frames: FPS * DUR, w: W, h: H };
};
window.ready = (async () => {
  for (const f of ['400 10px Pop', '500 10px Pop', '600 10px Pop', '700 10px Pop', '800 10px Pop', '10px Scr', '700 10px Hand']) await document.fonts.load(f);
  await loadLogo();
  const q = new URLSearchParams(location.search);
  window.setup(+(q.get('i') || 0), q.get('fmt') || 'reel', +(q.get('mb') || 3));
  return true;
})();

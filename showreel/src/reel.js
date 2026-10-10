// ============================================================================
//  SHOWREEL 2026 — 100% código. 1920x1080 @ 60fps, 15 s, 128 BPM (8 compases)
// ============================================================================
const W = 1920, H = 1080, FPS = 60, DUR = 15, BPM = 128, B = 60 / BPM;
const COL = { ink: '#0C0C11', paper: '#F2EEE5', coral: '#FF4A26', blue: '#2B47FF', lime: '#D4FF3A', grey: '#77747F' };
const TAU = Math.PI * 2;
const MB_SAMPLES = (new URLSearchParams(location.search)).get('mb') | 0 || 6; // sub-frames de motion blur
const SHUTTER = 0.5; // 180°

// ---------------------------------------------------------------- utilidades
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const frac = x => x - Math.floor(x);
const E = {
  outExpo: t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inExpo: t => t <= 0 ? 0 : Math.pow(2, 10 * t - 10),
  inOutExpo: t => t <= 0 ? 0 : t >= 1 ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inCubic: t => t * t * t,
  inOutCubic: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outQuint: t => 1 - Math.pow(1 - t, 5),
  inOutQuint: t => t < .5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2,
  outBack: (t, s = 1.70158) => t <= 0 ? 0 : 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  outElastic: t => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * (TAU / 3)) + 1,
};
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function noise1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u) * 2 - 1; }
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const spring = (tau, k = 9, w = 22) => tau < 0 ? 1 : Math.exp(-tau * k) * Math.cos(tau * w); // 1 -> 0 amortiguado

function mk(w = W, h = H) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
const out = document.getElementById('c'), octx = out.getContext('2d');
const sc = mk(), sctx = sc.getContext('2d');
const tmp = mk(), tctx = tmp.getContext('2d');
const chans = [mk(), mk(), mk()];

function F(ctx, fam, size) { ctx.font = `${size}px ${fam}`; }
function bg(ctx, c) { ctx.fillStyle = c; ctx.fillRect(-50, -50, W + 100, H + 100); }
function rrect(ctx, x, y, w, h, r) { r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
const LCACHE = {};
function letters(ctx, text, fam, size, tracking = 0) {
  const key = text + fam + size + tracking;
  if (LCACHE[key]) return LCACHE[key];
  F(ctx, fam, size); let x = 0; const arr = [];
  for (const ch of text) { const w = ctx.measureText(ch).width; arr.push({ ch, x, w }); x += w + tracking * size; }
  return LCACHE[key] = { arr, total: x - tracking * size };
}
function mono(ctx, txt, x, y, size = 20, color = COL.paper, align = 'left', fam = 'Mono') {
  F(ctx, fam, size); ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = color;
  ctx.letterSpacing = '0.12em'; ctx.fillText(txt, x, y); ctx.letterSpacing = '0px'; ctx.textAlign = 'left';
}
function typed(str, p) { return str.slice(0, Math.floor(str.length * clamp(p) + 1e-6)); }

// ============================================================================
//  ESCENA 1 — INTRO  (beats 0–4): punto → línea → "SHOWREEL."
// ============================================================================
function sIntro(ctx, b) {
  bg(ctx, COL.ink);
  const S = 210, L = letters(ctx, 'SHOWREEL', 'DBlk', S, -0.015);
  const lw = L.total + 220;
  const col = E.inExpo(prog(b, 3.5, 4));
  ctx.save(); ctx.translate(W / 2, H / 2);
  const drift = 1 + 0.035 * E.outCubic(prog(b, 2, 3.5));
  ctx.scale(drift * (1 + 0.25 * col), drift * Math.max(0.004, 1 - col));
  ctx.fillStyle = COL.paper;
  if (b < 1.25) {
    // anticipación: el punto se aplasta justo antes de estirarse
    const pin = E.outBack(prog(b, 0.05, 0.45), 2.6);
    const sq = Math.sin(Math.PI * prog(b, 0.38, 0.55)) * 0.35;
    const ps = prog(b, 0.5, 1.25);
    let w = lerp(30, lw, E.inOutExpo(ps)) * pin, h = lerp(30, 6, E.outExpo(prog(b, 0.5, 0.8))) * pin;
    w *= 1 + sq; h *= 1 - sq * 0.6;
    if (w > 0.5) { rrect(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill(); }
    // pequeña cruz guía
    const ga = prog(b, 0.1, 0.4) * (1 - prog(b, 0.6, 0.9));
    if (ga > 0) { ctx.globalAlpha = ga * 0.5; ctx.fillRect(-60, -0.75, 30, 1.5); ctx.fillRect(30, -0.75, 30, 1.5); ctx.fillRect(-0.75, -60, 1.5, 30); ctx.fillRect(-0.75, 30, 1.5, 30); ctx.globalAlpha = 1; }
  } else {
    const off = 150 * E.outExpo(prog(b, 1.25, 1.95));
    const lwk = lw * (1 - 0.1 * E.outExpo(prog(b, 1.25, 1.9)));
    ctx.fillRect(-lwk / 2, -off - 3, lwk, 6); ctx.fillRect(-lwk / 2, off - 3, lwk, 6);
    ctx.save(); ctx.beginPath(); ctx.rect(-W, -off + 3, 2 * W, 2 * off - 6); ctx.clip();
    F(ctx, 'DBlk', S); ctx.textBaseline = 'alphabetic';
    const x0 = -L.total / 2 - S * 0.07, base = S * 0.364;
    L.arr.forEach((l, i) => {
      const d = 1.3 + i * 0.055, p = E.outExpo(prog(b, d, d + 0.55));
      ctx.save(); ctx.translate(x0 + l.x + l.w / 2, base + (1 - p) * S * 1.05);
      ctx.transform(1, 0, -0.25 * (1 - p), 1, 0, 0);
      ctx.fillText(l.ch, -l.w / 2, 0); ctx.restore();
    });
    ctx.restore();
    const pp = E.outBack(prog(b, 2.0, 2.35), 3.2);
    if (pp > 0) { ctx.fillStyle = COL.coral; ctx.beginPath(); ctx.arc(x0 + L.total + S * 0.14, base - S * 0.075, S * 0.08 * pp, 0, TAU); ctx.fill(); }
    const tp = prog(b, 1.9, 2.6);
    mono(ctx, typed('CLAUDE — MOTION DESIGN', tp), -lwk / 2, -off - 22, 19, COL.paper);
    mono(ctx, typed('REEL / 2026', tp), lwk / 2, -off - 22, 19, COL.paper, 'right');
    mono(ctx, typed('00 — 15 SEC', prog(b, 2.2, 2.8)), -lwk / 2, off + 40, 19, COL.grey);
    mono(ctx, typed('128 BPM', prog(b, 2.2, 2.8)), lwk / 2, off + 40, 19, COL.grey, 'right');
  }
  ctx.restore();
}

// ============================================================================
//  ESCENA 2 — TIPOGRAFÍA CINÉTICA  (beats 4–8): EVERY / FRAME / IS / INTENTIONAL
// ============================================================================
const WORDS = [
  { w: 'EVERY', bg: COL.coral, fg: COL.ink, acc: COL.paper },
  { w: 'FRAME', bg: COL.ink, fg: COL.paper, acc: COL.coral },
  { w: 'IS', bg: COL.blue, fg: COL.lime, acc: COL.lime },
  { w: 'INTENTIONAL', bg: COL.paper, fg: COL.ink, acc: COL.coral },
];
function drawWord(ctx, i, lb) {
  const o = WORDS[i]; bg(ctx, o.bg);
  let S = i == 2 ? 600 : 430;
  let L = letters(ctx, o.w, 'DBlk', S, -0.025);
  if (L.total > 1700) { S = Math.floor(S * 1700 / L.total); L = letters(ctx, o.w, 'DBlk', S, -0.025); }
  const s = 1 + 0.07 * lb;
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(s, s);
  const x0 = -L.total / 2, base = S * 0.364;
  F(ctx, 'DBlk', S); ctx.textBaseline = 'alphabetic';
  if (i == 0) { // barras laterales que golpean
    const p = E.outExpo(prog(lb, 0, 0.4));
    ctx.fillStyle = o.fg;
    for (let k = 0; k < 6; k++) { const hh = 8 + k * 6; const y = -H / 2 + 120 + k * 26; ctx.globalAlpha = 1; ctx.fillRect(-W / 2 + 90, y, (220 - k * 30) * p, 4); ctx.fillRect(W / 2 - 90 - (220 - k * 30) * p, H / 2 - 120 - k * 26, (220 - k * 30) * p, 4); }
  }
  if (i == 1) { // ecos en contorno
    ctx.lineWidth = 2.5; ctx.strokeStyle = o.acc;
    for (let k = 4; k >= 1; k--) {
      const p = E.outExpo(prog(lb, 0.05 + k * 0.03, 0.6 + k * 0.05));
      ctx.globalAlpha = 1 - k * 0.18;
      L.arr.forEach(l => ctx.strokeText(l.ch, x0 + l.x, base - k * S * 0.2 * p));
    }
    ctx.globalAlpha = 1;
  }
  if (i == 2) { // anillo + órbita
    const p = E.outBack(prog(lb, 0, 0.45), 1.4);
    ctx.strokeStyle = o.acc; ctx.lineWidth = 16;
    ctx.beginPath(); ctx.arc(0, 0, 470 * p, -Math.PI / 2, -Math.PI / 2 + TAU * E.outExpo(prog(lb, 0, 0.7))); ctx.stroke();
    const a = -Math.PI / 2 + TAU * E.outExpo(prog(lb, 0, 0.7)) + lb * 1.5;
    ctx.fillStyle = COL.coral; ctx.beginPath(); ctx.arc(Math.cos(a) * 470 * p, Math.sin(a) * 470 * p, 34 * p, 0, TAU); ctx.fill();
  }
  // letras con máscara (aparecen desde abajo)
  ctx.save(); ctx.beginPath(); ctx.rect(-W, base - S * 0.8, 2 * W, S * 0.83); ctx.clip();
  ctx.fillStyle = o.fg;
  L.arr.forEach((l, j) => {
    const d = j * (i == 3 ? 0.028 : 0.045), p = E.outExpo(prog(lb, d, d + 0.4));
    ctx.save(); ctx.translate(x0 + l.x + l.w / 2, base + (1 - p) * S * 0.85);
    ctx.scale(1, 1 + (1 - p) * 0.6);
    ctx.fillText(l.ch, -l.w / 2, 0); ctx.restore();
  });
  ctx.restore();
  if (i == 3) { // subrayado
    const p = E.outExpo(prog(lb, 0.35, 0.7));
    ctx.fillStyle = o.acc; ctx.fillRect(x0, base + S * 0.13, L.total * p, S * 0.09);
  }
  mono(ctx, `0${i + 1} / 04`, x0, base + S * 0.13 + (i == 3 ? S * 0.09 + 44 : 40), 22, o.fg);
  mono(ctx, ['KINETIC', 'TYPE', 'IS', 'CRAFT'][i] + ' →', x0 + L.total, base + S * 0.13 + (i == 3 ? S * 0.09 + 44 : 40), 22, o.fg, 'right');
  ctx.restore();
}
function sKinetic(ctx, b) {
  const i = Math.min(3, Math.floor(b)), lb = b - i;
  if (i == 2 && lb < 0.25) { // wipe circular
    drawWord(ctx, 1, 1);
    ctx.save(); ctx.beginPath(); ctx.arc(W / 2, H / 2, 1150 * E.outExpo(prog(lb, 0, 0.25)), 0, TAU); ctx.clip();
    drawWord(ctx, 2, lb); ctx.restore();
  } else if (i == 3 && lb < 0.3) { // wipe diagonal
    drawWord(ctx, 2, 1);
    const x = lerp(-700, W + 700, E.inOutExpo(prog(lb, 0, 0.3)));
    ctx.save(); ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(x + 300, -10); ctx.lineTo(x - 300, H + 10); ctx.lineTo(-10, H + 10); ctx.closePath(); ctx.clip();
    drawWord(ctx, 3, lb); ctx.restore();
    ctx.fillStyle = COL.coral; ctx.save(); ctx.beginPath(); ctx.moveTo(x + 300, -10); ctx.lineTo(x + 340, -10); ctx.lineTo(x - 260, H + 10); ctx.lineTo(x - 300, H + 10); ctx.fill(); ctx.restore();
  } else drawWord(ctx, i, lb);
  if (i == 3) { // panel que sube y entrega a la escena 3
    const p = E.inOutExpo(prog(lb, 0.78, 1));
    if (p > 0) { ctx.fillStyle = COL.coral; ctx.fillRect(0, H - H * E.inOutExpo(prog(lb, 0.74, 0.97)) - 0, W, H); ctx.fillStyle = COL.ink; ctx.fillRect(0, H - H * p, W, H * p + 2); }
  }
}

// ============================================================================
//  ESCENA 3 — MARQUESINAS + ZOOM DENTRO DE LA "O"  (beats 8–12)
// ============================================================================
const ROWS = ['DESIGN — MOTION — ', 'TYPOGRAPHY ● RHYTHM ● ', 'TIMING — SPACING — ', 'SHAPE ● COLOR ● FORM ● ', 'EASING — WEIGHT — ', 'GRID ● SYSTEM ● '];
function sMarquee(ctx, b, t) {
  bg(ctx, COL.ink);
  const zp = prog(b, 2.35, 4);
  const z = Math.pow(80, E.inCubic(zp) * 0.85 + E.inExpo(zp) * 0.15);
  const rot = lerp(-0.16, 0, E.inOutCubic(prog(b, 1.9, 3.3)));
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.rotate(rot); ctx.translate(-W / 2, -H / 2);
  const rowH = 205, RS = 150;
  for (let k = -5; k <= 5; k++) {
    if (k == 0) continue;
    const txt = ROWS[(k + 6) % ROWS.length];
    const L = letters(ctx, txt, 'DBlk', RS, -0.02);
    const dir = k % 2 ? 1 : -1;
    const speed = 150 + 45 * Math.abs(k);
    const step = Math.floor(b) + E.outExpo(frac(b));
    let pos = dir * (speed * step + 90 * b);
    pos += dir * 2600 * (1 - E.outExpo(prog(b, 0, 0.75 + Math.abs(k) * 0.04)));
    const yb = H / 2 + k * rowH + (k > 0 ? 60 : -40) + RS * 0.364;
    const style = (k + 10) % 3;
    F(ctx, 'DBlk', RS); ctx.textBaseline = 'alphabetic';
    let x = ((pos % L.total) + L.total) % L.total - L.total * 2;
    ctx.lineWidth = 2;
    while (x < W + 900) {
      if (style == 0) { ctx.fillStyle = COL.paper; ctx.fillText(txt, x, yb); }
      else if (style == 1) { ctx.strokeStyle = COL.paper; ctx.strokeText(txt, x, yb); }
      else { ctx.strokeStyle = COL.grey; ctx.strokeText(txt, x, yb); }
      x += L.total;
    }
  }
  // fila central: MOTION — la primera O queda centrada en pantalla
  const S = 300, L = letters(ctx, 'MOTION', 'DBlk', S, -0.02);
  const xoff = 1800 * (1 - E.outExpo(prog(b, 0, 0.9)));
  const x0 = W / 2 - (L.arr[1].x + L.arr[1].w / 2) + xoff, base = H / 2 + S * 0.3635;
  F(ctx, 'DBlk', S);
  L.arr.forEach((l, j) => {
    const pulse = 1 + 0.06 * Math.exp(-frac(b) * 7) * (b > 1 ? 1 : 0);
    ctx.save(); ctx.translate(x0 + l.x + l.w / 2, base - S * 0.36); ctx.scale(pulse, pulse);
    ctx.fillStyle = j == 1 ? COL.coral : COL.lime; ctx.fillText(l.ch, -l.w / 2, S * 0.36); ctx.restore();
  });
  ctx.restore();
  mono(ctx, 'ZOOM ×' + z.toFixed(2), W - 90, H - 140, 20, COL.paper, 'right');
}

// ============================================================================
//  ESCENA 4 — ESCULTURA DE PARTÍCULAS 3D  (beats 12–16)
// ============================================================================
const NP = 1600, SHAPES = {};
(function () {
  const r = rng(7), sph = [], tor = [], knot = [], grid = [];
  for (let i = 0; i < NP; i++) {
    const y = 1 - (i + 0.5) / NP * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963;
    sph.push([Math.cos(th) * rr, y, Math.sin(th) * rr]);
    const a = (i % 64) / 64 * TAU + Math.floor(i / 64) * 0.12, c = Math.floor(i / 64) / 25 * TAU;
    tor.push([(1 + 0.38 * Math.cos(c)) * Math.cos(a) * 0.82, 0.38 * Math.sin(c) * 0.82, (1 + 0.38 * Math.cos(c)) * Math.sin(a) * 0.82]);
    const u = i / NP * TAU, q = 3, p = 2, kr = 0.62 + 0.28 * Math.cos(q * u);
    const ja = r() * TAU, jr = 0.07 * Math.sqrt(r());
    knot.push([kr * Math.cos(p * u) * 1.15 + Math.cos(ja) * jr, 0.32 * Math.sin(q * u) * 1.15 + Math.sin(ja) * jr, kr * Math.sin(p * u) * 1.15 + Math.cos(ja + 1) * jr]);
    const cell = i % 144; grid.push([(cell % 16) * 120 + 60, Math.floor(cell / 16) * 120 + 60]);
  }
  Object.assign(SHAPES, { sph, tor, knot, grid });
})();
function sParticles(ctx, b, t) {
  bg(ctx, COL.ink);
  // anillos de órbita
  const ry = t * 0.9, rx = 0.45 + 0.15 * Math.sin(t * 1.3);
  const grow = E.outExpo(prog(b, 0, 0.8));
  const pulse = 1 + 0.07 * Math.exp(-frac(b) * 6);
  const scale = 380 * grow * pulse, d = 3.6, cx = W / 2, cy = H / 2;
  const fl = prog(b, 3.2, 3.95);
  ctx.save();
  ctx.globalAlpha = 0.3 * grow * (1 - fl);
  ctx.strokeStyle = COL.paper; ctx.lineWidth = 1.5;
  for (let k = 0; k < 3; k++) {
    ctx.beginPath(); ctx.ellipse(cx, cy, scale * (1.5 + k * 0.28), scale * (1.5 + k * 0.28) * (0.22 + 0.1 * k), t * 0.3 * (k % 2 ? 1 : -1) + k, 0, TAU); ctx.stroke();
  }
  ctx.restore();
  const morph = (lb0, i) => E.inOutExpo(clamp((b - lb0 - (i / NP) * 0.25) / 0.55));
  const cy_ = Math.cos(ry), sy_ = Math.sin(ry), cx_ = Math.cos(rx), sx_ = Math.sin(rx);
  ctx.globalCompositeOperation = 'lighter';
  const pts = [];
  for (let i = 0; i < NP; i++) {
    const A = SHAPES.sph[i], Bp = SHAPES.tor[i], Cp = SHAPES.knot[i];
    const m1 = morph(1, i), m2 = morph(2, i);
    let x = lerp(lerp(A[0], Bp[0], m1), Cp[0], m2), y = lerp(lerp(A[1], Bp[1], m1), Cp[1], m2), z = lerp(lerp(A[2], Bp[2], m1), Cp[2], m2);
    // ruido orgánico
    const n = 0.03 * Math.sin(t * 3 + i * 0.37);
    x += n; y += n * 0.5;
    let X = x * cy_ + z * sy_, Z = -x * sy_ + z * cy_;
    let Y = y * cx_ - Z * sx_; Z = y * sx_ + Z * cx_;
    const pr = d / (d + Z);
    let px = cx + X * scale * pr, py = cy + Y * scale * pr;
    const g = SHAPES.grid[i];
    const m3 = E.inOutExpo(clamp((fl - (i / NP) * 0.3) / 0.7));
    px = lerp(px, g[0], m3); py = lerp(py, g[1], m3);
    const depth = clamp((Z + 1.2) / 2.4);
    const sz = lerp(lerp(4.2, 1.4, depth), 2.6, m3) * (0.6 + 0.4 * grow);
    pts.push(px, py, sz, depth, m3);
  }
  for (let k = 0; k < pts.length; k += 5) {
    const depth = pts[k + 3], m3 = pts[k + 4];
    const c = depth < 0.5 ? COL.coral : COL.blue;
    ctx.fillStyle = m3 > 0.6 ? COL.paper : c;
    ctx.globalAlpha = lerp(lerp(1, 0.55, depth), 1, m3);
    ctx.beginPath(); ctx.arc(pts[k], pts[k + 1], pts[k + 2], 0, TAU); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  const forms = ['SPHERE', 'TORUS', 'TORUS KNOT (2,3)', 'GRID 16×9'];
  const fi = Math.min(3, Math.floor(b + 0.0001));
  const la = grow;
  ctx.globalAlpha = la;
  mono(ctx, 'PARTICLES · ' + NP, 90, H - 140, 20, COL.paper);
  mono(ctx, 'FORM → ' + typed(forms[fi], prog(b - fi, 0, 0.35)), 90, H - 110, 20, COL.coral);
  ctx.fillStyle = COL.paper; ctx.fillRect(90, H - 96, 240 * frac(b), 2);
  ctx.globalAlpha = 1;
}

// ============================================================================
//  ESCENA 5 — BUILD-UP: rejilla en ola + "TIMING IS EVERYTHING"  (beats 16–20)
// ============================================================================
function sBuild(ctx, b, t) {
  bg(ctx, COL.ink);
  if (b >= 3.75) { // silencio: una línea que colapsa
    const p = E.outExpo(prog(b, 3.75, 4));
    ctx.fillStyle = COL.paper; const w = W * (1 - p) * 0.8 + 2; ctx.fillRect(W / 2 - w / 2, H / 2 - 1.5, w, 3);
    return;
  }
  const appear = E.outExpo(prog(b, 0, 0.5));
  // fase acelerada: velocidad crece con el build (integral de una rampa)
  const ph = b * 1.2 + b * b * 0.55;
  const step16 = Math.floor(b * 4);
  for (let r = 0; r < 9; r++) for (let c = 0; c < 16; c++) {
    const dx = c - 7.5, dy = r - 4;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const w = 0.5 + 0.5 * Math.sin(dist * 0.75 - ph * TAU * 0.5);
    let s = lerp(5.2, 108 * (0.15 + 0.85 * w), appear);
    const rot = (b > 1.5 ? w * Math.PI / 2 * prog(b, 1.5, 2.5) : 0);
    const hl = hash(c * 31 + r * 17 + step16 * 7) < lerp(0.04, 0.22, prog(b, 1, 3.5));
    ctx.fillStyle = hl ? COL.coral : COL.paper;
    ctx.save(); ctx.translate(c * 120 + 60, r * 120 + 60); ctx.rotate(rot);
    ctx.fillRect(-s / 2, -s / 2, s, s); ctx.restore();
  }
  // texto en difference sobre la rejilla
  // banda de tinta detrás del texto (legibilidad sobre la rejilla)
  if (b >= 1) {
    const bh = b < 2.5 ? 300 : 220, bp = E.outExpo(prog(b, 1, 1.3));
    const bh2 = b >= 2.5 ? lerp(300, 220, E.outExpo(prog(b, 2.5, 2.7))) : bh * bp;
    ctx.fillStyle = COL.ink; ctx.fillRect(0, H / 2 - bh2 / 2, W, bh2);
    ctx.fillStyle = COL.coral; ctx.fillRect(0, H / 2 - bh2 / 2 - 4, W * bp, 4); ctx.fillRect(W * (1 - bp), H / 2 + bh2 / 2, W * bp, 4);
  }
  ctx.save(); ctx.fillStyle = COL.paper;
  ctx.textBaseline = 'alphabetic';
  if (b >= 1 && b < 2.5) {
    const S = 280, L = letters(ctx, 'TIMING', 'DBlk', S, -0.02);
    const n = Math.min(6, Math.floor((b - 1) * 4) + 1);
    F(ctx, 'DBlk', S);
    const sc_ = 1 + 0.08 * (b - 1);
    ctx.translate(W / 2, H / 2); ctx.scale(sc_, sc_);
    for (let j = 0; j < n; j++) ctx.fillText(L.arr[j].ch, -L.total / 2 + L.arr[j].x, S * 0.364);
  } else if (b >= 2.5) {
    const txt = 'IS EVERYTHING', S = 190, L = letters(ctx, txt, 'DBlk', S, -0.02);
    const n = Math.min(txt.length, Math.floor((b - 2.5) * 12) + 1);
    F(ctx, 'DBlk', S); ctx.translate(W / 2, H / 2);
    const jit = prog(b, 3, 3.75);
    for (let j = 0; j < n; j++) ctx.fillText(L.arr[j].ch, -L.total / 2 + L.arr[j].x + (hash(j + step16 * 13) - 0.5) * 40 * jit, S * 0.364 + (hash(j * 3 + step16) - 0.5) * 30 * jit);
  }
  ctx.restore();
  // barra de progreso del build
  ctx.fillStyle = COL.coral; ctx.fillRect(0, H - 8, W * (b / 3.75), 8);
  mono(ctx, 'BUILD ' + String(Math.floor(b / 3.75 * 100)).padStart(3, '0') + '%', W - 90, H - 30, 20, COL.paper, 'right');
}

// ============================================================================
//  ESCENA 6 — DROP  (beats 20–28)
// ============================================================================
const BURST = (function () {
  const r = rng(42), a = [];
  for (let i = 0; i < 520; i++) a.push({ ang: r() * TAU, v: 900 + r() * 3600, k: 2.2 + r() * 2.5, sz: 6 + r() * 26, type: Math.floor(r() * 4), rs: (r() - 0.5) * 14, col: [COL.ink, COL.paper, COL.lime, COL.blue][Math.floor(r() * 4)], wave: Math.floor(r() * 2) });
  return a;
})();
function burstPos(p, tau) { const d = p.v * (1 - Math.exp(-p.k * tau)) / p.k; return [Math.cos(p.ang) * d, Math.sin(p.ang) * d]; }
function sDropBurst(ctx, b, t) {
  const second = b >= 1;
  const lb = second ? b - 1 : b;
  bg(ctx, second ? COL.ink : COL.coral);
  const tau = lb * B;
  const cx = W / 2, cy = H / 2;
  // ondas de choque
  for (let k = 0; k < 4; k++) {
    const p = E.outExpo(prog(tau, k * 0.04, k * 0.04 + 0.9));
    if (p <= 0) continue;
    ctx.strokeStyle = second ? [COL.coral, COL.paper, COL.lime, COL.blue][k] : [COL.ink, COL.paper, COL.ink, COL.lime][k];
    ctx.lineWidth = lerp(60, 1, p) * (1 - k * 0.15);
    ctx.globalAlpha = 1 - p * 0.6;
    ctx.beginPath(); ctx.arc(cx, cy, 80 + p * (1300 + k * 220), 0, TAU); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // partículas con estela
  for (let i = 0; i < BURST.length; i++) {
    const p = BURST[i];
    if (p.wave != (second ? 1 : 0)) continue;
    const [x, y] = burstPos(p, tau), [x0, y0] = burstPos(p, Math.max(0, tau - 0.035));
    const col = second ? (p.col == COL.ink ? COL.coral : p.col) : p.col;
    ctx.fillStyle = col; ctx.strokeStyle = col;
    const s = p.sz * (1 - prog(tau, 0.3, 1.2) * 0.7);
    if (p.type == 0) { ctx.lineWidth = s * 0.25; ctx.beginPath(); ctx.moveTo(cx + x0, cy + y0); ctx.lineTo(cx + x, cy + y); ctx.stroke(); }
    else {
      ctx.save(); ctx.translate(cx + x, cy + y); ctx.rotate(p.rs * tau + p.ang);
      if (p.type == 1) ctx.fillRect(-s / 2, -s / 2, s, s);
      else if (p.type == 2) { ctx.beginPath(); ctx.moveTo(0, -s * 0.6); ctx.lineTo(s * 0.55, s * 0.4); ctx.lineTo(-s * 0.55, s * 0.4); ctx.fill(); }
      else { ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, s * 0.45, 0, TAU); ctx.stroke(); }
      ctx.restore();
    }
  }
  // MAKE IT / MOVE.
  const S = 470, L = letters(ctx, 'MOVE', 'DBlk', S, -0.03);
  ctx.save(); ctx.translate(cx, cy + 40); F(ctx, 'DBlk', S); ctx.textBaseline = 'alphabetic';
  L.arr.forEach((l, j) => {
    const tt = tau - j * 0.03;
    const sp = spring(tt, 7, 20);
    const s = 1 + 1.4 * (tt < 0 ? 1 : sp);
    const vis = tt >= 0 ? 1 : 0;
    if (!vis) return;
    ctx.save(); ctx.translate(-L.total / 2 + l.x + l.w / 2, -S * 0.0);
    ctx.scale(s, s); ctx.rotate(0.12 * spring(tt, 6, 17) * (j % 2 ? 1 : -1));
    if (second) { ctx.strokeStyle = COL.paper; ctx.lineWidth = 6; ctx.strokeText(l.ch, -l.w / 2, S * 0.364); ctx.fillStyle = COL.coral; ctx.globalAlpha = E.outExpo(prog(tt, 0.05, 0.3)); ctx.fillText(l.ch, -l.w / 2 + 10, S * 0.364 + 10); }
    else { ctx.fillStyle = COL.ink; ctx.fillText(l.ch, -l.w / 2, S * 0.364); }
    ctx.restore();
  });
  ctx.fillStyle = second ? COL.lime : COL.ink;
  const mp = E.outExpo(prog(tau, 0.05, 0.3));
  F(ctx, 'DBi', 120); ctx.textAlign = 'center';
  ctx.globalAlpha = mp; ctx.fillText(second ? 'IT ALL' : 'MAKE IT', 0, -S * 0.42 - 30 + (1 - mp) * 60); ctx.globalAlpha = 1; ctx.textAlign = 'left';
  ctx.restore();
}

// --- metaballs WebGL
const gc = mk(); let GL = null, GLP = null, GLU = {};
function initGL() {
  GL = gc.getContext('webgl2', { preserveDrawingBuffer: true, antialias: false, premultipliedAlpha: false });
  if (!GL) return;
  const vs = `#version 300 es
  in vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }`;
  const fs = `#version 300 es
  precision highp float;
  uniform vec2 res; uniform vec3 balls[9]; uniform float t;
  out vec4 o;
  void main(){
    vec2 p = vec2(gl_FragCoord.x, res.y-gl_FragCoord.y);
    float f=0.;
    for(int i=0;i<9;i++){ vec2 d=p-balls[i].xy; f += balls[i].z*balls[i].z/(dot(d,d)+1.); }
    vec3 blue=vec3(.169,.278,1.), deep=vec3(.09,.15,.75), lime=vec3(.83,1.,.227), coral=vec3(1.,.29,.15), paper=vec3(.95,.93,.9), ink=vec3(.047,.047,.067);
    float e = fwidth(f)*1.2;
    // fondo con curvas de nivel
    vec3 c = mix(deep, blue, smoothstep(0.,1.,p.y/res.y*0.6+0.3));
    float lv = f*7.;
    float line = 1.-smoothstep(0., fwidth(lv)*1.5, abs(fract(lv)-.5)*2.-0.9+0.0);
    line = smoothstep(0.88, 1.0, abs(fract(lv)-.5)*2.);
    c = mix(c, paper, line*0.22*smoothstep(0.1,0.9,f));
    c = mix(c, coral, smoothstep(1.-e,1.+e,f));
    c = mix(c, ink, smoothstep(1.55-e,1.55+e,f)*0.0);
    c = mix(c, lime, smoothstep(1.7-e,1.7+e,f));
    c = mix(c, paper, smoothstep(3.2-e,3.2+e,f));
    // brillo especular falso
    o = vec4(c,1.);
  }`;
  const sh = (type, src) => { const s = GL.createShader(type); GL.shaderSource(s, src); GL.compileShader(s); if (!GL.getShaderParameter(s, GL.COMPILE_STATUS)) throw new Error(GL.getShaderInfoLog(s)); return s; };
  GLP = GL.createProgram(); GL.attachShader(GLP, sh(GL.VERTEX_SHADER, vs)); GL.attachShader(GLP, sh(GL.FRAGMENT_SHADER, fs)); GL.linkProgram(GLP);
  GL.useProgram(GLP);
  const buf = GL.createBuffer(); GL.bindBuffer(GL.ARRAY_BUFFER, buf);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), GL.STATIC_DRAW);
  const loc = GL.getAttribLocation(GLP, 'p'); GL.enableVertexAttribArray(loc); GL.vertexAttribPointer(loc, 2, GL.FLOAT, false, 0, 0);
  GLU = { res: GL.getUniformLocation(GLP, 'res'), balls: GL.getUniformLocation(GLP, 'balls'), t: GL.getUniformLocation(GLP, 't') };
  GL.viewport(0, 0, W, H);
}
function sLiquid(ctx, b, t) {
  const tau = b * B;
  const enter = E.outExpo(prog(b, 0, 0.6));
  const pulse = 1 + 0.12 * Math.exp(-frac(b) * 5);
  const arr = [];
  for (let i = 0; i < 9; i++) {
    const a = t * (0.9 + i * 0.17) * (i % 2 ? 1 : -1) + i * 2.1;
    const R = (180 + 230 * hash(i + 3)) * (0.7 + 0.3 * Math.sin(t * 2 + i));
    const r = (95 + 70 * hash(i * 7)) * pulse * enter;
    arr.push(W / 2 + Math.cos(a) * R * 1.5, H / 2 + Math.sin(a * 1.3) * R * 0.8, r);
  }
  if (GL) {
    GL.uniform2f(GLU.res, W, H); GL.uniform3fv(GLU.balls, new Float32Array(arr)); GL.uniform1f(GLU.t, t);
    GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
    ctx.drawImage(gc, 0, 0);
  } else { bg(ctx, COL.blue); }
  // FLOW en contorno con ola
  const S = 380, L = letters(ctx, 'FLOW', 'DBlk', S, 0.02);
  ctx.save(); ctx.translate(W / 2, H / 2); F(ctx, 'DBlk', S); ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = COL.ink;
  L.arr.forEach((l, j) => {
    const p = E.outExpo(prog(b, j * 0.06, j * 0.06 + 0.5));
    const dy = Math.sin(t * 7 + j * 0.9) * 26 + (1 - p) * 300;
    ctx.globalAlpha = p;
    ctx.save(); ctx.translate(-L.total / 2 + l.x + l.w / 2, dy); ctx.rotate(Math.sin(t * 5 + j) * 0.06);
    ctx.fillText(l.ch, -l.w / 2, S * 0.364); ctx.restore();
  });
  ctx.restore(); ctx.globalAlpha = 1;
  mono(ctx, 'GLSL · METABALLS · 9 BODIES', 90, H - 110, 20, COL.paper);
}
function sIso(ctx, b, t) {
  bg(ctx, COL.paper);
  const N = 13, s = 40, cx = W / 2, cy = H / 2 - 270;
  const c30 = Math.cos(Math.PI / 6);
  const enter = E.outExpo(prog(b, 0, 0.5));
  const beatI = Math.floor(b), lb = frac(b);
  const zoom = 1.05 + 0.08 * b;
  ctx.save(); ctx.translate(W / 2, H / 2 + 40); ctx.scale(zoom, zoom); ctx.translate(-W / 2, -H / 2);
  for (let sum = 0; sum <= 2 * (N - 1); sum++) {
    for (let i = 0; i < N; i++) {
      const j = sum - i; if (j < 0 || j >= N) continue;
      const di = i - (N - 1) / 2, dj = j - (N - 1) / 2;
      const dist = Math.sqrt(di * di + dj * dj);
      // patrón distinto por beat, con transición en resorte
      const pat = (k) => k % 2 == 0 ? 0.5 + 0.5 * Math.sin(dist * 0.9 - t * 6) : 0.5 + 0.5 * Math.sin((di + dj) * 0.7 + t * 5);
      const hp = lerp(pat(beatI), pat(beatI + 1), 0) ;
      const bump = Math.exp(-Math.pow(dist - lb * 12, 2) * 0.4) * 0.8;
      let h = (12 + 150 * hp + 120 * bump) * enter;
      const x = cx + (i - j) * s * c30, y = cy + (i + j) * s * 0.5;
      const top = h > 170 ? COL.coral : h > 90 ? COL.lime : '#E2DCD0';
      // cara izquierda
      ctx.fillStyle = '#16161D';
      ctx.beginPath(); ctx.moveTo(x - s * c30, y); ctx.lineTo(x, y + s * 0.5); ctx.lineTo(x, y + s * 0.5 - h); ctx.lineTo(x - s * c30, y - h); ctx.fill();
      ctx.fillStyle = '#34343F';
      ctx.beginPath(); ctx.moveTo(x + s * c30, y); ctx.lineTo(x, y + s * 0.5); ctx.lineTo(x, y + s * 0.5 - h); ctx.lineTo(x + s * c30, y - h); ctx.fill();
      ctx.fillStyle = top;
      ctx.beginPath(); ctx.moveTo(x, y - h - s * 0.5); ctx.lineTo(x + s * c30, y - h); ctx.lineTo(x, y - h + s * 0.5); ctx.lineTo(x - s * c30, y - h); ctx.closePath(); ctx.fill();
    }
  }
  ctx.restore();
  F(ctx, 'DBlk', 150); ctx.fillStyle = COL.ink; ctx.textBaseline = 'alphabetic';
  const p = E.outExpo(prog(b, 0.05, 0.5));
  ctx.save(); ctx.beginPath(); ctx.rect(80, 80, 1200, 150); ctx.clip();
  ctx.fillText('SYSTEMS', 90, 80 + 150 * 0.727 + (1 - p) * 160); ctx.restore();
  mono(ctx, 'ISOMETRIC · 169 UNITS · PROCEDURAL', 96, 268, 20, COL.ink);
}
function sMontage(ctx, b, t) { // b en [0,2)
  const k = Math.floor(b * 2), lb = frac(b * 2); // medios beats
  if (k == 0) { // póster suizo
    bg(ctx, COL.paper);
    const p = E.outExpo(prog(lb, 0, 0.6));
    ctx.fillStyle = COL.coral; ctx.beginPath(); ctx.arc(1300 - 120 * lb, 540, 400 * E.outBack(prog(lb, 0, 0.5), 1.5), 0, TAU); ctx.fill();
    ctx.fillStyle = COL.ink; ctx.fillRect(120, H - H * p, 110, H); ctx.fillRect(290, 0, 22, H * p);
    ctx.fillRect(1300 - 120 * lb - 400, 530, 800 * p, 20);
    F(ctx, 'DXb', 120); ctx.fillText('Grid.', 380, 300); ctx.fillText('Order.', 380, 430); ctx.fillStyle = COL.coral; ctx.fillText('Play.', 380, 560);
    mono(ctx, 'NO. 07 — SWISS STUDY — 1:1.618', 384, 640, 20, COL.ink);
  } else if (k == 1) { // espirógrafo
    bg(ctx, COL.ink);
    const U = TAU * 3 * E.outCubic(lb * 0.9 + 0.1), Rr = 5, r = 3, d = 4.2, sc = 78;
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(lb * 0.6);
    ctx.strokeStyle = COL.lime; ctx.lineWidth = 3; ctx.beginPath();
    let px, py;
    for (let u = 0; u <= U; u += 0.01) { px = ((Rr - r) * Math.cos(u) + d * Math.cos((Rr - r) / r * u)) * sc; py = ((Rr - r) * Math.sin(u) - d * Math.sin((Rr - r) / r * u)) * sc; u == 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
    ctx.stroke(); ctx.fillStyle = COL.coral; ctx.beginPath(); ctx.arc(px, py, 16, 0, TAU); ctx.fill();
    ctx.restore();
    mono(ctx, 'HYPOTROCHOID R5 r3 d4.2', 90, H - 110, 20, COL.paper);
  } else if (k == 2) { // semitono
    bg(ctx, COL.blue); ctx.fillStyle = COL.paper;
    for (let y = 20; y < H + 40; y += 40) for (let x = 20; x < W + 40; x += 40) {
      const dd = Math.hypot(x - W * 0.3, y - H * 0.6);
      const r = 18 * (0.5 + 0.5 * Math.sin(dd / 70 - lb * 10)) * E.outExpo(prog(lb, 0, 0.3));
      if (r > 0.5) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
    }
    F(ctx, 'DBlk', 220); ctx.fillStyle = COL.lime; ctx.fillText('TEXTURE', 110, H - 120);
  } else { // rayas + barrido (whip pan) hacia el cierre
    const p = E.inExpo(prog(lb, 0.2, 1));
    ctx.save(); ctx.translate(-W * 1.1 * p, 0);
    bg(ctx, COL.coral); ctx.fillStyle = COL.ink;
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(-0.5 + lb * 0.3);
    for (let x = -1600; x < 1600; x += 140) ctx.fillRect(x + (lb * 280) % 140, -1400, 60, 2800);
    ctx.restore(); ctx.restore();
    ctx.save(); ctx.translate(W - W * 1.1 * p, 0); bg(ctx, COL.ink); ctx.restore();
  }
}

// ============================================================================
//  ESCENA 7 — CIERRE  (beats 28–32)
// ============================================================================
function sEnd(ctx, b, t) {
  bg(ctx, COL.ink);
  // rejilla de fondo
  ctx.fillStyle = COL.paper;
  for (let i = 0; i < 17; i++) {
    const p = E.outExpo(prog(b, Math.abs(i - 8) * 0.03, Math.abs(i - 8) * 0.03 + 0.8));
    ctx.globalAlpha = 0.07 * (1 - prog(b, 3.3, 3.7));
    const x = i * 120; ctx.fillRect(x, H / 2 - H / 2 * p, 1, H * p);
  }
  ctx.globalAlpha = 1;
  const out_ = E.inOutExpo(prog(b, 3.3, 3.75));
  const S = 290, L = letters(ctx, 'CLAUDE', 'DBlk', S, -0.035);
  const x0 = W / 2 - L.total / 2 - S * 0.07, base = H / 2 + S * 0.2;
  const r = rng(11);
  F(ctx, 'DBlk', S); ctx.textBaseline = 'alphabetic';
  L.arr.forEach((l, j) => {
    const ro = (r() - 0.5) * 1.6, yo = (r() - 0.5) * 700, xo = (r() - 0.5) * 300;
    const d = j * 0.06, p = E.outBack(prog(b, d, d + 0.55), 1.3), pr = E.outExpo(prog(b, d, d + 0.55));
    if (pr <= 0) return;
    ctx.save(); ctx.translate(x0 + l.x + l.w / 2 + xo * (1 - pr), base - S * 0.36 + yo * (1 - p) + out_ * 120);
    ctx.rotate(ro * (1 - pr)); ctx.scale(lerp(0.4, 1, pr), lerp(0.4, 1, pr));
    ctx.globalAlpha = 1 - out_;
    ctx.fillStyle = COL.paper; ctx.fillText(l.ch, -l.w / 2, S * 0.36); ctx.restore();
  });
  ctx.globalAlpha = 1;
  // punto coral: rima con el punto inicial; al final viaja al centro y se reduce
  const pp = E.outBack(prog(b, 0.55, 0.9), 3);
  const dotX0 = x0 + L.total + S * 0.13, dotY0 = base - S * 0.08;
  const fin = E.inOutQuint(prog(b, 3.35, 3.9));
  const dx = lerp(dotX0, W / 2, fin), dy = lerp(dotY0, H / 2, fin);
  const dr = lerp(S * 0.085 * pp, 15, fin) * (1 - E.inExpo(prog(b, 3.9, 4)));
  if (dr > 0.1) { ctx.fillStyle = COL.coral; ctx.beginPath(); ctx.arc(dx, dy, dr, 0, TAU); ctx.fill(); }
  // barra y subtítulos
  const bp = E.outExpo(prog(b, 0.8, 1.3));
  ctx.globalAlpha = 1 - out_;
  ctx.fillStyle = COL.coral; ctx.fillRect(x0 + S * 0.03, base + 40, (L.total - S * 0.03) * bp * (1 - out_), 10);
  const sp = E.outExpo(prog(b, 1.0, 1.8));
  F(ctx, 'DMd', 46); ctx.fillStyle = COL.paper; ctx.letterSpacing = (0.05 + 0.3 * sp).toFixed(3) + 'em';
  ctx.globalAlpha = sp * (1 - out_); ctx.fillText('MOTION DESIGNER', x0 + S * 0.03, base + 120); ctx.letterSpacing = '0px';
  ctx.globalAlpha = (1 - out_);
  mono(ctx, typed('SHOWREEL 2026 — 100% CODE · 0 ASSETS · SYNTHESIZED SOUND', prog(b, 1.3, 2.3)), x0 + S * 0.03, base + 175, 19, COL.grey);
  mono(ctx, typed('AVAILABLE FOR WORK →', prog(b, 1.8, 2.3)), x0 + L.total, base + 120, 22, COL.lime, 'right');
  ctx.globalAlpha = 1;
}

// ============================================================================
//  HUD + compositor
// ============================================================================
function tc(t) { const f = Math.floor(t * FPS + 1e-6); const s = Math.floor(f / FPS); return `00:00:${String(s).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`; }
function hud(ctx, t) {
  const bt = t / B;
  const a = 0.6 * prog(bt, 1.8, 2.6) * (1 - prog(bt, 31.2, 31.8));
  if (a <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.globalAlpha = a;
  const c = '#ffffff', m = 54, L = 26;
  ctx.fillStyle = c;
  [[m, m, 1, 1], [W - m, m, -1, 1], [m, H - m, 1, -1], [W - m, H - m, -1, -1]].forEach(([x, y, sx, sy]) => { ctx.fillRect(x, y, L * sx, 2 * sy); ctx.fillRect(x, y, 2 * sx, L * sy); });
  mono(ctx, 'CLAUDE / REEL 26', m + 40, m + 20, 16, c);
  mono(ctx, tc(t), W - m - 40, m + 20, 16, c, 'right');
  const bar = Math.min(8, Math.floor(bt / 4) + 1), beat = Math.floor(bt % 4) + 1;
  mono(ctx, `BAR ${bar}/8 · BEAT ${beat}`, m + 40, H - m - 10, 16, c);
  mono(ctx, '1920×1080 · 60 FPS', W - m - 40, H - m - 10, 16, c, 'right');
  // indicador de beat
  ctx.globalAlpha = a * (0.3 + 0.7 * Math.exp(-frac(bt) * 6));
  ctx.beginPath(); ctx.arc(W / 2, m + 14, 5, 0, TAU); ctx.fill();
  ctx.restore();
}
const HITS = [20, 21, 22, 24, 26, 28].map(x => x * B);
function shake(t) {
  let a = 0;
  for (const h of HITS) if (t >= h) a += Math.exp(-(t - h) * 9) * (h == 20 * B ? 34 : 16);
  return [noise1(t * 38) * a, noise1(t * 41 + 50) * a, noise1(t * 20 + 9) * a * 0.0012];
}
function renderScene(ctx, t) {
  const bt = t / B;
  ctx.save();
  const [sx, sy, sr] = shake(t);
  ctx.translate(W / 2 + sx, H / 2 + sy); ctx.rotate(sr); ctx.translate(-W / 2, -H / 2);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (bt < 4) sIntro(ctx, bt);
  else if (bt < 8) sKinetic(ctx, bt - 4);
  else if (bt < 12) sMarquee(ctx, bt - 8, t);
  else if (bt < 16) sParticles(ctx, bt - 12, t);
  else if (bt < 20) sBuild(ctx, bt - 16, t);
  else if (bt < 22) sDropBurst(ctx, bt - 20, t);
  else if (bt < 24) sLiquid(ctx, bt - 22, t);
  else if (bt < 26) sIso(ctx, bt - 24, t);
  else if (bt < 28) sMontage(ctx, bt - 26, t);
  else sEnd(ctx, bt - 28, t);
  ctx.restore();
}

// ---------------------------------------------------------------- post FX
const grain = []; (function () { const r = rng(3); for (let g = 0; g < 4; g++) { const c = mk(512, 512), x = c.getContext('2d'), id = x.createImageData(512, 512); for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } x.putImageData(id, 0, 0); grain.push(c); } })();
const vig = mk(); (function () { const x = vig.getContext('2d'); const g = x.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.42)'); x.fillStyle = g; x.fillRect(0, 0, W, H); })();
function glitchAmount(t) {
  const bt = t / B, f = Math.floor(t * FPS);
  let g = 0;
  if (bt >= 18.5 && bt < 19.75) { const k = prog(bt, 18.5, 19.75); g = hash(Math.floor(f / 2)) < 0.25 + 0.6 * k ? 0.2 + 0.8 * k : 0.05; }
  for (const h of [22, 24, 26, 28]) if (bt >= h && bt < h + 0.12) g = Math.max(g, 0.7);
  if (bt >= 20 && bt < 20.25) g = Math.max(g, 1 - prog(bt, 20, 20.25));
  return g;
}
function post(t) {
  const g = glitchAmount(t), f = Math.floor(t * FPS);
  if (g > 0.01) {
    tctx.globalCompositeOperation = 'copy'; tctx.drawImage(out, 0, 0); tctx.globalCompositeOperation = 'source-over';
    const cols = ['#ff0000', '#00ff00', '#0000ff'];
    chans.forEach((c, i) => { const x = c.getContext('2d'); x.globalCompositeOperation = 'copy'; x.drawImage(tmp, 0, 0); x.globalCompositeOperation = 'multiply'; x.fillStyle = cols[i]; x.fillRect(0, 0, W, H); x.globalCompositeOperation = 'source-over'; });
    const off = 26 * g;
    octx.fillStyle = '#000'; octx.fillRect(0, 0, W, H);
    octx.globalCompositeOperation = 'lighter';
    octx.drawImage(chans[0], off, 0); octx.drawImage(chans[1], 0, 0); octx.drawImage(chans[2], -off, off * 0.3);
    octx.globalCompositeOperation = 'source-over';
    // tiras desplazadas
    tctx.globalCompositeOperation = 'copy'; tctx.drawImage(out, 0, 0); tctx.globalCompositeOperation = 'source-over';
    const n = Math.floor(3 + 10 * g);
    for (let i = 0; i < n; i++) {
      const y = Math.floor(hash(f * 13 + i) * H), h = Math.floor(8 + hash(f * 7 + i) * 90 * g), dx = (hash(f * 3 + i * 5) - 0.5) * 300 * g;
      octx.drawImage(tmp, 0, y, W, h, dx, y, W, h);
    }
  }
  // flash del drop
  const bt = t / B;
  const fl = bt >= 20 ? Math.exp(-(bt - 20) * 7) : 0;
  const fl2 = bt >= 28 ? Math.exp(-(bt - 28) * 10) * 0.5 : 0;
  if (fl + fl2 > 0.01) { octx.fillStyle = `rgba(255,255,255,${Math.min(1, fl + fl2)})`; octx.fillRect(0, 0, W, H); }
  octx.drawImage(vig, 0, 0);
  hud(octx, t);
  octx.save(); octx.globalCompositeOperation = 'overlay'; octx.globalAlpha = 0.09;
  const gi = grain[f % 4], ox = Math.floor(hash(f) * 512), oy = Math.floor(hash(f + 99) * 512);
  for (let y = -oy; y < H; y += 512) for (let x = -ox; x < W; x += 512) octx.drawImage(gi, x, y);
  octx.restore();
  // fundido final a negro
  const fo = prog(t, DUR - 0.12, DUR);
  if (fo > 0) { octx.fillStyle = `rgba(0,0,0,${fo})`; octx.fillRect(0, 0, W, H); }
}

window.renderFrame = function (frame, samples = MB_SAMPLES) {
  const t0 = frame / FPS;
  for (let k = 0; k < samples; k++) {
    const ts = Math.min(DUR - 1e-4, t0 + (samples == 1 ? 0 : (k / samples) * SHUTTER / FPS));
    renderScene(sctx, ts);
    octx.globalAlpha = 1 / (k + 1); octx.globalCompositeOperation = 'source-over';
    octx.drawImage(sc, 0, 0);
  }
  octx.globalAlpha = 1;
  post(t0);
  return true;
};
window.ready = (async () => {
  for (const f of ['DBlk', 'DXb', 'DMd', 'DTh', 'DLt', 'DBi', 'Mono', 'MonoB']) await document.fonts.load(`100px ${f}`);
  initGL();
  return !!GL;
})();

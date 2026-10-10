// Música + efectos sintetizados desde cero (sin samples) para cada anuncio.
// 96 BPM, Re mayor: D – Bm – G – A – D – G/D. Ukulele (Karplus-Strong), glockenspiel,
// bajo, kick suave, palmas, shaker y un "logo sonoro" de 3 notas para las 3 estrellas.
// uso: node synth_ads.js <copyIdx> <out.wav> [v]   (v=2: gancho largo, 3 compases de gancho)
const fs = require('fs');
const COPIES = require('./copies.js'), TLM = require('./timeline.js');
const idx = +process.argv[2], OUT = process.argv[3], VAR = +(process.argv[4] || 1);
const copy = COPIES[idx], TL = TLM.build(copy, { v: VAR });
const HB = TL.hookBars;               // compases de gancho (sección suave) antes del groove
const KG = VAR === 2 ? 0.76 : 1;      // v2: kick un poco más bajo (en v1 dominaba)
const HL = VAR === 2 ? 0.13 : 0.11;   // v2: ukulele un poco más presente durante el gancho
const SR = 48000, DUR = 15, N = SR * DUR, B = TL.B, TAU = Math.PI * 2;
const L = new Float32Array(N), R = new Float32Array(N), RV = new Float32Array(N); // RV = envío a reverb (mono)
let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const at = t => Math.floor(t * SR);
function add(i, v, pan = 0, send = 0) { if (i < 0 || i >= N) return; L[i] += v * (1 - pan) * 0.9; R[i] += v * (1 + pan) * 0.9; RV[i] += v * send; }

// ---------------------------------------------------------------- instrumentos
function ks(t0, midi, gain, pan = 0, bright = 0.6, len = 1.6, send = 0.12) { // cuerda pulsada
  const f = mtof(midi), D = SR / f - 0.5, size = Math.ceil(D) + 4, buf = new Float32Array(size);
  let lp = 0; for (let i = 0; i < size; i++) { const n = rnd() * 2 - 1; lp += bright * (n - lp); buf[i] = lp; }
  let w = 0; const s = at(t0), n = Math.floor(len * SR); let prev = 0;
  for (let i = 0; i < n; i++) {
    const rp = w - D; const r0 = Math.floor(rp), fr = rp - r0;
    const a = buf[((r0 % size) + size) % size], b = buf[(((r0 + 1) % size) + size) % size];
    const y = a + (b - a) * fr;
    const out = 0.5 * (y + prev) * 0.9965; prev = y;
    buf[w % size] = out; w++;
    const env = i > n - 2000 ? (n - i) / 2000 : 1;
    add(s + i, out * gain * env, pan, send);
  }
}
const UKE = { D: [69, 62, 66, 69], Bm: [71, 62, 66, 71], G: [67, 62, 67, 71], A: [69, 61, 64, 69] };
function strum(t0, ch, down = true, gain = 0.16) {
  const notes = down ? UKE[ch] : [...UKE[ch]].reverse().slice(0, 3);
  notes.forEach((m, i) => ks(t0 + i * (down ? 0.011 : 0.009), m, gain * (down ? 1 : 0.6) * (0.85 + 0.3 * rnd()), (i - 1.5) * 0.18, down ? 0.55 : 0.75));
}
function glock(t0, midi, gain = 0.12, pan = 0, send = 0.35) {
  const f = mtof(midi), s = at(t0), n = Math.floor(2.2 * SR);
  const parts = [[1, 1, 1.8], [2.756, 0.32, 0.55], [5.404, 0.12, 0.22], [8.933, 0.05, 0.1]];
  for (let i = 0; i < n; i++) {
    const t = i / SR; let v = 0;
    for (const [r, a, d] of parts) v += Math.sin(TAU * f * r * t) * a * Math.exp(-t / d);
    v *= Math.min(1, i / 30);
    add(s + i, v * gain, pan, send);
  }
}
function bass(t0, dur, midi, gain = 0.2) {
  const f = mtof(midi), s = at(t0), n = Math.floor(dur * SR), rel = 1200; let ph = 0;
  for (let i = 0; i < n + rel; i++) {
    ph += f / SR; const x = (ph % 1);
    const tri = 1 - 4 * Math.abs(x - 0.5);
    const env = Math.min(1, i / 200) * (i < n ? 1 - 0.3 * (i / n) : 0.7 * (1 - (i - n) / rel));
    const v = Math.tanh((tri * 0.8 + Math.sin(TAU * ph) * 0.6) * 1.4) * env * gain;
    add(s + i, v, 0, 0);
  }
}
function kick(t0, gain = 0.5) {
  const s = at(t0), n = Math.floor(0.3 * SR); let ph = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; ph += TAU * (48 + 90 * Math.exp(-t * 32)) / SR; add(s + i, Math.sin(ph) * Math.exp(-t * 11) * gain, 0, 0); }
}
function clap(t0, gain = 0.18) {
  const s = at(t0); let b1 = 0, b2 = 0;
  for (let i = 0; i < SR * 0.25; i++) {
    const t = i / SR; let env = 0; for (const o of [0, 0.01, 0.02]) if (t >= o) env = Math.max(env, Math.exp(-(t - o) * (o === 0.02 ? 18 : 120)));
    const n = rnd() * 2 - 1; b1 += 0.4 * (n - b1); b2 += 0.4 * (b1 - b2);
    add(s + i, (b1 - b2) * env * gain * 2.4, 0.1, 0.3);
  }
}
function snap(t0, gain = 0.12) {
  const s = at(t0);
  for (let i = 0; i < SR * 0.06; i++) { const t = i / SR; const v = (Math.sin(TAU * 2100 * t) * 0.6 + (rnd() * 2 - 1) * 0.7) * Math.exp(-t * 70); add(s + i, v * gain, -0.2, 0.3); }
}
function shaker(t0, gain = 0.035, pan = 0.3) {
  const s = at(t0); let prev = 0, hp = 0;
  for (let i = 0; i < SR * 0.07; i++) { const t = i / SR; const n = rnd() * 2 - 1; hp = 0.7 * (hp + n - prev); prev = n; const env = Math.sin(Math.PI * Math.min(1, t / 0.07)) ** 2; add(s + i, hp * env * gain, pan, 0.05); }
}
function pad(t0, dur, notes, gain = 0.018) {
  const s = at(t0), n = Math.floor(dur * SR); const vs = []; notes.forEach(m => { for (let k = -1; k <= 1; k++) vs.push({ f: mtof(m) * (1 + k * 0.004), ph: rnd() }); });
  let lp = 0, lp2 = 0;
  for (let i = 0; i < n; i++) {
    let v = 0; for (const o of vs) { o.ph = (o.ph + o.f / SR) % 1; v += o.ph * 2 - 1; }
    lp += 0.06 * (v - lp); lp2 += 0.06 * (lp - lp2);
    const env = Math.min(1, i / (SR * 0.4)) * Math.min(1, (n - i) / (SR * 0.4));
    add(s + i, lp2 * env * gain, 0, 0.25);
  }
}
// ---------------------------------------------------------------- efectos
function noiseSweep(t0, dur, f0, f1, gain, shape = 'swell', pan = 0, send = 0.15, q = 0.5) {
  const s = at(t0), n = Math.floor(dur * SR); let low = 0, band = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n, fc = f0 * Math.pow(f1 / f0, p), F = 2 * Math.sin(Math.PI * Math.min(fc, 14000) / SR);
    const x = rnd() * 2 - 1; low += F * band; const hi = x - low - q * band; band += F * hi;
    const env = shape === 'swell' ? Math.sin(Math.PI * p) ** 2 : shape === 'up' ? p * p : (1 - p) ** 2;
    add(s + i, band * env * gain, pan * (2 * p - 1), send);
  }
}
function tone(t0, dur, f0, f1, gain, type = 'sine', send = 0.1, pan = 0, decay = 6) {
  const s = at(t0), n = Math.floor(dur * SR); let ph = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n, f = f0 * Math.pow(f1 / f0, p); ph += f / SR;
    let v = type === 'sine' ? Math.sin(TAU * ph) : type === 'tri' ? 1 - 4 * Math.abs((ph % 1) - 0.5) : Math.sign(Math.sin(TAU * ph)) * 0.5;
    const env = Math.min(1, i / 60) * Math.exp(-p * decay);
    add(s + i, v * env * gain, pan, send);
  }
}
function click(t0, gain = 0.08, f = 2400, pan = 0) {
  const s = at(t0);
  for (let i = 0; i < SR * 0.03; i++) { const t = i / SR; add(s + i, (Math.sin(TAU * f * t) * 0.7 + (rnd() * 2 - 1) * 0.4) * Math.exp(-t * 160) * gain, pan, 0.08); }
}
function pop(t0, gain = 0.12, p = 0) {
  const s = at(t0), f0 = 520 * Math.pow(2, p / 12); let ph = 0;
  for (let i = 0; i < SR * 0.09; i++) { const t = i / SR; ph += TAU * f0 * (1.9 - 0.9 * Math.min(1, t / 0.03)) / SR; add(s + i, Math.sin(ph) * Math.exp(-t * 45) * gain, 0, 0.12); }
}
function boing(t0, gain = 0.1, p = 0) {
  const s = at(t0), f0 = 300 * Math.pow(2, p / 12); let ph = 0;
  for (let i = 0; i < SR * 0.32; i++) { const t = i / SR; const f = f0 * (1 + 0.9 * Math.min(1, t / 0.08)) * (1 + 0.06 * Math.sin(TAU * 22 * t)); ph += TAU * f / SR; add(s + i, Math.sin(ph) * Math.exp(-t * 10) * gain, 0, 0.15); }
}
function scribble(t0, dur = 0.45, gain = 0.08) {
  const s = at(t0), n = Math.floor(dur * SR); let low = 0, band = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, F = 2 * Math.sin(Math.PI * (2600 + 900 * Math.sin(TAU * 3 * t)) / SR);
    const x = rnd() * 2 - 1; low += F * band; const hi = x - low - 0.6 * band; band += F * hi;
    const am = 0.55 + 0.45 * Math.sin(TAU * 17 * t) ** 2; const env = Math.sin(Math.PI * (i / n)) ** 0.6;
    add(s + i, band * am * env * gain, 0.15, 0.05);
  }
}
const D_SCALE = [62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 86];
function sparkleFx(t0, gain = 0.05) { [93, 90, 95, 98, 93].forEach((m, k) => glock(t0 + k * 0.06, m, gain * (1 - k * 0.12), (k % 2 ? 0.5 : -0.5), 0.5)); }

const FX = {
  paper: e => noiseSweep(e.t, 0.3, 3000, 6000, 0.05, 'down', 0.3),
  word: e => click(e.t, 0.035, 1500 + (e.i % 4) * 180, ((e.i % 3) - 1) * 0.3),
  scribble: e => scribble(e.t, 0.5, 0.09),
  marker: e => { noiseSweep(e.t, 0.42, 900, 2600, 0.12, 'swell', 0.4, 0.05, 0.9); },
  pop: e => pop(e.t, 0.12, e.p || 0),
  popseq: e => { for (let k = 0; k < e.n; k++) pop(e.t + k * e.dt, 0.07, (k * 2) % 12); },
  fall: e => tone(e.t, 0.35, 1200, 520, 0.05, 'sine', 0.1, 0, 2),
  bonk: e => { tone(e.t, 0.18, 190, 85, 0.35, 'sine', 0.05, 0, 5); click(e.t, 0.12, 900); },
  nope: e => { tone(e.t, 0.13, 523, 523, 0.06, 'tri', 0.2, 0, 3); tone(e.t + 0.15, 0.2, 392, 380, 0.06, 'tri', 0.2, 0, 3); },
  morph: e => { noiseSweep(e.t, 0.6, 1500, 9000, 0.06, 'up', 0.3, 0.4); [74, 78, 81, 86, 90].forEach((m, k) => glock(e.t + 0.05 + k * 0.1, m, 0.05, k % 2 ? 0.4 : -0.4)); },
  fit: e => { click(e.t, 0.18, 1800); tone(e.t, 0.12, 140, 70, 0.25, 'sine', 0, 0, 5); glock(e.t + 0.02, 86, 0.13); glock(e.t + 0.02, 81, 0.07); },
  sparkle: e => sparkleFx(e.t),
  ding: e => { glock(e.t, 86, 0.12); glock(e.t, 93, 0.05); },
  swish: e => noiseSweep(e.t, 0.28, 1200, 4000, 0.06, 'swell', 0.5),
  tick: e => { tone(e.t, 0.06, 1100, 1050, 0.12, 'sine', 0.05, -0.2, 8); click(e.t, 0.05, 3200); },
  release: e => { noiseSweep(e.t - 0.1, 0.5, 600, 7000, 0.07, 'swell', 0.3, 0.3); [74, 78, 81].forEach((m, k) => glock(e.t + k * 0.04, m, 0.07)); },
  boing: e => boing(e.t, 0.08, e.p || 0),
  grow: e => { noiseSweep(e.t, 2.2, 400, 3000, 0.035, 'up', 0, 0.3); },
  bloom: e => { [86, 90, 93].forEach((m, k) => glock(e.t + k * 0.05, m, 0.09)); noiseSweep(e.t - 0.2, 0.6, 800, 8000, 0.06, 'swell', 0, 0.4); },
  rattle: e => { for (let k = 0; k < 3; k++) click(e.t + k * 0.05, 0.09, 700 + k * 120, (k - 1) * 0.3); },
  burst: e => { noiseSweep(e.t, 0.18, 4000, 1500, 0.25, 'down', 0, 0.2); for (let k = 0; k < 14; k++) click(e.t + 0.05 + rnd() * 0.6, 0.03 + rnd() * 0.03, 2500 + rnd() * 3000, rnd() * 2 - 1); [86, 90, 93].forEach((m, k) => glock(e.t + 0.03 + k * 0.03, m, 0.08)); },
  hop: e => { const m = [74, 76, 78, 81][e.p] || 81; tone(e.t, 0.2, mtof(m - 12), mtof(m), 0.08, 'sine', 0.15, 0, 5); },
  shuffle: e => { for (let k = 0; k < 8; k++) noiseSweep(e.t + k * 0.06, 0.12, 1500, 3500, 0.035, 'swell', (k % 2 ? 0.4 : -0.4)); },
  whoosh: e => noiseSweep(e.t, 0.75, 300, 5000, 0.16, 'swell', 0.6, 0.2),
  swipe: e => noiseSweep(e.t, 0.3, 2000, 6000, 0.07, 'swell', -0.5),
  card: e => { pop(e.t, 0.1, 5); },
  plus: e => { pop(e.t, 0.1, 12); },
  whooshOut: e => noiseSweep(e.t, 0.45, 4000, 600, 0.1, 'swell', -0.5, 0.2),
  iris: e => noiseSweep(e.t - 0.1, 0.45, 500, 6000, 0.1, 'up', 0, 0.3),
  shimmer: e => { for (let k = 0; k < 7; k++) glock(e.t + k * 0.11, D_SCALE[3 + k], 0.035, (k % 2 ? 0.5 : -0.5), 0.5); },
  globe: e => { pop(e.t, 0.12, 7); noiseSweep(e.t, 0.3, 1500, 5000, 0.04, 'swell'); },
  star: e => { glock(e.t, [74, 78, 81][e.i], 0.17, [-0.35, 0, 0.35][e.i], 0.45); glock(e.t, [86, 90, 93][e.i], 0.04, 0, 0.5); },
  pill: e => { pop(e.t, 0.12, 9); glock(e.t + 0.03, 86, 0.1); glock(e.t + 0.03, 81, 0.06); },
  tap: e => { click(e.t, 0.1, 1300); },
};

// ---------------------------------------------------------------- música
const PROG = ['D', 'Bm', 'G', 'A', 'D', 'G'];
const ROOT = { D: 38, Bm: 35, G: 43, A: 45 };
const PADN = { D: [62, 66, 69], Bm: [62, 66, 71], G: [62, 67, 71], A: [61, 64, 69] };
const ISLAND = [[0, 1], [1, 1], [1.5, 0], [2.5, 0], [3, 1], [3.5, 0]]; // [beat, down?]
for (let bar = 0; bar < 6; bar++) {
  const t0 = bar * 4 * B, ch = PROG[bar];
  const lvl = bar < HB ? HL : 0.15;
  if (bar < 5) ISLAND.forEach(([bt, d]) => strum(t0 + bt * B, ch, !!d, lvl));
  else { strum(t0, 'G', true, 0.15); strum(t0 + 1.5 * B, 'G', false, 0.15); strum(t0 + 2 * B, 'D', true, 0.17); }
  for (let s16 = 0; s16 < 16; s16++) if (bar < 5 || s16 < 8) shaker(t0 + s16 * B / 4, (s16 % 4 === 2 ? 0.05 : 0.03) * (bar < HB ? 0.7 : 1), (s16 % 2 ? 0.35 : -0.15));
  if (bar >= 1 && bar < HB) { snap(t0 + B); snap(t0 + 3 * B); }
  if (bar >= HB && bar < 5) {
    kick(t0, 0.5 * KG); kick(t0 + 2 * B, 0.45 * KG); if (bar === 4) { kick(t0 + B, 0.35 * KG); kick(t0 + 3 * B, 0.35 * KG); }
    clap(t0 + B); clap(t0 + 3 * B);
    const r = ROOT[ch];
    bass(t0, 0.7 * B, r, 0.2); bass(t0 + 1.5 * B, 0.4 * B, r, 0.15); bass(t0 + 2 * B, 0.7 * B, r + 7, 0.17); bass(t0 + 3 * B, 0.8 * B, r + 12, 0.15);
    pad(t0, 4 * B, PADN[ch], 0.014);
  }
  if (bar === 5) { kick(t0, 0.45 * KG); clap(t0 + B, 0.14); bass(t0, 1.8 * B, ROOT.G, 0.18); bass(t0 + 2 * B, 2 * B, ROOT.D, 0.2); pad(t0, 2 * B, PADN.G, 0.012); pad(t0 + 2 * B, 2 * B, PADN.D, 0.014); }
}
// melodía de glockenspiel (gancho)
[[0, 81], [0.5, 78], [1, 81], [1.5, 83], [2.5, 81], [3, 78], [4, 78], [4.5, 74], [5, 78], [5.5, 81], [6.5, 78], [7, 76]]
  .forEach(([bt, m]) => glock(bt * B, m, 0.055, 0.25, 0.4));
// en v2 el gancho dura un compás más: la melodía continúa
if (HB === 3) [[8, 81], [8.5, 83], [9, 86], [10, 83], [10.5, 81], [11, 78]].forEach(([bt, m]) => glock(bt * B, m, 0.05, 0.25, 0.4));
// respuesta breve en la sección de beneficios
[[9.5, 74], [10, 76], [10.5, 78], [13.5, 81], [14, 78], [14.5, 76]].forEach(([bt, m]) => glock((bt + (HB - 2) * 4) * B, m, 0.04, -0.25, 0.4));
// final: acorde de cierre con campana
glock(22 * B, 86, 0.06, 0, 0.5); glock(22 * B, 81, 0.05, 0.3, 0.5); glock(22 * B, 78, 0.04, -0.3, 0.5);

// ---------------------------------------------------------------- efectos del anuncio
for (const e of TL.sfx) if (FX[e.k]) FX[e.k](e);

// ---------------------------------------------------------------- reverb (Freeverb simple) + mezcla
function freeverb(inp, spread) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map(d => ({ buf: new Float32Array(Math.floor((d + spread) * SR / 44100)), i: 0, f: 0 }));
  const aps = [556, 441, 341, 225].map(d => ({ buf: new Float32Array(Math.floor((d + spread) * SR / 44100)), i: 0 }));
  const o = new Float32Array(N);
  for (let n = 0; n < N; n++) {
    const x = inp[n] * 0.015; let y = 0;
    for (const c of combs) { const out = c.buf[c.i]; c.f = out * 0.65 + c.f * 0.35; c.buf[c.i] = x + c.f * 0.84; c.i = (c.i + 1) % c.buf.length; y += out; }
    for (const a of aps) { const b = a.buf[a.i]; const out = -y + b; a.buf[a.i] = y + b * 0.5; a.i = (a.i + 1) % a.buf.length; y = out; }
    o[n] = y;
  }
  return o;
}
const wl = freeverb(RV, 0), wr = freeverb(RV, 23);
const oL = new Float32Array(N), oR = new Float32Array(N); let peak = 0;
let hpl = 0, hpr = 0, pl = 0, pr = 0;
for (let n = 0; n < N; n++) {
  let l = L[n] + wl[n] * 2.6, r = R[n] + wr[n] * 2.6;
  hpl = 0.995 * (hpl + l - pl); pl = l; hpr = 0.995 * (hpr + r - pr); pr = r; // quita DC / subgraves inútiles
  oL[n] = hpl; oR[n] = hpr; peak = Math.max(peak, Math.abs(hpl), Math.abs(hpr));
}
const g = 1.25 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let n = 0; n < N; n++) {
  const t = n / SR, fade = t > 14.55 ? Math.max(0, 1 - (t - 14.55) / 0.45) : 1, fin = Math.min(1, n / 240);
  const l = Math.tanh(oL[n] * g) * 0.89 * fade * fin, r = Math.tanh(oR[n] * g) * 0.89 * fade * fin;
  buf.writeInt16LE(Math.round(l * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(r * 32767), 46 + n * 4);
}
fs.writeFileSync(OUT, buf);
console.log(copy.id, 'ok, peak', peak.toFixed(3), 'sfx', TL.sfx.length);

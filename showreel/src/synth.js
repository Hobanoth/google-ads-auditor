// Banda sonora sintetizada desde cero (sin samples). 128 BPM, 8 compases = 15 s.
// Salida: WAV estéreo 48 kHz 16-bit.
const fs = require('fs');
const SR = 48000, DUR = 15.6, N = Math.floor(SR * DUR), BPM = 128, B = 60 / BPM;
const L = new Float32Array(N), R = new Float32Array(N);
const revL = new Float32Array(N), revR = new Float32Array(N); // envío a reverb
const TAU = Math.PI * 2;
let seed = 1234; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const beat = b => Math.floor(b * B * SR);
function add(i, l, r, send = 0) { if (i < 0 || i >= N) return; L[i] += l; R[i] += r; revL[i] += l * send; revR[i] += r * send; }
// sidechain global (ducking por kick)
const duck = new Float32Array(N).fill(1);

// ---------------------------------------------------------------- instrumentos
function kick(b, gain = 1, big = false) {
  const s = beat(b), len = Math.floor(SR * (big ? 0.9 : 0.42));
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 45 + (big ? 190 : 150) * Math.exp(-t * 38);
    ph += TAU * f / SR;
    const env = Math.exp(-t * (big ? 4.5 : 8.5));
    let v = Math.sin(ph) * env;
    v = Math.tanh(v * 1.8) * 0.9;
    if (i < 300) v += (rnd() * 2 - 1) * (1 - i / 300) * 0.35; // click
    add(s + i, v * gain * 0.58, v * gain * 0.58, big ? 0.15 : 0.02);
  }
  const dl = Math.floor(SR * 0.38);
  for (let i = 0; i < dl; i++) { const d = 1 - 0.75 * Math.exp(-i / SR * 9) * (i < 200 ? i / 200 : 1); if (s + i < N) duck[s + i] = Math.min(duck[s + i], d); }
}
function snare(b, gain = 0.5, tone = 1) {
  const s = beat(b), len = Math.floor(SR * 0.3);
  let lp = 0, hp = 0, prev = 0, ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR, n = rnd() * 2 - 1;
    hp = 0.85 * (hp + n - prev); prev = n;
    ph += TAU * (190 * tone + 60 * Math.exp(-t * 30)) / SR;
    const v = (hp * Math.exp(-t * 16) * 0.8 + Math.sin(ph) * Math.exp(-t * 28) * 0.6) * gain;
    add(s + i, v * 0.95, v, 0.25);
  }
}
function clap(b, gain = 0.4) {
  const s = beat(b);
  let bp1 = 0, bp2 = 0;
  for (let i = 0; i < SR * 0.35; i++) {
    const t = i / SR;
    let env = 0; for (const o of [0, 0.011, 0.022]) if (t >= o) env = Math.max(env, Math.exp(-(t - o) * (o == 0.022 ? 14 : 90)));
    const n = rnd() * 2 - 1;
    bp1 += 0.35 * (n - bp1); bp2 += 0.35 * (bp1 - bp2);
    const v = (bp1 - bp2) * env * gain * 2.2;
    add(s + i, v, v * 0.9, 0.35);
  }
}
function hat(b, gain = 0.12, open = false, pan = 0.2) {
  const s = beat(b), len = Math.floor(SR * (open ? 0.22 : 0.05));
  let prev = 0, hp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    // seis cuadradas metálicas (estilo 808) + ruido
    let m = 0; for (const f of [205.3, 304.4, 369.6, 522.7, 540, 800]) m += Math.sign(Math.sin(TAU * f * 7.3 * t));
    const n = m / 6 * 0.6 + (rnd() * 2 - 1) * 0.4;
    hp = 0.6 * (hp + n - prev); prev = n;
    const v = hp * Math.exp(-t * (open ? 14 : 70)) * gain;
    add(s + i, v * (1 - pan), v * (1 + pan), 0.1);
  }
}
// bajo: saw con filtro paso bajo resonante (SVF) + sub
function bass(b0, dur, midi, gain = 0.32, cutoff = 900) {
  const s = beat(b0), len = Math.floor(dur * B * SR);
  const f = mtof(midi); let ph = 0, low = 0, band = 0;
  for (let i = 0; i < len + 2000; i++) {
    const t = i / SR;
    ph = (ph + f / SR) % 1;
    const saw = ph * 2 - 1, sub = Math.sin(TAU * ph);
    const env = (i < len ? 1 : Math.exp(-(i - len) / 300)) * Math.min(1, i / 60);
    const fc = cutoff * (0.35 + 0.65 * Math.exp(-t * 9)) + 80;
    const F = 2 * Math.sin(Math.PI * Math.min(fc, 8000) / SR), q = 0.35;
    low += F * band; const high = saw - low - q * band; band += F * high;
    const v = (Math.tanh(low * 1.6) * 0.7 + sub * 0.55) * env * gain;
    add(s + i, v, v, 0);
  }
}
// supersaw: 7 voces desafinadas por nota, filtro abierto con envolvente
function supersaw(b0, dur, notes, gain = 0.06, cut0 = 1200, cut1 = 6000, att = 0.01, rel = 0.25, send = 0.35, swell = false) {
  const s = beat(b0), len = Math.floor(dur * B * SR), rl = Math.floor(rel * SR);
  const voices = [];
  notes.forEach(n => { for (let k = 0; k < 7; k++) voices.push({ f: mtof(n) * (1 + (k - 3) * 0.0042), ph: rnd(), pan: (k - 3) / 3 * 0.8 }); });
  const lowL = [0, 0], bandL = [0, 0];
  for (let i = 0; i < len + rl; i++) {
    const t = i / SR;
    let l = 0, r = 0;
    for (const v of voices) { v.ph = (v.ph + v.f / SR) % 1; const x = v.ph * 2 - 1; l += x * (1 - v.pan) ; r += x * (1 + v.pan); }
    let env = Math.min(1, t / att) * (i < len ? 1 : Math.exp(-(i - len) / (rl / 4)));
    if (swell) env *= Math.pow(Math.min(1, t / (dur * B)), 2);
    const fc = swell ? lerp(cut0, cut1, Math.pow(Math.min(1, t / (dur * B)), 2)) : cut1 + (cut0 - cut1) * Math.min(1, t / (dur * B));
    const F = 2 * Math.sin(Math.PI * Math.min(fc, 9000) / SR), q = 0.6;
    [l, r].forEach((x, c) => { lowL[c] += F * bandL[c]; const hi = x - lowL[c] - q * bandL[c]; bandL[c] += F * hi; });
    add(s + i, lowL[0] * env * gain, lowL[1] * env * gain, send);
  }
}
function lerp(a, b, t) { return a + (b - a) * t; }
// pluck FM (arpegio)
function pluck(b, midi, gain = 0.1, pan = 0) {
  const s = beat(b), f = mtof(midi);
  for (let i = 0; i < SR * 0.4; i++) {
    const t = i / SR;
    const mod = Math.sin(TAU * f * 2 * t) * 2.2 * Math.exp(-t * 18);
    const v = Math.sin(TAU * f * t + mod) * Math.exp(-t * 9) * gain;
    add(s + i, v * (1 - pan), v * (1 + pan), 0.4);
  }
}
// ruido filtrado: riser / whoosh / impacto
function noiseSweep(b0, b1, f0, f1, gain, curve = 2, rev = false, send = 0.3) {
  const s = beat(b0), len = beat(b1) - s;
  let low = 0, band = 0;
  for (let i = 0; i < len; i++) {
    const p = i / len, pp = rev ? 1 - p : p;
    const fc = f0 * Math.pow(f1 / f0, Math.pow(p, curve));
    const F = 2 * Math.sin(Math.PI * Math.min(fc, 12000) / SR);
    const n = rnd() * 2 - 1; low += F * band; const hi = n - low - 0.5 * band; band += F * hi;
    const env = rev ? Math.pow(1 - p, 3) : Math.pow(p, 2.2);
    const v = band * env * gain;
    add(s + i, v * (0.8 + 0.2 * Math.sin(p * 30)), v * (0.8 - 0.2 * Math.sin(p * 30)), send);
  }
}
function tone(b, dur, f0, f1, gain, send = 0.3, type = 'sine') {
  const s = beat(b), len = Math.floor(dur * SR); let ph = 0;
  for (let i = 0; i < len; i++) {
    const p = i / len; ph += TAU * f0 * Math.pow(f1 / f0, p) / SR;
    const env = Math.min(1, i / 200) * Math.pow(1 - p, 2);
    let v = type == 'sine' ? Math.sin(ph) : Math.sin(ph) + 0.3 * Math.sin(ph * 2.01);
    add(s + i, v * env * gain, v * env * gain, send);
  }
}
function blip(b, f, gain = 0.08, pan = 0) { // UI ticks para el texto que se escribe
  const s = beat(b);
  for (let i = 0; i < SR * 0.04; i++) { const t = i / SR; const v = Math.sign(Math.sin(TAU * f * t)) * Math.exp(-t * 120) * gain; add(s + i, v * (1 - pan), v * (1 + pan), 0.2); }
}

// ---------------------------------------------------------------- arreglo
// Progresión (La menor): Am – F – C – G  ...  Dm – F – G – Am
const CH = { Am: [57, 60, 64], F: [53, 57, 60], C: [55, 60, 64], G: [55, 59, 62], Dm: [57, 62, 65], E: [56, 59, 64] };
const ROOT = { Am: 33, F: 29, C: 36, G: 31, Dm: 38, E: 28 };

// Compás 1 (beats 0–4): intro — punto, línea, título
tone(0.05, 0.25, 1800, 1700, 0.12, 0.6);             // "ping" del punto
noiseSweep(0.4, 1.25, 400, 6000, 0.18, 1.5);          // la línea se estira
tone(0.5, 0.75, 120, 900, 0.07, 0.4, 'fm');
supersaw(1.25, 2.75, CH.Am.map(n => n - 12), 0.022, 300, 2800, 0.3, 0.1, 0.5, true); // pad crece
kick(1.25, 0.7);
for (let i = 0; i < 8; i++) blip(1.3 + i * 0.055, 2400 + i * 120, 0.03, (i % 2 ? 0.4 : -0.4));
pluck(2.0, 76, 0.12); // el punto coral
for (let i = 0; i < 12; i++) blip(1.9 + i * 0.06, 3200, 0.02, 0.6);
noiseSweep(3.0, 4.0, 300, 9000, 0.22, 2.5);           // riser hacia la tipografía
kick(3.5, 0.0);

// Compases 2–5 (beats 4–20): groove
const prog = ['Am', 'F', 'C', 'G'];
for (let bar = 1; bar < 5; bar++) {
  const b0 = bar * 4, ch = prog[bar - 1];
  for (let k = 0; k < 4; k++) {
    kick(b0 + k, bar == 4 ? 0.95 : 1);
    hat(b0 + k + 0.5, 0.11, k == 3 && bar % 2 == 0, 0.3);
    if (bar >= 2) { hat(b0 + k + 0.25, 0.05, false, -0.3); hat(b0 + k + 0.75, 0.05, false, -0.3); }
  }
  clap(b0 + 1); clap(b0 + 3);
  // bajo en corcheas a contratiempo
  for (let k = 0; k < 8; k++) { if (k % 2 == 0 && bar < 4) continue; bass(b0 + k * 0.5, 0.42, ROOT[ch] + 12 * (k == 7 ? 1 : 0), 0.3, bar == 4 ? 600 + k * 300 : 1100); }
  if (bar < 4) bass(b0, 0.4, ROOT[ch], 0.3, 700);
  // stabs de acordes
  if (bar <= 2) [0, 1.5, 2.5].forEach(o => supersaw(b0 + o, 0.3, CH[ch], 0.032, 4500, 1400, 0.004, 0.18, 0.4));
  // arpegio a partir del compás 3 (escena de marquesinas / partículas)
  if (bar >= 2) { const arp = [...CH[ch], CH[ch][0] + 12].map(n => n + 12); for (let k = 0; k < 16; k++) pluck(b0 + k * 0.25, arp[(k * 3) % 4] + (k % 8 == 7 ? 12 : 0), 0.06, Math.sin(k) * 0.5); }
  if (bar == 3) { supersaw(b0, 4, CH[ch], 0.018, 600, 3000, 0.4, 0.4, 0.5, true); }
}
// golpes de acento para cada palabra (beats 4..7)
[4, 5, 6, 7].forEach((b, i) => tone(b, 0.18, [220, 330, 440, 262][i], 60, 0.1, 0.1));
// zoom dentro de la O (beats 10.35–12): whoosh que crece
noiseSweep(10.3, 12.0, 200, 10000, 0.3, 2.2, false, 0.4);
tone(10.6, 1.4 * B, 80, 1200, 0.08, 0.3, 'fm');
tone(12, 0.6, 2600, 2500, 0.06, 0.7);               // brillo al llegar a las partículas
// morphs de partículas
[13, 14, 15].forEach(b => noiseSweep(b, b + 0.6, 6000, 800, 0.08, 1, true, 0.4));

// Compás 5 (beats 16–20): build — redoble acelerado + riser
for (let k = 0; k < 4; k++) { kick(16 + k, 0.9); }
const rolls = []; for (let b = 16; b < 19.75;) { const d = b < 17 ? 0.5 : b < 18 ? 0.25 : b < 19 ? 0.125 : 0.0625; rolls.push(b); b += d; }
rolls.forEach(b => snare(b, 0.12 + 0.3 * ((b - 16) / 3.75), 1 + (b - 16) * 0.25));
noiseSweep(16, 19.75, 200, 12000, 0.35, 2.2);
tone(16, 3.75 * B, 110, 880, 0.06, 0.4, 'fm');
supersaw(16, 3.75, [57, 60, 64, 69], 0.02, 300, 7000, 0.5, 0.05, 0.4, true);
for (let k = 0; k < 6; k++) blip(17 + k * 0.25, 1800 + k * 200, 0.05);        // T-I-M-I-N-G
for (let k = 0; k < 13; k++) blip(18.5 + k / 12, 2600 + k * 90, 0.035, 0.3);
for (let k = 0; k < 16; k++) bass(16 + k * 0.25, 0.2, 33 + (k >= 8 ? 12 : 0), 0.18, 400 + k * 250);
// beats 19.75–20: silencio (sólo cola de reverb)

// Compases 6–7 (beats 20–28): DROP
kick(20, 1.2, true); tone(20, 1.2, 70, 34, 0.5, 0.1);  // impacto subgrave
noiseSweep(20, 22, 9000, 300, 0.28, 0.6, true, 0.5);    // reverse whoosh / onda de choque
clap(20, 0.5); snare(20, 0.4);
const dropProg = ['Am', 'Am', 'F', 'F', 'C', 'G', 'Dm', 'E'];
for (let k = 0; k < 8; k++) {
  const b = 20 + k, ch = dropProg[k];
  if (k > 0) kick(b, k == 1 ? 1.1 : 1, k == 1);
  hat(b + 0.5, 0.13, true, 0.2); hat(b + 0.25, 0.06); hat(b + 0.75, 0.06);
  if (k % 2 == 1) clap(b, 0.45);
  bass(b + 0.5, 0.45, ROOT[ch] + 12, 0.32, 1800); bass(b, 0.3, ROOT[ch], 0.3, 900);
  supersaw(b, 0.95, CH[ch].concat([CH[ch][0] + 12]), 0.045, 7000, 2500, 0.003, 0.15, 0.35);
  supersaw(b, 0.95, [CH[ch][0] - 12], 0.03, 3000, 1200, 0.003, 0.1, 0.1);
  const arp = [...CH[ch], CH[ch][0] + 12].map(n => n + 24);
  for (let s = 0; s < 4; s++) pluck(b + s * 0.25, arp[(s + k) % 4], 0.045, s % 2 ? 0.6 : -0.6);
}
[22, 24, 26].forEach(b => { noiseSweep(b - 0.5, b, 1000, 9000, 0.15, 2); tone(b, 0.12, 900, 200, 0.12, 0.3); });
// montaje: un golpe por corte (cada medio beat)
[26, 26.5, 27, 27.5].forEach((b, i) => tone(b, 0.15, [1200, 1600, 2000, 2400][i], 300, 0.08, 0.3));
noiseSweep(27.6, 28, 800, 12000, 0.3, 1.5); // whip pan

// Compás 8 (beats 28–32): cierre — golpe final y cola larga
kick(28, 1.1, true); tone(28, 2.0, 55, 40, 0.35, 0.2);
supersaw(28, 3.2, [45, 57, 60, 64, 69, 72], 0.03, 6000, 900, 0.002, 1.6, 0.7);
clap(28, 0.4);
[28.0, 28.06, 28.12, 28.18, 28.24, 28.3].forEach((b, i) => pluck(b + 0.55, [69, 72, 76, 81, 84, 88][i], 0.05, (i % 2 ? 0.5 : -0.5)));
for (let k = 0; k < 18; k++) blip(29.3 + k * 0.055, 2800 + (k % 4) * 150, 0.02, 0.5);
pluck(28.55, 88, 0.08);                         // el punto coral vuelve
tone(31.4, 0.9, 1800, 1750, 0.07, 0.8);          // el punto final

// ---------------------------------------------------------------- mezcla
// sidechain sólo a la parte "musical": aproximación — se aplica a todo menos al kick
// (los kicks ya se añadieron, por lo que reconstruimos con un truco: compresión ligera global + duck al envío de reverb)
// Reverb tipo Freeverb (8 combs + 4 allpass por canal)
function freeverb(inp, spread) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map(d => ({ buf: new Float32Array(Math.floor((d + spread) * SR / 44100)), i: 0, f: 0 }));
  const aps = [556, 441, 341, 225].map(d => ({ buf: new Float32Array(Math.floor((d + spread) * SR / 44100)), i: 0 }));
  const o = new Float32Array(N), fb = 0.86, damp = 0.3;
  for (let n = 0; n < N; n++) {
    const x = inp[n] * 0.015; let y = 0;
    for (const c of combs) { const out = c.buf[c.i]; c.f = out * (1 - damp) + c.f * damp; c.buf[c.i] = x + c.f * fb; c.i = (c.i + 1) % c.buf.length; y += out; }
    for (const a of aps) { const b = a.buf[a.i]; const out = -y + b; a.buf[a.i] = y + b * 0.5; a.i = (a.i + 1) % a.buf.length; y = out; }
    o[n] = y;
  }
  return o;
}
const wl = freeverb(revL, 0), wr = freeverb(revR, 23);
const outL = new Float32Array(N), outR = new Float32Array(N);
let hpL = 0, hpR = 0, pl = 0, pr = 0;
for (let n = 0; n < N; n++) {
  const d = 0.55 + 0.45 * duck[n]; // bombeo sutil
  let l = L[n] * (0.75 + 0.25 * duck[n]) + wl[n] * 3.2 * d;
  let r = R[n] * (0.75 + 0.25 * duck[n]) + wr[n] * 3.2 * d;
  outL[n] = l; outR[n] = r;
}
// normalizar + saturación suave (glue) + fundido final
let peak = 0; for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(outL[n]), Math.abs(outR[n]));
const g = 2.2 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let n = 0; n < N; n++) {
  const t = n / SR, fade = t > 14.4 ? Math.max(0, 1 - (t - 14.4) / 0.6) : 1;
  const l = Math.tanh(outL[n] * g) * 0.93 * fade, r = Math.tanh(outR[n] * g) * 0.93 * fade;
  buf.writeInt16LE(Math.round(l * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(r * 32767), 46 + n * 4);
}
fs.writeFileSync(process.argv[2] || 'music.wav', buf);
console.log('ok peak', peak.toFixed(3));

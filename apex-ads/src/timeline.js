// Línea de tiempo compartida entre la animación (navegador) y el audio (node).
// 96 BPM · 1 beat = 0.625 s · 24 beats = 15 s exactos (6 compases).
// 0–5 s gancho (pregunta) · 5–10 s respuesta (beneficios) · 10–15 s marca + CTA
(function (root) {
  const BPM = 96, B = 60 / BPM, DUR = 15;
  const P = 5 * B; // "payoff" de la metáfora del gancho (3.125 s)

  // [frase] = resaltado · *texto* = negritas
  function parseRich(str) {
    const words = []; let hl = false, b = false, cur = null;
    const push = () => { if (cur && cur.text.length) words.push(cur); cur = null; };
    for (const ch of str) {
      if (ch === '[') { hl = true; continue; }
      if (ch === ']') { hl = false; continue; }
      if (ch === '*') { b = !b; continue; }
      if (ch === ' ') { push(); continue; }
      if (!cur) cur = { text: '', hl, b };
      cur.text += ch;
    }
    push();
    return words;
  }

  function build(copy) {
    const words = parseRich(copy.hook), n = words.length;
    const st = Math.min(0.16, Math.max(0.085, 1.8 / n));
    const wordT = words.map((w, i) => 0.2 + i * st);
    const hlT = wordT[n - 1] + 0.42;
    // beneficios: un elemento por beat (el "+" entra a medio beat)
    const items = []; let t = 9 * B;
    for (const it of copy.items) {
      const e = { t };
      if (it.st) { const nw = parseRich(it.st).length; e.dur = Math.max(0.3, nw * 0.05); t += Math.ceil((nw * 0.05 + 0.25) / (B / 2)) * (B / 2); }
      else if (it.plus) t += B / 2;
      else if (it.icons) t += B * 1.5;
      else t += B;
      items.push(e);
    }
    const tl = {
      BPM, B, DUR, P, words, wordT, hlT,
      tabT: 5.2, items, exitT: 9.4,
      ctaT: 10.0, globeT: 17 * B, starT: [18 * B, 18.5 * B, 19 * B], lockT: 11.9, pillT: 20 * B, taps: [21 * B, 23 * B],
    };
    tl.sfx = buildSfx(copy, tl);
    return tl;
  }

  // efectos de sonido sincronizados con cada evento visual
  function buildSfx(copy, tl) {
    const s = [];
    s.push({ t: 0.05, k: 'paper' });
    tl.wordT.forEach((t, i) => s.push({ t, k: 'word', i }));
    s.push({ t: tl.hlT, k: copy.deco === 'marker' ? 'marker' : 'scribble' });
    const P = tl.P, B = tl.B;
    switch (copy.meta.type) {
      case 'shapes':
        s.push({ t: 0.25, k: 'pop', p: 0 }, { t: 0.45, k: 'pop', p: 3 }, { t: 1.0, k: 'fall' }, { t: 1.35, k: 'bonk' }, { t: 1.55, k: 'nope' },
          { t: 2.5, k: 'morph' }, { t: P + 0.22, k: 'fit' }, { t: P + 0.28, k: 'sparkle' });
        break;
      case 'spotlight':
        s.push({ t: 0.25, k: 'popseq', n: copy.meta.variant === 'crowd' ? 14 : 10, dt: 0.07 });
        if (copy.meta.variant === 'glass') s.push({ t: 1.05, k: 'swish' }, { t: 1.75, k: 'swish' }, { t: 2.45, k: 'swish' });
        s.push({ t: P, k: 'ding' }, { t: P + 0.1, k: 'sparkle' });
        break;
      case 'lockstep':
        [1, 2, 3, 4].forEach(k => s.push({ t: k * B, k: 'tick' }));
        s.push({ t: P, k: 'release' }, { t: P + 0.45, k: 'boing', p: 0 }, { t: P + 0.85, k: 'boing', p: 2 }, { t: P + 1.25, k: 'boing', p: 4 });
        if (copy.meta.variant === 'flag') s.push({ t: 4.55, k: 'ding' });
        break;
      case 'growth':
        s.push({ t: 0.25, k: 'pop', p: 0 }, { t: 0.7, k: 'grow' }, { t: 1.3, k: 'pop', p: 2 }, { t: 1.9, k: 'pop', p: 4 }, { t: 2.5, k: 'pop', p: 6 },
          { t: P, k: 'bloom' }, { t: P + 0.1, k: 'sparkle' });
        break;
      case 'bookburst':
        s.push({ t: 0.3, k: 'pop', p: 0 }, { t: 2 * B, k: 'rattle' }, { t: 3 * B, k: 'rattle' }, { t: 4 * B, k: 'rattle' },
          { t: P, k: 'burst' }, { t: P + 0.1, k: 'sparkle' });
        break;
      case 'steps':
        s.push({ t: 0.2, k: 'popseq', n: 4, dt: 0.13 });
        [2, 3, 4, 5].forEach((k, i) => s.push({ t: k * B - 0.05, k: 'hop', p: i }));
        s.push({ t: P + 0.25, k: 'ding' }, { t: P + 0.3, k: 'sparkle' });
        break;
      case 'desks':
        s.push({ t: 0.25, k: 'popseq', n: 12, dt: 0.05 });
        [2, 3, 4].forEach(k => s.push({ t: k * B, k: 'tick' }));
        s.push({ t: P, k: 'shuffle' }, { t: P + 0.75, k: 'ding' });
        break;
    }
    s.push({ t: 4.55, k: 'whoosh' }, { t: tl.tabT, k: 'swipe' });
    tl.items.forEach((it, i) => s.push({ t: it.t, k: copy.items[i].plus ? 'plus' : copy.items[i].icons ? 'popseq' : 'card', n: 3, dt: 0.2 }));
    s.push({ t: tl.exitT, k: 'whooshOut' }, { t: 9.75, k: 'iris' });
    s.push({ t: tl.ctaT + 0.05, k: 'shimmer' }, { t: tl.globeT, k: 'globe' });
    tl.starT.forEach((t, i) => s.push({ t, k: 'star', i }));
    s.push({ t: tl.lockT, k: 'swipe' }, { t: tl.pillT, k: 'pill' });
    tl.taps.forEach(t => s.push({ t, k: 'tap' }));
    return s.sort((a, b) => a.t - b.t);
  }

  const API = { BPM, B, DUR, P, parseRich, build };
  if (typeof module !== 'undefined') module.exports = API; else root.APEX_TL = API;
})(this);

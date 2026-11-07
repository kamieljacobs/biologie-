// Testpagina voor de blinde stills (niet voor de repo).
const WD = '/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/cel-nieuw';
const ORDE = ['mitochondrionEcht', 'ruwER', 'kernEnvelopPorie', 'golgiStapel', 'blaasjeVersmelt', 'chloroplastEcht', 'celDier', 'plantencel'];
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
function laadScript(src) { return new Promise(r => { const e = document.createElement('script'); e.src = src; e.onload = () => r(true); e.onerror = () => r(false); document.head.appendChild(e); }); }
async function laadVersie(v) { if (v === 'oud') return; for (const o of ORDE) { const ok = await laadScript(`${WD}/${o}/${v}.js`); if (!ok && v === 'C') await laadScript(`${WD}/${o}/A.js`); } }
// fit: natuurlijke maat (nw × nh bij s = 1) in een vak bw × bh
const fit = (nw, nh, bw, bh) => Math.min(bw / nw, bh / nh);
// ADAPT[obj] = { maat: [nw, nh] (nieuw), oudMaat, nieuw(ctx, cx, cy, s, f, t), oud(...), standen: [f, f, f] | null }
const ADAPT = {
  mitochondrionEcht: { maat: [200, 90], standen: [0, 0.6, 1], groot: 0,
    nieuw: (c, x, y, s, f, t) => mitochondrionEcht(c, x, y, s, { t, deling: f, rot: 0 }),
    oud: (c, x, y, s, f, t) => { if (f > 0.3) { mitochondrion(c, x - 52 * s, y, 104 * s, 0, 1, 4, t); mitochondrion(c, x + 52 * s, y, 104 * s, 0, 1, 4, t); } else mitochondrion(c, x, y, 200 * s, 0, 1, 7, t); } },
  ruwER: { maat: [400, 200], standen: null,
    nieuw: (c, x, y, s, f, t) => ruwER(c, x - 50 * s, y + 150 * s, s, { t, r0: 120, a0: -2.25, a1: -0.9, glad: 1, keten: 0.8, kern: true }),
    oud: (c, x, y, s, f, t) => { roughER(c, x, y - 40 * s, 300 * s, 4, 1, true); } },
  kernEnvelopPorie: { maat: [320, 320], standen: [0.2, 0.5, 0.85],
    nieuw: (c, x, y, s, f, t) => kernEnvelopPorie(c, x, y, s, { t, mrna: f }),
    oud: (c, x, y, s, f, t) => nucleus(c, x, y, 150 * s, 1, t) },
  golgiStapel: { maat: [300, 220], standen: [0.1, 0.45, 0.8],
    nieuw: (c, x, y, s, f, t) => golgiStapel(c, x, y, s, { t: f * 6 }),
    oud: (c, x, y, s, f, t) => golgi(c, x, y + 50 * s, 280 * s) },
  blaasjeVersmelt: { clip: true, maat: [170, 115], standen: [0.3, 0.7, 1],
    nieuw: (c, x, y, s, f, t) => blaasjeVersmelt(c, x, y - 40 * s, s, { f, R: 520, t }),
    oud: (c, x, y, s, f, t) => { const bm = C.bgMicro; C.bgMicro = C.bgSchema; c.save(); c.translate(x, y - 20 * s); c.rotate(-Math.PI / 2); c.scale(s * 0.45, s * 0.45); c.strokeStyle = C.er; c.lineWidth = 2; c.beginPath(); c.moveTo(13.5, -110); c.lineTo(13.5, 110); c.stroke(); c.beginPath(); c.moveTo(4.5, -110); c.lineTo(4.5, 110); c.stroke(); versmelt(c, 4.5, 0, f); c.restore(); C.bgMicro = bm; } },
  chloroplastEcht: { maat: [200, 100], standen: null,
    nieuw: (c, x, y, s, f, t) => chloroplastEcht(c, x, y, s, { t }),
    oud: (c, x, y, s, f, t) => chloroplast(c, x, y, 200 * s) },
  celDier: { maat: [1000, 720], standen: [0.15, 0.5, 0.85],
    nieuw: (c, x, y, s, f, t) => celDier(c, x, y, s, { t: f * 8 }),
    oud: (c, x, y, s, f, t) => { const L = cellLayout(x, y, 500 * s, 360 * s); c.save(); c.beginPath(); c.ellipse(x, y, 500 * s, 360 * s, 0, 0, 6.283); c.fillStyle = rgba('#2A3448', 0.55); c.fill(); c.restore(); drawCell(c, L, f * 8, { motion: 0.3, showMito: s > 0.3 }); } },
  plantencel: { maat: [720, 540], standen: [0, 0.5, 1], groot: 0,
    nieuw: (c, x, y, s, f, t) => plantencel(c, x, y, s, { t, plasmolyse: f }),
    oud: (c, x, y, s, f, t) => { plantCellOud(c, x, y, 640 * s, 460 * s, f); } },
};
// oude plantencel (films/voortplanting/celdeling/bron/src/scenes_lib.js: plantCell), letterlijk overgenomen
function plantCellOud(ctx, x, y, w, h, p = 0, v = 0.6, alpha = 1, bulge = 0) { ctx.save(); ctx.globalAlpha *= alpha;
  const bw = w * (1 + bulge * 0.04), bh = h * (1 + bulge * 0.04);
  if (p > 0) { roundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, 26); ctx.fillStyle = rgba(C.goud, 0.10 * p); ctx.fill(); }
  const mw = (bw - 24) * (1 - 0.42 * p), mh = (bh - 24) * (1 - 0.36 * p);
  const rr = lerp(20, Math.min(mw, mh) * 0.45, ease(p)); roundRect(ctx, x - mw / 2, y - mh / 2, mw, mh, rr); shape(ctx, rgba(C.fill, 0.95), C.er, 2.5);
  const vr = v * (1 - 0.55 * p); blob(ctx, x + mw * 0.06, y, mw / 2 * vr, mh / 2 * vr, 0.04, 9); shape(ctx, rgba(C.teal, 0.35), lighten(C.teal, 0.2), 1.5);
  nucleus(ctx, x - mw * 0.36, y - mh * 0.24, Math.min(mw, mh) * 0.085, 1, 0);
  for (let k = 0; k < 5; k++) { const a = k / 5 * 6.2832 + 0.4; chloroplast(ctx, x + Math.cos(a) * mw * 0.40, y + Math.sin(a) * mh * 0.38, Math.min(mw, mh) * 0.14, 0.95, a + 1.57); }
  roundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, 26); ctx.strokeStyle = C.groen; ctx.lineWidth = 14; ctx.stroke(); ctx.strokeStyle = lighten(C.groen, 0.3); ctx.lineWidth = 1; ctx.stroke();
  ctx.restore(); }

function teken(obj, ver, extra) {
  const ad = ADAPT[obj]; const fn = ver === 'oud' ? ad.oud : ad.nieuw; const [nw, nh] = ad.maat;
  ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, 1280, 720);
  const t0 = 2.3;
  if (extra && extra.los) { const s = fit(nw, nh, 1180, 640); fn(ctx, 640, 360, s, extra.f ?? 0.5, extra.t ?? t0); return; }
  const vak = (x0, y0, w, h, g) => { ctx.save(); if (ad.clip) { ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); } g(); ctx.restore(); };
  if (ad.standen) {
    const s = fit(nw, nh, 820, 432); vak(0, 0, 1280, 545, () => fn(ctx, 520, 270, s, ad.groot ?? ad.standen[1], t0));
    const ss = fit(nw, nh, 270, 150); ad.standen.forEach((f, i) => vak(190 + i * 300 - 148, 548, 296, 172, () => fn(ctx, 190 + i * 300, 630, ss, f, t0 + i)));
  } else { const s = fit(nw, nh, 980, 432); fn(ctx, 600, 320, s, 0.5, t0); }
  const sk = 80 / nh; if (ad.standen) vak(1060, 580, 220, 140, () => fn(ctx, 1170, 655, Math.min(sk, 150 / nw), ad.groot ?? (ad.standen ? ad.standen[1] : 0.5), t0)); else fn(ctx, 1170, 655, Math.min(sk, 150 / nw), ad.groot ?? (ad.standen ? ad.standen[1] : 0.5), t0);
}
ADAPT.celZoom = { maat: [1000, 720], standen: null, nieuw: (c, x, y, s, f, t) => celDier(c, x - 150, y + 120, 2.6, { t: f * 8 }), oud: () => {} };

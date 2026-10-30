// Chromosomen en de taal van erfelijkheid v2 (Erfelijkheid 1/6) — eigen tekenhulpen. 25 okt 2026.
// Gebruikt uit de bibliotheek (gekeurd 25 okt 2026): huidDoorsnede, kernChromatine, _chromLayout, chromatideX, nucleosoomDraad,
// onderarm (lib_bio.js), dnaDraad (lib_micro_evo.js), persoon + gezin De Wit (lib_cast.js), eicelEcht, zaadcelEcht, enzymKluwen.

const CH = { vader: C.teal, moeder: C.oker, mel: '#6A4026', bouw: '#D9B25C' };
const _dk = (h, k = 0.35) => _mixHex(h, '#000000', k);

// ---------- achtergronden ----------
function chMicro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } // Micro zonder korrel (BEELDAFSPRAKEN)
function chSchema(ctx) { bg(ctx, 'schema'); }
function chSchaal(ctx, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(70, 840, px, 5); metaText(ctx, lab, 70 + px + 20, 851, C.text2, 'left', 28); ctx.restore(); }
function chMeta(ctx, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, 70, 851, C.text2, 'left', 28); ctx.restore(); }

// ---------- huiskamer met het gezin De Wit (Macro, vlak) ----------
const GEZIN = [['dennis', 560, 600], ['sara', 760, 500], ['levi', 950, 450], ['jens', 1120, 390], ['marieke', 1310, 575]];
const LIJSTEN = [['opawit', 1490], ['omawit', 1600], ['opabos', 1720], ['omabos', 1830]]; const LIJST_PAAR = [1545, 1775];
const VLOER = 846;
function kamer(ctx) {
  ctx.fillStyle = '#20304C'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#26385A'; ctx.fillRect(0, 0, W, 90);                       // plafondrand
  ctx.fillStyle = '#2F4268'; ctx.fillRect(0, VLOER - 10, W, 10);              // plint
  ctx.fillStyle = '#34405A'; ctx.fillRect(0, VLOER, W, H - VLOER);            // vloer
  // raam links en kast rechts (vlakke vormen)
  roundRect(ctx, 120, 170, 260, 330, 8); shape(ctx, '#2C4A6E', '#3E5E86', 3); ctx.fillStyle = '#3E5E86'; ctx.fillRect(247, 170, 6, 330); ctx.fillRect(120, 330, 260, 6);
  roundRect(ctx, 1560, 610, 260, 226, 8); shape(ctx, '#3A3248', '#4A4058', 2); ctx.fillStyle = '#4A4058'; ctx.fillRect(1560, 720, 260, 4);
  ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.ellipse(1660, 580, 40, 36, 0, 0, 6.283); ctx.fill(); roundRect(ctx, 1640, 590, 40, 22, 4); shape(ctx, '#B08A5C', null);
}
function lijstje(ctx, id, x, y, a = 1, hl = 0) { if (a <= 0.01) return; const w = 96, h = 120; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, h, 8); shape(ctx, '#2A3A58', null); ctx.lineWidth = 6; ctx.strokeStyle = hl > 0.01 ? _mixHex('#B08A5C', C.goud, hl) : '#B08A5C'; ctx.stroke();
  ctx.save(); roundRect(ctx, x - w / 2 + 6, y + 6, w - 12, h - 12, 5); ctx.clip(); persoon(ctx, id, x, y + h * 3.2, h * 3.0, { uit: 'blij' }); ctx.restore(); ctx.restore(); }
// o.hl {id: 0..1}, o.chip {id: [tekst, a, accentLetter]}, o.dim 0..1 voor wie niet genoemd is, o.lijst 0..1, o.uit {id}
function gezin(ctx, t, o = {}) {
  const hl = o.hl || {}, dimA = o.dim || 0, uit = o.uit || {};
  LIJSTEN.forEach(([id, x]) => lijstje(ctx, id, x, 150, o.lijstA ?? 1, o.lijst || 0));
  GEZIN.forEach(([id, x, h], i) => { const h1 = hl[id] || 0, a = 1 - dimA * (1 - h1);
    if (h1 > 0.01) { ctx.save(); ctx.globalAlpha *= h1; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, VLOER + 4, h * 0.2, 14, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= a; persoon(ctx, id, x, VLOER, h, { uit: uit[id] || 'blij', t: t + i * 0.7, kijk: x < 950 ? 1 : -1 }); ctx.restore(); });
}
const kopY = (id) => { const g = GEZIN.find(p => p[0] === id); return VLOER - g[2] - 18; };
const gx = (id) => GEZIN.find(p => p[0] === id)[1];
// allelchip: twee letters in een kaartje; acc = index van de letter die goud omcirkeld wordt
function allelChip(ctx, s, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { acc = -1, accA = 1, px = 46 } = o; ctx.save(); ctx.globalAlpha *= a; const w = px * 1.9, h = px * 1.35;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5);
  [...s].forEach((ch, i) => { const lx = x - w / 4 + i * w / 2; text(ctx, ch, lx, y + px * 0.36, fTekst(px, 700), C.text, 'center');
    if (i === acc && accA > 0.01) { ctx.save(); ctx.globalAlpha *= accA; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(lx, y + 2, px * 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }

// ---------- huid: één wereldplaat van 1 mm (um 1000), bekeken met een camera (zoom = ctx.scale) ----------
const HUID = { w: 1920, h: 640, um: 1000, R: null };
function huidWereld(ctx, o = {}) { const R = huidDoorsnede(ctx, 0, 0, HUID.w, HUID.h, Object.assign({ um: HUID.um, seed: 7, mel: 1, deling: 1 }, o)); if (!HUID.R) HUID.R = R; return R; }
// teken de huid zo dat wereldpunt (fx, fy) op scherm (cx, cy) valt met zoom z; geeft een functie wereld → scherm terug
function huidCam(ctx, z, fx, fy, cx, cy, o = {}) { ctx.save(); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-fx, -fy); huidWereld(ctx, o); ctx.restore(); return (x, y) => [(x - fx) * z + cx, (y - fy) * z + cy]; }
function huidInfo() { if (!HUID.R) { const c = document.createElement('canvas'); c.width = 8; c.height = 8; huidWereld(c.getContext('2d')); } return HUID.R; }
// het brandpunt van de zoom: een basale cel vlak naast een pigmentcel, in het midden van de plaat
function huidFocus() { const R = huidInfo(); const p = R.pig.reduce((b, q) => Math.abs(q[0] - 960) < Math.abs(b[0] - 960) ? q : b, R.pig[0]);
  const b = R.basaal.reduce((m, q) => { const d = Math.hypot(q[0] - p[0] - 20, q[1] - p[1]); return d < m.d && q[0] > p[0] + 5 ? { d, q } : m; }, { d: 1e9, q: R.basaal[0] }).q; return { pig: p, cel: b }; }

// ---------- chromosomen: karyogram ----------
const CEN = [.48, .39, .47, .29, .28, .39, .39, .33, .35, .31, .40, .27, .15, .16, .17, .43, .33, .23, .46, .45, .22, .25, .39, .27]; // 1–22, X, Y
const KROW = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23]]; // 23 = X
const KY = [270, 470, 640, 790], KX0 = 180, KX1 = 1460;
const kLen = (nr) => 175 * CHROM_MB[nr - 1] / 249;               // nr 1..24 (23 = X, 24 = Y)
const kW = 22;
function kSlot(nr, kopie) { const r = KROW.findIndex(R => R.includes(nr)), R = KROW[r], i = R.indexOf(nr), n = R.length;
  const span = (KX1 - KX0) / n, x = KX0 + span * (i + 0.5); return { x: x + (kopie ? 1 : -1) * 30, y: KY[r], rij: r }; }
function kLabel(ctx, a = 1) { if (a <= 0.01) return; KROW.forEach((R, r) => R.forEach(nr => { const s = kSlot(nr, 0); text(ctx, nr === 23 ? 'X' : String(nr), s.x + 30, KY[r] + kLen(nr) * (1 - CEN[nr - 1]) + 40, fMeta(28), rgba(C.text2, a), 'center'); })); }
// kleur per chromosoom: f = 0 neutraal (paars) → 1 vader/moeder
function kKleur(kopie, fv, fm) { return kopie === 0 ? _mixHex(C.kernR, CH.vader, fv) : _mixHex(C.kernR, CH.moeder, fm); }
function chromX(ctx, x, y, len, rot, kl, a = 1, o = {}) { chromatideX(ctx, x, y, len, rot, Object.assign({ a, w: o.w || Math.max(10, Math.min(kW, len * 0.2)), kleur: kl, donker: _dk(kl), cen: o.cen ?? 0.38, coils: o.coils ?? 5 }, o)); }
// één losse chromatide (na de meiose)
function chromatide1(ctx, x, y, len, rot, kl, a = 1, w = 12) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round';
  ctx.strokeStyle = _dk(kl); ctx.lineWidth = w + 2; ctx.beginPath(); ctx.moveTo(0, -len / 2); ctx.quadraticCurveTo(w * 0.3, 0, 0, len / 2); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); }

// ---------- gen-band op een chromosoom (locus van tyrosinase op chr 11: ± 0,62 van boven) ----------
function genBand(ctx, x, y, len, w, cen, a = 1, kl = C.goud) { if (a <= 0.01) return; const by = y - len * cen + len * 0.66; ctx.save(); ctx.globalAlpha *= a;
  [-1, 1].forEach(k => { const off = k * (w * 0.55 + w * 0.55 * Math.abs(by - y) / len); roundRect(ctx, x + off - w / 2 - 2, by - w * 0.28, w + 4, w * 0.56, 4); shape(ctx, kl, _dk(kl, 0.55), 3); }); ctx.restore(); return by; }

// ---------- simulatie in de pigmentcel: tyrosinase zet bouwstenen (oker) om in melanine (bruin) ----------
// Deterministisch (vaste seed, vaste tijdstap), vooraf uitgerekend; de verhoudingen komen uit de simulatie zelf.
const SIM_FPS = 30, PW = 520, PH = 300;
function _mb32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function _gauss(r) { let u = 0, v = 0; while (u === 0) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function runSim(o) {
  const r = _mb32(o.seed), dt = 1 / SIM_FPS, N = Math.ceil(o.dur * SIM_FPS), enz = [];
  for (let i = 0; i < o.nWork + o.nBroken; i++) enz.push({ x: 60 + r() * (PW - 120), y: 40 + r() * (PH - 80), w: i % 2 === 0 ? i / 2 < o.nWork : (o.nWork > (o.nWork + o.nBroken) / 2 ? true : false) });
  // eerlijk verdelen: precies nWork werkende enzymen, verspreid
  enz.forEach((e, i) => { e.w = o.nBroken === 0 ? true : o.nWork === 0 ? false : (i % 2 === 0); });
  const parts = []; let next = 0; const frames = new Array(N), conv = [], fate = [];
  for (let n = 0; n < N; n++) { const t = n * dt;
    while (next <= t) { parts.push({ x: -4, y: 18 + r() * (PH - 36), st: 0, tc: 0 }); next += 1 / o.rate * (0.6 + 0.8 * r()); }
    enz.forEach(e => { e.x = clamp(e.x + _gauss(r) * 14 * Math.sqrt(dt) * 3, 34, PW - 34); e.y = clamp(e.y + _gauss(r) * 14 * Math.sqrt(dt) * 3, 30, PH - 30); });
    for (const p of parts) { if (p.st === 2) continue;
      if (p.st === 0) { p.x += o.drift * dt + _gauss(r) * o.diff * Math.sqrt(dt); p.y += _gauss(r) * o.diff * Math.sqrt(dt); if (p.y < 8) p.y = 16 - p.y; if (p.y > PH - 8) p.y = 2 * (PH - 8) - p.y;
        for (const e of enz) if (e.w && Math.hypot(p.x - e.x, p.y - e.y) < o.cap) { p.st = 1; p.tc = t; conv.push(t); fate.push([t, 1]); break; }
        if (p.x > PW + 4) { p.st = 2; fate.push([t, 0]); } }
      else if (p.st === 1) { p.x += _gauss(r) * 20 * Math.sqrt(dt) + 6 * dt; p.y += _gauss(r) * 20 * Math.sqrt(dt) + 14 * dt; p.y = Math.min(p.y, PH - 10); if (t - p.tc > o.life) p.st = 2; } }
    const al = parts.filter(p => p.st !== 2), fr = new Float32Array(al.length * 3); al.forEach((p, i) => { fr[i * 3] = p.x; fr[i * 3 + 1] = p.y; fr[i * 3 + 2] = p.st; });
    const ef = new Float32Array(enz.length * 2); enz.forEach((e, i) => { ef[i * 2] = e.x; ef[i * 2 + 1] = e.y; }); frames[n] = { p: fr, e: ef };
    if (n % 60 === 0) for (let i = parts.length - 1; i >= 0; i--) if (parts[i].st === 2) parts.splice(i, 1); }
  return { o, frames, enzW: enz.map(e => e.w), conv, fate };
}
function simMel(S, lt) { if (lt <= 0) return 0; let n = 0; for (const c of S.conv) if (c <= lt && c > lt - S.o.life) n++; return n; } // melanine in de cel (aantal korrels)
let SIMS = null;
function sims() { if (SIMS) return SIMS; const b = { rate: 5, drift: 30, diff: 60, cap: 26, life: 9 };
  SIMS = { een: runSim({ ...b, seed: 4, nWork: 8, nBroken: 0, dur: 40 }), AA: runSim({ ...b, seed: 1, nWork: 8, nBroken: 0, dur: 80 }), Aa: runSim({ ...b, seed: 2, nWork: 4, nBroken: 4, dur: 80 }),
    aa: runSim({ ...b, seed: 3, nWork: 0, nBroken: 8, dur: 80 }) }; const ref = simMel(SIMS.AA, 30); SIMS.ref = ref || 1; return SIMS; }
function enzym(ctx, x, y, werkt, s = 1, a = 1, an = 0) { if (a <= 0.01) return; if (werkt) enzymKluwen(ctx, x, y, 17 * s, { a, an, seed: 4 });
  else { enzymKluwen(ctx, x, y, 17 * s, { a: a * 0.75, an, seed: 9, col: '#5E6676', sluit: 1 }); kruis(ctx, x, y, 9 * s, a, C.koraal); } }
function simPaneel(ctx, S, lt, x, y, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, PW, PH, 18); shape(ctx, '#202B3E', o.rand || '#4A5E82', o.rand ? 4 : 2);
  ctx.save(); roundRect(ctx, x, y, PW, PH, 18); ctx.clip();
  const n = clamp(Math.floor(Math.max(0, lt) * SIM_FPS), 0, S.frames.length - 1), F = S.frames[n];
  if (lt > 0) { const P = F.p; for (let i = 0; i < P.length; i += 3) { const px = x + P[i], py = y + P[i + 1]; if (P[i + 2] < 0.5) { ctx.beginPath(); ctx.arc(px, py, 5, 0, 6.283); shape(ctx, CH.bouw, '#B08A3E', 1.2); } else { ctx.beginPath(); ctx.arc(px, py, 6, 0, 6.283); shape(ctx, CH.mel, '#3E2216', 1); } } }
  const E = F.e; for (let i = 0; i < S.enzW.length; i++) enzym(ctx, x + E[i * 2], y + E[i * 2 + 1], S.enzW[i], 1, 1, i * 1.3);
  if (o.stil) { ctx.fillStyle = 'rgba(18,26,38,0.82)'; ctx.fillRect(x, y, PW, PH); vraagteken(ctx, x + PW / 2, y + PH / 2 + 40, 1, 120); }
  ctx.restore(); ctx.restore(); }
function melMeter(ctx, x, y, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, PW, 28, 14); shape(ctx, '#202B3E', C.line, 1);
  if (v > 0.01) { roundRect(ctx, x, y, Math.max(28, PW * clamp(v, 0, 1)), 28, 14); shape(ctx, CH.mel, null); } ctx.restore(); }
function huidStaal(ctx, x, y, kl, a = 1, w = PW) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 54, 14); shape(ctx, kl, C.line, 1.5); ctx.restore(); }

// ---------- kaartjes ----------
function termKaart(ctx, term, uitleg, x, y, a = 1, kl = C.goud, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(44, 700); const w1 = ctx.measureText(term).width; ctx.font = fTekst(32, 500); const w2 = uitleg ? ctx.measureText(uitleg).width : 0;
  const bw = w || Math.max(w1, w2) + 64, bh = uitleg ? 128 : 84; roundRect(ctx, x - bw / 2, y, bw, bh, 14); shape(ctx, rgba(C.bgSchema, 0.95), kl, 2);
  text(ctx, term, x, y + 56, fTekst(44, 700), kl, 'center'); if (uitleg) text(ctx, uitleg, x, y + 104, fTekst(32, 500), C.text, 'center'); ctx.restore(); }
function misvatting(ctx, fout, goed, x, y, w, a = 1, g = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 150, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
  kruis(ctx, x - w / 2 + 50, y + 46, 16, 1, C.koraal); text(ctx, fout, x - w / 2 + 90, y + 58, fTekst(36, 600), C.text2, 'left');
  ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 3; ctx.font = fTekst(36, 600); const fw = ctx.measureText(fout).width; ctx.beginPath(); ctx.moveTo(x - w / 2 + 88, y + 46); ctx.lineTo(x - w / 2 + 92 + fw, y + 46); ctx.stroke();
  if (g > 0.01) { ctx.globalAlpha *= g; vink_(ctx, x - w / 2 + 50, y + 108, 16, 1, C.groen); text(ctx, goed, x - w / 2 + 90, y + 120, fTekst(36, 600), C.text, 'left'); } ctx.restore(); }

// ---------- v2.1 (frisse beeldreview 25 okt 2026) ----------
const vragenUit = () => (typeof state !== 'undefined' && state && state.vragen === 'uit');
// onderschrift (meta) op een donker plaatje, zodat het ook boven cellen leesbaar is
function kapje(ctx, s, x, y, a = 1, kl = C.text2, px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); ctx.letterSpacing = '3px'; const w = ctx.measureText(s.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width + 36; ctx.letterSpacing = '0px';
  roundRect(ctx, x - w / 2, y - px - 8, w, px + 22, (px + 22) / 2); shape(ctx, rgba(C.bgMicro || '#121A26', 0.9), rgba(C.goud, 0.5), 1.5); metaText(ctx, s, x, y, kl, 'center', px); ctx.restore(); }
// chromosoom dat zich kopieert: g = 0 één chromatide (één DNA-molecuul), g = 1 twee zusterchromatiden vast aan het centromeer
function chromKopie(ctx, x, y, len, g, o = {}) { const { w = 84, cen = 0.38, coils = 9, kleur = C.kernR, a = 1 } = o; if (a <= 0.01) return; const donker = _dk(kleur);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const e = ease(clamp(g, 0, 1));
  (e < 0.02 ? [0] : [-1, 1]).forEach(k => { const off = k * w * 0.55 * e, end = k * w * 0.5 * e;
    ctx.beginPath(); ctx.moveTo(off + end, -len * cen); ctx.quadraticCurveTo(off, -len * cen * 0.4, off * 0.75, 0); ctx.quadraticCurveTo(off, len * (1 - cen) * 0.4, off + end, len * (1 - cen));
    ctx.strokeStyle = donker; ctx.lineWidth = w + 2; ctx.stroke(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.16); ctx.lineWidth = Math.max(1, w * 0.1);
    for (let q = 0; q < coils * 2; q++) { const u = q / (coils * 2), yy = -len * cen + u * len, b = Math.abs(yy) / len, cx = off * (0.75 + 0.25 * Math.min(1, b * 3)) + k * e * b * w * 0.5;
      ctx.beginPath(); ctx.ellipse(cx, yy, w * 0.42, w * 0.13, 0.25, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); } });
  if (e > 0.3) _bioCirc(ctx, 0, 0, w * 0.42 * clamp((e - 0.3) / 0.4, 0, 1), donker);
  ctx.restore(); }
// één chromosoom 11 (als staafje) met de genband en het allel er groot boven
function staafAllel(ctx, x, y, l, kl, a = 1, h = 110) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; chromatide1(ctx, x, y, h, 0, kl, 1, 24);
  roundRect(ctx, x - 15, y + h * 0.18 - 7, 30, 14, 4); shape(ctx, C.goud, _dk(C.goud, 0.55), 2);
  text(ctx, l, x, y - h / 2 - 16, fTekst(46, 700), l === 'a' ? C.goud : C.text, 'center'); ctx.restore(); }
function paarKader(ctx, x, y, a = 1, h = 110) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 78, y - h / 2 - 62, 156, h + 98, 14); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); metaText(ctx, 'paar 11', x, y + h / 2 + 28, C.text2, 'center', 22); ctx.restore(); }

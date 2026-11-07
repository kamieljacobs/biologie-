// De cyclus 1.0 — tekenhulpen (7 nov 2026). Hormoonkleuren als Les 2 (HK): GnRH lila, FSH groen, LH goud,
// testosteron teal, oestrogeen koraal, progesteron paars. Stimuleren = doorgetrokken lijn met pijlpunt en '+',
// remmen = gestippelde lijn met dwarsbalk en '−' (vorm draagt de betekenis, niet de kleur).
const VK = { slijm: "#B5574A" };
const HC = { gnrh: '#B3A6DA', fsh: C.groen, lh: C.goud, testo: C.teal, oestro: C.koraal, prog: C.paars };
HORM_A.gnrh = [HC.gnrh, 0.95]; HORM_A.fsh = [HC.fsh, 1.25]; HORM_A.lh = [HC.lh, 1.15]; HORM_A.testo = [HC.testo, 0.72]; HORM_A.oestro = [HC.oestro, 0.72];
function hd(ctx, x, y, s, r = 9, a = 1, volg = false) { // hormoondeeltje, ook progesteron (steroïd in paars)
  if (s !== 'prog') return hormDeeltje(ctx, x, y, s, r, a, volg);
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + r * 0.15, y); ctx.lineJoin = 'round'; _hormA_steroid(ctx, r * 0.72, HC.prog, 'oestro'); ctx.restore(); }
const HNAAM = { gnrh: 'GnRH', fsh: 'FSH', lh: 'LH', testo: 'testosteron', oestro: 'oestrogeen', prog: 'progesteron' };

// ---------- paden ----------
function lijnP(ctx, P, col, lw, dash = null) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stroom(ctx, pts, soort, sterkte, t, a = 1, o = {}) { // deeltjes langs een pad; aantal en snelheid volgen de sterkte
  if (a <= 0.01) return; const D = bioDicht(pts, 40); const n = Math.round((o.n || 7) * clamp(sterkte, 0, 1.6)); const v = (o.v || 0.09) * (0.6 + 0.6 * sterkte);
  for (let i = 0; i < n; i++) { const u = (i / Math.max(1, n) + t * v + (o.fase || 0)) % 1; const [px, py] = bioPunt(D, u); const rand = Math.min(1, u * 8, (1 - u) * 8); hd(ctx, px, py, soort, o.r || 9, a * rand); } }
function koppel(ctx, pts, soort, a = 1, gl = 0, o = {}) { // de verbinding zelf: '+' of 'rem'
  if (a <= 0.01) return; const D = bioDicht(pts, 40); const rem = soort === 'rem'; const col = o.col || (rem ? '#D9DDE3' : C.text2);
  ctx.save(); ctx.globalAlpha *= a;
  if (gl > 0.01) { ctx.save(); ctx.globalAlpha *= gl; ctx.shadowColor = o.gloed || C.goud; ctx.shadowBlur = 24; lijnP(ctx, D, rgba(o.gloed || C.goud, 0.55), 12); ctx.restore(); }
  lijnP(ctx, D, col, 4, rem ? [14, 10] : null);
  const n = D.length, [x2, y2] = D[n - 1], [x1, y1] = D[n - 3]; const an = Math.atan2(y2 - y1, x2 - x1);
  if (rem) { ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x2 + Math.cos(an + Math.PI / 2) * 22, y2 + Math.sin(an + Math.PI / 2) * 22); ctx.lineTo(x2 - Math.cos(an + Math.PI / 2) * 22, y2 - Math.sin(an + Math.PI / 2) * 22); ctx.stroke(); }
  else { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 22 * Math.cos(an - 0.42), y2 - 22 * Math.sin(an - 0.42)); ctx.lineTo(x2 - 22 * Math.cos(an + 0.42), y2 - 22 * Math.sin(an + 0.42)); ctx.closePath(); ctx.fill(); }
  const [mx, my] = bioPunt(D, o.teken == null ? 0.5 : o.teken); teken(ctx, mx, my, !rem, 1, o.tekenR || 22);
  ctx.restore(); }
function teken(ctx, x, y, plus, a = 1, r = 22) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, C.bgSchema, plus ? C.text : '#D9DDE3', 3); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r * 0.5, y); ctx.lineTo(x + r * 0.5, y); if (plus) { ctx.moveTo(x, y - r * 0.5); ctx.lineTo(x, y + r * 0.5); } ctx.stroke(); ctx.restore(); }
function tekenMorph(ctx, x, y, u, a = 1, r = 26) { // '−' wordt '+' (u 0..1), met een gouden flits halverwege
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const fl = Math.sin(clamp(u, 0, 1) * Math.PI); if (fl > 0.01) { ctx.save(); ctx.globalAlpha *= fl; ctx.shadowColor = C.goud; ctx.shadowBlur = 40; circ(ctx, x, y, r * 1.3, rgba(C.goud, 0.35)); ctx.restore(); }
  circ(ctx, x, y, r, C.bgSchema, u > 0.5 ? C.goud : '#D9DDE3', 3.5); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r * 0.5, y); ctx.lineTo(x + r * 0.5, y); const v = ease((u - 0.35) / 0.4); if (v > 0.01) { ctx.moveTo(x, y - r * 0.5 * v); ctx.lineTo(x, y + r * 0.5 * v); } ctx.stroke(); ctx.restore(); }

// ---------- regelcentrum (hypothalamus + hypofyse), compact ----------
function brein(ctx, x, y, s, a = 1, o = {}) { // x,y = hypothalamus; hoofd in profiel uit de bibliotheek
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hoofdHersenen(ctx, x, y, s, o.hh || {});
  if (o.gloed > 0.01) { ctx.save(); ctx.globalAlpha *= o.gloed; ctx.shadowColor = C.goud; ctx.shadowBlur = 30; circ(ctx, x + 4 * s, y + 40 * s, 34 * s, rgba(C.goud, 0.35)); ctx.restore(); }
  if (o.rem > 0.01) { ctx.save(); ctx.globalAlpha *= o.rem; ctx.strokeStyle = '#D9DDE3'; ctx.lineWidth = 6; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(x + 4 * s, y + 40 * s, 70 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
  if (o.namen !== 0) { const na = o.namen == null ? 1 : o.namen; naamBij(ctx, 'hypothalamus', null, x - 330 * s, y - 40 * s, na, 'right'); naamBij(ctx, 'hypofyse', null, x - 330 * s, y + 70 * s, na, 'right'); }
  ctx.restore(); }

// ---------- meter (hoeveelheid hormoon in het bloed) ----------
function meter(ctx, x, y, h, v, col, titel, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 46;
  roundRect(ctx, x - w / 2, y, w, h, 14); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  if (o.band) { ctx.fillStyle = rgba(C.text, 0.10); const y0 = y + h - o.band[1] * h, y1 = y + h - o.band[0] * h; ctx.fillRect(x - w / 2 - 12, y0, w + 24, y1 - y0); ctx.strokeStyle = rgba(C.text, 0.5); ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.strokeRect(x - w / 2 - 12, y0, w + 24, y1 - y0); ctx.setLineDash([]); }
  const hv = clamp(v, 0, 1.15) * h; roundRect(ctx, x - w / 2 + 6, y + h - hv, w - 12, Math.max(4, hv - 6), 8); shape(ctx, rgba(col, 0.85), null);
  if (titel) text(ctx, titel, x, y + h + 40, fTekst(24, 700), col, 'center'); if (o.sub) text(ctx, o.sub, x, y + h + 70, fTekst(22, 400), C.text2, 'center');
  ctx.restore(); }

// ---------- thermostaat (knop met schaal, gouden instelling, koraal = gemeten) en radiator ----------
function thermostaat(ctx, x, y, r, gemeten, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#D8DEE4', '#9AA3B2', 3); circ(ctx, x, y, r * 0.78, '#EEF1F4', null);
  const an = (v) => Math.PI * 0.75 + clamp(v, 0, 1) * Math.PI * 1.5; // v 0..1 = 15..25 °C
  for (let i = 0; i <= 10; i++) { const a2 = an(i / 10); ctx.strokeStyle = '#5A6478'; ctx.lineWidth = i % 5 ? 2 : 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a2) * r * 0.62, y + Math.sin(a2) * r * 0.62); ctx.lineTo(x + Math.cos(a2) * r * 0.74, y + Math.sin(a2) * r * 0.74); ctx.stroke(); }
  [[0, '15'], [0.5, '20'], [1, '25']].forEach(([v, l]) => { const a2 = an(v); text(ctx, l, x + Math.cos(a2) * r * 0.45, y + Math.sin(a2) * r * 0.45 + 8, fTekst(22, 700), '#3A4458', 'center'); });
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r * 0.87, an(0), an(gemeten)); ctx.stroke();
  const ai = an(o.instel == null ? 0.5 : o.instel); ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ai) * r * 0.7, y + Math.sin(ai) * r * 0.7); ctx.stroke(); circ(ctx, x, y, 10, C.goud);
  ctx.restore(); }
function radiator(ctx, x, y, aan, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { roundRect(ctx, x + i * 34, y, 26, 170, 10); shape(ctx, lerpKleur('#9AA3B2', '#E07A5F', aan), '#5A6478', 2); }
  ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 6, y + 20, 7 * 34 + 4, 10); ctx.fillRect(x - 6, y + 140, 7 * 34 + 4, 10);
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 4; for (let i = 0; i < 4; i++) { const xx = x + 20 + i * 55; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const yy = y - 20 - k * 4; const xw = xx + Math.sin(k * 0.5 + t * 4 + i) * 8; k ? ctx.lineTo(xw, yy) : ctx.moveTo(xw, yy); } ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function lerpKleur(c1, c2, u) { const a = parseInt(c1.slice(1), 16), b = parseInt(c2.slice(1), 16); u = clamp(u, 0, 1); const r = Math.round(lerp(a >> 16, b >> 16, u)), g = Math.round(lerp((a >> 8) & 255, (b >> 8) & 255, u)), bl = Math.round(lerp(a & 255, b & 255, u)); return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1); }

// ---------- pillenstrip (21 pillen, 3 rijen van 7, dagen erboven) ----------
function pillenstrip(ctx, x, y, s, genomen, a = 1, o = {}) { // genomen: aantal uitgedrukte pillen (0..21); o.mis = [dagindexen die vergeten zijn]; o.stop = 0..1 stopweek tonen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const W2 = 7 * 92 + 60, H2 = 3 * 96 + 110; roundRect(ctx, -W2 / 2, -H2 / 2, W2, H2, 28); shape(ctx, '#C9CFD8', '#8E97A6', 3);
  roundRect(ctx, -W2 / 2 + 10, -H2 / 2 + 10, W2 - 20, H2 - 20, 22); shape(ctx, '#DDE2E8', null);
  const dagen = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
  for (let i = 0; i < 21; i++) { const r = Math.floor(i / 7), c = i % 7; const px = -W2 / 2 + 60 + c * 92, py = -H2 / 2 + 110 + r * 96;
    if (r === 0) text(ctx, dagen[c], px, -H2 / 2 + 56, fTekst(26, 700), '#4A5468', 'center');
    const mis = o.mis && o.mis.includes(i); const weg = i < genomen && !mis;
    circ(ctx, px, py, 34, weg ? '#B9C0CA' : '#E9ECF0', '#8E97A6', 2);
    if (weg) { ctx.strokeStyle = '#8E97A6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px - 20, py - 10); ctx.lineTo(px + 6, py + 14); ctx.moveTo(px - 4, py - 22); ctx.lineTo(px + 18, py + 4); ctx.stroke(); }
    else { circ(ctx, px, py, 26, mis ? '#F2C4B6' : '#F7F3E8', mis ? C.koraal : '#C9C2AE', mis ? 4 : 2); }
  }
  if (o.stop > 0.01) { ctx.save(); ctx.globalAlpha *= o.stop; const sx = W2 / 2 + 40; roundRect(ctx, sx, -H2 / 2 + 70, 250, 110, 18); shape(ctx, rgba(C.fill, 0.9), C.line, 2); text(ctx, 'stopweek', sx + 125, -H2 / 2 + 122, fTekst(30, 700), C.text, 'center'); text(ctx, '7 dagen geen pil', sx + 125, -H2 / 2 + 160, fTekst(24, 400), C.text2, 'center'); ctx.restore(); }
  ctx.restore(); }

// ---------- halter ----------
function halter(ctx, x, y, s = 1, a = 1, ang = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); ctx.fillStyle = '#5A6070'; ctx.fillRect(-46, -5, 92, 10); [-1, 1].forEach(k => { roundRect(ctx, k * 46 - (k > 0 ? 0 : 22), -26, 22, 52, 6); shape(ctx, '#2E3440', '#8E97A6', 2); roundRect(ctx, k * 70 - (k > 0 ? 0 : 12), -18, 12, 36, 4); shape(ctx, '#2E3440', '#8E97A6', 2); }); ctx.restore(); }

// ---------- eierstok vergroot met een groepje follikels ----------
const FOL = [[-250, -60, 0.92, 0.55], [-90, -120, 0.85, 0.72], [80, -70, 1.0, 1.0], [250, -110, 0.9, 0.4], [-170, 110, 0.88, 0.65], [170, 100, 0.95, 0.85]]; // dx, dy, groeitempo, 'receptoren' (0..1); index 2 wint
function eierstokVak(ctx, x, y, a = 1, o = {}) { // o.groei 0..1 (groepje groeit), o.sterf 0..1 (één voor één af), o.dom 0..1 (winnaar groeit door), o.alle 0..1 (ivf: alle groeien door), o.receptor 0..1, o.volg
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 430, 270, 0, 0, 6.283); shape(ctx, '#4A3A40', '#C98A7E', 3);
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, 426, 266, 0, 0, 6.283); ctx.clip();
  ctx.beginPath(); ctx.ellipse(x, y + 10, 220, 110, 0, 0, 6.283); ctx.fillStyle = rgba('#7A4A44', 0.45); ctx.fill(); // merg
  for (let i = 0; i < 26; i++) { const ax = x + (hash(i * 3.1) - 0.5) * 780, ay = y + (hash(i * 7.7) - 0.5) * 460; if (((ax - x) / 400) ** 2 + ((ay - y) / 250) ** 2 > 1) continue; follikel(ctx, ax, ay, 0.03, { R: 70 }); } // rustende follikels
  const g = clamp(o.groei || 0, 0, 1), st = clamp(o.sterf || 0, 0, 1), dm = clamp(o.dom || 0, 0, 1), al = clamp(o.alle || 0, 0, 1);
  const volgorde = [3, 0, 4, 1, 5]; // volgorde van afsterven (minste receptoren eerst)
  FOL.forEach(([dx, dy, k, rec], i) => { const px = x + dx, py = y + dy; let f = 0.2 + 0.25 * g * k; let doodU = 0;
    if (i === 2) f += 0.5 * dm + 0.3 * al; else { const pos = volgorde.indexOf(i); doodU = clamp(st * 5.4 - pos, 0, 1) * (1 - al); f += 0.35 * al * k; }
    if (doodU > 0.99) return;
    ctx.save(); ctx.globalAlpha *= 1 - doodU; follikel(ctx, px, py, f * (1 - 0.4 * doodU), { R: 190 });
    if (doodU > 0.01) { ctx.globalAlpha = (1 - doodU) * 0.6 * a; circ(ctx, px, py, 190 * (0.12 + f * 0.8) * 0.7, rgba('#2A2A30', doodU), null); }
    if ((o.receptor || 0) > 0.01) { const R = 190 * (0.12 + f * 0.85) * 0.62; const nr = Math.round(4 + rec * 18); for (let j = 0; j < nr; j++) { const an = j / nr * 6.283; circ(ctx, px + Math.cos(an) * R, py + Math.sin(an) * R, 5, rgba(HC.fsh, o.receptor * (1 - doodU))); } }
    ctx.restore();
    if (i === 2 && (o.volg || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.volg; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, py, 190 * (0.12 + f * 0.85) * 0.75 + 14, 0, 6.283); ctx.stroke(); ctx.restore(); }
  });
  ctx.restore(); ctx.restore(); }
function folPos(x, y) { return [x + FOL[2][0], y + FOL[2][1]]; }

// ---------- cyclusgrafiek (drie rijen: hypofyse, eierstok, baarmoederslijmvlies) ----------
const KROM = {
  fsh: [[0, 0.42], [3, 0.55], [7, 0.42], [11, 0.3], [13, 0.42], [14, 0.62], [15.5, 0.32], [20, 0.18], [26, 0.24], [28, 0.42]],
  lh: [[0, 0.14], [10, 0.17], [12.5, 0.32], [14, 1.0], [15.5, 0.28], [18, 0.14], [28, 0.14]],
  oestro: [[0, 0.14], [6, 0.2], [10, 0.5], [12.6, 0.92], [14.2, 0.45], [16.5, 0.32], [21, 0.56], [25.5, 0.26], [28, 0.14]],
  prog: [[0, 0.06], [14, 0.08], [16, 0.35], [21, 0.92], [24.5, 0.55], [27.5, 0.07], [28, 0.06]],
  slijm: [[0, 0.55], [4.5, 0.12], [6, 0.14], [14, 0.6], [21, 0.92], [27.3, 1.0], [28, 0.55]]
};
const PILK = { // met de pil (vereenvoudigd): eigen hormonen laag en vlak, pilhormonen hoog tot de stopweek
  fsh: [[0, 0.2], [21, 0.18], [24, 0.24], [28, 0.3]], lh: [[0, 0.12], [28, 0.13]],
  oestro: [[0, 0.42], [20.6, 0.42], [22, 0.12], [28, 0.12]], prog: [[0, 0.55], [20.6, 0.55], [22, 0.06], [28, 0.06]],
  slijm: [[0, 0.3], [20.6, 0.32], [22.5, 0.12], [28, 0.12]]
};
const VERGEET = { // pil drie dagen vergeten (dag 8–10): de rem valt weg
  fsh: [[0, 0.2], [8, 0.2], [11, 0.5], [14, 0.46]], lh: [[0, 0.12], [12, 0.14], [14, 0.24]],
  oestro: [[0, 0.42], [8, 0.42], [10, 0.14], [12, 0.32], [14, 0.6]], prog: [[0, 0.55], [8, 0.55], [10.5, 0.08], [14, 0.08]]
};
function krom(pts, d) { if (d <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (d <= pts[i][0]) { const [d0, v0] = pts[i - 1], [d1, v1] = pts[i]; return lerp(v0, v1, ease((d - d0) / (d1 - d0))); } return pts[pts.length - 1][1]; }
const GR = { x: 1010, y: 190, w: 820 }; // standaardplek rechts
function grafRijen(G) { return { hyp: [G.y, 170], eier: [G.y + 230, 170], slijm: [G.y + 460, 100] }; }
function cyclusGrafiek(ctx, G, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = grafRijen(G), K = o.krommen || KROM, X = (d) => G.x + d / 28 * G.w;
  const rij = (key, naam) => { const [y0, h] = R[key]; const ra = o.rij && o.rij[key] != null ? o.rij[key] : 1; if (ra <= 0.01) return; ctx.save(); ctx.globalAlpha *= ra; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.x, y0); ctx.lineTo(G.x, y0 + h); ctx.lineTo(G.x + G.w, y0 + h); ctx.stroke(); metaText(ctx, naam, G.x + 10, y0 + 6, C.text2, 'left', 22); ctx.restore(); };
  rij('hyp', 'HYPOFYSE'); rij('eier', 'EIERSTOK'); rij('slijm', 'BAARMOEDERSLIJMVLIES');
  const leg = (rk, items) => { const [y0] = R[rk]; let xx = G.x + G.w; items.slice().reverse().forEach(([k, n]) => { const la = (o.la && o.la[k] != null ? o.la[k] : 1) * ((o.tot && o.tot[k] != null ? o.tot[k] : 28) >= 26 ? 1 : 0); if (la <= 0.01 || o.namen === 0) return; ctx.save(); ctx.globalAlpha *= la; ctx.font = fTekst(22, 700); const w = ctx.measureText(n).width; text(ctx, n, xx, y0 + 8, fTekst(22, 700), HC[k], 'right'); ctx.fillStyle = HC[k]; ctx.fillRect(xx - w - 34, y0 + 1, 24, 5); ctx.restore(); xx -= w + 54; }); };
  leg('hyp', [['fsh', 'FSH'], ['lh', 'LH']]); leg('eier', [['oestro', 'oestrogeen'], ['prog', 'progesteron']]);
  // dagas
  const yb = R.slijm[0] + R.slijm[1]; [[0.5, '1'], [7, '7'], [14, '14'], [21, '21'], [27.5, '28']].forEach(([d, l]) => { text(ctx, l, X(d), yb + 34, fTekst(24, 600), C.text2, 'center'); }); metaText(ctx, 'dag van de cyclus', G.x + G.w, yb + 70, C.grain, 'right', 20);
  if (o.menstr > 0.01) { ctx.save(); ctx.globalAlpha *= o.menstr; ctx.fillStyle = rgba(VK.slijm, 0.22); ctx.fillRect(X(0), R.hyp[0], X(4.6) - X(0), yb - R.hyp[0]); text(ctx, 'menstruatie', X(2.3), R.hyp[0] - 14, fTekst(22, 700), VK.slijm, 'center'); ctx.restore(); }
  const lijn = (key, rk, col, naam) => { const tot = o.tot && o.tot[key] != null ? o.tot[key] : 28; const la = o.la && o.la[key] != null ? o.la[key] : 1; if (la <= 0.01 || tot <= 0.01) return; const [y0, h] = R[rk]; ctx.save(); ctx.globalAlpha *= la; ctx.strokeStyle = col; ctx.lineWidth = o.dik && o.dik[key] ? 9 : 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (o.stip && o.stip[key]) ctx.setLineDash([12, 10]);
    ctx.beginPath(); let last = null; for (let d = 0, i = 0; d <= tot + 1e-6; d += 0.1, i++) { const px = X(d), py = y0 + h - krom(K[key], d) * (h - 20); last = [px, py]; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]);
    if (last && o.namen !== 0 && tot < 26) text(ctx, naam, Math.min(last[0] + 12, G.x + G.w - 4), last[1] + (key === 'lh' ? -14 : key === 'prog' ? -12 : 26), fTekst(24, 700), col, last[0] > G.x + G.w - 140 ? 'right' : 'left'); ctx.restore(); };
  lijn('fsh', 'hyp', HC.fsh, 'FSH'); lijn('lh', 'hyp', HC.lh, 'LH'); lijn('oestro', 'eier', HC.oestro, 'oestrogeen'); lijn('prog', 'eier', HC.prog, 'progesteron');
  // slijmvlies als vlak
  const ts = o.tot && o.tot.slijm != null ? o.tot.slijm : 28; const sa = o.la && o.la.slijm != null ? o.la.slijm : 1; if (ts > 0.01 && sa > 0.01 && K.slijm) { const [y0, h] = R.slijm; ctx.save(); ctx.globalAlpha *= sa; ctx.beginPath(); ctx.moveTo(X(0), y0 + h); for (let d = 0; d <= ts + 1e-6; d += 0.1) ctx.lineTo(X(d), y0 + h - krom(K.slijm, d) * (h - 10)); ctx.lineTo(X(ts), y0 + h); ctx.closePath(); ctx.fillStyle = rgba(VK.slijm, 0.55); ctx.fill(); ctx.restore(); }
  if (o.dag != null && (o.cursor == null || o.cursor > 0.01)) { ctx.save(); ctx.globalAlpha *= o.cursor == null ? 1 : o.cursor; const px = X(o.dag); ctx.strokeStyle = rgba(C.text, 0.65); ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(px, R.hyp[0] - 4); ctx.lineTo(px, yb); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if (o.piek > 0.01) { ctx.save(); ctx.globalAlpha *= o.piek; const px = X(14), py = R.hyp[0] + R.hyp[1] - 1.0 * (R.hyp[1] - 20); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px, py + 18, 30, 0, 6.283); ctx.stroke(); tag(ctx, 'LH-piek', px - 150, py + 30, C.goud, 1, 'center', 24); ctx.restore(); }
  if (o.eisprong > 0.01) { ctx.save(); ctx.globalAlpha *= o.eisprong; const px = X(14.6); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, R.eier[0] - 10); ctx.lineTo(px, yb); ctx.stroke(); tag(ctx, 'eisprong', px + 4, R.eier[0] - 8, C.text, 1, 'center', 22); ctx.restore(); }
  ctx.restore(); }

// ---------- celmembraan met receptoren (vwo-blok) ----------
function membraanBoog(ctx, cx, cy, R, a0, a1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = rgba(C.er, 0.9); ctx.lineWidth = 26; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke(); ctx.strokeStyle = rgba(C.bgMicro, 0.85); ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke(); ctx.restore(); }
function receptorBuiten(ctx, x, y, an, a = 1, bezet = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = '#7A8BA8'; ctx.fillRect(-7, -22, 14, 48); ctx.beginPath(); ctx.moveTo(-26, -22); ctx.lineTo(-26, -52); ctx.lineTo(-10, -52); ctx.lineTo(-10, -34); ctx.lineTo(10, -34); ctx.lineTo(10, -52); ctx.lineTo(26, -52); ctx.lineTo(26, -22); ctx.closePath(); shape(ctx, '#7A8BA8', '#AFC0D0', 2); ctx.restore(); }

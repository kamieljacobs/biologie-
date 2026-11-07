// Wat word jij? · Gezondheidswetenschappen 1 · Hoe een epidemie groeit en stopt — eigen tekeningen (26 okt 2026)
// Seriekleuren: koraal = besmettelijk, teal = vatbaar, groen = immuun/hersteld, oker = maatregel, goud = focus, paars = virus.

// ---------- algemene hulpjes (zoals lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = w || ctx.measureText(s2).width + 120; roundRect(ctx, x, y, ww, 56, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 50, y + 28); ctx.lineTo(x + 26, y + 40); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 62, y + 24, C.text2, 'left', 14); text(ctx, s2, x + 62, y + 46, fTekst(24, 700), C.text, 'left'); ctx.restore(); }
// kaartje met echte getallen: kop (meta), regels, bron (meta) — altijd apart van het oefendossier
function echtKaart(ctx, x, y, w, kop, regels, bron, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 44, h = 70 + regels.length * lh + (bron ? 40 : 6) + (o.extraH || 0);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.line, 0.8), 2); metaText(ctx, kop, x + 26, y + 44, C.goud, 'left', 22);
  regels.forEach((r, i) => { const [s2, ra] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 26, y + 92 + i * lh, fTekst(o.px || 32, 700), C.text, 'left'); ctx.restore(); } });
  if (o.teken) o.teken(x, y + 70 + regels.length * lh, w, o.extraH || 0);
  if (bron) metaText(ctx, bron, x + 26, y + h - 20, C.text2, 'left', 18); ctx.restore(); return h; }
const RHO = (n) => n.toLocaleString('nl-NL');

// ---------- telpoppetje (alleen in groepen en ketens, BEELDAFSPRAKEN) ----------
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }

// ---------- blokje = één melding (keyframe gz) ----------
function blokje(c, x, y, w, h, col, a = 1, pop = false) { if (a <= 0.01) return; c.save(); c.globalAlpha *= a; roundRect(c, x, y, w, h, Math.min(6, h * 0.3)); c.fillStyle = rgba(col, 0.85); c.fill(); c.strokeStyle = col; c.lineWidth = 2; c.stroke();
  if (pop) popje(c, x + w / 2, y + h * 0.82, h * 0.26, rgba('#1A1410', 0.55)); c.restore(); }
function blokLeeg(c, x, y, w, h, a = 1, col = C.line) { if (a <= 0.01) return; c.save(); c.globalAlpha *= a; roundRect(c, x, y, w, h, Math.min(6, h * 0.3)); c.setLineDash([5, 4]); c.strokeStyle = col; c.lineWidth = 1.6; c.stroke(); c.restore(); }

// ---------- SIR-model (keyframe sirRun, met R per dag als functie) ----------
const _SIR = {};
function sirRun(R0, gamma, dagen, i0, Rf = null, key = null) { const k = key || [R0, gamma, dagen, i0].join('|'); if (_SIR[k]) return _SIR[k];
  let S = 1 - i0, I = i0, Rr = 0; const out = []; for (let d = 0; d < dagen; d++) { let nieuw = 0; const R = Rf ? Rf(d) : R0; const beta = R * gamma;
    for (let s = 0; s < 10; s++) { const inf = beta * S * I / 10; S -= inf; I += inf - gamma * I / 10; Rr += gamma * I / 10; nieuw += inf; } out.push({ S, I, R: Rr, nieuw }); }
  _SIR[k] = out; return out; }
// vaste modelruns van deze film (oefenstad van 100.000 inwoners, 5 dagen besmettelijk)
const RUN = {
  vrij25: () => sirRun(2.5, 0.2, 120, 3e-4),
  maat25: () => sirRun(2.5, 0.2, 120, 3e-4, (d) => d < 12 ? 2.5 : 1.6, 'maat25'),
  r3: () => sirRun(3, 0.2, 120, 3e-4),
  r15: () => sirRun(1.5, 0.2, 120, 3e-4),
  r18: () => sirRun(1.8, 0.2, 120, 3e-4)
};
const kruisDag = (run, drempel) => run.findIndex(r => 1 - r.S >= drempel);

// ---------- grafiek met modelbalkjes ----------
// g = {x, y, w, h, dagen, max}; run(s) als blokjes per dag; tot = laatste dag (float); o.omlijn = run als stippelomtrek
function grafAssen(ctx, g, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x, g.y); ctx.lineTo(g.x, g.y + g.h); ctx.lineTo(g.x + g.w, g.y + g.h); ctx.stroke();
  const st = o.stap || 20; for (let d = 0; d <= g.dagen; d += st) { const x = g.x + d / g.dagen * g.w; ctx.fillStyle = C.line; ctx.fillRect(x - 1, g.y + g.h, 2, 10); metaText(ctx, String(d), x, g.y + g.h + 36, C.text2, 'center', 22); }
  metaText(ctx, o.xl || 'DAGEN', g.x + g.w, g.y + g.h + 66, C.text2, 'right', 20); metaText(ctx, o.yl || 'NIEUWE ZIEKEN PER DAG', g.x, g.y - 16, C.text2, 'left', 20); ctx.restore(); }
function grafBalkjes(ctx, g, run, tot, col = C.koraal, a = 1, o = {}) { if (a <= 0.01) return; const bw = g.w / g.dagen; const n = Math.min(run.length, g.dagen);
  for (let d = 0; d < n; d++) { const f = clamp(tot - d, 0, 1); if (f <= 0) break; const bh = run[d].nieuw * 1e5 / g.max * g.h; if (bh < 0.5) continue;
    if (o.omlijn) blokLeeg(ctx, g.x + d * bw + 1, g.y + g.h - bh, Math.max(bw - 2, 2), bh, a * f, col);
    else { blokje(ctx, g.x + d * bw + 1, g.y + g.h - bh, Math.max(bw - 2, 2), Math.max(bh, 1), col, a * f); if (o.rand) { ctx.save(); ctx.globalAlpha *= a * f; roundRect(ctx, g.x + d * bw + 1, g.y + g.h - bh, Math.max(bw - 2, 2), Math.max(bh, 1), 3); ctx.strokeStyle = o.rand; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } } } }
function grafPiek(run) { let m = 0; run.forEach((r, i) => { if (r.nieuw > run[m].nieuw) m = i; }); return m; }
function grafPt(g, run, d) { return [g.x + (d + 0.5) * g.w / g.dagen, g.y + g.h - run[d].nieuw * 1e5 / g.max * g.h]; }
function icLijn(ctx, g, waarde, a = 1, u = 1, label = true) { if (a <= 0.01) return; const y = g.y + g.h - waarde / g.max * g.h; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.setLineDash([14, 8]); ctx.beginPath(); ctx.moveTo(g.x, y); ctx.lineTo(g.x + g.w * u, y); ctx.stroke(); ctx.restore();
  if (label) metaA(ctx, 'WAT DE ZORG AANKAN', g.x + g.w * u - 8, y - 14, a * clamp(u * 3 - 2, 0, 1), C.text, 'right', 22); return y; }

// ---------- dossier: blokjes per dag als stapels (4 breed) ----------
const STAPEL = { bw: 24, bh: 11, gap: 2, per: 4 };
function stapel(ctx, cx, yb, n, u = 1, col = C.koraal, a = 1, o = {}) { const { bw, bh, gap, per } = STAPEL, w = per * (bw + gap) - gap; const k = n * clamp(u, 0, 1);
  for (let i = 0; i < n; i++) { const f = clamp(k - i, 0, 1); if (f <= 0.01) break; const rij = Math.floor(i / per), kol = i % per; const x = cx - w / 2 + kol * (bw + gap), y = yb - (rij + 1) * (bh + gap);
    const dy = (1 - ease(f)) * -60; blokje(ctx, x, y + dy, bw, bh, col, a * f); } return yb - Math.ceil(n / per) * (bh + gap); }
const stapelTop = (yb, n) => yb - Math.ceil(n / STAPEL.per) * (STAPEL.bh + STAPEL.gap);
function stapelLeeg(ctx, cx, yb, n, a = 1) { if (a <= 0.01) return; const { bw, gap, per } = STAPEL, w = per * (bw + gap) - gap; const top = stapelTop(yb, n); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, cx - w / 2 - 6, top - 6, w + 12, yb - top + 6, 8); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// kop van het oefendossier (rechtsboven, op navy)
function dossierKop(ctx, a = 1, x = 1800, y = 120) { metaA(ctx, 'DOSSIER UITBRAAK · OEFENDOSSIER · RONDE GETALLEN', x, y, a, C.grain, 'right', 22); }
// vel van het dossier (canoniek 1920×1080: ook wat er op het kantoorscherm staat)
function vel(ctx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = o.x || 110, y = o.y || 110, w = o.w || 1700, h = o.h || 760;
  roundRect(ctx, x, y, w, h, 20); shape(ctx, rgba('#0D1420', 0.4), rgba(o.rand || C.line, 0.55), 2);
  text(ctx, o.titel || 'DOSSIER UITBRAAK', x + 40, y + 62, fTekst(38, 800), C.text, 'left'); if (o.meta !== '') metaText(ctx, o.meta || 'OEFENDOSSIER · RONDE GETALLEN', x + 40, y + 98, C.grain, 'left', 22); ctx.restore(); }

// ---------- cold open: epidemiecurve van blokjes (één blokje = één melding) ----------
const KOUD = { x0: 560, dx: 26, yb: 820, dagen: 32, bw: 18, bh: 9 };
const koudN = (d) => Math.round(Math.pow(2, d / 5.5));
const KOUD_BLOK = (() => { const L = []; for (let d = 0; d <= KOUD.dagen; d++) for (let i = 0; i < koudN(d); i++) L.push([d, i]); return L; })();
const koudPos = (d, i) => [KOUD.x0 + d * KOUD.dx, KOUD.yb - (i + 1) * (KOUD.bh + 2)];
// tijd(d, i) = moment waarop het blokje valt (s); null = nog niet
function koudCurve(ctx, tijd, t, a = 1, skip = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(KOUD.x0 - 20, KOUD.yb + 2); ctx.lineTo(KOUD.x0 + KOUD.dagen * KOUD.dx + 30, KOUD.yb + 2); ctx.stroke();
  for (let d = 0; d <= KOUD.dagen; d += 7) metaText(ctx, 'DAG ' + d, KOUD.x0 + d * KOUD.dx + KOUD.bw / 2, KOUD.yb + 38, C.text2, 'center', 22);
  KOUD_BLOK.forEach(([d, i], j) => { if (skip && skip(j)) return; const t0 = tijd(d, i); if (t0 == null || t < t0) return; const f = ease((t - t0) / 0.3); const [x, y] = koudPos(d, i); blokje(ctx, x, y - (1 - f) * 120, KOUD.bw, KOUD.bh, C.koraal, f); });
  ctx.restore(); }

// ---------- H1: netwerk van bron- en contactonderzoek ----------
// vier zieken (bron) met 2, 3, 1 en 4 pijlen: gemiddeld 2,5
const NET = (() => { const bron = [[560, 200], [560, 380], [560, 560], [560, 730]], uit = [2, 3, 1, 4], doel = []; let y = 165;
  uit.forEach((n, b) => { for (let k = 0; k < n; k++) { doel.push({ b, x: 960 + (k % 2) * 40, y }); y += 62; } y += 6; }); return { bron, uit, doel, bw: 72, bh: 48 }; })();
// u: blokjes (0..1), p: pijlen (0..1, één voor één), tel: tellers (0..4), hl: bron die oplicht
function netwerk(ctx, o = {}) { const { bw, bh } = NET, a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const p = o.p || 0, nP = NET.doel.length;
  NET.doel.forEach((d, i) => { const f = clamp(p * nP - i, 0, 1); if (f <= 0.01) return; const [bx, by] = NET.bron[d.b]; const x1 = bx + bw + 4, y1 = by + bh / 2, x2 = d.x - 8, y2 = d.y + bh / 2; pijl(ctx, x1, y1, lerp(x1, x2, ease(f)), lerp(y1, y2, ease(f)), C.oker, 1, 4, f > 0.6 ? 14 : 0.1); });
  NET.bron.forEach(([x, y], i) => { blokje(ctx, x, y, bw, bh, C.koraal, o.u == null ? 1 : o.u, true); if (o.hl === i) { roundRect(ctx, x - 6, y - 6, bw + 12, bh + 12, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } });
  NET.doel.forEach((d, i) => blokje(ctx, d.x, d.y, bw, bh, C.koraal, (o.u == null ? 1 : o.u) * (o.doelA == null ? 1 : o.doelA), true));
  const tel = o.tel || 0; NET.bron.forEach(([x, y], i) => { const f = clamp(tel - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; circ(ctx, x - 44, y + bh / 2, 28, rgba(C.goud, 0.2), C.goud, 3); text(ctx, String(NET.uit[i]), x - 44, y + bh / 2 + 12, fTekst(34, 800), C.goud, 'center'); ctx.restore(); });
  ctx.restore(); }

// ---------- schuifjes (H1-rekenvoorbeeld) ----------
// rij = {naam, waarde, frac, col, a}
function schuif(ctx, x, y, w, naam, waarde, frac, a = 1, col = C.goud, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 128, 16); shape(ctx, rgba('#0D1420', 0.75), o.rand || rgba(C.line, 0.7), o.rand ? 3 : 1.5);
  text(ctx, naam, x + 28, y + 46, fTekst(32, 700), C.text, 'left'); const tx = x + 28, tw = w - 230, ty = y + 92; roundRect(ctx, tx, ty - 5, tw, 10, 5); shape(ctx, '#2A3446', null);
  roundRect(ctx, tx, ty - 5, Math.max(10, tw * frac), 10, 5); shape(ctx, rgba(col, 0.75), null); circ(ctx, tx + tw * frac, ty, 15, col, _mixHex(col, '#000000', 0.3), 2);
  if (waarde) text(ctx, waarde, x + w - 30, y + 98, fTitel(56), o.waardeKleur || C.text, 'right'); ctx.restore(); }

// ---------- virus (paars, alleen als pictogram) ----------
function virusIcoon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.paars; ctx.lineWidth = r * 0.16; ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const an = i * 0.5236 + t * 0.15; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.32, y + Math.sin(an) * r * 1.32); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.38, y + Math.sin(an) * r * 1.38, r * 0.13, C.paars); }
  circ(ctx, x, y, r, rgba(C.paars, 0.45), C.paars, r * 0.1); ctx.restore(); }

// ---------- liggende balk 'immuun' / 'ooit besmet' met gouden drempel ----------
function balkImmuun(ctx, x, y, w, frac, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = o.h || 46;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba(C.teal, 0.3), rgba(C.teal, 0.8), 2);
  if (frac > 0.003) { roundRect(ctx, x, y, Math.max(12, w * frac), h, 10); shape(ctx, rgba(C.groen, 0.85), C.groen, 2); }
  if (o.door > 0.01 && o.drempel) { const x0 = x + w * o.drempel, x1 = x + w * frac; if (x1 > x0) { ctx.save(); ctx.beginPath(); ctx.rect(x0, y, x1 - x0, h); ctx.clip(); ctx.globalAlpha *= o.door; ctx.strokeStyle = rgba('#0D1420', 0.55); ctx.lineWidth = 5; for (let k = -h; k < x1 - x0 + h; k += 18) { ctx.beginPath(); ctx.moveTo(x0 + k, y + h); ctx.lineTo(x0 + k + h, y); ctx.stroke(); } ctx.restore(); } }
  (o.streep || []).forEach(([f, sa]) => { if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; ctx.fillStyle = C.text; ctx.fillRect(x + w * f - 2, y - 12, 4, h + 24); ctx.restore(); } });
  if (o.drempel && (o.dA == null || o.dA > 0.01)) { ctx.save(); ctx.globalAlpha *= o.dA == null ? 1 : o.dA; ctx.fillStyle = C.goud; ctx.fillRect(x + w * o.drempel - 4, y - 18, 8, h + 36); ctx.restore(); }
  ctx.restore(); }

// ---------- R-meter (echte waarde 2020, apart kaartje) ----------
function rMeter(ctx, x, y, r, R, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const max = 3, an = (v) => Math.PI + clamp(v / max, 0, 1) * Math.PI;
  roundRect(ctx, x - r - 60, y - r - 90, 2 * r + 120, r + 250, 18); shape(ctx, rgba('#0D1420', 0.9), rgba(C.line, 0.8), 2);
  metaText(ctx, o.kop || 'R IN NEDERLAND · 2020', x, y - r - 50, C.goud, 'center', 20);
  ctx.lineWidth = 22; ctx.lineCap = 'butt'; ctx.strokeStyle = rgba(C.groen, 0.6); ctx.beginPath(); ctx.arc(x, y, r, an(0), an(1)); ctx.stroke(); ctx.strokeStyle = rgba(C.koraal, 0.6); ctx.beginPath(); ctx.arc(x, y, r, an(1), an(3)); ctx.stroke();
  [0, 1, 2, 3].forEach(v => { const q = an(v); text(ctx, String(v), x + Math.cos(q) * (r + 34), y + Math.sin(q) * (r + 34) + 10, fTekst(28, 700), v === 1 ? C.text : C.text2, 'center'); });
  const q = an(R); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(q) * (r - 20), y + Math.sin(q) * (r - 20)); ctx.stroke(); circ(ctx, x, y, 12, C.text);
  if (o.tekst) text(ctx, o.tekst, x, y + 70, fTekst(38, 800), o.tekstKleur || C.text, 'center');
  metaText(ctx, o.bron || 'SCHATTING RIVM, 2020', x, y + 104, C.text2, 'center', 18); if (o.onder) metaText(ctx, o.onder, x, y + 134, C.oker, 'center', 18); ctx.restore(); }

// ---------- model met drie bakken (H4) ----------
const BAK = { y: 170, h: 190, w: 380, xs: [250, 770, 1290], kleur: () => [C.teal, C.koraal, C.groen], naam: ['vatbaar', 'besmettelijk', 'hersteld'] };
function bakVorm(ctx, x, y, w, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + h); ctx.lineTo(x + w - 18, y + h); ctx.lineTo(x + w, y); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
  ctx.lineTo(x, y); ctx.fillStyle = rgba(col, 0.1); ctx.fill(); ctx.restore(); }
// st = {S, I, R} fracties; ver = [a0, a1, a2] zichtbaarheid per bak; stroom = 0..1 (poppetjes onderweg); t
function modelBakken(ctx, st, ver = [1, 1, 1], t = 0, stroom = 0, o = {}) { const cols = BAK.kleur(), N = 24, per = 8;
  const n = [Math.round(st.S * N), 0, 0]; n[2] = Math.round(st.R * N); n[1] = Math.max(0, N - n[0] - n[2]);
  BAK.xs.forEach((x, k) => { const a = ver[k]; if (a <= 0.01) return; bakVorm(ctx, x, BAK.y, BAK.w, BAK.h, cols[k], a); naamBij(ctx, BAK.naam[k], '', x + BAK.w / 2, BAK.y + BAK.h + 50, a * (o.namen == null ? 1 : o.namen), 'center', cols[k]);
    for (let i = 0; i < n[k]; i++) { const r = Math.floor(i / per), c = i % per; popje(ctx, x + 46 + c * 41, BAK.y + BAK.h - 26 - r * 58, 13, cols[k], a); } });
  for (let k = 0; k < 2; k++) { const a = Math.min(ver[k], ver[k + 1]); if (a <= 0.01) continue; const x1 = BAK.xs[k] + BAK.w + 12, x2 = BAK.xs[k + 1] - 12, y = BAK.y + 40;
    pijl(ctx, x1, y, x2, y, C.line, a, 4, 16);
    if (stroom > 0.01) for (let j = 0; j < 2; j++) { const u = ((t * 0.45 + j * 0.5 + k * 0.25) % 1); const px = lerp(x1 - 50, x2 + 50, u), py = y + 60 - Math.sin(u * Math.PI) * 30; popje(ctx, px, py, 13, u < 0.5 ? cols[k] : cols[k + 1], a * stroom * Math.sin(u * Math.PI)); } } }
// knop (draaiknop, oker = maatregel)
function knop(ctx, x, y, r, frac, a = 1, naam = 'CONTACTEN') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25, q = lerp(a0, a1, frac);
  ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.strokeStyle = '#2A3446'; ctx.beginPath(); ctx.arc(x, y, r + 22, a0, a1); ctx.stroke(); ctx.strokeStyle = C.oker; ctx.beginPath(); ctx.arc(x, y, r + 22, a0, q); ctx.stroke();
  circ(ctx, x, y, r, '#3A4458', _mixHex(C.oker, '#000000', 0.2), 3); circ(ctx, x, y, r * 0.78, '#2E3748', null); ctx.strokeStyle = C.oker; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x + Math.cos(q) * r * 0.25, y + Math.sin(q) * r * 0.25); ctx.lineTo(x + Math.cos(q) * r * 0.8, y + Math.sin(q) * r * 0.8); ctx.stroke();
  text(ctx, Math.round(frac * 100) + ' %', x, y + r + 74, fTekst(36, 800), C.text, 'center'); metaText(ctx, naam, x, y - r - 40, C.oker, 'center', 22); ctx.restore(); }

// ---------- herinneringskader maart 2020 (keyframe 'herinnering', goedgekeurd) ----------
function herinnering(ctx, t, a = 1, s = 1, dx = 0, dy = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(dx, dy); ctx.scale(s, s);
  ctx.save(); roundRect(ctx, 330, 150, 1260, 690, 22); ctx.fillStyle = '#4A3A28'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#B89A6A'; ctx.stroke(); ctx.clip(); ctx.filter = 'sepia(0.95) saturate(0.7) brightness(0.92)';
  ctx.fillStyle = 'rgba(60,44,28,0.35)'; ctx.fillRect(330, 560, 1260, 280);
  // raam met een stille straat (iedereen thuis)
  roundRect(ctx, 820, 210, 300, 240, 8); shape(ctx, 'rgba(150,170,190,0.25)', '#B89A6A', 6); ctx.fillStyle = '#B89A6A'; ctx.fillRect(967, 210, 6, 240); ctx.fillRect(820, 327, 300, 6);
  persoon(ctx, 'yasmin', 730, 790, 430, { pose: 'zit', stoel: true, tafel: 640, kijk: 1, uit: 'neutraal', t });
  persoon(ctx, 'bilal', 1190, 790, 450, { pose: 'zit', stoel: true, tafel: 640, kijk: -1, uit: 'neutraal', t });
  ctx.fillStyle = '#8A6A44'; ctx.fillRect(520, 640, 880, 22); ctx.fillStyle = '#EDE6D6'; ctx.fillRect(660, 618, 120, 22); ctx.fillRect(1120, 618, 120, 22);
  laptop(ctx, 960, 640, 120, {}); ctx.filter = 'none'; ctx.lineWidth = 60; ctx.strokeStyle = 'rgba(40,28,16,0.35)'; roundRect(ctx, 330, 150, 1260, 690, 22); ctx.stroke(); ctx.restore();
  metaText(ctx, 'MAART 2020', 380, 210, '#D8BE8C', 'left', 30); ctx.restore(); }

// ---------- het GGD-kantoor met camerazoom naar het scherm ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
const SCR = { x: 717, y: 111, w: 600, h: 320 }; // het grote lege scherm in het decor (1920×1080)
const SCR_K = Math.min(SCR.w / W, SCR.h / H), SCR_O = [SCR.x + SCR.w / 2 - SCR_K * W / 2, SCR.y + SCR.h / 2 - SCR_K * H / 2];
const GROND = 862;
// u = 0: kantoor (decor op 60 %), u = 1: het scherm vult het beeld (navy). mensen(ctx) tekent personen in decorcoördinaten; inhoud(ctx) in schermcoördinaten (1920×1080)
function kantoor(ctx, u, mensen, inhoud) { const e = ease(u); bg(ctx, 'schema');
  if (e >= 0.999) { if (inhoud) inhoud(ctx); return; }
  const sc = Math.pow(1 / SCR_K, e), f = (1 - 1 / sc) / (1 - SCR_K), cx = SCR.x + SCR.w / 2, cy = SCR.y + SCR.h / 2, Px = lerp(960, cx, f), Py = lerp(540, cy, f);
  ctx.save(); ctx.translate(960, 540); ctx.scale(sc, sc); ctx.translate(-Px, -Py);
  const im = DECOR_IMG.ggd; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= 0.6; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); }
  ctx.save(); roundRect(ctx, SCR.x - 6, SCR.y - 6, SCR.w + 12, SCR.h + 12, 6); ctx.fillStyle = '#0F1622'; ctx.fill(); ctx.beginPath(); ctx.rect(SCR.x, SCR.y, SCR.w, SCR.h); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h);
  ctx.translate(SCR_O[0], SCR_O[1]); ctx.scale(SCR_K, SCR_K); if (inhoud) inhoud(ctx); ctx.restore();
  if (mensen) mensen(ctx); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 1 - e; ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); ctx.restore(); }
// decor zonder zoom, met een eigen paneel ervoor (recap)
function kantoorVlak(ctx) { bg(ctx, 'schema'); const im = DECOR_IMG.ggd; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= 0.6; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); } ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }

// ---------- kleine recapkaart ----------
function recapKaart(ctx, x, y, w, h, kop, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.goud, 0.8), 2); teken(x + w / 2, y + (h - 60) / 2 + 6);
  text(ctx, kop, x + w / 2, y + h - 26, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

// badge aan een koord (zonder tekst: te klein om te lezen; de naam staat er met naamBij bij)
function badge(ctx, r, col = '#F2F2EE', a = 1) { if (!r || !r.hoofd || a <= 0.01) return; const { x, y, r: hr } = r.hoofd; ctx.save(); ctx.globalAlpha *= a;
  const bx = x + hr * 0.42, by = y + hr * 2.75, w = hr * 0.62, h = hr * 0.82; ctx.strokeStyle = '#3E6FA8'; ctx.lineWidth = Math.max(2, hr * 0.07); ctx.beginPath(); ctx.moveTo(x - hr * 0.3, y + hr * 1.35); ctx.lineTo(bx + w / 2, by); ctx.moveTo(x + hr * 0.35, y + hr * 1.35); ctx.lineTo(bx + w / 2, by); ctx.stroke();
  roundRect(ctx, bx, by, w, h, hr * 0.08); shape(ctx, col, '#9AA3B2', 1.5); ctx.fillStyle = '#3E6FA8'; ctx.fillRect(bx, by, w, h * 0.22); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(bx + w * 0.18, by + h * 0.5, w * 0.64, h * 0.08); ctx.fillRect(bx + w * 0.18, by + h * 0.68, w * 0.44, h * 0.08); ctx.restore(); }

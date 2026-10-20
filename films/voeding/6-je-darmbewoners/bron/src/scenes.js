// Film 6 · Je darmbewoners — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

// ---------- gedeelde scènestukken (zelfde als film 4/5) ----------
function refCard(ctx, txt, x, y, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.font = fTekst(36, 600); const w = ctx.measureText(txt).width + 60; roundRect(ctx, x, y, w, 60, 30); shape(ctx, rgba(C.fill, 0.8), C.goud, 1.5); text(ctx, txt, x + 30, y + 41, fTekst(36, 600), C.goud, 'left'); ctx.restore(); }
function strike(ctx, x0, y, x1, color, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, a), y); ctx.stroke(); ctx.restore(); }
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'left' ? x : x - w; roundRect(ctx, x0, y - 30, w, 52, 26); shape(ctx, rgba(col, 0.16), col, 1.4); text(ctx, s, x0 + 22, y + 8, fTekst(36, 600), lighten(col, 0.35), 'left'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function mix(h1, h2, u) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = [16, 8, 0].map(s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, u))); return `rgb(${c[0]},${c[1]},${c[2]})`; }

// ---------- kleuren van deze film ----------
const BAC1 = C.teal;               // gunstige darmbacteriën (teal) — serie: teal en grijs
const BAC2 = '#8FA0B5';            // tweede groep (grijs)
const BAC3 = '#7FC48F';            // vezelafbrekers (groen, zelfde tint als vezel)
const ZIEK = C.koraal;             // de ziekmaker
const GAS = '#C9D3DF';             // gasbelletjes
const KVZ = C.goud;                // korte vetzuren
const AB = C.paars;                // antibioticum
const WAND = '#B9A2C9';            // darmwandcellen (zacht paars, zoals epitheel in film 4)
const SLIJM = '#8FD0E8';           // slijmlaag (lichte teal)

// ---------- bacteriën (Micro) ----------
// kind 0 staaf teal, 1 staaf grijs, 2 bol groen, 3 ziekmaker (koraal staaf), 4 spore
function bact(ctx, x, y, kind = 0, s = 1, rot = 0, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const col = kind === 3 ? ZIEK : kind === 2 ? BAC3 : kind === 1 ? BAC2 : kind === 4 ? ZIEK : BAC1; const c = dood > 0.5 ? C.line : col;
  if (kind === 2) { ctx.beginPath(); ctx.arc(0, 0, 9 * s, 0, 6.283); shape(ctx, rgba(c, 0.5), c, 1.4); }
  else if (kind === 4) { ctx.beginPath(); ctx.ellipse(0, 0, 13 * s, 9 * s, 0, 0, 6.283); shape(ctx, rgba(c, 0.25), c, 3.2); ctx.beginPath(); ctx.ellipse(0, 0, 7 * s, 4 * s, 0, 0, 6.283); shape(ctx, rgba(c, 0.6), c, 1); }
  else { roundRect(ctx, -16 * s, -7 * s, 32 * s, 14 * s, 7 * s); shape(ctx, rgba(c, 0.4), c, 1.5); }
  if (dood > 0.5) { ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-5, -4); ctx.lineTo(5, 4); ctx.moveTo(5, -4); ctx.lineTo(-5, 4); ctx.stroke(); }
  ctx.restore(); }
// zwerm bacteriën in een rechthoek; mixkans per soort [k0,k1,k2,k3]; dood: fractie dood (op seed)
function zwerm(ctx, x, y, w, h, n, t, a = 1, o = {}) { if (a <= 0.01) return; const { mixk = [0.4, 0.3, 0.3, 0], dood = 0, s = 1, ziekN = 0, spore = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const h1 = hash(i * 3 + 1), h2 = hash(i * 3 + 2), h3 = hash(i * 3 + 3); const wd = wander(i, t, 6, 0.6); let kind = h3 < mixk[0] ? 0 : h3 < mixk[0] + mixk[1] ? 1 : h3 < mixk[0] + mixk[1] + mixk[2] ? 2 : 3;
    if (ziekN > 0 && i < ziekN) kind = 3; const dd = (kind !== 3 && hash(i + 77) < dood) ? 1 : 0; if (dd && dood < 1 && hash(i + 99) > 0.5) continue; bact(ctx, x + h1 * w + wd.x, y + h2 * h + wd.y, kind === 3 && spore > 0.5 ? 4 : kind, s, (h1 - 0.5) * 2, 1, dd); }
  ctx.restore(); }

// ---------- darmwand (Micro): dikke darm in doorsnede, wand onder, inhoud boven ----------
function darmwand(ctx, yWand = 640, a = 1, o = {}) { if (a <= 0.01) return; const { t = 0, slijm = 1, o2 = 0, label = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  // zuurstofgradiënt vanaf de wand (teal gloed) — alleen als o2 > 0
  if (o2 > 0.01) { const g = ctx.createLinearGradient(0, yWand, 0, yWand - 420); g.addColorStop(0, rgba(C.teal, 0.28 * o2)); g.addColorStop(0.35, rgba(C.teal, 0.08 * o2)); g.addColorStop(1, rgba(C.teal, 0)); ctx.fillStyle = g; ctx.fillRect(0, yWand - 420, W, 420); }
  // slijmlaag
  if (slijm > 0.01) { ctx.save(); ctx.globalAlpha *= slijm; ctx.fillStyle = rgba(SLIJM, 0.14); ctx.beginPath(); ctx.moveTo(0, yWand); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, yWand - 70 + Math.sin(x / 160 + t * 0.3) * 8); ctx.lineTo(W, yWand); ctx.closePath(); ctx.fill(); ctx.restore(); }
  // wandcellen (rij blokjes met kern) + bloedvat eronder
  for (let x = -20; x < W + 40; x += 92) { roundRect(ctx, x, yWand, 86, 120, 14); shape(ctx, rgba(WAND, 0.22), rgba(WAND, 0.8), 1.4); ctx.fillStyle = rgba(C.kern, 0.85); ctx.beginPath(); ctx.ellipse(x + 43, yWand + 78, 16, 11, 0, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = rgba(BLOED, 0.7); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, yWand + 160); ctx.lineTo(W, yWand + 160); ctx.stroke(); particleFlow(ctx, [[0, yWand + 160], [W, yWand + 160]], 14, t, 120, rgba(BLOED, 0.9), 4, 3, 1);
  if (label) { metaText(ctx, 'DARMWAND', 60, yWand + 150, C.grain, 'left', 22); metaText(ctx, 'BLOED', 60, yWand + 205, lighten(BLOED, 0.4), 'left', 22); metaText(ctx, 'DARMINHOUD', 60, yWand - 100, C.grain, 'left', 22); }
  ctx.restore(); }

// ---------- dikke darm als buis (Schema) ----------
function dikkeDarm(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const { t = 0, vul = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  const pts = [[x - 260 * s, y + 200 * s], [x - 280 * s, y - 120 * s], [x - 120 * s, y - 200 * s], [x + 160 * s, y - 200 * s], [x + 290 * s, y - 110 * s], [x + 270 * s, y + 200 * s]];
  buisPad(ctx, pts, 64 * s, 1, V.neutraal, C.fill, { seed: 6, glad: true });
  if (vul > 0.01) { const g = gladC(pts); ctx.save(); ctx.globalAlpha *= vul; for (let k = 0; k < 40; k++) { const u = (k / 40 + t * 0.01) % 1; const p = g[Math.floor(u * (g.length - 1))]; const wd = wander(k, t, 10, 0.5); bact(ctx, p[0] + wd.x, p[1] + wd.y, k % 3, 0.55, hash(k) * 3, 0.9); } ctx.restore(); }
  ctx.restore(); }

function wrapN(ctx, s, x, y, maxW, lh) { const words = s.split(' '); let line = '', lines = []; for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; } if (line) lines.push(line); ctx.textAlign = 'center'; lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh)); return lines.length; }
// ---------- bewijsbord (Schema) ----------
const VAKKEN = [['VASTGESTELD', C.groen], ['WAARSCHIJNLIJK', C.goud], ['HYPOTHESE', C.paars]];
// items: [[vak(0..2), tekst, alpha], ...]
function bewijsbord(ctx, items, a = 1, o = {}) { if (a <= 0.01) return; const { x = 140, y = 150, w = 1640, h = 640, titel = 1, defs = null } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 22); shape(ctx, rgba(C.fill, 0.25), rgba(C.line, 0.5), 1.4);
  if (titel) metaText(ctx, 'BEWIJSBORD', x + w / 2, y - 20, C.grain, 'center', 26);
  const cw = (w - 48) / 3;
  VAKKEN.forEach(([naam, col], i) => { const cx = x + 16 + i * (cw + 8); roundRect(ctx, cx, y + 18, cw, 64, 14); shape(ctx, rgba(col, 0.16), col, 1.6); metaText(ctx, naam, cx + cw / 2, y + 59, lighten(col, 0.3), 'center', 26);
    if (defs && defs[i]) { ctx.save(); ctx.globalAlpha *= defs[i][1]; ctx.font = fTekst(26, 400); ctx.fillStyle = C.text2; wrapN(ctx, defs[i][0], cx + cw / 2, y + 118, cw - 30, 32); ctx.restore(); }
    let yy = y + (defs ? 230 : 120); items.filter(it => it[0] === i).forEach(it => { if (it[2] <= 0.01) return; ctx.save(); ctx.globalAlpha *= it[2]; ctx.font = fTekst(30, 500); ctx.fillStyle = C.text; const lines = wrapN(ctx, it[1], cx + cw / 2, yy, cw - 40, 36); ctx.beginPath(); ctx.arc(cx + 22, yy - 10, 6, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); yy += 36 * lines + 22; }); });
  ctx.restore(); }
// kleine versie rechtsboven (alleen titel + stippen)
function bordKlein(ctx, counts, a = 1, x = 1500, y = 60) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 380, 64, 14); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.5), 1.2);
  VAKKEN.forEach(([naam, col], i) => { const cx = x + 40 + i * 120; ctx.beginPath(); ctx.arc(cx, y + 32, 9, 0, 6.283); shape(ctx, rgba(col, 0.35), col, 1.4); text(ctx, String(counts[i] || 0), cx + 22, y + 41, fTekst(26, 600), lighten(col, 0.3), 'left'); }); ctx.restore(); }

// ---------- populatiebalken (Schema): soorten in de tijd ----------
// data: per soort {col, f(u)->0..1 hoogte}, u = 0..1 tijd; ab: [u0,u1] kuur
const SOORTEN = [
  { naam: 'vezelafbrekers', col: BAC3, f: u => u < 0.2 ? 0.8 : u < 0.42 ? lerp(0.8, 0.06, (u - 0.2) / 0.1) : u < 0.7 ? lerp(0.06, 0.5, (u - 0.42) / 0.28) : lerp(0.5, 0.75, (u - 0.7) / 0.3) },
  { naam: 'soort 2', col: BAC1, f: u => u < 0.2 ? 0.7 : u < 0.4 ? lerp(0.7, 0.1, (u - 0.2) / 0.1) : u < 0.8 ? lerp(0.1, 0.6, (u - 0.4) / 0.4) : 0.65 },
  { naam: 'soort 3', col: BAC2, f: u => u < 0.2 ? 0.55 : u < 0.38 ? lerp(0.55, 0.04, (u - 0.2) / 0.08) : u < 1 ? lerp(0.04, 0.12, (u - 0.38) / 0.62) : 0.12 },
];
const ZIEK_F = u => u < 0.2 ? 0.06 : u < 0.4 ? lerp(0.06, 0.03, (u - 0.2) / 0.2) : u < 0.7 ? lerp(0.03, 0.95, (u - 0.4) / 0.3) : 0.95;
function populaties(ctx, u, a = 1, o = {}) { if (a <= 0.01) return; const { x = 200, y = 780, w = 1500, h = 440, ab = [0.2, 0.4], ziek = 0, herstel = 1, labels = 1, t = 0, uZiek = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  axisBase(ctx, x, x + w, y, 1); metaText(ctx, 'TIJD →', x + w, y + 36, C.grain, 'right', 22); metaText(ctx, 'AANTAL', x - 20, y - h - 12, C.grain, 'left', 22);
  // kuur-band
  if (ab) { ctx.fillStyle = rgba(AB, 0.12); ctx.fillRect(x + ab[0] * w, y - h, (ab[1] - ab[0]) * w, h); ctx.strokeStyle = rgba(AB, 0.6); ctx.lineWidth = 1.2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x + ab[0] * w, y - h); ctx.lineTo(x + ab[0] * w, y); ctx.moveTo(x + ab[1] * w, y - h); ctx.lineTo(x + ab[1] * w, y); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'ANTIBIOTICAKUUR', x + (ab[0] + ab[1]) / 2 * w, y - h - 12, lighten(AB, 0.3), 'center', 22); }
  const series = SOORTEN.map(s => ({ col: s.col, f: v => (v > ab[1] ? lerp(s.f(ab[1]), s.f(v), herstel) : s.f(v)) })); if (ziek > 0.01) series.push({ col: ZIEK, f: ZIEK_F, a: ziek, lw: 5, umax: uZiek });
  series.forEach((s, i) => { ctx.save(); ctx.globalAlpha *= (s.a ?? 1); ctx.strokeStyle = s.col; ctx.lineWidth = s.lw || 4; ctx.lineJoin = 'round'; ctx.beginPath(); const N = 120; const uu = Math.min(u, s.umax ?? 1); for (let k = 0; k <= N; k++) { const v = k / N; if (v > uu) break; const px = x + v * w, py = y - s.f(v) * h; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const v = Math.min(uu, 1), px = x + v * w, py = y - s.f(v) * h; ctx.beginPath(); ctx.arc(px, py, 7, 0, 6.283); shape(ctx, s.col, s.col, 1); ctx.restore(); });
  if (labels) { series.forEach((s, i) => { const nm = i < 3 ? SOORTEN[i].naam : 'de ziekmaker'; ctx.save(); ctx.globalAlpha *= (s.a ?? 1); const lx = x + 40 + i * 370, ly = y + 70; ctx.strokeStyle = s.col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(lx, ly - 8); ctx.lineTo(lx + 40, ly - 8); ctx.stroke(); text(ctx, nm, lx + 54, ly, fTekst(26, 600), lighten(s.col, 0.3), 'left'); ctx.restore(); }); }
  ctx.restore(); }

// ---------- patiënt (Macro): man in bed + tijdlijn ----------
function bedMan(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const { ziek = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  // patiënt = Opa Henk (vast personage, 71) in bed (20 okt 2026; vervangt het kale hoofdje)
  roundRect(ctx, x - 300 * s, y - 20 * s, 600 * s, 160 * s, 24 * s); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  roundRect(ctx, x - 290 * s, y + 140 * s, 30 * s, 60 * s, 6 * s); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); roundRect(ctx, x + 260 * s, y + 140 * s, 30 * s, 60 * s, 6 * s); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
  roundRect(ctx, x - 285 * s, y - 34 * s, 150 * s, 96 * s, 30 * s); shape(ctx, rgba('#E6E1D3', 0.85), rgba('#E6E1D3', 1), 1.5); // kussen
  ctx.save(); ctx.beginPath(); ctx.rect(x - 300 * s, y - 160 * s, 160 * s, 320 * s); ctx.clip(); liggend(ctx, 'henk', x - 205 * s, y + 12 * s, 520 * s, { uit: ziek > 0.5 ? 'bezorgd' : 'blij' }); ctx.restore(); // lijf onder de deken
  roundRect(ctx, x - 150 * s, y - 44 * s, 430 * s, 150 * s, 30 * s); shape(ctx, rgba('#2F5F78', 0.96), rgba(C.teal, 0.9), 1.5); // deken
  ctx.strokeStyle = rgba(C.teal, 0.35); ctx.lineWidth = 2 * s; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - 150 * s + k * 100 * s, y - 40 * s); ctx.lineTo(x - 150 * s + k * 100 * s, y + 100 * s); ctx.stroke(); }
  ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); roundRect(ctx, -22 * s, -9 * s, 44 * s, 18 * s, 9 * s); shape(ctx, rgba(AB, 0.5), AB, 1.4); ctx.fillStyle = rgba(C.text, 0.85); ctx.beginPath(); ctx.moveTo(0, -9 * s); ctx.lineTo(22 * s, -9 * s); ctx.arcTo(22 * s + 9 * s, -9 * s, 22 * s + 9 * s, 0, 9 * s); ctx.lineTo(0, 9 * s); ctx.closePath(); ctx.restore(); }
function tijdlijn(ctx, x, y, w, items, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; axisBase(ctx, x, x + w, y, 1);
  items.forEach(it => { const [u, soort, al] = it; if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const px = x + u * w; ctx.beginPath(); ctx.arc(px, y, 7, 0, 6.283); shape(ctx, C.text, C.text, 1);
    if (soort === 'kuur') { pil(ctx, px, y - 50, 1, 1); metaText(ctx, 'KUUR', px, y + 40, lighten(AB, 0.3), 'center', 20); }
    else if (soort === 'diarree') { ctx.fillStyle = rgba(C.koraal, 0.9); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(px + (k - 1) * 14, y - 46 + (k % 2) * 8, 6, 9, 0, 0, 6.283); ctx.fill(); } metaText(ctx, 'DIARREE', px, y + 40, lighten(C.koraal, 0.3), 'center', 20); }
    else if (soort === 'donor') { ctx.beginPath(); ctx.arc(px, y - 50, 16, 0, 6.283); shape(ctx, rgba(C.bruin, 0.6), C.bruin, 1.5); metaText(ctx, 'DONOR', px, y + 40, lighten(C.groen, 0.2), 'center', 20); }
    else if (soort === 'beter') { ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px - 12, y - 48); ctx.lineTo(px - 2, y - 36); ctx.lineTo(px + 16, y - 62); ctx.stroke(); metaText(ctx, 'BETER', px, y + 40, lighten(C.groen, 0.2), 'center', 20); }
    ctx.restore(); });
  ctx.restore(); }

// ---------- petrischaaltje ----------
function petri(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const { open = 1, groei = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 180 * s, 70 * s, 0, 0, 6.283); shape(ctx, rgba(V.neutraal, 0.12), V.neutraal, 2);
  ctx.beginPath(); ctx.ellipse(x, y - 8 * s, 160 * s, 56 * s, 0, 0, 6.283); shape(ctx, rgba(C.oker, 0.25), rgba(C.oker, 0.6), 1.2);
  if (open > 0.5) { ctx.beginPath(); ctx.ellipse(x + 230 * s, y - 120 * s, 180 * s, 70 * s, -0.5, 0, 6.283); shape(ctx, rgba(V.neutraal, 0.08), rgba(V.neutraal, 0.7), 1.5); }
  if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= groei; for (let i = 0; i < 6; i++) { const h1 = hash(i + 5), h2 = hash(i + 15); ctx.beginPath(); ctx.arc(x + (h1 - 0.5) * 240 * s, y - 8 * s + (h2 - 0.5) * 70 * s, 7 * s, 0, 6.283); shape(ctx, rgba(BAC1, 0.5), BAC1, 1.2); } ctx.restore(); }
  ctx.restore(); }
function stoof(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, 0.35), C.line, 1.6); metaText(ctx, '37 °C', x + w - 24, y + 44, C.grain, 'right', 26); ctx.restore(); }

// ---------- moleculen ----------
function gasbel(ctx, x, y, r, a = 1, lbl = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(GAS, 0.15), rgba(GAS, 0.8), 1.4); if (lbl) metaText(ctx, lbl, x, y + 8, C.text, 'center', 22); ctx.restore(); }
function kortVetzuur(ctx, x, y, n = 3, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = KVZ; ctx.lineWidth = 3 * s; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= n; i++) { const px = x + i * 14 * s, py = y + (i % 2 ? -8 : 8) * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.beginPath(); ctx.arc(x - 8 * s, y + 8 * s, 6 * s, 0, 6.283); shape(ctx, rgba(KVZ, 0.6), KVZ, 1.2); ctx.restore(); }
function suikertje(ctx, x, y, r = 9, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(V.kh, 0.6), V.kh, 1.3, 0); ctx.restore(); }
function muis(ctx, x, y, s = 1, a = 1, col = BAC2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 46 * s, 26 * s, 0, 0, 6.283); shape(ctx, rgba(col, 0.4), col, 1.6); ctx.beginPath(); ctx.arc(x + 44 * s, y - 6 * s, 16 * s, 0, 6.283); shape(ctx, rgba(col, 0.4), col, 1.6); ctx.beginPath(); ctx.arc(x + 50 * s, y - 20 * s, 7 * s, 0, 6.283); shape(ctx, rgba(col, 0.4), col, 1.4); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 46 * s, y); ctx.quadraticCurveTo(x - 80 * s, y - 10 * s, x - 90 * s, y + 20 * s); ctx.stroke(); ctx.fillStyle = C.text; ctx.beginPath(); ctx.arc(x + 52 * s, y - 8 * s, 2.2 * s, 0, 6.283); ctx.fill(); ctx.restore(); }
function groepStippen(ctx, x, y, n, cols, w, rows, r, a = 1, lit = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const perRow = Math.ceil(n / rows); for (let i = 0; i < n; i++) { const cx = x + (i % perRow) * (w / perRow), cy = y + Math.floor(i / perRow) * 40; const u = lit * n > i ? 1 : 0; const col = u ? cols[0] : cols[1]; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, rgba(col, 0.55), col, 1); } ctx.restore(); }

// ======================================================================
const SCENES = {
  // ---------- Cold open (Macro) ----------
  s01(ctx, t, q) { bg(ctx, 'macro');
    const z = q.on('diarree', 1, 1.0), d = q.on('donor', 1, 1.0), b = q.on('beter', 1, 0.8);
    bedMan(ctx, 760, 420, 1.3, 1, { ziek: z * (1 - b) });
    metaText(ctx, 'ZEVENTIG JAAR', 760, 180, C.grain, 'center', 26);
    tijdlijn(ctx, 260, 800, 1400, [[0.04, 'kuur', q.on('antibiotica')], [0.22, 'diarree', z], [0.36, 'kuur', q.on('kuur')], [0.5, 'diarree', q.on('terug')], [0.68, 'donor', d], [0.86, 'beter', b]], q.on('antibiotica'));
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = rgba(C.bruin, 0.8); ctx.lineWidth = 4; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(1212, 740); ctx.quadraticCurveTo(1150, 600, 940, 470); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    vraagteken(ctx, 1560, 360, q.on('Waarom'), 130);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const w = q.on('Water', 1, 0.8), ve = q.on('Vezels', 1, 0.8), ei = q.on('eiwitresten', 1, 0.8), sl = q.on('slijm', 1, 0.8), lang = q.on('anderhalve', 1, 0.8), wt = q.on('terug', 1, 0.8), enz = q.on('enzymen', 2, 0.8), vol = q.on('vol', 1, 1.0), bil = q.on('biljoen', 1, 1.0);
    // dunne darm (klein, links) → dikke darm
    buisPad(ctx, [[120, 330], [260, 420], [180, 520], [330, 600]], 30, 1, V.neutraal, C.fill, { seed: 2, glad: true }); metaText(ctx, 'DUNNE DARM', 120, 290, C.grain, 'left', 22);
    dikkeDarm(ctx, 960, 480, 1, 1, { t, vul: vol }); metaText(ctx, 'DIKKE DARM', 960, 230, C.grain, 'center', 24);
    if (lang > 0.01) tag(ctx, '≈ 1,5 m', 1300, 290, C.text2, lang);
    // wat komt binnen
    const items = [[w, 'water', () => waterMol(ctx, 420, 720, 14, 1)], [ve, 'vezels', () => fiber(ctx, 540, 720, 4, 12, 1, 0)], [ei, 'eiwitresten', () => { for (let k = 0; k < 3; k++) bead(ctx, 760 + k * 26, 720 + (k % 2) * 8, 10, k * 3); }], [sl, 'slijm', () => { ctx.fillStyle = rgba(SLIJM, 0.5); ctx.beginPath(); ctx.ellipse(960, 720, 36, 16, 0, 0, 6.283); ctx.fill(); }]];
    items.forEach(([al, nm, fn], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; fn(); metaText(ctx, nm.toUpperCase(), [420, 590, 790, 960][i], 780, C.grain, 'center', 22); ctx.restore(); } });
    if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; metaText(ctx, 'WAT OVERBLIJFT', 400, 660, C.grain, 'left', 24); ctx.restore(); }
    // water terug: pijltjes de wand uit
    if (wt > 0.01) { ctx.save(); ctx.globalAlpha *= wt * (1 - enz); for (let k = 0; k < 3; k++) arrow(ctx, 1265, 420 + k * 60, 1335, 420 + k * 60, C.teal, 1, 2); waterMol(ctx, 1300, 380, 8, 1); metaText(ctx, 'WATER TERUG', 1360, 490, lighten(C.teal, 0.3), 'left', 22); ctx.restore(); }
    tag(ctx, 'geen eigen enzymen', 1520, 400, C.koraal, enz * (1 - vol));
    tag(ctx, 'wat nog geknipt wordt, doen bacteriën', 1520, 470, BAC1, q.on('bacteriën') * (1 - vol));
    if (bil > 0.01) { ctx.save(); ctx.globalAlpha *= bil; text(ctx, '40 000 000 000 000', 1340, 400, fTitel(44), C.text, 'center'); metaText(ctx, 'ONGEVEER EVENVEEL ALS JE EIGEN CELLEN', 1340, 440, C.grain, 'center', 22); ctx.restore(); }
    tag(ctx, 'honderden soorten · ≈ 200 g', 1340, 530, C.text2, q.on('Honderden'));
  },
  s05(ctx, t, q) { bg(ctx, 'micro');
    const mb = q.on('microbioom', 1, 1.0), kw = q.on('kwijt', 1, 0.8), zk = q.on('ziek', 1, 0.8), bu = q.on('buiten', 1, 1.0), kw2 = q.on('kweken', 1, 0.8), sch = q.on('schaaltje', 1, 0.8), gr = q.on('groeit', 1, 0.8);
    darmwand(ctx, 640, 1, { t, slijm: 1 });
    zwerm(ctx, 200, 200, 1500, 360, 70, t, 1);
    label(ctx, 'microbioom', 'ALLE MICRO-ORGANISMEN SAMEN', 960, 300, 960, 120, mb, C.text, 'center');
    tag(ctx, 'iets wat je kwijt wilt?', 420, 180, C.koraal, kw * (1 - zk));
    tag(ctx, 'je wordt er niet ziek van', 420, 180, C.groen, zk);
    if (bu > 0.01) { ctx.save(); ctx.globalAlpha *= bu; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(0, 570); ctx.lineTo(W, 570); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'IN DE DARMINHOUD EN DE SLIJMLAAG · BUITEN JE WEEFSEL', 760, 555, C.goud, 'center', 22); ctx.restore(); }
    if (kw2 > 0.01) { ctx.save(); ctx.globalAlpha *= kw2; stoof(ctx, 1180, 140, 600, 380, sch); petri(ctx, 1480, 400, 1, 1, { open: 1, groei: 0, t }); metaText(ctx, 'OPEN SCHAALTJE', 1480, 500, C.grain, 'center', 22); ctx.restore(); }
    vraagteken(ctx, 1480, 320, gr, 110);
  },
  s07(ctx, t, q) { bg(ctx, 'micro');
    const lu = q.on('lucht', 1, 0.8), gif = q.on('giftig', 1, 1.0), hoe = q.on('Hoe', 1, 1.0), bl = q.on('bloed', 1, 1.0), rest = q.on('rest', 1, 1.0), di = q.on('Dieper', 1, 1.0), na = q.on('bootst', 1, 1.0);
    darmwand(ctx, 640, 1, { t, slijm: 1, o2: bl });
    // zuurstofmoleculen bij de wand, verdwijnen naar boven
    if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl; for (let k = 0; k < 12; k++) { const h1 = hash(k + 31); const yy = 620 - h1 * 80 - rest * h1 * 60; const wd = wander(k, t, 4, 0.8); ctx.beginPath(); ctx.arc(150 + k * 140 + wd.x, yy + wd.y, 6, 0, 6.283); shape(ctx, rgba(C.teal, 0.8), C.teal, 1); } metaText(ctx, 'O₂ UIT HET BLOED', 1700, 600, lighten(C.teal, 0.3), 'right', 22); ctx.restore(); }
    zwerm(ctx, 200, 200, 1500, 360, 60, t, 1 - hoe * 0.4);
    if (di > 0.01) { ctx.save(); ctx.globalAlpha *= di; metaText(ctx, 'HIER BIJNA GEEN ZUURSTOF', 960, 200, C.grain, 'center', 26); ctx.restore(); }
    // links: het schaaltje met lucht
    if (lu > 0.01 && hoe < 0.5) { ctx.save(); ctx.globalAlpha *= lu * (1 - hoe * 2); petri(ctx, 420, 420, 0.9, 1, { open: 1, groei: 0, t }); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(330 + k * 50, 330 - (k % 2) * 20, 6, 0, 6.283); shape(ctx, rgba(C.teal, 0.8), C.teal, 1); } metaText(ctx, 'LUCHT = ZUURSTOF', 420, 300, lighten(C.teal, 0.3), 'center', 22); ctx.restore(); }
    tag(ctx, 'zuurstof is giftig voor de meeste darmbacteriën', 1200, 180, C.koraal, gif * (1 - na));
    tag(ctx, 'nabootsen: geen zuurstof · 37 °C · licht zuur tot neutraal', 1100, 115, C.groen, na);
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const ie = q.on('iets', 1, 0.8), zij = q.on('Zij', 1, 0.8), jij = q.on('jij', 1, 0.8), mu = q.on('mutualisme', 1, 1.0), gev = q.on('gevaarlijk', 1, 0.8), bord = q.on('bord', 1, 1.0), vast = q.on('vastgesteld', 2, 0.8), wat = q.on('Wat', 1, 0.8);
    if (bord < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - bord);
      // mens links, bacteriën rechts, pijlen heen en weer
      persoon(ctx, 'noor', 480, 780, 430, { uit: 'blij', pose: 'wijs', t }); zwerm(ctx, 1100, 300, 500, 300, 24, t, 1, { s: 1.4 });
      if (zij > 0.01) { arrow(ctx, 640, 480, 1060, 400, C.goud, zij, 3); tag(ctx, 'warme plek · eten', 850, 400, C.goud, zij); }
      if (jij > 0.01) { arrow(ctx, 1060, 560, 640, 620, C.groen, jij, 3); tag(ctx, 'brandstof · bescherming', 850, 660, C.groen, jij); }
      naamBij(ctx, 'mutualisme', 'VOORDEEL VOOR ALLEBEI', 850, 518, mu, 'center', C.text);
      if (gev > 0.01) { ctx.save(); ctx.globalAlpha *= gev; bact(ctx, 1560, 640, 3, 1.5, 0.3, 1); metaText(ctx, 'EEN PAAR KUNNEN GEVAARLIJK WORDEN', 1560, 700, lighten(ZIEK, 0.3), 'center', 20); ctx.restore(); }
      ctx.restore(); }
    bewijsbord(ctx, [[0, '40 biljoen bacteriën leven zonder zuurstof in je dikke darm', vast]], bord);
    vraagteken(ctx, 1700, 860, wat * 0, 80);
  },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'micro');
    const ve = q.on('vezels', 1, 0.8), gn = q.on('geen', 1, 0.8), wel = q.on('wel', 1, 0.8), kn = q.on('knippen', 1, 1.0), cel = q.on('Cellulose', 1, 1.0), za = q.on('zachtere', 1, 1.0), bo = q.on('bonen', 1, 0.8), wi = q.on('winden', 1, 0.8), hoe = q.on('Hoe', 1, 0.8);
    darmwand(ctx, 720, 1, { t, slijm: 1, label: 0 });
    if (cel < 0.5) { fiber(ctx, 300, 330, 8, 18, ve * (1 - cel * 2), 0);
      if (gn > 0.01) { ctx.save(); ctx.globalAlpha *= gn * (1 - cel * 2); schaar(ctx, 260, 230, 1.6, 0.5, C.text2, 1); strike(ctx, 200, 230, 330, C.koraal, gn); metaText(ctx, 'JOUW ENZYMEN', 260, 160, C.grain, 'center', 24); ctx.restore(); }
      if (wel > 0.01) { ctx.save(); ctx.globalAlpha *= wel * (1 - cel * 2); bact(ctx, 760, 420, 2, 3.0, 0, 1); bact(ctx, 880, 380, 0, 2.4, 0.4, 1); schaar(ctx, 700, 330, 1.4, kn > 0.5 ? 0.2 : 0.6, BAC3, 1); metaText(ctx, 'BACTERIE-ENZYMEN', 800, 500, lighten(BAC3, 0.3), 'center', 24); ctx.restore(); }
      if (kn > 0.01) { ctx.save(); ctx.globalAlpha *= kn * (1 - cel * 2); for (let k = 0; k < 6; k++) { const wd = wander(k, t, 7, 0.9); suikertje(ctx, 1050 + k * 52 + wd.x, 340 + (k % 2) * 36 + wd.y, 15, 1); } metaText(ctx, 'LOSSE SUIKERS → BRANDSTOF', 1180, 450, C.grain, 'center', 24); ctx.restore(); } }
    if (cel > 0.01) { ctx.save(); ctx.globalAlpha *= cel; fiber(ctx, 300, 300, 8, 18, 1, 0); tag(ctx, 'cellulose blijft grotendeels heel', 900, 300, V.vezel, 1); ctx.restore(); }
    if (za > 0.01) { ctx.save(); ctx.globalAlpha *= za; fiber(ctx, 300, 480, 5, 16, 1, 0); schaar(ctx, 560, 470, 1.3, 0.3, BAC3, 1); bact(ctx, 680, 500, 2, 2.6, 0, 1); tag(ctx, 'zachtere vezels gaan wel', 1000, 480, BAC3, 1); ctx.restore(); }
    if (bo > 0.01) { ctx.save(); ctx.globalAlpha *= bo; roundRect(ctx, 1340, 420, 300, 90, 24); shape(ctx, rgba(C.oker, 0.3), C.oker, 1.5); for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.ellipse(1385 + k * 30, 465 + (k % 2) * 10, 12, 8, 0.4, 0, 6.283); shape(ctx, rgba(C.bruin, 0.7), C.bruin, 1); } metaText(ctx, 'BORD BONEN', 1490, 550, C.grain, 'center', 24); ctx.restore(); }
    if (wi > 0.01) { for (let k = 0; k < 6; k++) { const u = ((t * 0.25 + k / 6) % 1); gasbel(ctx, 1420 + k * 36, 400 - u * 240, 12 + k * 3, wi * (1 - u)); } }
    vraagteken(ctx, 1760, 260, hoe, 120);
  },
  s11(ctx, t, q) { bg(ctx, 'micro');
    const ana = q.on('anaerobe', 1, 1.0), alv = q.on('alvleesklier', 1, 0.8), en = q.on('energie', 1, 0.8), ko = q.on('koolstofdioxide', 1, 0.8), wa = q.on('waterstof', 1, 0.8), me = q.on('methaan', 1, 1.0), li = q.on('liter', 1, 0.8), ru = q.on('ruik', 1, 0.8), bo = q.on('bonen', 1, 0.8);
    darmwand(ctx, 720, 1, { t, slijm: 1, label: 0 });
    bact(ctx, 620, 440, 2, 4.0, 0, 1); for (let k = 0; k < 3; k++) { const u = (t * 0.3 + k / 3) % 1; suikertje(ctx, 300 + u * 260, 430 + Math.sin(u * 6) * 14, 15, 1 - u * 0.6); }
    if (en > 0.01) { ctx.save(); ctx.globalAlpha *= en; text(ctx, 'energie', 620, 540, fTekst(32, 600), C.goud, 'center'); ctx.restore(); }
    label(ctx, 'anaerobe dissimilatie', 'GISTING · ZONDER ZUURSTOF', 620, 400, 560, 180, ana, C.text, 'center');
    tag(ctx, 'alvleesklier-enzymen: niet hier', 1400, 180, C.koraal, alv * (1 - ko));
    if (ko > 0.01) { for (let k = 0; k < 4; k++) { const u = ((t * 0.22 + k / 4) % 1); gasbel(ctx, 820 + k * 60, 520 - u * 300, 26, ko * (1 - u * 0.7), 'CO₂'); } }
    if (wa > 0.01) { for (let k = 0; k < 4; k++) { const u = ((t * 0.2 + k / 4 + 0.3) % 1); gasbel(ctx, 1080 + k * 60, 520 - u * 300, 22, wa * (1 - u * 0.7), 'H₂'); } }
    if (me > 0.01) { ctx.save(); ctx.globalAlpha *= me; bact(ctx, 1420, 420, 1, 2.6, 0.2, 1); metaText(ctx, 'ARCHAEA', 1420, 480, C.grain, 'center', 22); arrow(ctx, 1300, 360, 1370, 400, C.line, 1, 1.5); gasbel(ctx, 1560, 330, 26, 1, 'CH₄'); metaText(ctx, 'BIJ 1 OP DE 3 MENSEN', 1560, 390, C.grain, 'center', 22); ctx.restore(); }
    tag(ctx, '½ – 1½ liter per dag', 1500, 580, GAS, li * (1 - ru));
    tag(ctx, 'de geur: een beetje zwavelgas uit eiwitresten', 1400, 580, C.oker, ru * (1 - bo));
    tag(ctx, 'bord bonen: meer gisting, meer gas', 1400, 580, C.goud, bo);
  },
  s12(ctx, t, q) { bg(ctx, 'micro');
    const zu = q.on('zure', 1, 1.0), lij = q.on('lijken', 1, 1.0), op = q.on('neemt', 1, 1.0), pr = q.on('procent', 1, 1.0), vit = q.on('vitamines', 1, 1.0), pa = q.on('paard', 1, 1.0), gras = q.on('gras', 1, 0.8), ons = q.on('ons', 1, 0.8), vast = q.on('vastgesteld', 1, 0.8);
    darmwand(ctx, 720, 1, { t, slijm: 1, label: 0 });
    bact(ctx, 420, 420, 2, 3.6, 0, 1);
    if (zu > 0.01) { for (let k = 0; k < 4; k++) { const wd = wander(k, t, 5, 0.8); kortVetzuur(ctx, 560 + k * 110 + wd.x, 410 + wd.y, 3, 2.0, zu); } metaText(ctx, 'KLEINE ZURE STOFFEN', 720, 500, C.grain, 'center', 24); }
    if (lij > 0.01) { ctx.save(); ctx.globalAlpha *= lij; fattyAcid(ctx, 1150, 260, 16, 1.6, 1); metaText(ctx, 'VETZUUR (FILM 3)', 1150, 220, C.grain, 'left', 22); kortVetzuur(ctx, 1150, 380, 3, 2.0, 1); metaText(ctx, 'KORT VETZUUR', 1150, 440, lighten(KVZ, 0.3), 'left', 22); ctx.restore(); }
    if (op > 0.01) { ctx.save(); ctx.globalAlpha *= op; for (let k = 0; k < 3; k++) { const u = (t * 0.3 + k / 3) % 1; kortVetzuur(ctx, 560 + k * 110, 460 + u * 180, 3, 1.6, 1 - u * 0.5); } arrow(ctx, 700, 560, 700, 660, KVZ, 1, 3); tag(ctx, 'brandstof voor de darmwand', 700, 690, KVZ, 1); ctx.restore(); }
    tag(ctx, '5 – 10 % van je energie', 1400, 560, KVZ, pr * (1 - vit));
    if (vit > 0.01 && pa < 0.99) { ctx.save(); ctx.globalAlpha *= vit * (1 - pa); vitamin(ctx, 1290, 540, 18, 1); text(ctx, 'vitamine K', 1330, 552, fTekst(32, 600), C.text, 'left'); metaText(ctx, 'EEN KLEIN DEEL NEEM JE OP', 1400, 610, C.grain, 'center', 22); ctx.restore(); }
    if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; dikkeDarm(ctx, 1580, 320, 0.42, 1, { t, vul: 1 }); metaText(ctx, 'PAARD', 1580, 200, C.grain, 'center', 22); ctx.restore(); }
    tag(ctx, 'reusachtige dikke darm vol bacteriën', 1400, 560, BAC3, pa * (1 - gras));
    tag(ctx, 'cellulose wél grotendeels afgebroken → leeft op gras', 1400, 560, BAC3, gras * (1 - ons));
    tag(ctx, 'bij ons: klein, maar nuttig aandeel', 1400, 560, KVZ, ons);
    bordKlein(ctx, [vast > 0.5 ? 2 : 1, 0, 0], q.on('bord'));
    tag(ctx, 'vastgesteld', 1690, 160, C.groen, vast);
  },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const la = q.on('lactose-intolerantie', 1, 0.8), ve = q.on('vergisten', 1, 0.8), wa = q.on('water', 1, 1.0), ni = q.on('niet', 1, 1.0), di = q.on('diarree', 1, 0.8), ont = q.on('Onthoud', 1, 1.0);
    darmwand(ctx, 720, 1, { t, slijm: 1, label: 0 });
    if (la > 0.01) { for (let k = 0; k < 8; k++) { const wd = wander(k, t, 6, 0.7); const h1 = hash(k + 3); suikertje(ctx, 300 + h1 * 500 + wd.x, 360 + hash(k + 9) * 200 + wd.y, 15, la); } metaText(ctx, 'MELKSUIKER, ONVERTEERD', 550, 300, C.grain, 'center', 24); }
    if (ve > 0.01) { bact(ctx, 460, 560, 2, 2.8, 0, ve); for (let k = 0; k < 4; k++) { const u = ((t * 0.25 + k / 4) % 1); gasbel(ctx, 520 + k * 40, 540 - u * 260, 14, ve * (1 - u)); } tag(ctx, 'gas en krampen', 550, 200, GAS, ve * (1 - wa)); }
    if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; for (let k = 0; k < 6; k++) { const wd = wander(k + 20, t, 4, 0.6); waterMol(ctx, 1120 + (k % 3) * 80 + wd.x, 400 + Math.floor(k / 3) * 80 + wd.y, 13, 1); } suikertje(ctx, 1200, 440, 18, 1); metaText(ctx, 'DE SUIKER HOUDT WATER VAST', 1200, 320, lighten(C.teal, 0.3), 'center', 24); ctx.restore(); }
    if (ni > 0.01) { ctx.save(); ctx.globalAlpha *= ni; for (let k = 0; k < 3; k++) { arrow(ctx, 1120 + k * 80, 560, 1120 + k * 80, 660, C.teal, 0.5, 3); strike(ctx, 1095 + k * 80, 610, 1145 + k * 80, C.koraal, 1); } metaText(ctx, 'WATER GAAT NIET TERUG', 1200, 700, lighten(C.koraal, 0.3), 'center', 24); ctx.restore(); }
    tag(ctx, 'diarree: meer water in de darm dan er wordt teruggenomen', 960, 200, C.koraal, Math.max(di, ont));
  },
  s14(ctx, t, q) { bg(ctx, 'micro');
    const kkv = q.on('korteketenvetzuren', 1, 1.0), az = q.on('azijnzuur', 1, 0.6), pz = q.on('propionzuur', 1, 0.6), bz = q.on('boterzuur', 1, 0.6), br = q.on('brandstof', 1, 1.0), km = q.on('kiemvrije', 1, 1.0), du = q.on('dunner', 1, 1.0), ob = q.on('Obligaat', 1, 1.0), sch = q.on('schaaltje', 1, 0.8);
    darmwand(ctx, 700, 1, { t, slijm: 1, label: 0 });
    label(ctx, 'korteketenvetzuren', 'DRIE BELANGRIJKSTE', 300, 300, 300, 160, kkv, C.text, 'center');
    [['azijnzuur', 2, az], ['propionzuur', 3, pz], ['boterzuur', 4, bz]].forEach(([nm, n, al], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; kortVetzuur(ctx, 180, 360 + i * 70, n, 1.1, 1); text(ctx, nm, 300, 370 + i * 70, fTekst(28, 500), C.text, 'left'); ctx.restore(); } });
    if (br > 0.01) { ctx.save(); ctx.globalAlpha *= br; arrow(ctx, 330, 590, 330, 660, KVZ, 1, 3); metaText(ctx, 'BOTERZUUR → WANDCEL', 330, 690, lighten(KVZ, 0.3), 'center', 22); ctx.restore(); }
    if (km > 0.01) { ctx.save(); ctx.globalAlpha *= km; muis(ctx, 1000, 400, 2.0, 1, BAC2); metaText(ctx, 'KIEMVRIJE MUIS', 1000, 490, C.grain, 'center', 22); muis(ctx, 1400, 400, 2.0, 1, BAC1); for (let k = 0; k < 6; k++) bact(ctx, 1340 + k * 22, 408, k % 3, 0.55, 0, 1); metaText(ctx, 'GEWONE MUIS', 1400, 490, C.grain, 'center', 22); ctx.restore(); }
    if (du > 0.01) { ctx.save(); ctx.globalAlpha *= du; roundRect(ctx, 900, 530, 200, 36, 10); shape(ctx, rgba(WAND, 0.2), WAND, 1.4); roundRect(ctx, 1300, 530, 200, 80, 10); shape(ctx, rgba(WAND, 0.25), WAND, 1.4); metaText(ctx, 'DARMWAND DUNNER', 1000, 640, lighten(C.koraal, 0.3), 'center', 20); ctx.restore(); }
    tag(ctx, 'obligaat anaeroob: zuurstof is giftig', 1300, 240, C.koraal, ob * (1 - sch));
    tag(ctx, 'daarom mislukte het open schaaltje', 1300, 240, C.koraal, sch);
  },

  // ---------- H3 ----------
  s15(ctx, t, q) { bg(ctx, 'schema');
    const ku = q.on('antibioticakuur', 1, 0.8), do_ = q.on('doodt', 1, 0.8), ook = q.on('ook', 1, 1.0), kijk = q.on('Kijk', 1, 1.0), ev = q.on('evenwicht', 1, 0.8), sto = q.on('storten', 1, 1.5), her = q.on('herstelt', 1, 2.0), maan = q.on('maanden', 1, 1.0), cl = q.on('Clostridioides', 1, 1.0), tien = q.on('tien', 1, 1.0), zh = q.on('ziekenhuis', 1, 1.0);
    const u = kijk < 0.99 ? 0.18 : lerp(0.18, 0.4, sto) * (1 - her) + lerp(0.4, 0.95, her) * her;
    if (kijk < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - kijk); zwerm(ctx, 300, 300, 1300, 400, 60, t, 1, { dood: ook * 0.7, s: 2.2 }); pil(ctx, 960, 170, 2.6, ku); if (do_ > 0.01) { tag(ctx, 'doodt bacteriën', 960, 250, AB, do_ * (1 - ook)); tag(ctx, 'ook een groot deel van je darmbacteriën', 960, 250, AB, ook); } ctx.restore(); }
    populaties(ctx, u, kijk, { t, ziek: cl, herstel: 1, uZiek: 0.42 });
    tag(ctx, 'in evenwicht', 420, 240, C.groen, ev * (1 - sto) * kijk);
    tag(ctx, 'sommige soorten komen pas na maanden terug, of niet', 820, 240, C.text2, maan * kijk * (1 - cl));
    if (cl > 0.01) { ctx.save(); ctx.globalAlpha *= cl; bact(ctx, 1700, 150, 3, 2.0, 0.3, 1); text(ctx, 'Clostridioides difficile', 1700, 215, fTekst(28, 600), lighten(ZIEK, 0.3), 'center'); ctx.restore(); }
    tag(ctx, '1 op de 10 draagt hem bij zich', 820, 240, ZIEK, tien * (1 - zh));
    tag(ctx, 'in het ziekenhuis pik je hem makkelijk op', 820, 240, ZIEK, zh);
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const een = q.on('Eén', 1, 0.8), twee = q.on('Twee', 2, 0.8), hoe = q.on('hoe', 1, 0.8), sp = q.on('spore', 1, 1.0), dik = q.on('dikke', 1, 0.8), ont = q.on('ontwaakt', 1, 1.0), res = q.on('Resistentie', 1, 1.0), gif = q.on('gifstoffen', 1, 1.0), onts = q.on('ontstoken', 1, 1.0), dia = q.on('diarree', 1, 0.8), ko = q.on('koorts', 1, 0.8), nk = q.on('nieuwe', 1, 1.0), bl = q.on('blijven', 1, 1.0), nt = q.on('nog', 1, 1.0), terug = q.on('Daarom', 1, 0.8);
    const u = lerp(0.42, 0.7, twee);
    if (gif < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - gif); populaties(ctx, u, 1, { t, ziek: 1, herstel: 0.2 });
      tag(ctx, '1 · ook de gunstige bacteriën dood', 500, 240, AB, een);
      tag(ctx, '2 · geen concurrentie om voedsel en ruimte', 1250, 240, ZIEK, twee);
      if (hoe > 0.01) { ctx.save(); ctx.globalAlpha *= hoe; roundRect(ctx, 1240, 300, 560, 300, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.2); bact(ctx, 1340, 420, 3, 1.6, 0, 1 - sp); bact(ctx, 1340, 420, 4, 1.8, 0, sp); metaText(ctx, 'SPORE', 1340, 480, lighten(ZIEK, 0.3), 'center', 22); if (dik > 0.01) { ctx.save(); ctx.globalAlpha *= dik; pil(ctx, 1480, 360, 1.2, 1); arrow(ctx, 1480, 380, 1400, 410, AB, 1, 2); strike(ctx, 1380, 380, 1430, C.koraal, 1); metaText(ctx, 'KOMT ER NIET DOORHEEN', 1600, 420, C.grain, 'center', 20); ctx.restore(); } if (ont > 0.01) { ctx.save(); ctx.globalAlpha *= ont; arrow(ctx, 1400, 440, 1540, 500, C.line, 1, 2); bact(ctx, 1600, 520, 3, 1.2, 0.2, 1); bact(ctx, 1660, 540, 3, 1.2, 0.5, 1); metaText(ctx, 'ONTWAAKT EN DEELT', 1620, 580, C.grain, 'center', 20); ctx.restore(); } ctx.restore(); }
      tag(ctx, 'resistentie = overleven · niet: sneller groeien', 700, 310, C.text2, res);
      ctx.restore(); }
    if (gif > 0.01 && nk < 0.99) { ctx.save(); ctx.globalAlpha *= gif * (1 - nk); darmwand(ctx, 640, 1, { t, slijm: 0.3, label: 0 });
      for (let k = 0; k < 14; k++) { const wd = wander(k, t, 6, 0.7); bact(ctx, 300 + k * 100 + wd.x, 380 + hash(k) * 120 + wd.y, 3, 1.2, hash(k + 2) * 3, 1); }
      for (let k = 0; k < 10; k++) { const u2 = (t * 0.35 + k / 10) % 1; ctx.beginPath(); ctx.arc(360 + k * 140, 520 + u2 * 110, 5, 0, 6.283); shape(ctx, rgba(C.goud, 0.8), C.goud, 1); }
      metaText(ctx, 'GIFSTOFFEN', 960, 360, lighten(C.goud, 0.2), 'center', 24);
      if (onts > 0.01) { ctx.save(); ctx.globalAlpha *= onts; ctx.fillStyle = rgba(C.koraal, 0.25); ctx.fillRect(0, 640, W, 120); for (let k = 0; k < 5; k++) { arrow(ctx, 500 + k * 220, 700, 500 + k * 220, 600, C.teal, 1, 2.5); } metaText(ctx, 'ONTSTOKEN WAND: NEEMT GEEN WATER TERUG, LEKT VOCHT', 960, 220, lighten(C.koraal, 0.3), 'center', 24); ctx.restore(); }
      tag(ctx, 'diarree', 1500, 300, C.koraal, dia * (1 - ko)); tag(ctx, 'diarree · koorts', 1500, 300, C.koraal, ko);
      ctx.restore(); }
    if (nk > 0.01) { ctx.save(); ctx.globalAlpha *= nk;
      populaties(ctx, lerp(0.7, 0.85, terug), 1, { t, ziek: 1, herstel: 0.15, ab: [0.2, 0.4] });
      pil(ctx, 1100, 160, 1.8, 1); tag(ctx, 'nieuwe kuur', 1100, 240, AB, 1);
      if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl; for (let k = 0; k < 4; k++) bact(ctx, 1420 + k * 60, 170, 4, 1.6, 0.3, 1); metaText(ctx, 'SPOREN BLIJVEN', 1510, 225, lighten(ZIEK, 0.3), 'center', 22); ctx.restore(); }
      tag(ctx, 'gewone bewoners nog niet terug → het komt terug', 700, 310, C.text2, nt);
      ctx.restore(); }
  },
  s18(ctx, t, q) { bg(ctx, 'schema');
    const don = q.on('donor', 1, 0.8), ver = q.on('Verdund', 1, 1.0), sl = q.on('slangetje', 1, 1.0), pt = q.on('poeptransplantatie', 1, 1.0), bew = q.on('bewezen', 1, 1.0), lot = q.on('loting', 1, 1.0), g1 = q.on('alleen', 1, 0.8), g2 = q.on('andere', 1, 0.8), acht = q.on('ruim', 1, 1.0), drie = q.on('drie', 1, 1.0), gest = q.on('gestopt', 1, 1.0), later = q.on('Later', 1, 0.8), vast = q.on('vastgesteld', 1, 1.0), waar = q.on('Waarom', 1, 1.0), bord = q.on('waarschijnlijk', 1, 0.8);
    if (bew < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - bew);
      persoon(ctx, 'sam', 300, 780, 440, { uit: 'blij', t }); metaText(ctx, 'GEZONDE DONOR', 300, 810, lighten(C.groen, 0.2), 'center', 22);
      if (don > 0.01) { ctx.save(); ctx.globalAlpha *= don; roundRect(ctx, 520, 500, 140, 180, 20); shape(ctx, rgba(C.bruin, 0.35), C.bruin, 1.5); for (let k = 0; k < 14; k++) bact(ctx, 545 + hash(k) * 90, 530 + hash(k + 5) * 120, k % 3, 0.5, hash(k + 7) * 3, 1); metaText(ctx, 'ONTLASTING VOL DARMBACTERIËN', 590, 720, C.grain, 'center', 20); ctx.restore(); }
      if (ver > 0.01) { ctx.save(); ctx.globalAlpha *= ver; arrow(ctx, 680, 590, 800, 590, C.line, 1, 2); roundRect(ctx, 820, 520, 90, 140, 16); shape(ctx, rgba(V.neutraal, 0.15), V.neutraal, 1.5); metaText(ctx, 'VERDUND · GEZEEFD', 865, 700, C.grain, 'center', 20); ctx.restore(); }
      if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; bedMan(ctx, 1400, 440, 1.0, 1, { ziek: 0.6 }); ctx.strokeStyle = rgba(C.bruin, 0.9); ctx.lineWidth = 4; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(920, 580); ctx.quadraticCurveTo(1100, 560, 1230, 470); ctx.quadraticCurveTo(1350, 420, 1480, 480); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'VOORBIJ DE MAAG', 1080, 600, C.grain, 'center', 20); ctx.restore(); }
      naamBij(ctx, 'poeptransplantatie', 'DONORBACTERIËN IN DE DARM', 1400, 330, pt, 'center', C.text);
      ctx.restore(); }
    if (bew > 0.01 && vast < 0.99) { ctx.save(); ctx.globalAlpha *= bew * (1 - vast);
      metaText(ctx, 'AMSTERDAMS ONDERZOEK · PATIËNTEN MET EEN TERUGKERENDE INFECTIE', 960, 150, C.grain, 'center', 24);
      if (lot > 0.01) { ctx.save(); ctx.globalAlpha *= lot; for (let k = 0; k < 10; k++) human(ctx, 400 + k * 44, 320, 90, 1, C.mens); text(ctx, 'loting', 960, 310, fTekst(30, 600), C.goud, 'center'); arrow(ctx, 900, 330, 700, 420, C.goud, 1, 2); arrow(ctx, 1020, 330, 1220, 420, C.goud, 1, 2); ctx.restore(); }
      const kol = (x, al, titel, n, tot, nal) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 260, 440, 520, 380, 20); shape(ctx, rgba(C.fill, 0.3), C.line, 1.2); text(ctx, titel, x, 490, fTekst(28, 600), C.text, 'center');
        if (nal > 0.01) { ctx.save(); ctx.globalAlpha *= nal; for (let k = 0; k < tot; k++) { const cx = x - 200 + (k % 5) * 100, cy = 560 + Math.floor(k / 5) * 90; human(ctx, cx, cy + 60, 70, 1, k < n ? C.groen : C.koraal); } text(ctx, `${n} van de ${tot} genezen`, x, 800, fTekst(30, 700), n > 5 ? C.groen : C.koraal, 'center'); ctx.restore(); }
        ctx.restore(); };
      kol(620, g1, 'alleen antibiotica', 3, 10, drie);
      kol(1300, g2, 'korte kuur + poeptransplantatie', 8, 10, acht);
      tag(ctx, 'vroegtijdig gestopt: het verschil was te groot', 960, 210, C.goud, gest * (1 - later));
      tag(ctx, 'later onderzoek vond hetzelfde', 960, 210, C.groen, later);
      ctx.restore(); }
    if (vast > 0.01) { ctx.save(); ctx.globalAlpha *= vast;
      bewijsbord(ctx, [[0, '40 biljoen bacteriën zonder zuurstof', 1], [0, 'vezels → gassen en korte vetzuren', 1], [0, 'poeptransplantatie werkt bij een terugkerende infectie', 1], [1, 'waarom: donorbacteriën nemen plek en voedsel in', bord]], 1);
      tag(ctx, 'dat het werkt', 420, 850, C.groen, 1 - waar); tag(ctx, 'waarom het werkt: de beste verklaring', 960, 850, C.goud, waar);
      ctx.restore(); }
  },
  s19(ctx, t, q) { bg(ctx, 'schema');
    const pro = q.on('probioticum', 1, 1.0), hon = q.on('honderd', 1, 1.0), zev = q.on('Zeventig', 1, 1.0), rec = q.on('reclame', 1, 0.8), wat = q.on('ontbreekt', 1, 0.8);
    bordKlein(ctx, [3, 1, 0], 1);
    metaText(ctx, 'IN WELK VAK?', 960, 160, C.grain, 'center', 26);
    if (pro > 0.01) { ctx.save(); ctx.globalAlpha *= pro; roundRect(ctx, 200, 300, 90, 200, 20); shape(ctx, rgba(C.teal, 0.25), C.teal, 1.5); for (let k = 0; k < 8; k++) bact(ctx, 220 + hash(k) * 50, 330 + hash(k + 4) * 140, k % 2, 0.4, hash(k + 9) * 3, 1); metaText(ctx, 'PROBIOTICUM', 245, 540, C.grain, 'center', 20); metaText(ctx, 'LEVENDE BACTERIËN', 245, 570, C.grain, 'center', 18); ctx.restore(); }
    if (hon > 0.01) { ctx.save(); ctx.globalAlpha *= hon; metaText(ctx, '100 MENSEN · KUUR + DRANKJE', 900, 260, C.grain, 'center', 22); groepStippen(ctx, 560, 300, 100, [C.groen, C.koraal], 680, 5, 14, 1, zev > 0.5 ? 0.7 : 0); ctx.restore(); }
    tag(ctx, '70 van de 100 geen diarree', 900, 540, C.groen, zev * (1 - rec));
    tag(ctx, '"bewezen", zegt de reclame', 900, 540, C.goud, rec);
    vraagteken(ctx, 1600, 420, wat, 120);
  },
  s21(ctx, t, q) { bg(ctx, 'schema');
    const zon = q.on('zónder', 1, 1.0), mis = q.on('Misschien', 1, 0.8), lot = q.on('lot', 1, 1.0), ond = q.on('onderzocht', 1, 1.0), waar = q.on('waarschijnlijk', 1, 0.8), zo = q.on('werkt', 2, 1.0), d1 = q.on('Vastgesteld', 1, 0.8), d2 = q.on('Waarschijnlijk', 2, 0.8), d3 = q.on('Hypothese', 1, 0.8), ov = q.on('overgewicht', 1, 1.0);
    if (zo < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - zo);
      metaText(ctx, 'MET HET DRANKJE', 560, 260, C.grain, 'center', 22); groepStippen(ctx, 240, 300, 100, [C.groen, C.koraal], 640, 5, 13, 1, 0.7);
      if (zon > 0.01) { ctx.save(); ctx.globalAlpha *= zon; metaText(ctx, 'ZONDER HET DRANKJE · DEZELFDE KUUR', 1360, 260, C.grain, 'center', 22); groepStippen(ctx, 1040, 300, 100, [C.groen, C.koraal], 640, 5, 13, 1, mis > 0.5 ? 0.7 : 0); if (mis < 0.5) text(ctx, '?', 1360, 420, fTitel(90), C.goud, 'center'); ctx.restore(); }
      tag(ctx, 'controlegroep', 1360, 540, C.goud, zon * (1 - mis));
      tag(ctx, 'misschien óók 70', 1360, 540, C.goud, mis * (1 - lot));
      tag(ctx, 'het lot bepaalt wie wat krijgt', 1360, 540, C.goud, lot);
      tag(ctx, 'probiotica tegen diarree bij een kuur: soms iets, soms niets', 960, 700, C.text2, ond * (1 - waar));
      tag(ctx, 'op het bord: waarschijnlijk', 960, 700, C.goud, waar);
      ctx.restore(); }
    bewijsbord(ctx, [[0, '40 biljoen bacteriën zonder zuurstof', zo], [0, 'vezels → gassen en korte vetzuren', zo], [0, 'poeptransplantatie bij terugkerende infectie', zo], [1, 'waarom de transplantatie werkt: plek en voedsel', zo], [1, 'probiotica tegen diarree bij een kuur', zo], [2, 'darmbacteriën veroorzaken overgewicht (muis: ja · mens: verband)', ov]], zo, { defs: [['meerdere onderzoeken met controlegroep wijzen dezelfde kant op', d1], ['er is zo\'n onderzoek, maar het effect is klein of niet overal gevonden', d2], ['bij mensen nog niet met een controlegroep getest', d3]] });
  },
  s22(ctx, t, q) { bg(ctx, 'schema');
    const as = q.on('darm-hersen-as', 1, 1.0), st = q.on('stoffen', 1, 1.0), km = q.on('Kiemvrije', 1, 1.0), ged = q.on('verandert', 1, 1.0), dep = q.on('depressie', 1, 1.0), wat = q.on('Wat', 2, 0.8);
    // darm links, hersenen rechts, verbinding
    dikkeDarm(ctx, 420, 520, 0.7, 1, { t, vul: 1 }); metaText(ctx, 'DARM', 420, 300, C.grain, 'center', 22);
    ctx.beginPath(); ctx.ellipse(1400, 450, 150, 110, 0, 0, 6.283); shape(ctx, rgba(C.paars, 0.25), C.paars, 2); ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(1340 + k * 40, 450, 40, 3.5, 5.8); ctx.stroke(); } metaText(ctx, 'HERSENEN', 1400, 600, C.grain, 'center', 22);
    label(ctx, 'darm-hersen-as', 'HYPOTHESE', 900, 400, 900, 200, as, C.text, 'center');
    if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = BLOED; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(700, 560); ctx.lineTo(1000, 560); ctx.lineTo(1250, 480); ctx.stroke(); particleFlow(ctx, [[700, 560], [1000, 560], [1250, 480]], 6, t, 80, C.goud, 5, 2, 1); metaText(ctx, 'STOFFEN VIA BLOED EN ZENUWEN', 980, 610, C.grain, 'center', 20); ctx.restore(); }
    if (km > 0.01) { ctx.save(); ctx.globalAlpha *= km; muis(ctx, 500, 780, 1.1, 1, BAC2); metaText(ctx, 'KIEMVRIJ', 500, 840, C.grain, 'center', 20); muis(ctx, 900, 780, 1.1, 1, BAC1); metaText(ctx, 'MET DARMBACTERIËN', 900, 840, C.grain, 'center', 20); if (ged > 0.01) { tag(ctx, 'ander gedrag', 1300, 790, C.paars, ged); } ctx.restore(); }
    tag(ctx, 'bij mensen: depressie ↔ ander microbioom (een verband)', 960, 240, C.paars, dep * (1 - wat));
    vraagteken(ctx, 1700, 300, wat, 110);
  },
  s24(ctx, t, q) { bg(ctx, 'schema');
    const ve = q.on('verband', 1, 1.0), a = q.on('kan', 1, 0.6), b = q.on('kan', 2, 0.6), eet = q.on('eet', 1, 1.0), pas = q.on('Pas', 1, 0.5), hyp = q.on('hypothese', 1, 0.5), zon = q.on('zonder', 1, 0.5);
    const bx = 500, hx = 1420, y = 450;
    dikkeDarm(ctx, bx, y + 60, 0.6, 1, { t, vul: 1 }); metaText(ctx, 'MICROBIOOM', bx, 270, C.grain, 'center', 22);
    ctx.beginPath(); ctx.ellipse(hx, y, 140, 100, 0, 0, 6.283); shape(ctx, rgba(C.paars, 0.25), C.paars, 2); metaText(ctx, 'STEMMING', hx, 600, C.grain, 'center', 22);
    label(ctx, 'een verband is geen oorzaak', '', 960, 220, 960, 150, ve, C.text, 'center');
    arrow(ctx, 760, y - 30, 1260, y - 30, C.paars, a, 3); if (a > 0.01) tag(ctx, 'a', 1010, y - 70, C.paars, a);
    arrow(ctx, 1260, y + 30, 760, y + 30, C.teal, b, 3); if (b > 0.01) tag(ctx, 'b', 1010, y + 90, C.teal, b);
    if (eet > 0.01) { ctx.save(); ctx.globalAlpha *= eet; broodje(ctx, 1010, 680, 0.7, 1); arrow(ctx, 1300, 560, 1080, 650, C.line, 1, 1.5); arrow(ctx, 940, 650, 700, 560, C.line, 1, 1.5); metaText(ctx, 'EEN DEPRESSIE VERANDERT WAT EN HOE JE EET', 1010, 760, C.grain, 'center', 20); ctx.restore(); }
    tag(ctx, 'beslissen: microbioom veranderen + stemming meten + controlegroep', 960, 840, C.goud, pas * (1 - hyp));
    tag(ctx, 'bij de mens: hypothese', 960, 840, C.paars, hyp * (1 - zon));
    tag(ctx, 'zonder controlegroep geen plek op het bord', 960, 840, C.goud, zon);
  },

  // ---------- Recap ----------
  s25(ctx, t, q) { bg(ctx, 'macro');
    const na = q.on('namen', 1, 1.0), ru = q.on('ruimte', 1, 0.8), ant = q.on('Antwoord', 1, 0.8), vast = q.on('vastgesteld', 1, 0.8), waar = q.on('waarschijnlijk', 1, 0.8);
    bedMan(ctx, 600, 400, 1.1, 1, { ziek: 1 - na });
    roundRect(ctx, 1100, 260, 640, 300, 24); shape(ctx, rgba(C.bgMicro, 0.8), C.line, 1.4); metaText(ctx, 'ZIJN DIKKE DARM', 1420, 300, C.grain, 'center', 22);
    zwerm(ctx, 1140, 330, 560, 190, 36, t, 1, { mixk: na > 0.5 ? [0.4, 0.3, 0.3, 0] : [0, 0, 0.1, 0.9] });
    tag(ctx, 'plek en voedsel weer ingenomen', 1420, 620, C.groen, na * (1 - ru));
    tag(ctx, 'de ziekmaker krijgt geen ruimte', 1420, 620, C.groen, ru);
    refCard(ctx, 'antwoord b', 640, 720, ant);
    tag(ctx, 'dat het werkt: vastgesteld', 1420, 720, C.groen, vast);
    tag(ctx, 'dat dit de reden is: waarschijnlijk', 1420, 790, C.goud, waar);
  },
  s26(ctx, t, q) { bg(ctx, 'schema');
    const ve = q.on('vergist', 1, 1.0), wa = q.on('water', 1, 1.0), on = q.on('ontlasting', 1, 1.0), bru = q.on('bruin', 1, 1.0), der = q.on('derde', 1, 1.0), reis = q.on('reis', 1, 1.0), kn = q.on('Geknipt', 1, 0.8), op = q.on('Opgenomen', 1, 0.8), le = q.on('lever', 1, 0.8), laat = q.on('laatste', 1, 0.8);
    const uitR = Math.min(1, reis * 2), inR = Math.max(0, reis * 2 - 1); if (uitR < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - uitR);
      dikkeDarm(ctx, 760, 480, 1, 1, { t, vul: 1 });
      if (ve > 0.01) { ctx.save(); ctx.globalAlpha *= ve; fiber(ctx, 300, 300, 5, 9, 1, 0); arrow(ctx, 420, 300, 520, 300, C.line, 1, 2); gasbel(ctx, 560, 290, 12, 1); kortVetzuur(ctx, 600, 300, 3, 1, 1); metaText(ctx, 'VEZELS → GAS + KORTE VETZUREN', 470, 350, C.grain, 'center', 20); ctx.restore(); }
      if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; for (let k = 0; k < 3; k++) arrow(ctx, 700 + k * 100, 250, 700 + k * 100, 190, C.teal, 1, 2); metaText(ctx, 'WATER TERUG', 800, 170, lighten(C.teal, 0.3), 'center', 20); ctx.restore(); }
      if (on > 0.01) { ctx.save(); ctx.globalAlpha *= on; roundRect(ctx, 1240, 360, 260, 200, 30); shape(ctx, mix('#C9A35C', '#8C5A3A', bru), rgba('#5A3A22', 0.8), 1.5); metaText(ctx, 'ONTLASTING', 1370, 600, C.grain, 'center', 22); if (der > 0.01) { ctx.save(); ctx.globalAlpha *= der; for (let k = 0; k < 10; k++) bact(ctx, 1270 + hash(k) * 200, 390 + hash(k + 3) * 140, k % 3, 0.5, hash(k + 6) * 3, 1); tag(ctx, '⅓ van de vaste stof is bacteriën', 1370, 660, BAC1, 1); ctx.restore(); } ctx.restore(); }
      tag(ctx, 'bruin door de kleurstof uit film 5', 1370, 300, C.bruin, bru * (1 - der));
      ctx.restore(); }
    if (inR > 0.01) { ctx.save(); ctx.globalAlpha *= inR; const posR = laat > 0.5 ? 6.3 : le > 0.5 ? 4.6 : op > 0.5 ? 4.0 : kn > 0.5 ? 2.5 : 0.3; kanaalKaart(ctx, { a: 1, y: 420, pos: posR }); const stappen = [['geknipt', kn, 2.5], ['opgenomen', op, 4.0], ['langs de lever', le, 4.6], ['opgegeten door je darmbewoners', laat, 6.0]]; const xs = [640, 1000, 1180, 1540], ys = [700, 700, 770, 700]; stappen.forEach(([s, al, p], i) => { if (al > 0.01) tag(ctx, s, xs[i], ys[i], [C.oker, C.teal, LEVER_COL, BAC1][i], al); }); ctx.restore(); }
  }
};
const LEVER_COL = C.bruin;

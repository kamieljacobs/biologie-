// =====================================================================================
// DNA lezen 2.0 (DNA 7/8) — eigen tekenhulpen. 31 okt 2026, beeld-remake op prompt v13 (takes behouden).
// Gedeelde bibliotheek (lib_bio.js, lib_cast.js, dieren/lib_dieren.js) gaat vóór; hier alleen wat er nog niet is.
// Nieuwe objecten met recept (C9) staan in bron/opwaardering-v13.md onder 'Voor de bibliotheek'.
// =====================================================================================
const mic = (ctx) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); };
const sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const nb = (ctx, n, m, x, y, a = 1, al = 'left', kl = C.text) => naamBij(ctx, n, m, x, y, a, al, kl);
const meta = (ctx, s, x, y, al = 'left', kl = C.text2, a = 1, px = 28) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, kl, al, px); ctx.restore(); };
const fade = (t, t0, t1, d = 0.5) => ramp(t, t0, d) * (1 - ramp(t, t1, d));
const tx = (ctx, s, x, y, px, kl = C.text, al = 'center', w = 700, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), kl, al); ctx.restore(); };
const titel = (ctx, s, x, y, px, kl = C.text, al = 'center', a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), kl, al); ctx.restore(); };
const BLOEDK = '#B8463A', BLOEDKR = '#E07A5F';
function kaart(ctx, x, y, w, h, a = 1, rand = C.line, vul = C.fill) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(vul, 0.92), rand, 1.5); ctx.restore(); }
function haak(ctx, x1, x2, y, kl, a = 1, s = '', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x1, y - 12); ctx.lineTo(x1, y); ctx.lineTo(x2, y); ctx.lineTo(x2, y - 12); ctx.stroke(); if (s) text(ctx, s, (x1 + x2) / 2, y + px + 8, fTekst(px, 700), kl, 'center'); ctx.restore(); }
function vinkje(ctx, x, y, s, kl = C.groen, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x - 14 * s, y); ctx.lineTo(x - 4 * s, y + 11 * s); ctx.lineTo(x + 16 * s, y - 12 * s); ctx.stroke(); ctx.restore(); }
function kruisje(ctx, x, y, s, kl = C.koraal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 6 * s; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - 12 * s, y - 12 * s); ctx.lineTo(x + 12 * s, y + 12 * s); ctx.moveTo(x + 12 * s, y - 12 * s); ctx.lineTo(x - 12 * s, y + 12 * s); ctx.stroke(); ctx.restore(); }
function pijlA(ctx, x1, y1, x2, y2, kl = C.line, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.moveTo(x2 - 16 * Math.cos(an - 0.45), y2 - 16 * Math.sin(an - 0.45)); ctx.lineTo(x2, y2); ctx.lineTo(x2 - 16 * Math.cos(an + 0.45), y2 - 16 * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }

// ---------- DNA als rechte strengen (basen = puzzelstaafjes d2Base, ruggengraat d2Rug; palet B) ----------
// Recept: zelfde maat als primerStuk (bp = 34·s, L = 30·s, ruggengraten 2L uit elkaar); bovenste streng basen omlaag, onderste omhoog.
// enkStreng: één streng van n basen vanaf x (links) op hoogte y; dir 1 = basen omlaag, -1 = omhoog. o.kleur (ruggengraat), o.aan(i) 0..1 per base, o.rna.
function enkStreng(ctx, x, y, seq, bp, dir = 1, o = {}) { const { kleur = D2.oud, a = 1, aan = null, rna = false, rand = null, vorm = true } = o; if (a <= 0.01 || !seq.length) return;
  const L = bp * 30 / 34, hw = bp * 0.32, n = seq.length; ctx.save(); ctx.globalAlpha *= a;
  const zicht = (i) => aan ? aan(i) : 1; let i0 = 0, i1 = n - 1; while (i0 < n && zicht(i0) <= 0.01) i0++; while (i1 >= 0 && zicht(i1) <= 0.01) i1--;
  if (i0 <= i1) { ctx.strokeStyle = kleur; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(3, bp * 0.3); if (rand) { ctx.save(); ctx.strokeStyle = rand; ctx.lineWidth += 6; ctx.beginPath(); ctx.moveTo(x + i0 * bp - bp * 0.42, y); ctx.lineTo(x + i1 * bp + bp * 0.42, y); ctx.stroke(); ctx.restore(); }
    ctx.beginPath(); ctx.moveTo(x + i0 * bp - bp * 0.42, y); ctx.lineTo(x + i1 * bp + bp * 0.42, y); ctx.stroke(); }
  for (let i = 0; i < n; i++) { const z = zicht(i); if (z <= 0.01 || seq[i] === ' ') continue; d2Base(ctx, x + i * bp, y, dir > 0 ? Math.PI / 2 : -Math.PI / 2, seq[i], L, hw, { a: z, rna, vorm }); }
  ctx.restore(); }
const COMP = { A: 'T', T: 'A', C: 'G', G: 'C', ' ': ' ' };
const compl = (s) => s.split('').map(b => COMP[b] || b).join('');
// dubbele streng: los 0..1 = strengen uit elkaar (extra afstand sep px)
function dubbelStreng(ctx, x, y, seq, bp, o = {}) { const { los = 0, sep = 120, a = 1, kleurB = D2.oud, kleurO = D2.oud, aanB = null, aanO = null, wiebel = 0, t = 0 } = o; if (a <= 0.01) return;
  const L = bp * 30 / 34, d = ease(los) * sep; const wy = wiebel * Math.sin(t * 2.1) * 4;
  enkStreng(ctx, x, y - d / 2 + wy, seq, bp, 1, { kleur: kleurB, a, aan: aanB }); enkStreng(ctx, x, y + 2 * L + d / 2 - wy, compl(seq), bp, -1, { kleur: kleurO, a, aan: aanO });
  return { boven: y - d / 2, onder: y + 2 * L + d / 2, L }; }

// ---------- forensisch ----------
// Bloeddruppel op glas: ronde kop met een uitloper naar onder (zwaartekracht), donkerrood met lichtere rand (koraal = bloed, C1).
function bloedDruppel(ctx, x, y, r, a = 1, uitloop = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  ctx.moveTo(x - r, y); ctx.bezierCurveTo(x - r, y - r * 1.3, x + r, y - r * 1.3, x + r, y); ctx.bezierCurveTo(x + r, y + r * 0.6, x + r * 0.35, y + r * 0.9, x + r * 0.18, y + r * (1 + 1.4 * uitloop));
  ctx.quadraticCurveTo(x, y + r * (1.25 + 1.5 * uitloop), x - r * 0.18, y + r * (1 + 1.4 * uitloop)); ctx.bezierCurveTo(x - r * 0.35, y + r * 0.9, x - r, y + r * 0.6, x - r, y); ctx.closePath();
  shape(ctx, BLOEDK, BLOEDKR, 1.5); ctx.fillStyle = rgba('#F2F2EE', 0.35); ctx.beginPath(); ctx.ellipse(x - r * 0.35, y - r * 0.35, r * 0.22, r * 0.14, -0.6, 0, 6.283); ctx.fill(); ctx.restore(); }
// Wattenstaafje (± 15 cm, wattenkop ± 5 × 12 mm): steel wit-grijs, kop crème. (x,y) = greep, an = richting naar de kop, len in px.
function wattenstaafje(ctx, x, y, len, an, a = 1, bloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.strokeStyle = '#DCE3EC'; ctx.lineWidth = Math.max(2, len * 0.03); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * 0.9, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(len * 0.94, 0, len * 0.075, len * 0.04, 0, 0, 6.283); shape(ctx, bloed > 0.5 ? '#D9A090' : '#EFE8D8', '#B8B0A0', 1); ctx.restore(); }
// Kapotte ruit (nacht, Macro): kozijn, glas met barsten rond een gat; geeft de plek van de druppels terug.
function ruit(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 26, y - 26, w + 52, h + 52, 6); shape(ctx, '#6E5A46', '#8C7458', 2); ctx.fillStyle = '#2C4462'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = rgba('#AFC0D0', 0.08); ctx.beginPath(); ctx.moveTo(x + w * 0.1, y); ctx.lineTo(x + w * 0.35, y); ctx.lineTo(x + w * 0.05, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h * 0.7); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6E5A46'; ctx.fillRect(x + w / 2 - 9, y, 18, h); ctx.fillRect(x, y + h * 0.42 - 9, w, 18);
  const gx = x + w * 0.76, gy = y + h * 0.66; // gat in de rechter onderruit
  ctx.beginPath(); for (let k = 0; k < 11; k++) { const an = k / 11 * 6.283, r = 34 + 18 * hash(k * 7 + 3); const px = gx + Math.cos(an) * r, py = gy + Math.sin(an) * r * 0.9; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath();
  ctx.fillStyle = '#121A26'; ctx.fill(); ctx.strokeStyle = '#C9D6E2'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = rgba('#C9D6E2', 0.75); ctx.lineWidth = 1.4; for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283 + 0.3, r0 = 46, r1 = 90 + 80 * hash(k * 13); ctx.beginPath(); ctx.moveTo(gx + Math.cos(an) * r0, gy + Math.sin(an) * r0);
    const mx = gx + Math.cos(an + 0.12) * (r0 + r1) / 2, my = gy + Math.sin(an + 0.12) * (r0 + r1) / 2; ctx.lineTo(mx, my); ctx.lineTo(Math.min(x + w - 4, Math.max(x + w / 2 + 12, gx + Math.cos(an) * r1)), Math.min(y + h - 4, Math.max(y + h * 0.42 + 12, gy + Math.sin(an) * r1))); ctx.stroke(); }
  ctx.restore(); return { gat: [gx, gy], druppels: [[gx - 70, gy - 22], [gx - 58, gy + 26], [gx - 86, gy + 8]] }; }
// Profiel als streepjescode: n plekken, elk één of twee banden (lengtes uit seed), zoals de foto van een gel op zijn kant.
function profielCode(ctx, x, y, w, h, seed, a = 1, o = {}) { const { n = 20, kl = '#F2F2EE', bg = '#0D1420', hl = -1, rand = C.line, tel = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 8); shape(ctx, bg, rand, 1.5); const sw = (w - 20) / n;
  for (let i = 0; i < Math.round(n * tel); i++) { const cx = x + 10 + (i + 0.5) * sw; for (let k = 0; k < 2; k++) { if (k === 1 && hash(seed * 31 + i * 7) < 0.18) continue; const u = 0.12 + 0.76 * hash(seed * 17 + i * 3 + k * 101);
      ctx.fillStyle = i === hl ? C.goud : kl; ctx.fillRect(cx - sw * 0.34, y + h * u - 3, sw * 0.68, 6); } }
  ctx.restore(); }
// Dossierkast (archief) met één la; la 0 dicht … 1 open. Map met label erin.
function archiefKast(ctx, x, y, s, la = 0, map = 1, a = 1, label = 'onopgelost') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 260 * s, 400 * s, 8 * s); shape(ctx, '#4A5670', '#6A7894', 2);
  for (let k = 0; k < 3; k++) { const ly = y + (20 + k * 128) * s; if (k === 0) continue; roundRect(ctx, x + 14 * s, ly, 232 * s, 112 * s, 6 * s); shape(ctx, '#56637E', '#6A7894', 1.5); roundRect(ctx, x + 100 * s, ly + 44 * s, 60 * s, 14 * s, 4 * s); shape(ctx, '#8FA0B5', null); }
  const uit = ease(la) * 150 * s, ly = y + 20 * s; // bovenste la schuift naar voren (omlaag in beeld) en wordt groter
  if (map > 0.01) { ctx.save(); ctx.globalAlpha *= map; roundRect(ctx, x + 40 * s, ly - 30 * s + uit * 0.3, 180 * s, 80 * s, 6 * s); shape(ctx, '#C9A35C', '#E0C27A', 1.5);
    text(ctx, label, x + 130 * s, ly + 10 * s + uit * 0.3, fTekst(24 * s, 700), '#2A2014', 'center'); ctx.restore(); }
  roundRect(ctx, x + 14 * s - uit * 0.08, ly + uit, 232 * s + uit * 0.16, 112 * s, 6 * s); shape(ctx, '#5E6C88', '#7A88A4', 1.5); roundRect(ctx, x + 100 * s, ly + 44 * s + uit, 60 * s, 14 * s, 4 * s); shape(ctx, '#8FA0B5', null);
  ctx.restore(); }

// ---------- bloed ----------
// Uitstrijkje als vergroting: veel rode bloedcellen (zonder kern), een paar witte (met kern). Recept: ± 700 rode per witte bloedcel (≈);
// rode 7–8 µm, witte (neutrofiel) 10–12 µm met gelobde kern. Hier dichter bij elkaar gezet en 'vergroot'.
function bloedVeld(ctx, cx, cy, R, t, o = {}) { const { rodeA = 1, witA = 1, n = 44, wit = [[0.25, -0.3], [-0.35, 0.35]] } = o; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.clip();
  ctx.fillStyle = '#3A2026'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  for (let i = 0; i < n; i++) { const u = hash(i * 3 + 1), v = hash(i * 5 + 2); const px = cx + (u - 0.5) * 2 * R, py = cy + (v - 0.5) * 2 * R; if (wit.some(w => Math.hypot(px - cx - w[0] * R, py - cy - w[1] * R) < R * 0.24)) continue;
    const dr = wander(i, t, 4, 0.3); rodeBloedcel(ctx, px + dr.x, py + dr.y, R * 0.11, hash(i * 9) * 6, 0, rodeA); }
  wit.forEach((w, k) => { const dr = wander(90 + k, t, 3, 0.25); witteBloedcellen(ctx, cx + w[0] * R + dr.x, cy + w[1] * R + dr.y, R * 0.16, { soort: 'neutrofiel', t, a: witA, hl: 0 }); });
  ctx.restore(); }

// ---------- virus en testen ----------
// Coronavirus (SARS-CoV-2) — NIEUW (recept C9): bolvormige envelop ± 100 nm, spike-eiwitten ± 20 nm lang (± 1/5 van de diameter),
// knotsvormig (steel + kop van drie delen), ± 25 rondom zichtbaar en loodrecht op de envelop; binnenin RNA (teal ruggengraat, palet B)
// met nucleocapside-eiwit als kralen. Bron: Ke e.a. 2020 (Nature, cryo-ET: ± 26 spikes per virus, 91 nm), CDC-illustratie.
// Bekende fouten: spikes als stekels; spikes scheef of los van de envelop; RNA als DNA-dubbelstreng.
function coronaVirus(ctx, x, y, r, o = {}) { const { a = 1, t = 0, rna = 1, n = 22 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(t * 0.05);
  for (let k = 0; k < n; k++) { const an = k / n * 6.283 + 0.1 * Math.sin(k * 2.3); ctx.save(); ctx.rotate(an); ctx.strokeStyle = '#B9786A'; ctx.lineWidth = r * 0.05; ctx.beginPath(); ctx.moveTo(r * 0.96, 0); ctx.lineTo(r * 1.14, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(r * 1.1, -r * 0.03); ctx.quadraticCurveTo(r * 1.22, -r * 0.12, r * 1.28, -r * 0.07); ctx.quadraticCurveTo(r * 1.32, 0, r * 1.28, r * 0.07); ctx.quadraticCurveTo(r * 1.22, r * 0.12, r * 1.1, r * 0.03); ctx.closePath(); shape(ctx, C.koraal, '#F0A890', 1); ctx.restore(); }
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, '#5A6A84', '#AFC0D0', 2); ctx.beginPath(); ctx.arc(0, 0, r * 0.9, 0, 6.283); ctx.fillStyle = '#26324A'; ctx.fill();
  for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.2; circ(ctx, Math.cos(an) * r * 0.95, Math.sin(an) * r * 0.95, r * 0.035, '#C9B896'); }
  if (rna > 0.01) { ctx.save(); ctx.globalAlpha *= rna; const P = []; for (let i = 0; i <= 60; i++) { const u = i / 60, an = u * 6.283 * 2.2; P.push([Math.cos(an) * r * (0.25 + 0.45 * u) * 0.9, Math.sin(an * 1.1) * r * (0.2 + 0.5 * Math.sin(u * 3.1))]); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(1.5, r * 0.03); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); _rnaTikjes(ctx, P, Math.max(1.5, r * 0.03), { stap: 2, lang: 1.6 });
    for (let i = 4; i < 60; i += 7) circ(ctx, P[i][0], P[i][1], r * 0.05, '#8C9AB2'); ctx.restore(); }
  ctx.restore(); }
// Zelftest (antigeen-sneltest), NIEUW: cassette ± 2 × 7 cm, putje S, venster met controlelijn C en testlijn T. o.lijnT 0..1 (testlijn zichtbaar).
function zelftest(ctx, x, y, s, o = {}) { const { a = 1, lijnC = 1, lijnT = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  roundRect(ctx, -10 * s, -35 * s, 20 * s, 70 * s, 3 * s); shape(ctx, '#E8ECF0', '#AFC0D0', 1.5); roundRect(ctx, -4 * s, -18 * s, 8 * s, 16 * s, 2 * s); shape(ctx, '#F7F7F2', '#AFC0D0', 1);
  ctx.beginPath(); ctx.arc(0, 20 * s, 3.5 * s, 0, 6.283); shape(ctx, '#C8CED6', '#AFC0D0', 1);
  ctx.fillStyle = rgba('#A0285A', lijnC); ctx.fillRect(-3 * s, -14 * s, 6 * s, 1.4 * s); ctx.fillStyle = rgba('#A0285A', lijnT); ctx.fillRect(-3 * s, -7 * s, 6 * s, 1.4 * s);
  text(ctx, 'C', 6 * s, -12.5 * s, fTekst(4 * s, 700), '#5A6478', 'left'); text(ctx, 'T', 6 * s, -5.5 * s, fTekst(4 * s, 700), '#5A6478', 'left'); text(ctx, 'S', 6 * s, 22 * s, fTekst(4 * s, 700), '#5A6478', 'left'); ctx.restore(); }

// ---------- bruinvis ----------
// BRUINVIS (Phocoena phocoena) — NIEUW (recept C9, vorm op _zwemLijf zoals dolfijn): ± 1,5 m; stomp rond kopje zónder snuit (geen
// 'snavel' zoals de tuimelaar), korte gedrongen romp, kleine driehoekige rugvin precies halverwege, kleine ovale borstvinnen dicht
// bij de kop, staartvin horizontaal. Donkergrijze rug, grijze flank, witte buik; donkere streep van mondhoek naar borstvin.
// Bron: Ecomare 'bruinvis', NOAA Fisheries 'Harbor porpoise'. Bijtwonden van de grijze zeehond: Leopold e.a. 2015 (Proc. R. Soc. B).
// Bekende fouten: snuit van een dolfijn; sikkelvormige rugvin; te slank.
function bruinvis(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rot = 0, wonden = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const zw = o.houding === 'recht' ? 0 : 1, fase = t * 2.4, mantel = '#3E4854', flank = '#7A8692', buik = '#E2E6EA', rand = '#9AA6B2';
  const golf = (u) => zw * Math.sin(fase - u * 3.2) * 30 * Math.max(0, u - 0.35) ** 1.5;
  const top = [[0, 10], [0.03, 22], [0.08, 36], [0.18, 50], [0.4, 56], [0.6, 44], [0.78, 22], [0.92, 11], [1, 8]], ond = [[0, 10], [0.04, 20], [0.1, 32], [0.24, 46], [0.42, 50], [0.6, 36], [0.78, 16], [0.92, 8], [1, 7]];
  const Z = _zwemLijf(200, -170, top, ond, golf);
  const [px, py] = Z.pt(1, 0), pa = Z.hoek(1); ctx.save(); ctx.translate(px, py); ctx.rotate(pa + zw * Math.cos(fase - 3.2) * 0.3);
  vul(ctx, [[6, -6], [-24, -8], [-50, -15], [-62, -10], [-52, 0], [-62, 10], [-50, 15], [-24, 8], [6, 6]], mantel, rand, 2); ctx.restore();
  _vin(ctx, Z, 0.46, 54, [[24, 2], [2, -30], [-24, 0]], mantel, rand);
  vul(ctx, Z.O, flank, rand, 2);
  binnen(ctx, Z.O, () => { const T = [], B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; T.push(Z.pt(u, _prof(top, u) * 0.3 - 6)); B.push(Z.pt(u, -_prof(ond, u) * 0.25)); }
    vul(ctx, T.concat([[-300, -120], [320, -120]]), mantel); vul(ctx, B.concat([[-300, 120], [320, 120]]), buik);
    lijn(ctx, [Z.pt(0.03, -2), Z.pt(0.1, -8), Z.pt(0.17, -14)], _A(mantel, 0.8), 5);
    if (wonden > 0.01) { ctx.save(); ctx.globalAlpha *= wonden; for (let k = 0; k < 5; k++) { const p = Z.pt(0.28 + k * 0.035, 8 - (k % 2) * 14); ctx.strokeStyle = '#C0503E'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p[0] - 6, p[1] - 5); ctx.lineTo(p[0] + 6, p[1] + 5); ctx.stroke(); } ctx.restore(); } });
  lijn(ctx, [Z.pt(0, 1), Z.pt(0.035, -1), Z.pt(0.06, 1)], '#2A3038', 2); dierOog(ctx, ...Z.pt(0.09, 8), 4.2, '#1E2226');
  const bg_ = Z.pt(0.15, _prof(top, 0.15) - 2); ctx.beginPath(); ctx.ellipse(bg_[0], bg_[1], 4, 1.6, 0, 0, 6.283); ctx.fillStyle = '#2A3038'; ctx.fill();
  ctx.save(); ctx.translate(...Z.pt(0.2, -20)); vul(ctx, [[10, -4], [-6, 10], [-30, 26], [-38, 22], [-26, 4]], _D(mantel, 0.05), rand, 1.6); ctx.restore();
  ctx.restore(); return { wond: [x + kijk * s * Z.pt(0.33, 0)[0], y + s * Z.pt(0.33, 0)[1]] }; }

// ---------- gel in close-up ----------
// Gel van boven (foto na kleuren): laantjes met banden; banden = lijst [lengte bp] per laan; positie lineair met −log(lengte) (OpenStax 17.1).
// (x, y) = linksboven, w, h; o.loop 0..1 = hoe ver de banden al gelopen zijn; o.min/plus labels; o.namen = tekst onder de laantjes.
function gelBoven(ctx, x, y, w, h, banen, o = {}) { const { a = 1, loop = 1, polen = 1, namen = null, hl = [], bmin = 80, bmax = 1500, foto = 1, laanHl = -1, bandW = null } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, foto > 0.5 ? '#141A24' : '#3A4E66', C.line, 1.5); const n = banen.length, lw = w / n;
  const yb = (bp) => y + 40 + (h - 70) * clamp((Math.log(bmax) - Math.log(bp)) / (Math.log(bmax) - Math.log(bmin)), 0, 1) * loop;
  for (let i = 0; i < n; i++) { const cx = x + (i + 0.5) * lw; ctx.fillStyle = '#0A0E14'; ctx.fillRect(cx - lw * 0.3, y + 18, lw * 0.6, 10);
    if (i === laanHl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2; roundRect(ctx, cx - lw * 0.42, y + 8, lw * 0.84, h - 16, 8); ctx.stroke(); }
    for (const bp of banen[i]) { const by = yb(bp), isHl = hl.some(([li, b]) => li === i && b === bp); ctx.fillStyle = isHl ? C.goud : (foto > 0.5 ? '#F4E3C8' : '#8C7BBF'); ctx.fillRect(cx - (bandW || lw * 0.3), by - 4, (bandW || lw * 0.3) * 2, 8); }
    if (namen && namen[i]) meta(ctx, namen[i], cx, y + h + 34, 'center', C.text2, 1, 24); }
  if (polen > 0.01) { ctx.save(); ctx.globalAlpha *= polen; tx(ctx, '−', x - 34, y + 34, 48, C.text2); tx(ctx, '+', x - 34, y + h - 8, 48, C.koraal); ctx.restore(); }
  ctx.restore(); return { yb, lw }; }

// ---------- schema's DNA-onderzoek ----------
// chromosoompaar als twee staven met gekleurde stukken (gedeelde stukken goud). segs = [[u0, u1], …] (0..1 langs de staaf).
function chromStaaf(ctx, x, y, len, w, kl, segs = [], a = 1, segKl = C.goud, snp = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, len, w / 2); shape(ctx, kl, _mixHex(kl, '#FFFFFF', 0.3), 1.5);
  ctx.save(); roundRect(ctx, x - w / 2, y, w, len, w / 2); ctx.clip(); for (const [u0, u1] of segs) { ctx.fillStyle = segKl; ctx.fillRect(x - w / 2, y + u0 * len, w, (u1 - u0) * len); }
  if (snp > 0.01) { ctx.globalAlpha *= snp; for (let k = 0; k < 40; k++) { const u = (k + 0.5) / 40; ctx.fillStyle = '#121A26'; ctx.fillRect(x - w / 2, y + u * len - 1, w, 2); } } ctx.restore(); ctx.restore(); }
// Stappenbalk voor genetische modificatie (vijf stappen); act = huidige stap (1..5), a = zichtbaarheid
function stappenBalk(ctx, act, a = 1, namen = ['mRNA', 'cDNA', 'knippen', 'plakken', 'in bacteriën']) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x0 = 420, w = 1400, sw = w / 5;
  for (let k = 0; k < 5; k++) { const x = x0 + k * sw, on = k + 1 === Math.round(act), klaar = k + 1 < act - 0.3; roundRect(ctx, x + 6, 40, sw - 12, 64, 12); shape(ctx, on ? rgba(C.goud, 0.22) : rgba(C.fill, 0.8), on ? C.goud : C.line, on ? 2.5 : 1.2);
    text(ctx, (k + 1) + '', x + 34, 84, fTekst(30, 800), on ? C.goud : (klaar ? C.groen : C.text2), 'center'); text(ctx, namen[k], x + 60, 82, fTekst(28, on ? 700 : 600), on ? C.text : C.text2, 'left'); }
  ctx.restore(); }
// Insuline als kralenketen (twee ketens A en B met S-S-bruggen), oker (eiwit) — eenvoudig, zoals eiwitVouw.
function insulineKeten(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = 6 * s;
  for (let i = 0; i < 21; i++) { const px = x + (i - 10) * r * 1.8, py = y - 12 * s + Math.sin(i * 0.9) * 3 * s; circ(ctx, px, py, r, '#C9A35C', '#E0C27A', 1); }
  for (let i = 0; i < 30; i++) { const px = x + (i - 15) * r * 1.8, py = y + 12 * s + Math.cos(i * 0.8) * 3 * s; circ(ctx, px, py, r, '#B08A5C', '#D0AE7E', 1); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 2 * s; for (const k of [-4, 3]) { ctx.beginPath(); ctx.moveTo(x + k * r * 1.8, y - 6 * s); ctx.lineTo(x + k * r * 1.8, y + 6 * s); ctx.stroke(); } ctx.restore(); }
// Sikkelcel: rode bloedcel als halve maan (HbS polymeriseert bij weinig zuurstof). Recept: Wikipedia 'Sickle cell disease' (bloedbeeld), ± 7 µm lang.
function sikkelCel(ctx, x, y, r, an = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(-r * 1.3, 0); ctx.quadraticCurveTo(0, -r * 1.3, r * 1.3, 0); ctx.quadraticCurveTo(r * 0.9, -r * 0.1, r * 1.0, r * 0.12); ctx.quadraticCurveTo(0, -r * 0.55, -r * 1.0, r * 0.12); ctx.quadraticCurveTo(-r * 0.9, -r * 0.1, -r * 1.3, 0); ctx.closePath();
  shape(ctx, '#B8463A', '#E07A5F', 1.5); ctx.restore(); }
// Bloedbuisje (vacuümbuis ± 10 ml): stop, etiket, bloed. (x,y) = midden onder.
function bloedBuis(ctx, x, y, s, a = 1, vol = 0.7, stopKl = '#8C7BBF') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 16 * s, h = 100 * s;
  roundRect(ctx, x - w / 2, y - h, w, h, w / 2); shape(ctx, rgba('#DCE3EC', 0.25), '#AFC0D0', 1.5); ctx.save(); roundRect(ctx, x - w / 2, y - h, w, h, w / 2); ctx.clip(); ctx.fillStyle = BLOEDK; ctx.fillRect(x - w / 2, y - h * vol, w, h * vol); ctx.restore();
  roundRect(ctx, x - w / 2 - 2 * s, y - h - 14 * s, w + 4 * s, 18 * s, 3 * s); shape(ctx, stopKl, null); ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fillRect(x - w / 2, y - h * 0.62, w, h * 0.3); ctx.restore(); }
// exacte cue: woord n-de keer precies gelijk (q.at zoekt een stukje van een woord; 'G' of 'Na' zit ook in langere woorden)
function wt(id, w, n = 1) { const s = (typeof DATA !== 'undefined') && DATA.segments.find(x => x.id === id); if (!s) return Infinity; const nm = (v) => v.toLowerCase().replace(/[^a-zà-ÿ0-9]/g, ''), nw = nm(w); let c = 0;
  for (const x of s.words || []) if (nm(x.t) === nw && ++c === n) return x.s; return Infinity; }

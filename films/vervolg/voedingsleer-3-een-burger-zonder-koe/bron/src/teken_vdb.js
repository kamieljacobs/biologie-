// Wat word jij? · Voeding en diëtetiek 3 · Een burger zonder koe — eigen tekeningen (31 okt 2026)
// Laadvolgorde (bouw.sh): scenes.js r.1–32, brein, teken, extra, decor_proeffabriek.js, hoefpop.js (koe7-pop), koe_vdb.js (rassen uit Fokken + vleesrund), dit bestand, scenes_vdb.js.
// Seriekleuren: oker = eiwit en voedsel, groen = plantaardig, koraal = dierlijk en hitte, teal = water en pH (ook koele uitgang), goud = focus (beperkend aminozuur).
// Cast: Noor (stagiair, in de fabriek labjas + haarnetje via een eigen garderobe hieronder, lib_cast ongewijzigd), Levensmiddelentechnoloog Lars (outfit 'fabriek').

// ---------- decor ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const GROND = 860;
// Noor in de proeffabriek: labjas, veiligheidsbril én haarnetje (hygiëne), als eigen garderobe-object (lib_cast.js zelf blijft ongewijzigd)
if (typeof CAST !== 'undefined' && CAST.noor) CAST.noor.garderobe.fabriek = Object.assign({}, CAST.noor.garderobe.practicum, { accessoire: ['oorbel', 'haarnet'] });

// ---------- algemene hulpjes (zoals gz3/lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(28, 700); const ww = w || ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 58, 12); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 17); ctx.lineTo(x + 50, y + 29); ctx.lineTo(x + 26, y + 41); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 64, y + 39, fTekst(28, 700), C.text, 'left'); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
const _lt = (h, k = 0.25) => _mixHex(h, '#FFFFFF', k), _dk = (h, k = 0.25) => _mixHex(h, '#000000', k);
// korte tekst in een pil (eigen kleur), centrum x, basislijn y
function pil(ctx, s2, x, y, col, a = 1, px = 30, vul = 0.18) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s2).width + 36; roundRect(ctx, x - w / 2, y - px - 4, w, px + 20, 12); shape(ctx, rgba(col, vul), col, 2); text(ctx, s2, x, y, fTekst(px, 700), C.text, 'center'); ctx.restore(); return w; }

// ---------- KIP (kipEcht uit bibliotheek/lib_bio.js, goedgekeurd; letterlijk overgenomen met bioPad en hulpjes) ----------
function bioPad(ctx, pts, closed = false) { const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]; const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (closed) ctx.closePath(); }
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#B5653A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const donker = _bioDonker(kleur, 0.3), licht = _lt(kleur, 0.18), poot = '#E2B64A', pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6;
  ctx.strokeStyle = poot; ctx.lineWidth = 7; [[-6, 52], [22, 52]].forEach(([px, py]) => { ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2, py + 54); ctx.stroke(); ctx.lineWidth = 4; [[-22, 6], [0, 10], [20, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px + 2 + dx, py + 54 + dy); ctx.stroke(); }); });
  ctx.beginPath(); bioPad(ctx, [[-120, -78], [-104, -128], [-78, -150], [-64, -112], [-56, -60]], true); shape(ctx, _bioDonker(kleur, 0.45), null);
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null);
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  ctx.save(); ctx.translate(76, -64); ctx.rotate(pik * 0.02);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null);
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null);
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null);
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill();
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill();
  _bioCirc(ctx, 30, -70, 4.2, '#E8A040'); _bioCirc(ctx, 31, -70, 2.2, '#121A26');
  ctx.restore(); ctx.restore(); }

// ---------- burgers, bordjes, erwten ----------
function bordje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 130 * s, 26 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2); ctx.beginPath(); ctx.ellipse(x, y - 3 * s, 92 * s, 15 * s, 0, 0, 6.283); ctx.strokeStyle = '#B8C0CA'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
// burger zonder broodje (zoals hij uit de fabriek komt): schijf in zijaanzicht, soort 'ham' (rundvlees) of 'erwt'
function burger(ctx, x, y, s = 1, soort = 'ham', a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kl = soort === 'ham' ? ['#8A4E36', '#6E3C2A', '#A8664A'] : ['#B9A55A', '#97853F', '#D2C07A'];
  ctx.beginPath(); ctx.ellipse(0, -10, 96, 24, 0, 0, Math.PI); ctx.lineTo(-96, -38); ctx.ellipse(0, -38, 96, 24, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, kl[1], null);
  ctx.beginPath(); ctx.ellipse(0, -38, 96, 24, 0, 0, 6.283); shape(ctx, kl[0], null);
  ctx.strokeStyle = rgba(kl[2], 0.8); ctx.lineWidth = 3; ctx.lineCap = 'round'; // grillstrepen / structuur
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(-60 + i * 8 + i * 22, -48); ctx.lineTo(-30 + i * 8 + i * 22, -26); ctx.stroke(); }
  if (soort === 'erwt') { ctx.fillStyle = rgba('#7FC48F', 0.7); [[-50, -40], [20, -34], [52, -44], [-12, -46]].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px, py, 4, 0, 6.283); ctx.fill(); }); }
  ctx.restore(); }
function erwtjes(ctx, x, y, n = 7, r = 11, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const px = x + (hash(i * 3.1) - 0.5) * r * 6, py = y - (hash(i * 5.7)) * r * 1.6; ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); shape(ctx, '#E2C45A', '#F2DC8A', 1.5); ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.beginPath(); ctx.arc(px - r * 0.35, py - r * 0.35, r * 0.3, 0, 6.283); ctx.fill(); } ctx.restore(); }
// etiketje (oker): papiertje met één regel
function etiketje(ctx, x, y, s2, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2).width + 44; ctx.letterSpacing = '0px';
  roundRect(ctx, x - w / 2, y - 44, w, 60, 8); shape(ctx, '#F2EEE4', col, 3); metaText(ctx, s2, x, y - 4, '#3A2E1A', 'center', 28); ctx.restore(); }
// werktafel van roestvrij staal (voorgrond): blad op y, poten tot GROND
function rvsTafel(ctx, x0, x1, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7E8A9C'; for (const px of [x0 + 30, x1 - 44]) ctx.fillRect(px, y + 20, 14, GROND - y - 20); ctx.fillStyle = '#6A7688'; ctx.fillRect(x0 + 30, GROND - 90, x1 - x0 - 60, 10);
  roundRect(ctx, x0, y, x1 - x0, 24, 4); shape(ctx, '#B8C2CE', '#D8DEE6', 2); ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fillRect(x0 + 10, y + 4, x1 - x0 - 20, 4); ctx.restore(); }

// ---------- ontwerpblad (doorlopend diagram; alleen aan het eind van een hoofdstuk en in de recap) ----------
const BLAD_RIJ = ['GRONDSTOF', 'MENGSEL', 'BEWERKING', 'ERBIJ'];
// o: a, versie, vak[4] = tekst of null ('?'), sub[4] (alleen groot), hl = index die oplicht, hlA, vink (0..1), groot
function ontwerpblad(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const groot = !!o.groot, rh = groot ? 128 : 74, kop = groot ? 90 : 70, h = kop + 4 * rh + 20, lw = groot ? 290 : 230;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2EEE4', '#C9B896', 3);
  metaText(ctx, 'ONTWERPBLAD', x + 26, y + (groot ? 56 : 46), '#5A4A30', 'left', 28);
  if (o.versie) { const va = o.versieA == null ? 1 : o.versieA; ctx.save(); ctx.globalAlpha *= va; text(ctx, o.versie, x + w - 26 - (o.vink ? 52 : 0), y + (groot ? 60 : 50), fTekst(groot ? 40 : 32, 800), '#1A2740', 'right'); ctx.restore(); if (o.vink > 0.01) vink_(ctx, x + w - 44, y + (groot ? 44 : 36), 16, o.vink, '#3E8A52'); }
  for (let i = 0; i < 4; i++) { const ry = y + kop + i * rh; ctx.strokeStyle = '#D2C8B4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 18, ry); ctx.lineTo(x + w - 18, ry); ctx.stroke();
    const hl = o.hl === i ? (o.hlA == null ? 1 : o.hlA) : 0; if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x + 10, ry + 6, w - 20, rh - 12, 10); ctx.fillStyle = rgba(C.goud, 0.35); ctx.fill(); ctx.strokeStyle = '#B88A1E'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    metaText(ctx, BLAD_RIJ[i], x + 28, ry + (groot ? 52 : rh / 2 + 10), '#6A5A40', 'left', 28);
    const v = o.vak ? o.vak[i] : null, va = o.vakA ? o.vakA[i] : 1;
    if (v && va > 0.01) { ctx.save(); ctx.globalAlpha *= va; text(ctx, v, x + lw, ry + (groot ? 54 : rh / 2 + 12), fTekst(groot ? 40 : 32, 800), '#1A2740', 'left'); if (groot && o.sub && o.sub[i]) metaText(ctx, o.sub[i], x + lw, ry + 100, '#6A5A40', 'left', 28); ctx.restore(); }
    else text(ctx, '?', x + lw, ry + (groot ? 60 : rh / 2 + 14), fTitel(groot ? 48 : 38), '#B8A888', 'left'); }
  ctx.restore(); return h; }
// kaartje dat in een vak schuift (bv. 'ERWT')
function vakKaartje(ctx, x, y, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(32, 800); const w = ctx.measureText(s2).width + 40; roundRect(ctx, x - w / 2, y - 40, w, 58, 10); shape(ctx, col, _lt(col, 0.35), 2); text(ctx, s2, x, y, fTekst(32, 800), '#121A26', 'center'); ctx.restore(); }

// ---------- H1: blokjes eiwit, bakken, akkers ----------
function blokje(ctx, x, y, s = 20, col = C.oker, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - s / 2, y - s / 2, s, s, 4); shape(ctx, col, _lt(col, 0.35), 1.2); ctx.restore(); }
// bak (open van boven, schuine wanden); x,y = linksboven, w, h
function bak(ctx, x, y, w, h, a = 1, col = '#AFC0D0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 16, y + h); ctx.lineTo(x + w - 16, y + h); ctx.lineTo(x + w, y); ctx.fillStyle = rgba('#2A3A58', 0.55); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); }
// positie van blokje i in een 10 × 10-raster in een bak
const BLOKPOS = (bx, by, i, g = 32) => [bx + 34 + (i % 10) * g, by + 30 + Math.floor(i / 10) * g];
function staafNL(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 60, wd = w * 0.57 * u, wp = w * 0.43 * u;
  roundRect(ctx, x, y, wd, h, 8); shape(ctx, rgba(C.koraal, 0.55), C.koraal, 2); roundRect(ctx, x + w * 0.57, y, wp, h, 8); shape(ctx, rgba(C.groen, 0.5), C.groen, 2);
  if (u > 0.9) { text(ctx, '± 57 % dierlijk', x + 20, y + 42, fTekst(32, 800), C.text, 'left'); text(ctx, '43 % plantaardig', x + w - 20, y + 42, fTekst(32, 800), C.text, 'right'); } ctx.restore(); }
function akker(ctx, x, y, w, h, col, a = 1, u = 1, plant = 'erwt') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ww = w * u; roundRect(ctx, x, y, ww, h, 6); shape(ctx, rgba(col, 0.28), col, 2.5);
  ctx.save(); roundRect(ctx, x, y, ww, h, 6); ctx.clip(); ctx.strokeStyle = rgba(col, 0.45); ctx.lineWidth = 2; for (let yy = y + 18; yy < y + h; yy += 22) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + ww, yy); ctx.stroke(); } ctx.restore(); ctx.restore(); }
// gras (pollen) in de wei
function grasPol(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#6FA86A'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(x + i * 3 * s, y); ctx.quadraticCurveTo(x + i * 6 * s, y - 18 * s, x + i * 9 * s, y - (26 + (i % 2) * 8) * s); ctx.stroke(); } ctx.restore(); }
function wei(ctx, x0, x1, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#2F4A3A', 0.7); roundRect(ctx, x0, y, x1 - x0, 26, 10); ctx.fill(); for (let x = x0 + 20; x < x1 - 10; x += 46) grasPol(ctx, x + hash(x) * 14, y + 6, 0.9); ctx.restore(); }

// ---------- H2: aminozuren ----------
// negen essentiële aminozuren, elk een eigen gedempte tint; 4 = methionine, 3 = lysine
const AA9 = ['#D8826A', '#E2B85A', '#7FC48F', '#5BA4C9', '#E6E0C8', '#C9A35C', '#8FB8A8', '#D9A0A8', '#A7B86A'];
const AA_NAAM = ['his', 'ile', 'leu', 'lys', 'met', 'phe', 'thr', 'trp', 'val'];
const AA_NIET = '#5E6A80'; // niet-essentieel
function kraal(ctx, x, y, r, k, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = k < 0 ? AA_NIET : AA9[k]; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, col, hl > 0.5 ? C.goud : _lt(col, 0.4), hl > 0.5 ? 4 : 1.5); ctx.restore(); }
// keten langs punten; kinds: index in AA9 of −1; o.hlK = kraalsoort die goud omrand wordt
function keten(ctx, pts, kinds, r = 15, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = Math.min(pts.length, o.upto == null ? pts.length : o.upto);
  ctx.strokeStyle = o.lijn || '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i < n; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke();
  for (let i = 0; i < n; i++) kraal(ctx, pts[i][0], pts[i][1], r, kinds[i % kinds.length], 1, o.hlK != null && kinds[i % kinds.length] === o.hlK ? 1 : 0); ctx.restore(); }
// rechte golvende keten
const golfPad = (x, y, n, step = 34, amp = 14, f = 0.9, t = 0) => Array.from({ length: n }, (_, i) => [x + i * step, y + Math.sin(i * f + t * 0.8) * amp]);
// kluwen ↔ open keten: u = 0 kluwen, 1 open
function kluwenPad(cx, cy, n, R, u, x0, y0, step, t = 0) { return Array.from({ length: n }, (_, i) => { const an = i * 2.39996, rr = R * Math.sqrt((i + 0.5) / n); const kx = cx + Math.cos(an) * rr + Math.sin(t * 0.7 + i) * 2, ky = cy + Math.sin(an) * rr * 0.8;
  const ox = x0 + i * step, oy = y0 + Math.sin(i * 0.8 + t * 0.6) * 18; const ui = ease(clamp(u * 1.4 - (i / n) * 0.4, 0, 1)); return [lerp(kx, ox, ui), lerp(ky, oy, ui)]; }); }
// samenstelling (vereenvoudigd, schematisch): rund heeft van alles genoeg; erwt weinig methionine; tarwe weinig lysine
const KET_RUND = [2, -1, 4, 3, 0, -1, 2, 8, 1, 4, -1, 5, 6, 3, -1, 7, 2, 4, 8, -1, 1, 3, 0, 6];
const KET_ERWT = [2, -1, 3, 0, 3, -1, 2, 8, 1, 5, -1, 3, 6, 2, -1, 7, 3, 4, 8, -1, 1, 3, 0, 6];
const VUL_ERWT = [0.95, 0.9, 0.95, 1, 0.42, 0.95, 0.9, 0.85, 0.92], VUL_TARWE = [0.9, 0.85, 0.95, 0.4, 0.95, 0.95, 0.8, 0.9, 0.85], VUL_SAMEN = [0.95, 0.92, 0.97, 0.92, 0.88, 0.97, 0.9, 0.9, 0.92];
// maatbeker (lijntekening, vloeistof als vlak); hl = goud omranden
function beker(ctx, x, yb, w, h, frac, col, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const f = clamp(frac, 0, 1);
  if (f > 0.005) { roundRect(ctx, x + 4, yb - h * f, w - 8, h * f - 4, 4); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); }
  ctx.strokeStyle = hl > 0.5 ? C.goud : '#AFC0D0'; ctx.lineWidth = hl > 0.5 ? 4 : 2.5; ctx.beginPath(); ctx.moveTo(x, yb - h - 6); ctx.lineTo(x, yb); ctx.lineTo(x + w, yb); ctx.lineTo(x + w, yb - h - 6); ctx.stroke();
  ctx.strokeStyle = rgba('#AFC0D0', 0.6); ctx.lineWidth = 1.5; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x, yb - h * k / 4); ctx.lineTo(x + 10, yb - h * k / 4); ctx.stroke(); } ctx.restore(); }
function bekerRij(ctx, x, yb, vul, a = 1, o = {}) { const w = o.w || 56, gap = o.gap || 74, h = o.h || 170; for (let i = 0; i < 9; i++) { beker(ctx, x + i * gap, yb, w, h, vul[i] * (o.u == null ? 1 : o.u), AA9[i], a, o.hl === i ? 1 : 0); } if (o.lijn) stippel(ctx, x - 10, yb - h * o.lijn, x + 8 * gap + w + 10, yb - h * o.lijn, C.goud, a * (o.lijnA == null ? 1 : o.lijnA), 2.5); }
// DIAAS-staaf met bereik (lo–hi); y-as 0..120
function diaasStaaf(ctx, x, yb, w, hpx, lo, hi, col, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = hpx / 120, hl = lo * k * u, hh = hi * k * u;
  roundRect(ctx, x, yb - hl, w, hl, 6); shape(ctx, rgba(col, 0.55), col, 2.5);
  if (hi > lo) { roundRect(ctx, x, yb - hh, w, hh - hl, 6); ctx.setLineDash([9, 7]); shape(ctx, rgba(col, 0.18), col, 2.5); ctx.setLineDash([]); } ctx.restore(); }
// erwt in doorsnede (zaad: zaadhuid, twee zaadlobben met zetmeelkorrels, eiwitlichaampjes en celwanden)
function erwtDoorsnede(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#C9B45A', '#E2D08A', 4);
  ctx.beginPath(); ctx.arc(x, y, r - 10, 0, 6.283); ctx.fillStyle = '#EDE0A8'; ctx.fill(); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba(C.groen, 0.55 + 0.4 * (o.vezel || 0)); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const px = x - r + hash(i * 1.7) * 2 * r, py = y - r + hash(i * 2.9) * 2 * r; ctx.beginPath(); ctx.ellipse(px, py, 34, 26, hash(i) * 3, 0, 6.283); ctx.stroke(); } // celwanden = vezels
  for (let i = 0; i < 70; i++) { const an = hash(i * 3.3) * 6.283, rr = Math.sqrt(hash(i * 7.1)) * (r - 18); ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, 11, 8, an, 0, 6.283); ctx.fillStyle = _mixHex('#F6F0DA', '#FFFFFF', o.zetmeel || 0); ctx.fill(); ctx.strokeStyle = rgba('#B8A870', 0.7); ctx.lineWidth = 1; ctx.stroke(); } // zetmeelkorrels
  for (let i = 0; i < 46; i++) { const an = hash(i * 5.9 + 1) * 6.283, rr = Math.sqrt(hash(i * 2.3 + 4)) * (r - 16); ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, 5.5, 0, 6.283); ctx.fillStyle = o.eiwit > 0.5 ? C.oker : _dk(C.oker, 0.05); ctx.fill(); if (o.eiwit > 0.5) { ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.stroke(); } } // eiwitlichaampjes
  ctx.strokeStyle = rgba('#8A7A3A', 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - r * 0.1, y - r + 10); ctx.quadraticCurveTo(x + r * 0.08, y, x - r * 0.05, y + r - 10); ctx.stroke(); // naad tussen de zaadlobben
  ctx.restore(); ctx.restore(); }
// hele erwt en boon (peulvruchten) met een eiwitschaartje dat geremd wordt
function heleErwt(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#E2C45A', '#F2DC8A', 2); ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.28, 0, 6.283); ctx.fill(); ctx.restore(); }
function boon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, -6); ctx.bezierCurveTo(-50, -40, 46, -46, 52, -10); ctx.bezierCurveTo(56, 22, 20, 34, 6, 18); ctx.bezierCurveTo(-4, 8, -14, 30, -30, 26); ctx.bezierCurveTo(-46, 22, -50, 10, -50, -6); ctx.closePath(); shape(ctx, '#B0503C', '#D0705A', 2);
  ctx.beginPath(); ctx.ellipse(2, 12, 10, 4, 0.3, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill(); ctx.restore(); }
function remmer(ctx, x, y, s = 16, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -s / 2, -s / 2, s, s, 3); shape(ctx, '#4E9A5E', '#9FD8A8', 1.5); ctx.restore(); }
// eiwitschaar (enzym) met een remmer erin vast
function geremdeSchaar(ctx, x, y, s = 1, a = 1, rem = 1, t = 0) { if (a <= 0.01) return; const open = rem > 0.5 ? 0.15 : 0.5 + 0.45 * Math.sin(t * 6); schaar(ctx, x, y, s * 1.4, open, C.text, a); remmer(ctx, x + 36 * s, y, 16 * s, a * rem, 0.3); }
// darmwand in doorsnede (voor zoomcirkel): links darminhoud, midden wand, rechts bloedvat
function darmWandZoom(ctx, cx, cy, r, t, a = 1, o = {}) { const xw = cx - 30; ctx.fillStyle = '#2B3448'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = 0; i < 7; i++) { const yy = cy - r + i * (2 * r / 7); roundRect(ctx, xw, yy + 3, 54, 2 * r / 7 - 6, 8); shape(ctx, '#C98E86', '#E8B2A8', 1.5); circ(ctx, xw + 34, yy + r / 7, 7, '#8C5A6E'); }
  roundRect(ctx, cx + 60, cy - r, 70, 2 * r, 30); shape(ctx, rgba(C.koraal, 0.4), C.koraal, 2);
  const n = o.n || 14; for (let i = 0; i < n; i++) { const opgenomen = hash(i * 4.7) < (o.frac == null ? 0.7 : o.frac), ph = ((t * 0.18 + hash(i * 2.1)) % 1); let px, py;
    if (opgenomen) { px = cx - r + ph * (2 * r - 40); py = cy - r * 0.8 + hash(i * 9.3) * r * 1.6; } else { px = cx - r + 30 + Math.min(ph, 0.45) * 2 * r * 0.5; py = cy - r * 0.8 + hash(i * 9.3) * r * 1.6 + ph * 60; }
    kraal(ctx, px, py, 10, i % 9, opgenomen ? 1 : 0.9); if (!opgenomen && o.markeer > 0.01) { ctx.save(); ctx.globalAlpha *= o.markeer; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px, py, 15, 0, 6.283); ctx.stroke(); ctx.restore(); } } }
// tarwe-aar
function tarweAar(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, -40); ctx.stroke();
  for (let i = 0; i < 6; i++) for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 10, -30 + i * 14, 9, 14, d * 0.5, 0, 6.283); shape(ctx, '#E2C47A', '#C9A35C', 1.5); ctx.strokeStyle = '#E2C47A'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(d * 14, -40 + i * 14); ctx.lineTo(d * 30, -60 + i * 14); ctx.stroke(); } ctx.restore(); }
// schep met poeder
function schep(ctx, x, y, s = 1, col = C.oker, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#9AA6B6'; ctx.fillRect(30, -6, 70, 12); ctx.beginPath(); ctx.ellipse(0, 0, 36, 20, 0, 0, Math.PI); ctx.lineTo(-36, -4); ctx.lineTo(36, -4); shape(ctx, '#B8C2CE', '#D8DEE6', 2); ctx.beginPath(); ctx.ellipse(0, -4, 34, 10, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// poederhoop
function hoop(ctx, x, y, w, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.quadraticCurveTo(x - w * 0.2, y - h * 1.1, x, y - h); ctx.quadraticCurveTo(x + w * 0.2, y - h * 1.1, x + w / 2, y); ctx.closePath(); shape(ctx, col, _lt(col, 0.3), 2); ctx.restore(); }
// weegschaaltje (balans) met twee schalen; k = −1..1 helling
function balans(ctx, x, y, s = 1, a = 1, k = 0, links = null, rechts = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 150); ctx.moveTo(-60, 150); ctx.lineTo(60, 150); ctx.stroke(); const an = k * 0.18; ctx.save(); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(170, 0); ctx.stroke(); ctx.restore();
  for (const d of [-1, 1]) { const px = d * 170 * Math.cos(an), py = d * 170 * Math.sin(an); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 50, py + 70); ctx.moveTo(px, py); ctx.lineTo(px + 50, py + 70); ctx.stroke(); ctx.beginPath(); ctx.ellipse(px, py + 72, 64, 14, 0, 0, Math.PI); shape(ctx, '#6A7688', '#AFC0D0', 2); const f = d < 0 ? links : rechts; if (f) f(px, py + 70); }
  circ(ctx, 0, 0, 9, C.goud); ctx.restore(); }
function molen(ctx, x, y, s = 1, a = 1, t = 0, draai = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, -150); ctx.lineTo(70, -150); ctx.lineTo(30, -80); ctx.lineTo(-30, -80); ctx.closePath(); shape(ctx, '#8A96A8', '#C4CCD8', 2); // trechter
  roundRect(ctx, -60, -80, 120, 110, 12); shape(ctx, '#6A7688', '#AFC0D0', 2); for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 22, -26); ctx.rotate(t * 4 * d * draai); ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 3; for (let k = 0; k < 6; k++) { ctx.rotate(1.047); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(18, 0); ctx.stroke(); } ctx.restore(); }
  ctx.fillStyle = '#4A5468'; ctx.fillRect(-24, 30, 48, 26); ctx.restore(); }

// ---------- H3: uithalen, extruder ----------
// vat met water (doorsnede), x,y = linksboven; inhoud via o.teken(clipBox)
function vat(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lvl = y + h * 0.18;
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h - 30); ctx.quadraticCurveTo(x, y + h, x + 30, y + h); ctx.lineTo(x + w - 30, y + h); ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - 30); ctx.lineTo(x + w, y); ctx.clip();
  ctx.fillStyle = rgba(C.teal, o.troebel ? 0.3 : 0.22); ctx.fillRect(x, lvl, w, h); if (o.teken) o.teken(x, lvl, w, y + h - lvl); ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h - 30); ctx.quadraticCurveTo(x, y + h, x + 30, y + h); ctx.lineTo(x + w - 30, y + h); ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - 30); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 4, lvl); ctx.lineTo(x + w - 4, lvl); ctx.stroke(); ctx.restore(); }
// pH-meter: kastje met display + staaf in het vat
function phMeter(ctx, x, y, ph, a = 1, col = C.teal, staafTot = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (staafTot) { ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + 50); ctx.lineTo(x, staafTot); ctx.stroke(); circ(ctx, x, staafTot, 8, '#E8ECF0'); }
  roundRect(ctx, x - 90, y - 50, 180, 100, 14); shape(ctx, '#2A3446', '#8FA0B5', 2); roundRect(ctx, x - 72, y - 34, 144, 62, 8); shape(ctx, '#0D1420', col, 2);
  text(ctx, 'pH ' + ph, x, y + 12, fTekst(40, 800), col, 'center'); ctx.restore(); }
// zak poeder
function zakPoeder(ctx, x, y, s = 1, a = 1, label = 'ERWTENEIWIT', sub = '± 80 % EIWIT') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-120, -260); ctx.lineTo(120, -260); ctx.lineTo(132, 0); ctx.quadraticCurveTo(0, 14, -132, 0); ctx.closePath(); shape(ctx, '#E8E0CC', '#C9B896', 3); ctx.fillStyle = '#D2C8B0'; ctx.fillRect(-120, -270, 240, 22);
  hoop(ctx, 0, -40, 150, 80, '#E2CC8A'); metaText(ctx, label, 0, -180, '#3A2E1A', 'center', 28); text(ctx, sub, 0, -130, fTekst(34, 800), '#3A2E1A', 'center'); ctx.restore(); }
// extruder in doorsnede: X0..X1 cilinder op hoogte Y, met schroef, verwarming (koraal) en koele platte uitgang (teal)
const EXT = { x0: 300, x1: 1340, y: 520, r: 70, die: 1720 };
function extruder(ctx, t, a = 1, o = {}) { if (a <= 0.01) return; const { x0, x1, y, r, die } = EXT; ctx.save(); ctx.globalAlpha *= a; const draai = o.draai == null ? 1 : o.draai, heet = o.heet || 0, koel = o.koel || 0;
  // trechter met poeder en water
  ctx.beginPath(); ctx.moveTo(x0 + 20, y - r - 170); ctx.lineTo(x0 + 200, y - r - 170); ctx.lineTo(x0 + 140, y - r); ctx.lineTo(x0 + 80, y - r); ctx.closePath(); shape(ctx, '#3A4458', '#AFC0D0', 3);
  hoop(ctx, x0 + 110, y - r - 30, 90, 60, '#E2CC8A', o.poeder == null ? 1 : o.poeder);
  if (o.water > 0.01) { ctx.save(); ctx.globalAlpha *= o.water; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0 + 330, y - r - 140); ctx.lineTo(x0 + 330, y - r - 20); ctx.stroke(); for (let i = 0; i < 4; i++) { const ph = (t * 1.4 + i * 0.25) % 1; circ(ctx, x0 + 330, y - r - 10 + ph * 30, 6, rgba(C.teal, 1 - ph)); } metaText(ctx, 'WATER', x0 + 360, y - r - 110, C.teal, 'left', 28); ctx.restore(); }
  // cilinder (mantel)
  roundRect(ctx, x0, y - r - 18, x1 - x0, 2 * r + 36, 18); shape(ctx, '#5A6678', '#AFC0D0', 3); ctx.fillStyle = '#1E2738'; ctx.fillRect(x0 + 10, y - r, x1 - x0 - 20, 2 * r);
  // verwarming: banden die koraal kleuren
  for (let i = 0; i < 4; i++) { const bx = x0 + 380 + i * 230; ctx.fillStyle = _mixHex('#6A7688', C.koraal, heet * (0.55 + i * 0.15)); ctx.fillRect(bx, y - r - 30, 150, 14); ctx.fillRect(bx, y + r + 16, 150, 14); }
  // massa in de cilinder (oker, loopt van poeder naar deeg)
  ctx.save(); ctx.beginPath(); ctx.rect(x0 + 10, y - r, x1 - x0 - 20, 2 * r); ctx.clip(); ctx.fillStyle = rgba(_mixHex(C.oker, C.koraal, heet * 0.3), 0.55); ctx.fillRect(x0 + 70, y - r + 10, x1 - x0 - 80, 2 * r - 20);
  // schroef: as + schroefbladen die met t meelopen
  ctx.fillStyle = '#9AA6B6'; ctx.fillRect(x0 + 10, y - 14, x1 - x0 - 20, 28); const sp = 86, off = (t * 60 * draai) % sp;
  for (let xx = x0 - sp + off; xx < x1; xx += sp) { ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xx, y + r - 8); ctx.lineTo(xx + sp * 0.5, y - r + 8); ctx.stroke(); ctx.strokeStyle = rgba('#7E8A9C', 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xx + sp * 0.5, y - r + 8); ctx.lineTo(xx + sp, y + r - 8); ctx.stroke(); }
  ctx.restore();
  // motor links
  roundRect(ctx, x0 - 170, y - 80, 150, 160, 14); shape(ctx, '#3A4458', '#8FA0B5', 2); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x0 - 150 + i * 26, y - 60); ctx.lineTo(x0 - 150 + i * 26, y + 60); ctx.stroke(); }
  // koele, platte uitgang
  const dy0 = y - 26, dh = 52; roundRect(ctx, x1, dy0 - 26, die - x1, dh + 52, 10); shape(ctx, _mixHex('#5A6678', C.teal, koel * 0.6), _mixHex('#AFC0D0', C.teal, koel), 3);
  ctx.fillStyle = '#1E2738'; ctx.fillRect(x1, dy0, die - x1, dh); ctx.fillStyle = rgba(_mixHex(C.oker, '#D2B888', koel), 0.75); ctx.fillRect(x1, dy0 + 4, die - x1, dh - 8);
  if (koel > 0.01) { ctx.save(); ctx.globalAlpha *= koel; for (let i = 0; i < 6; i++) { const cx2 = x1 + 40 + i * 62; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx2, dy0 - 22); ctx.lineTo(cx2, dy0 - 6); ctx.moveTo(cx2, dy0 + dh + 6); ctx.lineTo(cx2, dy0 + dh + 22); ctx.stroke(); } ctx.restore(); }
  // uitkomende reep
  const uit = o.uit || 0; if (uit > 0.01) { roundRect(ctx, die, dy0 + 2, 150 * uit, dh - 4, 6); shape(ctx, '#C9A86A', '#E2CC9A', 2); ctx.strokeStyle = rgba('#8A6A3A', 0.6); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(die, dy0 + 10 + k * 11); ctx.lineTo(die + 150 * uit, dy0 + 10 + k * 11); ctx.stroke(); } }
  ctx.restore(); }
// meter (wijzer) met tekst
function meter(ctx, x, y, r, u, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#2A3446', '#AFC0D0', 3);
  ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, r - 14, Math.PI * 0.8, Math.PI * (0.8 + 1.4 * u)); ctx.stroke(); const an = Math.PI * (0.8 + 1.4 * u); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 22), y + Math.sin(an) * (r - 22)); ctx.stroke(); circ(ctx, x, y, 6, C.text);
  metaText(ctx, s2, x, y + r + 40, col, 'center', 28); ctx.restore(); }
// stoomwolkjes
function stoom(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i * 0.33) % 1; ctx.beginPath(); ctx.arc(x + i * 26 + Math.sin(ph * 6 + i) * 8, y - ph * 70, 12 + ph * 12, 0, 6.283); ctx.fillStyle = rgba('#E8ECF0', 0.45 * (1 - ph)); ctx.fill(); } ctx.restore(); }
// gekookt ei (doorgesneden)
function gekooktEi(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 52 * s, 66 * s, 0, 0, 6.283); shape(ctx, '#F4F0E6', '#C9C1B0', 2); circ(ctx, x, y + 8 * s, 26 * s, '#E8B83A'); ctx.restore(); }
// pan op een kookplaatje met koekje (op de werktafel)
function panKoekje(ctx, x, y, t, a = 1, breek = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 130, y - 18, 260, 18, 4); shape(ctx, '#2A2F3A', '#5A6478', 2); ctx.fillStyle = C.koraal; ctx.fillRect(x - 60, y - 22, 120, 4);
  ctx.fillStyle = '#3A3F4A'; ctx.fillRect(x + 110, y - 40, 150, 12); ctx.beginPath(); ctx.ellipse(x, y - 30, 120, 22, 0, 0, Math.PI); ctx.lineTo(x - 120, y - 46); ctx.ellipse(x, y - 46, 120, 22, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#3A3F4A', '#6A7080', 2);
  ctx.beginPath(); ctx.ellipse(x, y - 46, 108, 18, 0, 0, 6.283); ctx.fillStyle = '#20242C'; ctx.fill();
  if (breek < 0.01) { ctx.beginPath(); ctx.ellipse(x, y - 52, 64, 12, 0, 0, 6.283); shape(ctx, '#D8BE7A', '#E8D49A', 1.5); }
  stoom(ctx, x - 30, y - 70, t, 1 - breek); ctx.restore(); }
// gebroken koekje groot (los, boven de pan): korrelig breukvlak zonder draden
function koekjeBreuk(ctx, x, y, s = 1, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 24 * u, d * 6 * u); ctx.rotate(d * 0.12 * u); ctx.beginPath(); if (d < 0) { ctx.moveTo(0, -60); ctx.arc(0, 0, 90, -Math.PI / 2 - 0.1, Math.PI / 2 + 0.1, true); } else { ctx.moveTo(0, -60); ctx.arc(0, 0, 90, -Math.PI / 2 + 0.1, Math.PI / 2 - 0.1); }
    for (let k = 6; k >= -6; k--) ctx.lineTo(d * (hash(k * 3.3 + d) * 10), k * 10); ctx.closePath(); shape(ctx, '#D8BE7A', '#E8D49A', 2);
    ctx.fillStyle = '#B89A58'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(d * (8 + hash(k * 2.2 + d) * 60), -50 + hash(k * 5.1 + d) * 100, 3 + hash(k) * 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.fillStyle = '#C9AA62'; for (let k = 0; k < 8; k++) { const ph = clamp(u * 1.4 - hash(k) * 0.4, 0, 1); circ(ctx, (hash(k * 7.7) - 0.5) * 30, 40 + ph * 70 + hash(k * 3) * 10, 4, rgba('#C9AA62', 1 - ph * 0.4)); }
  ctx.restore(); }
// reep die opengescheurd wordt: draden in de lengte
function reep(ctx, x, y, s = 1, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (const d of [-1, 1]) { ctx.save(); ctx.translate(0, d * 26 * open); ctx.rotate(d * 0.06 * open); roundRect(ctx, -220, d < 0 ? -40 : 0, 380, 40, 10); shape(ctx, '#C9A86A', '#E2CC9A', 2);
    ctx.strokeStyle = rgba('#8A6A3A', 0.65); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { const yy = (d < 0 ? -34 : 6) + k * 9; ctx.beginPath(); ctx.moveTo(-210, yy); ctx.lineTo(150, yy); ctx.stroke(); } ctx.restore(); }
  if (open > 0.05) { ctx.strokeStyle = '#D8BC84'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 0; k < 10; k++) { const yy = -14 + k * 3; ctx.beginPath(); ctx.moveTo(160, -26 * open + (k / 9) * 52 * open - 26 * open + 26 * open); const ex = 160 + 40 + hash(k) * 30; ctx.moveTo(150, (k / 9 - 0.5) * 52 * open); ctx.quadraticCurveTo(170 + hash(k * 3) * 20, (k / 9 - 0.5) * 30 * open, ex, (hash(k * 2) - 0.5) * 20 * open); ctx.stroke(); } }
  ctx.restore(); }

// ---------- H4: B12, ijzer, etiket, toekomst ----------
function b12Icoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); // corrine-ring (vier vijfringen rond kobalt), vereenvoudigd
  ctx.beginPath(); for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6, rr = i % 3 === 0 ? 22 : 18; ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba(C.oker, 0.35), '#E2CC8A', 2); circ(ctx, 0, 0, 7, '#9C7A3C'); ctx.restore(); }
function badge(ctx, x, y, s2, col, a = 1, leeg = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 50, 0, 6.283); if (leeg) { ctx.setLineDash([8, 7]); shape(ctx, rgba('#2A3A58', 0.4), C.text2, 3); ctx.setLineDash([]); } else { shape(ctx, rgba(col, 0.25), col, 3); }
  if (s2) text(ctx, s2, x, y + 12, fTekst(s2.length > 4 ? 26 : 32, 800), C.text, 'center'); ctx.restore(); }
function ijzerDeeltje(ctx, x, y, r = 9, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#B0603A', '#D88A5E', 2); text(ctx, 'Fe', x, y + 5, fTekst(14, 800), '#F2F2EE', 'center'); ctx.restore(); }
function sinaasPartje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, 0, 60, Math.PI, 0); ctx.closePath(); shape(ctx, '#F2A03A', '#F8C870', 3);
  ctx.beginPath(); ctx.arc(0, 0, 50, Math.PI, 0); ctx.closePath(); ctx.fillStyle = '#F8C060'; ctx.fill(); ctx.strokeStyle = '#F8E0A8'; ctx.lineWidth = 2.5; for (let i = 1; i < 6; i++) { const an = Math.PI + i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 48, Math.sin(an) * 48); ctx.stroke(); } ctx.restore(); }
// pakje vleesvervanger (zonder merk): voorkant met venster; etiket aan de zijkant via etiketVeld
function pakje(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, o.kleur || '#3E7A5A', _lt(o.kleur || '#3E7A5A', 0.35), 3);
  roundRect(ctx, x + w * 0.12, y + h * 0.18, w * 0.76, h * 0.42, 40); shape(ctx, rgba('#F2EEE4', 0.9), null); burger(ctx, x + w / 2, y + h * 0.5, w / 330, 'erwt');
  text(ctx, o.titel || 'plantaardige burger', x + w / 2, y + h * 0.75, fTekst(Math.max(26, w * 0.09), 700), '#F2F2EE', 'center'); if (o.eiwit !== false) pil(ctx, '20 g eiwit', x + w / 2, y + h * 0.92, C.oker, 1, Math.max(28, w * 0.085), 0.55); ctx.restore(); }
// etiket (achterkant) met regels [tekst, waarde, status] ; status 'ok' | 'mis' | null; hl per regel
function etiketVeld(ctx, x, y, w, regels, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rh = 66, h = 76 + regels.length * rh; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#C9B896', 3);
  metaText(ctx, o.kop || 'PER 100 G', x + 24, y + 48, '#5A4A30', 'left', 28);
  regels.forEach(([naam, waarde, st, ra], i) => { const r2 = ra == null ? 1 : ra; if (r2 <= 0.01) return; ctx.save(); ctx.globalAlpha *= r2; const ry = y + 76 + i * rh; ctx.strokeStyle = '#D2C8B4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 16, ry); ctx.lineTo(x + w - 16, ry); ctx.stroke();
    text(ctx, naam, x + 24, ry + 44, fTekst(32, 700), '#1A2740', 'left'); text(ctx, waarde, x + w - 74, ry + 44, fTekst(32, 800), '#1A2740', 'right');
    if (st === 'ok') vink_(ctx, x + w - 40, ry + 32, 13, 1, '#3E8A52'); else if (st === 'mis') kruis(ctx, x + w - 40, ry + 32, 12, 1, '#C0503A'); ctx.restore(); });
  ctx.restore(); return h; }
function vergrootglas(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.35, y + r * 1.35); ctx.stroke(); ctx.restore(); }
// supermarktschap (schema): planken met neutrale pakjes
function schap(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#22304A', '#4A5468', 2);
  for (let r = 0; r < 3; r++) { const py = y + 40 + r * (h - 40) / 3 + (h - 40) / 3 - 10; ctx.fillStyle = '#8FA0B5'; ctx.fillRect(x + 10, py, w - 20, 8); for (let k = 0; k < Math.floor((w - 40) / 90); k++) { const kl = ['#3E7A5A', '#5A6A84', '#8A6A3A', '#4A6A8A'][(k + r) % 4]; roundRect(ctx, x + 24 + k * 90, py - 92, 70, 92, 6); shape(ctx, rgba(kl, 0.55), rgba(_lt(kl, 0.3), 0.6), 1.5); } } ctx.restore(); }
// meelworm (larve van de meeltor): gesegmenteerd, goudbruin, klein (castboek-stijl: vlakke kleur, simpel oog)
function meelworm(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const n = 12;
  for (let i = n - 1; i >= 0; i--) { const px = -i * 15, py = Math.sin(i * 0.5 + t * 2) * 4; ctx.beginPath(); ctx.ellipse(px, py, 11, 13 - (i > 9 ? (i - 9) * 2 : 0), 0, 0, 6.283); shape(ctx, i % 2 ? '#C98A3E' : '#D89A4A', '#E8B870', 1.2); }
  ctx.beginPath(); ctx.ellipse(10, 0, 12, 11, 0, 0, 6.283); shape(ctx, '#A86A2E', '#C98A4E', 1.2); circ(ctx, 15, -3, 2.4, '#2A1A10');
  ctx.strokeStyle = '#A86A2E'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-k * 15 + 2, 10); ctx.lineTo(-k * 15 + 6, 18); ctx.stroke(); } ctx.restore(); }
// petrischaal met kweekcellen (spiercellen als langgerekte cellen)
function kweekSchaal(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.45, 0, 0, 6.283); shape(ctx, rgba('#E8B0A0', 0.25), '#AFC0D0', 3); ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, r - 8, r * 0.45 - 6, 0, 0, 6.283); ctx.clip();
  for (let i = 0; i < 22; i++) { const px = x - r + hash(i * 3.1) * 2 * r, py = y - r * 0.4 + hash(i * 5.3) * r * 0.8; ctx.beginPath(); ctx.ellipse(px, py, 22, 7, hash(i) * 0.6 - 0.3, 0, 6.283); shape(ctx, '#D88A7A', '#F0B0A0', 1); circ(ctx, px, py, 2.5, '#8C4A5A'); } ctx.restore(); ctx.restore(); }
// opleidingsrij (recap)
function opleidingRij(ctx, x, y, w, niv, naam, meta, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 140, 18); shape(ctx, rgba('#0D1420', 0.92), col, 2); text(ctx, niv, x + 40, y + 86, fTitel(46), col, 'left'); text(ctx, naam, x + 190, y + 64, fTekst(40, 700), C.text, 'left'); metaText(ctx, meta, x + 190, y + 110, C.grain, 'left', 28); ctx.restore(); }

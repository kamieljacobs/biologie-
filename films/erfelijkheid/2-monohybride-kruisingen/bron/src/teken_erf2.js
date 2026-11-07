// Monohybride kruisingen (Erfelijkheid 2/6) · lichte remake fase 1 (28 okt 2026) — nieuwe tekeningen, ronde 1.
// Kandidaat voor bibliotheek/lib_bio.js pas na Kamiels keuring: erwtBloem, erwtenplant, labmuis.
// Bronnen voor de vorm (zie bronnen.md): JIRCAS Thai vegetables 085 (vlinderbloem: vlag, vleugels aan de kiel vast,
// kiel korter dan de vleugels; tweebroederige meeldraden; stijl scherp omhoog gebogen, bovenaan behaard; steunblaadjes
// groot, 1–3 paar blaadjes, ranken), Cretan Flora (kroon 20–25 mm, vlag lila-paars, vleugels donker kastanjebruin-rood,
// peul 60–80 × 10–14 mm, plant tot 2 m, steunblaadjes groter dan de blaadjes), Mendel 1866 (meeldraden en stamper
// 'dicht opeengepakt in de kiel'; stempel al bestoven vóór de bloem opengaat; kiel weg, meeldraden met een pincet eruit).
// Eenheid in erwtBloem: mm (s = px per mm). Bloem kijkt naar rechts (kijk = -1 spiegelt). Geen glans, geen schaduw (Part C).

const ERW = {
  paars: { vlag: '#B58CC4', vlagD: '#8E66A2', vleugel: '#7C2F52', vleugelD: '#5A1F3A', kiel: '#E3CFE0', kielD: '#B79AB4' },
  wit:   { vlag: '#EEEAE0', vlagD: '#C9C3B4', vleugel: '#E4E0D4', vleugelD: '#BDB6A6', kiel: '#E8EDDC', kielD: '#BCC4AE' },
  blad: '#6FAE73', bladD: '#4E8A5C', bladL: '#8CC48E', stengel: '#5E9A62', kelk: '#5C9A60', peul: '#7FB874', peulD: '#5A9455', helm: '#E8C860', stuif: '#F2DA7A'
};
function _pad(ctx, P, sc = 1) { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0] * sc, p[1] * sc) : ctx.moveTo(p[0] * sc, p[1] * sc)); ctx.closePath(); }
// gladde gesloten vorm door punten (Catmull-Rom → bezier)
function _glad(ctx, P, open = false) { const n = P.length; ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]);
  const m = open ? n - 1 : n; for (let i = 0; i < m; i++) { const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    const a0 = open && i === 0 ? p1 : p0, a3 = open && i === n - 2 ? p2 : p3;
    ctx.bezierCurveTo(p1[0] + (p2[0] - a0[0]) / 6, p1[1] + (p2[1] - a0[1]) / 6, p2[0] - (a3[0] - p1[0]) / 6, p2[1] - (a3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (!open) ctx.closePath(); }
function _vul(ctx, P, fill, rand, lw = 0.25) { _glad(ctx, P); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke(); } }

// ---------- ERWTENBLOEM (vlinderbloem) van opzij ----------
// o: kleur 'paars'|'wit', open 0..1 (kiel opengesneden: meeldraden + stamper zichtbaar), zonder 0..1 (meeldraden weggehaald),
//    stuif 0..1 (stuifmeel op de stempel), knop 0..1 (1 = jonge, nog gesloten bloem), kijk, a, rot
function erwtBloem(ctx, x, y, s, o = {}) { const { kleur = 'paars', open = 0, zonder = 0, stuif = 0, knop = 0, kijk = 1, a = 1, rot = 0 } = o; if (a <= 0.01) return {};
  const K = ERW[kleur] || ERW.paars; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const kv = 1 - 0.45 * knop; // een knop: vlag nog half dicht en kleiner
  // bloemsteel
  ctx.strokeStyle = ERW.stengel; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(-14, 10); ctx.quadraticCurveTo(-8, 4, -2, 1); ctx.stroke();
  // vlag (standaard): groot, rond, staat rechtop naar achteren, met inkeping bovenaan en nerven
  ctx.save(); ctx.translate(1, -1); ctx.rotate(-0.18); ctx.scale(kv * 0.95, kv * 0.88);
  const V = [[0, 2], [-3, -2], [-6.5, -8], [-7.5, -14], [-5, -19.5], [-1.2, -21], [0.4, -19.2], [2.4, -21.2], [6.4, -19], [7.6, -13], [5.5, -6], [2.5, -1]];
  _vul(ctx, V, K.vlag, K.vlagD, 0.3);
  ctx.strokeStyle = rgba(K.vlagD, 0.7); ctx.lineWidth = 0.18; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(0.4, -1); ctx.quadraticCurveTo(i * 1.6, -9, i * 2.1, -17.5 + Math.abs(i) * 0.9); ctx.stroke(); }
  if (kleur === 'paars') { ctx.fillStyle = rgba(K.vleugel, 0.35); ctx.beginPath(); ctx.ellipse(0.5, -4.5, 2.2, 3.4, 0, 0, 6.283); ctx.fill(); } // donkere vlek aan de voet van de vlag
  ctx.restore();
  // kelk (5 tanden, groen) om de voet
  _vul(ctx, [[-3.2, 2.6], [-2.6, -1.2], [1.8, -1.8], [4.6, -0.6], [6.4, -2.6], [6.2, 0.6], [4.4, 2.8], [0, 3.4]], ERW.kelk, _mixHex(ERW.kelk, '#000', 0.3));
  ctx.fillStyle = ERW.kelk; [[2.8, -2.4], [5.2, -3.6], [7.2, -2.0]].forEach(([tx, ty]) => { ctx.beginPath(); ctx.moveTo(tx - 1.2, -0.6); ctx.lineTo(tx, ty); ctx.lineTo(tx + 0.9, -0.2); ctx.fill(); });
  ctx.save(); ctx.translate(3, 0); ctx.scale(1.18, 1.06); ctx.translate(-3, 0); // kiel + vleugels ± 22 mm lang
  // kiel (bootvorm, onder, gebogen punt omhoog) — de twee vleugels liggen er vast tegenaan
  const KL = [[3.2, 0.6], [8, 2.6], [13, 2.8], [16.6, 1.0], [18.4, -2.6], [17.4, -4.4], [15.4, -2.6], [11.5, -1.2], [6.5, -1.4], [3.6, -1.0]];
  _vul(ctx, KL, K.kiel, K.kielD, 0.25);
  // binnenkant van de kiel (opengesneden): stamper + tweebroederige meeldraden
  if (open > 0.01) { ctx.save(); ctx.globalAlpha *= open; _glad(ctx, KL); ctx.clip(); ctx.fillStyle = _mixHex(K.kiel, '#1A2740', 0.25); ctx.fill();
    // vruchtbeginsel (lang, groen) met stijl die scherp omhoog buigt, behaard, stempel
    ctx.strokeStyle = '#7FB874'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(4.5, 0.2); ctx.lineTo(13.5, 0.4); ctx.stroke();
    ctx.lineWidth = 0.6; ctx.strokeStyle = '#A8D49A'; ctx.beginPath(); ctx.moveTo(13.5, 0.4); ctx.quadraticCurveTo(16.4, 0.2, 16.6, -2.6); ctx.stroke();
    ctx.strokeStyle = 'rgba(232,240,220,0.8)'; ctx.lineWidth = 0.12; for (let i = 0; i < 6; i++) { const u = i / 5, px = lerp(15.8, 16.6, u), py = lerp(-0.6, -2.4, u); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 0.7, py - 0.2); ctx.stroke(); }
    _bioC(ctx, 16.6, -2.9, 0.55, '#CFE6B8');
    if (stuif > 0.01) { ctx.save(); ctx.globalAlpha *= stuif; [[16.2, -3.1], [16.9, -3.3], [16.6, -2.4], [17.1, -2.8], [16.0, -2.6]].forEach(([px, py]) => _bioC(ctx, px, py, 0.32, ERW.stuif)); ctx.restore(); }
    // meeldraden: 9 vergroeid tot een koker om het vruchtbeginsel + 1 vrij; helmknoppen rond de stempel
    const m = 1 - zonder; if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m;
      ctx.fillStyle = rgba('#E8E2C8', 0.55); ctx.beginPath(); ctx.moveTo(4.4, -0.7); ctx.lineTo(14.2, -0.6); ctx.lineTo(14.2, 1.3); ctx.lineTo(4.4, 1.2); ctx.fill();
      ctx.strokeStyle = '#E8E2C8'; ctx.lineWidth = 0.28; for (let i = 0; i < 5; i++) { const hx = 14.6 + i * 0.35, hy = -1.4 - i * 0.42; ctx.beginPath(); ctx.moveTo(12.8, 0.2 - i * 0.1); ctx.quadraticCurveTo(14.2, -0.2 - i * 0.2, hx, hy); ctx.stroke(); ctx.fillStyle = ERW.helm; ctx.beginPath(); ctx.ellipse(hx, hy - 0.3, 0.42, 0.62, -0.4, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#B8963A'; ctx.lineWidth = 0.1; ctx.stroke(); ctx.strokeStyle = '#E8E2C8'; ctx.lineWidth = 0.28; }
      ctx.restore(); }
    ctx.restore(); _glad(ctx, KL); ctx.strokeStyle = K.kielD; ctx.lineWidth = 0.25; ctx.stroke(); }
  // vleugel (de verre is verborgen achter de kiel; de nabije, donker): langwerpig, sikkelvormig, tegen de kiel aan
  if (open < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - open * 0.92;
    _vul(ctx, [[3.8, -0.6], [6, -4.8], [10, -7.4], [14.6, -7.6], [17.6, -5.6], [17.2, -3.4], [14, -2.2], [9.4, -1.0], [5.6, 0.4]], K.vleugel, K.vleugelD, 0.25);
    ctx.strokeStyle = rgba(K.vleugelD, 0.8); ctx.lineWidth = 0.16; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(5.4, -1 - i * 0.6); ctx.quadraticCurveTo(10, -4.5 - i * 0.6, 16, -5 - i * 0.4); ctx.stroke(); }
    ctx.restore(); }
  ctx.restore();
  ctx.restore();
  const W2 = (mx0, my0) => { const mx = 3 + (mx0 - 3) * 1.18, my = my0 * 1.06; return [x + (mx * Math.cos(rot) - my * Math.sin(rot)) * s * kijk, y + (mx * Math.sin(rot) + my * Math.cos(rot)) * s]; };
  return { stempel: W2(16.6, -2.9), kiel: W2(12, 0.6), vlag: W2(0, -12), vleugel: W2(12, -5), meeldraad: W2(15, -1.6), voet: W2(-14, 10) };
}
function _bioC(ctx, x, y, r, f) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = f; ctx.fill(); }

// ---------- steunblaadjes, blaadjes, ranken ----------
function _blaadje(ctx, x, y, l, w, ang, kl = ERW.blad) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(l * 0.25, -w, l * 0.8, -w * 0.9, l, 0); ctx.bezierCurveTo(l * 0.8, w * 0.9, l * 0.25, w, 0, 0); ctx.fillStyle = kl; ctx.fill();
  ctx.strokeStyle = _mixHex(kl, '#000', 0.3); ctx.lineWidth = Math.max(0.6, w * 0.08); ctx.stroke(); ctx.strokeStyle = rgba(ERW.bladL, 0.6); ctx.lineWidth = Math.max(0.5, w * 0.06); ctx.beginPath(); ctx.moveTo(l * 0.05, 0); ctx.lineTo(l * 0.85, 0); ctx.stroke(); ctx.restore(); }
function _steun(ctx, x, y, r, kant) { // groot steunblad, breed eirond, omvat de stengel
  ctx.save(); ctx.translate(x, y); ctx.scale(kant, 1); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(r * 0.3, -r * 0.9, r * 1.3, -r * 0.7, r * 1.2, r * 0.1); ctx.bezierCurveTo(r * 1.1, r * 0.6, r * 0.4, r * 0.6, 0, r * 0.2); ctx.closePath();
  ctx.fillStyle = ERW.bladL; ctx.fill(); ctx.strokeStyle = ERW.bladD; ctx.lineWidth = 1; ctx.stroke();
  ctx.strokeStyle = rgba(ERW.bladD, 0.5); ctx.lineWidth = 0.8; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(r * 0.1, r * 0.1); ctx.lineTo(r * (0.7 + i * 0.15), -r * (0.5 - i * 0.3)); ctx.stroke(); } ctx.restore(); }
function _rank(ctx, x, y, l, ang, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = ERW.stengel; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(0, 0);
  const n = 40; for (let i = 1; i <= n; i++) { const u = i / n, r = u < 0.6 ? 0 : (u - 0.6) * l * 0.5; const th = u < 0.6 ? 0 : (u - 0.6) * 22; ctx.lineTo(u * l * 0.7 + Math.cos(th) * r * 0.3, Math.sin(u * 3 + t) * 2 - Math.sin(th) * r * 0.3); } ctx.stroke(); ctx.restore(); }

// ---------- ERWTENPLANT (hele plant van opzij, tegen een stokje) ----------
// x,y = grondpunt; h = hoogte in px (≈ 60–80 cm plant); o: kleur, bloemen (aantal), peulen, seed, t, a, stok
function erwtenplant(ctx, x, y, h, o = {}) { const { kleur = 'paars', bloemen = 3, peulen = 2, seed = 1, t = 0, a = 1, stok = true, hl = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const r = (i) => hash(seed * 31 + i);
  if (stok) { ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = Math.max(3, h * 0.012); ctx.beginPath(); ctx.moveTo(x - h * 0.05, y + 4); ctx.lineTo(x - h * 0.03, y - h * 1.04); ctx.stroke(); }
  const N = 6, knopen = []; let px = x, py = y; for (let i = 0; i <= N; i++) { const u = i / N; const nx = x + (i % 2 ? 1 : -1) * h * 0.035 + (r(i) - 0.5) * h * 0.02, ny = y - u * h; knopen.push([nx, ny]); }
  ctx.strokeStyle = ERW.stengel; ctx.lineWidth = Math.max(2, h * 0.012); ctx.beginPath(); knopen.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  const L = h * 0.11, Bp = [], Pp = [];
  knopen.slice(1, N).forEach(([kx, ky], i) => { const kant = i % 2 ? 1 : -1;
    _steun(ctx, kx, ky, h * 0.045 * (1 - i * 0.06), -kant); _steun(ctx, kx, ky, h * 0.04 * (1 - i * 0.06), kant);
    // samengesteld blad: bladsteel met 2 paar blaadjes en een rank
    const bx = kx + kant * L * 1.1, by = ky - L * 0.35; ctx.strokeStyle = ERW.stengel; ctx.lineWidth = Math.max(1.2, h * 0.006); ctx.beginPath(); ctx.moveTo(kx, ky); ctx.quadraticCurveTo(kx + kant * L * 0.5, ky - L * 0.3, bx, by); ctx.stroke();
    [0.45, 0.85].forEach((u, j) => { const sx = lerp(kx, bx, u), sy = lerp(ky, by, u) - L * 0.1 * u; const ang = kant > 0 ? 0 : Math.PI;
      _blaadje(ctx, sx, sy, L * 0.62, L * 0.26, ang - kant * 1.1 + (r(i * 7 + j) - 0.5) * 0.3); _blaadje(ctx, sx, sy, L * 0.6, L * 0.25, ang + kant * 0.6 + (r(i * 5 + j) - 0.5) * 0.3); });
    _rank(ctx, bx, by, L * 0.9, kant > 0 ? -0.4 : Math.PI + 0.4, t + i);
    if (i >= N - 1 - bloemen && Bp.length < bloemen) Bp.push([kx, ky, kant]); else if (i < N - 1 - bloemen && Pp.length < peulen) Pp.push([kx, ky, kant]); });
  // peulen (onder, oudere bloemen) aan een steeltje
  Pp.forEach(([kx, ky, kant], j) => { const sx = kx - kant * L * 0.25, sy = ky + L * 0.1; ctx.strokeStyle = ERW.stengel; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(sx, sy); ctx.stroke();
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(kant > 0 ? 1.9 : 1.25); const pl = h * 0.11, pw = pl * 0.18; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(pl * 0.3, -pw, pl * 0.9, -pw, pl, -pw * 0.2); ctx.bezierCurveTo(pl * 0.85, pw * 0.8, pl * 0.3, pw * 0.9, 0, 0);
    ctx.fillStyle = ERW.peul; ctx.fill(); ctx.strokeStyle = ERW.peulD; ctx.lineWidth = 1; ctx.stroke(); for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.arc(pl * k / 6.2, -pw * 0.05, pw * 0.32, 0, 6.283); ctx.strokeStyle = rgba(ERW.peulD, 0.6); ctx.stroke(); } ctx.restore(); });
  // bloemen op een lange bloemsteel uit de bladoksel (bovenaan)
  const sB = h * 0.0036, bloemPos = [];
  Bp.forEach(([kx, ky, kant], j) => { const ex = kx + kant * L * 0.55, ey = ky - L * 0.55; ctx.strokeStyle = ERW.stengel; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.quadraticCurveTo(kx + kant * L * 0.1, ky - L * 0.5, ex, ey); ctx.stroke();
    const p = erwtBloem(ctx, ex + kant * 14 * sB, ey - 10 * sB, sB * 1.0, { kleur, kijk: kant, rot: kant * -0.15 }); bloemPos.push(p); });
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y + 6, h * 0.16, 12, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { bloemen: bloemPos, top: [x, y - h] };
}
// eenvoudige plant voor schema's (generaties, terugkruising): rechte stengel, twee steunbladparen, één grote bloem bovenaan
function plantje(ctx, x, y, h, kleur = 'paars', o = {}) { const { a = 1, seed = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = ERW.stengel; ctx.lineWidth = Math.max(2.5, h * 0.03); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + h * 0.04, y - h * 0.5, x, y - h * 0.72); ctx.stroke();
  [[0.22, -1], [0.22, 1], [0.48, 1], [0.48, -1]].forEach(([u, k], i) => { const yy = y - h * u; _blaadje(ctx, x, yy, h * 0.28, h * 0.1, k > 0 ? -0.5 : Math.PI + 0.5); });
  _steun(ctx, x, y - h * 0.35, h * 0.08, 1); _steun(ctx, x, y - h * 0.35, h * 0.07, -1);
  erwtBloem(ctx, x - h * 0.02, y - h * 0.62, h / 62, { kleur, rot: -0.1 });
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y + 4, h * 0.3, 10, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }
// klein pictogram van het fenotype voor schema's (een bloem van opzij, zonder steel)
function bloemIcoon(ctx, x, y, px, kleur, a = 1) { erwtBloem(ctx, x - px * 0.25, y + px * 0.35, px / 26, { kleur, a }); }

// ---------- LABMUIS (huismuis-lab) in zwart en albino, op de gekeurde muizenpop (HondPop) ----------
// Albino (Tyr c/c): witte vacht, roze huid, rode ogen (geen pigment, MGI:1855976; Beermann e.a. 2004). Zwart: C57BL/6-achtig.
// Let op: de pop is de bosmuis (grotere oren); voor de keuring als variant gemarkeerd.
let _LABMUIS = null;
function _labmuisMaak() { if (_LABMUIS || typeof MUIS_DEF === 'undefined') return _LABMUIS;
  const mk = (pal, oog) => { const d = Object.assign({}, MUIS_DEF, { PAL: Object.assign({}, MUIS_DEF.PAL, pal) });
    d.GEZICHT = function (ctx, p, cm) { const O = cm([4.45, -3.0]); ctx.fillStyle = oog; ctx.beginPath(); ctx.ellipse(O[0], O[1], 0.44, 0.4, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.beginPath(); ctx.arc(O[0] + 0.15, O[1] - 0.15, 0.09, 0, 6.283); ctx.fill();
      ctx.strokeStyle = 'rgba(236,230,218,0.7)'; ctx.lineWidth = 0.035; const a = cm([5.35, -1.9]); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(a[0] + 1.2, a[1] - 0.4 + i * 0.2, a[0] + 2.4, a[1] - 0.9 + i * 0.5); ctx.stroke(); } };
    return HondPop.maak(d); };
  _LABMUIS = { zwart: mk({ basis: '#46424A', donker: '#36333A', licht: '#58545C', staart: '#4A4044', oorbin: '#6A5458', neus: '#5A4448', roze: '#6A5458' }, '#0A0808'),
    wit: mk({ basis: '#ECE8E0', donker: '#DCD6CA', licht: '#F6F3EC', staart: '#E6B8B0', oorbin: '#F0B8B4', neus: '#E8A0A0', roze: '#F0B8B0' }, '#C8323C') };
  return _LABMUIS; }
function labmuis(ctx, x, y, s, o = {}) { const L = _labmuisMaak(); if (!L) return; const v = L[o.vacht || 'zwart']; const oo = Object.assign({ houding: 'staan' }, o); return v.teken(ctx, x, y, s, oo); }

// ---------- generatieladder P → F1 → F2 (Schema, groeit mee) ----------
// st: p 0..1, f1 0..1, zelf 0..1 (lus zelfbestuiving), f2 0..1, hl 'P'|'F1'|'F2', dier 0..1 (muizenkolom rechts)
function generatieLadder(ctx, x, y, st = {}, rowH = 250) { const lab = [['P', 'ouders'], ['F1', 'hun kinderen'], ['F2', 'kinderen van de F1']];
  lab.forEach(([g, sub], i) => { const v = [st.p, st.f1, st.f2][i] ?? 0; if (v <= 0.01) return; const yy = y + i * rowH, h = st.hl === g ? 1 : 0; ctx.save(); ctx.globalAlpha *= v;
    text(ctx, g, x, yy + 18, fTitel(72), h ? C.goud : C.text, 'left'); metaText(ctx, sub, x, yy + 64, h ? C.goud : C.text2, 'left', 26); ctx.restore(); });
  return { rij: (i) => y + i * rowH };
}
function zelfLus(ctx, x, y, r, a = 1, lab = 'zelfbestuiving') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r, -2.6, 2.2); ctx.stroke();
  const ex = x + Math.cos(2.2) * r, ey = y + Math.sin(2.2) * r; ctx.fillStyle = C.line; ctx.beginPath(); ctx.moveTo(ex - 12, ey - 4); ctx.lineTo(ex + 6, ey + 12); ctx.lineTo(ex + 8, ey - 10); ctx.fill();
  metaText(ctx, lab, x + r + 18, y + 8, C.text2, 'left', 26); ctx.restore(); }

// ---------- gameten (chromosoom met één allel) en de meiose in een Aa-cel ----------
// p 0..1: 0 = cel met het paar (A oker = van de moederplant, a teal = van de vaderplant), 1 = vier gameten
function meioseAa(ctx, cx, cy, p, o = {}) { const { R = 150, a = 1 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a;
  const e = ease(clamp(p, 0, 1)), kl = { A: CH.moeder, a: CH.vader };
  const doel = [[-1.55, -0.85, 'A'], [-1.55, 0.85, 'A'], [1.55, -0.85, 'a'], [1.55, 0.85, 'a']], out = [];
  if (e < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = rgba('#2A3550', 0.95); ctx.fill(); ctx.strokeStyle = '#7F93B4'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  doel.forEach(([dx, dy, l], i) => { const gx0 = cx + (l === 'A' ? -26 : 26) + (i % 2 ? 8 : -8) * (1 - e), gy0 = cy, gx1 = cx + dx * R, gy1 = cy + dy * R; const gx_ = lerp(gx0, gx1, e), gy_ = lerp(gy0, gy1, e) - Math.sin(e * Math.PI) * 20;
    const rr = R * 0.5 * e; if (rr > 4) { ctx.beginPath(); ctx.arc(gx_, gy_, rr, 0, 6.283); ctx.fillStyle = rgba('#2A3550', 0.95); ctx.fill(); ctx.strokeStyle = l === 'A' ? CH.moeder : CH.vader; ctx.lineWidth = 2.5; ctx.stroke(); }
    if (e < 0.02 && i % 2) return; staafAllelK(ctx, gx_, gy_ + 8, l, kl[l], 1, 90); out.push([gx_, gy_, l]); });
  ctx.restore(); return out; }
function staafAllelK(ctx, x, y, l, kl, a = 1, h = 90) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; chromatide1(ctx, x, y, h, 0, kl, 1, 20); roundRect(ctx, x - 13, y + h * 0.18 - 6, 26, 12, 4); shape(ctx, C.goud, _dk(C.goud, 0.55), 2);
  text(ctx, l, x, y - h / 2 - 14, fTekst(44, 700), C.text, 'center'); ctx.restore(); }

// ---------- kruisingsschema (zoals de vooruitblik in Chromosomen 2.1: ene ouder boven (teal), andere links (oker)) ----------
// o: n = aantal ingevulde vakjes (0..4, mag fractie), hl = index van het vakje met goud, feno 0..1 (bloempje in elk vakje),
//    boven/links = labels, lt = ['A','a'] gameten links, bt = boven
function kruisSchema(ctx, x0, y0, c, o = {}) { const { n = 4, hl = -1, feno = 0, boven = 'stuifmeel', links = 'eicellen', bt = ['A', 'a'], lt = ['A', 'a'], a = 1, dimNiet = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  bt.forEach((l, j) => { const cx = x0 + c * (j + 1) + c / 2 - 6; ctx.beginPath(); ctx.arc(cx, y0 - 62, 44, 0, 6.283); shape(ctx, rgba(CH.vader, 0.18), CH.vader, 2.5); text(ctx, l, cx, y0 - 46, fTekst(52, 700), C.text, 'center'); });
  lt.forEach((l, i) => { const cy = y0 + c * i + c / 2 - 6; ctx.beginPath(); ctx.arc(x0 + c / 2 - 20, cy, 44, 0, 6.283); shape(ctx, rgba(CH.moeder, 0.18), CH.moeder, 2.5); text(ctx, l, x0 + c / 2 - 20, cy + 17, fTekst(52, 700), C.text, 'center'); });
  metaText(ctx, boven, x0 + c * 2 - 6, y0 - 134, CH.vader, 'center', 28); ctx.save(); ctx.translate(x0 - 36, y0 + c - 6); ctx.rotate(-Math.PI / 2); metaText(ctx, links, 0, 0, CH.moeder, 'center', 28); ctx.restore();
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const k = i * 2 + j, f = clamp(n - k, 0, 1), vx = x0 + c * (j + 1), vy = y0 + c * i;
    const dimA = dimNiet >= 0 && k !== dimNiet ? 0.35 : 1; ctx.save(); ctx.globalAlpha *= dimA;
    roundRect(ctx, vx, vy, c - 12, c - 12, 14); shape(ctx, rgba(C.fill, 0.9), k === hl ? C.goud : C.line, k === hl ? 4 : 1.5);
    if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; const g = [lt[i], bt[j]].sort((p, q) => (p === p.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')) ? 0 : 1) - (q === q.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')) ? 0 : 1)).join('');
      text(ctx, g, vx + (c - 12) / 2, vy + (feno > 0.01 ? c * 0.38 : c * 0.55), fTekst(54, 700), C.text, 'center');
      if (feno > 0.01) { const wit = g === g.toLowerCase(); ctx.save(); ctx.globalAlpha *= feno; bloemIcoon(ctx, vx + (c - 12) / 2, vy + c * 0.66, 64, wit ? 'wit' : 'paars'); ctx.restore(); }
      ctx.restore(); }
    ctx.restore(); }
  ctx.restore(); }

// ---------- F2-veld: 929 stippen, 705 paars en 224 wit (Mendel 1866, proef 3) ----------
function f2Veld(ctx, x, y, w, h, n = 1, o = {}) { const N = 929, nw = 224, pts = []; let s = 11; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const cols = 43, rows = Math.ceil(N / cols), dx = w / cols, dy = h / rows; const order = []; for (let i = 0; i < N; i++) order.push(i);
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const witSet = new Set(order.slice(0, nw)); const m = Math.floor(N * clamp(n, 0, 1));
  for (let i = 0; i < m; i++) { const cx = x + (i % cols) * dx + dx / 2 + (r() - 0.5) * dx * 0.3, cy = y + Math.floor(i / cols) * dy + dy / 2 + (r() - 0.5) * dy * 0.3;
    ctx.beginPath(); ctx.arc(cx, cy, Math.min(dx, dy) * 0.36, 0, 6.283); ctx.fillStyle = witSet.has(i) ? ERW.wit.vlag : ERW.paars.vlag; ctx.fill(); } }

// ---------- historische figuur Mendel (zoals in Geschiedenis van de biologie: castboekstijl, geen portret) ----------
if (typeof CAST !== 'undefined' && !CAST.mendel) CAST.mendel = { naam: 'mendel', rol: 'historisch', wenkbrauw: '#2A1C16', schoen: '#2A2F3E', schoenAccent: '#3A3F4E', lengte: 1, leeftijd: 38,
  huid: '#EBC6A6', haar: '#5A4A3A', kapsel: 'kort', top: 'jas', topKleur: '#22222A', topAccent: '#1A1A20', broek: '#22222A', accessoire: ['bril'] };

// ================= film-eigen hulp (Erfelijkheid 2, versie 2.0) =================
// Macro (nacht): kloostertuin met laag muurtje — vlak, drie lagen, geen korrel
function tuin(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#26385A'; ctx.fillRect(0, 520, W, 120);
  ctx.fillStyle = '#4B5878'; ctx.beginPath(); ctx.moveTo(0, 560); ctx.lineTo(260, 430); ctx.lineTo(520, 560); ctx.lineTo(820, 470); ctx.lineTo(1100, 560); ctx.lineTo(1420, 455); ctx.lineTo(1760, 560); ctx.lineTo(W, 500); ctx.lineTo(W, 560); ctx.fill();
  ctx.fillStyle = '#5A5A62'; ctx.fillRect(0, 590, W, 70); ctx.fillStyle = '#6A6A72'; for (let i = 0; i < 24; i++) ctx.fillRect(i * 82 + (i % 2) * 20, 596, 74, 26);
  ctx.fillStyle = C.bgMacroHill; ctx.fillRect(0, 660, W, 190); ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 846, W, H - 846);
  ctx.fillStyle = '#4A3A2C'; ctx.fillRect(0, 838, W, 14); }
const VLOER2 = 846;
// pincet met (optioneel) een helmknop vol stuifmeel aan de punt
function pincet(ctx, x, y, ang, L, a = 1, helm = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(L, -10); ctx.moveTo(0, 4); ctx.lineTo(L, 10); ctx.stroke();
  if (helm > 0.01) { ctx.globalAlpha *= helm; ctx.fillStyle = ERW.helm; ctx.beginPath(); ctx.ellipse(-10, 0, 13, 8, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#B8963A'; ctx.lineWidth = 1.5; ctx.stroke(); } ctx.restore(); }
// een allelletter die van a naar b vliegt (boog), u 0..1
function vliegLetter(ctx, l, ax, ay, bx, by, u, kl = C.text, px = 48) { if (u <= 0.001) return; const e = ease(clamp(u, 0, 1)), x = lerp(ax, bx, e), y = lerp(ay, by, e) - Math.sin(e * Math.PI) * 80;
  ctx.save(); ctx.beginPath(); ctx.arc(x, y - px * 0.35, px * 0.62, 0, 6.283); shape(ctx, rgba(kl, 0.25), kl, 2.5); text(ctx, l, x, y, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
// labmuis met chip en klein onderschrift
function muisMet(ctx, x, y, vacht, kijk, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; labmuis(ctx, x, y, 13, { vacht, kijk, houding: 'staan' }); ctx.restore(); }

// ---- simulatie van 400 bevruchtingen (Aa × Aa), vaste startwaarde; de eerste 4 bevatten 2 witte
const SIM2 = (() => { let s = 1; const zoek = () => { for (let seed = 1; seed < 5000; seed++) { let r = seed; const rnd = () => { r = (r * 16807) % 2147483647; return r / 2147483647; };
    const v = []; for (let i = 0; i < 400; i++) { const g1 = rnd() < 0.5 ? 'A' : 'a', g2 = rnd() < 0.5 ? 'A' : 'a'; v.push({ cel: (g1 === 'A' ? 0 : 1) * 2 + (g2 === 'A' ? 0 : 1), wit: g1 === 'a' && g2 === 'a' }); }
    const w4 = v.slice(0, 4).filter(x => x.wit).length, wt = v.filter(x => x.wit).length; if (w4 === 2 && wt >= 97 && wt <= 103) return { seed, v, wit: wt }; } return null; }; return zoek(); })();
// tijd waarop bevruchting i start (relatief), met eerst 4 langzaam, daarna versneld
function simT(i) { return i < 4 ? i * 0.75 : 3 + Math.pow((i - 4) / 396, 0.8) * 6; }
// teken de kolommen tot tijd tt (s sinds start); geeft {paars, wit}
function simKolommen(ctx, tt, X, o = {}) { const { x1 = 900, x2 = 1180, base = 760, schema = null, r = 6.5, gap = 16, per = 12 } = o; let np = 0, nw = 0;
  SIM2.v.forEach((d, i) => { const t0 = simT(i), vl = i < 4 ? 0.6 : 0.35; if (tt < t0) return; const u = clamp((tt - t0) / vl, 0, 1);
    const k = d.wit ? nw : np; const kx = (d.wit ? x2 : x1) + (k % per) * gap, ky = base - Math.floor(k / per) * gap; if (d.wit) nw++; else np++;
    let sx = kx, sy = ky; if (schema) { const c = schema(d.cel); sx = c[0]; sy = c[1]; }
    const e = ease(u), x = lerp(sx, kx, e), y = lerp(sy, ky, e) - Math.sin(e * Math.PI) * (i < 4 ? 120 : 40);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = d.wit ? ERW.wit.vlag : ERW.paars.vlag; ctx.fill(); });
  return { paars: np, wit: nw }; }

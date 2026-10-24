// Evolutie v2 · film 5 Toeval en uitwisseling — film-eigen tekeningen en simulaties (22 okt 2026)
// Krachtkleuren (lib_evo EVO.kracht): selectie groen, drift goud, genenstroom teal, mutatie paars.

// ---------- deterministische random ----------
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function binom(n, p, rnd) { if (n > 200) { const m = n * p, s = Math.sqrt(n * p * (1 - p)); let u = 0; for (let i = 0; i < 12; i++) u += rnd(); return Math.max(0, Math.min(n, Math.round(m + s * (u - 6)))); } let k = 0; for (let i = 0; i < n; i++) if (rnd() < p) k++; return k; }
// Wright-Fisher: N diploïde dieren = 2N allelen; geeft array p[0..gen]
function wrightFisher(N, p0, gen, seed) { const r = mulberry32(seed); const out = [p0]; let p = p0; for (let g = 0; g < gen; g++) { p = binom(2 * N, p, r) / (2 * N); out.push(p); } return out; }
// Genenstroom tussen twee populaties (eiland-model, deterministisch + kleine drift): m = deel migranten per generatie
function genenstroom(pA, pB, m, gen, N, seed) { const r = mulberry32(seed); const A = [pA], B = [pB]; for (let g = 0; g < gen; g++) { const a = (1 - m) * pA + m * pB, b = (1 - m) * pB + m * pA; pA = binom(2 * N, a, r) / (2 * N); pB = binom(2 * N, b, r) / (2 * N); A.push(pA); B.push(pB); } return [A, B]; }
const DRIFT = { klein: [], groot: [] };
for (let i = 0; i < 8; i++) { DRIFT.klein.push(wrightFisher(10, 0.5, 60, 101 + i * 17)); DRIFT.groot.push(wrightFisher(5000, 0.5, 60, 501 + i * 17)); }
const STROOM = genenstroom(0.9, 0.1, 0.05, 40, 1000, 77);

// ---------- grafiek: allelfrequentie tegen generaties (Schema) ----------
function frequentieGrafiek(ctx, x, y, w, h, lijnen, o = {}) {
  const { gen = 60, kleur = C.goud, a = 1, titel = null, markeer = -1, kleuren = null, yLabel = 'aandeel allel teal', lw = 3.5 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y - h * i / 4); ctx.lineTo(x + w, y - h * i / 4); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w + 10, y); ctx.stroke();
  metaText(ctx, '100%', x - 16, y - h + 10, C.text2, 'right', 28); metaText(ctx, '50%', x - 16, y - h / 2 + 10, C.text2, 'right', 28); metaText(ctx, '0%', x - 16, y + 10, C.text2, 'right', 28);
  metaText(ctx, 'generatie', x + w, y + 46, C.text2, 'right', 28); metaText(ctx, '0', x, y + 46, C.text2, 'left', 28); metaText(ctx, String(gen), x + w - 190, y + 46, C.text2, 'right', 28);
  if (titel) metaText(ctx, titel, x, y - h - 40, C.grain, 'left', 28);
  lijnen.forEach((L, i) => { const k = kleuren ? kleuren[i] : kleur; ctx.strokeStyle = (markeer >= 0 && i !== markeer) ? rgba(k, 0.35) : k; ctx.lineWidth = i === markeer ? lw + 1.5 : lw; ctx.lineJoin = 'round'; ctx.beginPath();
    L.slice(0, gen + 1).forEach((p, g) => { const px = x + g / gen * w, py = y - p * h; g ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); });
  ctx.restore();
}

// ---------- telpoppetje (pictogram, toegestaan in een telling) ----------
function telpop(ctx, x, y, h, kleur, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = kleur; circ(ctx, x, y - h * 0.82, h * 0.16, kleur); roundRect(ctx, x - h * 0.2, y - h * 0.62, h * 0.4, h * 0.62, h * 0.14); ctx.fill(); ctx.restore(); }

// ---------- Pingelap-atol als kaart (Schema) ----------
// Recept: ringvormig rif (±4 km breed), drie eilanden op het rif: Pingelap (lang, gebogen, oost en noord), Sukoru (west), Daekae (zuidwest). Lagune binnen het rif. Vereenvoudigd naar kaartschets, 'schematisch'.
function pingelapKaart(ctx, x, y, s = 1, o = {}) {
  const { a = 1, namen = true } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // rif (licht teal ring) en lagune
  ctx.beginPath(); ctx.ellipse(0, 0, 300, 250, -0.2, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.18); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.ellipse(0, 0, 250, 200, -0.2, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.32); ctx.fill();
  const land = C.okerD, rand = _lt(C.okerD, 0.35);
  // Pingelap: gebogen strook langs oost- en noordkant
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = land; ctx.lineWidth = 46; ctx.beginPath(); ctx.ellipse(0, 0, 268, 222, -0.2, -1.95, 0.75); ctx.stroke();
  ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, 291, 245, -0.2, -1.95, 0.75); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 245, 199, -0.2, -1.95, 0.75); ctx.stroke();
  // Sukoru (west) en Daekae (zuidwest)
  ctx.strokeStyle = land; ctx.lineWidth = 36; ctx.beginPath(); ctx.ellipse(0, 0, 268, 222, -0.2, 2.75, 3.45); ctx.stroke();
  ctx.lineWidth = 30; ctx.beginPath(); ctx.ellipse(0, 0, 268, 222, -0.2, 1.75, 2.2); ctx.stroke();
  // palmen als kleine kruinen op het hoofdeiland
  for (let i = 0; i < 14; i++) { const t = -1.85 + i * 0.18, px = Math.cos(t) * 268, py = Math.sin(t) * 222; const c = Math.cos(-0.2), sn = Math.sin(-0.2); circ(ctx, px * c - py * sn, px * sn + py * c, 9 + 3 * hash(i), '#5FA86E', _lt('#5FA86E', 0.3), 1.5); }
  ctx.restore();
  if (namen) { const c = Math.cos(-0.2), sn = Math.sin(-0.2), pt = (t, r = 1.38) => { const px = Math.cos(t) * 268 * r, py = Math.sin(t) * 222 * r; return [x + (px * c - py * sn) * s, y + (px * sn + py * c) * s]; };
    const [lx, ly] = pt(-0.5); naamBij(ctx, 'Pingelap', 'atol · ±4 km', lx, ly, a, 'left'); }
}

// ---------- atol in Macro-nacht (zijaanzicht): zee, smal eiland met palmen ----------
function palm(ctx, x, y, h, buig = 0.15, a = 1) { ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#6B5440'; ctx.lineWidth = h * 0.05; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + h * buig, y - h * 0.55, x + h * buig * 1.6, y - h); ctx.stroke();
  const tx = x + h * buig * 1.6, ty = y - h; ctx.fillStyle = '#4F7F58';
  for (let i = 0; i < 7; i++) { const an = -Math.PI + i * (Math.PI / 6) + (hash(i + x) - 0.5) * 0.2, L = h * (0.42 + 0.1 * hash(i * 3 + x)); const ex = tx + Math.cos(an) * L, ey = ty + Math.sin(an) * L * 0.55 + L * 0.35;
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(tx + Math.cos(an) * L * 0.6, ty + Math.sin(an) * L * 0.6 - h * 0.08, ex, ey); ctx.quadraticCurveTo(tx + Math.cos(an) * L * 0.5, ty + Math.sin(an) * L * 0.45, tx, ty); ctx.fill(); }
  ctx.restore(); }
function atolMacro(ctx, o = {}) { const { storm = 0 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, 420, W, 200);
  ctx.fillStyle = '#25456E'; ctx.fillRect(0, 600, W, H - 600); // zee (gedempt water)
  ctx.strokeStyle = rgba('#5B86B8', 0.5); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const yy = 650 + i * 30; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const px = k * 66, py = yy + Math.sin(k * 0.9 + i) * (4 + storm * 10); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  vul(ctx, [[300, 612], [520, 590], [900, 584], [1350, 588], [1620, 606], [1640, 620], [280, 622]], '#C9B07A'); // zandstrand
  vul(ctx, [[360, 600], [560, 572], [900, 566], [1300, 570], [1560, 598], [1560, 606], [360, 606]], '#3A5540');
  const palmen = [[420, 600, 150, 0.12], [520, 590, 190, -0.1], [640, 584, 165, 0.18], [760, 580, 210, 0.05], [905, 576, 175, -0.14], [1010, 578, 200, 0.16], [1130, 580, 160, 0.02], [1240, 584, 195, -0.12], [1380, 592, 150, 0.2], [1490, 600, 170, -0.06]];
  for (const [px, py, ph, b] of palmen) palm(ctx, px, py, ph, b + storm * 0.35);
}

// ---------- jachtluipaard (Acinonyx jubatus), zijaanzicht, staand/stappend ----------
// Recept C9 (bron: Kingdon; Hunter & Hamman): kop-romp ±120 cm, staart ±70 cm (≈ 0,6 × romp), schofthoogte ±80 cm (≈ 0,65 × romp); kleine ronde kop met korte snuit, kleine ronde oren hoog en ver uiteen;
// diepe borst, smalle 'wespentaille', lange slanke poten; massieve zwarte stippen (geen rozetten); zwarte traanstreep van binnenooghoek naar mondhoek; staart met zwarte ringen en witte punt; ronde pupil, amberkleurige iris.
// Bekende fouten: rozetten zoals een luipaard, korte poten, dikke nek. Anker = midden onder (tussen de poten), kop naar rechts. s=1 → ±600 px lang (romp).
function jachtluipaard(ctx, x, y, s = 1, o = {}) {
  const { kijk = 1, a = 1, fase = 0 } = o; _bd(ctx, x, y, s, kijk, a);
  const vacht = '#D3A35E', vachtL = '#EBD3A4', vachtD = '#B5864A', zwart = '#1E1A16';
  // poten: [heupX, heupY, kniehoek…] als drie segmenten; achterpoten met hak (backward 'knee' = hiel)
  const been = (pts, w0, w1, kleur) => { ctx.strokeStyle = kleur; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 0; i < pts.length - 1; i++) { ctx.lineWidth = w0 + (w1 - w0) * (i / (pts.length - 1)); ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); ctx.stroke(); }
    const v = pts[pts.length - 1]; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(v[0] + 7, v[1] - 4, 13, 7, 0, 0, 6.283); ctx.fill(); };
  const sw = Math.sin(fase * 6.283) * 14;
  // verre poten (donkerder)
  been([[-175, -250], [-160 - sw, -175], [-205 - sw, -95], [-188 - sw, -8]], 30, 14, vachtD);
  been([[150, -250], [165 + sw, -150], [160 + sw, -60], [168 + sw, -8]], 26, 14, vachtD);
  // staart: lange boog, laag hangend, punt omhoog gekruld
  const st = [[-235, -330], [-330, -300], [-405, -230], [-440, -150], [-430, -95], [-405, -80]];
  ctx.strokeStyle = vacht; ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; zacht(ctx, st, false); ctx.stroke();
  // staartringen + witte punt
  for (const [u, k] of [[0.62, zwart], [0.72, zwart], [0.81, zwart], [0.9, zwart]]) { const i = Math.floor(u * (st.length - 1)), f = u * (st.length - 1) - i; const px = lerp(st[i][0], st[i + 1][0], f), py = lerp(st[i][1], st[i + 1][1], f); circ(ctx, px, py, 11, k); }
  circ(ctx, -406, -82, 11, '#F2EEE4');
  // romp: diepe borst, smalle taille, korte nek naar kleine kop
  const romp = [[-250, -330], [-150, -345], [-20, -335], [110, -355], [190, -372], [235, -400], [262, -400], [270, -360], [250, -300], [205, -235], [140, -220], [40, -235], [-60, -270], [-150, -262], [-230, -255], [-265, -290]];
  vul(ctx, romp, vacht);
  // lichtere buik
  binnen(ctx, romp, () => { vul(ctx, [[-240, -268], [-150, -270], [-60, -282], [40, -248], [140, -232], [210, -240], [210, -200], [-240, -200]], vachtL); });
  // stippen: massief, onregelmatig verspreid, kleiner op poten en kop
  // dij en schouderblad als volle vormen (geen stokpoten)
  vul(ctx, [[-250, -320], [-170, -330], [-135, -260], [-150, -190], [-185, -175], [-225, -230]], vacht);
  vul(ctx, [[120, -330], [190, -350], [200, -260], [180, -190], [150, -200], [130, -260]], vacht);
  binnen(ctx, romp, () => { for (let i = 0; i < 130; i++) { const px = -255 + hash(i * 3.1) * 520, py = -400 + hash(i * 5.7) * 180; if (py > -262 && px < 120) continue; circ(ctx, px, py, 3.5 + 2.5 * hash(i * 9.3), zwart); } });
  // nabije poten
  const vp = [[-185, -270], [-150 + sw, -170], [-205 + sw, -90], [-178 + sw, -6]], ap = [[160, -255], [180 - sw, -150], [172 - sw, -58], [184 - sw, -6]];
  been(vp, 38, 15, vacht); been(ap, 30, 15, vacht);
  for (const P of [vp, ap]) for (let i = 0; i < 9; i++) { const u = 0.1 + i * 0.09, k = Math.min(P.length - 2, Math.floor(u * (P.length - 1))), f = u * (P.length - 1) - k; circ(ctx, lerp(P[k][0], P[k + 1][0], f) + (i % 2 ? 6 : -6), lerp(P[k][1], P[k + 1][1], f), 4, zwart); }
  // kop: klein en rond, korte snuit
  const kop = [[240, -410], [262, -440], [298, -452], [334, -444], [356, -424], [368, -400], [362, -384], [340, -378], [312, -374], [278, -372], [250, -384]];
  vul(ctx, kop, vacht);
  // oren: klein, rond, hoog en ver uiteen, zwarte achterkant
  for (const [ox, oy] of [[270, -448], [300, -458]]) { ctx.beginPath(); ctx.ellipse(ox, oy, 12, 15, -0.2, 0, 6.283); ctx.fillStyle = vachtD; ctx.fill(); ctx.beginPath(); ctx.ellipse(ox - 2, oy - 2, 7, 10, -0.2, 0, 6.283); ctx.fillStyle = zwart; ctx.fill(); }
  // snuit lichter, neus, traanstreep
  vul(ctx, [[336, -404], [362, -404], [368, -390], [356, -380], [330, -382]], vachtL);
  circ(ctx, 365, -401, 6, '#3A2A24');
  ctx.strokeStyle = zwart; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(325, -418); ctx.quadraticCurveTo(334, -398, 340, -382); ctx.stroke();
  dierOog(ctx, 320, -422, 7.5, '#B8862E', { pupil: 'rond' });
  // kopstippen klein
  for (let i = 0; i < 8; i++) circ(ctx, 255 + hash(i * 7) * 50, -432 + hash(i * 3) * 34, 2.5, zwart);
  ctx.restore();
}

// ---------- sikkelcel (rode bloedcel bij HbSS, zuurstofarm): halvemaanvorm, stijf ----------
// Recept: normale cel = ingedeukte schijf 7–8 µm (rodeBloedcel uit lib_bio); sikkelcel = langgerekte halve maan, ±1,5–2× zo lang, uiteinden spits, zonder lichte deuk.
function sikkelcel(ctx, x, y, r, an = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(-r * 1.55, r * 0.35); ctx.quadraticCurveTo(-r * 0.9, -r * 0.95, 0, -r * 0.95); ctx.quadraticCurveTo(r * 0.9, -r * 0.95, r * 1.55, r * 0.35); ctx.quadraticCurveTo(r * 0.7, -r * 0.05, 0, -r * 0.08); ctx.quadraticCurveTo(-r * 0.7, -r * 0.05, -r * 1.55, r * 0.35); ctx.closePath();
  shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1.5);
  ctx.restore(); }

// ---------- flessenhals-pot: grote pot, smalle hals, kleine pot (Schema) ----------
function flessenhals(ctx, x, y, s = 1, o = {}) { const { a = 1, kleur = C.goud } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = kleur; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-120, -60); ctx.quadraticCurveTo(-20, -60, -14, -18); ctx.lineTo(-14, 18); ctx.quadraticCurveTo(-20, 60, -120, 60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, -60); ctx.quadraticCurveTo(20, -60, 14, -18); ctx.lineTo(14, 18); ctx.quadraticCurveTo(20, 60, 120, 60); ctx.stroke();
  ctx.restore(); }

// ---------- omheind reservaat (kaart als schema): afgeronde rechthoek met hekpaaltjes ----------
function reservaat(ctx, x, y, w, h, o = {}) { const { a = 1, naam = null } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 26); shape(ctx, rgba(C.groen, 0.12), C.line, 3);
  ctx.fillStyle = C.line; const omtrek = 2 * (w + h); for (let d = 0; d < omtrek; d += 44) { let px, py; if (d < w) { px = x + d; py = y; } else if (d < w + h) { px = x + w; py = y + d - w; } else if (d < 2 * w + h) { px = x + w - (d - w - h); py = y + h; } else { px = x; py = y + h - (d - 2 * w - h); } ctx.fillRect(px - 3, py - 3, 6, 6); }
  if (naam) metaText(ctx, naam, x + w / 2, y + h + 40, C.text2, 'center', 26);
  ctx.restore(); }

// ---------- jachtluipaard-icoon (klein, voor kaarten): dezelfde tekening, sterk verkleind ----------
function luipaardIcoon(ctx, x, y, s = 0.14, kijk = 1, a = 1) { jachtluipaard(ctx, x, y, s, { kijk, a }); }

// ---------- genotypebalk voor Hardy-Weinberg (vwo): drie vakken p², 2pq, q² in tinten (teal, menging, oker) ----------
function genotypeBalk(ctx, x, y, w, p, o = {}) { const { h = 70, a = 1 } = o; const q = 1 - p; const delen = [[p * p, EVO.a1, 'p²'], [2 * p * q, '#8FA67F', '2pq'], [q * q, EVO.a2, 'q²']];
  ctx.save(); ctx.globalAlpha *= a; let xx = x;
  for (const [f, k, n] of delen) { const ww = w * f; roundRect(ctx, xx + 2, y, ww - 4, h, 10); shape(ctx, rgba(k, 0.85), _lt(k.startsWith('#') ? k : '#8FA67F', 0.35), 2); if (ww > 90) text(ctx, n, xx + ww / 2, y + h / 2 + 14, fTekst(40, 700), C.bgMicro, 'center'); xx += ww; }
  ctx.restore(); }

// ---------- losse allelknikker (zelfde als in teken_evo1.js; dubbel zodat film 5 los rendert — samenvoegen in de reeksbibliotheek) ----------
function knikker(ctx, x, y, r, kleur, a = 1) { ctx.save(); ctx.globalAlpha *= a; const rr = kleur === EVO.a1 ? EVO.a1R : kleur === EVO.a2 ? EVO.a2R : _lt(kleur, 0.4); circ(ctx, x, y, r, kleur, rr, 2); circ(ctx, x - r * 0.35, y - r * 0.35, r * 0.22, 'rgba(255,255,255,0.35)'); ctx.restore(); }

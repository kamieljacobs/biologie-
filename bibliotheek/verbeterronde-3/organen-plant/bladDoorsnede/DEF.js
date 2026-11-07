// =====================================================================================
// BLAD IN DOORSNEDE — variant A (verbeterronde 2) + WATERDAMP (verbeterronde 3, 28 okt 2026; Kamiel: 'blad: ook waterdamp naar buiten'): PLATTE DOORSNEDE MET ÉÉN GROOT HUIDMONDJE. Geen blokje: alleen het snijvlak,
// zoals de leerboekfoto onder de microscoop. Rustig: weinig cellen, weinig bladgroenkorrels, veel lucht in het sponsweefsel.
// Recept (LibreTexts Botany, Ha/Morrow/Algiers 3.4.2 'Internal Leaf Structure'; UF/IFAS 'Stomate'):
//  - boven → onder: cuticula (doorzichtig laagje) – bovenopperhuid (doorzichtige cellen, geen bladgroen) – palissadeweefsel
//    (cellen in kolommen, veel bladgroen) – sponsweefsel (losse cellen, luchtholtes) – onderopperhuid – cuticula.
//  - nerf: hout (xyleem, grotere cellen, teal = water) boven, bast (floëem, kleinere cellen, oker = suikers) onder, met een
//    ring schedecellen eromheen.
//  - huidmondje in de onderopperhuid (daar zitten de meeste): TWEE SLUITCELLEN (de enige opperhuidcellen met bladgroen) rond een
//    spleet; erboven een grote luchtholte. o.open 0..1: dicht → de sluitcellen liggen tegen elkaar · open → ze bollen op en
//    tussen hen ligt een duidelijke open spleet.
//  - gaswisseling (o.gas 0..1, alleen als de spleet open is): CO2 (grijs, drie bolletjes O–C–O op een rij, grijze pijl)
//    gaat door de spleet naar binnen; O2 (teal, twee bolletjes, teal pijl, vaste molecuulkleur) gaat naar buiten. Twee
//    verschillende vormen, kleuren én pijlrichtingen, zodat je ze ook zonder kleur uit elkaar houdt.
//  - verdamping (o.water 0..1, standaard = o.gas; alleen als de spleet open is): waterdamp (H2O: één groot bijna wit
//    zuurstofbolletje met twee kleine waterstofjes in een V, dus geknikt; geen pijlpunt maar een rustig stippelspoor) komt uit
//    de luchtholte en gaat recht door het midden van de spleet naar buiten, tussen CO2 (links, naar binnen) en O2 (rechts, naar
//    buiten). Wit/stippel ↔ grijs/drie-op-een-rij ↔ teal/twee: ook zonder kleur uit elkaar te houden.
//    (OpenStax Biology 2e § 30.5 / 30.4: water verdampt uit het blad via de huidmondjes (transpiratie); de waterdamp komt uit
//    de luchtruimtes in het sponsweefsel.)
// Bekende fouten: huidmondje aan de bovenkant; sluitcellen zonder bladgroen; spleet die niet te zien is; palissade en spons
// omgedraaid; hout onder de bast.
// Aanroep (zelfde als ronde 1): bladDoorsnede(ctx, x, y, s, {a, t, open, gas, hi}); nieuw: water (standaard = gas). ontwerp ± 700 × 470 (met gas ± 560 hoog),
// oorsprong = midden; o.hi = 'palissade' | 'spons' | 'nerf' | 'huidmondje' | 'opperhuid' dimt de rest.
// Geeft ankers terug {palissade, spons, nerf, huidmondje, opperhuid, bovenkant, co2, o2, water}.
// =====================================================================================
// BLAD2 staat al in lib_bio.js (variant A is ingebouwd); alleen de twee waterdampkleuren komen erbij:
Object.assign(BLAD2, { h2o: '#E9EEF3', h2oH: '#FFFFFF' });
function _bladCO2(ctx, x, y, r, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); [[-1.55, BLAD2.co2], [1.55, BLAD2.co2], [0, BLAD2.co2c]].forEach(([dx, kl]) => { ctx.beginPath(); ctx.arc(dx * r, 0, r * (dx ? 0.9 : 0.8), 0, 6.283); shape(ctx, kl, lighten(BLAD2.co2, 0.4), Math.max(0.8, r * 0.12)); }); ctx.restore(); }
function _bladO2(ctx, x, y, r, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); [-0.75, 0.75].forEach(dx => { ctx.beginPath(); ctx.arc(dx * r, 0, r * 0.9, 0, 6.283); shape(ctx, BLAD2.o2, lighten(BLAD2.o2, 0.45), Math.max(0.8, r * 0.12)); }); ctx.restore(); }
function _bladH2O(ctx, x, y, r, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); // geknikt: O in het midden, twee H in een V (± 104,5°)
  [-0.91, 0.91].forEach(k => { ctx.beginPath(); ctx.arc(Math.sin(k) * r * 1.15, Math.cos(k) * r * 1.15, r * 0.52, 0, 6.283); shape(ctx, BLAD2.h2oH, lighten(BLAD2.h2o, 0.2), Math.max(0.6, r * 0.1)); });
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, BLAD2.h2o, '#B9C4D0', Math.max(0.8, r * 0.12)); ctx.restore(); }
function _bladPijl(ctx, P, kl, w) { // gebogen pijl langs punten P (laatste punt = punt van de pijl)
  ctx.save(); ctx.strokeStyle = kl; ctx.fillStyle = kl; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, P.slice(0, -1).concat([P[P.length - 1]]), false); ctx.stroke();
  const a = P[P.length - 2], b = P[P.length - 1], an = Math.atan2(b[1] - a[1], b[0] - a[0]), L = w * 3.6; ctx.beginPath(); ctx.moveTo(b[0] + Math.cos(an) * L * 0.5, b[1] + Math.sin(an) * L * 0.5);
  ctx.lineTo(b[0] + Math.cos(an + 2.5) * L, b[1] + Math.sin(an + 2.5) * L); ctx.lineTo(b[0] + Math.cos(an - 2.5) * L, b[1] + Math.sin(an - 2.5) * L); ctx.closePath(); ctx.fill(); ctx.restore(); }
function bladDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, open = 1, gas = 0, hi = null } = o, water = o.water == null ? gas : o.water;
  const W = (px, py) => [x + px * s, y + py * s], SX = -150; // SX = plek van het huidmondje
  const anker = { palissade: W(-300, -100), spons: W(-300, 60), nerf: W(150, 50), huidmondje: W(SX, 172), opperhuid: W(-300, -178), bovenkant: W(0, -205), co2: W(SX - 60, 250), o2: W(SX + 60, 250), water: W(SX, 285) };
  if (a <= 0.01) return anker;
  const dim = k => (hi && hi !== k) ? 0.35 : 1, op = ease(clamp(open, 0, 1)), g = gas * op, gw = clamp(water, 0, 1) * op;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const L = -350, R = 350, Y = { cut: -204, hb: -198, pal: -164, sp: -44, ho: 140, onder: 172 };
  ctx.save(); ctx.beginPath(); ctx.rect(L, -210, R - L, 390); ctx.clip();
  // achtergrond = lucht in het blad
  ctx.fillStyle = BLAD2.lucht; ctx.fillRect(L, Y.pal, R - L, Y.ho - Y.pal);
  // sponsweefsel: losse, ronde cellen (vast patroon), vrij gehouden: luchtholte boven het huidmondje en de nerf
  ctx.save(); ctx.globalAlpha *= dim('spons');
  for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) { const cx = L + 22 + c * 56 + (r % 2) * 26 + (hash(r * 13 + c) - 0.5) * 14, cy = Y.sp + 26 + r * 42 + (hash(r * 7 + c * 3) - 0.5) * 10;
    if (Math.hypot(cx - SX, (cy - 112) * 0.9) < 62) continue; if (Math.hypot((cx - 150) * 0.85, cy - 50) < 82) continue;
    const rx = 23 + hash(c * 5 + r) * 5, ry = 16 + hash(c + r * 9) * 5; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, (hash(c * 2 + r) - 0.5) * 0.8, 0, 6.283); shape(ctx, BLAD2.spons, BLAD2.palR, 1.5);
    for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.ellipse(cx + (k ? 8 : -8), cy + (k ? 3 : -3), 4.5, 3, 0.3, 0, 6.283); ctx.fillStyle = BLAD2.korrel; ctx.fill(); } }
  ctx.restore();
  // nerf: schede, hout boven (teal), bast onder (oker)
  ctx.save(); ctx.globalAlpha *= dim('nerf'); ctx.beginPath(); ctx.ellipse(150, 50, 70, 62, 0, 0, 6.283); shape(ctx, BLAD2.schede, lighten(BLAD2.schede, 0.3), 1.5);
  ctx.beginPath(); ctx.ellipse(150, 50, 54, 46, 0, 0, 6.283); ctx.fillStyle = '#2E3F55'; ctx.fill();
  [[-26, 28, 13], [0, 22, 15], [26, 28, 13], [-12, 46, 10], [14, 46, 10]].forEach(([dx, dy, rr]) => { ctx.beginPath(); ctx.arc(150 + dx, 50 - 52 + dy, rr, 0, 6.283); shape(ctx, rgba(BLAD2.hout, 0.35), BLAD2.hout, 3); });
  for (let k = 0; k < 7; k++) { const dx = -30 + k * 10, dy = 66 + (k % 2) * 9; ctx.beginPath(); ctx.arc(150 + dx, dy, 6, 0, 6.283); shape(ctx, rgba(BLAD2.bast, 0.55), BLAD2.bast, 1.5); }
  ctx.restore();
  // palissadeweefsel: kolommen met bladgroen
  ctx.save(); ctx.globalAlpha *= dim('palissade');
  for (let c = 0; c < 20; c++) { const cx = L + 18 + c * 35.5; roundRect(ctx, cx - 15, Y.pal + 4, 30, Y.sp - Y.pal - 8, 13); shape(ctx, BLAD2.pal, BLAD2.palR, 1.5);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(cx + (k % 2 ? 6 : -6), Y.pal + 22 + k * 24, 5.5, 3.5, 0.2, 0, 6.283); ctx.fillStyle = BLAD2.korrel; ctx.fill(); } }
  ctx.restore();
  // bovenopperhuid + cuticula
  ctx.save(); ctx.globalAlpha *= dim('opperhuid');
  for (let c = 0; c < 12; c++) { roundRect(ctx, L + 2 + c * 59, Y.hb + 2, 56, Y.pal - Y.hb - 3, 8); shape(ctx, rgba(BLAD2.huid, 0.28), BLAD2.huid, 1.5); }
  ctx.fillStyle = BLAD2.cut; ctx.fillRect(L, Y.cut, R - L, 5);
  // onderopperhuid (vaste opening SX ± 60 voor het huidmondje) + cuticula
  const rij = (u0, u1) => { const n = Math.max(1, Math.round((u1 - u0) / 58)), w = (u1 - u0) / n; for (let c = 0; c < n; c++) { roundRect(ctx, u0 + c * w + 1, Y.ho + 2, w - 2, Y.onder - Y.ho - 3, 8); shape(ctx, rgba(BLAD2.huid, 0.28), BLAD2.huid, 1.5); } };
  rij(L - 20, SX - 60); rij(SX + 60, R + 20);
  ctx.fillStyle = BLAD2.cut; ctx.fillRect(L, Y.onder, SX - 60 - L, 5); ctx.fillRect(SX + 60, Y.onder, R - SX - 60, 5);
  ctx.restore();
  // huidmondje: twee sluitcellen (met bladgroen) rond de spleet; open = ze bollen op en wijken, dicht = ze raken elkaar
  ctx.save(); ctx.globalAlpha *= dim('huidmondje'); const half = lerp(0.5, 17, op), rx = (60 - half) / 2;
  [-1, 1].forEach(k => { const cx = SX + k * (half + rx), cy = Y.ho + 16; ctx.beginPath(); ctx.ellipse(cx, cy, rx, 19 + op * 4, 0, 0, 6.283); shape(ctx, BLAD2.sluit, BLAD2.palR, 2);
    for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.ellipse(cx + (q - 1) * rx * 0.42, cy + (q % 2 ? 5 : -5), 4, 2.8, 0.3, 0, 6.283); ctx.fillStyle = BLAD2.korrel; ctx.fill(); } });
  ctx.restore();
  ctx.restore(); // clip
  // gaswisseling: CO2 naar binnen (grijs, links), O2 naar buiten (teal, rechts)
  if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g;
    _bladPijl(ctx, [[SX - 70, 270], [SX - 30, 220], [SX - 6, 160], [SX - 8, 100]], BLAD2.co2, 5);
    _bladPijl(ctx, [[SX + 8, 95], [SX + 6, 160], [SX + 30, 220], [SX + 70, 268]], BLAD2.o2, 5);
    const f = (t * 0.25) % 1; _bladCO2(ctx, lerp(SX - 92, SX - 40, f), lerp(292, 230, f), 8, -0.9); _bladCO2(ctx, SX - 34, 112, 8, 1.4);
    _bladO2(ctx, lerp(SX + 30, SX + 80, f), lerp(220, 286, f), 9, 0.8); _bladO2(ctx, SX + 32, 96, 9, 0.3);
    ctx.restore(); }
  // verdamping: waterdamp uit de luchtholte recht door het midden van de spleet naar buiten (stippelspoor, geen pijlpunt)
  if (gw > 0.01) { ctx.save(); ctx.globalAlpha *= gw; ctx.strokeStyle = rgba(BLAD2.h2o, 0.55); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.setLineDash([2, 9]);
    const spoor = (u) => [SX + Math.sin(u * 7 + t * 0.8) * 7 * u, lerp(112, 300, u)]; ctx.beginPath(); for (let q = 0; q <= 40; q++) { const p = spoor(q / 40); q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.setLineDash([]);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.18 + k / 3) % 1 + 1) % 1, p = spoor(u); _bladH2O(ctx, p[0], p[1], 8, 0.4 * Math.sin(k * 2 + t)); }
    ctx.restore(); }
  ctx.restore(); return anker;
}

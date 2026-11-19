// Wat word jij? · Sport en topsport 3 · Sterk op het droge — eigen tekeningen (v1.0, 19 nov 2026).
// Seriekleuren (REEKS-sport): teal = water, goud = afzet en voortstuwing, koraal = weerstand en 'let op',
// oker = kracht en droogtraining, groen = geleidelijk opbouwen. Geen namen in beeld.
// Maten: Sam 1,79 m; startblok ± 0,75 m boven het water; 50-meterbad ± 2 m diep (zijaanzicht).
// Decors (bad en krachtzaal) zijn vlak getekend in de film zelf, alleen onder scènes die daar spelen.

const SP3 = { waterT: '#2C6A8A', waterD: '#1D4A66', tegel: '#3A7C9C', tegelL: '#5E9CBA', lijn: '#13283A', dek: '#3A4A62', dekL: '#56688A',
  muur: '#25344C', vloer: '#2E3B52', vloerL: '#3C4C66', mat: '#3E5C8A', matL: '#5676A8', staal: '#B8C2CE', schijf: '#30343C', schijfR: '#C9A35C',
  rek: '#5A6A84', elastiek: '#7FC48F', huidSam: '#7A5440' };
const GROND = 800; // vloerlijn in de krachtzaal

// ---------- castaanvullingen voor deze film (ter keuring) ----------
// krachttrainer (t11): nieuw beroepspersonage zonder naam, ± 30, sportkleding; Daan als figurant in zwemkleding (blauwe badmuts).
if (typeof CAST !== 'undefined') {
  if (!CAST.krachttrainer) CAST.krachttrainer = { naam: 'Krachttrainer', leeftijd: 31, rol: 'krachttrainer · bouwt de training in de krachtzaal stap voor stap op · alleen in zijn eigen vak; in beeld alleen het vak, geen naam',
    huid: '#B98060', haar: '#22180F', kapsel: 'kort', wenkbrauw: '#1E140C', baard: true,
    top: 'tshirt', topKleur: '#3A4152', topAccent: '#2E3442', broek: '#262B36', kort: true, schoen: '#F2F2EE', schoenAccent: '#C9A35C', accessoire: [], lengte: 1.02, schouderK: 2.05,
    garderobe: { zaal: {} } };
  if (CAST.daan && CAST.daan.garderobe && !CAST.daan.garderobe.zwem) CAST.daan.garderobe.zwem = { top: 'bloot', topKleur: '#EBC6A6', topAccent: '#D8B090', broek: '#2F5FA8', broekAccent: '#F2F2EE',
    schoen: '#EBC6A6', schoenAccent: '#EBC6A6', kapsel: 'badmuts', badmuts: '#2F7FD0', accessoire: ['zwembroek', 'blootsvoets', 'zwembril', 'sproeten'] };
}

// ---------- algemene hulpjes ----------
function SP3_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP3_antw(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function SP3_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP3_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function SP3_lijn(ctx, pts, col, lw = 3, a = 1, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP3_tekst(ctx, s2, x, y, px, col = C.text, al = 'left', a = 1, w = 700) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, fTekst(px, w), col, al); ctx.restore(); }
function SP3_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
// dikke pijl met kop (voor afzet en kracht)
function SP3_pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), k = Math.min(lw * 2.4, L * 0.6);
  ctx.translate(x1, y1); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -lw / 2); ctx.lineTo(L - k, -lw / 2); ctx.lineTo(L - k, -lw * 1.25); ctx.lineTo(L, 0); ctx.lineTo(L - k, lw * 1.25); ctx.lineTo(L - k, lw / 2); ctx.lineTo(0, lw / 2); ctx.closePath(); shape(ctx, rgba(col, 0.9), lighten(col, 0.3), 2); ctx.restore(); }
// ronde pijl (draaien), van hoek a0 naar a1 om (x, y)
function SP3_boogPijl(ctx, x, y, r, a0, a1, col, a = 1, lw = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, a0, a1, a1 < a0); ctx.stroke();
  const ex = x + Math.cos(a1) * r, ey = y + Math.sin(a1) * r, tg = a1 + (a1 < a0 ? -1 : 1) * Math.PI / 2; ctx.beginPath(); ctx.moveTo(ex + Math.cos(tg) * lw * 2.4, ey + Math.sin(tg) * lw * 2.4); ctx.lineTo(ex + Math.cos(tg + 2.4) * lw * 2, ey + Math.sin(tg + 2.4) * lw * 2); ctx.lineTo(ex + Math.cos(tg - 2.4) * lw * 2, ey + Math.sin(tg - 2.4) * lw * 2); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- lichaam in elke houding (zijaanzicht) ----------
// zoals zwemmer() uit lib_cast.js, maar met vrije armen, benen en draaiing: (x, y) = heupgewricht, lengte = staande lengte.
// o.pitch: 0 = hoofd naar rechts (kijk 1), + = hoofd omhoog; o.rug = op de rug (buik boven); o.naHoofd = armen gestrekt boven het hoofd.
function SP3_lijf(ctx, id, x, y, lengte, o = {}) {
  const P0 = CAST[id]; if (!P0) return {}; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {};
  const outfit = o.outfit || (P0.garderobe && P0.garderobe.zwem ? 'zwem' : undefined), P = Object.assign({}, P0, (P0.garderobe && outfit && P0.garderobe[outfit]) || {});
  const Hh = lengte * (P.lengte || 1), hh = Hh / (P.kop || 6.1), kijk = o.kijk || 1, pitch = o.pitch || 0;
  const M = new DOMMatrix().translate(x, y).scale(kijk, 1).scale(1, o.rug ? -1 : 1).rotate((Math.PI / 2 - pitch) * 180 / Math.PI);
  ctx.save(); ctx.transform(M.a, M.b, M.c, M.d, M.e, M.f);
  const nh = o.naHoofd ? [Math.PI - (-0.12), -0.12 - (-0.1)] : null;
  const r = persoon(ctx, id, 0, Hh - hh * 3.45, lengte, { zij: true, kijk: 1, vrij: true, outfit, a, uit: o.uit || 'neutraal', bril: o.bril || (outfit === 'zwem' ? 'ogen' : undefined), t: o.t || 0,
    arm: o.arm || nh || [0.1, 0.1], armK: o.armK || (nh ? [1.06, 1.06] : undefined), armVer: o.armVer || o.arm || nh || [0.1, 0.1], armVerK: o.armVerK || (nh ? [1.06, 1.06] : undefined),
    been1: o.been1 || { th: 0, kn: 0, an: -1.35 }, been2: o.been2 || o.been1 || { th: 0, kn: 0, an: -1.35 }, armNaHoofd: !!o.naHoofd, knik: o.knik });
  ctx.restore();
  const Wp = (pt) => { if (!pt || pt.x == null) return pt; const q = M.transformPoint(new DOMPoint(pt.x, pt.y)); return Object.assign({}, pt, { x: q.x, y: q.y }); };
  const d = hh * (P.schouderK ? P.schouderK * 0.68 : 1.25);
  return { hoofd: Wp(r.hoofd), handR: Wp(r.handR), voet: Wp(r.voet), heup: Wp({ x: 0, y: 0 }), schouder: Wp({ x: d * 0.04, y: -hh * 1.9 }), enkel: Wp({ x: 0, y: Hh - hh * 3.67 }), hh, M };
}

// ---------- zwembad (zijaanzicht onder water) ----------
// o: wl = waterlijn, bodem, muur = x van de keerpuntmuur (rechts) of null, a
function SP3_bad(ctx, o = {}) { const { wl = 300, bodem = 850, muur = null, a = 1, t = 0, x0 = 0, x1 = W } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const xe = muur != null ? muur : x1;
  // hal boven het water: rustige achterwand met lichtband
  ctx.fillStyle = rgba('#22324C', 0.9); ctx.fillRect(x0, wl - 200, xe - x0, 200);
  ctx.fillStyle = rgba(C.teal, 0.08); ctx.fillRect(x0, wl - 160, xe - x0, 34);
  const g = ctx.createLinearGradient(0, wl, 0, bodem); g.addColorStop(0, SP3.waterT); g.addColorStop(1, SP3.waterD); ctx.fillStyle = g; ctx.fillRect(x0, wl, xe - x0, bodem - wl);
  // bodemtegels en zwarte baanlijn (met T bij de muur)
  ctx.fillStyle = rgba(SP3.tegel, 0.55); ctx.fillRect(x0, bodem - 14, xe - x0, 14); ctx.strokeStyle = rgba(SP3.tegelL, 0.35); ctx.lineWidth = 1.5; for (let x = x0; x < xe; x += 46) { ctx.beginPath(); ctx.moveTo(x, bodem - 14); ctx.lineTo(x, bodem); ctx.stroke(); }
  ctx.fillStyle = SP3.lijn; ctx.fillRect(x0, bodem - 22, xe - x0 - (muur != null ? 120 : 0), 10);
  // waterlijn met kleine golfjes
  ctx.strokeStyle = rgba('#BFE3F2', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= xe; x += 12) { const y = wl + Math.sin(x * 0.03 + t * 2.2) * 3; x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
  if (muur != null) { // keerpuntmuur met tegels, dek erboven, T-markering op de muur
    ctx.fillStyle = SP3.tegel; ctx.fillRect(muur, wl - 60, x1 - muur, bodem - wl + 60); ctx.strokeStyle = rgba(SP3.tegelL, 0.7); ctx.lineWidth = 1.5;
    for (let y = wl - 60; y < bodem; y += 40) { ctx.beginPath(); ctx.moveTo(muur, y); ctx.lineTo(x1, y); ctx.stroke(); }
    for (let x = muur; x < x1; x += 40) { ctx.beginPath(); ctx.moveTo(x, wl - 60); ctx.lineTo(x, bodem); ctx.stroke(); }
    ctx.fillStyle = SP3.lijn; ctx.fillRect(muur, (wl + bodem) / 2 - 70, 14, 140); ctx.fillRect(muur, (wl + bodem) / 2 - 7, 60, 14);
    ctx.fillStyle = SP3.dekL; ctx.fillRect(muur - 10, wl - 74, x1 - muur + 10, 18); }
  ctx.restore(); }
// water als licht vlak vóór een lichaam (alleen onder de waterlijn), nooit de persoon zelf doorzichtig
function SP3_waterVoor(ctx, x0, x1, wl, bodem, t = 0) { ctx.save(); ctx.beginPath(); ctx.moveTo(x0, bodem); for (let x = x0; x <= x1; x += 12) ctx.lineTo(x, wl + Math.sin(x * 0.03 + t * 2.2) * 3); ctx.lineTo(x1, bodem); ctx.closePath(); ctx.fillStyle = rgba('#2C7FA8', 0.2); ctx.fill();
  ctx.strokeStyle = rgba('#BFE3F2', 0.85); ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 12) { const y = wl + Math.sin(x * 0.03 + t * 2.2) * 3; x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }
// startblok: (x, y) = voorrand en bovenkant; s = px per meter; kijk = 1: zwemmer kijkt naar rechts
function SP3_startblok(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const b = 0.7 * s, d = 0.12 * s; ctx.beginPath(); ctx.moveTo(-b, -d * 0.6); ctx.lineTo(0, 0); ctx.lineTo(0, d); ctx.lineTo(-b, d); ctx.closePath(); shape(ctx, '#D8DEE6', '#9AA6B4', 2); // schuin bovenvlak
  roundRect(ctx, -b * 0.75, d, b * 0.5, 0.33 * s, 6); shape(ctx, '#8C98A8', '#6E7A8A', 2); // voet van het blok
  ctx.restore(); }
function SP3_wig(ctx, w, s, a = 1) { if (!w || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(w.x - 0.06 * s, w.y + w.h + 6); ctx.lineTo(w.x + 0.05 * s, w.y + w.h + 6); ctx.lineTo(w.x - 0.04 * s, w.y); ctx.closePath(); shape(ctx, '#C9D2DC', '#9AA6B4', 2); ctx.restore(); }

// ---------- krachtzaal naast het bad ----------
function SP3_zaal(ctx, a = 1, o = {}) { const { raam = true, rek = true, gy = GROND } = o; bg(ctx, 'schema'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP3.muur; ctx.fillRect(0, 70, W, gy - 70);
  if (raam) { // raam met zicht op het bad (banen, lijnen)
    const rx = 1180, ry = 150, rw = 640, rh = 300; roundRect(ctx, rx - 12, ry - 12, rw + 24, rh + 24, 10); shape(ctx, '#3C4A62', null);
    ctx.fillStyle = '#1F3550'; ctx.fillRect(rx, ry, rw, rh * 0.45); const g = ctx.createLinearGradient(0, ry + rh * 0.45, 0, ry + rh); g.addColorStop(0, '#3E8CB0'); g.addColorStop(1, '#2C6A8A'); ctx.fillStyle = g; ctx.fillRect(rx, ry + rh * 0.45, rw, rh * 0.55);
    for (let i = 0; i < 4; i++) { const yy = ry + rh * 0.52 + i * rh * 0.13; ctx.strokeStyle = i % 2 ? '#E07A5F' : '#F2F2EE'; ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx, yy); ctx.lineTo(rx + rw, yy); ctx.stroke(); } ctx.setLineDash([]);
    ctx.strokeStyle = '#3C4A62'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(rx + rw / 2, ry); ctx.lineTo(rx + rw / 2, ry + rh); ctx.stroke(); }
  if (rek) { // rek met halters tegen de linkerwand
    const x0 = 90; ctx.fillStyle = SP3.rek; ctx.fillRect(x0, 420, 14, gy - 420); ctx.fillRect(x0 + 300, 420, 14, gy - 420);
    for (let k = 0; k < 3; k++) { const yy = 470 + k * 110; ctx.fillRect(x0, yy, 314, 10); for (let i = 0; i < 4; i++) { const hx = x0 + 40 + i * 72, s = 0.8 + k * 0.18; roundRect(ctx, hx - 4, yy - 18 * s, 34, 8, 3); shape(ctx, SP3.staal, null); roundRect(ctx, hx - 10, yy - 28 * s, 12, 28 * s, 3); shape(ctx, SP3.schijf, null); roundRect(ctx, hx + 24, yy - 28 * s, 12, 28 * s, 3); shape(ctx, SP3.schijf, null); } } }
  ctx.fillStyle = SP3.vloer; ctx.fillRect(0, gy, W, 880 - gy); ctx.fillStyle = SP3.vloerL; ctx.fillRect(0, gy, W, 6);
  ctx.restore(); }
// vloermat (zijaanzicht, plat)
function SP3_mat(ctx, x, w, a = 1, gy = GROND) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, gy - 16, w, 20, 6); shape(ctx, SP3.mat, SP3.matL, 2); ctx.restore(); }
// halterstang op een rek, n schijven per kant (u = laatste schijf die aanschuift 0..1)
function SP3_stang(ctx, x, y, w, n, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP3.rek; ctx.fillRect(x - w * 0.36, y - 6, 16, GROND - y + 6); ctx.fillRect(x + w * 0.36 - 16, y - 6, 16, GROND - y + 6); ctx.fillRect(x - w * 0.36 - 18, y + 4, 34, 10); ctx.fillRect(x + w * 0.36 - 16, y + 4, 34, 10);
  roundRect(ctx, x - w / 2, y - 8, w, 16, 6); shape(ctx, SP3.staal, '#8A96A4', 1.5);
  const nn = Math.floor(n), fr = n - nn; for (let s = -1; s <= 1; s += 2) for (let i = 0; i < Math.ceil(n); i++) { const last = i === nn, k = last ? ease(fr) : 1; if (last && fr <= 0.01) continue;
    const px = x + s * (w / 2 - 70 - i * 30) + s * (1 - k) * 120, hgt = 150 - i * 8; ctx.save(); ctx.globalAlpha *= last ? k : 1; roundRect(ctx, px - 13, y - hgt / 2, 26, hgt, 6); shape(ctx, SP3.schijf, SP3.schijfR, 2.5); ctx.restore(); }
  ctx.restore(); }
// rekpaal met elastiek-ophanging (vooraanzicht)
function SP3_paal(ctx, x, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = SP3.rek; ctx.fillRect(x - 12, 300, 24, GROND - 300); ctx.fillRect(x - 50, GROND - 12, 100, 12); for (let i = 0; i < 6; i++) circ(ctx, x, 360 + i * 70, 7, '#2A3446'); ctx.restore(); }

// ---------- zwemmers en kleine pictogrammen ----------
// hand en onderarm die in het water duwt, van opzij; (x, y) = handpalm, s = schaal
function SP3_hand(ctx, x, y, s, huid, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const hD = _donker(huid, 0.18), hL = _licht ? _licht(huid, 0.12) : huid;
  ctx.beginPath(); ctx.moveTo(40, -40); ctx.quadraticCurveTo(200, -70, 380, -78); ctx.lineTo(380, 30); ctx.quadraticCurveTo(200, 40, 40, 38); ctx.closePath(); shape(ctx, huid, hD, 2.5); // onderarm, naar de pols smaller
  // hand van opzij, palm naar links (duwt het water naar links): vingers samen, duim langs de zijkant
  ctx.beginPath(); ctx.moveTo(50, -44); ctx.quadraticCurveTo(10, -62, -40, -56); ctx.quadraticCurveTo(-78, -50, -84, -18); ctx.lineTo(-86, 24); ctx.quadraticCurveTo(-82, 54, -50, 56); ctx.quadraticCurveTo(10, 60, 50, 40); ctx.closePath(); shape(ctx, huid, hD, 2.5);
  ctx.strokeStyle = hD; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; for (const yy of [-28, -2, 24]) { ctx.beginPath(); ctx.moveTo(-84, yy); ctx.lineTo(-48, yy + 2); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(30, -48); ctx.quadraticCurveTo(-6, -84, -30, -78); ctx.quadraticCurveTo(-40, -70, -22, -58); ctx.quadraticCurveTo(0, -56, 18, -40); shape(ctx, huid, hD, 2.5); // duim
  ctx.restore(); }
// weegschaal-icoon met wijzer (frac 0..1)
function SP3_weeg(ctx, x, y, r, frac, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - r * 1.3, y - r * 1.1, r * 2.6, r * 2.2, r * 0.3); shape(ctx, '#D8DEE6', '#9AA6B4', 3);
  ctx.beginPath(); ctx.arc(x, y + r * 0.15, r * 0.82, Math.PI, 2 * Math.PI); ctx.lineTo(x + r * 0.82, y + r * 0.15); ctx.closePath(); shape(ctx, '#F2F2EE', '#9AA6B4', 2);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 2; for (let i = 0; i <= 10; i++) { const an = Math.PI + i / 10 * Math.PI; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.7, y + r * 0.15 + Math.sin(an) * r * 0.7); ctx.lineTo(x + Math.cos(an) * r * (i % 5 ? 0.62 : 0.55), y + r * 0.15 + Math.sin(an) * r * (i % 5 ? 0.62 : 0.55)); ctx.stroke(); }
  const an = Math.PI + clamp(frac, 0, 1) * Math.PI; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + r * 0.15); ctx.lineTo(x + Math.cos(an) * r * 0.7, y + r * 0.15 + Math.sin(an) * r * 0.7); ctx.stroke(); circ(ctx, x, y + r * 0.15, 6, '#5A6478');
  if (lab) text(ctx, lab, x, y + r * 0.85, fTekst(r * 0.42, 800), '#1A2740', 'center'); ctx.restore(); }
// stopwatch met tekst
function SP3_stopwatch(ctx, x, y, r, txt = '', a = 1, frac = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - r * 0.18, y - r * 1.32, r * 0.36, r * 0.3, 4); shape(ctx, '#9AA6B4', null);
  circ(ctx, x, y, r, '#F2F2EE', '#9AA6B4', 4); ctx.strokeStyle = '#1A2740'; ctx.lineWidth = Math.max(2, r * 0.06); ctx.lineCap = 'round'; const an = -Math.PI / 2 + frac * 6.283; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke();
  if (txt) text(ctx, txt, x, y + r + 50, fTekst(Math.max(30, r * 0.5), 800), C.text, 'center'); ctx.restore(); }
// kracht-tijdcurve: piek (u = hoe ver getekend 0..1, piek = hoogte 0..1)
function SP3_krachtCurve(ctx, x, y, w, h, u, piek, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 30, y - 70, w + 60, h + 130, 14); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.7), 1.5);
  assen(ctx, x, y, w, h, 'TIJD', 'KRACHT'); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); const n = 60;
  for (let i = 0; i <= n * clamp(u, 0, 1); i++) { const s = i / n, v = Math.exp(-Math.pow((s - 0.45) / 0.09, 2)) * piek + 0.05; const px = x + s * w, py = y + h - v * h * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// kalender 'EEN SEIZOEN': maanden, u = voortgang
function SP3_kalender(ctx, x, y, w, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['SEP', 'OKT', 'NOV', 'DEC', 'JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN']; const bw = w / M.length;
  metaText(ctx, 'EEN SEIZOEN', x, y - 16, C.grain, 'left', 26); M.forEach((m, i) => { const on = (i + 0.5) / M.length <= u; roundRect(ctx, x + i * bw + 3, y, bw - 6, 46, 6); shape(ctx, on ? rgba(C.groen, 0.35) : rgba(C.fill, 0.7), on ? C.groen : rgba(C.line, 0.6), 1.5); metaText(ctx, m, x + i * bw + bw / 2, y + 32, on ? C.text : C.text2, 'center', 18); }); ctx.restore(); }
// halter-pictogram (droogtraining)
function SP3_halter(ctx, x, y, s, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -5, 80, 10, 4); shape(ctx, col, null); for (const d of [-1, 1]) { roundRect(ctx, d * 34 - 7, -26, 14, 52, 4); shape(ctx, col, null); roundRect(ctx, d * 48 - 5, -18, 10, 36, 3); shape(ctx, col, null); } ctx.restore(); }
// pictogram meetopstelling (bewegingswetenschapper): krachtplaat + laptop met curve
function SP3_meet(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, 40, 140, 22, 4); shape(ctx, '#8C98A8', '#C9D2DC', 2);
  roundRect(ctx, 50, -40, 110, 74, 6); shape(ctx, '#1A2740', '#C9D2DC', 3); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const s2 = i / 20; const v = Math.exp(-Math.pow((s2 - 0.5) / 0.12, 2)); i ? ctx.lineTo(60 + s2 * 90, 20 - v * 44) : ctx.moveTo(60 + s2 * 90, 20 - v * 44); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(40, 34); ctx.lineTo(170, 34); ctx.lineTo(182, 50); ctx.lineTo(28, 50); ctx.closePath(); shape(ctx, '#8C98A8', null); ctx.restore(); }

// ---------- de keten van vier schakels ----------
// cx, cy = midden; o.n = aantal zichtbare schakels (0..4), o.slap (0..1) = middelste schakel knikt, o.stroom (0..1) = gouden pijl van benen naar hand,
// o.lek (0..1) = pijl lekt weg in het midden, o.hi = index die oplicht, o.labels
function SP3_keten(ctx, cx, cy, o = {}) { const { n = 4, slap = 0, stroom = 0, lek = 0, hi = -1, a = 1, s = 1, labels = ['benen', 'romp', 'armen', 'hand'], hiKl = C.goud, labA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = 260 * s, gap = 40 * s, tot = 4 * L + 3 * gap, x0 = cx - tot / 2, sag = slap * 70 * s;
  const P = []; for (let i = 0; i < 4; i++) { const xm = x0 + i * (L + gap) + L / 2; const dy = (i === 1 ? sag : i === 2 ? sag * 0.45 : 0); const rot = i === 1 ? slap * 0.32 : i === 2 ? -slap * 0.2 : i === 0 ? slap * 0.1 : 0; P.push([xm, cy + dy, rot]); }
  // verbindingen
  for (let i = 0; i < 3 && i < n - 1; i++) { const [xa, ya] = P[i], [xb, yb] = P[i + 1]; ctx.strokeStyle = '#8C98A8'; ctx.lineWidth = 16 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xa + L * 0.42, ya); ctx.lineTo(xb - L * 0.42, yb); ctx.stroke(); }
  for (let i = 0; i < n && i < 4; i++) { const [xm, ym, rot] = P[i], k = clamp(n - i, 0, 1); ctx.save(); ctx.globalAlpha *= k; ctx.translate(xm, ym); ctx.rotate(rot);
    const on = i === hi, slapM = i === 1 && slap > 0.05; roundRect(ctx, -L / 2, -46 * s, L, 92 * s, 46 * s); shape(ctx, on ? rgba(hiKl, 0.25) : rgba(C.fill, 0.9), on ? hiKl : slapM ? C.koraal : '#C9D2DC', 6 * s);
    roundRect(ctx, -L / 2 + 30 * s, -16 * s, L - 60 * s, 32 * s, 16 * s); shape(ctx, C.bgSchema, rgba('#C9D2DC', 0.5), 2); ctx.restore();
    if (labels[i]) naamBij(ctx, labels[i], '', xm, cy + 120 * s + (i === 1 ? sag : 0), k * labA, 'center'); }
  // gouden pijl: loopt van schakel 1 tot 4; bij lek buigt hij in de romp naar beneden weg
  if (stroom > 0.01) { const xs = P[0][0] - L * 0.3, xe = P[3][0] + L * 0.42, xl = P[1][0];
    if (lek > 0.01) { const xEnd = lerp(xs, xl, clamp(stroom * 2, 0, 1)); SP3_pijl(ctx, xs, cy - 110 * s, xEnd, cy - 110 * s, C.goud, 1, 16 * s); if (stroom > 0.5) SP3_pijl(ctx, xl, cy - 110 * s, xl + 40 * s, cy - 110 * s + 150 * s * clamp(stroom * 2 - 1, 0.2, 1), C.goud, lek, 12 * s); }
    else SP3_pijl(ctx, xs, cy - 110 * s, lerp(xs, xe, stroom), cy - 110 * s, C.goud, 1, 16 * s); }
  ctx.restore(); return P; }

// ---------- schouder in een zoomcirkel (rechterschouder) ----------
// voor: vooraanzicht; grote borstspier (oker) van borstbeen en sleutelbeen naar de bovenarm; arm hangt langs het lijf
// o.dik (0..1) extra dikte grote spieren, o.binnen (0..1) pijl naar binnen, o.kop (0..1) kop van de bovenarm in de kom licht op
function SP3_schouderVoor(ctx, cx, cy, r, o = {}) { const { dik = 0, binnen = 0, kop = 0, huid = SP3.huidSam, spiegel = false } = o; ctx.save();
  ctx.fillStyle = '#20304A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const s = r / 220; ctx.translate(cx, cy); ctx.scale(spiegel ? -s : s, s);
  // romp en arm (huid), schouder links in beeld = rechterschouder van de zwemmer (die naar ons kijkt)
  ctx.beginPath(); ctx.moveTo(240, -150); ctx.lineTo(-40, -150); ctx.quadraticCurveTo(-130, -140, -150, -60); ctx.lineTo(-170, 240); ctx.lineTo(-80, 240); ctx.lineTo(-70, 40); ctx.lineTo(-40, 240); ctx.lineTo(240, 240); ctx.closePath(); shape(ctx, rgba(huid, 0.55), rgba(lighten(huid, 0.3), 0.8), 2);
  // sleutelbeen en borstbeen
  ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -120); ctx.quadraticCurveTo(40, -140, -70, -120); ctx.stroke(); roundRect(ctx, 145, -115, 30, 260, 10); shape(ctx, '#E8E2D2', null);
  // bovenarmbeen met kop in de kom
  ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(-105, -80); ctx.lineTo(-125, 230); ctx.stroke(); circ(ctx, -100, -90, 34, '#E8E2D2');
  if (kop > 0.01) { ctx.save(); ctx.globalAlpha *= kop; circ(ctx, -100, -90, 50, null, C.goud, 6); ctx.restore(); }
  // grote borstspier (oker): waaier van borstbeen naar de bovenarm
  const w = 1 + dik * 0.35; ctx.beginPath(); ctx.moveTo(150, -110); ctx.quadraticCurveTo(160, 60 * w, 140, 140); ctx.quadraticCurveTo(10, 120 * w, -90, -10); ctx.lineTo(-95, -50); ctx.quadraticCurveTo(20, -120, 150, -110); ctx.closePath(); shape(ctx, rgba(C.oker, 0.85), lighten(C.oker, 0.3), 3);
  ctx.strokeStyle = rgba('#8A6A38', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(150, -90 + i * 40); ctx.lineTo(-88, -40 + i * 5); ctx.stroke(); }
  if (binnen > 0.01) SP3_boogPijl(ctx, -115, 120, 70, Math.PI * 0.95, Math.PI * 0.95 - 1.6 * binnen, C.goud, 1, 8);
  ctx.restore(); }
// achter: achteraanzicht; brede rugspier (oker, dik) en de kleine buitendraaiers op het schouderblad (dun, teal)
function SP3_schouderAchter(ctx, cx, cy, r, o = {}) { const { dik = 0, klein = 0, buiten = 0, kop = 0, huid = SP3.huidSam, spiegel = false } = o; ctx.save();
  ctx.fillStyle = '#20304A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const s = r / 220; ctx.translate(cx, cy); ctx.scale(spiegel ? -s : s, s);
  // van achteren: rechterschouder staat rechts in beeld
  ctx.beginPath(); ctx.moveTo(-240, -150); ctx.lineTo(40, -150); ctx.quadraticCurveTo(130, -140, 150, -60); ctx.lineTo(170, 240); ctx.lineTo(80, 240); ctx.lineTo(70, 40); ctx.lineTo(40, 240); ctx.lineTo(-240, 240); ctx.closePath(); shape(ctx, rgba(huid, 0.55), rgba(lighten(huid, 0.3), 0.8), 2);
  // brede rugspier (oker): van de onderrug naar de bovenarm
  const w = 1 + dik * 0.3; ctx.beginPath(); ctx.moveTo(-190, 240); ctx.lineTo(-190, 40); ctx.quadraticCurveTo(-60, 30 * w, 92, 0); ctx.lineTo(96, 40); ctx.quadraticCurveTo(-20, 160, 0, 240); ctx.closePath(); shape(ctx, rgba(C.oker, 0.85), lighten(C.oker, 0.3), 3);
  // schouderblad (driehoek) en wervelkolom
  ctx.beginPath(); ctx.moveTo(-60, -110); ctx.lineTo(70, -95); ctx.lineTo(-40, 110); ctx.closePath(); shape(ctx, '#E8E2D2', null); ctx.strokeStyle = '#C9C2B2'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-58, -60); ctx.lineTo(90, -88); ctx.stroke();
  for (let i = 0; i < 9; i++) roundRect(ctx, -205, -140 + i * 42, 30, 30, 6), shape(ctx, '#E8E2D2', null);
  // bovenarm met kop
  ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(105, -80); ctx.lineTo(125, 230); ctx.stroke(); circ(ctx, 100, -90, 34, '#E8E2D2');
  if (kop > 0.01) { ctx.save(); ctx.globalAlpha *= kop; circ(ctx, 100, -90, 50, null, C.goud, 6); ctx.restore(); }
  // kleine buitendraaiers: dunne banden van het schouderblad naar de kop
  const kk = 0.6 + klein * 0.4; ctx.save(); ctx.globalAlpha *= kk; ctx.strokeStyle = rgba(C.teal, 0.95); ctx.lineCap = 'round';
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-30, -30); ctx.quadraticCurveTo(40, -40, 92, -78); ctx.stroke(); ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(-30, 30); ctx.quadraticCurveTo(40, 0, 96, -62); ctx.stroke(); ctx.restore();
  if (buiten > 0.01) SP3_boogPijl(ctx, 115, 120, 70, Math.PI * 0.05, Math.PI * 0.05 + 1.6 * buiten, C.teal, 1, 8);
  ctx.restore(); }
// balans (weegschaaltje met twee schalen): kant = -1..1 (+ = links omlaag = binnen zwaarder)
function SP3_balans(ctx, x, y, s, kant, a = 1, o = {}) { const { links = 'BINNEN', rechts = 'BUITEN', vraag = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#C9D2DC'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(6, -150); ctx.lineTo(-6, -150); ctx.closePath(); ctx.fill(); roundRect(ctx, -70, 0, 140, 16, 6); shape(ctx, '#C9D2DC', null);
  const an = -clamp(kant, -1, 1) * 0.28; ctx.save(); ctx.translate(0, -150); ctx.rotate(an); ctx.strokeStyle = '#C9D2DC'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-160, 0); ctx.lineTo(160, 0); ctx.stroke(); circ(ctx, 0, 0, 12, C.goud); ctx.restore();
  for (const d of [-1, 1]) { const px = d * 160 * Math.cos(an), py = -150 + d * 160 * Math.sin(an); ctx.strokeStyle = '#9AA6B4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 50, py + 70); ctx.moveTo(px, py); ctx.lineTo(px + 50, py + 70); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 66, py + 70); ctx.lineTo(px + 66, py + 70); ctx.quadraticCurveTo(px, py + 110, px - 66, py + 70); shape(ctx, d < 0 ? rgba(C.oker, 0.8) : rgba(C.teal, 0.8), null);
    text(ctx, d < 0 ? links : rechts, px, py + 140, fMeta(24), C.text2, 'center'); }
  if (vraag) text(ctx, '?', 0, -190, fTitel(70), C.goud, 'center');
  ctx.restore(); }
// trainingsbelasting per week: groen rustig stijgend of koraal met plotselinge piek; m = 0..1 morph van piek naar rustig
function SP3_belasting(ctx, x, y, w, h, a = 1, o = {}) { const { groen = 1, koraal = 1, m = 0, u = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'WEKEN', 'TRAINING PER WEEK');
  const lijn = (f, col, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = 12; for (let i = 0; i <= n * clamp(u, 0, 1); i++) { const s = i / n, v = f(s); i ? ctx.lineTo(x + s * w, y + h - v * h) : ctx.moveTo(x + s * w, y + h - v * h); } ctx.stroke(); ctx.restore(); };
  lijn(s => 0.3 + 0.45 * s, C.groen, groen);
  lijn(s => { const piek = (s > 0.45 && s < 0.65 ? 0.42 : 0); return lerp(0.3 + piek + (s > 0.65 ? 0.12 : 0), 0.3 + 0.45 * s, m); }, m > 0.5 ? C.groen : C.koraal, koraal);
  ctx.restore(); }
// klembord / trainingsplan op een standaard
function SP3_bord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = SP3.rek; ctx.fillRect(x + w * 0.2, y + h, 10, GROND - y - h); ctx.fillRect(x + w * 0.8 - 10, y + h, 10, GROND - y - h);
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 3); ctx.restore(); }
// startplaats: twee banen boven elkaar met ieder een eigen startblok (zijaanzicht)

// ---------- houdingen die de cast niet heeft (t4, t13) ----------
function SP3_maat(id, lengte, outfit) { const P0 = CAST[id], P = Object.assign({}, P0, (P0.garderobe && outfit && P0.garderobe[outfit]) || {}); const Hh = lengte * (P.lengte || 1), hh = Hh / (P.kop || 6.1);
  return { Hh, hh, Lb: Hh - hh * 3.67, A1: hh * 1.32 * (P.armK || 1), A2: hh * 1.2 * (P.armK || 1), sy: -hh * 2.03 }; }
// plank op ellebogen en tenen, zijaanzicht, hoofd naar rechts; xE = x van de ellebogen, vloer = y van de mat; sag = heup zakt (0..0.3 rad)
function SP3_plank(ctx, id, xE, vloer, lengte, o = {}) { const { sag = 0, outfit = 'sport', a = 1, t = 0, an = 0 } = o; const m = SP3_maat(id, lengte, outfit);
  const E = [m.A1 + m.hh * 0.14, m.sy], th = -sag, T = [Math.sin(th) * m.Lb + m.hh * 0.3 * Math.cos(th), Math.cos(th) * m.Lb + m.hh * 0.2];
  const p = Math.atan2(E[0] - T[0], T[1] - E[1]); const wx = (l) => l[0] * Math.sin(p) - l[1] * Math.cos(p), wy = (l) => l[0] * Math.cos(p) + l[1] * Math.sin(p);
  const x = xE - wx([m.A1, m.sy]), y = vloer - wy(E);
  return SP3_lijf(ctx, id, x, y, lengte, { outfit, pitch: p, a, t, arm: [Math.PI / 2, Math.PI / 2], armVer: [Math.PI / 2, Math.PI / 2], been1: { th, kn: 0, an }, been2: { th, kn: 0, an }, uit: o.uit }); }
// afzet tegen de keerpuntmuur, op de rug, hoofd naar links; muurX = muur, y = hoogte van de heup; buig 1 = knieën ± 90°, 0 = gestrekt
function SP3_muurAfzet(ctx, id, muurX, y, lengte, buig, o = {}) { const m = SP3_maat(id, lengte, 'zwem'); const kn = 1.65 * buig, th = kn * 0.5;
  const kx = Math.sin(th) * m.Lb / 2, ky = Math.cos(th) * m.Lb / 2, ax = kx + Math.sin(th - kn) * m.Lb / 2, ay = ky + Math.cos(th - kn) * m.Lb / 2 + m.hh * 0.22;
  // lokale y (naar de voeten) wordt na draaien (kijk -1, rug) de +x-richting: voetafstand tot de heup = ay
  const x = muurX - ay; return Object.assign(SP3_lijf(ctx, id, x, y, lengte, { rug: true, kijk: -1, naHoofd: true, been1: { th, kn, an: -0.25 }, been2: { th: th * 0.96, kn: kn * 0.98, an: -0.25 }, a: o.a, t: o.t }), { x }); }

// ---------- tekstwolkje met vaste regels (en doorhaling van één woord) ----------
function SP3_wolk(ctx, x, y, w, h, regels, a = 1, o = {}) { const { px = 34, door = null, doorU = 0, staart = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.96), null);
  const sx = staart < 0 ? x + w * 0.22 : x + w * 0.78; circ(ctx, sx, y + h + 10, 11, rgba('#F2F2EE', 0.96)); circ(ctx, sx + staart * 18, y + h + 34, 7, rgba('#F2F2EE', 0.96));
  const lh = px * 1.18, y0 = y + h / 2 - (regels.length - 1) * lh / 2 + px * 0.36; ctx.font = fTekst(px, 800);
  regels.forEach((r, i) => { text(ctx, r, x + w / 2, y0 + i * lh, fTekst(px, 800), '#121A26', 'center');
    if (door && r.includes(door) && doorU > 0.01) { const tw = ctx.measureText(r).width, pre = ctx.measureText(r.slice(0, r.indexOf(door))).width, dw = ctx.measureText(door).width; const x0 = x + w / 2 - tw / 2 + pre - 6;
      ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0 + i * lh - px * 0.32); ctx.lineTo(x0 + (dw + 12) * clamp(doorU, 0, 1), y0 + i * lh - px * 0.32); ctx.stroke(); } });
  ctx.restore(); }
// linker badrand met dek en tegelmuur (startkant); x = rand, wl = waterlijn, s = px per meter
function SP3_startKant(ctx, x, wl, bodem, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dek = wl - 0.3 * s;
  ctx.fillStyle = SP3.tegel; ctx.fillRect(x - 60, dek, 60, bodem - dek); ctx.strokeStyle = rgba(SP3.tegelL, 0.7); ctx.lineWidth = 1.5; for (let y = dek; y < bodem; y += 34) { ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x, y); ctx.stroke(); }
  ctx.fillStyle = SP3.dek; ctx.fillRect(0, dek, x - 60, bodem - dek); ctx.fillStyle = SP3.dekL; ctx.fillRect(0, dek, x, 10); ctx.restore(); return dek; }
// de badrand van bovenaf gezien niet nodig: dek met water links (zijaanzicht) voor de cold open en de badrand in H3
function SP3_dek(ctx, xRand, gy, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324C'; ctx.fillRect(0, 70, W, gy - 70);
  ctx.fillStyle = rgba(C.teal, 0.07); ctx.fillRect(0, 160, W, 40);
  const g = ctx.createLinearGradient(0, gy + 26, 0, 880); g.addColorStop(0, SP3.waterT); g.addColorStop(1, SP3.waterD); ctx.fillStyle = g; ctx.fillRect(0, gy + 26, xRand, 880 - gy - 26);
  ctx.strokeStyle = rgba('#BFE3F2', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= xRand; x += 12) { const y = gy + 26 + Math.sin(x * 0.03 + t * 2.2) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  ctx.fillStyle = SP3.tegel; ctx.fillRect(xRand, gy, W - xRand, 880 - gy); ctx.fillStyle = SP3.dekL; ctx.fillRect(xRand - 8, gy - 4, W - xRand + 8, 14);
  ctx.strokeStyle = rgba(SP3.tegelL, 0.6); ctx.lineWidth = 1.5; for (let x = xRand; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, gy + 10); ctx.lineTo(x, 880); ctx.stroke(); } ctx.restore(); }
// deur naar de krachtzaal met halterpictogram
function SP3_deur(ctx, x, gy, s, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 0.95 * s, h = 2.1 * s;
  roundRect(ctx, x - 14, gy - h - 14, w + 28, h + 14, 6); shape(ctx, '#3C4A62', null); ctx.fillStyle = '#121A26'; ctx.fillRect(x, gy - h, w, h);
  ctx.save(); ctx.translate(x, 0); ctx.scale(1 - open * 0.6, 1); roundRect(ctx, 0, gy - h, w, h, 4); shape(ctx, '#4E5E7A', '#6A7A96', 2); ctx.restore();
  circ(ctx, x + w * 0.82 * (1 - open * 0.6), gy - h * 0.48, 7, '#C9D2DC'); SP3_halter(ctx, x + w * 0.5 * (1 - open * 0.6), gy - h * 0.72, 0.9 * (1 - open * 0.5), 1); ctx.restore(); }
// klein pictogram: afzet (blok en muur met gouden pijl)
function SP3_icoonAfzet(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -80, 70, 18, 4); shape(ctx, '#D8DEE6', null); roundRect(ctx, -100, -62, 40, 70, 4); shape(ctx, '#8C98A8', null);
  ctx.fillStyle = SP3.tegel; ctx.fillRect(70, -90, 40, 170); SP3_pijl(ctx, 60, 30, -40, 30, C.goud, 1, 14); SP3_pijl(ctx, -40, -100, 40, -100, C.goud, 1, 14); ctx.restore(); }
// klein pictogram: keten (drie schakels)
function SP3_icoonKeten(ctx, x, y, s, a = 1) { if (a <= 0.01) return; SP3_keten(ctx, x, y, { s: s * 0.32, a, labels: [], hi: 1 }); }
// klein pictogram: schouder (cirkel met bovenarm en kop in de kom)
function SP3_icoonSchouder(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 110 * s, 0, 6.283); ctx.save(); ctx.clip(); SP3_schouderAchter(ctx, x, y, 110 * s, { klein: 1, kop: 1, spiegel: true }); ctx.restore(); circ(ctx, x, y, 110 * s, null, C.goud, 3); ctx.restore(); }

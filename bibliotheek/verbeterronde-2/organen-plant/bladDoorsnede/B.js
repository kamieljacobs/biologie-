// =====================================================================================
// BLAD IN DOORSNEDE — variant B (verbeterronde 2): LAGEN + LOEP OP HET HUIDMONDJE. Het blad zelf is een rustige strook met de
// lagen als banden (een paar celwanden, geen losse bladgroenkorrels behalve in de sluitcellen); één huidmondje is via een
// loep (zoomcirkel) groot uitvergroot, en daar gebeurt de gaswisseling. Zo blijft de doorsnede leesbaar én is de spleet groot.
// Recept (LibreTexts Botany, Ha/Morrow/Algiers 3.4.2 'Internal Leaf Structure'; UF/IFAS 'Stomate'):
//  - boven → onder: cuticula – bovenopperhuid (doorzichtig) – palissadeweefsel (kolommen, veel bladgroen) – sponsweefsel (losse
//    cellen, luchtholtes) – onderopperhuid – cuticula; nerf: hout (teal, water) boven, bast (oker, suikers) onder.
//  - huidmondjes in de onderopperhuid (de meeste daar): twee sluitcellen mét bladgroen (de enige opperhuidcellen met
//    bladgroen) rond een spleet, erboven een luchtholte. o.open 0..1: dicht = sluitcellen tegen elkaar · open = duidelijke spleet.
//  - gaswisseling in de loep (o.gas 0..1, alleen bij open spleet): CO2 (grijs, O–C–O op een rij, grijze pijl) naar binnen, O2
//    (teal, twee bolletjes, teal pijl) naar buiten: andere vorm, kleur en richting.
// Bekende fouten: huidmondje aan de bovenkant; sluitcellen zonder bladgroen; spleet niet te zien; hout onder de bast.
// Aanroep (zelfde als ronde 1): bladDoorsnede(ctx, x, y, s, {a, t, open, gas, hi}); ontwerp ± 700 × 470, oorsprong = midden.
// Op klein formaat (s < 0,2) vervalt de loep. Geeft ankers terug {palissade, spons, nerf, huidmondje, opperhuid, bovenkant, loep, co2, o2}.
// =====================================================================================
const BLAD2 = { cut: '#E6EDD3', huid: '#CFDDBE', pal: '#8DBB7A', palR: '#B5D6A2', spons: '#9CC489', korrel: '#4F8F5A', lucht: '#22324A', sluit: '#6FAE68', hout: '#5BA4C9', bast: '#C9A35C', schede: '#B9CFA6', co2: '#AEB6C2', co2c: '#4A5260', o2: '#5BA4C9' };
function _bladCO2(ctx, x, y, r, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); [[-1.55, BLAD2.co2], [1.55, BLAD2.co2], [0, BLAD2.co2c]].forEach(([dx, kl]) => { ctx.beginPath(); ctx.arc(dx * r, 0, r * (dx ? 0.9 : 0.8), 0, 6.283); shape(ctx, kl, lighten(BLAD2.co2, 0.4), Math.max(0.8, r * 0.12)); }); ctx.restore(); }
function _bladO2(ctx, x, y, r, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); [-0.75, 0.75].forEach(dx => { ctx.beginPath(); ctx.arc(dx * r, 0, r * 0.9, 0, 6.283); shape(ctx, BLAD2.o2, lighten(BLAD2.o2, 0.45), Math.max(0.8, r * 0.12)); }); ctx.restore(); }
function _bladPijl(ctx, P, kl, w) { ctx.save(); ctx.strokeStyle = kl; ctx.fillStyle = kl; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
  const a = P[P.length - 2], b = P[P.length - 1], an = Math.atan2(b[1] - a[1], b[0] - a[0]), L = w * 3.6; ctx.beginPath(); ctx.moveTo(b[0] + Math.cos(an) * L * 0.5, b[1] + Math.sin(an) * L * 0.5);
  ctx.lineTo(b[0] + Math.cos(an + 2.5) * L, b[1] + Math.sin(an + 2.5) * L); ctx.lineTo(b[0] + Math.cos(an - 2.5) * L, b[1] + Math.sin(an - 2.5) * L); ctx.closePath(); ctx.fill(); ctx.restore(); }
function _bladSluit(ctx, cx, cy, half, H, op, metKorrels) { // twee sluitcellen rond een spleet (halve breedte 'half'), totale breedte vast (± 2·H)
  const rx = (H - half) / 2; [-1, 1].forEach(k => { const x = cx + k * (half + rx); ctx.beginPath(); ctx.ellipse(x, cy, rx, H * (0.32 + op * 0.06), 0, 0, 6.283); shape(ctx, BLAD2.sluit, BLAD2.palR, Math.max(1, H * 0.03));
    if (metKorrels) for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.ellipse(x + (q - 1) * rx * 0.45, cy + (q % 2 ? 1 : -1) * H * 0.1, H * 0.075, H * 0.05, 0.3, 0, 6.283); ctx.fillStyle = BLAD2.korrel; ctx.fill(); } }); }
function bladDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, open = 1, gas = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s], SX = -60, LX = 170, LY = 150, LR = 128, loep = s >= 0.2;
  const anker = { palissade: W(-300, -150), spons: W(-300, -60), nerf: W(150, -70), huidmondje: W(SX, 10), opperhuid: W(-300, -205), bovenkant: W(0, -225), loep: W(LX, LY), co2: W(LX - 70, LY + 90), o2: W(LX + 70, LY + 90) };
  if (a <= 0.01) return anker;
  const dim = k => (hi && hi !== k) ? 0.35 : 1, op = ease(clamp(open, 0, 1)), g = gas * op;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = -350, R = 350, Y = { cut: -222, hb: -216, pal: -194, sp: -118, ho: -6, onder: 14 };
  // --- strook: de lagen als banden
  ctx.save(); ctx.beginPath(); ctx.rect(L, -230, R - L, 250); ctx.clip();
  ctx.fillStyle = BLAD2.lucht; ctx.fillRect(L, Y.pal, R - L, Y.ho - Y.pal);
  ctx.save(); ctx.globalAlpha *= dim('palissade'); ctx.fillStyle = BLAD2.pal; ctx.fillRect(L, Y.pal, R - L, Y.sp - Y.pal); ctx.strokeStyle = BLAD2.palR; ctx.lineWidth = 2;
  ctx.beginPath(); for (let u = L + 30; u < R; u += 30) { ctx.moveTo(u, Y.pal + 4); ctx.lineTo(u, Y.sp - 4); } ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dim('spons'); for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) { const cx = L + 28 + c * 60 + (r % 2) * 28, cy = Y.sp + 22 + r * 34;
      if (Math.hypot(cx - SX, cy - (Y.ho - 22)) < 46 || Math.hypot((cx - 150) * 0.8, cy - (-62)) < 60) continue; ctx.beginPath(); ctx.ellipse(cx, cy, 22, 13, 0.2 * (c % 3 - 1), 0, 6.283); shape(ctx, BLAD2.spons, BLAD2.palR, 1.5); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= dim('nerf'); ctx.beginPath(); ctx.ellipse(150, -62, 52, 44, 0, 0, 6.283); shape(ctx, BLAD2.schede, null); ctx.beginPath(); ctx.ellipse(150, -76, 36, 16, 0, Math.PI, 0); ctx.closePath(); shape(ctx, BLAD2.hout, null);
  ctx.beginPath(); ctx.ellipse(150, -50, 34, 14, 0, 0, Math.PI); ctx.closePath(); shape(ctx, BLAD2.bast, null); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dim('opperhuid'); ctx.fillStyle = rgba(BLAD2.huid, 0.3); ctx.fillRect(L, Y.hb, R - L, Y.pal - Y.hb); ctx.fillRect(L, Y.ho, R - L, Y.onder - Y.ho);
  ctx.strokeStyle = BLAD2.huid; ctx.lineWidth = 1.5; ctx.beginPath(); for (let u = L + 58; u < R; u += 58) { ctx.moveTo(u, Y.hb); ctx.lineTo(u, Y.pal); if (Math.abs(u - SX) > 34) { ctx.moveTo(u, Y.ho); ctx.lineTo(u, Y.onder); } } ctx.stroke();
  ctx.fillStyle = BLAD2.cut; ctx.fillRect(L, Y.cut, R - L, 6); ctx.fillRect(L, Y.onder, SX - 26 - L, 5); ctx.fillRect(SX + 26, Y.onder, R - SX - 26, 5); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dim('huidmondje'); ctx.fillStyle = BLAD2.lucht; ctx.fillRect(SX - 26, Y.ho, 52, Y.onder - Y.ho); _bladSluit(ctx, SX, Y.ho + 10, lerp(0.5, 7, op), 26, op, false); ctx.restore();
  ctx.restore(); // clip strook
  // --- loep: hetzelfde huidmondje groot
  if (loep) { const lx = LX, ly = LY, r = LR, k = 4.2; // vergroting
    ctx.save(); ctx.globalAlpha *= 0.8; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(SX + 20, Y.onder + 4); ctx.lineTo(lx - r * 0.86, ly - r * 0.5); ctx.moveTo(SX + 26, Y.ho); ctx.lineTo(lx - r * 0.3, ly - r * 0.95); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(lx, ly, r, 0, 6.283); ctx.fillStyle = BLAD2.lucht; ctx.fill(); ctx.clip();
    const ey = ly + 20, eh = 34; // onderopperhuid in de loep
    ctx.fillStyle = C.bgSchema; ctx.fillRect(lx - r, ey + eh / 2, 2 * r, r); // buiten het blad
    ctx.globalAlpha *= dim('huidmondje');
    [[-1], [1]].forEach(([q]) => { const x0 = q < 0 ? lx - r - 10 : lx + 58, x1 = q < 0 ? lx - 58 : lx + r + 10; const n = 2, w = (x1 - x0) / n; for (let c = 0; c < n; c++) { roundRect(ctx, x0 + c * w + 1, ey - eh / 2, w - 2, eh, 10); shape(ctx, rgba(BLAD2.huid, 0.3), BLAD2.huid, 2); } });
    ctx.fillStyle = BLAD2.cut; ctx.fillRect(lx - r, ey + eh / 2, r - 58, 6); ctx.fillRect(lx + 58, ey + eh / 2, r - 58, 6);
    [[-90, -66], [-20, -98], [62, -82], [108, -30], [-112, -18]].forEach(([dx, dy], i) => { ctx.beginPath(); ctx.ellipse(lx + dx, ly + dy, 34, 22, 0.3 * (i % 3 - 1), 0, 6.283); shape(ctx, BLAD2.spons, BLAD2.palR, 2);
      for (let q = 0; q < 2; q++) { ctx.beginPath(); ctx.ellipse(lx + dx + (q ? 10 : -10), ly + dy + (q ? 4 : -4), 6, 4, 0.3, 0, 6.283); ctx.fillStyle = BLAD2.korrel; ctx.fill(); } });
    _bladSluit(ctx, lx, ey, lerp(1, 22, op), 58, op, true);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; const f = (t * 0.25) % 1;
      _bladPijl(ctx, [[lx - 58, ly + 100], [lx - 24, ly + 66], [lx - 8, ey], [lx - 12, ly - 40]], BLAD2.co2, 5); _bladPijl(ctx, [[lx + 10, ly - 40], [lx + 8, ey], [lx + 26, ly + 64], [lx + 56, ly + 94]], BLAD2.o2, 5);
      _bladCO2(ctx, lerp(lx - 84, lx - 50, f), lerp(ly + 104, ly + 80, f), 8, -0.8); _bladCO2(ctx, lx - 40, ly - 34, 8, 1.3); _bladO2(ctx, lerp(lx + 40, lx + 70, f), lerp(ly + 62, ly + 84, f), 9, 0.7); _bladO2(ctx, lx + 36, ly - 44, 9, 0.2); ctx.restore(); }
    ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(lx, ly, r, 0, 6.283); ctx.stroke(); }
  ctx.restore(); return anker;
}

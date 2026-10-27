// =====================================================================================
// BLOEM IN DOORSNEDE — 'halve bloem': alles in één vlak doorgesneden (klassieke leerboekdoorsnede), met bestuiving.
// Recept: op de bloembodem van buiten naar binnen kelkbladen, kroonbladen, meeldraden (helmdraad + helmknop), stamper
// (stempel, stijl, vruchtbeginsel met zaadbeginsels aan de zaadlijst). Bovenstandig vruchtbeginsel. Nectarklier aan de
// voet van de meeldraden (lokt de bij). Bestuiving: de bij brengt stuifmeel van een andere bloem (kruisbestuiving)
// naar de stempel; stuifmeelbuis groeit door de stijl naar een zaadbeginsel; daar bevruchting.
// Bij: kop, borststuk (6 poten, 2 paar vleugels), achterlijf.
// Bron: Ezcurra-lab (UC Riverside) reproductieve morfologie; LibreTexts Boundless 26.3A.
// Bekende fouten: meeldraden op de stamper; stuifmeelbuis die buiten de stijl loopt; bij met 4 poten.
// Ontwerp: hoogte ± 600, breedte ± 640, oorsprong ± midden. Aanpak B: rustig Schema, alle delen als snijvlak
// (dikte zichtbaar), stuifmeelkorrels die zichtbaar van de bij naar de stempel springen; stappen voor de les.
// o: a, t, bij (0..1 vliegt aan), stuif (0..1), buis (0..1), bevrucht (0..1 zaadbeginsel licht op), hi
// =====================================================================================
function bloemDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, bij = 0, stuif = 0, buis = 0, bevrucht = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { kelk: W(-170, 150), kroon: W(-250, -40), meeldraad: W(-95, -60), helmknop: W(-110, -150), stempel: W(0, -215), stijl: W(0, -100), vruchtbeginsel: W(0, 110), zaadbeginsel: W(0, 90), nectar: W(-48, 172), steel: W(0, 270) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const KROON = '#D9B3C6', GROEN = '#7FA868', GROENl = '#A9C98F', GEEL = '#E0B64A';
  const dimF = k => (hi && hi !== k) ? 0.35 : 1;
  const band = (pts, w, col, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); ctx.strokeStyle = hi === key ? C.goud : lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); };
  // steel en bloembodem
  ctx.save(); ctx.globalAlpha *= dimF('kelk'); ctx.beginPath(); bioPad(ctx, [[-14, 300], [-14, 210], [-60, 186], [-70, 172], [70, 172], [60, 186], [14, 210], [14, 300]], true); ctx.fillStyle = GROEN; ctx.fill(); ctx.restore();
  for (const sd of [-1, 1]) {
    band([[sd * 66, 178], [sd * 150, 160], [sd * 230, 120]], 9, GROEN, 'kelk'); // kelkblad in doorsnede
    band([[sd * 60, 168], [sd * 140, 100], [sd * 230, -20], [sd * 300, -140]], 10, KROON, 'kroon'); // kroonblad in doorsnede
    for (const [mx, my] of [[sd * 92, -150], [sd * 140, -120]]) { band([[sd * 40, 168], [mx * 0.6, 20], [mx, my + 22]], 4, '#E8E1C4', 'meeldraad');
      ctx.save(); ctx.globalAlpha *= dimF('meeldraad'); ctx.fillStyle = hi === 'meeldraad' ? C.goud : GEEL; ctx.beginPath(); ctx.ellipse(mx, my, 11, 22, sd * 0.2, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#B88F2E'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mx, my - 20); ctx.lineTo(mx, my + 20); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= dimF('nectar'); ctx.fillStyle = '#E8C46A'; ctx.beginPath(); ctx.ellipse(sd * 48, 170, 10, 6, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  // stamper
  ctx.save(); ctx.globalAlpha *= (hi && !['stamper', 'vruchtbeginsel', 'zaadbeginsel'].includes(hi)) ? 0.35 : 1;
  ctx.beginPath(); bioPad(ctx, [[0, 176], [-42, 166], [-50, 110], [-30, 50], [-10, 20], [-9, -190], [-26, -210], [0, -222], [26, -210], [9, -190], [10, 20], [30, 50], [50, 110], [42, 166]], true); ctx.fillStyle = GROENl; ctx.fill(); ctx.strokeStyle = hi === 'stamper' ? C.goud : GROEN; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 112, 32, 46, 0, 0, 6.283); ctx.fillStyle = '#5E7A4E'; ctx.fill(); if (hi === 'vruchtbeginsel') { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.strokeStyle = GROENl; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 70); ctx.lineTo(0, 154); ctx.stroke(); // zaadlijst
  [[-14, 88], [14, 88], [-15, 118], [15, 118], [-12, 146], [12, 146]].forEach(([zx, zy], i) => { ctx.beginPath(); ctx.ellipse(zx, zy, 10, 8, 0, 0, 6.283); ctx.fillStyle = (i === 0 && bevrucht > 0.01) ? lighten(C.goud, 0.2 * (1 - bevrucht)) : hi === 'zaadbeginsel' ? C.goud : '#E8E6C8'; ctx.fill(); });
  ctx.restore();
  // stuifmeelbuis door de stijl
  if (buis > 0.01) { const P = [[0, -214], [0, -100], [-2, 30], [-8, 72], [-14, 86]]; const D = bioDicht(P, 12); const n = Math.max(2, Math.floor(D.length * buis)); ctx.strokeStyle = GEEL; ctx.lineWidth = 3.5; ctx.beginPath(); D.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  // bij met vliegroute (stippellijn) en stuifmeel dat overspringt
  if (bij > 0.01) { const e = ease(bij); const bx = lerp(300, 40, e), by = lerp(-300, -262, e);
    ctx.save(); ctx.globalAlpha *= Math.min(1, bij * 2) * 0.7; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(320, -200); ctx.quadraticCurveTo(320, -300, bx + 20, by); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    ctx.save(); ctx.globalAlpha *= Math.min(1, bij * 2); ctx.translate(bx, by); ctx.scale(1.7, 1.7); const kl = 1.1;
    ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { const lx = 6 + i * 9; ctx.beginPath(); ctx.moveTo(lx, 6); ctx.lineTo(lx - 4, 18 * kl); ctx.lineTo(lx - 10, 28 * kl); ctx.stroke(); }
    ctx.fillStyle = '#C9922E'; ctx.beginPath(); ctx.ellipse(44, 0, 24, 14, -0.1, 0, 6.283); ctx.fill(); ctx.fillStyle = '#3A2E24'; for (const sx of [36, 47, 58]) { ctx.beginPath(); ctx.ellipse(sx, 0, 4, 12, -0.1, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = '#8C6A3A'; ctx.beginPath(); ctx.arc(14, 0, 12, 0, 6.283); ctx.fill(); ctx.fillStyle = '#3A2E24'; ctx.beginPath(); ctx.ellipse(-4, 2, 8, 9, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-8, -5); ctx.quadraticCurveTo(-16, -16, -22, -14); ctx.stroke();
    ctx.fillStyle = rgba('#DDE6EE', 0.55); ctx.beginPath(); ctx.ellipse(24, -18, 22, 8, -0.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(28, -10, 14, 5, -0.2, 0, 6.283); ctx.fill();
    ctx.fillStyle = GEEL; ctx.beginPath(); ctx.arc(12, 14, 5, 0, 6.283); ctx.fill(); ctx.restore(); }
  if (stuif > 0.01) { ctx.save(); ctx.fillStyle = GEEL; for (let k = 0; k < 6; k++) { const v = clamp(stuif * 1.3 - k * 0.06, 0, 1); const px = lerp(60 + k * 3, -18 + k * 7, v), py = lerp(-238, -226 - (k % 2) * 4, v) - Math.sin(v * 3.14) * 16; ctx.beginPath(); ctx.arc(px, py, 4, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); return anker;
}

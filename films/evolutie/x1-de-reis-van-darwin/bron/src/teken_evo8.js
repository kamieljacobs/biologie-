// Evolutie v2 — film 8 'Stambomen lezen'. Laad na teken_evo7.js (gebruikt bot, ledemaat, BOT, haai). 22 okt 2026.

// ================= TUIMELAAR (Tursiops truncatus) =================
// Recept: ±2,5–3 m; lengte 500 eenheden. Korte snuit (rostrum) en ronde meloen, blaasgat boven op de kop, sikkelvormige rugvin halverwege,
// korte borstvinnen, horizontale staartvin. Oog vlak achter de mondhoek. Grijs met lichtere buik. o.rontgen = armbotten in vaste kleuren.
function dolfijn(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const rug = '#5E6C7A', buik = '#C9D0D8'; const r = 1 - rontgen * 0.75; const sl = Math.sin(t * 2.6) * 0.1;
  ctx.save(); ctx.globalAlpha *= r;
  ctx.save(); ctx.translate(-226, 4); ctx.rotate(sl); vul(ctx, [[10, -6], [-30, -10], [-64, -22], [-80, -18], [-62, -2], [-80, 14], [-64, 22], [-30, 12], [10, 8]], rug, _lt(rug, 0.2), 2); ctx.restore();
  vul(ctx, [[30, -44], [0, -88], [-24, -104], [-28, -94], [-30, -42]], rug, _lt(rug, 0.2), 2);
  const R = [[250, 10], [236, 2], [196, 0], [172, -20], [140, -40], [60, -50], [-40, -44], [-140, -24], [-226, -2], [-226, 10], [-140, 24], [-40, 40], [60, 44], [150, 32], [196, 18], [236, 16]];
  vul(ctx, R, rug, _lt(rug, 0.18), 2); binnen(ctx, R, () => vul(ctx, [[260, 12], [200, 12], [120, 6], [0, 10], [-200, 6], [-200, 60], [260, 60]], buik));
  lijn(ctx, [[248, 12], [214, 12], [190, 10]], '#2A3038', 2); circ(ctx, 150, -40, 3.5, '#2A3038'); dierOog(ctx, 176, -2, 4.5, '#1A1C20');
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; vul(ctx, R, null, rgba(C.line, 0.9), 2); ctx.restore(); }
  ctx.save(); ctx.translate(120, 30); ctx.globalAlpha *= (rontgen > 0.01 ? 0.4 : 1); vul(ctx, [[14, -6], [-8, 20], [-46, 52], [-58, 54], [-40, 22], [-14, -4]], _dk(rug, 0.1)); ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.translate(120, 30); vul(ctx, [[14, -6], [-8, 20], [-46, 52], [-58, 54], [-40, 22], [-14, -4]], null, C.line, 2);
    bot(ctx, 8, -6, -4, 8, 11, BOT.arm); bot(ctx, -6, 10, -18, 24, 8, BOT.onder); bot(ctx, -2, 14, -14, 28, 8, BOT.onder);
    for (let d = 0; d < 4; d++) { let px = -18 + d * 3, py = 28 + d * 2; for (let k = 0; k < [3, 5, 4, 2][d]; k++) { const nx = px - 7, ny = py + 6; bot(ctx, px, py, nx, ny, 4, BOT.hand, { kop: 1.05 }); px = nx; py = ny; } } ctx.restore(); }
  ctx.restore(); }

// ================= ICHTHYOSAURUS (Stenopterygius-type, Jura) =================
// Recept: ±3 m; lengte 500. Lange smalle snuit met tanden, zeer groot oog met benen ring (scleraalring), driehoekige rugvin, maanvormige VERTICALE staartvin
// (wervelkolom buigt naar de onderlob), vier vinpoten (voor groter dan achter). Reptiel: geen haar, gladde huid, donkere rug, lichte buik.
function ichthyosaurus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const rug = '#5C6450', buik = '#C8C6B0'; const sl = Math.sin(t * 3) * 0.12;
  ctx.save(); ctx.translate(-196, 0); ctx.rotate(sl); vul(ctx, [[10, -8], [-30, -26], [-70, -74], [-84, -76], [-66, -24], [-52, 2], [-66, 30], [-84, 70], [-70, 68], [-30, 22], [10, 8]], rug, _lt(rug, 0.2), 2); ctx.restore();
  vul(ctx, [[20, -44], [-6, -94], [-22, -98], [-34, -42]], rug, _lt(rug, 0.2), 2);
  vul(ctx, [[-90, 20], [-110, 50], [-122, 52], [-114, 22]], _dk(rug, 0.12));
  const R = [[300, 6], [250, 0], [180, -14], [130, -36], [60, -48], [-40, -44], [-140, -24], [-200, -6], [-200, 6], [-140, 22], [-40, 36], [60, 40], [130, 30], [180, 16], [250, 10]];
  vul(ctx, R, rug, _lt(rug, 0.18), 2); binnen(ctx, R, () => vul(ctx, [[310, 6], [200, 4], [80, 10], [-200, 4], [-200, 60], [310, 60]], buik));
  lijn(ctx, [[300, 6], [240, 6], [178, 4]], '#24281E', 2); ctx.fillStyle = '#E8E2CC'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(290 - i * 16, 6); ctx.lineTo(287 - i * 16, 11); ctx.lineTo(284 - i * 16, 6); ctx.fill(); }
  circ(ctx, 150, -14, 17, _dk(rug, 0.2), '#B8B49A', 3); ctx.strokeStyle = '#8A8670'; ctx.lineWidth = 1.2; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.beginPath(); ctx.moveTo(150 + Math.cos(an) * 10.5, -14 + Math.sin(an) * 10.5); ctx.lineTo(150 + Math.cos(an) * 16, -14 + Math.sin(an) * 16); ctx.stroke(); }
  dierOog(ctx, 150, -14, 9, '#4A3A1A');
  vul(ctx, [[110, 26], [86, 62], [62, 84], [52, 80], [70, 50], [86, 24]], _dk(rug, 0.1));
  ctx.restore(); }

// ================= NIJLKROKODIL (Crocodylus niloticus) =================
// Recept: ±4 m; lengte 600 (staart ±45%). Lange platte snuit, ogen en neusgaten bovenop, tanden zichtbaar langs de bek, rug met rijen beenplaten (osteodermen),
// poten opzij (sprawling, bij high walk eronder), vijf vingers voor, vier tenen achter. Iris geel-groen met verticale spleetpupil.
function krokodil(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.scale(1, 1.7);
  const huid = '#5E6A3E', d = '#4A5432', buik = '#C8C08E';
  ledemaat(ctx, [[-60, -40], [-84, -22], [-76, -6]], [24, 14, 12], d); ledemaat(ctx, [[110, -40], [128, -22], [122, -6]], [20, 12, 10], d);
  const R = [[-330, -14], [-260, -26], [-160, -44], [-60, -62], [60, -64], [140, -56], [190, -52], [260, -48], [330, -40], [340, -28], [300, -22], [200, -22], [140, -20], [40, -18], [-80, -18], [-200, -10], [-330, -8]];
  vul(ctx, R, huid, _lt(huid, 0.16), 2); binnen(ctx, R, () => { vul(ctx, [[-340, -12], [0, -26], [350, -30], [350, 0], [-340, 0]], buik);
    ctx.fillStyle = d; for (let i = 0; i < 26; i++) { const xx = 120 - i * 17; const yy = i < 12 ? -60 + i * 0.4 : -52 + (i - 12) * 2.6; roundRect(ctx, xx - 6, yy, 12, 7, 2); ctx.fill(); }
    ctx.strokeStyle = rgba('#2A3018', 0.35); ctx.lineWidth = 1.4; for (let i = 0; i < 40; i++) { const xx = -320 + i * 14; ctx.beginPath(); ctx.moveTo(xx, -60); ctx.lineTo(xx, 0); ctx.stroke(); } });
  lijn(ctx, [[338, -32], [260, -32], [196, -36]], '#2A3018', 2); ctx.fillStyle = '#ECE6D0'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(330 - i * 14, -32); ctx.lineTo(327 - i * 14, (i % 2 ? -38 : -26)); ctx.lineTo(324 - i * 14, -32); ctx.fill(); }
  vul(ctx, [[180, -58], [196, -70], [214, -60]], huid); ctx.save(); ctx.translate(196, -60); ctx.scale(1, 1 / 1.7); dierOog(ctx, 0, 0, 7, '#B8A83A', { pupil: 'spleet' }); ctx.fillStyle = '#07090C'; roundRect(ctx, -1.6, -6, 3.2, 12, 1.5); ctx.fill(); ctx.restore();
  circ(ctx, 330, -46, 3, '#2A3018');
  ledemaat(ctx, [[-30, -36], [-56, -18], [-50, -4]], [26, 15, 13], huid); vul(ctx, [[-66, -8], [-30, -8], [-26, 0], [-72, 0]], d);
  ledemaat(ctx, [[134, -36], [150, -18], [146, -4]], [22, 13, 11], huid); vul(ctx, [[134, -8], [166, -8], [170, 0], [130, 0]], d);
  ctx.restore(); }

// ================= ZANDHAGEDIS (Lacerta agilis) =================
// Recept: ±20 cm; lengte 400 (staart ±60%). Slanke kop, spits toelopend, oor-opening achter het oog, poten opzij met lange dunne tenen (vijf),
// mannetje groen op de flanken, rugstreep met donkere vlekken. Rond oog met lichte iris-rand.
function hagedis(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.scale(1, 1.5);
  const flank = '#7E9A4A', rug = '#8C6E46', d = '#5E4A30';
  const teen = (px, py, k) => { ctx.strokeStyle = d; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + k * (-10 + i * 6), py + 6 - Math.abs(i - 2)); ctx.stroke(); } };
  ledemaat(ctx, [[-40, -24], [-62, -12], [-56, -2]], [12, 7, 6], d); teen(-56, -2, 1); ledemaat(ctx, [[60, -24], [76, -12], [72, -2]], [10, 6, 5], d); teen(72, -2, 1);
  ctx.strokeStyle = rug; ctx.lineCap = 'round'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-60, -22); ctx.quadraticCurveTo(-150, -18, -210, -10); ctx.stroke(); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-200, -11); ctx.lineTo(-290, -6); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-286, -6); ctx.lineTo(-320, -4); ctx.stroke();
  const R = [[-70, -20], [-40, -34], [20, -38], [70, -36], [100, -32], [130, -38], [160, -36], [176, -26], [170, -18], [130, -14], [80, -12], [0, -10], [-60, -12]];
  vul(ctx, R, flank); binnen(ctx, R, () => { vul(ctx, [[-80, -40], [180, -40], [180, -30], [-80, -28]], rug); ctx.fillStyle = d; for (let i = 0; i < 10; i++) circ(ctx, -60 + i * 20, -33, 3.5); vul(ctx, [[-80, -16], [180, -22], [180, 0], [-80, 0]], '#C8C890'); });
  ctx.save(); ctx.translate(148, -30); ctx.scale(1, 1 / 1.5); dierOog(ctx, 0, 0, 4.5, '#5A3A1A', { rand: '#E0D8A0' }); ctx.restore(); circ(ctx, 126, -26, 3, d); lijn(ctx, [[174, -22], [156, -20]], '#2A2418', 1.5);
  ledemaat(ctx, [[-30, -20], [-46, -10], [-40, -2]], [13, 8, 6], flank); teen(-40, -2, 1); ledemaat(ctx, [[80, -20], [92, -10], [88, -2]], [11, 7, 5], flank); teen(88, -2, 1);
  ctx.restore(); }

// ================= BLAUWE REIGER (Ardea cinerea) =================
// Recept: ±95 cm hoog; staand. Lange S-hals, dolkvormige gele snavel, zwarte kruinstreep met pluim, lange gele poten met de 'knie' die naar achteren buigt (= hiel),
// vier tenen (drie naar voren, één naar achter). Grijze vleugels opgevouwen. Hoogte ±420 eenheden.
function vogel(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const grijs = '#9AA2AC', d = '#6A727C', geel = '#D8B44A';
  const poot = (dx, k) => { ledemaat(ctx, [[dx, -210], [dx + 6, -130], [dx - 4, -4]], [8, 6, 5], k); ctx.strokeStyle = k; ctx.lineWidth = 4; ctx.lineCap = 'round'; [[22, 2], [12, 4], [-2, 4], [-16, -2]].forEach(([tx, ty]) => { ctx.beginPath(); ctx.moveTo(dx - 4, -4); ctx.lineTo(dx - 4 + tx, ty); ctx.stroke(); }); };
  poot(-10, _dk(geel, 0.2));
  const R = [[-120, -260], [-80, -290], [0, -300], [50, -296], [70, -276], [56, -240], [10, -214], [-50, -210], [-110, -226]];
  vul(ctx, R, grijs); binnen(ctx, R, () => { vul(ctx, [[-130, -280], [40, -296], [60, -260], [-130, -230]], d); ctx.strokeStyle = _lt(grijs, 0.3); ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-110 + i * 26, -272); ctx.lineTo(-130 + i * 26, -236); ctx.stroke(); } });
  vul(ctx, [[-110, -240], [-160, -230], [-150, -246]], d);
  vul(ctx, [[40, -290], [70, -320], [64, -360], [70, -390], [96, -404], [118, -400], [124, -386], [100, -380], [88, -360], [92, -320], [76, -280], [56, -262]], '#E6E8EA');
  lijn(ctx, [[80, -330], [74, -300], [64, -276]], '#2A2E34', 2.5);
  vul(ctx, [[118, -400], [180, -388], [182, -384], [120, -384]], geel); lijn(ctx, [[120, -392], [176, -387]], _dk(geel, 0.35), 1.2);
  vul(ctx, [[86, -404], [114, -404], [112, -398], [60, -390], [64, -396]], '#1A1C20');
  dierOog(ctx, 108, -394, 3.5, '#D8B43A');
  poot(18, geel);
  ctx.restore(); }

// ================= LEEUW, TIJGER, HUISKAT (Felidae) =================
// Gemeenschappelijk katachtigen-recept: korte snuit, ronde kop, oren rond (leeuw/tijger) of spits (kat), lange staart, teengangers met intrekbare nagels,
// achterpoot met hoge hiel. Leeuw ±2 m (zonder staart), tijger ±2,2 m, huiskat ±0,45 m: zelfde tekening, s geeft de echte verhouding. Lengte romp 400 eenheden.
function _kat(ctx, kleur, buikK, o) { const { manen = null, strepen = false, oorSpits = false, kwast = false } = o;
  const d = _dk(kleur, 0.18);
  ledemaat(ctx, [[-130, -170], [-150, -110], [-130, -60], [-142, -8]], [50, 26, 16, 18], d); ledemaat(ctx, [[110, -160], [114, -90], [108, -8]], [40, 22, 18], d);
  ctx.strokeStyle = kleur; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-170, -200); ctx.quadraticCurveTo(-250, -170, -262, -90); ctx.quadraticCurveTo(-264, -60, -248, -50); ctx.stroke();
  if (kwast) { ctx.beginPath(); ctx.ellipse(-246, -48, 10, 14, 0.5, 0, 6.283); ctx.fillStyle = '#3A2414'; ctx.fill(); }
  if (strepen) { ctx.save(); ctx.strokeStyle = kleur; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-170, -200); ctx.quadraticCurveTo(-250, -170, -262, -90); ctx.quadraticCurveTo(-264, -60, -248, -50); ctx.setLineDash([9, 13]); ctx.strokeStyle = '#1E1612'; ctx.stroke(); ctx.restore(); }
  const R = [[-176, -186], [-150, -220], [-40, -226], [60, -222], [130, -216], [160, -190], [150, -140], [110, -116], [0, -110], [-100, -116], [-160, -140]];
  vul(ctx, R, kleur); binnen(ctx, R, () => { vul(ctx, [[-180, -130], [0, -126], [170, -136], [170, -90], [-180, -90]], buikK);
    if (strepen) { ctx.fillStyle = '#1E1612'; for (let i = 0; i < 11; i++) { const xx = -160 + i * 28; zacht(ctx, [[xx, -230], [xx + 10, -200], [xx + 2, -170], [xx + 8, -140], [xx - 2, -150], [xx - 4, -190]]); ctx.fill(); } } });
  if (manen) vul(ctx, [[90, -236], [150, -262], [210, -258], [250, -230], [256, -170], [230, -120], [180, -110], [130, -130], [100, -170]], manen);
  const kx = 196, ky = -196; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(kx, ky, 46, 40, 0, 0, 6.283); ctx.fill();
  if (oorSpits) { vul(ctx, [[kx - 24, ky - 30], [kx - 18, ky - 66], [kx + 2, ky - 36]], kleur); } else { ctx.beginPath(); ctx.ellipse(kx - 16, ky - 38, 13, 12, 0, 0, 6.283); ctx.fill(); }
  vul(ctx, [[kx + 20, ky - 6], [kx + 58, ky + 2], [kx + 60, ky + 18], [kx + 40, ky + 30], [kx + 14, ky + 26]], buikK);
  vul(ctx, [[kx + 50, ky - 2], [kx + 60, ky + 2], [kx + 56, ky + 8], [kx + 50, ky + 6]], '#3A2420');
  lijn(ctx, [[kx + 54, ky + 10], [kx + 52, ky + 20], [kx + 40, ky + 24]], '#3A2420', 2);
  if (strepen) { ctx.strokeStyle = '#1E1612'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(kx - 30, ky - 20 + i * 12); ctx.lineTo(kx - 8, ky - 16 + i * 12); ctx.stroke(); } }
  dierOog(ctx, kx + 24, ky - 14, 6, o.oorSpits ? '#B8B83A' : '#C8962E', { rand: '#2A1E14' }); if (o.oorSpits) { ctx.fillStyle = '#07090C'; roundRect(ctx, kx + 22.5, ky - 19, 3, 10, 1.5); ctx.fill(); }
  ledemaat(ctx, [[-100, -170], [-118, -110], [-96, -60], [-108, -8]], [52, 28, 17, 19], kleur); ledemaat(ctx, [[134, -160], [138, -90], [134, -8]], [42, 24, 20], kleur);
  ctx.fillStyle = kleur; [[-104, -6], [138, -6]].forEach(([px, py]) => { ctx.beginPath(); ctx.ellipse(px + 6, py, 18, 8, 0, 0, 6.283); ctx.fill(); }); }
function leeuw(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); _kat(ctx, '#C89A5A', '#E2C696', { manen: '#8A5A2A', kwast: true }); ctx.restore(); }
function tijger(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); _kat(ctx, '#D2823A', '#ECE2CC', { strepen: true }); ctx.restore(); }
function huiskat(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); _kat(ctx, '#8A8A86', '#C8C8C2', { oorSpits: true }); ctx.restore(); }

// ================= CLADOGRAM-HULPJES =================
// kenmerkStreep: een kort dwarsstreepje op een tak met de naam van het kenmerk ernaast (naamBij, geen wijslijn)
function kenmerkStreep(ctx, x1, y1, x2, y2, u, naam, o = {}) { const { kleur = C.goud, a = 1, kant = 'right' } = o; if (a <= 0.01) return; const px = lerp(x1, x2, u), py = lerp(y1, y2, u);
  const an = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 18, py - Math.sin(an) * 18); ctx.lineTo(px + Math.cos(an) * 18, py + Math.sin(an) * 18); ctx.stroke(); ctx.restore();
  naamBij(ctx, naam, o.meta || null, px + (kant === 'right' ? 28 : -28), py + 12, a, kant === 'right' ? 'left' : 'right', kleur === C.goud ? C.goud : C.text); return { x: px, y: py }; }
// naamVak: afgerond vak voor een groep in de classificatie, met niveau (Meta) en naam (Tekst) linksboven
function naamVak(ctx, x, y, w, h, niveau, naam, o = {}) { const { a = 1, kleur = C.line, nadruk = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 22); ctx.fillStyle = rgba(nadruk ? C.goud : C.fill, nadruk ? 0.08 : 0.35); ctx.fill(); ctx.strokeStyle = nadruk ? C.goud : kleur; ctx.lineWidth = nadruk ? 3 : 2; ctx.stroke();
  metaText(ctx, niveau, x + 24, y + 40, nadruk ? C.goud : C.grain, 'left', 26); if (naam) text(ctx, naam, x + 24, y + 84, fTekst(38, 600), C.text, 'left'); ctx.restore(); }

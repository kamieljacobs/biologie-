// =====================================================================================
// BLOEM IN DOORSNEDE — bloem van opzij (zoals appel-/kersenbloesem), de stamper opengesneden; bestuiving door een bij.
// Recept: van buiten naar binnen vier kransen op de bloembodem: kelkbladen (groen, onder), kroonbladen (groot, kleur,
// lokken bestuivers), meeldraden (helmdraad + helmknop met twee helmhokjes vol stuifmeel), in het midden de stamper:
// stempel (kleverig) – stijl – vruchtbeginsel met zaadbeginsels. Bovenstandig vruchtbeginsel: kelk, kroon en
// meeldraden staan eronder vast. Meeldraden ± 2/3 van de kroonbladlengte; stempel ongeveer op de hoogte van de
// helmknoppen. Bestuiving: stuifmeel komt (via de bij) op de stempel; een stuifmeelbuis groeit door de stijl naar een
// zaadbeginsel (o.buis). De bij: kop, borststuk, achterlijf; 6 poten aan het borststuk; 2 paar vleugels.
// Bron: Ezcurra-lab (UC Riverside) reproductieve morfologie; LibreTexts Boundless 26.3A (kransen, stamper);
// vorm gecontroleerd met referentieplaat. Bekende fouten: meeldraden óp het vruchtbeginsel; kelk boven de kroon;
// stuifmeelbuis buiten de stijl; bij met poten aan het achterlijf.
// Ontwerp: hoogte ± 600 (y −300..300), breedte ± 760, oorsprong = midden van het vruchtbeginsel ± (0,120).
// Aanpak A: natuurgetrouw (naar referentieplaat), kroonbladen met nerven, bij die landt en stuifmeel achterlaat.
// o: a, t, bij (0..1 bij zichtbaar/vliegt in), stuif (0..1 stuifmeel op de stempel), buis (0..1 stuifmeelbuis), hi
//    ('kelk','kroon','meeldraad','stamper','vruchtbeginsel','zaadbeginsel')
// =====================================================================================
function bloemDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, bij = 0, stuif = 0, buis = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { kelk: W(-230, 110), kroon: W(-280, -60), meeldraad: W(-150, -120), helmknop: W(-170, -205), stempel: W(0, -235), stijl: W(0, -120), vruchtbeginsel: W(0, 120), zaadbeginsel: W(-28, 130), steel: W(0, 270) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const KROON = '#E9D3DD', KROONr = '#A8809A', GROEN = '#7FA868', GROENd = '#5E8A50', GEEL = '#E0B64A', STAMP = '#9FC08A';
  const dimF = k => (hi && hi !== k) ? 0.35 : 1;
  const vorm = (pts, fill, rand, lw = 1.5) => { ctx.beginPath(); bioPad(ctx, pts, true); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke(); } };
  // steel + bloembodem
  ctx.save(); ctx.globalAlpha *= dimF('kelk'); vorm([[-16, 300], [-14, 220], [-30, 190], [-60, 170], [60, 170], [30, 190], [14, 220], [16, 300]], GROEN, GROENd); ctx.restore();
  // kroonbladen: achterste groot in het midden, twee schuin opzij (achter de meeldraden)
  ctx.save(); ctx.globalAlpha *= dimF('kroon');
  const blad = (rot, L, B, dx) => { ctx.save(); ctx.translate(dx, 150); ctx.rotate(rot); const P = [[0, 0], [-B * 0.5, -L * 0.35], [-B * 0.55, -L * 0.75], [-B * 0.2, -L], [B * 0.25, -L * 0.98], [B * 0.55, -L * 0.72], [B * 0.45, -L * 0.3]];
    vorm(P, KROON, hi === 'kroon' ? C.goud : KROONr, hi === 'kroon' ? 3 : 2.2); ctx.strokeStyle = rgba(KROONr, 0.6); ctx.lineWidth = 1;
    for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(0, -8); ctx.quadraticCurveTo(k * B * 0.12, -L * 0.5, k * B * 0.2, -L * 0.92); ctx.stroke(); } ctx.restore(); };
  blad(0, 430, 210, 0); blad(-1.15, 400, 220, -24); blad(1.15, 400, 220, 24); blad(-0.55, 420, 190, -10); blad(0.55, 420, 190, 10);
  ctx.restore();
  // kelkbladen (onder de kroon)
  ctx.save(); ctx.globalAlpha *= dimF('kelk'); for (const sd of [-1, 1]) vorm([[sd * 20, 168], [sd * 120, 140], [sd * 260, 128], [sd * 150, 165], [sd * 60, 186]], GROEN, hi === 'kelk' ? C.goud : GROENd, hi === 'kelk' ? 3 : 1.5); ctx.restore();
  // meeldraden: helmdraad vanaf de bloembodem, rond de stamper (achterste dunner/doffer)
  ctx.save(); ctx.globalAlpha *= dimF('meeldraad');
  const MD = [[-178, -190, 0.85], [-120, -228, 1], [-62, -200, 0.8], [62, -205, 0.8], [125, -232, 1], [180, -192, 0.85], [-100, -150, 0.7], [96, -152, 0.7]];
  MD.forEach(([hx, hy, d], i) => { const bx = Math.sign(hx) * 34; ctx.strokeStyle = rgba('#E8E1C4', d); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, 165); ctx.quadraticCurveTo(hx * 0.45, 20, hx, hy + 18); ctx.stroke();
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(Math.atan2(hy + 18 - 20, hx - hx * 0.45) + 1.571 + 3.1416); ctx.fillStyle = hi === 'meeldraad' ? C.goud : GEEL; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 6, 0, 7, 17, 0, 0, 6.283); ctx.fill(); } ctx.restore();
    if (i < 6) { ctx.fillStyle = GEEL; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(hx + (hash(i * 5 + k) - 0.5) * 30, hy - 18 + (hash(i * 7 + k) - 0.5) * 14, 2.6, 0, 6.283); ctx.fill(); } } });
  ctx.restore();
  // stamper, opengesneden: vruchtbeginsel met zaadbeginsels, stijl, stempel
  ctx.save(); ctx.globalAlpha *= dimF('stamper') === 1 || hi === 'vruchtbeginsel' || hi === 'zaadbeginsel' ? 1 : 0.35;
  const STAMPER = [[0, 182], [-46, 170], [-56, 120], [-40, 70], [-14, 30], [-10, -150], [-14, -220], [-26, -236], [0, -242], [26, -236], [14, -220], [10, -150], [14, 30], [40, 70], [56, 120], [46, 170]];
  vorm(STAMPER, STAMP, hi === 'stamper' ? C.goud : GROENd, hi === 'stamper' ? 3 : 1.5);
  vorm([[0, 166], [-36, 156], [-42, 118], [-28, 80], [0, 62], [28, 80], [42, 118], [36, 156]], '#5E7A4E', hi === 'vruchtbeginsel' ? C.goud : null, 3); // holte vruchtbeginsel
  ctx.strokeStyle = '#9FC08A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 64); ctx.lineTo(0, 165); ctx.stroke(); // tussenschot
  for (const [zx, zy] of [[-20, 96], [-22, 126], [-20, 152], [20, 96], [22, 126], [20, 152]]) { ctx.beginPath(); ctx.ellipse(zx, zy, 11, 9, 0, 0, 6.283); ctx.fillStyle = hi === 'zaadbeginsel' ? C.goud : '#E8E6C8'; ctx.fill(); ctx.fillStyle = '#B9B68E'; ctx.beginPath(); ctx.arc(zx + Math.sign(zx) * 2, zy, 3, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#C6D98E'; ctx.beginPath(); ctx.ellipse(0, -238, 30, 9, 0, 0, 6.283); ctx.fill(); // stempel
  ctx.restore();
  // stuifmeel op de stempel en de stuifmeelbuis
  if (stuif > 0.01) { ctx.save(); ctx.globalAlpha *= stuif; ctx.fillStyle = GEEL; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(-22 + k * 9, -246 - (k % 2) * 4, 4, 0, 6.283); ctx.fill(); } ctx.restore(); }
  if (buis > 0.01) { const P = [[4, -244], [3, -150], [-2, 0], [-6, 60], [-14, 90], [-20, 96]]; const D = bioDicht(P, 12); const n = Math.max(2, Math.floor(D.length * buis));
    ctx.strokeStyle = GEEL; ctx.lineWidth = 3; ctx.beginPath(); D.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); const e = D[n - 1]; ctx.fillStyle = GEEL; ctx.beginPath(); ctx.arc(e[0], e[1], 4, 0, 6.283); ctx.fill(); }
  // bij (honingbij ± 12 mm; bloem ± 3–4 cm, dus de bij ± 1/3 van de bloembreedte): kop, borststuk met 6 poten en 2 paar vleugels, gestreept achterlijf; stuifmeel op de haren
  if (bij > 0.01) { const bx = lerp(340, 120, ease(bij)), by = lerp(-330, -268, ease(bij)) + Math.sin(t * 2) * 3;
    ctx.save(); ctx.globalAlpha *= Math.min(1, bij * 2); ctx.translate(bx, by); ctx.rotate(-0.25); ctx.scale(1.8, 1.8); const kl = 1.2;
    ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { const lx = -8 + i * 9; ctx.beginPath(); ctx.moveTo(lx, 6); ctx.lineTo(lx - 6 + i * 2, 20 * kl); ctx.lineTo(lx - 12 + i * 4, 30 * kl); ctx.stroke(); } // 3 poten zichtbaar (andere 3 erachter)
    ctx.save(); ctx.globalAlpha *= 0.5; ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { const lx = -4 + i * 9; ctx.beginPath(); ctx.moveTo(lx, 6); ctx.lineTo(lx - 2, 18); ctx.lineTo(lx - 6, 26); ctx.stroke(); } ctx.restore();
    ctx.fillStyle = '#C9922E'; ctx.beginPath(); ctx.ellipse(32, 4, 26, 15, 0.15, 0, 6.283); ctx.fill(); ctx.fillStyle = '#3A2E24'; for (const sx of [24, 36, 48]) { ctx.beginPath(); ctx.ellipse(sx, 4, 4, 13, 0.15, 0, 6.283); ctx.fill(); } // achterlijf
    ctx.fillStyle = '#8C6A3A'; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 6.283); ctx.fill(); // borststuk
    ctx.fillStyle = '#3A2E24'; ctx.beginPath(); ctx.ellipse(-18, 2, 9, 10, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-22, -6); ctx.quadraticCurveTo(-30, -18, -36, -16); ctx.stroke(); // kop + voelspriet
    ctx.fillStyle = '#1A1410'; ctx.beginPath(); ctx.ellipse(-20, 0, 4, 6, 0, 0, 6.283); ctx.fill(); // facetoog
    const fl = Math.sin(t * 60) * 0.25; ctx.fillStyle = rgba('#DDE6EE', 0.55); ctx.strokeStyle = rgba('#FFFFFF', 0.6); ctx.lineWidth = 1;
    ctx.save(); ctx.rotate(fl); ctx.beginPath(); ctx.ellipse(10, -20, 24, 9, -0.35, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(14, -12, 16, 6, -0.15, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.fillStyle = GEEL; ctx.beginPath(); ctx.arc(4, 16, 5, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(-6, 10, 2.5, 0, 6.283); ctx.fill(); // stuifmeel aan de haren
    ctx.restore(); }
  ctx.restore(); return anker;
}

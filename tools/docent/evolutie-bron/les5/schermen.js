/* =====================================================================================
   Evolutie · les 5 · Toeval en uitwisseling (31 okt 2026)
   Film 5 Toeval en uitwisseling (films/evolutie/5-toeval-en-uitwisseling.html, script v2); havo BvJ H4, vwo Nectar H7.
   Compact (± 25 min). Eigen hulpen met voorvoegsel L5_. Kleuren zoals de reeks: allel 1 blauw (EV().a1), allel 2 geel
   (EV().a2, op Pingelap het allel voor achromatopsie), nieuw allel paars; krachten: selectie groen, drift goud,
   genenstroom teal, mutatie paars. Geen personages: de film werkt met telpoppetjes.
   Vwo-schermen 9–11 (Hardy-Weinberg, rekenvoorbeeld, heterozygotenvoordeel) worden in havo overgeslagen.
   ===================================================================================== */

// ---------- hulpen ----------
// telpoppetje; anker = voeten; h = hoogte
function L5_pop(ctx, x, y, h, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y - h * 0.82, h * 0.17, kl); ctx.beginPath(); ctx.moveTo(x - h * 0.24, y); ctx.lineTo(x - h * 0.24, y - h * 0.42); ctx.quadraticCurveTo(x - h * 0.24, y - h * 0.62, x, y - h * 0.62);
  ctx.quadraticCurveTo(x + h * 0.24, y - h * 0.62, x + h * 0.24, y - h * 0.42); ctx.lineTo(x + h * 0.24, y); ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); }
const L5_MENS = () => rgba(C.text2, 0.75);
// palmboom; buig = -1..1 (wind)
function L5_palm(ctx, x, y, h, buig = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const tx = x + buig * h * 0.35, ty = y - h; ctx.strokeStyle = C.licht ? '#7A5A3A' : '#A07850'; ctx.lineWidth = h * 0.07; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + buig * h * 0.05, y - h * 0.55, tx, ty); ctx.stroke();
  ctx.strokeStyle = C.licht ? '#3E8E5A' : '#5FAF74'; ctx.lineWidth = h * 0.06;
  [-2.6, -2.0, -1.2, -0.5, 0.1].forEach((an, i) => { const b = an + buig * 0.6, L = h * 0.5; ctx.beginPath(); ctx.moveTo(tx, ty);
    ctx.quadraticCurveTo(tx + Math.cos(b) * L * 0.6, ty + Math.sin(b) * L * 0.6 - L * 0.15, tx + Math.cos(b) * L, ty + Math.sin(b) * L + L * 0.25); ctx.stroke(); });
  ctx.restore(); }
// atol van boven/schuin: ring van zand en groen in de zee; storm = 0..1 (golven en buigende palmen)
function L5_atol(ctx, x, y, s, a, T, storm = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 420 * s, 150 * s, 0, 0, 6.283); ctx.fillStyle = rgba(C.water, C.licht ? 0.16 : 0.22); ctx.fill();
  ctx.strokeStyle = rgba(C.water, 0.5); ctx.lineWidth = 3;
  for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i <= 60; i++) { const xx = x - 400 * s + i / 60 * 800 * s, yy = y + (95 + k * 22) * s + Math.sin(i * 0.5 + T * (2 + storm * 4) + k) * (4 + storm * 12) * s; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(x, y, 300 * s, 84 * s, 0, 0, 6.283); ctx.ellipse(x, y, 220 * s, 50 * s, 0, 0, 6.283, true); ctx.fillStyle = C.licht ? '#E3D3A6' : '#C9B47E'; ctx.fill('evenodd');
  ctx.beginPath(); ctx.ellipse(x, y, 220 * s, 50 * s, 0, 0, 6.283); ctx.fillStyle = rgba(C.water, C.licht ? 0.35 : 0.4); ctx.fill();
  const b = storm * (0.6 + 0.3 * Math.sin(T * 5));
  [[-250, 10, 80], [-190, -40, 95], [-60, -62, 85], [90, -60, 100], [220, -30, 90], [260, 20, 75], [140, 62, 85], [-120, 64, 90]].forEach(([dx, dy, h]) => L5_palm(ctx, x + dx * s, y + dy * s, h * s, b));
  ctx.restore(); }
// grafiek met allelfrequenties (0–100 %) over generaties; lijnen = [[p0, p1, …]], u = deel dat al getekend is
function L5_grafiek(ctx, x, y, w, h, a, o = {}) { if (a <= 0.01) return; const n = o.gens || 60, u = o.u == null ? 1 : o.u;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(C.line, 0.45); ctx.lineWidth = 2; [0.5, 1].forEach(v => { ctx.beginPath(); ctx.moveTo(x, y - h * v); ctx.lineTo(x + w, y - h * v); ctx.stroke(); }); ctx.restore();
  [['0%', 0], ['50%', 0.5], ['100%', 1]].forEach(([s, v]) => regel(ctx, s, x - 14, y - h * v + 9, a, C.text2, 24, 'right', 500));
  if (o.as) metaText(ctx, o.as, x + w, y + 40, C.text2, 'right', 18, a);
  (o.lijnen || []).forEach((L, k) => { const kl = Array.isArray(o.kl) ? o.kl[k] : (o.kl || C.goud), m = u * n; if (m <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = o.lw || 3.5; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let g = 0; g <= Math.min(n, Math.ceil(m)); g++) { const gg = Math.min(g, m), i0 = Math.floor(gg), f = gg - i0, v = i0 >= n ? L[n] : lerp(L[i0], L[i0 + 1], f);
      const xx = x + gg / n * w, yy = y - h * v; g ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }); }
// simulatie zoals in de film: populatie van 10 (20 allelen) en van 5000 (10.000 allelen), 8 keer, 60 generaties, geen selectie
const L5_SIM = (() => { const r = toeval(11); const gauss = () => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.283 * r()); };
  const run = (N2, groot) => { const p = [0.5]; for (let g = 1; g <= 60; g++) { const q = p[g - 1]; if (q <= 0 || q >= 1) { p.push(q); continue; }
    if (!groot) { let k = 0; for (let i = 0; i < N2; i++) if (r() < q) k++; p.push(k / N2); } else p.push(clamp(q + Math.sqrt(q * (1 - q) / N2) * gauss(), 0, 1)); } return p; };
  return { klein: Array.from({ length: 8 }, () => run(20, false)), groot: Array.from({ length: 8 }, () => run(10000, true)) }; })();
// genenstroom: twee populaties, 90 % en 10 % blauw, elke generatie wisselt 1 op 20
const L5_STROOM = (() => { const A = [0.9], B = [0.1], m = 0.05; for (let g = 1; g <= 60; g++) { const a = A[g - 1], b = B[g - 1]; A.push((1 - m) * a + m * b); B.push((1 - m) * b + m * a); } return [A, B]; })();
// jachtluipaard van opzij, kijkt naar rechts (kijk = -1: links); s = 1 → ± 300 lang; loop = fase
function L5_luipaard(ctx, x, y, s, a, T, o = {}) { if (a <= 0.01) return; const { kijk = 1, loop = null } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  const vacht = '#D9A65A', donker = '#2A2018', buik = '#EBD3A0';
  ctx.strokeStyle = vacht; ctx.lineCap = 'round'; ctx.lineWidth = 12;
  [[-80, 0], [-55, 1.6], [60, 3.1], [85, 4.7]].forEach(([px, f]) => { const sw = loop == null ? 0 : Math.sin(loop * 6 + f) * 14; ctx.beginPath(); ctx.moveTo(px, -10); ctx.lineTo(px + sw, 70); ctx.stroke(); });
  ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-110, -30); ctx.bezierCurveTo(-170, -20, -190, 20, -165, 50); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -30, 120, 42, -0.03, 0, 6.283); ctx.fillStyle = vacht; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -6, 90, 18, 0, 0, 3.14); ctx.fillStyle = buik; ctx.fill();
  ctx.beginPath(); ctx.moveTo(95, -55); ctx.quadraticCurveTo(125, -80, 140, -78); ctx.lineTo(150, -40); ctx.quadraticCurveTo(120, -20, 95, -20); ctx.closePath(); ctx.fillStyle = vacht; ctx.fill();
  circ(ctx, 155, -80, 26, vacht); ctx.beginPath(); ctx.ellipse(176, -72, 14, 10, 0, 0, 6.283); ctx.fillStyle = buik; ctx.fill();
  [[142, -104], [160, -106]].forEach(([ex, ey]) => { ctx.beginPath(); ctx.moveTo(ex - 7, ey + 6); ctx.lineTo(ex, ey - 6); ctx.lineTo(ex + 7, ey + 6); ctx.closePath(); ctx.fillStyle = vacht; ctx.fill(); });
  circ(ctx, 165, -86, 3.5, donker); circ(ctx, 188, -74, 3.5, donker);
  ctx.strokeStyle = donker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(166, -82); ctx.quadraticCurveTo(170, -66, 178, -60); ctx.stroke();
  for (let i = 0; i < 34; i++) { const sx = -105 + hash(i * 3.3) * 205, sy = -62 + hash(i * 7.1) * 50; circ(ctx, sx, sy, 4.5, donker); }
  ctx.restore(); }
// omheind reservaat: rechthoek met hekpaaltjes
function L5_reservaat(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.groen, C.licht ? 0.1 : 0.12), rgba(C.oker, 0.8), 3);
  ctx.fillStyle = C.oker; for (let i = 0; i <= 8; i++) { ctx.fillRect(x + i * w / 8 - 3, y - 6, 6, 12); ctx.fillRect(x + i * w / 8 - 3, y + h - 6, 6, 12); } ctx.restore(); }
// rode bloedcel: rond (schijf) of sikkel
function L5_bloedcel(ctx, x, y, r, sikkel = 0, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); const kl = C.licht ? '#C0483A' : '#D0584A';
  if (sikkel < 0.5) { circ(ctx, 0, 0, r, kl, dk(kl, 0.25), 2); circ(ctx, 0, 0, r * 0.45, rgba(dk(kl, 0.3), 0.5)); }
  else { ctx.beginPath(); ctx.arc(0, r * 0.6, r * 1.15, -2.6, -0.54); ctx.arc(0, r * 1.25, r * 1.05, -0.62, -2.52, true); ctx.closePath(); shape(ctx, kl, dk(kl, 0.25), 2); }
  ctx.restore(); }
// gloed om stip k van een stippenveld (zelfde raster als stippen())
function L5_gloedIn(ctx, x, y, w, h, n, k, r, col, a) { const kol = Math.max(1, Math.round(Math.sqrt(n * w / h))), rijen = Math.ceil(n / kol);
  gloed(ctx, x + (k % kol + 0.5) * w / kol, y + (Math.floor(k / kol) + 0.5) * h / rijen, r, col, a); }
function L5_kop(ctx, s, x, y, a, kl = C.text, px = 40) { regel(ctx, s, x, y, a, kl, px, 'center', 700); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 5: toeval en uitwisseling. Genetische drift, flessenhals, founder-effect en genenstroom', n: 'Kies eerst havo of vwo. In vwo komen er drie schermen bij (9–11: Hardy-Weinberg, een rekenvoorbeeld en heterozygotenvoordeel bij sikkelcel); in havo worden die overgeslagen. Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 5 van de nieuwe reeks: havo Biologie voor jou H4, vwo Nectar H7. Bewust kort (± 25 minuten, vwo ± 30).' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 5', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Toeval en', 140, 465, fTitel(98), C.text); text(ctx, 'uitwisseling', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'drift · flessenhals · genenstroom', 144, 675, 1, C.text2, 32, 'left', 400);
    pot(ctx, 1460, 820, 1.3, { p: 0.5, n: 80, seed: 3 });
    const z = T * 1.2; ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= 6; i++) { const xx = 1240 + i * 75, yy = 330 + (i % 2 ? -40 : 40) + Math.sin(z + i) * 6; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
    pijl(ctx, 1640, 330, 1720, 300, C.goud, 7, 1, 26);
  } });

// ---------- 2 · Pingelap ----------
SCHERMEN.push({ titel: 'Pingelap', kop: 'Een eiland waar veel mensen geen kleur zien', deel: 'Opening',
  stappen: [
    { t: 'Midden in de Grote Oceaan ligt <b>Pingelap</b>, een atol van een paar vierkante kilometer. Er wonen ongeveer 250 mensen.', n: 'De opening van de film. Pingelap hoort bij Micronesië (Pohnpei). Oliver Sacks schreef er het boek The Island of the Colorblind over (1997).' },
    { t: 'Op Pingelap ziet ongeveer 1 op de 20 mensen helemaal geen kleur: <b>achromatopsie</b>. Elders op de wereld 1 op de 30.000.', n: 'Achromatopsie: geen werkende kegeltjes, alles in grijstinten, fel licht doet pijn, minder scherp zien. Recessief erfelijk (gen CNGB3 op Pingelap).' },
    { t: 'Het allel geeft geen voordeel, eerder een nadeel. Toch is het daar heel gewoon.', n: 'Startvraag van de film (kun je zelf stellen): Kan een allel vaak worden zonder dat het iets oplevert? Het antwoord komt bij scherm 8 (vier krachten): door drift.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9), a2 = S.on(2, 0.9);
    const ax = lerp(960, 560, a1), as = lerp(1.6, 1.05, a1);
    const aa = a0 * (1 - a2); L5_atol(ctx, ax, lerp(600, 380, a1), as, aa, T); naam(ctx, 'Pingelap', ax, lerp(600, 380, a1) + 200 * as, aa, 'center', C.text, 34);
    regel(ctx, '± 250 mensen', ax, lerp(600, 380, a1) + 200 * as + 40, aa, C.text2, 28, 'center', 600);
    if (a1 > 0.01) { // raster van 20, één geel; rechts 1 op 30.000
      for (let i = 0; i < 20; i++) { const c = i % 10, r = Math.floor(i / 10); L5_pop(ctx, 260 + c * 62, 780 + r * 110, 90, i === 13 ? C.oker : L5_MENS(), a1 * S.on(1, 0.4, i * 0.03)); }
      regel(ctx, '1 op 20', 540, 930, a1, C.oker, 40, 'center', 700);
      paneel(ctx, 1160, 210, 600, 760, a1 * S.on(1, 0.5, 0.6));
      stippen(ctx, 1200, 250, 520, 560, 900, (i) => i === 437 ? C.oker : rgba(C.text2, 0.45), a1 * S.on(1, 0.5, 0.7), { r: 5 });
      L5_gloedIn(ctx, 1200, 250, 520, 560, 900, 437, 40, C.oker, a1);
      regel(ctx, 'elders: 1 op 30.000', 1460, 880, a1 * S.on(1, 0.5, 0.7), C.text, 36, 'center', 700);
      regel(ctx, '(hier 900 getekend)', 1460, 930, a1 * S.on(1, 0.5, 0.7), C.text2, 26, 'center', 400); }
    if (a2 > 0.01) { pot(ctx, 420, 560, 0.95, { p: 0.78, n: 60, seed: 8, a: a2 }); knikker(ctx, 610, 330, 18, EV().a2, a2); naam(ctx, 'allel voor achromatopsie', 640, 341, a2, 'left', C.oker, 30);
      regel(ctx, '?', 760, 520, a2, C.goud, 130, 'center', 700); }
  } });

// ---------- 3 · drift ----------
SCHERMEN.push({ titel: 'Drift', kop: 'Een greep uit de pot', deel: 'Genetische drift',
  stappen: [
    { t: 'De volgende generatie krijgt niet de hele pot, maar een <b>greep</b> eruit. Welke allelen in die greep zitten, is toeval.', n: 'Terug naar de pot uit les 1. Wie een ongeluk krijgt of geen partner vindt, heeft niet per se andere allelen: dat is geen selectie.' },
    { t: 'Een computer trekt 60 generaties lang blind uit een populatie van <b>10 dieren</b>, half blauw, half geel. Acht keer.', n: 'Vraag uit de film: Een populatie van tien dieren, de helft van de allelen blauw, de helft geel, geen selectie. Wat denk je, na zestig generaties? (a) Het blijft precies de helft: zonder selectie verandert er niets, (b) Het dominante allel wordt vanzelf vaker, (c) Het schommelt, en vaak is één allel helemaal verdwenen. Antwoord c.' },
    { t: 'De lijnen zwalken en komen op 0 of 100 %. Dan is één allel weg en komt het niet vanzelf terug.', n: 'Bij 0 % is blauw verdwenen, bij 100 % geel. Terug kan alleen door mutatie of genenstroom. De lijnen zijn een echte simulatie (vast zaadje), net als in de film.' },
    { t: 'Met <b>5000 dieren</b> blijven de lijnen dicht bij de helft. Verandering door toeval heet <b>genetische drift</b>: sterk in kleine populaties.', n: 'Een grote greep lijkt meer op de hele pot. Vergelijk: 10 keer een munt opgooien geeft makkelijk 7 kop; 10.000 keer bijna nooit 70 %.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.2), a1 = S.on(1, 0.6), a2 = S.on(2, 3.0), a3 = S.on(3, 2.2);
    pot(ctx, 260, 620, 1.0, { p: 0.5, n: 70, seed: 21, a: a0 }); naam(ctx, 'ouders', 260, 280, a0, 'center', C.text2, 30);
    const kl = [EV().a1, EV().a2, EV().a2, EV().a1, EV().a2, EV().a2, EV().a1, EV().a2];
    kl.forEach((k, i) => { const u = ease(clamp(a0 * 1.6 - i * 0.08, 0, 1)); const sx = 230 + (i % 3) * 26, sy = 520 - Math.floor(i / 3) * 26, ex = 560 + (i % 4) * 34, ey = 590 - Math.floor(i / 4) * 34;
      knikker(ctx, lerp(sx, ex, u), lerp(sy, ey, u) - Math.sin(u * 3.14) * 120, 14, k, a0 * (u > 0.02 ? 1 : 0)); });
    ctx.save(); ctx.globalAlpha *= a0; ctx.strokeStyle = C.line; ctx.lineWidth = 3; roundRect(ctx, 530, 500, 160, 120, 20); ctx.stroke(); ctx.restore();
    naam(ctx, 'greep', 610, 680, a0, 'center', C.goud, 30); naam(ctx, '5 geel, 3 blauw', 610, 720, a0 * S.on(0, 0.5, 0.9), 'center', C.text2, 26);
    pijl(ctx, 400, 420, 520, 470, C.goud, 4, a0);
    const gx = 900, gw = 900;
    if (a1 > 0.01) { metaText(ctx, '10 dieren', gx, 215, C.goud, 'left', 22, a1); L5_grafiek(ctx, gx, 580, gw, 330, a1, { lijnen: L5_SIM.klein, u: a2, kl: C.goud, as: 'generaties' }); }
    if (a3 > 0.01) { metaText(ctx, '5000 dieren', gx, 680, C.teal, 'left', 22, a3); L5_grafiek(ctx, gx, 1010, gw, 280, a3, { lijnen: L5_SIM.groot, u: a3, kl: C.teal, as: 'generaties' }); }
    if (a3 > 0.01) termKaart(ctx, 'genetische drift', 'allelfrequenties veranderen door toeval', 400, 850, a3 * S.on(3, 0.6, 1.4), C.goud);
  } });

// ---------- 4 · flessenhals ----------
SCHERMEN.push({ titel: 'Flessenhals', kop: 'Pingelap, rond 1775', deel: 'Flessenhals en founder-effect',
  stappen: [
    { t: 'Rond 1775 raast een tyfoon over Pingelap. Daarna volgt hongersnood. Er blijven ongeveer <b>20 mensen</b> over.', n: 'Het jaartal en het aantal overlevers komen uit mondelinge overlevering van de eilanders (bronnen noemen 1775 en ± 20 overlevers).' },
    { t: 'Een populatie die ineens heel klein wordt, gaat door een <b>flessenhals</b>. Welke allelen erdoor komen, is toeval.', n: 'Vraag uit de film: Een populatie gaat door een flessenhals: van duizend naar twintig dieren. Wat gebeurt er met de genetische variatie? (a) Die neemt af: zeldzame allelen komen er vaak niet door, (b) Die neemt toe: in een kleine groep ontstaan meer mutaties, (c) Die blijft gelijk: alle allelen zijn er nog, alleen minder vaak. Antwoord a.' },
    { t: 'Bij die 20 mensen was er waarschijnlijk één drager van het allel voor achromatopsie. Dit heet het <b>flessenhalseffect</b>.', n: '20 mensen dragen samen 40 allelen van elk gen. Eén geel allel is dan al 1 op 40 = 2,5 %: veel meer dan vóór de tyfoon.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.6), a2 = S.on(2, 1.4);
    const storm = a1 > 0.01 ? 0 : 0.5 + 0.5 * Math.sin(T * 0.6);
    const sx = lerp(960, 420, a1), ss = lerp(1.25, 0.8, a1);
    L5_atol(ctx, sx, 420, ss, a0, T, storm * (1 - a1));
    if (a1 < 0.99) { ctx.save(); ctx.globalAlpha *= a0 * (1 - a1); for (let i = 0; i < 14; i++) { const rx = (hash(i * 9.1) * 1400 + T * 500) % 1400 + 260, ry = (hash(i * 4.7) * 300 + T * 700) % 300 + 190; ctx.strokeStyle = rgba(C.water, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 20, ry + 40); ctx.stroke(); } ctx.restore(); }
    regel(ctx, '1775: tyfoon', sx, 420 - 210 * ss, a0 * (1 - a1), C.text, 38, 'center', 700);
    for (let i = 0; i < 20; i++) { const c = i % 10, r = Math.floor(i / 10); L5_pop(ctx, lerp(680, 150, a1) + c * lerp(62, 56, a1), lerp(760, 790, a1) + r * 100, 82, (a2 > 0.5 && i === 7) ? C.oker : L5_MENS(), a0 * S.on(0, 0.5, 0.6 + i * 0.02)); }
    regel(ctx, '± 20 over', lerp(960, 400, a1), lerp(1000, 1000, a1), a0 * S.on(0, 0.5, 0.9), C.text, 36, 'center', 700);
    if (a1 > 0.01) { // grote pot → hals → kleine pot
      pot(ctx, 1080, 640, 1.05, { p: 0.98, n: 72, seed: 5, a: a1, kleuren: Array.from({ length: 72 }, (_, i) => i === 30 ? EV().a2 : i % 9 === 4 ? C.paars : i % 11 === 3 ? C.koraal : EV().a1) });
      naam(ctx, 'vóór: ± 1000 mensen', 1080, 270, a1, 'center', C.text2, 28);
      ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1230, 420); ctx.quadraticCurveTo(1330, 470, 1350, 500); ctx.lineTo(1430, 500); ctx.quadraticCurveTo(1450, 470, 1550, 420);
      ctx.moveTo(1230, 600); ctx.quadraticCurveTo(1330, 550, 1350, 530); ctx.lineTo(1430, 530); ctx.quadraticCurveTo(1450, 550, 1550, 600); ctx.stroke(); ctx.restore();
      pot(ctx, 1700, 640, 0.62, { kleuren: Array.from({ length: 40 }, (_, i) => i === 3 ? EV().a2 : EV().a1), seed: 9, a: a1 * S.on(1, 0.6, 0.8), kr: 14 });
      naam(ctx, 'na: 20 mensen, 40 allelen', 1700, 400, a1 * S.on(1, 0.6, 0.8), 'center', C.text2, 28);
      const u = ((T * 0.35) % 1); knikker(ctx, lerp(1250, 1560, u), 515, 14, EV().a2, a1 * Math.sin(u * 3.14));
    }
    if (a2 > 0.01) termKaart(ctx, 'flessenhalseffect', 'ineens heel klein: toeval bepaalt welke allelen overblijven', 1380, 780, a2 * S.on(2, 0.6, 0.4), C.goud);
  } });

// ---------- 5 · na de tyfoon + founder-effect ----------
SCHERMEN.push({ titel: 'Na de tyfoon', kop: 'Klein blijven: de drift werkt door', deel: 'Flessenhals en founder-effect',
  stappen: [
    { t: 'Daarna bleef de populatie generaties lang klein. Vier generaties na de tyfoon had al bijna <b>3 %</b> achromatopsie.', n: 'In een kleine populatie blijft drift sterk werken; bovendien trouwden de eilanders vooral onderling.' },
    { t: 'Nu ziet 1 op de 20 geen kleur en is ongeveer <b>3 op de 10</b> drager. Niet door selectie, maar door toeval.', n: 'De balken tonen het aandeel gele allelen. 1775: 1 op 40. Nu: als 1 op 20 mensen twee gele allelen heeft, is ± 22 % van de allelen geel (vwo: q = √0,05).' },
    { t: 'Beginnen een paar individuen samen een nieuwe populatie, bijvoorbeeld op een leeg eiland, dan heet dat het <b>founder-effect</b>.', n: 'Ook dan is het een toevallige greep uit de oude pot. Verschil met flessenhals: bij het founder-effect blijft de oude populatie bestaan; een klein groepje begint elders opnieuw. Bekend voorbeeld: de Amish in Pennsylvania (Ellis-van Creveld-syndroom).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.2), a1 = S.on(1, 1.2), a2 = S.on(2, 1.4);
    const rij = [['1775', 0.025, a0], ['± 1870', 0.17, a0 * S.on(0, 0.8, 0.5)], ['nu', 0.22, a1]];
    const ry = a2 > 0.01 ? lerp(0, -40, a2) : 0;
    rij.forEach(([jr, q, a], i) => { if (a <= 0.01) return; const y = 260 + i * 130 + ry;
      regel(ctx, jr, 230, y + 30, a, C.text, 36, 'right', 700); allelBalk(ctx, 270, y, 900, 1 - q * a, a, { procent: false, h: 44 }); });
    regel(ctx, '1 van de 40 allelen geel', 1200, 290 + ry, a0, C.text2, 30, 'left', 600);
    regel(ctx, 'bijna 3 % ziet geen kleur', 1200, 420 + ry, a0 * S.on(0, 0.8, 0.5), C.text2, 30, 'left', 600);
    regel(ctx, '1 op 20 ziet geen kleur', 1200, 540 + ry, a1, C.oker, 30, 'left', 700); regel(ctx, '3 op 10 drager', 1200, 580 + ry, a1, C.text2, 30, 'left', 600);
    if (a1 > 0.01 && a2 < 0.01) { for (let i = 0; i < 10; i++) L5_pop(ctx, 420 + i * 62, 860, 100, i < 3 ? mix(C.text2, C.oker, 0.6) : L5_MENS(), a1 * S.on(1, 0.4, 0.4 + i * 0.04));
      naam(ctx, 'drager', 482, 900, a1, 'center', C.oker, 28); pijl(ctx, 1400, 760, 1400, 680, C.goud, 4, 0); regel(ctx, 'zonder selectie', 1300, 820, a1, C.goud, 36, 'center', 700); }
    if (a2 > 0.01) { const y0 = 700;
      pot(ctx, 420, y0 + 290, 0.9, { p: 0.5, n: 60, seed: 12, a: a2, kleuren: Array.from({ length: 60 }, (_, i) => [EV().a1, EV().a2, C.paars, C.koraal][i % 4]) }); naam(ctx, 'oude populatie', 420, y0 + 10, a2, 'center', C.text2, 28);
      ctx.save(); ctx.globalAlpha *= a2; ctx.beginPath(); ctx.ellipse(1380, y0 + 270, 260, 60, 0, 0, 6.283); ctx.fillStyle = rgba(C.water, 0.25); ctx.fill(); ctx.beginPath(); ctx.ellipse(1380, y0 + 262, 170, 36, 0, 0, 6.283); ctx.fillStyle = C.licht ? '#E3D3A6' : '#C9B47E'; ctx.fill(); ctx.restore();
      L5_palm(ctx, 1290, y0 + 255, 80, 0, a2); naam(ctx, 'leeg eiland', 1380, y0 + 370, a2, 'center', C.text2, 28);
      [EV().a2, EV().a2, EV().a1].forEach((k, i) => { const u = ease(clamp(a2 * 1.5 - 0.3 - i * 0.1, 0, 1)); knikker(ctx, lerp(440 + i * 30, 1340 + i * 40, u), lerp(y0 + 200, y0 + 240, u) - Math.sin(u * 3.14) * 140, 16, k, a2); });
      termKaart(ctx, 'founder-effect', 'een paar stichters: een toevallige greep', 880, y0 + 160, a2 * S.on(2, 0.6, 0.9), C.goud); }
  } });

// ---------- 6 · jachtluipaard ----------
SCHERMEN.push({ titel: 'Jachtluipaard', kop: 'Bijna geen variatie meer', deel: 'Flessenhals en founder-effect',
  stappen: [
    { t: 'Ook het <b>jachtluipaard</b> ging door een flessenhals, waarschijnlijk zo\'n 12.000 jaar geleden. Er bleven er maar weinig over.', n: 'Rond het einde van de laatste ijstijd; tegelijk stierven veel grote zoogdieren uit. Het tijdstip is een schatting uit DNA.' },
    { t: 'Onderzoekers plaatsten huid van het ene jachtluipaard op een ander, niet-verwant dier. Alle <b>14</b> huidtransplantaten werden geaccepteerd.', n: 'O\'Brien e.a. 1985 (Science). Bij mensen en andere zoogdieren stoot het afweersysteem vreemde huid af, omdat de afweergenen (MHC) verschillen. Bij de jachtluipaarden verschillen ze bijna niet.' },
    { t: 'Zo weinig variatie is een risico: een nieuwe ziekte kan bijna alle dieren tegelijk treffen.', n: 'Variatie is de grondstof voor selectie: als niemand een allel heeft dat beschermt, kan de populatie zich niet aanpassen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.6), a2 = S.on(2, 1.2);
    if (a1 < 0.01) { L5_luipaard(ctx, 960 + Math.sin(T * 0.5) * 40, 620, 2.0, a0, T, { loop: T }); regel(ctx, '± 12.000 jaar geleden: flessenhals', 960, 900, a0, C.text, 38, 'center', 700); }
    if (a1 > 0.01) { const y = a2 > 0.01 ? 470 : 560;
      L5_luipaard(ctx, 520, y, 1.25, a1, T); L5_luipaard(ctx, 1400, y, 1.25, a1, T + 1, { kijk: -1 });
      const u = ((S.T * 0.4) % 1), hx = lerp(560, 1360, ease(u)), hy = y - 60 - Math.sin(u * 3.14) * 140;
      ctx.save(); ctx.globalAlpha *= a1; roundRect(ctx, hx - 20, hy - 20, 40, 40, 6); shape(ctx, '#D9A65A', C.line, 2); ctx.restore();
      for (let k = 0; k < 14; k++) vink(ctx, 520 + k * 63, y + 170, 16, a1 * S.on(1, 0.3, 0.5 + k * 0.07), C.groen);
      naam(ctx, '14 van de 14 geaccepteerd', 960, y + 240, a1 * S.on(1, 0.5, 1.4), 'center', C.groen, 34); }
    if (a2 > 0.01) { const y = 1010;
      pot(ctx, 640, y, 0.62, { kleuren: Array.from({ length: 40 }, (_, i) => [EV().a1, EV().a2, C.paars, C.koraal, C.groen][i % 5]), seed: 4, a: a2, kr: 13 });
      naam(ctx, 'andere katachtigen', 820, y - 60, a2, 'left', C.text2, 28);
      pot(ctx, 1220, y, 0.62, { kleuren: Array.from({ length: 40 }, (_, i) => i === 17 ? EV().a2 : EV().a1), seed: 6, a: a2, kr: 13 });
      naam(ctx, 'jachtluipaard', 1400, y - 60, a2, 'left', C.text2, 28); }
  } });

// ---------- 7 · genenstroom ----------
SCHERMEN.push({ titel: 'Genenstroom', kop: 'Allelen verhuizen mee', deel: 'Genenstroom',
  stappen: [
    { t: 'In Zuid-Afrika leven veel jachtluipaarden in losse, omheinde reservaten. Elke groep is klein: drift en <b>inteelt</b> dreigen.', n: 'Inteelt: paren tussen verwanten, waardoor schadelijke recessieve allelen vaker homozygoot worden.' },
    { t: 'Sinds 2011 verhuizen natuurbeschermers jachtluipaarden tussen reservaten. Uitwisseling van allelen heet <b>genenstroom</b>.', n: 'Het Cheetah Metapopulation Project van de Endangered Wildlife Trust (begonnen in 2011 met 217 dieren in 41 reservaten; in 2020 419 in 60).' },
    { t: 'Twee populaties: 90 % en 10 % blauw. Elke generatie verhuist 1 op de 20. Na zo\'n 40 generaties zijn ze bijna gelijk.', n: 'Vraag uit de film: Twee populaties. In de ene is negentig procent van de allelen blauw, in de andere tien procent. Elke generatie verhuist één op de twintig dieren naar de andere kant. Wat denk je? (a) Ze blijven zo verschillend: zo weinig dieren maakt niet uit, (b) Na een tijd gaan de twee potten op elkaar lijken, (c) Allebei gaan ze naar honderd procent blauw. Antwoord b.' },
    { t: 'Genenstroom maakt populaties meer gelijk en brengt nieuwe allelen. Stopt de genenstroom, dan groeien ze uit elkaar.', n: 'Dat is het begin van soortvorming: de volgende film (en les 6).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.2), a2 = S.on(2, 3.0), a3 = S.on(3, 0.9);
    const R = [[140, 200], [500, 200], [140, 600], [500, 600]], rw = 300, rh = 330;
    R.forEach(([x, y], i) => { const a = a0 * S.on(0, 0.5, i * 0.12); L5_reservaat(ctx, x, y, rw, rh, a);
      pot(ctx, x + 80, y + rh - 30, 0.42, { kleuren: Array.from({ length: 24 }, (_, k) => k % (3 + i) === 0 ? [EV().a2, C.paars, C.koraal, EV().a2][i] : EV().a1), seed: 3 + i, a, kr: 14 });
      L5_luipaard(ctx, x + 210, y + 110, 0.36, a, T + i, { kijk: i % 2 ? -1 : 1 }); });
    if (a1 > 0.01) { [[440, 360, 500, 360], [640, 530, 640, 600], [290, 600, 290, 530], [440, 760, 500, 760]].forEach(([x1, y1, x2, y2], k) => { pijl(ctx, x1 - 20, y1, x2 + 20, y2, C.teal, 5, a1 * S.on(1, 0.4, k * 0.1)); });
      const u = ease((T * 0.4) % 1), ka = a1 * Math.sin(((T * 0.4) % 1) * 3.14); knikker(ctx, lerp(400, 560, u) - 12, 330, 11, C.paars, ka); knikker(ctx, lerp(400, 560, u) + 12, 330, 11, EV().a2, ka); }
    if (a2 > 0.01) { metaText(ctx, 'aandeel blauw', 1000, 215, C.text2, 'left', 20, a2);
      L5_grafiek(ctx, 1000, 820, 800, 560, a2 > 0 ? 1 : 0, { lijnen: L5_STROOM, u: a2, kl: [EV().a1, EV().a2], gens: 60, as: 'generaties', lw: 5 }); }
    if (a3 > 0.01) termKaart(ctx, 'genenstroom', 'uitwisseling van allelen tussen populaties', 1400, 880, a3, C.teal);
  } });

// ---------- 8 · vier krachten ----------
SCHERMEN.push({ titel: 'Vier krachten', kop: 'Vier krachten in één pot', deel: 'Vier krachten',
  stappen: [
    { t: '<b>Selectie</b>: allelen die meer overlevende jongen opleveren, worden vaker. Welke dat zijn, hangt af van de omgeving.', n: 'Les 2–4. Selectie heeft een richting: naar het allel met het voordeel (in die omgeving).' },
    { t: '<b>Drift</b>: toeval verschuift de allelfrequenties, zonder richting. Vooral in een kleine pot.', n: 'De balk wiebelt alle kanten op; in een grote pot veel minder.' },
    { t: '<b>Genenstroom</b>: allelen komen erbij of gaan weg met dieren die verhuizen. <b>Mutatie</b>: af en toe een nieuwe knikker, maar zeldzaam.', n: 'Vraag uit de film: Welke kracht kan een allel vaak maken, ook als het niets oplevert of zelfs schaadt? (a) Selectie, (b) Mutatie, (c) Genetische drift. Antwoord c.' },
    { t: 'Drift kijkt niet naar voordeel of nadeel. In een kleine populatie kan toeval een schadelijk allel heel gewoon maken. Zo ging het op Pingelap.', n: 'Antwoord op de startvraag (scherm 2): ja, een allel kan vaak worden zonder dat het iets oplevert, door drift na een flessenhals. Mutatie maakt een allel niet vaak: het ontstaat één keer.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9), a2 = S.on(2, 1.0), a3 = S.on(3, 1.0), K = EV().kracht;
    const dim = 1 - 0.75 * a3;
    pot(ctx, 960, 760, 1.25, { p: 0.55, n: 80, seed: 14, a: 1 }); naam(ctx, 'genenpool', 960, 340, 1, 'center', C.text2, 30);
    const w = a1 > 0.01 ? Math.sin(T * 2.3) * 0.06 + Math.sin(T * 5.1) * 0.03 : 0, p = 0.55 + a0 * 0.08 + w * a1 * (a3 > 0.01 ? 1 : 1);
    allelBalk(ctx, 660, 820, 600, clamp(p, 0, 1), 1, { h: 40 });
    if (a0 > 0.01) { pijl(ctx, 1560, 560, 1190, 600, K.selectie, 8, a0 * dim, 28); regel(ctx, 'selectie', 1580, 520, a0 * dim, K.selectie, 42, 'left', 700); regel(ctx, 'met richting', 1580, 565, a0 * dim, C.text2, 28, 'left', 500); }
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = K.drift; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
      for (let i = 0; i <= 6; i++) { const xx = 760 + i * 66, yy = 230 + (i % 2 ? -30 : 30) + Math.sin(T * 3 + i) * 8; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
      gloed(ctx, 960, 230, 240, K.drift, a3); regel(ctx, 'drift', 700, 230, a1, K.drift, 42, 'right', 700); regel(ctx, 'zonder richting', 700, 272, a1, C.text2, 28, 'right', 500); }
    if (a2 > 0.01) { pijl(ctx, 330, 560, 720, 600, K.stroom, 8, a2 * dim, 28); pijl(ctx, 720, 680, 330, 720, K.stroom, 8, a2 * dim, 28);
      regel(ctx, 'genenstroom', 330, 520, a2 * dim, K.stroom, 42, 'left', 700);
      const u = clamp((T % 3) / 1.2, 0, 1); knikker(ctx, 1080, lerp(380, 640, ease(u)), 16, K.mutatie, a2 * dim * (u < 1 ? 1 : 0.0) + a2 * dim * (u >= 1 ? 1 : 0));
      regel(ctx, 'mutatie', 1180, 420, a2 * dim, K.mutatie, 42, 'left', 700); regel(ctx, 'zeldzaam', 1180, 462, a2 * dim, C.text2, 28, 'left', 500); }
    if (a3 > 0.01) balk(ctx, 'drift kan ook een schadelijk allel vaak maken', 960, 970, 1200, a3, C.goud, 40);
  } });

// ---------- 9 · Hardy-Weinberg (vwo) ----------
SCHERMEN.push({ titel: 'Hardy-Weinberg', kop: 'Verandert er iets aan de pot?', deel: 'Hardy-Weinberg (vwo)',
  stappen: [
    { vwo: true, t: 'Noem het aandeel van het ene allel <b>p</b> en van het andere <b>q</b>. Dan is p + q = 1.', n: 'Of er iets aan de pot verandert, meet je met de regel van Hardy-Weinberg. p en q zijn allelfrequenties (aandelen, geen aantallen).' },
    { vwo: true, t: 'Bij willekeurig paren trek je voor elk kind twee allelen. Twee keer blauw: <b>p²</b>. Twee keer geel: <b>q²</b>. Eén van elk: <b>2pq</b>.', n: '2pq omdat het kind blauw van de vader en geel van de moeder kan krijgen, of andersom: twee vakjes in het kruisingsschema. p² + 2pq + q² = 1. Getekend met p = 0,6 en q = 0,4.' },
    { vwo: true, t: 'Dat klopt alleen als er niets aan de pot verandert. Wijkt een echte populatie af, dan werkt er een kracht.', n: 'Voorwaarden: grote populatie (geen drift), willekeurig paren, geen selectie, geen genenstroom, geen mutatie. In de natuur is dat nooit helemaal zo; daarom is het een nulmodel.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.4), a2 = S.on(2, 1.2), p = 0.6;
    const bx = 160, by = 250, bw = 700;
    allelBalk(ctx, bx, by, bw, p, a0, { procent: false, h: 50 });
    regel(ctx, 'p', bx + bw * p / 2, by + 36, a0, '#FFFFFF', 38, 'center', 700); regel(ctx, 'q', bx + bw * (p + (1 - p) / 2), by + 36, a0, '#1A1A1A', 38, 'center', 700);
    regel(ctx, 'p + q = 1', bx + bw / 2, by + 120, a0 * S.on(0, 0.5, 0.5), C.goud, 52, 'center', 700);
    if (a1 > 0.01) { const sx = 360, sy = 470, sz = 420, k = sz * p;
      ctx.save(); ctx.globalAlpha *= a1; [[0, 0, k, k, EV().a1], [k, 0, sz - k, k, mix(EV().a1, EV().a2, 0.5)], [0, k, k, sz - k, mix(EV().a1, EV().a2, 0.5)], [k, k, sz - k, sz - k, EV().a2]].forEach(([x, y, w, h, kl], i) => {
        const u = S.on(1, 0.4, i * 0.2); ctx.globalAlpha = a1 * u; ctx.fillStyle = rgba(kl, 0.55); ctx.fillRect(sx + x, sy + y, w, h); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(sx + x, sy + y, w, h); }); ctx.restore();
      [['p²', k / 2, k / 2], ['pq', k + (sz - k) / 2, k / 2], ['pq', k / 2, k + (sz - k) / 2], ['q²', k + (sz - k) / 2, k + (sz - k) / 2]].forEach(([s, x, y], i) => regel(ctx, s, sx + x, sy + y + 16, a1 * S.on(1, 0.4, i * 0.2 + 0.2), C.text, 44, 'center', 700));
      knikker(ctx, sx + k / 2, sy - 30, 16, EV().a1, a1); knikker(ctx, sx + k + (sz - k) / 2, sy - 30, 16, EV().a2, a1); knikker(ctx, sx - 30, sy + k / 2, 16, EV().a1, a1); knikker(ctx, sx - 30, sy + k + (sz - k) / 2, 16, EV().a2, a1);
      metaText(ctx, 'vader', sx + sz / 2, sy - 64, C.text2, 'center', 18, a1); metaText(ctx, 'moeder', sx - 70, sy + sz / 2, C.text2, 'right', 18, a1);
      const gx = 1020, gy = 300, gw = 760; [['p²', p * p, EV().a1, EV().a1], ['2pq', 2 * p * (1 - p), EV().a1, EV().a2], ['q²', (1 - p) * (1 - p), EV().a2, EV().a2]].forEach(([s, v, k1, k2], i) => {
        const u = S.on(1, 0.6, 0.8 + i * 0.2), y = gy + i * 110; allelPaar(ctx, gx + 30, y + 20, k1, k2, 15, a1 * u);
        ctx.save(); ctx.globalAlpha *= a1 * u; roundRect(ctx, gx + 90, y, gw * 0.75 * v / 0.5 * u, 40, 10); shape(ctx, rgba(C.goud, 0.35), C.goud, 2); ctx.restore();
        regel(ctx, s, gx + 100 + gw * 0.75 * v / 0.5 * u + 16, y + 32, a1 * u, C.text, 34, 'left', 700); });
      regel(ctx, 'p² + 2pq + q² = 1', gx + 380, gy + 380, a1 * S.on(1, 0.5, 1.4), C.goud, 44, 'center', 700); }
    if (a2 > 0.01) { const vw = ['grote populatie', 'willekeurig paren', 'geen selectie', 'geen genenstroom', 'geen mutatie'];
      vw.forEach((s, i) => { const a = a2 * S.on(2, 0.4, i * 0.12), x = 1040 + (i % 2) * 380, y = 760 + Math.floor(i / 2) * 76; vink(ctx, x, y - 10, 13, a, C.groen); regel(ctx, s, x + 30, y, a, C.text, 32, 'left', 600); }); }
  } });

// ---------- 10 · rekenen (vwo) ----------
SCHERMEN.push({ titel: 'Rekenen', kop: 'Hoeveel dragers?', deel: 'Hardy-Weinberg (vwo)',
  stappen: [
    { vwo: true, t: 'Stel: 1 op de 2500 baby\'s heeft een recessieve erfelijke ziekte. Dat is <b>q²</b>.', n: 'Vraag uit de film: Welk deel van de mensen is drager van het allel? (a) Ongeveer één op de vijftig, (b) Ongeveer één op de vijfentwintig, (c) Eén op de tweeduizendvijfhonderd. Antwoord b. Een echt voorbeeld met ongeveer deze getallen: taaislijmziekte (cystic fibrosis) bij mensen van Noord-Europese afkomst.' },
    { vwo: true, t: 'Neem de wortel: q = 1/50. Dan is p bijna 1.', n: 'p = 1 − q = 49/50 = 0,98.' },
    { vwo: true, t: 'Dragers hebben één van elk: 2pq ≈ 2/50 = 1/25. Zo\'n <b>4 %</b> is drager, zonder ziek te zijn.', n: 'Precies: 2 × 0,98 × 0,02 = 0,0392. Er zijn dus ± 100 keer zoveel dragers als zieken: het allel zit vooral verstopt in dragers.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.2), a1 = S.on(1, 0.9), a2 = S.on(2, 1.2);
    const gx = 160, gy = 200, gs = 780;
    stippen(ctx, gx, gy, gs, gs, 2500, (i) => i === 1287 ? C.oker : (a2 > 0.5 && i !== 1287 && hash(i * 1.37) < 0.04) ? C.goud : rgba(C.text2, 0.4), a0, { r: 5 });
    L5_gloedIn(ctx, gx, gy, gs, gs, 2500, 1287, 50, C.oker, a0);
    const x = 1300; regel(ctx, '1 op 2500 ziek', x, 300, a0, C.oker, 40, 'center', 700);
    regel(ctx, 'q² = 1/2500', x, 400, a0 * S.on(0, 0.5, 0.6), C.text, 52, 'center', 700);
    pijl(ctx, x, 440, x, 500, C.goud, 4, a1); regel(ctx, 'q = 1/50', x, 570, a1, C.text, 52, 'center', 700); regel(ctx, 'p ≈ 1', x, 640, a1 * S.on(1, 0.5, 0.5), C.text2, 40, 'center', 600);
    pijl(ctx, x, 680, x, 740, C.goud, 4, a2); regel(ctx, '2pq ≈ 2/50 = 1/25', x, 810, a2, C.text, 52, 'center', 700);
    if (a2 > 0.01) balk(ctx, '± 4 % drager', x, 930, 520, a2 * S.on(2, 0.5, 0.6), C.goud, 44);
    naam(ctx, 'dragers', gx + gs / 2, gy + gs + 50, a2, 'center', C.goud, 30);
  } });

// ---------- 11 · heterozygotenvoordeel (vwo) ----------
SCHERMEN.push({ titel: 'Sikkelcel', kop: 'Selectie die twee allelen houdt', deel: 'Hardy-Weinberg (vwo)',
  stappen: [
    { vwo: true, t: 'Met twee <b>sikkelcelallelen</b> worden rode bloedcellen bij weinig zuurstof stijf en sikkelvormig. Ze blijven haken in kleine bloedvaten.', n: 'Sikkelcelziekte: een puntmutatie in het gen voor hemoglobine (β-keten). Pijncrises, bloedarmoede, orgaanschade.' },
    { vwo: true, t: 'Zonder behandeling sterft in Afrika meer dan de helft van die kinderen jong. Toch draagt daar soms 10 tot 40 % het allel.', n: 'Vraag uit de film: Waarom blijft het sikkelcelallel daar zo gewoon? (a) Dragers worden minder vaak ernstig ziek van malaria, (b) Het allel ontstaat daar steeds opnieuw door mutatie, (c) Door drift, want die populaties zijn klein. Antwoord a.' },
    { vwo: true, t: 'Dragers krijgen zo\'n negen keer minder vaak ernstige malaria. Waar malaria veel voorkomt, overleven zij het best: <b>heterozygotenvoordeel</b>.', n: 'Williams e.a. 2005 (Kenia): ± 90 % bescherming tegen ernstige malaria. Selectie werkt hier op twee manieren: tegen twee sikkelallelen (ziekte) en tegen twee normale (malaria). Zo blijven beide allelen in de pot. Kaart van malaria en sikkelcel valt bijna samen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.4), a1 = S.on(1, 0.9), a2 = S.on(2, 1.4), N = EV().a1, Sk = EV().a2;
    const top = a2 > 0.01 ? lerp(0, -40, a2) : 0;
    if (a2 < 0.99) { const a = a0 * (1 - a2);
      ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(C.bloed, 0.12); ctx.strokeStyle = rgba(C.bloed, 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(160, 330); ctx.lineTo(900, 330); ctx.quadraticCurveTo(1000, 330, 1060, 390); ctx.lineTo(1760, 390); ctx.lineTo(1760, 450); ctx.lineTo(1060, 450); ctx.quadraticCurveTo(1000, 510, 900, 510); ctx.lineTo(160, 510); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      for (let i = 0; i < 9; i++) { const sik = i % 3 !== 0, xx = 220 + ((i * 95 + T * 60) % 820), yy = 380 + (i % 3) * 50; L5_bloedcel(ctx, Math.min(xx, sik ? 1040 : 1700), sik && xx > 1040 ? 420 : yy, 26, sik ? 1 : 0, a * S.on(0, 0.4, 0.3 + i * 0.05), sik ? 0.4 * i : 0); }
      L5_bloedcel(ctx, 1060, 410, 26, 1, a, 0.2); L5_bloedcel(ctx, 1090, 430, 26, 1, a, -0.6);
      naam(ctx, 'sikkelcel', 1070, 330, a * S.on(0, 0.5, 0.8), 'center', C.koraal, 30); naam(ctx, 'smal bloedvat', 1500, 500, a, 'center', C.text2, 26); }
    if (a1 > 0.01 && a2 < 0.99) { const a = a1 * (1 - a2); regel(ctx, 'zonder behandeling: > de helft sterft jong', 960, 680, a, C.text, 38, 'center', 700);
      regel(ctx, 'toch draagt 10–40 % het allel', 960, 760, a * S.on(1, 0.5, 0.5), C.goud, 38, 'center', 700); allelBalk(ctx, 560, 820, 800, 0.85, a * S.on(1, 0.5, 0.5), { procent: false, h: 36 }); }
    if (a2 > 0.01) { const G = [['twee normale', N, N, 'malaria', C.koraal, false], ['drager', N, Sk, 'beschermd', C.groen, true], ['twee sikkel', Sk, Sk, 'sikkelcelziekte', C.koraal, false]];
      G.forEach(([s, k1, k2, gev, kl, ok], i) => { const x = 360 + i * 600, a = a2 * S.on(2, 0.5, i * 0.2), y = 300;
        paneel(ctx, x - 250, y - 90, 500, 520, a, ok ? rgba(C.groen, 0.8) : null); allelPaar(ctx, x, y, k1, k2, 26, a); regel(ctx, s, x, y + 90, a, C.text, 36, 'center', 700);
        L5_bloedcel(ctx, x - 50, y + 200, 34, 0, a); L5_bloedcel(ctx, x + 50, y + 200, 34, k2 === Sk && k1 === Sk ? 1 : 0, a, 0.3);
        (ok ? vink : kruis)(ctx, x, y + 310, 20, a, kl); regel(ctx, gev, x, y + 380, a, kl, 34, 'center', 700); });
      termKaart(ctx, 'heterozygotenvoordeel', 'de drager overleeft het best: beide allelen blijven', 960, 860, a2 * S.on(2, 0.6, 0.9), C.groen); }
  } });

// ---------- 12 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Toeval en uitwisseling', deel: 'Afsluiting',
  stappen: [
    { t: 'De volgende generatie krijgt een greep uit de pot. Dat is <b>genetische drift</b>: sterk in kleine populaties, zwak in grote.', n: 'Drift heeft geen richting en kijkt niet naar voordeel of nadeel.' },
    { t: 'Bij een <b>flessenhals</b> of <b>founder-effect</b> wordt een populatie ineens klein, en gaat variatie verloren. Pingelap, het jachtluipaard.', n: 'Daarna kan drift een zeldzaam allel gewoon maken: het antwoord op de startvraag.' },
    { t: '<b>Genenstroom</b> maakt populaties meer gelijk en brengt nieuwe allelen. Stopt hij, dan groeien ze uit elkaar.', n: 'Vwo: met Hardy-Weinberg (p² + 2pq + q²) reken je genotypefrequenties uit en zie je of er een kracht werkt; heterozygotenvoordeel houdt het sikkelcelallel in stand.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['drift', C.goud, ['toeval verandert', 'allelfrequenties', 'vooral in kleine populaties']], ['flessenhals', C.koraal, ['weinig dieren over', 'minder variatie', 'ook: founder-effect']], ['genenstroom', C.teal, ['dieren verhuizen', 'met hun allelen', 'populaties gaan lijken']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) L5_grafiek(ctx, x + 90, 600, 400, 240, a, { lijnen: L5_SIM.klein.slice(0, 5), u: 1, kl: C.goud, lw: 3 });
      if (i === 1) { pot(ctx, x + 150, 600, 0.6, { kleuren: Array.from({ length: 40 }, (_, k) => [EV().a1, EV().a2, C.paars, C.koraal][k % 4]), seed: 2, a, kr: 13 }); pijl(ctx, x + 245, 480, x + 315, 480, C.koraal, 5, a); pot(ctx, x + 410, 600, 0.36, { kleuren: Array.from({ length: 10 }, (_, k) => k === 2 ? EV().a2 : EV().a1), seed: 5, a, kr: 14 }); }
      if (i === 2) { pot(ctx, x + 150, 600, 0.55, { p: 0.85, n: 30, seed: 7, a, kr: 13 }); pot(ctx, x + 390, 600, 0.55, { p: 0.2, n: 30, seed: 8, a, kr: 13 }); pijl(ctx, x + 230, 400, x + 310, 400, C.teal, 5, a); pijl(ctx, x + 310, 450, x + 230, 450, C.teal, 5, a); }
      regels.forEach((r, k) => regel(ctx, r, x + 40, 720 + k * 66, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 13 · volgende keer ----------
function L5_icoonMuilezel(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const kl = C.licht ? '#8A7258' : '#A08868';
  ctx.strokeStyle = kl; ctx.lineWidth = 10; ctx.lineCap = 'round'; [[-55, 0], [-35, 0], [40, 0], [60, 0]].forEach(([px]) => { ctx.beginPath(); ctx.moveTo(px, 20); ctx.lineTo(px, 90); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0, 10, 85, 38, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  ctx.beginPath(); ctx.moveTo(60, -10); ctx.lineTo(95, -70); ctx.lineTo(125, -55); ctx.lineTo(85, 10); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.ellipse(118, -62, 30, 17, 0.5, 0, 6.283); ctx.fill();
  [[92, -78, -0.3], [104, -82, 0.1]].forEach(([ex, ey, r]) => { ctx.save(); ctx.translate(ex, ey); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, -26, 7, 26, 0, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-85, 0); ctx.quadraticCurveTo(-110, 20, -100, 60); ctx.stroke(); circ(ctx, 120, -68, 3.5, '#1A1A1A');
  regel(ctx, '?', -10, -50, 1, C.goud, 70, 'center', 700); ctx.restore(); }
function L5_icoonRivier(ctx, x, y, a, T) { if (a <= 0.01) return; pot(ctx, x - 100, y + 90, 0.42, { p: 0.75, n: 24, seed: 1, a, kr: 14 }); pot(ctx, x + 100, y + 90, 0.42, { p: 0.3, n: 24, seed: 2, a, kr: 14 });
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.water; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const yy = y - 110 + i * 11, xx = x + Math.sin(i * 0.6 + T) * 12; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
function L5_icoonKikker(ctx, x, y, a) { if (a <= 0.01) return; const kik = (cx, cy, kl) => { ctx.beginPath(); ctx.ellipse(cx, cy, 44, 30, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); circ(ctx, cx - 20, cy - 26, 11, kl); circ(ctx, cx + 20, cy - 26, 11, kl); circ(ctx, cx - 20, cy - 27, 4.5, '#111'); circ(ctx, cx + 20, cy - 27, 4.5, '#111'); };
  ctx.save(); ctx.globalAlpha *= a; kik(x - 80, y + 10, C.licht ? '#4E9A5E' : '#6FB57E'); kik(x + 80, y + 10, C.licht ? '#8A9A3E' : '#A8B85A'); ctx.restore();
  regel(ctx, 'april', x - 80, y + 90, a, C.text2, 28, 'center', 600); regel(ctx, 'juni', x + 80, y + 90, a, C.text2, 28, 'center', 600);
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x, y - 70); ctx.lineTo(x, y + 70); ctx.stroke(); ctx.restore(); }
function L5_icoonVissen(ctx, x, y, a, T) { if (a <= 0.01) return; const vis = (cx, cy, kl, k) => { ctx.save(); ctx.translate(cx, cy + Math.sin(T * 2 + k) * 4); ctx.beginPath(); ctx.ellipse(0, 0, 50, 22, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.beginPath(); ctx.moveTo(-44, 0); ctx.lineTo(-74, -20); ctx.lineTo(-74, 20); ctx.closePath(); ctx.fill(); circ(ctx, 30, -5, 4, '#111'); ctx.restore(); };
  ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(0, y - 100, 0, y + 100); g.addColorStop(0, rgba(C.teal, 0.25)); g.addColorStop(1, rgba(C.koraal, 0.2)); ctx.fillStyle = g; roundRect(ctx, x - 150, y - 100, 300, 200, 16); ctx.fill();
  vis(x - 20, y - 45, '#3E7FC0', 0); vis(x + 30, y + 45, '#C8483A', 1); ctx.restore(); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 6): <b>hoe een soort er twee wordt</b>. Wat is een soort, geografische en reproductieve isolatie.', n: 'Huiswerk: de film Toeval en uitwisseling (nog eens) kijken. Wie vooruit wil: film 6 Hoe een soort er twee wordt (startvraag: Is een muilezel een soort?). De tegel Zonder barrière (cichliden in het Victoriameer) is vwo-stof.' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Hoe een soort er twee wordt', [['Wat is een soort?', 'de muilezel', L5_icoonMuilezel], ['Een barrière', 'één pot wordt twee', L5_icoonRivier], ['Reproductieve isolatie', 'geen vruchtbare jongen', L5_icoonKikker], ['Zonder barrière', 'blauw en rood (vwo)', L5_icoonVissen]]); } });

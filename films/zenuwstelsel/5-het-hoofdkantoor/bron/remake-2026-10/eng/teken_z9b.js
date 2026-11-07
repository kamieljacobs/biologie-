// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — tekeningen ronde 2 (na keuring 26 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// =====================================================================================
var dot = (typeof dot === 'function') ? dot : function (c, x, y, r, f, s, lw) { circ(c, x, y, r, f, s, lw); };
var BODY = (typeof BODY !== 'undefined') ? BODY : { cx: 400, yb: 880, h: 700 };

// ARMMODEL (practicum, Kamiel 26 okt 2026 in plaats van de kippenvleugel). Twee latjes met een scharnier, twee touwtjes als spieren.
// Bovenste latje staat vast op een voetje; onderste latje scharniert eronder en steekt een stukje achter het scharnier uit
// (zoals het uitsteeksel van de ellepijp). Touwtje voor zit vóór het scharnier vast, touwtje achter aan het stompje.
// Elk touwtje loopt door een oogje bovenaan en eindigt in een ringetje. e = hoek onderste latje (0 = recht naar beneden,
// 1.57 = horizontaal naar voren). knikV / knikA 0..1 = touwtje voor/achter geduwd (knikt), trekV / trekA = trekpijl.
// s = px per cm (latjes ± 30 cm). Voorkant = +x.
function armModel(ctx, x, y, s, o = {}) { const { a = 1, e = 0.2, knikV = 0, knikA = 0, trekV = 0, trekA = 0, hlV = 0, hlA = 0, dimV = 0, dimA = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hout = '#C9A36A', houtS = '#9A7A4A', H = [x, y], top = [x, y - 30 * s];
  // statief (staat op tafel op hoogte o.statief) met een klem bovenaan
  if (o.statief != null) { ctx.fillStyle = '#8A94A6'; ctx.fillRect(x - 15 * s, y - 34 * s, 1.4 * s, o.statief - (y - 34 * s)); roundRect(ctx, x - 22 * s, o.statief - 1.6 * s, 16 * s, 1.6 * s, 0.5 * s); shape(ctx, '#5A6478', null); }
  roundRect(ctx, x - 16 * s, y - 34 * s, 22 * s, 3 * s, 1 * s); shape(ctx, _mixHex(hout, '#000000', 0.15), houtS, 1.5);
  // bovenste latje (opperarm)
  roundRect(ctx, x - 1.4 * s, y - 31 * s, 2.8 * s, 31 * s, 1 * s); shape(ctx, hout, houtS, 1.5);
  // onderste latje (onderarm) met stompje achter het scharnier
  const ux = Math.sin(e), uy = Math.cos(e), F = (d, n = 0) => [x + ux * d * s + uy * n * s, y + uy * d * s - ux * n * s];
  ctx.save(); ctx.translate(x, y); ctx.rotate(-e); roundRect(ctx, -1.3 * s, -4 * s, 2.6 * s, 32 * s, 1 * s); shape(ctx, _mixHex(hout, '#FFFFFF', 0.08), houtS, 1.5); ctx.restore();
  // scharnier
  circ(ctx, x, y, 1.5 * s, '#8A94A6', '#5A6478', 1.5); circ(ctx, x, y, 0.5 * s, '#3A4458');
  // oogjes bovenaan (voor en achter)
  const oogV = [x + 2.6 * s, y - 27 * s], oogA = [x - 2.6 * s, y - 27 * s];
  for (const p of [oogV, oogA]) { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 0.7 * s, 0, 6.283); ctx.stroke(); }
  // aanhechtingen
  const hV = F(5, 1.3), hA = F(-3.2, -0.6);
  const touw = (oog, h, knik, hl, dimK, kleur) => { ctx.save(); ctx.globalAlpha *= dimK ? 0.35 : 1; const d = Math.hypot(h[0] - oog[0], h[1] - oog[1]);
    ctx.strokeStyle = hl > 0.01 ? _mixHex('#E9E3D2', C.goud, hl) : '#E9E3D2'; ctx.lineWidth = 4 + 2 * hl;
    ctx.beginPath(); ctx.moveTo(h[0], h[1]);
    if (knik > 0.01) { // te veel touw: het knikt opzij
      const mx = (h[0] + oog[0]) / 2, my = (h[1] + oog[1]) / 2, nx = (oog[1] - h[1]) / d, ny = -(oog[0] - h[0]) / d, sg = oog[0] > x ? 1 : -1, b = knik * 5 * s * sg;
      ctx.bezierCurveTo(h[0] + nx * b * 0.4, h[1] + ny * b * 0.4, mx + nx * b * 1.4, my + ny * b * 1.4 + 2 * s, mx + nx * b, my + ny * b);
      ctx.bezierCurveTo(mx + nx * b * 0.6 - 2 * s * sg, my - 3 * s, oog[0] + nx * b * 0.3, oog[1] + ny * b * 0.3 + 3 * s, oog[0], oog[1]);
    } else ctx.lineTo(oog[0], oog[1]);
    ctx.stroke(); circ(ctx, h[0], h[1], 0.8 * s, '#8A94A6');
    // vrij eind boven het oogje met ringetje (langer naarmate er minder touw onder het oogje zit)
    const vrij = Math.max(2, 22 - d / s + (knik > 0 ? -knik * 4 : 0)), ex = oog[0] + (oog[0] > x ? 0.6 : -0.6) * s, ey = oog[1] - vrij * s;
    ctx.beginPath(); ctx.moveTo(oog[0], oog[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex, ey - 1.1 * s, 1.1 * s, 0, 6.283); ctx.strokeStyle = kleur; ctx.stroke();
    ctx.restore(); return [ex, ey - 1.1 * s]; };
  const rV = touw(oogV, hV, knikV, hlV, dimV, C.goud), rA = touw(oogA, hA, knikA, hlA, dimA, C.teal);
  if (trekV > 0.01) pijl(ctx, rV[0], rV[1] - 1.5 * s, rV[0], rV[1] - 1.5 * s - 7 * s * trekV, C.goud, 1, 5, 18);
  if (trekA > 0.01) pijl(ctx, rA[0], rA[1] - 1.5 * s, rA[0], rA[1] - 1.5 * s - 7 * s * trekA, C.teal, 1, 5, 18);
  ctx.restore();
  return { scharnier: H, top, hand: F(27), onder: F(14), boven: [x, y - 15 * s], hechtV: hV, hechtA: hA, ringV: rV, ringA: rA, oogV, oogA };
}

// EÉN MYOSINEKOP OP DE ACTINE (groot schema; lengterichting). Recept (Alberts h. 16; OpenStax A&P 10.3): de kop zit met een
// hals aan de dikke draad; gespannen staat hij ± loodrecht, na de krachtslag gekanteld naar het midden van de sarcomeer
// (hier: naar links = midden); de actine schuift dan mee naar links. hoek 0 = gespannen (± 85°), 1 = gekanteld (± 40°).
// vast 0..1 = gebonden aan de actine; actX = verschuiving actine (px); chip = 'ATP'|'ADP'|'ADP+P'|null op de kop.
function kopStand(ctx, x, y, s, o = {}) { const { a = 1, hoek = 0, vast = 0, actX = 0, chip = null, chipA = 1, hl = 1, plekken = true, tropo = 0, rijen = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  // dikke draad (myosine) onder
  const my = y + 1.6 * s; roundRect(ctx, x - 9 * s, my - 0.45 * s, 18 * s, 0.9 * s, 0.45 * s); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1.5);
  // actine boven: kralensnoer, schuift met actX; bindplekken donker
  const ay = y - 1.6 * s; ctx.save(); ctx.beginPath(); ctx.rect(x - 10 * s, ay - 1.2 * s, 20 * s, 2.4 * s); ctx.clip();
  for (let k = -14; k < 30; k++) { const bx = x - 10 * s + k * 0.62 * s + (actX % (0.62 * s * 6)), by = ay + (k % 2 ? 0.22 : -0.22) * s;
    circ(ctx, bx, by, 0.36 * s, lighten(Z9.actine, 0.15), Z9.actine, 1); if (plekken && ((k % 6) + 6) % 6 === 0) circ(ctx, bx, by + 0.3 * s, 0.13 * s, '#1A2A3A'); }
  ctx.restore();
  // hals + kop
  const nx = x, ny = my - 0.45 * s, ang = lerp(1.48, 0.7, hoek), L = 2.0 * s; const kx = nx - Math.cos(ang) * L * 0.6, ky = ny - Math.sin(ang) * L * 1.0;
  const kopY = lerp(ky, ay + 0.75 * s, vast);
  ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.35 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(kx, kopY + 0.4 * s); ctx.stroke();
  ctx.save(); ctx.translate(kx, kopY); ctx.rotate(-ang + 1.57); ctx.beginPath(); ctx.ellipse(0, 0, 0.55 * s, 0.85 * s, 0, 0, 6.283); shape(ctx, lighten(Z9.myosine, 0.15), hl > 0.5 ? C.goud : Z9.myosine, hl > 0.5 ? 3 : 1.5); ctx.restore();
  if (chip && chipA > 0.01) { ctx.save(); ctx.globalAlpha *= chipA; tag(ctx, chip, kx + 2.4 * s, kopY + 1.0 * s, chip === 'ATP' ? C.groen : C.oker, 1, 'left', Math.round(0.42 * s)); ctx.restore(); }
  ctx.restore();
  return { kop: [kx, kopY], actine: [x + 6 * s, ay], myosine: [x + 6 * s, my] };
}

// ACTINE MET TROPOMYOSINE EN TROPONINE (vwo, schema). Recept (OpenStax A&P 10.3; Alberts h. 16): tropomyosine ligt als een
// draad over de bindplekken; troponine zit eraan vast; Ca²⁺ bindt aan troponine → tropomyosine schuift opzij → plekken vrij.
// schuif 0..1, ca 0..1 (calcium gebonden).
function actineDetail(ctx, x, y, w, s, o = {}) { const { a = 1, schuif = 0, ca = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.floor(w / (0.62 * s)); for (let k = 0; k < n; k++) { const bx = x + k * 0.62 * s, by = y + (k % 2 ? 0.22 : -0.22) * s; circ(ctx, bx, by, 0.36 * s, lighten(Z9.actine, 0.15), Z9.actine, 1); if (k % 6 === 3) circ(ctx, bx, by + 0.3 * s, 0.14 * s, '#1A2A3A'); }
  const ty = y + lerp(0.3, -0.75, schuif) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 0.22 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const xx = x + k * (n * 0.62 * s) / 60; k ? ctx.lineTo(xx, ty + Math.sin(k * 0.9) * 0.08 * s) : ctx.moveTo(xx, ty); } ctx.stroke();
  const tp = []; for (let k = 3; k < n; k += 6) { const bx = x + (k + 1.5) * 0.62 * s; circ(ctx, bx, ty - 0.1 * s, 0.32 * s, lighten(C.paars, 0.35), C.paars, 1.5); tp.push([bx, ty - 0.1 * s]); if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= ca; circ(ctx, bx + 0.25 * s, ty - 0.45 * s, 0.17 * s, Z9.ca); ctx.restore(); } }
  ctx.restore(); return { tropo: [x + w * 0.5, ty], troponine: tp[0] || [x, y], plek: [x + 3 * 0.62 * s, y + 0.3 * s] }; }

// SARCOPLASMATISCH RETICULUM (vwo): netwerk van buisjes en zakjes om een myofibril; ca 0..1 = calcium dat eruit is.
function reticulum(ctx, x, y, w, h, o = {}) { const { a = 1, ca = 0, t = 0, terug = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.5), BIO.spierL, 1.2);
  for (let xx = x + 20; xx < x + w - 20; xx += 90) { ctx.strokeStyle = rgba('#7FB7D6', 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xx, y - h / 2 - 8); ctx.bezierCurveTo(xx + 30, y - h / 2 - 22, xx + 60, y - h / 2 - 2, xx + 80, y - h / 2 - 12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xx, y + h / 2 + 8); ctx.bezierCurveTo(xx + 30, y + h / 2 + 22, xx + 60, y + h / 2 + 2, xx + 80, y + h / 2 + 12); ctx.stroke(); }
  for (let xx = x + 60; xx < x + w - 40; xx += 90) { ctx.strokeStyle = rgba('#7FB7D6', 0.75); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx + 40, y - h / 2 - 12); ctx.bezierCurveTo(xx + 62, y - h / 4, xx + 62, y + h / 4, xx + 40, y + h / 2 + 12); ctx.stroke(); circ(ctx, xx + 40, y - h / 2 - 12, 7, rgba('#7FB7D6', 0.9)); circ(ctx, xx + 40, y + h / 2 + 12, 7, rgba('#7FB7D6', 0.9)); }
  for (let i = 0; i < 26; i++) { const bx = x + 30 + hash(i * 3.1) * (w - 60), up = i % 2 ? -1 : 1, by0 = y + up * (h / 2 + 12), by1 = y + (hash(i * 7.7) - 0.5) * h * 0.7, u = clamp(ca - terug, 0, 1) * clamp(1.2 - hash(i) * 0.4, 0, 1);
    if (u > 0.01) circ(ctx, lerp(bx, bx + (hash(i * 5) - 0.5) * 30, u), lerp(by0, by1, u) + Math.sin(t * 3 + i) * 2, 5, Z9.ca); }
  ctx.restore(); }

// TREKKINGEN TELLEN OP (vwo, grafiek): kracht tegen tijd voor impulsen met een gegeven tussentijd. sneller = 0 (los), 1 (opgeteld)
function trekGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, tussen = 0.5, prog = 1, kleur = C.goud, impulsen = 4, label = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  assen(ctx, x, y, w, h, 'tijd', 'kracht'); const tw = (tt) => tt <= 0 ? 0 : (tt / 0.12) * Math.exp(1 - tt / 0.12);
  const imp = [...Array(impulsen)].map((_, i) => 0.05 + i * tussen); ctx.strokeStyle = kleur; ctx.lineWidth = 3.5; ctx.beginPath();
  const N = 200; for (let i = 0; i <= N * prog; i++) { const tt = i / N * 1.2; let v = 0; for (const t0 of imp) v += tw(tt - t0); const xx = x + i / N * w, yy = y + h - Math.min(v, 2.6) / 2.6 * h * 0.92; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (const t0 of imp) { const xx = x + t0 / 1.2 * w; if (t0 / 1.2 <= prog) { ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y + h + 8); ctx.lineTo(xx, y + h + 30); ctx.stroke(); } }
  if (label) metaText(ctx, label, x + w / 2, y + h + 64, C.text2, 'center', 20);
  ctx.restore(); }

// OOG met oogspier (van opzij, schema) en een stand 0..1 (kijkrichting)
function oogSchema(ctx, x, y, r, o = {}) { const { a = 1, stand = 0.5, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 2); const an = lerp(-0.45, 0.45, stand); const px = x + Math.cos(an) * r * 0.78, py = y + Math.sin(an) * r * 0.78;
  circ(ctx, px, py, r * 0.3, '#5B7FA6'); circ(ctx, px, py, r * 0.15, '#121A26');
  ctx.beginPath(); ctx.moveTo(x - r * 0.2, y - r * 0.98); ctx.bezierCurveTo(x - r * 0.9, y - r * 1.35, x - r * 1.7, y - r * 0.9, x - r * 2.2, y - r * 0.6); ctx.lineWidth = r * 0.22; ctx.strokeStyle = hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.4) : Z9.spier; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - r * 2.5, y - r * 1.1); ctx.lineTo(x - r * 2.15, y - r * 0.2); ctx.lineTo(x - r * 2.6, y + r * 0.6); ctx.lineTo(x - r * 2.9, y - r * 0.3); ctx.closePath(); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore(); return { spier: [x - r * 1.2, y - r * 1.15] }; }
// KUIT (onderbeen van opzij, schema) met voet in stand 0..1
function kuitSchema(ctx, x, y, s, o = {}) { const { a = 1, stand = 0, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  z9Glad(ctx, [[x - 1.6 * s, y - 40 * s], [x - 4.8 * s, y - 28 * s], [x - 3.6 * s, y - 14 * s], [x - 2.2 * s, y - 4 * s], [x + 1.8 * s, y - 4 * s], [x + 2.4 * s, y - 20 * s], [x + 2.6 * s, y - 40 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2);
  z9Glad(ctx, [[x - 1.8 * s, y - 37 * s], [x - 4.3 * s, y - 27 * s], [x - 3.0 * s, y - 15 * s], [x - 1.2 * s, y - 15 * s], [x - 0.6 * s, y - 27 * s]], true); shape(ctx, hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.35) : Z9.spier, Z9.spierL, 1.5);
  z9Pees(ctx, [[x - 2.1 * s, y - 15 * s], [x - 2.0 * s, y - 6 * s], [x - 2.4 * s, y - 1.5 * s]], 0.7 * s, 1);
  ctx.save(); ctx.translate(x, y - 3 * s); ctx.rotate(lerp(0, 0.6, stand)); z9Glad(ctx, [[-3 * s, -1 * s], [-3.2 * s, 2.2 * s], [10 * s, 3.2 * s], [11 * s, 1.2 * s], [3 * s, -1.6 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2); ctx.restore();
  ctx.restore(); return { spier: [x - 3.6 * s, y - 26 * s] }; }

// EMG-PANEEL: twee kanalen (biceps, triceps) met optionele staplabels en verborgen sporen
function emgPaneel(ctx, x, y, w, o = {}) { const { a = 1, t = 0, bic = 0.05, tri = 0.02, hisB = null, hisT = null, triA = 1, stappen = null, verbergB = 0, verbergT = 0, hlB = 0, hlT = 0, vraagA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = triA > 0.01 ? 430 : 250; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.kast, 0.92), C.line, 1.5);
  metaText(ctx, 'BICEPS', x + 25, y + 40, hlB > 0.5 ? C.goud : C.teal, 'left', 22); emgSpoor(ctx, x + 20, y + 55, w - 40, 150, { t, rooster: false, niveau: bic, geschiedenis: hisB, kleur: hlB > 0.5 ? C.goud : C.teal });
  if (verbergB > 0.01) { ctx.save(); ctx.globalAlpha *= verbergB; roundRect(ctx, x + 20, y + 55, w - 40, 150, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 160, vraagA, 80); ctx.restore(); }
  if (triA > 0.01) { ctx.save(); ctx.globalAlpha *= triA; metaText(ctx, 'TRICEPS', x + 25, y + 250, hlT > 0.5 ? C.goud : C.text2, 'left', 22); emgSpoor(ctx, x + 20, y + 265, w - 40, 120, { t: t + 3, rooster: false, niveau: tri, geschiedenis: hisT, kleur: hlT > 0.5 ? C.goud : C.teal });
    if (verbergT > 0.01) { ctx.save(); ctx.globalAlpha *= verbergT; roundRect(ctx, x + 20, y + 265, w - 40, 120, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 355, vraagA, 70); ctx.restore(); } ctx.restore(); }
  if (stappen) stappen.forEach((s2, i) => text(ctx, s2[0], x + 20 + (w - 40) * s2[1], y + h - 12, fTekst(22, 600), s2[2] ? C.text : C.text2, 'center'));
  ctx.restore(); }

// PRACTICUMLOKAAL (film): Noor zit aan tafel met plakkers op biceps en triceps; laptop op tafel; Sam en mevrouw Visser staan.
// o.last 'veer'|'boek'|'boeken'|'tas'|null, o.armE elleboog (rad), o.opTafel = arm ligt op tafel, o.uitN gezicht Noor
function lokaal(ctx, t, o = {}) { const { last = null, emg = 0.05, armU = 0.12, armE = 1.5, zak = 0, aVisser = 1, aSam = 1, vloer = 880, scherm = true, sam = 'staan', samX = 1240, uitN = 'neutraal', uitS = 'blij', opTafel = false, plakT = 1, kast = null, valBoek = null } = o;
  const tafelY = 600; ctx.fillStyle = '#4A5874'; ctx.fillRect(820, tafelY, 520, 14); ctx.fillRect(1310, tafelY + 14, 12, vloer - tafelY - 14); ctx.fillRect(840, tafelY + 14, 12, vloer - tafelY - 14);
  if (scherm) laptop(ctx, 1180, tafelY, 230, { inhoud: (x, y, w, h) => emgSpoor(ctx, x, y, w, h, { niveau: emg, t, rooster: false }) });
  persoon(ctx, 'visser', 260, vloer, 560, { zij: true, kijk: 1, t, uit: 'neutraal', a: aVisser });
  let H = null; const N = persoon(ctx, 'noor', 600, vloer, 520, { zij: true, kijk: 1, pose: 'zit', stoel: true, outfit: 'zomer', arm: opTafel ? [0.25, 1.35] : [armU, armE - zak * 0.8], t, uit: uitN,
    hold: (c, hx, hy) => { H = [hx, hy]; if (last === 'tas') schooltas(c, hx + 4, hy - 6, 2.8); if (last === 'veer') veertje(c, hx - 10, hy - 14, 5); if (last === 'boek' || last === 'boeken') { const n = last === 'boek' ? 1 : 2; for (let k = 0; k < n; k++) { roundRect(c, hx - 40, hy - 26 - k * 18, 80, 16, 3); shape(c, k ? '#3E6E5A' : '#8C5A3A', '#B08A5C', 1.5); } } } });
  const A = N.handR, pl = []; if (A && A.shx != null) { const mx = lerp(A.shx, A.elx, 0.45), my = lerp(A.shy, A.ely, 0.45), dx = A.elx - A.shx, dy = A.ely - A.shy, L = Math.hypot(dx, dy), nx = dy / L, ny = -dx / L, w = A.hh * 0.15;
    pl.push([mx + nx * w, my + ny * w], [mx - nx * w, my - ny * w]);
    draad(ctx, [pl[0], [pl[0][0] + 80, pl[0][1] - 90], [1000, tafelY - 80], [1120, tafelY - 4]], '#9AA3B2');
    plakker(ctx, pl[0][0], pl[0][1], A.hh * 0.09);
    if (plakT > 0.01) { ctx.save(); ctx.globalAlpha *= plakT; draad(ctx, [pl[1], [pl[1][0] - 20, pl[1][1] + 110], [960, tafelY + 60], [1120, tafelY - 2]], '#9AA3B2'); plakker(ctx, pl[1][0], pl[1][1], A.hh * 0.09); ctx.restore(); } }
  if (o.steun) { if (!lokaal._geo) { const oc = document.createElement('canvas').getContext('2d'); lokaal._geo = persoon(oc, 'noor', 600, vloer, 520, { zij: true, kijk: 1, pose: 'zit', stoel: true, outfit: 'zomer', arm: [0.12, 1.5], t: 0 }).handR; }
    const G = lokaal._geo; if (G && G.elx != null) { const top = Math.max(G.ely, G.y) + G.hh * 0.16; ctx.fillStyle = '#5A6884'; roundRect(ctx, G.elx - 40, top, (G.x - G.elx) * 0.75 + 40, 16, 4); ctx.fill(); ctx.fillRect(G.elx - 10, top + 16, 12, vloer - top - 16); } }
  const S = persoon(ctx, 'sam', samX, vloer, 560, { zij: true, kijk: -1, t, uit: uitS, pose: sam, a: aSam, hold: valBoek ? (c, hx, hy) => { if (valBoek.inHand) { roundRect(c, hx - 36, hy - 10, 72, 15, 3); shape(c, '#3E6E5A', '#B08A5C', 1.5); } } : null });
  return { hand: H, plakBiceps: pl[0], plakTriceps: pl[1], arm: A, noor: N, sam: S };
}
// stuk huid met een plakker erop en spiervezels eronder (H4)
function huidPlakker(ctx, x, y, w, o = {}) { const { a = 1, t = 0, vuur = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 50, 10); shape(ctx, rgba(BIO.huid, 0.55), BIO.huidS, 1.5);
  for (let k = 0; k < 5; k++) spierVezel(ctx, x + 10, y + 90 + k * 42, w - 20, 32, { seed: k + 4, a: 1 });
  circ(ctx, x + w / 2, y - 6, 40, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x + w / 2, y - 6, 14, '#C9CED6');
  if (vuur > 0.01) for (let k = 0; k < 5; k++) { const u = (t * 1.3 + k * 0.21) % 1; ctx.save(); ctx.globalAlpha *= vuur * (1 - u); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + w * (0.2 + 0.15 * k), y + 90 + (k % 5) * 42, 10 + u * 60, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

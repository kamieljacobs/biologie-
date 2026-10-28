const OOG = [0.12, 0.62];
// Overerving via het X-chromosoom (Erfelijkheid 5, lichte remake 2.0, 28 okt 2026) — scènes, één functie per gesproken alinea.
// Cue-woorden: q.at zoekt een stukje van een woord (zonder leestekens, kleine letters). Nooit cuen op een genotype (Xᴬ → 'x').
// Kleuren: X/Y van moeder oker, van vader teal (Chromosomen 2.1); allel A goud, allel a / aangedaan paars.

const _n = (ctx, lab, sub, x, y, a, al = 'center', kl = C.text) => naamBij(ctx, lab, sub, x, y, a, al, kl);
function schemaBg(ctx) { bg(ctx, 'schema'); }
function dimLaag(ctx, a = 0.82) { ctx.save(); ctx.fillStyle = rgba(C.bgSchema, a); ctx.fillRect(0, 0, W, H); ctx.restore(); }
function boog(t0, t1, u) { return ease(clamp((u - t0) / (t1 - t0), 0, 1)); }

// ---- ouders XX / XY + gameten (s04, s05)
function oudersXY(ctx, a = 1, o = {}) { if (a <= 0.01) return; const { vr = 1, mn = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  if (vr > 0.01) { ctx.save(); ctx.globalAlpha *= vr; roundRect(ctx, 150, 150, 520, 320, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, 'vrouw · XX', 410, 210, fTekst(40, 700), C.text, 'center'); geslStaaf(ctx, 'X', 360, 340, 1.4, XK.moeder); geslStaaf(ctx, 'X', 460, 340, 1.4, XK.moeder); ctx.restore(); }
  if (mn > 0.01) { ctx.save(); ctx.globalAlpha *= mn; roundRect(ctx, 1250, 150, 520, 320, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, 'man · XY', 1510, 210, fTekst(40, 700), C.text, 'center'); geslStaaf(ctx, 'X', 1460, 340, 1.4, XK.vader); geslStaaf(ctx, 'Y', 1560, 340, 1.4, XK.vader); ctx.restore(); }
  ctx.restore(); }
function eicelX(ctx, x, y, r, a = 1) { if (a <= 0.01) return; eicelEcht(ctx, x, y, r, a, false); geslStaaf(ctx, 'X', x + r * 0.45, y, 0.55 * r / 100, XK.moeder, '', a); }
function zaadX(ctx, x, y, soort, t, a = 1, s = 1.6) { if (a <= 0.01) return; zaadcelEcht(ctx, x, y, Math.PI, t, s, { a }); ctx.save(); ctx.globalAlpha *= a; text(ctx, soort, x, y - 34, fTekst(40, 700), XK.vader, 'center'); ctx.restore(); }

// ---- grafiek + aardbeien (s11)
function aardbeiVergelijk(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 660, 640, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5);
  aardbeienBak(ctx, x + 330, y + 230, 360, [1, 0.1, 1, 0.05, 1]); aardbeienBak(ctx, x + 330, y + 520, 360, [1, 0.1, 1, 0.05, 1]); ctx.restore();
  if (a > 0.3) kleurModelDeutan(ctx, x + 70, y + 370, 520, 230);
  ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'normaal', x + 30, y + 60, C.grain, 'left', 28); metaText(ctx, 'rood-groen kleurenblind · model', x + 30, y + 350, C.grain, 'left', 28); ctx.restore(); }

// ---- vijf genotypen (s14)
const GEN5 = [['X:m^A X:v^A', 'vrouw', 'normaal', 0], ['X:m^A X:v^a', 'vrouw', 'normaal · draagster', 1], ['X:m^a X:v^a', 'vrouw', 'kleurenblind', 2], ['X:m^A Y:v', 'man', 'normaal', 0], ['X:m^a Y:v', 'man', 'kleurenblind', 2]];

// ---- kruisingsschema (s19)
function kruisSchemaX(ctx, u, o = {}) { const { x0 = 600, y0 = 250, c = 240, zonen = 0, dochters = 0 } = o;
  const vak = [[['X:m^A X:v^A', 'dochter', 0, ''], ['X:m^A Y:v', 'zoon', 0, '']], [['X:m^a X:v^A', 'dochter', 1, 'draagster'], ['X:m^a Y:v', 'zoon', 2, 'kleurenblind']]];
  metaText(ctx, 'gameten vader', x0 + c * 2, y0 - 140, XK.vader, 'center', 28); genoTekst(ctx, G('X:v^A'), x0 + c * 1.5, y0 - 44, 56, { a: boog(0, 0.12, u) }); genoTekst(ctx, G('Y:v'), x0 + c * 2.5, y0 - 44, 56, { a: boog(0.04, 0.16, u) });
  ctx.save(); ctx.globalAlpha *= boog(0.12, 0.24, u); metaText(ctx, 'gameten moeder', x0 - 10, y0 + c * 2 + 60, XK.moeder, 'center', 28); ctx.restore();
  genoTekst(ctx, G('X:m^A'), x0 + c / 2 - 20, y0 + c / 2 + 20, 56, { a: boog(0.14, 0.26, u) }); genoTekst(ctx, G('X:m^a'), x0 + c / 2 - 20, y0 + c * 1.5 + 20, 56, { a: boog(0.18, 0.3, u) });
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const [g, f, s, f2] = vak[i][j], X = x0 + c * (j + 1), Y = y0 + c * i, k = i * 2 + j, a = boog(0.3 + k * 0.08, 0.38 + k * 0.08, u); if (a <= 0.01) continue;
    const hlZ = j === 1 ? zonen : 0, hlD = j === 0 ? dochters : 0, hl = Math.max(hlZ, hlD);
    ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, X + 6, Y + 6, c - 12, c - 12, 14); shape(ctx, s === 2 ? rgba(C.paars, 0.32) : rgba(C.fill, 0.9), hl > 0.5 ? C.goud : (s === 2 ? lighten(C.paars, 0.3) : C.line), hl > 0.5 ? 3 : 1.5);
    genoTekst(ctx, G(g), X + c / 2, Y + c / 2 - 6, 50); metaText(ctx, f, X + c / 2, Y + c / 2 + 50, C.text2, 'center', 28); if (f2) metaText(ctx, f2, X + c / 2, Y + c / 2 + 84, C.grain, 'center', 28);
    if (s === 1) { ctx.beginPath(); ctx.arc(X + c - 34, Y + 34, 10, 0, 6.283); shape(ctx, C.paars, C.text, 1.5); } ctx.restore(); } }

// ---- simulatie 200 kinderen (s20)
const SIM200 = (() => { const r = _mb32(11), k = []; for (let i = 0; i < 200; i++) k.push({ zoon: r() < 0.5, a: r() < 0.5, t: i }); return k; })();
function sim200(ctx, n, o = {}) { const { hlAlle = 0 } = o; const zon = [], doc = [];
  SIM200.slice(0, n).forEach(k => (k.zoon ? zon : doc).push(k));
  const kol = (lijst, x0, titel, rond) => { text(ctx, titel + ' · ' + lijst.length, x0 + 340, 170, fTekst(40, 700), C.text, 'center');
    [...lijst].sort((p, q) => q.a - p.a).forEach((k, i) => { const x = x0 + (i % 14) * 50, y = 220 + Math.floor(i / 14) * 58;
      if (!rond) { roundRect(ctx, x, y, 38, 38, 4); shape(ctx, k.a ? C.paars : '#243450', k.a ? (hlAlle > 0.5 ? C.goud : lighten(C.paars, 0.4)) : C.text, k.a && hlAlle > 0.5 ? 3 : 1.8); }
      else { ctx.beginPath(); ctx.arc(x + 19, y + 19, 19, 0, 6.283); shape(ctx, '#243450', C.text, 1.8); if (k.a) { ctx.beginPath(); ctx.arc(x + 31, y + 31, 6, 0, 6.283); shape(ctx, C.paars, C.text, 1); } } }); };
  kol(zon, 110, 'zonen', false); kol(doc, 1080, 'dochters', true);
  return { zon: zon.length, doc: doc.length, kb: zon.filter(k => k.a).length, dr: doc.filter(k => k.a).length }; }

// ---- stamboom De Wit (s23, s25)
const WIT = { opa: [560, 330], oma: [760, 330], opaW: [1160, 330], omaW: [1360, 330], mar: [660, 560], den: [1260, 560], sara: [620, 790], levi: [960, 790], jens: [1300, 790] };
function stamWit(ctx, o = {}) { const { kids = 1, rechts = 1, marHl = 0, marDrager = 0, marVraag = 0, opaLab = 0, marLab = 0, kidLab = 0, r = 52 } = o; const P = WIT;
  paarLijn(ctx, P.opa[0] + r, P.oma[0] - r, P.opa[1]); kindLijnen(ctx, (P.opa[0] + P.oma[0]) / 2, P.opa[1], P.mar[1] - r, [P.mar[0]]);
  if (rechts > 0.01) { ctx.save(); ctx.globalAlpha *= rechts; paarLijn(ctx, P.opaW[0] + r, P.omaW[0] - r, P.opaW[1]); kindLijnen(ctx, (P.opaW[0] + P.omaW[0]) / 2, P.opaW[1], P.den[1] - r, [P.den[0]]); ctx.restore(); }
  if (kids > 0.01) { ctx.save(); ctx.globalAlpha *= kids; paarLijn(ctx, P.mar[0] + r, P.den[0] - r, P.mar[1]); kindLijnen(ctx, (P.mar[0] + P.den[0]) / 2, P.mar[1], P.levi[1] - r, [P.sara[0], P.levi[0], P.jens[0]]); ctx.restore(); }
  symbool(ctx, ...P.opa, 'm', { r, id: 'opabos', ziek: 1, lab: opaLab > 0.5 ? G('X^a Y') : null, sub: opaLab > 0.5 ? 'kleurenblind' : null });
  symbool(ctx, ...P.oma, 'v', { r, id: 'omabos' });
  symbool(ctx, ...P.opaW, 'm', { r, id: 'opawit', a: rechts }); symbool(ctx, ...P.omaW, 'v', { r, id: 'omawit', a: rechts }); symbool(ctx, ...P.den, 'm', { r, id: 'dennis', a: rechts, lab: kidLab > 0.5 ? G('X^A Y') : null });
  symbool(ctx, ...P.mar, 'v', { r, id: 'marieke', drager: marDrager, hl: marHl, lab: marLab > 0.5 ? G('X:m^A X:v^a') : null, sub: marLab > 0.5 ? 'zeker draagster' : null });
  if (marVraag > 0.01) vraagteken(ctx, P.mar[0] + 90, P.mar[1] + 30, marVraag, 90);
  if (kids > 0.01) { symbool(ctx, ...P.sara, 'v', { r, id: 'sara', a: kids }); symbool(ctx, ...P.levi, 'm', { r, id: 'levi', a: kids }); symbool(ctx, ...P.jens, 'm', { r, id: 'jens', a: kids });
    if (kidLab > 0.01) { ctx.save(); ctx.globalAlpha *= kidLab; [P.levi, P.jens].forEach(p => { text(ctx, 'kans ½', p[0], p[1] + r + 46, fTekst(34, 700), C.goud, 'center'); metaText(ctx, 'kleurenblind', p[0], p[1] + r + 80, C.grain, 'center', 28); });
      text(ctx, 'kans ½', P.sara[0], P.sara[1] + r + 46, fTekst(34, 700), C.text2, 'center'); metaText(ctx, 'draagster', P.sara[0], P.sara[1] + r + 80, C.grain, 'center', 28); ctx.restore(); } } }

// ---- Victoria (s26)
function stamVic(ctx, o = {}) { const { v = 1, leo = 0, dochters = 0, rus = 0, spa = 0, prins = 0 } = o; const r = 36;
  const V = [900, 210], A = [1060, 210], LEO = [980, 400], AL = [560, 400], ALm = [400, 400], BE = [1400, 400], BEm = [1560, 400], AX = [560, 590], AXm = [720, 590], VE = [1400, 590], VEm = [1560, 590], ALX = [640, 780], ALF = [1400, 780], GON = [1560, 780];
  symbool(ctx, ...V, 'v', { r, drager: 1, a: v }); symbool(ctx, ...A, 'm', { r, a: v }); paarLijn(ctx, V[0] + r, A[0] - r, V[1], v); text(ctx, 'Victoria', V[0] - 60, V[1] + 8, fTekst(32, 600), rgba(C.text, v), 'right'); metaText(ctx, 'engeland', V[0] - 60, V[1] + 44, rgba(C.grain, v), 'right', 28);
  const kL = Math.max(leo, dochters); kindLijnen(ctx, (V[0] + A[0]) / 2, V[1], AL[1] - r, [AL[0], LEO[0], BE[0]].filter((x, i) => i === 1 ? leo > 0.01 : dochters > 0.01), kL);
  symbool(ctx, ...LEO, 'm', { r, ziek: 1, a: leo, lab: leo > 0.5 ? 'Leopold' : null });
  symbool(ctx, ...AL, 'v', { r, drager: 1, a: dochters, lab: dochters > 0.5 ? 'Alice' : null }); symbool(ctx, ...ALm, 'm', { r, a: dochters }); paarLijn(ctx, ALm[0] + r, AL[0] - r, AL[1], dochters);
  symbool(ctx, ...BE, 'v', { r, drager: 1, a: dochters, lab: dochters > 0.5 ? 'Beatrice' : null }); symbool(ctx, ...BEm, 'm', { r, a: dochters }); paarLijn(ctx, BE[0] + r, BEm[0] - r, BE[1], dochters);
  kindLijnen(ctx, (AL[0] + ALm[0]) / 2, AL[1] + 60, AX[1] - r, [AX[0]], rus); symbool(ctx, ...AX, 'v', { r, drager: 1, a: rus, lab: rus > 0.5 ? 'Alexandra' : null, sub: rus > 0.5 ? 'rusland' : null }); symbool(ctx, ...AXm, 'm', { r, a: rus }); paarLijn(ctx, AX[0] + r, AXm[0] - r, AX[1], rus);
  kindLijnen(ctx, (BE[0] + BEm[0]) / 2, BE[1] + 60, VE[1] - r, [VE[0]], spa); symbool(ctx, ...VE, 'v', { r, drager: 1, a: spa, lab: spa > 0.5 ? 'Victoria Eugenie' : null, sub: spa > 0.5 ? 'spanje' : null }); symbool(ctx, ...VEm, 'm', { r, a: spa }); paarLijn(ctx, VE[0] + r, VEm[0] - r, VE[1], spa);
  kindLijnen(ctx, (AX[0] + AXm[0]) / 2, AX[1] + 60, ALX[1] - r, [ALX[0]], prins); symbool(ctx, ...ALX, 'm', { r, ziek: 1, a: prins, lab: prins > 0.5 ? 'Alexei' : null });
  kindLijnen(ctx, (VE[0] + VEm[0]) / 2, VE[1] + 60, ALF[1] - r, [ALF[0], GON[0]], prins); symbool(ctx, ...ALF, 'm', { r, ziek: 1, a: prins, lab: prins > 0.5 ? 'Alfonso' : null }); symbool(ctx, ...GON, 'm', { r, ziek: 1, a: prins, lab: prins > 0.5 ? 'Gonzalo' : null }); }

// ---- mitochondriën in een eicel en een zaadcel (s29)
function eicelMito(ctx, x, y, r, a = 1) { if (a <= 0.01) return; eicelEcht(ctx, x, y, r, a, false); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r * 0.9, 0, 6.283); ctx.clip(); const q = _mb32(5);
  for (let i = 0; i < 520; i++) { const an = q() * 6.283, d = Math.sqrt(q()) * r * 0.86, px = x + Math.cos(an) * d, py = y + Math.sin(an) * d; if (Math.hypot(px - x, py - y) < r * 0.27) continue; ctx.beginPath(); ctx.ellipse(px, py, r * 0.025, r * 0.0125, q() * 3, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fill(); } ctx.restore(); }
function zaadMito(ctx, x, y, t, s, a = 1, mitoA = 1) { if (a <= 0.01) return; zaadcelEcht(ctx, x, y, 0, t, s, { a }); if (mitoA <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * mitoA; const U = 2.4 * s, k = 4.6 * U;
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(x - k * 0.5 - (i + 0.5) * (5 * U / 8), y, 2.2 * s, 3.4 * s, 0, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); } ctx.restore(); }

// ---- lijstjes De Wit: moederlijn (s33)
function moederlijn(ctx, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const P = [['levi', 560], ['marieke', 960], ['omabos', 1360]];
  P.forEach(([id, x], i) => { const aa = boog(i * 0.18, i * 0.18 + 0.2, u); lijstje(ctx, id, x, 380, Math.max(0.35, aa), aa); ctx.save(); ctx.globalAlpha *= aa; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(x - 30 + k * 15, 540, 6, 3, k, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); } ctx.restore();
    if (i < 2) pijlE(ctx, x + 70, 440, P[i + 1][1] - 70, 440, C.koraal, boog(i * 0.18 + 0.1, i * 0.18 + 0.3, u), 3); });
  metaText(ctx, 'kind', 560, 600, C.grain, 'center', 28); metaText(ctx, 'moeder', 960, 600, C.grain, 'center', 28); metaText(ctx, 'oma', 1360, 600, C.grain, 'center', 28);
  lijstje(ctx, 'dennis', 760, 700, 0.3, 0); lijstje(ctx, 'opawit', 1160, 700, 0.3, 0); metaText(ctx, 'vaderskant: mitochondriën niet doorgegeven', 960, 880, C.text2, 'center', 28); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { geslStaaf(ctx, 'X', 1430, 520, 2.4, XK.moeder); geslStaaf(ctx, 'Y', 1600, 520, 2.4, XK.vader);
    metaText(ctx, 'x', 1430, 790, C.grain, 'center', 28); metaText(ctx, 'y', 1600, 790, C.grain, 'center', 28); },

  // ---------------- Cold open
  s01(ctx, t, q) { const li = q.on('lijken', 1, 0.8), lus = (t % 2.6) / 2.6, rp = Math.floor(t / 2.6) % 2 ? 1 : 0.1;
    aardbeiTafel(ctx, t, { hand: 1, handRijp: rp, lijstHl: q.on('Opa', 1, 0.5) });
    // één aardbei gaat in een boog van de hand naar de schaal 'rijp' (links), ook de groene
    const u = ease(clamp((lus - 0.35) / 0.5, 0, 1)); if (u > 0 && u < 1) aardbei(ctx, lerp(900, 860, u), lerp(470, 590, u) - Math.sin(u * Math.PI) * 60, 22, rp, 0.3);
    if (li > 0.01) { const sx = lerp(W, 1000, li); if (sx < W - 4) kleurModelDeutan(ctx, Math.round(sx), 100, Math.round(W - sx), 800);
      ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(sx, 110); ctx.lineTo(sx, 880); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha *= li; metaText(ctx, 'zo zie jij het', sx - 30, 140, C.grain, 'right', 28); metaText(ctx, 'zo ziet opa het · model', sx + 30, 140, C.grain, 'left', 28); ctx.restore(); } },
  s02(ctx, t, q) { const tw = q.on('twaalf', 1, 0.5), th = q.on('tweehonderd', 1, 0.5), dr = q.on('dochter', 1, 0.6), wa = q.on('Waarom', 1, 0.6);
    kamer(ctx); gezin(ctx, t, { hl: { marieke: dr * (1 - wa), levi: q.on('zoon', 1, 0.5) * (1 - wa), jens: q.on('zoon', 1, 0.5) * (1 - wa) }, lijst: q.on('opa', 1, 0.5) * (1 - wa) });
    const pa = 1 - dr; if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; dimLaag(ctx, 0.9);
      text(ctx, 'mannen', 260, 260, fTekst(40, 700), C.text, 'left'); for (let i = 0; i < 12; i++) telPop(ctx, 300 + i * 60, 390, 1.6, i === 7 && tw > 0.3 ? C.paars : '#6E7A8C', Math.min(1, t * 2));
      text(ctx, '± 8 %  ·  1 op 12', 1100, 370, fTekst(44, 700), rgba(C.paars, tw), 'left');
      text(ctx, 'vrouwen', 260, 520, fTekst(40, 700), rgba(C.text, th), 'left'); for (let i = 0; i < 200; i++) { ctx.beginPath(); ctx.arc(300 + (i % 25) * 28, 570 + Math.floor(i / 25) * 28, 9, 0, 6.283); ctx.fillStyle = i === 137 && th > 0.5 ? C.paars : '#6E7A8C'; ctx.globalAlpha = pa * th; ctx.fill(); ctx.globalAlpha = pa; }
      text(ctx, '± 0,5 %  ·  1 op 200', 1100, 680, fTekst(44, 700), rgba(C.paars, th), 'left'); metaText(ctx, 'rood-groen kleurenblind · noord-europa', 260, 860, C.grain, 'left', 28); ctx.restore(); }
    if (dr > 0.01 && wa < 0.99) { _n(ctx, 'ziet gewoon', null, gx('marieke'), kopY('marieke') - 30, dr * (1 - wa)); _n(ctx, 'kan kleurenblind zijn', null, (gx('levi') + gx('jens')) / 2, kopY('levi') - 40, q.on('zoon', 1, 0.5) * (1 - wa)); }
    if (wa > 0.01) { dimLaag(ctx, 0.72 * wa); card(ctx, 260, 300, 660, 240, 'Puzzel 1', 'Waarom zijn vooral mannen kleurenblind?', wa); card(ctx, 1000, 300, 660, 240, 'Puzzel 2', 'Hoe slaat een eigenschap een generatie over?', q.on('generatie', 1, 0.6)); } },

  // ---------------- Hoofdstuk 1
  s04(ctx, t, q) { schemaBg(ctx); oudersXY(ctx, 1, { vr: Math.max(0.35, q.on('vrouw', 1, 0.5)), mn: Math.max(0.35, q.on('man', 1, 0.5)) });
    const me = q.on('meiose', 1, 0.6), ei = q.on('eicel', 1, 0.6), za = q.on('zaadcellen', 1, 0.6), yy = q.on('helft', 2, 0.6);
    if (me > 0.01) { pijlE(ctx, 410, 480, 410, 560, C.line, me); pijlE(ctx, 1510, 480, 1510, 560, C.line, me); metaText(ctx, 'meiose', 410, 530, rgba(C.grain, me), 'left', 28); }
    eicelX(ctx, 410, 680, 100, ei); if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei; metaText(ctx, 'eicel · altijd één x', 410, 830, C.grain, 'center', 28); ctx.restore(); }
    zaadX(ctx, 1380, 680, 'X', t, za); zaadX(ctx, 1640, 680, 'Y', t + 0.4, yy); if (za > 0.01) { ctx.save(); ctx.globalAlpha *= za; metaText(ctx, 'zaadcellen · helft x, helft y', 1510, 830, C.grain, 'center', 28); ctx.restore(); } },
  s05(ctx, t, q) { schemaBg(ctx); const mz = q.on('meisje', 1, 0.6), jo = q.on('jongen', 1, 0.6), me = q.on('meestal', 1, 0.6), ha = q.on('half', 1, 0.6);
    const rij = (y, soort, a, lab, g) => { if (a <= 0.01) return; eicelX(ctx, 360, y, 80, a); ctx.save(); ctx.globalAlpha *= a; text(ctx, '+', 520, y + 16, fTitel(64), C.text2, 'center'); ctx.restore(); zaadX(ctx, 720, y, soort, t, a, 2.2); ctx.save(); ctx.globalAlpha *= a; pijlE(ctx, 860, y, 1000, y, C.line, 1); genoKaart(ctx, g, 1150, y, 1); text(ctx, lab, 1330, y + 14, fTekst(44, 700), C.text, 'left'); ctx.restore(); };
    rij(330, 'X', Math.max(0.35, mz), 'meisje', 'X:m X:v'); rij(640, 'Y', Math.max(jo, 0.0) > 0.01 ? jo : 0.0, 'jongen', 'X:m Y:v');
    if (me > 0.01) { ctx.save(); ctx.globalAlpha *= me; metaText(ctx, 'meestal: het gen sry op de y zet de ontwikkeling tot jongen in gang', 960, 820, C.grain, 'center', 28); ctx.restore(); }
    if (ha > 0.01) { ctx.save(); ctx.globalAlpha *= ha; roundRect(ctx, 1540, 560, 300, 160, 14); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 2); text(ctx, '½', 1690, 650, fTitel(72), C.goud, 'center'); metaText(ctx, 'kans op een jongen', 1690, 700, C.grain, 'center', 28); ctx.restore(); } },
  s06(ctx, t, q) { schemaBg(ctx); oudersXY(ctx, 0.5); roundRect(ctx, 760, 520, 400, 300, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 2); text(ctx, 'zoon', 960, 580, fTekst(40, 700), C.text, 'center');
    geslStaaf(ctx, 'X', 910, 700, 1.1, C.line); geslStaaf(ctx, 'Y', 1010, 700, 1.1, XK.vader); vraagteken(ctx, 860, 730, 1, 80); },
  s08(ctx, t, q) { schemaBg(ctx); oudersXY(ctx, 0.5); const mo = q.on('moeder', 1, 0.6), va = q.on('vader', 1, 0.6), dc = q.on('dochter', 1, 0.6);
    roundRect(ctx, 560, 520, 400, 300, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 2); text(ctx, 'zoon', 760, 580, fTekst(40, 700), C.text, 'center');
    geslStaaf(ctx, 'X', 710, 700, 1.1, _mixHex(C.line, XK.moeder, mo)); geslStaaf(ctx, 'Y', 810, 700, 1.1, XK.vader);
    _n(ctx, 'van moeder', null, 640, 880, mo, 'center', XK.moeder); _n(ctx, 'van vader', null, 900, 880, va, 'center', XK.vader);
    if (mo > 0.01) pijlE(ctx, 410, 480, 700, 512, XK.moeder, mo); if (va > 0.01) pijlE(ctx, 1500, 480, 820, 512, XK.vader, va);
    if (dc > 0.01) { ctx.save(); ctx.globalAlpha *= dc; roundRect(ctx, 1080, 520, 400, 300, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); text(ctx, 'dochter', 1280, 580, fTekst(40, 700), C.text, 'center');
      geslStaaf(ctx, 'X', 1230, 700, 1.1, XK.moeder); geslStaaf(ctx, 'X', 1330, 700, 1.1, XK.vader); metaText(ctx, 'een x van elke ouder', 1280, 860, C.grain, 'center', 28); ctx.restore(); } },

  // ---------------- Hoofdstuk 2
  s09(ctx, t, q) { schemaBg(ctx); const du = q.on('duizend', 1, 0.6), kl = q.on('kleiner', 1, 0.6), me = q.on('meeste', 1, 0.6);
    chromX(ctx, 700, 520, kLen(23) * 3.2, 0, C.kernR, 1, { cen: CEN[22], w: 70 }); text(ctx, 'X', 700, 150, fTitel(64), C.text, 'center');
    chromX(ctx, 1200, 520 + 60, kLen(24) * 3.2, 0, C.kernR, Math.max(0.35, kl), { cen: CEN[23], w: 70 }); ctx.save(); ctx.globalAlpha *= Math.max(0.35, kl); text(ctx, 'Y', 1200, 330, fTitel(64), C.text, 'center'); ctx.restore();
    _n(ctx, 'zo\'n duizend genen', null, 840, 520, du, 'left', C.goud); _n(ctx, 'veel minder genen', null, 1290, 600, kl, 'left');
    if (me > 0.01) { ctx.save(); ctx.globalAlpha *= me; metaText(ctx, 'de meeste genen van de x liggen niet op de y', 960, 880, C.grain, 'center', 28); ctx.restore(); } },
  s10(ctx, t, q) { kamer(ctx); dimLaag(ctx, 0.55); const x = 420, h = 900; persoon(ctx, 'opabos', x, VLOER + 420, h, { uit: 'neutraal', kijk: 1, t: t * 0.5 });
    const hh = h / 6.1, top = VLOER + 420 - h, oogX = x + hh * OOG[0], oogY = top + hh * OOG[1], zc = q.on('netvlies', 1, 0.9);
    ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(oogX, oogY, 16, 0, 6.283); ctx.stroke(); ctx.restore();
    if (zc > 0.01) zoomCircle(ctx, 1200, 430, 340 * zc, oogX + 18, oogY, zc > 0.9 ? 'netvlies · vergroot' : null, 1, () => { chMicro(ctx); netvliesKegels(ctx, 860, 110, 680, 600, { staafjes: 1 }); });
    _n(ctx, 'kegeltjes', 'kleur · 3 soorten', 1572, 560, q.on('kegeltjes', 1, 0.5), 'left'); _n(ctx, 'staafjes', 'licht en donker', 1572, 680, q.on('kegeltjes', 1, 0.5) * 0.9, 'left');
    [['blauw', XK.S], ['groen', XK.M], ['rood', XK.L]].forEach(([s, k], i) => { const a = q.on(s, 1, 0.4); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(1680, 150 + i * 60, 14, 0, 6.283); shape(ctx, k, lighten(k, 0.3), 1.5); text(ctx, s, 1710, 162 + i * 60, fTekst(36, 600), C.text, 'left'); ctx.restore(); });
    if (zc > 0.9) metaText(ctx, 'licht ↑', 1260, 770, C.grain, 'center', 28); },
  s11(ctx, t, q) { schemaBg(ctx); const wk = q.on('Werkt', 1, 0.8), sch = q.on('bijna', 1, 1.6), li = q.on('lijken', 1, 0.8), an = q.on('ander', 1, 0.6);
    // chromosomen: X met twee genen naast elkaar; klein chromosoom 7 met blauw-gen (schuift naar de hoek)
    ctx.save(); ctx.globalAlpha *= 1 - wk;
    chromX(ctx, 760, 540, kLen(23) * 3, 0, C.kernR, 1, { cen: CEN[22], w: 64 }); const L = kLen(23) * 3, yb = 540 + L * (1 - CEN[22]) - 50;
    roundRect(ctx, 760 - 40, yb - 22, 38, 30, 4); shape(ctx, XK.L, null); roundRect(ctx, 762, yb - 22, 38, 30, 4); shape(ctx, XK.M, null);
    _n(ctx, 'rood- en groen-gen', 'naast elkaar op de x', 830, yb + 10, q.on('naast', 1, 0.5), 'left');
    if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; chromX(ctx, 1300, 560, kLen(7) * 3, 0, C.kernR, 1, { cen: CEN[6], w: 56 }); roundRect(ctx, 1300 - 34, 560 - kLen(7) * 3 * CEN[6] + 60, 68, 26, 4); shape(ctx, XK.S, null); text(ctx, '7', 1300, 300, fTitel(56), C.text, 'center'); _n(ctx, 'blauw-gen', 'ander chromosoom', 1380, 470, 1, 'left'); ctx.restore(); }
    ctx.restore();
    if (wk > 0.01) { ctx.save(); ctx.globalAlpha *= wk; kegelKrommen(ctx, 140, 800, li > 0.01 ? 800 : 1100, 380, { schuif: sch }); ctx.restore();
      _n(ctx, 'rood-eiwit wijkt af', 'stippel = normaal', li > 0.01 ? 760 : 1000, 380, sch, 'left', XK.L); }
    aardbeiVergelijk(ctx, 1170, 150, li); },
  s12(ctx, t, q) { schemaBg(ctx); const mn = q.on('man', 1, 0.6), ge = q.on('geen', 1, 0.6);
    roundRect(ctx, 200, 170, 620, 640, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, 'vrouw', 510, 240, fTekst(40, 700), C.text, 'center');
    geslStaaf(ctx, 'X', 440, 500, 2, XK.moeder, 'A'); geslStaaf(ctx, 'X', 580, 500, 2, XK.vader, 'A'); metaText(ctx, 'twee allelen', 510, 770, C.grain, 'center', 28);
    ctx.save(); ctx.globalAlpha *= Math.max(0.35, mn); roundRect(ctx, 1100, 170, 620, 640, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, 'man', 1410, 240, fTekst(40, 700), C.text, 'center');
    geslStaaf(ctx, 'X', 1340, 500, 2, XK.moeder, 'A'); geslStaaf(ctx, 'Y', 1480, 500, 2, XK.vader); metaText(ctx, 'één allel', 1410, 770, C.grain, 'center', 28); ctx.restore();
    if (ge > 0.01) haak(ctx, 1300, 1520, 850, 'geen tweede allel als reserve', C.koraal, ge); },

  // ---------------- Hoofdstuk 3
  s13(ctx, t, q) { schemaBg(ctx); const ho = q.on('hoofdletter', 1, 0.6), kl = q.on('klein', 1, 0.6), ge = q.on('geen', 1, 0.6);
    const kol = (x, a, al, g, lab) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; geslStaaf(ctx, al === 'Y' ? 'Y' : 'X', x, 400, 3, '#A7AEC0', al === 'Y' ? '' : al); genoTekst(ctx, G(g), x, 720, 72); text(ctx, lab, x, 800, fTekst(36, 600), C.text2, 'center'); ctx.restore(); };
    kol(480, Math.max(0.3, ho), 'A', 'X^A', 'normaal kleuren zien'); kol(960, kl, 'a', 'X^a', 'kleurenblind'); kol(1440, ge, 'Y', 'Y', 'geen letter'); },
  s14(ctx, t, q) { schemaBg(ctx); const vr = q.on('vrouw', 1, 0.5), dom = q.on('dominant', 1, 0.6), dr = q.on('draagster', 1, 0.6), mn = q.on('man', 1, 0.5), kb = q.on('kleurenblind', 1, 0.5);
    ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(120, 640); ctx.lineTo(1800, 640); ctx.stroke(); ctx.restore();
    GEN5.forEach(([g, sx, ph, s], i) => { const a = i < 3 ? Math.max(0.0, vr) * boog(0, 1, 1) : mn; const x = 260 + i * 350; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      symbool(ctx, x, 380, sx === 'man' ? 'm' : 'v', { r: 64, ziek: s === 2 ? 1 : 0, drager: s === 1 ? dr : 0, hl: s === 1 ? dr * (1 - mn) : 0 });
      genoTekst(ctx, G(g), x, 580, 52); text(ctx, ph, x, 700, fTekst(32, 600), s === 2 ? lighten(C.paars, 0.35) : C.text2, 'center'); ctx.restore(); });
    if (dom > 0.01) _n(ctx, 'A is dominant', null, 610, 260, dom * (1 - mn), 'center', C.goud); },
  s15(ctx, t, q) { schemaBg(ctx); const dr = q.on('draagster', 1, 0.5), mn = q.on('man', 1, 0.5);
    symbool(ctx, 700, 420, 'v', { r: 80, drager: 1, a: Math.max(0.35, dr) }); symbool(ctx, 1220, 420, 'm', { r: 80, a: Math.max(0.0, mn) }); if (mn > 0.01) paarLijn(ctx, 780, 1140, 420, mn);
    genoKaart(ctx, 'X:m^A X:m^a', 700, 640, q.on('Zij', 1, 0.5), { sub: 'draagster' }); genoKaart(ctx, 'X:v^A Y:v', 1220, 640, q.on('hij', 1, 0.5), { sub: 'ziet normaal' }); },
  s16(ctx, t, q) { schemaBg(ctx); symbool(ctx, 700, 360, 'v', { r: 70, drager: 1 }); symbool(ctx, 1220, 360, 'm', { r: 70 }); paarLijn(ctx, 770, 1150, 360);
    genoKaart(ctx, 'X:m^A X:m^a', 700, 540, 1); genoKaart(ctx, 'X:v^A Y:v', 1220, 540, 1); kindLijnen(ctx, 960, 360, 700, [960], q.on('zoon', 1, 0.5)); symbool(ctx, 960, 760, 'm', { r: 60, a: q.on('zoon', 1, 0.5) }); vraagteken(ctx, 1060, 790, q.on('kans', 1, 0.5), 80); },
  s18(ctx, t, q) { schemaBg(ctx); const ha = q.on('half', 1, 0.6), kr = q.on('Krijgt', 1, 0.6);
    symbool(ctx, 520, 260, 'v', { r: 60, drager: 1 }); symbool(ctx, 1400, 260, 'm', { r: 60 }); genoKaart(ctx, 'X:m^A X:m^a', 520, 420, 1); genoKaart(ctx, 'X:v^A Y:v', 1400, 420, 1);
    pijlE(ctx, 1300, 480, 1040, 660, XK.vader, q.on('vader', 1, 0.5)); _n(ctx, 'Y', null, 1200, 560, q.on('vader', 1, 0.5), 'left', XK.vader);
    pijlE(ctx, 560, 480, 820, 660, XK.moeder, q.on('moeder', 1, 0.5));
    if (ha > 0.01) { ctx.save(); ctx.globalAlpha *= ha; genoKaart(ctx, 'X:m^A', 640, 720, 1, { w: 150, sub: 'kans ½' }); genoKaart(ctx, 'X:m^a', 640, 860, 1, { w: 150, sub: 'kans ½' }); ctx.restore(); }
    genoKaart(ctx, kr > 0.5 ? 'X:m^a Y:v' : 'X:m Y:v', 960, 760, 1, { rand: kr > 0.5 ? C.goud : null, sub: kr > 0.5 ? 'kleurenblind' : 'zoon' }); },
  s19(ctx, t, q) { schemaBg(ctx); const bo = q.at('Boven'), li = q.at('Links'), zo = q.on('zonen', 1, 0.5), dc = q.on('dochters', 1, 0.5);
    const u = t < bo ? 0 : t < li ? 0.12 * clamp((t - bo) / 1.0, 0, 1) + 0.12 * 0 : 0.14 + clamp((t - li) / 3.5, 0, 1) * 0.86;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { roundRect(ctx, 600 + 240 * (j + 1) + 6, 250 + 240 * i + 6, 228, 228, 14); shape(ctx, rgba(C.fill, 0.35), rgba(C.line, 0.5), 1); }
    kruisSchemaX(ctx, Math.max(u, t > bo ? 0.16 : 0), { zonen: zo * (1 - dc), dochters: dc });
    if (zo > 0.01) _n(ctx, 'zonen: de helft kleurenblind', null, 1620, 380, zo, 'left', C.goud); if (dc > 0.01) _n(ctx, 'dochters: normaal', 'de helft draagster', 1620, 560, dc, 'left', C.goud); },
  s20(ctx, t, q) { schemaBg(ctx); const tz = q.at('zoon'), n = Math.round(200 * clamp(t / Math.max(1, tz), 0, 1)), al = q.on('lle', 1, 0.6), be = q.on('bedoelt', 1, 0.6);
    const R = sim200(ctx, n, { hlAlle: al }); metaText(ctx, 'simulatie · loting per kind · ' + n + ' van 200', 70, 860, C.text2, 'left', 28);
    if (n >= 200) { metaText(ctx, 'kleurenblind: ' + R.kb + ' van ' + R.zon, 470, 800, C.grain, 'center', 28); metaText(ctx, 'draagster: ' + R.dr + ' van ' + R.doc, 1430, 800, C.grain, 'center', 28); }
    if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al * (1 - be); roundRect(ctx, 660, 330, 600, 200, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 2); text(ctx, R.kb + ' van 200 kinderen', 960, 420, fTekst(44, 700), C.text, 'center'); text(ctx, '≈ ¼', 960, 490, fTitel(56), C.goud, 'center'); ctx.restore(); }
    if (be > 0.01) { ctx.save(); ctx.globalAlpha *= be; roundRect(ctx, 460, 300, 1000, 260, 16); shape(ctx, rgba(C.bgSchema, 0.97), C.goud, 2); text(ctx, 'kans voor een zoon: ½', 960, 400, fTekst(48, 700), C.text, 'center'); text(ctx, 'kans voor een kind: ¼', 960, 490, fTekst(48, 700), C.text2, 'center'); ctx.restore(); } },

  // ---------------- Hoofdstuk 4
  s21(ctx, t, q) { schemaBg(ctx); const mn = q.on('man', 1, 0.5), vr = q.on('vrouw', 1, 0.5), kl = q.on('kleiner', 1, 0.6);
    ctx.save(); ctx.globalAlpha *= Math.max(0.35, mn); symbool(ctx, 480, 300, 'm', { r: 70, ziek: 1 }); genoKaart(ctx, 'X:m^a Y:v', 480, 470, 1, { sub: 'één allel a is genoeg' }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= Math.max(0.0, vr); symbool(ctx, 1440, 300, 'v', { r: 70, ziek: 1 }); genoKaart(ctx, 'X:m^a X:v^a', 1440, 470, 1, { sub: 'twee keer a nodig' }); ctx.restore();
    if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; const bx = 360, by = 680; text(ctx, 'man', bx - 30, by + 26, fTekst(34, 600), C.text, 'right'); roundRect(ctx, bx, by, 1200, 36, 8); shape(ctx, '#243450', C.line, 1); roundRect(ctx, bx, by, 1200 * 0.08 * 6, 36, 8); shape(ctx, C.paars, null); metaText(ctx, '± 8 %', bx + 1200 * 0.48 + 20, by + 28, C.grain, 'left', 28);
      text(ctx, 'vrouw', bx - 30, by + 96, fTekst(34, 600), C.text, 'right'); roundRect(ctx, bx, by + 70, 1200, 36, 8); shape(ctx, '#243450', C.line, 1); roundRect(ctx, bx, by + 70, Math.max(6, 1200 * 0.0045 * 6), 36, 4); shape(ctx, C.paars, null); metaText(ctx, '± 0,4–0,5 % (gemeten)', bx + 60, by + 98, C.grain, 'left', 28);
      metaText(ctx, 'balk × 6 vergroot', bx + 1200, by + 160, C.text2, 'right', 28); ctx.restore(); } },
  s22(ctx, t, q) { schemaBg(ctx); const no = q.on('nooit', 1, 0.5), dc = q.on('dochter', 1, 0.5);
    symbool(ctx, 960, 260, 'm', { r: 70 }); genoKaart(ctx, 'X:v Y:v', 960, 410, 1, { w: 200 });
    symbool(ctx, 600, 700, 'm', { r: 60, a: Math.max(0.4, no) }); pijlE(ctx, 900, 470, 650, 620, XK.vader, no); kruisE(ctx, 775, 545, 26, no); metaText(ctx, 'zoon: krijgt zijn y', 600, 830, rgba(C.grain, no), 'center', 28);
    symbool(ctx, 1320, 700, 'v', { r: 60, a: Math.max(0.4, dc) }); pijlE(ctx, 1020, 470, 1270, 620, C.goud, dc, 4); metaText(ctx, 'elke dochter: krijgt zijn x', 1320, 830, rgba(C.grain, dc), 'center', 28); },
  s23(ctx, t, q) { schemaBg(ctx); stamWit(ctx, { kids: 0, rechts: 0, marVraag: q.on('dochter', 1, 0.5), opaLab: q.on('kleurenblind', 1, 0.5) });
    _n(ctx, 'geen allel a', null, WIT.oma[0], WIT.oma[1] - 90, q.on('Oma', 1, 0.5), 'center'); },
  s25(ctx, t, q) { schemaBg(ctx); const dc = q.on('dochter', 1, 0.6), ze = q.on('zeker', 1, 0.5), zo = q.on('zoon', 1, 0.6);
    stamWit(ctx, { kids: zo, rechts: zo, opaLab: 1, marDrager: ze, marHl: ze * (1 - zo), marLab: ze, kidLab: zo });
    if (dc > 0.01) pijlE(ctx, WIT.opa[0] + 30, WIT.opa[1] + 60, WIT.mar[0] - 20, WIT.mar[1] - 60, C.goud, dc * (1 - zo), 4);
    card(ctx, 1460, 170, 400, 220, 'van opa', 'Zijn enige X is Xᵃ. Die krijgt elke dochter.', q.on('maar', 1, 0.5) * (1 - zo * 0.6)); },
  s26(ctx, t, q) { schemaBg(ctx); stamVic(ctx, { v: Math.max(0.4, q.on('Victoria', 1, 0.5)), leo: q.on('Leopold', 1, 0.5), dochters: q.on('dochters', 1, 0.5), rus: q.on('Rusland', 1, 0.6), spa: q.on('Spanje', 1, 0.6), prins: q.on('prinsen', 1, 0.6) });
    metaText(ctx, 'ingekort · niet alle kinderen getekend', 70, 860, C.text2, 'left', 28);
    if (t < q.at('Victoria')) { metaText(ctx, 'hemofilie · stoornis in de bloedstolling', 960, 120, C.grain, 'center', 28); } },
  s27(ctx, t, q) { schemaBg(ctx); const va = q.on('vader', 1, 0.6), mo = q.on('moeder', 1, 0.6), vr = q.on('vrouwen', 1, 0.6);
    metaText(ctx, 'x-chromosomaal dominant · d = afwijkend allel', 960, 120, C.grain, 'center', 28);
    // links: aangedane vader
    ctx.save(); ctx.globalAlpha *= Math.max(0.35, va); symbool(ctx, 300, 260, 'm', { r: 50, ziek: 1 }); symbool(ctx, 560, 260, 'v', { r: 50 }); paarLijn(ctx, 350, 510, 260); genoTekst(ctx, G('X:v^D Y:v'), 300, 360, 40); genoTekst(ctx, G('X:m^d X:m^d'), 560, 360, 40);
    kindLijnen(ctx, 430, 260, 540, [300, 560]); symbool(ctx, 300, 600, 'v', { r: 46, ziek: 1 }); symbool(ctx, 560, 600, 'm', { r: 46 });
    text(ctx, 'alle dochters', 300, 700, fTekst(30, 700), C.text, 'center'); text(ctx, 'geen zonen', 560, 700, fTekst(30, 700), C.text2, 'center'); ctx.restore();
    // rechts: aangedane moeder (heterozygoot)
    ctx.save(); ctx.globalAlpha *= mo; symbool(ctx, 1360, 260, 'v', { r: 50, ziek: 1 }); symbool(ctx, 1620, 260, 'm', { r: 50 }); paarLijn(ctx, 1410, 1570, 260); genoTekst(ctx, G('X:m^D X:m^d'), 1360, 360, 40); genoTekst(ctx, G('X:v^d Y:v'), 1620, 360, 40);
    kindLijnen(ctx, 1490, 260, 540, [1300, 1440, 1580, 1720]); [[1300, 'v', 1], [1440, 'v', 0], [1580, 'm', 1], [1720, 'm', 0]].forEach(([x, s, z]) => symbool(ctx, x, 600, s, { r: 40, ziek: z }));
    text(ctx, 'de helft van de kinderen', 1510, 700, fTekst(30, 700), C.text, 'center'); ctx.restore();
    if (vr > 0.01) haak(ctx, 660, 1260, 780, 'vaker bij vrouwen: zij hebben twee X-chromosomen', C.koraal, vr); },

  // ---------------- Hoofdstuk 5 (vwo)
  s28(ctx, t, q) { chMicro(ctx); const ri = q.on('ringetje', 1, 0.8), ze = q.on('zevenendertig', 1, 0.5);
    const R = celRond(ctx, 480, 500, 300, { t, seed: 3 }); const m = R && R.mito ? R.mito : [380, 640];
    ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(m[0], m[1], 26, 0, 6.283); ctx.stroke(); ctx.restore();
    _n(ctx, 'kern', null, 480 + 300 * 0.17, 500 - 300 * 0.1 - 300 * 0.32 - 24, Math.min(1, t), 'center');
    zoomCircle(ctx, 1330, 470, 340, m[0] + 24, m[1], 'mitochondrion · vergroot', 1, () => { chMicro(ctx); const M = mitochondrionEcht(ctx, 1330, 470, 2.2, { t, rot: -0.15 }); mtRingen(ctx, M, 2.4, 3, Math.max(0.25, ri)); });
    _n(ctx, 'eigen DNA', 'ringetje', 1700, 200, ri, 'left', C.kernR); _n(ctx, '37 genen', null, 1700, 300, ze, 'left'); },
  s29(ctx, t, q) { chMicro(ctx); const ze = q.on('zaadcel', 1, 0.6), af = q.on('afgebroken', 1, 1.2), mo = q.on('moeder', 1, 0.6);
    eicelMito(ctx, 520, 450, 260, 1); _n(ctx, 'eicel', 'zo\'n 100 000 mitochondriën', 520, 790, 1, 'center');
    zaadMito(ctx, 1320, 470, t, 4.5, Math.max(0.0, ze), 1 - af); _n(ctx, 'zaadcel', af > 0.5 ? 'mitochondriën afgebroken' : 'hooguit zo\'n 100 mitochondriën', 1260, 600, ze, 'center');
    if (mo > 0.01) haak(ctx, 300, 740, 840, 'al je mitochondriën: van je moeder', C.koraal, mo);
    metaText(ctx, 'vergroot · niet op schaal', W - 70, 900 - 20, C.text2, 'right', 28); },
  s30(ctx, t, q) { schemaBg(ctx); symbool(ctx, 760, 320, 'm', { r: 70, ziek: 1 }); symbool(ctx, 1160, 320, 'v', { r: 70 }); paarLijn(ctx, 830, 1090, 320);
    metaText(ctx, 'fout in het', 670, 310, C.grain, 'right', 28); metaText(ctx, 'mitochondriaal dna', 670, 350, C.grain, 'right', 28); kindLijnen(ctx, 960, 320, 640, [760, 960, 1160]);
    [[760, 'v'], [960, 'm'], [1160, 'v']].forEach(([x, s]) => { symbool(ctx, x, 700, s, { r: 50 }); vraagteken(ctx, x + 70, 730, q.on('kinderen', 1, 0.5), 60); }); },
  s32(ctx, t, q) { schemaBg(ctx); const mo = q.on('moeder', 1, 0.6), ve = q.on('verschillen', 1, 0.8);
    // links: vader
    symbool(ctx, 420, 240, 'm', { r: 56, ziek: 1 }); kindLijnen(ctx, 420, 240, 480, [300, 540]); symbool(ctx, 300, 540, 'v', { r: 44 }); symbool(ctx, 540, 540, 'm', { r: 44 }); text(ctx, 'geen fout', 420, 660, fTekst(32, 700), C.groen, 'center');
    // rechts: moeder, alle kinderen haar mitochondriën, aandeel met fout verschilt
    ctx.save(); ctx.globalAlpha *= mo; symbool(ctx, 1360, 240, 'v', { r: 56, ziek: 1 }); const K = [[1120, 'v', 0.7], [1280, 'm', 0.25], [1440, 'v', 0.5], [1600, 'm', 0.85]];
    kindLijnen(ctx, 1360, 240, 480, K.map(k => k[0])); K.forEach(([x, s, f]) => { symbool(ctx, x, 540, s, { r: 40, ziek: ve > 0.5 ? f : 0.6 });
      if (ve > 0.01) { ctx.save(); ctx.globalAlpha *= ve; roundRect(ctx, x - 50, 620, 100, 22, 6); shape(ctx, '#243450', C.line, 1); roundRect(ctx, x - 50, 620, 100 * f, 22, 6); shape(ctx, C.koraal, null); ctx.restore(); } });
    text(ctx, 'alle kinderen krijgen haar mitochondriën', 1360, 720, fTekst(30, 700), C.text, 'center'); ctx.restore();
    if (ve > 0.01) { ctx.save(); ctx.globalAlpha *= ve; metaText(ctx, 'balk = deel van de mitochondriën met de fout · model', 1360, 780, C.grain, 'center', 28); ctx.restore(); } },
  s33(ctx, t, q) { schemaBg(ctx); const ke = q.on('kern', 1, 0.6), bu = q.on('buiten', 1, 0.6), ml = q.on('moederlijn', 1, 0.8);
    const kol = 1 - ml; if (kol > 0.01) { ctx.save(); ctx.globalAlpha *= kol;
      roundRect(ctx, 200, 200, 680, 560, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, 'X-chromosomaal', 540, 270, fTekst(40, 700), C.text, 'center'); ctx.save(); ctx.globalAlpha *= Math.max(0.3, ke);
      ctx.beginPath(); ctx.arc(540, 480, 140, 0, 6.283); shape(ctx, '#3A3058', C.kernR, 2); geslStaaf(ctx, 'X', 540, 480, 1.2, C.kernR, 'a'); metaText(ctx, 'gen in de kern', 540, 680, C.grain, 'center', 28); metaText(ctx, 'zonen en dochters verschillen', 540, 720, C.grain, 'center', 28); ctx.restore();
      roundRect(ctx, 1040, 200, 680, 560, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, 'mitochondriaal', 1380, 270, fTekst(40, 700), C.text, 'center'); ctx.save(); ctx.globalAlpha *= Math.max(0.3, bu);
      const M = mitochondrionEcht(ctx, 1380, 470, 1.4, { t, rot: -0.1 }); mtRingen(ctx, M, 1, 3); metaText(ctx, 'dna buiten de kern', 1380, 680, C.grain, 'center', 28); metaText(ctx, 'alleen via de moeder', 1380, 720, C.grain, 'center', 28); ctx.restore(); ctx.restore(); }
    if (ml > 0.01) { kamer(ctx); dimLaag(ctx, 0.88); ctx.save(); ctx.translate(960, 480); ctx.scale(1.35, 1.35); ctx.translate(-960, -520); moederlijn(ctx, clamp((t - q.at('moederlijn')) / 3, 0, 1), ml); ctx.restore(); } },

  // ---------------- Recap
  s34(ctx, t, q) { const x = q.on('X', 1, 0.5), vr = q.on('vrouw', 1, 0.6);
    aardbeiTafel(ctx, t, { hand: 0 }); genoKaart(ctx, 'X^a Y', 720, 140, Math.max(0.0, q.on('allel', 1, 0.5)), { w: 200, sub: 'opa · kleurenblind' });
    if (vr > 0.01) { dimLaag(ctx, 0.8 * vr); ctx.save(); ctx.globalAlpha *= vr; symbool(ctx, 760, 420, 'm', { r: 70, ziek: 1 }); genoKaart(ctx, 'X^a Y', 760, 580, 1, { sub: 'één keer a: kleurenblind' }); symbool(ctx, 1160, 420, 'v', { r: 70, ziek: 1 }); genoKaart(ctx, 'X^a X^a', 1160, 580, 1, { sub: 'twee keer a: zeldzaam' }); ctx.restore(); } },
  s35(ctx, t, q) { kamer(ctx); const dc = q.on('dochter', 1, 0.5), dr = q.on('draagster', 1, 0.5), zo = q.on('zoon', 1, 0.5), kz = q.on('kleinzoon', 1, 0.6);
    gezin(ctx, t, { hl: { marieke: dc, levi: zo, jens: zo }, lijst: 1 - dc });
    genoKaart(ctx, 'X^a Y', 1720, 340, 1 - zo * 0.5, { w: 180, px: 40, sub: 'opa' });
    genoKaart(ctx, 'X:m^A X:v^a', gx('marieke'), kopY('marieke') - 70, dr, { w: 210, px: 40 });
    if (zo > 0.01) [['levi'], ['jens']].forEach(([id]) => { ctx.save(); ctx.globalAlpha *= zo; roundRect(ctx, gx(id) - 80, kopY(id) - 116, 160, 84, 14); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 2); genoTekst(ctx, G('X:m^A'), gx(id) - 42, kopY(id) - 60, 34); text(ctx, 'of', gx(id), kopY(id) - 62, fTekst(28, 600), C.text2, 'center'); genoTekst(ctx, G('X:m^a'), gx(id) + 42, kopY(id) - 60, 34); ctx.restore(); });
    if (kz > 0.01) { ctx.save(); ctx.globalAlpha *= kz; pijlE(ctx, 1700, 400, gx('marieke') + 60, kopY('marieke') - 130, C.goud, 1, 4); pijlE(ctx, gx('marieke') - 40, kopY('marieke') - 130, gx('jens') + 40, kopY('jens') - 130, C.goud, 1, 4); ctx.restore(); } },
});

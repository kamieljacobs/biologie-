// Keyframes fase 1 · DNA kopiëren (lichte remake). Elke KF[naam](ctx) tekent één stilstaand beeld op 1920×1080.
const KF = {};
const mic = (ctx) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); };
const sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const nb = (ctx, n, m, x, y, a = 1, al = 'left', kl = C.text) => naamBij(ctx, n, m, x, y, a, al, kl);
const meta = (ctx, s, x, y, al = 'left', kl = C.text2) => metaText(ctx, s, x, y, kl, al, 28);
const sub = (ctx, s) => { ctx.save(); ctx.font = fTekst(40, 700); const w = Math.min(1700, ctx.measureText(s).width + 60); roundRect(ctx, W / 2 - w / 2, 930, w, 74, 12); ctx.fillStyle = rgba('#0D1420', 0.9); ctx.fill(); text(ctx, s, W / 2, 980, fTekst(40, 700), C.text, 'center'); ctx.restore(); };
const vwo = (ctx) => { ctx.fillStyle = C.paars; ctx.fillRect(0, 0, 6, H); metaText(ctx, 'vwo', 40, 60, C.paars, 'left', 28); };
const schaal = (ctx, px, lab, x = 70, y = 860) => { ctx.fillStyle = C.text; ctx.fillRect(x, y - 12, px, 5); metaText(ctx, lab, x + px + 20, y, C.text2, 'left', 28); };
const kapje = (ctx, s, x, y) => metaText(ctx, s, x, y, C.grain, 'center', 28);

// 1 · Cold open: schaafwond op de onderarm van Noor die heelt (drie momenten) → zoomcirkel naar de huid met delende basale cellen
KF['01-schaafwond'] = (ctx) => {
  ctx.fillStyle = '#20304C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#34405A'; ctx.fillRect(0, 846, W, H - 846);
  const st = [[0, 'dag 0', 'vers'], [0.38, 'dag 2', 'korst'], [0.78, 'dag 7', 'nieuwe huid']];
  st.forEach(([h, d, s], k) => { const x = 90, y = 180 + k * 230, sc = 12;
    onderarm(ctx, x, y, sc, { id: 'noor', kijk: 1 }); schaafwond(ctx, x, y, sc, { heel: h, kijk: 1, cx: 14, cyy: -0.4, rx: 3.0, ry: 1.5 });
    metaText(ctx, d, x + 14 * sc, y - 70, C.text, 'center', 30); metaText(ctx, s, x + 14 * sc, y + 80, C.grain, 'center', 26); });
  // zoomcirkel naar 1 mm huid onder de korst: basale laag met delende cellen
  const cx = 1340, cy = 450, r = 330;
  zoomCircle(ctx, cx, cy, r, 90 + 14 * 12, 180 + 230 * 1 - 0.4 * 12, 'de wand van de wond · vergroot', 1, () => { mic(ctx);
    ctx.save(); ctx.translate(cx - 520, cy - 300); ctx.scale(1.25, 1.25); huidDoorsnede(ctx, 0, 0, 840, 520, { um: 260, mel: 1, deling: 1, seed: 7, hl: 'basaal' }); ctx.restore(); });
  nb(ctx, 'basale laag', 'cellen delen zich', 1700, 640, 1, 'left');
  sub(ctx, 'Een schaafwond op je arm. Na een week is hij dicht.');
};

// 2 · Doorlopende zoom (vier momenten van één camerabeweging): kern in de S-fase → chromatinedraad → nucleosomen → dubbele helix
KF['02-zoomstrook'] = (ctx) => { mic(ctx);
  const P = [[240, 'celkern', 'beeld 8 micrometer breed'], [720, 'chromatine', 'beeld 300 nanometer breed'], [1200, 'DNA rond eiwitten', 'beeld 40 nanometer breed'], [1680, 'DNA', 'beeld 8 nanometer breed']];
  P.forEach(([x, n, m], k) => { const y = 400; ctx.save(); ctx.beginPath(); ctx.arc(x, y, 210, 0, 6.283); ctx.clip(); mic(ctx);
    if (k === 0) kernChromatine(ctx, x, y, 190, { c: 0, seed: 4 });
    if (k === 1) { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([x - 220 + u * 440, y + Math.sin(u * 9) * 70 + Math.sin(u * 23) * 20]); } dnaDraad(ctx, pts, { w: 22, helix: false }); }
    if (k === 2) nucleosoomDraad(ctx, x - 230, y + 10, x + 230, y - 10, { n: 3, R: 50 });
    if (k === 3) dnaDraad(ctx, [[x - 240, y + 30], [x, y - 10], [x + 240, y + 20]], { w: 70, helix: true });
    ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 210, 0, 6.283); ctx.stroke();
    nb(ctx, n, m, x, 680, 1, 'center'); if (k < 3) pijl(ctx, x + 225, y, x + 255, y, C.goud, 1, 3, 12); });
  meta(ctx, 'één doorlopende zoom · schaalbalk loopt mee', W / 2, 140, 'center', C.grain);
  sub(ctx, 'Terug naar het molecuul: de dubbele ketting uit aflevering één.');
};

// 3 · Startpunt: helicase opent een bubbel met twee vorken (basis)
KF['03-bubbel-helicase'] = (ctx) => { mic(ctx);
  // twee vorken die van één startpunt uit elkaar lopen: links gespiegeld
  const st = { f: 26, i0: -4, i1: 50, X0: 960, cy: 450, g: 52, dx: 13, Dmax: 130, Lsplit: 9, Ltw: 10, Lf: 22, pl: 4, p1: 6, lead: 4, toon: { nieuw: 1, primase: 0, ligase: 0 }, t: 0.3 };
  vork(ctx, st);
  ctx.save(); ctx.translate(1920, 2 * st.cy); ctx.scale(-1, -1); vork(ctx, st); ctx.restore(); // linkervork = rechtervork 180° gedraaid (zelfde streng houdt zijn richting)
  meta(ctx, 'startpunt', 960, 300, 'center', C.grain); ctx.strokeStyle = C.grain; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(960, 315); ctx.lineTo(960, 600); ctx.stroke(); ctx.setLineDash([]);
  const M = vorkModel(st); nb(ctx, 'helicase', 'trekt de strengen uit elkaar', M.X(st.f) + 30, M.yT(st.f) - 70, 1, 'left', C.text);
  nb(ctx, 'vork', null, M.X(st.f) - 40, M.cy + 120, 1, 'center', C.goud);
  pijl(ctx, 1520, 640, 1640, 640, C.goud, 1, 3, 14); pijl(ctx, 400, 640, 280, 640, C.goud, 1, 3, 14); meta(ctx, 'vork loopt verder', 1580, 690, 'center', C.grain);
  schaal(ctx, Math.round(10 * M.dx / 0.34 * 0.34), '3,4 nanometer'); meta(ctx, 'simulatie · sterk vertraagd', W - 70, 860, 'right');
  sub(ctx, 'Een enzym, helicase, trekt de twee strengen uit elkaar.');
};

// 4 · Eén nucleotide volgen in het actieve centrum van DNA-polymerase (twee momenten: past niet / past wel)
function polyCloseUp(ctx, ox, fase) { // ox = linkerkant paneel; fase 'mis' of 'past'
  const g = 150, dx = 25.5, cy = 470, x3 = ox + 520; // x3 = actief centrum (3'-uiteinde nieuwe streng)
  const yM = cy + g / 2, yN = cy - g / 2, L = g / 2 - 14, hw = 8.5;
  polymeraseAchter(ctx, x3, cy, g * 0.95, { dir: 1, up: 1 });
  // matrijs (oude streng, onder) en nieuwe streng (boven, tot het actieve centrum)
  const P = (y, a, b) => { const r = []; for (let x = a; x <= b; x += 6) r.push([x, y]); return r; };
  for (let k = -16; k <= 12; k++) { const x = x3 + k * dx, b = d2seq(k + 40); d2Base(ctx, x, yM - 7, -Math.PI / 2, D2.comp[b], L, hw, { letter: true });
    if (k <= -1) d2Base(ctx, x, yN + 7, Math.PI / 2, b, L, hw, { letter: true }); }
  d2Rug(ctx, P(yM, x3 - 16 * dx - 10, x3 + 12 * dx + 10), { kleur: D2.oud, bw: 14 }); d2Rug(ctx, P(yN, x3 - 16 * dx - 10, x3 - dx * 0.6), { kleur: D2.nieuw, bw: 14 });
  const kb = d2seq(40), juist = kb, fout = 'G'; // tegenover matrijsbase comp(kb) hoort kb
  if (fase === 'mis') { // een verkeerde (G tegenover T... ) schiet weg; boog laat de baan zien
    vrijNucleotide(ctx, x3 + 60, cy - 250, fout, 0.5, 1.15, { rand: C.koraal });
    ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x3 + 10, cy - 30); ctx.quadraticCurveTo(x3 + 20, cy - 200, x3 + 60, cy - 230); ctx.stroke(); ctx.setLineDash([]);
  } else { vrijNucleotide(ctx, x3, yN + 2, juist, Math.PI, 1.05, { rand: C.goud }); }
  polymeraseVoor(ctx, x3, cy, g * 0.95, { dir: 1, up: 1, sluit: fase === 'past' ? 1 : 0, a: 0.94 });
  // andere vrije nucleotiden in het kernplasma
  [[ox + 120, 170, 'C', 0.4], [ox + 380, 150, 'A', -0.6], [ox + 760, 210, 'T', 0.9], [ox + 840, 760, 'G', 2.6], [ox + 150, 780, 'A', 2.2]].forEach(([x, y, b, an]) => vrijNucleotide(ctx, x, y, b, an, 0.75, { a: 0.55 }));
  return { x3, cy, g };
}
KF['04-een-nucleotide-volgen'] = (ctx) => { mic(ctx);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 958, 900); ctx.clip(); const A = polyCloseUp(ctx, -60, 'mis'); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(962, 0, 958, 900); ctx.clip(); mic(ctx); ctx.fillStyle = C.bgMicro; ctx.fillRect(962, 0, 958, 900); const B = polyCloseUp(ctx, 900, 'past'); ctx.restore();
  ctx.fillStyle = rgba(C.line, 0.4); ctx.fillRect(959, 60, 2, 800);
  nb(ctx, 'past niet', 'g tegenover t · schiet weg', 470, 120, 1, 'center', C.koraal); nb(ctx, 'past wel', 'a tegenover t · vingers sluiten', 1430, 120, 1, 'center', C.goud);
  nb(ctx, 'DNA-polymerase', 'model · vereenvoudigd', 300, 760, 1, 'center'); nb(ctx, 'oude streng', null, 940, 610, 1, 'right', C.kernR); nb(ctx, 'nieuwe streng', null, 1000, 330, 1, 'left', D2.nieuw);
  meta(ctx, 'simulatie · 10 000× vertraagd', W - 70, 860, 'right');
  sub(ctx, 'Past de base niet, dan schiet hij weer weg. Past hij wel, dan koppelt het enzym hem vast.');
};

// 5 · Basis: de vork in beeld (voorstel A: echte vork, stukjes niet benoemd; voorstel B: alleen de bovenste streng in focus)
KF['05-basisvork-A-B'] = (ctx) => { mic(ctx);
  const st = { f: 50, i0: 0, i1: 64, X0: 40, cy: 300, g: 40, dx: 13.5, Dmax: 120, Lsplit: 9, Ltw: 10, Lf: 22, pl: 4, p1: 8, lead: 4, t: 0.5, toon: { primase: 1, ligase: 1 } };
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 958, 900); ctx.clip(); ctx.translate(0, 120); vork(ctx, st); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(962, 0, 958, 900); ctx.clip(); ctx.translate(962, 120); vorkAchter(ctx, st); const M = vorkTeken(ctx, st); vorkEnzymen(ctx, M);
  ctx.fillStyle = rgba(C.bgMicro, 0.65); ctx.fillRect(0, M.cy + 12, 958, 400); ctx.restore();
  ctx.fillStyle = rgba(C.line, 0.4); ctx.fillRect(959, 60, 2, 800);
  nb(ctx, 'A · de echte vork', 'onderste streng in stukjes, niet benoemd', 480, 110, 1, 'center', C.goud); nb(ctx, 'B · één streng in focus', 'onderste streng gedimd', 1440, 110, 1, 'center', C.goud);
  nb(ctx, 'oude streng', null, 60, 380, 1, 'left', C.kernR); nb(ctx, 'nieuwe streng', null, 60, 520, 1, 'left', D2.nieuwR);
  meta(ctx, 'schematisch · niet op schaal', W - 70, 860, 'right');
  sub(ctx, 'Zo groeit langs elke oude streng een nieuwe streng.');
};

// 6–10 · vwo: de replicatievork in vijf opeenvolgende momenten (zelfde model, alleen f en t veranderen)
const VST = { i0: 0, i1: 110, X0: 80, cy: 430, g: 50, dx: 15, Dmax: 185, Lsplit: 9, Ltw: 10, Lf: 26, pl: 4, p1: 30, lead: 4, startLead: 0, vlag: 1.4 };
function vorkFrame(ctx, f, t, kop, zin, labels) { mic(ctx); vwo(ctx); const st = Object.assign({}, VST, { f, t });
  const M = vork(ctx, st, { hl: labels.hl || {} });
  labels.fn && labels.fn(M);
  meta(ctx, kop, 70, 120, 'left', C.grain); meta(ctx, 'schematisch · fragmenten korter dan echt', W - 70, 860, 'right');
  // 5'/3' bij de uiteinden
  const e = (s, x, y) => text(ctx, s, x, y, fTekst(34, 700), C.text2, 'center');
  e("3'", 40, M.yT(M.i0) + 12); e("5'", 40, M.yB(M.i0) + 12); e("5'", M.X(M.i1) + 30, M.cy - 12); e("3'", M.X(M.i1) + 30, M.cy + 36);
  sub(ctx, zin); return M; }
KF['06-vork-1-primers'] = (ctx) => vorkFrame(ctx, 36, 0.1, 'moment 1 · start', "Primase legt een kort RNA-startstukje: een primer.", { fn: (M) => {
  if (M.E.primase) nb(ctx, 'primase', 'maakt de primer', M.E.primase[0], M.E.primase[1] + 70, 1, 'center');
  nb(ctx, 'primer', 'kort stukje rna', M.X(M.startLead + 2), M.yTn(2) + 70, 1, 'center', D2.rnaR);
  if (M.E.helicase) nb(ctx, 'helicase', null, M.E.helicase[0] + 40, M.E.helicase[1] - 50, 1, 'left'); } });
KF['07-vork-2-leidend'] = (ctx) => vorkFrame(ctx, 58, 0.4, 'moment 2 · leidende streng groeit met de vork mee', "Langs de ene streng bouwt het enzym met de vork mee: de leidende streng.", { hl: { poly: 1 }, fn: (M) => {
  nb(ctx, 'leidende streng', "groeit van 5' naar 3', met de vork mee", M.X(22), M.yTn(22) + 64, 1, 'center', C.goud);
  if (M.E.polyLead) pijl(ctx, M.E.polyLead[0] + 40, M.E.polyLead[1] + 120, M.E.polyLead[0] + 170, M.E.polyLead[1] + 120, C.goud, 1, 3, 14);
  if (M.E.polyLag) nb(ctx, 'DNA-polymerase', null, M.E.polyLag[0], M.E.polyLag[1] + 100, 1, 'center'); } });
KF['08-vork-3-terug'] = (ctx) => vorkFrame(ctx, 76, 0.7, 'moment 3 · volgende streng: steeds een stukje terug', "Langs de andere streng bouwt het enzym van de vork af, steeds een stukje terug.", { hl: { poly: 1 }, fn: (M) => {
  if (M.E.polyLag) pijl(ctx, M.E.polyLag[0] - 30, M.E.polyLag[1] - 110, M.E.polyLag[0] - 170, M.E.polyLag[1] - 110, C.goud, 1, 3, 14);
  nb(ctx, "van de vork af: 5' → 3'", null, M.E.polyLag ? M.E.polyLag[0] - 100 : 600, M.E.polyLag ? M.E.polyLag[1] - 140 : 300, 1, 'center', C.goud); } });
KF['09-vork-4-okazaki'] = (ctx) => vorkFrame(ctx, 87, 1.0, 'moment 4 · nieuwe primer, nieuw fragment', "Die korte stukken heten Okazaki-fragmenten.", { fn: (M) => {
  M.frags.filter(F => F.primN > 0).slice(0, 3).forEach((F, k) => { const a = M.X(F.q), b = M.X(F.p); haakKort(ctx, a, b, M.yBn((F.q + F.p) / 2) - 40, C.goud); });
  nb(ctx, 'Okazaki-fragmenten', '100 tot 200 nucleotiden per stuk', M.X(40), M.yBn(40) - 100, 1, 'center', C.goud);
  if (M.E.primase) nb(ctx, 'primase', null, M.E.primase[0] + 40, M.E.primase[1] + 60, 1, 'left'); } });
KF['10-vork-5-ligase'] = (ctx) => vorkFrame(ctx, 107, 1.3, 'moment 5 · primer vervangen, ligase dicht de naad', "Ligase plakt de stukken aan elkaar. Dat is de volgende streng.", { hl: { ligase: 1 }, fn: (M) => {
  if (M.E.ligase) nb(ctx, 'ligase', 'plakt de stukken', M.E.ligase[0], M.E.ligase[1] + 70, 1, 'center');
  nb(ctx, 'volgende streng', 'in stukken, van de vork af', M.X(18), M.yBn(18) - 60, 1, 'center', C.goud);
  nb(ctx, 'leidende streng', null, M.X(18), M.yTn(18) + 70, 1, 'center', C.text); } });
function haakKort(ctx, x1, x2, y, kl) { ctx.save(); ctx.strokeStyle = kl; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1 + 3, y + 10); ctx.lineTo(x1 + 3, y); ctx.lineTo(x2 - 3, y); ctx.lineTo(x2 - 3, y + 10); ctx.stroke(); ctx.restore(); }

// 11 · Tienduizenden startpunten: simulatie langs een stuk chromosoom (startpunten vuren op willekeurige momenten)
function startSim(ctx, x0, x1, y, tau, o = {}) { const { n = 26, v = 0.06, seed = 3, h = 30 } = o; // tau = tijd (0..1 van de S-fase); v = vorksnelheid in fractie per tijd
  const O = []; for (let k = 0; k < n; k++) O.push({ p: (k + 0.2 + 0.6 * hash(seed + k)) / n, t0: hash(seed * 7 + k) * 0.75 });
  // gekopieerd interval = vereniging van [p - v(t - t0), p + v(t - t0)]
  const iv = O.filter(q => tau > q.t0).map(q => [Math.max(0, q.p - v * (tau - q.t0) * 6), Math.min(1, q.p + v * (tau - q.t0) * 6)]).sort((a, b) => a[0] - b[0]);
  const U = []; iv.forEach(I => { if (U.length && I[0] <= U[U.length - 1][1]) U[U.length - 1][1] = Math.max(U[U.length - 1][1], I[1]); else U.push(I.slice()); });
  const X = (u) => x0 + (x1 - x0) * u; let gedaan = 0;
  ctx.save(); ctx.lineCap = 'round';
  // ongekopieerd: één dubbele lijn; gekopieerd: bubbel (twee dochters boven/onder)
  ctx.strokeStyle = D2.oud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  U.forEach(([a, b]) => { gedaan += b - a; const xa = X(a), xb = X(b), r = Math.min(14, (xb - xa) / 2);
    ctx.fillStyle = C.bgMicro; ctx.fillRect(xa + 2, y - 6, xb - xa - 4, 12);
    [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(xa, y); ctx.quadraticCurveTo(xa + r, y + s * h, xa + r * 2, y + s * h); ctx.lineTo(xb - r * 2, y + s * h); ctx.quadraticCurveTo(xb - r, y + s * h, xb, y);
      ctx.strokeStyle = D2.oud; ctx.lineWidth = 8; ctx.stroke(); ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 3; ctx.stroke(); }); });
  O.forEach(q => { const aan = tau > q.t0; _bioCirc(ctx, X(q.p), y, aan ? 6 : 5, aan ? C.goud : 'transparent', aan ? null : rgba(C.grain, 0.6), 1.5); });
  ctx.restore(); return { frac: gedaan, n: O.filter(q => tau > q.t0).length }; }
KF['11-startpunten'] = (ctx) => { mic(ctx);
  [[0.18, 190], [0.45, 400], [0.8, 610]].forEach(([tau, y], k) => { const R = startSim(ctx, 120, 1460, y, tau, { seed: 5 });
    metaText(ctx, ['na 1 uur', 'na 3 uur', 'na 6 uur'][k], 120, y - 60, C.text, 'left', 28); metaText(ctx, Math.round(R.frac * 100) + ' % gekopieerd', 1800, y + 10, C.grain, 'right', 28); });
  nb(ctx, 'startpunt', null, 1240, 760, 1, 'center', C.goud); _bioCirc(ctx, 1150, 750, 6, C.goud);
  meta(ctx, 'stukje van één chromosoom · niet op schaal', W - 70, 860, 'right');
  sub(ctx, 'Daarom begint het kopiëren op tienduizenden plekken in het DNA.');
};

// 12 · Telomeer: uiteinden van een chromosoom naast een veter (tweede keuze: wordt bij elke deling korter)
KF['12-telomeer'] = (ctx) => { mic(ctx);
  chromatideX(ctx, 560, 470, 560, 0.0, {});
  const tip = [[466, 262], [654, 262], [466, 812], [654, 812]];
  tip.forEach(([x, y]) => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 30, 0, 6.283); ctx.stroke(); });
  nb(ctx, 'telomeren', 'herhaald, niet-coderend dna', 760, 270, 1, 'left', C.goud);
  // veter met plastic uiteinde (Schema-kaartje)
  roundRect(ctx, 1140, 330, 620, 300, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
  ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1190, 520); ctx.bezierCurveTo(1300, 380, 1430, 600, 1560, 470); ctx.stroke();
  ctx.save(); ctx.translate(1600, 455); ctx.rotate(-0.35); roundRect(ctx, -40, -11, 90, 22, 9); shape(ctx, '#AFC0D0', '#D8E2EC', 1.5); ctx.restore();
  text(ctx, 'zoals het plastic uiteinde van een veter', 1450, 590, fTekst(32, 600), C.text, 'center');
  // tweede regel: korter bij elke deling
  [1, 0.8, 0.6].forEach((k, i) => { const x = 1220 + i * 190, y = 760; ctx.strokeStyle = D2.oud; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 140, y); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x + 140, y); ctx.lineTo(x + 140 + 30 * k, y); ctx.stroke(); });
  meta(ctx, 'bij elke deling iets korter', 1450, 820, 'center', C.grain);
  sub(ctx, 'Aan de uiteinden van elk chromosoom zit een stuk dat niet codeert: de telomeer.');
};

// 13 · Meselson en Stahl (Schema): buizen met banden, berekend uit het model 'semiconservatief'
function buis(ctx, x, y, h, banden, lab, a = 1) { ctx.save(); ctx.globalAlpha *= a; const w = 90;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x - w / 2, y + h - w / 2); ctx.arc(x, y + h - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(x - w / 2, y + 30, w, h); ctx.restore();
  banden.forEach(([pos, kl, s]) => { const by = y + 60 + pos * (h - 140); roundRect(ctx, x - w / 2 + 8, by - 7 * s, w - 16, 14 * s, 6); ctx.fillStyle = kl; ctx.fill(); });
  text(ctx, lab, x, y + h + 50, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
function molecuul(ctx, x, y, a, b) { [a, b].forEach((kl, k) => { ctx.strokeStyle = kl; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + k * 18, y); ctx.lineTo(x + k * 18, y + 90); ctx.stroke(); }); }
KF['13-meselson-stahl'] = (ctx) => { sch(ctx); vwo(ctx);
  const Z = '#4F3F86', Li = '#C9BEEB', HL = '#8C7BBF';
  text(ctx, 'Meselson en Stahl, 1958', 120, 150, fTitel(56), C.text, 'left');
  buis(ctx, 360, 230, 420, [[0.85, Z, 1]], 'start: zwaar'); buis(ctx, 760, 230, 420, [[0.5, HL, 1]], 'na 1 ronde'); buis(ctx, 1160, 230, 420, [[0.5, HL, 1], [0.15, Li, 1]], 'na 2 rondes');
  // markering zwaar / licht
  [['licht', 0.15], ['tussenin', 0.5], ['zwaar', 0.85]].forEach(([s, p]) => { const by = 230 + 60 + p * 280; ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(300, by); ctx.lineTo(1230, by); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, s, 1250, by + 9, C.text2, 'left', 26); });
  // moleculen per ronde
  molecuul(ctx, 1500, 280, Z, Z); text(ctx, 'zwaar + zwaar', 1600, 340, fTekst(30, 600), C.text, 'left');
  molecuul(ctx, 1500, 430, Z, Li); text(ctx, 'oud zwaar + nieuw licht', 1600, 490, fTekst(30, 600), C.text, 'left');
  molecuul(ctx, 1500, 580, Li, Li); text(ctx, 'licht + licht', 1600, 640, fTekst(30, 600), C.text, 'left');
  haak(ctx, 620, 1300, 770, 'half oud, half nieuw: semiconservatief', C.groen, 1);
  sub(ctx, 'Na een tweede ronde zie je twee banden: half zwaar en helemaal licht.');
};

// 14 · vwo, twijfelscène: replicatie naast transcriptie (voorstel: alleen deze twee, reverse transcriptase weg)
KF['14-replicatie-transcriptie'] = (ctx) => { sch(ctx); vwo(ctx);
  [[120, 'replicatie', 'DNA-polymerase', 'al het DNA, één keer per celcyclus'], [1000, 'transcriptie', 'RNA-polymerase', 'één gen, zo vaak als nodig']].forEach(([x, kop, enz, m], k) => {
    roundRect(ctx, x, 200, 800, 560, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5);
    text(ctx, kop, x + 400, 270, fTitel(56), C.text, 'center'); metaText(ctx, m, x + 400, 320, C.grain, 'center', 26);
    ctx.save(); ctx.beginPath(); roundRect(ctx, x + 10, 340, 780, 410, 12); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(x, 340, 800, 420);
    if (k === 0) vork(ctx, { f: 40, i0: 0, i1: 56, X0: x + 30, cy: 540, g: 34, dx: 13, Dmax: 110, Lsplit: 8, Ltw: 8, Lf: 18, pl: 3, p1: 16, lead: 3, t: 0.3, toon: { primase: 0, ligase: 0 } });
    else { const y = 520; dnaDraad(ctx, [[x + 20, y], [x + 780, y]], { w: 30, helix: true }); ctx.fillStyle = rgba(C.goud, 0.18); ctx.fillRect(x + 220, y - 30, 360, 60); metaText(ctx, 'één gen', x + 400, y - 48, C.goud, 'center', 26);
      const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([x + 480 - u * 300, y + 70 + Math.sin(u * 8) * 26 + u * 90]); }
      ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      enzymKluwen(ctx, x + 500, y + 10, 48, { col: '#7A8BA8' }); nb(ctx, 'mRNA', null, x + 150, y + 190, 1, 'left', C.teal); }
    ctx.restore(); nb(ctx, enz, null, x + 400, 720, 1, 'center'); });
  sub(ctx, 'DNA-polymerase kopieert al het DNA. RNA-polymerase schrijft één gen over naar RNA.');
};

// =====================================================================================
// METHYLGROEP op de promotor — variant B (verbeterronde 2): INGEZOOMD OP ÉÉN CG. Kamiel (ronde 1): 'andere opbouw qua kleuren
// en de nucleotiden moeten simpeler.' Daarom maar vier baseparen (A–T, C–G, G–C, T–A), groot, met de puzzelrand uit de
// beeldafspraak (C nok ↔ G sleuf, A punt ↔ T inkeping), maar in vier duidelijk verschillende tinten in plaats van vier paarstinten:
// C teal, G groen, A licht grijsblauw, T donker grijsblauw. Alleen de rails zijn paars (DNA, C1). De methylgroep is een koraal
// kogelmodelletje (C met drie H) op elke C: twee per CG, één op elke streng.
// Recept (Jeltsch e.a. 2018, Genes 9:566; Reactome R-HSA-5334151):
//  - DNA-methylering = CH3 op de C van een CG-paar (CpG) in de promotor; CpG is palindromisch, dus beide strengen hebben een C.
//  - een gemethyleerde promotor blijft meestal uit: methylering kan de binding van transcriptiefactoren verhinderen (o.tf: de
//    factor komt aan, stuit op de kopjes en drijft weg); zonder CH3 landt hij en licht het gen op (groen pijlblok).
//  - bij de deling (o.deling 0..1): strengen uit elkaar, elke dochter één oude streng mét CH3 en één nieuwe (lichte rail) zonder;
//    het onderhoudsenzym (DNMT1, voorkeur voor half gemethyleerde CG's) zet daarna een CH3 tegenover de oude (gouden flits).
// Bekende fouten: CH3 op een A of T; maar één CH3 per CG; methylgroepen die bij de deling verdwijnen.
// Aanroep (zelfde als ronde 1): methylgroep(ctx, x, y, s, {a, m, tf, deling, slot, t}); (x, y) = midden van het stukje DNA;
// s = schaal (± 820 × 280 px bij s = 1, met deling ± 820 × 640). o.m 0..1, o.tf 0..1, o.deling 0..1; o.slot wordt genegeerd.
// Geeft {sites: [[x, y] …], tf, dochters} terug. Vereist basePuzzelPad, DNA_BASE, _grKralen (lib_bio.js).
// =====================================================================================
// ronde 3: alleen de DNA-kleuren omgezet naar palet B (zelfde basen als de DNA-ladder); verder ongewijzigd
const MG2 = { C: DNA_BASE.base.C, G: DNA_BASE.base.G, A: DNA_BASE.base.A, T: DNA_BASE.base.T, ch3: '#E07A5F', oud: D2.oud, nieuw: D2.nieuw, tf: '#6F9A86' };
function _mgCH3(ctx, x, y, r, a = 1) { // methylgroep: koraal koolstof met drie witte waterstofjes (kogelmodel), wijst omhoog
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(MG2.ch3, 0.3); ctx.lineWidth = Math.max(1, r * 0.22);
  [-2.25, -Math.PI / 2, -0.89].forEach(q => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(q) * r * 1.35, y + Math.sin(q) * r * 1.35); ctx.stroke(); });
  [-2.25, -Math.PI / 2, -0.89].forEach(q => { ctx.beginPath(); ctx.arc(x + Math.cos(q) * r * 1.4, y + Math.sin(q) * r * 1.4, r * 0.5, 0, 6.283); shape(ctx, '#E9EBEF', null); });
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, MG2.ch3, lighten(MG2.ch3, 0.35), Math.max(1, r * 0.12)); ctx.restore(); }
function _mgDuo(ctx, x0, y, dx, half, s, o) { // vier baseparen met puzzelrand; o.mB / o.mO = CH3 boven / onder (0..1), o.bovenA/onderA, o.kleurB/kleurO
  const seq = 'ACGT', comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, k = half / (DNA_BASE.len + 2), { bovenA = 1, onderA = 1, mB = 0, mO = 0, kleurB = MG2.oud, kleurO = MG2.oud } = o, sites = [];
  const base = (x, b, dir, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y - dir * half); ctx.scale(1.25, dir); basePuzzelPad(ctx, b, k); shape(ctx, MG2[b], null); ctx.restore();
    if (s > 0.2) { ctx.save(); ctx.globalAlpha *= al; text(ctx, b, x, y - dir * half * 0.5 + 11 * s, fTekst(32 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); } };
  for (let i = 0; i < 4; i++) { const x = x0 + i * dx; base(x, seq[i], 1, bovenA); base(x, comp[seq[i]], -1, onderA); }
  ctx.lineCap = 'round'; [[-1, bovenA, kleurB], [1, onderA, kleurO]].forEach(([q, al, kl]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = kl; ctx.lineWidth = Math.max(2, 12 * s); ctx.beginPath(); ctx.moveTo(x0 - dx * 0.7, y + q * half); ctx.lineTo(x0 + 3.7 * dx, y + q * half); ctx.stroke(); ctx.restore(); });
  const r = 15 * s; _mgCH3(ctx, x0 + dx, y - half - 2 * s, r, mB * bovenA); sites.push([x0 + dx, y - half]);
  ctx.save(); ctx.translate(x0 + 2 * dx, y + half + 2 * s); ctx.scale(1, -1); _mgCH3(ctx, 0, 0, r, mO * onderA); ctx.restore(); sites.push([x0 + 2 * dx, y + half]);
  return sites; }
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, t = 0 } = o; if (a <= 0.01) return {};
  const dx = 140 * s, half = 104 * s, x0 = x - 1.5 * dx - 60 * s, uit = { sites: [] };
  const m1 = ease(clamp(m * 2, 0, 1)), m2 = ease(clamp(m * 2 - 1, 0, 1));
  ctx.save(); ctx.globalAlpha *= a;
  if (deling <= 0.001) {
    const xe = x0 + 3.7 * dx, aan = m < 0.05 ? ease(clamp((tf - 0.55) / 0.3, 0, 1)) : 0;
    ctx.strokeStyle = rgba(MG2.oud, 0.6); ctx.lineWidth = Math.max(1.5, 6 * s); ctx.lineCap = 'round'; ctx.beginPath(); [-1, 1].forEach(q => { ctx.moveTo(xe, y + q * half); ctx.lineTo(xe + 60 * s, y + q * 46 * s); ctx.lineTo(xe + 190 * s, y + q * 46 * s); }); ctx.stroke(); // het DNA loopt door in het gen
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * aan; ctx.beginPath(); ctx.moveTo(xe + 20 * s, y - 40 * s); ctx.lineTo(xe + 120 * s, y - 40 * s); ctx.lineTo(xe + 165 * s, y); ctx.lineTo(xe + 120 * s, y + 40 * s); ctx.lineTo(xe + 20 * s, y + 40 * s); ctx.closePath();
    shape(ctx, aan > 0.5 ? C.groen : rgba(C.groen, 0.25), C.groen, Math.max(1, 2.5 * s)); ctx.restore();
    uit.sites = _mgDuo(ctx, x0, y, dx, half, s, { mB: m1, mO: m2 });
    if (tf > 0.01) { const blok = m > 0.5, aanv = ease(clamp(tf / 0.55, 0, 1)), weg = blok ? ease(clamp((tf - 0.6) / 0.4, 0, 1)) : 0;
      const doelY = blok ? y - half - 118 * s : y - half - 66 * s, tx = x0 + 1.5 * dx + weg * 260 * s, ty = lerp(y - 420 * s, doelY, aanv) - weg * 110 * s, rot = weg * 0.5;
      const vorm = (qx, qy) => { const ex = qx / 150, ey = (qy + 6) / 58; return ex * ex + ey * ey < 1 || (qy > 30 && qy < 70 && Math.abs(Math.abs(qx) - 70) < 26); };
      _grKralen(ctx, tx, ty, vorm, { r: 15, sc: s, col: MG2.tf, seed: 6, rot, bbox: [-152, -66, 152, 72], key: 'mgB_tf' }); uit.tf = [tx, ty];
      if (blok && tf > 0.5 && tf < 0.8) { ctx.save(); ctx.globalAlpha *= Math.sin((tf - 0.5) / 0.3 * Math.PI); ctx.strokeStyle = C.koraal; ctx.lineWidth = Math.max(1.2, 4 * s);
        const cx = x0 + dx, cy = y - half - 54 * s; for (let j = -1; j <= 1; j++) { ctx.beginPath(); ctx.moveTo(cx + 40 * s + j * 14 * s, cy - 4 * s); ctx.lineTo(cx + 40 * s + j * 22 * s, cy - 22 * s); ctx.stroke(); } ctx.restore(); } }
  } else {
    const d1 = ease(clamp(deling / 0.3, 0, 1)), d2 = ease(clamp((deling - 0.3) / 0.25, 0, 1)), d3 = ease(clamp((deling - 0.65) / 0.3, 0, 1)), sep = d1 * 170 * s;
    const yA = y - sep, yB = y + sep; uit.dochters = [[x, yA], [x, yB]];
    uit.sites = _mgDuo(ctx, x0, yA, dx, half * 0.8, s, { mB: m1, mO: d3, onderA: d2, kleurO: MG2.nieuw }).concat(_mgDuo(ctx, x0, yB, dx, half * 0.8, s, { mB: d3, mO: m2, bovenA: d2, kleurB: MG2.nieuw }));
    if (d3 > 0.05 && d3 < 0.95) { ctx.save(); ctx.globalAlpha *= Math.sin(d3 * Math.PI); ctx.fillStyle = rgba(C.goud, 0.35); [[x0 + 2 * dx, yA + half * 0.8], [x0 + dx, yB - half * 0.8]].forEach(([qx, qy]) => { ctx.beginPath(); ctx.arc(qx, qy, 34 * s, 0, 6.283); ctx.fill(); }); ctx.restore(); }
  }
  ctx.restore(); return uit;
}

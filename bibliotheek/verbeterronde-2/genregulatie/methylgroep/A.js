// =====================================================================================
// METHYLGROEP op de promotor — variant A (verbeterronde 2): ALLEEN DE CG'S TELLEN. Kamiel (ronde 1): 'andere opbouw qua
// kleuren en de nucleotiden moeten simpeler.' Daarom: een platte ladder van 11 baseparen waarin alleen de CG-paren kleur en een
// letter hebben (C teal, G groen); de A–T-paren zijn rustige grijze sporten zonder letter. De basen zijn rechte staafjes zonder
// puzzelrand. Geen paars behalve de twee DNA-rails (DNA, C1). De methylgroep is een koraal kopje (CH3) op de C.
// Recept (Jeltsch e.a. 2018, Genes 9:566; Reactome R-HSA-5334151):
//  - DNA-methylering = een methylgroep (CH3) op de C van een CG-paar (CpG) in de promotor. CpG's zijn palindromisch: tegenover
//    5'-CG-3' staat 3'-GC-5', dus op beide strengen zit een C die gemethyleerd wordt.
//  - een gemethyleerde promotor blijft meestal uit: methylering kan de binding van transcriptiefactoren verhinderen (o.tf: de
//    factor komt aan, stuit op de kopjes en drijft weg); zonder methylgroepen landt hij en licht het gen op (groen pijlblok).
//  - bij de deling (o.deling 0..1) gaan de strengen uit elkaar; elke dochter krijgt één oude streng mét CH3 en één nieuwe
//    (lichte rail) zonder: half gemethyleerd. Het onderhoudsenzym (DNMT1, kleine grijsblauwe kralenketen) zet daarna tegenover
//    elke oude CH3 een nieuwe CH3 (voorkeur voor half gemethyleerde CG's), zodat beide dochters het patroon houden.
// Bekende fouten: CH3 op een A of T; methylgroepen die bij de deling verdwijnen; een zwaar kader om het DNA.
// Aanroep (zelfde als ronde 1): methylgroep(ctx, x, y, s, {a, m, tf, deling, slot, t}); (x, y) = midden van het stuk promotor;
// s = schaal (± 820 × 260 px bij s = 1, met deling ± 820 × 600). o.m 0..1 (kopjes verschijnen één voor één), o.tf 0..1,
// o.deling 0..1, o.slot wordt genegeerd (geen metafoor). Geeft {sites: [[x, y] …], tf, dochters} terug.
// Vereist _grKralen (lib_bio.js).
// =====================================================================================
const MG2 = { C: '#5BA4C9', G: '#7FC48F', AT: '#56657E', ch3: '#E07A5F', oud: '#8C7BBF', nieuw: '#C9C0EC', tf: '#6F9A86' };
function _mgCH3(ctx, x, y, r, a = 1) { // methylgroep: koraal koolstof met drie witte waterstofjes (kogelmodel, klein)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [-2.2, -Math.PI / 2, -0.9].forEach(q => { ctx.beginPath(); ctx.arc(x + Math.cos(q) * r * 1.15, y + Math.sin(q) * r * 1.15, r * 0.48, 0, 6.283); shape(ctx, '#E9EBEF', null); });
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, MG2.ch3, lighten(MG2.ch3, 0.35), Math.max(1, r * 0.12)); ctx.restore(); }
function _mgLadder(ctx, x0, y, dx, seq, o) { // één dubbelstreng: boven = seq, onder = complement; o.boven/o.onder = 'oud'|'nieuw'|null, o.mB/o.mO = 0..1 per site
  const { s, half = 72 * s, bovenA = 1, onderA = 1, mB = [], mO = [], kleurB = MG2.oud, kleurO = MG2.oud } = o, n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, bw = 30 * s, gap = 3 * s, sites = [];
  const staaf = (x, y1, y2, b, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const isCG = b === 'C' || b === 'G', w = isCG ? bw : bw * 0.42, kl = isCG ? MG2[b] : MG2.AT;
    roundRect(ctx, x - w / 2, Math.min(y1, y2), w, Math.abs(y2 - y1), Math.min(w / 2, 6 * s)); shape(ctx, kl, null);
    if (isCG && s > 0.22) text(ctx, b, x, (y1 + y2) / 2 + 9 * s, fTekst(26 * s, 700), '#121A26', 'center'); ctx.restore(); };
  for (let i = 0; i < n; i++) { const x = x0 + i * dx; staaf(x, y - half, y - gap, seq[i], bovenA); staaf(x, y + half, y + gap, comp[seq[i]], onderA); }
  ctx.lineCap = 'round'; [[-1, bovenA, kleurB], [1, onderA, kleurO]].forEach(([k, al, kl]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = kl; ctx.lineWidth = Math.max(2, 9 * s); ctx.beginPath(); ctx.moveTo(x0 - dx * 0.6, y + k * half); ctx.lineTo(x0 + (n - 0.4) * dx, y + k * half); ctx.stroke(); ctx.restore(); });
  // CH3 op elke C van een CG: bovenstreng C op i, onderstreng C op i+1 (palindroom)
  let k = 0; for (let i = 0; i < n - 1; i++) if (seq[i] === 'C' && seq[i + 1] === 'G') { const xb = x0 + i * dx, xo = x0 + (i + 1) * dx, r = 11 * s;
    _mgCH3(ctx, xb, y - half + 4 * s, r, (mB[k] ?? 0) * bovenA); sites.push([xb, y - half]);
    ctx.save(); ctx.translate(xo, y + half - 4 * s); ctx.scale(1, -1); _mgCH3(ctx, 0, 0, r, (mO[k] ?? 0) * onderA); ctx.restore(); sites.push([xo, y + half]); k++; }
  return sites; }
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, t = 0 } = o; if (a <= 0.01) return {};
  const seq = 'ACGTCGATCGA', n = seq.length, dx = 70 * s, x0 = x - (n - 1) * dx / 2, nS = 3, uit = { sites: [] };
  const mk = (k) => ease(clamp(m * (nS + 1) - k, 0, 1)); // kopjes één voor één
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  if (deling <= 0.001) {
    // promotor: dunne gouden haak onder de ladder, met erachter het gen als pijlblok (licht op als de factor landt)
    const yb = y + 96 * s, xa = x0 - dx * 0.5, xe = x0 + (n - 0.5) * dx, aan = m < 0.05 ? ease(clamp((tf - 0.55) / 0.3, 0, 1)) : 0;
    ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 4 * s); ctx.beginPath(); ctx.moveTo(xa, yb - 12 * s); ctx.lineTo(xa, yb); ctx.lineTo(xe, yb); ctx.lineTo(xe, yb - 12 * s); ctx.stroke();
    ctx.strokeStyle = rgba(MG2.oud, 0.6); ctx.lineWidth = Math.max(1.5, 5 * s); ctx.beginPath(); [-1, 1].forEach(k => { ctx.moveTo(xe, y + k * 72 * s); ctx.lineTo(xe + 60 * s, y + k * 40 * s); ctx.lineTo(xe + 190 * s, y + k * 40 * s); }); ctx.stroke(); // het DNA loopt door in het gen
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * aan; ctx.beginPath(); ctx.moveTo(xe + 30 * s, y - 34 * s); ctx.lineTo(xe + 120 * s, y - 34 * s); ctx.lineTo(xe + 160 * s, y); ctx.lineTo(xe + 120 * s, y + 34 * s); ctx.lineTo(xe + 30 * s, y + 34 * s); ctx.closePath();
    shape(ctx, aan > 0.5 ? C.groen : rgba(C.groen, 0.25), C.groen, Math.max(1, 2.5 * s)); ctx.restore();
    const mm = [0, 1, 2].map(k => mk(k)); uit.sites = _mgLadder(ctx, x0, y, dx, seq, { s, mB: mm, mO: mm });
    // transcriptiefactor (kralenketen): zonder CH3 landt hij op de ladder; met CH3 stuit hij erop en drijft weg
    if (tf > 0.01) { const blok = m > 0.5, aanv = ease(clamp(tf / 0.55, 0, 1)), weg = blok ? ease(clamp((tf - 0.6) / 0.4, 0, 1)) : 0;
      const doelY = blok ? y - 72 * s - 92 * s : y - 72 * s - 62 * s, tx = x + 30 * s + weg * 260 * s, ty = lerp(y - 380 * s, doelY, aanv) - weg * 120 * s, rot = weg * 0.5;
      const vorm = (qx, qy) => { const ex = qx / 110, ey = (qy + 6) / 56; return ex * ex + ey * ey < 1 || (qy > 30 && qy < 66 && Math.abs(Math.abs(qx) - 70) < 22); };
      _grKralen(ctx, tx, ty, vorm, { r: 13, sc: s, col: MG2.tf, seed: 6, rot, bbox: [-112, -62, 112, 68], key: 'mgA_tf' });
      if (blok && tf > 0.5 && tf < 0.8) { ctx.save(); ctx.globalAlpha *= Math.sin((tf - 0.5) / 0.3 * Math.PI); ctx.strokeStyle = C.koraal; ctx.lineWidth = Math.max(1.2, 3 * s);
        [-1, 1].forEach(k => { const cx = x + 30 * s + k * 70 * s, cy = y - 92 * s; for (let j = -1; j <= 1; j++) { ctx.beginPath(); ctx.moveTo(cx + j * 10 * s, cy - 6 * s); ctx.lineTo(cx + j * 16 * s, cy - 18 * s); ctx.stroke(); } }); ctx.restore(); }
      uit.tf = [tx, ty]; }
  } else {
    // deling: strengen uit elkaar → nieuwe streng (lichte rail) wordt aangevuld → enzym zet CH3 tegenover de oude
    const d1 = ease(clamp(deling / 0.3, 0, 1)), d2 = ease(clamp((deling - 0.3) / 0.25, 0, 1)), d3 = clamp((deling - 0.6) / 0.35, 0, 1), sep = d1 * 170 * s;
    const mm = [0, 1, 2].map(k => mk(k)), nieuwM = [0, 1, 2].map(k => ease(clamp(d3 * 3.3 - k, 0, 1)));
    const yA = y - sep, yB = y + sep; uit.dochters = [[x, yA], [x, yB]];
    uit.sites = _mgLadder(ctx, x0, yA, dx, seq, { s, mB: mm, mO: nieuwM, onderA: d2, kleurO: MG2.nieuw }).concat(
      _mgLadder(ctx, x0, yB, dx, seq, { s, mB: nieuwM, mO: mm, bovenA: d2, kleurB: MG2.nieuw }));
    if (d3 > 0.01 && d3 < 0.99) { // onderhoudsenzym schuift over de nieuwe strengen
      const ex = lerp(x0 - dx * 0.4, x0 + (n - 0.6) * dx, d3), vorm = (qx, qy) => (qx / 40) ** 2 + (qy / 32) ** 2 < 1;
      _grKralen(ctx, ex, yA + 72 * s + 38 * s, vorm, { r: 9, sc: s, col: C.enzym, seed: 2, bbox: [-42, -34, 42, 34], key: 'mgA_enz' });
      _grKralen(ctx, ex, yB - 72 * s - 38 * s, vorm, { r: 9, sc: s, col: C.enzym, seed: 2, bbox: [-42, -34, 42, 34], key: 'mgA_enz' }); }
  }
  ctx.restore(); return uit;
}

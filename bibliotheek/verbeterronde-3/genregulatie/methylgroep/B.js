// =====================================================================================
// METHYLGROEP op de promotor — variant B 'alleen de CG's vol in beeld' (verbeterronde 3, 28 okt 2026).
// Kamiel (ronde 2): 'zorg dat je de kleuren van de nucleotiden overal hetzelfde doet' → de basen zijn precies de puzzelstaafjes
// van de DNA-ladder (dnaLadderHelix, ronde 2 B) in palet B: A rood, T geel, C lichtblauw, G donkerblauw, letter rechtop,
// ruggengraat grijs. Beoordelaar ronde 2 over de winnaar: 'maar één CG-paar en geen markering dat dit stuk de promotor is'.
// Recept (Jeltsch e.a. 2018, Genes 9:566; Reactome R-HSA-5334151; OpenStax Biology 2e § 16.3):
//  - een stukje DNA van tien baseparen: de eerste acht zijn de promotor (gouden haak onder het DNA), daarna begint het gen.
//  - aandacht naar de CG's: alle basen in hun vaste ladderkleur, maar de baseparen zonder CG staan gedimd (35 %) en zonder
//    letter; alleen de twee CG-paren zijn vol en dragen hun letters. Zo zie je in twee seconden: CH3 zit op de C van een CG.
//  - in de promotor twee CG-paren; een methylgroep (CH3: één groen bolletje op een kort steeltje, vanaf ± 20 px met drie witte waterstofjes) zit op de C, op beide
//    strengen (CpG is een palindroom: tegenover 5'-CG-3' staat ook een CG). Groen omdat rood/geel/blauw al de basen zijn.
//  - gemethyleerd (o.m = 1): de transcriptiefactor (grijsblauwe kralenketen) zakt naar de promotor, stuit op de CH3-kopjes en
//    drijft weg; het gen blijft grijs. Zonder CH3 landt hij op de promotor en gaat het gen aan: het pijlblok licht op en er
//    komt een dun teal mRNA uit.
//  - deling (o.deling 0..1): de strengen gaan uit elkaar; elke dochter krijgt één oude streng mét CH3 en een nieuwe (lichte
//    rail) zonder; daarna zet het onderhoudsenzym (DNMT1, voorkeur voor half gemethyleerde CG's) de CH3 tegenover de oude
//    (gouden flits).
// Bekende fouten: CH3 op een A, T of G; maar één CH3 per CG; methylgroepen die bij de deling verdwijnen; andere basekleuren
// dan in de ladder.
// Aanroep (zelfde als ronde 1/2): methylgroep(ctx, x, y, s, {a, m, tf, deling, slot, t}); (x, y) = midden van het stukje DNA;
// s = schaal (± 820 × 300 px bij s = 1, met deling ± 820 × 640). o.m 0..1 (eerst bovenste, dan onderste CH3), o.tf 0..1,
// o.deling 0..1; o.slot wordt genegeerd. Geeft {sites: [[x, y] …], tf, dochters} terug.
// Vereist DNA_BASE, D2, _kkKluwen (of _grKralen), _bioCirc, text, fTekst, lighten, rgba, ease, clamp, lerp, shape.
// =====================================================================================
const MG3B = { ch3: '#8CCB5E', h: '#EEF1F4', tf: '#7A8BA8', gen: '#A4B2CA', mrna: '#5BA4C9', seq: 'TACGATCGAT' };
function _mgPuzzelB(ctx, x, y0, y1, hw, b) { // = _dhPuzzel uit de DNA-ladder: staaf van voet y0 tot paarlijn y1
  const sg = Math.sign(y1 - y0) || 1, L = Math.abs(y1 - y0), d = Math.min(hw * 0.5, L * 0.18), tw = hw * 0.5;
  ctx.save(); ctx.translate(x, y0); ctx.scale(1, sg); ctx.beginPath(); ctx.moveTo(-hw, 0); ctx.lineTo(hw, 0);
  if (b === 'A') { ctx.lineTo(hw, L - d); ctx.lineTo(0, L + d); ctx.lineTo(-hw, L - d); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(hw, L + d); ctx.lineTo(0, L - d); ctx.lineTo(-hw, L + d); }
  else if (b === 'C') { ctx.lineTo(hw, L - d); ctx.lineTo(tw, L - d); ctx.lineTo(tw, L + d); ctx.lineTo(-tw, L + d); ctx.lineTo(-tw, L - d); ctx.lineTo(-hw, L - d); }
  else { ctx.lineTo(hw, L + d); ctx.lineTo(tw, L + d); ctx.lineTo(tw, L - d); ctx.lineTo(-tw, L - d); ctx.lineTo(-tw, L + d); ctx.lineTo(-hw, L + d); }
  ctx.closePath(); ctx.restore(); }
function _mgCH3B(ctx, x, y, r, dir, a = 1) { // dir −1 = wijst omhoog, +1 = omlaag
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(1, -dir); const q = [-2.3, -Math.PI / 2, -0.84];
  ctx.strokeStyle = lighten(MG3B.ch3, 0.3); ctx.lineWidth = Math.max(1, r * 0.3); ctx.beginPath(); ctx.moveTo(0, r * 0.9); ctx.lineTo(0, -r * 0.2); ctx.stroke(); if (r > 6) q.forEach(an => { ctx.beginPath(); ctx.moveTo(0, -r * 0.2); ctx.lineTo(Math.cos(an) * r * 1.4, -r * 0.2 + Math.sin(an) * r * 1.4); ctx.stroke(); });
  if (r > 6) q.forEach(an => { ctx.beginPath(); ctx.arc(Math.cos(an) * r * 1.45, -r * 0.2 + Math.sin(an) * r * 1.45, r * 0.48, 0, 6.283); shape(ctx, MG3B.h, null); });
  ctx.beginPath(); ctx.arc(0, -r * 0.2, r, 0, 6.283); shape(ctx, MG3B.ch3, lighten(MG3B.ch3, 0.35), Math.max(1, r * 0.12)); ctx.restore(); }
// één stukje ladder; o: bovenA/onderA (strengen zichtbaar), mB/mO (CH3 op de bovenste/onderste streng 0..1), kleurB/kleurO (rail)
function _mgLadderB(ctx, x0, y, dx, half, s, o) { const seq = MG3B.seq, comp = DNA_BASE.comp, { bovenA = 1, onderA = 1, mB = 0, mO = 0, kleurB = DNA_BASE.rugR, kleurO = DNA_BASE.rugR } = o;
  const hw = dx * 0.3, bw = Math.max(2, 9 * s), sites = [], letter = dx > 24;
  const cg = (i) => (seq[i] === 'C' && seq[i + 1] === 'G') || (seq[i] === 'G' && seq[i - 1] === 'C');
  for (let i = 0; i < seq.length; i++) { const x = x0 + i * dx, vol = cg(i); [[seq[i], -1, bovenA], [comp[seq[i]], 1, onderA]].forEach(([b, k, al]) => { if (al <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= al * (vol ? 1 : 0.35); _mgPuzzelB(ctx, x, y + k * (half - bw * 0.4), y, hw, b); ctx.fillStyle = DNA_BASE.base[b]; ctx.fill();
    if (letter && vol) text(ctx, b, x, y + k * half * 0.5 + 0.36 * dx * 0.45, fTekst(dx * 0.45, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); }); }
  ctx.lineCap = 'round'; [[-1, bovenA, kleurB], [1, onderA, kleurO]].forEach(([k, al, kl]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = kl; ctx.lineWidth = bw; ctx.beginPath(); ctx.moveTo(x0 - dx * 0.6, y + k * half); ctx.lineTo(x0 + (seq.length - 0.4) * dx, y + k * half); ctx.stroke(); ctx.restore(); });
  const r = Math.max(2, dx * 0.2);
  for (let i = 0; i < seq.length - 1; i++) if (seq[i] === 'C' && seq[i + 1] === 'G') { const xb = x0 + i * dx, xo = x0 + (i + 1) * dx;
    _mgCH3B(ctx, xb, y - half - bw * 0.5 - r * 1.3, r * 1.15, -1, mB * bovenA); _mgCH3B(ctx, xo, y + half + bw * 0.5 + r * 1.3, r * 1.15, 1, mO * onderA); sites.push([xb, y - half], [xo, y + half]); }
  return sites; }
function _mgGenB(ctx, x, y, s, aan, t) { // het gen: rails lopen door in een pijlblok; aan = licht + dun mRNA
  ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * aan; ctx.beginPath(); ctx.moveTo(x, y - 34 * s); ctx.lineTo(x + 120 * s, y - 34 * s); ctx.lineTo(x + 160 * s, y); ctx.lineTo(x + 120 * s, y + 34 * s); ctx.lineTo(x, y + 34 * s); ctx.closePath();
  shape(ctx, aan > 0.5 ? rgba(MG3B.gen, 0.85) : rgba(MG3B.gen, 0.18), MG3B.gen, Math.max(1, 2.5 * s)); ctx.restore();
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.strokeStyle = MG3B.mrna; ctx.lineWidth = Math.max(1.2, 4 * s); ctx.lineCap = 'round'; ctx.beginPath();
    for (let q = 0; q <= 30; q++) { const u = q / 30; const px = x + 40 * s + u * 110 * s, py = y - 50 * s - u * 70 * s + Math.sin(u * 9 + t) * 8 * s; q ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); } }
function _mgFactorB(ctx, x, y, s, rot) { const vorm = (qx, qy) => { const ex = qx / 120, ey = (qy + 4) / 52; return ex * ex + ey * ey < 1; };
  const kk = typeof _kkKluwen === 'function' ? _kkKluwen : _grKralen; kk(ctx, x, y, vorm, { r: 9, sc: s, col: MG3B.tf, seed: 6, rot, bbox: [-122, -58, 122, 50], key: 'mgB_tf' }); }
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, t = 0 } = o; if (a <= 0.01) return {};
  const dx = 62 * s, half = 78 * s, n = MG3B.seq.length, x0 = x - 410 * s + dx * 0.6, xe = x0 + (n - 0.4) * dx, uit = { sites: [] };
  const m1 = ease(clamp(m * 2, 0, 1)), m2 = ease(clamp(m * 2 - 1, 0, 1));
  ctx.save(); ctx.globalAlpha *= a;
  if (deling <= 0.001) {
    // promotor: zachte gouden band achter de eerste acht baseparen
    { const yh = y + half + 84 * s; ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 5 * s); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - dx * 0.4, yh - 16 * s); ctx.lineTo(x0 - dx * 0.4, yh); ctx.lineTo(x0 + dx * 7.4, yh); ctx.lineTo(x0 + dx * 7.4, yh - 16 * s); ctx.stroke(); }
    const aan = m < 0.05 ? ease(clamp((tf - 0.55) / 0.3, 0, 1)) : 0;
    ctx.strokeStyle = rgba(DNA_BASE.rugR, 0.7); ctx.lineWidth = Math.max(1.5, 6 * s); ctx.lineCap = 'round'; ctx.beginPath(); [-1, 1].forEach(k => { ctx.moveTo(xe, y + k * half); ctx.lineTo(xe + 50 * s, y + k * 40 * s); ctx.lineTo(xe + 70 * s, y + k * 40 * s); }); ctx.stroke();
    _mgGenB(ctx, xe + 60 * s, y, s, aan, t);
    uit.sites = _mgLadderB(ctx, x0, y, dx, half, s, { mB: m1, mO: m2 });
    if (tf > 0.01) { const blok = m > 0.5, aanv = ease(clamp(tf / 0.55, 0, 1)), weg = blok ? ease(clamp((tf - 0.6) / 0.4, 0, 1)) : 0;
      const doelY = blok ? y - half - 100 * s : y - half - 56 * s, tx = x0 + 3.5 * dx + weg * 240 * s, ty = lerp(y - 380 * s, doelY, aanv) - weg * 100 * s;
      _mgFactorB(ctx, tx, ty, s, weg * 0.5); uit.tf = [tx, ty];
      if (blok && tf > 0.5 && tf < 0.85) { ctx.save(); ctx.globalAlpha *= Math.sin((tf - 0.5) / 0.35 * Math.PI); ctx.strokeStyle = C.koraal || '#E07A5F'; ctx.lineWidth = Math.max(1.2, 4 * s); ctx.lineCap = 'round';
        [2, 6].forEach(i => { const cx = x0 + i * dx, cy = y - half - 44 * s; for (let j = -1; j <= 1; j++) { ctx.beginPath(); ctx.moveTo(cx + j * 12 * s, cy - 4 * s); ctx.lineTo(cx + j * 20 * s, cy - 20 * s); ctx.stroke(); } }); ctx.restore(); } }
  } else {
    const d1 = ease(clamp(deling / 0.3, 0, 1)), d2 = ease(clamp((deling - 0.3) / 0.25, 0, 1)), d3 = ease(clamp((deling - 0.65) / 0.3, 0, 1)), sep = d1 * 150 * s, hh = half * 0.8;
    const yA = y - sep, yB = y + sep; uit.dochters = [[x, yA], [x, yB]];
    uit.sites = _mgLadderB(ctx, x0, yA, dx, hh, s, { mB: m1, mO: d3, onderA: d2, kleurO: D2.nieuw }).concat(_mgLadderB(ctx, x0, yB, dx, hh, s, { mB: d3, mO: m2, bovenA: d2, kleurB: D2.nieuw }));
    if (d3 > 0.05 && d3 < 0.95) { ctx.save(); ctx.globalAlpha *= Math.sin(d3 * Math.PI); ctx.fillStyle = rgba(C.goud, 0.35);
      for (const i of [3, 7]) { ctx.beginPath(); ctx.arc(x0 + i * dx, yA + hh, 26 * s, 0, 6.283); ctx.fill(); } for (const i of [2, 6]) { ctx.beginPath(); ctx.arc(x0 + i * dx, yB - hh, 26 * s, 0, 6.283); ctx.fill(); } ctx.restore(); }
  }
  ctx.restore(); return uit;
}

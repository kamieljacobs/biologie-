// =====================================================================================
// METHYLGROEP op de promotor (basenniveau; ronde 2: gouden promotorvak om het stuk DNA). Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 7):
//  - DNA-methylering = een methylgroep (CH3: één koolstof met drie waterstofatomen) op de C van een CG-paar (CpG) in de
//    promotor; CpG's liggen gespiegeld, dus op beide strengen zit een C die gemethyleerd wordt. Het CH3 steekt uit in de grote
//    groef; hier als bolletje aan de zijkant van de C-base (koraal; C1: rem/uit) met drie witte H's.
//  - een gemethyleerde promotor wordt meestal niet afgelezen: de transcriptiefactor kan niet binden (o.tf: hij komt aan, stuit
//    op de methylgroepen en drijft weg; zonder methylering landt hij). Slotje (o.slot) is een optionele metafoor.
//  - bij de deling (o.deling 0..1) gaan de strengen uit elkaar; elke dochter heeft één oude streng mét methylgroepen en één nieuwe
//    zonder (half gemethyleerd); een enzym zet daarna op de nieuwe streng tegenover elke oude CH3 ook een CH3 (beide dochters
//    gemethyleerd; 'persist through multiple rounds of cell division', OpenStax).
// Bekende fouten: CH3 op een A of T; methylgroepen die bij de deling verdwijnen; methyl als losse stip zonder binding.
// (x, y) = midden van het stuk promotor; s = schaal (± 820 × 260 px bij s = 1, met deling ± 820 × 640). o.m 0..1 (groepen
// verschijnen één voor één), o.tf 0..1, o.deling 0..1, o.slot, o.t. Geeft {sites: [[x, y] …], tf, dochters} terug.
// =====================================================================================
//@@KLUWEN2
//@@METHYL
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, slot = false, t = 0, seq = 'ACGGTCGACGTA' } = o; if (a <= 0.01) return {};
  const n = seq.length, dx = 68 * s, k = 0.78 * s, H = (184 * k + 16 * s) / 2, x0 = x - (n - 1) * dx / 2, uit = { sites: [], dochters: [] };
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, cpg = []; for (let i = 0; i < n - 1; i++) if (seq[i] === 'C' && seq[i + 1] === 'G') cpg.push(i);
  const plekken = []; cpg.forEach(i => { plekken.push([i, 0]); plekken.push([i + 1, 1]); }); // [index, streng]: boven de C, onder de C tegenover de G
  ctx.save(); ctx.globalAlpha *= a;
  const ladder = (cy, sterkte, oudBoven, oudOnder, nieuwA, mOud, mNieuw) => { // sterkte = afstand tussen de rails / 2
    roundRect(ctx, x0 - 46 * s, cy - sterkte - 22 * s, (n - 1) * dx + 92 * s, sterkte * 2 + 44 * s, 18 * s); shape(ctx, rgba(C.goud, 0.12), rgba(C.goud, 0.75), 1.5 * Math.max(0.6, s)); // gouden promotorvak (ronde 2)
    const yT = cy - sterkte, yB = cy + sterkte, rail = (yy, oud, al) => { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = oud ? DNA_BASE.rugR : '#DCD4F5'; ctx.lineWidth = 15 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - 22 * s, yy); ctx.lineTo(x0 + (n - 1) * dx + 22 * s, yy); ctx.stroke(); ctx.strokeStyle = oud ? DNA_BASE.rug : '#B9ACE6'; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore(); };
    for (let i = 0; i < n; i++) { const xx = x0 + i * dx; baseRing(ctx, xx, yT + 8 * s, seq[i], 1, { s: k, a: oudBoven ? 1 : nieuwA, plekA: 0 }); baseRing(ctx, xx, yB - 8 * s, comp[seq[i]], -1, { s: k, a: oudOnder ? 1 : nieuwA, plekA: 0 }); }
    rail(yT, oudBoven, oudBoven ? 1 : nieuwA); rail(yB, oudOnder, oudOnder ? 1 : nieuwA);
    plekken.forEach(([i, str], q) => { const xx = x0 + i * dx + 22 * k, yy = str === 0 ? yT + 8 * s + DNA_BASE.len * k * 0.5 : yB - 8 * s - DNA_BASE.len * k * 0.5; const oud = str === 0 ? oudBoven : oudOnder;
      const mm = oud ? mOud(q) : mNieuw; if (mm > 0.01) { methylCH3(ctx, xx, yy + (1 - ease(mm)) * (str === 0 ? -60 : 60) * s, 8 * s, 0, Math.min(1, mm * 1.5)); } uit.sites.push([xx + 24 * s, yy]); }); };
  const mq = (q) => ease(clamp(m * plekken.length - q, 0, 1));
  if (deling < 0.01) { ladder(y, H, true, true, 1, mq, 0);
    if (slot && m > 0.5) _mgSlot(ctx, x0 - 70 * s, y - H - 30 * s, s, (m - 0.5) * 2);
    if (tf > 0.01) { const geblokt = m > 0.5, p = ease(tf), ty = geblokt ? y - H - 130 * s + Math.sin(p * Math.PI) * 50 * s - p * 30 * s : lerp(y - H - 220 * s, y - H - 46 * s, p), tx = x + (geblokt ? p * 60 * s : 0);
      _grKluwen(ctx, tx, ty, (qx, qy) => { const ex = qx / 70, ey = qy / 52; return ex * ex + ey * ey < 1 && !(qy > 30 && Math.abs(qx) < 24); }, { r: 6.5, sc: s, col: '#7A8BA8', seed: 3, bbox: [-72, -54, 72, 54], key: 'mgTF', a: Math.min(1, tf * 2) }); uit.tf = [tx, ty]; } }
  else { const d = ease(clamp(deling / 0.45, 0, 1)), nieuw = ease(clamp((deling - 0.4) / 0.25, 0, 1)), herstel = ease(clamp((deling - 0.7) / 0.3, 0, 1)), off = d * (H * 2 + 70 * s);
    // dochter 1: oude bovenstreng + nieuwe onderstreng; dochter 2: nieuwe bovenstreng + oude onderstreng
    ladder(y - off / 2 * 1.0 - 0, H, true, false, nieuw, mq, herstel); ladder(y + off / 2, H, false, true, nieuw, mq, herstel); uit.dochters = [[x, y - off / 2], [x, y + off / 2]]; }
  ctx.restore(); return uit;
}

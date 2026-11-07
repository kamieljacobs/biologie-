// ---------- RNA-POLYMERASE (verbeterronde 3 eiwitten, 28 okt 2026: kralenketen) ----------
// Achterkant (achter het DNA) = gevouwen kralenketen binnen dezelfde omtrek; onderkaak vóór het DNA = één rij kralen.
// Zelfde aanroep, plaats, grootte en ankerpunten als nu; alleen de eiwitten zijn een kralenketen (_kkKluwen/_kkPad/_kkHelix uit
// verbeterronde-2/eiwitten/_hulp.js), zoals Kamiel voor alle eiwitten koos (C9, BEELDAFSPRAKEN: keten van aminozuren die vouwt,
// geen vlakke vorm). Het receptcommentaar boven de functie in lib_bio.js blijft gelden; alleen deze functie vervangen.
function rnaPolymerase(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'lees', mrna = 0, t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s;
  const open = stand === 'bind' || stand === 'los' ? 0 : 1, los = stand === 'los' ? 1 : 0, rL = stand === 'lees' || stand === 'los' ? mrna : 0;
  ctx.save(); ctx.globalAlpha *= a;
  const ex = x - 0.3 * u, ey = y - los * 0.75 * u; // enzymmidden (tilt omhoog bij loslaten)
  // achterkant van het enzym (achter het DNA): grote kluwen met een kanaal
  const vy = 0.8, PA = [[-1.25, 0.1 * vy], [-1.05, -0.85 * vy], [-0.2, -1.15 * vy], [0.8, -0.95 * vy], [1.25, -0.25 * vy], [1.15, 0.7 * vy], [0.3, 1.0 * vy], [-0.8, 0.85 * vy]].map(([px, py]) => [px * 100, py * 100]);
  { ctx.beginPath(); bioPad(ctx, PA.map(([px, py]) => [ex + px * u / 100, ey + py * u / 100]), true); ctx.fillStyle = rgba('#3A4659', 0.75); ctx.fill(); // zachte achtergrond zodat de keten één eiwit blijft
    const V = _lintVorm(PA); ctx.save(); ctx.globalAlpha *= 0.7; _kkKluwen(ctx, ex, ey, V.binnen, { bbox: V.bbox, sc: u / 100, r: 9, col: '#56647C', seed: 3, key: 'rnapAchter' }); ctx.restore(); } // gedempt: het DNA ervoor blijft leesbaar
  const D = _rnapDNA(ctx, x, y, u, Object.assign({}, o, { open }));
  let p5 = null; if (los < 1) p5 = _rnapStrengen(ctx, D, y, u, rL, t); else { // los: DNA dicht, mRNA drijft weg
    const P = []; for (let q = 0; q <= 40; q++) { const f = q / 40; P.push([x - 0.6 * u - f * rL * 0.8, y - 0.9 * u - f * rL * 0.3 + Math.sin(f * 6 + t) * u * 0.08]); } ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, u * 0.04); ctx.stroke(); ctx.restore(); p5 = P[P.length - 1]; }
  // voorkant: alleen een onderkaak onder de matrijs (de bel blijft vrij zichtbaar; de klep boven de codestreng is weggelaten)
  { // onderkaak: één rij kralen vóór het DNA
    const kr = Math.max(2.5, u * 0.075); _kkPad(ctx, [[ex - 0.98 * u, ey + 0.66 * u], [ex - 0.3 * u, ey + 0.74 * u], [ex + 0.5 * u, ey + 0.72 * u], [ex + 0.95 * u, ey + 0.66 * u]], kr, '#8E9CB8'); }
  const act = [D.xb - D.dx * 1.5, y + D.R + 0.25 * u * open - D.R * 0.75 * 1.0]; if (open && !los) _bioCirc(ctx, act[0], act[1], Math.max(2.5, u * 0.05), rgba(C.goud, 0.85), C.goud, 1.5);
  ctx.restore(); return { actief: act, p5, bel: [D.xa, D.xb] };
}

// =====================================================================================
// LEVER (vooraanzicht). Recept: grootste klier (± 1,5 kg); grote rechterkwab (links op het scherm), smallere
// linkerkwab die over de maag reikt; scherpe onderrand, bolle bovenkant tegen het middenrif; sikkelvormig band
// tussen de kwabben, met onderaan de ronde leverband in een inkeping; galblaas steekt met zijn bodem net onder de
// onderrand van de rechterkwab uit. Rood-bruin. Bron: Gray's Anatomy; OpenStax A&P 2e 23.6; Kenhub 'Liver'.
// Bekende fout: bruine vlek; galblaas midden onder de lever als los peertje.
// v2 (beeldbank 27 okt 2026): omtrek = AN_LEVER uit personages/lib_anatomie.js (één bron, zelfde vorm als liver() in het
// lichaam), × 450 eenheden en verfijnd met dezelfde punten; geen losse glansovaal maar een lichtere strook langs de bolle
// bovenkant (middenrif); inkeping met de ronde leverband; geeft ankerpunten terug voor namen.
// o: a, gloed 0..1, gal (bool), hl = 'rechts'|'links'|'gal'. Oorsprong = midden, ± 400 × 230 eenheden.
// =====================================================================================
function leverVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, gloed = 0, gal = true, hl = null } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const anker = { rechts: P(-110, 0), links: P(130, -55), gal: P(-74, 112), band: P(24, -30), onderrand: P(-60, 80) };
  if (a <= 0.01) return anker;
  const AN = (typeof AN_LEVER !== 'undefined') ? AN_LEVER : [[-0.67, 2.3], [-0.4, 2.2], [-0.12, 2.23], [0.08, 2.27], [0.2, 2.32], [0.06, 2.42], [-0.1, 2.52], [-0.34, 2.67], [-0.58, 2.7], [-0.69, 2.55]];
  const V0 = AN.map(([u, v]) => [(u + 0.245) * 450, (v - 2.45) * 450]);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = BIO.leverL; ctx.shadowBlur = 40 * gloed; }
  ctx.beginPath(); bioPad(ctx, V0, true); shape(ctx, BIO.lever, BIO.leverL, 2.5); if (gloed > 0.01) ctx.restore();
  ctx.save(); ctx.beginPath(); bioPad(ctx, V0, true); ctx.clip();
  // lichtere strook langs de bolle bovenkant (tegen het middenrif): vlakke tint, geen verloop
  ctx.strokeStyle = _mixHex(BIO.lever, '#F2C0A8', 0.14); ctx.lineWidth = 44; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, V0.slice(0, 5), false); ctx.stroke();
  // scherpe onderrand: smalle donkere strook langs de onderkant
  ctx.strokeStyle = _mixHex(BIO.lever, '#1A1010', 0.15); ctx.lineWidth = 22; ctx.beginPath(); bioPad(ctx, V0.slice(5).concat([V0[0]]), false); ctx.stroke();
  if (hl === 'rechts' || hl === 'links') { ctx.fillStyle = rgba(C.goud, 0.28); ctx.beginPath(); hl === 'rechts' ? ctx.rect(-220, -140, 192, 300) : ctx.rect(-28, -140, 260, 300); ctx.fill(); }
  ctx.restore();
  // sikkelvormig band van het middenrif naar de inkeping met de ronde leverband
  ctx.strokeStyle = rgba(BIO.leverL, 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(30, -98); ctx.quadraticCurveTo(26, -20, 14, 52); ctx.stroke();
  ctx.fillStyle = C.bgSchema || '#1A2740'; ctx.beginPath(); ctx.moveTo(-2, 76); ctx.quadraticCurveTo(10, 50, 24, 56); ctx.lineTo(30, 60); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba('#E6D0C8', 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(14, 60); ctx.lineTo(10, 86); ctx.stroke(); // ronde leverband
  // galblaas: bodem steekt onder de onderrand van de rechterkwab uit
  if (gal) { ctx.beginPath(); bioPad(ctx, [[-86, 86], [-62, 80], [-56, 104], [-64, 124], [-82, 124], [-92, 106]], true); shape(ctx, BIO.gal, lighten(BIO.gal, 0.3), 1.5);
    if (hl === 'gal') { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } }
  ctx.restore(); return anker;
}

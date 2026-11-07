// ---------- DNA-POLYMERASE (variant A, beeldbank 27 okt 2026): één handsilhouet + klem als ring om het DNA ----------
// Recept (Doublié & Zahn 2014 Front Microbiol 5:444 'right hand … fingers, palm, and thumb'; OpenStax Biology 2e
// § 14.4; Ludmann & Marx 2016): de polymerase lijkt op een half gesloten rechterhand. De handpalm draagt het actieve centrum
// (goud) onder het 3'-uiteinde van de nieuwe streng; de duim ligt over het al gemaakte dubbelstrengs stuk; de vingers liggen
// boven de inkomende nucleotide en sluiten 15–20° als hij past (induced fit, 'sluit'). De schuifklem (sliding clamp, PCNA/β)
// is een ring die óm het DNA ligt, vlak achter de polymerase: achterste boog achter het DNA, voorste boog ervoor.
// Zijaanzicht als komvormige hand: palm onder de matrijs, duim links omhoog over het nieuwe stuk, vingers rechts omhoog en
// over de inkomende nucleotide gekruld; het DNA ligt in de kom (achterwand donker). Maten (model, eenheid g): kom 3 g breed, 3,3 g hoog; enzym in de tint van enzymKluwen (#7A8BA8), achterlaag donkerder.
// (x, y) = actief centrum op de DNA-as, g = halve maat (zoals v1, vork() geeft g·0,55), dir = bouwrichting, up = +1 nieuwe streng boven.
// polymeraseAchter vóór het DNA tekenen, polymeraseVoor erna. Bekende fouten: kan/pot met losse lobben (v2); klem als los hengsel.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
const _POLY = {
  wand: [[-1.35, -1.25], [-1.45, 0.9], [-0.9, 1.45], [0.6, 1.5], [1.5, 1.1], [1.55, -1.2], [0.2, -1.5]],
  palm: [[-1.45, -0.95], [-1.15, -1.55], [0.0, -1.78], [1.1, -1.6], [1.6, -1.0], [1.15, -1.1], [0.0, -1.18], [-1.05, -1.08]],
  duim: [[-1.5, -1.0], [-1.72, 0.1], [-1.5, 1.25], [-0.95, 1.62], [-0.38, 1.5], [-0.62, 1.2], [-1.08, 0.95], [-1.15, 0.0], [-1.1, -0.95]],
  vinger: (k) => [[0.0, 0.0], [-0.22, 0.6], [-0.22, 1.55], [-0.55, 2.2 - k * 0.12], [-0.95, 2.3 - k * 0.15], [-0.85, 2.0 - k * 0.12], [-0.42, 1.75], [0.12, 1.2], [0.25, 0.3]] };
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  ctx.beginPath(); bioPad(ctx, _POLY.wand.map(([px, py]) => [px * g, py * g]), true); shape(ctx, '#44536A', '#6F7E98', 1.5); // achterwand van de kom
  if (klem) { ctx.beginPath(); ctx.ellipse(-2.15 * g, 0, 0.32 * g, 1.15 * g, 0, -Math.PI * 0.5, Math.PI * 0.5); ctx.strokeStyle = '#56667F'; ctx.lineWidth = 0.28 * g; ctx.stroke(); }
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const vul = '#7A8BA8', rand = hl > 0.01 ? _mixHex('#A4B2CA', C.goud, hl) : '#A4B2CA', lw = hl > 0.01 ? 3 : 1.5, P = (L) => L.map(([px, py]) => [px * g, py * g]);
  // vingers (drie, waaier) rechts; draaien 18° naar de nucleotide als hij past
  const dicht = ease(sluit) * 0.31;
  for (let k = 2; k >= 0; k--) { ctx.save(); ctx.translate((1.3 - k * 0.12) * g, -1.0 * g); ctx.rotate(-0.08 + k * 0.07 + dicht);
    ctx.beginPath(); bioPad(ctx, P(_POLY.vinger(k)), true); shape(ctx, _mixHex(vul, '#121A26', k * 0.12), rand, lw); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, P(_POLY.palm), true); shape(ctx, vul, rand, lw);
  ctx.beginPath(); bioPad(ctx, P(_POLY.duim), true); shape(ctx, vul, rand, lw);
  ctx.strokeStyle = rgba('#A4B2CA', 0.5); ctx.lineWidth = 2; ctx.beginPath(); bioPad(ctx, P([[-0.9, -1.3], [0, -1.45], [0.9, -1.32]]), false); ctx.stroke(); // vouwnaad in de palm
  // actief centrum (goud) bij het 3'-uiteinde
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.4 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, lerp(0.28, 0.2, ease(sluit)) * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) { ctx.beginPath(); ctx.ellipse(-2.15 * g, 0, 0.32 * g, 1.15 * g, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.strokeStyle = vul; ctx.lineWidth = 0.28 * g; ctx.stroke(); }
  ctx.restore(); }

// =====================================================================================
// INJECTIESPUIT (3 ml) met naald voor een prik in de spier, zijaanzicht, op ware maat.
// Recept (mm): naald voor een intramusculaire prik bij een volwassene 25–38 mm lang (1–1,5 inch), 22–25 G
//  (CDC 'IM injection adult'); hier 25 mm en 23 G (0,6 mm dik), met schuin geslepen punt; het naaldaansluitstuk
//  (hub) van een 23 G-naald is blauw (kleurcode ISO 6009). Spuit 3 ml: cilinder ± 10 mm dik en ± 50 mm lang met
//  een schaalverdeling per 0,1 ml (1 ml ± 16 mm), vingersteun (± 22 mm breed), zuiger met rubber stop (donkergrijs,
//  2 ribbels) en een duimplaat. Verhoudingen zijn opgemeten aan productfoto's (≈). Vloeistof = vlak in teal.
//  Standen: o.vul 0 (leeg, zuiger helemaal in) … 1 (3 ml); bij indrukken schuift de rubber stop naar voren en
//  wordt de vloeistofkolom korter; o.druppel 0..1 = druppel aan de punt (lucht eruit, vóór de prik).
//  Bekende fouten: naald zo lang als de spuit; naald als dikke staaf; vloeistof áchter de rubber stop;
//  spuit groter dan de onderarm (een volwassen hand is ± 19 cm, de hele spuit met naald ± 13 cm).
// x, y = naaldpunt; s = px per mm; o.rot = hoek (0 = naald naar rechts, π/2 = naald omlaag); o.a, o.hl.
// Geeft { punt, cilinder, duim, naald } terug.
// =====================================================================================
function injectiespuit(ctx, x, y, s, o = {}) {
  const { a = 1, vul = 0.5, druppel = 0, rot = 0, kleur = C.teal, hl = 0, naald = 25 } = o;
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [x + (px * co - py * si) * s, y + (px * si + py * co) * s];
  const Ln = naald, xHub = -Ln, xCil0 = -Ln - 13, Lc = 50, xCil1 = xCil0 - Lc, ml = 16;
  const xStop = xCil0 - 3 - clamp(vul, 0, 1) * 3 * ml; // voorkant rubber stop
  const ret = { punt: P(0, 0), naald: P(-Ln / 2, 0), cilinder: P((xCil0 + xCil1) / 2, 0), duim: P(xStop - 62, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1.1, s * 0.16) / s, L = C.er, klein = s < 3;
  // naald (staal) met schuine punt
  ctx.fillStyle = '#C8D0DA'; ctx.beginPath(); ctx.moveTo(xHub, -0.3); ctx.lineTo(-1.6, -0.3); ctx.lineTo(0, 0.3); ctx.lineTo(xHub, 0.3); ctx.closePath(); ctx.fill();
  if (!klein) { ctx.strokeStyle = rgba('#FFFFFF', 0.5); ctx.lineWidth = 0.12; ctx.beginPath(); ctx.moveTo(xHub, -0.12); ctx.lineTo(-2, -0.12); ctx.stroke(); }
  // hub (blauw = 23 G) en luer-tip
  ctx.beginPath(); ctx.moveTo(xHub, -1.6); ctx.lineTo(xHub - 7, -3.0); ctx.lineTo(xHub - 7, 3.0); ctx.lineTo(xHub, 1.6); ctx.closePath(); shape(ctx, '#4E86B0', lighten('#4E86B0', 0.3), lw);
  ctx.beginPath(); ctx.rect(xHub - 9, -3.3, 2, 6.6); shape(ctx, '#3E6F95', lighten('#4E86B0', 0.3), lw);
  ctx.beginPath(); ctx.rect(xCil0 - 0.5, -1.4, xHub - 9 - xCil0 + 0.5, 2.8); shape(ctx, rgba(L, 0.2), L, lw);
  // cilinder
  const cil = () => { ctx.beginPath(); ctx.moveTo(xCil0, -2.5); ctx.lineTo(xCil0 + 0, -1.4); ctx.lineTo(xCil0 - 2.5, -5.2); ctx.lineTo(xCil1, -5.2); ctx.lineTo(xCil1, 5.2); ctx.lineTo(xCil0 - 2.5, 5.2); ctx.lineTo(xCil0, 1.4); ctx.closePath(); };
  cil(); ctx.fillStyle = rgba(L, 0.10); ctx.fill();
  // vloeistof tussen de punt van de cilinder en de rubber stop
  if (vul > 0.003) { ctx.save(); cil(); ctx.clip(); ctx.fillStyle = rgba(kleur, 0.5); ctx.fillRect(xStop, -4.6, xCil0 - xStop + 1, 9.2); ctx.restore(); }
  // zuigerstang (kruisprofiel: in zijaanzicht een plaat met middenrib) en duimplaat
  const xR = xStop - 6, xD = xStop - 62;
  ctx.beginPath(); ctx.rect(xD + 1.5, -3.6, xR - xD - 1.5, 7.2); shape(ctx, rgba(L, 0.16), L, lw);
  ctx.strokeStyle = L; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(xD + 1.5, 0); ctx.lineTo(xR, 0); ctx.stroke();
  roundRect(ctx, xD - 0.5, -6.5, 2.2, 13, 0.8); shape(ctx, rgba(L, 0.3), L, lw);
  // rubber stop met twee ribbels
  ctx.beginPath(); ctx.moveTo(xStop - 6, -4.5); ctx.lineTo(xStop - 1, -4.5); ctx.lineTo(xStop, -3.2); ctx.lineTo(xStop, 3.2); ctx.lineTo(xStop - 1, 4.5); ctx.lineTo(xStop - 6, 4.5); ctx.closePath(); shape(ctx, '#3B3F48', '#5A606C', lw);
  if (!klein) { ctx.strokeStyle = '#5A606C'; ctx.lineWidth = lw; for (const xx of [xStop - 2.2, xStop - 4.4]) { ctx.beginPath(); ctx.moveTo(xx, -4.5); ctx.lineTo(xx, 4.5); ctx.stroke(); } }
  // schaalverdeling (bovenkant), elke 0,1 ml; langer streepje per 0,5 ml
  if (!klein) { ctx.strokeStyle = rgba(L, 0.85); ctx.lineWidth = lw * 0.8; for (let k = 0; k <= 30; k++) { const xx = xCil0 - 3 - k * ml / 10; const lang = k % 5 === 0 ? 2.6 : 1.4; ctx.beginPath(); ctx.moveTo(xx, -5.2); ctx.lineTo(xx, -5.2 + lang); ctx.stroke(); } }
  cil(); ctx.strokeStyle = hl > 0.01 ? C.goud : L; ctx.lineWidth = hl > 0.01 ? lw * 2 : lw; ctx.stroke();
  // vingersteun
  roundRect(ctx, xCil1 - 2, -11, 2, 22, 0.8); shape(ctx, rgba(L, 0.3), L, lw);
  // druppel aan de punt
  if (druppel > 0.01) { const r = 0.9 * druppel; ctx.fillStyle = rgba(kleur, 0.8); ctx.beginPath(); ctx.arc(0.6, 0.6 + r, r, 0, 6.283); ctx.fill(); }
  ctx.restore(); return ret;
}

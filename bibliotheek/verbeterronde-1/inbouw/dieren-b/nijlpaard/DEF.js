// NIJLPAARD (uitknippop, HoefPop) — herstel 28 okt 2026 op de huidige versie (keuze 'gelijk'; vorm, kleuren, gang en gapen
// ongewijzigd). Fout die hersteld is: de voet toonde drie vage stipjes (in de voetkleur) in plaats van tenen. Een nijlpaard
// heeft vier tenen per voet, alle vier dragend (Animal Diversity Web, Hippopotamidae: 'all four toes of each foot are
// functional'; Wikipedia, Hippopotamidae: 'four toes on each foot'; San Diego Zoo factsheet: 'four functional toes with wide
// splay'). Van opzij: vier korte, ronde nagels naast elkaar aan de voorkant-onderkant van de brede voet, de achterste half
// verscholen, in een lichtere hoorntint met een donkere naad ertussen.
function _nijlTenen(D) { return (ctx, k, pal, BOT) => { const h = D.HOEF; if (h.type !== 'teen') return _hoefTeken(ctx, k, pal, BOT, D);
  const b = BOT[k], T = [b.J0[0] + Math.cos(b.A0) * b.L, b.J0[1] + Math.sin(b.A0) * b.L], f = D.H / 160, L = h.L * f, hv = h.hv * f;
  ctx.fillStyle = pal[h.voet || 'basis']; ctx.beginPath(); ctx.moveTo(T[0] - L, T[1]); ctx.lineTo(T[0] - 2, T[1]); ctx.quadraticCurveTo(T[0] + 3 * f, T[1], T[0] + 2 * f, T[1] - hv * 0.5); ctx.quadraticCurveTo(T[0], T[1] - hv, T[0] - L * 0.4, T[1] - hv * 1.1);
  ctx.lineTo(T[0] - L, T[1] - hv); ctx.closePath(); ctx.fill(); // brede ronde voet (zoals voorheen)
  const nagel = '#9A8C88', naad = '#3A3034';
  for (let i = 3; i >= 0; i--) { const x = T[0] + 1.2 * f - i * 4.2 * f, w = 2.5 * f * (1 - i * 0.08), hh = 3.2 * f * (1 - i * 0.08); // voorste teen het grootst, achterste half verscholen
    ctx.fillStyle = naad; ctx.beginPath(); ctx.ellipse(x, T[1] - hh * 0.55, w + 0.35 * f, hh * 0.62 + 0.3 * f, 0, Math.PI, 0); ctx.lineTo(x + w + 0.35 * f, T[1]); ctx.lineTo(x - w - 0.35 * f, T[1]); ctx.closePath(); ctx.fill();
    ctx.fillStyle = nagel; ctx.beginPath(); ctx.ellipse(x, T[1] - hh * 0.55, w, hh * 0.62, 0, Math.PI, 0); ctx.lineTo(x + w, T[1]); ctx.lineTo(x - w, T[1]); ctx.closePath(); ctx.fill(); } }; }
var HOEF_NIJL_TEEN_DEF = Object.assign({}, HOEF_NIJL_DEF); HOEF_NIJL_TEEN_DEF.TENEN = _nijlTenen(HOEF_NIJL_TEEN_DEF);
HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_TEEN_DEF);
function nijlpaard(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.nijlpaard, x, y, s * 1.3, o); }

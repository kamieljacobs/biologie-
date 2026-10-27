// Variant C (ronde 2, 27 okt 2026) = A + acrosoom als lichtste kap vóóraan op de kop (zwemrichting), kop zelf
// paarsgrijs (kern), middenstuk met duidelijker donkere segmenten (mitochondriën), ook bij kleinere schaal.
// Bron acrosoom vooraan: MeSH 'Acrosome' (NLM: 'covering the anterior portion of sperm head'); LibreTexts 22.3.
// =====================================================================================
// ZAADCEL. Recept (mens): kop 4–5 µm lang, 2,5–3,5 µm breed, plat (peddel); acrosoomkap over 40–70 % van de
// kop; middenstuk ± 5 µm, iets dikker, vol mitochondriën (koraal = energie); staart ± 45 µm → hele cel ± 55 µm,
// staart ± 10× de koplengte. Een golf loopt van kop naar staart (golflengte ± 0,4 staart, uitslag groeit naar het
// eind), de kop draait om zijn as (wordt afwisselend smal en breed). Slag ± 10–15 per seconde; in films vertraagd.
// Bron: WHO-laborhandboek sperma 2021; LibreTexts Human Anatomy Lab 22.3 (kop ± 5 µm, acrosoom als kap, middenstuk
// met mitochondriën). Bekende fouten: kikkervisje met korte staart; staart die alleen achteraan zwaait; klein
// (s < 1) verdwijnt de kop: daarom minimale koplengte 8 px (o.minKop) los van de schaal.
// Oorsprong = midden van de kop; ang = zwemrichting.
// =====================================================================================
function zaadcelEcht(ctx, x, y, ang, t, s = 1, o = {}) {
  const { a = 1, col = '#F2F2EE', acro = C.teal, slag = 2.2, mid = C.koraal, minKop = 8 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return;
  const U = 2.4 * s; // px per µm
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopL = Math.max(minKop, 4.6 * U), kb = kopL / 4.6 * 3; const kopB = kb * (0.55 + 0.45 * Math.abs(Math.cos(t * slag * 3.1)));
  const midL = 5 * U, staartL = 45 * U, golf = 0.42 * staartL, tot = midL + staartL;
  const ph = t * slag * 6.283;
  const pts = []; for (let i = 0; i <= 60; i++) { const d = (i / 60) * tot; const amp = (0.4 + 3.2 * Math.pow(d / tot, 1.2)) * U;
    pts.push([-kopL * 0.5 - d, Math.sin(d / golf * 6.283 - ph) * amp]); }
  // staart (eind dunner)
  for (let i = 1; i < pts.length; i++) { const d = i / 60 * tot; if (d < midL) continue; ctx.strokeStyle = col; ctx.lineWidth = Math.max(0.6, lerp(Math.max(1, 0.75 * U), 0.25 * U, (d - midL) / staartL));
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); }
  // middenstuk: dikker, warm (mitochondriën), met fijne ringen als het groot genoeg is
  const nm = Math.ceil(60 * midL / tot) + 1; const mw = Math.max(1.8, 1.5 * U);
  ctx.strokeStyle = mid; ctx.lineWidth = mw; ctx.beginPath(); for (let i = 0; i <= nm; i++) { const p = pts[Math.min(60, i)]; i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0] + kopL * 0.1, p[1]); } ctx.stroke();
  if (U > 3.5) { ctx.strokeStyle = rgba('#7A3A2E', 0.6); ctx.lineWidth = Math.max(1, U * 0.22); const nr = 9;
    for (let k = 1; k < nr; k++) { const d = k / nr * midL, i = d / tot * 60, i0 = Math.floor(i), f = i - i0; const p = pts[i0], q = pts[i0 + 1];
      const px = lerp(p[0], q[0], f), py = lerp(p[1], q[1], f), an = Math.atan2(q[1] - p[1], q[0] - p[0]) + Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * mw * 0.45, py - Math.sin(an) * mw * 0.45); ctx.lineTo(px + Math.cos(an) * mw * 0.45, py + Math.sin(an) * mw * 0.45); ctx.stroke(); } }
  // kop (peddel) + acrosoomkap (lichter, over de voorste ± 60 %)
  ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.fillStyle = '#B8AED8'; ctx.fill(); // kop = vooral kern (DNA), paarsgrijs
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.clip();
  ctx.beginPath(); ctx.ellipse(kopL * 0.3, 0, kopL * 0.42, kopB * 0.72, 0, 0, 6.283); ctx.fillStyle = '#E8F4FA'; ctx.fill(); // acrosoomkap: lichtste deel, vooraan (zwemrichting)
  ctx.beginPath(); ctx.ellipse(kopL * 0.3, 0, kopL * 0.42, kopB * 0.72, 0, Math.PI * 0.55, Math.PI * 1.45); ctx.strokeStyle = rgba(acro, 0.9); ctx.lineWidth = Math.max(1, U * 0.18); ctx.stroke(); // achterrand van de kap
  ctx.beginPath(); ctx.ellipse(-kopL * 0.12, 0, kopL * 0.2, kopB * 0.26, 0, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0); ctx.fill();
  ctx.restore();
  if (U > 4) { ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.strokeStyle = rgba('#9ED0EA', 0.6); ctx.lineWidth = 1.2; ctx.stroke(); }
  ctx.restore();
}

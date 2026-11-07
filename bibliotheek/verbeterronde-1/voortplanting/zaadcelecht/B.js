// =====================================================================================
// ZAADCEL (variant: lint-silhouet). Recept (mens): kop 4–5 µm lang, 2,5–3,5 µm breed, plat, druppelvormig (smal bij de
// hals, rond vooraan); acrosoomkap over 40–70 % van de kop; middenstuk ± 5 µm, iets dikker, vol mitochondriën
// (spiraal, koraal = energie); staart ± 45 µm, loopt taps toe. Hele cel ± 55 µm. Golf van kop naar staart (golflengte
// ± 0,4 staart, uitslag groeit naar het eind); de kop draait om zijn as. Bron: WHO-laborhandboek sperma 2021;
// LibreTexts Human Anatomy Lab 22.3. Bekende fouten: kikkervisje; staart die alleen achteraan zwaait; kop die klein
// wegvalt (hier: één gesloten silhouet kop+hals+staart, kop minimaal 9 px, dus ook op 80 px leesbaar).
// Oorsprong = midden van de kop; ang = zwemrichting.
// =====================================================================================
function zaadcelEcht(ctx, x, y, ang, t, s = 1, o = {}) {
  const { a = 1, col = '#F2F2EE', acro = C.teal, slag = 2.2, mid = C.koraal, minKop = 9 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return;
  const U = 2.4 * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopL = Math.max(minKop, 4.6 * U), draai = 0.55 + 0.45 * Math.abs(Math.cos(t * slag * 3.1)); const kopB = kopL * 0.65 * draai;
  const midL = 5 * U, staartL = 45 * U, tot = midL + staartL, golf = 0.42 * staartL, ph = t * slag * 6.283;
  const N = 70, as = []; for (let i = 0; i <= N; i++) { const d = i / N * tot; const amp = (0.4 + 3.2 * Math.pow(d / tot, 1.2)) * U; as.push([-kopL * 0.42 - d, Math.sin(d / golf * 6.283 - ph) * amp]); }
  const dik = d => d < midL ? Math.max(1.1, 0.8 * U) : Math.max(0.35, lerp(0.45 * U, 0.1 * U, (d - midL) / staartL));
  // lint: twee randen langs de as
  const L = [], R = []; for (let i = 0; i <= N; i++) { const p = as[i], q = as[Math.min(N, i + 1)], r0 = as[Math.max(0, i - 1)]; const an = Math.atan2(q[1] - r0[1], q[0] - r0[0]) + Math.PI / 2; const w = dik(i / N * tot);
    L.push([p[0] + Math.cos(an) * w, p[1] + Math.sin(an) * w]); R.push([p[0] - Math.cos(an) * w, p[1] - Math.sin(an) * w]); }
  ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); L.forEach(p => ctx.lineTo(p[0], p[1])); R.reverse().forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  // middenstuk: spiraal van mitochondriën als schuine bandjes
  const im = Math.round(N * midL / tot); ctx.save(); ctx.beginPath(); ctx.moveTo(as[0][0], as[0][1]); for (let i = 0; i <= im; i++) ctx.lineTo(as[i][0], as[i][1]);
  ctx.strokeStyle = mid; ctx.lineWidth = dik(0) * 2; ctx.stroke();
  if (U > 5) { ctx.strokeStyle = rgba('#F6CBB8', 0.6); ctx.lineWidth = Math.max(1, U * 0.2); for (let k = 0; k < 9; k++) { const i = Math.min(im - 1, Math.round(k / 9 * im)); const p = as[i], w = dik(0);
      ctx.beginPath(); ctx.moveTo(p[0] - w * 0.3, p[1] - w * 0.9); ctx.lineTo(p[0] + w * 0.3, p[1] + w * 0.9); ctx.stroke(); } }
  ctx.restore();
  // kop: druppel (rond vooraan, smal naar de hals)
  const kop = []; for (let k = 0; k < 32; k++) { const th = k / 32 * 6.283, c = Math.cos(th), sn = Math.sin(th); const smal = c < 0 ? lerp(1, 0.55, -c) : 1; kop.push([c * kopL / 2, sn * kopB / 2 * smal]); }
  ctx.beginPath(); bioPad(ctx, kop, true); ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.beginPath(); bioPad(ctx, kop, true); ctx.clip(); ctx.beginPath(); ctx.ellipse(kopL * 0.25, 0, kopL * 0.4, kopB * 0.72, 0, 0, 6.283); ctx.fillStyle = rgba(acro, 0.7); ctx.fill(); ctx.restore();
  ctx.beginPath(); bioPad(ctx, kop, true); ctx.strokeStyle = rgba('#9ED0EA', U > 4 ? 0.8 : 0.5); ctx.lineWidth = Math.max(0.8, U * 0.12); ctx.stroke();
  ctx.restore();
}

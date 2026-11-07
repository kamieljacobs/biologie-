function spierDwars(ctx, cx, cy, r, o = {}) { const { a = 1, n = 140, eenheden = [], aan = 0, t = 0, puls = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.25), Z9.peesR, 2);
  const V = _z9Vezels(`${cx},${cy},${r},${n}`, cx, cy, r, n), eig = V.map(() => -1);
  let start = 0; eenheden.forEach((e, j) => { const idx = V.map((_, i) => i).sort((p, q) => hash(p * 7 + j * 31) - hash(q * 7 + j * 31)).filter(i => eig[i] < 0).slice(0, e.n); idx.forEach(i => eig[i] = j); });
  V.forEach((v, i) => { const j = eig[i], act = j >= 0 ? clamp(aan - j, 0, 1) : 0, kl = j >= 0 ? eenheden[j].kleur : null;
    z9Pad(ctx, v.pts); const base = rgba(BIO.spier, 0.55);
    ctx.fillStyle = act > 0.01 ? _mixHex(BIO.spier, kl, 0.75 * act) : base; ctx.fill(); ctx.strokeStyle = act > 0.01 ? rgba(kl, 0.5 + 0.5 * act) : rgba(BIO.spierL, 0.6); ctx.lineWidth = act > 0.5 ? 2.5 : 1; ctx.stroke();
    circ(ctx, v.pts[(i * 5) % v.pts.length][0] * 0.82 + v.c[0] * 0.18, v.pts[(i * 5) % v.pts.length][1] * 0.82 + v.c[1] * 0.18, 2.2, rgba(BIO.kern, 0.85)); });
  ctx.restore();
  return { V, eig, punten: (j) => V.filter((_, i) => eig[i] === j).map(v => v.c) };
}

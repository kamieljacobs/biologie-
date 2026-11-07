// myofibril: een buis met banden (lichte en donkere banden, Z-lijnen) als herhaling van sarcomeren
function myofibril(ctx, x0, y, w, h, s, o = {}) { const { a = 1, L = 2.5, hlIdx = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.55), BIO.spierL, 1.2); ctx.save(); roundRect(ctx, x0, y - h / 2, w, h, h / 2); ctx.clip();
  const P = L * s; let i = 0; for (let xx = x0; xx < x0 + w; xx += P, i++) { const mid = xx + P / 2; ctx.fillStyle = rgba('#5A2A26', 0.6); ctx.fillRect(mid - 0.8 * s, y - h / 2, 1.6 * s, h);
    ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(xx - 1, y - h / 2, 2, h); if (i === hlIdx) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(xx, y - h / 2 + 2, P, h - 4); } }
  ctx.restore(); ctx.restore(); }

// ===================================================================================
// BULTRUG (Megaptera novaeangliae), aanpassing op ZW_DEF.bultrug (zelfde aanroep bultrug(ctx, x, y, s, o)). Recept: ± 15 m;
// borstvinnen tot 1/3 van de lengte met knobbels op de voorrand; knobbels op kop; keelgroeven; kleine rugvin op een bult;
// horizontale staartvin. Slag op en neer, traag (0,2–0,3 Hz).
// ===================================================================================
// Herstel 28 okt 2026 op de huidige versie (keuze 'gelijk'; slag en borstvinnen ongewijzigd): de STAARTVIN (fluke) als echte horizontale vin. Van opzij met de camera iets boven het dier
// zie je het vlak sterk verkort: twee puntige lobben met een inkeping in het midden en een gekartelde achterrand, samen
// ± 1/3 van de lichaamslengte breed (Oceanic Society, Whale fluke identification guide: twee lobben, "pointed tips", "serrated"
// achterrand, "up to 18 feet wide"; NOAA Fisheries / Coastal Review: "up to 18 feet wide"; NRCM: "scalloped"). De verkorting ademt mee met de slag.
(function () { const d = ZW_DEF.bultrug, oud = d.voorTeken; const ev = d.extraVin; d.extraVin = (Ls) => Object.assign(ev(Ls), { fluke: _zwFluke(0.05 * Ls, 0.022 * Ls, Ls) }); d._p = null;
  d.voorTeken = function (ctx, B, R, fase) { if (oud) oud.call(this, ctx, B, R, fase); if (fase !== 'voor') return;
    const Ls = B.pr.Ls, F = ZwPop.frame(B, Ls * 0.95), c = 0.1 * Ls, k = 0.26 + 0.1 * Math.sin(ZwPop.TAU * (R.ph || 0) + 1.2), S = 0.165 * Ls * k;
    const P = (u, v) => [F.p[0] + F.t[0] * (u + 0.25) * c + F.n[0] * v, F.p[1] + F.t[1] * (u + 0.25) * c + F.n[1] * v]; // t wijst naar de staart: lobben zwepen naar achteren
    const lob = (z) => { const Q = [[-0.2, 0.05 * z], [0.1, 0.5 * z], [0.35, 0.86 * z], [0.62, 1.0 * z]]; for (let i = 0; i <= 6; i++) { const u = i / 6, sc = (i % 2) * 0.04; Q.push([0.62 - u * 0.4 + sc, (1 - u) * z + u * 0.04 * z]); } Q.push([0.2, 0]); return Q.map(([u, v]) => P(u, v * S)); };
    for (const z of [1, -1]) { const Q = lob(z); ctx.beginPath(); ctx.moveTo(...Q[0]); for (const q of Q) ctx.lineTo(...q); ctx.closePath(); ctx.fillStyle = z > 0 ? this.pal.rug : this.pal.rugL; ctx.fill(); ctx.strokeStyle = ZwPop.RANDK ? ZwPop.RANDK(this.pal.rug) : '#5A6A80'; ctx.lineWidth = this.rand || 2; ctx.stroke(); } };
})();

// ===================================================================================
// PAUWIN (Pavo cristatus, vrouw), aanpassing op VogelGroot (spec wordt in place aangepast; zelfde aanroep).
// Recept (Indian peafowl): roodbruine kop met kuif, witte wang/oogstreep; onderhals metaalgroen, borst donkerbruin met
// groene glans, buik wittig; bovenlijf bruin met lichte vlekjes (gespikkeld). Een pauwin is gebouwd als een groot hoen.
// Variant B: hoen-silhouet. De hals is kort en loopt vloeiend over in een volle borst (geen aparte 'slang'); lijf iets
// rechter (romp −24°), kop groot (×1,3) en vooruit; groene onderhals als brede kraag over de borst; rug gespikkeld.
// ===================================================================================
(function () { const sp = VogelGroot.spec('pauwin');
  sp.H.staan.tb = -24; sp.H.staan.nek = [[18, -16], [22, -34], [34, -46]]; sp.H.lopen.nek = [[22, -16], [30, -32], [44, -42]];
  sp.nek.w = [66, 46, 32]; sp.nek.kl = '#3E7A56'; sp.nek.voor = '#3E7A56'; sp.nek.achter = '#6E563E';
  sp.nek.patroon = (ctx, nb) => { const A = nb.boven, Bn = nb.onder, n = A.length, k = Math.floor(n * 0.62);
    ctx.fillStyle = '#8A6A4A'; ctx.beginPath(); ctx.moveTo(...A[k]); for (let i = k; i < n; i++) ctx.lineTo(...A[i]); for (let i = n - 1; i >= k; i--) ctx.lineTo(...Bn[i]); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(120,170,120,0.45)'; ctx.lineWidth = 1.4; for (let i = 3; i < k; i += 4) { ctx.beginPath(); ctx.arc(nb.mid[i][0], nb.mid[i][1] + 4, 4, 0.3, 2.8); ctx.stroke(); } }; // schubachtige glansranden
  const f = 1.3; sp.kop.K = sp.kop.K.map(p => [p[0] * f, p[1] * f]); sp.kop.Kc = null; sp.kop.lagen = sp.kop.lagen.map(l => l.p ? { p: l.p.map(p => [p[0] * f, p[1] * f]), c: l.c } : { lijn: l.lijn.map(p => [p[0] * f, p[1] * f]), c: l.c, w: l.w });
  const kna = sp.kop.na; sp.kop.na = (ctx, o, P) => { ctx.save(); ctx.scale(f, f); kna(ctx, o, P); ctx.restore(); };
  sp.rompLagen = [{ p: [[80, 18], [40, 30], [-20, 32], [-100, 22], [-100, 80], [80, 80]], c: '#E2DACA' },
    { p: [[96, -70], [50, -50], [30, -14], [40, 22], [90, 26]], c: '#3E6A4E' }, { p: [[96, -10], [60, -4], [44, 24], [90, 26]], c: '#4A3E30' },
    { fn: (ctx) => { for (let i = 0; i < 70; i++) { const x = 40 - (i % 12) * 11 - hash(i) * 6, y = -42 + Math.floor(i / 12) * 9 + hash(i * 3) * 4; ctx.fillStyle = i % 3 ? 'rgba(232,222,200,0.75)' : 'rgba(70,56,42,0.6)'; ctx.beginPath(); ctx.ellipse(x, y, 2.4, 1.6, 0.3, 0, 6.283); ctx.fill(); } } }];
})();

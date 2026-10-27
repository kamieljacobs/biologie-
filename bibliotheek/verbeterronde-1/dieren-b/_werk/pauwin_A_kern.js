// ===================================================================================
// PAUWIN (Pavo cristatus, vrouw), aanpassing op VogelGroot (spec wordt in place aangepast; zelfde aanroep).
// Recept (Indian peafowl): roodbruine kop met kuif (toppen kastanje met groene rand), witte wang/oogstreep; ONDERHALS
// metaalgroen, borst donkerbruin met groene glans, buik wittig; bovenlijf bruin met lichte vlekjes; geen sleep.
// Hals korter en dikker dan bij een reiger of gans: de kop staat ± 1/3 boven de rug, niet op een lange slang.
// Bekende fouten: lange dunne groene hals (leest als reiger/gans); geheel groene hals; kop te klein.
// Variant A: hals ± half zo lang en dikker, kleurzones (bruine kop/bovenhals, groene onderhals, donkere borst), kop ×1,2.
// ===================================================================================
(function () { const sp = VogelGroot.spec('pauwin');
  sp.H.staan.nek = [[14, -24], [14, -46], [24, -62], [34, -68]]; sp.H.lopen.nek = [[18, -22], [22, -44], [34, -58], [46, -62]];
  sp.nek.w = [52, 38, 30, 25]; sp.nek.kl = '#3E7A56'; sp.nek.voor = '#3E7A56'; sp.nek.achter = '#367050';
  sp.nek.patroon = (ctx, nb) => { const A = nb.boven, Bn = nb.onder, n = A.length, k = Math.floor(n * 0.5);
    ctx.fillStyle = '#8A6A4A'; ctx.beginPath(); ctx.moveTo(...A[k]); for (let i = k; i < n; i++) ctx.lineTo(...A[i]); for (let i = n - 1; i >= k; i--) ctx.lineTo(...Bn[i]); ctx.closePath(); ctx.fill(); // bovenhals bruin
    ctx.fillStyle = 'rgba(46,90,62,0.5)'; for (let i = 2; i < k; i += 5) { ctx.beginPath(); ctx.arc(nb.mid[i][0] + (i % 2 ? 3 : -3), nb.mid[i][1], 2.4, 0, Math.PI); ctx.fill(); } };
  sp.kop.K = sp.kop.K.map(p => [p[0] * 1.2, p[1] * 1.2]); sp.kop.Kc = null; sp.kop.lagen = sp.kop.lagen.map(l => l.p ? { p: l.p.map(p => [p[0] * 1.2, p[1] * 1.2]), c: l.c } : { lijn: l.lijn.map(p => [p[0] * 1.2, p[1] * 1.2]), c: l.c, w: l.w });
  const kna = sp.kop.na; sp.kop.na = (ctx, o, P) => { ctx.save(); ctx.scale(1.2, 1.2); kna(ctx, o, P); ctx.restore(); };
  // borst donkerbruin met groene glans, doorlopend vanaf de groene onderhals
  sp.rompLagen = [{ p: [[80, 14], [40, 26], [-20, 30], [-100, 22], [-100, 80], [80, 80]], c: sp.pal.buik },
    { p: [[90, -60], [52, -40], [40, -10], [46, 16], [80, 20]], c: '#4A3E30' }, { p: [[90, -60], [56, -44], [48, -22], [70, -14], [90, -20]], c: '#3E6A4E' },
    { fn: (ctx) => { ctx.fillStyle = 'rgba(230,220,200,0.7)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(30 - (i % 8) * 12 - Math.floor(i / 8) * 5, -38 + Math.floor(i / 8) * 8, 1.8, 0, 6.283); ctx.fill(); } } }];
})();

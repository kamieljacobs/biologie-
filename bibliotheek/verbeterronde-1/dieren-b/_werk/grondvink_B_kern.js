// ===================================================================================
// GRONDVINK (Geospiza fortis), aanpassing op VogelZang. Recept: 12,5 cm; man egaal zwart (witte toppen aan de
// onderstaartdekveren), vrouw bruin en gestreept: lengtestreepjes (geen ronde vlekken zoals een lijster) op een
// bruinbeige borst en flank; korte staart die nauwelijks voorbij de vleugelpunten steekt; dikke kegelsnavel
// (bovensnavel langer dan de snavel hoog is). Foerageert op de grond: bij pikken blijft het lijf vrijwel horizontaal
// en gaan hals en kop omlaag; de poten blijven staan. Voeten: drietand + achterteen (zie VOGELVOET).
// Bekende fouten: lichte gevlekte borst en lange staart (lijkt een zanglijster); pikken door het hele lijf te kantelen.
// Variant B: compacter silhouet (grote kop op een korte, ronde romp, zoals bij grondvinken), romp horizontaler
// (grondfoerageerder), donkerder grijsbruin met fijne schachtstreepjes en lichte veerzomen; kopframe blijft gelijk.
// Zelfde aanroep: grondvink(ctx, x, y, s, { houding, kleed: 'man', snavel, snavelKleur, pik, t, kijk, a }).
// ===================================================================================
(function () {
  const VZ = VogelZang, oud = VZ.DEFS.grondvink;
  // lengtestreepjes langs de romp (romp-lokaal: x naar voren), dichter op de borst, vager naar de buik
  function strepen2(ctx, kl, n, seed = 2) { ctx.fillStyle = kl;
    for (let i = 0; i < n; i++) { const u = (i * 0.618 + hash(i * 3.1 + seed) * 0.25) % 1, v = (i * 0.41 + hash(i * 7.7 + seed) * 0.3) % 1;
      const x = 100 - u * 96, y = -24 + v * 50; if (y > 28 - u * 14) continue; ctx.globalAlpha = 0.95 - v * 0.4;
      ctx.beginPath(); ctx.ellipse(x, y, 4 + 1.5 * hash(i), 0.9, -0.2 + 0.4 * u, 0, 6.283); ctx.fill(); } ctx.globalAlpha = 1; }
  VZ.DEFS.grondvink = function (o) { const d = oud(o), man = o.kleed === 'man';
    d.staart.L = 54; d.staart.wt = 16; d.sx = 0.84; d.sy = 0.92; d.tbStaan = -2; d.tsStaan = -2; d.heupH = 60; // compact, horizontaal
    d.kop.K = d.kop.K.map(p => [p[0] * 1.12, p[1] * 1.1]);
    if (!man) { d.pal.basis = '#6A5A4C'; d.pal.rug = '#5A4A3E'; d.pal.buik = '#A08A74'; d.pal.keel = '#988270'; d.pal.streep = '#4A3A2E'; d.kop.kl = '#65564A';
      d.rompLagen = () => [{ p: [[-70, -70], [130, -80], [80, -42], [40, -30], [0, -18], [-60, -6]], c: d.pal.rug }, { p: [[130, -60], [92, -40], [66, -16], [36, 4], [0, 12], [-30, 8], [-60, 0], [-70, 60], [130, 60]], c: d.pal.buik },
        { fn: (ctx) => strepen2(ctx, d.pal.streep, 110) }]; }
    else { d.rompLagen = () => [{ p: [[-70, -70], [130, -80], [80, -42], [40, -30], [0, -18], [-60, -6]], c: d.pal.rug }, { p: [[130, -60], [92, -40], [66, -16], [36, 4], [0, 12], [-30, 8], [-60, 0], [-70, 60], [130, 60]], c: d.pal.buik },
        { fn: (ctx) => { ctx.fillStyle = '#E8E4DC'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-42 + i * 6, 8 + i * 3, 3.2, 1.8, 0.4, 0, 6.283); ctx.fill(); } } }]; }
    return d; };
})();
// pikken: lijf bijna horizontaal (+6°), hals buigt, kop gaat naar de grond; poten blijven staan
function _gvNek(sp, P) { const V = VogelPop, Tb = V.tf(P.heup, P.tb), Tk = V.tf(P.kop, P.tk); return [Tb([sp.nek.aan[0] - 14, sp.nek.aan[1] + 4]), Tb(sp.nek.aan), Tk(sp.kopAan), Tk([sp.kopAan[0] + 8, sp.kopAan[1] - 2])]; }
grondvink = function (ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return;
  if (o.houding !== 'pikken') return VogelZang.teken('grondvink', ctx, x, y, s, o);
  const sp = VogelZang.spec('grondvink', o), P = VogelZang.pose(sp, 'staan', {}), V = VogelPop, pk = o.pik ?? 1;
  P.tb += 6 * V.RAD * pk; P.ts += 8 * V.RAD * pk;
  const kr = V.rot(sp.kopL, P.tb); P.kop = V.add(P.heup, V.add(kr, [22 * pk, 38 * pk])); P.tk = pk * (sp.def.pikR + 0.2);
  P.nekPts = _gvNek(sp, P); return V.teken(ctx, sp, P, x, y, s, o); };

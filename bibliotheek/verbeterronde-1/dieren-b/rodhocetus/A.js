// ===================================================================================
// RODHOCETUS (± 47 Mj), aanpassing op ZW_DEF.rodhocetus (zelfde aanroep). Recept (Gingerich e.a. 2001, Gingerich 2003):
// 2–3 m; korte poten met LANGE handen en voeten; hand met vijf vingers; achtervoet met vier lange tenen, waarschijnlijk
// met zwemvliezen: de achterpoten waren de voortstuwing (afwisselend peddelen), de staart een roer zonder staartvin.
// Aanpassing: voorpoot met een zichtbare elleboog en een brede peddelhand, achterpoot ± 20 % langer met bredere voet,
// en een lichte golf door lijf en staart bij het zwemmen.
// ===================================================================================
(function () { const d = ZW_DEF.rodhocetus, D = d.data;
  const sch = (P, k) => P.map(q => [P[0][0] + (q[0] - P[0][0]) * k, P[0][1] + (q[1] - P[0][1]) * k]); D.poten.A = sch(D.poten.A, 1.2);
  d.poten.A.w = [42, 19, 12, 14, 15]; d.poten.AF.w = [38, 17, 11, 13, 14]; d.poten.V.w = [30, 16, 11, 13, 13]; d.poten.VF.w = [27, 14, 10, 12, 12];
  d.peddel.voor = [75, 150, 168, 175]; d.peddel.voorZwaai = 3;
  d.slag = { soort: 'op', f: 0.6, lam: 0.85, A: [[0, 0.004], [0.4, 0.002], [0.65, 0.012], [1, 0.05]] }; d._p = null; d._poot = null;
})();

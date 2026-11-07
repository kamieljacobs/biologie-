// ===================================================================================
// ZANDHAGEDIS (Lacerta agilis), aanpassing op REPT_HAG_DEF (pop wordt opnieuw gebouwd; zelfde aanroep
// hagedis(ctx, x, y, s, { t, kijk, a })). Recept: 18–20 cm, staart ± 1,5–2× de romp, korte stevige poten zijwaarts
// (sprawling), vijf tenen per voet met klauwtjes, de vierde achterteen het langst; slingerende gang (romp en staart
// golven, diagonale poten tegelijk). Aanpassing: poten ± 35 % dikker en tenen dikker, zodat ze op 80 px niet
// wegvallen; de tenen staan als een kleine waaier (vork) uit de voet. Lengtes en gang ongewijzigd (goedgekeurd).
// ===================================================================================
(function () { const D = REPT_HAG_DEF;
  for (const k of ['V', 'A']) { const P = D.poot[k]; P.w = P.w.map((w, i) => w * (i < 4 ? 1.35 : 1.55)); P.dik = P.dik * 1.3; P.klauw = P.klauw * 1.2; }
  REPT.hagedis = PopRC.reptiel(D); })();

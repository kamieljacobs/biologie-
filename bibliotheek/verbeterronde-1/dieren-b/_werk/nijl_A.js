// Variant A: omtrek en vlakken glad, roze flankvlak en halsplooien worden een donkerdere huidschaduw (plooi), roze
// alleen nog rond oog, oor en snuit (koplagen), nagels lichter zodat de vier tenen leesbaar zijn.
(function () { const V = HOEF_VORM.nijlpaard;
  for (const k in V.delen) { const d = V.delen[k]; if (d.basis && d.basis.length > 12) _nijlVervang(d.basis, _nijlGlad(d.basis, 3)); for (const l of d.lagen || []) { const p = l.p || l.basis; if (p && p.length > 12) _nijlVervang(p, _nijlGlad(p, 2)); } }
  for (const k of ['romp', 'nek']) for (const l of V.delen[k].lagen || []) if (l.c === '#A7766F') l.c = '#58494F';
  HOEF_NIJL_DEF.HOEF.kleur = '#8C7C78'; HOEF_NIJL_DEF.DELEN = null; delete HOEF_NIJL_DEF.DELEN;
  HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_DEF); })();

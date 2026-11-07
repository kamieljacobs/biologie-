// ---- gedeelde hulpjes voor de zangvogels (VogelZang): pikken met de hals en een vlucht met lijfgolf ----
// Recept vlucht: bij elke neerslag duwen beide vleugels het lijf omhoog en kantelt het lijf licht (kop iets omhoog bij
// de opslag, omlaag bij de neerslag); de verre vleugel is zichtbaar (iets achter in fase), zodat het geen los blad
// boven een stijf lijf is. Pikken: lijf bijna horizontaal, alleen hals en kop omlaag.
function _vzNek(sp, P) { const V = VogelPop, Tb = V.tf(P.heup, P.tb), Tk = V.tf(P.kop, P.tk); return [Tb([sp.nek.aan[0] - 14, sp.nek.aan[1] + 4]), Tb(sp.nek.aan), Tk(sp.kopAan), Tk([sp.kopAan[0] + 8, sp.kopAan[1] - 2])]; }
function _vzTeken(naam, ctx, x, y, s, o) { if ((o.a ?? 1) <= 0.01) return; const V = VogelPop;
  if (o.houding === 'pikken') { const sp = VogelZang.spec(naam, o), P = VogelZang.pose(sp, 'staan', {}), pk = o.pik ?? 1;
    P.tb += 6 * V.RAD * pk; P.ts += 8 * V.RAD * pk; const kr = V.rot(sp.kopL, P.tb); P.kop = V.add(P.heup, V.add(kr, [22 * pk, 38 * pk])); P.tk = pk * (sp.def.pikR + 0.2);
    if (o.kraak != null) P.tk += 0.08 * Math.sin(o.kraak * 6.283); // kraken: kop knikt mee met de kaak
    P.nekPts = _vzNek(sp, P); return V.teken(ctx, sp, P, x, y, s, o); }
  if (o.houding === 'vliegen') { const sp = VogelZang.spec(naam, o), P = VogelZang.pose(sp, 'vliegen', o), fl = P.vlFase;
    const golf = Math.sin(fl.phi); P.tb += -6 * golf * V.RAD; P.heup = V.add(P.heup, [0, -6 * Math.max(0, golf)]);
    P.kop = V.add(P.heup, V.rot(sp.kopL, P.tb)); P.tk = 0.06 + 0.1 * golf;
    if (P.vl.f) P.vl.f = { phi: fl.phi - 0.22, f: Math.min(1, fl.f + 0.08), sweep: fl.sweep }; // verre vleugel iets later: zichtbaar
    P.nekPts = _vzNek(sp, P); return V.teken(ctx, sp, P, x, y, s, o); }
  return VogelZang.teken(naam, ctx, x, y, s, o); }

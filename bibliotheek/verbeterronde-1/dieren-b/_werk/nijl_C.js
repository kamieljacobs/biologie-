// Variant C (= B + herstel): neusgaten BOVENOP de snuit (ADW Hippopotamidae: "Their nostrils and eyes sit on top of their
// skulls"; SF Zoo docents: "Ears, eyes and nostrils are placed high on the head"), als platte spleet op de bovenrand
// van de snuit i.p.v. een stipje voor de snuit.
(function () { const V = HOEF_VORM.nijlpaard; V.neusgat[0] = 205; V.neusgat[1] = -83.5; HOEF_NIJL_DEF.neusHoek = 0.12; HOEF_NIJL_DEF.neusR = 3.0;
  delete HOEF_NIJL_DEF.DELEN; HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_DEF); })();

/* vp1_adapter.js — koppelt elke alinea (sNN) aan een stuk van een oude hoofdstukscène.
   seg.oud = [hoofdstuk, begin in de oude hoofdstuktijd]; de oude scène krijgt hoofdstuktijd = begin + lokale tijd.
   De hoofdstukkaart, vraagkaart en onthulling van de oude engine tekent de speler nu zelf: die zijn hier uitgezet. */
const OG = new ENG.G(document.getElementById('stage')); OG.scale = 1;
ENG.chapterCard = function () { return 0; };
const _OB = {};
function oudBlok(k) { if (!_OB[k]) { const ch = OUDFILM.chapters[k]; const TL = COMMON.makeTL(ch); _OB[k] = { sc: OSC[ch.key]({ TL, FILM: OUDFILM }), TL, ch }; } return _OB[k]; }
function oudTijd(seg, t) {
  const k = seg.oud[0], B = oudBlok(k), TL = B.TL; let T = seg.oud[1] + t;
  const lo = TL.card ? Math.max(TL.card.t1 + 0.05, B.ch.sentences[0].t0 + 1.2) : 0; // beeld meteen gevuld: het eerste beeld blijft staan tot de scène bij is (geen oude kaart, geen lege infade)
  const hi = TL.Q ? TL.Q.t0 - 0.05 : (TL.seg('title') ? TL.seg('title').t0 - 0.9 : B.ch.dur); // nooit de oude vraag- of titelkaart
  return Math.max(lo, Math.min(hi, T));
}
(window.FILMDATA.segments || []).forEach((seg) => {
  if (seg.kind !== 'speech' || !seg.oud) return;
  SCENES[seg.id] = function (ctx, t) { const B = oudBlok(seg.oud[0]); OG.frame(1); OG.__t = t; B.sc.draw(OG, oudTijd(seg, t)); OG.screen(); };
});
SCENES.title = function (ctx, t) { OG.screen(); LIB.titleImage(OG, 1); };

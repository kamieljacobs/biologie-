import json
film = {
 "slug": "3-t-cellen-en-virussen", "hoofdstuk": "afweer", "hoofdstukNaam": "Afweer",
 "title": "T-cellen en virussen", "sub": "Hoe je afweer een gekaapte cel opruimt",
 "puzzle": "Noor heeft griep, met bijna 39 graden koorts. De huisarts wil geen antibiotica geven: dat helpt niet tegen griep. Waarom niet?",
 "meta": "afweer 3/4", "version": "1.0 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks Bescherming en afweer · film 3 van 4",
 "lead": "Een virus is geen cel: het kaapt jouw cellen om zich te vermenigvuldigen, dus antibiotica hebben niets om te remmen. Resistentie ontstaat bij bacteriën, door mutatie en selectie. Antistoffen kunnen niet in een cel. Een geïnfecteerde cel laat stukjes virus op zijn oppervlak zien; een passende T-killercel doodt die cel (cellulaire afweer). T-helpercellen geven het startsein aan B-cellen en T-killercellen. Hiv infecteert juist T-helpercellen: zonder behandeling volgt aids.",
 "endHaak": "een virus is geen cel: het kaapt de jouwe",
 "minis": {"Hoofdstuk 1": "Waarom helpt antibiotica niet tegen een virus?", "Hoofdstuk 2": "Hoe vindt je afweer een cel met een virus erin?", "Hoofdstuk 3": "Waarom word je met aids ziek van infecties die anderen nauwelijks merken?", "Recap": "Waarom hielp antibiotica niet tegen de griep van Noor?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "De huisarts zegt: antibiotica helpen niet tegen griep. Waarom niet?", "correct": 0, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 1 en aan het eind."},
  "q08": {"q": "Hoe ruimt je afweer een virus op dat al in een cel zit?", "correct": 2, "explain": "Antistoffen kunnen niet in de cel. Een T-killercel doodt de hele geïnfecteerde cel; het virus wordt mee afgebroken."},
  "q16": {"q": "Waarom wordt iemand met aids ziek van infecties die anderen nauwelijks merken?", "correct": 1, "explain": "Hiv doodt T-helpercellen. Zonder die regelaar krijgen B-cellen en T-killercellen te weinig startsein; je wordt ziek van andere ziekteverwekkers."}
 },
 "glossary": [
  {"t": "virus", "d": "Geen cel: een eiwitmantel met erfelijk materiaal, zonder eigen stofwisseling. Vermenigvuldigt zich alleen in een gastheercel."},
  {"t": "antibiotica", "d": "Medicijnen die onderdelen van bacteriën remmen, zoals de bouw van de celwand. Werken niet tegen virussen."},
  {"t": "resistentie", "d": "Bacteriën die door een toevallige mutatie ongevoelig zijn, overleven een antibioticum en vermenigvuldigen zich (selectie)."},
  {"t": "T-cellen", "d": "Lymfocyten die in het beenmerg ontstaan en in de thymus rijpen; ze herkennen alleen stukjes antigeen op een cel, nooit een los virus."},
  {"t": "T-killercel", "d": "T-cel die een geïnfecteerde cel herkent aan stukjes virus op het oppervlak en die cel doodt."},
  {"t": "T-helpercel", "d": "T-cel die het antigeen te zien krijgt van een fagocyt en B-cellen en T-killercellen het startsein geeft: de regelaar van de specifieke afweer."},
  {"t": "cellulaire afweer", "d": "Specifieke afweer met cellen die geïnfecteerde cellen doden; tegenover de humorale afweer met antistoffen."},
  {"t": "hiv en aids", "d": "Hiv infecteert T-helpercellen. Zakt hun aantal onder ongeveer 200 per microliter bloed, dan spreek je van aids: je wordt ziek van infecties die anderen nauwelijks merken."},
  {"t": "hiv-remmers", "d": "Medicijnen (geen antibiotica) die het virus onmeetbaar laag houden; ze genezen niet, dus je slikt ze levenslang."},
  {"t": "MHC", "d": "Eiwitten die stukjes antigeen tonen: MHC-I op alle cellen met een kern (voor T-killercellen), MHC-II op antigeenpresenterende cellen (voor T-helpercellen). Verschilt per persoon: afstoting bij transplantatie.", "vwo": True},
  {"t": "retrovirus", "d": "Virus met RNA dat met reverse transcriptase DNA maakt en dat inbouwt in het DNA van de gastheercel, zoals hiv.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

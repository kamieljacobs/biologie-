import json
true, false = True, False
film = {
 "slug": "7-stikstof-gaat-rond",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Stikstof gaat rond",
 "sub": "de stikstofkringloop, van mest tot kraan",
 "puzzle": "Waarom wordt een sloot naast een weiland groen?",
 "meta": "ecologie 7/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 7 van 8",
 "lead": "Terug naar de sloot. Mest en kunstmest brengen stikstof op het land. Ammonium plakt aan klei en humus. Nitraat, en bij veel mest ook fosfaat, spoelt uit naar de sloot. Daar groeien algen en kroos harder, en de sloot wordt groen. Klaver haalt zijn stikstof uit de lucht, met bacteriën in zijn wortels. En jouw toiletwater wordt schoon door bacteriën: eerst met, dan zonder zuurstof. De stikstof gaat steeds rond. De energie niet: die stroomt erdoorheen.",
 "endHaak": "volgende film: Van zand tot bos",
 "minis": {
  "Hoofdstuk 1": "Waarom zaait een boer klaver in zijn grasland?",
  "Hoofdstuk 2": "Hoe wordt koeienmest voedsel voor een plant?",
  "Hoofdstuk 3": "Waarom wordt een sloot naast een weiland groen?",
  "Hoofdstuk 4": "Hoe komt stikstof terug in de lucht?",
  "Hoofdstuk 5": "Hoe wordt jouw wc-water weer schoon?",
  "Recap": "Waarom wordt een sloot naast een weiland groen?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q08": {
   "q": "Het gras staat de hele dag in lucht vol stikstofgas. Kan het gras die stikstof gebruiken?",
   "correct": 1,
   "explain": "Stikstofgas bestaat uit twee stikstofatomen die heel stevig aan elkaar vastzitten. Planten en dieren krijgen die twee niet los. Het gas gaat de huidmondjes in, en er onveranderd weer uit."
  },
  "q12": {
   "q": "Welke bak groeit na acht weken het best?",
   "correct": 2,
   "explain": "Het gras blijft klein en geel. De klaver staat groen en dicht."
  },
  "q27": {
   "q": "Je doet dezelfde mest in een bak die je luchtdicht afsluit. Wat meet je na vier weken?",
   "correct": 0,
   "explain": "Naast de open bak staat een tweede bak met dezelfde mest, luchtdicht afgesloten. In die dichte bak stapelt het ammonium zich op. De afbraak gaat door, ook zonder zuurstof."
  },
  "q33": {
   "q": "Welke strip kleurt in het water onder de kleibak?",
   "correct": 2,
   "explain": "Onder de kleibak kleurt alleen de nitraatstrip. Klei en humus zijn negatief geladen. Ammonium is positief geladen en blijft eraan plakken."
  },
  "q40": {
   "q": "Erop: 120 kg kunstmest, 80 kg mest en 20 kg uit de lucht. Eraf: 140 kg in de oogst. Wat blijft er per hectare over?",
   "correct": 1,
   "explain": "Erop gaat tweehonderdtwintig kilo, eraf honderdveertig. Er blijft dus tachtig kilo over. Dat overschot verdwijnt niet zomaar."
  },
  "q45": {
   "q": "Wat gebeurt er met het nitraat in de bak onder water?",
   "correct": 0,
   "explain": "Na drie weken kleurt de nitraatstrip bijna niet meer. Bacteriën gebruiken het nitraat zoals jij zuurstof gebruikt bij je dissimilatie. Ze maken er stikstofgas van."
  },
  "q54": {
   "q": "Het gezuiverde water stroomt uit de laatste tank. Gaat het daarna rechtstreeks naar jouw kraan?",
   "correct": 2,
   "explain": "Gezuiverd water stroomt een rivier in, zoals de Maas. Verderop pompt een drinkwaterbedrijf rivierwater op. Het wordt bewaard in grote bekkens in de Biesbosch, en daarna nog eens grondig gezuiverd."
  }
 },
 "glossary": [
  {
   "t": "stikstofkringloop",
   "d": "De kringloop waarin stikstof tussen lucht, bodem, water en organismen rondgaat: binding, assimilatie, ammonificatie, nitrificatie, denitrificatie."
  },
  {
   "t": "stikstofgas (N₂)",
   "d": "Gas uit twee stevig verbonden stikstofatomen; ± 78 % van de lucht. Planten en dieren kunnen het niet gebruiken."
  },
  {
   "t": "stikstofbinding (stikstoffixatie)",
   "d": "Omzetten van stikstofgas in ammonium (of andere bruikbare stikstofverbindingen), door stikstofbindende bacteriën, bliksem of de kunstmestindustrie."
  },
  {
   "t": "wortelknolletje",
   "d": "Verdikking aan de wortel van een vlinderbloemige waarin stikstofbindende bacteriën leven."
  },
  {
   "t": "vlinderbloemigen",
   "d": "Plantenfamilie (klaver, erwt, boon, lupine, brem) met wortelknolletjes en stikstofbindende bacteriën."
  },
  {
   "t": "mutualisme",
   "d": "Samenleving van twee soorten waarbij beide voordeel hebben (plant: stikstof; bacterie: suikers)."
  },
  {
   "t": "stikstofassimilatie",
   "d": "Inbouwen van anorganische stikstof (ammonium of nitraat) in organische stoffen zoals aminozuren en eiwitten; een vorm van voortgezette assimilatie."
  },
  {
   "t": "voortgezette assimilatie",
   "d": "Het maken van andere organische stoffen (zoals aminozuren, eiwitten, vetten) uit de glucose van de fotosynthese, met mineralen uit de bodem."
  },
  {
   "t": "ureum",
   "d": "Stikstofhoudende afvalstof die een zoogdier maakt uit overtollige aminozuren en uitplast."
  },
  {
   "t": "ammonificatie",
   "d": "Afbraak van eiwitten en ureum in dode resten en mest door reducenten (rottingsbacteriën, schimmels), waarbij ammonium vrijkomt."
  },
  {
   "t": "nitrificatie",
   "d": "Omzetting van ammonium via nitriet in nitraat door nitrificerende bacteriën (nitrietbacteriën en nitraatbacteriën); aeroob (alleen met zuurstof)."
  },
  {
   "t": "denitrificatie",
   "d": "Omzetting van nitraat in stikstofgas door denitrificerende bacteriën; anaeroob (alleen zonder zuurstof)."
  },
  {
   "t": "aeroob / anaeroob",
   "d": "Met zuurstof / zonder zuurstof."
  },
  {
   "t": "uitspoeling",
   "d": "Wegspoelen van opgeloste mineralen, vooral nitraat, met regenwater naar grond- en oppervlaktewater."
  },
  {
   "t": "stikstofbalans",
   "d": "Overzicht van alle stikstof die een bedrijf of akker binnenkomt en verlaat; aanvoer min afvoer = overschot."
  },
  {
   "t": "fosforkringloop",
   "d": "Kringloop van fosfor (als fosfaat) via bodem, water, planten en dieren; zonder gasvorm."
  },
  {
   "t": "eutrofiëring",
   "d": "Verrijking van water met mineralen zoals nitraat en fosfaat (uitgewerkt in de film Eén aarde)."
  },
  {
   "t": "rioolwaterzuiveringsinstallatie (rwzi)",
   "d": "Installatie die afvalwater zuivert: grof vuil en slib eruit, afbraak met beluchting (aeroob), stikstofverwijdering met en zonder zuurstof, fosfaat eruit."
  },
  {
   "t": "chemo-autotroof",
   "d": "Organisme dat organische stoffen maakt uit CO₂ met energie uit een chemische reactie, niet uit licht (bijvoorbeeld nitrificerende bacteriën).",
   "vwo": true
  },
  {
   "t": "C/N-verhouding",
   "d": "Verhouding tussen de massa koolstof en stikstof in organisch materiaal (uitgewerkt in de film Waar blijft het blad?).",
   "vwo": true
  },
  {
   "t": "deammonificatie (anammox)",
   "d": "Anaerobe omzetting van ammonium en nitriet samen in stikstofgas door anammoxbacteriën; gebruikt in rioolwaterzuivering.",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

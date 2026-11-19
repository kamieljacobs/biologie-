import json
film = {
 "slug": "sport-1-glijden-trekken-drijven", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Glijden, trekken, drijven", "sub": "bewegen in water",
 "puzzle": "Water is ruim achthonderd keer zo dicht als lucht. Waarom levert een betere houding daar vaak meer op dan meer kracht?",
 "meta": "sport en topsport · weerstand en voortstuwing", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Een zwemmer tikt aan na een honderd meter en wil de krachtzaal in. De zwemtrainer schudt het hoofd. Je ziet waarom bewegen in water zo zwaar is: drie soorten weerstand (wrijving, vorm en golven), en weerstand die snel groeit met je snelheid, zodat extra kracht duur gekocht is. Daarna hoe de zwemmer ligt (drijfpunt, zwaartepunt, hoofd laag), hoe hij het water vastpakt met een hoge elleboog (de catch), wat een meetbaan in Amsterdam liet zien, en waarom de onderwaterfase na start en keerpunt zo snel is.",
 "endHaak": "welk stukje van jouw eigen sport zou jij willen meten?",
 "minis": {"Hoofdstuk 1 — Drie soorten weerstand": "Waarom is water zo zwaar om doorheen te gaan?",
           "Hoofdstuk 2 — Drijven en ligging": "Waarom zakken je benen als je stil ligt?",
           "Hoofdstuk 3 — Voortstuwing en de catch": "Hoe pak je water vast?",
           "Hoofdstuk 4 — Start, keerpunt en de vijfde slag": "Waarom blijven zwemmers onder water?",
           "Recap": "Houding of spieren?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: de zwemmer, de zwemtrainer en een bewegingswetenschapper (figurant, castboek). Decor: het zwembad als schema (bovenaanzicht van de banen, zijaanzicht onder water). Getallen uit o.a. Toussaint 1990 en 2002, Cortesi &amp; Gatta 2015, Vennell e.a. 2006, Lopes e.a. 2022 en het World Aquatics-reglement (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Welke twee van de drie soorten weerstand remmen een snelle zwemmer samen het meest?", "correct": 2,
          "explain": "De vorm en de golven. Vormweerstand (water dat je voor je uit duwt, draaikolken achter je) en golfweerstand (water dat je aan het oppervlak omhoog duwt) zijn samen het grootste deel. Wrijving langs de huid is het kleinst, al telt ook die bij topzwemmers mee. Hoe groot elk deel is, verschilt per studie en per snelheid."},
  "q07": {"q": "Stel dat de zwemmer tien procent meer vermogen levert: meer energie per seconde in zijn slagen. Hoeveel sneller zwemt hij dan?", "correct": 1,
          "explain": "Ongeveer drie procent. Twee keer zo snel geeft ongeveer vier keer zoveel weerstand, en je moet die grotere kracht ook nog sneller leveren. Het benodigde vermogen groeit daardoor ongeveer met de derde macht van de snelheid: 1,1 × 1,1 × 1,1 ≈ 1,33. Voor tien procent sneller heb je dus ongeveer een derde meer vermogen nodig; tien procent meer vermogen levert maar zo'n drie procent snelheid op."},
  "q10": {"q": "In de slag kijkt de zwemmer steeds vooruit, naar de muur. Wat doet dat met zijn weerstand?", "correct": 0,
          "explain": "Meer weerstand. Met zijn hoofd omhoog ligt hij schuiner, dus maakt hij een groter gat in het water. In een sleepproef met tien zwemmers gaf hoofd omhoog zo'n vijf tot tien procent meer weerstand dan hoofd laag (Cortesi & Gatta 2015)."},
  "q13": {"q": "De hand van de zwemmer glipt weg door het water. Hoe pakt een goede zwemmer het water vast?", "correct": 1,
          "explain": "Met een hoge elleboog water naar achteren duwen. Je komt vooruit doordat je water naar achteren duwt (voortstuwing). Bij de catch komt de onderarm vroeg verticaal, met de elleboog hoog, zodat ook een stuk van de onderarm meeduwt. Naar beneden duwen tilt je voorkant op en laat je benen zakken; de hand alleen snel door het water halen geeft het water veel snelheid en kost veel energie. En de catch kun je trainen."},
  "q18": {"q": "Wat is sneller na de start en na elk keerpunt?", "correct": 2,
          "explain": "Langer onder water blijven en daar doorgaan. Na de afzet ga je sneller dan in de rest van de baan, en op driekwart meter tot een meter diep maak je bijna geen golven. Met een goede dolfijnslag houd je die snelheid beter vast. Het reglement begrenst het: na vijftien meter moet je hoofd boven water zijn; bij schoolslag één armslag en één dolfijnslag."}
 },
 "glossary": [
  {"t": "weerstand", "d": "De kracht van het water tegen je bewegingsrichting in. Drie soorten: wrijvingsweerstand, vormweerstand en golfweerstand."},
  {"t": "wrijvingsweerstand", "d": "Weerstand doordat water langs je huid schuurt. De kleinste van de drie, al telt ook die bij topzwemmers mee."},
  {"t": "vormweerstand", "d": "Weerstand doordat je water voor je uit duwt, met draaikolken achter je. Hoe schuiner je ligt, hoe groter het gat dat je in het water maakt en hoe groter de vormweerstand."},
  {"t": "golfweerstand", "d": "Weerstand doordat je aan het oppervlak water omhoog duwt (golven). Op driekwart meter tot een meter diep valt hij bijna weg."},
  {"t": "vermogen", "d": "Hoeveel energie per seconde je levert, hier in je slagen. Voor tien procent meer snelheid heb je ongeveer een derde meer vermogen nodig."},
  {"t": "voortstuwing", "d": "De kracht die je vooruit brengt doordat je water naar achteren duwt."},
  {"t": "stroomlijn", "d": "De houding met het kleinste vooraanzicht: armen gestrekt boven het hoofd, lichaam en benen recht erachter."},
  {"t": "catch", "d": "Het moment vroeg in de slag waarop de hand het water 'vastpakt' en de onderarm verticaal komt, met de elleboog hoog. Uitspraak: ketsj."},
  {"t": "onderwaterfase", "d": "Het stuk na start en keerpunt dat je onder water aflegt, meestal met dolfijnslag (beide benen samen golvend op en neer). Hooguit vijftien meter; bij schoolslag één armslag en één dolfijnslag."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

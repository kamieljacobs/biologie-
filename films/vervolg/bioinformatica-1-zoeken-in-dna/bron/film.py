import json
film = {
 "slug": "bioinformatica-1-zoeken-in-dna", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Zoeken in DNA", "sub": "databanken, BLAST en een beetje Python",
 "puzzle": "Op het sushibakje stond 'blauwvintonijn'. Het lab las een stukje DNA van de vis. Welke vis is het echt?",
 "meta": "bio-informatica · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema", "alleen": "havo · vwo",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Bio-informatica",
 "lead": "Sam loopt een week mee bij de afdeling bio-informatica. Van de sushi van gisteren ('blauwvintonijn') heeft het lab een DNA-barcode gelezen: een vast stukje van ongeveer 650 letters uit één gen in de mitochondriën. Zo'n sequentie breng je thuis door haar te vergelijken met de miljarden sequenties in openbare databanken. Je lijnt twee sequenties uit, met gaten waar een letter mist, en drukt met een score uit hoe goed ze passen. Het zoekprogramma BLAST is snel omdat het eerst lange woordjes zoekt die precies passen, en alleen daar verder uitlijnt. Een treffer beoordeel je aan procent gelijk, aan hoeveel treffers je door toeval zou vinden en aan meerdere bronnen. En met een paar regels Python laat Sam de computer het mRNA van insuline vertalen.",
 "endHaak": "welke van een miljoen varianten in iemands DNA maakt ziek?",
 "minis": {"Hoofdstuk 1": "Waar vergelijk je een onbekend stukje DNA mee?",
           "Hoofdstuk 2": "Hoe zie je of twee sequenties op elkaar lijken?",
           "Hoofdstuk 3": "Hoe zoek je snel door miljarden sequenties?",
           "Hoofdstuk 4": "Hoe laat je een computer een gen vertalen?",
           "Recap": "Welke vis zat er in de sushi?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q07": {"q": "Het lab heeft de DNA-barcode van de vis gelezen. Waar staan de sequenties van bekende soorten?", "correct": 0,
          "explain": "Onderzoekers over de hele wereld zetten hun sequenties in openbare databanken (in Amerika, Europa en Japan), die elke dag uitwisselen. Iedereen mag erin zoeken, gratis."},
  "q12": {"q": "Sam legt twee oefenstukjes letter voor letter onder elkaar. De eerste vier letters zijn gelijk, daarna klopt bijna niets meer. Wat is er aan de hand?", "correct": 1,
          "explain": "In het bovenste stukje mist na de vierde letter één letter. Alles erna staat één plek verschoven. Met een gat op die plek staan bijna alle gelijke letters weer onder elkaar."},
  "q18": {"q": "De databank heeft miljarden sequenties, toch geeft BLAST vaak al na korte tijd antwoord. Hoe kan dat?", "correct": 2,
          "explain": "BLAST zoekt eerst waar lange woordjes (bijvoorbeeld 28 letters) precies voorkomen. Zo'n woordje vind je bijna nooit toevallig, dus aan bijna alle sequenties begint het niet eens. Alleen daar lijnt het verder uit."},
  "q22": {"q": "Bovenaan de uitslag staat geelvintonijn: honderd procent gelijk. Is Sam nu klaar?", "correct": 1,
          "explain": "Een databank is zo goed als wat mensen erin zetten: een vis onder de verkeerde naam geeft een verkeerde treffer. Daarom vergelijkt Kim meerdere treffers uit betrouwbare bronnen."},
  "q29": {"q": "Het coderende deel van het recept is ruim driehonderd letters, veel langer dan de achttien uit het voorbeeld. Wat moet Sam aan zijn code veranderen?", "correct": 0,
          "explain": "Niets: de stap van drie herhaalt zich vanzelf tot het recept op is, en de code meet de lengte zelf. Wel moet het beginpunt goed staan."}
 },
 "glossary": [
  {"t": "sequentie", "d": "De volgorde van basen in een stuk DNA (of van aminozuren in een eiwit)."},
  {"t": "databank", "d": "Een openbare verzameling van sequenties met wat erover bekend is (soort, gen, wie hem las), waarin iedereen kan zoeken. De drie grote (in Amerika, Europa en Japan) wisselen elke dag uit."},
  {"t": "DNA-barcode", "d": "Een vast stukje DNA dat bij de meeste soorten net iets verschilt, waardoor je er een soort aan herkent. Bij dieren meestal ongeveer 650 letters uit het COI-gen in de mitochondriën."},
  {"t": "uitlijnen", "d": "Twee of meer sequenties zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan, met gaten waar een stukje ontbreekt of extra is."},
  {"t": "gat", "d": "Een streepje in een uitlijning op de plek waar in de ene sequentie een letter ontbreekt (of in de andere een letter extra is)."},
  {"t": "uitlijnscore", "d": "Getal dat zegt hoe goed een uitlijning past, bijvoorbeeld gelijk +1, anders −1, gat −1. Hoe hoger, hoe beter. Echte programma's gebruiken andere punten."},
  {"t": "BLAST", "d": "Zoekprogramma dat een sequentie vergelijkt met een databank: het zoekt eerst waar korte stukjes (woordjes) precies voorkomen en lijnt alleen daar verder uit."},
  {"t": "algoritme", "d": "Een vast stappenplan dat een computer uitvoert, zoals 'loop in stappen van drie door het mRNA en zoek elk codon op'."},
  {"t": "Python", "d": "Een programmeertaal die veel bio-informatici gebruiken; met een paar regels laat je de computer bijvoorbeeld een mRNA vertalen in aminozuren."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

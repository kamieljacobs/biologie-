import json
film = {
 "slug": "3-voorbij-dominant-en-recessief",
 "hoofdstuk": "erfelijkheid",
 "hoofdstukNaam": "Erfelijkheid",
 "title": "Voorbij dominant en recessief",
 "sub": "intermediair, codominant, letaal en polygeen",
 "puzzle": "Rood × wit geeft roze. Mengen allelen dan, zoals verf?",
 "meta": "erfelijkheid 3/6",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "alleen": "havo · vwo",
 "seriesline": "Biologie bij Kamiel · reeks Erfelijkheid · film 3 van 6 · volgende: <a href=\"4-dihybride-kruising-en-gekoppelde-overerving.html\">Dihybride kruising en gekoppelde overerving</a>",
 "lead": "Een rode en een witte leeuwenbek geven roze nakomelingen. Lijkt dat op mengen? In deze film zie je vier manieren waarop allelen samen een eigenschap maken: intermediair (de leeuwenbek), codominant en multipele allelen (de bloedgroepen), een letale factor (de gele muis) en polygene overerving (lengte). En je ontdekt dat allelen nooit mengen.",
 "endHaak": "Wat gebeurt er als je naar twee genen tegelijk kijkt?",
 "minis": {
  "Hoofdstuk 1": "Hoe kan rood × wit roze geven?",
  "Hoofdstuk 2": "Kan een kind een bloedgroep hebben die geen van de ouders heeft?",
  "Hoofdstuk 3": "Waar blijven de ontbrekende muizen?",
  "Hoofdstuk 4": "Waarom is lengte geen kwestie van lang of kort?",
  "Recap": "Mengen allelen nu wel of niet?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: gezin De Wit en leerlingen uit het castboek. Muis: dierenbibliotheek (uitknippop). Stijl: Part C van de filmprompt (v13). Versie 2.0 · oktober 2026.",
 "questions": {
  "q07": {"q": "Je kruist twee roze leeuwenbekken (RW × RW). Wat verwacht je bij de nakomelingen?", "correct": 2,
          "explain": "Elke plant maakt gameten met R en met W. In het kruisingsschema: 1 RR (rood), 2 RW (roze), 1 WW (wit). Rood en wit komen terug, dus de allelen zijn niet gemengd."},
  "q15": {"q": "Een moeder heeft bloedgroep A, de vader bloedgroep B. Kan hun kind bloedgroep O hebben?", "correct": 1,
          "explain": "Ja, als de moeder Iᴬi is en de vader Iᴮi. Krijgt het kind van allebei de i, dan is het ii: bloedgroep O. De kans daarop is ¼."},
  "q20": {"q": "Twee gele muizen geven steeds ongeveer 2 gele op 1 grijze jongen in plaats van 3 : 1. Waar is de rest gebleven?", "correct": 0,
          "explain": "Een embryo met twee gele allelen (GG) ontwikkelt zich niet: het gele allel is in dubbele dosis dodelijk. Van de drie vakjes die overblijven zijn er twee geel en één grijs."},
  "q26": {"q": "Bij lengte zie je geen duidelijke groepen. Is lengte dan niet erfelijk?", "correct": 1,
          "explain": "Lengte is voor een groot deel erfelijk. Heel veel genen erven elk volgens Mendel; hun effecten tellen op, en het milieu doet er iets bij. Dat geeft een vloeiende reeks."}
 },
 "glossary": [
  {"t": "intermediair (onvolledig dominant)", "d": "Het fenotype van de heterozygoot ligt tussen dat van de twee homozygoten in; roze × roze geeft 1 : 2 : 1."},
  {"t": "codominant", "d": "Beide allelen komen in de heterozygoot volledig tot uiting, zoals Iᴬ en Iᴮ bij bloedgroep AB. Niet ertussenin, maar allebei."},
  {"t": "multipele allelen", "d": "Meer dan twee allelen voor één gen in de bevolking (Iᴬ, Iᴮ, i); elke persoon heeft er twee."},
  {"t": "antigeen", "d": "Stof op het celoppervlak; bij de bloedgroepen een korte suikerketen met aan het eind suiker A of B. Bloedgroep O heeft de keten zonder A en zonder B."},
  {"t": "letale factor", "d": "Allel dat in dubbele dosis dodelijk is; bij twee dragers wordt 3 : 1 dan 2 : 1."},
  {"t": "polygene overerving", "d": "Eén eigenschap wordt door veel genen samen bepaald; samen met het milieu geeft dat een vloeiende reeks (normale verdeling). Verdieping."},
  {"t": "normale verdeling", "d": "Klokvormige verdeling: de meeste waarden in het midden, weinig aan de uiteinden."}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

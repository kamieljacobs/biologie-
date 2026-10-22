import json
film = {
 "slug": "bestaat-dit-echt", "hoofdstuk": "extra", "hoofdstukNaam": "Extra",
 "title": "Bestaat dit echt?", "sub": "bijzondere dieren die nu leven",
 "puzzle": "Op internet lees je de gekste dingen over dieren. Wat klopt er echt, en hoe kan dat?",
 "meta": "bijzondere dieren 1/2", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Extra · Bijzondere dieren",
 "lead": "Een beerdiertje dat de ruimte overleeft, een kreeft met een slag als een kruisboog, een kever die kokend gif spuit. Tien dieren die verzonnen lijken, maar echt bestaan. Bij elk dier een bewering van internet: klopt het, is het overdreven of verzonnen? Kies zelf je niveau: beginner, basis of gevorderd.",
 "endHaak": "welk dier zou jij nog willen checken?",
 "minis": {"Het beerdiertje": "Is een beerdiertje onsterfelijk?", "De axolotl": "Kan een axolotl alles teruggroeien?", "De bidsprinkhaankreeft": "Is zijn slag sneller dan een kogel?", "De pistoolgarnaal": "Waar komt de knal vandaan?", "De octopus": "Waar zitten de meeste zenuwcellen?", "Het vogelbekdier": "Vogel, zoogdier of reptiel?", "De naakte molrat": "Krijgt een molrat nooit kanker?", "De onsterfelijke kwal": "Kan hij echt nooit doodgaan?", "De bombardeerkever": "Wat spuit hij?", "De liervogel": "Doet hij echt een kettingzaag na?", "Slot": "Wie heeft het gemeten?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren getekend volgens de tekenrecepten (Part C9). Versie 1.0 · oktober 2026.",
 "questions": {
  "q04": {"q": "Beerdiertjes zijn onsterfelijk.", "correct": 1, "explain": "Overdreven: actief gaan ze snel dood door hitte, maar als uitgedroogd tonnetje overleven ze extreme omstandigheden."},
  "q09": {"q": "Een axolotl kan alles teruggroeien.", "correct": 1, "explain": "Overdreven: poten, staart, kieuwen en stukjes hart en hersenen wel, een nieuwe kop niet."},
  "q14": {"q": "Zijn slag is sneller dan een kogel.", "correct": 1, "explain": "Overdreven: ±80 km/u, een kogel is meer dan tien keer zo snel. Alleen het optrekken is net zo heftig."},
  "q19": {"q": "Waar komt de knal van de pistoolgarnaal vandaan?", "correct": 1, "explain": "Van een bel die in elkaar klapt, in het straaltje water uit de schaar."},
  "q24": {"q": "Waar zitten de meeste zenuwcellen van een octopus?", "correct": 2, "explain": "In zijn armen: ongeveer twee derde."},
  "q29": {"q": "Wat is een vogelbekdier?", "correct": 1, "explain": "Een zoogdier: vacht en melk, al legt hij eieren."},
  "q34": {"q": "Molratten krijgen nooit kanker.", "correct": 1, "explain": "Overdreven: heel zelden, er zijn een paar gevallen bekend."},
  "q39": {"q": "Kan de onsterfelijke kwal echt nooit doodgaan?", "correct": 1, "explain": "Hij kan wel doodgaan (opgegeten, ziek), maar kan als poliep opnieuw beginnen."},
  "q44": {"q": "Wat spuit de bombardeerkever?", "correct": 1, "explain": "Kokend heet gif van bijna 100 °C, geen vuur."},
  "q49": {"q": "Een liervogel doet een kettingzaag na.", "correct": 1, "explain": "Klopt, maar alleen bij vogels in gevangenschap die bouwlawaai hoorden; in het wild is het niet bekend."}
 },
 "glossary": [
  {"t": "uitdroging (anhydrobiose)", "d": "Toestand waarin een dier bijna al zijn water kwijt is en zijn stofwisseling stilligt; het beerdiertje wordt dan een tonnetje."},
  {"t": "blastema", "d": "Bultje van delende cellen op een wond waaruit een nieuw lichaamsdeel groeit, zoals bij de axolotl."},
  {"t": "regeneratie", "d": "Het teruggroeien van een verloren lichaamsdeel."},
  {"t": "cavitatie", "d": "Een dampbel die ontstaat doordat de druk in water heel laag wordt, niet door hitte; klapt hij in elkaar, dan geeft dat een drukgolf."},
  {"t": "chromatofoor", "d": "Zakje met kleurstof in de huid van een octopus, dat spiertjes kunnen opentrekken tot een gekleurde vlek."},
  {"t": "elektroreceptor", "d": "Zintuigcel die kleine elektrische stroompjes voelt, zoals in de snavel van het vogelbekdier."},
  {"t": "hyaluronzuur", "d": "Lange suikerketen tussen de cellen; bij de naakte molrat extra lang, wat cellen eerder laat stoppen met delen."},
  {"t": "transdifferentiatie", "d": "Een gespecialiseerde cel verandert direct in een ander celtype, zoals bij de onsterfelijke kwal."},
  {"t": "enzym", "d": "Eiwit dat een reactie versnelt; in de reactiekamer van de bombardeerkever."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

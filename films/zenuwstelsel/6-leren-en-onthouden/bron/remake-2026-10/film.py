import json
film = {
 "slug": "6-leren-en-onthouden-nieuw", "audiomap": "6-leren-en-onthouden", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Leren en onthouden", "sub": "Hoe veranderen je hersenen als je iets leert?",
 "puzzle": "Niemand wordt geboren met fietsen, of met een lievelingsnummer. Toch kun je allebei. Wat is er in je hoofd veranderd?",
 "meta": "zenuwstelsel · leren en onthouden", "version": "2.0 · oktober 2026", "titleLook": "schema", "alleen": "vwo",
 "seriesline": "Biologie bij Kamiel · Zenuwstelsel · film 6 · 5 vwo",
 "lead": "Een kind van zes leert fietsen; tien jaar later fiets je kletsend naar school en herken je een nummer aan twee tonen. De film laat zien wat er dan in je hersenen veranderd is: synapsen die sterker worden, herinneringen als patronen, klassieke conditionering (Pavlov), twee soorten geheugen (Henry en zijn hippocampus), gespreid leren en snoeien, en automatiseren.",
 "endHaak": "Volgende film: Slaap · wat doen je hersenen 's nachts?",
 "minis": {"Hoofdstuk 1": "Wat verandert er als je iets leert?", "Hoofdstuk 2": "Hoe roept een deel het geheel op?", "Hoofdstuk 3": "Is geheugen één systeem?",
           "Hoofdstuk 4": "Hoe leer je het slimst?", "Hoofdstuk 5": "Waarom kun je fietsen en praten tegelijk?", "Samenvatting": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_multilingual_v2; bestaande takes uit versie 1.1). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek (zonder namen in beeld of stem). Stijl: Part C. Versie 2.0 · oktober 2026 (lichte remake, prompt v13). <a href=\"../../index.html#regeling\">Naar de reeks</a>.",
 "questions": {
  "v1": {"q": "Je leert iets nieuws. Wat verandert er dan in je hersenen?", "correct": 1, "explain": "Vooral de verbindingen: bestaande synapsen worden sterker en er groeien nieuwe. Er komen hooguit een paar nieuwe zenuwcellen bij."},
  "v2": {"q": "Pavlov laat daarna steeds weer de bel klinken, maar geeft geen eten meer. Wat gebeurt er met het speeksel bij de bel?", "correct": 1, "explain": "Het wordt langzaam minder: uitdoven (extinctie). De koppeling wordt niet gewist; de hond leert erbij dat de bel nu geen eten betekent."},
  "v3": {"q": "Henry oefent dagenlang een moeilijke tekentaak: een ster natekenen terwijl hij alleen in een spiegel kijkt. Wordt hij beter?", "correct": 1, "explain": "Ja: vaardigheden lopen niet via de hippocampus. Maar hij weet niet dat hij geoefend heeft."},
  "v4": {"q": "Je hebt drie uur om te leren voor een toets. Wat blijft het best hangen?", "correct": 1, "explain": "Gespreid leren: elke keer dat je na een pauze iets weer ophaalt, wordt het patroon steviger."},
  "v5": {"q": "Een beginner kan niet praten tijdens het fietsen, iemand die al jaren fietst wel. Hoe komt dat?", "correct": 1, "explain": "Na veel oefenen regelen kleine hersenen en basale kernen het fietsen; de voorhoofdskwab is vrij voor praten."}
 },
 "glossary": json.load(open('glossary.json', encoding='utf-8')),
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

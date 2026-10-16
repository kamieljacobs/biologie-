import json
film = {
 "slug": "4-sekse-gender-diversiteit", "hoofdstuk": "voortplanting", "hoofdstukNaam": "Voortplanting",
 "title": "Sekse, gender en diversiteit", "sub": "Hoe je lichaam laag voor laag jongen of meisje wordt, en wat sekse niet is",
 "puzzle": "Een embryo van een paar millimeter: is het al te zien of het een jongen of een meisje wordt?",
 "meta": "voortplanting · geslachtsontwikkeling", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Voortplanting · film 4",
 "lead": "Sekse ontstaat in lagen: XX of XY, het SRY-gen, zaadballen of eierstokken, hormonen, de geslachtsorganen en later de puberteit. Meestal passen die lagen bij elkaar, maar elke laag kan anders lopen (Klinefelter, Turner, androgeen-ongevoeligheid, AGS: intersekse). Bij andere dieren regelen chromosomen, temperatuur of de groep de sekse. En sekse is iets anders dan genderidentiteit, genderexpressie en seksuele oriëntatie.",
 "endHaak": "welke laag uit deze film vond jij het meest verrassend, en waarom?",
 "minis": {"Hoofdstuk 1": "Hoe wordt een embryo een jongen of een meisje?", "Hoofdstuk 2": "Wat als de lagen niet bij elkaar passen?", "Hoofdstuk 3": "Hoe regelen andere dieren het, en wat is gender?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een embryo van een paar millimeter: hoe zien de geslachtsorganen eruit?", "correct": 2, "explain": "Tot ongeveer week zes is de aanleg bij jongens en meisjes precies hetzelfde."},
  "q07": {"q": "Iemand heeft de geslachtschromosomen X, X en Y. Jongen of meisje?", "correct": 0, "explain": "Er is een Y-chromosoom met het SRY-gen, dus ontstaan er zaadballen: een jongen (syndroom van Klinefelter)."},
  "q10": {"q": "In een groepje clownvissen gaat het vrouwtje dood. Wat gebeurt er?", "correct": 1, "explain": "Het mannetje wordt een vrouwtje; de grootste van de rest wordt het nieuwe mannetje."}
 },
 "glossary": [
  {"t": "sekse", "d": "Je biologische geslacht: chromosomen, geslachtsklieren, hormonen en geslachtsorganen."},
  {"t": "geslachtschromosomen", "d": "X en Y bij de mens: XX meestal vrouw, XY meestal man. Bij vogels Z en W."},
  {"t": "SRY-gen", "d": "Gen op het Y-chromosoom dat de aanleg van de geslachtsklier omvormt tot een zaadbal."},
  {"t": "primaire geslachtskenmerken", "d": "De geslachtsorganen waarmee je geboren wordt, inwendig en uitwendig."},
  {"t": "secundaire geslachtskenmerken", "d": "Kenmerken die in de puberteit ontstaan door geslachtshormonen, zoals borsten, baardgroei en een lagere stem."},
  {"t": "syndroom van Klinefelter", "d": "XXY: een man, vaak onvruchtbaar; ongeveer 1 op 700 jongens."},
  {"t": "syndroom van Turner", "d": "Eén X (X0): een vrouw, vaak kleiner, eierstokken werken meestal niet goed; ongeveer 1 op 2500 meisjes."},
  {"t": "androgeen-ongevoeligheid", "d": "XY met zaadballen, maar de receptor voor testosteron werkt niet; uitwendig vrouwelijk."},
  {"t": "AGS (adrenogenitaal syndroom)", "d": "De bijnieren maken te veel mannelijke hormonen; zit in de hielprik."},
  {"t": "intersekse (DSD)", "d": "Een lichaam dat niet in het standaardplaatje van man of vrouw past."},
  {"t": "genderidentiteit", "d": "Hoe je jezelf ervaart: als man, als vrouw, of anders."},
  {"t": "genderexpressie", "d": "Hoe je je gender laat zien, bijvoorbeeld met kleding of kapsel."},
  {"t": "seksuele oriëntatie", "d": "Op wie je verliefd wordt en tot wie je je aangetrokken voelt."},
  {"t": "transgender", "d": "Je genderidentiteit past niet bij de sekse die bij je geboorte is vastgesteld."},
  {"t": "non-binair", "d": "Je voelt je niet alleen man of alleen vrouw."},
  {"t": "SOX9", "d": "vwo · Gen dat door het SRY-eiwit wordt aangezet en de vorming van de zaadbal verder aanstuurt."},
  {"t": "XX-man", "d": "vwo · Man met twee X-chromosomen, waarbij het SRY-gen op een X terecht is gekomen; ongeveer 1 op 20 000 mannen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

import json
film = {
 "slug": "kun-je-onderzoek-vertrouwen", "hoofdstuk": "cellen", "hoofdstukNaam": "Cellen",
 "title": "Kun je onderzoek vertrouwen?", "sub": "Toeval, oorzaak en de wetenschap als systeem",
 "puzzle": "Een biotechbedrijf meldde in 2012: van drieënvijftig spraakmakende kankerstudies konden we er maar zes herhalen. Hoe kan dat?",
 "meta": "onderzoeksvaardigheden · extra", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Onderzoeksvaardigheden · extra (verdieping)",
 "lead": "Verdieping bij Onderzoek doen in de biologie, voor vwo 5–6 en het profielwerkstuk: de nulhypothese, de p-waarde en de chi-kwadraattoets; waarom té mooie resultaten verdacht zijn; hoe je met patiënt-controle- en cohortonderzoek een oorzaak waarschijnlijk maakt; en hoe de wetenschap zichzelf verbetert, en waar dat hapert.",
 "endHaak": "is het herhaald, was het vooraf vastgelegd, en wie betaalde het?",
 "minis": {"Hoofdstuk 1 — Toeval of echt?": "Is een afwijking echt, of toeval?", "Hoofdstuk 2 — Te mooi om waar te zijn": "Kan een uitkomst te mooi zijn?", "Hoofdstuk 3 — Van verband naar oorzaak": "Hoe maak je een oorzaak waarschijnlijk zonder experiment?", "Hoofdstuk 4 — Hoe wetenschap zichzelf verbetert": "Waarom klopt gepubliceerd onderzoek soms niet?", "Recap": "Kun je onderzoek vertrouwen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · 30 oktober 2026 (prompt v13; gemaakt van het diepgaande deel van de oude film Onderzoek doen in de biologie).",
 "questions": {
  "q02": {"q": "53 spraakmakende kankerstudies, maar 6 keer te herhalen. Hoe kan dat?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 4."},
  "q11": {"q": "Een onderzoek vindt p = 0,03. Wat betekent dat?", "correct": 2, "explain": "De p-waarde rekent vanuit de nulhypothese: de kans op zo'n grote of grotere afwijking als alleen toeval speelt."},
  "q17": {"q": "Iemand gooit tien keer honderd keer een munt op en meldt steeds 49, 50 of 51 keer kop. Wat denk je?", "correct": 0, "explain": "Bij echt toeval wijkt het vaker af: zo netjes is verdacht."},
  "q23": {"q": "Welke opzet sluit omgekeerde causaliteit het best uit?", "correct": 1, "explain": "Een cohortonderzoek: eerst meten, dan volgen. Zo komt de oorzaak vóór het gevolg."},
  "q31": {"q": "Je toetst twintig keer iets zonder effect. Hoe vaak verwacht je toch een significante uitkomst?", "correct": 2, "explain": "Bij een grens van 1 op 20: ongeveer één keer; de kans op minstens één is ± 64 %."}
 },
 "glossary": [
  {"t": "nulhypothese", "d": "De aanname dat er niets bijzonders is: een afwijking komt alleen door toeval."},
  {"t": "p-waarde", "d": "De kans op zo'n grote of grotere afwijking als de nulhypothese klopt. Niet de kans dat de hypothese klopt."},
  {"t": "significant", "d": "p kleiner dan de gekozen grens (meestal 0,05): je verwerpt de nulhypothese. Significant is niet bewezen, en zegt niet hoe groot het effect is."},
  {"t": "simulatie", "d": "Een proef vaak nabootsen met toeval, om te zien welke uitkomsten je krijgt als de nulhypothese klopt."},
  {"t": "chi-kwadraattoets", "d": "Toets die waargenomen (W) en verwachte (V) aantallen vergelijkt: χ² = Σ (W − V)² / V, vergelijken met de grenswaarde."},
  {"t": "bevestigingsbias", "d": "Onbewust zien, tellen of indelen wat je verwacht; geeft uitkomsten die té dicht bij de verwachting liggen."},
  {"t": "patiënt-controleonderzoek", "d": "Mensen met de ziekte vergelijken met een controlegroep zonder de ziekte, en terugkijken naar wat ze vroeger deden."},
  {"t": "cohortonderzoek", "d": "Eerst meten (bijvoorbeeld wie rookt), dan een grote groep jaren volgen: de oorzaak is gemeten vóór het gevolg."},
  {"t": "dosis-effectrelatie", "d": "Hoe meer van de oorzaak, hoe groter het effect."},
  {"t": "peer review", "d": "Beoordeling van een artikel door vakgenoten vóór publicatie."},
  {"t": "publicatiebias", "d": "Opvallende uitkomsten worden vaker gepubliceerd dan onderzoek waarin niets gevonden werd."},
  {"t": "p-hacking", "d": "Net zo lang analyseren tot er iets significants uitkomt, en alleen dat melden."},
  {"t": "preregistratie", "d": "Vooraf vastleggen wat je gaat meten en hoe je het toetst."},
  {"t": "fraude", "d": "Gegevens verzinnen, vervalsen of werk van anderen overnemen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

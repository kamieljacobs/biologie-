import json
film = {
 "slug": "12-psychologie-experimenten", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Beroemde psychologie-experimenten", "sub": "Asch, Milgram en de marshmallowtest, en wat herhalingen lieten zien",
 "puzzle": "Zes leerlingen zeggen allemaal hetzelfde foute antwoord. Hoe vaak ga jij mee met de groep?",
 "meta": "gedrag · sociale psychologie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 12 van 12",
 "lead": "Asch: mensen gaan in ongeveer een derde van de beurten mee met een fout groepsantwoord, maar veel minder als één ander het goede antwoord geeft. Milgram: veel mensen gehoorzaamden gezag, maar hoeveel hangt sterk af van de situatie en de proef had zwakke punten; nu gelden strenge ethische regels. De marshmallowtest voorspelt veel minder dan gedacht. Beroemd is niet bewezen: goed onderzoek wordt herhaald.",
 "endHaak": "wanneer ging jij voor het laatst mee met de groep, terwijl je het eigenlijk anders zag?",
 "minis": {"Hoofdstuk 1": "Hoe vaak ga je mee met de groep?", "Hoofdstuk 2": "Hoe ver gaan mensen als iemand met gezag het zegt?", "Hoofdstuk 3": "Voorspelt wachten op een snoepje je toekomst?", "Recap": "Wat leren beroemde experimenten ons?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Yasmin (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Hoe vaak gingen de proefpersonen mee met de groep?", "correct": 1, "explain": "Gemiddeld ongeveer een op de drie keer."},
  "q07": {"q": "De onderzoeker brak eerder een belofte. Hoe lang wachtten de kinderen daarna?", "correct": 1, "explain": "Veel korter: zo'n drie minuten in plaats van twaalf."}
 },
 "glossary": [
  {"t": "conformisme", "d": "Je gedrag of oordeel aanpassen aan dat van de groep."},
  {"t": "gehoorzaamheid", "d": "Een opdracht uitvoeren omdat iemand met gezag het vraagt."},
  {"t": "uitstel van beloning", "d": "Wachten op een grotere beloning later in plaats van een kleinere nu (marshmallowtest)."},
  {"t": "replicatie", "d": "Een onderzoek opnieuw doen om te zien of het resultaat terugkomt."},
  {"t": "ethiek van onderzoek", "d": "Regels voor onderzoek met mensen: vooraf toestemming, altijd mogen stoppen, achteraf uitleg."},
  {"t": "replicatiecrisis", "d": "vwo · Het inzicht dat veel gepubliceerde (psychologische) resultaten bij herhaling niet terugkomen."},
  {"t": "preregistratie", "d": "vwo · Vooraf vastleggen wat je gaat meten en hoe je het analyseert."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

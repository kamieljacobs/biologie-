import json
film = {
 "slug": "3-de-spleet-nieuw", "audiomap": "3-de-spleet", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "De spleet", "sub": "Hoe springt een bericht van cel naar cel?",
 "puzzle": "Je ruikt vers brood. Dat bericht gaat van je neus via een paar zenuwcellen naar je hersenen. Maar tussen twee zenuwcellen zit een spleet. Hoe komt het bericht daaroverheen?",
 "meta": "zenuwstelsel · de spleet", "version": "2.0 · 29 oktober 2026", "titleLook": "schema", "alleen": "vwo",
 "seriesline": "Biologie bij Kamiel · Zenuwstelsel · film 3",
 "lead": "De geur van vers brood is een bericht van je neus naar je hersenen. Tussen twee zenuwcellen zit een spleet: de synaps. Je ziet hoe de impuls stopt bij het eindknopje, hoe blaasjes neurotransmitter de spleet in laten, hoe receptoren aan de overkant een nieuwe impuls maken, hoe een synaps kan aanzetten of remmen, hoe de spleet weer schoon wordt en waarom een bericht maar één kant op gaat.",
 "endHaak": "volgende film: koffie, wijn en wat er dan in de synaps gebeurt",
 "minis": {"Hoofdstuk 1": "Hoe zitten twee zenuwcellen aan elkaar?", "Hoofdstuk 2": "Wat gaat er door de spleet?", "Hoofdstuk 3": "Kan een synaps ook remmen?", "Hoofdstuk 4": "Hoe wordt de spleet weer schoon?", "Hoofdstuk 5": "Kan een bericht terug?", "Samenvatting": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_multilingual_v2; opnames van versie 1.0). Script, animatie en speler: Kamiel met Claude. Personage: castboek. Stijl: Part C (prompt v13). Versie 2.0 · 29 oktober 2026 (lichte remake in de donkere stijl); 1.1 · 28 oktober 2026; 1.0 · 4 oktober 2026. Bronnen: zie het docentdeel. <a href=\"../../index.html#regeling\">Naar de reeks</a>.",
 "questions": {
  "vr1": {"q": "Twee zenuwcellen geven een bericht door. Hoe zitten ze aan elkaar?", "correct": 2, "explain": "Er zit een smalle spleet tussen: ze raken elkaar niet. Het eindknopje, de spleet en het membraan van de volgende cel samen heten een synaps."},
  "vr2": {"q": "Wat gaat er precies door de spleet?", "correct": 2, "explain": "Moleculen neurotransmitter uit de blaasjes. De impuls zelf stopt bij het eindknopje; aan de overkant ontstaat een nieuwe impuls."},
  "vr3": {"q": "Kan een synaps een zenuwcel ook stiller maken?", "correct": 1, "explain": "Ja. Bij een remmende synaps gaan kanalen open waardoor het membraan negatiever wordt: verder van de drempel."},
  "vr4": {"q": "De neurotransmitter blijft in de spleet hangen, aan de receptoren. Wat gebeurt er met de volgende cel?", "correct": 0, "explain": "Zolang de receptoren bezet zijn, blijven de kanalen open en blijft de cel vuren. Daarom moet de spleet weer schoon."},
  "vr5": {"q": "Kan een bericht via een synaps ook terug, van de tweede cel naar de eerste?", "correct": 2, "explain": "Nee: blaasjes zitten alleen in het eindknopje en receptoren alleen in de volgende cel. Het bericht gaat één kant op."}
 },
 "glossary": json.load(open('glossary.json', encoding='utf-8')),
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

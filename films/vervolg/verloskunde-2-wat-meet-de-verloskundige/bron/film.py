import json
film = {
 "slug": "verloskunde-2-wat-meet-de-verloskundige", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Wat meet de verloskundige?", "sub": "controles, risico's en doorverwijzen",
 "puzzle": "Waarom meet de verloskundige bij elke controle je bloeddruk?",
 "meta": "verloskunde · zwangerschapscontrole", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verloskunde",
 "lead": "Esra voelt zich prima, toch meet Verloskundige Mirjam bij elke controle haar bloeddruk. Wat meet een verloskundige, hoe ontstaan zwangerschapsvergiftiging en zwangerschapsdiabetes, en wanneer verwijst ze door naar de gynaecoloog?",
 "endHaak": "welke beslissing in dit vak lijkt jou het moeilijkst?",
 "minis": {"Hoofdstuk 1": "Wat gebeurt er bij een gewone controle?", "Hoofdstuk 2": "Hoe leidt een slecht ingegroeide placenta tot hoge bloeddruk?", "Hoofdstuk 3": "Waarom maakt de placenta de moeder minder gevoelig voor insuline?", "Hoofdstuk 4": "Wanneer verwijst een verloskundige door?", "Recap": "Hoe is het nu met Esra?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Verloskundige Mirjam, Esra en Dr. Kim als gynaecoloog (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom meet de verloskundige bij elke controle de bloeddruk?", "correct": 1, "explain": "Een hoge bloeddruk kan het eerste teken zijn van pre-eclampsie, een probleem met de placenta. Je merkt het zelf vaak pas laat."},
  "q10": {"q": "Waar komt het eiwit in de urine bij pre-eclampsie vandaan?", "correct": 2, "explain": "De filtertjes in de nieren zijn beschadigd en laten eiwitten uit het bloed door, die er normaal niet doorheen gaan."},
  "q16": {"q": "Waarom krijgt een baby van een moeder met zwangerschapsdiabetes soms een te lage bloedsuiker?", "correct": 1, "explain": "De baby maakt nog veel insuline, maar de toevoer van glucose uit de placenta stopt bij de geboorte ineens."},
  "q20": {"q": "Welke situatie is een reden om door te verwijzen?", "correct": 2, "explain": "Een bloeddruk van 150 over 100 met hoofdpijn in week 34 kan pre-eclampsie zijn. Misselijkheid in week 8 en het eerste schoppen zijn normaal."}
 },
 "glossary": [
  {"t": "zwangerschapscontrole", "d": "Afspraak bij de verloskundige, in totaal ongeveer twaalf keer: gesprek, bloeddruk, buik voelen, groei en hartslag van het kind."},
  {"t": "spiraalslagaders", "d": "Kleine slagaders in de baarmoederwand die cellen van de placenta ombouwen tot wijde buizen, zodat er veel bloed langs de placenta stroomt."},
  {"t": "pre-eclampsie", "d": "Zwangerschapsvergiftiging: hoge bloeddruk en schade aan organen (vaak eiwit in de urine) in de tweede helft van de zwangerschap, door een placenta die niet goed is ingegroeid."},
  {"t": "eiwit in de urine", "d": "Teken dat de filters in de nieren beschadigd zijn en grote eiwitten doorlaten."},
  {"t": "zwangerschapsdiabetes", "d": "Te hoge bloedsuiker in de zwangerschap doordat de alvleesklier de door placentahormonen verminderde insulinegevoeligheid niet kan bijhouden."},
  {"t": "suikertest", "d": "Glucosetolerantietest: nuchter bloedsuiker meten, zoet drankje, na twee uur opnieuw meten; in Nederland bij zwangeren met een verhoogd risico."},
  {"t": "eerste lijn", "d": "Zorg door de verloskundige bij een gezonde zwangerschap en bevalling, zonder arts."},
  {"t": "tweede lijn", "d": "Zorg door de gynaecoloog in het ziekenhuis bij een verhoogd risico."},
  {"t": "doorverwijzen", "d": "De zorg overdragen aan de gynaecoloog volgens landelijke afspraken; als het probleem is opgelost, kan de zorg terug naar de verloskundige."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

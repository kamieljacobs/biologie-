import json
film = {
 "slug": "farmacie-3-achter-de-balie", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Achter de balie", "sub": "wat een apotheker doet met jouw medicijnen",
 "puzzle": "Waarom aarzelt de apotheker als Opa Henk om ibuprofen vraagt?",
 "meta": "farmacie · apotheek", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Farmacie",
 "lead": "Opa Henk haalt vijf medicijnen op en vraagt er ibuprofen bij. Het systeem van de apotheek geeft een signaal: samen met zijn plastablet en ACE-remmer kan ibuprofen zijn nieren schaden. Apotheker Ravi legt uit waarom, geeft een veiliger advies en ontdekt in het gesprek dat Henk zijn plastablet overslaat op clubdagen. Ongeveer de helft van de mensen met een langdurige ziekte gebruikt medicijnen anders dan bedoeld, meestal om goede redenen. Met een ander innamemoment, een medicijnrol en een medicatiebeoordeling samen met de huisarts helpt de apotheker één persoon veilig verder.",
 "endHaak": "welke medicijnen gebruikt iemand in jouw familie, en weet de apotheek dat allemaal?",
 "minis": {"Hoofdstuk 1": "Waarom zakt de druk in de filtertjes als de drie middelen samenkomen?", "Hoofdstuk 2": "Wat vraagt Ravi nog meer dan alleen over de ibuprofen?", "Hoofdstuk 3": "Waarom slaat Henk zijn plastablet over?", "Hoofdstuk 4": "Wat is een medicatiebeoordeling?", "Recap": "Welke opleidingen leiden naar werk in de apotheek?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Apotheker Ravi en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Opa Henk gebruikt onder andere een plastablet en een ACE-remmer en vraagt er ibuprofen bij. Waarom aarzelt Apotheker Ravi?", "correct": 0, "explain": "Ibuprofen kun je zonder recept kopen, maar samen met een plastablet en een ACE-remmer kan het de nieren schaden. Daarom kijkt de apotheek bij elk nieuw middel wat iemand al gebruikt."},
  "q06": {"q": "Hoeveel mensen met een langdurige ziekte gebruiken hun medicijnen anders dan bedoeld?", "correct": 2, "explain": "Ongeveer de helft (WHO 2003). Meestal niet uit luiheid: mensen vergeten het, hebben last van bijwerkingen, merken geen verschil of hebben een praktische reden."},
  "q09": {"q": "Wat is het belangrijkste doel van een medicatiebeoordeling?", "correct": 1, "explain": "Minder schade door bijwerkingen en interacties. Hoe meer medicijnen, hoe groter de kans dat ze elkaar of de patiënt in de weg zitten; een deel van de ziekenhuisopnames door medicijnen is te voorkomen."}
 },
 "glossary": [
  {"t": "medicatiebewaking", "d": "Controle bij elk nieuw middel: het systeem van de apotheek vergelijkt het met wat iemand al gebruikt en geeft een signaal bij een interactie, een te hoge dosis of een risico door een ziekte."},
  {"t": "interactie", "d": "Twee of meer medicijnen beïnvloeden elkaars werking of versterken elkaars bijwerkingen, zoals ibuprofen, een plastablet en een ACE-remmer samen bij de nieren."},
  {"t": "glomerulus", "d": "Kluwen haarvaatjes in de nier waar bloed wordt gefilterd; bloed komt binnen via een aanvoerend vaatje en verlaat de kluwen via een afvoerend vaatje. In de film: de filtertjes."},
  {"t": "filterdruk", "d": "De bloeddruk in de glomerulus die vocht en opgeloste stoffen uit het bloed perst. Zakt die druk, dan filtert de nier minder."},
  {"t": "ACE-remmer", "d": "Medicijn tegen hoge bloeddruk en hartfalen; remt de vorming van angiotensine II, waardoor onder andere het afvoerende vaatje van de glomerulus wijder wordt."},
  {"t": "plastablet (diureticum)", "d": "Medicijn dat de nieren meer zout en water laat uitscheiden; er komt minder vocht in het bloed. Na inname moet je een paar uur vaak plassen."},
  {"t": "NSAID", "d": "Ontstekingsremmende pijnstiller zoals ibuprofen en naproxen; remt de vorming van prostaglandinen, waardoor onder andere het aanvoerende vaatje in de nier nauwer wordt."},
  {"t": "therapietrouw", "d": "De mate waarin iemand medicijnen gebruikt zoals afgesproken. Bij langdurige ziekten ongeveer de helft; de redenen zijn meestal begrijpelijk."},
  {"t": "medicatiebeoordeling", "d": "Gesprek waarin huisarts, apotheker en patiënt de hele medicijnlijst langslopen: werkt alles nog, is er iets dubbel, kan er iets af? Vooral bij ouderen met veel medicijnen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

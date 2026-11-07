import json
film = {
 "slug": "psychologie-5-in-de-spreekkamer", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "In de spreekkamer", "sub": "gesprekstechniek, beroepsgeheim en classificeren",
 "puzzle": "Sam (16) vraagt zijn psycholoog om alles geheim te houden. Wat zeg je dan?",
 "meta": "psychologie · klinisch", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie",
 "lead": "Het eerste werk van een psycholoog is luisteren: open vragen stellen, samenvatten en doorvragen. In de intake maak je van een klacht een hulpvraag en maak je samen een plan; vanaf zestien beslist een jongere zelf. Het beroepsgeheim staat in de wet en de beroepscode, maar heeft grenzen: bij ernstig gevaar mag je het doorbreken, en bij een vermoeden van geweld thuis volg je de meldcode (overleggen, afwegen, zo nodig melden bij Veilig Thuis; bij direct gevaar 112). Met de DSM classificeer je klachten volgens afgesproken criteria, met grenzen die een afspraak zijn.",
 "endHaak": "welke vraag zou jij Sam als eerste stellen, en waarom?",
 "minis": {"Hoofdstuk 1": "Welke vraag helpt iemand verder te vertellen?", "Hoofdstuk 2": "Wat is het verschil tussen een klacht en een hulpvraag?", "Hoofdstuk 3": "Wanneer mag een psycholoog het geheim doorbreken?", "Hoofdstuk 4": "Wat doe je bij een vermoeden van geweld thuis?", "Hoofdstuk 5": "Hoe werkt een diagnose met de DSM?", "Recap": "Wat zeg je tegen Sam?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Sam (castboek); jij als psycholoog in ik-perspectief. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Sam vraagt: beloof je dat je het aan niemand doorvertelt? Wat zeg je?", "correct": 1, "explain": "Je vertelt eerlijk wat je wel en niet geheim kunt houden. Bijna alles blijft binnen de spreekkamer, behalve als iemand in ernstig gevaar is."},
  "q05": {"q": "Sam zegt: het gaat gewoon slecht op school. Welke vraag helpt hem het best om verder te vertellen?", "correct": 2, "explain": "Een open vraag zonder verwijt. 'Waarom…' is ook open, maar klinkt al snel als een verwijt; 'Komt dat door thuis?' is sturend."},
  "q10": {"q": "Sam vertelt dat zijn vader zijn jongere zusje soms slaat. Wat doe je eerst?", "correct": 1, "explain": "Je volgt de meldcode: met Sam praten en advies vragen bij een collega of Veilig Thuis, dan afwegen. Alleen bij direct gevaar bel je meteen 112."},
  "q13": {"q": "Sam heeft vier van de negen kenmerken van een depressie. Wat betekent dat?", "correct": 1, "explain": "Volgens deze criteria net geen depressieve stoornis, maar hij kan wel veel last hebben. De grens van vijf is een afspraak."}
 },
 "glossary": [
  {"t": "open vraag", "d": "Vraag waarop iemand in eigen woorden kan antwoorden, bijvoorbeeld 'Hoe ziet zo'n dag eruit?'."},
  {"t": "gesloten vraag", "d": "Vraag waarop je ja of nee zegt; handig om iets te checken."},
  {"t": "sturende vraag", "d": "Vraag waarin de vrager al een antwoord of oorzaak invult."},
  {"t": "samenvatten", "d": "In eigen woorden teruggeven wat de cliënt zei, zodat die kan bevestigen of verbeteren."},
  {"t": "intake", "d": "Het eerste gesprek: klachten in kaart brengen, de hulpvraag vinden en samen een plan maken."},
  {"t": "hulpvraag", "d": "Wat de cliënt anders wil, bijvoorbeeld 'weer naar school gaan'; anders dan een klacht."},
  {"t": "beroepsgeheim", "d": "Plicht om te zwijgen over wat een cliënt vertelt; staat in de wet en in de beroepscode."},
  {"t": "conflict van plichten", "d": "Zwijgen en beschermen botsen; dan mag je het geheim doorbreken als er geen andere weg is."},
  {"t": "meldcode", "d": "Stappenplan bij een vermoeden van huiselijk geweld of kindermishandeling (sinds 2013): signalen, advies, gesprek, afwegen, beslissen."},
  {"t": "Veilig Thuis", "d": "Advies- en meldpunt voor huiselijk geweld en kindermishandeling (0800-2000)."},
  {"t": "DSM", "d": "Handboek dat psychische stoornissen beschrijft met criteria; de huidige versie is de DSM-5-TR."},
  {"t": "kernsymptoom", "d": "Kenmerk dat er bij een diagnose minstens moet zijn; bij depressie somberheid of geen interesse/plezier."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

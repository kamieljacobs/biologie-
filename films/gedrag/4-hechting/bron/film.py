import json
film = {
 "slug": "4-hechting", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Hechting: van baby tot verliefd", "sub": "Waarom troost belangrijker is dan voedsel",
 "puzzle": "Mila huilt als haar moeder weggaat en laat zich troosten als ze terugkomt. Ties speelt gewoon door en kijkt nauwelijks op. Welk kind is veilig gehecht?",
 "meta": "gedrag · hechting en latere relaties", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 4 van 12",
 "lead": "Hechting is de emotionele band tussen een kind en een vaste verzorger. Harlows aapjes lieten zien dat troost belangrijker is dan voedsel. In de Vreemde Situatie zie je aan de terugkomst of een kind veilig, onveilig-vermijdend of onveilig-ambivalent gehecht is. Fijngevoelig reageren helpt. De verwachtingen die je zo opbouwt (je binnenwerkmodel) neem je mee naar latere relaties, maar ze kunnen veranderen.",
 "endHaak": "hoe merk je in een vriendschap dat je op iemand kunt rekenen?",
 "minis": {"Hoofdstuk 1": "Gaat hechting om eten?", "Hoofdstuk 2": "Wanneer is een kind veilig gehecht?", "Hoofdstuk 3": "Wat heeft hechting met verliefd zijn te maken?", "Recap": "Welk kind was veilig gehecht?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Mila huilt en laat zich troosten; Ties speelt door en kijkt nauwelijks op. Welk kind is veilig gehecht?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 2."},
  "q06": {"q": "Bij welke nepmoeder bracht een aapje de meeste tijd door?", "correct": 1, "explain": "Contact en troost waren belangrijker dan voedsel."},
  "q11": {"q": "Iemand was als baby onveilig gehecht. Wat klopt?", "correct": 1, "explain": "Er is een verband, maar het is niet sterk: hechting kan veranderen."}
 },
 "glossary": [
  {"t": "hechting", "d": "De emotionele band tussen een kind en een vaste verzorger (dat hoeft niet de moeder te zijn)."},
  {"t": "veilige haven", "d": "De verzorger als plek om troost te zoeken als je bang bent."},
  {"t": "veilige basis", "d": "De verzorger als uitvalsbasis om de wereld te ontdekken."},
  {"t": "Vreemde Situatie", "d": "Proef van Ainsworth: een kind van een jaar, een onbekende kamer, een vreemde en twee korte scheidingen; de stijl blijkt vooral bij de terugkomst."},
  {"t": "veilig / onveilig-vermijdend / onveilig-ambivalent", "d": "Drie hechtingsstijlen: troost zoeken en snel kalmeren / afstand houden en weinig laten zien / vastklampen, boos zijn en moeilijk te troosten."},
  {"t": "fijngevoelig", "d": "Een verzorger die ziet wat het kind nodig heeft en daar op tijd en passend op reageert."},
  {"t": "binnenwerkmodel", "d": "Verwachtingen over jezelf en anderen die uit ervaringen ontstaan; ze kleuren latere relaties, maar kunnen veranderen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

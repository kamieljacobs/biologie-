import json
film = {
 "slug": "1-waarom-doet-een-dier-wat-het-doet", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Waarom doet een dier wat het doet?", "sub": "Gedrag onderzoeken als bioloog",
 "puzzle": "In het voorjaar van 1935 schiet een stekelbaarsmannetje in een aquarium in dreighouding naar de ruit als buiten een rode postauto voorbijrijdt. Waarom?",
 "meta": "gedrag · sleutelprikkel en vier vragen", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 1 van 12",
 "lead": "Gedrag is een reactie op prikkels. Een sleutelprikkel is één kenmerk dat een vaste reactie uitlokt, zoals rood aan de onderkant bij een stekelbaars. Aangeboren gedrag hoeft een dier niet te leren; aangeleerd gedrag ontstaat door ervaring, en veel gedrag is een mix, zoals de zang van de vink. Bij elk gedrag kun je vier vragen stellen (Tinbergen): oorzaak, ontwikkeling, functie en evolutie.",
 "endHaak": "welke van de vier vragen beantwoord je eigenlijk?",
 "minis": {"Hoofdstuk 1": "Waar reageert de stekelbaars precies op?", "Hoofdstuk 2": "Moet een dier zijn gedrag leren?", "Hoofdstuk 3": "Welke vier vragen kun je bij gedrag stellen?", "Recap": "Waarom viel de stekelbaars de postauto aan?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een stekelbaarsmannetje schiet in dreighouding naar de ruit als buiten een rode postauto voorbijrijdt. Waarom?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 1."},
  "q05": {"q": "Welk model valt het mannetje het vaakst aan?", "correct": 1, "explain": "Eén kenmerk is genoeg: rood aan de onderkant. Dat is een sleutelprikkel."},
  "q08": {"q": "Een jonge vink groeit op zonder ooit een andere vink te horen zingen. Wat zingt hij later?", "correct": 1, "explain": "De aanleg is aangeboren; het complete lied met slotroffel is aangeleerd."},
  "q11": {"q": "Sam zegt: de stekelbaars valt aan om zijn nest te beschermen. Op welke vraag geeft Sam antwoord?", "correct": 1, "explain": "Wat het gedrag oplevert is de functie, niet de oorzaak."}
 },
 "glossary": [
  {"t": "gedrag", "d": "Alles wat een organisme doet als reactie op prikkels uit de omgeving of uit het eigen lichaam."},
  {"t": "prikkel", "d": "Een verandering in of buiten het lichaam die een reactie kan uitlokken."},
  {"t": "sleutelprikkel", "d": "Eén kenmerk dat een vaste reactie uitlokt, zoals rood aan de onderkant bij een stekelbaars."},
  {"t": "aangeboren gedrag", "d": "Gedrag dat een dier niet hoeft te leren en dat bij alle soortgenoten op dezelfde manier verloopt."},
  {"t": "aangeleerd gedrag", "d": "Gedrag dat ontstaat door ervaring."},
  {"t": "vier vragen van Tinbergen", "d": "Oorzaak (hoe werkt het nu?), ontwikkeling (hoe ontstaat het in zijn leven?), functie (wat levert het op?), evolutie (waar komt het vandaan?)."},
  {"t": "nabije en uiteindelijke oorzaken", "d": "vwo · Nabij: oorzaak en ontwikkeling, over dit ene dier. Uiteindelijk: functie en evolutie, over de soort."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

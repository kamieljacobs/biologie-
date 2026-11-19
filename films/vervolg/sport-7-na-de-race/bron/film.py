import json
film = {
 "slug": "sport-7-na-de-race", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Na de race", "sub": "omgaan met een tegenvaller",
 "puzzle": "Je zwemt een tijd die tegenvalt. Moet je die teleurstelling wegdrukken, of kun je er iets mee?",
 "meta": "sport en topsport · sportpsychologie", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Je volgt één tegenvallende race van een zestienjarige zwemmer, drie weken lang, langs een tijdlijn met een paarse emotiemeter (een model, geen meting). Je ziet waarom wegdrukken weinig oplevert, wat een teleurstelling je vertelt, hoe je de sterkte en duur van een emotie bijstuurt met zintuigen, aandacht en andere mensen, waarom samen blijven malen niet helpt, welke doelen je zelf in de hand hebt, waar volhouden vandaan komt, en wat een sportpsycholoog doet.",
 "endHaak": "welk procesdoel zou jij jezelf geven bij iets wat jij belangrijk vindt?",
 "minis": {"Hoofdstuk 1 — Nul minuten: wat een teleurstelling zegt": "Wat vertelt een teleurstelling je?",
           "Hoofdstuk 2 — Tien minuten en 's avonds: zintuigen en aandacht": "Is even iets anders doen wegvluchten?",
           "Hoofdstuk 3 — Elf uur 's avonds: samen malen": "Welke steun helpt echt?",
           "Hoofdstuk 4 — De dag erna: doelen die je zelf in de hand hebt": "Welk doel heb je zelf in de hand?",
           "Hoofdstuk 5 — De week erna: waarom zwem je eigenlijk?": "Wie houdt het langer vol?",
           "Hoofdstuk 6 — Drie weken later": "Wat verandert er bij de volgende race?",
           "Recap": "Moet je een teleurstelling wegdrukken?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek, zonder naam: de zwemmer (16), de sportpsycholoog, een teamgenoot (alleen als silhouet), de zwemtrainer en een mentor; in de voorbeelden een student met twee vrienden en twee wandelaars (figuranten). De tijden zijn verzonnen. Onderzoek uit o.a. Gross &amp; Levenson 1993, Zeelenberg e.a. 2000, Bratman e.a. 2015, Lyubomirsky e.a. 1998, Rose e.a. 2007, Nils &amp; Rimé 2012, Williamson e.a. 2022 en Pelletier e.a. 2001; uitspraken van Ethan Kross volgens zijn uitgever en interviews over <i>Shift</i> (2025) (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Wat vertelt deze teleurstelling de zwemmer?", "correct": 1, "explain": "Teleurstelling ontstaat als een uitkomst slechter is dan je verwachtte, en vooral bij iets wat je belangrijk vindt. Ze zegt niets over of je goed genoeg bent, en ze is geen ruis: ze wijst aan wat je hoopte."},
  "q08": {"q": "'s Avonds kijkt hij een serie; morgen kijkt hij naar de race. Is dat wegvluchten?", "correct": 0, "explain": "Even iets anders doen haalt de scherpste pijn eraf; in proeven werden sombere studenten na een paar minuten afleiding minder somber. Afleiding wordt pas een probleem als je nooit meer terugkijkt, en hij kijkt morgen."},
  "q12": {"q": "Na welke vriend waren de studenten twee dagen later minder van slag?", "correct": 2, "explain": "Meeleven voelde als steun en minder alleen, maar de nare gevoelens bleven. Een vriend die hielp het anders te bekijken, gaf ook twee dagen later nog minder nare gevoelens (Nils & Rimé 2012). Alleen praten is dus niet genoeg."},
  "q15": {"q": "Welk doel heeft hij het meest zelf in de hand?", "correct": 1, "explain": "De finale hangt ook af van de anderen, een tijd ook van je vorm die dag. Wat je doet in de race (vijf dolfijnslagen na elk keerpunt) kies je zelf: een procesdoel."},
  "q18": {"q": "Onderzoekers volgden bijna 370 wedstrijdzwemmers, bijna twee jaar lang. Wie zwom er aan het eind vaker nog?", "correct": 0, "explain": "Zwemmers die het zelf leuk of belangrijk vonden, hielden het langer vol; wie zwom omdat het moest of er geen reden meer voor zag, stopte vaker (Pelletier e.a. 2001). Talent is in dat onderzoek niet gemeten."}
 },
 "glossary": [
  {"t": "emotie als informatie", "d": "Een emotie zegt iets over hoe een situatie zich verhoudt tot wat je wilt of verwachtte. Een teleurstelling laat zien wat je verwachtte en wat je belangrijk vindt."},
  {"t": "wegdrukken (onderdrukken)", "d": "Een emotie niet laten zien. In proeven zagen anderen de emotie minder, maar voelden mensen hem niet minder."},
  {"t": "bijsturen", "d": "De sterkte en de duur van een emotie veranderen, zonder hem te verbergen; bijvoorbeeld met muziek, buitenlucht, even afstand of een gesprek."},
  {"t": "malen", "d": "Steeds opnieuw over hetzelfde probleem nadenken zonder verder te komen (piekeren)."},
  {"t": "co-ruminatie", "d": "Samen met een vriend steeds opnieuw over een probleem praten en malen. Het voelt hecht, maar hing bij jongeren (vooral meisjes) ook samen met meer somberheid en angst."},
  {"t": "afstand nemen", "d": "Naar je eigen situatie kijken alsof je er buiten staat, bijvoorbeeld als een trainer die naar een andere zwemmer kijkt."},
  {"t": "uitkomstdoel", "d": "Een doel over een plek of resultaat tegenover anderen, zoals de finale halen."},
  {"t": "prestatiedoel", "d": "Een doel met een eigen maat, zoals een tijd onder je limiet."},
  {"t": "procesdoel", "d": "Een doel over wat je zelf doet in de race, zoals bij elk keerpunt vijf dolfijnslagen. Dat heb je het meest zelf in de hand."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

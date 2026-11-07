import json
film = {
 "slug": "mariene-biologie-1-hoeveel-vis-mag-eruit", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Hoeveel vis mag eruit?", "sub": "leeftijd, aanwas en duurzame vangst",
 "puzzle": "Elk jaar gaat er vis uit de zee. Waarom levert te veel vangen op den duur minder vis op?",
 "meta": "mariene biologie · visbestanden", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Mariene biologie",
 "lead": "Sam loopt snuffelstage bij een instituut voor zeeonderzoek aan de Noordzee en vaart mee op het onderzoeksschip. Je ziet hoe een mariene bioloog de leeftijd van een schol afleest aan de jaarringen in een gehoorsteentje (otoliet), hoe ze met een model uitrekent hoeveel vis er per jaar bijkomt (de aanwas), waarom die aanwas het grootst is bij een populatie die half zo groot is als de draagkracht, wat duurzame vangst is, wie het quotum vaststelt, en wat er gebeurde toen de haring in de Noordzee en de kabeljauw bij Newfoundland werden overbevist.",
 "endHaak": "welke vis zou jij willen volgen, van het ei tot het net?",
 "minis": {"Hoofdstuk 1": "Hoe oud is een vis van dertig centimeter?", "Hoofdstuk 2": "Wanneer komt er de meeste vis bij?", "Hoofdstuk 3": "Hoeveel mag eruit, en wie beslist?", "Hoofdstuk 4": "Hoe snel komt een overbeviste populatie terug?", "Recap": "Waarom levert te veel vangen minder vis op?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam (stagiair) en de mariene bioloog (castboek); figurant Joost als visser, zonder naam. Het instituut en het schip zijn verzonnen. Getallen: ICES en Wageningen Marine Research (schol 2026), Dickey-Collas e.a. 2010 (haring), Canadees parlement 1998, DFO 2024 en Hutchings 2000 (kabeljauw), FAO en Tsikliras & Froese 2019 (model). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Twee schollen zijn allebei dertig centimeter. Zijn ze even oud?", "correct": 1, "explain": "Hoe snel een vis groeit, hangt af van voedsel en temperatuur. Twee vissen van dezelfde lengte kunnen dus jaren in leeftijd verschillen. Daarom kijkt een mariene bioloog naar de jaarringen in de gehoorsteentjes."},
  "q08": {"q": "Een modelzee kan hooguit duizend ton schol dragen. In welke zee komt er per jaar de meeste vis bij?", "correct": 2, "explain": "In de bijna lege zee zijn er te weinig ouders, in de volle zee is er te weinig voedsel. In dit model is de aanwas het grootst bij de helft van de draagkracht: 125 ton per jaar bij 500 ton."},
  "q11": {"q": "Een vloot haalt in één jaar driehonderd ton uit de halfvolle zee. Hoeveel groeit er het jaar daarna bij?", "correct": 2, "explain": "Er blijft 325 ton over. Met minder ouders groeit er in het model nog maar zo'n 110 ton bij, minder dan de 125 ton van eerst. Wie meer vangt dan erbij groeit, maakt de bron kleiner."},
  "q14": {"q": "Een quotum is hoeveel vis vissers per jaar mogen vangen. Wie stelt het vast?", "correct": 0, "explain": "Onderzoekers uit veel landen schatten de bestanden en geven advies. In december beslissen de visserijministers van de EU-landen; bij schol in de Noordzee samen met Noorwegen en het Verenigd Koninkrijk."},
  "q17": {"q": "In 1977 ging de haringvisserij in de Noordzee dicht. Hoe lang duurt het voordat zo'n bestand terug is?", "correct": 1, "explain": "Het herstel begon traag, want er waren eerst maar weinig ouders. In 1983 ging de haringvisserij weer open. Bij kabeljauw bij Newfoundland duurde het veel langer: pas in 2024, na 32 jaar, ging de grote visserij weer open."}
 },
 "glossary": [
  {"t": "mariene biologie", "d": "Het vak dat het leven in zee onderzoekt: vissen, schelpdieren, plankton en het zeewater zelf. Een mariene bioloog werkt aan boord, op het wad en in het lab."},
  {"t": "populatie", "d": "Alle individuen van één soort in één gebied."},
  {"t": "draagkracht", "d": "Het grootste aantal individuen dat een gebied op den duur kan onderhouden."},
  {"t": "otoliet", "d": "Gehoorsteentje van kalk in het binnenoor van een vis. Het helpt bij horen en evenwicht en groeit het hele leven door: een brede laag in de groeitijd, een smalle in de winter. Zo bepaal je de leeftijd van de meeste vissen."},
  {"t": "aanwas", "d": "Hoeveel vis er per jaar bijkomt: jonge vis erbij, plus de groei van de rest, min wat er sterft. Het grootst bij een tussenstand; in het simpelste model bij de helft van de draagkracht."},
  {"t": "duurzame vangst", "d": "Zoveel vangen dat de populatie het elk jaar weer aangroeit, zodat je dat ook volgend jaar kunt vangen."},
  {"t": "quotum", "d": "De hoeveelheid vis die vissers van een soort per jaar mogen vangen. Onderzoekers geven advies, de visserijministers van de EU besluiten."},
  {"t": "overbevissing", "d": "Meer vis vangen dan er bijgroeit, zodat de populatie krimpt. Herstel kan jaren duren, bij kabeljauw tientallen jaren."},
  {"t": "model", "d": "Een vereenvoudigde berekening van de werkelijkheid. Het model in deze film (draagkracht 1000 ton) laat het principe zien; echte bestanden worden met ingewikkeldere modellen geschat."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

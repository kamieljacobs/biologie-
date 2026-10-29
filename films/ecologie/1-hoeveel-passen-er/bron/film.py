import json
true, false = True, False
film = {
 "slug": "1-hoeveel-passen-er",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Hoeveel passen er?",
 "sub": "populaties tellen, groeien en begrenzen",
 "puzzle": "Hoeveel bevers passen er in Nederland? (en: waarom groeit een populatie niet eeuwig door?)",
 "meta": "ecologie 1/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 1 van 8",
 "lead": "Hoeveel bevers passen er dus in Nederland? Dat hangt af van de draagkracht: hoeveel geschikte oever er is, en hoeveel oever een familie nodig heeft. Een familie gebruikt meestal twee tot vier kilometer oever. Waar het heel geschikt is, minder dan één. Een familie telt meestal vier tot zes bevers. Een rekenvoorbeeld met twee aannames. Een familie heeft twee kilometer oever nodig, en telt ongeveer vijf bevers. Is er drieduizend kilometer geschikte oever, dan passen er vijftienhonderd families: ongeveer zevenduizendvijfhonderd bevers. Is er zesduizend kilometer, dan ongeveer vijftienduizend. Het antwoord hangt dus af van hoeveel geschikte oever er echt is. De lijn voor heel Nederland stijgt nog. Maar waar het al vol is, zoals in de Millingerwaard, zie je de S. Zo gaat het ook langs de sloot van de boer, als de oevers daar vol raken. Een populatie groeit niet eeuwig door. Ze groeit tot de draagkracht, en schommelt daar omheen.",
 "endHaak": "volgende film: Waar past een soort?",
 "minis": {
  "Hoofdstuk 1": "Hoe tel je dieren die je bijna nooit ziet?",
  "Hoofdstuk 2": "Waardoor wordt een populatie groter of kleiner?",
  "Hoofdstuk 3": "Waarom loopt de lijn steeds steiler?",
  "Hoofdstuk 4": "Wat gebeurt er als alle plekken bezet zijn?",
  "Hoofdstuk 5": "Welke factoren remmen de groei, en welke niet?",
  "Recap": "Hoeveel bevers passen er in Nederland? (en: waarom groeit een populatie niet eeuwig door?)"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q11": {
   "q": "Ronde 1: 40 bevers. Ronde 2: 30 bevers, waarvan 12 al bekend. Hoeveel bevers leven er ongeveer in dit gebied?",
   "correct": 1,
   "explain": "Kijk naar de tweede ronde. Twaalf van de dertig bevers waren al bekend: twee op de vijf. Dan is waarschijnlijk ook twee op de vijf van álle bevers bekend."
  },
  "q18": {
   "q": "400 bevers. In een jaar: 120 geboren, 60 dood, 10 erbij, 30 vertrokken. Met hoeveel procent groeit deze populatie in een jaar?",
   "correct": 2,
   "explain": "Tel eerst alles wat erbij komt: honderdtwintig plus tien is honderddertig. Dan alles wat eraf gaat: zestig plus dertig is negentig. Er komen veertig bevers bij."
  },
  "q24": {
   "q": "Een populatie groeit elk jaar met twintig procent. Na hoeveel jaar is ze ongeveer twee keer zo groot?",
   "correct": 0,
   "explain": "Bij twintig procent groei per jaar worden honderd bevers er na een jaar honderdtwintig. Daarna honderdvierenveertig, honderddrieënzeventig en tweehonderdzeven. Na vier jaar is het al meer dan het dubbele."
  },
  "q28": {
   "q": "2004–2019: ± 20 % groei per jaar. 2019–2023: ± 14 % per jaar. Welke conclusie mag je uit deze gegevens trekken?",
   "correct": 1,
   "explain": "Het aantal stijgt nog steeds, met honderden bevers per jaar. Alleen het percentage is lager geworden. Dat de draagkracht van heel Nederland al bereikt is, staat niet in deze gegevens."
  },
  "q33": {
   "q": "Alle geschikte oevers zijn bezet. Wat gebeurt er de jaren daarna met het aantal bevers in dit gebied?",
   "correct": 2,
   "explain": "Na het jaar 2005 bleef het aantal volwassen bevers daar ongeveer gelijk: zo'n achttien, in negen territoria. Er worden nog steeds jongen geboren. Maar er is geen plek meer voor een nieuwe familie."
  },
  "q39": {
   "q": "Een hoogwater in het voorjaar verdrinkt jonge bevers in hun burcht. Wat voor factor is dat?",
   "correct": 1,
   "explain": "Hoog water houdt geen rekening met het aantal bevers. Het treft een vast deel van de jongen, of er nu weinig of veel zijn. Zo'n factor heet dichtheidsonafhankelijk."
  },
  "q48": {
   "q": "Twee nieuwe eilanden: een groot eiland dicht bij de kust, een klein eiland ver op zee. Waar leven na twintig jaar de meeste soorten?",
   "correct": 0,
   "explain": "Op een eiland vestigen zich steeds nieuwe soorten, en er sterven ook soorten uit. Dicht bij de kust komen er meer nieuwe soorten aan. Op een groot eiland zijn de populaties groter, dus sterven er minder uit."
  }
 },
 "glossary": [
  {
   "t": "populatie",
   "d": "Alle individuen van één soort in één gebied die zich onderling voortplanten."
  },
  {
   "t": "populatiegrootte",
   "d": "Het aantal individuen in een populatie."
  },
  {
   "t": "populatiedichtheid",
   "d": "Het aantal individuen per oppervlakte (of per kilometer oever) leefgebied."
  },
  {
   "t": "vangen, merken en terugvangen",
   "d": "Schatting van de populatiegrootte: N = aantal gemerkt × aantal tweede vangst / aantal teruggevangen. Een DNA-profiel uit haar of keutel kan het merk zijn."
  },
  {
   "t": "geboorte, sterfte, immigratie, emigratie",
   "d": "De vier factoren die de grootte van een populatie veranderen; groei = (geboorte + immigratie) − (sterfte + emigratie)."
  },
  {
   "t": "groeisnelheid",
   "d": "De groei in een jaar als percentage van de populatie aan het begin van dat jaar."
  },
  {
   "t": "verdubbelingstijd",
   "d": "De tijd waarin een populatie twee keer zo groot wordt; benadering: 70 gedeeld door de groeisnelheid in procenten (regel van 70)."
  },
  {
   "t": "exponentiële groei (J-curve)",
   "d": "Groei met een vast percentage per tijdseenheid: hoe groter de populatie, hoe meer erbij komt."
  },
  {
   "t": "logistische groei (S-curve)",
   "d": "Groei die afremt en stopt bij de draagkracht."
  },
  {
   "t": "draagkracht",
   "d": "Het grootste aantal individuen van een soort dat een gebied op lange termijn kan onderhouden."
  },
  {
   "t": "territorium",
   "d": "Gebied dat een dier of familie verdedigt tegen soortgenoten."
  },
  {
   "t": "overshoot",
   "d": "Een populatie groeit tijdelijk boven de draagkracht uit en zakt daarna terug."
  },
  {
   "t": "dichtheidsafhankelijke factor",
   "d": "Factor die sterker werkt naarmate de populatiedichtheid hoger is (voedsel, ruimte, ziekte, concurrentie)."
  },
  {
   "t": "dichtheidsonafhankelijke factor",
   "d": "Factor die werkt onafhankelijk van de dichtheid (hoogwater, strenge winter)."
  },
  {
   "t": "populatieregulatie",
   "d": "Dichtheidsafhankelijke factoren houden een populatie rond de draagkracht."
  },
  {
   "t": "dynamiek",
   "d": "Het voortdurend schommelen van de populatiegrootte."
  },
  {
   "t": "biologisch evenwicht",
   "d": "De populatiegrootte schommelt over de jaren rond hetzelfde niveau."
  },
  {
   "t": "herintroductie",
   "d": "Een soort terugzetten in een gebied waar ze verdwenen was."
  },
  {
   "t": "barrière",
   "d": "Iets wat dieren tegenhoudt bij het verplaatsen (stuw, weg); opheffen met een passage helpt dieren nieuwe gebieden te bereiken."
  },
  {
   "t": "r-strategie",
   "d": "Veel nakomelingen, weinig zorg, snelle groei; aantallen schommelen sterk.",
   "vwo": true
  },
  {
   "t": "K-strategie",
   "d": "Weinig nakomelingen, veel zorg, populatie dicht bij de draagkracht.",
   "vwo": true
  },
  {
   "t": "leeftijdsopbouw",
   "d": "Verdeling van een populatie over leeftijdsklassen; een brede basis wijst op groei.",
   "vwo": true
  },
  {
   "t": "eilandtheorie",
   "d": "Het aantal soorten op een eiland is een evenwicht tussen vestigen (hoger dicht bij de bron) en uitsterven (lager op een groot eiland).",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

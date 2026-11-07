import json
true, false = True, False
film = {
 "slug": "3-vormen-van-selectie",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Vormen van selectie",
 "sub": "gericht, stabiliserend, splitsend, seksueel en samen",
 "puzzle": "Waarom worden baby's niet steeds zwaarder?",
 "meta": "evolutie 3/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 3 van 8",
 "lead": "Selectie werkt dus op verschillende manieren. Gerichte selectie schuift het histogram op. Stabiliserende selectie maakt het smaller. Splitsende selectie geeft twee toppen. Daarom werden baby's niet steeds zwaarder: het midden had de hoogste fitness. En de pauw verliest misschien iets bij het overleven, maar wint bij het voortplanten.",
 "endHaak": "volgende film: De mens als selectiefactor",
 "minis": {
  "Hoofdstuk 1": "Waarom werden de berkenspanners rond Manchester zwart?",
  "Hoofdstuk 2": "Welke baby's overleefden het vaakst?",
  "Hoofdstuk 3": "Kan een populatie twee kanten op tegelijk?",
  "Hoofdstuk 4": "Waarom houdt een pauw een staart die hem niet helpt overleven?",
  "Hoofdstuk 5": "Wie bepaalt de lengte, de bloem of de vlinder?",
  "Recap": "Waarom worden baby's niet steeds zwaarder?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q07": {
   "q": "Wat gebeurt er de jaren daarna met de berkenspanners rond Manchester?",
   "correct": 1,
   "explain": "Op een zwarte stam vindt een vogel de lichte vlinders het eerst. Zwarte vlinders worden minder vaak opgegeten en krijgen meer nakomelingen. In het jaar 1895 is rond Manchester ongeveer achtennegentig procent van de berkenspanners zwart."
  },
  "q14": {
   "q": "Welke baby's hadden toen de grootste kans om te overleven?",
   "correct": 0,
   "explain": "Baby's van ongeveer drieënhalve kilo overleefden het vaakst. Veel lichtere baby's hadden het moeilijk. Maar heel zware baby's ook: dan was de geboorte gevaarlijker."
  },
  "q21": {
   "q": "Wat gebeurt er met de snavels in deze populatie?",
   "correct": 2,
   "explain": "Vogels met een snavel in het midden overleven het slechtst. Het histogram krijgt twee toppen. Dit heet splitsende selectie."
  },
  "q25": {
   "q": "Waarom blijft zo'n opvallende staart generatie na generatie bestaan?",
   "correct": 1,
   "explain": "Een pauw met veel minder oogvlekken wordt minder vaak gekozen. Wie gekozen wordt, krijgt meer jongen, ook al kost de staart energie. Dit heet seksuele selectie: selectie door het andere geslacht."
  },
  "q32": {
   "q": "Waarom zijn de buis en de tong allebei zo lang geworden?",
   "correct": 2,
   "explain": "In het jaar 1903 werd de pijlstaartvlinder beschreven die erbij past. Zijn tong kan bijna dertig centimeter lang zijn. Een bloem met een langere buis dwingt de vlinder diep te steken."
  }
 },
 "glossary": [
  {
   "t": "gerichte selectie",
   "d": "Eén uiterste van de variatie heeft een selectievoordeel; het gemiddelde van het kenmerk verschuift die kant op."
  },
  {
   "t": "stabiliserende selectie",
   "d": "Beide uitersten hebben een nadeel; het gemiddelde blijft gelijk en de spreiding wordt kleiner."
  },
  {
   "t": "splitsende selectie",
   "d": "Beide uitersten hebben een voordeel en het midden een nadeel; de verdeling krijgt twee toppen."
  },
  {
   "t": "seksuele selectie",
   "d": "Selectie door het andere geslacht: door partnerkeuze of door strijd om partners krijgen individuen met bepaalde kenmerken meer nakomelingen, ook als die kenmerken een nadeel zijn bij het overleven."
  },
  {
   "t": "co-evolutie",
   "d": "Twee soorten zijn elkaars selectiedruk en evolueren daardoor samen, zoals een bloem en haar bestuiver."
  },
  {
   "t": "selectienadeel",
   "d": "Een eigenschap waardoor een individu minder kans heeft om te overleven of nakomelingen te krijgen."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

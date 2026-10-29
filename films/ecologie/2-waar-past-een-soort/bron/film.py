import json
true, false = True, False
film = {
 "slug": "2-waar-past-een-soort",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Waar past een soort?",
 "sub": "tolerantie, beperkende factor en niche",
 "puzzle": "Waarom leven er in de ene beek wel steenvlieglarven en in de andere niet? (B: hoe leven twee mezen in één bos? C: welke factor bepaalt de plantengroei bij genoeg licht en water?)",
 "meta": "ecologie 2/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 2 van 8",
 "lead": "Een soort kan alleen leven waar elke factor binnen haar tolerantiegebied ligt. In de rechterbeek is zuurstof de beperkende factor voor de steenvlieglarve. Daarom vind je hem daar niet. De rode muggenlarve verdraagt veel meer, en leeft in allebei. Twee soorten mezen leven in hetzelfde bos zonder dat er een verdwijnt, omdat hun niches verschillen. En een plant met genoeg licht en water groeit zo hard als het mineraal dat het minst aanwezig is. Daarom zegt een schepnet vol beestjes iets over het water. Je hoeft het niet te meten: de soorten hebben het al gedaan.",
 "endHaak": "volgende film: Wie eet wie?",
 "minis": {
  "Hoofdstuk 1": "Welke factoren verschillen tussen de twee beken?",
  "Hoofdstuk 2": "Hoeveel zuurstof heeft een steenvlieglarve nodig?",
  "Hoofdstuk 3": "Wat helpt een plant met genoeg licht en water?",
  "Hoofdstuk 4": "Hoe kunnen twee soorten mezen in één bos leven?",
  "Recap": "Waarom leeft een steenvlieglarve in de ene beek wel en in de andere niet?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q11": {
   "q": "In beide beken drijven dode bladeren. Wat voor factor is dat bladafval voor een larve die het eet?",
   "correct": 0,
   "explain": "Een dood blad leeft niet meer. Toch telt het als biotische factor: het komt van een boom, en voor de larve is het voedsel. Steenvlieglarven knagen aan zulke bladeren."
  },
  "q21": {
   "q": "Beek C: 6 mg zuurstof per liter en 19 °C. Gebruik de tabel. Welke larven kunnen in beek C leven?",
   "correct": 2,
   "explain": "Loop de tabel per soort langs. Voor de steenvlieglarve ligt zes milligram onder zijn minimum van zeven. Negentien graden ligt ook boven zijn maximum."
  },
  "q26": {
   "q": "Op beide oevers is genoeg licht en water. Links groeit weinig. Wat helpt de planten op de linkeroever het meest?",
   "correct": 1,
   "explain": "Water en licht zijn er al genoeg. Op de linkeroever zit weinig stikstof in de bodem. Die is daar de beperkende factor."
  },
  "q31": {
   "q": "Twee soorten eten in dezelfde boom. Wat gebeurt er op den duur?",
   "correct": 2,
   "explain": "Een bioloog testte wat er gebeurt als twee soorten precies hetzelfde voedsel eten. Hij gebruikte eencelligen: twee soorten pantoffeldiertjes. Elk apart groeit goed."
  },
  "q36": {
   "q": "Wanneer is de concurrentie tussen twee soorten het grootst?",
   "correct": 0,
   "explain": "Hoe meer twee niches overlappen, hoe feller de concurrentie. Koolmees en pimpelmees overlappen een beetje, bij de nestholtes en in het voorjaar bij de rupsen. Daarom concurreren ze, maar verdwijnt er geen van beide."
  },
  "q44": {
   "q": "Een plant bloeit elk jaar rond dezelfde datum, ook na een warme winter. Op welke factor reageert hij waarschijnlijk?",
   "correct": 1,
   "explain": "Een warme winter verschuift de temperatuur, maar niet de daglengte. Bloeit een plant toch op dezelfde datum, dan gebruikt hij de daglengte als signaal. Terug naar de twee beken."
  }
 },
 "glossary": [
  {
   "t": "ecosysteem",
   "d": "Alle organismen in een gebied samen met hun abiotische omgeving en de relaties daartussen."
  },
  {
   "t": "levensgemeenschap",
   "d": "Alle populaties van verschillende soorten die samen in een gebied leven."
  },
  {
   "t": "habitat",
   "d": "Leefgebied van een soort: de plek met de abiotische en biotische omstandigheden waarin de soort voorkomt."
  },
  {
   "t": "abiotische factor",
   "d": "Niet-levende factor uit de omgeving, zoals temperatuur, licht, zuurstof, stroming, pH of bodem."
  },
  {
   "t": "biotische factor",
   "d": "Invloed van andere organismen, zoals voedsel, rovers, concurrenten, parasieten en de mens."
  },
  {
   "t": "tolerantie",
   "d": "Vermogen om variatie in een milieufactor te verdragen; het tolerantiegebied ligt tussen minimum- en maximumtolerantiegrens."
  },
  {
   "t": "optimum",
   "d": "De waarde van een factor waarbij een soort het best groeit en zich voortplant."
  },
  {
   "t": "optimumkromme",
   "d": "Grafiek van groei of overleving tegen één factor, met minimumgrens, optimum en maximumgrens."
  },
  {
   "t": "minimum- en maximumtolerantiegrens",
   "d": "Laagste en hoogste waarde van een factor waarbij een soort nog kan overleven."
  },
  {
   "t": "beperkende factor",
   "d": "De factor die het verst van zijn optimum ligt en daardoor groei of voorkomen beperkt; verbeteren van andere factoren helpt dan niet."
  },
  {
   "t": "wet van het minimum",
   "d": "De groei wordt bepaald door de voedingsstof (of factor) die het meest tekortschiet."
  },
  {
   "t": "indicatorsoort",
   "d": "Soort met een smalle tolerantie, waarvan aan- of afwezigheid iets zegt over het milieu, zoals de waterkwaliteit."
  },
  {
   "t": "niche",
   "d": "Rol en plaats van een soort in een ecosysteem: wat ze eet, waar en wanneer ze actief is, door wie ze gegeten wordt en welke omstandigheden ze nodig heeft."
  },
  {
   "t": "concurrentie",
   "d": "Wedijver om dezelfde schaarse hulpbron; beide partijen hebben er nadeel van."
  },
  {
   "t": "intraspecifieke concurrentie",
   "d": "Concurrentie tussen individuen van dezelfde soort; het felst, omdat de niches helemaal overlappen."
  },
  {
   "t": "interspecifieke concurrentie",
   "d": "Concurrentie tussen soorten waarvan de niches overlappen."
  },
  {
   "t": "concurrentie-uitsluitingsprincipe",
   "d": "Twee soorten met precies dezelfde niche kunnen niet blijvend samen in één gebied leven; één verdwijnt."
  },
  {
   "t": "adaptatie",
   "d": "Erfelijk kenmerk dat door natuurlijke selectie past bij het habitat en de niche van een soort."
  },
  {
   "t": "acclimatisatie",
   "d": "Niet-erfelijke aanpassing van een individu tijdens zijn leven aan een geleidelijk veranderde omstandigheid.",
   "vwo": true
  },
  {
   "t": "fotoperiodiciteit",
   "d": "Processen zoals bloei, trek of voortplanting worden gestuurd door de daglengte.",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

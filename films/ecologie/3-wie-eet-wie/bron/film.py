import json
true, false = True, False
film = {
 "slug": "3-wie-eet-wie",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Wie eet wie?",
 "sub": "voedselwebben, rovers en prooien, symbiose",
 "puzzle": "Waarom eet een vos de konijnen nooit allemaal op?",
 "meta": "ecologie 3/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 3 van 8",
 "lead": "Langs dezelfde pijlen gaan ook stoffen die niet afbreken. Ze hopen zich op bij de eters bovenaan het web. Dat heet accumulatie. Meer daarover zie je in de film Eén aarde. Wie eet wie? De pijlen in een voedselweb wijzen van voedsel naar eter. Een rover doodt zijn prooi; bij vraat blijft de plant leven. En soorten leven ook samen: plus en plus, plus en nul, of plus en min. En de vos? Hoe minder konijnen, hoe moeilijker hij ze vindt. Hij eet dan iets anders en krijgt minder jongen. Zo kan het aantal vossen meegaan met het aantal konijnen, zoals bij lynxen en hazen. Daarom eet een vos de konijnen nooit allemaal op.",
 "endHaak": "volgende film: Waar blijft het blad?",
 "minis": {
  "Hoofdstuk 1": "In welke richting wijst een pijl in een voedselketen?",
  "Hoofdstuk 2": "Is een konijn dat aan een eikje knabbelt een rover?",
  "Hoofdstuk 3": "Wat gebeurt er met een rover als zijn prooi schaars wordt?",
  "Hoofdstuk 4": "Wie heeft voordeel als een gaai eikels verstopt?",
  "Hoofdstuk 5": "Waarom heeft een parasiet soms twee gastheren nodig?",
  "Recap": "Waarom eet een vos de konijnen nooit allemaal op?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {
   "q": "Je tekent deze voedselketen met pijlen. Hoe loopt de pijl tussen het konijn en de vos?",
   "correct": 0,
   "explain": "In een voedselketen wijst de pijl van wie gegeten wordt naar wie eet. De pijl volgt het voedsel: de stoffen uit het konijn komen in de vos terecht. Lees de pijl dus als 'wordt gegeten door'."
  },
  "q15": {
   "q": "Het konijn eet een deel van het eikje. Het eikje blijft leven. Hoe heet deze relatie?",
   "correct": 2,
   "explain": "Eet een dier een deel van een plant en blijft de plant leven, dan heet dat vraat. Bij predatie gaat de prooi dood: een rover doodt zijn prooi en eet hem op. Een vos die een konijn vangt, is een predator."
  },
  "q22": {
   "q": "Kijk naar de piek van de hazen rond het jaar 1903. Wat doet de lijn van de lynx vlak daarna?",
   "correct": 1,
   "explain": "De lynxen pieken een jaar of twee na de hazen. Dat zie je bij elke golf opnieuw. Zo’n golf duurt ongeveer tien jaar."
  },
  "q26": {
   "q": "In een duingebied haal je alle vossen weg. Wat gebeurt er met de konijnen?",
   "correct": 1,
   "explain": "Zonder vossen nemen de konijnen eerst toe. Maar ook dan houdt het op. Het gras raakt op, en in een drukke populatie verspreiden ziektes zich snel."
  },
  "q31": {
   "q": "Wie heeft voordeel als een gaai eikels verstopt?",
   "correct": 0,
   "explain": "Een gaai verstopt in één herfst ongeveer vijfduizend eikels. In de winter en het voorjaar vindt hij er veel terug. Maar niet allemaal."
  },
  "q42": {
   "q": "Uit een eitje komt een larve. Die kan geen schaap besmetten. Eerst moet hij een kleine slak vinden. Waarom heeft de leverbot die slak nodig?",
   "correct": 2,
   "explain": "Een larve uit het eitje zwemt in een plasje. Vindt hij binnen een dag geen leverbotslak, dan gaat hij dood. In de slak vermenigvuldigt hij zich: uit één larve komen er honderden."
  },
  "q46": {
   "q": "Een leverbot doodt zijn gastheer meestal niet snel. Hoe komt dat?",
   "correct": 0,
   "explain": "Een leverbot leeft van een levend schaap. Leverbotten waardoor het schaap snel stierf, hadden minder tijd om eitjes te leggen. Ze lieten minder nakomelingen na."
  }
 },
 "glossary": [
  {
   "t": "voedselketen",
   "d": "Een rij organismen waarin elk organisme voedsel is voor het volgende. De pijl wijst van wie gegeten wordt naar de eter."
  },
  {
   "t": "voedselweb",
   "d": "Alle voedselketens in een gebied samen, met elkaar verbonden."
  },
  {
   "t": "producent",
   "d": "Organisme dat met licht zelf organische stoffen maakt (fotosynthese), zoals gras, helm of een eik. Staat altijd aan het begin van een voedselketen."
  },
  {
   "t": "consument",
   "d": "Organisme dat organische stoffen uit andere organismen haalt door ze (deels) te eten. Consument van de eerste orde eet producenten, van de tweede orde eet consumenten van de eerste orde, enzovoort."
  },
  {
   "t": "herbivoor · carnivoor · omnivoor",
   "d": "Planteneter · vleeseter · alleseter (eet planten én dieren, zoals de vos)."
  },
  {
   "t": "aaseter",
   "d": "Dier dat dode dieren eet die het niet zelf heeft gedood."
  },
  {
   "t": "trofisch niveau",
   "d": "De plaats van een organisme in een voedselketen: producent, consument van de eerste orde, van de tweede orde, enzovoort. Eén dier kan op meer niveaus zitten."
  },
  {
   "t": "predatie",
   "d": "Een predator (rover) doodt zijn prooi en eet hem op: +/−."
  },
  {
   "t": "vraat",
   "d": "Een dier eet een deel van een plant; de plant blijft leven: +/−."
  },
  {
   "t": "afweer tegen vraat",
   "d": "Eigenschappen waarmee een plant minder gegeten wordt, zoals stekels (braam) en bittere of slecht verteerbare stoffen (looizuren in eikenblad)."
  },
  {
   "t": "predator-prooirelatie",
   "d": "De aantallen van rover en prooi golven samen; de rover piekt iets later dan de prooi (sneeuwschoenhaas en lynx: golf van ongeveer tien jaar, lynx één tot twee jaar later)."
  },
  {
   "t": "symbiose",
   "d": "Twee soorten leven langdurig en nauw met elkaar samen. Vormen: mutualisme, commensalisme, parasitisme."
  },
  {
   "t": "mutualisme",
   "d": "Symbiose waarbij beide soorten voordeel hebben: +/+ (gaai en eik)."
  },
  {
   "t": "commensalisme",
   "d": "Symbiose waarbij de ene soort voordeel heeft en de andere geen voordeel en geen nadeel: +/0 (bergeend die broedt in een konijnenhol)."
  },
  {
   "t": "parasitisme",
   "d": "Symbiose waarbij de parasiet voordeel heeft en de gastheer nadeel; de parasiet leeft lange tijd van een levende gastheer: +/− (leverbot in een schaap)."
  },
  {
   "t": "gastheer",
   "d": "Organisme waarin of waarop een parasiet leeft."
  },
  {
   "t": "eindgastheer · tussengastheer",
   "d": "Gastheer waarin de parasiet volwassen wordt en zich geslachtelijk voortplant (schaap) · gastheer waarin de larven leven en zich vaak vermenigvuldigen (leverbotslak)."
  },
  {
   "t": "levenscyclus",
   "d": "De vaste rij stadia die een parasiet doorloopt, van ei via larve en tussengastheer terug naar de eindgastheer."
  },
  {
   "t": "darmflora",
   "d": "De bacteriën die in je darm leven; de relatie met de mens is mutualisme (vitamine K, afbraak van onverteerbare resten).",
   "vwo": true
  },
  {
   "t": "mycorrhiza",
   "d": "Symbiose tussen schimmeldraden en plantenwortels: de schimmel levert water en mineralen, de plant suikers (mutualisme).",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

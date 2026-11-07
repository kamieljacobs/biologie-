import json
true, false = True, False
film = {
 "slug": "7-hoe-weten-we-dat",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Hoe weten we dat?",
 "sub": "fossielen, botten en DNA als bewijs",
 "puzzle": "Hoe weet je welke laag in de grond het oudst is?",
 "meta": "evolutie 7/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 7 van 8",
 "lead": "Welke laag is het oudst? De laag die als eerste werd afgezet, ook als hij later kantelde. Radioactieve stoffen geven het aantal jaren. En de heupbotjes van de walvis? Een restant van voorouders op vier poten. Fossielen, botten en DNA wijzen dezelfde kant op.",
 "endHaak": "volgende film: Stambomen lezen",
 "minis": {
  "Hoofdstuk 1": "Welke laag is het oudst, en hoe oud precies?",
  "Hoofdstuk 2": "Wat vind je in de lagen van 50 tot 40 miljoen jaar oud?",
  "Hoofdstuk 3": "Waarom zitten er vingerbotjes in een walvisvin?",
  "Hoofdstuk 4": "Wie is het naaste familielid van de walvis?",
  "Recap": "Hoe weet je welke laag in de grond het oudst is?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q09": {
   "q": "Deze lagen zijn na het afzetten omgeklapt. Welke laag is het oudst?",
   "correct": 1,
   "explain": "Draai de lagen in gedachten terug, tot ze weer plat liggen. De laag die toen onderop lag, is als eerste afgezet. Die is het oudst, ook al ligt hij nu bovenop."
  },
  "q19": {
   "q": "Is Pakicetus de voorouder van Ambulocetus?",
   "correct": 0,
   "explain": "Een fossiel is bijna nooit precies een voorouder. Je vindt verwanten, op zijtakken van dezelfde boom. Samen laten ze zien hoe die boom zich vertakte."
  },
  "q24": {
   "q": "Waarom zitten er vingerbotjes in een walvisvin?",
   "correct": 1,
   "explain": "Een vin werkt ook zonder vingers: een haaienvin heeft ze niet. De botjes zitten er, omdat walvissen afstammen van een voorouder met poten. Homologe organen wijzen op een gemeenschappelijke voorouder."
  },
  "q32": {
   "q": "Welk dier is het nauwst verwant aan de walvis?",
   "correct": 2,
   "explain": "Walvis en nijlpaard hebben de minste verschillen. De zeehond lijkt van buiten meer op een walvis, maar zijn DNA wijkt verder af. Hij is een roofdier, verwant aan honden en beren."
  },
  "q37": {
   "q": "Twee soorten verschillen in 2% van een gen, twee andere in 4%. Welke splitsing is het langst geleden?",
   "correct": 0,
   "explain": "Verschillen twee soorten twee keer zoveel in een gen, dan splitsten ze ongeveer twee keer zo lang geleden. Ongeveer, want de klok tikt niet precies gelijk."
  }
 },
 "glossary": [
  {
   "t": "fossiel",
   "d": "Versteend overblijfsel of spoor van een organisme in een aardlaag."
  },
  {
   "t": "relatieve datering",
   "d": "Ouderdom bepalen aan de volgorde van de lagen: wat eerder is afgezet, is ouder. Je weet de volgorde, niet het aantal jaren."
  },
  {
   "t": "absolute datering",
   "d": "De leeftijd in jaren meten met radioactief verval, bijvoorbeeld van koolstof-14 (tot ongeveer 50.000 jaar) of van andere stoffen in gesteente."
  },
  {
   "t": "halveringstijd",
   "d": "De tijd waarin de helft van een radioactieve stof vervalt; voor koolstof-14 ongeveer 5730 jaar."
  },
  {
   "t": "homologe organen",
   "d": "Organen met dezelfde bouw, vaak met een andere functie, zoals mensenarm, vleermuisvleugel, walvisvin en paardenbeen. Ze wijzen op een gemeenschappelijke voorouder."
  },
  {
   "t": "rudimentair orgaan",
   "d": "Overblijfsel van een orgaan dat zijn oorspronkelijke functie kwijt is, zoals de heupbotjes van een walvis en het staartbeen van de mens."
  },
  {
   "t": "gemeenschappelijke voorouder",
   "d": "Een populatie waarvan twee of meer soorten afstammen."
  },
  {
   "t": "moleculaire klok",
   "d": "Mutaties stapelen zich gemiddeld in een vrij vast tempo op; uit het aantal verschillen in het DNA schat je hoe lang geleden twee soorten splitsten. De klok wordt afgesteld met gedateerde fossielen."
  },
  {
   "t": "cladogram",
   "d": "Stamboom die laat zien welke soorten de meest recente gemeenschappelijke voorouder delen (verder in film 8)."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

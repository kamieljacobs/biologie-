import json
film = {
 "slug": "forensisch-4-stille-getuigen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Stille getuigen", "sub": "haren, stuifmeel en kiezelwieren",
 "puzzle": "Hoe kan stuifmeel op een schoen verraden waar iemand is geweest?",
 "meta": "forensisch onderzoek · sporen onder de microscoop", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Forensisch onderzoek",
 "lead": "Bilal loopt stage bij forensisch onderzoek. In de inbraakzaak zegt de verdachte dat hij nooit in de achtertuin was. Op zijn schoen zit stuifmeel, aan het kapotte raam hangen haren, en in een andere zaak zoekt de forensisch patholoog kiezelwieren. Je ziet hoe een palynoloog stuifmeel herkent en waarom stuifmeel van een insectenbestoven struik meer zegt dan dat van gras, waarom op een schoen vooral de laatste plek overheerst, wat je onder de microscoop in een haar ziet (mens of dier, maar niet wie), welk haar een DNA-profiel kan geven, hoe de kiezelwierentest bij verdrinking werkt en waarom hij omstreden is, en hoe een deskundige een spoor weegt tegen het verhaal van de verdachte.",
 "endHaak": "welk spoor zou jij het liefst onderzoeken, en wat zou je er wel en niet over durven opschrijven?",
 "minis": {"Hoofdstuk 1": "Welk stuifmeel zegt iets over één plek?", "Hoofdstuk 2": "Wat zegt een haar onder de microscoop?", "Hoofdstuk 3": "Wat zegt een kiezelwier in het beenmerg?", "Hoofdstuk 4": "Waartegen weeg je een spoor?", "Recap": "Hoe verraadt stuifmeel waar iemand was?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Bilal (stagiair), Dr. Kim (onderzoeker en forensisch patholoog), de palynoloog (zonder naam), Erik (verdachte) en Joost (bewoner) (castboek). Decor: ElevenLabs (achtertuin met kapot raam, plas met riet). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Op de schoen zit stuifmeel van gras, berk en de struik onder het raam. Welke korrel zegt het meest over de achtertuin?", "correct": 2, "explain": "De struik wordt door insecten bestoven: weinig stuifmeel, en dat blijft dicht bij de plant. Gras en berk worden door de wind bestoven: hun stuifmeel vind je bijna overal."},
  "q06": {"q": "De schoenen gingen pas na vier dagen in beslag. Wat betekent dat?", "correct": 1, "explain": "Bij elke stap komt er nieuw stuifmeel bij en valt er oud af. Op een schoen overheerst vooral de laatste plek; van die avond is een deel weggesleten."},
  "q09": {"q": "Een haar van de verdachte lijkt sterk op het tweede haar: dikte, kleur en merg. Wat kun je nu zeggen?", "correct": 0, "explain": "Onder de microscoop kun je iemand uitsluiten, maar niet aanwijzen. Ook iemand anders kan zulk haar hebben; pas DNA kan meer zeggen."},
  "q11": {"q": "Het tweede haar is eruit getrokken, het derde vanzelf uitgevallen. Welk haar heeft de meeste kans op een DNA-profiel?", "correct": 2, "explain": "Een haar dat nog groeide, heeft aan de wortel veel cellen met een kern. Een uitgevallen haar heeft een knotsje met meestal weinig kernen."},
  "q14": {"q": "De patholoog vindt kiezelwieren in de longen. Wat zegt dat?", "correct": 1, "explain": "Ook bij wie al dood in het water lag, loopt water de luchtwegen in, met kiezelwieren. Daarom kijkt men naar organen die dicht zitten, zoals het beenmerg."},
  "q16": {"q": "In het beenmerg vindt ze geen kiezelwieren. Wat zegt dat?", "correct": 2, "explain": "Weinig: om te verdrinken is weinig water nodig en het hart kan snel stoppen. Ook bij verdrinking ontbreken ze soms."},
  "q19": {"q": "Verhaal 1: hij stond in de achtertuin. Tegen welk ander verhaal weegt de onderzoeker het stuifmeel?", "correct": 0, "explain": "Tegen zijn eigen verhaal: hij stond alleen bij de voordeur. Ze schrijft op hoe goed het spoor bij elk verhaal past; over schuld beslist de rechter."}
 },
 "glossary": [
  {"t": "forensische palynologie", "d": "Stuifmeel en sporen van planten gebruiken bij een juridische vraag, bijvoorbeeld waar iemand is geweest. Een palynoloog is een stuifmeeldeskundige."},
  {"t": "stuifmeelkorrel", "d": "Draagt de mannelijke voortplantingscel van een zaadplant. Ongeveer 10 tot 100 micrometer, met een harde buitenwand die bijna niet vergaat. Vorm, openingen en wandpatroon verschillen per plantengroep."},
  {"t": "windbestuiving en insectenbestuiving", "d": "Windbestuivers (gras, veel bomen zoals de berk) maken enorm veel stuifmeel dat deels ver wegwaait. Insectenbestuivers maken veel minder, kleverig stuifmeel dat dicht bij de plant blijft: dat wijst eerder naar één plek."},
  {"t": "vergelijkingsmonster", "d": "Monster van een bekende plek (voortuin, achtertuin, straat) waarmee je het mengsel op een spoor vergelijkt. Elke plek heeft een eigen mengsel."},
  {"t": "merg", "d": "Kanaaltje in het midden van een haar. Bij mensen meestal smal, onderbroken of afwezig; bij dieren vaak breed (meer dan een derde van de dikte) en regelmatig."},
  {"t": "schubjes", "d": "De buitenste laag van een haar: platte, overlappende schubjes (cuticula). Bij dieren komen veel meer patronen voor dan bij mensen."},
  {"t": "groeiend en uitgevallen haar", "d": "Een haar dat nog groeide (bijvoorbeeld eruit getrokken) heeft aan de wortel veel cellen met een kern: daaruit lukt vaak een DNA-profiel. Een uitgevallen haar heeft een knotsje met meestal weinig kernen."},
  {"t": "kiezelwier", "d": "Alg van één cel met een schaaltje van kiezel (silica), meestal 10 tot 100 micrometer. Leeft in bijna elk water. Het schaaltje blijft over als het weefsel in zuur oplost."},
  {"t": "kiezelwierentest", "d": "Zoeken naar kiezelwieren in organen die dicht zitten, zoals het beenmerg, en vergelijken met het water van de vindplaats. Past bij verdrinking, maar is omstreden: geen betrouwbare grens, vals positief en vals negatief komen voor."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

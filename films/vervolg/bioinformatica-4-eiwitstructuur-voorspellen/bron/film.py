import json
film = {
 "slug": "bioinformatica-4-eiwitstructuur-voorspellen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van letters naar vorm", "sub": "eiwitstructuur voorspellen",
 "puzzle": "In een envelop zit de vorm van een eiwit, net gemeten. Sam krijgt alleen de volgorde van de aminozuren. Kan een computer de vorm voorspellen?",
 "meta": "bio-informatica · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema", "alleen": "havo · vwo",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Bio-informatica",
 "lead": "Sam loopt een meeloopweek bij de afdeling bio-informatica; dit is dag 4. In een envelop zit de vorm van een eiwit, net gemeten in het lab. Sam krijgt alleen de volgorde van de aminozuren. De vorm telt: één ander aminozuur in de holte van een enzym kan de werking veranderen. Meten met een kristal en röntgenstraling of met cryo-elektronenmicroscopie kan jaren duren, en alle vormen uitproberen kan niet: drie tot de macht honderd is een vijf met zevenenveertig nullen. AlphaFold leerde van meer dan honderdduizend gemeten structuren en haalt hints uit uitgelijnde, verwante eiwitten: plekken die samen veranderen, liggen tegen elkaar. In de blinde wedstrijd CASP haalde het in 2020 ongeveer de nauwkeurigheid van meten. Maar de betrouwbaarheid verschilt per stuk, een echt eiwit beweegt, en een voorspelling blijft een hypothese die je toetst.",
 "endHaak": "welke vraag stel jij aan een eiwit?",
 "minis": {"Hoofdstuk 1": "Waarom doet de vorm van een eiwit ertoe?",
           "Hoofdstuk 2": "Waarom meet je niet gewoon elk eiwit, of laat je de computer alles proberen?",
           "Hoofdstuk 3": "Hoe leerde een programma eiwitten vouwen?",
           "Hoofdstuk 4": "Hoe goed was de voorspelling, en wat ziet hij niet?",
           "Recap": "Kon de computer de vorm voorspellen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam en Dr. Kim (castboek). Demis Hassabis, John Jumper en David Baker worden alleen genoemd, niet getekend. De eiwitten in beeld zijn vereenvoudigde modellen, geen echte structuren. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q05": {"q": "Op één plek in de holte van het enzym zit een ander aminozuur. Wat gebeurt er?", "correct": 1,
          "explain": "Eén ander aminozuur kan de vorm van de holte veranderen, en daarmee wat het enzym doet. Even lang zegt niets, en een enzym bouwt zijn holte niet terug: het vouwt zoals de nieuwe volgorde het laat vouwen."},
  "q09": {"q": "Sams eerste idee: laat de computer elke mogelijke vorm van het eiwit proberen. Is dat sneller dan het lab?", "correct": 0,
          "explain": "Het aantal mogelijke vormen is veel te groot: met honderd aminozuren en drie standen per schakel al drie tot de macht honderd. Ook het eiwit in de cel probeert ze niet allemaal; het vouwt veel sneller."},
  "q12": {"q": "In de uitlijning van verwante eiwitten veranderen de letters op twee plekken steeds samen. Wat leert het programma daaruit?", "correct": 2,
          "explain": "Twee aminozuren die elkaar raken, moeten bij elkaar passen. Verandert de één, dan blijft het eiwit vooral werken als de ander mee verandert. Zulke paren liggen dus waarschijnlijk tegen elkaar."},
  "q17": {"q": "Bijna alles van Sams voorspelling is blauw (zeker), een paar stukken zijn oranje (onzeker). De envelop gaat open. Waar zit het grootste verschil?", "correct": 0,
          "explain": "In de oranje stukken: daar was het programma onzeker. Een score van rond de negentig is een gemiddelde over veel eiwitten; per stuk kan het veel slechter zijn."}
 },
 "glossary": [
  {"t": "eiwitstructuur", "d": "De ruimtelijke vorm waarin een keten van aminozuren vouwt. Die hangt meestal af van de volgorde, en bepaalt wat het eiwit kan."},
  {"t": "sequentie", "d": "De volgorde van basen in een stuk DNA, of van aminozuren in een eiwit. Op een scherm: een rij letters."},
  {"t": "databank", "d": "Een openbare verzameling van sequenties of structuren met wat erover bekend is, waarin iedereen kan zoeken. Gemeten eiwitstructuren staan in de PDB."},
  {"t": "uitlijnen", "d": "Twee of meer sequenties zo onder elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan, met gaten waar een stukje ontbreekt of extra is."},
  {"t": "röntgenkristallografie", "d": "Een structuur meten door röntgenstraling door een kristal van heel veel dezelfde eiwitten te sturen; uit het stippenpatroon reken je de vorm terug."},
  {"t": "cryo-elektronenmicroscopie", "d": "Een structuur meten aan snel bevroren eiwitten, zonder kristal. Sinds ongeveer 2013 bijna zo scherp als met een kristal."},
  {"t": "AlphaFold", "d": "Een programma van Google DeepMind dat de vorm van een eiwit voorspelt uit de volgorde. Het leerde van gemeten structuren uit de PDB en gebruikt hints uit uitgelijnde, verwante eiwitten."},
  {"t": "CASP", "d": "Een wedstrijd (sinds 1994, om de twee jaar) waarin teams vormen voorspellen die net gemeten maar nog geheim zijn. Score tot honderd; rond de negentig is ongeveer zo goed als meten."},
  {"t": "betrouwbaarheid per stuk", "d": "AlphaFold geeft per aminozuur een score hoe zeker het is (blauw zeker, oranje onzeker). Een onzeker stuk heeft soms geen vaste vorm, of er waren te weinig hints."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

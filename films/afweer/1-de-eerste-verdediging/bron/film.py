import json
film = {
 "slug": "1-de-eerste-verdediging", "hoofdstuk": "afweer", "hoofdstukNaam": "Afweer",
 "title": "De eerste verdediging", "sub": "Hoe je lichaam indringers tegenhoudt en opruimt",
 "puzzle": "Noor krijgt een splinter in haar vinger. De volgende dag is het plekje rood, warm en dik. Waarom?",
 "meta": "afweer 1/4", "version": "1.0 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks Bescherming en afweer · film 1 van 4",
 "lead": "Huid, slijm en trilharen, lysozym, maagzuur en je eigen bacteriën houden de meeste ziekteverwekkers buiten. Komt er toch iets binnen, dan eten fagocyten het op: ze herkennen vormpjes die veel ziekteverwekkers gemeen hebben, maar onthouden niets (aspecifieke afweer). Histamine uit mestcellen maakt bloedvaatjes wijder (rood, warm) en doorlaatbaarder (dik, pijn), zodat witte bloedcellen het weefsel in kunnen. Bij koorts zetten stoffen van witte bloedcellen de thermostaat in de hypothalamus hoger.",
 "endHaak": "snel, altijd klaar, maar niet op maat",
 "minis": {"Hoofdstuk 1": "Hoe houdt je lichaam ziekteverwekkers buiten?", "Hoofdstuk 2": "Hoe ruimt een fagocyt een bacterie op?", "Hoofdstuk 3": "Waarom wordt een ontsteking rood, warm en dik?", "Hoofdstuk 4": "Waarom krijg je koorts?", "Recap": "Wat gebeurde er bij de splinter?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor heeft een splinter gehad. De volgende dag is het plekje rood, warm en dik. Waarom?", "correct": 0, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 3 en aan het eind."},
  "q06": {"q": "Na een antibioticakuur krijgen sommige mensen diarree. Hoe kan dat?", "correct": 1, "explain": "Antibiotica doden ook je nuttige darmbacteriën. Daardoor krijgen schadelijke bacteriën de ruimte, of schimmels, waar antibiotica niet tegen werken."},
  "q10": {"q": "Je krijgt een bacterie binnen die je lichaam nog nooit heeft gezien. Kan een fagocyt die meteen opeten?", "correct": 1, "explain": "Ja. Een fagocyt herkent vormpjes die veel bacteriën gemeen hebben en die jouw eigen cellen niet hebben. Hij hoeft de soort niet te kennen: aspecifieke afweer."},
  "q15": {"q": "Bij griep krijg je vaak koorts. Waardoor?", "correct": 1, "explain": "Stoffen van witte bloedcellen zetten de thermostaat in de hypothalamus hoger. Je lichaam vindt zichzelf te koud: vaatjes in de huid worden nauwer en je gaat rillen, tot je op de nieuwe instelling zit."}
 },
 "glossary": [
  {"t": "ziekteverwekker", "d": "Bacterie, virus, schimmel of parasiet die je ziek kan maken."},
  {"t": "barrière", "d": "Eerste verdediging die ziekteverwekkers buiten houdt: huid, slijm en trilharen, lysozym in traanvocht en speeksel, maagzuur en de eigen bacterieflora."},
  {"t": "lysozym", "d": "Enzym in traanvocht en speeksel dat de celwand van bacteriën afbreekt."},
  {"t": "bacterieflora", "d": "De nuttige bacteriën op je huid en in je darmen; ze bezetten de plek en het voedsel en remmen ziekteverwekkers."},
  {"t": "fagocyt", "d": "Witte bloedcel die ziekteverwekkers opeet, zoals een macrofaag of een neutrofiel."},
  {"t": "fagocytose", "d": "Het opnemen van een deeltje met schijnvoetjes in een blaasje, waarna lysosomen het met enzymen afbreken."},
  {"t": "aspecifieke afweer", "d": "Afweer die op allerlei ziekteverwekkers reageert zonder de soort te herkennen: snel, altijd klaar, zonder geheugen."},
  {"t": "ontstekingsreactie", "d": "Histamine maakt bloedvaatjes wijder (rood, warm) en doorlaatbaarder (vocht: dik, pijn); witte bloedcellen gaan het weefsel in."},
  {"t": "histamine", "d": "Stof uit mestcellen die bloedvaatjes wijder en doorlaatbaarder maakt."},
  {"t": "pus", "d": "Dode bacteriën, dode witte bloedcellen en weefselresten bij een ontsteking."},
  {"t": "koorts", "d": "Lichaamstemperatuur boven ongeveer 38 °C doordat de thermostaat in de hypothalamus hoger is gezet."},
  {"t": "antigeenpresentatie", "d": "Een fagocyt (vooral een dendritische cel) zet stukjes van een ziekteverwekker (antigenen) op zijn oppervlak en laat ze in een lymfeknoop aan T-helpercellen zien.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

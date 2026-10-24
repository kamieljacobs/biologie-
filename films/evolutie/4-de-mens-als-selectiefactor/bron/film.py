import json
true, false = True, False
film = {
 "slug": "4-de-mens-als-selectiefactor",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "De mens als selectiefactor",
 "sub": "antibiotica, fokken en inteelt",
 "puzzle": "Waarom helpt een antibioticum niet tegen griep, maar maakt het wel resistentie?",
 "meta": "evolutie 4/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 4 van 8",
 "lead": "Een antibioticum doodt bacteriën, geen virussen. Daarom helpt het niet tegen griep. Maar overal waar het komt, selecteert het. De resistente bacteriën blijven over. Plasmiden kunnen resistentie doorgeven aan andere soorten. Bij honden en kool kiest de mens met opzet. Steeds verandert een genenpool, en de mens is de selectiedruk.",
 "endHaak": "volgende film: Toeval en uitwisseling",
 "minis": {
  "Hoofdstuk 1": "Waarom gaat evolutie bij bacteriën zo snel?",
  "Hoofdstuk 2": "Wie blijft er over als het antibioticum komt?",
  "Hoofdstuk 3": "Kan resistentie overspringen naar een andere soort?",
  "Hoofdstuk 4": "Hoe wordt een wolf een chihuahua?",
  "Hoofdstuk 5": "Waarom hebben rashonden vaker erfelijke ziekten?",
  "Recap": "Waarom helpt een antibioticum niet tegen griep, maar maakt het wel resistentie?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {
   "q": "Waarom kan een populatie bacteriën veel sneller evolueren dan een populatie mensen?",
   "correct": 1,
   "explain": "Een mens krijgt ongeveer elke dertig jaar een nieuwe generatie. In het lab haalt een bacterie in één dag tientallen generaties. In je darm gaat het trager, maar nog steeds veel sneller dan bij mensen."
  },
  "q11": {
   "q": "Opa Henk slikt het antibioticum. Wat gebeurt er met de bacteriën in zijn blaas?",
   "correct": 2,
   "explain": "De gevoelige bacteriën gaan dood. De resistente bacteriën merken weinig van het middel. Ze delen gewoon verder, en hun nakomelingen erven het resistentie-allel."
  },
  "q16": {
   "q": "Iemand neemt een antibioticum tegen griep. Wat doet dat?",
   "correct": 0,
   "explain": "Het middel komt overal in je lichaam, ook bij de bacteriën in je darmen. Daar zitten vaak ook een paar resistente bacteriën. Het antibioticum ruimt hun concurrenten op."
  },
  "q22": {
   "q": "Een E. coli met een plasmide voor resistentie ligt naast een bacterie van een andere soort. Wat kan er gebeuren?",
   "correct": 2,
   "explain": "Resistentie springt zo over naar een andere soort. Een bekend voorbeeld is ESBL: een enzym dat penicillines en veel andere antibiotica afbreekt. De genen ervoor liggen meestal op plasmiden, en gaan van E."
  },
  "q28": {
   "q": "Hoe kan uit een wolf ooit een chihuahua ontstaan?",
   "correct": 0,
   "explain": "Elke keer mochten de kleinste honden jongen krijgen. Allelen voor een kleine bouw werden zo, generatie na generatie, vaker in de genenpool. Het mechanisme is precies als bij natuurlijke selectie."
  },
  "q33": {
   "q": "Waarom hebben rashonden vaker erfelijke ziekten?",
   "correct": 2,
   "explain": "Inteelt maakt geen nieuwe mutaties. De knikkers in de pot blijven dezelfde. Wat verandert, is hoe ze in paren komen."
  }
 },
 "glossary": [
  {
   "t": "generatietijd",
   "d": "De tijd tussen het ontstaan van een individu en het moment dat het zelf nakomelingen krijgt; bij bacteriën de tijd tussen twee delingen."
  },
  {
   "t": "antibioticaresistentie",
   "d": "Een bacterie is resistent als een antibioticum haar niet meer doodt of remt. Resistentie wordt in een populatie vaker door selectie van bacteriën met een resistentie-allel; dat allel ontstaat door een toevallige mutatie of komt binnen via een plasmide, niet door het middel."
  },
  {
   "t": "selectiedruk",
   "d": "Een factor in de omgeving die bepaalt welke individuen meer nakomelingen krijgen, hier het antibioticum."
  },
  {
   "t": "plasmide",
   "d": "Klein, ringvormig DNA-molecuul in een bacterie, naast het grote DNA-molecuul. Kan als kopie worden doorgegeven aan een andere bacterie, ook van een andere soort."
  },
  {
   "t": "kunstmatige selectie",
   "d": "Selectie waarbij de mens bepaalt welke individuen zich voortplanten, waardoor gewenste allelen vaker worden. Bij planten heet het veredeling."
  },
  {
   "t": "veredeling",
   "d": "Het verbeteren van planten (of dieren) voor de mens door kunstmatige selectie en gericht kruisen."
  },
  {
   "t": "ras",
   "d": "Groep binnen één soort met eigen erfelijke kenmerken, ontstaan door kunstmatige selectie."
  },
  {
   "t": "inteelt",
   "d": "Voortplanting tussen verwante individuen; geeft meer homozygote nakomelingen, waardoor schadelijke recessieve allelen vaker tot uiting komen."
  },
  {
   "t": "genenbank",
   "d": "Instelling die zaden of ander erfelijk materiaal van rassen en wilde verwanten bewaart om genetische variatie te behouden."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

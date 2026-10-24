import json
true, false = True, False
film = {
 "slug": "x3-van-eerste-cel-tot-nu",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Van eerste cel tot nu",
 "sub": "de aarde als één dag van 24 uur",
 "puzzle": "Vier miljard jaar leven: wanneer verschijnt wat?",
 "meta": "evolutie extra 3/4",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · extra film 3 van 4 (buiten het PTA)",
 "lead": "Van half zes 's ochtends tot negen uur 's avonds: vooral losse cellen. Ze maakten de zuurstof en vormden samen de cel met een kern. Daarna, in drie uur: dieren, planten op het land en vijf grote rampen. En wij: de laatste zes seconden.",
 "endHaak": "volgende extra film: Hoe werden we mens?",
 "minis": {
  "Hoofdstuk 1": "Waarom kwam er pas zo laat zuurstof in de lucht?",
  "Hoofdstuk 2": "Waar komen jouw mitochondriën vandaan?",
  "Hoofdstuk 3": "Wanneer verschijnen de eerste dieren, en wanneer komt het leven aan land?",
  "Hoofdstuk 4": "Wat gebeurt er na een massa-extinctie?",
  "Recap": "Vier miljard jaar leven: wanneer verschijnt wat?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q09": {
   "q": "Waarom bleef die zuurstof zo lang uit de lucht?",
   "correct": 1,
   "explain": "In de oerzee zat veel opgelost ijzer. Zuurstof reageert met ijzer: het roest. Die roest zakte naar de bodem."
  },
  "q16": {
   "q": "Waar komen de mitochondriën vandaan?",
   "correct": 2,
   "explain": "Ooit nam een grotere cel, waarschijnlijk een archaeon, een bacterie op die zuurstof kon gebruiken. Die bacterie werd niet verteerd. Ze leefde binnenin verder en werd bij elke celdeling doorgegeven."
  },
  "q27": {
   "q": "Een paddenstoel staat stil en groeit uit de grond. Met wie zijn schimmels het nauwst verwant?",
   "correct": 0,
   "explain": "Schimmels staan dichter bij dieren dan bij planten. Dat blijkt vooral uit hun DNA. Maar ook hun celwand bevat chitine, net als het pantser van een insect."
  },
  "q35": {
   "q": "Wat gebeurde er na de inslag met de zoogdieren?",
   "correct": 2,
   "explain": "Ook veel zoogdieren stierven uit, maar de overlevers kwamen in een wereld zonder grote dinosauriërs. Uit hen ontstonden veel nieuwe soorten. Tien miljoen jaar later leefden er al vroege primaten en vroege paardachtigen."
  }
 },
 "glossary": [
  {
   "t": "LUCA",
   "d": "De laatste gemeenschappelijke voorouder van alles wat nu leeft (last universal common ancestor); een populatie cellen zonder kern."
  },
  {
   "t": "cyanobacteriën",
   "d": "Bacteriën die aan fotosynthese doen; daarbij komt zuurstof vrij. Ze bouwen stromatolieten."
  },
  {
   "t": "prokaryoten",
   "d": "Cellen zonder kern: bacteriën en archaea. (In de film: 'cellen zonder kern'.)"
  },
  {
   "t": "eukaryoten",
   "d": "Organismen met cellen met een kern en organellen zoals mitochondriën: dieren, planten, schimmels en veel eencelligen."
  },
  {
   "t": "endosymbiose",
   "d": "Een cel neemt een andere cel op zonder die te verteren; die leeft binnenin verder en wordt bij de deling doorgegeven. Zo ontstonden mitochondriën en bladgroenkorrels."
  },
  {
   "t": "Cambrische explosie",
   "d": "In de eerste ongeveer twintig miljoen jaar van het Cambrium (vanaf ongeveer 539 miljoen jaar geleden) verschenen de meeste hoofdgroepen van dieren die nu bestaan."
  },
  {
   "t": "massa-extinctie",
   "d": "In geologisch korte tijd sterft het grootste deel van alle soorten uit. Er waren er vijf grote; de bekendste 66 miljoen jaar geleden."
  },
  {
   "t": "schimmels",
   "d": "Eukaryoten zonder bladgroen, met chitine in de celwand en glycogeen als opslag; nauwer verwant aan dieren dan aan planten."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

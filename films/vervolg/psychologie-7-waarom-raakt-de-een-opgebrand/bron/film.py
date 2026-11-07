import json
film = {
 "slug": "psychologie-7-waarom-raakt-de-een-opgebrand", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Waarom raakt de één opgebrand?", "sub": "… en de ander niet? Stress, grip en burn-out",
 "puzzle": "Noor en Daan hebben dezelfde toetsweek. Noor bloeit op, Daan raakt uitgeput. Hoe kan dat?",
 "meta": "psychologie · stress", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie",
 "lead": "Gaat verder waar de film Stress stopt. Of een situatie je stresssysteem aanzet, hangt af van je beoordeling (staat er iets op het spel? kan ik dit aan?), van je hulpbronnen en van grip en voorspelbaarheid, zoals Weiss met ratten liet zien. Onderzoekers meten stress met vragenlijsten, cortisol in speeksel en haar, en de Trier-stresstest. Langdurige stress belast het lichaam: wondjes genezen trager in de tentamenperiode, mensen met veel stress worden vaker verkouden (allostatische belasting). Burn-out is een probleem door werk, anders dan depressie; actief herstel en veranderingen in het werk helpen. Arbeids- en gezondheidspsychologen werken hieraan.",
 "endHaak": "wat geeft jou grip als het druk wordt, en welke hulpbron zou je vaker kunnen gebruiken?",
 "minis": {"Hoofdstuk 1": "Waarom geeft dezelfde toets niet iedereen evenveel stress?", "Hoofdstuk 2": "Hoe meet je stress?", "Hoofdstuk 3": "Wat doet langdurige stress met je lijf?", "Hoofdstuk 4": "Wat is burn-out, en wat helpt?", "Hoofdstuk 5": "Wat doet een psycholoog hier?", "Recap": "Wat had Daan kunnen helpen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Daan, Dr. Kim en Henk (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor en Daan hebben dezelfde toetsweek. Waar komt het verschil vooral door?", "correct": 1, "explain": "Vooral door hoe ze de toetsweek beoordelen en hoeveel grip ze hebben. Aanleg speelt ook mee, maar het grootste verschil zit hier."},
  "q05": {"q": "Welke rat kreeg de meeste maagzweertjes?", "correct": 1, "explain": "De rat die niets kon doen, terwijl de schokken precies hetzelfde waren als bij de rat met het wieltje. Grip maakt verschil."},
  "q09": {"q": "Hoeveel langzamer genas het wondje in de tentamenperiode?", "correct": 2, "explain": "Ongeveer drie dagen langzamer, zo'n 40%, bij dezelfde studenten (maar het waren er elf; andere onderzoeken bij andere groepen vonden hetzelfde)."},
  "q12": {"q": "Is burn-out hetzelfde als een depressie?", "correct": 1, "explain": "Nee. Ze overlappen, maar burn-out gaat vooral over het werk; bij een depressie heeft iemand nergens meer plezier in."}
 },
 "glossary": [
  {"t": "beoordeling (appraisal)", "d": "Hoe je een situatie inschat: staat er voor mij iets op het spel, en kan ik dit aan? (Lazarus)"},
  {"t": "bedreiging en uitdaging", "d": "Bij bedreiging lijkt het te veel en maakt je lichaam zich klaar om zich te verdedigen; bij uitdaging denk je dat je het aankunt en staat je lichaam klaar om te presteren."},
  {"t": "hulpbronnen", "d": "Wat je helpt om eisen aan te kunnen: tijd, hulp van anderen, rust, zelf kunnen beslissen."},
  {"t": "grip (controle)", "d": "Het gevoel dat je invloed hebt op wat er gebeurt; maakt dezelfde stress minder zwaar (Weiss)."},
  {"t": "voorspelbaarheid", "d": "Weten wat er komt (bij Weiss een piepje vóór de schok); voorspelbare stress is minder zwaar."},
  {"t": "cortisol-dagritme", "d": "Cortisol is het hoogst ongeveer een half uur na het wakker worden en laag in de avond."},
  {"t": "haarcortisol", "d": "Cortisol die in groeiend haar wordt vastgelegd; ± 1 cm haar laat ± 1 maand zien."},
  {"t": "Trier-stresstest", "d": "Labtest waarin je een praatje houdt voor een strenge jury en hardop terugrekent; wekt stress op om de reactie te meten."},
  {"t": "allostatische belasting", "d": "Slijtage door het stresssysteem dat steeds aanslaat of niet meer goed uitgaat (McEwen)."},
  {"t": "burn-out", "d": "Probleem door werk (WHO): uitgeput, cynisch over het werk, en minder goed functioneren."},
  {"t": "werkeisen en hulpbronnen", "d": "Model van arbeidspsychologen: wat vraagt het werk, en wat helpt je om dat aan te kunnen?"},
  {"t": "arbeidspsycholoog", "d": "Psycholoog die werk en werkdruk onderzoekt en organisaties adviseert."},
  {"t": "gezondheidspsycholoog", "d": "Psycholoog die onderzoekt hoe gedrag en gezondheid samenhangen en mensen helpt gezonder te leven (iets anders dan een GZ-psycholoog)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

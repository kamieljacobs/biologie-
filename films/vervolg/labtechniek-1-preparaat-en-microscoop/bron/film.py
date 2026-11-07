import json
film = {
 "slug": "labtechniek-1-preparaat-en-microscoop", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Preparaat en microscoop", "sub": "kleuren, snijden, scherpstellen",
 "puzzle": "Waarom zie je onder de microscoop zonder kleuring bijna niets?",
 "meta": "laboratoriumtechniek · microscopie", "alleen": "havo · vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Laboratoriumtechniek",
 "lead": "Yasmin loopt stage als analist in een onderzoekslab. Ze legt een druppel kweekcellen onder de microscoop en ziet bijna niets. Hoe kan dat? Dat ontdek je in de film. Je leert scherpstellen, de vergroting uitrekenen en waar de grens van licht ligt (ongeveer 0,2 micrometer). Je ziet waarom een preparaat wordt gefixeerd, ingebed, flinterdun gesneden en gekleurd, hoe fluorescentie één eiwit laat oplichten en wat een elektronenmicroscoop meer laat zien. Tot slot meet je een cel met een geijkt liniaaltje en tel je cellen in een telkamer.",
 "endHaak": "wat zou jij als eerste onder een microscoop willen leggen, en hoe maak je het zichtbaar?",
 "minis": {"Hoofdstuk 1 — Scherpstellen en de grens van licht": "Waarom helpt groter maken na 1000× niet meer?", "Hoofdstuk 2 — Een preparaat maken": "Waarom snijd je een plakje van 4 micrometer?", "Hoofdstuk 3 — Verder inzoomen: fluorescentie en elektronen": "Welke microscoop gebruik je voor een levende cel?", "Hoofdstuk 4 — Meten en tellen": "Hoeveel cellen zitten er in een milliliter?", "Recap": "Waarom zag Yasmin bijna niets?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Yasmin als stagiair-analist (castboek). Tekeningen van microtoom, potje en kleurbakjes uit Wat de patholoog ziet. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Yasmin ziet in een druppel kweekcellen bijna niets. Hoe kan dat?", "correct": 2, "explain": "Ongekleurde cellen bestaan vooral uit water en houden bijna geen licht tegen: er is te weinig contrast. Te klein zijn ze niet; met deze microscoop zie je cellen van 20 micrometer prima, als er contrast is."},
  "q05": {"q": "Bij 1000× maakt Yasmin het beeld nog twee keer zo groot. Wat ziet ze?", "correct": 1, "explain": "Lege vergroting: het oplossend vermogen (± 0,2 µm) blijft hetzelfde, dus een wazige vlek wordt alleen een grotere wazige vlek. Ribosomen (± 25–30 nm) zie je met een gewone lichtmicroscoop niet los."},
  "q08": {"q": "Waarom snijdt Yasmin plakjes van ongeveer 4 micrometer?", "correct": 0, "explain": "Een levercel is 20–30 µm; in een plakje van 4 µm kijk je door één laag doorgesneden cellen in plaats van door een stapel. Bederven voorkom je al met fixeren."},
  "q11": {"q": "Yasmin wil mitochondriën zien bewegen in een levende cel. Welke microscoop kiest ze?", "correct": 1, "explain": "Een coupe en een EM-preparaat zijn gefixeerd en dus dood. Een levende cel kan zelf een lichtgevend label maken (bv. GFP) als het gen is ingebouwd; met een fluorescentiemicroscoop zie je de mitochondriën dan bewegen."},
  "q14": {"q": "In een vierkant van 1 × 1 mm (0,1 mm diep) telt Yasmin 50 cellen. Hoeveel per milliliter?", "correct": 2, "explain": "1 × 1 × 0,1 mm³ = 0,1 µL. 50 / 0,1 µL = 500 per µL; × 1000 µL per mL = 500 000 per mL."}
 },
 "glossary": [
  {"t": "contrast", "d": "Verschil in licht en donker (of kleur) tussen een structuur en zijn omgeving; zonder contrast zie je geen vorm, hoe groot je ook vergroot."},
  {"t": "vergroting", "d": "Hoeveel keer groter het beeld is dan het voorwerp: vergroting van het oculair × vergroting van het objectief (bv. 10 × 40 = 400×)."},
  {"t": "oplossend vermogen", "d": "De kleinste afstand waarop je twee punten nog los van elkaar ziet; bij een gewone lichtmicroscoop ongeveer 0,2 micrometer."},
  {"t": "lege vergroting", "d": "Vergroten voorbij wat het oplossend vermogen toelaat: het beeld wordt groter, maar je ziet geen extra details."},
  {"t": "fixeren", "d": "Weefsel vastzetten, bijvoorbeeld met formaline, die eiwitten aan elkaar knoopt; de cellen blijven in vorm en worden niet meer afgebroken door enzymen of bacteriën."},
  {"t": "coupe", "d": "Een flinterdun gesneden en gekleurd plakje weefsel op een glaasje, voor de lichtmicroscoop meestal 3–5 micrometer dik, gesneden met een microtoom."},
  {"t": "HE-kleuring", "d": "Standaardkleuring met hematoxyline (kleurt kernen blauwpaars: DNA en RNA) en eosine (kleurt eiwitten in de rest van de cel roze)."},
  {"t": "fluorescentie", "d": "Een stof (label) neemt licht van één kleur op en geeft licht van een andere kleur af; met een filter zie je alleen dat licht, zodat één stof oplicht tegen een donkere achtergrond."},
  {"t": "elektronenmicroscoop", "d": "Microscoop die elektronen gebruikt in plaats van licht en details van ongeveer een nanometer laat zien; werkt in vacuüm, dus met dode preparaten; voor de gewone (transmissie-)elektronenmicroscoop gefixeerd en ultradun gesneden."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

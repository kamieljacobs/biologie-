import json
G = json.load(open('glossary.json', encoding='utf-8'))
minis = {
 "Hoofdstuk 1 — Een doosje van internet": "Afkomst, koriander en een risico: kans of zekerheid?",
 "Hoofdstuk 2 — Een kind op komst": "Hielprik, NIPT en dragerschapstest",
 "Hoofdstuk 3 — Het zit in de familie": "BRCA1, Huntington en het recht om niet te weten",
 "Hoofdstuk 4 — Een medicijn op maat": "Een DNA-test vóór de kuur; wie wint, wie draagt het risico",
 "Samenvatting — Jouw balans": "De feiten, en wat jij belangrijk vindt"}
for k, v in list(minis.items()):
    if k.startswith('Hoofdstuk'): minis[k.split(' — ')[0]] = v  # de speler zoekt op 'Hoofdstuk N'
film = {
 "slug": "8-wat-heb-jij-aan-dna", "hoofdstuk": "dna", "hoofdstukNaam": "DNA",
 "title": "Wat heb jij aan DNA?", "sub": "een uitslag, en wat jij ermee doet",
 "puzzle": "Een doosje van internet, een test bij de dokter, een telefoontje van een tante. Wil je weten wat erin staat, en wat doe je dan met de uitslag?",
 "meta": "dna 8/8", "version": "2.0 · oktober 2026", "titleLook": "schema", "alleen": "havo · vwo",
 "seriesline": "Biologie bij Kamiel · reeks DNA · film 8 van 8 · havo en vwo, één niveau",
 "lead": "Een doosje van internet, de hielprik en de NIPT, een variant in de familie, een DNA-test vóór een medicijn. Vier keuzes die je kunt tegenkomen, en steeds dezelfde balans: wat de test zeker weet, en wat jij belangrijk vindt. Deze slotaflevering heeft geen vwo-blokken; alles is voor iedereen.",
 "endHaak": "de feiten, en wat jij belangrijk vindt",
 "minis": minis,
 "footer": "Stem: Roos (ElevenLabs, eleven_v3). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek; tekeningen uit de gedeelde bibliotheek (DNA, chromosomen, kruisingsschema, stamboom, enzym, bacterie) volgens Part C van de filmprompt (v13). Bronnen: Biologie voor Jou havo thema 9, Nectar vwo H17, RIVM (hielprik, NIPT), IKNL, Kuchenbaecker e.a. JAMA 2017, Henricks e.a. Lancet Oncol 2018, Wet op de medische keuringen; zie het bronnenlogboek. Versie 2.0 · oktober 2026.",
 "questions": {
  "q4": {"q": "Het rapport zegt: je kans op diabetes type 2 is 1,3 keer zo groot als gemiddeld. Wat betekent dat?", "correct": 2,
         "explain": "Gemiddeld krijgt ongeveer één op de drie mensen diabetes type 2; 1,3 keer zo groot is zo'n vier op de tien. Gewicht, eten en bewegen wegen zwaarder."},
  "q8": {"q": "Bijna alle ouders doen de hielprik, maar de NIPT is een echte keuze. Hoe komt dat?", "correct": 0,
         "explain": "Beide zijn vrijwillige screening. Bij de hielprik is de uitslag het begin van een behandeling, bij de NIPT het begin van een afweging."},
  "q12": {"q": "Je moeder heeft de BRCA1-variant. Jij laat je gericht op die variant testen, en je hebt hem niet. Wat weet je dan over je eigen kinderen?", "correct": 1,
         "explain": "Je kunt alleen doorgeven wat je zelf hebt: zit de variant niet in jouw DNA, dan krijgen je kinderen hem niet van jou."},
  "q16": {"q": "Vóór deze chemokuur krijgt de patiënt eerst een DNA-test. Waar kijkt de arts bij deze test naar?", "correct": 2,
         "explain": "Naar het gen voor het enzym dat het medicijn afbreekt. Een trage variant betekent een lagere dosis of een ander middel."}
 },
 "glossary": G
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

import json
film = {
 "slug": "hoe-weet-een-cel", "hoofdstuk": "cellen", "hoofdstukNaam": "Cellen",
 "title": "Hoe weet een cel wat hij moet worden?", "sub": "Eén eicel, honderden celsoorten, en geen bouwtekening",
 "puzzle": "Vijf dagen na de bevruchting ben je een bal van zo'n honderd cellen met hetzelfde DNA. Acht weken na de bevruchting klopt er een hart en heb je oogjes en vingers. Hoe 'weet' één cel wat hij moet worden?",
 "meta": "extra · cellen · differentiatie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · Cellen · extra film · vwo",
 "lead": "Extra verdieping bij het thema Cellen, voor wie meer wil weten. We volgen één cel uit het vroege embryo tot hij een cel van je ooglens is, met het landschap van Waddington als model. Onderweg: binnen of buiten in de blastocyste, de drie kiembladen, de neurale buis en foliumzuur, inductie (Spemann en Mangold), een gradiënt van Sonic hedgehog in je hand, de lens die ontstaat onder invloed van het oogblaasje, mastergenen (Pax6 en ogen op vliegenpoten), Hox-genen, celgeheugen (en de lapjeskat), en of de knikker weer terug de heuvel op kan (axolotl, Gurdon, Dolly, Yamanaka). Bouwt voort op de films Stamcellen, Genen aan en uit en Van bevruchting tot baby.",
 "endHaak": "welke andere cel in je lichaam heeft ook zijn kern weggegooid, en waarom?",
 "minis": {"Hoofdstuk 1": "Raakt een cel genen kwijt als hij zich specialiseert?", "Hoofdstuk 2": "Wat bepaalt of een cel embryo of placenta wordt?", "Hoofdstuk 3": "Hoe ontstaan de drie kiembladen?", "Hoofdstuk 4": "Hoe kunnen cellen het lot van hun buren veranderen?", "Hoofdstuk 5": "Hoe krijgt elke vinger zijn eigen vorm?", "Hoofdstuk 6": "Bevat een signaal de bouwtekening van een lens?", "Hoofdstuk 7": "Staat er een plattegrond van je lichaam in je DNA?", "Hoofdstuk 8": "Waarom blijft een lenscel een lenscel?", "Hoofdstuk 9": "Is het DNA in een gespecialiseerde cel nog compleet?", "Hoofdstuk 10": "Hoe kwam onze cel aan zijn lot?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Esra en Noor (castboek). Stijl: Part C. Bronnen: bronnenlogboek in de bronmap (114 beweringen, 83 bronnen). Versie 1.0 · oktober 2026 (prompt v13).",
 "questions": {
  "q05": {"q": "Een levercel heeft het gen voor insuline. Wat is er met dat gen aan de hand?", "correct": 1, "explain": "Het gen is er nog, maar het staat uit: bijna elke cel houdt al zijn genen en zet er andere aan en uit."},
  "q16": {"q": "Wat bepaalt of een cel in de buitenlaag of in het klompje van de blastocyste terechtkomt?", "correct": 0, "explain": "Vooral de plek: een cel aan de buitenkant heeft één kant vrij, een cel binnenin raakt aan alle kanten buren. Dat verschil zet andere genen aan."},
  "q27": {"q": "Uit welk kiemblad komt je hart?", "correct": 1, "explain": "Uit het mesoderm, de middelste laag, net als je bloed en je andere spieren."},
  "q44": {"q": "Onderzoekers zetten een tweede bron van Sonic hedgehog aan de voorkant van de vleugelknop van een kippenembryo. Wat groeit er?", "correct": 2, "explain": "Extra vingers in spiegelbeeld: aan beide kanten veel signaal dat naar het midden afneemt, dus aan beide kanten dezelfde volgorde."},
  "q53": {"q": "Bij een muis werkt Pax6 niet in de huid. Het oogblaasje groeit gewoon tegen die huid aan. Ontstaat er een lens?", "correct": 0, "explain": "Nee: het signaal komt aan, maar de huid kan er geen lens van maken. Het hangt af van de cel zelf (competentie)."},
  "q63": {"q": "Bij een vlieg staat een Hox-gen aan op de plek van de voelsprieten. Wat groeit daar?", "correct": 1, "explain": "Poten op de kop: de mutatie Antennapedia, een homeotische mutatie."},
  "q73": {"q": "Waarom zitten de kleuren van een lapjeskat in groepjes?", "correct": 2, "explain": "Vroeg in het embryo wordt in elke cel bij toeval één X uitgeschakeld, en die keuze blijft bij alle nakomelingen van die cel hetzelfde."},
  "q82": {"q": "Kan een eicel met de kern van een darmcel uitgroeien tot een nieuw kikkervisje?", "correct": 2, "explain": "Ja, in een klein aantal gevallen (Gurdon, 1962): de darmkern had nog alle genen voor een heel dier."}
 },
 "glossary": [
  {"t": "differentiatie", "d": "Het specialiseren van een cel tot een bepaalde celsoort, doordat andere genen aan en uit gaan; het DNA blijft (bijna altijd) compleet."},
  {"t": "landschap van Waddington", "d": "Model: een knikker (cel) die een heuvel afrolt; elk dal is een celsoort, en bij elke keuze vallen wegen af."},
  {"t": "blastocyste", "d": "Holle bal van zo'n honderd cellen rond dag 5: een buitenlaag (wordt deel van de placenta) en een binnenste celmassa (wordt het embryo, het vruchtvlies en de dooierzak)."},
  {"t": "gastrulatie", "d": "In week 3: cellen kruipen via de oerstreep naar binnen en vormen de drie kiembladen."},
  {"t": "kiembladen", "d": "Ectoderm (opperhuid, zenuwstelsel, ooglens), mesoderm (spieren, de meeste botten, bloed, nieren, hart) en endoderm (bekleding van darm en longen, lever, alvleesklier)."},
  {"t": "chorda", "d": "Staafje cellen uit het mesoderm onder het midden van het embryo; geeft signaalstoffen af, onder andere Sonic hedgehog."},
  {"t": "neurale buis", "d": "Buis die ontstaat als de neurale plaat oprolt; daaruit groeien hersenen en ruggenmerg. Sluit rond het eind van week 4."},
  {"t": "inductie", "d": "Een groepje cellen verandert met signaalstoffen het lot van zijn buren."},
  {"t": "organisator", "d": "Stukje embryo (bovenrand van de oermond) dat de buren een heel nieuw lichaam laat vormen (Spemann en Mangold, 1924)."},
  {"t": "gradiënt", "d": "Verloop van veel naar weinig signaalstof; hoeveel (en hoe lang) een cel opvangt, bepaalt welke genen aangaan."},
  {"t": "competentie", "d": "Het vermogen van een cel om op een signaal te reageren: de juiste receptor en de juiste genen moeten aanwezig zijn, op het juiste moment."},
  {"t": "mastergen", "d": "Gen dat een heel programma van andere genen op gang brengt, zoals Pax6 voor het oog."},
  {"t": "Hox-genen", "d": "Genen die op een rij liggen in dezelfde volgorde als het lichaam en elke strook een eigen 'adres' geven."},
  {"t": "homeotische mutatie", "d": "Mutatie waardoor een lichaamsdeel groeit op de plek van een ander, zoals poten op de plek van voelsprieten (Antennapedia)."},
  {"t": "positieve terugkoppeling", "d": "Een eiwit zet zijn eigen gen aan; zo houdt een gen zichzelf aan, ook zonder signaal van buiten."},
  {"t": "methylering", "d": "Methylgroepen op het DNA bij genen die uit staan; ze worden bij een celdeling grotendeels doorgegeven (epigenetica)."},
  {"t": "X-inactivatie", "d": "Vroeg in het embryo wordt in elke vrouwelijke cel bij toeval één X-chromosoom uitgeschakeld; de nakomelingen houden dezelfde keuze."},
  {"t": "regeneratie", "d": "Het teruggroeien van een verloren lichaamsdeel, zoals de poot van een axolotl."},
  {"t": "kerntransplantatie", "d": "De kern van een cel in een eicel zetten waarvan de eigen kern weg is (Gurdon 1962, schaap Dolly)."},
  {"t": "iPS-cel", "d": "Geïnduceerde pluripotente stamcel: een gespecialiseerde cel die met een paar genen is teruggezet tot stamcel (Yamanaka 2006)."},
  {"t": "lensvezelcel", "d": "Cel in de ooglens die vol doorzichtige eiwitten zit en zijn kern en organellen afbreekt; deelt niet meer."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

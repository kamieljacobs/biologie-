import json
film = {
 "slug": "sport-3-sterk-op-het-droge", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Sterk op het droge", "sub": "droogtraining voor zwemmers",
 "puzzle": "Een zwemmer traint ook in de krachtzaal, terwijl water bijna niets weegt. Waarom?",
 "meta": "sport en topsport · droogtraining en blessurepreventie", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "In het water weeg je bijna niets, toch loopt de zwemmer na de training naar de krachtzaal. Hij twijfelt: word ik daar niet zwaar en traag van? Je ziet waarom start en keerpunt de enige momenten zijn waarop je tegen iets vasts afzet, en hoeveel van een race daarin zit. Waarom je in de krachtzaal de belasting precies kunt kiezen en opvoeren. Hoe de romp als brug de kracht van armen en benen doorgeeft. Wat er bij veel zwemmers met de spieren rond de schouder gebeurt, en wat de fysiotherapeut daaraan doet. En wat het oplevert: gemiddeld een paar procent, met eerlijk bewijs.",
 "endHaak": "welke droogtraining zou jij als eerste onderzoeken, en hoe zou je meten of hij werkt?",
 "minis": {"Hoofdstuk 1 — Afzetten tegen iets vasts": "Waar duw je in een race tegen iets vasts?",
           "Hoofdstuk 2 — De romp als brug": "Waarom traint een zwemmer zijn romp?",
           "Hoofdstuk 3 — De zwemmersschouder": "Wat gebeurt er met de spieren rond de schouder?",
           "Hoofdstuk 4 — Wat als je het overslaat?": "Word je van krachttraining trager in het water?",
           "Recap": "Waarom train je op het droge voor een sport in het water?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: de zwemmer, de krachttrainer (nieuw beroepspersonage, ter keuring), de fysiotherapeut, de zwemtrainer en een baangenoot (figurant), allemaal uit het castboek. Decors: het 50-meterbad en de krachtzaal ernaast. Getallen uit o.a. Marinho e.a. 2020, Born e.a. 2021, West e.a. 2011, Weston e.a. 2015, Stirling e.a. 2024, Batalha e.a. 2014, Feijen e.a. 2021 en Fone &amp; Van den Tillaar 2022 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Hoeveel van een race van honderd meter, in een vijftigmeterbad, zit in de start en de meters rond het keerpunt?", "correct": 2, "explain": "Bij topzwemmers is dat bijna een derde van de tijd: de start (de eerste 15 meter) en het keerpunt (5 meter voor tot 10 meter na de muur). Het gaat dus niet alleen om de afzet zelf, maar ook om de meters erna, met de snelheid van die afzet. In een vijfentwintigmeterbad, met drie keerpunten, is het zelfs meer dan de helft."},
  "q07": {"q": "Waarom train je die afzet op het droge, en niet in het water?", "correct": 1, "explain": "Water geeft wel tegenwicht, maar hoe zwaar het is, hangt af van je eigen snelheid. In de krachtzaal kies je zelf hoe zwaar het is en voer je dat stap voor stap op. Spieren kunnen in het water wel groeien en worden daar ook moe; dat is het punt niet."},
  "q10": {"q": "Waarom traint een zwemmer zijn romp?", "correct": 0, "explain": "Trainers zien het lichaam als een keten: benen, romp, armen en de hand die het water vastpakt. De romp is de brug in het midden. Is die slap, dan lekt er volgens dat model kracht weg, zakt je heup en krijg je meer weerstand. Je buikspieren duwen je zelf niet vooruit."},
  "q13": {"q": "Wat gebeurt er bij veel zwemmers met de spieren rond de schouder?", "correct": 0, "explain": "Bij elke slag trek je met de grote spieren van borst en rug, en die draaien je arm ook naar binnen. Die binnendraaiers worden vaak het sterkst. In één onderzoek bij jonge zwemmers zonder droogtraining werd het verschil met de buitendraaiers in een seizoen groter; ander onderzoek spreekt dat tegen."},
  "q16": {"q": "Stel, je schouder doet al weken pijn bij het trainen. Wat doe je dan?", "correct": 1, "explain": "Pijn die blijft, is een signaal. Laat het onderzoeken door een fysiotherapeut of sportarts. Die zoekt uit waar het vandaan komt en past samen met de zwemtrainer de training aan. Doorzwemmen of na een week rust gewoon verder gaan lost de oorzaak niet op."},
  "q19": {"q": "Twee even snelle zwemmers; de een gaat een seizoen lang ook naar de krachtzaal, de ander zwemt extra meters. Klopt de gedachte dat je van spieren zwaar en traag wordt?", "correct": 0, "explain": "Nee. In de proeven die onderzoekers op een rij zetten, leek zwemmen plus droogtraining beter te werken dan alleen zwemmen: gemiddeld ongeveer twee procent sneller. Bij een honderd meter van een minuut is dat ruim een seconde. De groepen waren wel klein, en het meeste is gemeten op de vijftig meter en langere afstanden."}
 },
 "glossary": [
  {"t": "droogtraining", "d": "Training buiten het water (kracht, sprongen, romp, schouder), naast het zwemmen."},
  {"t": "explosiviteit", "d": "In korte tijd veel kracht leveren, zoals bij de afzet van het startblok of de keerpuntmuur."},
  {"t": "start en keerpunt", "d": "De enige momenten in een race waarop je tegen iets vasts afzet. Start = de eerste 15 meter; keerpunt = 5 meter voor tot 10 meter na de muur. Bij de honderd meter in een vijftigmeterbad samen bijna een derde van de tijd."},
  {"t": "romp", "d": "Het middendeel van je lichaam tussen schouders en heupen, met de spieren rondom (buik, rug, zij). In het model van de keten de brug die kracht tussen armen en benen doorgeeft."},
  {"t": "weerstand", "d": "De kracht van het water tegen je bewegingsrichting in."},
  {"t": "voortstuwing", "d": "De kracht die je vooruit brengt doordat je water naar achteren duwt."},
  {"t": "zwemmersschouder", "d": "Pijn in de schouder bij zwemmers door overbelasting, vaak bij de pezen."},
  {"t": "binnendraaiers en buitendraaiers", "d": "Spieren die de bovenarm naar binnen of naar buiten draaien. Grote binnendraaiers: de grote borstspier en de brede rugspier. Kleine buitendraaiers liggen achter op het schouderblad en houden ook de kop van de bovenarm in de kom."},
  {"t": "geleidelijk opbouwen", "d": "De trainingsbelasting stap voor stap verhogen in plaats van ineens veel meer gaan trainen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

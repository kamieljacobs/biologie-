import json
film = {
 "slug": "ecologie-2-stikstof", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Stikstof", "sub": "hoe een voedingsstof een probleem werd",
 "puzzle": "Planten hebben stikstof nodig. Waarom verdwijnen er dan soorten door?",
 "meta": "ecologie en natuurbeheer · milieukunde · mbo, hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Ecologie en natuurbeheer",
 "lead": "Daan loopt snuffelstage bij een natuurbeheerder. Met ecoloog Bas staat hij op een heide met aan de rand een stal en een snelweg. Uit mest ontsnapt ammoniak, uit uitlaten en schoorstenen komen stikstofoxiden; een deel komt weer neer: depositie, droog of met regen mee. Ammoniak lost makkelijk op in water en komt gemiddeld dichterbij neer; stikstofoxiden worden eerst omgezet en reizen verder. Het meetnet van het RIVM meet ammoniak in de lucht; de depositie wordt berekend, per zeshoekje van ongeveer een hectare, en voor één plek is dat veel onzekerder dan voor heel Nederland. Boven de kritische depositiewaarde winnen op den duur snelle groeiers, verdwijnen soorten van arme grond en verzuurt de bodem, tot in het ei van de koolmees. De ecoloog schrijft het op in een passende beoordeling; het bestuur beslist.",
 "endHaak": "hoe maak je van een maisakker weer natuur, en hoe weet je of het werkt?",
 "minis": {"Hoofdstuk 1": "Hoe komt stikstof van een stal of een snelweg op de heide?",
           "Hoofdstuk 2": "Wat meet zo'n buisje eigenlijk, en hoe zeker is het getal?",
           "Hoofdstuk 3": "Wanneer is het te veel, en wie wint er dan?",
           "Hoofdstuk 4": "Wat schrijft een ecoloog op, en wie beslist?",
           "Recap": "Waarom verdwijnen er soorten door een voedingsstof?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Daan en Ecoloog Bas (castboek; Bas is een voorstel). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Planten hebben stikstof nodig. Toch verdwijnen er op de heide soorten door stikstof. Hoe kan dat?", "correct": 1,
          "explain": "Stikstof is geen gif: het is een voedingsstof. Op arme grond winnen snelle groeiers als pijpenstrootje, bochtige smele en braam van extra stikstof. Ze worden hoog en dicht en verdringen soorten die met weinig voedsel toe kunnen."},
  "q08": {"q": "Hoeveel van de ammoniak uit een stal komt binnen vijfhonderd meter neer?", "correct": 2,
          "explain": "Volgens het RIVM ongeveer vijf procent: een twintigste. Dat valt op een klein stuk grond, dus per hectare is het toch veel. De rest waait verder, en andersom valt op elke plek ook stikstof van verre bronnen."},
  "q11": {"q": "Daan schrijft het getal van een buisje van het meetnet op. Waar staat dat getal voor?", "correct": 0,
          "explain": "Het buisje meet hoeveel ammoniak er in de lucht zit (de concentratie). De depositie zelf is lastig en duur om te meten; die rekent het RIVM uit, en de metingen controleren dat rekenmodel."},
  "q17": {"q": "Het model rekent voor ons zeshoekje ongeveer 1400 mol stikstof per hectare per jaar. De grens voor droge heide is ongeveer 714 mol. Hoeveel krijgt het zeshoekje, vergeleken met die grens?", "correct": 1,
          "explain": "1400 ÷ 714 ≈ 2: ongeveer twee keer de grens. Maar de marge voor één plek is groot (± 70 %): van ongeveer 400 tot 2400 mol. De grens ligt daarbinnen, dus kijkt de ecoloog ook naar de planten zelf."},
  "q21": {"q": "Daan ziet in een nestkast een ei van een koolmees met een heel dun schaaltje. Wat schrijft hij erbij als oorzaak?", "correct": 2,
          "explain": "Een koolmees haalt kalk voor eieren vooral uit slakkenhuisjes. Stikstof maakt de bodem zuurder; dan spoelt kalk weg en zijn er weinig slakken. Zo komt er te weinig kalk binnen."},
  "q25": {"q": "Iemand wil een nieuwe stal of fabriek bouwen bij een Natura 2000-gebied. Wie beslist of het doorgaat?", "correct": 0,
          "explain": "Meestal beslist de provincie, met het rapport van de ecoloog (de passende beoordeling). De ecoloog levert metingen en een natuuroordeel, het RIVM het rekenmodel; het bestuur beslist."}
 },
 "glossary": [
  {"t": "depositie", "d": "Stikstof die uit de lucht op de bodem en planten neerkomt. Met regen mee heet dat natte depositie, direct op een blad of de grond droge depositie."},
  {"t": "ammoniak en ammonium", "d": "Ammoniak (NH₃) is een gas dat vooral uit mest ontsnapt. Het lost makkelijk op in water en wordt dan ammonium (NH₄⁺); daardoor komt het gemiddeld dichter bij de bron neer."},
  {"t": "stikstofoxiden", "d": "Gassen uit uitlaten en schoorstenen (verkeer, industrie). Ze worden in de lucht eerst omgezet en reizen daardoor gemiddeld verder dan ammoniak."},
  {"t": "Meetnet Ammoniak in Natuurgebieden", "d": "Meetnet van het RIVM (sinds 2005) met buisjes onder een kapje op honderden plekken. Het meet de ammoniak in de lucht, niet de depositie; de buisjes worden elke maand gewisseld en geijkt aan meetstations."},
  {"t": "rekenmodel en Aerius", "d": "Het RIVM rekent de depositie uit met de uitstoot, het weer en de wind; metingen controleren het model. Het programma Aerius rekent per zeshoekje van ongeveer een hectare uit wat een nieuw project extra geeft."},
  {"t": "onzekerheid", "d": "Volgens het RIVM zit de landelijke berekening er zeer waarschijnlijk hooguit 30 % naast, voor één plek 70 %. Hoe kleiner de plek, hoe groter de onzekerheid."},
  {"t": "kritische depositiewaarde (KDW)", "d": "De hoeveelheid stikstofdepositie waarboven een natuurtype op den duur achteruitgaat. Droge heide: 10 kg ≈ 714 mol stikstof per hectare per jaar; hoogveen: 500 mol."},
  {"t": "vergrassing", "d": "Op arme grond die extra stikstof krijgt, winnen snelle groeiers (pijpenstrootje, bochtige smele, braam). Ze worden hoog en dicht en nemen licht weg: meer groei, minder soorten."},
  {"t": "passende beoordeling", "d": "Rapport bij een project dat een Natura 2000-gebied kan schaden: welke natuurtypen er liggen met hun grens, hoeveel stikstof er al valt, wat het project erbij doet en hoe het met de natuur gaat. De ecoloog schrijft het, meestal beslist de provincie."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

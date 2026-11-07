import json
film = {
 "slug": "mariene-biologie-3-een-zee-vol-voedsel", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een zee vol voedsel", "sub": "de Waddenzee",
 "puzzle": "Een mosselkweker wil meer mosselen in de Waddenzee. Waarom vragen vogelonderzoekers zich af wat dat voor vogels betekent?",
 "meta": "mariene biologie · voedselweb en draagkracht", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Mariene biologie",
 "lead": "Je kijkt mee als een kanoet die net van de toendra komt. Op het wad loopt Sam, de stagiair, mee met de mariene bioloog. Je ziet wie wie eet op het wad (algen op de platen en in het water, kokkel, nonnetje, wadpier, mossel, kanoet), wat filteraars doen in een emmerproef met mosselen, hoe weinig energie er per stap doorgaat, waarom voor de kanoet niet alleen het aantal kokkels telt maar ook het vlees per schelp, en waarom kweekmosselen en wilde schelpdieren uit dezelfde algenpot eten: draagkracht voor schelpdieren.",
 "endHaak": "welk dier zou jij volgen om te zien of er genoeg voedsel in zee is?",
 "minis": {"Hoofdstuk 1 — Het voedselweb van het wad": "Waar begint het voedsel van het wad?",
           "Hoofdstuk 2 — Filteraars als zuiveringsinstallatie": "Wat gebeurt er als er heel veel filteraars zijn?",
           "Hoofdstuk 3 — Energie en de piramide van het wad": "Waarom telt het vlees per schelp?",
           "Hoofdstuk 4 — Draagkracht: hoeveel kweek past er?": "Eten kweekmosselen uit dezelfde pot?",
           "Recap": "Waarom vragen vogelonderzoekers zich af wat meer mosselen betekenen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam (stagiair), de mariene bioloog en een mosselkweker (figurant, castboek). Decor: het wad bij laag water. Getallen uit o.a. Van Gils e.a. 2006, Van der Meer &amp; Folmer 2023, Christianen e.a. 2017, Riisgård e.a. 2011 en Wageningen Marine Research 2018 en 2024 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Je bent een kanoet. Bij laag water liggen nonnetjes en jonge kokkels bloot. Hoe eet jij zo'n schelpdier?", "correct": 1, "explain": "Een kanoet slikt kleine schelpdieren met schelp en al door. Zijn gespierde maag (spiermaag) kraakt de schelp; daarom moet de prooi in zijn snavel passen. Een scholekster tikt of wrikt schelpen open, een kanoet niet."},
  "q07": {"q": "Wat eten al die schelpdieren en wormen? Waar begint het voedsel van het wad?", "correct": 2, "explain": "Het voedsel begint bij algen, de producenten: kiezelwieren op de platen en zwevende algen in het water. Kokkels en mosselen zeven vooral de zwevende algen; voor de meeste andere bodemdieren komt de meeste energie van de algen op de platen (Christianen e.a. 2017)."},
  "q10": {"q": "Hoeveel water filtert één volwassen mossel per uur?", "correct": 0, "explain": "Tot een paar liter per uur. In labproeven filterde een mossel van vijf centimeter zo'n vijf liter per uur (Riisgård e.a. 2011); per dag tot tientallen liters."},
  "q12": {"q": "De stagiair doet steeds meer mosselen in de emmer. Wat gebeurt er met de mosselen als het er heel veel worden?", "correct": 1, "explain": "Ze delen dezelfde algen. Metingen in de Waddenzee laten zien dat kokkels slechter groeien waar er heel veel zitten: ze eten het water om zich heen sneller leeg dan het getij aanvult."},
  "q15": {"q": "Per stap gaat ongeveer een tiende door. De algen leggen 10.000 kJ vast. Hoeveel komt er terecht bij alle dieren die kokkels eten?", "correct": 0, "explain": "10.000 kJ in de algen wordt zo'n 1.000 kJ in de kokkels en zo'n 100 kJ in alle kokkeleters samen. De rest gaat vooral op als warmte, of via poep en dode resten naar de bodem. Het is een vuistregel: in echte zeeën ligt het tussen een paar en enkele tientallen procenten."},
  "q18": {"q": "Op beviste plekken bleven evenveel kokkels, toch ging het slecht met de kanoeten. Wat vonden de onderzoekers toen ze de kokkels ook wogen?", "correct": 2, "explain": "In de beviste gebieden hadden de kokkels elk jaar minder vlees per gram schelp. Of de visserij daar de oorzaak van was, is omstreden: andere onderzoekers vinden dat dat niet uit de gegevens volgt."},
  "q21": {"q": "Krijgen kweekmosselen voer?", "correct": 2, "explain": "Nee. Kweekmosselen eten dezelfde algen uit het water als wilde mosselen en kokkels. Daarom hangen kweek, wilde schelpdieren en de vogels die ze eten aan één voedselweb."},
  "q24": {"q": "Hoeveel schelpdieren kunnen de algen op den duur voeden? Is die grens in de westelijke Waddenzee al bereikt?", "correct": 0, "explain": "Onderzoekers meten elk jaar hoe vlezig mosselen zijn en hoe snel kokkels groeien. Tot nu toe vonden ze geen aanwijzingen dat de kweek de draagkracht overschrijdt (Wageningen Marine Research 2018, 2024). Ze blijven meten: elke mossel erbij eet mee uit dezelfde pot."}
 },
 "glossary": [
  {"t": "voedselweb", "d": "Alle voedselrelaties in een ecosysteem samen."},
  {"t": "producent", "d": "Een organisme dat met licht zijn eigen voedsel maakt, zoals algen. Op het wad: kiezelwieren op de platen en zwevende algen in het water."},
  {"t": "filteraar", "d": "Een dier dat voedsel (algen) uit het water zeeft, zoals een mossel of kokkel."},
  {"t": "getijdengebied", "d": "Gebied dat bij hoog water onderloopt en bij laag water droogvalt."},
  {"t": "trekvogel", "d": "Een vogel die elk jaar tussen broedgebied en overwinteringsgebied heen en weer vliegt, zoals de kanoet (toendra → wad)."},
  {"t": "piramide van energie", "d": "De hoeveelheid energie per trofisch niveau, van producenten onderaan naar de eters bovenaan. Per stap gaat ongeveer een tiende door, dus de piramide is onderaan het breedst."},
  {"t": "draagkracht", "d": "Het grootste aantal individuen dat een gebied op den duur kan onderhouden. Hier voor schelpdieren: de grootste hoeveelheid schelpdieren die de algen in een gebied op den duur kunnen voeden."},
  {"t": "aquacultuur", "d": "Het kweken van waterdieren of -planten, hier mosselen op percelen op de bodem."},
  {"t": "mosselzaad", "d": "Jonge mosseltjes (hier zo'n één tot twee centimeter) die de kweker uitzaait op zijn percelen. Steeds meer zaad komt uit invanginstallaties: touwen of netten aan drijvers waar het zaad zich op vastzet."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

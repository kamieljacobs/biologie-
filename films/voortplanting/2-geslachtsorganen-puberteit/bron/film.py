import json
film = {
 "slug": "2-geslachtsorganen-puberteit", "hoofdstuk": "voortplanting", "hoofdstukNaam": "Voortplanting",
 "title": "Geslachtsorganen en puberteit", "sub": "Wat verandert er in je lichaam, en wie geeft het startsein?",
 "puzzle": "Sam en Daan zijn bijna even oud, maar Sam is al een kop groter. Wie bepaalt wanneer je lichaam begint te veranderen?",
 "meta": "voortplanting · puberteit", "version": "2.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Voortplanting · film 2",
 "lead": "Het startsein voor de puberteit komt uit je hersenen: de hypothalamus maakt GnRH, de hypofyse antwoordt met FSH en LH, en de zaadballen of eierstokken gaan testosteron of oestrogeen maken. Die hormonen zorgen voor de secundaire geslachtskenmerken; wanneer dat begint, verschilt sterk tussen mensen. De film volgt een zaadcel van zaadbal tot urinebuis, laat zien waar het vocht van sperma vandaan komt, en bekijkt eierstok, eileider en baarmoeder: de eicelvoorraad is er al vóór de geboorte, en de hypofyse stuurt ook de cyclus.",
 "endHaak": "welke verandering uit de puberteit kun jij nu koppelen aan testosteron of oestrogeen?",
 "minis": {"Hoofdstuk 1": "Wie geeft het startsein, en wat verandert er?", "Hoofdstuk 2": "Welke route neemt een zaadcel?", "Hoofdstuk 3": "Waar liggen eierstok, eileider en baarmoeder?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam, Daan en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 2.0 · oktober 2026 (lichte remake).",
 "questions": {
  "q03": {"q": "Wie geeft in je lichaam het startsein voor de puberteit?", "correct": 2, "explain": "De hypothalamus: die geeft stoten GnRH af. Daarna maakt de hypofyse FSH en LH, en pas dan gaan de geslachtsklieren hormonen maken."},
  "q21": {"q": "Waar komt het meeste vocht van sperma vandaan?", "correct": 1, "explain": "Uit de zaadblaasjes: ruim de helft. De prostaat levert zo'n kwart tot een derde, zaadcellen zijn maar een paar procent."},
  "q27": {"q": "Een meisje begint aan de puberteit. Hoe zit het met haar eicellen?", "correct": 0, "explain": "Alle eicellen zijn al vóór de geboorte aangelegd; bij de puberteit zijn er nog zo'n 300 000, en er komen geen nieuwe bij."}
 },
 "glossary": [
  {"t": "puberteit", "d": "Periode waarin je lichaam geslachtsrijp wordt: de geslachtsorganen gaan werken en de secundaire geslachtskenmerken ontstaan."},
  {"t": "hypothalamus", "d": "Deel van de hersenen dat het startsein geeft met het hormoon GnRH."},
  {"t": "hypofyse", "d": "Klier onder de hypothalamus; maakt onder andere FSH en LH."},
  {"t": "GnRH", "d": "Hormoon van de hypothalamus dat de hypofyse aanzet tot het maken van FSH en LH; komt in stoten."},
  {"t": "FSH en LH", "d": "Hormonen van de hypofyse; ze gaan met het bloed door het hele lichaam, maar alleen zaadballen en eierstokken hebben er receptoren voor."},
  {"t": "receptor", "d": "Eiwit op of in een cel waar een hormoon precies op past; alleen cellen met de juiste receptor reageren op dat hormoon."},
  {"t": "testosteron", "d": "Geslachtshormoon, vooral uit de zaadballen."},
  {"t": "oestrogeen", "d": "Geslachtshormoon, vooral uit de eierstokken."},
  {"t": "primaire geslachtskenmerken", "d": "De geslachtsorganen; die heb je al bij de geboorte."},
  {"t": "secundaire geslachtskenmerken", "d": "Kenmerken die in de puberteit ontstaan, zoals baardgroei, lagere stem, borsten en bredere heupen."},
  {"t": "zaadbal", "d": "Geslachtsklier van de man: maakt zaadcellen en testosteron; hangt in de balzak."},
  {"t": "bijbal", "d": "Buis op de zaadbal waarin zaadcellen rijpen en worden bewaard."},
  {"t": "zaadleider", "d": "Gespierde buis die zaadcellen van de bijbal door de buikwand naar de achterkant van de blaas en de urinebuis brengt."},
  {"t": "zaadblaasjes", "d": "Klieren achter de blaas die ruim de helft van het vocht van sperma maken (met suiker als brandstof)."},
  {"t": "prostaat", "d": "Klier onder de blaas rond de urinebuis; maakt een deel van het vocht van sperma."},
  {"t": "urinebuis", "d": "Buis van de blaas naar buiten; bij de man ook de uitgang voor sperma."},
  {"t": "zwellichamen", "d": "Weefsel in de penis dat zich met bloed kan vullen: een erectie."},
  {"t": "eierstok", "d": "Geslachtsklier van de vrouw: bevat de eicellen en maakt oestrogeen (en progesteron)."},
  {"t": "eileider", "d": "Buis met een trechter die de eicel opvangt en naar de baarmoeder brengt; hier vindt de bevruchting plaats."},
  {"t": "baarmoeder", "d": "Holle spier waarin een embryo zich kan innestelen; bekleed met baarmoederslijmvlies."},
  {"t": "baarmoederhals", "d": "Smal onderste deel van de baarmoeder, uitkomend in de vagina."},
  {"t": "menstruatie", "d": "Het loslaten van het baarmoederslijmvlies (met wat bloed) als er geen bevruchting is geweest."},
  {"t": "kisspeptine", "d": "vwo · Stof van cellen in de hypothalamus die de GnRH-cellen aanzet; nodig om de puberteit te starten."},
  {"t": "leptine", "d": "vwo · Hormoon van vetweefsel; geeft aan dat er genoeg energiereserve is."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

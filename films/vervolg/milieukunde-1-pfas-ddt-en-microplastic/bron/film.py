import json
film = {
 "slug": "milieukunde-1-pfas-ddt-en-microplastic", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "PFAS, DDT en microplastic", "sub": "ophoping in voedselketens",
 "puzzle": "Waarom zitten er meer gifstoffen in een zeearend dan in het water waar hij vist?",
 "meta": "milieukunde · stoffen in voedselketens", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Milieukunde",
 "lead": "Thijs loopt een week snuffelstage bij de omgevingsdienst. Milieukundige Iris onderzoekt de eieren van buurman Joost, die kippen in zijn tuin houdt, en boven de plas achter de tuin vliegt een zeearend. Je ziet hoe een milieukundige stoffen meet die je niet ziet (en wat 'onder de bepalingsgrens' betekent), waarom DDT in vet zit en PFAS aan eiwit in het bloed, hoe PFAS via regenwormen in een ei komt, hoe je aantoont dat een stof per stap in de voedselketen toeneemt (en waarom dat bij microplastic niet zo is), en hoe je van een dierproef of onderzoek bij mensen naar een norm en een maatregel komt.",
 "endHaak": "welke stof uit jouw omgeving zou jij willen laten meten, en in welk monster?",
 "minis": {"Hoofdstuk 1": "Hoe meet je wat je niet ziet?", "Hoofdstuk 2": "Waar in een dier zit het, en via wie kwam het?", "Hoofdstuk 3": "Wordt het bij elke stap meer?", "Hoofdstuk 4": "Hoeveel mag, en wat doe je eraan?", "Recap": "Waarom zit er meer in de arend dan in het water?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Thijs, Milieukundige Iris en buurman Joost (castboek); Daan op een foto. Kip: beeldbank (verbeterronde 1). Decor: ElevenLabs (tuin met kippenren en zeearendnest). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q05": {"q": "Bij het winkelei staat: PFOA, een van de PFAS, onder de bepalingsgrens. Wat betekent dat?", "correct": 2, "explain": "Onder de bepalingsgrens kan het lab het niet betrouwbaar meten. Er kan niets in zitten, maar ook een heel klein beetje: op het formulier schrijf je 'minder dan de grens', niet 0."},
  "q08": {"q": "DDT lost op in vet en hoopt zich daar op. Waar zoek je PFAS in een kip?", "correct": 1, "explain": "PFAS lossen slecht op in vet. Ze haken aan eiwitten, vooral albumine in het bloed, en zitten in de lever. Daarom neem je bloed of een ei als monster."},
  "q11": {"q": "Waar de grond meer PFAS bevat, zitten er niet vanzelf meer in de eieren. Hoe komt het dan in het ei?", "correct": 0, "explain": "Een regenworm eet grond en houdt de PFAS vast; een kip die buiten scharrelt, eet veel wormen. De stof komt vooral via een ander dier in het ei."},
  "q15": {"q": "Vissen eten plastic korreltjes, en arenden eten vissen. Hoopt microplastic zich dus op tot in de arend?", "correct": 2, "explain": "Microplastic gaat wel van prooi naar eter, maar negen van de tien onderzoeken die het testten, vonden geen toename per stap. Over nanoplastic is het nog onbekend."},
  "q18": {"q": "Apen kregen een half jaar PFOS. Bij 0,03 milligram per kilo per dag zag men geen effect. Hoeveel mag een mens dan?", "correct": 0, "explain": "Je deelt door een veiligheidsfactor, meestal 100: mensen kunnen gevoeliger zijn dan apen en verschillen onderling. Bij deze korte proef deelde men nog eens door 2."},
  "q21": {"q": "DDT werd in de jaren zeventig verboden. Wanneer kregen zeearenden aan de Oostzee weer jongen zoals vroeger?", "correct": 1, "explain": "Pas rond 1995: DDE bleef jaren in vis en in de arenden. Het herstel begon midden jaren tachtig, ruim tien jaar na de verboden."}
 },
 "glossary": [
  {"t": "milieukunde", "d": "Het vak dat onderzoekt hoe de mens het milieu verandert (bodem, water, lucht, levende wezens) en hoe je dat meet, beoordeelt en oplost."},
  {"t": "persistent", "d": "Breekt in het milieu nauwelijks af. DDT halveert in de bodem pas na jaren tot tientallen jaren, PFAS breken bijna niet af; microplastic valt wel uiteen in kleinere stukjes, maar verdwijnt niet."},
  {"t": "bepalingsgrens", "d": "De kleinste hoeveelheid van een stof die een lab betrouwbaar kan meten. Onder de bepalingsgrens is niet hetzelfde als nul: er kan nog een heel klein beetje in zitten."},
  {"t": "nanogram", "d": "Een miljardste gram (0,000 000 001 g). PFAS in eieren meet je in nanogrammen per gram."},
  {"t": "bioaccumulatie", "d": "Een stof hoopt zich op in één lichaam, omdat er meer binnenkomt dan eruit gaat. DDT hoopt op in vet, PFAS binden aan eiwitten (albumine) in bloed en lever."},
  {"t": "biomagnificatie", "d": "De concentratie van een stof wordt bij elke stap in de voedselketen hoger. Aangetoond voor DDT, vaak voor PFOS, niet voor microplastic. Elke stap meer is geen wet: in eieren zit minder PFAS dan in de wormen die de kip at."},
  {"t": "norm", "d": "De hoeveelheid die je je hele leven elke dag of week mag binnenkrijgen zonder merkbaar risico, per kilo lichaamsgewicht. Vaak: de dosis zonder effect in een dierproef gedeeld door een veiligheidsfactor (meestal 100). Voor PFAS: 4,4 nanogram per kilo per week (EFSA 2020)."},
  {"t": "veiligheidsfactor", "d": "Het getal waardoor je de dosis zonder effect deelt om een norm te krijgen: × 10 omdat mensen gevoeliger kunnen zijn dan proefdieren, × 10 omdat mensen onderling verschillen; samen meestal 100."},
  {"t": "voorzorg", "d": "Een maatregel nemen voordat alle schade bewezen is, omdat het anders te laat is, bijvoorbeeld bij stoffen die bijna niet afbreken."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

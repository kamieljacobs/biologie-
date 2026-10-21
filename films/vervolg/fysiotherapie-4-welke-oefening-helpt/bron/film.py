import json
film = {
 "slug": "fysiotherapie-4-welke-oefening-helpt", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Welke oefening helpt?", "sub": "vier klachten, vier soorten belasting",
 "puzzle": "Waarom geeft een fysiotherapeut vooral oefeningen mee, en geen massage of apparaat?",
 "meta": "fysiotherapie · oefentherapie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Fysiotherapie",
 "lead": "Op het spreekuur van fysiotherapeut Femke komen een verzwikte enkel, een overbelaste knieschijfpees, lage rugpijn en een pijnlijke schouder. Ze sluit eerst uit wat gevaarlijk is en geeft dan de juiste belasting: balansoefeningen voor het spiergevoel, zware en langzame oefeningen voor de pees, blijven bewegen bij rugpijn en kracht voor de spieren rond de schouder. En ze laat zien hoe je met een nepbehandeling test of een behandeling echt werkt.",
 "endHaak": "welke behandeling heb jij weleens gehad, en weet je of die getest is tegen een nepbehandeling?",
 "minis": {"Hoofdstuk 1": "Waarom helpt staan op een kussen?", "Hoofdstuk 2": "Waarom maakt rust een pees zwakker?", "Hoofdstuk 3": "Waarom zegt een scan bij rugpijn weinig?", "Hoofdstuk 4": "Hoe test je of een operatie echt werkt?", "Recap": "Welk idee zit achter alle vier de oefeningen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Fysiotherapeut Femke, Noor, Bilal, Verpleegkundige Jesse en Yasmin (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom gaan alle vier de patiënten vooral met oefeningen naar huis?", "correct": 2, "explain": "De juiste belasting verandert weefsel en aansturing echt; dat is vaak beter onderzocht en werkzamer dan passieve behandelingen."},
  "q05": {"q": "Waarom helpt staan op één been op een kussen tegen een nieuwe verzwikking?", "correct": 0, "explain": "Bij een verzwikking raken ook zintuigjes in band en spieren beschadigd; balanstraining traint het spiergevoel, zodat je sneller bijstuurt."},
  "q08": {"q": "Bij de oefeningen doet Bilals knie een beetje pijn. Wat zegt Femke?", "correct": 2, "explain": "Pijn tot ongeveer 5 op 10 mag, als die de volgende ochtend weer gezakt is; de pees past zich aan aan de belasting."},
  "q11": {"q": "Waarom wil Femke geen scan van Jesses rug?", "correct": 1, "explain": "Slijtage op een scan zie je ook bij veel mensen zonder pijn; zonder alarmsignalen verklaart een scan weinig en kan hij iemand bang maken."},
  "q14": {"q": "Hoe zoek je uit of een operatie echt helpt?", "correct": 1, "explain": "Vergelijk met een groep die een nepoperatie krijgt; dan zie je wat de ingreep zelf toevoegt bovenop verwachting en tijd."}
 },
 "glossary": [
  {"t": "enkelverzwikking", "d": "De enkel klapt meestal naar buiten om, waardoor de buitenste enkelband wordt uitgerekt of inscheurt."},
  {"t": "balanstraining", "d": "Oefeningen op één been of op een wiebelig kussen die het spiergevoel trainen; verminderen de kans op een nieuwe verzwikking."},
  {"t": "overbelaste pees", "d": "Pees met pijn door te veel belasting; de collageendraden zijn rommelig, maar er is niets gescheurd en meestal geen echte ontsteking (tendinopathie)."},
  {"t": "collageen", "d": "Eiwit dat in draden de stevigheid van pees, band en huid geeft; peescellen maken meer collageen als de pees belast wordt."},
  {"t": "lage rugpijn", "d": "Pijn onder in de rug; bij de meeste mensen is er geen duidelijke oorzaak te vinden (aspecifiek)."},
  {"t": "tussenwervelschijf", "d": "Schokdempende schijf tussen twee wervels; slijtage ervan zie je op scans ook bij veel mensen zonder pijn."},
  {"t": "alarmsignalen", "d": "Klachten die wijzen op iets ernstigs, zoals bij rugpijn een gevoelloos zitvlak, moeite met plassen of koorts; dan direct naar een arts."},
  {"t": "rotatorenmanchet", "d": "De vier kleine spieren rond het schoudergewricht die de kop van de bovenarm in de kom houden."},
  {"t": "nepbehandeling", "d": "Behandeling die op de echte lijkt maar het werkzame deel mist (placebo); nodig om te testen of een behandeling zelf iets toevoegt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

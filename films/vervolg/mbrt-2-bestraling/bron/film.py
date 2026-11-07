import json
film = {
 "slug": "mbrt-2-bestraling", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Bestraling", "sub": "waarom straling een tumor harder raakt",
 "puzzle": "Straling beschadigt DNA. Hoe kan het dan een behandeling zijn?",
 "meta": "medische beeldvorming · radiotherapie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Medische beeldvorming",
 "lead": "Opa Henk heeft prostaatkanker en krijgt twintig bestralingen. Maar straling beschadigt toch juist je DNA? Ioniserende straling breekt DNA, en een dubbelstrengsbreuk is moeilijk te herstellen. Een gezonde cel stopt en repareert; een tumorcel met kapotte remmen deelt door en verliest stukken chromosoom. Door de dosis op te delen, herstelt gezond weefsel tussen de keren. Prostaatkanker is een uitzondering: hij groeit langzaam en herstelt goed, daarom krijgt Henk minder, grotere porties. Henk wordt er niet radioactief van, maar wie elke dag met straling werkt, beschermt zich met tijd, afstand en afscherming.",
 "endHaak": "zou jij elke dag met straling willen werken, en hoe zou je jezelf beschermen?",
 "minis": {"Hoofdstuk 1": "Wat is het verschil tussen een enkel- en een dubbelstrengsbreuk?", "Hoofdstuk 2": "Waarom sterft een tumorcel eerder?", "Hoofdstuk 3": "Waarom twintig keer drie gray?", "Hoofdstuk 4": "Is Henk na de bestraling radioactief?", "Recap": "Wat doet een MBB'er?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Oma Ria en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Straling beschadigt DNA. Hoe kan bestraling dan helpen tegen kanker?", "correct": 1, "explain": "Straling raakt ook gezonde cellen, maar kankercellen delen door met kapot DNA en herstellen hun schade slechter. Ze sterven eerder. Radioactief worden ze niet."},
  "q06": {"q": "Een tumorcel deelt door met gebroken chromosomen. Wat gebeurt er bij de deling?", "correct": 0, "explain": "Het afgebroken stuk heeft geen centromeer; de trekdraden pakken het niet vast en het raakt kwijt. De dochtercellen missen genen en sterven."},
  "q09": {"q": "Waarom krijgt Henk twintig keer drie gray in plaats van alles in één keer?", "correct": 2, "explain": "Tussen de bestralingen herstellen gezonde cellen het grootste deel van hun schade; bij de meeste tumoren herstellen tumorcellen slechter. Prostaatkanker groeit langzaam en herstelt zelf ook goed: daarom krijgt Henk minder, grotere porties (20 × 3 in plaats van 39 × 2 gray)."},
  "q12": {"q": "Moet Oma Ria na de bestraling afstand van Henk houden?", "correct": 1, "explain": "Nee. Het toestel maakt alleen straling zolang het aanstaat; er blijft niets in Henk achter."}
 },
 "glossary": [
  {"t": "ioniserende straling", "d": "Straling met zo veel energie dat ze elektronen uit moleculen slaat, zoals röntgenstraling en de straling van een bestralingstoestel."},
  {"t": "enkelstrengsbreuk", "d": "Breuk in één van de twee DNA-strengen; goed te herstellen, want de andere streng dient als voorbeeld."},
  {"t": "dubbelstrengsbreuk", "d": "Breuk in beide strengen vlak naast elkaar; het DNA valt in twee stukken en is moeilijk te herstellen."},
  {"t": "gray (Gy)", "d": "Eenheid van geabsorbeerde stralingsdosis: één joule per kilogram weefsel."},
  {"t": "controlepunt", "d": "Moment in de celcyclus waarop de cel controleert of haar DNA in orde is voordat ze verder gaat; bij kankercellen werkt dat vaak niet."},
  {"t": "fractioneren", "d": "De totale dosis opdelen in porties (fracties), zodat gezond weefsel tussendoor kan herstellen; meestal 2 Gy per keer, bij prostaatkanker vaak 20 × 3 Gy."},
  {"t": "bestralingsplan", "d": "Berekening van uit welke richtingen en met hoeveel straling wordt bestraald, gemaakt op een CT-scan van de patiënt."},
  {"t": "tijd, afstand, afscherming", "d": "De drie regels om je te beschermen tegen straling: zo kort mogelijk, zo ver mogelijk weg, en iets ertussen."},
  {"t": "MBB'er", "d": "Medisch beeldvormings- en bestralingsdeskundige: maakt scans en bestraalt patiënten; hbo-opleiding MBRT van vier jaar."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

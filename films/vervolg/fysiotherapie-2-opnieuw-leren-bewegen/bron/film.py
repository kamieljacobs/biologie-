import json
film = {
 "slug": "fysiotherapie-2-opnieuw-leren-bewegen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Opnieuw leren bewegen", "sub": "zenuwen, spiergevoel en revalidatie",
 "puzzle": "Henks arm is niet kapot. Waarom doet hij het dan niet?",
 "meta": "fysiotherapie · revalidatie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Fysiotherapie",
 "lead": "Na een beroerte in zijn linkerhersenhelft doet de rechterarm van Opa Henk niets meer. De spieren en zenuwen in zijn arm zijn heel; de opdracht komt alleen niet aan. Fysiotherapeut Femke voorspelt in de eerste dagen hoe goed hij herstelt, legt uit hoe motorische eenheden en spierspoeltjes werken, en laat zien dat het brein zich aanpast als je de zwakke arm veel en in echte taken gebruikt.",
 "endHaak": "welke vaardigheid zou jij opnieuw willen leren, en hoeveel herhalingen zou dat kosten?",
 "minis": {"Hoofdstuk 1": "Waarom valt na schade links de rechterarm uit?", "Hoofdstuk 2": "Hoe weet je waar je hand is met je ogen dicht?", "Hoofdstuk 3": "Wat is plasticiteit?", "Hoofdstuk 4": "Waarom draait revalidatie om herhalen?", "Recap": "Wat moest Henks brein opnieuw aanleggen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Fysiotherapeut Femke en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom vraagt Femke Henk drie dagen na zijn beroerte zijn vingers te strekken en zijn arm opzij te tillen?", "correct": 2, "explain": "Of dat binnen drie dagen een beetje lukt, voorspelt goed hoeveel handvaardigheid na een half jaar terugkomt."},
  "q06": {"q": "Hoe weet je met je ogen dicht waar je hand is?", "correct": 0, "explain": "Spierspoeltjes melden steeds hoe ver en hoe snel elke spier wordt uitgerekt; daaruit maken je hersenen een kaart van je lichaam (spiergevoel)."},
  "q09": {"q": "Wat helpt Henks rechterarm het meest?", "correct": 1, "explain": "Veel oefenen met de zwakke arm in echte taken; wie hem niet gebruikt, leert hem af (aangeleerd niet-gebruik)."}
 },
 "glossary": [
  {"t": "beroerte", "d": "Een stuk hersenen krijgt te weinig bloed (door een stolsel of bloeding), waardoor daar hersencellen afsterven."},
  {"t": "motorische schors", "d": "Strook hersenschors die bewegingen plant en opdrachten naar de spieren stuurt; de banen kruisen naar de andere lichaamshelft."},
  {"t": "motorische eenheid", "d": "Eén motorisch neuron samen met alle spiervezels die het aanstuurt; klein in oogspieren, groot in beenspieren."},
  {"t": "spierspoeltje", "d": "Zintuigje in een spier dat meldt hoe ver en hoe snel de spier wordt uitgerekt."},
  {"t": "spiergevoel", "d": "Weten waar je lichaamsdelen zijn en hoe ze bewegen, zonder te kijken (proprioceptie)."},
  {"t": "plasticiteit", "d": "Het vermogen van de hersenen om verbindingen te veranderen, zodat gezonde gebieden werk kunnen overnemen."},
  {"t": "aangeleerd niet-gebruik", "d": "Je gaat een zwakke arm steeds minder gebruiken, waardoor het hersengebied dat hem aanstuurt verder achteruitgaat."},
  {"t": "revalidatie", "d": "Behandeling om na ziekte of letsel weer zo zelfstandig mogelijk te functioneren, met een team van onder anderen fysiotherapeut, ergotherapeut en logopedist."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

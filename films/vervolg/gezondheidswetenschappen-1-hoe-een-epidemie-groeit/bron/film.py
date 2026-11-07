import json
film = {
 "slug": "gezondheidswetenschappen-1-hoe-een-epidemie-groeit", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Hoe een epidemie groeit en stopt", "sub": "een dossier, melding voor melding",
 "puzzle": "Waarom groeide corona in maart 2020 zo snel, en waarom stopt een epidemie uiteindelijk?",
 "meta": "gezondheidswetenschappen · epidemiologie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Gezondheidswetenschappen",
 "lead": "Yasmin loopt snuffelstage bij de afdeling infectieziektebestrijding van een GGD. Epidemioloog Farid bouwt met haar een oefendossier van één uitbraak, melding voor melding. Zo zie je wat het reproductiegetal R is en waar het van afhangt, waarom een uitbraak met R boven 1 elke paar dagen verdubbelt, wat 'de curve afvlakken' betekent, welk deel van de mensen immuun moet zijn om de groei te stoppen, en waarom een epidemie ook zonder maatregelen stopt, maar dan ver doorschiet. Tot slot rekent Farid een maatregel door met een eenvoudig model: geen zekere voorspelling, maar wat er gebeurt áls de aannames kloppen.",
 "endHaak": "welke aanname in een model zou jij het eerst willen controleren?",
 "minis": {"Hoofdstuk 1": "R, R₀ en waar het van afhangt", "Hoofdstuk 2": "Waarom wordt het steeds keer twee, en wat betekent afvlakken?", "Hoofdstuk 3": "Welk deel van de mensen moet immuun zijn?", "Hoofdstuk 4": "Wat kan een model wel, en wat niet?", "Recap": "Waarom groeide corona zo snel, en waarom stopt een epidemie?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Bilal en Epidemioloog Farid (castboek). Decor: ElevenLabs (kantoor van de GGD). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q07": {"q": "Stel dat iedereen de helft minder contacten heeft. Wat gebeurt er dan met R?", "correct": 1, "explain": "R wordt ook ongeveer de helft: in de som 10 × 1/20 × 5 = 2,5 wordt het 5 × 1/20 × 5 = 1,25. R hangt dus niet alleen van het virus af, maar ook van wat mensen doen."},
  "q10": {"q": "Op dag 0 zijn er 10 meldingen, op dag 5 zijn het er 20. R blijft hetzelfde. Hoeveel meldingen zijn er op dag 20?", "correct": 2, "explain": "Ongeveer 160. Elke vijf dagen verdubbelt het aantal: 20, 40, 80, 160. Er komt niet steeds hetzelfde aantal bij; het wordt steeds keer twee. Dat is exponentiële groei met een vaste verdubbeltijd."},
  "q14": {"q": "Met maatregelen wordt de curve lager en breder. Wat betekent die curve afvlakken vooral?", "correct": 0, "explain": "De zieken komen niet allemaal tegelijk: de piek komt lager en later, zodat de zorg ze aankan. Dat er in totaal minder mensen ziek worden is niet de kern van afvlakken."},
  "q18": {"q": "Stel R-nul is drie. Welk deel van de mensen moet immuun zijn om de groei te stoppen?", "correct": 2, "explain": "Ongeveer twee derde: 1 − 1/R₀ = 1 − 1/3 ≈ 67 %. Van de drie mensen die een zieke zou aansteken, zijn er dan twee immuun en blijft er gemiddeld één over: R = 1. Iets meer immuun, dan zakt R onder de één."},
  "q21": {"q": "Stel dat niemand iets doet. Wanneer is de uitbraak dan helemaal voorbij?", "correct": 1, "explain": "R zakt vanzelf onder de één, maar wie nog ziek is steekt anderen aan: in het model raakt ruim 9 op de 10 besmet, niet iedereen."},
  "q26": {"q": "Het model geeft voor de piek één getal. Wat zegt dat getal?", "correct": 0, "explain": "Wat er gebeurt als de aannames kloppen, bijvoorbeeld over hoe mensen zich gedragen en hoe lang iemand besmettelijk is. Het is geen zekere uitkomst: verandert een aanname, dan verandert de uitkomst."}
 },
 "glossary": [
  {"t": "epidemiologie", "d": "Het vak dat onderzoekt hoe vaak een ziekte voorkomt in een bevolking, bij wie, en waardoor."},
  {"t": "bron- en contactonderzoek", "d": "Na een melding zoekt de GGD uit waar iemand besmet is geraakt (de bron) en wie er via hem of haar besmet kan zijn (de contacten)."},
  {"t": "reproductiegetal R", "d": "Het gemiddelde aantal mensen dat één besmettelijk persoon besmet. R hangt af van het aantal contacten, de kans op besmetting per contact, hoe lang iemand besmettelijk is, en hoeveel mensen al immuun zijn."},
  {"t": "R₀ (basisreproductiegetal)", "d": "Het reproductiegetal in een bevolking waar nog niemand immuun is en niemand maatregelen neemt."},
  {"t": "exponentiële groei", "d": "Groei waarbij het aantal steeds met hetzelfde getal wordt vermenigvuldigd (bijvoorbeeld keer twee), in plaats van dat er steeds evenveel bijkomt."},
  {"t": "verdubbeltijd", "d": "De tijd waarin het aantal zieken of meldingen twee keer zo groot wordt. Bij exponentiële groei blijft die tijd gelijk."},
  {"t": "vatbaar", "d": "Nog niet immuun: iemand die de ziekte nog kan krijgen."},
  {"t": "groepsimmuniteit", "d": "Zoveel mensen zijn immuun dat het virus te weinig nieuwe vatbare mensen vindt en de uitbraak uitdooft; ook wie niet immuun is, loopt dan veel minder kans. Vuistregel voor de drempel: 1 − 1/R₀."},
  {"t": "model en scenario", "d": "Een model is een vereenvoudigde rekenversie van de werkelijkheid, bijvoorbeeld met drie bakken: vatbaar, besmettelijk, hersteld. Een scenario is wat het model uitrekent bij bepaalde aannames; het is geen zekere voorspelling."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

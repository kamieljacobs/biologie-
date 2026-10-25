import json
film = {
 "slug": "biomedisch-1-signalen-in-de-cel", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Signalen in de cel", "sub": "van receptor tot respons",
 "puzzle": "Hoe kan één hormoonmolecuul aan de buitenkant duizenden reacties in de cel starten?",
 "meta": "biomedische wetenschappen · celbiologie", "alleen": "vwo", "version": "1.1 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biomedische wetenschappen",
 "lead": "Adrenaline komt de cel niet in, en toch maakt één molecuul in een levercel miljoenen glucosemoleculen vrij. De receptor verandert van vorm, een tweede boodschapper (cAMP) verspreidt het signaal en kinasen zetten met fosfaatgroepen uit ATP stap voor stap steeds meer eiwitten aan. Een groeifactor zet zo via Ras en een rij kinasen genen voor celdeling aan. Zit zo'n route vast op 'aan', dan kan kanker ontstaan. Opa Henk slikt elke ochtend een tabletje dat zijn kapotte kinase remt.",
 "endHaak": "welke stap in een signaalroute zou jij willen leren remmen?",
 "minis": {"Hoofdstuk 1 — Receptoren": "Hoe komt een signaal door het membraan zonder dat het hormoon naar binnen gaat?", "Hoofdstuk 2 — Het signaal versterken": "Waarom geeft één adrenalinemolecuul zo'n groot effect?", "Hoofdstuk 3 — Een signaal naar de kern": "Hoe zet een groeifactor genen voor celdeling aan?", "Hoofdstuk 4 — Kanker en remmers": "Waarom helpt het tabletje van Opa Henk?", "Recap": "Wat heeft het tabletje met de levercel te maken?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Noor en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.1 · oktober 2026.",
 "questions": {
  "q02": {"q": "Adrenaline blijft buiten de levercel. Hoe start hij binnen toch een reactie?", "correct": 1, "explain": "De receptor is een eiwit dat dwars door het membraan steekt. Bindt adrenaline aan de buitenkant, dan verandert de hele kluwen van vorm, ook aan de binnenkant: dat is het signaal."},
  "q07": {"q": "De adrenaline is weg, maar cAMP en aangezette eiwitten zitten nog in de cel. Hoe stopt het signaal?", "correct": 2, "explain": "Een enzym breekt cAMP voortdurend af en andere enzymen halen de fosfaatgroepen van de eiwitten af. Het signaal blijft alleen aan zolang er steeds een nieuw signaal binnenkomt."},
  "q11": {"q": "Ras blijft door een mutatie steeds aan. Een medicijn blokkeert de receptor. Wat verwacht je?", "correct": 0, "explain": "Ras zit ná de receptor in de route. Staat Ras vast op aan, dan helpt blokkeren aan het begin niet: de cellen blijven delen."}
 },
 "glossary": [
  {"t": "receptor", "d": "Eiwit dat een signaalstof bindt en daardoor van vorm verandert; zit in het membraan (wateroplosbare hormonen) of in de cel (steroïdhormonen)."},
  {"t": "signaaltransductie", "d": "Het doorgeven van een signaal van de receptor naar een reactie in de cel, via een reeks eiwitten en kleine moleculen."},
  {"t": "tweede boodschapper", "d": "Klein molecuul dat in de cel het signaal verspreidt nadat de eerste boodschapper (het hormoon) buiten aan de receptor heeft gebonden; bijvoorbeeld cAMP, gemaakt uit ATP."},
  {"t": "kinase", "d": "Enzym dat een fosfaatgroep van ATP op een ander eiwit zet; dat eiwit verandert van vorm en gaat aan (of uit)."},
  {"t": "fosfaatgroep", "d": "Groepje van fosfor en zuurstof; de laatste van de drie fosfaatgroepen van ATP wordt door een kinase op een eiwit gezet (ATP wordt ADP)."},
  {"t": "cascade", "d": "Rij enzymen waarin elk enzym veel exemplaren van het volgende aanzet, zodat het signaal bij elke stap wordt versterkt."},
  {"t": "groeifactor", "d": "Signaalstof die cellen laat delen, bv. uit bloedplaatjes bij een wond; de receptor is zelf een kinase."},
  {"t": "Ras", "d": "Schakeleiwit in de route van groeifactoren: wordt aangezet door de receptor en zet zichzelf weer uit; een mutatie kan het vast op 'aan' zetten."},
  {"t": "kinaseremmer", "d": "Medicijn dat een kinase blokkeert, vaak door in de plek te passen waar het kinase ATP bindt; bv. imatinib bij chronische myeloïde leukemie."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

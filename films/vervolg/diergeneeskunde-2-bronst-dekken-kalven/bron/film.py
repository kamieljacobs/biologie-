import json
film = {
 "slug": "diergeneeskunde-2-bronst-dekken-kalven", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Bronst, dekken en kalven", "sub": "voortplanting bij dieren",
 "puzzle": "Hoe weet een veehouder wanneer een koe tochtig is?",
 "meta": "diergeneeskunde · voortplanting", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Diergeneeskunde",
 "lead": "Een koe is ongeveer elke drie weken een halve dag tochtig; een sensor om de hals helpt de veehouder dat te zien. Andere dieren hebben een andere klok: daglengte regelt via melatonine wanneer schapen en paarden tochtig worden, en bij een kat zet de paring de eisprong in gang. Bij koeien komt er meestal geen stier aan te pas: kunstmatige inseminatie en embryotransplantatie. Stagiaire Lotte ziet met Dierenarts Mila een echo van een vruchtje, een kalf dat achterstevoren ligt, en de vraag wat je van een dier mag vragen bij het fokken.",
 "endHaak": "zou jij als dierenarts meewerken aan een keizersnede die door het fokken bijna altijd nodig is?",
 "minis": {"Hoofdstuk 1": "Hoe zie je dat een koe tochtig is?", "Hoofdstuk 2": "Hoe weet een schaap welk seizoen het is?", "Hoofdstuk 3": "Hoe krijgt één koe veel kalveren?", "Hoofdstuk 4": "Wat doet Mila bij een moeilijke verlossing?", "Recap": "Wat heeft Lotte gezien?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dierenarts Mila en Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Hoe ziet een veehouder dat een koe tochtig is?", "correct": 1, "explain": "Een tochtige koe is onrustig en loopt veel meer rond; het duidelijkste teken is dat ze blijft staan als een andere koe op haar springt (staande tocht)."},
  "q09": {"q": "Waarom zet een fokker van renpaarden zijn merries in de winter elke avond extra onder een lamp?", "correct": 2, "explain": "Minder uren donker betekent minder melatonine; het lichaam van de merrie schakelt dan over op voorjaar en ze wordt eerder tochtig."},
  "q16": {"q": "Mila voelt twee pootjes, maar de zolen wijzen omhoog en verderop voelt ze een hak. Wat betekent dat?", "correct": 0, "explain": "Het zijn de achterpoten: het kalf ligt achterstevoren. Dan moet het snel, want de navelstreng raakt bekneld voordat de kop buiten is."}
 },
 "glossary": [
  {"t": "tochtig", "d": "De korte periode rond de eisprong waarin een vrouwelijk dier zich laat dekken; bij de koe ongeveer elke drie weken een halve dag."},
  {"t": "staande tocht", "d": "Het duidelijkste teken van tocht bij een koe: ze blijft staan als een andere koe op haar springt."},
  {"t": "seizoensgebonden bronst", "d": "Bronst die afhangt van de daglengte: schapen worden tochtig in de herfst, paarden in het voorjaar."},
  {"t": "melatonine", "d": "Hormoon van de pijnappelklier dat in het donker wordt gemaakt; de hoeveelheid vertelt het lichaam welk seizoen het is."},
  {"t": "geïnduceerde eisprong", "d": "Een eisprong die (meestal) pas door de paring op gang komt, zoals bij de kat en het konijn."},
  {"t": "kunstmatige inseminatie (KI)", "d": "Sperma met een pipet in de baarmoeder brengen, zonder stier; het sperma is ingevroren in rietjes in vloeibare stikstof."},
  {"t": "embryotransplantatie", "d": "Een koe krijgt hormonen zodat er veel eicellen rijpen; na inseminatie worden de embryo's uitgespoeld en in andere koeien geplaatst."},
  {"t": "drachtigheidscontrole", "d": "Vaststellen of een dier drachtig is, bij de koe met een echo via de endeldarm, vanaf ongeveer een maand."},
  {"t": "Belgisch witblauw", "d": "Runderras gefokt op extra spieren door een mutatie in het myostatinegen; de meeste kalveren worden met een keizersnede geboren."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

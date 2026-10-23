# Tekenronde 2 — Evolutie v2 (23 okt 2026)

Kamiel keurde film 1–4 op het storyboardblad. Zijn algemene opmerkingen (aangevinkt 'geldt voor alle films'), letterlijk:
- "zorg dat hoe de vogel op de boom zit, hoe hij dan zijn poten neerzet bijv realistischer is. zorg dat dieren realistisch bewegen, staan etc" (e3s07, koolmees op schors)
- "wolf mag mooier en realistischer, misschien iets meer details. Maak hem op een manier waardoor je de schoonheid van de wilde natuur ervaart." (e4s21)
- "de vormen van de dieren (kop, lichaamsdelen etc) mag beter." (e4s22, wolf + hondenrassen)
- "de bacterie moet mooier, realistischer" (e4s16, e4s17)
- "het DNA en de draden kunnen mooier. misschien ietsje dikker?" (e4s03)
Per scène ook: "de blaadjes zitten niet goed vast aan de plant" (e2s01, e2s02), "de boom mag iets mooier geanimeerd worden" (e2s04, opuntia), "laat ook even zien hoe die orchidee eruit ziet, nu lijkt het of de buis losgeknipt is" (e3s25).
Positief: "goed hoe je de histogrammen inzet en laat verschuiven" (e3s09) — Schema-objecten blijven zoals ze zijn.

## Doel
Elk dier, de bacterie en DNA zo tekenen dat een bioloog ze zonder label herkent en mooi vindt: echte anatomie en verhoudingen, een natuurlijke houding (gewicht op de poten, poten die echt op de ondergrond staan, tenen die een tak omklemmen), en meer detail dan nu, binnen de Part C-stijl (vlak getekend, geen verlopen, geen gloed, geen schaduw; diepte door lagen en tinten; echt oog via `dierOog`). Lees in PROMPT_v8.txt deel C1, C3 en C9 (zoek "C9. Tekenrecepten") en /home/claude/biologie-/films/BEELDAFSPRAKEN.md.

## Werkwijze per object (verplicht)
1. **Opzoeken**: zoek met WebSearch/WebFetch naar de echte anatomie: skelet/proporties (bv. lengte poot : romp, plaats van knie en hiel, nek, kopvorm), kenmerkende houding in rust, en hoe het dier op de ondergrond staat. Noteer 3–5 getallen of regels per dier (bron erbij).
2. **Tekenen** met meer detail waar het kenmerkend is (vachttekening, oor- en snuitvorm, veren, vinnen), opgebouwd uit vloeiende contouren (`vul`/`zacht` met genoeg punten) in 2–3 tinten van dezelfde kleur (rug donker, buik licht) plus een lichte randlijn. Geen stokpoten: elke poot heeft dikte, gewricht en voet/hoef/klauw.
3. **Houding**: in rust staat het gewicht verdeeld; poten raken de grond; een vogel op een tak heeft de tenen om de tak; een vis heeft een licht gebogen lijf.
4. **Controle**: alle objecten samen op een testvel, bekijken met Read (ook ingezoomd op aanhechtingen: oren, ogen, poten, vinnen, staart), verbeteren; reken op twee rondes.

## Techniek
- Werkmap /home/claude/evo2. Renderen: `python3 render.py <bestanden> <OBJECT> [sleutels]` (zie render.py; laadt lib.js, base.js, dier_basis.js, lib_cast.js, lib_bio.js, lib_evo.js, dan de bestanden in de f-parameter op volgorde).
- **Behoud de functienaam en de aanroepvorm** (parameters) van de bestaande functie, zodat alle keyframes vanzelf de nieuwe versie gebruiken. Schrijf je nieuwe versies in je EIGEN bestand (zie je opdracht); dat bestand wordt na de teken_evo-bestanden geladen en overschrijft de oude definitie. Lees eerst de oude functie (grep) en de keyframes die hem gebruiken (grep in src/sb*.js), zodat schaal en anker (x, y = midden onder het dier, kop naar rechts, kijk: -1 spiegelt) gelijk blijven.
- Testvel: `const TV_<naam> = { vel1(ctx){...}, ... }` in je eigen testvelbestand; render met bv. `python3 render.py teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,<jouwbestand>,<jouwtestvel> TV_<naam>`. Zet op het testvel oud en nieuw naast elkaar (oud = roep de oude functie aan vóór je bestand geladen is lukt niet; teken daarom een vel zonder en een vel met je bestand, of kopieer de oude onder een andere naam).
- Pas lib_evo.js, de teken_evo-bestanden en sb-bestanden NIET aan.

## Oplevering
- Je bestand(en) en testvel(len), plus `out/<…>/` renders.
- `lessen_<naam>.md`: per object wat je opzocht (met bron) en vooral: **wat maakte het verschil** tussen de oude en de nieuwe tekening (bv. 'eerst skelet als punten, dan omtrek', 'poten dikker bij de romp', 'hiel hoog bij hoefdieren', 'drie tinten'). Ook wat niet werkte. Dit is input voor de tekenregels in de volgende prompt.
- Meld in ≤10 regels wat je deed, welke objecten nog zwak zijn, en het pad van het testvel met oud/nieuw.

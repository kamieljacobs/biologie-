# Dierfamilie als uitknippop (23 okt 2026)

Kamiel keurde de wolfproef goed ("werkt goed zo") en wil alle dieren zo, budget ±4000 credits. Kamiel: "als het nog beter werkt als je per dier doet kan dat eventueel ook" → per familie één rig-code, maar ELK DIER krijgt eigen botlengtes, eigen delen en eigen houdingen; wordt een dier daar slechter van (bv. pauw of reiger past niet in de zangvogel-rig), maak het een eigen pop.

## Lees eerst
- `/home/claude/evo2/WOLFPOP.md` (opdracht wolfproef) en vooral `/home/claude/evo2/lessen_pop.md` (stappenrecept, wat het verschil maakte, gangmodel).
- `/home/claude/evo2/src/wolf_pop.js` als voorbeeld van rig, zachte huid, tekenvolgorde, IK, gangmodel, wrapper. Hergebruik code (kopieer naar je eigen bestand en generaliseer); verander wolf_pop.js NIET (een andere helper werkt daar nog aan).
- Part C-stijl: `/home/claude/evo2/TEKENRONDE.md`; `/home/claude/biologie-/films/BEELDAFSPRAKEN.md`.
- De referentieplaten van je familie (bekijk met Read, crop/zoom met PIL). Oude platen in `/home/claude/evo2/referentie/*.webp`, nieuwe in `/home/claude/evo2/referentie/pop/<familie>/`.

## Werkwijze per dier (verplicht)
1. Gewrichtspunten op de realistische platen → botlengtes; **kruiscontrole met tekstbronnen** (WebSearch: skeletmaten, schofthoogte/lengte, verhoudingen); bij strijd wint de tekstbron (de wolfplaat had een te lange onderarm). Noteer maten + bron in je lessenbestand.
2. Delen tekenen naar de vlakke stijlplaat (3 tonen, kleurwaarden daaruit), als vectorpaden; geen raster, geen fotopixels. Eén lichte silhouetrand in twee passes.
3. Houdingen als bothoek-tabellen uit de platen; gangmodel uit de literatuur (stapvolgorde, duty factor) met de fasenplaat als controle, steunvoet glijdt niet.
4. **Wrapper**: de bestaande functie (zelfde naam en aanroepvorm als in dieren_zoog.js / dieren_overig.js, met dezelfde maat en anker op het scherm; grep de aanroepen in src/sb*.js en teken_evo*.js) tekent voortaan de pop, met alle `o.houding`-waarden die de scènes gebruiken.
5. Testvel `src/tv_pop_<familie>.js` (`const TV_pop_<familie>`): overlay op de referentie-omtrek per houding, uit-elkaar, strip van elke gang met steunlijnen, en de scènes uit de storyboards waarin de dieren voorkomen (render ze met je bestand erbij geladen). Bekijk alles met Read, ook ingezoomd (schouder, heup, poten, vinnen, vleugel). Reken op 2–3 correctierondes.
6. Per familie een mp4 (1280×720, 24 fps, ±10 s) waarin de dieren hun bewegingen laten zien, + gif 640 breed, in `out/pop/<familie>/` (zie `/home/claude/evo2/referentie/wolfpop/render_film.py`).

## Render
`cd /home/claude/evo2 && python3 render.py teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,dieren_zoog,dieren_overig,micro_evo,<jouw_pop>,<jouw_tv> TV_pop_<familie>`
Pas lib-bestanden, teken_evo*, sb*, dieren_zoog.js, dieren_overig.js en wolf_pop.js NIET aan; jouw bestand wordt erna geladen en overschrijft de functies.

## Oplevering
`src/pop_<familie>.js`, testvel, renders, mp4/gif, en `lessen_pop_<familie>.md` (wat per dier anders was dan bij de wolf, wat de platen goed/fout hadden, welke regel algemeen geldt). Meld in ≤12 regels, met welke dieren nog zwak zijn.

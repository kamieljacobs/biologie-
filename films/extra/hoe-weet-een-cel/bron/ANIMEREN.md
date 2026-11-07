# Brief animator — 'Hoe weet een cel wat hij moet worden?'

Werkmap: /home/claude/werk/dif (verder: WM). De stem is ingesproken; elke alinea (sNN) heeft woordtijden in WM/film/words/sNN.json. Jij maakt van de stilstaande keyframes uit het storyboard bewegende scènes die met de stem meelopen.

## Wat er al is
- `WM/film/segments.json`: per alinea de tekst (`display`). `WM/film/script_v2.md`: het script. Vragen (qNN) en titel/eindkaart tekent de speler zelf.
- `WM/film/kaart.json`: per alinea de keyframe(s) uit het storyboard (w01…w61).
- `WM/kf/sbw1.js … sbw4.js` (objecten `SBW1…SBW4`) = de goedgekeurde keyframes (Kamiel keurde ze op 31 okt 2026); `WM/kf/lib_dif.js` = gedeelde objecten (landschap van Waddington, onzeCel, antwoordTegels, KB-kiembladkleuren). Bekijk de keyframes als beeld: /home/claude/biologie-/films/extra/hoe-weet-een-cel/bron/storyboard/blad/img/<wid>.webp. Script en storyboardtekst: …/bron/storyboard/film.json (velden `tekst` en `beweging`).
- `WM/film/scenes_basis.js` laat nu per alinea het keyframe stil zien. Jouw bestand overschrijft die functies.
- Engine-API: `WM/eng/scenes_kop.js` (tag, regel, pijl, ramp/ease/lerp, UIT, naamBij, zoomCircle, bg…) en `WM/eng/lib.js` (C-palet, text, fTitel, fTekst, metaText, roundRect, shape, rgba, circ). Bij gebruik van castpersonages: `persoon(ctx, id, x, voetY, h, {uit, pose, kijk, t})` uit `WM/eng/lib_cast.js`. Voorbeeld van een goedgekeurde film in deze straat: `WM/eng/scenes_z9.js` (kijk naar s01, s02, s05 voor de stijl van cues).

## Opdracht
Schrijf `WM/film/scenes_d<N>.js` met `Object.assign(SCENES, { sNN(ctx, t, q) { … }, … });` voor precies jouw alinea's (zie je opdracht). `t` = seconden in de alinea, `q.on('woord', n=1, duur=0.6)` geeft 0→1 vanaf het n-de woord dat 'woord' bevat (substring, hoofdletterongevoelig: pas op dat 'cel' ook 'cellen' matcht), `q.at('woord', n)` = tijdstip.
- Begin elke scène met `bg(ctx, 'micro'|'schema'|'macro')` volgens de look van het keyframe.
- Hergebruik de tekenfuncties uit de keyframes (`_w<N>…` in jouw sbw-bestand, en lib_dif.js); je mag ze in jouw scenes-bestand kopiëren en aanpassen met een parameter voor de animatie (voorvoegsel `_d<N>` voor nieuwe functies). Wijzig kf/ en lib_dif.js NIET.
- **Wat de stem noemt, beweegt of licht op op dat woord**; de rest staat stil of beweegt rustig. Laat processen echt gebeuren (de knikker rolt het dal in, de plaat rolt op tot buis, signaalstipjes verspreiden, de vleugel groeit, de vlek waaiert uit, de kern valt uiteen), geen diashow. Doorlopende beweging binnen een hoofdstuk: de laatste stand van de ene alinea is de beginstand van de volgende (geen sprongen tussen alinea's die hetzelfde beeld tonen).
- Een alinea met twee keyframes: overgang op het passende woord (zacht overvloeien of meebewegen), niet halverwege de tijd.
- Laat `difTag(...)` weg (de speler zet zelf een kop linksboven); `difLabel` (MODEL, VEREENVOUDIGD …) rechtsboven mag blijven.
- **Niets onder y = 880** (daar staan de ondertitels), ook geen labels.
- Na een vraag (q05, q16, q27, q44, q53, q63, q73, q82) begint de volgende alinea met het antwoord: zet in beeld GEEN tekst als 'antwoord b' (bij Vragen uit moet het beeld zonder vraag kloppen). Het juiste antwoord mag inhoudelijk in beeld verschijnen.
- Regels Part C en BEELDAFSPRAKEN (kort): geen verloop, gloed of korrel; max. 3 betekeniskleuren + goud; labels ≥ 36 px, meta ≥ 26 px; namen direct bij het onderdeel, geen wijslijnen; cellen rond, niets buiten het membraan; eiwitten als kralenketens; mensen alleen als castpersonage.

## Bouwen en kijken
```
bash WM/bouw.sh                                   # bouwt alle scènes (ook die van de andere animators)
cd WM && python3 eng/cuecheck.py film film/scenes_d<N>.js   # cues die niet in de woorden voorkomen
cd WM && python3 eng/stills.py film film/qa_d<N> s29:2 s29:8 …   # stills op tijdstip (id:t)
```
Maak een contactvel van je stills (PIL, 2–3 kolommen, klein) en bekijk het met Read. Controleer per alinea minstens begin, midden en eind. Herstel en bouw opnieuw (max. 3 rondes). Werk alleen in jouw scenes_d<N>.js en jouw qa_d<N>-map; een bouwfout in andermans bestand: meld het, niet oplossen. Publiceer en push niets.

**Klaar**: eindbericht ≤ 8 regels: welke alinea's, wat nog zwak is, en de uitvoer van cuecheck.

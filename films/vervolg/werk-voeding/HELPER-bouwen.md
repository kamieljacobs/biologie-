# Brief bouwer — Voeding en diëtetiek (26 okt 2026)

Je bouwt één film in de FILMDATA-straat, vóór de stem er is (geschatte woordtijden). Werkmap: `/home/claude/hw/<d>` (`vd1` of `vd2`, zie je opdracht). Slug en titel: zie `<d>/brief.md`. Je werkt op het sterkste model: het beeld moet echt goed zijn.

## Lees eerst (in deze volgorde, alleen wat nodig is)
1. `/home/claude/hw/BOUWEN.md` (API, bouwen en kijken).
2. `/home/claude/biologie-/films/BEELDAFSPRAKEN.md` (bindend) en uit `/home/claude/biologie-/films/PROMPT_v10.md` Part C (vanaf regel 386; C8 beweging, C10 tekenkwaliteit).
3. `/home/claude/biologie-/films/vervolg/REEKS-voeding.md` (bindend: cast, **toonregels bij gewicht**, kleuren, begrippen).
4. `<d>/script_v2.md`: het script. De `[Schema: …]`-regel achter elke kop is je storyboard; `<d>/segments.json` is de opdeling (ids). Lees ook `## Keuzes` en `## Twijfels` onderaan.
5. Twee goedgekeurde voorbeelden van werkende films: `/home/claude/hw/l1/` (Waar blijft je vet?: `film.py`, `sections.html`, `teken_l1.js`, `scenes_l1.js`) en `/home/claude/hw/lb3/` (Fokken, de nieuwste). Neem hun opbouw en hun helpers (`antwoord()`, `metaA`, `tag`, `chip`, `regel`, `naamBij`, `zoomCircle`, `persoon`) over.
6. De gedeelde reeksbibliotheek `/home/claude/hw/vd/teken_vd.js` (voedsel-iconen `eten()`, `schijf()`, `tafel()`, `eetdagboek()`, `telefoonFoto()`, `balkPaar()`, `glasZwaarWater()`, `meetlint()`, `weekbord()`, `gewoonteCurve()`, `riem()`, `energieBalans()`, `bmiBalk()`, `gewichtCurve()`, `telpoppetjes()`, `hormoonPuntjes()`, `maagGhreline()`, `vetcelLeptine()`, `hersenenHth()`) en de keyframes van de goedgekeurde twijfelscènes in `/home/claude/hw/vd/testvel/kf_twijfel.js` (hoe Kamiel ze zag: daar moeten de scènes op lijken). **Wijzig `teken_vd.js` niet** (de andere bouwer gebruikt hem tegelijk): wat je extra nodig hebt of wilt verbeteren, zet je in je eigen `<d>/teken_<d>.js` (een functie met dezelfde naam daar mag de gedeelde overschrijven, want hij komt later in de bundel).

## Keuring Kamiel (26 okt 2026, geldt voor de beelden)
Hanneke = castboek `hanneke` (krullen, groen vest); Joost = `joost` met `outfit: 'spreekuur'`; Noor loopt mee; de foto op Joosts telefoon toont castboek **Fleur** bij haar fiets (`telefoonFoto(…, {kind:'fleur'})`); Schijf van Vijf als eigen schema zonder logo of nummers; riem als haak; Dennis (`outfit: 'sport'`) en Erik als de twee volwassenen met index 26; Erik is de buurman van Joost; hersenen als `hersenenHth()` in een zoomcirkel náást Joost, nooit over een gezicht (Kamiel: 'geldt voor alle films').
**Decor**: het ElevenLabs-decor van de praktijk komt later (credits op). Schrijf voor scènes die in de praktijk spelen een functie `praktijkDecor(ctx, a)` die nu niets tekent (navy blijft) en één regel commentaar: 'decor praktijk volgt'. Zet de mensen en de tafel zo dat een decor er later achter past (vloerlijn ± 80 % van de hoogte, tafel vóór de zittende personen, zie keyframe k2).

## Bouwen
- Werkmap opbouwen zoals l1/lb3: `<d>/film.py` (+ `film.json`), `<d>/sections.html`, `<d>/teken_<d>.js`, `<d>/scenes_<d>.js`. `<d>/lib_cast.js` (actueel castboek) staat er al; `<d>/words/` heeft geschatte woordtijden (fakewords) zodat je kunt bouwen en cues zetten. Ook vragen (`qNN`), titel (`title`) en eindkaart volgen het voorbeeld.
- Bundel en bouw (vanuit `/home/claude/hw`):
  ```
  { sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js vd/teken_vd.js <d>/teken_<d>.js <d>/scenes_<d>.js; } > <d>/scenes.js
  (cd <d> && python3 film.py) && python3 engine/build_data.py <d> && python3 engine/build.py <d>
  ```
  Zet dit in `<d>/bouw.sh`.
- `film.py`: slug `voedingsleer-1-bij-de-dietist` of `voedingsleer-2-waarom-afvallen-zo-moeilijk-is`, hoofdstuk `vervolg`, seriesline 'Biologie bij Kamiel · Wat word jij? · Voeding en diëtetiek', vragen met `correct` volgens het script, explain in eigen woorden, 8–9 begrippen (definities uit de reeksbrief waar die er zijn), minis per hoofdstuk, endHaak, footer met de personages. `sections.html`: checkvragen met antwoord en punten (examenstijl, 3–5), docentdeel met Plaats, Hoe de film het uitlegt, **Getallen en bronnen** (tabel uit `<d>/getallen.md`, alleen ✓/≈, met bronnummer), Vereenvoudigingen, Lessuggesties; geen verwijzing naar tools of 'probeer het zelf'.
- Elke spraakalinea (`sNN`) een scène; wat de stem noemt, staat in beeld op dat woord (`q.on('woord', n)`); het beeld van een alinea staat er op t = 0; geen antwoord in beeld vóór 'Antwoord x'; antwoordlabel als `antwoord a: <inhoud>` (BEELDAFSPRAKEN); labels ≥ 60 px van de rand, niets onder y ≈ 880; geen wijslijnen; één tekstbalk tegelijk.
- Controle: `python3 engine/cuecheck.py <d> <d>/scenes_<d>.js` (en zo mogelijk `python3 /home/claude/biologie-/films/voortplanting/celdeling/bron/bouw/cuecheck3.py` — kijk zelf hoe hij aangeroepen wordt) en een contactsheet: `python3 engine/stills.py <d> <d>/qa contact` + `python3 engine/sheet.py <d>/qa /tmp/claude-0/-home-claude/1015c722-b5d8-5d82-8ca3-9d9b83ee8acf/scratchpad/sheet_<d>.png 4`; bekijk hem met Read, herstel overlap, tekst buiten beeld, lege schermen en beeld dat niet past bij de zin; nog één keer bouwen en kijken. Gebruik unieke bestandsnamen in de scratchpad (`_<d>`).
- Toon: Joost nooit karikaturaal, geen getal bij zijn gewicht, geen weegschaal met getal, geen etende close-ups; telpoppetjes alleen in tellingen.

## Niet doen
Niets publiceren, niets in de repo zetten, niet pushen, niets inspreken, `vd/teken_vd.js` en `engine/` niet wijzigen (fouten in de engine: meld ze).

## Lever
Antwoord met: pad van de gebouwde HTML, aantal scènes, wat je in `teken_<d>.js` nieuw tekende, wat je bewust anders deed dan het Schema, en wat nog niet goed is (eerlijk). Max 15 regels.

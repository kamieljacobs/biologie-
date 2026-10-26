# Brief bouwer — Gezondheidswetenschappen 1: Hoe een epidemie groeit en stopt (26 okt 2026)

Je bouwt één film in de FILMDATA-straat. Werkmap: `/home/claude/hw/gz1`. Slug `gezondheidswetenschappen-1-hoe-een-epidemie-groeit`, titel 'Hoe een epidemie groeit en stopt'. De stem wordt tegelijk ingesproken door een andere helper; bouw eerst op geschatte woordtijden (`python3 engine/fakewords.py gz1`, overschrijft echte woordtijden niet). Je werkt op het sterkste model: het beeld moet echt goed zijn.

## Lees eerst (alleen wat nodig is)
1. `/home/claude/hw/BOUWEN.md` (API, bouwen en kijken).
2. `/home/claude/biologie-/films/BEELDAFSPRAKEN.md` (bindend) en uit `/home/claude/biologie-/films/PROMPT_v10.md` Part C (vanaf ± regel 386; C8 beweging, C10 tekenkwaliteit).
3. `/home/claude/biologie-/films/vervolg/REEKS-gezondheid.md` (bindend: cast, toon bij corona, seriekleuren koraal = besmettelijk, teal = vatbaar, groen = immuun/hersteld, oker = maatregel, goud = focus, paars = virus).
4. `gz1/script_v2.md`: het script. De `[Schema: …]`-regel achter elke kop is je storyboard; `gz1/segments.json` is de opdeling (ids). Lees ook `## Keuzes` en `## Twijfels`.
5. Twee goedgekeurde voorbeelden: `/home/claude/hw/l1/` en `/home/claude/hw/lb3/` (Fokken, de nieuwste: daar zie je ook hoe een ElevenLabs-decor wordt ingeladen, `scenes_lb3.js` regels 1–20, en hoe `bouw.sh` er uitziet: `/home/claude/biologie-/films/vervolg/landbouw-3-fokken/bron/bouw/bouw.sh`). Neem hun opbouw en helpers over (`antwoord()`, `metaA`, `tag`, `chip`, `regel`, `naamBij`, `zoomCircle`, `persoon`).
6. De goedgekeurde keyframes: `/home/claude/hw/gz/kf_gz.js` (gerenderd in `/home/claude/hw/gz/kf/*.png`): cast, herinnering, dossier, drempel. De scènes moeten daarop lijken; neem `blokje()` en `sirRun()` over en verbeter waar nodig.

## Keuring Kamiel (26 okt 2026)
- Cast: Yasmin (stagiair) en **Epidemioloog Farid = castboek `farid`** (voorstel B: bordeauxrode trui, baard). `gz1/lib_cast.js` is het actuele castboek met Farid erin.
- Herinnering maart 2020: huidige Yasmin en Bilal aan de keukentafel in een sepia herinneringskader (keyframe `herinnering`), akkoord.
- Oefendossier met ronde getallen, akkoord. Echte getallen uit 2020 altijd op een apart kaartje met bron en jaar, nooit in het dossier zelf.
- Doorschieten blijft (Kamiel: Wat word jij? is extra stof voor gemotiveerde leerlingen). Modelcurve uit een echte SIR-berekening (`sirRun`), label 'VANAF HIER MINDER NIEUWE ZIEKEN' bij het kruispunt met de drempel, balk 'OOIT BESMET', eindstand ± 94 %.
- **Decor** GGD-kantoor: `gz1/decor_gz1.js` (DECOR_SRC.ggd, 1920×1080, groot leeg scherm in het midden boven, bureaus links en rechts, vloer onder ± 75 %). Op ± 60 % sterkte over het navy, alleen onder scènes in het kantoor (cold open, begin H1, begin H4, recap). Op het scherm in het decor mag het dossier verschijnen voordat de camera 'inzoomt' naar navy.

## Bouwen
- Werkmap zoals l1/lb3: `gz1/film.py` (+ `film.json`), `gz1/sections.html`, `gz1/teken_gz1.js`, `gz1/scenes_gz1.js`, `gz1/bouw.sh` (zoals lb3 maar met `gz1/decor_gz1.js` en zonder evo/hoefpop).
- `film.py`: slug zie boven, hoofdstuk `vervolg`, seriesline 'Biologie bij Kamiel · Wat word jij? · Gezondheidswetenschappen', vragen met `correct` volgens het script (b c a c b a), explain in eigen woorden, 8–9 begrippen (definities uit de reeksbrief: epidemiologie, reproductiegetal R, R₀, groepsimmuniteit; verder exponentiële groei, verdubbeltijd, vatbaar, model/scenario, bron- en contactonderzoek), minis per hoofdstuk, endHaak, footer met de personages. `sections.html`: checkvragen met antwoord en punten (examenstijl, 3–5), docentdeel met Plaats, Hoe de film het uitlegt, **Getallen en bronnen** (tabel uit `gz1/bronnen.md` en `gz1/getallen.md`, alleen ✓/≈, met bronnummer en URL), Vereenvoudigingen (o.a. SIR-model met willekeurige menging; het RIVM rekende R terug uit ziekenhuisopnames, niet uit getelde pijlen), Lessuggesties; geen verwijzing naar tools of 'probeer het zelf'.
- Elke spraakalinea (`sNN`) een scène; wat de stem noemt, staat in beeld op dat woord (`q.on('woord', n)`; let op substring-valkuilen); het beeld van een alinea staat er op t = 0; geen antwoord in beeld vóór 'Antwoord x'; antwoordlabel zoals in l1/lb3; labels ≥ 60 px van de rand, niets onder y ≈ 880; geen wijslijnen; één tekstbalk tegelijk; faden personen snel in. Het dossier groeit door de film heen: hergebruik één functie `dossier(ctx, staat)` met lagen (blokjes, pijlen, tijdas, ic-lijn 'WAT DE ZORG AANKAN' zonder getal, groene balk met gouden drempel, model met drie bakken en knop).
- Grafieken met eerlijke assen; modelcurve label 'MODEL'; echte data met bron en jaar.
- Controle: `python3 engine/cuecheck.py gz1 gz1/scenes_gz1.js` en een contactsheet: `python3 engine/stills.py gz1 gz1/qa contact` + `python3 engine/sheet.py gz1/qa /tmp/claude-0/-home-claude/eb539ceb-0c07-5d5b-9a7f-9c59c42055a9/scratchpad/sheet_gz1.png 4`; bekijk hem met Read, herstel overlap, tekst buiten beeld, lege schermen en beeld dat niet past bij de zin; nog één keer bouwen en kijken.

## Niet doen
Niets publiceren, niets in de repo zetten, niet pushen, niets inspreken, `engine/` niet wijzigen (fouten in de engine: meld ze), niet aan `gz1/audio`, `gz1/raw`, `gz1/stem` komen.

## Lever
Antwoord met: pad van de gebouwde HTML, aantal scènes, wat je in `teken_gz1.js` tekende, wat je bewust anders deed dan het Schema, en wat nog niet goed is (eerlijk). Max 15 regels.

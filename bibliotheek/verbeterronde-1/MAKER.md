# Brief: beeldbank verbeteren — varianten maken (maker)

Kamiel (biologiedocent) bouwt animatiefilms met een gedeelde tekenbibliotheek, de 'beeldbank'. Frisse beoordelaars hebben elk object gescoord en een verbetervoorstel gedaan. Kamiel zei: "doe al je voorstellen maar gewoon", maar: de oude beelden blijven bewaard, een blinde beoordelaar vergelijkt oud en nieuw, en Kamiel kiest zelf het laatste oordeel tussen alle opties. Jij maakt de varianten. **Je wijzigt niets in de repo.**

## Lezen (kort, gericht)
Repo: `/home/claude/biologie-`. Lees: `films/BEELDAFSPRAKEN.md` (bindend), in `films/PROMPT_v13.md` Part C vooral C1, C2, C9 en C10 (zoek op '### C'), `bibliotheek/README.md` (+ `bibliotheek/dieren/README.md` bij dieren), en het receptcommentaar boven elke functie die je aanpakt in `bibliotheek/lib_bio.js` of `bibliotheek/dieren/lib_*.js`. Hoe de testvellen de bibliotheek laden: `bibliotheek/testvel.html` en `bibliotheek/dieren/testvel.html` (scripttags, hulpjes uit lib.js zoals C, rgba, lighten, hash, clamp, lerp, ease, shape, bioPad).
Oordeel per bestaand object (scores, zwak, voorstel): `/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/blad/data.json` (veld `slug`, `id`, `voorstel`, `zwak`); oude uitsnede: `blad/img/<slug>.webp`. Ontbrekende objecten: `.../beeldbank/n1/behoefte.json` (velden `id`, `kan`, `basis` = bestaande losse versie in een film die je als start kunt nemen).

## Wat je maakt (in je werkmap `.../beeldbank/ronde/<groep>/`, die je zelf aanmaakt)
Per object een map `<obj>/` met:
- `A.js` en (bij een nieuw object of een object met prioriteit hoog) `B.js`: elk de **volledige** functie(s) van het object met het receptcommentaar erboven, klaar om in de bibliotheek te plakken. Zelfde naam en zelfde aanroep als nu (nieuwe opties mogen erbij, maar oude aanroepen moeten blijven werken; zoek met grep waar de functie in `bibliotheek/` gebruikt wordt). Nieuwe objecten: naam uit behoefte.json, aanroep in de stijl van de bibliotheek (`naam(ctx, x, y, s, o = {})`, opties `a`, `t`, standen; geeft ankerpunten terug voor namen).
  A en B zijn **echt verschillende aanpakken** (bv. andere vorm/opbouw/detailniveau/animatie), geen kleurvariant. Een klein voorstel (één fout herstellen) = alleen A.
- `X.png`, `Y.png`, (`Z.png`): stills voor de blinde beoordelaar, 1280×720, zelfde uitsnede en schaal voor alle opties. Per still: het object groot (± 60 % van de hoogte), klein rechtsonder (± 80 px hoog, zoals in een film), en waar het object beweegt 2–3 standen naast elkaar. Achtergrond `C.bgSchema` (donker), geen namen of tekst die verraden welke versie het is.
  Bij een bestaand object is één van X/Y/Z de **oude versie** (render met de ongewijzigde bibliotheek; laad je variant gewoon ná lib_bio.js zodat jouw functie de oude overschrijft). Kies de verdeling over X/Y/Z met `python3 -c "import random;..."` en schrijf hem in `<obj>/sleutel.json` (`{"X":"oud","Y":"A","Z":"B"}`). Bij een nieuw object: X/Y = A/B.
- `recept.md`: 3–6 regels wat het object moet laten zien (biologisch), voor de beoordelaar. Niets over welke versie wat is.
- `bron.md`: de bronnen die je **zelf geopend** hebt (WebFetch/WebSearch; niveau A zoals OpenStax, leerboek, review, universiteit; zie `films/BRONNEN.md`) en de beweringen over vorm/verhouding die je erop baseert.

Renderen: serveer de repo met `python3 -m http.server <vrije poort>` **in dezelfde opdracht** als je Playwright-script (losse achtergrondprocessen worden gestopt). Chromium: `require('playwright')` of Python `playwright`, geen installatie nodig. Maak een eigen testpagina in je werkmap (niet in de repo) die lib.js (zoals testvel.html), lib_cast.js waar nodig, `bibliotheek/lib_bio.js`, en dan jouw variant laadt. Geen JS-fouten in de console. Bekijk je eigen stills op lage resolutie en verbeter tot ze goed zijn; kijk ook klein.

## Eisen aan elke variant
BEELDAFSPRAKEN en Part C: geen korrel; eiwitten als keten die vouwt; mRNA dun en sliertig; membranen gebogen, cel rond; niets steekt buiten het celmembraan; organen op hun echte plek; realistische verhoudingen; castpersonages i.p.v. poppetjes; labels ≥ 60 px van de rand (als je ankerpunten teruggeeft); kleuren uit het bestaande palet (C, BIO) tenzij het object een eigen vaste kleur heeft. Schaalt netjes (detail mag weg bij klein).

## Referentiebeeld (spaarzaam)
Alleen voor een nieuw object waarvan de vorm moeilijk is (orgaan, plant, celonderdeel) mag je **één** referentieplaat laten maken in ElevenLabs (`mcp__ElevenLabs__creative_generate_image`, model `gpt-image-2.5-sunburst`, `generations_count: 1`, ±190 credits; laad de tools met ToolSearch; poll `creative_get_flow_run_status`; download met curl). Prompt: wetenschappelijke leerboekplaat, donker navy, fijne lijnen, geen tekst. Nooit opnieuw genereren als het mislukt. Een referentie is geen bron: check vorm en verhouding tegen je bronnen. Noteer flow-url en pad in `bron.md`; bewaar het beeld in `<obj>/referentie.png`. Al gemaakt (gebruik deze): dierlijke cel `.../scratchpad/organel/cel.png`.

## Klaar
Schrijf `.../ronde/<groep>/OVERZICHT.md`: per object één regel (obj, nieuw/bestaand, A: aanpak, B: aanpak, wat je bewust níet deed). Eindbericht ≤ 200 woorden: aantal objecten, varianten, wat niet lukte. Werk ±90 minuten; lukt niet alles, lever wat af is (een object zonder stills telt niet).

# Brief bouw fase A: scènes en storyboard vóór het inspreken (prompt v10 B6–B7, C)

Doel: de echte scènes van de film bouwen op voorlopige woordtijden, zodat er een storyboard met keyframes ligt. Kamiel keurt alleen de **twijfelscènes**; daarna pas inspreken (dat doe jij niet). Niets in de repo wijzigen, niet pushen, niets publiceren, geen ElevenLabs-generaties.

## Lees eerst
- `/home/claude/hw/engine/` = de engine (van Biotechnologie 2, met het castvoorstel Ecoloog Bas en de outfit `veld` voor Daan en Bas). Lees `/home/claude/biologie-/films/vervolg/BOUWEN.md` helemaal (API, cues, bouwen, kijken).
- Prompt Part C (Schema, Micro, UI-laag, C8 beweging, C9 tekenrecepten, C10 tekenkwaliteit): `/home/claude/biologie-/films/PROMPT_v10.md` vanaf '## Part C' tot '## Part D', en `films/PROMPT_v10_C10_tekenkwaliteit.md`. `films/BEELDAFSPRAKEN.md` gaat voor alles.
- Voorbeeld van een complete fase A + bouw: `/home/claude/biologie-/films/vervolg/forensisch-1-sporen/bron/` (`brief.md` sectie 'Bouw fase A', `storyboard.md`, `src/teken_fo1.js`, `src/scenes_fo1.js`, `film.py`, `sections.html`).
- Je eigen werkmap: `brief.md`, `script_v2.md` (definitief, niet meer wijzigen), `getallen.md`, `bronnen.md`. Reeksbrief: `/home/claude/biologie-/films/vervolg/REEKS-ecologie.md`.
- Cast: `/home/claude/hw/engine/lib_cast.js` (en castboek `personages/index.html`); `personages/ROLLEN.md`. Bibliotheek: `/home/claude/hw/engine/lib_bio.js`, `bibliotheek/README.md`.

## Stappen
1. `script_opname.md` = `script_v2.md` tot vóór de beeldnotities (zie Forensisch-voorbeeld), in de vorm die `engine/make_segments.py` verwacht; `python3 engine/make_segments.py <d> script_opname.md`; controleer aantal alinea's, vragen en woorden. Pas uitspraakregels toe zoals BOUWEN.md zegt (`films/uitspraak.json`, eigen `uitspraak_film.json`); de stem-invoer staat in segments.json.
2. `python3 engine/fakewords.py <d>` (voorlopige woordtijden).
3. `film.py` en `sections.html` naar het voorbeeld (titel, vragen met juiste index, glossary met de reeksbegrippen, checkvragen, docentdeel met getallen en bronnen uit getallen.md).
4. `teken_<d>.js` (eigen tekeningen) en `scenes_<d>.js` (één functie per gesproken alinea). Hergebruik lib_bio en lib_cast; nieuwe objecten netjes en herbruikbaar. Reeksobjecten staan in één gedeeld bestand `/home/claude/hw/ec_reeks.js` (kaart van het gebied `gebiedKaart(ctx, x, y, w, h, o)` met heide, ven, bos, snelweg met ecoduct, akker, stal; en andere objecten die in meer films terugkomen, zoals heideplant, wolf in de stijl van *Plek genoeg?*, telformulier). Bestaat het bestand nog niet, maak het dan aan; bestaat het wel, gebruik en breid het uit zonder bestaande functies te veranderen (een andere helper bouwt tegelijk een andere film). Plak het in de bouw na lib_bio.js en vóór je eigen teken-bestand. Daan draagt outfit `veld`, Ecoloog Bas (`bas`) is een voorstel: zet hem in beeld zoals hij in lib_cast staat; de twijfelkaart over hem maakt de hoofdsessie.
5. Bouwen en kijken zoals in BOUWEN.md ('Bouwen en kijken'), contactsheet in de scratchpad met unieke naam (`sheet_<d>.png`), herstellen tot er geen overlap, tekst buiten beeld, lege schermen of pop-ins meer zijn. Draai `engine/cuecheck.py`.
6. `storyboard.md` naar het voorbeeld: per alinea id, hoofdstuk, look, wat in beeld / wat beweegt. Keyframe per scène als webp (± 960 px breed) in `<d>/blad/img/<id>.webp`.
7. Beoordeel je eigen storyboard streng tegen Part B/C en BEELDAFSPRAKEN. Schrijf `<d>/blad/twijfels.json`: lijst van **alleen** de twijfelscènes (B7: nieuw personage of nieuwe rol, nieuwe tekening die de bibliotheek in gaat, iets gevoeligs, afwijking van brief/plan, feit zonder bron, pose die de cast niet goed kan, en elk `!`-voorstel uit brief.md dat Kamiel moet goedkeuren): `[{"id", "titel", "zin" (de gesproken zin), "img" ("blad/img/<id>.webp"), "twijfel", "waarom", "voorstel"?}]`. 'Twijfel' en 'Waarom' zijn elk één korte regel.
8. Werk `brief.md` bij met een sectie 'Bouw fase A' (zoals het voorbeeld).

Eindbericht ≤ 10 regels: aantal alinea's/vragen/woorden, geschatte duur, aantal twijfelscènes met elk één regel, nieuwe tekeningen.

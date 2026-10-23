# Overdracht Evolutie v2 — stand 23 okt 2026 (avond)

Voor een nieuwe chat. Lees eerst CLAUDE.md, films/BEELDAFSPRAKEN.md, films/WERKWIJZE-LESSEN.md en dit bestand. Alles wat je nodig hebt staat in deze map (`films/evolutie/storyboards-v2/`); de werkmap `/home/claude/evo2` van de vorige chat bestaat niet meer.

## Opnieuw opzetten
```
mkdir -p ~/evo2 && cp -r films/evolutie/storyboards-v2/* ~/evo2/ && cd ~/evo2
# keyframes renderen (Playwright-Chromium is voorgeïnstalleerd):
python3 render.py teken_evo1,…,teken_evo8,sb<N>,dieren_zoog,dieren_overig,micro_evo,wolf_pop,pop_honden,pop_katten,pop_hoef,pop_vogels,pop_zwemmers,pop_rept_chimp SB<N>
# film 2 en 3: voeg vragen23 vóór sb2/sb3 toe. Uitvoer: out/<bestanden>/<sleutel>.webp
```
De pop-bestanden staan in `src/` (ook een kopie per familie in `pop/<familie>/` met testvel, film en lessen). Ze worden NA dieren_*.js geladen en overschrijven de oude functies met dezelfde naam en aanroep. In `src/sb8.js` is de oude `chimp` hernoemd naar `chimpOud`.

## Waar staan we
1. **Storyboards** van alle 8 films (269 scènes) staan in `films/f1..f8.json` (leidend) en `src/sb1..8.js` (één keyframe per scène). Keuringsblad: https://claude.ai/artifact/CZgCfj5Ad86TQ5ugddtL8s (db `keuring`; export in `keuring/`). Kamiel keurde **film 1–4**; **film 5–8 nog niet**.
2. **Tekenkwaliteit**: alle dieren zijn opnieuw gebouwd als **uitknippop** (botten + delen, houdingen uit ElevenLabs-referentieplaten, bewegingen uit de literatuur). Recept: `lessen_pop.md` (wolf) + `lessen_pop_<familie>.md`; opdrachtbrieven `WOLFPOP.md`, `POPFAMILIE.md`. Referentieplaten: `/referentie/dieren/` in de repo (zie `/referentie/README.md`). ElevenLabs-flow 3WeEwvHPP8DeFGIqhFPY, ±4000 credits gebruikt.
3. **Beeldbank** (keuring per dier): https://claude.ai/artifact/JPaaWUKkxGutS2LdU1kDsE (db `bank`, doc-id = `<dier>-pop`). Goedgekeurd: wolf, honden, zeehond, muis, alle vogels, alle zwemmers/oerwalvissen, chimpansee, hagedis, krokodil, jachtluipaard (geen opmerking; 'algemeen' aangevinkt zonder tekst, nog navragen), leeuw, paard, ezel, muilezel, edelhert, nijlpaard, micro (bacterie, plasmide, pilus, antibioticum, griepvirus, DNA, chromosoom, geslachtscel, sikkelcel), insecten, tak. **Ter keuring in de beeldbank (ronde 4, nog niet gekeurd)**: alle katachtigen (leeuw, tijger, jachtluipaard, huiskat) en paardachtigen (paard, ezel, muilezel) opnieuw opgebouwd naar een eigen plaat per dier (`referentie/dieren/katten/<dier>.webp`, `paarden/paard.webp`, `paarden/ezel-muilezel.webp`; boven realistisch, onder vlakke stijl). Werkwijze: staande figuur en kop vrijwel 1:1 overtrekken van de vlakke rij, botten volgen de plaat, delen binnen de romp bewegen met de romp (anders bolt de buik bij lopen). Koe ronde 3 (oog, kop, hals). Lees de db `bank` aan het begin (doc `<dier>-pop`).
4. **Logboek**: `films/logboek/fouten.jsonl` bijgewerkt t/m deze keuring; `python3 scripts/foutenpatronen.py`. Patroon: koppen/gezichten (5 van 8 opmerkingen) → regel 'per dier een kopplaat en kop-testvel'.

## Volgende stappen
1. Keuring van katachtigen, paardachtigen en koe lezen en verwerken (Kamiel vond tijger en huiskat al 'bijna goed').
2. **Integreren in de storyboards**: per scène de juiste houding (`o.houding`, `o.t`) volgens de tabellen in `lessen_*.md`; e4s03 `flagel:0.5`; e3s25 `orchideePlant`; e4s32 groene lijn en 'zelf proberen' weg (Kamiel: geen 'zelf proberen' tot de tools perfect zijn); cirkel 'oor met walvisbouw' in e7s13 op het oor (≈(140,−146)·s).
3. **Inhoudelijke opmerkingen film 1–4 verwerken** (in `films/f*.json` + keyframe): e2s27 mini-uitleg mutaties; e3s19 zeggen dat splitsende selectie eerder tot soorten leidt; e3s29 wapenwedloop (Darwin, Nilsson 1988; Wasserthal 1997 als alternatief); e2s01/02 blaadjes vast aan de plant; e2s04 opuntia mooier.
4. Alle keyframes opnieuw renderen, `bouw_blad.py` draaien en het keuringsblad opnieuw publiceren (zelfde artifact-URL) → Kamiel keurt film 5–8.
5. Promptvoorstel tekenkwaliteit (algemene methode + receptkaarten per categorie: dieren als pop, organen, micro, planten; wanneer een ElevenLabs-referentie mag en hoe je hem controleert: maat uit bron wint, nooit 'uit het geheugen'). Kamiel keurt goed vóór het de prompt in gaat. Daarna het dierenrecept als vaste bibliotheek (`bibliotheek/`) met status per dier.
6. Pas daarna: inspreken en bouwen volgens de prompt.

## Lessen die al vastliggen
- Werkt het best: per dier één plaat met boven het realistische dier en onder hetzelfde dier in vlakke stijl (staan, stap, eventueel draf/galop/grazen/liggen, kop). De vlakke rij is het doel: staande figuur en kop vrijwel 1:1 overnemen, skelet ijken op de realistische rij.
- Kamiel wil tussenstanden zien: stuur na elke tussenronde het nieuwste testvel (helpers op de achtergrond zijn voor hem onzichtbaar).
- Referentieplaten: realistisch modelblad (zelfde dier, zelfde schaal, zuiver zijaanzicht) + plaat in vlakke stijl + fasenplaat; bij kop-opmerkingen een kopplaat. 1 variant per plaat (±190 credits).
- Kleuren ontwerpen (3–4 rustige vlakken), nooit uit fotopixels (geeft 'camouflage').
- AI-platen hebben fouten (te lange rashonden, verkeerde galopvolgorde, krokodil te hoogpotig, onderarm wolf te lang): maten en bewegingen uit bronnen; bij strijd wint de bron.
- Grote bewegingen (grazen, gapen) testen in 6 tussenstanden; naden bij grote hoeken dichten met een meedraaiend tussendeel.
- Plasmiden/organellen blijven binnen het membraan.

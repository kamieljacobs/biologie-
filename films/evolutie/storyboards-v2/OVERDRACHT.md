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

## Stand ronde 2 storyboards (23 okt, avond)
Punten 2 en 3 hieronder zijn gedaan (zie `WIJZIGINGEN_r4.md`): alle dieren als pop met houding per scène, kleine fixes, inhoud film 1–4 (e2s27, e3s19, e3s29 met Nilsson 1988 bij *Platanthera*, e2s01/02, e2s04; e4s31 zin over Resistentielab geschrapt). Keuringsblad opnieuw gepubliceerd (versie 5) → **Kamiel keurt film 5–8** (en mag 1–4 opnieuw bekijken). 'Nilsson' staat op de uitspraakwachtlijst van f3. Volgende: zijn keuring lezen (db `keuring`, alleen documenten met t na 23 okt 20:40) en verwerken.

## Keuring 23 okt 21:30
**Alle 141 scènes van film 5–8 goedgekeurd** zonder opmerkingen (export in `keuring/`). **Alle dieren in de beeldbank goedgekeurd** (ook tijger, huiskat, jachtluipaard, koe; paard/ezel/muilezel/leeuw eerder). De storyboards van de hele reeks zijn daarmee klaar voor productie.

Volgende fase: (a) dierpoppen + recept naar de gedeelde bibliotheek (`bibliotheek/`, met testvel en status 'goedgekeurd'); (b) promptvoorstel tekenkwaliteit ter goedkeuring; (c) productie volgens de prompt: stem-invoer met uitspraaklijst (wachtlijst-woorden o.a. Nilsson, muil-eezel), inspreken (ElevenLabs, 1 take), bouwen in de FILMDATA-straat, bronmappen, Vragen-uit-controle, site-integratie.

## Volgende stappen (oud)
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

## Extra films 9–12 (24 okt 2026)
Kamiel wilde de extra films erbij en voegde een vierde toe: **Hoe werden we mens?**, met de neanderthaler als zwaartepunt ("de mens heeft er nog mee samengeleefd"). Storyboards (script + één keyframe per scène) van alle vier: `films/f9.json` De reis van Darwin (36 sc., 8,2 min), `f10.json` Het ontstaan van het leven (39, 8,3), `f11.json` Van eerste cel tot nu (36, 7,8; rode draad = de aarde als één dag van 24 uur), `f12.json` Hoe werden we mens? (40, 8,0). Opdracht aan de makers: `EXTRA_BRIEF.md`. Frisse review (58 punten, 21 fouten): `review_extra.md`, verwerkt. Op het keuringsblad als tabbladen 9–12 (versie 6). **Keuring 24 okt 10:00: film 10, 11 en 12 helemaal goedgekeurd, film 9 34/36 (e9s01 en e9s02, de cold open, nog zonder vinkje); geen opmerkingen** (export in `keuring/`).
Renderen: film 9 volgens `ref9/laadlijst.txt`; film 10 `micro_evo,teken_evo10,sb10 SB10`; film 11 `dieren_zoog,micro_evo,pop_rept_chimp,e11_aarde,teken_evo11,sb11 SB11`; film 12 `e12_land,pop_rept_chimp,teken_evo12,sb12 SB12`. Blad: `python3 bouw_blad.py` in een submap `blad/` (verwacht `sjabloon.html` naast zich).
Open punten voor Kamiel: dieren in film 9 (nandoes, schildpadden, Megatherium, Glyptodon, gordeldier, luiaard, spotlijster) zijn nog stilstaande tekeningen → eerst als uitknippop naar de beeldbank (platen in `referentie/dieren/darwin/`, ±380 credits); zesde massa-extinctie noemen in film 11?; begrafenis van Darwins zoontje in film 9 houden?; LUCA ('Loeka'), archaea en andere nieuwe woorden staan op de uitspraakwachtlijsten in de json's.

## Productie extra films 9–12 (24 okt 2026)
- Keuring: alle 12 storyboards goedgekeurd (ook e9s01/e9s02).
- Film 9-dieren als uitknippop: nandoe, gordeldier, zadel/koepelschildpad (`src/pop_darwin.js`, laadt ná teken_evo9; testvel `pop/darwin/`, lessen `bibliotheek/dieren/lessen/lessen_pop_darwin.md`, ±571 credits). **Ter keuring bij Kamiel.** Megatherium, Glyptodon, luiaard, spotlijster blijven stilstaand (bewegen niet in hun scènes).
- Promptvoorstel tekenkwaliteit (C10, prompt v10) als Claude doc https://claude.ai/artifact/S3P5sQcLVpbGufeScVyhoo — **wacht op Kamiels akkoord**; bouwen wacht daarop.
- Stem: ingesproken (Roos, eleven_v4, 1 take): film 9 35 alinea's (flow wnYVwSVVS1U670z6lRT0), 10: 38 (zmRbwjbcINPkr9YCy0c3), 11: 34 (IxeSZ6NCjVcAIiAFSdTa), 12: 39 (XAkbvXzb9HWYEAnNJTm2); ±23.000 credits. Audio, words, segments en sessions bewaard in `productie/werk/e<N>/` (kopiëren naar `~/hw/e<N>/` om te bouwen). In de stem-invoer van film 12 is "130 000" → "130.000" gezet (5 alinea's). Wachtlijst o.a. datums met dag ("1 juli", "24 november"), Loeka, Laa-etolie, Megatherium, Glyptodon.
- **Af en op de site (24 okt 2026, middag):** Kamiel keurde het promptvoorstel (C10 in prompt v10) en de poppen goed. Alle vier extra films gebouwd (`films/evolutie/x1-de-reis-van-darwin.html`, `x2-het-ontstaan-van-het-leven`, `x3-van-eerste-cel-tot-nu`, `x4-hoe-werden-we-mens`, elk met bronmap), frisse beeldreview (C10.7) door een aparte reviewer, MOET-punten hersteld, Vragen-uit gecontroleerd (script + speler), in `HOOFDSTUKKEN.extra.films` met `thema: 'evolutie'`, medaillons (vel `img/kunst/varianten/films/vel-evo2-extra.webp`, 16 reserves; flow lizbEUFgnecTgO0Ql3LJ). Status in REVIEW: nog bekijken.
- Film 12: kleding voor neanderthaler (omslag van huid, beenwindsels) en Homo sapiens (genaaide tuniek, broek) op Kamiels verzoek; Lucy en erectus zonder.
- Bouwen film 9: `python3 e9/bouw9.py` (niet evo_bouw.py: teken_evo9.js gebruikt VogelZang al bij het laden). Productiescripts kennen nu film 9–12 (vraagscènes `e10q..` werden eerst niet herkend door `s['id'][2]`; hersteld met een regex, stem bleef staan).
- Nog open: uitspraakwachtlijsten van 9–12 testen in de batch; T. rex (film 11) en de stilstaande Megatherium/Glyptodon/luiaard/spotlijster (film 9) zijn geen pop.

## Productie kernfilms 1–8 (23–24 okt 2026)
**Alle acht kernfilms zijn ingesproken, gebouwd en staan op de site** (`films/evolutie/<n>-<slug>.html`, elk met bronmap; themapagina Evolutie, `HOOFDSTUKKEN.evolutie.films`; status in `REVIEW` = nog bekijken). Werkwijze en scripts: `productie/` (README, `evo_script.py`, `evo_film.py`, `evo_bouw.py`, `evo_pak.py`, `BOUWEN_EVO.md`, `INSPREKEN.md`); dierenbibliotheek in `bibliotheek/dieren/`.
- Stem: Roos, eleven_v4, één take per alinea, 269 alinea's, ±45.800 credits; flows per film in `bron/stem/sessions.json`. Uitspraakwachtlijst per film in `bron/uitspraak.md` (o.a. Pingelap, founder-effect, Hardy-Weinberg, heterozygotenvoordeel, Linnaeus, zwartbuikzaadkraker, co-evolutie, ESBL): nog niet getest.
- Animatie per film door een helper vanuit de goedgekeurde keyframes; vraag-alinea's tonen de situatie (niet de vraagkaart). Frisse beeldreview van film 1–6 verwerkt (o.a. dag i.p.v. nacht bij het zonnige kozijn, tweeling op lengte, snavelverschillen zichtbaar, mops en baby op echte maat, µm-label, lege schermen). Review film 7–8 loopt.
- Filmmedaillons: vel `img/kunst/varianten/films/vel-evo2.webp` (vak 1–8 gebruikt; vak 9–18 = reserves: orchidee + pijlstaart, jachtluipaard, berkenspanners, wolf + chihuahua, cichliden, lagen + ammoniet, homologe botten, chimpansee, sikkelcel, vulkaaneiland).
- Nog niet gedaan: links in jaarplanner, pta-route, vervolg.html, challenges en oefenlijst wijzen nog naar `films/archief-evolutie/` (pas omzetten na Kamiels review; de indeling van oud naar nieuw verschilt); archiefblok staat nog op de themapagina; oefenopdrachten (`oefenen.json`) en presentaties zijn er nog niet.

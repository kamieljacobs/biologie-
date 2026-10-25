# Sporen op de plaats delict — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/forensisch-1-sporen.html` (audio in `forensisch-1-sporen/audio/`) |
| Reeks | Wat word jij? · Forensisch onderzoek (film 1 van 3) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.1 · 25 oktober 2026 (script v2) · 1.1: zin in s18 'Langgerekte vlekken meten is dus betrouwbaarder' vervangen door 'Een meetfout weegt bij langgerekte vlekken dus minder zwaar' (bronnenlogboek, bewering 24), s18 opnieuw ingesproken, chip in beeld nu 'minder gevoelig'; docentdeel: bronnen bijgewerkt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.451 credits (5.187 + 264 voor de nieuwe take van s18 in versie 1.1) (flow in `stem/sessions.json`) |
| Duur | spraak 5:36 (336 s); met vragen en kaarten ± 7 min |
| Prompt | v10 (met de aanvullingen van 25 okt 2026: twijfelscènes) |
| Beeldstijl | Schema met cast (Bilal stagiair forensisch onderzoek, Dr. Kim; plaatsdelict-outfit), Micro bij moleculen |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_beeld.md, frisse beeldreview na de bouw) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | gang van een woning, afzetlint bij de deur; bruine vlek op de vloer met een geel nummerbordje; verderop een mes met een tweede bordje, spatjes op de muur bij de keukendeur; Bilal op zijn hurken in witte overall |
| Hoofdstuk 1 — Sporen vinden | s04, s05, q06, s07, s08 | Schema → Micro: foto met liniaal naast de vlek, vochtig wattenstaafje; zoom naar een rode bloedcel en één hemoglobine met vier heemgroepen, elk met een ijzeratoom; waterstofperoxide die bij het heem reageert; terug: twee druppelflesjes en een klokje; daarna de donkere gang met blauwe voetstappen naar de deur |
| Hoofdstuk 2 — Is het menselijk? | s09, s10, q11, s12, s13 | Schema → Micro: kaart 'voorproef' met mierikswortel en aardappel; de hondenmand bij de deur; teststrookje met antistoffen met rood kleurdeeltje, testlijn T en controlelijn C, inzoomen op de 'sandwich'; in het lab hetzelfde strookje met hondenbloed; daarna het glas op het aanrecht en zetmeelpapier dat blauw kleurt |
| Hoofdstuk 3 — Bloedsporen lezen | s14, q15, s16, s17, s18 | muur bij de keukendeur met een rond spatje en een ovaal met staartje; zijaanzicht van een druppel die recht en schuin neerkomt; liniaal over het ovaal (5 en 10 millimeter); de som sin α = breedte / lengte = 0,5 → α = 30° op het scherm; een bijna rond vlekje met een wiebelende hoekwijzer; daarna lijnen terug naar één gebied, label 'vereenvoudigd: druppels vliegen in een boog' |
| Hoofdstuk 4 — Veiligstellen zonder te besmetten | s19, q20, s21, s22, q23, s24, s25 | Bilal en Kim in overall, mondkapje en handschoenen; Bilal met het staafje, daarna het glas; een haar dat van een mouw valt; kaartje 'eliminatiedatabank'; papieren zakje en ademend staafjesdoosje naast plastic zakje met schimmel; mes in een doos; label met nummer, zegel en een formulier met handtekeningen |
| Recap | s26, s27 | de gang weer in het licht; de vlek met de uitslagen ernaast als drie kaartjes (roze staafje, blauw licht, strookje met twee strepen); doos met het mes en een zegel op weg naar 'DNA-lab'; daarna twee opleidingskaartjes en drie werkplekken |

## Vragen
q02 → b; q06 → c; q11 → a; q15 → b; q20 → c; q23 → a (zie film.py).

## Begrippen
spoor, hemoglobine en heem, voorproef (indicatieve test), luminol, sneltest op menselijk bloed, amylasetest, inslaghoek, eliminatiedatabank, keten van bewaring.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 158 | `window.FILMDATA` |
| 1925 | `const SCENES = {}` |
| 4480 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fo1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> forensisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Wachtlijstwoorden niet blind getranscribeerd (upload geblokkeerd); Kamiel luistert in de batch
- Bij Vragen uit haalt scripts/antwoordtekst.py de antwoordlabels weg

Voldoet aan: prompt v10 (25 okt 2026). Werkwijze: 3 scriptvarianten met blinde beoordelaar (`werk/`, winnaar en reden in `brief.md`), frisse feitenreview (`reviews/review_v1.md`), twijfelscènes gekeurd door Kamiel, frisse beeldreview na de bouw (`reviews/review_beeld.md`). Getallen met bronnen: `getallen.md`. Bouwen: `bouw/bouw.sh` in een werkmap volgens `films/vervolg/BOUWEN.md` (lib_bio.js zit in `src/`).

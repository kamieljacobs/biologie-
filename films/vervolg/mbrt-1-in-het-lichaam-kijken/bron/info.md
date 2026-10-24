# In het lichaam kijken — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/mbrt-1-in-het-lichaam-kijken.html` (audio in `mbrt-1-in-het-lichaam-kijken/audio/`) |
| Reeks | Wat word jij? · Medische beeldvorming (MBRT) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 24 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.438 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:41 (341 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C · Schema, met cast (Dr. Kim als radioloog, Opa Henk, Noor, Lotte); röntgen-, MRI-, echo- en CT-beelden in grijswaarden |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | tuin met ladder; Opa Henk valt en houdt zijn pols vast; röntgenfoto van de pols met een breuklijn; Lotte op het voetbalveld met haar knie; röntgenfoto van een knie waarop niets te zien is; vraagteken |
| Hoofdstuk 1 — Röntgen: wat houdt de straling tegen? | s04 | röntgenbuis boven de pols, plaat eronder; stralen die door huid en spier gaan en door bot worden tegengehouden; plaat: zwart waar straling aankomt, wit waar niet; schaal lucht–vet–spier–bot; breuk als donkere lijn in het witte bot; band en spier in hetzelfde grijs; dosis longfoto tegenover een jaar |
| Hoofdstuk 2 — MRI: luisteren naar waterstof | s05, q06, s07 | Lotte op het bed van de MRI-scanner; water­molecuul met twee waterstofatomen; kompasnaaldjes in alle richtingen die in het magneetveld op één lijn gaan; radiogolf die ze uit de lijn duwt; ze zwaaien terug en zenden een signaal; knie op de MRI: donkere kruisband die onderbroken is, lichte vlek; geen straling; sleutels en bankpas blijven buiten |
| Hoofdstuk 3 — Echo: geluid dat terugkaatst | s08, q09, s10 | Henk op de spoedeisende hulp; Noor naast het bed die zijn hand vasthoudt; echokop met gel op de buik; geluidsgolf die bij elke grens een beetje terugkaatst; diepte = tijd; scherm: lever grijs, vocht zwart, rib wit met een schaduw erachter |
| Hoofdstuk 4 — CT: het lichaam in plakjes | s11, q12, s13 | Henk op het bed dat door de ring van de CT schuift; röntgenbuis die rondom draait; computer die een plak berekent; brood in sneetjes; plak van de bovenbuik: lever, maag, milt, aorta, wervel, ribben; kijkrichting vanaf de voeten; twee gebroken ribben; Noor en Henk |
| Recap | s14, s15 | Henk met gips en Noor; Lotte met haar MRI-beeld; vier kaartjes: röntgen, MRI, echo, CT; opleiding MBRT; radioloog; vooruitblik bestraling |

## Vragen
q02 → a; q06 → c; q09 → b; q12 → b (zie film.py).

## Begrippen
röntgenstraling, röntgenfoto, CT-scan, MRI, echo (echografie), stralingsdosis, doorsnede (plak), radioloog, MBRT.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 151 | `window.FILMDATA` |
| 1836 | `const SCENES = {}` |
| 2205 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/m1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> mbrt`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- MRI-uitleg vereenvoudigd (kompasnaaldjes, geen precessie)
- CT-plak is getekend, geen echte scan
- s04 en s07 na de eindreview opnieuw ingesproken
- dokter Kim in s10/s11 nog beluisteren

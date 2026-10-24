# Meer oogst — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/landbouw-1-meer-oogst.html` (audio in `landbouw-1-meer-oogst/audio/`) |
| Reeks | Wat word jij? · Landbouw en dierhouderij (1) |
| Niveau | havo en vwo (één versie) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.923 credits (flow in `stem/sessions.json`) |
| Duur | spraak 7:19 (439 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Schema met cast (Yasmin, Opa Henk) en ElevenLabs-decors (kas, regelruimte, kassengebied s nachts) op ±60 % |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | kas van binnen (ElevenLabs-decor); Yasmin bij een rij tomaten; buisje langs de plantenrij; ppm-meter ruim 400 buiten, 800 binnen |
| Hoofdstuk 1 — Wat houdt de plant tegen? | s04, s05, s06, s07, q08 | blad met pijlen: licht, CO₂, water in, suiker en zuurstof uit; ton met duigen van ongelijke lengte (licht, CO₂, temperatuur, water); rubisco als traag handje dat CO₂ of soms O₂ pakt; grafiekje fotosynthese tegen CO₂ bij weinig en veel licht; verwijzing naar Alles in het groen |
| Hoofdstuk 2 — De kas als regelsysteem | s09, s10, q11, s12, s13 | regelruimte (ElevenLabs-decor) met klimaatcomputer; vier schuifjes: licht, temperatuur, CO₂, luchtvochtigheid; huidmondje open met CO₂ erin en waterdamp eruit; ramen open en dicht; lampen aan; grauwe schimmel op een stengel; Opa Henk vroeger met thermometer en raamslinger |
| Hoofdstuk 3 — Van suiker tot tomaat | s14, s15, q16, s17, s18, q19 | tros van dichtbij (ElevenLabs-decor); bladeren als bron, vruchten en kop als putten, suikers als bolletjes door de zeefvaten; balans blad tegen vrucht; dag-en-nachtthermometer; staaf: ruim 50 kilo per vierkante meter in een Nederlandse kas, rond 9 gemiddeld in Spanje; verwijzing naar Transport in planten |
| Hoofdstuk 4 — Duurzaam telen | s20, s21, s22, s23 | kassengebied 's nachts (ElevenLabs-decor), oranje gloed van belichte kassen, daarna schermdoeken dicht; gasmotor met drie pijlen: stroom, warmte, CO₂; leiding uit de haven van Rotterdam; boorput naar warm water diep in de aarde; bassin met regenwater; staaf 15 liter per kilo in de kas tegen 60 op een Zuid-Europese akker; sluipwesp bij witte vlieg; hommel bij een bloem; weegschaal: kilo tomaat tegen energie |
| Recap | s24, s25 | Yasmin bij de tros, Opa Henk naast haar; vijf kaartjes: beperkende factor, rubisco, regelsysteem, bron en put, duurzaam; opleidingen |

## Vragen
q02 → a; q08 → b; q11 → c; q16 → b; q19 → c (zie film.py).

## Begrippen
beperkende factor, rubisco, CO₂-dosering, klimaatcomputer, huidmondjes, bron en put, generatief en vegetatief, ethyleen, biologische bestrijding.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 137 | `window.FILMDATA` |
| 1822 | `const SCENES = {}` |
| 2133 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/lb1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> landbouw`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- decors alleen onder scènes op die plek
- Yasmin wil arts worden: hier een snuffelstage in de kas
- nog geen filmmedaillon

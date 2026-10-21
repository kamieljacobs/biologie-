# Hond, koe, paard — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/diergeneeskunde-1-hond-koe-paard.html` (audio in `diergeneeskunde-1-hond-koe-paard/audio/`) |
| Reeks | Wat word jij? · Diergeneeskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.695 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:59 (299 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema (FILMDATA-straat), vaste cast (Dierenarts Mila, Lotte, Veehouder Gerrit e.a.), gedeelde dierentekeningen in teken_dg0.js |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Dierenarts Mila naast haar auto; drie kaartjes met de bezoeken van vandaag: koe eet niet, paard met buikpijn, kat van Noor |
| Hoofdstuk 1 — Eén bouwplan | s04, s05 | skelet van mens, hond en paard naast elkaar; opperarm, spaakbeen en dijbeen in dezelfde kleur; paardenbeen op één teen; daarna een kaart met hartslag in rust per soort |
| Hoofdstuk 2 — Vier magen | s06, q07, s08, s09, s10 | koe in doorsnede met pens, netmaag, boekmaag en lebmaag; microben in de pens die cellulose knippen; vetzuren naar het bloed; methaan omhoog; grassprietje terug naar de bek; Mila met stethoscoop links tegen de buik |
| Hoofdstuk 3 — Gisten achteraan | s11, s12 | paard in doorsnede met kleine maag, lange dunne darm, grote blinde darm en dikke darm; sluitspier bij de maagingang als slot; Mila meet de hartslag |
| Hoofdstuk 4 — Dezelfde pil, ander dier | s13, q14, s15, s16 | Noor met haar kat; halve tablet paracetamol; lever van de kat met één route dichtgezet; giftig tussenproduct; rode bloedcellen die bruin kleuren; daarna een collie en een pompje in de bloed-hersenbarrière |
| Recap | s17, s18 | Mila's dag als drie kaartjes: stille pens, paard dat niet kan braken, kat zonder paracetamol; daarna de opleiding |

## Vragen
q02 → a; q07 → b; q14 → c (zie film.py).

## Begrippen
homologe organen, normaalwaarde, herkauwer, pens, lebmaag, lebmaagverplaatsing, blinde darm, koliek, MDR1-mutatie.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 135 | `window.FILMDATA` |
| 1532 | `const SCENES = {}` |
| 1981 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/diergeneeskunde-1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> diergeneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Gedeelde dieren (koe, paard, kat, hond …) staan in teken_dg0.js en worden in alle vier Diergeneeskunde-films gebruikt
- Maagdelen schematisch getekend (boekmaag en lebmaag liggen eigenlijk rechts)

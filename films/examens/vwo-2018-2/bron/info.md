# Examenbespreking vwo 2018-II — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/examens/vwo-2018-2.html` (audio in `vwo-2018-2/audio/`) |
| Reeks | Examen · examenbesprekingen (vwo 2018-II) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 21 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 27.502 credits (flow in `stem/sessions.json`) |
| Duur | spraak 32:20 (1940 s); met vragen en kaarten ± 34 min |
| Beeldstijl | Schema; examenfiguren nagetekend (tabel 1, diepte/temperatuur, kieuw met wondernet, cladogram, insulinegrafieken, FMR1-gen, stamboom, X-chromosomen, gel, synaps, reactoren, J-curves, staafdiagram); gedeelde examen-UI in teken_ex18_0.js |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md`; scènes in vier delen (`teken_ex18_a–d.js`, `scenes_ex18_a–d.js`) plus gedeelde examen-UI `teken_ex18_0.js` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → beeldreview (reviews/review_beeld.md, verwerkt) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Opening | s01, s02 | examenzaal met tafels; Noor aan een tafel met het opgavenboekje; klokje 3 uur; teller 38 vragen · 70 punten; vijf contexttitels als kaartjes |
| Zo lees je een examenvraag | s04, s05, s06 | vraagregel met het puntenblokje 2p en het werkwoord omcirkeld; drie kaartjes: noem · leg uit · verklaar; ketting van schakels: oorzaak → stap → gevolg; klokje: 70 punten in 180 minuten |
| De lauwbloedige koningsvis | s07, s08, s09, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26 | koningsvis (afgeplat, rond, borstvinnen) in koud blauw water, warmtekleur in het lichaam; thermometers: water 9 °C, vis 14 °C |
| Nieuwe eilandjes voor de alvleesklier | s27, s28, s29, s30, s31, s32, s33, s34, s35, s36, s37, s38, s39, s40, s41, s42, s43 | Ruth (castpersonage Lotte als Ruth) met een glucosemeter; alvleesklier met eilandjes van Langerhans, bètacellen; T-cel die een bètacel aanvalt |
| Een bijzondere band tussen grootvader en kleinkind | s44, s45, s46, s47, s48, s49, s50, s51, s52, s53, s54, s55, s56, s57, s58, s59, s60, s61, s62, s63, s64 | Opa Henk (castpersonage) met een wandelstok en trillende hand; kleinkind Teun; X-chromosoom met de fragiele plek; FMR1-gen met CGG-herhalingen |
| Biologische productie van waterstofgas | s65, s66, s67, s68, s69 | twee reactoren naast elkaar; reactor 1 met aardappelschillen en bacteriën, reactor 2 met licht en purperbacteriën; gasopvang met H₂ en CO₂ |
| Wat te doen aan de muizenplagen? | s70, s71, s72, s73, s74, s75, s76, s77, s78, s79, s80, s81, s82, s83, s84, s85 | Fries grasland in augustus groen, in maart kaal met muizengangen; veldmuis; dijk en sloot |
| Wat neem je mee? | s86, s87 | Noor met het examen dicht en een vink; vier tips als kaartjes: punten tellen · werkwoord · tekst gebruiken · elke grafiek-as lezen |

## Vragen
Geen vraagkaarten: de film bespreekt de 38 examenvragen doorlopend. Elke examenvraag heeft een vaste beeldtaal (vraagChip, vraagKaart, punten, opties, welNiet, valkuil, tipKaart in `teken_ex18_0.js`). Antwoorden volgens het correctievoorschrift: 4B, 10D, 12C, 20A, 23D, 24D, 29D, 34C, 36A; wel/niet 7 n-w-n, 8 w-n-n, 13 n-n-w, 35 w-w-w.

## Begrippen
oppervlakte-inhoudverhouding, myoglobine, valide, tegenstroomprincipe, convergente evolutie, leesraamverschuiving, X-inactivatie, draagkracht, foto-heterotroof, generalist en specialist.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 111 | Voor de docent |
| 142 | `window.FILMDATA` |
| 1512 | `const SCENES = {}` |
| 2994 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/ex18` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen: engine-kop + brein/teken/extra + `teken_ex18_*.js` + `scenes_ex18_*.js` (zie het script `bouw.sh` hieronder).

```
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js ex18/teken_ex18_*.js ex18/scenes_ex18_*.js; } > ex18/scenes.js
```
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 pak_ex.py <d> examens` (variant van pak.py naar `films/examens/`), daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Vraag 12 volgt het CV (C, glucagon); medisch wordt het dageraadfenomeen vooral aan groeihormoon/cortisol toegeschreven, zie docentdeel
- Melkveehouder in s84–s85 is Bilal (castleerling); vervangen als er een volwassen boer in het castboek komt
- Scènes in vier delen gemaakt (teken_/scenes_ex18_a–d.js, prefix a_–d_), gedeelde examen-UI in teken_ex18_0.js
- Nog niet gedaan: beeldreview punt 14 (s48, label promotor bij de polymerase)
- 21 okt 2026: beeld viel weg rond 11:45 (s34): `b_afb1` gaf niets terug zolang afbeelding 1 nog onzichtbaar was, waarna de scène crashte en de tekenlus stopte. Hersteld; de speler (`src/player.js`) vangt een fout in een scène voortaan af (`try/catch` om de scène, één melding in de console), zodat het beeld nooit meer stilvalt.

# Meten wat je niet kunt zien — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/psychologie-4-meten-wat-je-niet-kunt-zien.html` (audio in `psychologie-4-meten-wat-je-niet-kunt-zien/audio/`) |
| Reeks | Wat word jij? · Psychologie |
| Niveau | vwo (één niveau) |
| Versie | 1.1 · 20 oktober 2026 |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea (flow in `stem/sessions.json`), 5.502 credits |
| Duur | spraak 6:07 (367 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C · Schema, met cast (Lotte, Dr. Kim) |
| Bouwvorm | FILMDATA-straat van de therapiefilm (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2; eindreview in reviews/review_eind.md (indien aanwezig) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Lotte met polsband, Dr. Kim zet een pot met spin neer, hartslaggrafiek stijgt |
| H1 Van begrip naar meting | s04, s05 | schrik/opwinding/trap op; ANGST-wolk met drie pijlen; meetbord; looplijn naar de spin; Lotte 'valt wel mee' maar bij de deur |
| H2 Een vragenlijst bouwen | s06, q07, s08 | drie vraagkaartjes; stempels DUBBEL, VAAG, STUREND; schaal 1–5; tien balken met één scheve; vermijden/piekeren/schrikken; sociaal wenselijk |
| H3 Betrouwbaar en valide | s09, q10, s11, s12 | weegschaal +2 kg; schietschijf; test en hertest; angstlijst naast gedragstest |
| H4 Goed voor een groep, wankel voor jou | s13, q14, s15 | IAT, 70 → 45; honderd stipjes met vast gemiddelde; Lotte met springende score |
| H5 Zeggen of doen? | s16 | Stroop-woorden; Lotte met spinnenwoorden en gewone woorden, tijdbalken; meetbord met zwakke plekken |
| Recap | s17 | Lotte en meetbord; vier taken van de onderzoeker; methodeleer en testtheorie |

## Vragen
q02 → b; q07 → c; q10 → a; q14 → b (zie film.py).

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen | 
| 100–109 | Checkvragen |
| 110–132 | Voor de docent |
| 133 | `window.FILMDATA` |
| 1494 | `const SCENES = {}` |
| 1495–1518 | spin, pot, hand, document_ (uit de therapiefilm) en eigen tekeningen (meetBord, hartslagGrafiek, polsband, looplijn, vraagKaartje, schaal15, weegschaal, schijf, kleurWoord) |
| 1519–1598 | `Object.assign(SCENES, { title, s01 … s17 })` |

## Hoe je de film aanpast
Zoals bij Kijken in een denkend brein (zie die info.md), met werkmap `hw/me` en scènes `cat helpers_gd12.js > scenes.js; echo 'const SCENES = {};' >> scenes.js; cat extra.js scenes_me.js >> scenes.js`.

## Aandachtspunten
- Stroop-kleuren: koraal staat voor rood, teal voor blauw, groen voor groen, paars voor 'geel'-woorden (Part C kent geen geel); het woord 'rood' staat in teal ('blauw').
- Woordtijden via silalign; bij 7 alinea's vielen enkele leestekens niet op een stilte.

## Wijziging 20 okt 2026 (v1.1, na de eindreview)
Eindreview (`reviews/review_eind.md`, 5 MOET-punten) verwerkt, alleen beeld: label 'echt 72 kg' op het woord kilo; namen bij vinkje en kruisje (betrouwbaar/valide); meetbordkolommen hoger en korte chip 'tijdmeting: wankel'; labels Dr. Kim en hartslagpaneel uit elkaar; chip methodeleer/testtheorie eerder; Lotte als spreker bij 'sociaal wenselijk'; test en hertest in twee kleuren. Geen nieuwe audio.

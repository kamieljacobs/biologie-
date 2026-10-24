# Aanleg of opvoeding? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/psychologie-3-aanleg-of-opvoeding.html` (audio in `psychologie-3-aanleg-of-opvoeding/audio/`) |
| Reeks | Wat word jij? · Psychologie |
| Niveau | vwo (één niveau) |
| Versie | 1.1 · 20 oktober 2026 |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea (flow in `stem/sessions.json`), 6.706 credits |
| Duur | spraak 7:14 (434 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Part C · Schema, met cast (Yasmin, Bilal, Dr. Kim, Teun) |
| Bouwvorm | FILMDATA-straat van de therapiefilm (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Yasmin en Bilal aan tafel met boeken; 'hun vader' als rekenmachine-kaart; wegwijzers genen/opvoeding |
| H1 Een experiment dat de natuur doet | s04, s05, q06, s07, s08 | ouders → kind met pijlen genen en opvoeding; wiskundegen doorgestreept; eeneiig (eicel splitst) vs twee-eiig (twee eicellen, twee zaadcellen); DNA-balken 100 %/50 %; aanname gelijke omgevingen; adoptie (Teun); Minnesota-balken; NTR, Dr. Kim |
| H2 Wat betekent erfelijk? | s09, s10, q11, s12 | twee stippengrafieken lengte (0,9 en 0,5), schaal 0–1, 2 × (0,9 − 0,5) = 0,8; unieke omgeving; 0,8 groot; lengtebalken en 'niet te knippen' |
| H3 Het getal hangt af van de omgeving | s13, s14 | twee akkers; VS vs West-Europa (schematisch); bijziendheid: binnen, buiten, bril |
| H4 Duizenden kleine stukjes | s15 | erwten één gen vs duizenden streepjes; kranen aanleg × zware gebeurtenis; Teun en de bibliotheek |
| H5 Depressie, ADHD en intelligentie | s16, q17, s18 | ± 3000 studies; balken depressie, ADHD (twee beoordelaars); IQ-curve met leeftijd; Yasmin kiest; hulpkaart mentor/huisarts |
| Recap | s19 | Yasmin en Bilal; tweelinggrafiek; drie taken van de onderzoeker |
| Eindkaart | s20 | drie regels |

## Vragen
q02 → b (gezin: genen én opvoeding); q06 → a (genen maken verschil); q11 → b (verschillen in een groep); q17 → a (zelf een omgeving kiezen).

## Begrippen, docentdeel, getallen
In `film.py` (glossary) en `sections.html` (vier checkvragen, plaats, uitleg per hoofdstuk, getallen met bronnen: Polderman 2015, Sullivan 2000, Faraone & Larsson 2019, Haworth 2010, Bouchard 2013, Tucker-Drob & Bates 2016, NTR; vereenvoudigingen; lessuggesties met rekenopdracht).

## Waar wat in de HTML zit (films/vervolg/psychologie-3-aanleg-of-opvoeding.html, v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen (`#glossary`) |
| 100–109 | Checkvragen |
| 110–150 | Voor de docent |
| 151 | `window.FILMDATA` |
| 1512 | `const SCENES = {}` |
| 1513–1543 | `document_()` en eigen tekeningen (rekenmachine, boekStapel, wegwijzer, eicel, zaadcel, dnaBalk, tweelingPlot, plantje, akker, kraan, emmer, gebouw, hoogteBalk) |
| 1544–1641 | `Object.assign(SCENES, { title, s01 … s19 })` |
| 1642 en verder | speler |

## Hoe je de film aanpast
Zoals bij Kijken in een denkend brein (zie die info.md), met werkmap `hw/ao` en scènes `cat helpers_gd12.js > scenes.js; echo 'const SCENES = {};' >> scenes.js; cat extra.js scenes_ao.js >> scenes.js`. Na het kopiëren de terugknop zetten op `../../vervolg.html#psychologie` en de site-scripts draaien (spelerfix, flipkaarten, teller, licentie_noot, vervolg_films).

## Aandachtspunten
- Gevoelig: depressie en ADHD; groepsgetallen, hulpkaart (mentor, huisarts) in s18.
- Tweelingen bewust als eicellen en DNA-balken, niet als zelfgetekende poppetjes; mensen alleen uit het castboek.
- Woordtijden via silalign; bij 9 alinea's vielen 1–4 leestekens niet op een stilte.

## Wijziging 20 okt 2026 (v1.1, na de eindreview)
Eindreview (`reviews/review_eind.md`, 5 MOET-punten) verwerkt, alleen beeld: eeneiige tweeling als één eicel die zichtbaar splitst (binnen één ring); kranen vervangen door een 2×2-raster (aanleg × zware gebeurtenis, alleen samen veel); ouders als kaartjes en gezinnen als huisje in plaats van rasterblokjes; VS- en Europa-balken bouwen op in hun eigen kader; titelgrafiek kleiner; rekenkader verdwijnt bij 'apart'; notitie 'overige 0,1: gedeeld gezin'; bril bij bijziendheid. Geen nieuwe audio.

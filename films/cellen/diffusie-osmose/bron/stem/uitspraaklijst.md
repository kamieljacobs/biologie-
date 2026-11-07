# Uitspraaklijst (stem-invoer) — Diffusie en osmose

Model: ElevenLabs **eleven_v4**, stem **Roos** (voice_id 7qdUFMklKPaaAVMsBTBt), één take per segment (generations_count 1). Flow: "Diffusie en osmose — voice-over Roos" (Nd0XpevjWZ9i6oE977T1); uitspraaktest in flow OjSx1NJI3a7cn7PXOtMf.

Deze vervangingen zitten in `bouw/make_segments.py` (lijst `subs`) en staan per segment in `segmenten_stem-invoer.json` (veld `voice`). De ondertitels gebruiken altijd de gewone spelling (`display`).

| Schermtekst | Stem-invoer | Waarom |
|---|---|---|
| plasmolyse | plasmolieze | Nederlandse y in Griekse leenwoorden = ie; voorkomt "plasmo-lyse" |
| hemolyse | heemolieze | idem, plus lange ee |
| hypotonisch | hiepotonisch | voorkomt Engelse "haipo" |
| hypertonisch | hiepertonisch | idem |
| koolstofdioxide | koolstofdie-oxide | werkte eerder (Celorganellen) |
| semipermeabel | semi-permeabel | zelfde aanpak als "semi-conservatief" |
| isotonisch, ATP, turgor, gefaciliteerde, osmotische waarde, concentratiegradiënt, natrium-kaliumpomp, vacuole, glucose, biljoenen | ongewijzigd | |

Open vragen eindigen met "Wat denk je?" (niet "Voorspel").

Controle: Kamiel heeft op 12 oktober 2026 alle twaalf risicowoorden in `risicowoorden.mp3` (fragmenten uit de echte takes) beluisterd en goedgekeurd. De respellings hierboven zijn dus de goedgekeurde stem-invoer.

## Versie 1.1 (review)
Opnieuw ingesproken in flow OjSx1NJI3a7cn7PXOtMf: s05, s21, s22, s31. Zelfde respellings (o.a. "semi-permeabel" in s21).

## Versie 1.2 (16 oktober 2026)
Opnieuw ingesproken in flow Nd0XpevjWZ9i6oE977T1 (één take per segment, eleven_v4): s12, s14, s20, s21, s22. Nieuwe respellings (IPA via Wiktionary/kaikki.org):

| Schermtekst | Stem-invoer | IPA / waarom |
|---|---|---|
| fosfolipiden | fosfo-lipiden | /liˈpidə/; koppelteken houdt "fosfo" en "lipiden" los |
| hydrofiel | hiedro-fiel | /ɦidroːˈfil/; zelfde ie-truc als hiepotonisch |
| hydrofoob | hiedro-foob | /ɦidroːˈfoːp/ |
| chloride | chloride (ongewijzigd) | verwacht /xloːˈridə/; alternatief `chlo-riede` als de klemtoon fout is |

Nog te beluisteren door Kamiel (batch): zie `films/WACHTLIJST.md`.

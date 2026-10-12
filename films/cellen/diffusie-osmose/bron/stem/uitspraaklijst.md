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

Controle: Kamiel kon de uitspraaktest (`uitspraaktest.mp3`, A/B-varianten 1–6) niet beluisteren. De keuzes hierboven volgen de Nederlandse uitspraakregels; een terug-transcriptie met Scribe gaf alleen de invoertekst terug en zegt dus niets over de uitspraak. Klinkt een woord fout: pas `subs` aan, draai `make_segments.py` en spreek alleen dat segment opnieuw in.

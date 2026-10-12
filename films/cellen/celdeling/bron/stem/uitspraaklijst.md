# Uitspraaklijst (stem-invoer) — Celdeling

Model: ElevenLabs **eleven_v4**, stem **Roos** (voice_id 7qdUFMklKPaaAVMsBTBt), één take per segment. Flow "Celdeling — voice-over Roos" (G9H4qGFv1wgBMnnLpTBa); uitspraaktest in flow MDfw2GKKMoUP8ejXXKmM (`uitspraaktest.mp3`).

Kamiel heeft de uitspraaktest op 12 oktober 2026 beluisterd en gekozen. Vervangingen in `bouw/make_segments.py` (lijst `subs`), per segment terug te vinden in `segmenten_stem-invoer.json` (veld `voice`). Ondertitels gebruiken altijd de gewone spelling.

| Schermtekst | Stem-invoer | Waarom |
|---|---|---|
| haploïd / haploïde | haaploïd / haaploïde | Kamiel: met lange aa |
| tweeënnegentig | tweeën-neguntig | vaste voorkeur: "negentig" als "neguntig" |
| XX, XY, X, Y, X'en | iks-iks, iks-ei, iks, ei, iksen | Y als "ei" (vaste voorkeur), X als "iks" |
| meiose, mitose, cytokinese, chromatiden, diploïd, G1-fase, S-fase, G2-fase, crossing-over, non-disjunctie, trisomie | ongewijzigd (keuze A in de test) | |
| profase t/m telofase, centromeer, equatorvlak, spoelfiguur, chromatine, homologe chromosomen, "twee tot de macht drieëntwintig", "twee n", "een half p", reductiedeling | ongewijzigd (goedgekeurd) | |

Op het scherm en in de ondertitels wordt "meiose één/twee" automatisch "meiose I/II" (in `bouw/build_data.py`); de stem zegt "één" en "twee".

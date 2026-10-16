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

## Extra uitdaging (e01, e03)

Uitspraaktest `uitspraaktest_extra.mp3` (flow G9H4qGFv1wgBMnnLpTBa), door Kamiel gekozen op 12 oktober 2026: kinetochoor/kinetochoren en cohesine **zoals geschreven** (keuze A; B was "kie-ne-to-choor" en "ko-hee-zie-ne"); eiwitplaatjes, centromeer en wachtsignaal goedgekeurd. Stem-invoer van e01 en e03 is daardoor gelijk aan de schermtekst. Opgenomen in dezelfde flow (eleven_v4, Roos, één take), woordtijden met eleven_scribe_v1.

## Versie 1.2 (na review)

Opnieuw ingesproken in flow G9H4qGFv1wgBMnnLpTBa: s12, s13, s15, s26, s27, s30, e01, e03.
- "X-vorm" / "X-vormen" → stem-invoer "iks-vorm" / "iks-vormen" (volgt de bestaande regel X = "iks").
- "DNA" in s13 en s30 → "deeënaa" (Kamiels vaste voorkeur sinds de uitspraaktest van 12 oktober 2026). De oudere segmenten hebben nog "DNA"; neem bij opnieuw inspreken ook daar "deeënaa".

- 12 okt 2026: Kamiel heeft "iks-vorm"/"iks-vormen" en het verschil tussen oude ("DNA") en nieuwe ("deeënaa") takes beluisterd (uitspraakcheck_review.mp3) en goedgekeurd; oude takes blijven zoals ze zijn.

## Voortplanting v01 en v02 (16 okt 2026)

Ingesproken in flow G9H4qGFv1wgBMnnLpTBa (eleven_v4, Roos, één take, generations_count 1), woordtijden met eleven_scribe_v1. Stem-invoer = schermtekst, behalve haploïde → "haaploïde". Geen uitspraaktest vooraf (afspraak 13 okt 2026); op de wachtlijst voor de batchtest: ongeslachtelijke / geslachtelijke, zoetwaterpoliep (/ˈzut.ʋaː.tər.poːˌlip/), bladluis (/ˈblɑt.lœy̯s/), klonen, zygote (/ziˈɣoː.tə/), eencellige.

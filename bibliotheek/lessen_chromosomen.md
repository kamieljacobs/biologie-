# Lessen · recepten Chromosomen (Erfelijkheid 1 v2)

Registratie volgens prompt v10 C10.1 stap 5 en C10.5. Alle vijf onderdelen zijn door Kamiel gekeurd op 25 okt 2026 (keuringsblad https://claude.ai/artifact/1m98a1QDY2BsHxY24c6Q5D; stills in `films/erfelijkheid/1-chromosomen/bron/keuring-fase1/`). Eerst gebruikt in *Chromosomen en de taal van erfelijkheid* v2.

| Object | Status | Aanroep | Houdingen / standen | Bron |
|---|---|---|---|---|
| Huid in doorsnede | gekeurd 25 okt 2026, ook anatomisch (labels mogen: hoornlaag/dode, platte cellen, levende cellen, basale laag, pigmentcel, cel in deling, lederhuid) | `huidDoorsnede(ctx, x, y, w, h, {um, mel, deling, hl, t, seed})` → `{s, yTop, yLevend, yKorrel, yBasaal(x), pig, deel}` | `um` 120–1000 (1000 = overzicht 1 mm); `mel` 0 (aa) · 1 · 1,6 (na zon); `hl` 'hoorn' · 'levend' · 'basaal' · 'pigment' | OpenStax A&P § 5.1; Barrandon & Green 1985; Sun e.a. 2021 |
| Celkern met chromatine | gekeurd 25 okt 2026 | `kernChromatine(ctx, cx, cy, r, {c, n, seed, membraan, kleuren})` → posities `{x, y, len, rot, nr}` | `c` 0 (interfase) → 1 (X-chromosomen), `membraan` 1 → 0,3 (valt uiteen) | OpenStax Biology 2e § 10.1; Utah GSLC; BioNumbers 109953 |
| Chromosoom (X) | gekeurd 25 okt 2026 | `chromatideX(ctx, x, y, len, rot, {w, kleur, donker, cen, uiteen, coils})` | `uiteen` 0 (vast bij het centromeer) → 1 (zusters los), `coils` 0 = egaal | idem |
| DNA rond eiwitten | gekeurd 25 okt 2026 | `nucleosoomDraad(ctx, x0, y0, x1, y1, {n, R, tilt, t})` | `tilt` 0,75–1,05 | Utah GSLC; OpenStax Biology 2e § 10.1 |
| Onderarm | gekeurd 25 okt 2026 | `onderarm(ctx, x, y, pxPerCm, {id, outfit, bruin, kijk, mouwOp})` | `bruin` 0 → 1 (zon, bruiningsgrens bij de mouw); geen `rood` gebruiken (Kamiel) | antropometrie volwassene |
| Gezin De Wit (castboek) | gekeurd 25 okt 2026, variant A (bruine huid), staand | `persoon(ctx, id, …)` met `CAST_GEZIN_WIT` | staand; garderobe `licht` = afgewezen variant B | MedlinePlus OCA |

## Lessen

- DNA altijd via `dnaDraad` (lib_micro_evo.js): laad die vóór deze recepten.
- `huidDoorsnede` rekent in lokale coördinaten: de Voronoi-cache blijft geldig als de plaat verschuift of geschaald wordt; zoom dus met `ctx.scale`, niet met een andere `um` per beeld (dat geeft andere cellen).
- Chromatine 'los en zacht kronkelend': draaiing per stap ≤ 0,9 rad en een territorium per chromosoom; een hogere draaiing gaf krabbels (ronde 1).
- Nucleosomen op schaal: DNA-breedte ≈ 0,34 × de straal van de histonschijf (2 nm op 11 nm); eerst te dun getekend.
- Onderarm van boven (dorsaal), niet van opzij: van opzij leest de hand niet als hand (ronde 1).

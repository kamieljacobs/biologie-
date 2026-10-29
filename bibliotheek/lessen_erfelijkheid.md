# Lessen · recepten Erfelijkheid 2–6 (lichte remakes 2.0)

Registratie volgens prompt v13 C10 (zoals `lessen_chromosomen.md`). De vijf films zijn door Kamiel goedgekeurd op 28 okt 2026 (besluiten: `films/verbeterbladen/erfelijkheid-2026-10/besluiten.md`); de tekeningen zijn op 29 okt 2026 als zelfstandige recepten in `lib_bio.js` gezet (de muis in `dieren/lib_dieren.js`). Testvel: `testvel.html#erf-1` en `#erf-2` (met `-licht` voor het lichte palet van de lessen). De films en de lessen (`tools/docent/erfelijkheid-bron/`) zijn niet aangepast: zij houden hun eigen kopie tot een volgende ronde.

Bronnen per recept staan in de kop van de functie en in `bron/bronnen.md` van de film van herkomst; hier niet opnieuw opgezocht.

| Object | Status | Aanroep | Standen | Herkomst |
|---|---|---|---|---|
| Erwtenbloem | goedgekeurd in film 2 | `erwtBloem(ctx, x, y, s, {kleur, open, zonder, stuif, knop, kijk, rot, a})` → ankers `{stempel, kiel, vlag, vleugel, meeldraad, voet}`; s = px per mm | `kleur` paars/wit; `open` 0 → 1 (kiel opengesneden); `zonder` 1 = meeldraden weg (handkruising); `stuif`; `knop` | Erfelijkheid 2 |
| Bloempictogram | idem | `erwtBloemIcoon(ctx, x, y, px, kleur, a)` | | Erfelijkheid 2 |
| Erwtenplant | goedgekeurd in film 2 en 4 | `erwtenplant(ctx, x, y, h, {kleur, bloemen, peulen, peulOpen, peulErwten, seed, t, stok, hl, a})` → `{bloemen, top}` | `t` laat de ranken wiegen | Erfelijkheid 2 (plant) + 4 (peulen als `peul()`) |
| Plantje voor schema's | goedgekeurd in film 2 | `erwtPlantje(ctx, x, y, h, kleur, {hl, a})` | | Erfelijkheid 2 (`plantje`) |
| Erwt | goedgekeurd in film 4 | `erwt(ctx, x, y, r, {kleur, vorm, seed, rot, hl, a})`; ook `{geel, rimpel}` (lessen) | geel/groen × rond/gerimpeld (zelfde formaat) | Erfelijkheid 4 |
| Peul | goedgekeurd in film 4 | `peul(ctx, x, y, len, {erwten: [{kleur, vorm}], open, rot, a})`; (x, y) = midden | `open` 0 (dicht, met bolletjes) → 1 (twee kleppen) | Erfelijkheid 4 |
| Leeuwenbek | goedgekeurd in film 3 | `leeuwenbek(ctx, x, y, h, kl, {seed, n, zwaai, groei, a})` | `kl` rood/roze/wit of hex; `groei` 0 → 1 | Erfelijkheid 3 (`leeuwenbek`, `groeiPlant`) |
| Rode bloedcel met antigenen | goedgekeurd in film 3 (O = kale keten, Kamiel k8) | `bloedcelAntigeen(ctx, x, y, r, soort, {n, rk, eindIn, ketenA, rot, a})`; los: `suikerKeten(ctx, x, y, nx, ny, r, eind, a, o)` | A, B, AB, O, glad; `eindIn` 0 → 1 = het enzym zet de eindsuiker eraan | Erfelijkheid 3 |
| Fruitvlieg | goedgekeurd in film 4 | `fruitvlieg(ctx, x, y, L, {lijf, vleugel, sekse, rot, hl, t, a})` | grijs/zwart × normaal/stomp × v/m | Erfelijkheid 4 |
| Muis in vachtkleur | goedgekeurd in film 2 en 3 | `muisVacht(ctx, x, y, s, {vacht, houding, kijk, t, a})` (`dieren/lib_dieren.js`) | `vacht` wild/zwart/albino (wit)/geel/grijs; houdingen als `muis()` | Erfelijkheid 2 (`labmuis`) + 3 (`muisKleur`) |
| Netvlies | goedgekeurd in film 5 | `netvliesKegels(ctx, x, y, w, h, {staafjes, verschuif, seed, a})` → `{typen, dx, top, cel, labelY}` | `verschuif` 0 → 1 (L-eiwit lijkt op M) | Erfelijkheid 5 |
| Gevoeligheidskrommen | goedgekeurd in film 5 | `kegelKrommen(ctx, x, y, w, h, {schuif, as, a})` → `{px(nm)}` | `schuif` 0 → 1 (L naar ± 545 nm) | Erfelijkheid 5 |
| Kleurmodel deuteranoop | goedgekeurd in film 5 | `kleurModelDeutan(ctx, x, y, w, h)` (canvaspixels, zonder transformatie) | | Erfelijkheid 5 |
| Stamboom | goedgekeurd in film 6 | `stamboom(ctx, P, {y0, dy, r, toon, hl, dim, geno, genoA, genoKl, nrs, romeins, lijnA, a})` → `{pos, Y, r}`; persoon `{id, sekse, ziek, drager, gen, x, ouders, vraag, nr}` | opbouw per persoon (`toon`), takken dimmen (`dim`) | Erfelijkheid 6 (+ drager-stip uit 5) |
| Symbool, mini-stamboom | idem | `sbSymbool(ctx, x, y, r, sekse, ziek, {hl, vraag, drager, dimA, a})`, `miniStamboom(ctx, x, y, s, [ziekV, ziekM], {sekse, ziek, vraag}, o)` | | Erfelijkheid 6 |
| Genotype met superscript | goedgekeurd in film 5 | `genoTekst(ctx, g, x, y, px, {al, kleur, kl, a})`, `genoDelen('X:m^A Y:v')` | `m` moeder oker, `v` vader teal, `n` tekstkleur | Erfelijkheid 5 (`genoTekst`, `G`) |
| Kruisingsschema | gecombineerd, nieuw als één recept (ter keuring) | `kruisingsSchema(ctx, x, y, {links, boven, vak, gap, px, klLinks, klBoven, kopLinks, kopBoven, gameet, prog, n, gametA, cel, hl, uit, dim, dimNiet, a})` → `{x0, y0, vak, midden(i, j), gameet(kant, k)}`; `genotypeVan(g1, g2)` | n × m; gameten `rond`/`chip`/eigen functie; vullen in leesvolgorde; fenotype via `cel → {onder}`; letaal via `uit` | Erfelijkheid 2, 3, 4 en de lessen (`erf_lib.js`) |
| Gregor Mendel (castboek) | goedgekeurd in film 2 | `persoon(ctx, 'mendel', …)`; `CAST_HISTORISCH` | zwarte jas, bril; alleen historische scènes | Erfelijkheid 2 (`CAST.mendel`) |

## Wat gecombineerd is

- **Kruisingsschema.** Vier versies met elk een andere aanroep: film 2 (2×2, gameten als rondjes teal boven/oker links, `n` vakjes, goud `hl`, `dimNiet`, bloempje onder het genotype), film 3 (allelchips, `cel()`-callback, letaal `uit` met kruis, `hl` per vakje), film 4 (n × m met `kop`/`zij`/`cel`-callbacks voor gameetcellen met chromosomen, `rand`) en de lessen (`links`/`boven`-lijsten, `prog` in leesvolgorde, `gametA` per gameet, automatisch genotype met `genotypeVan`, `cel → {t, vul, kl, rand, teken}`). Het nieuwe recept neemt de lessen-aanroep als basis (lijsten, `prog`, `cel`), met de opties uit de films erbij: `gameet` 'rond' (film 2/4), 'chip' (film 3) of een eigen functie (film 4), `onder` voor het fenotypepictogram (film 2), `uit` (film 3), `hl` als index (film 2) of per vakje (film 3), `dim`/`dimNiet` (film 2/4), en superscripts via `genoTekst` voor X-chromosomale kruisingen (film 5 had een schema met losse tekst). `genotypeVan` zet per gen de hoofdletter eerst en X (met allel) vóór Y.
- **Kleuren in het schema:** zoals film 2 en Chromosomen 2.1: boven teal, links oker. De lessen hadden het omgekeerd (vader teal links); met `klLinks`/`klBoven` is dat om te zetten.
- **Erwtenplant:** de plant van film 2 (steunbladeren, samengestelde bladeren, ranken, echte vlinderbloemen) is de basis; de peulen zijn nu `peul()` uit film 4, zodat ze ook open kunnen met erwten erin. De eenvoudige plant van film 4 (ovale blaadjes, bloem als ovaal) en `erwtPlant` uit de lessen (pot, ellipsbloemetjes) zijn niet overgenomen.
- **Erwt:** film 4 als basis; de optienamen van de lessen (`geel: false`, `rimpel: true`) werken ook.
- **Muis:** `labmuis` (zwart, albino met rode ogen) en `muisKleur` (geel, grijs) zijn één functie `muisVacht` geworden, met dezelfde houdingcontrole als `muis()`.
- **Stamboom:** het recept van film 6; de drager-stip uit film 5 is toegevoegd volgens de standaardnotatie (stip in het midden, niet rechtsonder), in de kleur van 'ingevuld'.

## Lessen

- **Geen `const` die een film al heeft.** De films laden `lib_bio.js` én hun eigen `teken_erf*.js`; een dubbele `const` (ERW, E3, E4, XK, SB, ROMEINS, CH, G) breekt de pagina. Daarom heet het palet `ERFK` en de cijfers `_ERF_ROM`. Gecontroleerd: `lib_bio.js` laadt foutloos naast de scripts van film 2, 3, 5 en 6 (film 4 heeft `nieuw_erf4.js` en `teken_erf4.js`, die elkaar al overlappen: daar is niets veranderd).
- **Interne aanroepen via `_erf*`.** `erwtenplant` roept `_erfBloem` en `_erfPeul` aan, `peul` roept `_erfErwt` aan: een film-eigen `erwt()` of `erwtBloem()` met een andere aanroep (Geschiedenis van de biologie, Landbouw 3, Hormonen 3) breekt het recept dan niet.
- **Licht/donker:** vakjes, lijnen, tekst en stamboomsymbolen komen uit `C` (`C.fill`, `C.line`, `C.text`), zodat het lichte palet van de lessen werkt. Ingevuld = `C.text` (ook in de lichte stand het sterkste contrast). Witte bloemen krijgen in de lichte stand een donkerdere rand (`_erfRand`).
- **`metaText` zet kopjes in hoofdletters:** geen genotype in `kopBoven`/`kopLinks` (bv. 'vader Gg' wordt 'VADER GG').
- **`kleurModelDeutan` werkt op canvaspixels** zonder transformatie: reken de plek om met `ctx.getTransform()` als er geschaald wordt (zie het testvel).
- **Leeuwenbek met een hexkleur:** de donkere tint was in film 3 `lighten(k, -0.2)` (een `rgb()`-tekst) en brak in `rgba()`; nu `_mixHex`.

## Bewust niet overgenomen

- Film-eigen decor en uitleg: `tuin`, `kamer`, `bloembed`, `aardbeiTafel`, `spreekkamerE6`, `wandbord`, `formulier`, `buisje`, `pincet`, `vliegLetter`, `reisChip`/`letterChip`, `stapKaart`, `stapKop`, `termKaartE`, `chMeta`, `tagKaart`, `verfKlodder`, `kleurstofMeter`, `genLijnen`: horen bij één scène.
- Simulaties met vaste uitkomst van die film: `SIM2`/`simKolommen`/`simT` (film 2), `f2Veld` (Mendels 929 erwten), `kinderen300`/`simRaster`/`simLegenda` (film 6): goed, maar ze rekenen een vaste kruising uit; voor een nieuwe film eerst algemeen maken (n, verhouding, seed).
- Schema's die al een bibliotheekversie hebben of te vrij zijn: `generatieLadder`, `zelfLus`, `meioseAa`, `staafAllelK`, `staafGenen`/`paarGenen`, `geslStaaf`, `gameetCel`, `gameetChip`, `chrom7` (chromosomen staan al als `cdChromosoom`, `chromatideX`, `cdChromatide`; een gen-band erop is een kleine uitbreiding voor een volgende ronde), `deletie`, `histModel`/`histVeel`, `oppModel`, `kansBalk`, `kansBoom`, `mtRingen` (hangt aan de ankers van `mitochondrionEcht`).
- `aardbei`/`aardbeienBak`, `telPop`: klein en filmgebonden; `telPop` is een telpictogram (mag eenvoudig blijven).
- De eenvoudige tekeningen uit `erf_lib.js` (`erwtPlant`, `vlinderbloem`, `leeuwenbek`, `muis`, `vlieg`, `rodeBloedcel` met o.A/o.B): de filmversies zijn uitgewerkter en goedgekeurd.

## Nog niet goed op het testvel (KAN, niet hersteld)

- Witte objecten (witte erwtenbloem, witte leeuwenbek, albino muis) hebben in de lichte stand weinig contrast; de muizenpop kent geen licht palet.
- Erwtenplant: de peulen zijn op plantgrootte klein (realistisch), een open peul aan de plant leest nauwelijks; gebruik `peul()` los in een close-up.
- Netvlies: de punten van de kegeltjes raken het pigmentepitheel niet (de staafjes wel); in het echt liggen ook de kegeltjes ertegen.
- Fruitvlieg: de poten staan wijd gespreid (zoals in de film goedgekeurd); van dichtbij oogt de vlieg wat spinachtig.
- Kruisingsschema: een gekoppelde dihybride kruising (A,B/a,b) krijgt van `genotypeVan` 'AaBb' zonder koppelnotatie; geef de tekst dan zelf mee via `cel`.
- Het gecombineerde kruisingsschema is nieuw als recept en nog niet door Kamiel gekeurd.

## Hersteld bij het inbouwen

- Peul open: het steeltje hing in de opening tussen de twee kleppen; het zit nu aan de bovenste klep.
- Kruisingsschema met fenotypepictogram: tekst en pictogram schoven over elkaar; de tekst staat nu hoger (cy − 0,2 vak).
- Leeuwenbek met een hexkleur (zie Lessen).
- Netvlies: de kopregel zei 'licht komt van boven'; in de tekening komt het licht van onder (door de zenuwcellen), zoals het hoort.

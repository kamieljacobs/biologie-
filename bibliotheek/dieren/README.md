# Dierenbibliotheek (uitknippoppen)

Alle dieren uit Evolutie v2, gebouwd als **uitknippop** (botten + delen, houdingen uit ElevenLabs-referentieplaten, bewegingen uit de literatuur) en door Kamiel goedgekeurd in de beeldbank (ronde 1–4, laatste keuring 23 okt 2026). Gebruik deze dieren in nieuwe films in plaats van zelf een dier te tekenen. Een dier dat de houding mist die een scène nodig heeft, eerst hier uitbreiden (testvel, keuren), nooit 'blind' gebruiken.

## Bestanden
- `lib_dieren.js` — alle dieren in één bestand (base.js, dier_basis.js, dieren_zoog.js, dieren_overig.js, wolf_pop.js, pop_*.js, achteraan pop_darwin.js; latere functies met dezelfde naam overschrijven de oude). Laad na `lib.js` en `lib_cast.js`; voor de micro-objecten ook `lib_bio.js` en `lib_evo.js`.
- `lib_micro_evo.js` — bacterie, plasmide, pilus, antibioticum, griepvirus, chromosoom(paar), geslachtscel, rode bloedcel, sikkelcel. De DNA-draad (`dnaDraad`) staat sinds 28 okt 2026 in `lib_bio.js`: laad die mee.
- `lib_bio.js` — volledige kopie van `../lib_bio.js` (bijgewerkt 28 okt 2026, verbeterronde 1).
- `testvel.html` — alle dieren naast elkaar (niet gelinkt, noindex). Nieuwe dieren of houdingen eerst hier.
- `testvellen/` — de testvellen per familie (overlay op de referentie-omtrek, gangstroken, zooms).
- `lessen/` — het recept: `lessen_pop.md` (wolf, het basisrecept), `lessen_pop_<familie>.md` (honden, katten, hoef, rept_chimp, vogels, zwemmers, darwin), `lessen_zoog.md`, `lessen_overig.md`, `lessen_micro.md`, opdrachtbrieven `WOLFPOP.md` en `POPFAMILIE.md`.
- Referentieplaten: `/referentie/dieren/` (zie `/referentie/README.md`); alleen om van te leren, nooit in een film.

## Aanroep en status
Alle dieren: `dier(ctx, x, y, s, { houding, t, kijk, a, … })`, x/y = grondpunt, `t` = fase van de beweging (0–1), `kijk` = ±1. Houdingen per dier staan in de tabellen van `lessen/`.

| Dier | Functie | Houdingen (o.a.) | Status |
|---|---|---|---|
| wolf | `wolf` | staan, lopen, draf, galop, huilen | goedgekeurd |
| hond (herder, teckel, mops, chihuahua …) | `hond(ctx, ras, …)` | staan, lopen | goedgekeurd |
| zeehond, muis | `zeehond`, `muis` | liggen/zwemmen, rechtop | goedgekeurd |
| muis in vachtkleur (zwart, albino, geel, grijs) | `muisVacht(ctx, x, y, s, { vacht, houding, kijk })` | zelfde als muis | goedgekeurd in Erfelijkheid 2 en 3 (28 okt 2026), ingebouwd 29 okt 2026; zelfde pop, eigen palet; albino met rode ogen |
| jachtluipaard, leeuw, tijger, huiskat | `jachtluipaard`, `leeuw`, `tijger`, `huiskat` | staan, lopen, galop, liggen, zitten | goedgekeurd (ronde 4, eigen plaat per dier) |
| paard, ezel, muilezel | `paard`, `ezel`, `muilezel` | staan, stap, draf, grazen | goedgekeurd (ronde 4) |
| edelhert, koe, nijlpaard | `edelhert`, `koe7`, `nijlpaard` | staan, lopen, grazen, burlen | goedgekeurd (koe ronde 3) |
| krokodil, hagedis, chimpansee | `krokodil`, `hagedis`, `chimp` | liggen, lopen | goedgekeurd |
| grondvink, merel, koolmees, zaadkraker, pauw, pauwin, zwaluw, vogel | idem | zitten, pikken, vliegen, waaier, lopen | goedgekeurd |
| haai, dolfijn, ichthyosaurus, bultrug | idem | zwemmen (`t`), röntgen | goedgekeurd |
| pakicetus, ambulocetus, rodhocetus, basilosaurus | idem | lopen, liggen, zwemmen | goedgekeurd |
| micro (bacterie, plasmide, pilus, antibioticum, griepvirus, DNA, chromosoom, geslachtscel, sikkelcel) | `lib_micro_evo.js` | | goedgekeurd |
| grote nandoe | `x9nandoe(ctx, x, y, s, o)` (`pop_darwin.js`, `NandoePop`) | staan, lopen (`t`, `vooruit`) | goedgekeurd (pop, 24 okt 2026) |
| negenbandgordeldier | `x9gordeldier(ctx, x, y, s, o)` (`pop_darwin.js`, `GordelPop`) | staan, lopen (`t`, `vooruit`) | goedgekeurd (pop, 24 okt 2026) |
| reuzenschildpad zadel/koepel | `x9schildpad(ctx, vorm, x, y, s, o)` (`pop_darwin.js`, `SchildPop`) | staan, nek `o.nek` −1 (omlaag) … 0 (half) … 1 (omhoog) | goedgekeurd (pop, 24 okt 2026) |
| kleine nandoe, Megatherium, Glyptodon, luiaard, spotlijster, zangervink | `x9*` in `films/evolutie/storyboards-v2/src/teken_evo9.js` | alleen staan (stilstaande omtrek, overgetrokken van `referentie/dieren/darwin/`) | **nog geen pop**: goedgekeurd als storyboardtekening (film 9), niet voor beweging; eerst als pop bouwen voordat een scène ze laat lopen |
| insecten als pop: mier, bij, kever, vlinder | `insect(ctx, soort, x, y, s, o)` (+ `insectZij`, `insectBoven`) | lopen, vliegen, rust, bestuiven (`t`) | gekozen door Kamiel (verbeterronde 1, variant C, 28 okt 2026) |
| insecten (lieveheersbeestje, berkenspanner, rups …), tak | in `films/evolutie/…/bron/src` (lib_evo.js en teken_evo*.js) | | goedgekeurd |

## Werkwijze voor een nieuw dier (kort)
1. Per dier één ElevenLabs-plaat: boven het realistische dier, onder hetzelfde dier in vlakke stijl (staan, stap, eventueel draf/galop/grazen/liggen, kop); 1 variant (±190 credits).
2. Staande figuur en kop vrijwel 1:1 overtrekken van de vlakke rij; skelet ijken op de realistische rij; maten en bewegingen uit bronnen (bij strijd wint de bron, nooit 'uit het geheugen').
3. Kleuren ontwerpen (3–4 rustige vlakken), nooit uit fotopixels.
4. Grote bewegingen in 6 tussenstanden testen; naden bij grote hoeken dichten met een meedraaiend tussendeel; delen binnen de romp bewegen met de romp.
5. Testvel naar Kamiel (ook tussenstanden), keuring in de beeldbank, daarna hier toevoegen met status.

## Verbeterronde 1 (28 okt 2026, gekozen door Kamiel)
Ingebouwd in `lib_dieren.js`: ezel (dunne staart met kwast), muilezel (vollere paardachtige staart), koe (variant C), leeuw (galop variant A), insecten (variant C, nieuw), basilosaurus (echt achterpootje), bultrug (staartvin), hagedis (gespreide poten met tenen), nijlpaard (vier tenen), zaadkraker (variant A, vorkvoet alleen voor de zaadkraker). De dieren-a-functies staan achteraan het bestand (ze hebben alle poppen nodig) en overschrijven de eerdere met dezelfde naam. Overzicht en stills: `../README.md` (sectie Verbeterronde 1) en `../verbeterronde-1/inbouw/`.

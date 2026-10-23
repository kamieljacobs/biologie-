# Dierenbibliotheek (uitknippoppen)

Alle dieren uit Evolutie v2, gebouwd als **uitknippop** (botten + delen, houdingen uit ElevenLabs-referentieplaten, bewegingen uit de literatuur) en door Kamiel goedgekeurd in de beeldbank (ronde 1–4, laatste keuring 23 okt 2026). Gebruik deze dieren in nieuwe films in plaats van zelf een dier te tekenen. Een dier dat de houding mist die een scène nodig heeft, eerst hier uitbreiden (testvel, keuren), nooit 'blind' gebruiken.

## Bestanden
- `lib_dieren.js` — alle dieren in één bestand (base.js, dier_basis.js, dieren_zoog.js, dieren_overig.js, wolf_pop.js, pop_*.js; latere functies met dezelfde naam overschrijven de oude). Laad na `lib.js` en `lib_cast.js`; voor de micro-objecten ook `lib_bio.js` en `lib_evo.js`.
- `lib_micro_evo.js` — bacterie, plasmide, pilus, antibioticum, griepvirus, DNA-draad, chromosoom(paar), geslachtscel, rode bloedcel, sikkelcel.
- `testvel.html` — alle dieren naast elkaar (niet gelinkt, noindex). Nieuwe dieren of houdingen eerst hier.
- `testvellen/` — de testvellen per familie (overlay op de referentie-omtrek, gangstroken, zooms).
- `lessen/` — het recept: `lessen_pop.md` (wolf, het basisrecept), `lessen_pop_<familie>.md` (honden, katten, hoef, rept_chimp, vogels, zwemmers), `lessen_zoog.md`, `lessen_overig.md`, `lessen_micro.md`, opdrachtbrieven `WOLFPOP.md` en `POPFAMILIE.md`.
- Referentieplaten: `/referentie/dieren/` (zie `/referentie/README.md`); alleen om van te leren, nooit in een film.

## Aanroep en status
Alle dieren: `dier(ctx, x, y, s, { houding, t, kijk, a, … })`, x/y = grondpunt, `t` = fase van de beweging (0–1), `kijk` = ±1. Houdingen per dier staan in de tabellen van `lessen/`.

| Dier | Functie | Houdingen (o.a.) | Status |
|---|---|---|---|
| wolf | `wolf` | staan, lopen, draf, galop, huilen | goedgekeurd |
| hond (herder, teckel, mops, chihuahua …) | `hond(ctx, ras, …)` | staan, lopen | goedgekeurd |
| zeehond, muis | `zeehond`, `muis` | liggen/zwemmen, rechtop | goedgekeurd |
| jachtluipaard, leeuw, tijger, huiskat | `jachtluipaard`, `leeuw`, `tijger`, `huiskat` | staan, lopen, galop, liggen, zitten | goedgekeurd (ronde 4, eigen plaat per dier) |
| paard, ezel, muilezel | `paard`, `ezel`, `muilezel` | staan, stap, draf, grazen | goedgekeurd (ronde 4) |
| edelhert, koe, nijlpaard | `edelhert`, `koe7`, `nijlpaard` | staan, lopen, grazen, burlen | goedgekeurd (koe ronde 3) |
| krokodil, hagedis, chimpansee | `krokodil`, `hagedis`, `chimp` | liggen, lopen | goedgekeurd |
| grondvink, merel, koolmees, zaadkraker, pauw, pauwin, zwaluw, vogel | idem | zitten, pikken, vliegen, waaier, lopen | goedgekeurd |
| haai, dolfijn, ichthyosaurus, bultrug | idem | zwemmen (`t`), röntgen | goedgekeurd |
| pakicetus, ambulocetus, rodhocetus, basilosaurus | idem | lopen, liggen, zwemmen | goedgekeurd |
| micro (bacterie, plasmide, pilus, antibioticum, griepvirus, DNA, chromosoom, geslachtscel, sikkelcel) | `lib_micro_evo.js` | | goedgekeurd |
| insecten (lieveheersbeestje, berkenspanner, rups …), tak | in `films/evolutie/…/bron/src` (lib_evo.js en teken_evo*.js) | | goedgekeurd |

## Werkwijze voor een nieuw dier (kort)
1. Per dier één ElevenLabs-plaat: boven het realistische dier, onder hetzelfde dier in vlakke stijl (staan, stap, eventueel draf/galop/grazen/liggen, kop); 1 variant (±190 credits).
2. Staande figuur en kop vrijwel 1:1 overtrekken van de vlakke rij; skelet ijken op de realistische rij; maten en bewegingen uit bronnen (bij strijd wint de bron, nooit 'uit het geheugen').
3. Kleuren ontwerpen (3–4 rustige vlakken), nooit uit fotopixels.
4. Grote bewegingen in 6 tussenstanden testen; naden bij grote hoeken dichten met een meedraaiend tussendeel; delen binnen de romp bewegen met de romp.
5. Testvel naar Kamiel (ook tussenstanden), keuring in de beeldbank, daarna hier toevoegen met status.

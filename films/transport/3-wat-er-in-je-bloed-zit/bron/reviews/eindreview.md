# Eindreview "Wat er in je bloed zit" (transport 3/6)

Slug `3-wat-er-in-je-bloed-zit`; vertelling 468 s (basis/havo 410 s), plus kaarten en drie vragen. 17 audiofragmenten genormaliseerd (loudnorm I=-15). Woordtijden met silalign; alle `q.on`/`q.at` nagerekend tegen `words/*.json` met een script (deelwoord-matches meegeteld: 'Hemoglobine' komt in s07 ook voor in 'hemoglobinemoleculen'; in s14 is 'rode' #1 "meer rode bloedcellen", daarom #2 voor de grafiek).

## Wat ik controleerde
- Drie rondes contactsheets (5 frames per alinea, vwo) plus losse stills en havo-stills (q10, s14, s16-einde, s21-begin): beeld bij tekst, timing op het woord, overlap, tekst buiten beeld, niets onder y = 900, geen tekst kleiner dan 24 px.
- Geen antwoord vóór het gezegd wordt: cold open toont alleen het gemengde zakje en de draaiende centrifuge (deksel dicht, geen lagen); H2-vraag toont alleen cellen die verdwijnen en verschijnen; citraatvraag toont citraat in het zakje maar geen calcium.
- Kleuren: bloed koraal/rood (TR), plasma lichte oker, zuurstof teal, goud voor focus; vwo-blok krijgt paarse balk via de speler.
- Looks: Schema voor buisje, zakje, centrifuge, skelet, kringschema, grafiek; Micro (bg 'micro') voor rode/witte bloedcellen, bloedplaatjes, hemoglobine, stamcellen, de wond en trombose.

## Wat ik verbeterde (na ronde 1–3)
- Syntaxfout (`-x ** 2`) die de hele SCENES brak.
- Zakje: rode laag liep buiten het zakje (fillRect-hoogte); zakje zakt nu in de centrifuge in plaats van ernaast.
- Cold open: zakje en centrifuge kwamen pas op "centrifuge" in beeld; nu op "Eerst". Donor/centrifuge overlapten.
- s04: twee onderschriften lagen even over elkaar (geel/kleur); nu een harde wissel net voor "kleur".
- s05: glucose-zeshoekjes stonden al bij "water" in beeld; nu op "Glucose". Lege-plasma-hack verwijderd.
- s06/s07: labels "dikker aan de rand" en "ijzer" vielen buiten beeld; verplaatst.
- s08: Sanquin-splitsing hoger/groter gemaakt, labels pas als de zakjes uit elkaar zijn.
- s11: kind-skelet verscheen pas op "kind" (leeg beeld); nu staat het skelet er al en kleurt het beenmerg op "kind". Volwassene: rood alleen aan beide uiteinden van dijbeen en opperarmbeen (was één kant).
- s12: stamcel-functie heette `stem(ctx, …)` en tekende niets; labels "stamcel/blijft stamcel" stonden buiten beeld.
- s13: dubbele `ctx.restore()` in miltVorm; cue "beenmerg" #2 en "Daarna" #2 gecorrigeerd.
- s14: bergje overlapte het kringschema; grafieklabel "plasma" botste met de y-astitel; cue "rode" #2 (#1 = "meer rode bloedcellen").
- s15: protrombine/trombine/fibrinogeen/fibrine-kader overlapte; nu twee regels met pijl trombine ↓.
- s16: trombose-stolsel groeit nu echt tot het vat dicht is, met stilstaande stroom; hemofilie-kader met X-chromosoom binnen het kader.
- s07: cue "Hemoglobine" #4 (het woord zit ook in "hemoglobinemoleculen").

## Open punten
- s01: de stroom in het slangetje naar het zakje is klein; eventueel dikker.
- s13: de afbraak-scène (lever/milt met drie pijlen) is vrij statisch; alleen de deeltjes bewegen.
- s17 (vwo): de overgang lever → buisje (op "Laat") laat een halve seconde de lever door het buisje heen zien (crossfade); acceptabel, kan met een korte fade naar leeg.
- s20: de citraatdriehoekjes en Ca²⁺-bolletjes zijn klein (Ca²⁺-tekst 24 px, minimum).
- Uitspraak-wachtlijst (niet getest, zie didactiek-review E): Sanquin, EPO (stem-invoer "ee-pee-oo"), fibrinogeen, fibrine, protrombine, trombine, hemoglobine, hemofilie, trombose, citraat, serum, ureum, calciumionen, X-chromosoom ("iks-chromosoom"), koolstofdioxide ("koolstofdie-oxide").
- Donatie-interval 56/122 dagen niet gecontroleerd op sanquin.nl (zie docentdeel).

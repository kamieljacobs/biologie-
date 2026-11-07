> Volledige tekst van C10 Tekenkwaliteit bij `films/PROMPT_v10.md` (kopie van https://claude.ai/artifact/S3P5sQcLVpbGufeScVyhoo, 24 okt 2026, door Kamiel goedgekeurd).

# Promptvoorstel tekenkwaliteit (v10, Part C)

Oct 24, 2026 · @Kamiel

Voorstel: Part C van de prompt krijgt een hoofdstuk **Tekenkwaliteit** met één algemene methode en vier receptkaarten (dieren, micro, organen, planten). Het bundelt wat Evolutie v2 ons leerde: 25 tekenfouten werden op het testvel gevangen, maar 44 beeldfouten glipten pas bij het contactblad door.

Wat ter goedkeuring ligt: de regels hieronder. Na je akkoord gaan ze als C10 in de prompt (v10) en verhuizen de bijbehorende kandidaten in `WERKWIJZE-LESSEN.md` naar 'Verwerkt in prompt'. De dierenbibliotheek zelf staat al in `bibliotheek/dieren/` met status per dier.

## C10.1 Algemene methode

Elk getekend object volgt dezelfde vijf stappen, in deze volgorde.

1. **Bibliotheek eerst.** Zoek het object in `bibliotheek/` (dieren, `lib_bio.js`, castboek). Staat het er met status 'goedgekeurd' én met de houding die de scène nodig heeft: gebruiken, niet opnieuw tekenen. Mist de houding: eerst de pop uitbreiden en keuren, nooit 'blind' gebruiken.
2. **Bronnen voor maten en beweging.** Lengtes, verhoudingen, lagen en bewegingen komen uit tekstbronnen (literatuur, determinatie, anatomie), genoteerd in de lessen. Bij strijd tussen plaat en bron wint de bron. Nooit uit het geheugen.
3. **Referentie om van te leren.** Een ElevenLabs-plaat laat vorm, houding en kleurvlakken zien; Claude tekent zelf na met canvas (C10.2). De plaat komt nooit in een film.
4. **Testvel vóór de film.** Nieuw object of nieuwe houding eerst op het testvel: overlay op de referentie-omtrek, tussenstanden, zooms van gewrichten en naden. Kamiel ziet ook de tussenrondes.
5. **Keuring en registratie.** Kamiel keurt in de beeldbank; daarna gaat het object de bibliotheek in met status, aanroep, houdingen en een lessenbestand.

Vaste tekenregels voor alle categorieën:

- Kleuren ontwerpen: 3–4 rustige vlakken per deel, nooit uit fotopixels (dat geeft 'camouflage').
- Eén silhouetrand voor het hele object, interne naden onzichtbaar (anders lijkt elk deel een sticker).
- Echte maat ten opzichte van de rest van de scène (mens, mops, baby, broodje): schaal uit de bron, controleren op het contactblad.
- Grote bewegingen in 6 tussenstanden testen; hoeken via de kortste weg mengen.

## C10.2 ElevenLabs-referenties

Een referentieplaat mag bij elk object waarvan vorm of beweging moeilijk is (dieren, planten, organen, insecten); één variant per plaat, ±190 credits. Zonder plaat tekenen mag bij eenvoudige vormen die een bron volledig beschrijft (een virusdeeltje, een chromosoom).

| Plaat | Wanneer | Inhoud |
| --- | --- | --- |
| Modelblad + vlakke rij | altijd bij een dier | boven het realistische dier in zuiver zijaanzicht, onder hetzelfde dier vlak (staan, stap, eventueel draf/galop/grazen/liggen) |
| Kopplaat | bij elke opmerking over een kop of gezicht | kop van opzij: dicht, open bek, oren plat |
| Fasenplaat | bij een beweging die de scène echt toont | 8 fasen, zelfde schaal, verre poten donkerder |
| Kruisdoorsnede of lagenplaat | micro en organen | de echte lagen in volgorde (zie C10.4) |

Controle van elke plaat, vóór je eruit overtrekt:

- Leg de maten naast de bron (schofthoogte, romplengte, botverhoudingen). AI-platen hebben bekende fouten: te lange rashonden, hoogpotige krokodil, te lange onderarm, verkeerde galopvolgorde, per figuur een andere schaal.
- Een fasenplaat is alleen een vormcontrole per beeld, geen tijdlijn: de volgorde komt uit de literatuur.
- Neem de vlakke rij vrijwel 1:1 over voor staande figuur en kop (Kamiel: 'vrijwel identiek'); ijk het skelet op de realistische rij.
- Bewaar de plaat in `referentie/<categorie>/` met een regel in `referentie/README.md`.

## C10.3 Receptkaart dieren (uitknippop)

Elk dier in een film is een uitknippop uit `bibliotheek/dieren/` (aanroep `dier(ctx, x, y, s, {houding, t, kijk})`). Een stilstaande omtrek mag alleen als het dier in de scène niet beweegt. Basisrecept: `lessen_pop.md` (wolf), per familie `lessen_pop_<familie>.md`.

- **Skelet**: botlengtes uit staan, ijkpunten uit de bron (schofthoogte, elleboog op borsthoogte, teen- of zoolganger). Poten met IK: voeten staan altijd op de grond.
- **Gang**: steunvoet vast in de wereld (glijden = 0), volgorde en duty uit de literatuur (stap lateraal, draf diagonaal, galop met zweeffase). Bij stoppen zet elke poot nog één keer neer.
- **Zachte huid**: gewichten bij schouder, heup, nek en staart; delen binnen de romp bewegen mee met de romp (anders bolt de buik).
- **Tekenvolgorde**: eerst één lichte silhouetrand van alle delen, dan de vlakken; nabije voorpoot achter de borst; verre poten warm-donkerder, niet naar navy.
- **Kop**: per dier een kopplaat en een kop-testvel (patroon uit het logboek: 5 van 8 opmerkingen gingen over koppen). Kaak altijd tekenen; oog in eigen schaal.
- **Vacht**: pieken weinig en lang, alleen op gekozen stukken omtrek.
- **Vogels**: vleugel vast aan het lijf met de omtrek langs de flank; een losse waaier op een schouderpunt leest als los.
- **Doorzichtig**: eerst op een los canvas, dan met alpha erop (anders schemeren delen door elkaar).

## C10.4 Receptkaart micro (bacterie, virus, DNA, cel)

Realistisch op micro betekent: de echte lagen in de echte volgorde. Bron: `lessen_micro.md`, objecten in `lib_micro_evo.js` en `lib_bio.js`.

- **Lagen tellen**: gramnegatieve bacterie = buitenmembraan, wand, spleet, celmembraan; griepvirus = envelop (dubbellaag), M1-laag, RNP's; eicel = zona, spleet met poollichaampje, cel. Schrijf de lagen eerst uit de bron op, teken dan.
- **Eén DNA-functie overal** (`dnaDraad`): touw met donkere kern onder 6 px, echte dubbele helix met ongelijke groeven vanaf 6 px. Nucleoïde, plasmide en losse stukken zien er dan overal hetzelfde uit.
- **Inhoud binnen het membraan**: plasmiden, organellen en ribosomen geclipt binnen de binnenste membraanlijn; alleen wat de cel echt verlaat gaat zichtbaar door het membraan.
- **Membraan gebogen**, cytoplasma met weinig, kleine, rustige deeltjes; geen korrel op de achtergrond.
- **Moleculen** met een herkenbare structuurvorm (glucose als ring, ATP met drie fosfaten, eiwit als keten die vouwt, mRNA als sliertige enkele streng).
- **Schaal** in beeld met voluit geschreven eenheid ('micrometer', niet 'µm' of 'MM' in metalabels).
- Valkuil in de code: `_mix` uit `lib_cast.js` geeft `rgb()`; gebruik `_mixHex` als je daarna nog `rgba()` maakt.

## C10.5 Receptkaart organen en lichaam

Een lichaam is altijd een castpersonage met `lib_anatomie.js`: organen op hun echte plek en in echte verhouding (de maag niet te laag, zie film 2b). Losse organen komen uit `lib_bio.js`.

- **Plek en maat uit een anatomische bron**, gecontroleerd met een overlay op een anatomische referentieplaat; ook de maat van voorwerpen naast het lichaam (broodje, beker).
- **Doorsnede in lagen** zoals bij micro: darmwand = slijmvlies met vlokken, onderslijmvlies, spierlagen (kring en lengte), buitenlaag; vat = drie wandlagen.
- **Proces echt laten gebeuren**: geen schema-ovaal maar een herkenbaar orgaan met zijn eigen beweging (peristaltiek, klep die sluit, blaasje dat versmelt).
- **Labels direct bij het deel**, geen wijslijnen; alleen labels op een plaat die Kamiel anatomisch goedkeurde.
- Nieuw orgaan: eerst referentieplaat (vooraanzicht én doorsnede), dan testvel met overlay, dan keuring en `lib_bio.js`.

## C10.6 Receptkaart planten en ongewervelden

Planten en insecten volgen de bouw uit een determinatie- of morfologiebron. Bron: `lessen_overig.md` (orchidee, pijlstaart, slak, berkenspanner).

- **Plant als geheel op ware schaal** (één functie, bv. `orchideePlant`): bladstand, bladscheden, waar bloemen of vruchten vastzitten. Blaadjes en vruchten zitten vast aan de plant, nooit los ernaast.
- **Perspectief**: een slakkenhuis in windingen die naar een top lopen, een grotere winding vóór een kleinere; geen platte schijf.
- **Insecten**: drie lichaamsdelen, zes poten aan het borststuk, vleugels in de stand van de soort (pijlstaart schuin naar achter bij zweven); draairichting op canvas controleren.
- **Bewegende vleugels** in 8 slagfasen op het testvel.
- **Bekend zwak** (eerst verbeteren als het nodig is): orchideeblad nog schematisch, koolmees op een stam staat los van de schors.

## C10.7 Controle na het bouwen

Na elke bouw kijkt een frisse reviewer (niet de maker) het contactblad na; in film 1–8 vond die 5–9 MOET-punten per film die de maker zelf miste. Vaste checklist per still:

- [ ] Lees de ondertitel: laat het beeld precies dit zien, op dit moment (dag/nacht, aantal, verschil zichtbaar)?
- [ ] Kloppen de onderlinge maten (mens, dier, voorwerp)?
- [ ] Staat elk label naast zijn deel, niet over een tekening, label of de rand?
- [ ] Is het beeld op t = 0 van de alinea al gevuld (vooral na een vraag of hoofdstukwissel)?
- [ ] Beweegt een dier met een gang uit de bibliotheek, zonder glijden?
- [ ] Ligt alle inhoud binnen het membraan?

Elke gevonden fout gaat in `films/logboek/fouten.jsonl`; na elke ronde `foutenpatronen.py`.

## Wat jij beslist

- [ ] C10.1–C10.7 akkoord als nieuw hoofdstuk in Part C (prompt v10), of per onderdeel aanpassen.
- [ ] Frisse beeldreview ná het bouwen als vaste stap (C10.7) in plaats van 'als er helpers zijn'.
- [ ] Stilstaande omtrek blijft toegestaan voor dieren die in de scène niet bewegen (C10.3). Zo niet, dan moeten ook de stilstaande Megatherium, Glyptodon, luiaard en spotlijster van film 9 een pop worden (±800 credits extra).

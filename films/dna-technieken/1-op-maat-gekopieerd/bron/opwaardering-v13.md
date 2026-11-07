# Op maat gekopieerd 2.0 — lijsten voor Kamiel (beeld-remake, 31 okt 2026)

## (a) Twijfelscènes (gebouwd met mijn beste keuze)
| Scène | Wat ik koos | Alternatief |
|---|---|---|
| H3 (s17–s24) | verdieping als vwo-blok: havo slaat het over, VWO-balk + 'verdieping' in beeld | de oude knop 'Sla de verdieping over' terug (niet in de FILMDATA-speler) |
| s17, s25 | gesproken 'Dit deel is verdieping.' en 'Kort samengevat, voor iedereen:' laten staan (tekst blijft) | wegknippen op de woordtijden (gratis): vwo-blok begint dan met 'De eerste kopieën …', samenvatting met 'De eerste kopieën lopen …' |
| Opening, H1 | bovenbouw zonder personage in beeld; alleen in H5 Noors hand met de micropipet (de onderzoeker) | Noor of Bilal (stagiair forensisch) helemaal in beeld aan de labtafel |
| s02 | 'een paar honderd' als 14 DNA-draden in een zoomcirkel, daarna chromosoom 12 | een teller met stippen zoals 1.0 |
| s30 | 'zestig tegen een miljard' als zee van 4000 stippen (1 stip = 250.000) met een zoom op één stip (één hokje = 100 moleculen) | de 'zee met 60 blauwe stippen' uit 1.0 (die was niet op schaal) |
| s41 | Sp en B: vWA gelijk, TPOX verschilt (getallen uit het practicum) | een profiel zonder casuspersonen, zodat het practicum niets verklapt |
| s31 | plateau: de twee oorzaken uit de tekst als kaartjes | — (zie vragen: bronnen noemen ook andere oorzaken) |

## (b) Herinspreeklijst
Geen. (Mogelijk, alleen als Kamiel dat wil: niets; de twee 'verdieping'-zinnen zijn te knippen, niet in te spreken.)

## (c) Vragen over inhoud
- Plateau (s31): de film noemt 'te veel templates per polymerase' en 'strengen op maat plakken weer aan elkaar'. Bronnen onderbouwen beide, maar zijn het niet eens over de hoofdoorzaak (ook uitputting en Taq-verval worden genoemd). Laten zo?
- Het practicum `tools/dna-profielen/` speelt nog de 1.0-film met eigen engine en `narration.mp3`. Moet het practicum de nieuwe film tonen (bv. insluiten met een link), of blijft het daar 1.0?
- Echte vWA-allelen zijn deels TCTG-herhalingen; de film (en het practicum) houdt het bij TCTA. Prima als model?

## (d) Voor de bibliotheek
- `gelFoto` (teken_pcr.js): gelfoto zoals in het practicum, log-as 330 → 40 bp met labels; `gelElektroforese` in lib_bio.js heeft een vaste as 200–12.000 bp. Voorstel: `gelElektroforese` een optie `bpBereik` geven.
- `streng` (rechte ladder met puzzelbasen en losse strengen, d2Base/d2Rug) en `brug` (waterstofbruggen als gouden streepjes; `baseBruggen` is bij deze schaal onzichtbaar klein).
- `bordStreng`/`bordGids`/`bordMap` (strengenmodel PCR: lange producten, op maat).
- `heteBron` (Macro: hete bron met bacteriematten), `huidschilfer`, `pipetpunt`, `strBlok`/`product` (PCR-product met STR).

## (e) Wat veranderde, per scène
- Algemeen: eigen 'Labjournaal'-look en speler → FILMDATA-straat (snelheid, Vragen aan/uit, Havo/Vwo, review), Part C-kleuren, palet B voor DNA, geen wijslijnen, geen korrel; take in 35 alinea's geknipt (tekst gelijk).
- s01: gel als in het practicum (M50, Sp, NC; zelfde as), band 172 bp, labels direct bij de baan.
- s02: `pcrBuisje` uit de bibliotheek; zoomcirkel met DNA-draden en chromosoom 12 (`cdChromosoom`) met het vWA-stuk; ± 770.000 × zo lang.
- s03 titel: groot PCR-buisje.
- s04: lege baan 'te weinig'; `thermocycler`; PCR-uitleg; rij 'in het buisje'.
- s05: template-draad, doorlopende zoom naar de ladder (puzzelbasen) met TCTA-haken; teller × 16.
- s06: strengenbord met primers op hun plek vóór en achter de STR; één plek in al het DNA.
- s07: polymerase (`polymeraseAchter/-Voor`) op de ladder; hete bron + Thermus (`bacterieEcht`); `vrijNucleotide`; buffer met Mg²⁺; vraag met leeg primerkaartje.
- s09/s09b: tweeluik zonder/met primer; alleen het stuk tussen de primers.
- s10–s16: Micro-ladder met stappenbalk en thermometer (toont 95/57/72 °C op het genoemde moment); bruggen breken; gewoon enzym ontvouwt (`eiwitVouw`), Taq niet; primer past/valt af; verlengen met aanvliegende nucleotiden; 5′/3′; primers wijzen naar elkaar; 2 × na één cyclus.
- s17–s25: strengenbord (model uit 1.0, nieuwe tekening): cyclus 1–3 met cyclusteller, rafelige lange producten, streng op maat groen, raster '2 van de 8'; samenvatting.
- s26–s31: turflijst, lineaire grafiek, schaar met kruis, verdubbelen, log-grafiek, 2¹⁰ en 2³⁰, stippenzee met zoom, plateaugrafiek.
- s32–s35: rek met de zeven practicumbuisjes; vWA-gel met band in NC; hand met micropipet, huidschilfer en druppeltje in zoomcirkels; 'niet te vertrouwen'; schoon; nieuwe pipetpunten.
- s36–s41: bloedspoor op glas; templates en wolk op maat; samenlopen tot één band; product met de hele STR; 16/14; 164 verder; chromosomen van vader/moeder; profiel Sp tegen B.
- Eindkaart: de vier 'onthoud'-zinnen van 1.0.

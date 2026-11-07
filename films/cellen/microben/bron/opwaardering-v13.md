# Opwaardering naar prompt v13: Wat groeit er op je boterham?

29 okt 2026, zonder keuring (B14), versie 1.0 naar 1.1. Niets opgenomen, geen ElevenLabs gebruikt; dit zijn de lijsten voor Kamiel.

## (a) Herinspreeklijst (niet doen zonder OK)

Reden bij alle negen: de stem noemt een castpersonage bij naam (Noor, Teun, mevrouw Visser; bovenbouw: namen niet in stem of beeld, B4). Alleen de zinnen met de naam, geknipt en opnieuw ingesproken; eerst proberen op de woordtijden te knippen waar de zin het toelaat (de ondertitel noemt de naam ook).

| Alinea | Naam in de stem | Tekens | Geschatte credits |
|---|---|---|---|
| s01 (cold open) | Noor, Teun | 199 | ± 200 |
| s05 | Noor, Visser | 284 | ± 280 |
| s11 | Noor | 85 | ± 90 |
| s15 | Teun | 116 | ± 120 |
| s18 | Noor | 198 | ± 200 |
| s26 | Noor, Visser | 247 | ± 250 |
| s30 | Noor | 73 | ± 75 |
| s33 | Noor, Teun | 242 | ± 240 |
| s39 (recap) | Noor, Teun | 389 | ± 390 |

Totaal 9 van 29 alinea's, ± 1.830 tekens, ± 1.850 credits (1 take per alinea, eleven_v4). De vier vraagkaarten met 'Noor' (q02, q12, q27, q31) staan alleen als tekst; hun naam is een tekstwijziging in `film.py`, geen opname. Ook de footer van de pagina noemt de personages (zie vraag 2).

## (b) Vragen over nieuwe aanpak of inhoud

1. Namen: 'Noor', 'Teun' en 'mevrouw Visser' zijn ook de verhaalfiguren van de film (raadsel: vergeten boterham). Wil je de namen uit de stem (lijst a), of mogen hoofdpersonen met een eigen naam blijven als ze meer dan een rol zijn? Zonder naam wordt het 'een leerling', 'haar zusje', 'de docent'.
2. De footer onder de film ('Personages: Noor, Teun en Mevrouw Visser (castboek)') staat niet in beeld; mag die blijven of ook weg?
3. De beeldbankbacterie heeft een oker wand (bankkleur), de film had teal-grijs voor bacterie. Eén bacteriekleur voor de hele site is de regel; laat ik het zo?
4. Het flagel van de beeldbankbacterie lichtte in de oude tekening goud op bij 'zweepdraad'; dat kan de beeldbank niet. Alleen het label blijft. Flagel-highlight in de bibliotheek wanneer je dat wilt.
5. Nieuw object voor de bibliotheek (niet gedaan): tweedeling van een bacterie met nucleoïde die zich verdubbelt. Nu in `miBacterie` van de film (twee gehalveerde `bacterieEcht`-cellen met een krimpende overlap; recept in teken_mi.js). Wil je dit als `bacterieDeling` in `lib_bio.js`?
6. s38 (Fleming, remmingszone rond Penicillium) blijft bovenaanzicht met de eigen schaal (`miSchaalBoven`): de beeldbankschaal heeft vaste zones rond schijfjes, geen schimmelplek met een lege ring. Een eigen variant in de beeldbank?
7. Schimmel, hyfen, brood, trommel, zakje, paddenstoel, voetschimmel, virus (griep: RNP-segmenten; verkoudheid: capside) en schaalladder blijven eigen tekeningen: er is geen beeldbankobject voor. `schimmelGist` heeft soort 'schimmel' (Rhizopus) en 'brood'; de scènes s09 en s10 zijn daar ruimer en met zoomcirkels opgezet, dus een omzetting is een andere aanpak. Wil je dat?
8. Openstaande KAN-punten uit `reviews/review_beeld.md` (bv. s18 label '10 MIN' over de zoomrand, s30 doosje 'antibioticum' over Noors hand) zijn niet aangeraakt: dat is geen v13-regel.

## (c) Wat ik veranderde

Zie `info.md` onder 'Versie 1.1'. Per scène:

| Scène | Wijziging |
|---|---|
| s10, s11 (hyfe, spore) | kernen paars blijven (kern), maar niet meer in het eigen lavendel: vaste kernkleur `MI.kern` |
| s14 | gistcel = `schimmelGist` (wand, vacuole, kern, knoplitteken); label 'knop' hoger zodat het de cel niet raakt |
| s18, s19 | petrischalen = `petrischaal` (3/4-aanzicht, agar, kolonies als bultjes, deksel open bij 'lucht', plakband erover); bacterie in de zoomcirkel van s19 = `bacterieEcht` |
| s20 | E. coli = `bacterieEcht`, groter (700 px); labels direct bij hun onderdeel; DNA, plasmide en membraan krijgen een gouden stippelrand, wand en ribosomen lichten goud op |
| s22 | bacterie = `bacterieEcht` (kernloos, grijs DNA); kern van de eigen cel blijft paars |
| s23 | tweedeling opnieuw getekend met dezelfde cel: groeit, nucleoïde verdubbelt, kerf, twee dochters; cel groter (400 px) |
| s25, recap (s39) | kleine bacteriën = `bacterieEcht` |
| s26, s28, s33 (telefoon) | petrischaal uit de beeldbank |
| s29 | RNA van verkoudheids- en griepvirus teal (RNA-ruggengraat), niet meer paars; schaalladder: gistcel uit de beeldbank |
| s32 | bacterie = `bacterieEcht` met goud oplichtende wand en ribosomen; label hoger |
| s38 | bovenaanzicht blijft (eigen `miSchaalBoven`), verder ongewijzigd |

Bewust niet gewijzigd: script, takes, woordtijden, vragen, timings, speler, REVIEW en datum in index.html. Alle 104 contactstills van de nieuwe en de oude versie zijn pixel voor pixel vergeleken: alleen de hierboven genoemde scènes veranderden (37 stills in 13 scènes); de rest is identiek.

## Uitgevoerd 30 okt 2026 (versie 1.2)

Kamiel (27 okt 2026, keuze 2 in `films/UITVOEREN-CELLEN.md`): namen eruit, personages blijven in beeld. Vraag 1 en 2 hierboven zijn daarmee beantwoord; vraag 3 (oker bacterie) blijft zo.
- Stem: in de negen alinea's van lijst (a) alleen de zinnen met een naam opnieuw ingesproken en in de bestaande take geplakt (10 stukken, s39 in twee delen), 900 credits; zie `stem/herinspreek-2026-10-30.json`.
- Vervangers: Noor → 'een leerling' / 'de leerling', Teun → 'haar broertje' / 'het broertje' / 'hij', mevrouw Visser → 'de biologiedocent' / 'de docent'; s11 'Kan ze die eraf snijden?' → 'Kun je die eraf snijden?' (ook q12 en optie b).
- Vraagkaarten q02, q12, q27, q31, de inleiding (lead), het docentdeel (opbouw cold open en H1) en de footer zonder castnamen.
- Beeld: alleen de cue van het broertje in s01 (`q.on('broertje')`); verder geen beeldwijziging.


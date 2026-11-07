# Filmbrief — Een burger zonder koe: eiwit van de toekomst

| Veld | |
|---|---|
| TOPIC | het werk van een levensmiddelentechnoloog in de eiwittransitie: waarom minder dierlijk eiwit (rendement van voer naar vlees, land), eiwitkwaliteit (essentiële aminozuren, het beperkende aminozuur, verteerbaarheid), van erwt tot vezel (eiwit uit de erwt halen, denatureren en textureren met extrusie), en wat er nog bij moet (vitamine B12, ijzer, zout op het etiket), met kort de nieuwe bronnen insecten en kweekvlees |
| AUDIENCE | havo/vwo bovenbouw, oriëntatie op studie (Wat word jij? · Voeding en diëtetiek, film 3); dicht het gat in havo 4 § 7.7 *Voedselproductie* ('efficiëntie plantaardig tegenover dierlijk voedsel'); ook extra film bij thema Voeding (neemt *Het eten van de toekomst* mee) |
| NIVEAU | havo en vwo, één versie, havo-taal; geen vwo-blokken; één rekenstukje (van honderd gram voereiwit naar drie gram vleeseiwit) met de som op het scherm |
| LENGTH | content decides, richtwaarde ± 6–7 min spraak (± 850–1000 woorden) |
| USE | beide |
| SERIES | `films/vervolg/REEKS-voeding.md` (reeksbrief voor film 1–2; aanvulling voor deze film in `werk/REEKSBRIEF-voorstel.md`) |
| CENTRAL PUZZLE | Een bonenburger heeft evenveel eiwit als een hamburger. Is hij dan net zo goed? (startvraag uit vervolg.html) |
| DAILY-LIFE HOOK | Noor (16) loopt een dag mee in een proeffabriek bij een levensmiddelentechnoloog (nieuw personage, werknaam Lars) die een burger van erwteneiwit ontwikkelt; aan het eind proeft ze hem. |
| LEAVE OUT | wat eiwit is en de twintig/negen aminozuren opbouwen (*Wat zit er in je eten?*, één zin terug), enzymen en vertering (*Knippen op maat*, één zin terug bij denatureren), energie per trofisch niveau uitrekenen (*Waarom zo weinig roofdieren?*, één zin terug), broeikasgas per kilo (*Eén aarde*, hooguit één beeld), fermentatie en schimmel in een vat (*Bacteriën als fabriek*), supplementen in het algemeen (*Supplementen en superfoods*), merknamen, oordeel over vlees eten of over boeren, ultrabewerkt voedsel als discussie, algen (geen geopende bron) |
| VOICE | Roos, eleven_v4 |
| CHECKPOINT | twijfelscènes op een blad voor Kamiel (regels.json V1) |
| NOTES | Opbouw goedgekeurd door Kamiel (31 okt 2026, planning 3a 'volgens voorstel'): H1 Waarom minder vlees? Van voer naar vlees in getallen · H2 Eiwit is niet gewoon eiwit: aminozuren en verteerbaarheid · H3 Van erwt tot vezel: eiwit uithalen en structuur geven · H4 Wat er nog bij moet: B12, ijzer, het etiket en het eten van de toekomst. 'Nieuw' t.o.v. de lesstof: het werk van de levensmiddelentechnoloog, een vleesvervanger ontwerpen. Bouwt op *Wat zit er in je eten?*, *Knippen op maat*, *Waarom zo weinig roofdieren?*, *Eén aarde*, *Bacteriën als fabriek*. |

## Overlap (grep, 31 okt 2026)
- *Wat zit er in je eten?* (Voeding 1, H3): twintig aminozuren, negen essentieel, 'het essentiële aminozuur dat het eerst op is, bepaalt hoeveel eiwit je kunt bouwen', 'plantaardig voedsel bevat alle negen, maar van één of twee weinig', 'graan + peulvrucht vullen elkaar aan', 'vlees, zuivel, ei, soja en quinoa hebben alle negen in een goede verhouding', meten met aminozuren in het bloed (q19). **Grootste overlap.** → Deze film herhaalt dat in één zin met terugverwijskaartje en gaat verder met wat nieuw is: verteerbaarheid (eiwit dat niet in je bloed komt), stoffen in peulvruchten die vertering remmen en door verhitten verdwijnen, en hoe een technoloog dat meet en oplost (mengen, verhitten). Het woord 'beperkend aminozuur' is nieuw, maar sluit aan op 'het eerst op is'.
- *Waarom zo weinig roofdieren?* (Ecologie 5, s-slot): 'van alle energie in het voer komt maar ongeveer drie procent in het vlees; een akker met graan of bonen voedt meer mensen'. → H1 gebruikt het **eiwit**-rendement (rund ± 3 %, kip ± 20 %; Shepon 2016) en het landgebruik per gram eiwit; energie niet opnieuw uitrekenen; terugverwijskaartje.
- *Eén aarde* (Ecologie 3, q16): rundvlees tegenover bonen in broeikasgas per kilo. → Geen broeikasgas in de stem; hooguit één terugverwijskaartje.
- *Knippen op maat* (Voeding 3): denatureren is blijvend, 'net als een gekookt ei'. → H3 bouwt erop: hier is denatureren juist gewenst (eiwit ontvouwt en plakt in lange strengen); aminozuren blijven, verteren gaat vaak beter.
- *Bacteriën als fabriek* (Biotechnologie 1, q25): schimmel als vleesvervanger in een vat. → Niet herhalen; hooguit in beeld als één tegel in H4.
- *Supplementen en superfoods* (Voeding 7, q-B12): B12 zit bijna alleen in dierlijke producten; vegans een supplement. → H4 zegt het vanuit de technoloog (verrijken van het product, en waarom B12 er niet vanzelf in zit: alleen bacteriën maken het). Terugverwijskaartje.

## Trekking mutaties (scripts/dobbelsteen.py, 31 okt 2026)
- Eerste trekking (`--zaad vd4-eiwit`): Variant A klassiek · Variant B kleine mutaties **perspectief** en **camerabeweging** · Variant C grote mutatie **raadsel** (de film begint met een vraag die pas aan het eind sluit). **Geschrapt** volgens proefregel P1: een raadsel is een vorm om het concept heen (0 van 1 gewonnen, patroonronde 25 okt: 'vormen eromheen 0 van 7'); de startvraag is bovendien al een raadsel, dus C zou van A alleen in volgorde verschillen. Eén keer opnieuw getrokken (zaad weggelaten, zoals dobbelsteen.py voorschrijft).
- Herloting (zonder zaad, 31 okt 2026; niet reproduceerbaar, daarom hier letterlijk): Variant A klassiek, volgt het plan · Variant B kleine mutaties **rol van het personage** en **voorbeeld** · Variant C grote mutatie **kijker-speelt-mee** (de kijker doet het werk van de vakpersoon en die handeling is het concept). P1-toets: past, want het werk van de levensmiddelentechnoloog ís kiezen en afwegen (welke eiwitbron, welke bewerking, wat erbij); de kijker ontwerpt de burger en elke keuze is een begrip uit de film. Geen verdere herloting.
- Uitwerking B: rol = Noor is de ontwerper die steeds een eerste voorstel doet, Lars de keurmeester die het toetst; voorbeeld = vegetarische 'kipstukjes' (reepjes) in plaats van de burger, omdat vezels daar het meest opvallen; de startvraag houdt de bonenburger.
- Proefregels uit `films/logboek/regels.json`: P1 (zie hierboven), P2 (elke misconceptie een vraag; Lars een eigen beurt; het woord 'levensmiddelentechnoloog' valt), V1 (alleen twijfelscènes naar Kamiel).

## Leerdoelen (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen waarom dierlijk eiwit meer voer en land kost dan plantaardig eiwit: van het eiwit in het voer komt maar een klein deel in het vlees terecht (rund ± 3 %, kip ± 20 %), de rest wordt afgebroken; en dat een koe ook gras eet dat mensen niet kunnen eten;
2. uitleggen dat eiwitkwaliteit afhangt van de essentiële aminozuren én van de verteerbaarheid, en dat het beperkende aminozuur bepaalt hoeveel eiwit je ermee kunt bouwen (graan weinig lysine, peulvrucht weinig van een ander);
3. uitleggen waarom eiwit uit peulvruchten minder goed verteerbaar kan zijn (stoffen die enzymen remmen) en hoe verhitten dat verbetert;
4. beschrijven hoe een technoloog eiwit uit een erwt haalt (malen, oplossen in basisch water, neerslaan bij een zure pH) en er met verhitten, druk en afkoelen vezels van maakt (denatureren, extrusie);
5. uitleggen waarom een vleesvervanger niet vanzelf vitamine B12 en goed opneembaar ijzer bevat, wat verrijken is en waar je op het etiket op let (ijzer, B12, zout);
6. van insecten en kweekvlees zeggen wat het is en hoe ver het is (meelworm sinds 2021 toegelaten in de EU; kweekvlees nog niet te koop in de EU; stand vlak vóór het inspreken nagaan) — niet getoetst.

## Misconcepties
1. Evenveel gram eiwit op het etiket = even goed eiwit → puzzel, H2 vraag, recap.
2. Een dier maakt van zijn voer vooral vlees; vlees is een zuinige manier om eiwit te maken → H1 vraag.
3. Plantaardig eiwit mist essentiële aminozuren (al in Voeding 1) → H2, in de vraagopties als afleider.
4. Verhitten maakt eiwit kapot of waardeloos → H3 vraag.
5. Een vleesvervanger bevat vanzelf alles wat vlees bevat (B12, ijzer); op het etiket telt alleen het aantal gram eiwit → H4 vragen.
(Kweekvlees en insecten zijn informatie in H4, geen misconceptie met eigen vraag: de stand verandert snel en de film houdt het bij twee zinnen.)

## Te beslissen door Kamiel (twijfelblad)
- Nieuw personage Levensmiddelentechnoloog Lars (± 35, labjas, haarnetje in de proeffabriek); Noor als stagiair.
- Nieuw decor proeffabriek (extruder, bakken met erwten) of de bestaande decors gebruiken.
- Namen in de stem (reeks noemt Hanneke en Joost wel; prompt v13 B4 zegt geen namen).
- Overlap met *Wat zit er in je eten?* H3.
- Kweekvlees en insecten: stand van zaken op 31 okt 2026 vlak voor het inspreken opnieuw nagaan.

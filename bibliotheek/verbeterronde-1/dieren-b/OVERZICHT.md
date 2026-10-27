# Overzicht dieren-b (27 okt 2026)

Alle varianten zijn overschrijvingen die ná lib_dieren.js / lib_micro_evo.js geladen worden (functie of spec in place); oude aanroepen blijven werken. De vogel-A/B-bestanden bevatten bovenaan hetzelfde blok VOGELVOET (patch van VogelPop.teken: voeten als vork); dat blok hoeft er maar één keer in.

| obj | nieuw/bestaand | A | B | bewust niet |
|---|---|---|---|---|
| nijlpaard | bestaand | omtrek en vlakken glad (trapjes van het overtrekken weg), roze flankvlak en halsplooien → donkere huidschaduw, nagels lichter | glad + plooien als smalle donkere lijnen + bruinroze buikband (onderkant) | geen nieuwe poten/knie (rig ongewijzigd); kop en gapen niet aangeraakt (door Kamiel gecorrigeerd) |
| hagedis | bestaand | poten ±35 % en tenen ±55 % dikker; lengtes en gang ongewijzigd | – | geen B (prioriteit laag); lengte, kleur en gang (goedgekeurd) niet aangeraakt |
| grondvink | bestaand | lengtestreepjes i.p.v. ronde vlekken, bruinbeige borst, staart 84→60, pikken met de hals, voeten als vork | compacter silhouet (grote kop, korte ronde romp, horizontaal), donkerder, fijnere streping, staart 54; zelfde pikken en voeten | kopframe (sb2-keyframes) niet verplaatst; snavelformule ongewijzigd |
| merel | bestaand | voeten als vork, verre vleugel zichtbaar in de vlucht + lijfgolf, staart 104→90, pikken met de hals | – | kleur en kop niet aangeraakt |
| koolmees | bestaand | staart korter, witte eindvlek weg, lichte buitenranden; vlucht en voeten als merel | – | kop- en borsttekening (goedgekeurd) niet aangeraakt |
| zaadkraker | bestaand | houding pikken + o.kraak (kop knikt), voeten als vork | – | snavel open/dicht niet gebouwd (kegelsnavel is één vorm; zou de snavelformule raken) |
| pauw | bestaand | waaierhoek groeit met o.waaier (34°→300°), poten in pronk met hielknobbel en dikker loopbeen, voeten als vork | – | overgang zijaanzicht→vooraanzicht niet gebouwd; sleep in rust ongewijzigd |
| pauwin | bestaand | hals ± half zo lang en dikker, kleurzones (bruine bovenhals, groene onderhals, donkere borst), kop ×1,2 | hoen-silhouet: zeer korte hals die in een volle borst overloopt, rechter romp, kop ×1,3, gespikkelde rug | geen referentieplaat gemaakt (budget/tijd); poten en gang ongewijzigd |
| dolfijn | bestaand | grotere uitslag van de staartsteel, sterkere kanteling en dikkere staartvindoorsnede | – | geen echte bovenaanzicht-staartvin (kan het rig niet) |
| bultrug | bestaand | staartuitslag ±60 % groter, borstvinzwaai ruim 2× | – | vorm en kleuren niet aangeraakt |
| pakicetus | bestaand | oog hoger tegen de schedelrand met wenkbrauwboog, staart aan de basis dikker | – | poten (voor/achter verschil) niet aangeraakt |
| ambulocetus | bestaand | voorpoten in zwemmen naar achteren tegen de buik, snuit ±20 % slanker, oorschelp | – | lopen en staan ongewijzigd |
| rodhocetus | bestaand | voorpoot met elleboog en brede hand, achterpoot ±20 % langer met bredere voet, lijfgolf | – | geen staartvin toegevoegd (bron: had er geen) |
| basilosaurus | bestaand | o.zoom tekent een gouden vergrotingscirkel met het pootje; functie geeft poot-anker terug | – | lijf ongewijzigd |
| bacterie-plasmide | bestaand | basaal lichaam + haak op de wand per flagel, flagellen verspreid langs de cel, plasmide groter met vrije zone, richting de polen | – | kleuren en lagen van de wand ongewijzigd |
| griepvirus | bestaand | 8 losse staafjes met spleetjes (waaier vanaf de pool), polymerase-stipje aan het uiteinde, stekels in lengte en kanteling gevarieerd | – | 7+1-dwarsdoorsnede niet letterlijk; waaier is zijaanzicht-keuze |
| chromosoompaar | bestaand | diepere en bredere insnoering + lichtere centromeerzone; nieuwe optie verdubbeld (X-vorm) en spreid | – | kleuren en bandering ongewijzigd |
| rode-bloedcel-sikkelcel | bestaand | midden lichter i.p.v. donker, glanslicht weg, rand iets donkerder; zijaanzicht ongewijzigd | – | sikkelcel niet aangeraakt |
| schimmelGist | nieuw | schematisch: los gistcel met knop-stadia (kern rekt door de hals en deelt), mycelium op een ondergrond met septa en drie sporangiofoor, broodplak met plekken | in omgeving: hyfen groeien het broodkruim in, sporen zweven weg, gist als groepje met kettinkje, brood met vergrotingscirkel naar de draden | geen referentieplaat (niet nodig); geen Penicillium-penseel; basis schimmelDraad uit 32c3 niet letterlijk overgenomen |

## Ronde 2 (27 okt 2026): C-varianten na de blinde beoordelaar

| obj | C | grond |
|---|---|---|
| pauw | C = oud (winnaar) + voeten als vork met hielknobbel in het zijaanzicht (uit A) + waaier die als smalle bundel op de stuit oprijst en dan uitwaaiert (veren houden hun lengte, draaipunt schuift omhoog) | combineren; X/Y opnieuw gerenderd met dezelfde (aangepaste) uitsnede als C, zie bron.md |
| schimmelGist | C = B (winnaar) + de grote gistcel met losse knopstadia uit A | combineren |
| bultrug | C = A + staartvin als verkorte horizontale lobben (puntig, inkeping, gekartelde achterrand), oude doorsnede-spies korter | NOAA Fisheries (A) + NRCM (B) |
| basilosaurus | C = A + echt pootje (dij, knie, onderbeen, voet, teentjes) i.p.v. vinlap, ook in de zoomcirkel | Gingerich e.a. 1990 Science (A) + NYIT (B) + Encyclopedia of Alabama (B) |
| chromosoompaar | C = A + chromatiden overlappen bij één gezamenlijke centromeerknoop, armen spreiden meer (echte X) | Lodish fig. 19-17 (A) + Newcastle University BMS-wiki (B) |
| nijlpaard | C = B (winnaar) + neusgat als spleet bovenop de snuit | ADW Hippopotamidae (A) + SF Zoo docents (B) |
| hagedis | **geen C** | zijwaartse poten maar door één bron gesteund (Reilly & Delancey 1997, A, andere soort); geen geopende bron voor vijf tenen met klauwtjes. Waarschijnlijk heeft de beoordelaar gelijk, maar dit is een voorstel aan Kamiel (vraagt ook een rig-aanpassing) |
| zaadkraker | **geen C** | De beoordelaar heeft waarschijnlijk gelijk: oiseaux-birds en Wikipedia (allebei niveau C) noemen de borst van het mannetje rood. Maar de enige niveau-A-bron, eBird, zegt alleen 'red hood and tail'. Niet ≥ 2 bronnen met ≥ 1 A, dus een voorstel aan Kamiel. Mijn recept.md noemde de borst al rood, de tekening (goedgekeurd) niet |

Ook gecorrigeerd: in ronde 1 heb ik Wikipedia als niveau B opgegeven (grondvink, pauwin); volgens films/BRONNEN.md is dat niveau C. Zie bron.md.

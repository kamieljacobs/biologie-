# Storyboard bi4 — Van letters naar vorm (fase A, 25 okt 2026; bijgewerkt na Kamiels keuring van de twijfelscènes)

Echte scènes op voorlopige woordtijden (`fakewords.py`, ± 8 min 16 s gesproken). Code: `teken_bi4.js`, `scenes_bi4.js`; bouwen met `bouw_bi4.sh`. Keyframes: `blad/img/<id>.webp`. Look Schema met cast; Micro (blauwzwart, geen korrel) voor het eiwitmodel, altijd met label 'model'. Envelop rechtsboven als doorlopend UI-element ('gemeten · nog geheim', vanaf H4 'open').

Het eiwitmodel (`eiwit3D`) is sinds de keuring een **echt eiwit: PDB 5DFR**, dihydrofolaatreductase van *E. coli* (Bystroff & Kraut 1991). 159 kralen op de echte Cα-posities (`teken_bi4_5dfr.js`, gemaakt met `werk/pdb/maak_eiwit_js.py` uit het openbare bestand in openmm/openmm), vier α-helices en acht β-strengen uit de Cα-geometrie (klopt met PDB-101), lint door de echte posities; holte = actieve plek in de kloof; de Met20-lus (9–24) is de onzekere lus die in H4 anders ligt en bij binding sluit. Gedraaid zodat de holte naar de kijker wijst. Label overal 'model · naar PDB 5DFR'. Vouwen = morph van de bindingsrichtingen (losse kluwen → helices draaien op → ruime vorm → echte vorm). Reeksobject (codeScherm, aaKralen …) letterlijk uit `bi1/teken_bi1.js`; de uitlijning in H3 is een rij aminozuurkralen (okertinten) rond de echte volgorde 37–57.

| id | hoofdstuk | look | wat in beeld / wat beweegt |
|---|---|---|---|
| title | Titel | Schema + Micro-paneel | Titel links; rechts een paneel waarin de keten vouwt en de helices en strengen als vlakken verschijnen. |
| s01 | Cold open | Schema (afdeling) | Dr. Kim houdt zelf de verzegelde envelop vast (geen collega, Kamiel akkoord) ('gemeten · nog geheim'); Sam komt binnen op 'Sam' met het briefje; groot briefje met 30 letters typt zich uit; Micro-paneel: de keten vouwt op 'vouwt'; tag 'computer?'. |
| s02 | Titel | Schema | Titelkaart. |
| s03 | H1 | Micro | Ribosoom ('Van DNA naar eiwit') maakt een kralenketting; op 'vouwt' vouwt die tot het model; tags eiwitstructuur, holte; substraat (oker vijfring) glijdt in de holte; antistof-Y grijpt een vorm; kaartjes *Alles versneld*, *Antistoffen op maat*. |
| s04 | H1 | Micro + zoomcirkel | Bacterie ('ziekteverwekker') met zoom op het enzym; medicijn (teal ring) glijdt in de holte; kaartje *Sleutel, slot en dosis*; op 'ander' licht één kraal in de holte koraal op; vraagteken. |
| q05 | H1 | Schema | Vraagkaart. Juist: b |
| s06 | H1 | Micro | Twee enzymen naast elkaar: links zoals eerst met medicijn; rechts steekt de zijketen van het nieuwe aminozuur (Leu28) de holte in, de holte vernauwt, het medicijn schuift eruit (kruis). Tags 'bouwt de holte niet terug', 'het lab wil de vorm precies weten'. |
| s07 | H2 | Schema | Terugblik ('In het lab maakten ze…'): kristalplaatje (zoom op een rooster van gelijke eiwitten), röntgenbundel door het kristal (bundelvanger) → diffractiepatroon: regelmatig rooster van stippen, zwakker naar buiten, vult zich van binnen naar buiten → vorm teruggerekend; '1958 · myoglobine'; cryo-EM-rooster (koperen gaas, gaatjesfilm, losse eiwitten in ijs in willekeurige stand), 'scherp sinds ± 2013'. |
| s08 | H2 | Schema | Kalender slaat maanden om ('jaren werk'), 'dure apparaten'; twee balken op schaal: ± 250 000 gemeten (een streepje) tegen > 200 000 000 bekend; Sam denkt: 'elke vorm proberen?'. |
| q09 | H2 | Schema | Vraagkaart. Juist: a |
| s10 | H2 | Schema | Boom van mogelijkheden waaiert uit (3 per schakel) tot hij het vlak vult; de som bouwt op: 3¹⁰⁰ ≈ 5 × 10⁴⁷ met de 47 nullen uitgeschreven, 10¹² per seconde, ± 10²⁸ jaar tegen heelal ± 10¹⁰ jaar, 'vereenvoudigd'; 'het eiwit zelf vouwt veel sneller'. |
| s11 | H3 | Schema | Sam wijst naar het scherm (reeksobject codeScherm uit bi1, tab 'AlphaFold · Google DeepMind'); 20 aminozuurkralen (echte volgorde 34–43 … 86–95) typen zich in, voortgangsbalk 'zoekt verwante eiwitten', vijf verwante rijen schuiven eronder (verschillen koraal), dan twee gouden kolommen die samen veranderen; kaartje 'uitlijnen · film 1'. |
| q12 | H3 | Schema | Vraagkaart. Juist: c |
| s13 | H3 | Schema + zoomcirkel (Micro) | Links de twee kolommen (K–E, E–K, R–D, D–R …); in de zoom liggen Lys38 en Glu90 tegen elkaar in de echte vorm (zoutbrug 2,7 Å), letters wisselen mee; op 'schets' verschijnen teal contactlijnen; op 'minder' verdwijnen vier rijen en de lijnen vervagen. |
| s14 | H3 | Schema | Stapel voorbeeldkaarten (volgorde + vorm, '> 100 000 · PDB'); lus gok → vergelijk → bijstellen: de koraal gok schuift steeds dichter op de witte echte vorm, sneller op 'herhaalde'; doorgestreept stappenplan, 'patronen uit de voorbeelden'. |
| s15 | H3 | Schema | Scorebord CASP (2016 < 40, 2018 ± 60, 2020 ± 90, mediaan 92,4), groene stippellijn 'zo goed als meten'; tags 'blind · sinds 1994', 'net gemeten, nog geheim'; Nobelprijs 2024 met naamkaartjes Hassabis, Jumper, Baker zonder portret. |
| s16 | H4 | Micro | Het model kleurt van oker naar betrouwbaarheid (blauw zeker → oranje onzeker; legenda); 'bijna alles blauw'; de envelop gaat open, een kaartje schuift eruit. |
| q17 | H4 | Micro→Schema | Vraagkaart. Juist: a |
| s18 | H4 | Micro | De meting (wit) valt over de voorspelling: kern en holte vallen samen, de oranje Met20-lus ligt anders (koraal stippellijntjes); staafjes 'per eiwit · voorbeeld' met gemiddelde ± 90; tags 'geen vaste vorm?', 'te weinig hints?', 'de kleur zegt niet welke'. |
| s19 | H4 | Micro | Het model trilt sterker ('echt eiwit beweegt'); medicijn bindt en de Met20-lus sluit even over de holte; vragen die lastig blijven; kaart 'AlphaFold 3 (2024): ook met kleine moleculen · nog steeds een voorspelling'; stempel 'hypothese'; voorspelling → kristal → 'meten en testen'; '± 200 miljoen voorspellingen · gratis'. |
| s20 | Recap | Schema | Briefje → voorspelling met meting → open envelop; 'zeker: klopte' / 'onzeker: niet'; drie kaartjes; stempel 'toets het'. |
| s21 | Recap | Schema | Opleidingskaarten (hbo HAN, bachelor Radboud → master Wageningen); drie werkplek-iconen; Sam en Dr. Kim, Kim wijst op 'samen'; kristalplaatje 'samen met het lab'. |
| s22 | Eindkaart | Schema | Vijf kernzinnen (eerste ingekort om in beeld te passen), haak 'welke vraag stel jij aan een eiwit?'. |

Menselijk moment: de envelop (cold open en het openen in H4); het moment van toetsen is het concept.

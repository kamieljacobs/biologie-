# Lessen: familie klein2 als uitknippop (Ecologie v2, 29 okt 2026)

Bestanden: `src/pop_eco_klein2.js` (motor `EcoK2`, laadt ná `pop_vogels.js`), testvel `src/tv_pop_eco_klein2.js` (`TV_pop_eco_klein2`), werkmap `out/werk_klein2/` (kopieën van de platen, `omtrek.py` → `omtrek.json`, `raster.py`, `meet.py`), renders `out/<laadlijst>/` (symlink `out/k2/`), film `out/film_klein2/klein2.mp4` + `.gif` (`render_film.py`).

Render: `cd /root/ecopop && python3 render.py dieren_zoog,dieren_overig,wolf_pop,pop_honden,pop_katten,pop_hoef,pop_vogels,pop_darwin,pop_eco_klein2,tv_pop_eco_klein2 TV_pop_eco_klein2`. De melding `berkenspanner is not defined` komt uit dieren_overig.js (niet uit dit bestand).

## Aanroep (s = px per cm, x/y = grondpunt, kop naar rechts, kijk = ±1)
| functie (korte naam) | houdingen / opties |
|---|---|
| `ecoGaai` (`gaai`) | `staan`, `eikel` (staan met eikel in de snavel), `duwen` (t: bukken, 3× duwen, 2 tikjes grond, rechtop), `tak` (o.takDik in cm), `vliegen` (t), `hippen` (t), `pikken` |
| `ecoPimpelmees` (`pimpelmees`) | zelfde als de koolmees: `staan`, `tak`, `schuin`, `klampen` (met o.rot), `vliegen`, `hippen`, `pikken` |
| `ecoPissebed` | `zij` (standaard) / `boven`; t = loopfase; `vooruit: true` (steunpoten staan stil in de wereld); `steun: true` = groene stip op steunpoten |
| `ecoRegenworm` | `zij` / `boven` (S-spoor, o.buig); t = peristaltiek; `vooruit`; `anker: true` = gele stip op verankerde segmenten |
| `ecoDuizendpoot` | bovenaanzicht; t; `vooruit`; `steun` |
| `ecoLeverbotslak` | kruipen; t; `vooruit`; `huisHoek` |
| `ecoSteenvlieglarve`, `ecoEendagsvlieglarve` | `zij` / `boven`; `lopen: true` (driepootgang); eendagsvlieg: t = kieuwslag (3 slagen per t-eenheid) |
| `ecoMuggenlarve` | `zij` / `boven` (zwemslag) / `rust` |
| `ecoEikenblad` (`eikenblad`) | `stadium` 0..1, `hoek`; anker = midden van het blad |
| `ecoKlaver` (`witteKlaver`), `ecoHelm`, `ecoStruikheide`, `ecoGroveDen`, `ecoBerk`, `ecoZomereik` | `wind` 0..1 met `t` (wiegen, wortels blijven stil), `groei` 0..1; klaver ook `knol` (vergroot alleen de knolletjes) |

Schaal: zelfde als `wolf` in wolf_pop.js (s = px per cm, schofthoogte 80 cm). Vogels intern in eenheden (gaai 1 = 1,25 mm; pimpelmees 1 = 0,5 mm × 0,83), de wrapper rekent om.

## Maten (bron wint)
| dier/plant | maat | bron | plaat |
|---|---|---|---|
| gaai | 34 cm (32–36), vleugel 181 mm, 167 g | [BTO](https://bto.org/learn/about-birds/birdfacts/jay), [oiseaux-birds](https://oiseaux-birds.com/card-eurasian-jay.html), [birdfact](https://birdfact.com/birds/jay) (32–35, span 52–58 cm) | ok; pop gemeten 33,6 cm |
| | kruin wit met zwarte streepjes, zwarte baardstreep, blauw-zwart gestreept vleugelvlak, witte stuit, zwarte staart, blauwwit oog | oiseaux-birds | plaat klopt |
| | eikels in strooisel begraven, tot 3000 per maand; vlucht laag en golvend | oiseaux-birds | |
| pimpelmees | 10,5–12 cm (pop 11,5), span 17,5–20 cm; blauwe kap, witte wang, donkerblauwe oogstreep en halsband, geelgroene rug, blauwe vleugel met witte streep, gele buik met donker streepje, blauwgrijze poten | [Wikipedia Eurasian blue tit](https://en.wikipedia.org/wiki/Eurasian_blue_tit) | geen plaat |
| pissebed | tot 20 mm (pop 16 mm), 7 paar poten, 7 borst- + 6 achterlijfsegmenten, uropoden | [Wikipedia Porcellio scaber](https://en.wikipedia.org/wiki/Porcellio_scaber) | plaat telt 7 paar ✓ |
| regenworm | tot 30 cm (pop 20), Ø ± 1 cm, 100–180 segmenten (pop 140), zadel segment 31–37 | [Monaco Nature Encyclopedia](https://www.monaconatureencyclopedia.com/lumbricus-terrestris/?lang=en) | ok |
| | peristaltiek: golven lopen naar achter (tegen de bewegingsrichting in); kort/dik = verankerd (borstels uit), lang/dun = schuift; 0,1–0,2 lichaamslengte per cyclus | [Sogang 2016 (J. Bionic Eng.)](https://ispdl.sogang.ac.kr/bpdl/file/2016jbe.pdf), [Fox, Lander](https://lanwebs.lander.edu/faculty/rsfox/invertebrates/lumbricus.html) | |
| duizendpoot | *Lithobius forficatus* 18–30 mm (pop 25), kastanjebruin, volwassen 15 paar poten | [Wikipedia](https://en.wikipedia.org/wiki/Lithobius_forficatus) | plaat tekent ± 17 paar: fout, pop 15 |
| | retrograde golf (zwaai loopt van voor naar achter) bij duizendpoten, direct bij miljoenpoten | [Frontiers Neural Circuits 2021](https://www.frontiersin.org/journals/neural-circuits/articles/10.3389/fncir.2021.706064/full) | |
| leverbotslak | *Galba truncatula*: huisje 5–10 (max 12) mm hoog, 2,5–6 mm breed, getrapte bolle windingen, diepe naden, bruin, dun; brede platte tentakels | [cavac/Wikipedia](https://cavac.at/cavacopedia/Galba%20truncatula), [Mollusc Ireland](https://www2.habitas.org.uk/molluscireland/species.php?item=85) | **plaat fout**: tuinslak met oogsteeltjes en bol huis |
| steenvlieglarve | 5–35 mm (pop 22), 2 staartdraden, 2 paar vleugelschedes, kieuwbosjes onder het borststuk (Perlidae) | [EPA veldgids](https://19january2021snapshot.epa.gov/sites/static/files/2015-10/documents/macroinvertebrate_field_guide.pdf), [Waterloo](https://env-apps.uwaterloo.ca/ecology-collections/collections/benthic-invertebrates/common-stonefly-larvae) (8–30 mm) | ok |
| eendagsvlieglarve | 3–20 mm (pop 9, *Cloeon*), meestal 3 staartdraden, plaatkieuwen langs het achterlijf; Baetidae 7 paar | EPA; [DCRT mayfly ID](https://dcrt.org.uk/wp-content/uploads/2026/01/Mayfly-Identification-DCRT-Paul-Hancock-pdf.pdf) | plaat ± 8 kieuwen per kant |
| rode muggenlarve | 10–15 mm (pop 15), rood (hemoglobine), voor- en achterschuivers; zwemt met 'achtjes', grote zijwaartse bochten, kop zakt bij elke halve slag | [first-nature](https://www.first-nature.com/insects/d-chironomus-plumosus.php), [Brackenbury, J. Zool.](https://cambridge.org/core/journals/journal-of-zoology/article/swimming-kinematics-and-wake-elements-in-a-wormlike-insect-the-larva-of-the-midge-chironomus-plumosus-diptera/6CA7C52B547341AB4D7803DDB9E8C1C9) | ok |
| zomereikblad | 10–15 cm (pop 11), 3–7 paar ronde lobben, zeer korte steel, kleine oortjes | [VT Dendrology](https://dendro.cnre.vt.edu/DENDROLOGY/carddetail.cfm?ID=551) | ok |
| witte klaver | knolletjes klein en langwerpig, actief = roze/rood van binnen, ± 15 per plant, over de hele worteldiepte | [Organic Eprints 2017](https://orgprints.dk/id/eprint/31344/1/tn-wp5-root-nodules_final_2017.pdf) | **plaat**: knolletjes nauwelijks zichtbaar en bruin; pop roze, 3–4 mm, 18 stuks |
| helm | 50–120 cm, grijsgroene ingerolde bladeren, aar tot 30 cm, lange wortelstokken diep in het zand | [Ecomare](https://ecomare.nl/verdiep/leesvoer/planten/duinplanten/helm), [Wikipedia](https://en.wikipedia.org/wiki/Ammophila_arenaria) | ok |
| struikheide | 20–50 cm, schubblaadjes 2–3 mm, lila bloempjes | [earth.com](https://earth.com/plant-encyclopedia/Angiosperms/Ericaceae/calluna-vulgaris/en/) | ok |
| den/berk/eik (jong) | gekozen 1,8 / 2,4 / 1,6 m (jonge bomen, 5–8 jaar); geen bron gezocht voor de exacte hoogte | eigen keuze | |

## Wat anders was dan bij de wolf
1. **Gaai en pimpelmees zijn geen nieuwe rig**: ze gebruiken het zangvogelsjabloon (`VogelZang`) met eigen definities (`Z.DEFS.gaai`, `Z.DEFS.pimpelmees`). De pimpelmees is letterlijk `koolmeesDef` met andere kleuren, kop, staart en maat (geen plaat, de bron beschrijft het kleurpatroon).
2. **Dichte gaaienvleugel in schermrichting.** Het blauwe vlak op de dekveren via het vleugelvlak (`dekPatroon`) kwam in de dichte vleugel als een smalle verticale strook uit. Daarom een aparte laag `vlNa` die in schermrichting (pols → handpunt) tekent: roze schouderveren, blauw gestreept vlak, zwart met wit vlak. Bij de open vleugel blijft het patroon in het vleugelvlak.
3. **Eikel duwen** is een eigen houding (bothoeken, geen gang): snavelpunt volgt een voorgeschreven diepte, de eikel blijft na de eerste stoot in de grond (wordt bovengronds geknipt), 3 stoten tot 2,6 cm, daarna 2 tikjes met een groeiend aarde-heuveltje.
4. **Ongewervelden: gang met golven**, geen IK-ketens per gewricht: per poot een fase (pissebed golf van achter naar voor, duty 0,62; duizendpoot golf van voor naar achter, duty 0,5, links-rechts in tegenfase); steunvoet staat stil in de wereld (`vooruit`).
5. **Regenworm** is een rij van 140 segmenten met lengte ↔ dikte (volume gelijk: r ∝ 1/√k). De kop-x wordt numeriek geïntegreerd zodat verankerde segmenten echt stilstaan; de worm kruipt dan vanzelf ± 0,15 lichaamslengte per cyclus (past bij de bron).
6. **Muggenlarve**: kromming langs het lijf als functie van tijd (C-bocht die van kant wisselt + lopende golf), dan het lijf langs die kromming opbouwen.
7. **Planten** zijn procedureel (vertakkende wortels met een vaste seed, bladeren als vormen) met een `wieg`-functie die alleen boven de grond werkt (verplaatsing ∝ hoogte²).

## Fouten die ik zelf vond en herstelde
- Gaai: blauw vleugelvlak stond als smalle verticale strook (vleugelvlak-projectie) → aparte schermlaag. Vleugel zat te hoog (bovenrand boven de rug) → schouderpunt 7 eenheden lager.
- Gaai `duwen` via de pikken-houding stond schuin en vloog met de kop vóór de voeten → eigen houding vanaf staan.
- Gaai uit de vlucht-tabel: onderkant van de vleugel te licht (vaal wit vlak) → grijzer.
- Pissebed: poten te lang en kruisend (spinachtig) → kortere poten, kleinere pas (S 0,42 → 0,22 cm).
- Regenworm: rug en buik waren omgedraaid (normaal van het pad de verkeerde kant op) → normaal omgekeerd.
- Leverbotslak eerste versie: losse cirkels als windingen ('kralen'), daarna een mond aan de verkeerde kant → huisje als één omtrek met bolle getrapte windingen, mond onder (tegen de voet).
- Muggenlarve in zijaanzicht stond schuin en zweefde → lijf gedraaid naar de lijn kop–staart en op de grond gezet; segmentlijnen liepen schuin over het lijf (indexfout tussen boven- en onderrand) → loodrecht op de middellijn.
- Eikenblad: gaten werden zwart (fill van het clip-pad), nerfskelet donker → evenodd-vulling, bladmoes vervaagt naar licht.
- Klaver: honderden knolletjes (elke wortelpunt) → 18 per plant (bron ± 15), groter getekend; stelen te lang.
- Helm: het duin-zandpakket liep tot ver onder de grond → alleen het heuveltje boven het maaiveld.
- Bomen eerste versie: kale takken met een paar bladeren → zijtwijgjes met bladeren; den: naaldbosjes als waaiers van streepjes.

## Correctieronde 1 (feedback coördinator, 29 okt 2026)
- Gaai: kop 1,3× groter (± 1/3 van de lijfhoogte), lijf korter en minder plomp (sx 0,82, sy 0,76), staan en tak schuin rechtop (38–40°), staart iets opgetild. Baardstreep breed vanaf de snavelbasis schuin naar achter-onder; oog lichtblauw-wit, lager; kruin 4 stippels. Dichte vleugel: vlak blauw veld (2 tonen) met 5 fijne zwarte bandjes, één rustige witte vlek; het patroon 12 eenheden naar achter (de grotere nek dekte het af). Lengte blijft ± 34 cm.
- Bomen: gesloten kronen uit grote rustige bladmassa's in 3 tonen (`kroonVlek`), rustigere wortels (3 hoofdwortels, 2 niveaus). Den: etages/pluimen, oranje bovenstam. Berk: smalle kroon, hangende twijgjes, witte stam met zwarte vlekken. Eik: brede ronde kroon uit wolkmassa's, knoestige stam.
- Klaver: kruipende uitloper met knopen, wortels uit de knopen, 15 roze knolletjes; drietallige blaadjes (omgekeerd eirond) met lichte V; witte bolvormige bloemhoofdjes (lichte bloempjes rondom, bruinig onderaan).
- Regel: een kop die 'te klein' leest bij een vogel van een ander formaat zit in het sjabloon; schaal de kop (en snavelpunt TIP) los van het lijf in plaats van het hele dier.

## Wat de platen goed/fout hadden
- **Gaai**: houdingen en kleuren goed (verhoudingen, blauw vlak, witte stuit). De vluchtfiguur is een driekwartaanzicht van boven (vleugel naar de kijker), niet te halen met een zijaanzicht-rig.
- **Bodemdieren**: pissebed goed (7 paar). Duizendpoot heeft te veel poten. Slak is een tuinslak (fout, zie README). Regenworm gestrekt en samengetrokken goed, zadel goed.
- **Waterdieren**: goed; eendagsvlieglarve heeft op de plaat iets te veel kieuwplaatjes.
- **Planten**: de knolletjes van de klaver zijn nauwelijks te zien en bruin (fout); den, berk en eik kloppen in vorm, maar zijn op de plaat even hoog getekend.

## Algemene regels (ook voor andere families)
- Een patroon op een **dichte** vogelvleugel in schermrichting tekenen, niet in het 3D-vleugelvlak: de projectie (sin(phi ± eps)) knijpt het samen.
- Bij een **zeer klein dier** (< 2 cm) de wrapper in cm laten werken en lijndikten in cm (0,01–0,03); de silhouetrand is `1,1 / s` zodat die op elk zoomniveau 1 px blijft.
- Bij een golf-gang (veel poten) is 'steunvoet staat stil' alleen waar als de pas (S·duty) en de fase-vertraging per poot bij elkaar passen; de pas kleiner maken was het verschil tussen 'spin' en 'pissebed'.
- Een plaatfout die in de README staat (slak, knolletjes) eerst met een bron oplossen en op het testvel naast de plaat zetten met 'plaat (fout: …)'.

## Nog zwak
- **Gaai vlucht**: opgeheven vleugel leest als grijze waaier (zelfde zwakte als bij de vogels-familie: geen draaiing naar de kijker); het blauwe vleugelvlak is alleen in de neerslag goed te zien.
- **Leverbotslak**: huisje leest als getrapt en spits, maar de spiraal (windingen rond de as) is vereenvoudigd tot gestapelde bollen met schuine naden.
- **Bomen**: kroonvormen nu herkenbaar, maar de den leest wat als een spar (etages vrij dicht); prima als achtergrond.
- **Steenvlieglarve lopen** en **eendagsvlieglarve** van opzij: klein in beeld goed, ingezoomd zijn de poten wat stokachtig.

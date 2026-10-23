# Archief evolutie als bron voor de nieuwe reeks (8 films)

Pad: `films/archief-evolutie/`. Afkortingen: A1..A9 = archieffilm 1..9 (map `N-naam/bron/info.md`); `oef` = `N-naam/oefenen.json`; r. = regel in info.md (tenzij "html"). Alle archieffilms: Roos, eleven_multilingual_v2, 5/6 vwo, pre-Part C. Geen enkele bevat een Aziatisch lieveheersbeestje, ichthyosaurus, dolfijn-casus (alleen zeehond in A3 q3), hondenrassen, wilde kool, genenbank, plasmiden of bloem-bestuiver (alleen als [nieuw] zin in A6).

## Film 1 Wat is evolutie eigenlijk?
- Niet in archief: lieveheersbeestje (nieuw uitzoeken en bronnen zelf noteren).
- **A2** (Verrassend simpel): variatie meten (histogram snaveldiepte, d3_variatie), mutatie vs. recombinatie (d4/d5; r. 22), "mutatie ontstaat niet omdat het nodig is" (droog en nat jaar dezelfde varianten; docentdeel r. 81). Begrippen r. 57-66: populatie, variatie, mutatie, recombinatie, evolutie ("populaties evolueren, individuen niet").
- **A8** (Toeval): p/q-taal, allelbalk, "evolutie = verandering van p" (m2_intro; r. 21, 88). Tekenfuncties `alleleBar`, `marbles` (html 320, 319).
- **A1**: "I think"-boom en gemeenschappelijke voorouder (r. 25, 66-68) alleen als context.
- Vragen: A2 q2 (r. 42-46: verdeling schuift op mét variatie); A1 q3.
- Let op: A2 docentdeel r. 82 "Niet in deze film: Hardy-Weinberg, drift, seksuele selectie, soortvorming" - oude verdeling; in de nieuwe reeks anders.

## Film 2 Natuurlijke selectie (Daphne Major 1977)
- **A2 is de hoofdbron**: 1200 -> ~180 (Boag & Grant 1981, Science, afgerond), snaveldiepte gemiddeld ~9,4 mm, overlevers ruim 0,5 mm dieper; Tribulus cistoides; legsels 2-5 eieren; Malthus 1798 / Darwin las 1838 (r. 88-95). Overproductie-groeicurve d6 (r. 23), fitness = nakomelingen die zelf overleven (kleine tamme vink 4, grote sterke vink 0; r. 26), vier ingrediënten d11 (r. 26), drie misvattingen d17 (r. 29).
- Simulatie `SIM` (html 306; helpers makePop 272, makeSeeds 274, season 279, breed 296, cull 300, hist 302; seed 20261004): 120 getekende vinken (1 = ~10 echte), 9 % overleeft, gemiddelde 9,4 -> 10,7 mm; sterker dan werkelijkheid, moet label "simulatie" houden (r. 90, 158). Scènes: d7_droogte 469, d8_selectie 489, d9_erfelijk 509, d12_fitness 542 (html 2).
- **A9** (finale): fokkersvergelijking R = h² x S = 0,7 x 0,5 = 0,35 mm, voorspeld 9,75 gemeten 9,7; h² snaveldiepte 0,7 (lit. 0,7-0,9); model 1200 vinken N(9,4;0,9) -> 184 overlevers, 9,93 (r. 105-106, 124-126). `DAPHNE` html 266, `hist` 310, `meanMark` 311. Alleen vwo-verdieping.
- **A6** q1 fitness (r. 68, 75): "muis groot 3 jaar 2 jongen vs klein 1 jaar 12 jongen", juist C. Begrip "survival of the fittest" (Spencer 1864, Darwin 5e druk 1869; r. 123).
- Vragen A2: q1 (diepe snavels overleven; r. 36-40), q2 (verdeling schuift mét variatie), q3 (El Niño, omkering). A9 q1, q2. `oef`: A2 `volgorde-droogte-1977`, `indelen-vier-ingredienten`, `indelen-welke-denkfout`, `uitleg-jongen-1978`; A9 `grafiek-droogte-1977`, `puzzel-fokkersvergelijking`.
- Camouflage: A6 berkenspanner (zie film 3). A1 heeft vooral merel/biogeografie, niet selectie.
- Aandacht: A2 r. 158 "exacte waarden niet gecontroleerd"; A9 r. 161 184/9,93 (model) vs 180/9,9 (film); "9,9." duur-0 ondertitel verdwijnt (r. 160).

## Film 3 Vormen van selectie
- **A6 (Selectie van dichtbij) is bijna 1-op-1 de bron** (nu: opzet niet kopiëren). Model `run` (html 267), `SEX` (283), `hist` 329, `fitcurve` 330, `selPanel` 332; scènes fitnessScene 372, stabScene 403, splitScene 422, sexScene 442. Modelformules r. 100 (200 individuen, sd 0,03; gericht, stabiliserend w = 0,15 + 0,85 exp(-((x-0,5)/0,12)²), splitsend met max 60 vogels per zaadtype, seksueel 120 mannen, overleving exp(-(t/0,7)²), vaderkans ∝ e^(3t)).
- Casussen/getallen (r. 119-127): berkenspanner Manchester 1848 eerste zwarte, 98 % zwart in 1895 (Cook 2003), Clean Air Act 1956 -> < 5 % rond 2000 (Liverpool; curve gestileerd, geen meetreeks); predatie bevestigd (Majerus; Cook 2012; Kettlewell bekritiseerd). Geboortegewicht Karn & Penrose 1951: 13.730 geboorten, optimum ~3,6 kg (film zegt 13.000 en 3,5; r. 157). Zwartbuikzaadkraker Pyrenestes ostrinus, Kameroen (Smith 1993). Pauw: sleep ~1,5 m, Petrie 1991 (later bediscussieerd, Takahashi 2008). Darwin-citaat pauwenstaart: brief Asa Gray 3 april 1860 (Engels in beeld).
- Vragen A6 q1-q4 (r. 68-78) + `oef` (6 stuks, o.a. `grafiek-drie-vormen`, `indelen-vorm-selectie-drie`, `indelen-natuurlijk-seksueel`, `uitleg-pauwenstaart`).
- **Co-evolutie/bloem-bestuiver**: alleen als [nieuw] wachtlijsttekst A6 r. 169-171 (koekoek-karekiet wapenwedloop, Davies & Brooke 1988/1989; bloem en bestuiver als samenwerking; beeldidee koekoeksei tussen karekieteieren, label "co-evolutie: wapenwedloop"). Zelf bloem-bestuiver uitwerken. Uitspraak: karekiet = "karekiet"/"karrukiet", co-evolutie = "koo-evolutie".
- Aandacht: A6 r. 158 Darwin-citaat Engels; r. 159 `SEX.optimum` 0, k 3 klopt; r. 162 duur-0 ondertitel "De simulatie:".

## Film 4 De mens als selectiefactor
- **Antibioticaresistentie**: geen eigen film in archief. A6 `oef` `volgorde-resistentie` (5 stappen: variatie bestond al, antibioticum selecteert, ... "gerichte selectie generatie na generatie"); A6 begrip "gerichte selectie ... antibioticaresistentie" (r. 85); A6 r. 102 verwijst naar "het resistentielab" (extern, buiten de film; zie memory-area resistentielab). Plasmiden/horizontale overdracht: niet in archief.
- **Kunstmatige selectie**: A2 d15_duiven (html 2 r. 584; duivenfokker kiest langste staart; `pigeon` html 348), A2 begrip r. 66, A1 t15_stilte duivenfokkers (html 1 r. 726; `pigeon` 473). "Mechanisme hetzelfde als natuurlijke selectie" (A2 r. 66).
- **Inteelt/genenbank/hondenrassen/wilde kool**: niet in archief, behalve A8 [nieuw] inteelt (r. 165, 167: meer homozygoten, minder heterozygoten, allelfrequenties gelijk; staafdiagram AA-Aa-aa; "inteelt: andere verdeling, zelfde p"). Risico-uitspraak: homozygoten "homozie-goten", heterozygoten "heterozie-goten", inteelt (r. 170-171).
- A3 q3 (zeehond vs nijlpaard) gaat over verwantschap, niet over selectie.

## Film 5 Toeval en uitwisseling
- **A8 (Toeval) is de hoofdbron**; model `run` (html 262), Wright-Fisher: 8 runs N=20 (7/8 fixeren binnen 100 gen.; verwacht ~2,8N, ~55 gen.; Kimura & Ohta 1969) en N=2000; flessenhals 10 allelen -> 4 over; HW 2000 paringen P(A)=0,8 seed 8, afwijking < 1 % (r. 97, 118). Scènes driftScene 365, bottleScene 384, rekenScene 424, meetlatScene 438; `person` 313 (lijnfiguur zonder gezicht: r. 155 zegt stijlkaart wil gezichtjes, en Kamiel-eis: geen generieke poppetjes, castboek-figuren), `island` 314, `lines` 315, `marbles` 319, `alleleBar` 320, `punnett` 321.
- Getallen (r. 116-123): Pingelap tyfoon Lengkieki ~1775, ~20 overlevers, achromatopsie 4-10 %, dragers ~30 % (Sundin 2000; Sacks 1997); elders 1 op 30.000-50.000. Jachtluipaard huidtransplantaten (O'Brien 1985), flessenhals ~10.000 jaar geleden. Hardy en Weinberg 1908. Rood haar (4 % -> dragers 32 %, MC1R in werkelijkheid complexer: vereenvoudigd). Taaislijmziekte drager 1 op 30, incidentie 1 op 3.600-4.750 (NCFS/RIVM).
- Vragen A8 q1-q4 (r. 64-74), `oef` `indelen-drift-selectie`, `pijlen-flessenhals`, `puzzel-rood-haar`, `puzzel-pingelap`, `uitleg-meetlat`. [nieuw] examenvraag dragers onder gezonden = 2pq/(p²+2pq) = 0,32/0,96 = 1/3 (r. 164).
- Genenstroom: A7 simulatie met 10 % uitwisseling (zie film 6); vier krachten expliciet genoemd A8 q4 (selectie, drift, migratie, niet-willekeurig paren; mutatie).
- Heterozygotenvoordeel sikkelcel: NIET in archief (nieuw uitzoeken).
- Aandacht: A8 r. 152-153 (Samengevat-hoofdstuk start op vraagantwoord; "p is 0,5." 0,5 s in beeld).

## Film 6 Hoe één soort er twee wordt
- **A7 is de hoofdbron**. Model `run` (html 269), scènes soortScene 360, alloScene 380, isoScene 427, sympScene 440, ringScene 344; `horse` 322, `fish` 323, `frog` 324, `salamander` 313, `valley` 319, `ringPos` 320, `ringColor` 321, `meanGraph` 326, `animalDot` 325, `cross` 311.
- Casussen/getallen (r. 119-131): Mayr 1942 (werkt niet voor ongeslachtelijk/fossielen); muilezel 63 chromosomen, vrijwel altijd onvruchtbaar; Ensatina eschscholtzii ringsoort (Stebbins 1949, Wake 1997; ring niet volledig gesloten, 7 ondersoorten; Central Valley ~720 km); Victoriameer droog 17.000-15.000 jaar geleden, ~500 haplochromine cichliden, deels door oudere hybridisatie (Meier 2017), Pundamilia blauw/rood (Seehausen 1997/2008); polyploïdie: tarwe 6n, koolzaad allotetraploïd, aardbei 8n; simulatie: 2 x 100 dieren, optimum 0,3/0,7, 10 % uitwisseling, na 60 gen. verschil ~0,17 mét, ~0,37 zonder; hereniging 0 % vs 37 % paringen (model, seed 4).
- Vragen A7 q1-q4 (r. 65-75) met uitleg; `oef` `volgorde-allopatrisch`, `indelen-een-of-twee`, `indelen-isolatie`, `uitleg-cichliden`. Begrippen r. 82-91 (vóór/na de bevruchting; sympatrisch/allopatrisch).
- Hybride: muilezel (paard/ezel) volledig uitgewerkt. Paard/ezel in A7 q1.
- Aandacht: vraagnummering q4 (kikkers) vóór q3 (cichliden) (r. 160); card4 nooit getoond (r. 161); duur-0 ondertitels (r. 165); uitspraak muilezel = "muil-eezel", Ensatina "Ensatiena", Mayr "Mair" (r. 106, ook Kamiel-voorkeur).

## Film 7 Hoe weten we dat?
- **A3 (Hoe weten we dat?) is de bron** (walvis als rode draad). Tekenfuncties html 3: `whale` 309, `protoWhale` 317 (legs-factor), `limb` 327 (met inner `bone` 329), `sharkFin` 336, `flipperOutline` 340, `strata` 341, `dnaRow` 342, `icon` 343, `embryo` 352; scènes sedimentScene 392, limbScene 437, SCENE.e8_analoog 456, dnaScene 471 (= SCENE.e9_dna 482), SCENE.e10_nijlpaard 483, clockScene 492, SCENE.e14_stamboom 540 (cladogram), SCENE.e15_uitzoomen 559. Simulaties `CLOCK` html 266 (2 x 100 letters, 4 herhalingen), `DNACMP` 276 (seed 7, L=48), `run` 268, `derive` 277.
- Getallen (r. 91-99): Pakicetus ~50-49 Ma (Thewissen 2001), Ambulocetus 49-47 Ma (1994), Rodhocetus 47-46 Ma (Gingerich 2001), Basilosaurus 41-34 Ma, achterpoten enkele dm (Gingerich 1990); walvis-nijlpaard SINE-inserties (Nikaido 1999), splitsing ~55-50 Ma; walvisembryo achterpootknoppen dag 24-28, weg rond dag 48 (Thewissen 2006); eerste zoogdieren ~225-200 Ma, leven ~3,7-3,5 Ga; sedimentatielagen 52-44 Ma zijn illustratief ("simulatie" labelen).
- [nieuw] radiometrisch: koolstof-14 halveringstijd 5730 ± 40 jaar, tot ~50.000 jaar; walvisfossielen via argon-argon of omringende lagen (r. 165, 170); divergentie/convergentie (r. 166-167); uitspraak "koolstof veertien", "iezotopen", "divergentie/convergentie" klemtoon GEN (r. 172-177).
- Vragen A3 q1-q4 (r. 34-56), `oef` (5 stuks: `indelen-soort-bewijs-begrippen`, `indelen-homoloog-analoog`, `schema-vin-arm`, `volgorde-walvisfossielen`, `uitleg-twee-methoden`). Moleculaire klok: 2 % vs 4 % verschil -> 4 % ongeveer twee keer zo oud (q4).
- Niet in A3: hele film is vwo; radioactief verval alleen "gemeten", niet uitgelegd.
- Aandacht: A3 r. 184: Kamiel: "die lijntjes naar begrippen moeten sowieso weg" (geen wijslijnen, zie `films/BEELDAFSPRAKEN.md`); rudimentair-label nu direct onder de cirkel.

## Film 8 Stambomen lezen
- **A3** cladogram (e14_stamboom, html 3 r. 540: drie gedeelde kenmerken, "lees aan vertakkingen, niet aan volgorde van namen"; begrip cladogram r. 69) en homologie/analogie (haaienvin vs walvisvin; `sharkFin`, `limb`); `oef` `indelen-homoloog-analoog`, `schema-vin-arm`. Q2 en q3 (zeehond vs nijlpaard) bruikbaar als examenvraag.
- **A5**: vertakkingssimulatie met en zonder ramp (`treeRun` html 807, `drawTree` 1043, `uitScene` 1027; p = 0,12·(1 - n/30), code-commentaar zegt fout 0,08 en K 36, r. 164), `chimp` 1060, `animal` 866, `mensScene` 1082; formulering "chimpansee is geen voorouder maar een neef" (r. 165) controleren. q3 zoogdieren/dino's (r. 48-50).
- **A1** `sketchScene` html 1 r. 694 ("I think"-boom, Darwin 1837).
- Haai/dolfijn/ichthyosaurus (convergentie): haaienvin in A3; dolfijn en ichthyosaurus NIET in archief; binomiale naam, buitengroep, classificatie NIET in archief.
- A4 q4 / A3 e15: universele genetische code (r. A4 100).

## Algemene aandachtspunten
- Kamiel-voorkeuren in info.md: geen wijslijnen (A3 r. 184); "negentig" -> "neguntig" (A8 r. 172); muilezel -> "muil-eezel"; jaartallen als cijfers in archief (nu: "het jaar 1977" volgens recente voorkeur); `cue()` bij heropname.
- Alle archieffilms: één niveau (5/6 vwo), geen havo/vwo-blokken, woordtijden geschat, geen begrippen vóór 16 okt, vreemd gebouwd mp3-in-HTML. Hergebruik inhoud, niet structuur.
- Vraagkwaliteit: oude vragen zijn voorspelvragen met feedback per optie (goede bron voor nieuwe vragen). Docentdeel-uitspraken die in oude films fout/verschoven waren: A1 r. 172, 173 (inmiddels verbeterd).
- Huisstijl-afwijkingen oud: `person`/`portrait` poppetjes zonder gezicht; vervangen door castboek-personages.
- Een `vink()` of `walvis-skelet` functie bestaat niet. Wel: `check()` (vinkje; html 4: 359, 5: 846, 6: 318, 7: 310, 8: 312, 9: 308), `tile()`, `panel()`, `finch()` (html 1: 466, 2: 341, 3: 290, 9: 287; `finchB` 2: 361, `bigFinch` 9: 313), `pigeon()` (1: 473, 2: 348, 3: 297, 9: 294), `whale`/`protoWhale`/`limb` (3), `beetle` (html 1: 417), `moth` 6: 320, `trunk` 6: 321, `mouse` 6: 322, `bird` 6: 323, `seed` 6: 324, `peacock` 6: 325, `fox` 6: 328.

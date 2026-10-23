# Lessen tekenronde 2 · zoogdieren (23 okt 2026)

Bestanden: `src/dieren_zoog.js` (alle zoogdieren, laadt na teken_evo1..8), testvel `src/tv_zoog.js` (`TV_zoog`).
Renders: `out/zoog_oud/` (testvel zonder dieren_zoog), `out/zoog_nieuw/` (met), **oud en nieuw naast elkaar: `out/zoog_vergelijk/`**, alle scènes van film 3–8 met de nieuwe dieren: `out/zoog_scenes/sbN/` (+ contactbladen `blad0..2.webp`).

Render nieuw: `python3 render.py teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,sb8,dieren_zoog,tv_zoog TV_zoog`

## Wat maakte het verschil (input voor de tekenregels in de volgende prompt)

1. **Eén skeletmotor voor alle viervoeters, niet per dier een vaste tekening.** `_zVier` tekent elk dier uit: romp (omtrek in de staande houding, met heup- en schoudergewricht), nek (lengte, hoek, dikte), kop (eigen assenstelsel op het eind van de nek) en vier poten als botketens. Een houding verandert alleen de heup, de draaiing van de romp, de nek- en kophoek en de plek van de voeten; knie en elleboog volgen uit **inverse kinematica met twee botten**. Gevolg: poten staan altijd op de grond, de elleboog knikt altijd naar achter en de knie (stifle) naar voren, ook in lopen, zitten en liggen. Dit loste in één keer de klacht 'dieren staan/bewegen onrealistisch' op voor 20 dieren.
2. **Botlengtes uit gewrichtsposities berekenen.** Ontwerp de staande houding als gewrichtspunten (schoft, elleboog op borstbeenhoogte, pols ±0,25 H; heup, knie op buikhoogte, hiel ±0,27 H bij honden / 0,33 H bij paarden) en laat de bouwer daar de botlengtes uit halen (`_zHondBouw`, `_zPaardBouw`). Dan is de staande houding precies het ontwerp en volgt elke andere houding uit dezelfde botten. Nieuwe rassen = alleen maten veranderen.
3. **Romp eerst, dan de nabije poten, dan pas de vachttekening van de romp.** Zo valt de bovenkant van schouder en dij weg in het lijf en lopen zadel, flank en buik over de poot heen. In de eerste versie stonden schouder en dij als losse 'lappen' op het lijf (andere tint, harde rand).
4. **Bovenkant van de poot binnen het silhouet houden.** Dij en schouderblad mogen nooit boven de rug- of kruislijn uitsteken (eerste wolf had een bult boven het kruis door een te brede dij aan de top).
5. **Bij zitten en liggen de romp zelf laten zakken tot het laagste punt de grond raakt** (automatisch berekend), en bij zitten de romp korter maken (rug buigt, `krimp` 0,75–0,86). Zonder dat zakte het zitvlak door de grond of hing de kat schuin als een plank.
6. **Drie tinten + haarrand.** Rug donker (zadel), flank midden, buik licht, met een rafelige grens (`_zKam`: plukjes met willekeurige afstand en diepte). Regelmatige zaagtanden lezen als 'zigzag', niet als vacht: spreiding in plaats en diepte was nodig.
7. **Korte haarstreken in de richting van de vacht** (`_zHaar`, naar achter-onder) geven detail zonder druk te worden; houd ze binnen een clip.
8. **Kop als eigen assenstelsel met boven- en onderkaak apart.** Daardoor kan de bek open (huilen) en draait het gewei mee met de kop (vechtende herten haken echt in elkaar). Het gewei moet getekend worden in de staande oriëntatie (`rotate(-P.kopHoek)`), anders wijst het bij een omlaag hangende kop naar voren.
9. **dierOog werkt in pixels.** In een geschaald assenstelsel werd het lichtpuntje (min. 1,2) een grote witte schijf. Oplossing `_zOog`: eerst naar schermcoördinaten.
10. **Voeten met tenen en nagels, hoeven als trapezium met schuine voorwand en kroonrand**, tweetenige hoef met spleet en bijklauw. Een ronde stip als voet blijft het meest opvallende 'nep'-signaal.
11. **Verre poten verschuiven** (paard 10 eenheden, hond 6–7): anders vallen ze precies achter de nabije en lijkt het dier twee dikke poten te hebben.
12. **Lopen: zijdelingse stapvolgorde** (achter-L, voor-L, achter-R, voor-R, elk ¼ periode later; steunfase 62 %), voet in de steunfase lineair naar achter, in de zwaai een boog met gebogen pols/hiel. Draven: diagonale paren, steunfase 42 %.
13. **Walvissen golven op en neer**, niet opzij: profiel met verticale golf die naar de staart toeneemt; de staartvin volgt de helling van de staartsteel.

Wat niet werkte / nog zwak:
- Mops: het vierkante lijf leest snel als schaap; pas na korter lijf (L 98), lagere borst (yb 40) en een grotere kop acceptabel. Nog steeds de zwakste hond.
- Huiskat zitten blijft wat stijf (romp draait als één blok); een echte buigzame rug (twee rompdelen) zou beter zijn.
- Chimpansee: knokkellopen klopt in verhouding, maar de armen zijn rechte zuilen; zitten is nog grof.
- Nijlpaard: de voorkant (borst + voorpoot) is een grote massa; mag meer vorm (elleboog, borstplooi).
- Bultrug-houdingen verschillen per `t` maar subtiel (op stills nauwelijks te zien; in beweging wel).

## Ronde 2 (na controle coördinator, 23 okt 2026)

14. **Achterkant van de romp rond laten doorlopen**: staartwortel → zitbeenknobbel → bolle achterkant van de dij → hamstring die naar voren in de poot loopt. Een bijna verticale achterrand met een lichte vlek erop (spiegel van het hert) las als het 'snijvlak' van een afgezaagde stam. De spiegel is nu een kleine vlek rond de staartwortel, niet tot de rand.
15. **Lange middenvoet (pijp) in twee helften opdelen**, elk met een eigen breedte: dan wordt de pijp smal tussen een brede knie en een kogel met sporenknobbel; koot dun; hoef lichter dan de zwarte onderbenen met een kroonrand. Eén segment van knie tot kogel gaf een rechte zwarte kolom.
16. **Vormlijnen alleen waar de vorm zit**: één lijn voor de voorrand van de dij (knie → heup) en bij zitten een boog om de bil; meer lijnen (schouderblad, achterrand van de dij) werden krassen. Niet bij dieren met eigen lijnen of zonder zichtbare spieren (nijlpaard).
17. **Kop op de bovenrand van de hals zetten** (paardachtigen: achterhoofd = bovenrand van het halseinde) en de basis van een lang oor laten meegroeien met de oorbreedte; dan sluiten hals, kop en ezelsoren aan.
18. **Zitten: heup nooit lager dan de dikte van de dij**, anders zakken de achterpoten door de grond.
19. Teckel: diepe borst (borstbeen ±0,3 H) maar duidelijk opgetrokken buik (buiklijn ±0,5 H), voorvoeten iets naar voren; mops: wat langere poten (borstbeen 0,44 H) en zittend rechtop (romp −0,95 rad, korter).

## Opgezocht per dier (met bron)

- **Wolf**: schofthoogte 0,6–0,8 m; staart ±¼ van de totale lengte, in rust omlaag; smalle borst; lange poten, teenganger, voorvoet groter met hubertusklauw; blokkige snuit, kleine stop; ogen geel-amber. Bron: [Gray Wolf (Wikipedia-selectie)](https://dlab.epfl.ch/wikispeedia/wpcd/wp/g/Gray_Wolf.htm), [Western Wildlife](https://westernwildlife.org/?p=10). Recept: L 1,14 H, borstbeen 0,5 H, hiel 0,27 H, kop ±0,4 H, staart tot de hiel.
- **Hondenrassen**: herder lengte : hoogte 10 : 8,5, aflopende rug; teckel lengte ±2 × hoogte, bodemvrij ±⅓; mops vierkant, brachycefaal; chihuahua appelkop met stop ±90°, grote oren. Bron: [AKC-standaard teckel (Dummies)](https://dummies.com/pets/dogs/dachshunds-the-akc-breed-standard), [Hill's Dachshund](https://www.hillspet.com/dog-care/dog-breeds/dachshund).
- **Paard**: schofthoogte = lengte boeg–zitbeen; hals ≈ 1,5 × hoofd; rug en kruis elk ⅓; borstdiepte ≈ elleboog–kogel; sprong op de hoogte van de kastanje; koot en schouder 40–55°. Bron: [American Farriers – Conformation](https://www.americanfarriers.com/articles/8770-conformation-form-to-function).
- **Ezel / muilezel**: lange oren, rechtopstaande manen, kwaststaart, smalle steile hoeven; muilezel paardenlijf met ezelkop/-oren. Bron: [WorldAtlas mule vs donkey](https://worldatlas.com/articles/what-are-the-differences-between-a-mule-and-a-donkey.html), [Animalsake](https://animalsake.com/how-to-differentiate-between-donkey-horse-and-mule).
- **Jachtluipaard**: lijf 112–135 cm, staart 66–84 cm; kleine ronde kop, lange dunne poten, holle rug, massieve stippen, traanstreep, staartringen + witte punt, stompe nagels. Bron: [San Diego Zoo factsheet](https://ielc.libguides.com/sdzg/factsheets/cheetah/characteristics).
- **Leeuw**: schofthoogte ♂ ±123 cm, kop-romp 172–250, staart > ½ met kwast; manen over kop, hals, borst; kleine ronde oren met zwarte achterkant. Bron: [SDZ lions](https://ielc.libguides.com/sdzg/factsheets/lions/characteristics).
- **Tijger**: kop-romp ♂ 189–300, staart < ½; strepen over lijf, poten, kop, staart; zwarte oren met witte vlek; witte wangen. Bron: [SDZ tiger](https://ielc.libguides.com/sdzg/factsheets/tiger/characteristics).
- **Nijlpaard**: ogen, oren en neusgaten bovenop, korte zuilpoten met vier tenen, tonvormig lijf (±1,5 m schoft, 3,5–4 m lang). Bron: [Wikipedia Hippopotamus](https://en.wikipedia.org/wiki/Hippopotamus_(genus)), [YPTE](https://www.ypte.org.uk/factsheets/hippopotamus/overview). (animalcorner.org: niet bereikbaar, toestemming verliep.)
- **Zeehond**: 1,2–2 m; spoelvorm; korte voorflippers met 5 tenen en nagels; achterflippers waaiervormig naar achteren; geen oorschelp; snorharen op kussens; vlekken dichter op de rug. Bron: [SeaWorld harbor seal](https://seaworld.org/animals/all-about/harbor-seal/characteristics/).
- **Bultrug**: borstvin tot ⅓ lengte met knobbels, tuberkels op de kop, keelgroeven, rugvin op een bult. Bron: [Wikipedia Humpback whale](https://en.wikipedia.org/wiki/Humpback_whale).
- **Pakicetus / Ambulocetus / Rodhocetus / Basilosaurus**: wolfgroot met lange slanke poten / zeeleeuwgroot, korte poten, lange achtervoeten, ogen bovenop / grote peddel-achtervoeten / klein achterpootje, staartvin. Bron: [Wikipedia Archaeoceti](https://en.wikipedia.org/wiki/Archaeoceti).
- **Edelhert**: ±120 cm schoft, gewei met oog-, ijs-, middenspruit en kroon, spiegel, bronstmanen. Bron: [Wikipedia Red deer](https://en.wikipedia.org/wiki/Red_deer), [British Wildlife Centre](https://britishwildlifecentre.co.uk/animal-facts/red-deer/).
- **Chimpansee**: intermembrale index 106 (mens ±70), dus schouder hoger dan heup bij knokkellopen. Bron: [eFossils limb proportions](https://efossils.org/book/limb-proportions).
- **Koe, muis**: uit eigen kennis (rund: rechte rug, heupknobbels, halskwab, tweetenige hoef; bosmuis: staart ≈ lijf, grote oren/ogen) — nog niet tegen een bron gecontroleerd.

## Houdingen (`o.houding`) per functie

Alle viervoeters via de motor: `'staan'` (standaard), `'lopen'` (+ `t` = fase 0..1, herhaalt), `'draven'`, `'zitten'`, `'liggen'`, `'grazen'`/`'snuffelen'` (kop omlaag), `'vechten'`; wolf ook `'huilen'` (zittend, kop omhoog, bek open, oren naar achter). Extra: `o.kopHoek`, `o.nekHoek` (rad) bovenop de houding.
- `edelhert`: oude `o.kop` blijft werken (≥0,5 → 'vechten').
- `jachtluipaard`: oude `o.fase` → 'lopen' met `t = fase`.
- `nijlpaard(ctx,x,y,s,a)` met een getal als 5e argument blijft werken (= alpha).
- `chimp(ctx,x,y,s,a)`: a mag ook een object zijn `{a, kijk, houding}`.
- Zwemmers (eigen tekening): `bultrug`, `basilosaurus`, `rodhocetus` zwemmen altijd, `o.t` = tijd (s) voor staartslag/golving/peddelen; `zeehond` `'liggen'` (standaard) of `'zwemmen'`; `muis` `'staan'` of `'rechtop'`.

## Welke houding per scène (voorstel; in sb*.js nog niet ingevuld, want sb-bestanden niet aanpassen)

| scène | dier | wat de scène zegt | houding |
|---|---|---|---|
| e3s23 | edelhert ×2 | koppen zakken, geweien haken in elkaar | `kop: 0.85` → 'vechten' (werkt al zo) |
| e4s21 | wolf | wolf op een heuvel bij nacht | 'staan' (nu); mooier: 'huilen' naar de maan die al in beeld staat |
| e4s22 | wolf, honden | één voor één in beeld, op schaal | 'staan' |
| e4s26 | mops | Mila knielt bij een mops die moeilijk ademt | 'zitten' (of 'liggen'); bek iets open kan met `huilen` niet, nog geen 'hijgen'-houding |
| e4s31 | wolf, honden | tegels | 'staan' |
| e5s17 | jachtluipaard | stapt door de nachtsavanne | 'lopen', `t` met de tijd (nu `fase: 0.15`) |
| e5s18 | jachtluipaard ×2 | huidtransplantatie | 'staan' of één 'liggen' |
| e5s20/21 | jachtluipaard-icoon | in reservaten, verhuist | 'staan'; bij verhuizen 'lopen' |
| e6s01 | muilezel, paard, ezel | Gerrit klopt de muilezel; paard en ezel in de wei | muilezel 'staan'; paard en ezel 'grazen' |
| e6s02/06/08 | paard, muilezel, ezel | op schaal | 'staan' |
| e6s03 | wolf, chihuahua (+ pups) | naast elkaar, pups verschijnen | 'staan'; pups nog niet in de bibliotheek |
| e6s11 | muis | muis blijft aan de oever staan | 'rechtop' (kijkt naar de overkant) |
| e6s15 | wolf, herder | wolf aan de bosrand, herder op het erf | wolf 'staan', herder 'zitten' |
| e6s18/28 | muilezel, wolf, hond | tegels | 'staan' |
| e7s01 | bultrug | zwemt langzaam, borstvinnen slaan één keer | `t` met de tijd |
| e7s02/04/24 | bultrug | doorschijnend, heupbotjes | `rontgen`, `heup` (zoals voorheen) |
| e7s13 | pakicetus | stapt uit zijn laag naar voren | 'lopen', `t` met de tijd |
| e7s14 | ambulocetus | schuift het water in tot alleen de ogen boven zijn | 'liggen' (laag lijf), eventueel 'lopen' daarvoor |
| e7s15 | rodhocetus | zwemt met zijn achtervoeten | `t` met de tijd |
| e7s16 | basilosaurus | golft door het water | `t` met de tijd |
| e7q28, e7s35, e8s04–06 | zeehond, koe, nijlpaard, walvis | cladogram-icoontjes | 'staan' / zeehond 'liggen' |
| e8s09/10 | chimpansee | naast de mens in de boom | 'staan' (knokkellopen) |
| e8s25–31 | leeuw, tijger, huiskat | in de groepsvakken | 'staan'; huiskat mag 'zitten' |

## Let op voor de integratie

- **chimp staat ook in sb8.js: de chimp-functie moet uit sb8.js** (coördinator doet dat bij de integratie). sb8 wordt ná dieren_zoog geladen en overschrijft daardoor mijn `chimp`. Haal de functie uit sb8.js (of laad dieren_zoog na sb8) zodat de nieuwe chimpansee in e8s09/10 verschijnt.
- `viervoeter`, `maakHond`, `WOLF`, `HONDEN`, `PAARD`, `EZEL`, `MUILEZEL`, `_kat` uit de oude bestanden blijven bestaan maar worden niet meer gebruikt; mijn interne namen beginnen met `_z` (geen botsing met de `const`'s in teken_evo6).
- Schaal en anker zijn gelijk gebleven (s = px per cm voor wolf/honden/paardachtigen; voor de andere dieren dezelfde eenheden als de oude functie). Het edelhert is iets kleiner dan het oude (schoft 120 cm i.p.v. ±150), de jachtluipaard iets korter (lijf 1,12 H i.p.v. 1,45 H): beide nu volgens de bron.

## Ronde 3 — tekenen naar referentie (23 okt 2026)

Werkwijze (scripts in `scripts_zoog/`, landmarks in `referentie_landmarks_zoog.json`; de scripts verwijzen nog naar de werkmap `/tmp/claude-0/ref/`, pas `LM`/paden aan bij hergebruik):
1. **Uitknippen**: GrabCut per dier met een rechthoek, daarna een tweede GrabCut met een maskerstart uit 'verschil met de ingeschatte achtergrond' (inpaint van de plaat zonder dieren). Lichte vloer tussen de poten (ezel, chimpansee, katten) apart weggehaald (helder én onverzadigd onder de buiklijn). Eén drempel op de achtergrondkleur werkte niet: de plaat heeft een lichtverloop en grijze dieren (wolf, ezel) lijken op de achtergrond.
2. **Meten**: per dier een rasterbeeld (10 px), daarop met de hand de landmarks: grond, schoft, gewrichten (schouder, elleboog, pols/knie, kogel, heup, knie, hiel, voet), de snijlijnen nek (schoft → borst) en achterhoofd (achter de oren → keel), neuspunt, oog, staartwortel en -punt, en een polygoon 'onder' onder de buiklijn.
3. **Onderdelen**: masker ∩ polygonen → romp, nek, kop, staart (nek en kop iets uitgezet over de naad, zodat er bij draaien geen kier valt). Omtrek vereenvoudigd (approxPolyDP, 25–65 punten) en genormaliseerd: schofthoogte = 100, anker midden onder; nek in een eigen assenstelsel vanaf het **bovenste** naadpunt (schoft), kop vanaf het achterhoofd richting neus, staart vanaf de wortel.
4. **Kleur**: k-means (2–4) op een sterk vervaagde referentie binnen het masker → vlakke vlakken, met de **mediaan** van de echte pixels als kleur (het clustergemiddelde gaf grijze, modderige tinten) en per dier vaste 'tinten' (donker → licht) zodat het in de Part C-stijl past. Fijne tekening (stippen jachtluipaard, strepen tijger/kat) is te fijn voor k-means: die blijft procedureel getekend in het onderdeel. Bij de wolf werkte de ontworpen vachttekening uit ronde 2 beter dan de k-meansvlakken (die leken op camouflage).
5. **Skelet**: botlengtes = afstanden tussen de gemeten gewrichten, middenvoet/koot als ketting vanaf de grond, breedtes per gewricht met de hand gemeten (automatisch meten liep in de verre poot door). Houdingen: romp, nek, kop en staart draaien als stijve stukken; poten uit inverse kinematica.

Wat de referentie veranderde (gemeten, als fractie van de schofthoogte; romplengte = omtrek van de romp zonder nek/staart, onderrand = snijlijn onder de romp):

| dier | romplengte | onderrand romp | nek | kop | elleboog | knie | hiel/sprong | staart |
|---|---|---|---|---|---|---|---|---|
| wolf | 1.11 | 0.45 | 0.32 | 0.29 | 0.49 | 0.53 | 0.26 | 0.78 |
| herder | 1.43 | 0.37 | 0.33 | 0.37 | 0.45 | 0.40 | 0.22 | 0.75 |
| teckel | 1.92 | 0.23 | 0.27 | 0.49 | 0.31 | 0.38 | 0.18 | – |
| mops | 1.37 | 0.27 | 0.17 | 0.37 | 0.35 | 0.37 | 0.22 | 0.24 |
| chihuahua | 1.25 | 0.42 | 0.22 | 0.42 | 0.45 | 0.47 | 0.23 | 0.51 |
| paard | 1.05 | 0.56 | 0.51 | 0.38 | 0.56 | 0.59 | 0.32 | 0.76 |
| muilezel | 0.90 | 0.50 | 0.32 | 0.32 | 0.51 | 0.55 | 0.32 | 0.58 |
| ezel | 0.83 | 0.41 | 0.34 | 0.36 | 0.41 | 0.47 | 0.24 | 0.62 |
| jachtluipaard | 1.30 | 0.57 | 0.20 | 0.24 | 0.51 | 0.49 | 0.24 | (getekend) |
| tijger | 1.35 | 0.45 | 0.25 | 0.24 | 0.40 | 0.42 | 0.23 | 0.57 |
| leeuw | 1.56 | 0.30 | 0.60 (met manen) | 0.29 | 0.36 | 0.54 | 0.23 | 0.55 |
| huiskat | 1.17 | 0.44 | 0.14 | 0.27 | 0.44 | 0.46 | 0.20 | 0.45 |
| edelhert | 1.04 | 0.45 | 0.26 | 0.33 | 0.46 | 0.50 | 0.30 | 0.18 |
| koe | 1.27 | 0.35 | 0.25 | 0.21 | 0.40 | 0.47 | 0.21 | 0.67 |
| nijlpaard | 1.53 | 0.25 | 0.31 | 0.45 | 0.32 | 0.35 | 0.16 | – |
| chimpansee | 0.98 | 0.40 | 0.20 | 0.23 | 0.41 | 0.29 | 0.09 | – |

- **Jachtluipaard** (Kamiel: borst klopt niet): de borst is ondiep — de onderrand van de romp ligt op ±0,57 H, niet op 0,5 H zoals in ronde 2 (dat gaf een diepe 'hondenborst'). Lange dunne poten, kleine kop (0,24 H). Kruist met de tekstbron (lange poten, 'wespentaille').
- **Wolf**: staart langer en veel bossiger (±0,78 H, tot bijna de grond), hals dikker, kop korter (0,29 H) dan in ronde 2.
- **Paard**: hals lang (0,51 H, ≈ 1,35 × de kop; tekstbron 1,5 ×), sprong op 0,32 H (klopt met de bron), borst op ±0,56 H.
- **Ezel**: korter lijf dan hoog (0,83 H), lage borst (0,41 H), grote kop (0,36 H) met lange oren; muilezel ertussenin.
- **Teckel**: lijf ±1,9 H, onderrand romp 0,23 H; **mops**: kop 0,37 H, korte nek; **herder**: lange romp (1,43 H incl. kruis), lage hiel (0,22 H).
- **Koe** (referentie is een Holsteiner): diepe romp (onderrand 0,35 H), korte nek. In de films was de koe bruin; nu zwartbont.
- **Nijlpaard**: kop 0,45 H en romp 1,53 H; **chimpansee**: knie laag (0,29 H), de enkel bijna op de grond (voet plat).
- Kruiscontrole: de AI-referentie laat de bultrug-staartvin half van boven zien (onmogelijk in een zuiver zijaanzicht) — tekstbron wint: staartvin blijft een horizontale wig, alleen de lijfomtrek komt uit de referentie. De borstvin van de bultrug is in deze referentie grotendeels donker met witte rand.

Werkt het overnemen van de contour? **Ja, voor de staande houding duidelijk**: de overlay laat zien dat romp, nek en kop nu binnen 1–2 % van de referentie liggen, en de verhoudingsfouten van ronde 2 (luipaardborst, wolfstaart, ezelkop) zijn in één keer weg. Beperkingen:
- Bij houdingen draaien de stukken stijf: bij grazen ontstaat een kleine bult op de schoft (de halsvoet draait mee), bij zitten blijft de romp recht. Draaipunt van de nek op het bovenste naadpunt (schoft) gaf het minste zichtbare naad.
- De poten komen niet uit de omtrek maar uit het skelet (anders geen houdingen); bij de lopende referenties (katten) zijn botlengtes gemeten in een stap en de voeten voor 'staan' met de hand onder schouder en heup gezet.
- K-meanskleuren geven bij gladde vachten 'camouflagevlekken' (lichtval in de foto); sterk vervagen (σ 6–10) + vaste tinten per dier was nodig, en bij effen dieren (paard, muilezel, hert) zijn de twee lichtste clusters samengevoegd tot één lijfkleur.
- De mops blijft in zitten/liggen de zwakste (stijve romp), de chimpansee kreeg het getekende gezicht van ronde 2 op de gemeten romp.
- Testvel: `r_wolf`, `r_honden`, `r_paarden`, `r_katten`, `r_hoef`, `r_bultrug` (rode lijn = referentieomtrek op dezelfde schaal) plus de houdingenvellen.

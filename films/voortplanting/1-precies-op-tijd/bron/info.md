# Van bevruchting tot baby (voorheen Precies op tijd) — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/1-precies-op-tijd.html |
| Reeks / nummer | Voortplanting (vwo), film 1 "Van bevruchting tot baby"; celdeling zit in de serie Cel |
| Doelgroep / niveau | vwo bovenbouw; Nectar 4.1 H4 en Biologie voor jou 4 vwo thema 2. Geen Havo/Vwo-schakelaar; `verdieping` staat overal op false (H2 eiwit- vs steroïdhormoon heet in het docentdeel wel "verdieping") |
| Versie / datum | v2.5 · 22 oktober 2026 (opgewaardeerd naar prompt v8, zie onderaan) · v2.4 · 22 oktober 2026 (startscherm met de nieuwe titel) · v2.3 · 22 oktober 2026 (beeld: vaste rollen, zie onderaan) · v2.1 · 11 oktober 2026 (vervangt "Precies op tijd" v1, eigen speler, oude stijl) |
| Stem / model | Roos (ElevenLabs, model eleven_multilingual_v2); opname van v1 (september 2026) hergebruikt, zes zinnen in v2.1 opnieuw ingesproken (hCG als "ha cee gee"; vraag H8 begint met "Wat denk je?") |
| Duur | 19:43 (som van de 12 audioblobs: 1183,4 s), inclusief hoofdstukkaarten, bedenktijd en onthulling die in de audio als stilte zitten |
| Voldoet aan | prompt uitlegfilms v8 (22 okt 2026); bewust anders: zie 'Opwaardering naar prompt v8' |
| Beeldstijl | Part C-stijlkaart (v4): Schema (navy #1A2740) als hoofdlook, Micro (#121A26) in zoomcirkels; Macro niet gebruikt. Vaste UI-laag, canvas 1920×1080, CAPTION_Y 950. Kleurafspraak: eiwithormonen teal, steroïden/inhibine/AMH paars, bloed koraal, leven groen |
| Audio-opslag | 12 fragmenten, één per hoofdstuk (Opening + H1–H11), als base64 in de HTML (blobs 006–017.mp3, via `window.__AUDIO`) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Type en look uit de tabel "Hoe de film het uitlegt" op de pagina.

| Begin | Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|---|
| 0:00 | Opening · één eicel, één dag | — · Schema | Eicel ± 1 dag, zaadcel ± 5 dagen; negen maanden; organen verbonden door signalen; oma → moeder → jij; titelkaart |
| 0:42 | H1 Een eicel die wacht | C · Schema → Micro | Oma zwanger, zoom op eierstokjes; voorraad eicellen (logschaal); ongelijke deling met poollichaampje; 1000 zaadcellen per seconde |
| 2:28 | H2 Signalen van boven | D · Schema met Micro-zoom | Hypothalamus → hypofyse → geslachtsklier; alleen cel met receptor reageert; eiwit- vs steroïdhormoon; Leydig/Sertoli; live terugkoppelmodel |
| 4:38 | H3 Een wedstrijd tussen follikels | D · Schema | Follikels groeien op FSH; oestrogeen in twee stappen; remming van FSH; dominante follikel |
| 5:50 | H4 Van rem naar gaspedaal | D · Schema | Remlijn wordt stimuleerlijn; hormoongrafiek op een dagklok (eigen model); eisprong, geel lichaam, menstruatie |
| 7:48 | H5 De ontmoeting | A · Schema → Micro | Teller 200 miljoen → honderden; capacitatie, zona, acrosoomreactie, calciumgolf, corticale reactie, zygote |
| 9:43 | H6 Een bericht aan het gele lichaam | C + D · Schema met Micro-zoom | Klieving, blastocyste, innesteling; scenario zonder hCG; zwangerschapstest; placenta neemt over |
| 11:41 | H7 Dichtbij, maar gescheiden | B · Schema | Vlokken in moederbloed; dunne laag (goud); wat er wel en niet door gaat |
| 12:45 | H8 Man of vrouw? | D · Schema | Buizen van Wolff en Müller; SRY, AMH, testosteron, DHT; vergelijking op één basislijn |
| 14:29 | H9 Een lus die zichzelf versterkt | D · Schema | Rek → hypothalamus → oxytocine → wee; geboorte doorbreekt de lus |
| 15:12 | H10 Ingrijpen in de signalen | I · Schema met Micro-zoom | Pilmodel met stopweek, spiraaltjes, morning-afterpil, mifepriston, condoom; hiv in T-helpercel; bacterie vs virus |
| 17:11 | H11 Als het niet vanzelf gaat | I · Schema | Keten met schakels; chlamydia en de eileider; ivf-tijdlijn met ICSI; recap; eindkaart |

## Vragen
Zeven voorspelvragen (basis = vwo; geen aparte niveaus). De vraag wordt ingesproken, daarna 8 s bedenktijd met keuzes op het scherm, dan de onthulling (9 s). Leerling: de film wacht op een antwoord; Klas: wacht op Verder. Het juiste antwoord staat op een wisselende plek (sinds 12-10-2026: B, C, A, C, B, A, C); de opties worden niet geschud tijdens het afspelen.

| Plek (globaal) | Vraag | Opties (juist vet) | Uitleg op het scherm |
|---|---|---|---|
| H1, 2:03 | Waarom is het voor een zaadcel juist handig dat hij bijna geen cytoplasma meekrijgt? | **A Een lichte cel kost minder energie en is sneller; het embryo krijgt zijn cytoplasma toch van de eicel.** · B Cytoplasma zou het DNA in de kop van de zaadcel beschadigen. · C Een zaadcel heeft geen energie nodig, dus ook geen cytoplasma. | Alleen DNA afleveren is genoeg: mitochondriën, ribosomen en eiwitten brengt de eicel mee. |
| H2, 4:10 | Een bodybuilder spuit extra testosteron. Wat gebeurt er met zijn LH, zijn eigen testosteronproductie en zijn zaadcelproductie? | **A LH daalt, de Leydigcellen maken minder testosteron, en de zaadcelproductie daalt.** · B LH stijgt om het extra testosteron te compenseren; de zaadcelproductie blijft gelijk. · C LH blijft gelijk; de zaadcelproductie stijgt, want er is meer testosteron. | Negatieve terugkoppeling: hoog testosteron remt GnRH, LH en FSH. In de zaadbal zakt de concentratie die de Sertolicellen nodig hebben. |
| H4, 7:20 (met figuur `cycle`) | Lees de grafiek: op welke dag vond de eisprong plaats, welke lijn verraadt dat, en hoe zie je aan progesteron dat er geen zwangerschap is? | **A Rond dag 14, net na de LH-piek; progesteron zakt aan het eind, dus het gele lichaam is afgestorven.** · B Op dag 1, bij het begin van de menstruatie; progesteron blijft de hele cyclus laag. · C Rond dag 14, op de oestrogeenpiek; progesteron blijft hoog, dus ze is zwanger. | De LH-piek gaat ± 36 uur aan de eisprong vooraf. Bij een zwangerschap zou hCG het gele lichaam in leven houden en progesteron hoog blijven. |
| H5, 9:17 | Een zaadcel die niet gecapaciteerd is, zwemt wel naar de eicel, maar kan haar niet bevruchten. Welke stap gaat er dan mis? | **A De acrosoomreactie: met te veel cholesterol in het membraan komen de enzymen niet vrij.** · B De corticale reactie: de eicel laat de zaadcel niet toe. · C Het zwemmen zelf: de staart werkt niet zonder capacitatie. | Zonder acrosoomreactie komt er geen tunneltje door de zona pellucida, en dus geen versmelting. |
| H6, 11:15 | Een vrouw doet vier dagen na de bevruchting een zwangerschapstest, en die is negatief. Betekent dat dat ze niet zwanger is? | **A Nee: de innesteling begint pas rond dag 6, en pas daarna komt er hCG in haar bloed en urine.** · B Ja: een test meet hCG, en dat maakt het embryo direct na de bevruchting. · C Nee: de test meet progesteron, en dat stijgt pas later. | Betrouwbaar testen kan vanaf ongeveer de dag van de verwachte menstruatie. |
| H8, 14:00 | Wat denk je? Een embryo is XY, maar de receptor voor testosteron werkt niet. Heeft deze persoon zaadballen? Een baarmoeder? Zaadleiders? Hoe zien de uitwendige geslachtsorganen eruit? | **A Zaadballen: ja. Baarmoeder: nee. Zaadleiders: nee. Uitwendig: vrouwelijk.** · B Zaadballen: ja. Baarmoeder: ja. Zaadleiders: nee. Uitwendig: vrouwelijk. · C Eierstokken en baarmoeder: zonder werkend testosteron wordt alles vrouwelijk. | SRY werkt, dus zaadballen. Anti-Müllerhormoon werkt via een eigen receptor, dus geen baarmoeder. Testosteron en DHT werken niet: geen zaadleiders, uitwendig vrouwelijk. |
| H11, 19:00 | Eén: een vrouw vergeet drie dagen haar pil. Leg met terugkoppeling uit waarom ze toch een eisprong kan krijgen. Twee: waarom is een zwangerschapstest vlak na de hCG-injectie van een ivf-behandeling niet betrouwbaar? | **A De spiegels dalen, de rem op FSH valt weg, een follikel rijpt en bij genoeg oestrogeen volgt de LH-piek.** · B Dat kan niet: de pil werkt nog een hele maand door. · C De eisprong komt pas in de stopweek, als de hormonen dalen. | En de tweede vraag: vlak na een hCG-injectie meet een test de injectie zelf, niet een embryo. Pas na ± 2 weken zegt de uitslag iets. |

Checkvragen (examenstijl, statische HTML, antwoorden ingeklapt): 1 ongelijke cytoplasmaverdeling en "bagage" van de eicel · 2 testosteron vs LH (vervoer, receptor) en anabole steroïden · 3 LH-piek door oestrogeen; vergelijking met de weeën · 4 hCG en zwangerschapstest; antistoffen vs afweercellen via de placenta · 5 chlamydia en buitenbaarmoederlijke zwangerschap; FSH, onderdrukker en hCG bij ivf.

## Begrippen
Statische tabel "Begrippen" (term — betekenis — hoofdstuk). Geen vwo-markering.

- poollichaampje — kleine cel die bij de meiose van de eicel wordt afgesnoerd, met een set chromosomen en bijna geen cytoplasma; sterft af (1)
- profase I / metafase II — de twee momenten waarop de eicel in de meiose stilstaat: vóór de geboorte tot de LH-piek, en van de eisprong tot de bevruchting (1, 4, 5)
- hypothalamus / hypofyse — hersendelen die het startsein geven: de hypothalamus maakt GnRH, de hypofyse antwoordt met FSH en LH (2)
- GnRH — hormoon van de hypothalamus dat de hypofyse aanzet tot de afgifte van FSH en LH; komt in korte stoten (2)
- FSH — hormoon van de hypofyse dat follikels laat groeien en bij de man de Sertolicellen aanstuurt (2, 3)
- LH — hormoon van de hypofyse; de LH-piek veroorzaakt de eisprong; zet bij de man de Leydigcellen aan tot testosteron (2, 4)
- receptor — eiwit dat precies bij één hormoon past; alleen cellen met de receptor reageren (2)
- eiwithormoon — hormoon dat in bloedplasma oplost, niet door het celmembraan kan en bindt aan een receptor óp het membraan (2)
- steroïdhormoon — hormoon gemaakt van cholesterol, vetoplosbaar, glipt door het membraan en bindt aan een receptor ín de cel die genen aan- of uitzet (2)
- Leydigcellen / Sertolicellen — cellen in de zaadbal: Leydigcellen maken testosteron (op LH), Sertolicellen verzorgen de zaadcellen in wording (op FSH en testosteron) en maken inhibine (2, 8)
- inhibine — hormoon van de Sertolicellen (en van follikels) dat vooral de afgifte van FSH remt (2, 3)
- negatieve terugkoppeling — een signaal remt zijn eigen oorzaak; de spiegel blijft stabiel (2, 4)
- positieve terugkoppeling — een signaal versterkt zichzelf; loopt op tot iets de lus doorbreekt (LH-piek, weeën) (4, 9)
- follikel — blaasje van hulpcellen rond een eicel in de eierstok; maakt oestrogeen (3)
- dominante follikel — de follikel met de meeste FSH-receptoren, die het bij weinig FSH nog redt en tot de eisprong komt (3)
- oestrogeen — geslachtshormoon van de follikel: laat het baarmoederslijmvlies aangroeien, remt FSH en lokt bij een langdurig hoge spiegel de LH-piek uit (3, 4)
- geel lichaam — restant van de follikel na de eisprong; maakt vooral progesteron en leeft zonder hCG ongeveer twaalf dagen (4, 6)
- progesteron — hormoon van het gele lichaam (later van de placenta): maakt het slijmvlies klaar voor een embryo en remt de hypofyse (4, 6)
- menstruatie — afstoten van het baarmoederslijmvlies als de progesteronspiegel zakt (4)
- capacitatie — verandering van het zaadcelmembraan onderweg (cholesterol eruit), nodig om te kunnen bevruchten (5)
- zona pellucida — stevige mantel van glycoproteïnen rond de eicel (5)
- acrosoom / acrosoomreactie — blaasje met enzymen in de kop van de zaadcel; bij binding aan de zona komen de enzymen vrij en verteren een tunneltje (5)
- corticale reactie — korrels onder het eicelmembraan lozen hun inhoud na de calciumgolf; de zona verandert, geen tweede zaadcel (5)
- zygote — bevruchte eicel met een nieuwe combinatie van 46 chromosomen (5)
- klievingsdelingen — delingen van het vroege embryo zonder groei: het embryo blijft even groot, de cellen worden kleiner (6)
- blastocyste — holle bal van cellen rond dag 5: trofoblast (buitenlaag) en binnenste celmassa (6)
- trofoblast — buitenlaag van de blastocyste; groeit het slijmvlies in, maakt hCG en wordt het kindsdeel van de placenta (6, 7)
- innesteling — het embryo nestelt zich vanaf ongeveer dag 6 in het baarmoederslijmvlies (6)
- hCG — hormoon van de trofoblast dat op LH lijkt en aan de LH-receptoren van het gele lichaam bindt; het signaal dat een zwangerschapstest meet (6)
- placenta — orgaan waar bloed van moeder en kind heel dicht bij elkaar komt, gescheiden door een dunne laag cellen; uitwisseling zonder mengen (7)
- buizen van Wolff / buizen van Müller — twee stelsels buisjes in elk vroeg embryo; Wolff wordt mannelijk (bijbal, zaadleider, zaadblaasjes), Müller wordt vrouwelijk (eileiders, baarmoeder, bovenste deel vagina) (8)
- SRY-gen — gen op het Y-chromosoom dat de aanleg omvormt tot een zaadbal (8)
- anti-Müllerhormoon — hormoon van de Sertolicellen waardoor de buizen van Müller verdwijnen (8)
- oxytocine — hormoon van de achterkwab van de hypofyse dat de baarmoederwand laat samentrekken; versterkt zichzelf tijdens de bevalling (9)
- progestageen — nagemaakt progesteron in de pil en het hormoonspiraaltje (10)
- onttrekkingsbloeding — bloeding in de stopweek van de pil doordat de hormonen wegvallen; geen echte menstruatie (10)
- T-helpercel — afweercel die de rest van de afweer aanstuurt; doelwit van hiv (10)
- ICSI — bij ivf: één zaadcel rechtstreeks in de eicel spuiten (11)

## Docentdeel
Sectie "Voor de docent": leerdoelen 1–12 met hoofdstuk en toetsvraag; tabel "Hoe de film het uitlegt" (zie Opbouw); twaalf misvattingen met waar/hoe (o.a. elke maand nieuwe eicellen, hormoon werkt overal, oestrogeen is remmend, placenta mengt bloed of filtert, test meet progesteron, pil regelt menstruatie, morning-afterpil = abortuspil, zonder testosteron wordt alles vrouwelijk); pauze- en bespreekmomenten (H2 bodybuilder, H4 grafiek schetsen, H8 androgeenongevoeligheid/Jost 1947, H11 test na hCG-injectie); vereenvoudigingen (diploteen, GnRH-puls, model in relatieve eenheden, acrosoomreactie vóór de zona, celverkeer moeder-kind, prostaglandinen, misoprostol, CD4-co-receptor, ivf-protocollen, niet op schaal); practica en werkvormen (preparaten, stierensperma, dialyseslang, zwangerschapstest, signaalkaartjes, ivf-tijdlijn); checkvragen; bronnen en versie.

Getallen achter de film (overgenomen):

| Wat | Waarde | Zo gezegd of getoond | Bron |
|---|---|---|---|
| levensduur eicel na de eisprong | 12–24 uur | "ongeveer een dag" | Nectar 4 vwo H4; BvJ 4 vwo thema 2 |
| overleving zaadcellen in de vrouw | tot ± 5 dagen | "hooguit een dag of vijf" | idem |
| aantal eicellen (oöcyten) | ± 7 miljoen (20 weken foetaal), 1–2 miljoen (geboorte), ± 300 000 (puberteit), ± 400 eisprongen | staafdiagram op logschaal | Baker 1963 (klassieke schatting); gangbare leerboekwaarden; grote variatie |
| zaadcelproductie | ± 1000 per seconde (± 100 miljoen per dag) | teller tot 1000 | gangbare schatting; een ronde zaadcelvorming duurt ± 10 weken |
| zaadcellen per zaadlozing | ± 200 miljoen (40–300 miljoen) | teller 200 000 000 → honderden | WHO-referentiewaarden; leerboek |
| lengte zaadcel | ± 0,05 mm | "een twintigste millimeter"; schaalbalk ± 50 µm bij de eicel (doorsnede eicel ± 0,1 mm) | leerboek |
| LH-piek → eisprong | ± 36 uur na het begin van de piek | "ongeveer anderhalve dag"; in het model 1,5 dag | Nectar; klinische literatuur |
| omslag naar positieve terugkoppeling | oestrogeen ± 2 dagen boven een drempel | "ongeveer twee dagen hoog" | leerboek (vereenvoudigd) |
| levensduur geel lichaam zonder hCG | ± 12–14 dagen | "ongeveer twaalf dagen"; model: afname vanaf dag 12 | leerboek |
| cyclusmodel | dag 0 = eerste dag menstruatie; LH-piek dag ± 13, eisprong dag ± 14,5, menstruatie dag ± 28 | grafiek H4 en H10 (met pil) | eigen terugkoppelmodel, relatieve eenheden, vorm gecontroleerd op het schoolboek |
| klieving | 2, 4, 8, 16 cellen in ± 3 dagen; blastocyste dag 5; innesteling vanaf dag 6 | dagen in de zoomcirkel | leerboek |
| placenta neemt progesteron over | week 8–10 | tijdlijn in weken | leerboek |
| geslachtsontwikkeling | tot ± week 6 geen verschil | "tot ongeveer week zes" | Nectar 4 vwo "Man of vrouw?" |
| onvruchtbaarheid | ± 1 op 6 stellen niet zwanger binnen een jaar | zes paren, één gemarkeerd | leerboek; WHO-schatting ± 1 op 6 |
| ivf: hCG → punctie | ± 34–36 uur | "± 36 uur later" | klinische protocollen (verschillen per kliniek) |

## Techniek: waar zit wat in de HTML
Regelnummers verwijzen naar film.src.html (blobs als `@@BLOB:nnn@@`; in het echte bestand staat daar base64, regelnummers zijn gelijk).

- **Lettertypen**: regel 5–9, `@font-face` met blobs 001–005.woff2 (Fraunces, Source Sans 3 ×3, IBM Plex Mono). Volledig offline.
- **Audio**: regel 719, `window.__AUDIO = {"audio/ch_0.mp3": base64, …}` — blob 006 = ch_0 (Opening), 007 = ch_1, … 017 = ch_11. Regel 2376–2386 zet ze bij het laden om in blob-URL's (`ch.audio = URL.createObjectURL(...)`).
- **Filmdata**: regel 720, `window.FILM = {chapters:[...]}`. Per hoofdstuk: `key`, `title`, `dur` (s), `audio`, `hasQ`, `hasV`, `segments` (`card` 0–3 s, `narr` met `take`, `gap`, `title`, `question` met `q`, `opts[{k,text,mis}]`, `correct`, `count0`/`count1` (bedenktijd), `reveal`, `expl`, optioneel `fig`; `reveal`, `end`, `tail`), `sentences` (`n`, `text`, `t0`, `t1`, `words[{w,t0,t1}]`, `verdieping`, `take`) en `phrases` (ondertitelblokken, = zinnen plus de ingesproken vraag; `w` = woordtijden voor het meekleuren).
- **Engine** `ENG` regel 721–1070 (Part C-tokens `C` regel 728, `G.text`, `chapterCard`, `endCard` regel 1041, `revealCard`); `COMMON.makeTL(ch)` regel 1072: `TL.W(n, 'woord', occ)` = tijd van een woord in zin n (gooit een fout als het woord niet bestaat), `TL.E(n)`/`TL.B(n)` = eind/begin van zin n, `TL.seg(kind)`, `TL.cue(...)` (QA-lijst van beeldmomenten).
- **Scènes**: `SCENES['0']` regel 1280, `'1'` 1347, `'2'` 1453, `'3'` 1580, `'4'` 1667 (met dagklok en cyclusmodel), `'5'` 1746, `'6'` 1845, `'7'` 1969, `'8'` 2041, `'9'` 2122, `'10'` 2174, `'11'` 2288; bibliotheek `LIB` (hormoonkleuren `HC`, cyclusmodel, regelkring, organen) vanaf regel 1120. Elke scène legt zijn tijden vast via `W(zin, 'woord')`, dus beeld hangt aan woordtijden.
- **Transcript** onder de speler: statische HTML regel 291–597 met knoppen `data-ch`/`data-t`; tekst is gelijk aan `sentences[].text` (gecontroleerd: 284 zinnen identiek).
- **Speler** regel 2387–2676: audio per hoofdstuk is de klok; bij `ended` volgt het volgende hoofdstuk. `gate()` (regel 2547) pauzeert aan het eind van de bedenktijd tot er een antwoord (Leerling) of Verder (Klas) is; instellingen "Automatisch verder" en "Woorden meekleuren" (localStorage `vp1.*`); `?modus=klas`; toetsen spatie, ←/→ (Shift = 30 s), ↑/↓ hoofdstuk, A/B/C, Enter. Smalle schermen: ondertitels en vraagkaart onder het beeld (`#capband`, `#qband`).

## Zo pas je deze film aan
1. **Eén zin opnieuw inspreken**: de audio is per hoofdstuk één bestand (één `take` per hoofdstuk, bijv. `4a`). Vervang de blob van dat hoofdstuk (bijv. 010.mp3 voor H4) en zet voor dat hoofdstuk `dur`, `segments` (alle t0/t1, `count0/count1/reveal`) en alle `sentences`/`phrases`-tijden opnieuw. Andere hoofdstukken blijven ongemoeid. Pas het statische transcript (regel 291–597) mee aan.
2. **Na elke tekst- of timingwijziging**: controleer dat elke `W(n, 'woord')` in de scène nog bestaat; een ontbrekend woord geeft een fout en het hoofdstuk tekent niet. Zinsnummers `n` schuiven als je zinnen toevoegt of weghaalt.
3. **Tekst op het scherm**: zoek de string in de scènefunctie (bijv. `"meiose zelf: zie 'Eén wordt twee'"` in `SCENES['1']`); eindkaartregels in `SCENES['11']` (`E.endCard(...)`), hoofdstuksubtitels via `E.chapterCard`.
4. **Vraag aanpassen**: `segments[kind=question]` (`q`, `opts`, `correct`, `expl`). Omdat de vraag ingesproken is, betekent een andere vraagtekst ook nieuwe audio voor dat stuk; alleen opties/uitleg wijzigen kan zonder opname.
5. **Uitspraak**: de pagina noemt de respelling "ha cee gee" voor hCG; de overige stem-invoer staat niet in de HTML. Gebruik bij nieuwe opnames de uitspraaklijst.

## Aandachtspunten
- Bestandsnaam en index-link heten nog `1-precies-op-tijd`, titel is "Van bevruchting tot baby"; ~~de poster in de speler zegt nog "Precies op tijd"~~ (verbeterd in v2.4). De index-tegel noemt 19:45, de pagina 19:43.
- ~~Bij alle zeven voorspelvragen is A het juiste antwoord.~~ Verbeterd 12-10-2026: opties gedraaid in `FILM` en in het transcript; volgorde juiste antwoorden B, C, A, C, B, A, C.
- Geen Havo/Vwo-schakelaar en geen verdiepingsblokken (`hasV` overal false), terwijl het docentdeel leerdoel 3 (eiwit- vs steroïdhormoon) "verdieping" noemt en de film ook aan BvJ 4 vwo thema 2 / de havo-route op de index wordt gekoppeld.
- Stemmodel is eleven_multilingual_v2 (opname uit v1), andere films gebruiken eleven_v4; zes zinnen zijn later opnieuw ingesproken, dus binnen een hoofdstuk kunnen klankverschillen hoorbaar zijn.
- H1 verwijst naar de film "Eén wordt twee" voor de meiose; die film staat niet in de repo (de pagina zegt elders "zie de serie Cel").

## Wachtlijst opnieuw inspreken
Deze film heeft audio per hoofdstuk (één take per hoofdstuk): per gewijzigd hoofdstuk de hele blob opnieuw opnemen en daarna `dur`, `segments`, `sentences` en `phrases` van dat hoofdstuk opnieuw zetten (zie "Zo pas je deze film aan", punt 1–2). Andere hoofdstukken blijven ongemoeid; alleen de globale begintijden van latere hoofdstukken schuiven. Opnemen met Roos; let op: de rest van de film is eleven_multilingual_v2, dus voor gelijke klank bij voorkeur hetzelfde model. hCG (komt in de nieuwe zinnen niet voor) blijft "ha cee gee".

- **H7 Dichtbij, maar gescheiden (blob 013.mp3 = audio/ch_7.mp3), 15-10-2026: navelstreng toegevoegd** (aanvulling na vergelijking met Gewoon Uitgelegd). Eén [nieuw]-zin na "De trofoblast vormt daar vlokken, vol bloedvaatjes van het kind.": de navelstreng verbindt het kind met de placenta, met twee slagaders en één ader van het kind.
  - Opname: hele hoofdstuktake H7 opnieuw (≈ 64 s → ≈ 72 s). Daarna in `FILM.chapters[7]` `dur`, `segments` (narr/tail), alle `sentences`/`phrases`-tijden en het statische transcript (regel 291–597) bijwerken. Zinsnummers vanaf de oude zin "Die vlokken hangen…" schuiven één op: alle `W(n,'woord')` in `SCENES['7']` (regel 1969) vanaf die zin met één verhogen en controleren dat elk woord nog bestaat. H8–H11 beginnen ca. 8 s later (globaal).
  - **Beeld nodig**: in `SCENES['7']` bij de vlokken een navelstreng van de placenta naar het kind, met twee slagaders en één ader (label NAVELSTRENG, 2 SLAGADERS, 1 ADER; kleuren volgens de afspraak bloed koraal), op het woord "navelstreng".
  - **Risicowoorden (uitspraaktest)**:
    | woord | uitspraak (IPA) | voorstel stem-invoer |
    |---|---|---|
    | navelstreng | /ˈnaː.vəlˌstrɛŋ/ (Wiktionary, Dutch) | navelstreng (zoals geschreven) |
    ("slagaders" komt al voor in H4 en telt niet mee; "ader" is een gewoon woord.)

- **H11 Als het niet vanzelf gaat (blob 017.mp3 = audio/ch_11.mp3), 15-10-2026: biologisch tegenover ethisch argument bij ivf** (aanvulling na vergelijking met Gewoon Uitgelegd; geen nieuwe pauzevraag). Vier [nieuw]-zinnen na "omdat het gele lichaam na zo'n behandeling niet altijd genoeg maakt.", vóór "Ivf werkt dus alleen omdat artsen de signalen uit deze film nadoen…": overgebleven embryo's worden ingevroren; voorbeeld van een biologisch argument (embryo van vijf dagen = bolletje cellen zonder zenuwstelsel) en een ethisch argument (elk embryo is het begin van een mens).
  - Opname: hele hoofdstuktake H11 opnieuw (≈ 152 s → ≈ 170 s); de ingesproken vraag aan het eind blijft letterlijk gelijk. Daarna in `FILM.chapters[11]` `dur`, alle `segments` (narr, question met `count0/count1`, reveal, end, tail), `sentences`/`phrases` en het statische transcript bijwerken. Zinsnummers vanaf de oude zin "Ivf werkt dus alleen…" schuiven vier op: alle `W(n,'woord')` in `SCENES['11']` (regel 2288) met die n of hoger met vier verhogen, ook de eindkaart (`E.endCard`). De film wordt ca. 26 s langer in totaal (H7 + H11): 19:43 → ca. 20:09; duur op pagina en index-tegel aanpassen.
  - Lees bij het nalezen even mee of "Ivf werkt dus alleen…" na de ethiekzinnen nog goed loopt; zo niet, dan "dus" weglaten (dat vraagt dan een gewijzigde bestaande zin).
  - **Beeld nodig**: in `SCENES['11']` op de ivf-tijdlijn na de terugplaatsing een vriezer/rietje met embryo's (label INGEVROREN EMBRYO'S), daarna een balans of twee kaarten: BIOLOGISCH ARGUMENT (feiten, biologische kennis: '5 dagen, bolletje cellen, geen zenuwstelsel') en ETHISCH ARGUMENT (normen en waarden: 'begin van een mens'). Dezelfde vorm als de balans in DNA-film 8 als die er al is.
  - **Risicowoorden (uitspraaktest)**:
    | woord | uitspraak (IPA) | voorstel stem-invoer |
    |---|---|---|
    | ethisch | /ˈeː.tis/ (Wiktionary, Dutch) | ethisch (zoals geschreven); bij een Engelse th of "-isch" met sch: "eetis" |
    | biologisch | /bijoːˈloːɣis/ (klemtoon op -lo-) | zoals geschreven |
    | zenuwstelsel | /ˈzeːnyʋˌstɛlsəl/ | zoals geschreven |
    | ingevroren | /ˈɪŋɣəˌvroːrə(n)/ | zoals geschreven |

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s: de speler slaat het stille midden van de kaart over (mp3 ongewijzigd). Bij de vraag aan het eind van H11 springt de film nu naar de eindkaart in plaats van naar het einde van de film.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Engine: `g.label()` tekent geen lijn + stip meer: het tekstblok (naam + toelichting) schuift naar het anker en staat er direct naast, aan de kant waar het vroeger stond (gap 14 px, binnen beeld geklemd), met een donkere rand rond de letters; `g.text()` kreeg daarvoor de optie `halo`. Geldt voor alle ±80 labels in de film. Losse aanpassingen: 'vlokken' (placenta) staat rechts naast de vlokken met de toelichting in drie regels; 'eicel' (bevruchting) gecentreerd in de eicel. Zoomcirkellijnen en annotatiehaken bleven (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).

## Wijziging 22 okt 2026 (v2.2): castpersonages i.p.v. grijze poppetjes
Alleen beeld; audio, timing, tekst, ondertitels en speler ongewijzigd (`spelerfix.py --check` OK).
- Nieuw scriptblok vóór `scenes_a.js` in de HTML: het castboek (`bron/src/lib_cast.js`, kopie van `personages/lib_cast.js` van 22 okt) + `bron/src/castfiguren.js` (globale `rgba`/`circ`/`roundRect` voor het castboek, `castFig(g, id, x, y, h, o)` met fade via een eigen canvas, `castBuik()`, `castFoetus()` = ongeboren kind opgekruld in castboekstijl, `castNavelstreng()`). De oude `E.person` in de engine bestaat nog, maar wordt alleen nog gebruikt voor de telpoppetjes.
- Personages: **jij = Noor**, **(je) moeder = Esra** (zwanger in het castboek; zelfde huid- en haartint als Noor), **je oma = Femke** (outfit `gewoon`, met `zwanger`): Kamiel vroeg een passend volwassen personage; Femke is de enige volwassen vrouw zonder vaste werkrol die qua leeftijd en uiterlijk een jonge oma-in-verwachting kan zijn (Mirjam is de verloskundige, Kim de arts, Visser de docent) en haar huid/haar passen bij Esra en Noor (familie). Opa Henk is de enige echte opa; een vrouwelijke oma bestaat nog niet in het castboek.
- H0 (Opening): 'de moeder' = Esra met groeiende buik (`zwanger` 0,15 → 1); oma → moeder → jij = Femke, Esra, Noor (zwaait).
- H1: 'je oma, 5 maanden zwanger' = Femke; daarna een kijkje in de buik: baarmoederwand, vruchtwater en het ongeboren meisje (`castFoetus`), de zoomcirkel naar de eierstokjes vertrekt nu vanaf haar bekken.
- H9 (Een lus die zichzelf versterkt): het anatomische schema (doorsnede baarmoeder) bleef; het grijze omgekeerde poppetje is vervangen door een opgekruld kind met het hoofd naar beneden, vruchtwater, placenta (linksboven) en golvende navelstreng (2 slagaders koraal, 1 ader blauw). Bij 'eruit' zakt het kind door de hals en verschijnt de baby uit het castboek naast de baarmoeder (eerst blij, daarna slapend). Keuze: een castpersonage (staand) past niet in een doorsnede; een foetus in castboekstijl wel.
- H11: 'je oma' en 'jij' onderaan = Femke en Noor. De twaalf poppetjes bij '1 op de 6 stellen' zijn telpoppetjes en bleven bewust staan.
- Vervangingen staan als oud → nieuw in `bron/src/vervangingen_v2_2.py` (lijst `R`), om ze opnieuw toe te passen op een versie zonder deze wijziging.

## Wijziging 22 okt 2026 (v2.3): vaste rollen uit `personages/ROLLEN.md`

Alleen beeld (audio, timing, tekst en ondertitels ongewijzigd). De familie van Noor uit het castboek:
- **jij = Noor** (ongewijzigd).
- **(je) moeder = Linda** (was Esra) met `outfit:'zwanger'` (= 16 jaar geleden, zwanger van Noor) en `zwanger` 0..1: H0 'de moeder' (buik groeit 0,15 → 1) en 'je moeder' in de rij oma → moeder → jij.
- **je oma = Oma Ria** (was Femke) met `outfit:'vroeger'` (jong, ± 45 jaar geleden) en `zwanger` (0,6 / 0,8): H0 rij, H1 'je oma, 5 maanden zwanger' met kijkje in de buik (`castBuik('ria', …)`), H11 'je oma' onderaan.
- `bron/src/lib_cast.js` = kopie van het actuele castboek (22 okt 2026, met Linda/Ria en de nieuwe gangen); in de HTML is alleen het castblok vervangen plus de vijf aanroepen. De vervangingen staan als lijst `R23` onderaan `bron/src/vervangingen_v2_2.py` (toepassen ná `R`).
- Let op: Linda's zwangerschapsoutfit is mosterdgeel, net als Noors trui; in de rij oma → moeder → jij lijken moeder en jij daardoor qua kleur op elkaar (kan alleen in het castboek worden aangepast).

## Wijziging 22 okt 2026 (v2.4): Vragen uit nagelopen, startscherm, verbeterblad prompt v8
- Vragen uit gecontroleerd (prompt v8, B9/B11): alle zeven vragen afgespeeld met `?vragen=uit`, van 4 s vóór de knip tot erna, en per vraag de beelden vlak vóór de vraag en in het staartje van het hoofdstuk gerenderd. Geen gesproken vraag, geen vraagkaart, geen kort antwoordwoord, geen tekst die naar de vraag verwijst; de vertelling na een vraag leunt er nergens op. Niets aangepast nodig.
- Startscherm (poster) zegt nu "Van bevruchting tot baby" in plaats van "Precies op tijd"; versie op de pagina 2.4.
- Opwaarderen naar prompt v8 (B14): nog geen promptstempel; de film telt als v4 (ombouw 11 okt) met castpersonages (v2.2/v2.3). Verbeterblad met 16 voorstellen staat in de claude.ai-artifact 'Verbeterblad prompt v8' (db-collectie `keuring`, ids `vp1-1` … `vp1-16`). Pas na Kamiels keuze worden de aangevinkte scènes aangepast; stem, script, vragen en timing blijven.

## Opwaardering naar prompt v8 (2.5 · 22 okt 2026)

Werkwijze B14: verbeterblad met 16 voorstellen (claude.ai-artifact 'Verbeterblad prompt v8', ids `vp1-1` … `vp1-16`); Kamiel zei in de chat 'doe ze allemaal'. Stem, script, vragen, timing en speler zijn ongewijzigd; er is niets opnieuw ingesproken.

Gedeelde tekenbibliotheek: in de HTML staat een nieuw scriptblok na het castboek met `bron/src/bio_shim.js` (globale `C`, `clamp`, `lerp`, `ease`, `hash`, `lighten`, `shape`, `nucleus`, `mitochondrion`, want deze film heeft die alleen binnen `ENG`) en daarna `bron/src/lib_bio.js` (kopie van `bibliotheek/lib_bio.js`, tussen `/* lib_bio.js (kopie` en `/* einde lib_bio */`). Bij een nieuwe bibliotheekversie: dat stuk vervangen en de film opnieuw inpakken.

| Voorstel | Scène | Nu |
|---|---|---|
| 1 korrel weg | engine `G.bg`, `zoomCircle` | Micro-achtergrond egaal; `ENG.cell` tekent zelf een rustige textuur binnen de cel (`texture:false` zet die uit) |
| 2 organen in het lichaam | H0 deel 2 | Linda (h 680) met `hoofdKijkje` (hersenen vooraanzicht, hypothalamus/hypofyse) en `buikKijkje` (baarmoeder groeit met de zwangerschap, eierstokken, foetus); hormonen reizen tussen de echte organen (`bioPunt`); namen naast het lichaam; tijdlijn 9 maanden rechtsonder |
| 3 eierstok van het meisje | H1 zoom | `eierstokDoorsnede` zonder follikels + oögonia die zich delen → oerfollikels (`follikel` f=0) |
| 4 volle eicel | H1 deel B | zona pellucida, poollichaampje binnen de zona, mitochondriën, ribosomen, mRNA als dunne slierten met ribosomen; namen in een vaste kolom rechts |
| 5 op schaal | H1 stroom/vergelijking, H5 | `zaadcelEcht` op de schaal van de schaalbalk (H1 3,2 px/µm, H5 4 px/µm); H5 zona ± 12 µm, stralenkrans in twee lagen met opening; labels in vaste vakken |
| 6 hersenen en bloed | `LIB.hpg` (H2, H9, H10) en H2 deel A | `hoofdHersenen` (s 0,62) i.p.v. tekstvakken; GnRH langs het steeltje; FSH/LH in een `bloedvat` naar de geslachtsklier; H2 en H9 (oxytocine) eigen `bloedvat`; `hpg` geeft nu ook `hthP` en `hypP` terug |
| 7 gebogen membraan | H2 deel B | `membraanBoog` (cel met straal 900 rechts), receptor als transmembraaneiwit, hormoon dokt erop; labels buiten de cirkel |
| 8 zaadbuisjes | H2 deel C | `zaadbalWeefsel` (testosteron- en inhibinedeeltjes volgen de woorden) |
| 9 follikels | H3, H4 | `eierstokDoorsnede` met rustende follikels; groeiende follikels en de dominante met `follikel`; zoom = echte follikel met theca |
| 10 slijmvlies | H3, H4, H6 | `baarmoederwand` (H4: dikte uit het model, klieren kronkelen na de eisprong, afstoten bij de menstruatie, geknipt onder de grafiek) |
| 11 hCG naar het geel lichaam | H4, H6 deel B | `geelLichaam` (verschrompelt zonder hCG; in H6 180° gedraaid zodat de cel met LH-receptoren links zit); hCG door een `bloedvat` van het embryo naar het geel lichaam; embryo als blastocyste in de wand |
| 12 zwangerschapstest | H6 deel C | `zwangerschapstest` (urine trekt door, teststreep kleurt), antistoffen boven de teststreep |
| 13 placenta | H7 | `placentaDoorsnede` met navelstreng naar het kind (`castFoetus`); zoom = `vlokVergroot`, stoffen steken over tussen `moederX` en `kindX(y)`; virussen als `hivVirus` |
| 14 aanleg | H8 | `aanlegGeslacht` (man/vrouw als vloeiende overgang); de oude functie `anlage` staat er nog maar wordt niet meer gebruikt |
| 15 hiv en bacterie | H10 deel C | `tHelperCel`, `hivVirus` (bindt, versmelt), `bacterieCel` (antibiotica laten de wand openbreken) |
| 16 eileider | H11 deel B | `eileiderLangs` (ontsteking, litteken op 0,55); zaadcellen en embryo via `lumen(u)` |

Gecontroleerd: alle hoofdstukken elke 0,5 s gerenderd zonder fouten; geen tekst over tekst behalve de bestaande overgangen naar de onthullingskaart; Vragen uit nagelopen (afgespeeld en staartjes gerenderd); frametijd ≤ 28 ms bij 4× vertraagde CPU (H2 zaadbal het zwaarst).
Bewust anders: het vergrote zaadcelbeeld in H1 ('ZAADCEL · VERGROOT') houdt de oude schematische zaadcel met gekleurd middenstuk, omdat de namen kern/mitochondriën/staart daarop staan; de virussen in H10 en H7 zijn niet op schaal (staat in beeld); de telpoppetjes bij '1 op de 6 stellen' (H11) blijven.

## Wijziging 22 okt 2026 (v2.6): hersenen naast het gezicht
Kamiel vond de hersenen over het gezicht van Linda (H0 deel 2) een beetje creepy. Het gezicht blijft nu zichtbaar: `hoofdKijkje` wordt alleen nog aangeroepen met `a: 0` (geeft de plek van hypothalamus/hypofyse terug voor de hormoonbanen) en de hersenen (`breinVoor`, s 1,42) staan in een `zoomCircle` rechtsboven naast het hoofd (735, 205, r 118), met de gouden lijnen vanaf de hypofyse-plek achter de neuswortel. Label 'hersenen / HYPOTHALAMUS EN HYPOFYSE' staat rechts van die cirkel. Alleen beeld; audio, timing en tekst ongewijzigd.

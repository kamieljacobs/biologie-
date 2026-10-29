# Een Ecologie-v2-film bouwen (helperbrief)

Je bouwt film N (1–8) van de reeks Ecologie (v2) voor Kamiel (biologiedocent, havo/vwo). Script en storyboard zijn **goedgekeurd** (één keyframe per scène); jouw taak is van die keyframes een **geanimeerde film** maken in de FILMDATA-straat. Het script wijzig je niet: **de stem staat al op het script** (veld `voice` in segments.json is ingesproken of wordt dat door een andere helper).

## Wat er al klaar staat (werkmap `/root/hwe/e<N>/`)
- `segments.json` — gesproken alinea's (`sNN`, kind speech), vraagkaarten (`qNN`), titel, eindkaart. **Eén scène uit het storyboard = één alinea.**
- `map.json` — scène-id uit het storyboard (`e<N>s07`) → segment-id (`s08`); `e<N>qNN_kaart` → de vraagkaart (`qNN`, die tekent de speler zelf). Films 7 en 8 hebben geen lege eindscène: hun eindkaart (`card`) komt na de laatste alinea en heeft geen scène-id.
- `/root/eco2/films/f<N>.json` — per scène `tekst`, `beweging` (wat er moet bewegen), `look`, `laag`; ook keuzes, getallen, uitspraak.
- `/root/eco2/src/sb<N>.js` — het keyframe per scène (`SB<N>.e<N>s07(ctx)`): compositie, plekken, kleuren, labels. Dit is de goedgekeurde look: houd je eraan.
- Tekenfuncties: `/root/eco2/src/teken_eco<N>.js` (film-eigen, voorvoegsel `e<N>`; film 2 laadt ook `teken_eco1`, film 6 ook `e11_aarde`), `/root/hwe/ecolib/lib_eco.js` (reeksbibliotheek), `lib_evo.js` (hoofdstukKaart, macroNacht, pot …), `lib_bio.js`, `base.js` (circ, vul, lijn, pijl, _dk/_lt), `dier_basis.js`, engine `lib.js` en de kop van `/root/hwe/engine/scenes.js` (r. 1–32: tag, regel, pijl, haak …; zie `/root/biologie-/films/vervolg/BOUWEN.md`, kopje API), personages `engine/lib_cast.js` (`persoon(ctx, id, x, voetY, h, {uit, pose, zij, kijk, gang, t})`, rollen in `/root/biologie-/personages/ROLLEN.md`).
- **Seriekleuren `ECOK`** (lib_eco.js): `energie` goud, `koolstof` #5E6675, `stikstof` #4F86C6, `fosfor` #E08A3C, `organisch` groen, `anorganisch` #9AA3B2, `water` teal, `warmte` koraal. Max drie betekeniskleuren + goud per beeld; geen paars als betekeniskleur.
- Audio en echte woordtijden komen binnen in `audio/` en `words/` (helper spreekt in volgens INSPREKEN_ECO.md); zolang ze ontbreken gebruikt de bouw nepwoordtijden (2,4 w/s). Bouw gewoon door; bouw aan het eind opnieuw met de echte tijden.

## Dieren (uitknippoppen, alle in `/root/hwe/ecolib/`)
Aanroep `naam(ctx, x, y, s, { houding, t, kijk, a })`: (x, y) = grondpunt midden onder het dier, `s` = px per cm, `t` = fase (laat met de tijd meelopen), `kijk` = ±1. Grep in het bestand voor details; maten en lessen in `/root/ecopop/lessen_pop_eco_*.md`.
- `pop_eco_rovers.js`: `ecoVos` staan | lopen | draven | sluipen | muizensprong | eten; `ecoLynx` staan | lopen | sluipen | sprinten | besprong.
- `pop_eco_hoef.js`: `ecoSchaap` staan | lopen | grazen | liggen; `ecoRee` staan | lopen | grazen | sprong | liggen (o.gewei); `ecoMoeflon` staan | lopen | grazen | rennen; `ecoWildzwijn`/`ecoFrisling` staan | lopen | wroeten | draven.
- `pop_eco_klein.js`: `ecoBever` staan | lopen | knagen (o.tak) | zwemmen (y = waterlijn); `ecoKonijn` zitten | grazen | huppen | rennen; `ecoSneeuwschoenhaas` zitten | rennen | staan (o.vacht zomer/winter); `ecoSpitsmuis` staan | rennen | snuffelen.
- `pop_eco_klein2.js`: `ecoGaai` staan | eikel | duwen | tak | vliegen | hippen | pikken; `ecoPimpelmees` staan | tak | schuin | klampen | vliegen | hippen | pikken; `ecoPissebed`, `ecoRegenworm` zij | boven (vooruit); `ecoDuizendpoot`, `ecoLeverbotslak` (t, vooruit); `ecoSteenvlieglarve` (lopen), `ecoEendagsvlieglarve` (kieuwslag), `ecoMuggenlarve` zij | boven | rust; planten `ecoEikenblad` (o.stadium), `ecoKlaver` (o.knol, o.wind), `ecoHelm`, `ecoStruikheide`, `ecoGroveDen`, `ecoBerk`, `ecoZomereik`.
- Verder: `wolf_pop.js`, `pop_honden.js` (o.a. `muis`), `pop_katten.js`, `pop_hoef.js` (`koe7`), `pop_vogels.js`, `pop_darwin.js`, `dieren_zoog.js`, `dieren_overig.js` (`koolmees`, `merel`, `hagedis`, `slak`, `blad` …). De wolf hoort niet in deze acht films.
- Echte beweging: dieren lopen/zwemmen/vliegen met hun pop-houdingen; laat `t` meelopen en verschuif het dier met de gangsnelheid (geen glijdende poten), voeten op de grond.

## Wat jij maakt
1. `/root/hwe/e<N>/scenes_e<N>.js` met `Object.assign(SCENES, { title(ctx, t) {…}, s01(ctx, t, q) {…}, … })` — één functie per speech-segment. `t` = seconden sinds het begin van de alinea; `q.on('woord', n=1, dur=0.6)` = 0→1 vanaf het n-de woord dat 'woord' bevat (substring, hoofdletterongevoelig!), `q.at('woord', n)` = die tijd. (Er staat nu een rooktestversie die alleen de keyframes tekent; die vervang je.)
2. Eigen hulpfuncties in `/root/hwe/e<N>/teken_e<N>.js` (wordt na de film-tekenbestanden en vóór sb<N>.js geladen). **Pas niets aan in `/root/eco2/` of `/root/hwe/ecolib/`** (gedeeld met andere helpers); moet een gedeelde functie anders, overschrijf hem in je eigen teken_e<N>.js.
3. `title(ctx, t)`: alleen het beeld rechts van de titelkaart (de `beeld`-callback uit het keyframe van de titelscène, rustig levend). De speler tekent titel (120 px, korter dan 23 tekens), ondertitel en puzzel zelf links: houd het beeld rechts van x ≈ 1150 (bij film 8 schuift het dossier nu onder de titel).

## Hoe een scène eruitziet
- Begin met het keyframe als eindbeeld en bouw het op **in de maat van de stem**: elk element verschijnt, beweegt of licht op op het woord waar het genoemd wordt (`q.on`). Volg het veld `beweging`. Het keyframe-moment moet in de scène zichtbaar zijn.
- Echte beweging, geen diavoorstelling: stromen (pijlen van energie en stoffen) lopen, grafieken groeien, kringlopen draaien, populaties groeien of krimpen, bladeren vallen uiteen. Rustig tempo; geen druk geflikker. Energie stroomt één kant op (verlaat het ecosysteem als warmte), stoffen gaan rond; voedselpijl van gegeten naar eter.
- Doorlopende overgangen binnen een hoofdstuk waar het kan. Wissel van look (Macro/Micro/Schema) alleen met een zoomcirkel (`zoomCircle`) of harde snede.
- **Vraag-alinea's** (de alinea vóór een vraagkaart, scène `e<N>qNN`): het keyframe is een vraagkaart, maar die tekent de speler direct daarna. Toon in de alinea zelf de situatie waar de vraag over gaat, **niet** de vraagkaart. **Antwoord-alinea's** (na een vraagkaart): geen 'antwoord a/b/c' en geen verwijzing naar de vraag in beeld (bij Vragen uit wordt de vraag overgeslagen); laat de inhoud zelf zien.
- Linksboven tekent de speler al 'havo · vwo · ecologie N/8' en bij vwo-alinea's de paarse markering: `ecoTag`, `evoTag` en `vwoMarker` zijn in de bouw uitgezet. Niets onder y ≈ 880 behalve schaal-/metalabels linksonder (daar komen de ondertitels).
- Beeldafspraken (`/root/biologie-/films/BEELDAFSPRAKEN.md`): geen wijslijnen, naam direct bij het onderdeel (`naamBij`), geen korrel, max drie betekeniskleuren + goud, alleen castpersonages (geen grijze poppetjes; in de vertelling niet bij naam), echte maten, cel rond, inhoud binnen het membraan, één tekstbalk tegelijk. Weinig tekst in beeld; herhaal de ondertitel niet.
- Fade personen snel in (`q.on(w,1,0.3)`); halfdoorzichtige mensen zien er spookachtig uit.

## Bouwen en controleren
```
cd /root/hwe && python3 eco_bouw.py <N>                      # scenes.js + film.json + filmdata + html + rooktest (ERRORS of 'rooktest ok')
python3 engine/cuecheck.py e<N> e<N>/scenes_e<N>.js          # elk cuewoord moet in de alinea staan (let op substrings)
python3 engine/stills.py e<N> e<N>/qa contact                # 3 stills per alinea (25/60/92%)
python3 engine/sheet.py e<N>/qa <jouw scratchpad>/sheet_e<N>.png 4   # bekijk met Read
```
(`python3 eco_bouw.py <N> --statisch` zet de rooktestversie terug en overschrijft je scenes_e<N>.js: niet gebruiken als je animatie al bestaat. `stills.py e<N> e<N>/qa s07:3.5 s08:1` voor losse tijden; maak `qa` leeg vóór een nieuwe contactsheet.) Kijk de sheets na op: overlap, tekst buiten beeld, lege of statische schermen, beeld dat niet past bij wat er op dat moment gezegd wordt, dieren die glijden of los van de grond hangen, labels over tekeningen, JS-fouten. Herstel en bouw opnieuw tot alles klopt. Zodra `ls /root/hwe/e<N>/words | wc -l` gelijk is aan het aantal speech-segmenten en `stem/gen.json` bestaat, is de audio klaar: bouw dan opnieuw, draai cuecheck en een laatste contactsheet.

Laadvolgorde in scenes.js (eco_bouw.py): engine-kop, `const SCENES`, base, dier_basis, lib_bio, lib_evo, dieren_zoog, stubs (`berkenspanner`, `rups`), dieren_overig, wolf_pop, pop_honden, pop_katten, pop_hoef, pop_vogels, pop_darwin, pop_eco_rovers, pop_eco_hoef, pop_eco_klein, pop_eco_klein2, lib_eco, film-tekenbestanden, teken_e<N>, sb<N>, scenes_e<N>, uitzetters. `_mix` uit base.js is in de straat hernoemd, zodat `_mix` van lib_cast.js geldt (zoals bij de storyboardrender).

## Grenzen
Niet pushen, niet publiceren, niets in `/root/biologie-` aanpassen, niets inspreken, geen ElevenLabs. Alleen in `/root/hwe/e<N>/`. Het inpakken naar de repo (`eco_pak.py`) doet de coördinator.

## Rapport (kort)
Wat er per hoofdstuk beweegt, wat je bewust anders deed dan het storyboard en waarom, open punten of twijfels, en of de bouw met echte woordtijden is gedaan.

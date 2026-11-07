# Een Evolutie-v2-film bouwen (helperbrief)

Je bouwt film N van de reeks Evolutie (v2) voor Kamiel (biologiedocent, havo/vwo). Script en storyboard zijn **goedgekeurd** (één keyframe per scène); jouw taak is van die keyframes een **geanimeerde film** maken in de FILMDATA-straat. Het script wijzig je niet (de stem is erop ingesproken).

## Wat er al klaar staat (werkmap `/root/hw/e<N>/`)
- `segments.json` — gesproken alinea's (`sNN`, kind speech), vraagkaarten (`qNN`), titel, eindkaart. **Eén scène uit het storyboard = één alinea.**
- `map.json` — scène-id uit het storyboard (`e<N>s07`) → segment-id (`s08`); `e<N>qNN_kaart` → de vraagkaart (`qNN`, die tekent de speler zelf).
- `/root/evo2/films/f<N>.json` — per scène `tekst`, `beweging` (wat er moet bewegen), `look`, `laag`; ook keuzes en getallen.
- `/root/evo2/src/sb<N>.js` — het keyframe per scène (`SB<N>.e<N>s07(ctx)`): compositie, plekken, kleuren, labels. Dit is de goedgekeurde look: houd je eraan.
- Tekenfuncties: `/root/evo2/src/teken_evo<N>.js` (film-eigen), `/root/hw/evolib/lib_evo.js` (pot, knikker, allelBalk, histogram, cladogram, lhb …), `/root/hw/evolib/lib_dieren.js` (alle dieren als goedgekeurde uitknippop; houdingen en bewegingen in `/home/claude/biologie-/bibliotheek/dieren/README.md` en `…/dieren/lessen/*.md`), `lib_micro_evo.js`, `lib_bio.js`, engine `lib.js` en de kop van `/root/hw/engine/scenes.js` (r. 1–32: tag, regel, pijl, haak, naamBij-achtigen; zie `/home/claude/biologie-/films/vervolg/BOUWEN.md`, kopje API), personages `lib_cast.js` (`persoon(ctx, id, x, voetY, h, {uit, pose, zij, kijk, gang, t})`).
- Audio en echte woordtijden komen binnen in `audio/` en `words/` (helper spreekt in); zolang ze ontbreken gebruikt de bouw nepwoordtijden (2,4 w/s). Bouw gewoon door; bouw aan het eind opnieuw met de echte tijden.

## Wat jij maakt
1. `/root/hw/e<N>/scenes_e<N>.js` met `Object.assign(SCENES, { title(ctx, t) {…}, s01(ctx, t, q) {…}, … })` — één functie per speech-segment. `t` = seconden sinds het begin van de alinea; `q.on('woord', n=1, dur=0.6)` = 0→1 vanaf het n-de woord dat 'woord' bevat (substring, hoofdletterongevoelig!), `q.at('woord', n)` = die tijd.
2. Eigen hulpfuncties in `/root/hw/e<N>/teken_e<N>.js` (wordt na lib_dieren en vóór sb<N>.js geladen). **Pas niets aan in `/root/evo2/src/` of `/root/hw/evolib/`** (gedeeld met andere helpers); moet een gedeelde functie anders, overschrijf hem in je eigen teken_e<N>.js.
3. `title(ctx, t)`: alleen het beeld rechts van de titelkaart (de `beeld`-callback uit het keyframe van de titelscène, rustig levend: beestjes kruipen, knikkers rollen); de speler tekent titel, ondertitel en puzzel zelf links.

## Hoe een scène eruitziet
- Begin met het keyframe als eindbeeld en bouw het op **in de maat van de stem**: elk element verschijnt, beweegt of licht op op het woord waar het genoemd wordt (`q.on`). Volg het veld `beweging`. Het keyframe-moment moet in de scène zichtbaar zijn.
- Echte beweging, geen diavoorstelling: dieren lopen/vliegen/zwemmen met hun pop-houdingen (`houding`, `t` = fase; laat `t` met de tijd meelopen en verschuif het dier over de grond met de gangsnelheid, geen glijdende poten), knikkers rollen in en uit de pot, histogrammen groeien en schuiven, takken van een stamboom groeien, kaarten zoomen. Rustig tempo; geen druk geflikker.
- Doorlopende overgangen binnen een hoofdstuk waar het kan (zelfde decor blijft staan, alleen wat verandert beweegt). Wissel van look (Macro/Micro/Schema) alleen met een zoomcirkel (`zoomCircle`) of harde snede.
- **Vraag-alinea's** (de alinea vóór een vraagkaart): toon de situatie waar de vraag over gaat, **niet** de vraagkaart (die tekent de speler direct daarna). **Antwoord-alinea's** (na een vraagkaart): geen 'antwoord a/b/c' en geen verwijzing naar de vraag in beeld (bij Vragen uit wordt de vraag overgeslagen); laat de inhoud zelf zien.
- Linksboven tekent de speler al 'havo · vwo · evolutie N/8' en bij vwo-alinea's de paarse markering: `evoTag`/`vwoMarker` zijn uitgezet. Niets onder y ≈ 880 behalve schaal-/metalabels linksonder (daar komen de ondertitels).
- Beeldafspraken (lees `/home/claude/biologie-/films/BEELDAFSPRAKEN.md`): geen wijslijnen, naam direct bij het onderdeel (`naamBij`), geen korrel, max drie betekeniskleuren + goud, allel 1 = teal ('blauw'), allel 2 = oker ('geel'), alleen castpersonages (geen grijze poppetjes), echte maten, cel rond, inhoud binnen het membraan, één tekstbalk tegelijk. Weinig tekst in beeld; herhaal de ondertitel niet.
- Fade personen snel in (`q.on(w,1,0.3)`); halfdoorzichtige mensen zien er spookachtig uit.

## Bouwen en controleren
```
cd /root/hw && python3 evo_bouw.py <N>                      # scenes.js + film.json + filmdata + html
python3 engine/cuecheck.py e<N> e<N>/scenes_e<N>.js          # elk cuewoord moet in de alinea staan (let op substrings)
python3 engine/stills.py e<N> e<N>/qa contact                # 3 stills per alinea (25/60/92%)
python3 engine/sheet.py e<N>/qa /tmp/claude-0/-home-claude/26d88c08-5e8e-55a1-8770-55f176507c42/scratchpad/sheet_e<N>_<k>.png 4   # bekijk met Read
```
(`stills.py e<N> e<N>/qa s07:3.5 s08:1` voor losse tijden; maak `qa` leeg vóór een nieuwe contactsheet.) Kijk de sheets na op: overlap, tekst buiten beeld, lege of statische schermen, beeld dat niet past bij wat er op dat moment gezegd wordt, dieren die glijden of los van de grond hangen, labels over tekeningen, JS-fouten (de bouw meldt `ERRORS`). Herstel en bouw opnieuw tot alles klopt. Zodra `ls /root/hw/e<N>/words | wc -l` gelijk is aan het aantal speech-segmenten en `stem/gen.json` bestaat, is de audio klaar: bouw dan opnieuw, draai cuecheck en een laatste contactsheet.

## Grenzen
Niet pushen, niet publiceren, niets in de repo `/home/claude/biologie-` aanpassen, niets inspreken, geen ElevenLabs. Alleen in `/root/hw/e<N>/`.

## Rapport (kort)
Wat er per hoofdstuk beweegt, wat je bewust anders deed dan het storyboard en waarom, open punten of twijfels, en of de bouw met echte woordtijden is gedaan.

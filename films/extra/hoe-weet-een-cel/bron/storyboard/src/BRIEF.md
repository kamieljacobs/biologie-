# Brief tekenaar — storyboard 'Hoe weet een cel wat hij moet worden?'

Werkmap: /tmp/claude-0/-home-claude/fa842026-a8d9-58bd-bacb-c23232391b97/scratchpad/sb (verder: WM). Werk alleen hierin; wijzig niets in de repo.

**Opdracht:** teken één keyframe (stilstaand, 1920×1080 canvas) per scène uit jouw reeks scènes in
/home/claude/biologie-/films/extra/hoe-weet-een-cel/bron/storyboard/film.json (velden `tekst` = vertelling, `beweging` = wat er in beeld is, `look`, `opties` bij vraagscènes `wq..`). Het keyframe toont het belangrijkste moment van de scène.

**Bestand:** WM/src/sbw<N>.js met één object `SBW<N> = { w01(ctx){...}, ... }` (sleutel = scène-id). Eigen hulpfuncties met voorvoegsel `_w<N>`. Wijzig lib_dif.js NIET (andere tekenaars gebruiken hem); heb je iets gedeelds nodig, maak het lokaal.

**Beschikbaar (al geladen):** src/lib.js (C-palet, W, H, text, fTitel, fTekst, metaText, naamBij, roundRect, shape, rgba, circ), src/base.js (pijl …), src/lib_cast.js (`persoon(ctx, id, x, y, h, o)`: castpersonages, bv. 'noor', 'esra'; zie de functie voor opties), src/lib_bio.js (beeldbank: o.a. `blastocyste(ctx,x,y,r,o)`, `embryoEcht(ctx,x,y,s,o)`, `fruitvlieg(ctx,x,y,L,o)`, cellen, spiervezel, zenuwcel, lever, dnaDraad, eiwit als kralenketen, membraan; zoek met grep naar `^function`), src/lib_evo.js, en src/lib_dif.js (gedeeld voor deze film: `difTag(ctx, 'HOOFDSTUKNAAM')`, `difLabel(ctx,'MODEL'|'VEREENVOUDIGD'|…)`, `difTitelKaart`, `difVraagKaart(ctx, vraag, opties[], beeldFn)`, `onzeCel(ctx,x,y,r)` = de gevolgde cel met gouden rand, `landschap(ctx,x,y,w,h,{pad:[...namen], knikker:0..1, boom})` = landschap van Waddington, `landschapKlein(ctx, pad, knikker)` = klein landschap rechtsboven, `antwoordTegels(ctx,x,y,n,actief)`, kiembladkleuren `KB.ecto/meso/endo`). Dieren: `huiskat` staat in src/pop_katten.js / dieren_zoog.js (laad mee in de render-opdracht als je hem gebruikt).

**Renderen:** `cd WM && python3 render.py lib_dif,sbw<N> SBW<N>` (eventueel `pop_katten` ervoor in de lijst) → WM/out/lib_dif,sbw<N>/<id>.webp. Daarna zelf kijken: maak een contactvel (PIL, 2 kolommen, klein) en bekijk het met Read. Verbeter tot het goed is (max. 3 rondes).

**Regels (prompt v13 Part C + BEELDAFSPRAKEN, kort):**
- Achtergronden: Micro #121A26 (C.bgMicro), Macro lucht #1E2E4A/heuvels, Schema #1A2740 (C.bgSchema). Geen verloop, gloed, schaduw of korrel. Cytoplasma hooguit heel rustige textuur.
- Betekeniskleuren (max. 3 tegelijk + goud): goud = focus/onze cel, koraal = energie/bloed, groen = leven/conclusie, teal = informatie/water, paars = kern, oker = voedsel/bodem. Kiembladen: ecto teal, meso koraal, endo oker. DNA-ruggengraat grijs.
- Tekst: titels Fraunces ≥ 64 px, labels ≥ 36 px, meta (mono) ≥ 26 px. Namen direct naast/op het onderdeel, **geen wijslijnen**; labels niet over elkaar of over belangrijke delen.
- Cellen zijn rond, membranen gebogen; niets steekt buiten het celmembraan. Eiwitten = kralenketens, nooit bolletjes.
- Mensen alleen als castpersonage (persoon()), nooit grijze poppetjes; geen naam in beeld.
- Realistische grootte en plaats (organen op hun echte plek). Label `VEREENVOUDIGD`, `MODEL`, `NIET OP SCHAAL` waar het script dat zegt.
- Vraagkaarten: `difVraagKaart` met de opties uit film.json (zonder 'A '/'B '-voorvoegsel). Geen tekst die het antwoord verraadt.
- Elke scène heeft `difTag(ctx, '<NR> <HOOFDSTUKTITEL IN HOOFDLETTERS>')` linksboven (behalve titel- en vraagkaarten).
- Het is een storyboard: duidelijk en correct boven mooi, maar teken herkenbare dingen (geen rondje met een streepje). Nieuwe objecten (twijfelscènes) mogen een eerste voorstel zijn.

**Klaar:** eindbericht ≤ 10 regels: welke scènes, wat je niet goed kreeg, welke nieuwe objecten je tekende.

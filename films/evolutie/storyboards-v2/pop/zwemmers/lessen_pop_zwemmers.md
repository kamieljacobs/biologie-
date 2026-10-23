# Lessen: zwemmers als uitknippop (23 okt 2026)

Bestanden: `src/pop_zwemmers.js` (motor + 8 dieren + wrappers), `src/tv_pop_zwemmers.js` (testvel `TV_pop_zwemmers`: per dier oud/nieuw/overlay/slagstrip, scènes `sc_e7..`/`sc_e8..`, `film`),
`referentie/pop/zwemmers/tools/` (`config.py` punten per dier, `trace.py` plaat -> profiel/vinnen, `inbouwen.py` -> blok ZWDATA, `omtrek.py` -> overlay, `render_tv.py`, `render_film.py`),
`referentie/pop/zwemmers/data/<dier>.json` + `_debug.png`. Renders: `out/pop/zwemmers/testvel/*.png`, `out/pop/zwemmers/zwemmers.mp4` (10 s) en `.gif`.
Oude functies blijven bereikbaar als `_ZW_OUD.<dier>` (alleen voor het testvel). wolf_pop.js, dieren_*.js, sb*, teken_evo* niet aangepast.

## Wat anders is dan bij de wolf
1. **Geen handgetypte omtrekken: getraceerd profiel langs de ruggengraat.** `trace.py` legt een middellijn door het dier op de plaat, schiet per s loodrecht stralen naar
   rug- en buikrand en slaat (s, boven, onder) op. Vinbasissen worden overbrugd (`gaten_boven/onder`), vinnen apart uitgeknipt (masker − lijf). Elke frame wordt de omtrek
   opnieuw opgebouwd rond de gebogen keten (Catmull-Rom door 12–14 gewrichten): zachte huid zonder gewichten, en een gekromde plaat (dolfijn, bultrug) wordt vanzelf gestrekt.
2. **Toonvlakken als banden in (s, v)**, v = fractie van de halve dikte: buigen mee, geen naad; de plaat-tonen zelf traceren werkte niet (vlekkerige grenzen).
3. **Zijwaartse slag (haai, ichthyosaurus) van opzij** = alleen verkorting cos(yaw) per segment + staartvin die horizontaal smaller/breder wordt (min. 0,28) met een
   kleine afschuiving; kleine verticale golf op 2f. Walvisachtigen: de golf direct in pitch; staartvin = draagvlak-doorsnede (wig) die 90° vóór op de golf kantelt.
4. **Donkere achterrand van de haaienstaart**: vin zwart vullen, dan een naar voren verschoven kopie in vinkleur erover (geclipt) — werkt voor elke 'rand aan de achterkant'.
5. **Poten (oerwalvissen)** als één keten met profielhuid (zijranden + ronde gewrichten), onderbeen donkerder vanaf halverwege; IK zoals de wolf; zwemmen = vrije hoeken
   per bot (bekkenpeddelen: krachtslag gestrekt naar achter, herstel met gebogen knie en gestroomlijnde voet). Van opzij zie je zwemvliezen niet (spreiden staat dwars).

## Maten en bronnen (bij strijd wint de bron)
- Haai (grijze rifhaai): staartslag ±0,2 L, golflengte ±0,8–1 L (Webb & Keyes 1982); heterocerk, bovenlob leidt (Ferry & Lauder 1996). Plaat had zwarte punt op 1e rugvin
  (= zwartpunt-rifhaai) -> weggehaald; zwarte achterrand over de hele staartvin toegevoegd.
- Dolfijn: amplitude staartvin top-top 0,21 ± 0,03 L, St 0,26 (Rohr & Fish 2004); voorlijf stijf. Plaat toonde de staartvin als bovenaanzicht -> wig.
- Bultrug: flipper ±⅓ L (plaat verkort en dubbel) -> flipper met de hand (lengte 0,3 L, knobbels voorrand, wit); staartvin wig; slag 0,22 Hz.
- Ichthyosaurus (Stenopterygius): thunniform, slag in staartsteel (Motani 2002/2005); scleraalring.
- Basilosaurus: stijlplaat te gedrongen (≈ Dorudon) -> lijf van de realistische plaat (L/dikte ≈ 10); achterpootjes ±35 cm (Gingerich e.a. 1990), op 0,76 L
  (platen 0,78–0,83, oude tekening 0,70; scène e7s16 wijst naar −206 eenheden); golvend op en neer (Uhen).
- Pakicetus: landdier, lange slanke poten, lange staart, ogen hoog (Thewissen e.a. 2001); botlengtes uit het skelet op de plaat; teenganger met hoefjes.
- Ambulocetus: ±3 m, korte poten, grote achtervoeten, otter-achtig peddelen + staartgolf (Thewissen & Fish 1997). Plaat had grote voorvoeten -> klein.
- Rodhocetus: korte poten, lange voeten, hand met 3 hoefjes, afwisselende achtervoetslagen aan het oppervlak, staart als roer, géén staartvin (Gingerich 2001/2003);
  plaat had een staartvin -> staarteinde versmald (`taps`).

## Algemene regels (voor de prompt)
- Een realistische plaat levert de anatomie, de vlakke plaat de tonen; trek de omtrek automatisch (effen achtergrond), nooit met de hand.
- AI-platen tekenen een horizontale staartvin en grote flippers bijna altijd in bovenaanzicht; van opzij is dat een wig / lang smal blad.
- Middellijn-uiteinden: gauss-gladmaken geeft een haak; recht doortrekken. Vin-assen uit een breed venster, niet uit één raaklijn.
- Gat-interpolatie met begrensde hellingen (anders schiet de buikrand onder de vin door).

## Nog zwak
- Rodhocetus- en Ambulocetus-voeten (tenen schematisch), liggende Ambulocetus (achterpoten opgevouwen, niet gecontroleerd tegen bron).
- Pakicetus: geen strip met steunlijnen gemeten (voet-glijden alleen visueel gecontroleerd); oor ligt nu op (140, −146)·s, de cirkel in sb7 e7s13 staat op (166, −228)·s.
- Dolfijn/bultrug röntgen: schedel als één vlak, geen echte kaakbotten.

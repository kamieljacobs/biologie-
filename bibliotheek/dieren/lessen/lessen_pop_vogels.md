# Lessen: vogels als uitknippop (23 okt 2026)

Bestanden: `src/pop_vogels.js` (motor `VogelPop`, zangvogels `VogelZang`, grote vogels `VogelGroot`, wrappers), `src/tv_pop_vogels.js` (`TV_pop_vogels`: vink, overlay, vlucht, vluchtstrip, vzoom, hup, zoom, soorten, groot, film), `referentie/pop/vogels/omtrek.py` (omtrekken uit de realistische plaat -> `omtrek.json`, in het testvel geplakt), `rv.py` (render naar willekeurige map), `render_film.py` (mp4/gif). Renders: `out/pop/vogels/testvel/`, `nieuw/` (storyboardscènes met pop), `oud/` (zelfde scènes vóór), `vogels.mp4`, `vogels.gif`, overzichten `*_overzicht.webp`.

Render: `python3 referentie/pop/vogels/rv.py teken_evo1,…,micro_evo,pop_vogels,tv_pop_vogels TV_pop_vogels out/pop/vogels/testvel [sleutels]`.

## Wat anders is dan bij de wolf
1. **Skelet.** Dijbeen zit in de romp, knie wijst naar voren (IK-teken −1), zichtbaar is de tarsus; de 'knie' die naar achter knikt is de hiel. Het bevederde stuk van de tibiotarsus (`dij`) wordt **vóór de romp** getekend: alleen wat onder de buik uitsteekt is zichtbaar (anders een lichte lap op de flank). Reiger en pauw: onderste deel van de tibia kaal (`kaal`).
2. **Vleugel als 3D-vlak.** Botten (opperarm, onderarm, hand) draaien in het vleugelvlak met vouw f; pennen hangen aan de botten (handpennen waaieren uit, armpennen loodrecht naar achter, tertials bij de elleboog). Het vlak draait om de lichaamsas met slaghoek phi; projectie y = b·sin(phi ± 14°). Eén model geeft: dichte vleugel op de flank (f = 1, phi = −90°), opslag (pols gebogen), neerslag, en de verre vleugel. Bovenkant zichtbaar als de nabije vleugel omlaag staat; onderkant (lichter) als hij omhoog staat. Dorsaal: buitenste pennen eerst, binnenste erover; dekveren altijd bovenop.
3. **Vlucht van vinken is golvend (flap-bound)**: 2 slagen, dan vleugels dicht tegen het lijf (plaat fase 1 en 8). Merel 3 slagen en korte bound, zwaluw slagen + glijden met sikkelvleugel, reiger traag en diep zonder bound.
4. **Hippen** (zangvogels): beide voeten tegelijk, voeten staan vast tot de afzet en na de landing (`o.wereld: true` schuift het dier per sprong door).
5. **Lopen** (reiger, pauw, pauwin): tweebenig gangmodel, duty 0,62–0,64, poten in tegenfase, steunvoet staat stil (zelfde Hermite-zwaai als de wolf), tenen half gevouwen in de zwaaifase, kop 'houdt en stoot' (kopbob).
6. **Kopframe blijft heilig.** sb2 rekent met het oude kopframe van de grondvink (26, −104, pik 0,6 rad): de staan-houding plaatst de kop exact daar en zet het lijf er anatomisch achter; daardoor staan de voeten ± 50 eenheden achter het anker (`def.voetX`). Alle andere houdingen gebruiken hetzelfde voetmidden, zodat het dier niet verspringt. Merel/koolmees/zaadkraker idem (prooi in de snavel werkt nog).
7. **Pauw in pronk** is een eigen tekening (vooraanzicht): waaier als bijna volle schijf (gat van 60° onderaan), vleugels hangend, kop in profiel; `o.t` laat de veren trillen. Waaier ± 1,8 m breed (oude versie was 2,4 m).
8. **Zwaluw** is nu van opzij (pop met slagcyclus); de oude tekening van bovenaf blijft via `o.boven: true`.

## Maten (tekstbron wint)
- Grondvink: 12,5 cm; vleugel 68–73 mm, tarsus 20–24 mm (Grant et al.; PMC3237877 tabel 1: vleugel 73, tarsus 24, snavelhoogte 12,7 mm). Eenheid 0,5 mm: tarsus 42, hand+handpen ± 140. Referentie: 1 cm = 18,2 px.
- Merel: vleugel 131 mm (BTO). Koolmees: vleugel 75 mm (BTO). Boerenzwaluw: vleugel 126 mm (BTO), spanwijdte 32–34 cm.
- Blauwe reiger: 84–102 cm, tot 100 cm hoog, spanwijdte 155–195 cm (Wikipedia); tarsus ± 15 cm, snavel ± 12 cm (handboekwaarden, oude recepten).
- Pauw: 100–120 cm, met sleep 200–230 cm; pronk: waaier trilt, vleugels half open en hangend (Wikipedia).

## Wat de platen goed/fout hadden
- Realistische plaat: houdingen en verhoudingen goed; de vluchtfasen zijn onderling niet op dezelfde hoogte en de opgeheven vleugel is perspectivisch breder getekend dan een zijaanzicht kan geven (de pop-vleugel lijkt smaller; dat is geen fout in de botlengtes: span per vleugel ± 9,5 cm klopt met de vleugelmaat).
- Stijlplaat: goed voor kleuren en de bleke veerranden op dekveren/tertials; poten zijn daar roze, echt zijn ze donker (tekst wint). Zaadkraker en zwaluw staan er niet op.
- Omtrek uit de plaat: zitten op een tak sluit goed aan; bij staan is de pop-staart iets langer en de kop iets lager (kopframe).

## Algemene regels (ook voor andere families)
- Een deel dat 'onder de veren/vacht' begint (dij), achter de romp tekenen in plaats van erover.
- `buis()` met minder breedtes dan punten: breedtes over de lengte verdelen (eerder NaN = onzichtbare tenen).
- `dierOog` in kleine eenheden (zwaluw, 1 = 1 cm) in een eigen schaal aanroepen (wolfles 8 gold ook hier).
- Een gedeeld kopframe of ankerpunt waar storyboards mee rekenen eerst opzoeken (grep) en als harde eis in de houding zetten.

## Nog zwak
- Opgeheven vleugel in de vlucht leest smal (geen draaiing van de vleugel naar de kijker); reiger in de vlucht het zwakst.
- Dichte vleugel van zangvogels is wat druk (veel bleke randen); koolmees-kop leest als grote zwarte kap.
- Pauw: geen overgang rust ↔ pronk (twee tekeningen); pronk alleen van voren.
- Klampen (koolmees op de stam) is een benadering: lijf rechtop, tenen gespreid, met de oude `rot`.
- Landing op de tak in de film is een harde wissel (geen landingshouding).

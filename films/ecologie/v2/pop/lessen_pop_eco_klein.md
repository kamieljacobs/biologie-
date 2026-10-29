# Lessen: familie 'klein' als uitknippop (bever, konijn, sneeuwschoenhaas, bosspitsmuis; 29 okt 2026)

Bestanden: `src/pop_eco_klein.js` (rig `EcoPop.maak` = kopie van KatPop, + 4 DEF's + wrappers `ecoBever`, `ecoKonijn`, `ecoSneeuwschoenhaas`, `ecoSpitsmuis`; korte namen `bever`, `konijn`, `sneeuwschoenhaas`, `spitsmuis` alleen als ze nog niet bestaan),
`src/tv_pop_eco_klein.js` (`TV_pop_eco_klein`, 23 vellen + `film`), werkmap `out/pop_eco_klein/werk/` (`overtrek.py` + `overtrek_cfg.py` -> blok `ECOKLEIN_OVERTREK`; `raster.py`, `cmraster.py` (plaat op cm-raster met K/ky), `kmap.py`, `kwant.py`, `render_film.py`; `dbg_*.png` = zones + overgetrokken lagen), platen als png in `out/pop_eco_klein/ref/`.
Renders: `out/dieren_zoog,…,pop_eco_klein,tv_pop_eco_klein/*.webp`; film `out/film_klein/klein.mp4` (10 s) + `klein.gif`.
Aanroep: `ecoBever(ctx, x, y, s, { houding, t, kijk, a })`, s = px per cm zoals `wolf()` (wolf 80 cm schoft = 80·s px), x/y = grondpunt midden onder het dier.

## Maten (bron wint)
| dier | bron | plaat | ingreep |
|---|---|---|---|
| bever | kop-romp 80–100 cm, staart 28–38 cm, 13–16 cm breed, 20–30 kg (Wikipedia Eurasian beaver; wildlifeonline; HLNUG-steckbrief 2023); schoft ± 30–35 cm, rechtop 50–60 cm (biologyinsights); achtervoet 12–18 cm, voorvoet 5–8 cm (HLNUG); femur C. fiber ± 78 mm, C. canadensis 100 mm, tibia 131 mm (Palaeo-Electronica 2023, tab. 17) | lengte 86 cm bij K 2,75 px/cm, maar rug 54 cm hoog en achtervoet 25 cm | **ky = 0,72** (verticaal samendrukken: kruis 39, schoft ± 31 cm); achtervoet 16 cm; staart 30 cm |
| konijn | ± 40 cm (34–45), 1,2–2 kg, achtervoet 8,5–10 cm, oor 6,5–7,5 cm (Wikipedia/wikiwand); femur 8,2 / tibia 9,1 cm bij NZ-wit ± 4 kg (IJAE 117/3, 2012) -> wild × 0,9 | K 5,5 uit achtervoet en oor | geen |
| sneeuwschoenhaas | totaal 41–52 cm, staart 4–5 cm, achtervoet 11,7–14,7 cm, oor 6,2–7 cm, 1,4–1,6 kg; winter wit met zwarte oorpunten en oogleden, rui ± 72 dagen (ADW Lepus americanus) | zittend K 6,35 (oog–neus); oren close-up 9,8 cm | f = 1,12 × konijn; achterbeen × 1,15–1,3 (achtervoet 13 cm), voorbeen × 1,1–1,3; oren × 0,8 |
| bosspitsmuis | kop-romp 48–80 mm (Mammal Society) / 65–85 mm, staart 40–55 mm, achtervoet 12–14 mm, 6–15 g (MITECO); driekleurig, klein oog, oren in de vacht (ADW); gehurkt, altijd ≥ 1 voet aan de grond, 4–10 stappen/s (PeerJ 2131, Blarina) | K 28 (kop-romp 7,8 cm), ky 0,88; staart op plaat 2,8 cm | staart 4 cm |
Gangen: konijn/haas: voorpoten landen na elkaar, achtervoeten landen vóór de voorvoeten (sporen, Aldo Leopold NC); achtervoet zoolganger, hiel eerst (bioRxiv 2022.02.02.478798). Bever: zwemt met de achtervoeten (samen of om beurten), voorpoten tegen de borst, staart vooral roer (TPWD); bij volwassen bevers is in het water vooral de kop zichtbaar (HLNUG). Schaal-check: vel `ware_grootte` (naast de wolf).

## Wat anders was dan bij de wolf
1. **Lijf = één overgetrokken stuk** (romp + nek + kop, zachte huid `_ecoLijfGew`), alleen dij en schouder apart. Bij deze ronde, korte dieren gaven losse romp/nek/kop-zones harde rechte naden (bever ronde 1: vierkante blokken op de flank).
2. **Toonvlakken over het hele silhouet** kleuren en elk samenhangend vlak heel aan het deel met de grootste overlap geven (`overtrek.py`), met bilaterale filter + mediaan + morfologische opening/sluiting (groot 7–9 px) -> rustige grote vlakken. Rechthoekige zones gaven rechte snijlijnen in de toonvlakken.
3. **Dij/schouder-zones als ellips op de anatomie** (cm), niet als rechthoek.
4. **ky (verticale ijk)** naast K: de beverplaat is 40% te hoog; botten, delen en omtrek gaan door dezelfde omrekening.
5. **Kop uit de close-up**, gespiegeld (`spiegel`), afgebeeld via oog en neuspunt; bij de bever alleen de gezichtsdetails (oog, oor, neus, tand) over de lijfkop (`alleen`), anders twee koppen over elkaar. Gewrichten kunnen in close-up-px worden aangewezen (`Jkop`), extra botten (`BOTEN`: oren, snuit) volgen hun ouder met `rel`-hoeken.
6. **Sprong-gang** (`type: 'sprong'`): per poot steuninterval (td/lo) en neerzet-x, steunvoet staat stil, zwaai in poolcoördinaten t.o.v. schouder/heup (`zw`) en reikklem (`klem`) zodat poten in de zweeffase aan het lijf blijven. `_ecoRen(f)` = rennen voor konijn én haas (maatfactor).
7. **Vaste uitknipfiguur** voor zitten (konijn, haas): de plaat-zit krult de rug sterker dan de ruststand toelaat; IK-zit werd een platte bult. Kop van de close-up erover (`_ecoMap`).
8. **Vacht per aanroep** (`palFn`): `o.vacht` 0..1 mengt elke toon naar de winterkleur; zwart (oorpunten) blijft.
9. **Overgangen met voet-IK** (`P.overgang(oA, oB, u)`): hoeken kortste weg, voetdoelen lineair, IK opnieuw; `meng` liet de voeten zweven.
10. Water: `houding 'zwemmen'` -> y = waterlijn, deel onder water achter een blauwe laag; `o.water = false` knipt alles onder de lijn weg (scène tekent zelf water).

## Wat de platen goed/fout hadden
- bever.webp: kleuren en kop-close-up goed; staande bever te hoog/bol en achtervoet te groot (ky, bron); staart als bovenaanzicht-kelle (van opzij zou hij smal zijn; gehouden als halve breedte 4 cm, zoals de plaat); zwemfiguur bruikbaar als vormcontrole.
- konijn.webp: vlakke rij zeer bruikbaar (grazend = ruststand, zit, hop-fasen, sprint); hop/sprintfasen alleen vormcontrole, volgorde uit de literatuur.
- sneeuwschoenhaas.webp: zomer/winter zelfde houding en schaal (ideaal voor de overgang); oren in de close-up te lang (bron 6–7 cm).
- spitsmuis.webp: kop-close-up en driekleurigheid goed; snorharen zitten in het silhouet (weggeknipt); staart te kort.

## Algemene regels (nieuw)
- Een plaat kan in **hoogte** fout zijn terwijl de lengte klopt: ijk K op lengte, ky op schofthoogte (bron), niet één schaal.
- Toonvlakken nooit per zone knippen: eerst over het hele silhouet, dan heel aan één deel toewijzen.
- Kleine, compacte dieren: romp, nek en kop als één overgetrokken lijf met zachte huid.
- Zweeffase bij springers: zwaaivoet in poolcoördinaten t.o.v. de heup/schouder + reikklem, anders 'rek' > 1,2.

## Status / nog zwak
- **Bever**: staan, lopen, knagen goed; zwemmen leesbaar maar het lijf onder water is een vlak (achtervoeten peddelen wel); voorpootjes bij knagen zijn eenvoudige ovaaltjes om de tak.
- **Konijn**: zitten (vaste figuur) en grazen goed; huppen goed qua volgorde maar de rug blijft vrij bol (ruststand is grazend); rennen: voorpoten in de gestrekte zweeffase wat kort.
- **Sneeuwschoenhaas**: zitten en vachtwissel goed; rennen gebruikt het konijnenlijf (haas iets te gedrongen), achtervoet niet zo breed als op de plaat.
- **Bosspitsmuis**: staan, trippelen, snuffelen goed; buik in snuffelen hoekig waar keel en lijf samenkomen.
- Zitten is een vaste figuur: van zitten naar huppen is een wissel (overvloei), geen IK-overgang.

## Ronde 2 (keuring coördinator, 29 okt 2026)
1. Bever tanden: los overgetrokken tandvlak zat op de onderkaak en zweefde -> twee korte oranje tanden als eigen deel op de bovenkaak (`EXTRA.tanden`, bot kop), net onder de bovenlip.
2. Bever staart: losse plaat -> behaarde staartwortel (`EXTRA.wortel`, punten op rompA en st0) die vóór het lijf getekend wordt; kelle donkerder, stippen weg.
3. Bever tonen: overgetrokken rug/buik-vlakken (golfrand, rechthoekige buik) vervangen door ontworpen vlakken in cm: één zachte rug-grens, lichte buik/keel langs de buiklijn, dij als druppel. Regel: als de plaat-tonen onrustig zijn, alleen de basisvorm overtrekken en de tonen zelf ontwerpen.
4. Zwemmen: geen blauwe doos meer; bever in twee passes (boven de lijn vol, eronder 30% dekking), daarna waterlijn + zacht verlopend vlak.
5. Rennen konijn/haas: achterpoot = gespierde scheen en middenvoet in lijfkleur (profielen veel breder), zwaai in de gestrekte zweeffase verder naar achter met behoud van de beenlengte (`zw` × `ax` voor de haas), rug licht gebogen (rompA 166-176 i.p.v. 194).
6. Huppen: nek -46 i.p.v. -18 (kop hoog zoals de plaat), rug strekt bij de afzet (rompA 178), minder bult; voorvoeten verder naar voren neer (rek ≤ 1,02).
Nog zwak: bij de haas in de gestrekte zweeffase steekt boven de staart een puntje van de dij uit; konijn huppen t 0,35 nog vrij compact.

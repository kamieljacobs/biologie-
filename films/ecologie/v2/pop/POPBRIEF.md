# Ecologie v2: nieuwe dieren en objecten als uitknippop (29 okt 2026)

Kamiel maakt een nieuwe ecologiereeks (seriebrief: `/root/biologie-/films/ecologie/v2/SERIEBRIEF.md`). Hij wil alle dieren als uitknippop zoals de goedgekeurde evolutiedieren, en wil tussenstanden zien. De ElevenLabs-referentieplaten zijn al gemaakt (geen nieuwe platen genereren): `/root/biologie-/referentie/dieren/ecologie/<naam>.webp` (1280×720; boven realistisch, onder vlak, rechts een kop in vlakke stijl; lichtgrijze achtergrond). Bekende plaatfouten staan in `/root/biologie-/referentie/README.md`, sectie Ecologie v2.

## Lees eerst
- `/root/biologie-/bibliotheek/dieren/lessen/lessen_pop.md` (stappenrecept, wat het verschil maakte, gangmodel) en het lessenbestand van de familie die het dichtst bij jouw dieren ligt (`lessen_pop_honden.md`, `_katten`, `_hoef`, `_vogels`, `_darwin`, `lessen_overig.md`, `lessen_micro.md`).
- Voorbeeldcode in `/root/ecopop/src/`: `wolf_pop.js` (staat in `pop/wolf/` of `lib_dieren.js`), `pop_honden.js`, `pop_katten.js`, `pop_hoef.js`, `pop_vogels.js`, `pop_darwin.js`. Kopieer en generaliseer in je eigen bestand; verander bestaande bestanden NIET.
- Part C en tekenregels: `/root/biologie-/films/BEELDAFSPRAKEN.md`, `/root/biologie-/films/PROMPT_v13.md` (alleen Part C en C10 Tekenkwaliteit). Kamiels vaste wensen: rustig, simpel en minimalistisch (niet te druk), echte verhoudingen en realistische afmetingen, een echt oog (`dierOog`), geen cartoonogen of lachende mond, geen paars als betekeniskleur, contrasten rood/groen/blauw werken beter dan alles paars.

## Werkwijze per dier (verplicht)
1. Gewrichtspunten op de realistische rij → botlengtes; **kruiscontrole met tekstbronnen** (WebSearch: schofthoogte, lengte, staartlengte, skeletverhoudingen); bij strijd wint de bron. Noteer maten + bron in je lessenbestand.
2. Delen tekenen naar de vlakke rij (3–4 tonen, kleuren ontwerpen, nooit uit fotopixels), als vectorpaden; één lichte silhouetrand in twee passes; zachte huid bij schouder, heup, nek.
3. Houdingen als bothoek-tabellen uit de platen; gangmodel uit de literatuur (stapvolgorde, duty factor), steunvoet glijdt niet. Grote bewegingen in 6 tussenstanden testen.
4. Aanroep zoals alle dieren: `naam(ctx, x, y, s, { houding, t, kijk, a, … })`, x/y = grondpunt, `t` = fase (0–1), `kijk` = ±1, `s` = schaal zodat het dier op realistische maat staat t.o.v. de bestaande dieren (gebruik dezelfde schaalconventie als `wolf`/`edelhert` in lib_dieren.js: zoek hoe `s` daar in cm/px wordt omgerekend).
5. Testvel `src/tv_pop_eco_<familie>.js` met `const TV_pop_eco_<familie> = { sleutel(ctx,t){…}, … }`: per dier overlay op de referentie-omtrek, uit-elkaar, strip van elke gang met steunlijnen en 6 tussenstanden, zooms (schouder, heup, kop, poten), én één vel waarop al je dieren naast elkaar op ware grootte staan naast een bestaand dier (wolf of edelhert) als maatstok.
6. Render: `cd /root/ecopop && python3 render.py dieren_zoog,dieren_overig,wolf_pop,pop_honden,pop_katten,pop_hoef,pop_vogels,pop_darwin,pop_eco_<familie>,tv_pop_eco_<familie> TV_pop_eco_<familie>` → `out/<bestanden>/<sleutel>.webp`. Geen FOUT/ERRORS van jouw bestanden. Bekijk alles met Read, ook ingezoomd (crop met PIL), en reken op 2–3 correctierondes.
7. Per familie een mp4 (1280×720, 24 fps, ±10 s) waarin de dieren hun bewegingen laten zien + gif 640 breed, in `/root/ecopop/out/film_<familie>/` (render frames met de render-opzet en zet ze om met ffmpeg, `-preset veryfast`).

## Regels
- Werk alleen in `/root/ecopop/` en schrijf alleen je eigen bestanden (`src/pop_eco_<familie>.js`, `src/tv_pop_eco_<familie>.js`, `lessen_pop_eco_<familie>.md`, je outputmappen). Raak de repo `/root/biologie-` niet aan, geen git, geen ElevenLabs.
- Functienamen met een voorvoegsel `eco` (bv. `ecoBever`) zodat ze niet botsen; een nette korte naam (`bever`) mag als wrapper als die nog niet bestaat (grep eerst in src/).

## Oplevering
`src/pop_eco_<familie>.js`, testvel, renders, mp4/gif, en `lessen_pop_eco_<familie>.md` (maten met bronnen, wat per dier anders was dan bij de wolf, wat de platen goed/fout hadden, welke regel algemeen geldt). Meld in ≤12 regels: per dier de status (goed / nog zwak + waarom), de paden van het testvel-overzicht en de mp4, en de fouten die je zelf vond en herstelde (één regel per fout).

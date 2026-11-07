# Proef: wolf als uitknippop (23 okt 2026)

Kamiel: "de referenties werken nog niet helemaal goed. misschien eerst nadenken over hoe we van een elevenlabs dier kunnen analyseren hoe we de animaties gaan opbouwen" — en daarna: "ja probeer dat maar met elevenlabs".

## Waarom ronde 3 niet werkte
- Eén overgetrokken omtrek van één foto + losse poten uit een skelet → naden bij schouder en heup, en het silhouet kan niet bewegen.
- Kleur uit fotopixels → vlekken/camouflage.
- Eén referentie = één houding; lopen/zitten werd gegokt.

## Nieuwe aanpak: van referentie naar POP (cut-out rig, zoals Spine/Toon Boom)
Referenties in `/home/claude/evo2/referentie/wolfpop/`:
- `modelblad.png` (1280×720, lichtgrijze achtergrond): dezelfde wolf 6× op dezelfde schaal, strikt zijaanzicht: (1) staan, (2) stap-contact, (3) stap-passeer, (4) draf, (5) zitten, (6) liggen (sfinx). = ANATOMIE + HOUDINGEN.
- `uitknipvel.png` (navy): linksboven de complete wolf in vlakke stijl (3 tinten: donker zadel, grijs-tan flank, crème buik/poten) = de STIJL/VORM die we willen. Rechts losse puppetdelen met draaipunten — alleen als hint hoe je de delen afsnijdt (die losse delen zelf zijn cartoonesk, niet overnemen).
Bekijk beide met Read (ook ingezoomd: crop met PIL).

## Wat je bouwt
Bestand `src/wolf_pop.js` (laadbaar na de andere bestanden via render.py):
1. **Skelet uit gewrichtspunten.** Zet in modelblad houding 1 (staan) ~20 punten: neuspunt, oog, oorbasis, achterhoofd, nekbasis/schoft, schoudergewricht, elleboog, pols (carpus), voorvoet-kogel, voorpoot-teen; heup, knie (stifle), hak (hock), achtervoet-kogel, teen; staartbasis, staartmidden, staartpunt; borstbodem, buikbodem. Kruiscontrole met anatomie van de wolf/hond (schofthoogte ~0,8 m; elleboog ≈ borstbodem; hak hoog; teenganger). Botlengtes vast voor alle houdingen.
2. **Delen.** Teken de wolf in de stijl van de samengestelde wolf op het uitknipvel (trek die over: omtrek + de 3 toonvlakken, vereenvoudigd tot vloeiende vectorpaden; GEEN raster, geen fotopixels). Snijd hem op in delen die elk aan één bot vastzitten, met ronde overlap bij het gewricht: romp (borst+buik+heup, eventueel romp-voor en romp-achter voor buiging), nek+manen, kop (met oor, oog via `dierOog` als die bestaat, anders eigen oog), staart (2–3 segmenten), per poot bovenbeen, onderbeen, voet. Verre poten iets donkerder (achter het lijf). Tekening (zadel, crème) zit vast op het deel en beweegt mee.
3. **Houdingen als gewrichtshoeken.** Meet in modelblad houdingen 2–6 de hoek van elk bot en sla ze op als houding-tabellen. Loopcyclus: interpoleer tussen contact- en passeerhouding en spiegel voor de andere kant, met de stapvolgorde van een viervoeter in stap (lateral sequence: LA, LV, RA, RV met ~25% faseverschil) en duty factor ~0,6–0,65; steunvoet mag niet glijden (bereken de verplaatsing uit de steunpoot). Draf: diagonale paren. Gebruik eventueel IK (2-bots) voor de voet op de grond.
4. **API**: `wolfPop(ctx, x, y, schaal, o)` met `o.houding` = 'staan' | 'lopen' | 'draven' | 'zitten' | 'liggen' | 'huilen' (huilen = zitten met kop omhoog, maak zelf), `o.t` (0–1 cyclus), `o.kijk` (−1 spiegelt). x,y = midden onder het dier op de grond.

## Controle (verplicht, bekijk alles zelf met Read)
- Testvel `src/tv_wolfpop.js` met `const TV_wolfpop = {...}`:
  - `overlay`: voor elke houding 1–6 de pop over een uitgeknipte omtrek van de referentie (contour als gouden stippellijn; de contour mag je als vector-punten uit de referentie halen ALLEEN voor het testvel).
  - `delen`: de pop uit elkaar (exploded view) met draaipunten als stipjes, zodat je ziet dat de delen netjes overlappen.
  - `strip`: 8 frames loopcyclus naast elkaar met een grondlijn en een verticale lijn per steunvoet (glijdt niet).
  - `scene`: de wolf in een nachtelijk bos in film-look (kijk naar bestaande wolf-scènes, grep 'wolf' in src/sb4.js) staand en lopend.
- Render: `cd /home/claude/evo2 && python3 render.py teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,dieren_zoog,dieren_overig,micro_evo,wolf_pop,tv_wolfpop TV_wolfpop`.
- Animatie: render 48 frames loopcyclus (2 cycli) + 24 frames draf als losse webp/png (schrijf zo nodig een klein python-script met playwright naar render.html zoals render.py doet) en maak met ffmpeg (check `which ffmpeg`, anders `pip install --break-system-packages imageio imageio-ffmpeg`) een mp4 `out/wolfpop/wolf_loop.mp4` (1280×720, 24 fps, wolf loopt door een rustig bos, achtergrond schuift mee) en een gif van 640 breed.
- Kritisch op: naden bij schouder/heup, gewricht dat de verkeerde kant op knikt (pols en hak knikken naar achter!), voeten die glijden of door de grond gaan, kop die loskomt, staart.
- Pas dieren_zoog.js, lib-bestanden, teken_evo* en sb* NIET aan.

## Oplevering
- `src/wolf_pop.js`, `src/tv_wolfpop.js`, renders in `out/…`, `out/wolfpop/wolf_loop.mp4` + `.gif`.
- `lessen_pop.md`: de werkwijze als stappenrecept dat voor elk dier herhaalbaar is (wat werkte, wat niet, hoeveel tijd per stap), plus: was het uitknipvel nuttig of alleen de samengestelde wolf? Welke extra ElevenLabs-plaat had geholpen?
- Meld in ≤12 regels.

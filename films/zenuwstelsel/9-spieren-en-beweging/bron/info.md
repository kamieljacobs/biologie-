# Spieren en beweging — bronmap

## Kenmerken

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/9-spieren-en-beweging.html (audio in `9-spieren-en-beweging/audio/`) |
| Reeks | Zenuwstelsel (hoofdstuk `regeling`), film 9; sluit aan op De spleet (synaps) en Zintuigen |
| Niveau | havo + vwo; vwo-blokken s21 (pees), s28–s30 (sarcomeer, kruisbruggencyclus, lijkstijfheid), s37–s40 met q39 (frequentie, rekreflex), s42 |
| Versie / datum | 1.0 · 26 oktober 2026 (nieuwe film) |
| Prompt | v10 |
| Voldoet aan | prompt v10 (26 okt 2026) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (33 takes), flow `stlXTUIYd5oUyViawE19`; stem-invoer via `films/uitspraak.json` + `uitspraak_film.json` (Z-lijnen → zet-lijnen) |
| Duur | spraak 9:05 (vwo) / 6:25 (havo); met titel, hoofdstukkaarten en 8 vragen 11:17 (vwo), 8:23 (havo), 8:57 zonder vragen (vwo); `duur: 11` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Macro-vlak (practicumlokaal), Schema (arm, gewricht, bot, armmodel), Micro (vezel, sarcomeer, eenheden) met zoomcirkels |
| Personages | Noor (zittend, zomeroutfit met plakkers), Sam, mevrouw Visser (castboek, zijaanzicht); `lib_cast.js` met `o.arm` (vrije armhoek in zijaanzicht) |
| Audio-opslag | 33 losse mp3's (`../audio/sNN.mp3`), woordtijden `stem/woordtijden/` (silalign) |
| Herkomst | brief `../BRIEF.md` (raadsel C), B15: drie scriptvarianten + blinde beoordelaar (`werk/`), keuring twijfelscènes 26 okt 2026 (`fase1/besluiten.md`): armmodel in plaats van kippenvleugel (T1), 'Is bot levend?' bij een mensenbot (T2), lijkstijfheid als één zin (T6) |
| ElevenLabs-verbruik | TTS ± 8 011 credits (33 takes); referentieplaat ± 185 (fase 1); filmmedaillon ± 433 (flow `tSZ75aer3gL1ugoaHcs2`) |

## Opbouw

| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01–s02, q03 | practicumlokaal: Noor met plakker op de biceps, Sam geeft een veertje en de schooltas; EMG-paneel klein → groot; zoomcirkel 'in de spier' met vraagteken |
| H1 Bot en gewricht | s05–s12, q07, q11 | skelet (dragen, beschermen, aanhechting); opperarmbeen in lengtedoorsnede; bot naast een steen (vraag); botweefsel met cellen die afbreken/opbouwen, rood beenmerg, kalkzouten/collageen; schouder in doorsnede met labels; kogel- en scharniergewricht (skelet met stippen, deur) |
| H2 Trekken of duwen? | s13–s21, q15, q19 | armmodel op tafel → groot (touwtje = spier, pees, scharnier = gewricht); duwen: touwtje knikt; arm van opzij (biceps/triceps, pezen vóór/achter de elleboog); EMG met twee kanalen: tafel optillen, dan strekken (sporen verborgen tot na de vraag). vwo: pees met collageenvezels in de trekrichting |
| H3 Schuiven, niet krimpen | s22–s30, q25 | preparaat, spier → bundel → vezel (meerkernig, samengesmolten); myofibrillen en sarcomeer; meetlatjes 'even lang'; één myosinekop: pakt, kantelt, laat los; ATP en mitochondrium. vwo: Z-lijnen, tropomyosine/troponine, reticulum met calcium, kruisbrug; vier standen; terugpompen; lijkstijfheid |
| H4 Wat de plakkers meten | s31–s40, q34, q39 | plakker op de huid boven spiervezels; motorische zenuwcel uit het ruggenmerg; dwarsdoorsnede met verspreide vezels van één eenheid, eindplaat met acetylcholine (verwijzing naar De spleet); oog vs kuit; Noor van arm op tafel tot tas met steeds meer eenheden. vwo: trekkingen tellen op (drie grafieken); boek valt in de tas, spierspoeltje en reflexboog zonder schakelneuron |
| Recap | s41–s42 | practicum met veertje- en tas-spoor en vier (vwo zes) kernzinnen |
| Eindkaart | s43 | drie regels |

## Vragen (juiste antwoorden b, a, b, c, a, c, a, c)

Zie `script.md` (q03, q07, q11, q15, q19, q25, q34, q39 vwo) met uitleg.

## Begrippen

skelet, bot, rood beenmerg, kraakbeen, gewricht, kogelgewricht, scharniergewricht, pees, buigspier en strekspier, antagonisten, spiervezel, myofibril, actine en myosine, ATP, motorische zenuwcel, motorische eindplaat, motorische eenheid; vwo: sarcomeer, sarcoplasmatisch reticulum, troponine en tropomyosine, kruisbrug, frequentie, spierspoeltje, rekreflex (lijst in `film.py`).

## Docentdeel

`sections.html`: 7 checkvragen (waarvan 2 vwo; spierpijn/melkzuur als checkvraag 5), kernbeelden per hoofdstuk, vereenvoudigingen (geen deltaspier en m. brachialis; EMG = opgetelde activiteit; Nectar § 19.5 aangenomen, niet gecontroleerd), leerdoelen, misvattingen, lessuggesties (armmodel nabouwen).

## Waar wat in de HTML zit

De HTML wordt gebouwd; bewerk de bronnen in `src/`:
- `src/scenes_z9.js`: scènes per segment (regel: title 15, s01 17, s02 24, s05 28, s06 35, s08 38, s09 48, s10 56, s12 59, s13 73, s14 83, s16 86, s17 92, s18 100, s20 106, s21 110, s22 130, s23 145, s24 152, s26 154, s27 165, s28 171, s29 186, s30 199, s31 221, s32 228, s33 239, s35 243, s36 246, s37 252, s38 258, s40 265, s41 282, s42 283). Cues via `q.on('woord', n, duur)` op de woordtijden.
- `src/teken_z9.js` (fase 1): `armAnatomie`, `gewrichtDoorsnede`, `botDoorsnede`, `botWeefsel`, `sarcomeer`, `myofibril`, `spierDwars`, `eenheidZenuw`, `emgSpoor`, `spierspoeltje`, `laptop`, `plakker`, `schooltas`, `veertje`, `practicum` (de kippenvleugel, `pincet`, `vingers` en `reflexboog` worden niet meer gebruikt).
- `src/teken_z9b.js` (ronde 2): `armModel`, `kopStand`, `actineDetail`, `reticulum`, `trekGrafiek`, `oogSchema`, `kuitSchema`, `emgPaneel`, `lokaal` (practicum van de film), `huidPlakker`.
- Tekst van de pagina: `film.py` (titel, vragen, begrippen, minis) en `sections.html`.

## Hoe je de film aanpast

1. Werkmap buiten de repo: kopieer `src/` en `bouw/` naar `<werk>/eng/`, `teken_z9.js` naar `<werk>/kf/`, en `film.py`, `sections.html`, `segments.json`, `uitspraak_film.json`, `teken_z9b.js`, `scenes_z9.js` naar `<werk>/film/`; zet de mp3's in `film/raw/` en `film/audio/` en de woordtijden in `film/words/`.
2. Pas een scène aan in `scenes_z9.js`, bouw met `bouw.sh`, controleer met `python3 ../eng/cuecheck.py . scenes_z9.js` en stills (`python3 ../eng/stills.py . <uit> "s26|12"`).
3. Nieuwe tekst = nieuwe take voor alleen die alinea (één take, niet opnieuw genereren), loudnorm, `silalign.py`, opnieuw bouwen.
4. Kopieer `film/9-spieren-en-beweging.html` naar `films/zenuwstelsel/`, zet de themaregel terug na `<meta charset>`, en draai de scripts uit CLAUDE.md (spelerfix, antwoordtekst, kortantwoord, antwoordletter, flipkaarten, teller, licentie_noot, reviewlijst).

## Aandachtspunten

- Nectar § 19.5 is aangenomen als spierspoeltjes en reflexen: niet gecontroleerd in de methode (s40, q39).
- Aanhechtingen van biceps en triceps rusten alleen op B-bronnen (bronnenlogboek bewering 12).
- Het EMG op het scherm is schematisch (hash-ruis); losse eenheden zie je alleen in de dwarsdoorsnede.
- Uitspraakcontrole (Scribe) van de risicoalinea's (s17, s23, s26–s29, s32, s40) is nog niet gedaan: de upload naar ElevenLabs werd door de proxy geweigerd, en daarna waren de ElevenLabs-credits op (333 over). Te doen zodra er credits zijn: transcriberen via `creative_attach_reference_file` met de raw.githubusercontent.com-url van de mp3's.
- s08: de zin 'In het midden zit rood beenmerg' was vakinhoudelijk fout (frisse beeldreview: bij volwassenen zit rood merg in het sponsachtige bot aan de uiteinden). Een nieuwe take kon niet (credits op), dus 'In het midden zit' is uit de take geknipt (11,64–12,905 s); nu 'Rood beenmerg: daar worden bloedcellen gemaakt.' Origineel in `stem/oud/`. Bij een volgende opname: 'In het sponsachtige bot aan de uiteinden zit rood beenmerg.'
- Frisse beeldreview: `review_fris_2026-10-26.md` (25 punten; de drie fouten en de storende punten zijn verwerkt, behalve: het kapsel blijft zoals Kamiel T4 keurde, en namen staan zonder wijslijn volgens de huisstijl).

# Opdracht: storyboard van één extra evolutiefilm (23 okt 2026)

Kamiel (biologiedocent havo/vwo) wil de drie extra films bij Evolutie v2. Jij maakt het storyboard van één film: script + één keyframe per scène. **Nog niets inspreken of bouwen.** Kamiel keurt daarna per scène op het keuringsblad.

| nr | titel | slug | sleutel |
|---|---|---|---|
| 9 | De reis van Darwin | x1-de-reis-van-darwin | e9 |
| 10 | Het ontstaan van het leven | x2-het-ontstaan-van-het-leven | e10 |
| 11 | Van eerste cel tot nu | x3-van-eerste-cel-tot-nu | e11 |

## Lees eerst (verwijzingen, niet overtypen)
- `~/evo2/PROMPT_v9.md` (Part A2, B2–B7, C1–C9; vooral B4 script, B5 uitspraak, B6 storyboard, C9 tekenrecepten)
- `~/evo2/SERIEBRIEF.md` (onderaan 'Extra films' = jouw spec; ook REGELS, kleuren, misconcepties, LEAVE OUT van de kernfilms zodat je weet wat daar al staat)
- `~/evo2/REEKSONTWERP.md` (wat elke film moet halen) en `~/evo2/OVERDRACHT.md` (lessen tekenen)
- `/home/claude/biologie-/films/BEELDAFSPRAKEN.md`, `/home/claude/biologie-/films/WERKWIJZE-LESSEN.md` (kandidaatlessen: pas ze nu al toe: indeling/verwantschap en haken tegen een bron, stelligheidscheck op alle/altijd/nooit/alleen, regels voor vraagopties, Vragen uit)
- `/home/claude/biologie-/films/UITSPRAAK.md` + `uitspraak.json` (goedgekeurde uitspraken; jaartallen als "in het jaar 1858")
- Voorbeeld van het formaat: `~/evo2/films/f7.json` (velden: film, titel, slug, puzzel, haak, duur, hoofdstukken, scenes, checkvragen, begrippen, getallen, uitspraak, nieuw_in_bibliotheek, keuzes_en_twijfels; vraagscènes met `opties` "A … · B … · C …" en `juist`) en `~/evo2/src/sb7.js` + `teken_evo7.js` (keyframes, 1920×1080, helpers uit lib.js/base.js/lib_evo.js/lib_bio.js/lib_cast.js: evoTag, evoSchaal, vraagKaart, macroNacht, enz.).
- Bronmateriaal (alleen casussen/getallen, níet de opzet): het archief `/home/claude/biologie-/films/archief-evolutie/` (film 1 Darwin/Wallace, 4 van niet-leven naar leven, 5 de grote lijn; lees `bron/script.md` en `bron/info.md`, niet de hele HTML) en `~/evo2/archief_bron.md`.

## Wat de film moet zijn
- Extra film buiten het PTA, havo + vwo samen (geen vwo-blokken), 6–8 minuten (±140 woorden/min). Nieuwsgierig makend verhaal, maar elke bewering klopt en heeft een bron in `getallen` (ook jaartallen, plaatsnamen, citaten, indelingen). Twijfels bij de wetenschap eerlijk benoemen ("we weten het nog niet zeker", bv. bij het ontstaan van het leven).
- Opbouw volgens prompt: cold open met puzzel (≤20 s) → titel → 3–5 hoofdstukken met minivraag en payoff → samenvatting die de puzzel beantwoordt → eindkaart. Per hoofdstuk minstens één "Wat denk je?"-vraag (2–4 opties, één bekende misvatting, positie goed antwoord wisselt). Vragen uit: de alinea na een vraag leunt er niet op.
- Taal: korte zinnen, je-vorm, spreektaal, geen teleologie (moleculen/cellen/dieren willen of proberen niets), "de gemeenschappelijke voorouder die we delen met de chimpansee".
- Sluit aan op de kernreeks, herhaal niet: het mechanisme is film 2, bewijs (fossielen, walvis, moleculaire klok) film 7, stambomen film 8. Een korte verwijzing ("hoe dat werkt zie je in de film Natuurlijke selectie") mag. Kijk in `~/evo2/films/f*.json` welke casussen al gebruikt zijn (Daphne Major hoort bij film 2; de vinken mogen in film 9 wel als Darwins verzameling, zonder de Grants).
- Mensen in beeld = castpersonages (`personages/lib_cast.js`, `personages/ROLLEN.md`) of, voor historische personen (Darwin, Wallace, FitzRoy, Miller …), een eigen tekening in dezelfde castboekstijl (simpel gezicht met ogen en mond, huidskleur, kleding van de tijd), geen grijs poppetje. Een warm menselijk moment alleen als het het concept draagt.
- Dieren: hergebruik de goedgekeurde uitknippoppen in `~/evo2/src/` (pop_*.js, wolf_pop.js, dieren_*.js; grondvink in teken_evo2.js). Een nieuw dier teken je volgens het recept in `~/evo2/lessen_pop.md` (botten + delen, maten en houding uit een bron). ElevenLabs-referentieplaten mogen (1 variant per plaat, ±190 credits; zie OVERDRACHT 'Lessen die al vastliggen'), maar alleen voor dieren die echt in beeld moeten, en noteer welke je maakte in `keuzes_en_twijfels`. Fossielen/schedels/planten/micro: maten uit een bron, nooit uit het geheugen. Aarde: `aarde()` zoals in BEELDAFSPRAKEN (zoek hem met grep in de repo).
- Eerst een testvel (`src/tv<N>.js`) met elke nieuwe tekening los, zelf bekijken op lage resolutie, dan pas de keyframes.

## Opleveren in ~/evo2
- `films/f<N>.json` (N = 9, 10 of 11; scène-id's `e<N>s01…`, vraagscènes `e<N>q..`)
- `src/teken_evo<N>.js` (nieuwe tekenfuncties, namen met een eigen voorvoegsel zodat ze niet botsen met andere films), `src/sb<N>.js` met object `SB<N>` (één functie per scène-id), `src/tv<N>.js`
- renderen: `cd ~/evo2 && python3 render.py <bestanden komma-gescheiden> SB<N>` → `out/…/<id>.webp`; geen FOUT/ERRORS. Bekijk alle keyframes zelf (contactblad, lage resolutie) en herstel tekenfouten.
- In je eindverslag (kort, ≤250 woorden): aantal scènes, duur, gekozen puzzel, nieuwe tekeningen, gebruikte ElevenLabs-credits, twijfels voor Kamiel, en de fouten die je zelf vond en herstelde (één regel per fout: wat, in welke stap ontstaan, welke stap ving hem) voor het foutenlogboek.
- Raak andere films, de repo en het keuringsblad niet aan. Geen git.

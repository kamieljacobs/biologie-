# Een film bouwen in de FILMDATA-straat (werkmap /home/claude/hw)

Werkwijze voor de films van 'Wat word jij?' (`films/vervolg/`). De werkmap `hw/` staat buiten de repo en bestaat alleen in de sessie; zet hem aan het begin van een nieuwe sessie zo op:

```
V=/home/claude/biologie-/films/vervolg; H=/home/claude/hw; mkdir -p $H/engine
cp $V/geneeskunde-4-wat-de-patholoog-ziet/bron/src/* $V/geneeskunde-4-wat-de-patholoog-ziet/bron/bouw/* $H/engine/
rm -f $H/engine/scenes_g4.js $H/engine/teken_g4.js; cp $V/BOUWEN.md $H/
for p in "l1 leraar-1-waar-blijft-je-vet" "l2 leraar-2-een-practicum-dat-werkt"; do set -- $p; mkdir -p $H/$1
  (cd $V/$2/bron && cp film.py sections.html script_v2.md segments.json film.json src/scenes_$1.js src/teken_$1.js $H/$1/); done
```
Neem steeds de bronmap van de laatst gebouwde film als bron van `engine/` (nieuwste fixes, bv. ondertitels na "Dr." en "E. coli"). `maakinfo.py` (eerste versie van `info.md`, `uitspraak.md` en `brief.md`) zit sinds de Farmacie-films in `bron/bouw/`; draai hem vóór `pak.py`. Helpers: gebruik in de gedeelde scratchpad unieke bestandsnamen per film (bv. `sheet_f1.png`), anders overschrijven ze elkaar.

Voorbeeld van een complete, goedgekeurde film: `l1/` (Waar blijft je vet?) — kijk naar `l1/film.py`, `l1/sections.html`, `l1/teken_l1.js`, `l1/scenes_l1.js`. Nog een voorbeeld: `l2/`.

## Bestanden per film `<d>/`
- `script_v2.md` — definitief script (niet meer wijzigen: de audio is daarop ingesproken). `[Schema: …]` achter een kop = beeldidee.
- `segments.json` — gemaakt uit het script met `python3 engine/make_segments.py <d> script_v2.md` (ids s01, q02, s03 titel, …). `words/<sid>.json` = woordtijden (komen van de inspreek-helper; wacht tot ze er zijn; uitlijnen met `engine/silalign.py`).
- `film.py` + `sections.html` → `python3 film.py` (in de map) maakt `film.json`: slug, title, sub, puzzle, meta, lead, endHaak (vooruitkijkende vraag), minis (per hoofdstuk een korte vraag), footer (noem de personages), questions (per qNN: q, correct = index 0/1/2 zoals in het script, explain), glossary (8–9 begrippen), sections (checkvragen met antwoord en punten, docentdeel met Plaats, Hoe de film het uitlegt, Getallen en bronnen (tabel), Vereenvoudigingen, Lessuggesties).
- `teken_<d>.js` — eigen tekenfuncties; `scenes_<d>.js` — `Object.assign(SCENES, { title(ctx,t){…}, s01(ctx,t,q){…}, … })`, één functie per gesproken alinea (sNN).

## Inspreken
Per film één helper (model sonnet): één flow, per alinea precies één `creative_generate_speech` (voice_id `7qdUFMklKPaaAVMsBTBt`, model_id `eleven_v4`, generations_count 1, prompt = veld `voice` uit segments.json), nooit herhalen; downloaden met curl naar `raw/` en `audio/`, `silalign.py`, `stem/sessions.json` en `stem/gen.json` schrijven. Stem Roos, eleven_v4, één take per alinea. Pas eerst de vervangregels uit `films/uitspraak.json` toe (zie ook `films/UITSPRAAK.md`); "Dr." als "dokter". Nieuwe risicowoorden op de wachtlijst van de film (`bron/uitspraak.md`), geen uitspraaktest vooraf. Zoek IPA op voor lastige woorden. De opties van vraagkaarten en de eindkaart worden niet uitgesproken.

## API (engine/lib.js, engine/scenes.js r.1–32, engine/lib_cast.js, engine/extra.js, engine/teken.js, engine/brein.js)
- Beeld 1920×1080, niets onder y≈880 behalve ondertitels. `bg(ctx,'schema')` eerst.
- Cues: `q.on('woord', n=1, dur=0.6)` → 0..1 vanaf het n-de woord in de alinea dat het stukje bevat (hoofdletterongevoelig, substring!); `q.at('woord', n)` = tijd. Controleer met `python3 engine/cuecheck.py <d> <d>/scenes_<d>.js` en let op substring-valkuilen (bv. 'onderzoek' matcht 'onderzoeken').
- Tekst: `tag`, `chip`, `regel`, `naamBij(ctx, naam, sub, x, y, a, align)` (naam direct bij het onderdeel, geen wijslijnen), `metaText`, `vraagteken`, `vink_`, `kruis`, `pijl`, `bubbel`, `stempel`, `haak`, `wolk`, `paneel`, `klokje`, `assen`, `vraagKaartje`, `document_`, `circ`, `roundRect`, `shape`, `text(ctx,s,x,y,fTekst(px,gewicht),kleur,align)`, `rgba`, `clamp`, `wander`. Kleuren `C.goud, C.koraal, C.groen, C.teal, C.paars, C.oker, C.text, C.text2, C.grain, C.line`.
- Personages: `persoon(ctx, id, x, voetY, hoogte, {t, uit:'neutraal'|'blij'|'lacht'|'verbaasd'|'huilt', pose:'staan'|'wijs'|'wijsOmhoog'|'denk'|'schouders'|'handenHeup'|'vasthouden', kijk:±1, a, outfit})`. Cast: noor, sam, lotte, daan, yasmin, bilal, kim (Dr. Kim, arts; outfit 'gewoon' = zonder labjas, 'lab' = labjas zonder stethoscoop), henk (Opa Henk), visser (Mevrouw Visser, docent; outfit 'practicum'), kind, baby. Practicumkleding: outfit 'practicum' (noor, sam, lotte, bilal, daan, yasmin, visser). Er is geen liggende houding. Fade een persoon snel in (`q.on(w,1,0.3)`): halfdoorzichtige personen zien er spookachtig uit. Actuele cast: `personages/lib_cast.js`.
- Lees `/home/claude/biologie-/films/BEELDAFSPRAKEN.md`: alleen castpersonages, geen grijze poppetjes (telpoppetjes alleen in groepen/grafieken), geen wijslijnen, namen direct bij het onderdeel, geen korrel, celmembraan rond.
- Op het beeld weinig tekst; niet de ondertitel herhalen. Antwoordlabel: `regel(ctx,'Antwoord x',120,150,1,C.groen,40,'left',700)` (zie l1).
- Vraagkaarten: het goede antwoord niet steeds op dezelfde letter en niet steeds de langste optie.

## Bouwen en kijken
```
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js <d>/teken_<d>.js <d>/scenes_<d>.js; } > <d>/scenes.js
(cd <d> && python3 film.py) && python3 engine/build_data.py <d> && python3 engine/build.py <d>
python3 engine/stills.py <d> <d>/qa contact          # of losse tijden: s04:12 s07:20
python3 engine/sheet.py <d>/qa <scratchpad>/sheet.png 4   # contactsheet, bekijk met Read
```
Kijk de contactsheet na op overlap, tekst buiten beeld, timing (beeld past bij wat er gezegd wordt) en lege schermen; herstel en bouw opnieuw. Helpers: niet publiceren, niet pushen: dat doet de hoofdsessie.

## In de repo zetten (hoofdsessie)
`python3 engine/maakinfo.py <d> script_v2.md <gebied> '<reeks>' '<beeldstijl>' '<wachtlijst>' '<aandachtspunten met |>' '<notes>'`, dan `python3 engine/pak.py <d> <gebied>` (film + bronmap naar `films/vervolg/`), film in `GEBIEDEN` van `vervolg.html` van planobject naar `[titel, href]`, duur in `films/vervolg/films.json`, lijntekening per film in `FILMKUNST` van `index.html`, `git add` van de nieuwe bestanden (anders slaan `licentie_noot.py` en `tabel_mobiel.py` ze over), dan `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`, `tabel_mobiel.py`; controle `spelerfix.py --check` en bronmap aanwezig. Eerst een scriptreview (feiten met bronnen), na het bouwen een frisse beeldreview.

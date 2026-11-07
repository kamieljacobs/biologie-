# De cyclus — bronmap

Versie 1.0 (7 nov 2026): nieuwe film, deel 1 van de splitsing van *Van bevruchting tot baby* (`films/SPLITSING-VAN-BEVRUCHTING-TOT-BABY.md`). Lichte remake: H2, H3, H4 en s45–s46 van de oude film als geraamte, kritisch nagelopen, nieuwe stem en nieuw beeld. Kamiel keurde op 7 nov 2026 de termenlijst en de vijf twijfelscènes goed (`remake-2026-11/twijfel.md`: pil als rode draad, eiwit/steroïd als vwo-blok, geen Leydig/Sertoli/inhibine in de stem, Erik als bodybuilder, vier vragen).

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/cyclus/index.html (audio in `audio/sNN.mp3`, oefeningen in `oefenen.json`) |
| Reeks / nummer | Voortplanting, film 3 (na Geslachtsorganen en puberteit, vóór Bevruchting). Nog niet in `HOOFDSTUKKEN` (dat gebeurt in de chat 'Inpassen'); de oude film blijft tot dan online |
| Niveau | havo + vwo; één vwo-blok (s26) |
| Versie / datum | 1.0 · 7 november 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (7 nov 2026); bewust niet: zie 'Bewust niet' |
| Stem / model | Roos (ElevenLabs `eleven_v4`), één take per alinea, flow `84kkSM9zmio4Z16SUieU`, ± 5.550 credits |
| Duur | 7:34 vwo met vragen · 6:16 vwo zonder vragen · 7:09 havo met vragen · 5:51 havo zonder vragen (26 alinea's, 377 s spraak) |
| Beeldstijl | Part C: Schema als hoofdlook (regelkring, cyclusgrafiek, pillenstrip), Micro in het eierstokvak en de zoomcirkel naar de zaadbal; vwo-blok in de Micro-look |
| Personages | Erik (figurant, de bodybuilder; nieuwe rol, goedgekeurd T4). Geen namen in stem of beeld |
| Hormoonkleuren | als Les 2 (`HC` in teken_cy.js): GnRH lila, FSH groen, LH goud, testosteron teal, oestrogeen koraal, progesteron paars. Stimuleren = doorgetrokken lijn met pijlpunt en '+', remmen = gestippeld met dwarsbalk en '−' |

## Opbouw

| Hoofdstuk | Segmenten | Vraag |
|---|---|---|
| Cold open | s01 (pillenstrip, puzzel) | — |
| Titel | s02 | — |
| H1 De rem | s03–s06, s08 | q07 bodybuilder (c) |
| H2 Eén follikel wint | s09–s13, s15 | q14 ivf met veel FSH (b) |
| H3 Van rem naar gaspedaal | s16–s18 | — (de grafiekvraag in H4 toetst de LH-piek) |
| H4 Het gele lichaam | s19–s21, s23 | q22 grafiek (a), met de grafiek naast de vraag (`VRAAGBEELD`) |
| H5 De pil | s24, s25, s26 (vwo), s27, s28, s30 | q29 pil vergeten (b) |
| Recap | s31 | — |
| Eindkaart | s32 | — |

## Begrippen
Nieuw (basis): negatieve terugkoppeling, follikel, positieve terugkoppeling, LH-piek, geel lichaam, progesteron (plus menstruatiecyclus en de pil in de begrippenlijst). Vwo: eiwithormoon, steroïdhormoon. Lijst in `film.py`.

## Waar wat zit
- `src/teken_cy.js`: tekenhulpen. `hd()` = hormoondeeltje (ook progesteron), `stroom()` = deeltjes langs een pad, `koppel()` = verbinding met '+' of rem, `tekenMorph()` = '−' wordt '+', `brein()` (hoofdHersenen met namen), `meter()`, `thermostaat()`, `radiator()`, `pillenstrip()`, `halter()`, `eierstokVak()` (groepje follikels `FOL`, index 2 wint; opties groei/sterf/dom/alle/receptor/volg), `cyclusGrafiek()` met de krommen `KROM` (gelijk aan Les 2), `PILK` (met de pil) en `VERGEET` (pil drie dagen vergeten), `membraanBoog()`, `receptorBuiten()`.
- `src/scenes_cy.js`: één functie per alinea in `SCENES`, cues met `q.on('woord', n, duur)`. `lusMan()` = de regelkring van hoofdstuk 1 (constanten `L`). Onderaan: elke scène krijgt eerst de achtergrond, en `VRAAGBEELD.q22` tekent de grafiek naast de vraag.
- `src/player.js`: kopie van de speler van Geslachtsorganen en puberteit 2.2, met één toevoeging in `drawQuestion`: `window.VRAAGBEELD[seg.id]` (smallere vraagtekst, beeld rechtsboven).
- `src/lib_bio_deel.js`: uittreksel uit `bibliotheek/lib_bio.js` (7 nov 2026) met `bouw/bio_deel.py`, namen: hoofdHersenen zaadbalDoorsnede follikel geelLichaam baarmoederwand injectiespuit eicelEcht zaadcelEcht hormDeeltje _hormA_steroid HORM_A vrouwOrganenVoor bioDicht bioPunt bioPad.
- `film.py` (titel, lead, vragen, begrippen), `sections.html` (checkvragen en docentdeel), `segments.json` (tekst en stem-invoer), `stem/gen.json` (generaties), `stem/woordtijden/`.

## Zo pas je deze film aan
1. Bouwen vanuit de repo-root: `bash films/voortplanting/cyclus/bron/bouw.sh`. Daarna `scripts/teller.py`, `flipkaarten.py`, `oefenen.py`, `licentie_noot.py`, `spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py`, `microteken.py` (en `--check`). Let op: teller.py en licentie_noot.py raken ook proefpagina's in `bibliotheek/` en `planner/`: die niet meecommitten.
2. Stills: `python3 bron/bouw/stills.py <werkmap /tmp/cyclus-bouw> <uitmap> s08:12 q22:3 …` of `contact`; contactvel met `bron/bouw/vel.py <map> <uit>`.
3. Een alinea opnieuw inspreken: tekst in `script_bouw.md`, `python3 bouw/make_segments.py <werkmap> script_bouw.md` (met `bouw/uitspraak_subs.json` = kopie van `films/uitspraak.json` en `stem/uitspraak_film.json` in de werkmap), take als `audio/sNN.mp3`, woordtijden met `bouw/silalign.py` (leest `raw/sNN.mp3`). Scènes hangen aan woorden, dus een nieuwe take vraagt geen nieuwe tijden.

## Aandachtspunten
- Nog niet getranscribeerd: risicowoorden op de wachtlijst (`uitspraak.md`).
- Bij Vragen uit blijft van s21 alleen 'Lees de grafiek.' staan, gevolgd door de uitleg (s23); dat leest als een opdracht en een antwoord, en verwijst niet naar de vraag.
- Bronnenlogboek: één `?` (progestageen remt de LH-piek), zie `bronnen.md`.

## Bewust niet
- B4 'één voorspelvraag per hoofdstuk': H3 heeft geen eigen vraag (Kamiel: ± 3 vragen per film; het werden er vier).
- Geen frisse beeldreview door een aparte helper en geen havo-contactvel door een helper (C10.7, B11): alleen eigen contactvellen. Kamiels review is de controle.

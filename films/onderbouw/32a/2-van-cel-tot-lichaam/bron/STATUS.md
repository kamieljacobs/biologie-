# Van cel tot lichaam — werkstatus

Film 2 van de reeks Kerndoelen onderbouw (kerndoel 32A, tweede bullet: beschrijven van de bouw van plantaardige en dierlijke orgaanstelsels, organen en weefsels). Gemaakt met prompt v5 + Part D.

**Stand 13 oktober 2026: checkpoint opgeleverd, wacht op akkoord van Kamiel.**
Checkpointpagina: https://claude.ai/artifact/WFHd5ksJrtfJt1MXGFhyDT

- `script_v1.md` → drie reviews in `reviews/` → `script_v2.md` (646 woorden basis + 112 havo/vwo; speeltijd ± 5:50 / 6:40).
- `stem/uitspraaktest.mp3`: 20 nummers (orgaanstelsels, weefsels, gespecialiseerd, kuitspier, luchtpijp, koolstofdie-oxide, ziekteverwekkers, twee scriptzinnen). Nog niet beoordeeld.
- `stijlframes/`: de trap (samenvatting) en het lichaam met tien orgaanstelsels; getekend met de bibliotheek van film 1 (`bouw/frames.html`).
- Open keuzes op het checkpoint: (A) de bloed-vraag erin of eruit; (B) "dekweefsel" erin of eruit.

Volgende stap na akkoord: opnemen per take (Roos, eleven_v4, stem-invoer "dertig-duizend", "koolstofdie-oxide"), woordtijden met Scribe, scènes met de bouwstraat van film 1 (`../1-alles-is-cel/bron/`), publiceren als `films/onderbouw/32a/2-van-cel-tot-lichaam/index.html`, kaart op de site, info.md en script.md.

## 13 oktober 2026 (middag): beeld gebouwd, wacht op inspreken

- `src/scenes2.js` (nieuwe tekeningen: gymzaal met renner, spiercel, weefseltegels, kuitspier, bot met botcellen, lichaam met tien stelsels (`bodyOrgans`/`SYS`), bloedvat, slaplant met organen, bladdoorsnede, zenuwcel/rode bloedcel, trap) + `src/helpers1.js` (hulpjes uit film 1). `build.py` plakt ze samen tot `scenes.js`.
- `bouw/cuecheck.py` controleert of elk `q.at('woord',n)` op het bedoelde woord valt; alle cues kloppen op het script v2 (s14 is bij "We zoomen in op één blad" gesplitst in s14/s15; havo/vwo-blok = s16, samenvatting s17, eindkaart s18).
- Beeldcontrole met geschatte woordtijden: `stijlframes/beeldcheck_v0.jpg`.
- Nog te doen zodra Kamiel akkoord is: inspreken (14 takes, Roos, eleven_v4; stem-invoer "dertig-duizend", "koolstofdie-oxide"), Scribe-woordtijden, mastering, `build_data.py` (vragen q02/q07/q09/q13 → optie b, eindkaart 12 s), page.html (kop, checkvragen, docentdeel), publiceren + index.html + BRONMAPPEN.

## 13 oktober 2026 (middag): film 1.0 gepubliceerd

Kamiel: "kun je ook 1 en 2 doen?" → ingesproken (14 takes), woordtijden, gemasterd, gebouwd, op de site (`index.html` in deze map), op de homepage (`HOOFDSTUKKEN.kerndoelen.films` + `FILMKUNST`). Keuzes A (bloed-vraag erin) en B (dekweefsel erin) zijn mijn voorstel gevolgd. Zie `info.md`.

# Brief: Kamiels keuzes klaarzetten voor de beeldbank (28 okt 2026)

Kamiel (biologiedocent) heeft op het keuringsblad per beeldbankobject gekozen. Jij zet voor jouw groep(en) de **definitieve versie** van elk object klaar. **Je wijzigt niets in `bibliotheek/lib_bio.js`, `bibliotheek/dieren/*.js` of in films.** De integrator plakt jouw werk later in de bibliotheek.

## Lezen (gericht)
- Repo: `/home/claude/biologie-` (= `/root/biologie-`). Bindend: `films/BEELDAFSPRAKEN.md` (let op de nieuwe afspraak 'Minder paars, meer contrast' onderaan), `films/PROMPT_v13.md` Part C (C1, C2, C9, C10; zoek op '### C').
- `bibliotheek/verbeterronde-1/LEESMIJ.md`, en per groep `OVERZICHT.md`.
- Je werklijst: `bibliotheek/verbeterronde-1/inbouw/<groep>.json`. Per object: `keuze` (oud | A | B | C | gelijk | geen), `actie`, `opmerking` (Kamiels eigen woorden: volg die), `fout_ronde1`, `fout_laatste`, `zwak_gekozen`.
- Per object staan de varianten in `bibliotheek/verbeterronde-1/<groep>/<obj>/` (`A.js`, `B.js`, `C.js`, `recept.md`, `bron.md`, `scene.js`). De huidige versie staat in `bibliotheek/lib_bio.js` of `bibliotheek/dieren/lib_*.js` (zoek de functienaam).

## Wat je per object doet
- **geen** → niets doen (komt in een nieuwe ronde).
- **gelijk** → huidige versie blijft. Alleen als er een fout gemeld is die je met **minstens twee onafhankelijke, betrouwbare bronnen** bevestigt, herstel je die in de huidige versie.
- **oud / A / B / C** → neem die versie als basis. Herstel dan:
  1. gemelde fouten, maar **alleen** als twee bronnen ze bevestigen (zelf openen met WebSearch/WebFetch; schrijf ze in `bron.md`). Bij één bron of twijfel: niet aanpassen, wel noteren als vraag voor Kamiel.
  2. Kamiels opmerking. Hij wil vooral: **rustiger, eenvoudiger, minder druk, zonder essentiële dingen te verliezen.** Waar hij een combinatie beschrijft (bv. 'het bolletje van B en de ribosomen van A'), maak je die combinatie.
- Verander verder niets aan de stijl die hij koos. Geen kleur-omgooien (dat gebeurt in een latere ronde), geen nieuwe details toevoegen.
- **Eiwitten**: Kamiel koos de kralenketen voor alle eiwitten. Bouw daar nu niets voor om; noteer alleen in je manifest welke van jouw objecten een eiwit in lintstijl bevatten (die zet één helper later om).

## Wat je oplevert, per object met werk
In `bibliotheek/verbeterronde-1/inbouw/<groep>/<obj>/`:
- `DEF.js`: de volledige definitieve functie(s), klaar om te plakken, met het receptcommentaar erboven (bijgewerkt). Gedeelde hulpjes die nog niet in de bibliotheek staan los in `inbouw/<groep>/_hulp.js` (één keer).
- `wat.md`: 2–5 regels: basisversie, wat je aangepast hebt en waarom (met bron bij een fout), en eventuele vragen aan Kamiel.
- `voor.png` en `na.png`: render van de gekozen versie zonder en met jouw aanpassingen (1280×720), via de `scene.js` uit de objectmap. Een objectmap heeft een testscène; bouw zo nodig een klein HTML-harnas in je eigen scratchmap dat `bibliotheek/dieren/lib.js` + de lib-bestanden + jouw DEF.js laadt (kijk in `bibliotheek/testvel.html` welke scripts in welke volgorde). Playwright/Chromium is beschikbaar of te installeren met pip/npm.
- **Kijk zelf naar `na.png`** (Read de png) en verbeter tot het klopt: niets buiten het celmembraan, realistische verhoudingen, organen op hun plek, niet drukker dan de basis.

En één `inbouw/<groep>/MANIFEST.json`: lijst van `{obj, keuze, functies: [namen], bestand: "lib_bio.js" | "dieren/lib_dieren.js" | ..., nieuw: true/false, aangepast: true/false, lint_eiwit: true/false, vragen: "..."}`. `functies` = precies de functienamen die in de bibliotheek vervangen (of nieuw toegevoegd) moeten worden.

## Klaar
Antwoord kort: per object één regel (wat je deed), plus alle vragen aan Kamiel. Geen git-commits.

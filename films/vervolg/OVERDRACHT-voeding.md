# Overdracht — Wat word jij? · Voeding en diëtetiek (gestart 26 okt 2026)

Stand (26 okt 2026, 21:00): keuring verwerkt; scènes worden gebouwd op geschatte woordtijden. **Inspreken staat stil: ElevenLabs-credits op** (80 over; nodig ± 10.600 voor beide films + ± 240–430 voor het decor).

## Planning (akkoord Kamiel 26 okt 2026)
Doel: samen het gat in havo § 10.5 *Gezonde voeding* dichten (Schijf van Vijf, energiebalans en BMI, overgewicht; `jaarplanner-dekking.json`, `bvj-havo5` → `10.5`). Beide films zijn ook extra film bij het thema Voeding (zoals CRISPR): `HOOFDSTUKKEN.extra.komt` met `vervolg: 'voedingsleer'`, in `vervolg.html` met `extra: 'voeding'`.

1. **Bij de diëtist: van eetdagboek tot nieuwe gewoonte** — houden, aangepast: H1 meten wat iemand eet (eetdagboek, onderrapportage) · H2 de Schijf van Vijf zelf (vakken, richtlijnen, waarom) · H3 advies op maat via motiverende gespreksvoering (samengevoegd) · H4 gewoontes en terugval. Werkmap `hw/vd1`.
2. **Waarom afvallen zo moeilijk is: energiebalans, honger en verzadiging** — houden, aangepast: H1 energiebalans · H2 wanneer is het te veel? BMI, middelomtrek, overgewicht en risico (nieuw) · H3 honger en verzadiging + het lichaam verzet zich (samengevoegd) · H4 wat wel werkt. Werkmap `hw/vd2`.

Cast: nieuwe vakpersoon **Diëtist Hanneke** (voorstel op het twijfelblad), figurant **Joost** als cliënt in beide films, Noor loopt mee. Toonregels bij gewicht: `REEKS-voeding.md`.

## Werkwijze
Zoals Landbouw en Ecologie: per film `getallen.md` met bronnen → 3 scriptvarianten (dobbelsteen; trekkingen in `bron/brief.md`) → blinde beoordelaar → script v1 → frisse feitenreview → script v2 → storyboard, alleen twijfelscènes naar Kamiel (één blad voor de reeks) → inspreken (Roos, eleven_v4) → bouwen → frisse beeldreview → repo → als laatste stap, na `git pull`, `jaarplanner-dekking.json` bijwerken (Kamiel 26 okt 2026: niet in twee chats tegelijk aan dat bestand).
Werkmap `/home/claude/hw/vd1`, `vd2`, gedeeld `hw/vd` (castvoorstel `cast_vd.js`, testvel-renderer `render.py`). Engine uit `landbouw-3-fokken/bron` (+ `maakinfo.py` uit landbouw-2).

Werk in het andere account niet tegelijk aan deze reeks.

## Stand (26 okt 2026, avond): wacht op keuring
| Film | Winnaar (blind, fable) | Review | Woorden · vragen |
|---|---|---|---|
| 1 Bij de diëtist | combinatie (B tempo + camera als geraamte; ronde 1 57–55–53 nipt, ronde 2 62) | 15 MOET verwerkt | 927 · 7 (c a b c b a b) |
| 2 Waarom afvallen zo moeilijk is | combinatie (B tempo + opening als geraamte; ronde 1 57–56–51 nipt, ronde 2 60) | 17 MOET verwerkt | 942 · 6 (b c c b b a) |

Bronmappen staan al in de repo (`voedingsleer-1-…/bron/`, `voedingsleer-2-…/bron/`): brief, getallen, script v1 en v2, reviews met verwerking, varianten en blind oordeel in `werk/`. Gedeelde reeksbibliotheek en castvoorstel: `werk-voeding/` (`teken_vd.js`, `cast_vd.js`, keyframe-renderer `render.py`, keyframes in `testvel/`, twijfelblad-bron in `twijfelblad/`).

**Twijfelblad:** https://claude.ai/artifact/Ho6n6QjG74TB7BBhniZXeg (dit account; db-collectie `keuring`, doc-id `c0` cast, `v1a`–`v1c` film 1, `v2a`–`v2d` film 2, `film-vd1`/`film-vd2` voor de films als geheel). Lees terug, verwerk, dan decor + inspreken.

Belangrijke vondsten: de Schijf van Vijf is op 9 april 2026 vernieuwd (film volgt de nieuwe versie; het boek kan nog die van 2016 tonen); 'bijna niemand eet genoeg groente' klopt alleen voor jongeren (volwassenen 29 % haalt 200 g); metabole adaptatie is omstreden in grootte (geen kcal-getal in de stem).

## Daarna
Decor praktijk (ElevenLabs, één variant, alleen na akkoord) → castvoorstel in `personages/lib_cast.js`, ROLLEN.md, LEVENSLOOP.md → inspreken (Roos, eleven_v4) → bouwen (engine uit landbouw-3, werkmappen `hw/vd1`, `hw/vd2`) → frisse beeldreview → repo (vervolg.html: van planobject naar [titel, href] met `extra: 'voeding'`; index.html: HOOFDSTUKKEN.extra.komt → films met `thema: 'voeding'`, FILMKUNST; films.json) → als laatste, na `git pull`, `jaarplanner-dekking.json` (§ 10.5 havo 5).

## Keuring Kamiel (26 okt 2026, 20:39)
- c0 Hanneke: **A** (krullen, groen vest) → in `personages/lib_cast.js` (`hanneke`), ROLLEN.md, LEVENSLOOP.md, castboek. Joost outfit `spreekuur` en Dennis outfit `sport` erbij.
- v1a Noor als meeloopster: ok ('meer cast is ok'). Decor: geen reactie → voorstel geldt (één ElevenLabs-decor praktijk voor beide films), maar wacht op credits.
- v1b foto: **A**, Fleur als kleindochter van Joost (in LEVENSLOOP).
- v1c, v2a, v2b, v2c: ok. v2d (hersenen als doorsnede in een zoomcirkel náást Joost): ok, aangevinkt 'geldt voor alle films' → toegevoegd aan BEELDAFSPRAKEN.

## Inspreken (onderbroken door credits)
- Brief: `werk-voeding/HELPER-inspreken.md` (in hw: `vd/HELPER-inspreken.md`).
- vd1: flow `5ypdRQlzSB5Hv3tLbLEx` ('Voeding vd1 · stem'), 0 takes (s01 en s04 geweigerd, niets gerekend). Opnieuw starten vanaf s01.
- vd2: flow `fSF7UuMpBLlIQmf0gzjb` ('Voeding vd2 · stem'), 1 take: s01 (253 credits, `raw/s01.mp3` + `audio/s01.mp3` in hw/vd2, nog niet in de repo). Verder vanaf s04.
- Stem-invoer: `segments.json` uit `script_opname.md` (script v2 zonder Keuzes/Twijfels); film 2 heeft `uitspraak_film.json` (ghreline → 'greline', op de wachtlijst).
- Bouwen loopt intussen op geschatte woordtijden (`fakewords.py`); na het inspreken `silalign.py`, cues nalopen en opnieuw bouwen.

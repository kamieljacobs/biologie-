# Opwaardering naar prompt v13 — Stress (Hormonen 4), 28 okt 2026

Zonder keuring (regeling `films/OPWAARDEREN-REGELING.md`). Versie 1.0 → 1.1. Oude versie: `bron/oud/4-stress-v1.0.html`.

## (a) Herinspreeklijst

Niets nodig. Geen uitgesproken namen van castpersonages, geen feitelijke fout (zie `bronnen.md`). De gesproken vwo-aankondiging in s14 is geknipt in de bestaande take (0 credits).

| Alinea | Reden | Credits |
|---|---|---|
| — | — | 0 |

## (b) Vragen aan Kamiel (nieuwe aanpak of inhoud; niet zelf gedaan)

1. **Seriekleuren hormonen.** Zenuwen zijn in deze reeks paars (`HK.zenuw`), de zenuwimpuls lavendel; Part C zegt 'zenuwsignalen teal' en 'minder paars'. Maar cortisol (en glucose, water) is in deze reeks teal. Omzetten raakt alle vijf hormonenfilms: zenuw → teal en cortisol een andere kleur, of laten zoals het is?
2. **Cold open op de juiste plek?** De stem zegt 'elke avond tot laat leren', het beeld is een klaslokaal (met bureaulamp). Noor aan haar bureau thuis past beter (decor-afspraak: een decor alleen waar het zich echt afspeelt). Andere scène = nieuwe aanpak, dus eerst jouw akkoord.
3. **s14 (vwo): twee cellen** (adrenaline tegenover cortisol) zijn grote ovalen met één membraanlijn. Wil je hier ronde cellen met een dubbel membraan en de receptor uit de beeldbank (`membraanReceptor`)? Dat is een nieuwe tekening van de scène.
4. **Docentdeel recap.** Het onderzoek naar stress en verkoudheid (Cohen 1991) gaat over langere stress, niet over één toetsweek. Voorstel: in het docentdeel één zin dat 'ziek na de toetsweek' een denkvoorbeeld is (bronnenlogboek bewering 25).
5. **Twee beweringen nog zonder geopende bron** (`bronnen.md` nr. 23): 'vooral 's avonds blijft cortisol te hoog' en 'je slaapt slechter'. Klopt in de literatuur (afgevlakt dagritme), maar de PubMed/PMC-pagina's waren niet bereikbaar. Bij de volgende ronde een bron openen.

Voor de bibliotheek (niet zelf in `bibliotheek/` gezet): een bloedlus in `lib_anatomie`-coördinaten (`S6_LUS` in `src/scenes.js`: bijnier → holle ader → hart → hals → aorta → benen → terug) kan als standaardroute naast `anVessels` voor hormonen die 'overal in het bloed' komen.

## (c) Wat veranderde

- s14: 'Voor vwo gaan we hier nog een stap verder.' uit de take geknipt (woordtijden −2,98 s).
- s01, s19: Noor (castboek) in plaats van een zelfgetekende leerling en een zelfgetekend hoofdje in bed; ze zit aan de schoolbank en rechtop in bed.
- s04: `nierBijnier` uit de beeldbank; namen naast de organen; doorsnede zonder gloed (ook titel).
- s06: realistisch lichaam (`lib_anatomie.js`) in plaats van het grijze silhouet; hypothalamus in een zoomcirkel naast het hoofd (`hoofdHersenen`); zenuwbaan via het ruggenmerg naar het bijniermerg; doelwitcellen zonder gloed.
- s11: `spierBundel` en `leverVoor` uit de beeldbank.
- s12: `witteBloedcellen` uit de beeldbank; geen korrel buiten cellen (alle Micro-scènes).
- Getest: contactvel van de gewijzigde scènes bekeken; alle vragen met `?vragen=uit` afgespeeld (vwo en havo); spelerfix, antwoordtekst, kortantwoord, antwoordletter `--check` in orde; geen JS-fouten.

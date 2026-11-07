# Slaap — opwaardering naar prompt v13 (28 okt 2026, zonder keuring)

Versie 1.0.3 → 1.1. Stem, script, vragen, timing en speler zijn gelijk gebleven. Oude versie: `bron/oud/7-slaap-v1.0.3.html` (en `oud/scenes-v1.0.3.js`).

## (a) Herinspreeklijst (wacht op Kamiels akkoord)

Reden voor alle drie: namen van castpersonages worden niet meer uitgesproken (prompt v13, B4). Roos, eleven_v4, één take per alinea, daarna Scribe en uitlijnen (`info.md` → 'Hoe je de film aanpast').

| Alinea | Nu | Voorstel | Credits (schatting) |
|---|---|---|---|
| s01 (21 s) | 'Bilal en Sam halen een nacht door met gamen. … Sam gaapt, en Bilal valt bijna in slaap met zijn controller in zijn hand. …' | 'Twee vrienden halen een nacht door met gamen. … De een gaapt, de ander valt bijna in slaap met de controller in zijn hand. …' (rest gelijk) | ± 450 |
| s12 (31 s) | 'Antwoord cee. Terug naar Bilal en Sam. Hun slaapdruk …' | 'Antwoord cee. Terug naar de twee vrienden. Hun slaapdruk …'; tegelijk 'alleen opgeruimd als je slaapt' → 'vooral opgeruimd als je slaapt' (bronnenlogboek, bewering 18). Gratis alternatief: de zin 'Terug naar Bilal en Sam.' wegknippen op de woordtijden. | ± 600 |
| s19 (25 s) | 'Bilal en Sam zaten 's ochtends op vierentwintig uur: …' | 'De twee vrienden zaten 's ochtends op vierentwintig uur: …' | ± 500 |

Totaal ± 1.550 credits (TTS + Scribe). Na het inspreken in `src/scenes.js` de cue `q.on('Bilal', …)` in s12 en s19 vervangen door een woord uit de nieuwe zin (bv. 'vrienden'). Geen nieuwe soort herinspreken: dezelfde soort (namen eruit) als bij de andere films van deze batch.

## (b) Vragen aan Kamiel (nieuwe aanpak of inhoud, niet gedaan)

1. **REM-slaap in paars?** De slaapgrafiek, de REM-labels en de samenvatting gebruiken paars als kleur voor REM. Paars hoort volgens de afspraak bij kern, erfelijkheid, hormonen en vwo. Een andere vaste kleur (bijv. koraal: 'actief brein') raakt s05, s07, s08 en s20. Doen?
2. **Hoofd met hersenen als zoomcirkel naast een personage?** Het hoofd is nu de bibliotheekdoorsnede `hoofdHersenen` (los, zonder personage), zoals voorheen. De beeldafspraak noemt een doorsnede in een zoomcirkel náást een castpersonage. In s07 ligt Noor al in beeld; daar zou een zoomcirkel vanaf haar hoofd natuurlijk zijn, in s10, s11 en s14 is het een nieuwe scène-opzet. Doen, en zo ja waar?
3. **s12 'alleen opgeruimd als je slaapt'** is te stellig (de adenosine zakt vooral in de slaap). Meenemen bij het herinspreken van s12 (zie a)?
4. **Hond in de droom**: Noor rent nu weg en een herder draaft achter haar aan (zoals de stem zegt). Goed zo, of liever een andere hond uit de bibliotheek?

## (c) Wat ik veranderde

- **Namen uit beeld**: puzzelvraag op de titelkaart, vraagkaart q02, hoofdstukvraag Recap en de kop in s12 ('wakker vanaf 08:00').
- **Hoofd met hersenen (s07, s10, s11, s14, s15)**: bibliotheek `hoofdHersenen`; klok (SCN), oog met netvlies, oogzenuw en kruising, pijnappelklier, hersenstam, hippocampus en schors als lagen op hun echte plek; geen gloed; schors teal in plaats van paars; namen opnieuw naast hun onderdeel gezet.
- **Membraan en receptor (s09)**: `membraanBoog` en `membraanReceptor` (G-eiwitgekoppelde receptor als kralenketen; adenosine geeft een signaal, cafeïne blokkeert).
- **Klokcel (s13, vwo)**: DNA grijs (palet B), mRNA als dunne teal sliert (`mrnaSliert`).
- **Dieren (s05, s15)**: herder en muis uit de dierenbibliotheek; de droom toont nu het wegrennen (castboek-zijaanzicht 'ren', de grond schuift mee zodat de voeten niet glijden).
- **Kleuren**: geen tv-gloed in de cold open, bank blauwgrijs, hersencellen in s15 neutraal (minder paars).
- **s15**: groeihormoon in zijn eigen vorm (was de vorm van insuline); antistoffen als Y van vier ketens.
- **Techniek**: actuele `personages/lib_cast.js`; bibliotheekuittreksels in `src/lib_bio_uittreksel.js` en `src/lib_dieren_uittreksel.js` (gemaakt met `bouw/uittreksel.js`), ingebouwd met `bouw/inbouw.py` zonder de film opnieuw te bouwen; volledige kopie van `bibliotheek/lib_bio.js` in `src/lib_bio.js`.

Getest: stills van alle gewijzigde scènes (s01, s05, s07, s09, s10, s11, s12, s13, s14, s15, titel) bekeken; geen paginafouten; Vragen uit: geen vraagitems in vwo en havo, de randen rond q02, q06 en q17 bekeken; `spelerfix.py --check`, `antwoordtekst.py --check`, `kortantwoord.py --check`, `antwoordletter.py --check` in orde; `flipkaarten.py`, `licentie_noot.py`, `teller.py` gedraaid (geen wijzigingen nodig).

Voor de bibliotheek (niet zelf gedaan): een `antistofY` (Y van vier ketens) ontbreekt in `lib_bio.js`, al noemt de README hem; deze film tekent er een eenvoudige in `src/scenes.js` (`antistof`).

## (d) Uitgevoerd op 29 okt 2026 (keuzes Kamiel, versie 1.2)

(a) herinspreken s01, s12, s19 gedaan (inclusief 'vooral opgeruimd', vraag 3); vraag 1: REM-slaap nu koraal volgens de kleurentabel. Zie `info.md` → Wijzigingen 1.2.

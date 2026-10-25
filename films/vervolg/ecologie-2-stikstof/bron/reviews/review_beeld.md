# Frisse beeldreview film 2 — Stikstof: hoe een voedingsstof een probleem werd (prompt v10 B4, Part C)

Contactsheet 3 beelden per alinea (25/60/92 %), alle vraagkaarten en hoofdstukkaarten, s09 op tien momenten (1 · 5 · 9,5 · 13 · 17,5 · 23,5 · 25,5 · 27,4 · 30 · 34 s), losse stills bij twijfelplekken, en Vragen uit rond elke vraag (eind van de vraagalinea en begin van de antwoordalinea). Stills: `scratchpad/c_ec2_rev`, `s09_ec2_rev`, `uit_ec2_rev`, `d_ec2_rev`, `e_ec2_rev`.

## Gevoeligheid (extra opdracht: geen oordeel over boeren, beleid of soortverlies)
- Geen kruizen, geen treurige gezichten, geen koraal voor één sector. De boerderij is in s01 herkenbaar (erf met hek, stal met silo op volle sterkte, twee koeien, label 'veehouderij'); in s04/s05 staat de stal als gewoon gebouw naast heide en snelweg/fabriek (gelijk behandeld). Stal én fabriek in H4 als grijs schetsje; provinciehuis met lege vlag; cirkeldiagram s27 in neutrale tinten, verkeer en industrie in dezelfde grijsblauwe balk.
- s09: ring 500 m en 'plan · zone 500 m' neutraal (grijze stippel resp. goud = focus), chip '± 3000 veehouderijen binnen 500 m · RIVM 2025' neutraal grijs; geen koraal; de stal staat als bron náást verre stal, weg, fabriek en buitenland, allemaal met dezelfde grijze pijl naar het zeshoekje. Goed.
- Koraal blijft alleen waar de reeksbrief het voorschrijft ('te veel'): balk boven de KDW en de marge (s18), 'zuurder'/H⁺ (s22), '!' in kaartjes, 'lastig en duur' (s12), foutbalk één plek (s14). Geen enkele daarvan wijst naar een sector of persoon.
- Eén twijfel: 'moeilijk na te meten' (s14) stond koraal; dat leest als oordeel over de methode in een dossier waar de methode zelf omstreden is. Zie punt 6.

## MOET
1. **s05 · 15–17 s** — label 'droge depositie / direct op blad of grond' (1180, 420) staat bovenop de grijze stikstofoxidenwolk en de vallende deeltjes; tekst half onleesbaar. Fix: label naar (1560, 520), rechts van de wolk boven de snelweg.
2. **s26 · 0–5 s** — Bas en het rapport staan op 40 % sterkte tot het woord 'ecoloog' (± 4 s): spookachtig halfdoorzichtig personage (BEELDAFSPRAKEN). Fix: Bas en rapport vanaf t = 0 vol; het label blijft op het woord.
3. **s09 · 26–34 s** — de oker pijlen 'de rest waait verder' lopen buiten het kaartpaneel (boven over de kop 'antwoord c', links/rechts over de paneelrand tot y ≈ 100). Fix: pijlen geclipt binnen het paneel.
4. **Vragen uit · s04, s09, s12, s18, s22, s26** — antwoordregels 'antwoord b: …' enz. staan in beeld (ook de kaart toont bij Vragen uit 'antwoord c: …'). Fix: `scripts/antwoordtekst.py` bij het in de repo zetten; op een kopie getest: de regels worden 'Snelle groeiers verdringen de rest', 'Ongeveer een twintigste', 'Ongeveer twee keer de grens', 'De provincie, met het rapport'. Niet in ec2-code (hoort bij de inbouw).

## KAN
5. **s12 · 2–14 s** — 'meet: ammoniak in de lucht' (260, 790) viel net boven de ondertitel, in de zone waar alleen ondertitels horen. Verplaatst naar boven het buisje (260, 250). (Meegenomen.)
6. **s14 · 13–15 s** — chip 'moeilijk na te meten' koraal → neutraal grijs (geen oordeel over de methode; koraal = 'te veel'). (Meegenomen.)
7. **s10 · 0–6 s** — rechterhelft leeg tot 'Meetnet'; Nederland nu vanaf t = 0 op 30 % als anker, vol op 'Meetnet'. (Meegenomen.)
8. **s09 · 21–28 s** — de grijze zone-ellips rond de heide loopt boven en rechts buiten het paneel (wordt geclipt, dus afgesneden boog); beter een kleinere ellips (± 170 + 120) zodat hij helemaal binnen het paneel blijft. Niet aangepast (Kamiel keurde s09 net; liever niet aan de vorm van de ring komen zonder zijn oog).
9. **s09 · 17–26 s** — chip '± 3000 veehouderijen …' en meta 'plan · zone 500 m' staan dicht op elkaar (± 50 px) rechtsboven; leesbaar, maar 'plan · zone 500 m' kan 20 px lager. Niet aangepast (zelfde reden).
10. **s06 · 8–11 s** — het label 'ammoniak / gemiddeld dichterbij' valt even onder de opstijgende grijze stikstofoxidenboog; kort en leesbaar. Niet aangepast.
11. **s18 · 15–17,7 s** — Bas staat klein rechtsboven bij een strookje heide ('Daarom kijkt Bas ook naar de planten'); werkt, maar is erg klein (h 230) naast een volle grafiek. Optioneel groter in een volgende ronde.
12. **s27 en s28 · 0–2 s** — s27 toont alleen de kopregel tot '2024' (± 3 s), s28 alleen het zeshoekje tot de eerste zin; < 4 s, binnen de norm.

Verder in orde: castpersonages (Daan outfit veld, Bas) correct en vol; koolmees uit de dierenbibliotheek in s20; tormentil- en braamtekeningen in s19 herkenbaar; geen tekst buiten beeld (behalve punt 3); vraagkaarten b · c · a · b · c · a, opties gelijk van vorm; titel- en eindkaart binnen beeld.

## Verwerkt (25 okt 2026)
- MOET 1–3 en KAN 5–7 hersteld in `scenes_ec2.js` (s05, s09, s10, s12, s14, s26); `ec_reeks.js` en `teken_ec2.js` niet veranderd, gesproken tekst en audio ongewijzigd.
- Opnieuw gebouwd met `bash bouw.sh` (narration 410 s); `engine/cuecheck.py ec2 ec2/scenes_ec2.js` schoon.
- Gecontroleerd met verse stills: s05 16,5 · s09 27,4 en 34 · s10 1 · s12 5 · s26 1 (`scratchpad/f_ec2_rev`).
- Open: MOET 4 (`antwoordtekst.py` bij inbouw in de repo, getest op een kopie), KAN 8–11 (s09-vormpunten voor Kamiels oog).

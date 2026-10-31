# Kun je onderzoek vertrouwen? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/extra/kun-je-onderzoek-vertrouwen.html (audio in `kun-je-onderzoek-vertrouwen/audio/s01.mp3` …) |
| Reeks / nummer | Extra film buiten het PTA, thema Cellen (`HOOFDSTUKKEN.extra.films`, `thema: 'cellen'`); vervolg op *Onderzoek doen in de biologie* 2.0 |
| Doelgroep / niveau | vwo 5–6 en profielwerkstuk (havo 5 kan meekijken); verdieping die uit de basisfilm is gehaald |
| Versie / datum | 1.0 · 31 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 |
| Stem / model | Roos (voice_id 7qdUFMklKPaaAVMsBTBt), eleven_v4, één take per alinea; flow https://elevenlabs.io/app/flows/lT9lLpHqYLArYDlLz3HW (7.808 credits). Opnamelijst in `stem/gen.json` en `stem/sessions.json` |
| Duur | 10:23 (met vraagkaarten); gesproken tekst 525,6 s |
| Beeldstijl | Part C Schema-look + daglichtdecor voor de berkenspanners (Kamiel 31 okt 2026: overdag, met een vogel en bomen met bladeren: loofbomen aan de horizon, takken met blad uit de stammen, een koolmees bij de lichte vlinder op de zwarte stam); CASUS-kaart vs BEGRIP-kaart zoals in de basisfilm; simulatie-histogram (binomiaal, 7.324 erwten, p = 0,25) |
| Audio-opslag | losse mp3 per segment; woordtijden lokaal met silalign |
| Herkomst | Gemaakt uit hoofdstuk 4, 6 en 7 van *Onderzoek doen* versie 1 (Kamiel 30 okt 2026: 'het moeilijke deel als extra video'); één script, zonder B15-varianten (zie `films/logboek/b15_uitzonderingen.jsonl`) |

## Opbouw

| Begin | Hoofdstuk | Kern |
|---|---|---|
| 0:00 | Cold open | Biotechbedrijf 2012: 6 van 53 kankerstudies te herhalen; vraag q02 (antwoord in H4) |
| 0:28 | Titel | |
| 0:33 | 1 Toeval of echt? | Mendels erwten (1850 tegen 1831 verwacht), nulhypothese, simulatie, p-waarde, grens 0,05, significant ≠ bewezen ≠ groot effect, chi-kwadraattoets |
| 3:20 | 2 Te mooi om waar te zijn | De munt (49/50/51 keer kop), Fisher 1936 over Mendel, bevestigingsbias |
| 4:39 | 3 Van verband naar oorzaak | Doll en Bradford Hill: patiënt-controle (1950), cohort Britse artsen (vanaf 1951), dosis-effect, stoppen, Fisher als adviseur van de tabaksindustrie, vier gezichtspunten |
| 6:56 | 4 Hoe wetenschap zichzelf verbetert | Peer review en herhalen; berkenspanners (Kettlewell, kritiek, Majerus tot 2007); replicatiecrisis, publicatiebias, p-hacking, preregistratie; fraude (Zuid-Korea 2004–2006) |
| 9:43 | Recap | Drie vragen: herhaald? vooraf vastgelegd? wie betaalde? |
| 10:13 | Eindkaart | |

## Vragen (antwoord)
q02 b (zwakke opzet en selectief publiceren) · q11 c · q17 a (te netjes) · q23 b (cohort) · q31 c (ongeveer één keer). Volledige tekst: `script.md`.

## Begrippen
14: nulhypothese, p-waarde, significant, simulatie, chi-kwadraattoets, bevestigingsbias, patiënt-controleonderzoek, cohortonderzoek, dosis-effectrelatie, peer review, publicatiebias, p-hacking, preregistratie, fraude.

## Docentdeel
In `bouw/sections.html`: 4 checkvragen (gele muizen, de kiemproef getoetst, koffie en hartziekten, welk argument), misvattingen, vereenvoudigingen, bronnen. Oefening: chi-kwadraatpuzzel 'de gele muizen' in `../oefenen.json` (verhuisd uit de basisfilm).

## Waar wat in de HTML zit (kun-je-onderzoek-vertrouwen.html)
- r. 69 sitebalk · r. 98 begrippen · r. 100 checkvragen · r. 116 voor de docent · r. 136 bronnen
- r. 9385 `casusKaart` (begin van `onderzoek_lib.js`) · r. 9535 `SIM` (de simulatie) · r. 9552 `SCENES` (uit `bouw/scenes.js`) · r. 9676 `DATA` · r. 9757 `drawEnd`

## Hoe je de film aanpast
Zelfde werkwijze als de basisfilm (zie `films/cellen/onderzoek-doen/bron/info.md`); de engine staat daar in `bron/bouw/engine/`. Werkmap `dev_extra/` met `bron/bouw/*`, `film/kun-je-onderzoek-vertrouwen/audio/` en de woordtijden; bouwen met `build_data.py` en `build.py`, daarna de verplichte scripts.

## Aandachtspunten
- Geen portretten van echte personen; casuskaarten met plaats en jaar.
- Het biotechbedrijf (Amgen, Begley & Ellis 2012) en de Zuid-Koreaanse onderzoeker (Hwang) worden zonder naam verteld, als toegeschreven melding (bronnen: `bronnen.md`).
- p-waarde altijd vanuit de nulhypothese uitgelegd, nooit als 'kans dat de hypothese klopt'.

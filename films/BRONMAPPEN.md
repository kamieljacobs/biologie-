# Bronmappen van de uitlegfilms

Elke film heeft naast zich een map `bron/` met twee bestanden:

- `info.md` — opbouw, vragen, begrippen, docentdeel, en vooral **waar wat in de HTML zit** en **hoe je deze film aanpast**.
- `script.md` — de gesproken tekst per segment, letterlijk uit de film, met tijden en het bijbehorende audiofragment.

| Film | Bronmap |
|---|---|
| `films/<hoofdstuk>/<n>-<slug>.html` | `films/<hoofdstuk>/<n>-<slug>/bron/` |
| `films/<hoofdstuk>/<slug>/index.html` | `films/<hoofdstuk>/<slug>/bron/` |

De bronmappen van de 28 films die er op 12 oktober 2026 stonden zijn achteraf gereconstrueerd uit de gepubliceerde HTML. Wat niet in de HTML stond (stem-invoer met respellings, ElevenLabs-model bij sommige films, versiegeschiedenis) staat als "onbekend". Nieuwe films krijgen hun bronmap bij het maken.

## Een film aanpassen (werkwijze voor Claude)

1. Lees `bron/info.md` en `bron/script.md` van de film.
2. Pak de film uit in een tijdelijke map (niet in de repo):
   `python3 scripts/filmbron.py uitpakken films/<pad>.html /tmp/werk`
   Dat geeft `film.src.html` (leesbaar, zonder base64) en `blobs/` (audio, fonts, beelden).
3. Pas `film.src.html` aan. Een alinea opnieuw opgenomen? Vervang het mp3-bestand in `blobs/` onder dezelfde naam en werk de timing bij zoals `info.md` beschrijft. Gebruik de uitspraaklijst uit de prompt voor de stem-invoer.
4. Pak weer in: `python3 scripts/filmbron.py inpakken /tmp/werk films/<pad>.html`
5. Werk `bron/script.md` en `bron/info.md` bij (tekst, tijden, versie en datum, wat er veranderd is) en verhoog het versienummer op de pagina.
6. Test de film in een browser en push.

`python3 scripts/filmbron.py controleer films/**/*.html` controleert dat uit- en inpakken een film byte voor byte ongewijzigd laat.

## Bouwvormen

De films zijn in verschillende sessies gebouwd en hebben daardoor zes bouwvormen:

| Reeks | Audio | Tijdlijn in de HTML | Gevolg bij een tekstwijziging |
|---|---|---|---|
| Celorganellen | losse mp3 per alinea (`audio/`) | `window.FILMDATA`, woordtijden | alleen die alinea opnieuw |
| Onderzoek doen | losse mp3 per hoofdstuk (`audio/`) | zinstijden per hoofdstuk | dat hoofdstuk opnieuw |
| Alles gaat rond | één doorlopende take (`narration.mp3`) | `window.TIMELINE`, globale tijden | alle latere tijden schuiven |
| Erfelijkheid 1–6 | één take per film, base64 | `window.__TIMELINE__`, woordtijden | alle latere tijden schuiven |
| Evolutie 1–9 | één mp3 per film met stiltes, base64 | `const TL`, geschatte woordtijden | alle latere tijden schuiven |
| Stofwisseling 1–3, Voortplanting | één mp3 per hoofdstuk, base64 | `window.FILM`, zinstijden | dat hoofdstuk opnieuw |
| Zenuwstelsel 1–6 | één mp3 per alinea, base64 | `window.FILM`, woordtijden | alleen die alinea opnieuw |

## Gevonden bij de reconstructie (nog niet aangepast)

- **Erfelijkheid 2:** cue `Q('p09b','vier:')` treft "in vier stappen", waardoor stappenkaart 4 vóór kaart 1 verschijnt (180,2 s i.p.v. 188,6 s). Oplossing: `Q('p09b','vier',2)`.
- **Zenuwstelsel 4:** animatie hangt aan "afremmen", de stem zegt "af te remmen"; het label staat daardoor te vroeg.
- **Zenuwstelsel 1–2:** vragen openen nog met "Voorspel." (moet "Wat denk je?" zijn); 2–6 linken naar `reeks.html`, die niet bestaat; 6 verwijst naar film 7 "Slaap en stress", die nog niet in de repo staat.
- **Evolutie 1:** docentdeel noemt bij vraag 1 de verkeerde optieletter en de pauzetijden wijken 7–8 s af van de audio.
- **Evolutie 7 en 8:** een hoofdstukkaart (`card4`) staat niet in de tijdlijn en wordt nooit getoond.
- **Stofwisseling 3:** formule twee keer fout weergegeven als C₆H₁2O₆ (tabel bij H5 en checkvraag 4).
- **Voortplanting:** bij alle zeven vragen is A het goede antwoord; poster zegt nog "Precies op tijd".
- **Ouder ontwerp:** Onderzoek doen, Alles gaat rond, Erfelijkheid, Evolutie, Stofwisseling en Zenuwstelsel volgen nog niet de stijlkaart (Part C); alleen Celorganellen doet dat.

Details per film staan onder "Aandachtspunten" in de bijbehorende `info.md`.

# Uitspraak — Waarom afvallen zo moeilijk is: energiebalans, honger en verzadiging

Wachtlijst voor de film, opgesteld 26 okt 2026 uit `script_v2.md`, `segments.json` (veld `voice` = de stem-invoer) en `uitspraak_film.json` (film-eigen regel `ghreline` → `greline`). Nog niet ingesproken en nog niet getest. Centrale lijst: `films/UITSPRAAK.md` en `films/uitspraak.json`. Bij eleven_v4 wint de gewone spelling meestal; een respelling alleen als de gewone spelling in een test fout gaat.

## Wachtlijst (nog niet goedgekeurd)

| Woord | Stem-invoer nu | Alinea's | Status |
|---|---|---|---|
| ghreline | `greline` / `Greline` (respelling via `uitspraak_film.json`; nog niet in UITSPRAAK.md; het Engelse ghrelin is "GRELL-in", de Nederlandse uitspraak is niet vastgelegd) | s18, s22, s28, s30 | wachtlijst (belangrijkste woord van de film; testen met `ghreline` gewoon, `greline`, `grelien`) |
| body mass index | `body mass index` (zoals geschreven; Engelse term in Nederlandse zin; "BMI" komt alleen in beeld voor) | s10 | wachtlijst |
| ruststofwisseling | `ruststofwisseling` (zoals geschreven) | s05, s08 | wachtlijst |
| hersenstam | `hersenstam` (zoals geschreven) | s19 | wachtlijst (laag risico) |
| obesitas | `obesitas` (zoals geschreven) | s11, s15 | wachtlijst |
| verzadiging | `verzadiging` (zoals geschreven) | s18 | wachtlijst |
| zevenentwintig komma acht | `zevenentwintig komma acht` (getal voluit) | s10 | wachtlijst |
| achttien komma vijf | `achttien komma vijf` (getal voluit) | s11 | wachtlijst |
| zesentwintig | `zesentwintig` (zoals geschreven) | s12 | wachtlijst (laag risico) |
| vierennegentig | `vierenneguntig` (via de bestaande regel voor negentig) | s14 | wachtlijst (regel voor "negentig" is goedgekeurd; samenstelling vierennegentig nog niet apart beluisterd) |
| tweeduizendvijfentwintig | `tweeduizendvijfentwintig` (voluit in woorden; de regel in UITSPRAAK.md zegt jaartallen met cijfers: "het jaar 1977") | s15 | wachtlijst (bepalen of voluit of met cijfers beter klinkt) |
| koolhydraten | `koolhydraten` (zoals geschreven) | s25 | wachtlijst (laag risico) |
| Diëtetiek (Voeding en Diëtetiek) | `Diëtetiek` (zoals geschreven) | s31 | wachtlijst |
| diëtist | `diëtist` (zoals geschreven) | s01, s31 | wachtlijst |
| Hanneke | `Hanneke` (bedoeld: HAN-nuh-kuh, niet als de hogeschool) | s01, s05, s10, s14, s23, s24, s28, s32 | wachtlijst (veel voorkomend, eerst testen) |
| Wageningen | `Wageningen` (zoals geschreven) | s31 | wachtlijst |

## Al goedgekeurd (niet opnieuw testen)

| Woord | Stem-invoer | Bron |
|---|---|---|
| leptine | `leptine` (gewoon, eleven_v4; uitgangen op -ine zoals geschreven) | uitspraaktest 18–19 okt 2026, `UITSPRAAK.md` |
| hypothalamus | `hiepo-taalamus` (klemtoon op "tha") | `UITSPRAAK.md`; regel `^hypothalamus` in `uitspraak.json` |
| HAN (hogeschool, in "de HAN in Nijmegen") | `Han` (als één woord, niet H-A-N) | uitspraaktest 25 okt 2026, `UITSPRAAK.md`; regel `^HAN` in `uitspraak.json` |
| negentig, 90 | `neguntig` (ook in samenstellingen: vierenneguntig) | `UITSPRAAK.md`; regel in `uitspraak.json` |
| antwoordletters | `Antwoord aa.` / `bé.` / `cee.` | regels `^a`, `^b`, `^c` in `uitspraak.json` (b = bé sinds 21 okt) |

## Opmerkingen

- Fout op één plek = overal testen (afspraak 24 okt): klinkt ghreline/greline in deze film verkeerd, dan ook in latere voedingsfilms en in de eindkaart (alleen beeld) controleren. Zet de goedgekeurde invoer daarna in `UITSPRAAK.md`, `uitspraak.json` en deel B5 van `films/PROMPT_v10.md`; `ghreline` staat nu alleen in de film-eigen regel.
- Voor `uitspraak_film.json`: de regel is `^ghreline([:.,?!]?)$` → `greline` (en hoofdletter); een andere vorm als "Ghrelines" of "ghreline-" wordt niet vervangen.
- Test in batches via de luisterpagina Uitspraaktest; goedgekeurde keuzes daarna in de centrale bestanden zetten en hier de status op "goedgekeurd".

## Blinde transcriptie (26 okt 2026)
Fragmenten uit de echte takes (`voedingsleer-2-…/bron/stem/uitspraaktest.mp3`) door ElevenLabs Scribe v1 (blind, zonder het script), flow `fSF7UuMpBLlIQmf0gzjb`, ±88 credits. Herkend: 'van de HAN in Nijmegen' (2×, film 1 s31 en film 2 s31), 'met de body mass index' (film 2 s10), 'minder leptine' (film 2 s22), 'zijn ghreline is hoger' / 'grelin' (film 2 s22), 'Hanneke is diëtist' (film 1 s05). Geen uitspraakfout gevonden; de woorden blijven op de wachtlijst tot Kamiel ze in de luisterpagina goedkeurt.

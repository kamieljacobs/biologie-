# Uitspraak — Je darmbewoners (Voeding 6)

Werkwijze (werkafspraak 13 okt 2026): geen uitspraaktest vooraf. Risicowoorden staan op de wachtlijst hieronder; Kamiel beluistert ze later in één batch, daarna worden alleen de foute alinea's opnieuw opgenomen. De stem-invoer is gelijk aan de ondertiteltekst (`segments.json` → `voice` = `display`); er zijn in deze film géén respellings toegepast, ook niet de vaste "koolstofdie-oxide" uit de diffusiefilm (zie wachtlijst). Stem Roos `7qdUFMklKPaaAVMsBTBt`, model `eleven_v4`, 1 variant per take.

## Blinde controle (Scribe op de echte takes, zonder tekst)

Zes takes zijn blind getranscribeerd (s04, s11, s14, s15, s17, s22; ElevenLabs-flow `tf9JO2aShKlk9GTxgiVk`, 14 okt 2026). Vergeleken met de tekst na normalisatie (kleine letters, geen leestekens):

| Take | Ratio | Afwijkingen | Oordeel |
|---|---|---|---|
| s04 | 1,00 | geen | goed (biljoen, enzymen, anderhalve) |
| s11 | 1,00 | geen | goed — "koolstofdioxide", "waterstof", "archaea", "methaan" allemaal letterlijk teruggehoord |
| s14 | 0,95 | korteketenvetzuren → "korte keten vetzuren", dikkedarmwand → "dikke darmwand", wandcellen → "wand cellen" | spaties, geen uitspraakfout; azijnzuur, propionzuur, boterzuur, kiemvrije, obligaat anaeroob goed |
| s15 | 0,99 | vóór → "voor" | spelling; Clostridioides difficile goed teruggehoord |
| s17 | 1,00 | geen | goed (spore, resistentie, gifstoffen) |
| s22 | 0,98 | darm-hersen-as → "darm-hersenas" | spelling; kiemvrije, microbioom, depressie goed |

De 19 timing-transcripties (mét tekst als referentie) kwamen allemaal op ratio 1,00 uit.

## Wachtlijst voor Kamiel (batch beluisteren)

koolstofdioxide (s11: zonder de "koolstofdie-oxide"-respelling; Scribe hoorde het goed, maar vergelijken met film 5) · Clostridioides difficile (s15, s17 "deze soort") · microbioom (s05, s08, s21, s22, s24) · mutualisme (s08) · anaerobe dissimilatie / obligaat anaeroob (s11, s14) · archaea (s11) · methaan (s11) · biljoen (s04, s05) · cellulose (s09, s12) · probioticum / probiotica (s19, s21) · azijnzuur / propionzuur / boterzuur (s14) · korteketenvetzuren (s14) · kiemvrije (s14, s22) · darm-hersen-as (s22) · zevenendertig graden (s05) · poeptransplantatie (s18, s25) · loting (s18, s21) · vwo (s14, s22)

## Als een woord fout blijkt

1. Zet de respelling in `bouw/uitspraak_subs.json` (woord → uitspraak), of pas de alinea in `script_v2.md` aan.
2. `python3 engine/make_segments.py f6 script_v2.md` → nieuwe `segments.json` (alleen `voice` verandert).
3. Neem alleen die take opnieuw op (zelfde stem Roos, model `eleven_v4`, 1 variant), master op −15 LUFS (zie `info.md`), transcribeer voor de woordtijden, `align.py`, `build_data.py`, `build.py`.

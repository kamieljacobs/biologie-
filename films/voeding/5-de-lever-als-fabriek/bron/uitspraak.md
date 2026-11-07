# Uitspraak — De lever als fabriek (Voeding 5)

Werkwijze (werkafspraak 13 okt 2026): geen uitspraaktest vooraf. Risicowoorden staan op de wachtlijst hieronder; Kamiel beluistert ze later in één batch, daarna worden alleen de foute alinea's opnieuw opgenomen. De stem-invoer is gelijk aan de ondertiteltekst (`segments.json` → `voice` = `display`), behalve de vaste vervangingen uit `bouw/uitspraak_subs.json` (daar zat in deze film niets van in).

## Blinde controle (Scribe op de echte takes, zonder tekst)

Zes takes zijn blind getranscribeerd (s05, s09, s17, s21, s22, s23). Afwijkingen tegen de tekst, na normalisatie:

| Take | Tekst | Gehoord | Oordeel |
|---|---|---|---|
| s09, s21 | een | één | spelling |
| s17 | vwo | vvbo | **beluisteren** — in s22 werd "vwo" wel goed gehoord; mogelijk zegt Roos "vee-wee-oo" iets gesmeerd |
| s17 | stikstofdeel, aminogroep(en) | stikstof deel, amino groep(en) | spatie, geen uitspraakfout |
| s22 | lipoproteïnen | lipoproteïne | n-uitgang zacht; beluisteren |
| s23 | honderdtwintig, eiwitdeel, wél | 120, eiwit deel, wel | spelling |

De 22 timing-transcripties (mét tekst als referentie) kwamen allemaal op ratio 1,00 uit, ook de vier hernemingen (s05, s20, s26, s27).

## Wachtlijst voor Kamiel (batch beluisteren)

leverslagader (s05, s08, s20) · onderste holle ader (s05) · glycogeen (s13, s16, s29) · ureum (s16, s17, s29) · deaminering (s17) · aminogroep (s17) · ammoniak (s17) · bilirubine (s23, s26, s27, s28) · galzouten (s21) · galgang (s24) · twaalfvingerige darm (s21) · alvleesklier (s21) · lipoproteïnen (s22) · LDL / HDL (s22) · sinusoïden (s09) · portale driehoek (s09) · paracetamol (s20) · hemoglobine (s23) · vwo (s09, s17, s22) · koolstofdioxide (s17, s20: zonder de "koolstofdie-oxide"-respelling uit de diffusiefilm — vergelijken)

## Als een woord fout blijkt

1. Zet de respelling in `bouw/uitspraak_subs.json` (woord → uitspraak), of pas de alinea in `script_v3.md` aan.
2. `python3 engine/make_segments.py f5 script_v3.md` → nieuwe `segments.json` (alleen `voice` verandert).
3. Neem alleen die take opnieuw op (zelfde stem Roos `7qdUFMklKPaaAVMsBTBt`, model `eleven_v4`, 1 variant), master op −15 LUFS (zie `info.md`), transcribeer voor de woordtijden, `align.py`, `build_data.py`, `build.py`.

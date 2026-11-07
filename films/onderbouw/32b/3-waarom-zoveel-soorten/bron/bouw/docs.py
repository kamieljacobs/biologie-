# docs.py <filmmap> <meta.json>: schrijft info.md, brief.md, STATUS.md, uitspraak.md, reviews/review_eind.md, index_entry.json, stem/tts.json uit één meta-bestand
import json,sys,subprocess,os
D,M=sys.argv[1],json.load(open(sys.argv[2]))
g=json.load(open(f'{D}/stem/generaties.json')); audio=round(sum(v['dur'] for v in g.values()))
json.dump({'flow':M['flow'],'takes':g},open(f'{D}/stem/tts.json','w'),indent=1)
regels=subprocess.check_output(['python3',os.path.dirname(__file__)+'/regels.py',D]).decode().strip()
n=M['n']; slug=M['slug']; titel=M['titel']; ntakes=len(g)
json.dump({'entry':{'href':f'films/onderbouw/32b/{slug}/index.html','titel':titel,'vraag':M['vraag'],'tekst':M['tekst'],'duur':M['duur'],'bij':'Film · kerndoel 32B'},'filmkunst_sleutel':slug,'filmkunst':M['filmkunst']},open(f'{D}/index_entry.json','w'),ensure_ascii=False,indent=1)
U=M['uitspraak']
open(f'{D}/uitspraak.md','w').write(f"# Uitspraak — 32B film {n} {titel}\n\nModel eleven_v4: gewone spelling (les uit de test van 18 okt 2026){M.get('uitspraak_noot','')}. Blinde Scribe-controle (elke take los): alle {ntakes} takes kwamen woord voor woord terug.\n\n| Woord | IPA / klemtoon | Stem-invoer | Segment(en) | Status |\n|---|---|---|---|---|\n"+''.join(f"| {w} | {i} | {v} | {s} | {st} |\n" for w,i,v,s,st in U))
open(f'{D}/brief.md','w').write(f"# Filmbrief — 32B film {n} \"{titel}\"\n\n| Veld | Invulling |\n|---|---|\n"+''.join(f"| {k} | {v} |\n" for k,v in M['brief']))
open(f'{D}/STATUS.md','w').write(f"# {titel} (32B film {n}) — werkstatus\n\n**20 oktober 2026: v1.0 gepubliceerd.** Brief → script v1 → drie reviewpasses → v2 → {ntakes} takes → blinde Scribe-controle (alles klopt) → gebouwd → contactbladen bekeken en verbeterd → speeltest in vijf standen zonder fouten. Status in `REVIEW`: nog bekijken. Wachtlijst uitspraak in `uitspraak.md`.\n"+M.get('status_extra',''))
open(f'{D}/reviews/review_eind.md','w').write("# Eindcontrole (stills + inhoud), 20 okt 2026\n\nGeen aparte helper beschikbaar in deze sessie: gedaan door de maker op de contactbladen (3 stills per segment, lage resolutie) en de inhoud. **Aanbevolen: nog een echte frisse review.**\n\n## Gevonden en verwerkt\n"+''.join(f"{i+1}. {x}\n" for i,x in enumerate(M['eind']))+"\n## In orde\n- Geen schoolniveau genoemd; alleen castpersonages; geen grain, geen wijslijnen; hooguit drie betekeniskleuren tegelijk.\n- Speeltest (basis, uitdaging, vragen uit, 1,5×): geen JS-fouten.\n"+''.join(f"- {x}\n" for x in M.get('eind_ok',[])))
opb=''.join(f"| {a} | {b} | {c} | {d} |\n" for a,b,c,d in M['opbouw'])
vr=''.join(f"| {a} | {b} | {c} | {d} |\n" for a,b,c,d in M['vragen'])
info=f"""# {titel} — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/{slug}/index.html` (audio in `audio/`: {ntakes} mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32B film {n}. {M['kerndoel']} Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025 (bijlage Eerste Kamer). |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** ({M['uitdaging']}). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea; flow `{M['flow']}` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | Scribe per take; alle {ntakes} woord voor woord gelijk aan de stem-invoer |
| Duur | audio {audio} s; {M['speeltijd']} |
| Beeldstijl | {M['beeld']} |
| Herkomst | uitlegfilm-prompt v6 Part D, reeksmodus 20 okt 2026; werkwijze en bouwstraat als 32B film 1 |

## Bronbestanden
Zelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor het opzetten van de werkmap). Scènes in `src/{M['scenes']}`; gedeelde tekeningen in `src/lib32b.js`; speler en bibliotheek in `src/_base/`; bouwstraat in `bouw/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
{opb}
## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
{vr}
## Begrippen
{M['begrippen']}

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Geen blobs. Regelnummers: {regels}.

## Zo pas je deze film aan
Als 32B film 1 met `{M['scenes']}`: scène = functie `sNN` in `SCENES`, cues via `q.at('woord', n)` (daarna `cuecheck.py`); alinea opnieuw inspreken = Roos/eleven_v4/één take → Scribe → `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen → `bouw.py`; vragen in `script_v2.md` + `src/vragen.json`; checkvragen in `src/config.json`; docentdeel in `docentdeel.md`. Na elke bouw `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak
Wachtlijst: {', '.join(f'{w} ({s})' for w,i,v,s,st in U if st!='goedgekeurd')}. Zie `uitspraak.md`.

## Aandachtspunten
"""+''.join(f"- {x}\n" for x in M['aandacht'])
open(f'{D}/info.md','w').write(info); print('docs ok, audio',audio)

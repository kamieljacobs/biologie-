#!/usr/bin/env python3
"""Schrijf bron/info.md en bron/script.md voor DNA-film n uit de bouwdata.  python3 mkbron.py 1 2 <repo>/films/dna"""
import json, sys, os, re, html as H
from films import FILMS
HERE=os.path.dirname(os.path.abspath(__file__))
CARD,TITLE,END,CD=3.5,5,8,8
def segs_of(n):
    page=open(f'{HERE}/out/{FILMS[n]["file"]}',encoding='utf-8').read()
    d=json.loads(re.search(r'window\.FILMDATA=(\{.*?\});</script>',page,re.S).group(1)); return d,page
def timeline(segs,niv):
    items=[]; prev=None
    for s in segs:
        if niv=='havo' and s['level']=='vwo': continue
        if s['kind']=='title': items.append(('title',s,TITLE)); prev=s['chapter']; continue
        if s['kind']=='end': items.append(('end',s,END)); continue
        if s['chapter']!=prev and s['chapter']!='Opening': items.append(('card',s,CARD)); prev=s['chapter']
        items.append((s['kind'],s,s['dur'] if s['kind']=='speech' else s['adur']+CD+(6 if s.get('explain') else 2.5)))
    t=0; out=[]
    for k,s,d in items: out.append((k,s,t,d)); t+=d
    return out,t
fmt=lambda x:f'{int(x//60)}:{int(x%60):02d}'
PP='- 12 okt 2026 (later) — nieuwe mensfiguur in opening en samenvatting: met huidskleur, zachte ronde vormen, vriendelijk gezicht (personReal in dnalib); speler: denktijd per vraag instelbaar.'
CC='- 2.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma/dubbele punt, nooit midden in “van 3′ naar 5′”; opnieuw gebouwd, beeld en audio ongewijzigd.'
VWO={5:'vwo-blokken in hoofdstuk 2 (leesraam, promotor/intron), hoofdstuk 4 (chromosoommutatie; proto-oncogen, tumorsuppressorgen, p53) en de samenvatting (evolutie)',4:'vwo-blokken in hoofdstuk 1 (anticodon, laadenzymen, ribosomaal RNA), hoofdstuk 3 (coderende streng en matrijsstreng) en de samenvatting (gen zonder introns)',1:'hoofdstuk 4 is een vwo-blok',2:'hoofdstuk 4 is een vwo-blok',3:'vwo-blokken aan het eind van hoofdstuk 2 (promotor, leesrichting, splicing) en hoofdstuk 3 (anticodon, wiebelbase, met een eigen vraag)'}
VERSIE={5:'1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5); opening = puzzel B (zonnebrand); stem eleven_v3 zonder uitspraaktest vooraf',4:'1.1 · 12 oktober 2026 — opnieuw ingesproken met eleven_v3 (Nederlandse aminozuren); 1.0 eerste versie, Part C (prompt v5); opening = puzzel A (insuline uit een bacterie); oefenaflevering met CE-vragen',1:'2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd',2:'2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd',3:'1.0 · 12 oktober 2026 — eerste versie, direct in Part C (prompt v5); opening = puzzel A (mRNA-vaccin)'}
_W12=PP+'\n'+CC+'\n- 2.0 · 12 okt 2026 — nieuwe Part C-look op de speler van Celorganellen (vraag wordt ingesproken; toetsen ↑ ↓ A B C Enter; lettertypen ingebed). Inhoudelijke correcties bij het hertekenen: {}\n- 1.1 / 1.0 · 8–9 okt 2026 — eerste versie, stijl “Papier en inkt”.'
WIJZ={5:'- 1.0 · 13 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten, o.a. stille mutatie in de Wilson-vraag, variatie voor havo, leesraamdefinitie, asbest eruit) en een didactiek/taal-review (15 punten, o.a. afleiders V1/V2/V4, NF2-vraag naar de pagina, genoommutatie naar hoofdstuk 4). Beelden nagekeken op contactsheets vwo en havo.',4:'- 1.1 · 12 okt 2026 — tRNA-kringloop (h1b) opnieuw: één tRNA gaat zichtbaar de kring rond (pakt valine, klikt op G-U-G, valine gaat naar de keten, het tRNA vertrekt leeg met een gestippeld leeg haakje); “vaste combinatie” anticodon C A C → valine plus een rijtje anticodon → aminozuur (h1b li 5–6), met een nieuwe gesproken zin in n5 (“Welk aminozuur erbij hoort, hangt af van die drie basen. Bij C A C hoort altijd valine.”); tRNA overal dezelfde opname; anticodon en codon grijpen nu precies in elkaar (`trnaY()`).; alle 20 takes opnieuw ingesproken met eleven_v3 en Nederlandse uitspraak van de aminozuren (na 9 uitspraakrondes met Kamiel); woordtijden opnieuw berekend; spraak nu ≈ 505 s (vwo).\n- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (13 punten, o.a. stopcodon telt mee in het mRNA; A G U als tweede mogelijkheid) en een didactiek/taal-review (15 punten, o.a. "Antwoord C." vooraf, hergebruik van tRNA als werktuig). Beelden nagekeken op contactsheets vwo en havo.',1:_W12.format('schaalbalken bij de kern kloppen nu met 6 µm; 2 %-balk op schaal; bacterie verkleind.'),2:_W12.format('de replicatiesimulatie opent de ladder nu echt (de oude versie liet hem dichtritsen); de nieuwe streng in het vwo-blok groeit van 5′ naar 3′ van rechts naar links, met de primer aan het 5′-uiteinde; primer als RNA (teal).'),
 3:PP+'\n- 1.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma.\n- 1.0.2 · 12 okt 2026 — tRNA’s sluiten nu precies op het codon aan (anticodonbasen grijpen in de codonbasen; eerst hingen ze iets te hoog of schoven ze erin). Helper `trnaY()` in `src/dnalib.js`.\n- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten verwerkt); beelden nagekeken door een tweede, onafhankelijke review (ribosoom volgt de tRNA\'s, losgelaten mRNA houdt zijn basen, labels vrij van elkaar, 3′/5′ bij het anticodon). Dezelfde dag: n17 opnieuw ingesproken, de wiebelbase is de derde base van het codon (niet van het anticodon).'}
AANDACHT={5:"""- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3 en de spellingen uit de uitspraaklijst; nieuwe woorden staan op de wachtlijst hieronder voor een latere verzameltest over meerdere films. Ronde 1 van de test (18 zinnen, `uitspraaktest_afl5_ronde1.mp3`) is wel gemaakt maar niet beoordeeld.
- Uitspraak-wachtlijst (tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| vijfenzeventigduizend | n0 | 0:17.3 |
| DNA | n0 | 0:24.1 |
| DNA | n3 | 0:20.4 |
| UV | n3 | 0:26.1 |
| UV-licht | q4 | 0:00.0 |
| DNA | q4 | 0:01.9 |
| UV-licht | n5 | 0:01.2 |
| T's | n5 | 0:10.0 |
| DNA | n5 | 0:32.4 |
| UV | n6 | 0:00.5 |
| Röntgenstraling | n6 | 0:01.9 |
| radioactieve | n6 | 0:03.3 |
| DNA | n6 | 0:05.3 |
| mutagene | n6 | 0:17.8 |
| substitutie | n8 | 0:10.4 |
| insertie | n8 | 0:13.9 |
| deletie | n8 | 0:17.0 |
| DNA | n8 | 0:19.7 |
| mRNA | n8 | 0:22.4 |
| substitutie | q9 | 0:00.3 |
| mRNA | q9 | 0:04.6 |
| valine | n10 | 0:03.4 |
| glutaminezuur | n10 | 0:17.3 |
| tryptofaan | n10 | 0:27.8 |
| mRNA | n11 | 0:19.7 |
| deletie | n11 | 0:21.3 |
| leesraam | n12 | 0:09.7 |
| leesraamverschuiving | n12 | 0:14.0 |
| promotor | n12 | 0:20.1 |
| mRNA | n12 | 0:21.9 |
| intron | n12 | 0:24.2 |
| glutamine | n14 | 0:15.0 |
| histidine | n14 | 0:16.3 |
| DNA | n16 | 0:02.4 |
| mRNA | n16 | 0:04.6 |
| Histidine | n16 | 0:11.1 |
| glutamine | n16 | 0:24.5 |
| meiose | n19 | 0:02.7 |
| Down | n19 | 0:11.5 |
| 21 | n19 | 0:13.5 |
| genoommutatie | n19 | 0:15.4 |
| chromosoommutatie | n20 | 0:12.3 |
| tumor | n24 | 0:26.8 |
| proto-oncogenen | n25 | 0:05.4 |
| tumorsuppressorgenen | n25 | 0:18.3 |
| tumorsuppressorgen | n25 | 0:25.2 |
| p53 | n25 | 0:27.3 |
| UV | n27 | 0:01.4 |
| DNA | n29 | 0:02.0 |

- CE-vragen geparafraseerd (havo 2019-II v2, 2025-II v5; op de pagina 2024-II v45, 2022-II v32, 2019-II v31); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- UV-schade is vereenvoudigd tot 'basen aan elkaar, meestal twee T\'s' en 'soms een verkeerde base'; vervellen tot 'cellen die zichzelf opruimen' (zie docentdeel).
- Lengte: spraak vwo ≈ 10:25, havo ≈ 8:30; langer dan afl. 4. Kandidaten om in te korten: h3c (vier niveaus) en het p53-blok (h4v).
- Nieuwe bibliotheekobjecten (scenes5.js): beachBg, sun, uvRay, dimerMark, chromo, cellS, liver, chick, egg, hen, geneBar, pedal. Gedeelde helpers (codonTable, tileRow, bracket, aaBead, macroBg, CODE) zijn op 13 okt van scenes4.js naar dnalib.js verhuisd.
- Denktijd 12 s bij V2 en V3 (`think`).""",4:"""- Uitspraak (rondes 1–9 met Kamiel, 12 okt): opgenomen met ElevenLabs **eleven_v3** (niet multilingual_v2: die gaf de uitgang '-ine' Frans of als 'valinuu'). Aminozuren in de stem-invoer: vaaline, meetioonine, leussine, histiedine, seerine, aalaanine, feenyl-alanine; cysteïne zoals geschreven. De uitgang moet klinken als in 'verwenne' (/vaːˈli.nə/). Afgekeurd: 'valie-nuh'-spellingen (rondes 1–7), 'valienuh' zonder streepje. Verder 'codon tabel' los, losse codons met streepjes, DNA als 'deeënaa', tRNA als 'tee-er-en-aa'.
- tRNA klonk in eleven_v3 elke keer anders. Kamiel koos uitspraak nr 2 (n5 ≈ 0:07,6); `splice_trna.py` plakt precies die opname over alle andere 13 keer (n5, n6, n23; grenzen via DTW, meervouden houden hun eigen s). Originelen in `afl4/v3/pre_splice/`, tijdkaart in `afl4/v3/splice.json`. Neem je n5, n6 of n23 opnieuw op, draai daarna `splice_trna.py` opnieuw.
- n5 kreeg op 12 okt een extra zin (Kamiel: anticodon ↔ aminozuur ook zeggen): "Welk aminozuur erbij hoort, hangt af van die drie basen. Bij C A C hoort altijd valine." Los opgenomen (eleven_v3, `afl4/v3/insert/`) en ingevoegd door `insert_n5.py`, ná `splice_trna.py`. Volgorde: `splice_trna.py` → `insert_n5.py` → `make_words4v3.py` → kopieer naar `data/afl4_audio/` → `build.py 4`.
- CE-vragen geparafraseerd (havo 2025-I v39, 2024-II v18; 2022-II v32 als checkvraag); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien. Bij 2024-II is U G U → A G U ook één base; de film benoemt dat.
- Denktijd 12 s bij de twee terugredeneervragen (`think` in het vraagsegment).
- Codontabel als 4 × 4-raster (34 px, net onder het Part C-minimum); vorm in BiNaS niet gecontroleerd.
- Nieuwe bibliotheekobjecten: insulinepen, fabriekstank, bacterie, insuline, codontabel, tRNA-kringloop, mensfiguur personReal.""",1:'- Stem-invoer van film 1 is gereconstrueerd volgens de uitspraaklijst; de letterlijke invoer van 8 oktober is niet bewaard.',2:'- Uitspraak van helicase, primase, ligase en Okazaki (takes n7, n17) is nog niet door Kamiel beoordeeld.',
 3:"""- Uitspraak in context nog door Kamiel te beluisteren: tRNA als “tee-er-en-aa” (n12 ≈ 0:40, n15 ≈ 0:03, n17 ≈ 0:18, n23 ≈ 0:18), TATA-box als “taata-box” (n10 ≈ 0:13), exons als “eksons” (n10 ≈ 0:34), 3′/5′ als “drie-accent/vijf-accent” (n10 ≈ 0:19, n15 ≈ 0:08). Tijden zijn binnen de take.
- Wiebelbase = derde base van het codon (n17 op 12 okt opnieuw ingesproken; de eerste versie zei per abuis “van het anticodon”). Het beeld markeert de derde codonbase in goud, met het anticodon 3′→5′ eronder.
- “Daar bindt RNA-polymerase” bij de TATA-box is vereenvoudigd (transcriptiefactoren); zie docentdeel.
- De kegelslakvraag is geparafraseerd naar CvTE havo 2021-I; de bron staat op de vraagkaart (`source` in het vraagsegment, rechtsboven in Meta).
- Het mRNA-vaccin wordt alleen in de opening, vraag 5 en de samenvatting gebruikt; claims: niet in de kern, wordt geen DNA, wordt afgebroken."""}
def main(n,dest):
    F=FILMS[n]; d,page=segs_of(n); segs=d['segments']; S=json.load(open(f'{HERE}/data/afl{n}_script.json')); stem=json.load(open(f'{HERE}/data/afl{n}_stem.json'))
    tv,TV=timeline(segs,'vwo'); th,TH=timeline(segs,'havo')
    startv={ (k,s['id']):t for k,s,t,_ in tv}; starth={ (k,s['id']):t for k,s,t,_ in th}
    lines=page.split('\n'); ln=lambda pat: next((i+1 for i,l in enumerate(lines) if pat in l),'?')
    slug=F['file'][:-5]; b=os.path.join(dest,slug,'bron'); os.makedirs(b,exist_ok=True)
    spoken=sum(s.get('dur',0)-0.6 if s['kind']=='speech' else s.get('adur',0)-0.3 for s in segs if s['kind'] in('speech','question'))
    look={r[0]:r for r in []}
    rows=re.findall(r'<tr><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td></tr>',F['teacher_how'])
    chs=[]; [chs.append(s['chapter']) for s in segs if s['chapter'] not in chs and s['chapter']!='Einde']
    I=[]
    I.append(f"# {F['film']['title']} — bronmap\n")
    I.append('| Veld | Waarde |\n|---|---|')
    I+= [f"| Bestand | films/dna/{F['file']} (één zelfstandig bestand; audio en lettertypen ingebed) |",
         f"| Reeks / nummer | DNA, film {n} van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |",
         f"| Doelgroep / niveau | havo + vwo; {VWO[n]} (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |",
         f"| Versie / datum | {VERSIE[n]} |",
         f"| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model {stem.get('model','eleven_multilingual_v2')}); één take per alinea of vraag |",
         f"| Duur | gesproken {fmt(spoken)}; speeltijd (zonder wachten bij vragen) vwo {fmt(TV)}, havo {fmt(TH)} |",
         "| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |",
         "| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |",
         "| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–5, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |\n"]
    I.append('## Opbouw\nBegintijden in de speler (hoofdstukkaart), vwo en havo.\n')
    I.append('| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |\n|---|---|---|---|---|---|')
    for ci,ch in enumerate(chs):
        ss=[s for s in segs if s['chapter']==ch and s['kind'] in('speech','question')]
        kv=[t for k,s,t,_ in tv if s['chapter']==ch]; kh=[t for k,s,t,_ in th if s['chapter']==ch]
        m=re.match(r'Hoofdstuk (\d+)',ch); key=m.group(1)+' ' if m else ch.split(' ')[0]
        rr=[x for x in rows if re.sub('<.*?>','',x[0]).startswith(key)] or [['','','','','']]
        r=['',' + '.join(dict.fromkeys(x[1] for x in rr)),' + '.join(dict.fromkeys(x[2] for x in rr)),' / '.join(x[3] for x in rr),'']
        I.append(f"| {fmt(min(kv)) if kv else '—'} | {fmt(min(kh)) if kh else '—'} | {ch} | {', '.join(s['id'] for s in ss)} | {re.sub('<.*?>','',r[1])} · {r[2]} | {r[3]} |")
    I.append('\n## Voorspelvragen\nDe vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.\n')
    I.append('| Segment | Niveau | Vraag | Opties (juist vet) |\n|---|---|---|---|')
    for s in segs:
        if s['kind']=='question': I.append(f"| {s['id']} | {s['level']} | {s['q']} | "+' · '.join(('**'+o+'**') if i==s['correct'] else o for i,o in enumerate(s['options']))+' |')
    I.append('\n## Begrippen\n'+'\n'.join(f"- {g[0]}{' *vwo*' if g[2]=='v' else ''} — {g[1]}" for g in S['GLOSSARY']))
    I.append('\n## Checkvragen\n'+'\n'.join(f"- ({'vwo' if lv=='v' else 'basis'}) {q} — *{a}*" for lv in ('b','v') for q,a in S['CHECKS'][lv]))
    I.append('\n## Getallen\n| Getal | In de film | Bron |\n|---|---|---|\n'+'\n'.join(f'| {a} | {b_} | {c} |' for a,b_,c in S['NUMBERS']))
    I.append(f"""
## Techniek: waar zit wat in de HTML
Regelnummers in {F['file']} (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel {ln('window.FILMDATA=')}. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel {ln('// ===== Part C tokens')}; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel {ln('// ===== DNA series library')}.
- **Scènes**: regel {ln('const SCENES={};')}; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel {ln('const GLOSSARY=')}. **Speler**: regel {ln('// ===== DNA series player')} (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl{n}_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py {n} ../{F['file']}`.
2. **Beeld**: pas `src/scenes{n}.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py {n}` → `out/{F['file']}`. Controleer met `node grab.js <pad>/out/{slug}.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl{n}_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl{n}_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl{n}_stem.json` (respellings volgens de uitspraaklijst), Roos, {stem.get('model','eleven_multilingual_v2')}, één take. Vervang `data/afl{n}_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl{n}_words.json`, en pas de tekst aan in `data/afl{n}_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/{F['file']}` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
{AANDACHT[n]}

## Wijzigingen
{WIJZ[n]}
""")
    open(f'{b}/info.md','w',encoding='utf-8').write('\n'.join(I))
    # script.md
    Sx=[f"# {F['film']['title']} — script\n",f"Stem: Roos, {stem.get('model','eleven_multilingual_v2')} · stem-invoer: {stem['bron']}. Tijden: begin in de speler (vwo / havo). Audio: `FILMDATA.segments[<id>].audio`.\n"]
    for s in segs:
        if s['kind'] not in ('speech','question'): continue
        kv=startv.get(('speech' if s['kind']=='speech' else 'question',s['id'])); kh=starth.get(('speech' if s['kind']=='speech' else 'question',s['id']))
        txt=' '.join(w['t'] for w in s['words']); voice=stem['stem'].get(s['id'],'').replace('\n',' ')
        Sx.append(f"## {s['id']} · {s['chapter']} · {s['level']}{' · vraag' if s['kind']=='question' else ''}\n*begin {fmt(kv) if kv is not None else '—'} / {fmt(kh) if kh is not None else '—'} · {s.get('dur',s.get('adur')):.1f} s*\n\n{txt}\n")
        if voice and re.sub(r'\W','',voice.lower())!=re.sub(r'\W','',txt.lower()): Sx.append(f"> stem-invoer: {voice}\n")
    open(f'{b}/script.md','w',encoding='utf-8').write('\n'.join(Sx))
    print('bron',slug,'ok')
if __name__=='__main__':
    dest=sys.argv[-1]
    for a in sys.argv[1:-1]: main(int(a),dest)

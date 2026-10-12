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
CC='- 2.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma/dubbele punt, nooit midden in “van 3′ naar 5′”; opnieuw gebouwd, beeld en audio ongewijzigd.'
VWO={1:'hoofdstuk 4 is een vwo-blok',2:'hoofdstuk 4 is een vwo-blok',3:'vwo-blokken aan het eind van hoofdstuk 2 (promotor, leesrichting, splicing) en hoofdstuk 3 (anticodon, wiebelbase, met een eigen vraag)'}
VERSIE={1:'2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd',2:'2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd',3:'1.0 · 12 oktober 2026 — eerste versie, direct in Part C (prompt v5); opening = puzzel A (mRNA-vaccin)'}
_W12=CC+'\n- 2.0 · 12 okt 2026 — nieuwe Part C-look op de speler van Celorganellen (vraag wordt ingesproken; toetsen ↑ ↓ A B C Enter; lettertypen ingebed). Inhoudelijke correcties bij het hertekenen: {}\n- 1.1 / 1.0 · 8–9 okt 2026 — eerste versie, stijl “Papier en inkt”.'
WIJZ={1:_W12.format('schaalbalken bij de kern kloppen nu met 6 µm; 2 %-balk op schaal; bacterie verkleind.'),2:_W12.format('de replicatiesimulatie opent de ladder nu echt (de oude versie liet hem dichtritsen); de nieuwe streng in het vwo-blok groeit van 5′ naar 3′ van rechts naar links, met de primer aan het 5′-uiteinde; primer als RNA (teal).'),
 3:'- 1.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma.\n- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten verwerkt); beelden nagekeken door een tweede, onafhankelijke review (ribosoom volgt de tRNA\'s, losgelaten mRNA houdt zijn basen, labels vrij van elkaar, 3′/5′ bij het anticodon). Dezelfde dag: n17 opnieuw ingesproken, de wiebelbase is de derde base van het codon (niet van het anticodon).'}
AANDACHT={1:'- Stem-invoer van film 1 is gereconstrueerd volgens de uitspraaklijst; de letterlijke invoer van 8 oktober is niet bewaard.',2:'- Uitspraak van helicase, primase, ligase en Okazaki (takes n7, n17) is nog niet door Kamiel beoordeeld.',
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
         f"| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_multilingual_v2); één take per alinea of vraag |",
         f"| Duur | gesproken {fmt(spoken)}; speeltijd (zonder wachten bij vragen) vwo {fmt(TV)}, havo {fmt(TH)} |",
         "| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |",
         "| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |",
         "| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1/2/3, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |\n"]
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
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl{n}_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_multilingual_v2, één take. Vervang `data/afl{n}_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl{n}_words.json`, en pas de tekst aan in `data/afl{n}_script.json`. Andere segmenten blijven ongemoeid.
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
    Sx=[f"# {F['film']['title']} — script\n",f"Stem: Roos, eleven_multilingual_v2 · stem-invoer: {stem['bron']}. Tijden: begin in de speler (vwo / havo). Audio: `FILMDATA.segments[<id>].audio`.\n"]
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

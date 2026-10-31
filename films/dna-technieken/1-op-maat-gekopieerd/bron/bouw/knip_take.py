"""knip_take.py <omg_tl.json> <narration.mp3> <filmdir>
Op maat gekopieerd 2.0 (31 okt 2026): de ene doorlopende take (narration.mp3, 1.0) wordt op de regelgrenzen van
OMG_TL in alinea's (segmenten) geknipt. Tekst en take blijven gelijk: elke regel komt precies één keer in één
segment, in dezelfde volgorde; er gaat niets af en er komt niets bij. Schrijft segments.json en raw/sNN.mp3
(knip in de stilte tussen twee regels: tot 0,30 s vóór het eerste woord en tot 0,60 s na het laatste).
"""
import json, os, subprocess, sys

tl = json.load(open(sys.argv[1], encoding='utf-8')); src = sys.argv[2]; fdir = sys.argv[3]
os.makedirs(os.path.join(fdir, 'raw'), exist_ok=True)
CH = {'H0': 'Cold open', 'H1': 'Hoofdstuk 1 — Wat zit er in het buisje?', 'H2': 'Hoofdstuk 2 — Eén cyclus',
      'H3': 'Hoofdstuk 3 — Van te lang naar precies goed', 'H4': 'Hoofdstuk 4 — Tellen',
      'H5': 'Hoofdstuk 5 — Gevoelig voor besmetting', 'H6': 'Hoofdstuk 6 — Terug naar de gel'}
# segmenten: (hoofdstuk, eerste regel, laatste regel, niveau); vragen na de regel 'after_line' uit OMG_TL
PLAN = [('H0', 1, 2), ('H0', 3, 5), 'TITLE',
        ('H1', 1, 3), ('H1', 4, 7), ('H1', 8, 11), ('H1', 12, 16), 'Q', ('H1', 17, 17, 'basis', 's09'), ('H1', 18, 20, 'basis', 's09b'),
        ('H2', 1, 3), ('H2', 4, 6), 'Q', ('H2', 7, 9), ('H2', 10, 12), ('H2', 13, 16), ('H2', 17, 20),
        ('H3', 1, 3, 'vwo'), ('H3', 4, 6, 'vwo'), ('H3', 7, 9, 'vwo'), ('H3', 10, 13, 'vwo'), 'Q', ('H3', 14, 16, 'vwo'),
        ('H3', 17, 19, 'vwo'), ('H3', 20, 22, 'vwo'), ('H3', 23, 24),
        ('H4', 1, 4), 'Q', ('H4', 5, 8), ('H4', 9, 12), ('H4', 13, 14), ('H4', 15, 17),
        ('H5', 1, 3), 'Q', ('H5', 4, 8), ('H5', 9, 11),
        ('H6', 1, 3), ('H6', 4, 6), ('H6', 7, 7), 'Q', ('H6', 8, 9), ('H6', 10, 11), 'END']
OPT = {'H1': ['Het polymerase kopieert dan gewoon al het DNA.', 'Er wordt niets gekopieerd.', 'Het begint op willekeurige plekken: je ziet een vage veeg.'],
       'H2': ['Het valt in kleine stukjes.', 'Vrijwel niets: de strengen blijven heel.', 'Het is daarna onbruikbaar, net als een enzym na verhitten.'],
       'H3': ['Waar de STR ophoudt: het weet waar het stuk eindigt.', 'Aan het eind van de template-streng.', 'Het telt honderdtweeënzeventig nucleotiden en stopt dan.'],
       'H4': ['Zestig.', 'Nul: ze worden later op maat geknipt.', 'Ruim een miljard.'],
       'H5': ['Goed teken: de PCR werkt.', 'Er is DNA in de PCR gekomen dat daar niet hoort.', 'Primers en polymerase maken ook zonder template DNA.'],
       'H6': ['Even ver: het zijn dezelfde primers.', 'Verder.', 'Minder ver.']}
L = {(l['ch'], l['i']): l for l in tl['lines']}
order = [(l['ch'], l['i']) for l in tl['lines']]
segs = []; n = 0; prev = None; used = []
def nid(p):
    global n; n += 1; return f'{p}{n:02d}'
for p in PLAN:
    if p == 'TITLE': segs.append({'id': nid('s'), 'kind': 'title', 'chapter': 'Titel', 'level': 'basis'}); continue
    if p == 'END': segs.append({'id': nid('s'), 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': [
        'Primers bepalen welk stuk DNA wordt gekopieerd.', 'Een kopie van een kopie is precies op maat: van primer tot primer.',
        'Op maat verdubbelt elke cyclus; lange producten: maar 2 erbij per cyclus.', 'Zet altijd een negatieve controle mee.']}); continue
    if p == 'Q':
        ch = prev['ch']; q = [x for x in tl['questions'] if x['ch'] == ch][0]
        segs.append({'id': nid('q'), 'kind': 'question', 'chapter': CH[ch], 'level': prev['level'], 'options': OPT[ch], 'answer': q['answer']}); continue
    ch, a, b = p[:3]; lev = p[3] if len(p) > 3 else 'basis'; vast = p[4] if len(p) > 4 else None
    lines = [L[(ch, i)] for i in range(a, b + 1)]; used += [(ch, i) for i in range(a, b + 1)]
    txt = [l['text'] for l in lines]
    # H1 r17 is een eigen segment (s09): 'Antwoord B: er wordt niets gekopieerd.' valt bij Vragen uit dan helemaal weg
    # (in s09b staat 'begint', waardoor de speler daar de antwoordregel niet meer zoekt).
    # H6 r7: twee zinnen, de tweede is de vraag; zonder zinsgrens (onzichtbaar teken) knipt Vragen uit de hele vraag weg
    disp = ' '.join(t.replace('in plaats van zestien. Waar', 'in plaats van zestien.​ Waar') for t in txt)
    if vast == 's09b': sid = vast
    else: sid = nid('s') if not vast else (nid('s') and vast)
    s = {'id': sid, 'kind': 'speech', 'chapter': CH[ch], 'level': lev, 'lines': txt, 'display': disp,
         'bron': {'van': ch + ' r%d' % a, 'tot': ch + ' r%d' % b, 't0': lines[0]['t0'], 't1': lines[-1]['t1']}}
    if lev == 'vwo': s['verdieping'] = True
    segs.append(s); prev = {'ch': ch, 'level': lev}
assert used == order, 'elke regel precies één keer, in volgorde'
# knippen
sp = [s for s in segs if s['kind'] == 'speech']
for k, s in enumerate(sp):
    t0, t1 = s['bron']['t0'], s['bron']['t1']
    pt1 = sp[k - 1]['bron']['t1'] if k else 0.0; nt0 = sp[k + 1]['bron']['t0'] if k + 1 < len(sp) else tl['duration']
    a = max(t0 - 0.30, (pt1 + t0) / 2, 0.0); b = min(t1 + 0.60, (t1 + nt0) / 2, tl['duration'])
    s['bron']['knip'] = [round(a, 3), round(b, 3)]
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', src, '-ac', '1', '-ar', '44100',
                    '-c:a', 'libmp3lame', '-b:a', '96k', os.path.join(fdir, 'raw', s['id'] + '.mp3')], check=True)
json.dump(segs, open(os.path.join(fdir, 'segments.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(segs), 'segmenten,', len(sp), 'gesproken')

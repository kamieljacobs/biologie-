#!/usr/bin/env python3
"""Keuringsblad lichte remakes Erfelijkheid 2–6 (28 okt 2026). Leest per film bron/remake-2026-10/twijfel.md
(T-secties met Voorstel/Twijfel/Alternatief, en 'Scriptwijzigingen') en de keyframes, en vult ../remake-2026-10/sjabloon_remake.html.
Besluiten in db-collectie `besluit` (doc-id = <sleutel>__<id>): doen = voorstel, niet = alternatief, anders = opmerking.
Gebruik: python3 films/verbeterbladen/erfelijkheid-2026-10/bouw_blad.py"""
import base64, json, os, re
HIER = os.path.dirname(os.path.abspath(__file__))
R = os.path.dirname(os.path.dirname(os.path.dirname(HIER)))
FILMS = [
 ('erf2', '2-monohybride-kruisingen', 'Monohybride kruisingen', 'Erfelijkheid 2', dict(aanpak='lichte remake',
   waarom='Vóór de F2 legt de film nu uit wat P, F1 en F2 zijn: zelfbestuiving van de erwtenbloem, de handkruising, en dat de F1 onderling wordt gekruist (bij dieren broer × zus). Het kruisingsschema staat zoals in film 1 (vader/stuifmeel boven). Fouten eruit: "vier gameten na de meiose" bij een erwt en "één op één bij een terugkruising".',
   werk='± 6:50–7:00 (oud 4:31), één niveau', credits='± 4.200 (30 takes)')),
 ('erf3', '3-voorbij-dominant-en-recessief', 'Voorbij dominant en recessief', 'Erfelijkheid 3', dict(aanpak='lichte remake',
   waarom='Codominant krijgt een eigen alinea en beeld (AB-cel naast de roze leeuwenbek: niet ertussenin, maar allebei). Bloedgroep O heeft geen A- of B-antigeen, en de tekst zegt precies dat. Drie vakfouten eruit op A-bronnen (letale factor, embryo, "half zoveel pigment").',
   werk='± 8:00 (oud 4:43); zonder hoofdstuk polygeen ± 6:30', credits='± 4.900 (24 takes)')),
 ('erf4', '4-dihybride-kruising-en-gekoppelde-overerving', 'Dihybride kruising en gekoppelde overerving', 'Erfelijkheid 4', dict(aanpak='lichte remake',
   waarom='Gekoppelde overerving nu met kruisingsschema\'s (terugkruising 1 : 1 naast 1 : 1 : 1 : 1, F2 3 : 1 naast 9 : 3 : 3 : 1, en de valkuil dat je dan niet per gen mag vermenigvuldigen). Recombinatiepercentage, genkaart en "afstand tussen genen" zijn weg; crossing-over alleen kwalitatief. Havo-basis volgens de syllabus, de rest vwo-blokken.',
   werk='havo ± 4:35 / vwo ± 8:50 (oud 4:22)', credits='± 5.600 (32 takes)')),
 ('erf5', '5-overerving-via-x-chromosomen-en-mitochondrien', 'Overerving via X-chromosomen en mitochondriën', 'Erfelijkheid 5', dict(aanpak='lichte remake',
   waarom='Nieuwe opening met het gezin uit film 1 en twee nieuwe vragen ("van wie krijgt een jongen zijn X?"). Het examenverschil tussen kans voor een zoon (½) en voor een kind (¼) zie je in de simulatie. Mitochondriaal DNA wordt een vwo-blok (alleen vwo-syllabus). Vier vakfouten eruit op A-bronnen.',
   werk='havo ± 6:45 / vwo ± 8:00 (oud 4:00)', credits='± 5.000 (30 takes)')),
 ('erf6', '6-stambomen-en-kansrekenen', 'Stambomen en kansrekenen', 'Erfelijkheid 6', dict(aanpak='lichte remake',
   waarom='Je vraag over "overslaan" zit nu in de film: een vraag met die misvatting als optie, en een alinea die uitlegt dat een dominant allel uit een tak verdwijnt en niet terugkomt. Alle stambomen met één tekenfunctie met vaste uitlijning. Geen namen meer in de stem. Opening verklapte ⅔ al: weg.',
   werk='± 7:40 (oud 4:05), één niveau', credits='± 4.500 (23 takes)')),
]
def img(map_, naam):
    p = os.path.join(R, 'films/erfelijkheid', map_, 'bron/remake-2026-10/keyframes', naam)
    return 'data:image/webp;base64,' + base64.b64encode(open(p, 'rb').read()).decode() if os.path.exists(p) else None
def schoon(t): return re.sub(r'\*\*|`', '', t).strip()
def lees(map_):
    s = open(os.path.join(R, 'films/erfelijkheid', map_, 'bron/remake-2026-10/twijfel.md'), encoding='utf-8').read()
    vs = []
    for blok in re.split(r'\n## ', s)[1:]:
        kop, _, rest = blok.partition('\n')
        m = re.match(r'T(\d+)\s*·\s*(.*)', kop)
        if m:
            kf = re.search(r'([\w-]+\.webp)', kop)
            veld = lambda n: schoon((re.search(r'- \*\*' + n + r':\*\*\s*(.*)', rest) or [None, ''])[1])
            titel = re.sub(r'\s*\(.*$', '', m.group(2)).strip()
            vs.append(dict(id='t' + m.group(1), kf=kf.group(1) if kf else None, soort=titel, omvang='klein', bron='twijfel',
                           probleem=veld('Twijfel') or veld('Waarom'), voorstel=veld('Voorstel'), alternatief=veld('Alternatief')))
        elif kop.startswith('Scriptwijzigingen'):
            items = [schoon(re.sub(r'^\d+\.\s*', '', l)) for l in rest.split('\n') if re.match(r'\d+\.', l.strip())]
            vs.append(dict(id='script', kf=None, soort='script', omvang='klein', bron='twijfel',
                           probleem='De belangrijkste inhoudelijke scriptwijzigingen. Alles staat in script_v2.md.',
                           voorstel=' · '.join(items), alternatief='Laat weten welke wijziging je niet wilt (Anders + opmerking).'))
    return vs
out = []
for sl, map_, titel, kort, advies in FILMS:
    vs = []
    for x in lees(map_):
        kf = x.pop('kf'); x['img'] = img(map_, kf) if kf else None; vs.append(x)
    kd = os.path.join(R, 'films/erfelijkheid', map_, 'bron/remake-2026-10/keyframes')
    kern = [dict(img=img(map_, n), titel=re.sub(r'^k\d+-', '', n[:-5]).replace('-', ' ')) for n in sorted(os.listdir(kd)) if n.startswith('k')]
    out.append(dict(film=f'films/erfelijkheid/{map_}.html', titel=titel, kort=kort, sleutel=sl, promptversie_nu='onbekend (12 okt) → v13',
                    advies=advies, herinspreken=[], voorstellen=vs, kern=kern))
s = open(os.path.join(HIER, '..', 'remake-2026-10', 'sjabloon_remake.html'), encoding='utf-8').read()
s = s.replace('<title>Keuring lichte remakes</title>', '<title>Keuring Erfelijkheid 2–6</title>').replace('__DATA__', json.dumps(out, ensure_ascii=False))
open(os.path.join(HIER, 'keuringsblad.html'), 'w', encoding='utf-8').write(s)
print('keuringsblad.html', len(s) // 1024, 'kB', [(f['sleutel'], len(f['voorstellen']), len(f['kern'])) for f in out])

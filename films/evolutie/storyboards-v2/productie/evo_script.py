"""f<N>.json (storyboard Evolutie v2) -> ~/hw/e<N>/script_v2.md, uitspraak_film.json, map.json
Gebruik: python3 evo_script.py 1 2 ... 8
- één scène met tekst = één gesproken alinea (segment), zodat keyframe en segment 1:1 lopen
- vraagscène e<N>qNN = alinea + [VRAAG]-regel
- lege scène na de opening = ## Titel, laatste lege scène = ## Eindkaart (zinnen uit sb<N>.js)
"""
import json, re, sys, os
EVO = os.path.expanduser('~/evo2'); HW = os.path.expanduser('~/hw')

def regels_uitspraak(f):
    out = []
    for u in f['uitspraak']:
        w = u['woord'].strip(); inv = re.sub(r'\s*\(.*$', '', u['invoer']).strip()
        if not inv or '/' in w or ',' in w or inv == w: continue
        if ' ' in w:   # meerwoordsregels gaan per woord niet; noteer
            continue
        if re.search(r'\d', w) or w.lower() == 'jaartallen': continue
        out.append(['^' + re.escape(w), inv])
        if w[0].islower():
            out.append(['^' + re.escape(w[0].upper() + w[1:]), inv[0].upper() + inv[1:]])
    out += [['^Dr\\.$', 'Dokter'], ['^DNA-', 'deeënaa-']]
    return out

def eindzinnen(n, sid):
    src = open(f'{EVO}/src/sb{n}.js', encoding='utf-8').read()
    m = re.search(sid + r'\(ctx[^)]*\)\s*\{\s*eindKaart8?\(ctx,\s*(?:\d+,\s*)?\[(.*?)\]', src, re.S)
    if not m:
        m = re.search(sid + r'\(ctx[^)]*\)\s*\{.*?(?:const [zZ]\s*=\s*)\[(.*?)\]', src, re.S)
    if not m: return []
    return re.findall(r"'((?:[^'\\]|\\.)*)'", m.group(1))

def maak(n):
    f = json.load(open(f'{EVO}/films/f{n}.json', encoding='utf-8'))
    d = f'{HW}/e{n}'; os.makedirs(d, exist_ok=True)
    hst = f['hoofdstukken']
    def kop(h):
        if h.startswith('Opening'): return 'Cold open'
        if h.startswith('Samen'): return 'Recap'
        m = re.match(r'H?(\d+)\s', h)
        if m: nr = int(m.group(1))
        else: nr = [x['nr'] for x in hst if x.get('laag') == 'vwo'][0]
        t = [x for x in hst if x['nr'] == nr][0]
        return f"Hoofdstuk {nr} — {t['titel']}"
    L = [f"# {f['titel']} — script v2 (Evolutie v2, film {n}/8)", '',
         f"Gemaakt uit storyboards-v2/films/f{n}.json (goedgekeurd door Kamiel, 23 okt 2026). Havo + vwo; vwo-blokken gelabeld [VWO-START] … [VWO-END]. Voice Roos (eleven_v4). Puzzel: {f['puzzel']}",
         '', '---', '']
    scenes = f['scenes']; cur = None; vwo = False; mp = {}; leeg = [s for s in scenes if not s['tekst'].strip()]
    titel_id = leeg[0]['id']; eind_id = leeg[-1]['id'] if len(leeg) > 1 else None
    eind_na = None if eind_id else scenes[-1]['id']
    for i, s in enumerate(scenes):
        if s['id'] == titel_id:
            L += ['## Titel', f['titel'], '']; cur = 'Titel'; mp[s['id']] = 'title'; continue
        if s['id'] == eind_id:
            if vwo: L[-1] += ' [VWO-END]'; vwo = False
            L += ['## Eindkaart'] + eindzinnen(n, s['id']) + ['']; mp[s['id']] = 'card'; continue
        k = kop(s['hoofdstuk'])
        if k != cur:
            if vwo: L[-2] += ' [VWO-END]'; vwo = False
            L += [f"## {k} [{s['look']}]"]; cur = k
        t = s['tekst'].strip()
        if s['laag'] == 'vwo' and not vwo: t = '[VWO-START] ' + t; vwo = True
        L.append(t)
        if s['id'][2] == 'q':
            opts = [re.sub(r'^[A-D]\s+', '', o.strip()) for o in s['opties'].split('·')]
            L.append('[VRAAG] ' + ' · '.join(f'({"abcd"[j]}) {o}' for j, o in enumerate(opts)))
        nxt = scenes[i + 1] if i + 1 < len(scenes) else None
        if vwo and (nxt is None or nxt['laag'] != 'vwo' or nxt['id'] == eind_id):
            if s['id'][2] == 'q': L[-1] += ' [VWO-END]'
            else: L[-1] += ' [VWO-END]'
            vwo = False
        L.append('')
        if s['id'] == eind_na:
            L += ['## Eindkaart'] + eindzinnen(n, s['id']) + ['']
    open(f'{d}/script_v2.md', 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    json.dump(regels_uitspraak(f), open(f'{d}/uitspraak_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    return f, d

if __name__ == '__main__':
    for a in sys.argv[1:]:
        f, d = maak(int(a))
        os.system(f'cd {HW} && python3 engine/make_segments.py e{a} script_v2.md > e{a}/segments.log')
        seg = json.load(open(f'{d}/segments.json', encoding='utf-8'))
        # koppel scène-id -> segment-id (in volgorde)
        sc = [s for s in f['scenes']]; mp = {}; it = iter(seg); cur = next(it)
        for s in sc:
            if not s['tekst'].strip():
                while cur['kind'] not in ('title', 'card'): cur = next(it)
                mp[s['id']] = cur['id']; cur = next(it, None); continue
            while cur['kind'] != 'speech': cur = next(it)
            assert cur['display'] == s['tekst'].strip(), (s['id'], cur['display'][:60], s['tekst'][:60])
            mp[s['id']] = cur['id']; cur = next(it, None)
            if s['id'][2] == 'q':
                assert cur['kind'] == 'question'; mp[s['id'] + '_kaart'] = cur['id']; cur = next(it, None)
        json.dump(mp, open(f'{d}/map.json', 'w'), indent=0)
        print(a, len(seg), 'segmenten', open(f'{d}/segments.log').read().split('\n')[0])

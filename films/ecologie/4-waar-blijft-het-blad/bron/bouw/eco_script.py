"""f<N>.json (storyboard Ecologie v2) -> /root/hwe/e<N>/script_v2.md, uitspraak_film.json, segments.json, map.json
Gebruik: python3 eco_script.py 1 2 ... 8
- één scène met tekst = één gesproken alinea (segment), zodat keyframe en segment 1:1 lopen
- vraagscène e<N>qNN = alinea + [VRAAG]-regel
- lege scène na de opening = ## Titel; laatste lege scène = ## Eindkaart (zinnen uit sb<N>.js);
  heeft de film geen lege eindscène (7, 8), dan komt ## Eindkaart na de laatste scène (zinnen uit het keyframe van die scène)
- stem-invoer: film-eigen regels (uitspraak_film.json, uit f['uitspraak']) vóór de reekslijst engine/uitspraak_subs.json
  (= films/uitspraak.json); daarna 'het jaar' vóór een kaal jaartal (Kamiels regel: jaartallen als cijfers na 'het jaar')
Aangepast van evo_script.py (Evolutie v2)."""
import json, re, sys, os
ECO = '/root/eco2'; HW = '/root/hwe'

def regels_uitspraak(f):
    out = []
    for u in f['uitspraak']:
        w = u['woord'].strip(); inv = re.sub(r'\s*\(.*$', '', u['invoer']).strip()
        if not inv or '/' in w or ',' in w or inv == w: continue
        if ' ' in w: continue                      # meerwoordsregels gaan per woord niet (jaartallen e.d.)
        if re.search(r'\d', w) or w.lower().startswith('jaartal'): continue
        if inv.lower().startswith(('zoals', 'voluit', 'in het jaar', 'het jaar')): continue
        out.append(['^' + re.escape(w), inv])
        if w[0].islower():
            out.append(['^' + re.escape(w[0].upper() + w[1:]), inv[0].upper() + inv[1:]])
    # vaste regels uit de evo-versie; 'DNA-' -> 'deeënaa-' is vervallen (UITSPRAAK.md 24 okt 2026: DNA gewone spelling bij eleven_v4)
    out += [['^Dr\\.$', 'Dokter']]
    return out

def eindzinnen(n, sid):
    src = open(f'{ECO}/src/sb{n}.js', encoding='utf-8').read()
    m = re.search(r'\n  ' + sid + r'\(ctx[^)]*\)\s*\{(.*?)(?=\n  e\d+[sq]\d+\(ctx|\n\};)', src, re.S)
    if not m: return []
    body = m.group(1)
    a = re.search(r"(?:'(?:EINDKAART|SAMENVATTING)'\);\s*|const [A-Za-z]\w*\s*=\s*)\[(.*?)\]", body, re.S)
    if not a: return []
    return [x.replace("\\'", "'") for x in re.findall(r"'((?:[^'\\]|\\.)*)'", a.group(1))]

def kop_maker(hst):
    def kop(h):
        if h.startswith('Opening'): return 'Cold open'
        if h.startswith('Samen'): return 'Recap'
        nr = int(re.match(r'H?(\d+)\s', h).group(1))
        t = [x for x in hst if x['nr'] == nr][0]
        return f"Hoofdstuk {nr} — {t['titel']}"
    return kop

def maak(n):
    f = json.load(open(f'{ECO}/films/f{n}.json', encoding='utf-8'))
    d = f'{HW}/e{n}'; os.makedirs(d, exist_ok=True)
    kop = kop_maker(f['hoofdstukken'])
    L = [f"# {f['titel']} — script v2 (Ecologie v2, film {n}/8)", '',
         f"Gemaakt uit /root/eco2/films/f{n}.json (storyboard Ecologie v2, goedgekeurd door Kamiel, 29 okt 2026). Havo + vwo; vwo-blokken gelabeld [VWO-START] … [VWO-END]. Voice Roos (eleven_v4). Puzzel: {f['puzzel']}",
         '', '---', '']
    scenes = f['scenes']; cur = None; vwo = False; leeg = [s for s in scenes if not s['tekst'].strip()]
    titel_id = leeg[0]['id']; eind_id = leeg[-1]['id'] if len(leeg) > 1 else None
    eind_na = None if eind_id else scenes[-1]['id']
    for i, s in enumerate(scenes):
        if s['id'] == titel_id:
            L += ['## Titel', f['titel'], '']; cur = 'Titel'; continue
        if s['id'] == eind_id:
            if vwo: L[-1] += ' [VWO-END]'; vwo = False
            L += ['## Eindkaart'] + eindzinnen(n, s['id']) + ['']; continue
        k = kop(s['hoofdstuk'])
        if k != cur:
            if vwo: L[-2] += ' [VWO-END]'; vwo = False
            L += [f"## {k} [{s['look']}]"]; cur = k
        t = ' '.join(s['tekst'].split())
        if s['laag'] == 'vwo' and not vwo: t = '[VWO-START] ' + t; vwo = True
        L.append(t)
        if re.match(r'e\d+q', s['id']):
            opts = [re.sub(r'^[A-D]\s+', '', o.strip()) for o in s['opties'].split('·')]
            L.append('[VRAAG] ' + ' · '.join(f'({"abcd"[j]}) {o}' for j, o in enumerate(opts)))
        nxt = scenes[i + 1] if i + 1 < len(scenes) else None
        if vwo and (nxt is None or nxt['laag'] != 'vwo' or nxt['id'] == eind_id):
            L[-1] += ' [VWO-END]'; vwo = False
        L.append('')
        if s['id'] == eind_na:
            z = eindzinnen(n, s['id']); assert z, ('geen eindzinnen', s['id'])
            L += ['## Eindkaart'] + z + ['']
    open(f'{d}/script_v2.md', 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    json.dump(regels_uitspraak(f), open(f'{d}/uitspraak_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    return f, d

JAAR = re.compile(r'^(1[5-9]\d\d|20\d\d)([.,:;?!]?)$')
def jaartallen(seg):
    """'tussen het jaar 1995 en 2012' -> stem: '… en het jaar 2012' (vmap blijft per stem-token naar het display-woord wijzen)."""
    vt = seg['voice'].split(); vm = seg['vmap']; nt, nm = [], []
    for i, (tok, k) in enumerate(zip(vt, vm)):
        if JAAR.match(tok) and not (i >= 1 and vt[i - 1].lower() == 'jaar'):
            nt += ['het', 'jaar']; nm += [k, k]
        nt.append(tok); nm.append(k)
    seg['voice'] = ' '.join(nt); seg['vmap'] = nm

if __name__ == '__main__':
    for a in sys.argv[1:]:
        f, d = maak(int(a))
        os.system(f'cd {HW} && python3 engine/make_segments.py e{a} script_v2.md > e{a}/segments.log')
        seg = json.load(open(f'{d}/segments.json', encoding='utf-8'))
        for s in seg:
            if s['kind'] == 'speech': jaartallen(s)
        json.dump(seg, open(f'{d}/segments.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        # koppel scène-id -> segment-id (in volgorde)
        mp = {}; it = iter(seg); cur = next(it)
        for s in f['scenes']:
            if not s['tekst'].strip():
                while cur['kind'] not in ('title', 'card'): cur = next(it)
                mp[s['id']] = cur['id']; cur = next(it, None); continue
            while cur['kind'] != 'speech': cur = next(it)
            assert cur['display'] == ' '.join(s['tekst'].split()), (s['id'], cur['display'][:60], s['tekst'][:60])
            mp[s['id']] = cur['id']; cur = next(it, None)
            if re.match(r'e\d+q', s['id']):
                assert cur['kind'] == 'question'; mp[s['id'] + '_kaart'] = cur['id']; cur = next(it, None)
        json.dump(mp, open(f'{d}/map.json', 'w'), indent=0)
        print(a, len(seg), 'segmenten;', open(f'{d}/segments.log').read().split('\n')[0])

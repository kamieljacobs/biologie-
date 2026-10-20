# bouw.py <filmmap>: bouwt film/index.html uit segmenten.json, stem/woordtijden, src/scenesN.js, begrippen.json, docentdeel.md, src/config.json
import json, os, re, sys, difflib, html
D = sys.argv[1]; B = '/tmp/claude-0/-home-claude/7f92348f-4257-517d-937d-a0966b569284/scratchpad/ob32c/_base/'; E = '/tmp/claude-0/-home-claude/7f92348f-4257-517d-937d-a0966b569284/scratchpad/ob32c/_engine/'
cfg = json.load(open(f'{D}/src/config.json', encoding='utf-8'))
segs = json.load(open(f'{D}/segmenten.json', encoding='utf-8'))
n = lambda s: re.sub(r'[^0-9a-zà-ÿ]', '', s.lower())
def disp_tokens(s):
    m = []
    for tok in s.split():
        if m and m[-1] in ("'s", "’s"): m[-1] += ' ' + tok
        else: m.append(tok)
    return m
out = []; chapters = []
for s in segs:
    ch = s['chapter']
    if ch not in chapters: chapters.append(ch)
    o = {'id': s['id'], 'kind': s['kind'], 'level': s['level'], 'chapter': ch}
    if s['kind'] == 'speech':
        ws = json.load(open(f"{D}/stem/woordtijden/{s['id']}.json"))['words']
        dt = disp_tokens(s['display'])
        if len(ws) == len(dt):
            pairs = list(zip(dt, ws))
        else:  # uitlijnen op stem-invoer, gaten interpoleren
            vt = s['voice'].split(); assert len(vt) == len(s['display'].split()), s['id']
            sm = difflib.SequenceMatcher(None, [n(x) for x in vt], [n(w['text']) for w in ws], autojunk=False)
            mp = {}
            for op, i1, i2, j1, j2 in sm.get_opcodes():
                if op == 'equal':
                    for k in range(i2 - i1): mp[i1 + k] = ws[j1 + k]
                elif j2 > j1:
                    a, b = ws[j1]['start'], ws[j2 - 1]['end']
                    for k in range(i2 - i1): mp[i1 + k] = {'start': a + (b - a) * k / (i2 - i1), 'end': a + (b - a) * (k + 1) / (i2 - i1)}
            last = 0
            for i in range(len(vt)):
                if i not in mp: mp[i] = {'start': last, 'end': last + 0.2}
                last = mp[i]['end']
            pairs = [(dt[i] if len(dt) == len(vt) else s['display'].split()[i], mp[i]) for i in range(len(vt))]
            print('  uitgelijnd', s['id'], len(ws), '->', len(vt))
        o['words'] = [{'t': d, 's': round(x['start'], 3), 'e': round(x['end'], 3)} for d, x in pairs]
        o['audio'] = f"audio/{s['id']}.mp3"
        o['dur'] = max(round(pairs[-1][1]['end'] + 0.45, 2), cfg.get('hold', {}).get(s['id'], 0))
    else:
        o['q'] = s['q']; o['options'] = s['options']; o['correct'] = s['correct']; o['explain'] = s['explain']
    out.append(o)
fd = {'segments': out, 'chapters': chapters}
json.dump(fd, open(f'{D}/filmdata.json', 'w', encoding='utf-8'), ensure_ascii=False)
tot = sum(o.get('dur', 0) for o in out); bas = sum(o.get('dur', 0) for o in out if o['level'] == 'basis')
print(f'narratie {tot:.0f} s (basis {bas:.0f} s)')

# ---- docentdeel.md -> html ----
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s); s = re.sub(r'\*(.+?)\*', r'<i>\1</i>', s)
    return s
def md2html(md):
    lines = md.split('\n'); o = []; i = 0
    while i < len(lines):
        l = lines[i]
        if l.startswith('# ') or not l.strip(): i += 1; continue
        if l.startswith('## '): o.append(f'    <h3>{inline(l[3:])}</h3>'); i += 1; continue
        if l.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'): rows.append(lines[i]); i += 1
            cells = [[c.strip() for c in r.strip('|').split('|')] for r in rows if not re.match(r'^\|[\s\-|]+\|$', r)]
            t = '    <table><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in cells[0]) + '</tr>\n'
            t += ''.join('      <tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>\n' for r in cells[1:])
            o.append(t + '    </table>'); continue
        if re.match(r'^(\d+\.|-) ', l):
            tag = 'ol' if l[0].isdigit() else 'ul'; items = []
            while i < len(lines) and re.match(r'^(\d+\.|-) ', lines[i]): items.append(re.sub(r'^(\d+\.|-) ', '', lines[i])); i += 1
            o.append(f'    <{tag}>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + f'</{tag}>'); continue
        o.append(f'    <p>{inline(l)}</p>'); i += 1
    return '\n'.join(o)
dd = open(f'{D}/docentdeel.md', encoding='utf-8').read()
dd = dd.split('\n## Checkvragen')[0]
docent = md2html(dd)
cv = []
for k, c in enumerate(cfg['checkvragen'], 1):
    cls = 'q vwo-only' if c.get('uitdaging') else 'q'; badge = ' <span class="vwo-badge">uitdaging</span>' if c.get('uitdaging') else ''
    cv.append(f'    <div class="{cls}"><b>{k}. {c["titel"]}</b>{badge} <span class="pts">{c["pts"]}</span><p>{c["vraag"]}</p>\n      <details><summary>Antwoord</summary><p>{c["antwoord"]}</p></details></div>')
head_all = open(B + 'head.html', encoding='utf-8').read()
head, body0 = head_all.split('<body>', 1)
head = head.replace('<title>Vertering · Biologie bij Kamiel</title>', f'<title>{cfg["titel"]} · Biologie bij Kamiel</title>')
nav = re.search(r'<nav class="sitenav nav">.*?</script>', body0, re.S).group(0)
foot = re.search(r'<footer>.*?</footer>', body0, re.S).group(0)
foot = re.sub(r'Versie 1\.0 · 13 oktober 2026\.', f'Versie {cfg["versie"]} · {cfg["datum"]}.', foot)
body = f'''<body>
<header>
  {nav}
  <div class="meta">Biologie bij Kamiel · Kerndoelen onderbouw · {cfg["meta"]} · kerndoel {cfg["kerndoel"]}</div>
  <h1>{cfg["titel"]}</h1>
  <p>{cfg["ondertitel"]}</p>
</header>
''' + body0[body0.index('<div id="playerwrap">'):body0.index('<section><h2>Checkvragen</h2>')]
body = body.replace('aria-label="Animatie Alles is cel"', f'aria-label="Animatie {cfg["titel"]}"')
body += '<section><h2>Checkvragen</h2>\n    <p class="meta">antwoorden ingeklapt</p>\n' + '\n'.join(cv) + '\n  </section>\n\n  <section><h2>Transcript</h2><div id="transcript"></div></section>\n\n  <section><h2>Voor de docent</h2>\n' + docent + '\n  </section>\n</main>\n' + foot + '\n'
gl = json.load(open(f'{D}/begrippen.json', encoding='utf-8'))
gls = 'const GLOSSARY=[\n' + ''.join(' {t:%s,d:%s%s},\n' % (json.dumps(g['t'], ensure_ascii=False), json.dumps(g['d'], ensure_ascii=False), ',vwo:true' if g.get('uitdaging') else '') for g in gl) + '];'
pb = open(E + 'player_block.html', encoding='utf-8').read()
pb = re.sub(r'const GLOSSARY=\[.*?\n\];', lambda m: gls, pb, count=1, flags=re.S)
pb = pb.replace("onderbouw · kerndoelen · film 3", f"onderbouw · kerndoelen · {cfg['meta']}")
pb = pb.replace("it.seg.id==='s03'", f"it.seg.id==='{cfg['titelseg']}'")
mini = json.dumps(cfg['mini'], ensure_ascii=False)
pb = re.sub(r"const mini=\{.*?\}\[num\|\|it\.chapter\];", lambda m: f"const mini={mini}[num||it.chapter];", pb, count=1)
assert 'film 3' not in pb and 'Mond en slokdarm' not in pb
scripts = open(B + 'lib.js', encoding='utf-8').read() + '\n' + open(B + 'helpers.js', encoding='utf-8').read() + '\n' + open('/home/claude/wt-32c/personages/lib_cast.js', encoding='utf-8').read() + '\nfunction circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }\n' + (open(f'{D}/src/lib_32c.js', encoding='utf-8').read()+'\n' if os.path.exists(f'{D}/src/lib_32c.js') else '') + open(f'{D}/src/{cfg["scenes"]}', encoding='utf-8').read()
page = head + body + '<script>window.FILMDATA=' + json.dumps(fd, ensure_ascii=False) + ';</script>\n<script>' + scripts + '\n</script>\n' + pb + open(B + 'tail.html', encoding='utf-8').read()
os.makedirs(f'{D}/film', exist_ok=True)
open(f'{D}/film/index.html', 'w', encoding='utf-8').write(page)
print('film/index.html', len(page), 'tekens')

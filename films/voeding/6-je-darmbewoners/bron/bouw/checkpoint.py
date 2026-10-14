"""Bouwt een checkpointpagina (B7). python3 checkpoint.py <filmdir> <config.json> <out.html>
config: {nr, titel, lead, stats:[[label,waarde]], ask:[html], askna: html, frames:[[still-basename, titel, uitleg]], reviews:[html], storyboard:{id:[look,beeld]}}"""
import sys, json, os, base64, subprocess, html, tempfile
fdir, cfgp, out = sys.argv[1:4]
cfg = json.load(open(cfgp)); S = json.load(open(os.path.join(fdir, 'segments.json'))); film = json.load(open(os.path.join(fdir, 'film.json')))
head = open(os.path.join(os.path.dirname(__file__), 'checkpoint_head.html')).read().replace('/*TITEL*/', 'Checkpoint voeding ' + str(cfg['nr']))
def img(p):
    t = tempfile.mktemp(suffix='.jpg'); subprocess.run(['convert', p, '-resize', '1280x', '-quality', '78', t], check=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(open(t, 'rb').read()).decode()
figs = ''.join(f'<figure><img src="{img(os.path.join(fdir, "style", f + ".png"))}" alt="{html.escape(a)}" loading="lazy"><figcaption><b>{html.escape(a)}</b> · {html.escape(c)}</figcaption></figure>' for f, a, c in cfg['frames'])
sc = ''; ch = None
for s in S:
    if s['chapter'] != ch: ch = s['chapter']; sc += f'<h4>{html.escape(ch)}</h4>'
    if s['kind'] == 'speech': sc += f'<p{" class=vwo" if s["level"] == "vwo" else ""}>{html.escape(s["display"])}</p>'
    elif s['kind'] == 'question':
        q = film['questions'][s['id']]; opts = ' · '.join(('<b>' + html.escape(o) + '</b>' if i == q['correct'] else html.escape(o)) for i, o in enumerate(s['options']))
        sc += f'<p class="vraag{" vwo" if s["level"] == "vwo" else ""}">Vraag: {html.escape(q["q"])}<br>{opts}</p>'
    elif s['kind'] == 'title': sc += f'<p class="look">Titelkaart: {html.escape(film["title"])} · {html.escape(film["sub"])}</p>'
    else: sc += '<p class="look">Eindkaart: ' + ' / '.join(html.escape(l) for l in s['lines']) + '</p>'
lv = {s['id']: s['level'] for s in S}
rows = ''.join(f'<tr{" class=v" if lv.get(k) == "vwo" else ""}><td class="mono">{k}</td><td class="look">{html.escape(v[0])}</td><td>{html.escape(v[1])}</td></tr>' for k, v in cfg['storyboard'].items())
stats = ''.join(f'<div class="stat"><span class="mono">{html.escape(a)}</span><b>{html.escape(b)}</b></div>' for a, b in cfg['stats'])
body = f'''<div class="wrap"><div class="eyebrow">Reeks Voeding · film {cfg["nr"]} van 6 · checkpoint (B7)</div><h1>{html.escape(film["title"])}</h1>
<p class="lead">{cfg["lead"]}</p><div class="stats">{stats}</div>
<h2>Wat ik van je nodig heb</h2><div class="ask"><ol>{"".join("<li>" + a + "</li>" for a in cfg["ask"])}</ol></div><p class="lead">{cfg.get("askna", "")}</p>
<h2>Stijlframes</h2><p class="lead">Gerenderd uit de speler zelf, met voorlopige timing.</p><div class="frames">{figs}</div>
<h2>Wat de reviews veranderden</h2><ul>{"".join("<li>" + r + "</li>" for r in cfg["reviews"])}</ul>
<h2>Storyboard</h2><div class="tbl"><table><tr><th>Alinea</th><th>Look</th><th>Beeld</th></tr>{rows}</table></div>
<h2>Script</h2><p class="lead">Elke alinea is één opname. Paars = vwo-blok. Bij de vragen staat het juiste antwoord vet.</p><div class="script">{sc}</div></div>'''
open(out, 'w').write(head + body); print(len(head + body))

import base64, html, io, json, re
from PIL import Image

D = '/tmp/claude-0/-home-claude-biologie-/c7337e44-20c6-5657-973f-f2720a67d729/scratchpad/van-cel-tot-lichaam'
E = html.escape


def img(name, w=1280):
    im = Image.open(f'{D}/{name}').convert('RGB')
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=84)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()


audio = 'data:audio/mpeg;base64,' + base64.b64encode(open(f'{D}/uitspraaktest.mp3', 'rb').read()).decode()

# ---------- script v2 -> html ----------
src = open(f'{D}/script_v2.md', encoding='utf-8').read().split('---', 1)[1]
GOED = {'Cold open': 'b', 'Hoofdstuk 1 — Van cel naar orgaan': 'b', 'Hoofdstuk 2 — Van orgaan naar lichaam': 'b', 'Hoofdstuk 3 — Ook een plant': 'b'}
out = []
for sec in re.split(r'\n## ', src):
    sec = sec.strip()
    if not sec: continue
    head, _, rest = sec.partition('\n')
    m = re.match(r'(.*?)\s*\[(.*)\]\s*$', head)
    title, look = (m.group(1), m.group(2)) if m else (head, '')
    out.append(f'<section class="ch"><h3>{E(title)}</h3>' + (f'<p class="look">{E(look)}</p>' if look else ''))
    hv = False; buf = []
    def flush():
        if buf:
            out.append(f'<div class="take{" hv" if hv else ""}">' + ''.join(f'<p>{E(l)}</p>' for l in buf) + '</div>'); buf.clear()
    for l in rest.split('\n'):
        l = l.strip()
        if not l: flush(); continue
        if l.startswith('[VWO-START]'):
            flush(); hv = True; l = l.replace('[VWO-START]', '').strip()
        end = l.endswith('[VWO-END]'); l = l.replace('[VWO-END]', '').strip()
        if l.startswith('[VRAAG]'):
            flush()
            opts = [o.strip() for o in l.replace('[VRAAG]', '').split('·')]
            g = GOED.get(title, '')
            lis = ''.join(f'<li class="{"ok" if o.startswith("(" + g + ")") else ""}">{E(o)}</li>' for o in opts)
            out.append(f'<div class="q"><span class="tag">voorspelvraag</span><ul>{lis}</ul></div>')
        elif l:
            buf.append(l)
        if end: flush(); hv = False
    flush(); out.append('</section>')
script_html = '\n'.join(out)

# ---------- storyboard ----------
SB = [
 ('s01', 'Cold open', 'Macro-dag', 'Gymzaal: een leerling sprint; hart (koraal) klopt sneller, longen (teal) pulseren.', 'sprint · hart · ademt'),
 ('q02', 'Cold open', 'Schema', 'Vraagkaart.', '—'),
 ('s03', 'Titel', 'Schema', 'Titelkaart "Van cel tot lichaam" met de trap die opkomt.', '—'),
 ('s04', 'H1', 'Micro', 'Eén spiercel (lang, koraal); dan duizenden naast elkaar die samen korter worden; label "spierweefsel".', 'spiercel · korter · weefsel'),
 ('s05', 'H1', 'Micro', 'Vier weefsels als vier vlakjes: zenuw, bot, bind, dek; pil "die namen hoef je niet te onthouden".', 'zenuwweefsel · botweefsel · bindweefsel · dekweefsel'),
 ('s06', 'H1', 'Micro → Macro', 'Uitzoomen via zoomcirkel naar de kuitspier in het been; lagen lichten op: spier, zenuw, bloedvat, bindweefsel; rij hart/long/maag/huid/bot.', 'kuitspier · zenuwweefsel · bloedvaten · orgaan'),
 ('q07', 'H1', 'Schema', 'Vraagkaart (bot).', '—'),
 ('s08', 'H2', 'Schema', 'Bot in doorsnede met botcellen; dan het lichaam (stijlframe 2) waarin de stelsels één voor één oplichten.', 'botcellen · orgaanstelsel · spijsverteringsstelsel · ademhalingsstelsel · bloedvatenstelsel'),
 ('q09', 'H2', 'Schema', 'Vraagkaart (bloed).', '—'),
 ('s10', 'H2', 'Schema', 'Bloedvat met cellen in vocht; de overige stelsels lichten op tot alle tien labels staan.', 'vervoeren · zenuwstelsel · skelet · uitscheidingsstelsel · tien'),
 ('s11', 'H2', 'Schema → Macro-dag', 'Organisme: de hele figuur; terug naar de gymzaal: pijlen longen → bloed → spier, darm → bloed → spier.', 'organisme · longen · bloed · samen'),
 ('q12', 'H3', 'Schema', 'Vraagkaart (plant).', '—'),
 ('s13', 'H3', 'Macro-dag → Micro', 'Slaplant in de tuin met wortels; organen lichten op; zoomcirkel op een blad: opperhuid, bladmoes, vaatbundel.', 'wortels · stengel · bladeren · bloem · opperhuid · bladmoes · vaatbundels'),
 ('s14', 'H3 havo/vwo', 'Micro', 'Paarse balk. Vier cellen naast elkaar: spiercel, zenuwcel, rode bloedcel, bladmoescel; dezelfde celkern-bouwtekening, andere vorm.', 'bouwtekening · zenuwcel · bloedcel · gespecialiseerd'),
 ('s15', 'Samenvatting', 'Schema', 'De trap (stijlframe 1) met mens en plant naast elkaar.', 'cel · weefsel · orgaan · orgaanstelsel · organisme'),
 ('s16', 'Eindkaart', 'Schema', 'Probeer het zelf: sorteeropdracht op de trap.', '—'),
]
sb_rows = ''.join(f'<tr><td class="mono">{a}</td><td>{E(b)}</td><td><span class="look-pill">{E(c)}</span></td><td>{E(d)}</td><td class="mono small">{E(e)}</td></tr>' for a, b, c, d, e in SB)

FRAMES = [('frame_trap.png', 'Samenvatting · Schema', 'De trap van vijf treden: cel, weefsel, orgaan, orgaanstelsel, organisme.'),
          ('frame_lichaam.png', 'Hoofdstuk 2 · Schema', 'Het lichaam met de tien orgaanstelsels; in de film lichten ze één voor één op.')]
frames_html = ''.join(f'<figure><img src="{img(f)}" alt="{E(t)}" loading="lazy"><figcaption><b>{E(t)}</b> {E(c)}</figcaption></figure>' for f, t, c in FRAMES)

page = open(f'{D}/checkpoint_template.html', encoding='utf-8').read()
page = page.replace('{{AUDIO}}', audio).replace('{{SCRIPT}}', script_html).replace('{{SB}}', sb_rows).replace('{{FRAMES}}', frames_html)
open(f'{D}/checkpoint.html', 'w', encoding='utf-8').write(page)
print(len(page) // 1024, 'KB')

import base64, html, io, json, re
from PIL import Image

D = '/tmp/claude-0/-home-claude-biologie-/c7337e44-20c6-5657-973f-f2720a67d729/scratchpad/alles-is-cel'
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
GOED = {'Cold open': 'c', 'Hoofdstuk 1 — Alles is cel': 'a', 'Hoofdstuk 2 — De energiecentrale': 'b', 'Hoofdstuk 3 — Wat een plant extra heeft': 'c'}
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
 ('s01', 'Cold open', 'Macro-dag', 'Keuken: twee kroppen sla op het aanrecht, één stevig, één slap. Bij "koud water" gaat het slappe blad een bak in en richt zich op (time-lapse, label "1 uur").', 'koelkast · slap · stevig'),
 ('q02', 'Cold open', 'Schema', 'Vraagkaart, kleine slakrop rechts.', '—'),
 ('s03', 'Titel', 'Micro', 'Titelkaart "Alles is cel" over een langzaam draaiende plantencel.', '—'),
 ('s04', 'H1', 'Macro → Micro', 'Blad in de bak, zoomcirkel op het blad: honingraat van cellen. Dan kat, eik en kind naast elkaar; drie zoomcirkels tonen hun cellen. Teller "≈ 30 000 miljard" bij een volwassene.', 'cellen · kat · bouwsteen · dertigduizend'),
 ('s05', 'H1', 'Micro', 'Zoom op de wang: platte wangcellen als tegels. Membraan licht op (label), dan het cytoplasma met korrels.', 'celmembraan · cytoplasma'),
 ('s06', 'H1', 'Micro', 'Kern licht op (label). Rijtje van drie begrippen bovenaan als herhaling.', 'celkern · op een rij'),
 ('s07', 'H1 havo/vwo', 'Micro + Schema', 'Paarse balk HAVO/VWO. Wangcel kantelt: een plat tegeltje met dikte; naast een blokje en een bolletje. Daarna de platte tekening: wat je niet ziet (dikte, echte maat).', 'plat rondje · model · niet op schaal'),
 ('s08', 'H1', 'Micro', 'Wangcel met vraagteken bij "energie".', 'energie'),
 ('q09', 'H1', 'Schema', 'Vraagkaart.', '—'),
 ('s10', 'H2', 'Micro', 'Bloedvat langs de cel: korrels voedingsstof en zuurstof gaan de cel in. Mitochondriën lichten op (label), voedingsstof + zuurstof gaan erin, energiesymbool (koraal) eruit; "vereenvoudigd". Spiercel vol mitochondriën. Schoolmicroscoop-icoon met streep.', 'mitochondriën · verbrandt · spiercel'),
 ('s11', 'H2', 'Schema', 'Vier begrippen op een rij (dierlijke cel).', 'vier delen'),
 ('q12', 'H2', 'Schema', 'Vraagkaart.', '—'),
 ('s13', 'H3', 'Macro-dag → Micro', 'Zoomcirkel op het slablad naar een plantencel; membraan, cytoplasma, kern en mitochondriën staan op dezelfde plek als bij de wangcel. Dan drie lege plekken voor "extra".', 'sla · mitochondriën · drie dingen'),
 ('s14', 'H3', 'Micro', 'Celwand verschijnt om het membraan (label); waterdruppels gaan er gewoon doorheen. Bladgroenkorrels (label) met een lichtstraal.', 'celwand · water · bladgroenkorrels · licht'),
 ('s15', 'H3', 'Micro', 'Vacuole vult de cel (label); opgeloste suikers als stipjes erin.', 'vacuole · opgeloste stoffen'),
 ('q16', 'H3', 'Schema', 'Vraagkaart (stijlframe 3).', '—'),
 ('s17', 'H3', 'Micro', 'Twee cellen naast elkaar: vacuole krimpt en de cel wordt slap; in water zwelt hij weer. Inzet: binnenband in fietsband. Uitzoomen naar het stevige blad.', 'verdampt · kleiner · binnenband · knapt'),
 ('s18', 'Samenvatting', 'Schema', 'Plantencel en dierlijke cel op één grondlijn; de drie extra onderdelen in groen; annotatiehaak "celwand of bladgroenkorrels = plantencel". Slotbeeld: de stevige sla.', 'dierlijke cel · plantencel · sla'),
 ('s19', 'Eindkaart', 'Schema', 'Probeer het zelf: uienvlies, wangcellen (methyleenblauw) en een blaadje waterpest onder de microscoop. Vraag: in welk preparaat zie je bladgroenkorrels, en waarom niet in het uienvlies?', '—'),
]
sb_rows = ''.join(f'<tr><td class="mono">{a}</td><td>{E(b)}</td><td><span class="look-pill">{E(c)}</span></td><td>{E(d)}</td><td class="mono small">{E(e)}</td></tr>' for a, b, c, d, e in SB)

FRAMES = [('frame_keuken.png', 'Opening · Macro-dag', 'De puzzel: stevige en slappe sla op het aanrecht.'),
          ('frame_vacuole.png', 'Kernmoment · Micro', 'Volle en gekrompen vacuole naast elkaar; celwand, vacuole en bladgroenkorrel gelabeld.'),
          ('frame_vraag.png', 'Vraagkaart · Schema', 'Vraag 4 in de stijl van de vraagkaart, met denktijdbalk.'),
          ('frame_model.png', 'Havo/vwo-blok · Micro', 'Paarse balk met HAVO/VWO; platte wangcellen tegenover een cel met dikte.'),
          ('frame_telefoon.png', 'Telefoon, liggend', 'Kernmoment op 844 × 390 px, ondertitel in de band onder het beeld.')]
frames_html = ''.join(f'<figure><img src="{img(f)}" alt="{E(t)}" loading="lazy"><figcaption><b>{E(t)}</b> {E(c)}</figcaption></figure>' for f, t, c in FRAMES)

page = open(f'{D}/checkpoint_template.html', encoding='utf-8').read()
page = page.replace('{{AUDIO}}', audio).replace('{{SCRIPT}}', script_html).replace('{{SB}}', sb_rows).replace('{{FRAMES}}', frames_html)
open(f'{D}/checkpoint.html', 'w', encoding='utf-8').write(page)
print(len(page) // 1024, 'KB')

"""gen_bron.py <werkmap> <nr> <rev.json>  — maakt script.md en checkpoint.html (zelfcheck) in de werkmap."""
import sys,json,glob,io,base64,html,os
from PIL import Image
F,nr,revp=sys.argv[1],sys.argv[2],sys.argv[3]; cfg=json.load(open(revp))
segs=json.load(open(f'{F}/segments.json')); fd=json.load(open(f'{F}/filmdata.json')); film=json.load(open(f'{F}/film.json'))
dur={s['id']:s.get('dur') for s in fd['segments']}
out=[f"# {film['title']} — gesproken tekst per opname",'',f"{film.get('meta', 'film '+nr).capitalize()} · Roos (eleven_v4) · één take per alinea · audio in `../audio/sNN.mp3`. Vwo-alinea's gemarkeerd.",'']; ch=None
for s in segs:
    if s['chapter']!=ch: ch=s['chapter']; out+=['## '+ch,'']
    if s['kind']=='speech': out+=[f"**{s['id']}**{' · vwo' if s['level']=='vwo' else ''} · {dur[s['id']]:.1f} s · `audio/{s['id']}.mp3`",'',s['display'],'']
    elif s['kind']=='question': out+=[f"**{s['id']}** (vraag{', vwo' if s['level']=='vwo' else ''}): "+' · '.join(s['options']),'']
    elif s['kind']=='title': out+=['Titelkaart: '+s['text'],'']
    else: out+=['Eindkaart: '+' / '.join(s['lines']),'']
open(f'{F}/script.md','w').write('\n'.join(out))
fs=sorted(glob.glob(f'{F}/qa/*.png')); sheets=[]
for k in range(0,len(fs),12):
    ims=[Image.open(f).resize((480,270)) for f in fs[k:k+12]]; cols=3; rows=(len(ims)+cols-1)//cols
    sh=Image.new('RGB',(480*cols,270*rows))
    for i,im in enumerate(ims): sh.paste(im,((i%cols)*480,(i//cols)*270))
    b=io.BytesIO(); sh.save(b,'JPEG',quality=72); sheets.append(base64.b64encode(b.getvalue()).decode())
sc=''; ch=None
for s in segs:
    if s['chapter']!=ch: ch=s['chapter']; sc+=f'<h3>{html.escape(ch)}</h3>'
    if s['kind']=='speech': sc+=f'<p class="{s["level"]}">{html.escape(s["display"])}</p>'
    elif s['kind']=='question': sc+='<p class="q">Vraag: '+' · '.join(html.escape(o) for o in s['options'])+'</p>'
tot=sum(v or 0 for v in dur.values()); bas=sum(s.get('dur',0) for s in fd['segments'] if s['level']=='basis')
page=f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Checkpoint {html.escape(film["title"])}</title>
<style>body{{margin:0;background:#121A26;color:#F2F2EE;font-family:"Source Sans 3",system-ui,sans-serif;line-height:1.5}}.w{{max-width:1100px;margin:0 auto;padding:24px 16px 80px}}h1{{font-family:Georgia,serif;font-size:40px;margin:4px 0}}h2{{font-family:Georgia,serif;margin-top:36px}}.e{{font-family:monospace;letter-spacing:.12em;text-transform:uppercase;font-size:12px;color:#C9B896}}img{{width:100%;border-radius:8px;margin:8px 0}}p.vwo{{border-left:4px solid #8C7BBF;padding-left:10px}}p.q{{color:#E0B64A}}li{{margin:6px 0}}</style></head><body><div class="w">
<div class="e">Nieuwsgierig? · checkpoint (zelfcheck) · 20 oktober 2026</div><h1>{html.escape(film['title'])}</h1>
<p>Zelfcheck volgens B7: script na twee reviews (vakinhoud en historische juistheid; begrijpelijkheid en film), gebouwd, contactsheets nagekeken en verbeterd. Spraak: {tot/60:.0f}:{tot%60:02.0f} (vwo) / {bas/60:.0f}:{bas%60:02.0f} (havo).</p>
<h2>Wat de reviews veranderden</h2><ul>{''.join('<li>'+html.escape(r)+'</li>' for r in cfg['reviews'])}</ul>
<h2>Keuzes voor Kamiel</h2><ul>{''.join('<li>'+html.escape(r)+'</li>' for r in cfg['keuzes'])}</ul>
<h2>Contactsheets uit de speler</h2>{''.join(f'<img src="data:image/jpeg;base64,{b}" alt="contactsheet {i+1}">' for i,b in enumerate(sheets))}
<h2>Script</h2>{sc}</div></body></html>'''
open(f'{F}/checkpoint.html','w').write(page); print('script.md + checkpoint.html', len(page), f'spraak {tot:.0f}s basis {bas:.0f}s')

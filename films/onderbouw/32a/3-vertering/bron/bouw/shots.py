import sys, json
from playwright.sync_api import sync_playwright
from PIL import Image
D='/tmp/claude-0/-home-claude-biologie-/c7337e44-20c6-5657-973f-f2720a67d729/scratchpad/film3'
ids=sys.argv[1].split(',') if len(sys.argv)>1 else None
fr=[float(x) for x in (sys.argv[2].split(',') if len(sys.argv)>2 else ['0.15','0.4','0.65','0.92'])]
shots=[]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']); pg=b.new_page(viewport={'width':1920,'height':1300}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.goto(f'file://{D}/film/index.html')
    css=''.join(f'@font-face{{font-family:"{fam}";font-weight:{w};src:url(file://{D}/fonts/{f})}}' for fam,w,f in [('Fraunces',700,'fraunces-700.woff2'),('Source Sans 3',400,'ss3-400.woff2'),('Source Sans 3',600,'ss3-600.woff2'),('Source Sans 3',700,'ss3-700.woff2'),('IBM Plex Mono',500,'plexmono-500.woff2')])
    pg.add_style_tag(content=css); pg.evaluate("Promise.all([...document.fonts].map(f=>f.load()))"); pg.wait_for_timeout(1200)
    items=pg.evaluate("state.items.map((it,i)=>[i,it.seg?it.seg.id:it.type,it.dur])")
    for i,sid,dur in items:
        if ids and sid not in ids: continue
        for f in fr:
            pg.evaluate(f"gotoItem({i},{dur*f}); render()"); pg.wait_for_timeout(120)
            fn=f'{D}/shots/{i:02d}{sid}_{int(f*100):02d}.png'; pg.locator('canvas').screenshot(path=fn); shots.append((fn,f'{sid} {dur*f:.1f}s'))
    print(errs[:10]); b.close()
from PIL import ImageDraw
w=640; ims=[Image.open(f).convert('RGB').resize((w,360)) for f,_ in shots]
cols=4; rows=(len(ims)+cols-1)//cols; s=Image.new('RGB',(w*cols,380*rows),'black'); d=ImageDraw.Draw(s)
for k,(im,(f,l)) in enumerate(zip(ims,shots)): s.paste(im,((k%cols)*w,(k//cols)*380)); d.text(((k%cols)*w+8,(k//cols)*380+362),l,fill='white')
s.save(f'{D}/shots/contact.jpg',quality=80); print(len(shots))

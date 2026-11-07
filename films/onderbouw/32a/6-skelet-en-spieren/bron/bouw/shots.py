# stills per segment: python3 shots.py [ids|all] [fracties of @tijden]  -> shots/*.png + shots/contact.jpg
import sys, os
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
D=os.getcwd(); os.makedirs('shots',exist_ok=True)
ids=None if len(sys.argv)<2 or sys.argv[1]=='all' else sys.argv[1].split(',')
arg=sys.argv[2] if len(sys.argv)>2 else '0.1,0.4,0.7,0.95'
absolute=arg.startswith('@'); fr=[float(x) for x in arg.lstrip('@').split(',')]
css=open('/home/claude/hw/engine/fonts.css').read()
shots=[]; errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1920,'height':1300})
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.goto(f'file://{D}/film/index.html'+(sys.argv[3] if len(sys.argv)>3 else ''))
    pg.add_style_tag(content=css); pg.evaluate("Promise.all([...document.fonts].map(f=>f.load()))"); pg.wait_for_timeout(800)
    items=pg.evaluate("state.items.map((it,i)=>[i,it.seg?it.seg.id:'card',it.dur])")
    for i,sid,dur in items:
        if ids and sid not in ids: continue
        for f in fr:
            tt=f if absolute else dur*f
            if tt>dur: continue
            pg.evaluate(f"gotoItem({i},{tt}); state.local={tt}; render()"); pg.wait_for_timeout(60)
            fn=f'shots/{i:02d}{sid}_{tt:05.1f}.png'; pg.locator('canvas').screenshot(path=fn); shots.append((fn,f'{sid} {tt:.1f}s'))
    b.close()
print('fouten:',errs[:10])
w=640; cols=4; rows=(len(shots)+cols-1)//cols; s=Image.new('RGB',(w*cols,380*rows),'black'); d=ImageDraw.Draw(s)
for k,(f,l) in enumerate(shots): s.paste(Image.open(f).convert('RGB').resize((w,360)),((k%cols)*w,(k//cols)*380)); d.text(((k%cols)*w+8,(k//cols)*380+362),l,fill='white')
s.save('shots/contact.jpg',quality=82); print(len(shots),'stills')

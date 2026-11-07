# shots.py <filmmap> [ids] [n per segment] : stills + contactbladen in <filmmap>/shots/
import sys, os, json
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
D=os.path.abspath(sys.argv[1]); ids=sys.argv[2].split(',') if len(sys.argv)>2 and sys.argv[2]!='all' else None; N=int(sys.argv[3]) if len(sys.argv)>3 else 5
FD='/home/claude/wt-33c/films/dna/_bouw/fonts'; os.makedirs(f'{D}/shots',exist_ok=True)
for f in os.listdir(f'{D}/shots'): os.remove(f'{D}/shots/{f}')
shots=[]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1920,'height':1300}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.route('**/fonts.googleapis.com/**',lambda r:r.abort()); pg.route('**/fonts.gstatic.com/**',lambda r:r.abort())
    pg.goto(f'file://{D}/film/index.html')
    css=''.join(f'@font-face{{font-family:"{fam}";font-weight:{w};src:url(file://{FD}/{f})}}' for f,fam,w in [('001.woff2','Fraunces',700),('002.woff2','Source Sans 3',400),('003.woff2','Source Sans 3',600),('004.woff2','Source Sans 3',700),('005.woff2','IBM Plex Mono',500)])
    pg.add_style_tag(content=css); pg.evaluate("Promise.all([...document.fonts].map(f=>f.load()))"); pg.wait_for_timeout(800)
    items=pg.evaluate("state.items.map((it,i)=>[i,it.seg?it.seg.id:it.type,it.dur])")
    for i,sid,dur in items:
        if sid=='card': continue
        if ids and sid not in ids: continue
        for k in range(N):
            f=dur*(k+0.5)/N
            pg.evaluate(f"pause(); gotoItem({i},{f}); render()"); pg.wait_for_timeout(60)
            fn=f'{D}/shots/{i:02d}{sid}_{int(f*10):04d}.png'; pg.locator('canvas').screenshot(path=fn); shots.append((fn,f'{sid} {f:.1f}s'))
    print('fouten:',errs[:10]); b.close()
w=640; per=16
for c in range(0,len(shots),per):
    part=shots[c:c+per]; cols=4; rows=(len(part)+cols-1)//cols; s=Image.new('RGB',(w*cols,380*rows),'black'); d=ImageDraw.Draw(s)
    for k,(f,l) in enumerate(part): s.paste(Image.open(f).convert('RGB').resize((w,360)),((k%cols)*w,(k//cols)*380)); d.text(((k%cols)*w+8,(k//cols)*380+362),l,fill='white')
    s.save(f'{D}/shots/contact_{c//per:02d}.jpg',quality=82)
print(len(shots),'stills')

# gebruik: python3 render.py <obj-map> <scene.js> ; leest sleutel.json, rendert oud eerst voor de uitsnede
import asyncio, sys, json, os, urllib.parse
from playwright.async_api import async_playwright
D=sys.argv[1]; S=sys.argv[2]; PORT=int(sys.argv[3]) if len(sys.argv)>3 else 8811
W='/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/dieren-b/_werk/h.html'
sl=json.load(open(os.path.join(D,'sleutel.json')))
if os.environ.get('ALLEEN'): sl={k:v for k,v in list(sl.items())+[('C','C')] if k in os.environ['ALLEEN'].split(',')}
OUD=os.environ.get('OUDFIT')=='1'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720}); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append('console:'+m.text) if m.type=='error' else None)
    async def go(v,fit=None):
      q={'s':S}
      if v: q['v']=v
      if fit: q['fit']=json.dumps(fit)
      await pg.goto(f'http://localhost:{PORT}{W}?'+urllib.parse.urlencode(q)); await pg.wait_for_function('window.KLAAR==1',timeout=60000); await pg.wait_for_timeout(200)
      return await pg.evaluate('[window.FITS,window.FOUTEN]')
    nieuw = ('oud' not in sl.values()) and not OUD
    basis = os.path.join(D,'A.js') if nieuw else None
    fit,f0=await go(basis); errs+=f0
    for L,v in sl.items():
      js=None if v=='oud' else os.path.join(D,v+'.js')
      fits,fo=await go(js,None if nieuw else fit); errs+=[v+': '+e for e in fo]
      await (await pg.query_selector('#c')).screenshot(path=os.path.join(D,L+'.png'))
    print(D, 'fouten:', errs[:8]); await b.close()
asyncio.run(main())
from PIL import Image
ims=[(L,Image.open(os.path.join(D,L+'.png')).convert('RGB').resize((640,360))) for L in sl]
sh=Image.new('RGB',(640,360*len(ims)))
for i,(L,im) in enumerate(ims): sh.paste(im,(0,360*i))
sh.save(os.path.join(os.path.dirname(W),'cmp_'+os.path.basename(D.rstrip('/'))+'.png'))

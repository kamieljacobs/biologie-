# python3 shots.py <html> <outdir> <segid,...|all> [havo]  -> een still per gesproken regel (midden van de regel) + consolefouten
import asyncio,sys,os,json
from playwright.async_api import async_playwright
f,out,ids=sys.argv[1:4]; niv=sys.argv[4] if len(sys.argv)>4 else 'vwo'; os.makedirs(out,exist_ok=True)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1400,'height':900}); errs=[]
        pg.on('pageerror',lambda e:errs.append('ERR '+str(e))); pg.on('console',lambda m: errs.append('CON '+m.text) if m.type=='error' else None)
        await pg.goto('file://'+os.path.abspath(f)+('?niveau=havo' if niv=='havo' else '')); await pg.wait_for_timeout(900)
        await pg.evaluate("state.started=true")
        segs=await pg.evaluate("""state.items.map(it=>({id:it.seg&&it.seg.id,start:it.start,dur:it.dur,type:it.type,b:it.seg&&it.seg.bounds,ad:it.seg&&it.seg.dur}))""")
        want=[s['id'] for s in segs if s['id']] if ids=='all' else ids.split(',')
        for sid in want:
            s=next((x for x in segs if x['id']==sid),None)
            if not s: print('niet',sid); continue
            if s['type']=='speech':
                bb=[0]+s['b']+[s['ad']-0.6]; ts=[(bb[i]+bb[i+1])/2 for i in range(len(bb)-1)]
                for li,ta in enumerate(ts):
                    url=await pg.evaluate("([id,ta])=>{ const i=state.items.findIndex(x=>x.seg&&x.seg.id===id); const it=state.items[i]; gotoItem(i,aud2it(it,ta)); render(); return document.getElementById('stage').toDataURL('image/png'); }",[sid,ta])
                    import base64; open(f'{out}/{sid}_{li:02d}.png','wb').write(base64.b64decode(url.split(',')[1]))
            else:
                url=await pg.evaluate("([g])=>{ seekGlobal(g); render(); return document.getElementById('stage').toDataURL('image/png'); }",[s['start']+s['dur']*0.5])
                import base64; open(f'{out}/{sid}.png','wb').write(base64.b64decode(url.split(',')[1]))
        print('totaal',await pg.evaluate('state.total')); print('\n'.join(errs) or 'geen fouten'); await b.close()
asyncio.run(main())

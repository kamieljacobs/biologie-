import asyncio, sys, json
from playwright.async_api import async_playwright
base = sys.argv[1]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        pg = await b.new_page(viewport={'width': 1920, 'height': 1200}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(base + '?vragen=uit'); await pg.wait_for_timeout(2500)
        info = await pg.evaluate("""()=>{ const all=window.FILMDATA.segments; const its=state.items; const out=[];
          all.forEach((s,i)=>{ if(s.kind!=='question') return; const prev=all.slice(0,i).reverse().find(x=>x.kind==='speech'&&!x.vraagStem); const nx=all.slice(i+1).find(x=>x.kind==='speech'||x.kind==='card');
            const ip=its.findIndex(it=>it.seg===prev); out.push({q:s.id, prev:prev.id, next:nx?nx.id:null, start:its[ip].start+its[ip].dur, inTL: its.some(it=>it.seg===s), stemInTL: its.some(it=>it.seg&&it.seg.vraagStem)}); }); return {out, total: state.total}; }""")
        print('total vragen=uit', round(info['total'],1))
        for q in info['out']:
            await pg.evaluate(f"()=>{{ seekGlobal({q['start']-5}); play(); }}")
            seen = []; caps = []
            for k in range(40):
                await pg.wait_for_timeout(250)
                st = await pg.evaluate("()=>{ const it=state.items[state.idx]; const ch=it.seg&&it.type==='speech'?chunks(it.seg).find(c=>state.local>=c[0].s-0.15&&state.local<=c[c.length-1].e+0.6):null; return [it.type, it.seg?it.seg.id:it.chapter, state.local.toFixed(2), ch?ch.map(w=>w.t).join(' '):'', !document.getElementById('narration').paused]; }")
                if not seen or seen[-1] != st[1]: seen.append(st[1])
                if st[3] and (not caps or caps[-1] != st[3]): caps.append(st[3])
            await pg.evaluate("pause()")
            print(q['q'], 'inTL', q['inTL'], 'stem', q['stemInTL'], '| items', seen); print('   caps:', [c[:70] for c in caps][-4:])
        print('errors', errs[:5]); await b.close()
asyncio.run(main())

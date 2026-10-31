"""python3 stills.py <filmdir> <outdir> id:t[:niveau[:phase]] ...  |  'contact' = every segment at 25/60/90%"""
import sys, os, asyncio, json
from playwright.async_api import async_playwright
fdir, out = sys.argv[1], sys.argv[2]; specs = sys.argv[3:]; FR=[0.1,0.3,0.5,0.7,0.93] if os.environ.get('FIVE') else [0.25,0.6,0.92]; os.makedirs(out, exist_ok=True)
film = json.load(open(os.path.join(fdir, 'film.json')))
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/opt/pw-browsers/chromium' if os.path.exists('/opt/pw-browsers/chromium') and os.path.isfile('/opt/pw-browsers/chromium') else None)
        pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + os.path.abspath(os.path.join(fdir, 'film', 'standalone.html')))
        await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(800)
        sp = specs
        if specs == ['contact']:
            items = await pg.evaluate("__items()"); sp = []
            for it in items:
                key = it['id'] if it['id'] else ('title' if it['type'] == 'title' else ('end' if it['type'] == 'end' else 'card:' + it['chapter']))
                for f in (FR if it['type'] == 'speech' else [0.5]): sp.append(f"{key}|{it['dur'] * f:.2f}")
        for s in sp:
            if '|' in s: sid, t = s.split('|'); niv = 'vwo'; ph = ''
            else: parts = s.split(':'); sid, t = parts[0], parts[1]; niv = parts[2] if len(parts) > 2 else 'vwo'; ph = parts[3] if len(parts) > 3 else ''
            await pg.evaluate(f"()=>{{ if(state.niveau!=='{niv}'){{ state.niveau='{niv}'; buildTimeline(); }} }}")
            ok = await pg.evaluate(f"__still({json.dumps(sid)},{float(t)},{json.dumps(ph or None)})")
            if not ok: print('niet gevonden', sid); continue
            await pg.wait_for_timeout(60)
            el = await pg.query_selector('#stage')
            name = sid.replace(':', '_').replace(' ', '_').replace('—', '').replace('?', '')[:40]
            await el.screenshot(path=os.path.join(out, f'{name}_{float(t):06.2f}.png'))
        print('CUEMIS', await pg.evaluate('Object.keys(window.__cueMis||{})'))
        if errs: print('ERRORS', errs[:5])
        await b.close()
asyncio.run(main())
print('klaar')

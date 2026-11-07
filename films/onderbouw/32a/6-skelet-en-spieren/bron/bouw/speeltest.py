# hele tijdlijn renderen in Basis/Uitdaging x Vragen aan/uit, en 4 s afspelen op 1,5x; meldt JS-fouten
import subprocess, time, sys, os
from playwright.sync_api import sync_playwright
import socket; _s=socket.socket(); _s.bind(('127.0.0.1',0)); port=_s.getsockname()[1]; _s.close()
srv=subprocess.Popen(['python3',os.path.dirname(os.path.abspath(__file__))+'/rangeserver.py',os.getcwd()+'/film',str(port)]); time.sleep(0.8)
try:
  with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    for niv in ['basis','havovwo']:
      for vr in ['aan','uit']:
        pg=b.new_page(); errs=[]; pg.route('**/*', lambda r: r.continue_() if '127.0.0.1' in r.request.url else r.abort())
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.on('console',lambda m: errs.append(m.text) if m.type=='error' and 'goatcounter' not in m.text and 'teller' not in m.text and 'ERR_' not in m.text else None)
        pg.goto(f'http://127.0.0.1:{port}/index.html?niveau={niv}&vragen={vr}&snelheid=1.5',wait_until='domcontentloaded'); pg.wait_for_timeout(2500)
        n=pg.evaluate("""()=>{ let c=0; state.items.forEach((it,i)=>{ for(const f of [0,0.25,0.5,0.75,0.99]){ gotoItem(i,it.dur*f); state.local=it2aud(it,it.dur*f); render(); c++; } }); return [c,state.items.length,Math.round(state.total), state.items.filter(x=>x.type==='question').length]; }""")
        pg.evaluate("gotoItem(0,0); play()"); pg.wait_for_timeout(4000); pos=pg.evaluate("[state.idx, state.local.toFixed(1), state.snelheid]")
        pg.evaluate("pause()")
        print(niv,vr,'frames/items/totaal s/vragen',n,'na 4 s spelen',pos,'fouten:',errs[:5]); pg.close()
    b.close()
finally: srv.terminate()

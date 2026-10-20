# speeltest.py <filmmap> <poort>: Basis/Uitdaging x Vragen aan/uit x 1,5x; zoeken over de hele tijdlijn + echt afspelen; JS-fouten
import sys, subprocess, time, os
from playwright.sync_api import sync_playwright
D=os.path.abspath(sys.argv[1]); P=sys.argv[2]
srv=subprocess.Popen(['python3','/tmp/claude-0/-home-claude/7f92348f-4257-517d-937d-a0966b569284/scratchpad/ob/_tools/rangeserver.py',D+'/film',P]); time.sleep(1)
try:
  with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    for q in ['?niveau=basis','','?vragen=uit','?niveau=basis&vragen=uit&snelheid=1.5','?snelheid=1.5']:
        pg=b.new_page(); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.route('**/*',lambda r: r.abort() if any(h in r.request.url for h in ['googleapis','gstatic','zgo.at','js/teller','js/flipkaarten','js/oefenen']) else r.continue_())
        pg.goto(f'http://127.0.0.1:{P}/index.html{q}'); pg.wait_for_timeout(700)
        info=pg.evaluate("({n:state.items.length,total:state.total,q:state.items.filter(i=>i.type==='question').length,v:state.items.filter(i=>i.level==='vwo').length,sn:state.snelheid,vr:state.vragen})")
        pg.evaluate("state.auto=true")
        tot=info['total']; g=0
        while g<tot: pg.evaluate(f"seekGlobal({g}); render()"); g+=2.5
        # echt afspelen: elk item 0,6 s
        for i in range(info['n']):
            pg.evaluate(f"gotoItem({i},0); play()"); pg.wait_for_timeout(350)
        pg.evaluate("pause()")
        # laatste 4 s van de film afspelen tot het eind
        pg.evaluate(f"seekGlobal({tot-3}); play()"); pg.wait_for_timeout(3500)
        print(q or '(standaard)', info, 'fouten:', errs[:5]); pg.close()
    b.close()
finally: srv.kill()

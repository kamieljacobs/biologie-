"""presentatie.py <spec.json> <uit.html>  — maakt een klassikale presentatie bij een film.

De spec (JSON) bevat: titel, sub, film (href van de film, relatief aan de presentatie), terug (href naar het hoofdstuk),
hoofdstuk (naam), en slides: een lijst met per slide
  type: "titel" | "inhoud" | "vraag" | "samenvatting"
  kop (klein label boven de slide, bv. hoofdstuk), titel, punten [..], beeld (pad), vwo (bool), notities (docent),
  bij "vraag": vraag, opties [..], juist (index), uitleg, beeld_na (beeld dat bij het antwoord verschijnt)
  bij "samenvatting": punten en optioneel tabel [[links, rechts], ...]
Toetsen: → / spatie / klik = verder · ← = terug · A = antwoord tonen · N = docentnotities · V = havo/vwo · O = overzicht · F = volledig scherm.
"""
import json, sys, html

spec = json.load(open(sys.argv[1], encoding='utf-8')); out = sys.argv[2]
import os
def svg(path):  # pad relatief aan de map van de uitvoer-html
    return open(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(out)), path)), encoding='utf-8').read()
E = lambda s: html.escape(str(s), quote=True)

def slide(s, i):
    t = s.get('type', 'inhoud'); vwo = ' data-vwo="1"' if s.get('vwo') else ''
    kop = f'<div class="kop">{E(s.get("kop", ""))}{"<span class=vwotag>vwo</span>" if s.get("vwo") else ""}</div>'
    notes = f'<aside class="notities">{E(s.get("notities", ""))}</aside>' if s.get('notities') else ''
    beeld = f'<figure class="beeld"><img src="{E(s["beeld"])}" alt="{E(s.get("alt", s.get("titel", "")))}" loading="lazy"></figure>' if s.get('beeld') else ''
    if s.get('svg'): beeld = f'<figure class="beeld schema">{svg(s["svg"])}</figure>'
    stap = ' class="stap"' if s.get('stapsgewijs') else ''
    if t == 'titel':
        body = f'<div class="titelslide">{beeld}<div class="tt"><div class="kop">{E(s.get("kop", ""))}</div><h1>{E(s["titel"])}</h1><p class="sub">{E(s.get("sub", ""))}</p></div></div>'
    elif t == 'vraag':
        opts = ''.join(f'<li data-juist="{1 if k == s["juist"] else 0}"><b>{"abcdef"[k]}</b><span>{E(o)}</span></li>' for k, o in enumerate(s['opties']))
        na = f'<figure class="beeld na"><img src="{E(s["beeld_na"])}" alt="" loading="lazy"></figure>' if s.get('beeld_na') else ''
        body = f'''{kop}<div class="vraagslide{' metbeeld' if s.get('beeld') or s.get('beeld_na') else ''}{' heeftna' if s.get('beeld_na') else ''}"><div><h2 class="vraag">{E(s["vraag"])}</h2><ol class="opties">{opts}</ol>
<p class="uitleg">{E(s.get("uitleg", ""))}</p><p class="hint">Bespreek eerst in tweetallen · <kbd>A</kbd> toont het antwoord</p></div>{beeld}{na}</div>'''
    elif t == 'samenvatting':
        tab = ''
        if s.get('tabel'):
            tab = '<table>' + ''.join(f'<tr><td>{E(a)}</td><td>{E(b)}</td></tr>' for a, b in s['tabel']) + '</table>'
        body = f'{kop}<h2>{E(s["titel"])}</h2><div class="samen"><ul class="punten">{"".join(f"<li>{E(p)}</li>" for p in s.get("punten", []))}</ul>{tab}</div>'
    else:
        body = f'{kop}<div class="inhoud{" metbeeld" if beeld else ""}"><div><h2>{E(s["titel"])}</h2><{'ol' if s.get('stapsgewijs') else 'ul'} class="punten{' genummerd' if s.get('stapsgewijs') else ''}">{"".join(f"<li{stap}>{E(p)}</li>" for p in s.get("punten", []))}</{'ol' if s.get('stapsgewijs') else 'ul'}></div>{beeld}</div>'
    return f'<section class="slide t-{t}" data-i="{i}"{vwo}>{body}{notes}</section>'

slides = ''.join(slide(s, i) for i, s in enumerate(spec['slides']))
page = f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(spec["titel"])} · presentatie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Source+Sans+3:wght@400;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>
:root{{--bg:#0E141F;--schema:#1A2740;--micro:#121A26;--text:#F2F2EE;--text2:#9AA3B2;--goud:#E0B64A;--groen:#7FC48F;--koraal:#E07A5F;--paars:#8C7BBF;--lijn:#2A3A58}}
*{{box-sizing:border-box}}html,body{{margin:0;height:100%;background:var(--bg);color:var(--text);font-family:"Source Sans 3",system-ui,sans-serif;overflow:hidden}}
.balk{{position:fixed;top:0;left:0;right:0;height:52px;display:flex;align-items:center;gap:18px;padding:0 18px;font:600 15px/1 "Source Sans 3",sans-serif;z-index:5;background:linear-gradient(#0E141Fee,#0E141F00)}}
.balk a{{color:var(--text2);text-decoration:none}}.balk a:hover{{color:var(--text)}}.balk .sp{{flex:1}}
.balk button{{background:#1A2740;color:var(--text);border:1px solid var(--lijn);border-radius:20px;padding:7px 14px;font:600 14px "Source Sans 3",sans-serif;cursor:pointer}}
.balk button.aan{{border-color:var(--goud);color:var(--goud)}}
#podium{{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:center center}}
.slide{{position:absolute;inset:0;padding:110px 120px 90px;background:var(--schema);display:none;border-radius:6px}}
.slide.actief{{display:block;animation:in .35s ease}}@keyframes in{{from{{opacity:0;transform:translateY(8px)}}}}
.slide[data-vwo]{{border-left:10px solid var(--paars)}}
.kop{{font:600 22px/1 "IBM Plex Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#C9B896;margin-bottom:26px;display:flex;gap:14px;align-items:center}}
.vwotag{{background:var(--paars);color:#fff;border-radius:6px;padding:5px 10px;font-size:18px;letter-spacing:.1em}}
h1{{font:700 120px/1.02 Fraunces,Georgia,serif;margin:0}}h2{{font:700 64px/1.1 Fraunces,Georgia,serif;margin:0 0 34px}}
.sub{{font-size:44px;color:var(--text2);margin:20px 0 0}}
.titelslide{{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;height:100%}}
.inhoud,.vraagslide{{display:grid;grid-template-columns:1fr;gap:56px;height:calc(100% - 50px)}}
.inhoud.metbeeld,.vraagslide.metbeeld{{grid-template-columns:minmax(0,0.62fr) minmax(0,1.38fr);align-items:center}}
.punten{{margin:0;padding:0;list-style:none}}.punten li{{font-size:40px;line-height:1.3;margin:0 0 26px;padding-left:40px;position:relative}}
.punten li:before{{content:"";position:absolute;left:4px;top:.5em;width:14px;height:14px;border-radius:50%;background:var(--goud)}}
.punten li.stap{{opacity:.12;transition:opacity .3s}}.punten li.stap.toon{{opacity:1}}
.beeld{{margin:0;border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px var(--lijn)}}.beeld img,.beeld svg{{display:block;width:100%;height:auto}}.beeld.schema{{background:#121A26}}
.genummerd{{counter-reset:n}}.genummerd li{{counter-increment:n;padding-left:64px}}.genummerd li:before{{content:counter(n);width:44px;height:44px;top:.05em;left:0;display:grid;place-items:center;font:700 26px 'IBM Plex Mono',monospace;color:#1A2740;background:var(--goud)}}
.inhoud.metbeeld .punten li{{font-size:36px;margin-bottom:22px}}
.vraag{{font-size:56px}}.opties{{list-style:none;margin:0;padding:0}}
.opties li{{display:flex;gap:22px;align-items:baseline;font-size:40px;line-height:1.25;margin:0 0 22px;padding:18px 24px;border:2px solid var(--lijn);border-radius:16px;cursor:pointer}}
.opties b{{font-family:"IBM Plex Mono",monospace;color:var(--goud)}}
.opties li.gekozen{{border-color:var(--text2)}}
.toonantw .opties li[data-juist="1"]{{border-color:var(--groen);background:#7FC48F22}}.toonantw .opties li[data-juist="0"]{{opacity:.45}}
.uitleg{{font-size:36px;line-height:1.35;color:var(--groen);display:none;margin:10px 0 0}}.toonantw .uitleg{{display:block}}
.hint{{font-size:24px;color:var(--text2);margin-top:20px}}.toonantw .hint{{display:none}}
.beeld.na{{display:none}}.toonantw .beeld.na{{display:block}}.toonantw .heeftna .beeld:not(.na){{display:none}}
.samen{{display:grid;grid-template-columns:1fr 1fr;gap:60px}}
table{{border-collapse:collapse;font-size:32px;width:100%}}td{{padding:14px 16px;border-bottom:1px solid var(--lijn)}}td:first-child{{color:var(--goud);font-weight:600;white-space:nowrap}}
kbd{{font-family:"IBM Plex Mono",monospace;border:1px solid var(--text2);border-radius:6px;padding:1px 8px}}
.notities{{display:none}}
body.metnotities .notities{{display:block;position:absolute;left:120px;right:120px;bottom:20px;background:#0E141Fee;border:1px solid var(--goud);border-radius:12px;padding:16px 22px;font-size:26px;line-height:1.35;color:#F0E6C8}}
.voortgang{{position:fixed;left:0;bottom:0;height:5px;background:var(--goud);z-index:5;transition:width .3s}}
.nummer{{font-family:"IBM Plex Mono",monospace;color:var(--text2)}}
#overzicht{{display:none;position:fixed;inset:52px 0 0;overflow:auto;background:var(--bg);z-index:4;padding:20px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}}
#overzicht.open{{display:grid}}#overzicht button{{text-align:left;background:var(--schema);color:var(--text);border:1px solid var(--lijn);border-radius:10px;padding:14px;font:600 17px "Source Sans 3",sans-serif;cursor:pointer;min-height:90px}}
#overzicht button small{{display:block;color:var(--text2);font-weight:400;margin-bottom:6px}}
.uitlegtoetsen{{color:var(--text2);font-weight:400}}
@media (max-width:900px){{.uitlegtoetsen,#bOv,#bFs{{display:none}}.balk{{gap:10px;font-size:13px;padding:0 10px}}.balk button{{padding:5px 9px;font-size:12px}}.balk a:nth-of-type(3){{display:none}}}}
</style></head><body>
<nav class="balk sitenav"><a href="{E(spec.get("home", "../../../index.html#home"))}">Biologie bij Kamiel</a><a href="{E(spec["terug"])}">← Terug naar {E(spec["hoofdstuk"])}</a><a href="{E(spec["film"])}">Film bekijken</a><span class="sp"></span>
<span class="uitlegtoetsen">→ verder{' · A antwoord' if any(x.get('type')=='vraag' for x in spec['slides']) else ''} · N notities</span><button id="bNiv" type="button">Vwo</button><button id="bNot" type="button">Notities</button><button id="bOv" type="button">Overzicht</button><button id="bFs" type="button">Volledig scherm</button><span class="nummer" id="nr"></span></nav>
<div id="podium">{slides}</div><div id="overzicht"></div><div class="voortgang" id="vg"></div>
<script>
const S=[...document.querySelectorAll('.slide')];let i=0,vwo=true;
try{{const v=localStorage.getItem('pres-niveau');if(v)vwo=v==='vwo';}}catch(e){{}}
const zicht=()=>S.filter(s=>vwo||!s.dataset.vwo);
function schaal(){{const p=document.getElementById('podium');const k=Math.min(innerWidth/1920,(innerHeight-52)/1080);p.style.transform=`translate(-50%,calc(-50% + 26px)) scale(${{k}})`;}}
function toon(n){{const Z=zicht();i=Math.max(0,Math.min(Z.length-1,n));S.forEach(s=>s.classList.remove('actief'));const s=Z[i];s.classList.add('actief');
 document.getElementById('nr').textContent=(i+1)+' / '+Z.length;document.getElementById('vg').style.width=(100*(i+1)/Z.length)+'%';
 try{{history.replaceState(null,'','#'+s.dataset.i);}}catch(e){{}}}}
function verder(){{const s=zicht()[i];const st=[...s.querySelectorAll('.punten li.stap:not(.toon)')];if(st.length){{st[0].classList.add('toon');return;}}toon(i+1);}}
function terug(){{toon(i-1);}}
function antwoord(){{const s=zicht()[i];if(s.querySelector('.opties'))s.classList.toggle('toonantw');}}
function niveau(){{vwo=!vwo;try{{localStorage.setItem('pres-niveau',vwo?'vwo':'havo');}}catch(e){{}}document.getElementById('bNiv').textContent=vwo?'Vwo':'Havo';const cur=S.find(s=>s.classList.contains('actief'));const Z=zicht();let k=Z.indexOf(cur);if(k<0)k=Z.findIndex(s=>+s.dataset.i>+cur.dataset.i);toon(k<0?Z.length-1:k);bouwOv();}}
function notities(){{document.body.classList.toggle('metnotities');document.getElementById('bNot').classList.toggle('aan');}}
function bouwOv(){{const o=document.getElementById('overzicht');o.innerHTML='';zicht().forEach((s,k)=>{{const b=document.createElement('button');const kop=s.querySelector('.kop');const t=s.querySelector('h1,h2');b.innerHTML=`<small>${{k+1}} · ${{kop?kop.textContent:''}}</small>${{t?t.textContent:''}}`;b.onclick=()=>{{toon(k);o.classList.remove('open');}};o.appendChild(b);}});}}
document.getElementById('bNiv').onclick=niveau;document.getElementById('bNot').onclick=notities;
document.getElementById('bOv').onclick=()=>document.getElementById('overzicht').classList.toggle('open');
document.getElementById('bFs').onclick=()=>{{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{{}});}};
addEventListener('keydown',e=>{{if(e.target.closest&&e.target.closest('button')&&(e.key===' '||e.key==='Enter'))return;const k=e.key.toLowerCase();
 if(['arrowright','pagedown',' '].includes(k)){{e.preventDefault();verder();}}else if(['arrowleft','pageup','backspace'].includes(k)){{e.preventDefault();terug();}}
 else if(k==='a')antwoord();else if(k==='n')notities();else if(k==='v')niveau();else if(k==='o')document.getElementById('overzicht').classList.toggle('open');
 else if(k==='f')document.getElementById('bFs').click();else if(k==='home')toon(0);else if(k==='end')toon(1e9);}});
document.getElementById('podium').addEventListener('click',e=>{{const li=e.target.closest('.opties li');if(li){{const s=li.closest('.slide');if(s.classList.contains('toonantw'))return;s.querySelectorAll('.opties li').forEach(x=>x.classList.remove('gekozen'));li.classList.add('gekozen');return;}}verder();}});
let tx=null;addEventListener('touchstart',e=>tx=e.touches[0].clientX,{{passive:true}});addEventListener('touchend',e=>{{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)(d<0?verder:terug)();tx=null;}});
addEventListener('resize',schaal);schaal();document.getElementById('bNiv').textContent=vwo?'Vwo':'Havo';bouwOv();
const h=parseInt(location.hash.slice(1));const Z=zicht();const k=Z.findIndex(s=>+s.dataset.i===h);toon(k>0?k:0);
</script></body></html>'''
open(out, 'w', encoding='utf-8').write(page)
print('ok', len(spec['slides']), 'slides →', out)

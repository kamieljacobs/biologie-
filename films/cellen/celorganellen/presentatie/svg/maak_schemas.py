import math, os
OUT=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/'
HEAD='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560" role="img" aria-label="{a}">\n<style>text{{font-family:"Source Sans 3",system-ui,sans-serif;font-size:24px;fill:#F2F2EE;font-weight:600}}.s{{font-size:19px;fill:#C9B896}}.l{{stroke:#9AA3B2;stroke-width:1.5;fill:none}}</style>\n<rect width="900" height="560" fill="#121A26"/>\n'
def save(n,a,body): open(OUT+n,'w').write(HEAD.format(a=a)+body+'\n</svg>\n')
def lab(x1,y1,x2,y2,t,anchor='middle',dy=-8):
    ty=y2+dy if y2<y1 else y2+24
    return f'<path class="l" d="M{x1} {y1} L{x2} {y2}"/><text x="{x2}" y="{ty}" text-anchor="{anchor}">{t}</text>'
# organel-bouwstenen (in svg-coördinaten)
def mito(x,y,s=1,rot=0):
    g=f'<g transform="translate({x} {y}) rotate({rot}) scale({s})"><ellipse rx="60" ry="30" fill="#5A2E2A" stroke="#E8A08C" stroke-width="4"/><path d="M-44 0 l8 -16 l8 30 l8 -30 l8 30 l8 -30 l8 30 l8 -30 l8 30 l8 -16" fill="none" stroke="#D86A5A" stroke-width="4" stroke-linejoin="round"/></g>'
    return g
def kern(x,y,r): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#4A3D72" stroke="#A392D6" stroke-width="5"/><circle cx="{x+r*0.25}" cy="{y-r*0.2}" r="{r*0.28}" fill="#8C7BBF"/>'
def ruwER(x,y,w=150,n=4):
    s=''
    for i in range(n):
        yy=y+i*26; s+=f'<path d="M{x} {yy} q{w/4} -14 {w/2} 0 t{w/2} 0" fill="none" stroke="#AFC0D0" stroke-width="7" stroke-linecap="round"/>'
        for k in range(6): s+=f'<circle cx="{x+10+k*w/6}" cy="{yy-9 if k%2 else yy+9}" r="4" fill="#C9B896"/>'
    return s
def golgi(x,y,s=1):
    g=f'<g transform="translate({x} {y}) scale({s})">'
    for i in range(4): g+=f'<path d="M{-50+i*4} {-30+i*18} q50 -26 100 0" fill="none" stroke="#C98A3E" stroke-width="9" stroke-linecap="round"/>'
    return g+'<circle cx="62" cy="40" r="9" fill="#D4A83C"/><circle cx="-60" cy="-36" r="8" fill="#D4A83C"/></g>'
def lyso(x,y,r=18): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#2E6A55" stroke="#3E9A78" stroke-width="3"/><circle cx="{x-5}" cy="{y-4}" r="3" fill="#E0B64A"/><circle cx="{x+6}" cy="{y+5}" r="3" fill="#E07A5F"/>'
def ribos(x,y,n=10,seed=1):
    s=''
    for i in range(n):
        a=(i*2.399+seed); r=(i*37%23)/23
        s+=f'<circle cx="{x+math.cos(a)*r*60:.0f}" cy="{y+math.sin(a)*r*40:.0f}" r="4" fill="#C9B896"/>'
    return s
def ves(x,y,r=9): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#D4A83C" stroke="#F0CC7A" stroke-width="2"/>'

# 1. dierlijke cel (overzicht)
b='<ellipse cx="450" cy="285" rx="300" ry="210" fill="#1E2A40" stroke="#8FA0B5" stroke-width="6"/>'
b+=kern(420,270,72)+ruwER(250,180,150,3)+golgi(560,370,1)+mito(300,400,0.9,-15)+mito(610,190,0.8,20)+lyso(530,450)+lyso(260,300,14)+ribos(650,300,10)+ves(640,420)+ves(680,395,7)
b+=lab(450,75,450,40,'celmembraan')+lab(400,300,100,390,'kern','middle')+lab(270,190,150,120,'ruw ER')+lab(600,385,790,430,'golgisysteem')+lab(300,420,180,500,'mitochondrium')+lab(530,465,560,525,'lysosoom')+lab(690,300,810,330,'ribosomen')+lab(700,215,800,190,'cytoplasma')
save('cel.svg','Dierlijke cel met organellen',b)

# 2. prokaryoot en eukaryoot
b='<rect x="80" y="230" width="160" height="70" rx="35" fill="#24402E" stroke="#7FC48F" stroke-width="4"/><path d="M110 265 q20 -18 40 0 t40 0 t30 0" fill="none" stroke="#E0B64A" stroke-width="3"/>'+ribos(160,265,8,3)
b+='<path d="M240 265 q30 -20 60 0 t50 0" fill="none" stroke="#7FC48F" stroke-width="2.5"/>'
b+='<text x="160" y="345" text-anchor="middle">bacterie</text><text x="160" y="372" text-anchor="middle" class="s">prokaryoot</text><text x="160" y="205" text-anchor="middle" class="s">geen kern · losse ribosomen</text>'
b+='<ellipse cx="640" cy="270" rx="220" ry="180" fill="#1E2A40" stroke="#8FA0B5" stroke-width="5"/>'+kern(620,260,58)+ruwER(470,180,110,3)+golgi(720,350,0.8)+mito(520,370,0.7,-10)+mito(760,190,0.6,25)+lyso(680,420,13)
b+='<text x="640" y="495" text-anchor="middle">jouw cel</text><text x="640" y="522" text-anchor="middle" class="s">eukaryoot · kern en organellen · ± 10× zo lang</text>'
save('proeu.svg','Bacterie naast een dierlijke cel',b)

# 3. kern
b='<circle cx="400" cy="285" r="210" fill="#2E2650" stroke="#A392D6" stroke-width="7"/><circle cx="400" cy="285" r="196" fill="none" stroke="#A392D6" stroke-width="4"/>'
for i in range(10):
    a=i/10*2*math.pi+0.2; x=400+203*math.cos(a); y=285+203*math.sin(a)
    b+=f'<circle cx="{x:.0f}" cy="{y:.0f}" r="9" fill="#121A26" stroke="#E0B64A" stroke-width="3"/>'
b+='<circle cx="460" cy="230" r="55" fill="#8C7BBF"/>'
for i in range(7):
    x0=280+i*22; b+=f'<path d="M{x0} 230 q20 30 0 60 t10 60 t-10 50" fill="none" stroke="#5BA4C9" stroke-width="3.5" opacity=".9"/>'
b+='<path d="M603 75 l70 -20" fill="none" stroke="#E0B64A" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>'
b+=lab(220,380,140,470,'dubbel kernmembraan')+lab(593,220,700,170,'kernporie')+lab(350,420,470,530,'DNA (chromatine)')+lab(480,260,700,330,'kernlichaampje')+'<text x="690" y="55" class="s">werkkopie (RNA)</text><text x="690" y="78" class="s">gaat naar buiten</text>'
save('kern.svg','Celkern met kernporiën',b)

# 4. ribosoom
b='<path d="M60 360 L840 360" stroke="#E0B64A" stroke-width="6"/>'
for i in range(26): b+=f'<rect x="{70+i*30}" y="360" width="8" height="{18 if i%3 else 26}" fill="#E0B64A"/>'
b+='<ellipse cx="450" cy="390" rx="130" ry="55" fill="#8C7A5C" stroke="#C9B896" stroke-width="4"/><ellipse cx="450" cy="300" rx="100" ry="60" fill="#A3916E" stroke="#C9B896" stroke-width="4"/>'
cols=['#E07A5F','#5BA4C9','#7FC48F','#8C7BBF','#E0B64A','#E07A5F','#7FC48F','#5BA4C9']
x,y=450,250
for i,c in enumerate(cols):
    x+= -18 if i%2 else 22; y-=26; b+=f'<circle cx="{x}" cy="{y}" r="15" fill="{c}"/>'
b+=lab(330,300,170,220,'ribosoom')+lab(780,360,780,450,'werkkopie (RNA)')+lab(482,120,620,70,'eiwit','start')+'<text x="620" y="96" class="s">keten van aminozuren</text>'
b+='<text x="40" y="530" class="s">leest de werkkopie en zet aminozuren in de goede volgorde</text>'
save('ribosoom.svg','Ribosoom maakt een eiwit',b)

# 5. ruw en glad ER
b='<line x1="450" y1="40" x2="450" y2="520" stroke="#34405A" stroke-width="2"/>'
b+=ruwER(90,170,280,6)
for i in range(5):
    b+=f'<path d="M{540+i*10} {150+i*55} q60 -30 120 10 t120 -10" fill="none" stroke="#AFC0D0" stroke-width="12" stroke-linecap="round"/>'
b+='<text x="230" y="80" text-anchor="middle">ruw ER</text><text x="230" y="110" text-anchor="middle" class="s">met ribosomen</text><text x="680" y="80" text-anchor="middle">glad ER</text><text x="680" y="110" text-anchor="middle" class="s">zonder ribosomen</text>'
b+='<text x="230" y="470" text-anchor="middle" class="s">eiwitten voor buiten de cel,</text><text x="230" y="495" text-anchor="middle" class="s">het membraan en lysosomen</text>'
b+='<text x="680" y="470" text-anchor="middle" class="s">vetten, fosfolipiden, hormonen</text><text x="680" y="495" text-anchor="middle" class="s">lever: ontgiften</text>'
save('er.svg','Ruw ER en glad ER',b)

# 6. golgisysteem
b=''
for i in range(5):
    y=150+i*55; w=360-i*20
    b+=f'<path d="M{450-w/2} {y} q{w/2} -50 {w} 0" fill="none" stroke="#C98A3E" stroke-width="18" stroke-linecap="round"/>'
b+=ves(250,120,14)+ves(300,95,12)+'<path d="M180 70 L240 110" class="l"/>'
b+=ves(640,420,14)+ves(600,460,12)+ves(300,430,14)
b+='<text x="140" y="60">blaasje uit het ER</text><text x="150" y="160" class="s">cis-kant</text><text x="150" y="400" class="s">trans-kant</text>'
b+='<path d="M650 420 L760 470" class="l"/><text x="770" y="500" text-anchor="middle">naar het membraan</text><path d="M300 430 L220 480" class="l"/><text x="200" y="510" text-anchor="middle">naar een lysosoom</text>'
b+='<path d="M730 140 L730 360" stroke="#E0B64A" stroke-width="4"/><path d="M730 370 l-12 -20 h24z" fill="#E0B64A"/><text x="760" y="230" class="s">bewerken</text><text x="760" y="258" class="s">labelen</text><text x="760" y="286" class="s">sorteren</text>'
save('golgi.svg','Golgisysteem met blaasjes',b)

# 7. cristae vergelijken
def mitoGroot(x,y,n):
    s=f'<ellipse cx="{x}" cy="{y}" rx="160" ry="80" fill="#5A2E2A" stroke="#E8A08C" stroke-width="5"/>'
    step=280/(n+1)
    for i in range(n):
        xx=x-140+step*(i+1); top=i%2==0
        s+=f'<rect x="{xx-7:.0f}" y="{y-66 if top else y-6}" width="14" height="72" rx="7" fill="#5A2E2A" stroke="#D86A5A" stroke-width="4"/>'
    return s
b=mitoGroot(230,250,14)+mitoGroot(670,250,3)
b+='<text x="230" y="380" text-anchor="middle">hartspiercel</text><text x="230" y="408" text-anchor="middle" class="s">veel cristae · duizenden mitochondriën</text>'
b+='<text x="670" y="380" text-anchor="middle">witte vetcel</text><text x="670" y="408" text-anchor="middle" class="s">weinig cristae · weinig mitochondriën</text>'
b+='<text x="450" y="500" text-anchor="middle" class="s">meer binnenmembraan = meer plek om ATP te maken</text>'
save('cristae.svg','Mitochondrium van hartspiercel en vetcel',b)

# 8. vacuole: stevig en slap
def plantcel(x,y,v):
    w,h=300,220
    s=f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="14" fill="none" stroke="#7FC48F" stroke-width="10"/>'
    if v:
        s+=f'<rect x="{x-w/2+10}" y="{y-h/2+10}" width="{w-20}" height="{h-20}" rx="10" fill="#1E2A40" stroke="#8FA0B5" stroke-width="3"/><rect x="{x-w/2+40}" y="{y-h/2+36}" width="{w-80}" height="{h-72}" rx="30" fill="#2E5C8A" stroke="#5BA4C9" stroke-width="3"/>'
        for a in (0,1.57,3.14,4.71): s+=f'<path d="M{x+math.cos(a)*90:.0f} {y+math.sin(a)*60:.0f} l{math.cos(a)*30:.0f} {math.sin(a)*22:.0f}" stroke="#E0B64A" stroke-width="4"/>'
    else:
        s+=f'<path d="M{x-110} {y-60} q110 -20 220 10 q20 60 -20 110 q-100 20 -190 -10 q-30 -50 -10 -110z" fill="#1E2A40" stroke="#8FA0B5" stroke-width="3"/><ellipse cx="{x}" cy="{y+5}" rx="60" ry="34" fill="#2E5C8A" stroke="#5BA4C9" stroke-width="3"/>'
    return s
b=plantcel(230,250,True)+plantcel(670,250,False)
b+='<text x="230" y="410" text-anchor="middle">vacuole vol water</text><text x="230" y="438" text-anchor="middle" class="s">drukt tegen de celwand: stevig</text>'
b+='<text x="670" y="410" text-anchor="middle">water kwijt</text><text x="670" y="438" text-anchor="middle" class="s">geen druk: de plant hangt slap</text>'
b+='<text x="40" y="70" class="s">celwand</text><path class="l" d="M110 75 L90 140"/><text x="450" y="520" text-anchor="middle" class="s">vacuole: celvocht met water, zouten, suikers en afval</text>'
save('vacuole.svg','Plantencel met volle en lege vacuole',b)

# 9. celmembraan
b=''
for row,yy,up in ((0,250,True),(1,320,False)):
    for i in range(30):
        x=40+i*28
        if 380<x<470 or 610<x<690: continue
        hy=yy-12 if up else yy+12
        b+=f'<circle cx="{x}" cy="{hy}" r="11" fill="#5BA4C9"/><path d="M{x-4} {yy+(2 if up else -2)} l0 {30 if up else -30} M{x+4} {yy+(2 if up else -2)} l0 {30 if up else -30}" stroke="#C9B896" stroke-width="3"/>'
b+='<rect x="388" y="215" width="74" height="140" rx="20" fill="#3E7A5A" stroke="#7FC48F" stroke-width="3"/><rect x="415" y="215" width="20" height="140" fill="#121A26"/>'
b+='<path d="M618 360 L618 210 q32 -50 64 0 L682 360z" fill="#6E5A9E" stroke="#A392D6" stroke-width="3"/><path d="M650 160 l-18 -30 h36z" fill="#E0B64A"/>'
for x in (150,240,330): b+=f'<circle cx="{x}" cy="120" r="9" fill="#E07A5F"/>'
b+='<circle cx="425" cy="130" r="9" fill="#7FC48F"/><path class="l" d="M425 145 L425 200"/>'
b+=lab(90,250,90,170,'')+'<text x="40" y="170">fosfolipiden</text>'+lab(462,280,540,470,'kanaal')+lab(682,250,780,470,'receptor')+'<text x="690" y="115" class="s">hormoon past erop</text>'
b+='<text x="40" y="60" class="s">buiten de cel</text><text x="40" y="520" class="s">binnen de cel</text>'
save('membraan.svg','Celmembraan met kanaal en receptor',b)

# 10. cytoskelet
b='<ellipse cx="450" cy="280" rx="390" ry="230" fill="#1E2A40" stroke="#8FA0B5" stroke-width="5"/>'
for i in range(9):
    a=i/9*math.pi*2; b+=f'<path d="M450 280 Q{450+math.cos(a+0.3)*200:.0f} {280+math.sin(a+0.3)*120:.0f} {450+math.cos(a)*370:.0f} {280+math.sin(a)*215:.0f}" fill="none" stroke="#5BA4C9" stroke-width="3" opacity=".8"/>'
for i in range(7):
    b+=f'<path d="M{120+i*100} 120 l{40} {320}" stroke="#7FC48F" stroke-width="2" opacity=".5"/>'
b+=kern(450,280,55)
# motor met blaasje
b+='<g transform="translate(640 175) rotate(-31)"><circle cx="0" cy="-40" r="22" fill="#D4A83C" stroke="#F0CC7A" stroke-width="3"/><path d="M-6 -18 l-10 18 M6 -18 l10 18" stroke="#E07A5F" stroke-width="5" stroke-linecap="round"/></g>'
b+=lab(660,140,760,60,'motoreiwit met blaasje')+lab(300,220,170,90,'eiwitdraden')
b+='<text x="450" y="545" text-anchor="middle" class="s">geeft vorm · rails voor blaasjes en organellen · beweging</text>'
save('cytoskelet.svg','Cytoskelet met motoreiwit',b)

# 11. plant en dier
b='<ellipse cx="230" cy="270" rx="190" ry="160" fill="#1E2A40" stroke="#8FA0B5" stroke-width="5"/>'+kern(210,260,48)+mito(140,360,0.6,-10)+golgi(300,330,0.6)+lyso(300,190,12)+ruwER(120,170,90,2)
b+='<rect x="480" y="100" width="360" height="340" rx="16" fill="none" stroke="#7FC48F" stroke-width="12"/><rect x="492" y="112" width="336" height="316" rx="10" fill="#1E2A40" stroke="#8FA0B5" stroke-width="3"/><rect x="560" y="170" width="200" height="200" rx="40" fill="#2E5C8A" stroke="#5BA4C9" stroke-width="3"/>'
b+=kern(530,150,30)+mito(790,400,0.5,10)
for (x,y) in ((520,300),(800,200),(780,320),(520,400)): b+=f'<ellipse cx="{x}" cy="{y}" rx="28" ry="16" fill="#3E7A4A" stroke="#7FC48F" stroke-width="3"/>'
b+='<text x="230" y="480" text-anchor="middle">dierlijke cel</text><text x="660" y="480" text-anchor="middle">plantencel</text>'
b+='<text x="660" y="510" text-anchor="middle" class="s">+ celwand · chloroplasten · grote vacuole</text><text x="230" y="510" text-anchor="middle" class="s">lysosomen</text>'
save('plantdier.svg','Dierlijke cel en plantencel naast elkaar',b)

# 12. fotosynthese: twee plekken
b='<rect x="60" y="100" width="300" height="380" rx="30" fill="#24402E" stroke="#7FC48F" stroke-width="4"/>'
for i in range(6): b+=f'<rect x="110" y="{140+i*52}" width="200" height="38" rx="19" fill="#3E7A4A" stroke="#9AD6A6" stroke-width="3"/>'
b+='<text x="210" y="80" text-anchor="middle">thylakoïdmembraan</text><text x="210" y="515" text-anchor="middle" class="s">lichtreactie</text>'
b+='<rect x="540" y="100" width="300" height="380" rx="30" fill="#1E2A40" stroke="#8FA0B5" stroke-width="4"/><circle cx="690" cy="290" r="90" fill="none" stroke="#E0B64A" stroke-width="6" stroke-dasharray="30 12"/>'
b+='<text x="690" y="80" text-anchor="middle">stroma</text><text x="690" y="515" text-anchor="middle" class="s">Calvin-cyclus</text><text x="690" y="298" text-anchor="middle" class="s">CO₂ → glucose</text>'
b+='<path d="M370 240 L530 240" stroke="#E0B64A" stroke-width="5"/><path d="M530 240 l-18 -12 v24z" fill="#E0B64A"/><text x="450" y="225" text-anchor="middle" class="s">ATP + NADPH</text>'
b+='<text x="20" y="40" class="s">licht + H₂O → O₂</text>'
save('fotosynthese.svg','Lichtreactie en Calvin-cyclus',b)
print('ok')

import json,re,shutil,os
H='/home/claude/hw'; T=open(f'{H}/blad/sjabloon/index.html').read()
DROP={'bi2':['s03'],'bi3':['s03','s05'],'bi4':['s11']}
META={
'bi1':dict(duur=7.5,keuzes=["Winnaar blind: A klassiek (46–42–39), sushibakje 'blauwvintonijn' blijkt geelvintonijn; uit C de slotzin 'mensen bedachten wat er gezocht moest worden', uit B de te late start in de code.","Frisse review: 6 correcties (zie de scènes met '!'), code in beeld is echte Python (MALWMR).","Schatting ± 7,5 min: iets boven de richtwaarde van 6–7 min."]),
'bi2':dict(duur=7,keuzes=["Winnaar blind: A klassiek (48–46–42) met de vragen van de ouders uit B. C viel af: een raadsel met een ziek kind voelt als een spel.","Sam zit niet bij het uitslaggesprek (privacy, één film = één dag); hartziekte i.p.v. diabetes als brug naar GWAS (diabetes zit al in Wat heb jij aan DNA?).","Recap: vaste reekszin + 'klinisch geneticus word je na geneeskunde, met een vervolgopleiding van vier jaar' (KNMG)."]),
'bi3':dict(duur=8,keuzes=["Winnaar blind: A klassiek (44–41–40): de echte casus van 96 Brabantse zorgmedewerkers (maart 2020, Sikkema e.a.) als kader.","Vragen staan in eigen alinea's; met Vragen uit blijven alleen opzetzinnen over (getest). Geen antwoordletters uitgesproken: die botsen met de monsters A–E.","Moleculaire klok één zin, stamboom lezen niet herhaald (Evolutie 7 en 8)."]),
'bi4':dict(duur=7.5,keuzes=["Winnaar blind: C grote mutatie (43–42–41): Sam voorspelt een vorm zoals in de CASP-wedstrijd, de gemeten vorm zit in een verzegelde envelop die in H4 opengaat.","Frisse review: 2 correcties (cryo-EM, AlphaFold 3), zie de scènes met '!'.","Echte personen (Nobelprijs 2024) alleen als naamkaartje, geen portret."])}
OVR={('bi1','s01'):dict(titel="Wie loopt mee? Sam of Daan",twijfel="Sam is sinds vandaag (ander account) al stagiair in Biotechnologie. In deze reeks loopt hij nu een meeloopweek bio-informatica, met Dr. Kim als begeleider.",waarom="Twee aangrenzende vakken met dezelfde stagiair verwarren de kijker, en ROLLEN.md zegt: zelfde rol = zelfde personage. Dit raakt alle vier de films, dus het is jouw keuze.",voorstel="Mijn advies: Daan (15) loopt de meeloopweek. Hij speelt al in Toeval of echt?, de film die bij dit gebied hoort, en in Brein en computer. Ik wissel dan in alle vier de films Sam voor Daan (vóór het inspreken, dus zonder kosten). Of: Sam houden."),
('bi2','s14'):dict(twijfel="Wie spelen de ouders in het uitslaggesprek? Voorlopig getekend: Erik en Joost als twee vaders.",waarom="Erik was de verdachte in Forensisch 2 en Joost (55) is oud naast een kind van 4; een nieuw ouderpaar is een nieuw personage. Dit is een gevoelig gesprek, dus jouw keuze.",voorstel="Mijn advies: geen ouders in beeld. Sam wacht op de gang en Dr. Kim vertelt hem hoe zo'n gesprek gaat (zie de volgende kaart). Anders: twee nieuwe figuranten van ± 35 jaar.")}
FILMS=[]; n=0
for i,d in enumerate(['bi1','bi2','bi3','bi4'],1):
    f=json.load(open(f'{H}/{d}/film.json')); tw=json.load(open(f'{H}/{d}/blad/twijfels.json'))
    seen=set(); sc=[]
    for t in tw:
        if t['id'] in DROP.get(d,[]) : continue
        if t['id'] in seen: continue
        seen.add(t['id'])
        o=OVR.get((d,t['id']),{})
        sid=f"b{i}{t['id']}"
        src=f"{H}/{d}/{t['img']}"
        if os.path.exists(src): shutil.copy(src,f'{H}/blad/pub/img/{sid}.webp')
        else: print('MISSING',src)
        v=o.get('voorstel',t.get('voorstel',''))
        sc.append(dict(id=sid,hoofdstuk=o.get('titel',t['titel']),laag='basis',look='',tekst=t['zin'],beweging=('Voorstel · '+v) if v else '',twijfel=o.get('twijfel',t['twijfel']),waarom=o.get('waarom',t['waarom'])))
        if (d,t['id'])==('bi2','s14'):
            shutil.copy(f'{H}/bi2/blad/img/s14_alt.webp',f'{H}/blad/pub/img/b2s14alt.webp')
            sc.append(dict(id='b2s14alt',hoofdstuk="Alternatief: Dr. Kim vertelt het Sam",laag='basis',look='',tekst="(zelfde tekst; de ouders niet in beeld, Sam en Dr. Kim op de gang)",beweging='',twijfel="Variant zonder ouders in beeld.",waarom="Kies deze kaart (✓) als je dit wilt; dan vervalt ook de 'hand op hand'-twijfel hieronder."))
    hs=[dict(nr=k+1,titel=m.get('titel',m) if isinstance(m,dict) else '',minivraag=m.get('vraag','') if isinstance(m,dict) else str(m)) for k,m in enumerate(f.get('minis',[]))]
    FILMS.append(dict(film=i,titel=f['title'],slug=f['slug'],puzzel=f['puzzle'],haak=f.get('endHaak',''),duur=dict(basis_min=META[d]['duur']),hoofdstukken=[],keuzes=META[d]['keuzes'],scenes=sc))
    n+=len(sc)
js=json.dumps(FILMS,ensure_ascii=False)
T=re.sub(r'const FILMS = \[.*?\];\n', lambda m:'const FILMS = '+js+';\n', T, count=1, flags=re.S)
T=T.replace('<title>Storyboards Forensisch onderzoek</title>','<title>Twijfelscènes Bio-informatica</title>')
T=T.replace('Wat word jij? · Forensisch onderzoek · drie films · alleen de scènes waar ik over twijfel','Wat word jij? · Bio-informatica · vier films · alleen de scènes waar ik over twijfel')
T=T.replace('<h1>Storyboards Forensisch onderzoek</h1>','<h1>Twijfelscènes Bio-informatica</h1>')
T=T.replace("'Film ' + f.film + ' van 3 · '","'Film ' + f.film + ' van 4 · '").replace("'film-fo' + f.film","'film-bi' + f.film")
T=T.replace('<button id="f-vwo" aria-pressed="false" data-f="vwo">Vwo-blokken</button>','')
T=T.replace("Per scène het keyframe, de vertelregel en wat de twijfel is.","Per scène het keyframe (op voorlopige tijden, nog zonder stem), de vertelregel, wat de twijfel is en mijn voorstel. Kaarten met '!' zijn feitcorrecties uit de bronnenreview: die staan al zo in het script, jij bevestigt ze.")
if '<meta name="claude:viewport-fit-sides"' not in T[:3000]: T=T.replace('<title>','<meta name="claude:viewport-fit-sides" content="cover">\n<title>',1)
open(f'{H}/blad/pub/index.html','w').write(T)
print('scenes',n,[len(x['scenes']) for x in FILMS])

# Per-film settings for the DNA series (Part C build)
import re
SITE='/home/claude/biologie-/films/dna/'
import os
HERE=os.path.dirname(os.path.abspath(__file__))
def old_teacher(fname):  # docentdeel (pauzes, vereenvoudigingen, leerdoelen) staat als vast HTML-blok in data/
    n=fname[0]; return open(os.path.join(HERE,'data',f'afl{n}_docent.htmlfrag'),encoding='utf-8').read()
def how(rows):
    return ('<details open><summary>Hoe de film het uitlegt</summary><table><tr><th>Hoofdstuk</th><th>Type</th><th>Look (Part C)</th><th>Kernbeeld</th><th>Misconceptie</th></tr>'
            + ''.join('<tr>'+''.join(f'<td>{c}</td>' for c in r)+'</tr>' for r in rows) + '</table></details>')
SERIES=[('1-wat-is-dna.html','Wat is DNA?'),('2-dna-kopieren.html','DNA kopiëren'),('3-van-dna-naar-eiwit.html','Van DNA naar eiwit'),('4-de-genetische-code-lezen.html','De genetische code lezen')]
def seriesline(cur):
    parts=[]
    for k,(f,t) in enumerate(SERIES,1):
        parts.append(f'<b>{k} {t}</b>' if k==cur else f'<a href="{f}" style="color:var(--text2)">{k} {t}</a>')
    parts.append('<span>'+str(len(SERIES)+1)+'–8 volgen</span>')
    return '<div class="meta" style="margin:-4px 0 10px;letter-spacing:.06em;text-transform:none;font-size:13px">Reeks DNA: '+' · '.join(parts)+'</div>'
LEGEND=[('#C9BEEB','adenine (A) · punt'),('#9F90D4','thymine (T) · inkeping'),('#6C5BA8','cytosine (C) · nok'),('#4F3F86','guanine (G) · sleuf'),('#3E3366','suiker-fosfaatruggengraat'),('#7A8BA8','enzym (goud = actief centrum)'),('#E07A5F','let op / mutatie'),('#E0B64A','focus')]
FOOT='Stem: Roos (ElevenLabs, eleven_multilingual_v2). Script, animatie en speler: Kamiel met Claude; illustraties door Claude volgens de stijlkaart (Part C). Bronnen: Biologie voor Jou havo thema 9, Nectar vwo H17, Alberts <em>Molecular Biology of the Cell</em>{extra}. Versie 2.0 · 12 oktober 2026 (Part C-look; 1.x had de stijl Papier en inkt).'
FILMS={
 1:{'file':'1-wat-is-dna.html','title':'Wat is DNA? · DNA aflevering 1','headmeta':'Biologie bij Kamiel · reeks DNA · film 1 van 8 · havo + vwo','lead':'Twee meter DNA in elke cel. Hoe past dat, en wat staat erop? Onderdelen met <span class="tag">vwo</span> zijn alleen vwo-stof; in de havo-stand worden ze overgeslagen.',
    'film':{'title':'Wat is DNA?','sub':'DNA · aflevering 1','puzzle':'Een wattenstaafje langs je wang. In elke cel die eraan blijft hangen zit twee meter DNA. Hoe past dat?','meta':'dna 1/8','titleLook':'micro',
            'mini':{'Hoofdstuk 1 — Van wang tot molecuul':'Waar zit het DNA in je cel?','Hoofdstuk 2 — De bouwsteen en de ladder':'Waar is DNA van gemaakt?','Hoofdstuk 3 — Van volgorde tot gen tot genoom':'Waar staat de informatie?','Hoofdstuk 4 — Richting, bruggen en verpakking':'Hoe zit de ladder precies in elkaar?','Samenvatting — Terug naar het wattenstaafje':'Wat hebben we gezien?'},
            'endLines':['DNA is een ladder van nucleotiden: A–T en C–G.','De volgorde van de basen is de informatie.','Opgewikkeld past twee meter in een kern van zes micrometer.'],'endHaak':'ken je één streng, dan ken je de andere','next':'Volgende: DNA kopiëren',
            'footer':'biologie bij kamiel · reeks dna 1/8 · stem: roos (elevenlabs) · versie 2.0 · oktober 2026'},
    'legend':LEGEND,'seriesline':seriesline(1),'footer':FOOT.format(extra=', Ensembl GRCh38'),
    'teacher_how':how([
      ['Opening','I toepassing','Macro → zoomcirkel → Micro','wattenstaafje, wangcellen, celkern met 46 draden','—'],
      ['1 Van wang tot molecuul','B structuur, schaal','Micro (+ Macro-figuur bij de lengte)','continue zoom cel → kern; 46 uitgerolde draden; één draad recht getrokken','chromosomen zijn altijd staafjes'],
      ['2 Bouwsteen en ladder','B + A','Micro','uitvergrote nucleotide; simulatie waarin losse nucleotiden alleen op hun partner blijven hangen; de paarrand (punt/inkeping, nok/sleuf) laat zien wat past','beide strengen bevatten dezelfde volgorde'],
      ['3 Volgorde, gen, genoom','B organisatieniveaus','Micro + Schema-kaart','één groeiend schema base → genoom; 2 % coderend','niet-coderend DNA is nutteloos; DNA zit alleen in de kern'],
      ['4 Richting, bruggen, verpakking <span class="tag">vwo</span>','B + A','Micro','genummerde suiker; waterstofbruggen; smelt-vergelijking AT-rijk vs GC-rijk; wikkelen om histonen','strengen lopen in dezelfde richting'],
      ['Samenvatting','—','Micro','terug naar wang en kern','—']]),
    'teacher_rest':old_teacher('1-wat-is-dna.html')},
 2:{'file':'2-dna-kopieren.html','title':'DNA kopiëren · DNA aflevering 2','headmeta':'Biologie bij Kamiel · reeks DNA · film 2 van 8 · havo + vwo','lead':'Twee meter DNA, foutloos gekopieerd in een paar uur. Hoe doet een cel dat? Onderdelen met <span class="tag">vwo</span> zijn alleen vwo-stof; in de havo-stand worden ze overgeslagen.',
    'film':{'title':'DNA kopiëren','sub':'DNA · aflevering 2','puzzle':'Een schaafwond is na een week dicht. Elke nieuwe huidcel kreeg twee meter DNA, foutloos gekopieerd in een paar uur. Hoe doe je dat?','meta':'dna 2/8','titleLook':'micro',
            'mini':{'Hoofdstuk 1 — Wanneer en waarom':'Wanneer kopieert een cel haar DNA?','Hoofdstuk 2 — Eén streng is genoeg':'Hoe maak je van één ladder twee?','Hoofdstuk 3 — Twee uit één':'Hoe snel, en hoe precies?','Hoofdstuk 4 — Richting en halfnieuw':'Wat is oud, wat is nieuw, en welke kant op?','Samenvatting — Terug naar de schaafwond':'Wat hebben we gezien?'},
            'endLines':['De cel kopieert haar DNA vóór de deling, in de S-fase.','Helicase opent de ladder; elke streng is een voorbeeld.','DNA-polymerase koppelt wat past: twee gelijke moleculen.'],'endHaak':'ken je één streng, dan ken je de andere','next':'Volgende: van DNA naar eiwit',
            'footer':'biologie bij kamiel · reeks dna 2/8 · stem: roos (elevenlabs) · versie 2.0 · oktober 2026'},
    'legend':LEGEND+[('#8CC6E1','primer (RNA)')],'seriesline':seriesline(2),'footer':FOOT.format(extra=', Meselson &amp; Stahl 1958'),
    'teacher_how':how([
      ['Opening','I toepassing','Macro → zoomcirkel → Micro','knie met schaafwond die heelt; huidcellen die delen','—'],
      ['1 Wanneer en waarom','C proces in de tijd','Micro → Schema-kaart','cel die deelt; celcyclusklok met S- en M-fase','kopiëren tijdens de deling'],
      ['2 Eén streng is genoeg','A mechanisme','Micro','simulatie: helicase ritst open, vrije nucleotiden blijven alleen op hun partner hangen, polymerase koppelt','het enzym kiest de base'],
      ['3 Twee uit één','C proces in de tijd','Micro + Schema-kaart','twee identieke moleculen met de oude streng omlijnd; 50 per seconde tegenover 3 miljard; duizenden startpunten; telomeer; de eerste kopieerfout','kopiëren is foutloos; alleen genen worden gekopieerd'],
      ['4 Richting en halfnieuw <span class="tag">vwo</span>','A + G','Micro + Schema (proef, tabel)','Meselson-Stahl als voorspelvraag; antiparallel en 5′→3′; primer en primase; replicatievork met leidende en volgende streng; drie polymerasen; repair','conservatieve replicatie; beide strengen gelijk gebouwd'],
      ['Samenvatting','—','Macro → Micro','terug naar de knie; de stappen op een rij','—']]),
    'teacher_rest':old_teacher('2-dna-kopieren.html')},
 3:{'file':'3-van-dna-naar-eiwit.html','title':'Van DNA naar eiwit · DNA aflevering 3','headmeta':'Biologie bij Kamiel · reeks DNA · film 3 van 8 · havo + vwo','lead':'Een mRNA-vaccin bevat alleen een recept. Hoe maakt je eigen cel daar een eiwit van? Onderdelen met <span class="tag">vwo</span> zijn alleen vwo-stof; in de havo-stand worden ze overgeslagen.',
    'film':{'title':'Van DNA naar eiwit','sub':'DNA · aflevering 3','puzzle':'Een prik met alleen een stukje mRNA, en een dag later maken je spiercellen een eiwit dat ze nog nooit maakten. Hoe volgt een cel een recept dat niet in haar eigen DNA staat?','meta':'dna 3/8','titleLook':'micro',
            'mini':{'Hoofdstuk 1 — Een gen is een recept':'Hoe komt het recept bij de ribosomen?','Hoofdstuk 2 — Transcriptie: het gen overschrijven':'Hoe maakt de cel een afschrift?','Hoofdstuk 3 — Translatie: het recept lezen':'Hoe wordt mRNA een keten van aminozuren?','Hoofdstuk 4 — Van keten naar vorm':'Wat maakt een keten tot een werkend eiwit?','Samenvatting — Terug naar de prik':'Wat gebeurt er na de prik?'},
            'endLines':['Transcriptie: in de kern schrijft RNA-polymerase een gen over naar mRNA.','Translatie: een ribosoom leest het mRNA per codon; tRNA brengt de aminozuren.','De volgorde van de aminozuren bepaalt de vorm, en de vorm de werking.'],'endHaak':'gen → mRNA → eiwit','next':'Volgende: de genetische code lezen',
            'footer':'biologie bij kamiel · reeks dna 3/8 · stem: roos (elevenlabs) · versie 1.0 · oktober 2026'},
    'legend':LEGEND+[('#5BA4C9','RNA (mRNA, tRNA)'),('#C9A35C','aminozuur / eiwit'),('#C9B896','ribosoom')],'seriesline':seriesline(3),'footer':FOOT.format(extra=', CvTE havo 2021-I (kegelslakvraag)').replace('Versie 2.0 · 12 oktober 2026 (Part C-look; 1.x had de stijl Papier en inkt).','Versie 1.0 · 12 oktober 2026.'),
    'teacher_how':how([
      ['Opening','I toepassing','Macro → zoomcirkel → Micro','prik in de bovenarm; vetbolletjes met mRNA; spiercel die een virus-eiwit maakt','in een mRNA-vaccin zit het virus of zijn eiwit'],
      ['1 Een gen is een recept','B structuur','Micro + Schema-kaart','cel met kern en ribosomen; afschrift dat de kern uit gaat; tabel DNA tegenover RNA','DNA gaat zelf naar het ribosoom'],
      ['2 Transcriptie','A mechanisme','Micro','RNA-polymerase opent het DNA, leest één streng, koppelt RNA-nucleotiden (U tegenover A); DNA sluit achter het enzym','beide strengen worden overgeschreven; mRNA bevat T'],
      ['2 vwo: promotor en splicing <span class="tag">vwo</span>','A + B','Micro (schematisch)','promotor met TATA-box; 3′→5′ lezen; pre-mRNA met exons en introns; (alternatieve) splicing','het hele DNA wordt overgeschreven'],
      ['3 Translatie','A mechanisme','Micro','ribosoom schuift over het mRNA; codons; codontabel; tRNA brengt aminozuren; keten groeit tot het stopcodon','één nucleotide per aminozuur; het stopcodon codeert een aminozuur'],
      ['3 vwo: anticodon en wiebelbase <span class="tag">vwo</span>','B + A','Micro + Schema','anticodon tegenover codon; 64 tegenover 20; vier glycinecodons; één tRNA, twee codons','elk aminozuur heeft één codon'],
      ['4 Van keten naar vorm','B structuur-functie','Micro + Schema','keten die opvouwt; enzym en receptor die passen; één ander aminozuur verandert de vorm','een keten is meteen een werkend eiwit'],
      ['Samenvatting','—','Macro → Schema','terug naar de prik; DNA → mRNA → eiwit op één kaart','mRNA-vaccin verandert je DNA']]),
    'teacher_rest':old_teacher('3-van-dna-naar-eiwit.html')},
 4:{'file':'4-de-genetische-code-lezen.html','title':'De genetische code lezen · DNA aflevering 4','headmeta':'Biologie bij Kamiel · reeks DNA · film 4 van 8 · havo + vwo','lead':'Hoe leest een bacterie het recept van een mens? Over het tRNA als werktuig, de codontabel en terugredeneren met echte examenvragen. Onderdelen met <span class="tag">vwo</span> zijn alleen vwo-stof; in de havo-stand worden ze overgeslagen.',
    'film':{'title':'De genetische code lezen','sub':'DNA · aflevering 4','puzzle':'Mensen met diabetes spuiten insuline die bacteriën maken: een menselijk eiwit, gemaakt in een bacterie. Hoe kan een bacterie het recept van een mens lezen?','meta':'dna 4/8','titleLook':'micro',
            'mini':{'Hoofdstuk 1 — Wie vertaalt de code?':'Hoe komt het juiste aminozuur bij een codon?','Hoofdstuk 2 — De codontabel lezen':'Welke aminozuren horen bij een rij basen?','Hoofdstuk 3 — Beginnen bij het DNA':'Wat doe je als je het DNA krijgt?','Hoofdstuk 4 — Terugredeneren':'Welke base is veranderd?','Samenvatting — Terug naar de insuline':'Hoe leest een bacterie een menselijk gen?'},
            'endLines':['Het mRNA is het recept; het tRNA is het werktuig dat de code vertaalt.','Lees vanaf AUG per drie tot een stopcodon; zoek altijd met U, nooit met T.','Terugredeneren: schrijf alle codons op en zoek het paar met één verschil.'],'endHaak':'recept: mRNA · werktuig: tRNA','next':'Volgende: mutaties',
            'footer':'biologie bij kamiel · reeks dna 4/8 · stem: roos (elevenlabs) · versie 1.0 · oktober 2026'},
    'legend':LEGEND+[('#5BA4C9','RNA (mRNA, tRNA)'),('#C9A35C','aminozuur / eiwit'),('#C9B896','ribosoom'),('#7FC48F','bacterie')],'seriesline':seriesline(4),'footer':FOOT.format(extra=', CvTE havo 2022-II, 2024-II en 2025-I (geparafraseerd)').replace('Versie 2.0 · 12 oktober 2026 (Part C-look; 1.x had de stijl Papier en inkt).','Versie 1.1 · 12 oktober 2026.').replace('eleven_multilingual_v2','eleven_v3'),
    'teacher_how':how([
      ['Opening','I toepassing','Macro → zoomcirkel → Micro','iemand met een insulinepen; fabriekstank met bacteriën die insuline maken','—'],
      ['1 Wie vertaalt de code?','A mechanisme','Micro','groot tRNA met twee kanten; kringloop pakt · past · laat leeg los; recept tegenover werktuig','RNA is alleen informatie; het mRNA of ribosoom kiest het aminozuur'],
      ['1 vwo: anticodon en laadenzymen <span class="tag">vwo</span>','A + B','Micro','anticodon 3′→5′; enzym laadt tRNA; ribosoom controleert alleen het anticodon; ribosomaal RNA','het ribosoom controleert het aminozuur'],
      ['2 De codontabel lezen','G redeneerstappen','Schema','codontabel als vaste kaart; lezen vanaf AUG; stop; rekenen 300 + 3','lezen vanaf de eerste base; stopcodon zit niet in het mRNA'],
      ['3 Beginnen bij het DNA','G','Schema','DNA-streng → mRNA met U → tabel','met T in de tabel zoeken'],
      ['3 vwo: coderende en matrijsstreng <span class="tag">vwo</span>','G','Schema','beide strengen met 5′/3′; mRNA = coderende streng met U; andersom lezen','mRNA = complement van de coderende streng'],
      ['4 Terugredeneren','G','Schema','CE-vragen in twee kolommen codons; passend paar licht op','het is altijd de tweede base; richting omdraaien'],
      ['Samenvatting','—','Macro → Micro → Schema','zelfde tRNA in bacterie en mens; zelfde keten','—']]),
    'teacher_rest':old_teacher('4-de-genetische-code-lezen.html')},
}

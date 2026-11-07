"""Past alleen het blok van film 6 in films.py aan (aanvulling 16 okt 2026). python3 afl6/films_patch.py <films.py>"""
import sys
p=sys.argv[1]; s=open(p,encoding='utf-8').read()
R=[("'Hoofdstuk 2 — Hoe zet een cel een gen aan?':'Promotor, transcriptiefactor, polymerase'","'Hoofdstuk 2 — Hoe zet een cel een gen aan?':'Promotor, transcriptiefactor, polymerase, lac-operon'"),
 ("Takahashi & Yamanaka 2006').replace('Versie 2.0 · 12 oktober 2026 (Part C-look; 1.x had de stijl Papier en inkt).','Versie 1.0 · 13 oktober 2026.')","Takahashi & Yamanaka 2006, Jacob &amp; Monod 1961, Fire &amp; Mello 1998').replace('Versie 2.0 · 12 oktober 2026 (Part C-look; 1.x had de stijl Papier en inkt).','Versie 1.1 · 16 oktober 2026 (lac-operon en RNA-interferentie toegevoegd).')"),
 ("'footer':'biologie bij kamiel · reeks dna 6/8 · stem: roos (elevenlabs) · versie 1.0 · oktober 2026'","'footer':'biologie bij kamiel · reeks dna 6/8 · stem: roos (elevenlabs) · versie 1.1 · oktober 2026'"),
 ("      ['2 vwo: activator, repressor, enhancer <span class=\"tag\">vwo</span>','A','Schema','groene activator, koraal repressor; enhancer ver van het gen met lus','transcriptiefactoren zetten genen alleen aan'],",
  "      ['2 Het lac-operon','A mechanisme','Schema','E. coli; DNA-streep met regulatorgen, promotor, operator en drie structuurgenen; repressor (eiwitketen) op de operator, polymerase geblokkeerd; lactose bindt de repressor, die laat los; polymerase loopt, één dun mRNA voor drie genen; enzymen','de repressor zit op de promotor; lactose bindt aan het DNA; elk gen heeft een eigen promotor'],\n"
  "      ['2 vwo: activator, repressor, enhancer <span class=\"tag\">vwo</span>','A','Schema','groene activator, koraal repressor; enhancer ver van het gen met lus','transcriptiefactoren zetten genen alleen aan'],\n"
  "      ['2 vwo: RNA-interferentie <span class=\"tag\">vwo</span>','A','Schema','DNA → mRNA → eiwit met ingreep op het mRNA; microRNA (haarspeld uit eigen gen) en siRNA (geknipt uit dubbelstrengs RNA); RISC met één streng zoekt passend mRNA (baseparing); precies passend: knippen en afbreken, deels passend: translatie geblokkeerd; vergelijking met regeling van de transcriptie; onderzoek en medicijn (lever)','RNA-interferentie houdt de transcriptie tegen; siRNA verandert het DNA'],")
]
for a,b in R:
    if b in s: continue
    assert s.count(a)==1, a[:80]; s=s.replace(a,b)
open(p,'w',encoding='utf-8').write(s); print('films.py film 6 bijgewerkt')

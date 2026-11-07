"""Vragen uit: knip ook een kort antwoordwoord aan het begin van de alinea na een overgeslagen vraag
(bv. 'Trager.' na de vraag 'Wat gebeurt er met de darminhoud?'). Alleen als de eerste zin hooguit 3 woorden
heeft en elk woord voorkomt in het juiste antwoord van die vraag. Kamiel 22 okt 2026. Idempotent.
python3 scripts/kortantwoord.py [--check] [--lijst]"""
import sys, glob, re, json
MARK = '/*KORTANTW_MARK 22okt2026*/'
FN = MARK + " let naQQ=null; function korteAntwCuts(seg,q){ if(!q||!q.options||q.correct==null) return []; const w=seg.words||[]; let j=0; while(j<w.length&&!/[.?!]$/.test(w[j].t)) j++; if(j>=w.length||j>2||!w[j+1]) return []; const goed=(q.options[q.correct]||'').toLowerCase(); const ok=w.slice(0,j+1).every(x=>{ const k=x.t.toLowerCase().replace(/[^a-zà-ÿ0-9]/g,''); return k.length>1&&new RegExp('(^|[^a-zà-ÿ])'+k+'([^a-zà-ÿ]|$)').test(goed); }); if(!ok) return []; const r=w[j+1]; return [[Math.max(0,w[0].s-0.05), r.s-0.03]]; } "
A = "const cuts=knipSamen((naQ?antwCuts(seg):[])"; A2 = "const cuts=knipSamen((naQ?antwCuts(seg).concat(korteAntwCuts(seg,naQQ)):[])"
B = "else naQ=seg.chapter; }"; B2 = "else { naQ=seg.chapter; naQQ=seg; } }"
C = "function antwCuts(seg){"
check = '--check' in sys.argv; lijst = '--lijst' in sys.argv
gewijzigd = mist = 0
for p in sorted(glob.glob('films/**/*.html', recursive=True) + glob.glob('films/**/player.js', recursive=True)):
    s = open(p, encoding='utf-8').read()
    if C not in s: continue
    if MARK in s:
        continue
    if s.count(A) != 1 or s.count(B) != 1:
        mist += 1; print('past niet:', p); continue
    if check: print('nog niet:', p); gewijzigd += 1; continue
    s = s.replace(C, FN + C, 1).replace(A, A2).replace(B, B2)
    open(p, 'w', encoding='utf-8').write(s); gewijzigd += 1
    if lijst and p.endswith('.html'):
        m = re.search(r'window\.FILMDATA\s*=\s*(\{.*?\});\s*\n', s, re.S)
print(('nog te doen: ' if check else 'aangepast: ') + str(gewijzigd), '· past niet:', mist)

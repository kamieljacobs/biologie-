# script_v2.md + vragen.json + uitspraak_film.json -> segmenten.json (display + voice), tts-telling
# gebruik: python3 maak_segmenten.py <filmmap>
import re, json, sys, os
D = sys.argv[1]
src = open(os.path.join(D, 'script_v2.md'), encoding='utf-8').read()
body = src.split('\n---\n', 1)[1]
secs = re.split(r'\n## ', '\n' + body)
segments = []; seg_i = 0
for s in secs:
    s = s.strip()
    if not s: continue
    head, _, rest = s.partition('\n')
    chapter = re.sub(r'\s*\[.*?\]\s*$', '', head).strip()
    level = 'basis'; buf = []
    def flush():
        global seg_i
        if not buf: return
        seg_i += 1
        segments.append({'id': f's{seg_i:02d}', 'chapter': chapter, 'level': level, 'kind': 'speech', 'lines': list(buf)}); buf.clear()
    for l in [x.strip() for x in rest.split('\n')]:
        if not l: flush(); continue
        if l.startswith('[VWO-START]'):
            flush(); level = 'vwo'; l = l.replace('[VWO-START]', '').strip()
        end = l.endswith('[VWO-END]')
        if end: l = l.replace('[VWO-END]', '').strip()
        if l.startswith('[VRAAG]'):
            flush(); seg_i += 1
            opts = [re.sub(r'^\(?[a-d]\)\s*', '', o.strip()) for o in l.replace('[VRAAG]', '').split('·')]
            segments.append({'id': f'q{seg_i:02d}', 'chapter': chapter, 'level': level, 'kind': 'question', 'options': opts})
        elif l: buf.append(l)
        if end: flush(); level = 'basis'
    flush()
central = json.load(open('/home/claude/wt-33c/films/uitspraak.json', encoding='utf-8'))
fp = os.path.join(D, 'uitspraak_film.json')
film = json.load(open(fp, encoding='utf-8')) if os.path.exists(fp) else []
def voice(t):
    for a, b in film: t = re.sub(a, b, t)          # film-eigen regels (op de hele tekst)
    toks = t.split(' ')
    out = []
    for tok in toks:
        for a, b in central:
            n = re.sub(a, b, tok)
            if n != tok: tok = n; break
        out.append(tok)
    return ' '.join(out)
vq = list(json.load(open(os.path.join(D, 'vragen.json'), encoding='utf-8')).values()); qi = 0
qi = 0
for seg in segments:
    if seg['kind'] == 'speech':
        seg['display'] = ' '.join(seg['lines']); seg['voice'] = voice(seg['display'])
    else:
        v = vq[qi]; qi += 1; seg['q'] = v['q']; seg['correct'] = 'abc'.index(v['goed']); seg['explain'] = v['uitleg']
        assert len(seg['options']) == 3
json.dump(segments, open(os.path.join(D, 'segmenten.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
sp = [s for s in segments if s['kind'] == 'speech']
w = sum(len(s['display'].split()) for s in sp); wb = sum(len(s['display'].split()) for s in sp if s['level'] == 'basis')
ch = sum(len(s['voice']) for s in sp)
print(f"{len(sp)} takes; woorden {w} (basis {wb}, uitdaging {w-wb}); ± {w/2.35/60:.1f} min narratie; tekens TTS {ch}")
for s in segments:
    if s['kind'] == 'speech' and s['voice'] != s['display']:
        print(' ', s['id'], 'voice wijkt af:', [ (a,b) for a,b in zip(s['display'].split(), s['voice'].split()) if a!=b ])
open(os.path.join(D, 'tts_schatting'), 'w').write(f"Tekens stem-invoer (alle voice-teksten, {len(sp)} takes): {ch}\nWoorden: {w} (basis {wb}, uitdaging {w-wb})\nGeschatte narratie: {w/2.35:.0f} s\nCredits TTS ≈ {ch} (eleven_v4, 1 credit per teken); Scribe ≈ 5,5 credits per seconde audio ≈ {w/2.35*5.5:.0f}\n")

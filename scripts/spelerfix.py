#!/usr/bin/env python3
"""Spelerfix (20 okt 2026): bij Vragen uit geen restje van de gesproken vraag meer, en kortere hoofdstukkaart.

Gebruik:
    python3 scripts/spelerfix.py [bestand ...]      # zonder argumenten: alle films + bronnen in de repo
    python3 scripts/spelerfix.py --check [bestand ...]

Werkt op film-HTML's én op spelerbronnen (player.js, player_block.html, page.html). Idempotent:
een bestand dat de fix al heeft (marker SPELERFIX_MARK) wordt niet nog eens aangepast.

FILMDATA-speler (hoofdengine, DNA-bouwstraat, onderbouw-Uitgelegd-engine; zie films/BRONMAPPEN.md):
  1. knipMarge(seg,cuts): een knip die op een zinsgrens begint, begint 0,25 s vóór het eerste
     woord (Scribe-starttijden liggen tot 0,12 s te laat; de pauze tussen zinnen is >= 0,26 s),
     maar nooit vóór (vorig woord.s + 0,1). Het hervatpunt na een knip ligt 0,1 s vóór het woord.
  2. knipCheck(it): demp de audio (muted) al iets vóór het knippunt (vooruitkijken 0,03 s x snelheid),
     spring dan; demping blijft tot 'seeked' + 40 ms. Loopt de knip tot het einde van de alinea,
     dan pauzeren en direct door naar het volgende item (geen seek naar het einde).
     Controle in requestAnimationFrame (tick) én in 'timeupdate' (achtergrondtabblad).
  3. Hoofdstukkaart: CARD_DUR 2,2 -> 1,3 s (haaienfilm 3,5 -> 1,8 s); de kaart loopt niet sneller
     dan 1x mee met de afspeelsnelheid (bij 1,5x blijft hij 1,3 s), fades 0,3 s.
De oudere bouwvormen (window.FILM, const TL, __TIMELINE__, TIMELINE, Onderzoek doen, DNA-technieken)
krijgen hun eigen variant; zie /home/claude/hw/SPELER_FIX.md.
"""
import re, sys, glob, os

MARK = 'SPELERFIX_MARK'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- FILMDATA-speler
FD_HELPERS_V1 = (
    "/*SPELERFIX_MARK v1 20okt2026*/ "
    "function knipMarge(seg,cuts){ const w=seg.words||[]; "
    "for(const c of cuts){ const i=w.findIndex(x=>x.s>=c[0]-0.001); "
    "if(i>0&&/[.?!]$/.test(w[i-1].t)) c[0]=Math.max(Math.min(c[0],w[i].s-0.25),w[i-1].s+0.1); "
    "else if(i===0) c[0]=Math.min(c[0],Math.max(0,w[0].s-0.25)); "
    "const j=w.findIndex(x=>x.s>=c[1]-0.001); "
    "if(j>0&&w[j].s-c[1]<0.12&&/[.?!]$/.test(w[j-1].t)) c[1]=Math.max(Math.min(c[1],w[j].s-0.1),w[j-1].s+0.1,c[0]); } "
    "const m=knipSamen(cuts); cuts.length=0; m.forEach(x=>cuts.push(x)); return cuts; } "
)
# v2: knipgrenzen op de echte stilte in de audio (fetch + decodeAudioData, 10 ms-energie), anders een marge van 0,18 s
FD_HELPERS = (
    "/*SPELERFIX_MARK v2 20okt2026: knippen op de echte stilte*/ "
    "const KNIP_ENV={}; "
    "function knipEnv(seg){ const u=seg.audio; if(!u||KNIP_ENV[u]) return; KNIP_ENV[u]='bezig'; "
    "try{ const OAC=window.OfflineAudioContext||window.webkitOfflineAudioContext; "
    "fetch(u).then(r=>{ if(!r.ok) throw 0; return r.arrayBuffer(); }).then(b=>new OAC(1,16000,16000).decodeAudioData(b)).then(buf=>{ "
    "const x=buf.getChannelData(0), hop=Math.round(buf.sampleRate/100), n=Math.floor(x.length/hop), e=new Float32Array(n); "
    "for(let i=0;i<n;i++){ let q=0; for(let k=i*hop;k<(i+1)*hop;k++) q+=x[k]*x[k]; e[i]=Math.sqrt(q/hop); } "
    "const so=Array.from(e).sort((a,b)=>a-b); KNIP_ENV[u]={e,thr:Math.max(0.002,(so[Math.floor(n*0.9)]||0)*0.03)}; knipHerzie(u); "
    "}).catch(()=>{ KNIP_ENV[u]='mis'; }); }catch(err){ KNIP_ENV[u]='mis'; } } "
    "function knipRun(env,t0,t1){ const e=env.e, i0=Math.max(0,Math.floor(t0*100)), i1=Math.min(e.length-1,Math.floor(t1*100)); let end=-1,run=0; "
    "for(let i=i1;i>=i0;i--){ if(e[i]<env.thr){ if(end<0) end=i; run++; } else { if(run>=3) return [(i+1)/100,(end+1)/100]; end=-1; run=0; } } "
    "return run>=3?[i0/100,(end+1)/100]:null; } "
    "function knipMin(env,t0,t1){ let b=-1,v=1e9; for(let i=Math.max(0,Math.floor(t0*100));i<=Math.min(env.e.length-1,Math.floor(t1*100));i++) if(env.e[i]<v){ v=env.e[i]; b=i; } return b<0?null:(b+0.5)/100; } "
    "function knipMarge(seg,cuts){ const w=seg.words||[], env=KNIP_ENV[seg.audio]; if(!cuts._o) cuts._o=cuts.map(c=>c.slice()); if(!env) knipEnv(seg); "
    "const goed=env&&env.e, nw=cuts._o.map(c=>c.slice()); "
    "for(const c of nw){ const i=w.findIndex(x=>x.s>=c[0]-0.001); "
    "if(i>=0&&w[i].s-c[0]<0.12&&c[0]>0.05){ const q=w[i].s, p=w[i-1], bodem=p?p.s+0.08:0; "
    "if(goed){ const r=knipRun(env,q-0.45,q+0.02); let t; if(r){ const g=r[1]-r[0]; t=g>=0.17?r[1]-0.12:r[0]+Math.min(0.05,g/2); } else t=knipMin(env,q-0.3,q+0.02); if(t!==null) c[0]=Math.max(bodem,Math.min(t,q)); } "
    "else if(!p||/[.?!:]$/.test(p.t)) c[0]=Math.max(bodem,Math.min(c[0],q-0.18)); } "
    "const j=w.findIndex(x=>x.s>=c[1]-0.001); "
    "if(goed&&j>0&&w[j].s-c[1]<0.12){ const q=w[j].s, r=knipRun(env,q-0.45,q+0.02); let t=r?Math.max(r[0],r[1]-0.03):knipMin(env,q-0.3,q+0.02); if(t!==null) c[1]=Math.max(c[0]+0.01,w[j-1].s+0.08,Math.min(t,q)); } } "
    "const m=knipSamen(nw); cuts.length=0; m.forEach(x=>cuts.push(x)); return cuts; } "
    "function knipHerzie(u){ let raak=false; for(const it of (state.items||[])){ if(it.type==='speech'&&it.seg&&it.seg.audio===u&&it.cuts&&it.cuts._o){ knipMarge(it.seg,it.cuts); it.dur=it.seg.dur-it.cuts.reduce((a,c)=>a+c[1]-c[0],0); raak=true; } } "
    "if(raak){ let t=0; for(const it of state.items){ it.start=t; t+=it.dur; } state.total=t; } } "
)
FD_CHECK = (
    "/*SPELERFIX_MARK knip*/ let knipStil=false, knipTimer=0; "
    "function knipVrij(){ clearTimeout(knipTimer); if(knipStil){ knipStil=false; audio.muted=false; } } "
    "function knipCheck(it){ const t=state.local, vooruit=0.03*(state.snelheid||1); "
    "const cc=(it.cuts||[]).find(c=>t+vooruit>=c[0]&&t<c[1]-0.03); if(!cc) return; "
    "audio.muted=true; knipStil=true; clearTimeout(knipTimer); "
    "const eind=Math.min(it.seg.dur||1e9,isFinite(audio.duration)?audio.duration:1e9); "
    "if(cc[1]>=eind-0.05){ audio.pause(); state.local=cc[1]; return; } "
    "audio.currentTime=cc[1]; state.local=cc[1]; "
    "const vrij=()=>{ clearTimeout(knipTimer); knipTimer=setTimeout(()=>{ if(knipStil){ knipStil=false; audio.muted=false; } },40); }; "
    "audio.addEventListener('seeked',vrij,{once:true}); knipTimer=setTimeout(vrij,400); } "
    "audio.addEventListener('timeupdate',()=>{ const it=state.items[state.idx]; "
    "if(!state.playing||!it||it.type!=='speech'||audio.paused) return; state.local=audio.currentTime; knipCheck(it); "
    "if(state.items[state.idx]===it&&aud2it(it,state.local)>=it.dur-0.02) next(); });\n"
)
OLD_TICK = "const cc=(it.cuts||[]).find(c=>state.local>=c[0]&&state.local<c[1]-0.03); if(cc){ audio.currentTime=cc[1]; state.local=cc[1]; }"
OLD_CARDCLOCK = "else { state.local=clockBase+(performance.now()/1000-clockStart)*state.snelheid; if(state.local>=it.dur) next(); }"
NEW_CARDCLOCK = "else { state.local=clockBase+(performance.now()/1000-clockStart)*(it.type==='card'?Math.min(1,state.snelheid):state.snelheid); if(state.local>=it.dur) next(); }"
OLD_FADE = "const a=ramp(t,0.1,0.5)*(1-ramp(t,it.dur-0.5,0.5));"
NEW_FADE = "const a=ramp(t,0.05,0.3)*(1-ramp(t,it.dur-0.3,0.3));"


def paren_end(s, i):
    """i wijst naar '(' ; geef index na de bijbehorende ')'."""
    d = 0
    q = None
    while i < len(s):
        ch = s[i]
        if q:
            if ch == '\\':
                i += 2
                continue
            if ch == q:
                q = None
        elif ch in '\'"`':
            q = ch
        elif ch == '(':
            d += 1
        elif ch == ')':
            d -= 1
            if d == 0:
                return i + 1
        i += 1
    raise ValueError('geen sluithaakje')


def fix_filmdata(s):
    """Geeft (nieuwe tekst, lijst met wat gedaan/ontbrak)."""
    log = []
    if 'function knipSamen(' not in s or 'function vraagCuts(' not in s:
        return s, ['geen vraagCuts-speler']
    if 'SPELERFIX_MARK v2' in s:
        return s, ['al gefixt']
    if FD_HELPERS_V1 in s:
        return s.replace(FD_HELPERS_V1, FD_HELPERS), ['v1 -> v2']
    # 1. helpers vóór function knipSamen
    s = s.replace('function knipSamen(', FD_HELPERS + 'function knipSamen(', 1)
    # 2. knipMarge na elke 'const cuts=knipSamen(...)'
    out, pos, n = [], 0, 0
    for m in re.finditer(r'const cuts=knipSamen\(', s):
        if m.start() < pos:
            continue
        e = paren_end(s, m.end() - 1)
        semi = e + 1 if s[e:e + 1] == ';' else e
        out.append(s[pos:semi])
        out.append(' knipMarge(seg,cuts);')
        pos = semi
        n += 1
    out.append(s[pos:])
    s = ''.join(out)
    log.append(f'knipMarge x{n}')
    # 3. tick
    if OLD_TICK in s:
        s = s.replace(OLD_TICK, 'knipCheck(it);')
        log.append('tick')
    else:
        log.append('TICK-PATROON ONTBREEKT')
    # 4. knipCheck + timeupdate na 'function tick(){' (audio is dan al gedefinieerd)
    if 'function tick(){' in s:
        s = s.replace('function tick(){', FD_CHECK + 'function tick(){', 1)
    else:
        log.append('TICK-FUNCTIE ONTBREEKT')
    # 5. gotoItem: demping opheffen bij elk nieuw item
    m = re.search(r'function gotoItem\([^)]*\)\{', s)
    if m:
        s = s[:m.end()] + ' knipVrij();' + s[m.end():]
    else:
        log.append('GOTOITEM ONTBREEKT')
    # 6. hoofdstukkaart
    if 'CARD_DUR=2.2' in s:
        s = s.replace('CARD_DUR=2.2', 'CARD_DUR=1.3'); log.append('kaart 1.3')
    elif 'CARD_DUR=3.5' in s:
        s = s.replace('CARD_DUR=3.5', 'CARD_DUR=1.8'); log.append('kaart 1.8')
    else:
        log.append('CARD_DUR ONBEKEND')
    if OLD_CARDCLOCK in s:
        s = s.replace(OLD_CARDCLOCK, NEW_CARDCLOCK); log.append('kaartklok')
    else:
        log.append('KAARTKLOK ONTBREEKT')
    if OLD_FADE in s:
        s = s.replace(OLD_FADE, NEW_FADE); log.append('fade')
    return s, log


# ---------------------------------------------------------------- oude spelerbronnen zonder vraag-knippen
def fix_oud_filmdata_bron(s):
    """player.js van vóór bk-vragen: alleen de hoofdstukkaart (er wordt niets geknipt)."""
    if MARK in s:
        return s, ['al gefixt']
    log = []
    if 'CARD_DUR=3.5' in s:
        s = s.replace('CARD_DUR=3.5', 'CARD_DUR=1.3'); log.append('kaart 1.3')
    elif 'CARD_DUR=2.2' in s:
        s = s.replace('CARD_DUR=2.2', 'CARD_DUR=1.3'); log.append('kaart 1.3')
    else:
        return s, ['geen CARD_DUR']
    if OLD_CARDCLOCK in s:
        s = s.replace(OLD_CARDCLOCK, NEW_CARDCLOCK); log.append('kaartklok')
    if OLD_FADE in s:
        s = s.replace(OLD_FADE, NEW_FADE); log.append('fade')
    s = s.replace('const CARD_DUR=', '/*SPELERFIX_MARK kaart*/ const CARD_DUR=', 1)
    return s, log


FIXERS = []  # (naam, herken(s)->bool, fix(s)->(s,log)) ; oudere bouwvormen worden hieronder toegevoegd


def fix_text(s):
    if 'function vraagCuts(' in s and 'function knipSamen(' in s:
        return fix_filmdata(s)
    if MARK in s:
        return s, ['al gefixt']
    for naam, herken, fix in FIXERS:
        if herken(s):
            s2, log = fix(s)
            return s2, [naam] + log
    if re.search(r'CARD_DUR=(2\.2|3\.5)', s) and 'drawChapterCard' in s:
        return fix_oud_filmdata_bron(s)
    return s, ['geen bekende speler']


def alle_bestanden():
    fs = [f for f in glob.glob(os.path.join(ROOT, 'films/**/*.html'), recursive=True)
          if '/bron/' not in f and not f.endswith('presentatie.html')]
    fs += glob.glob(os.path.join(ROOT, 'films/**/bron/src/player*.js'), recursive=True)
    fs += glob.glob(os.path.join(ROOT, 'films/dna/_bouw/src/player*.js'))
    return sorted(set(fs))


def main(argv):
    check = '--check' in argv
    args = [a for a in argv if a != '--check']
    fs = args or alle_bestanden()
    bad = 0
    for f in fs:
        s = open(f, encoding='utf-8').read()
        s2, log = fix_text(s)
        if check:
            ok = MARK in s
            if not ok:
                bad += 1
            print(('OK   ' if ok else 'MIST ') + os.path.relpath(f, ROOT), '' if ok else ' '.join(log))
            continue
        if s2 != s:
            open(f, 'w', encoding='utf-8').write(s2)
            print('gefixt', os.path.relpath(f, ROOT), ' '.join(log))
        else:
            print('-     ', os.path.relpath(f, ROOT), ' '.join(log))
    return 1 if (check and bad) else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))

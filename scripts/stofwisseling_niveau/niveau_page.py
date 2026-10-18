"""Havo/vwo-schakelaar in pagina en speler van de stofwisselingsfilms (18 okt 2026).
python3 niveau_page.py <werkmap> <havo-panelen.js> <bk-label>
Werkt op film.src.html na niveau_data.py.
"""
import html as H, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import fl


def rep(s, old, new, n=1):
    k = s.count(old)
    if k != n:
        raise SystemExit(f'anker {k}x gevonden (verwacht {n}): {old[:80]!r}')
    return s.replace(old, new)


def mmss(x):
    x = int(x); return f'{x // 60}:{x % 60:02d}'


NV_JS = r"""
  /* niveau havo/vwo (18 okt 2026). FILM-tijden zijn de audiotijd (met havo-invoegingen); de scènes tekenen op hun
     oorspronkelijke tijdlijn: NV.orig(i) geeft het hoofdstuk zonder invoegingen, NV.st(i, t) de scènetijd. */
  const NV = {
    _o: {},
    unT(i, t) { let d = 0; for (const h of (CH[i].ins || [])) { if (t >= h.Pn + h.D - 1e-6) d += h.D; else if (t >= h.Pn) return h.Pn - d; } return t - d; },
    ins(i, t) { for (const h of (CH[i].ins || [])) if (t >= h.Pn && t < h.Pn + h.D - 1e-6) return { h, lt: t - h.Pn }; return null; },
    st(i, t) { const r = NV.ins(i, t); if (!r) return NV.unT(i, t); const h = r.h; if (h.mode === 'warp') return h.blk[0] + (h.blk[1] - h.blk[0]) * Math.min(1, r.lt / h.D); return h.blk[1]; },
    orig(i) {
      if (NV._o[i]) return NV._o[i]; const c = CH[i]; if (!(c.ins || []).length) return (NV._o[i] = c);
      const u = (t) => +NV.unT(i, t).toFixed(3);
      return (NV._o[i] = Object.assign({}, c, { dur: c.origDur || c.dur,
        segments: c.segments.filter((g) => g.kind !== 'havo').map((g) => { const x = Object.assign({}, g); ['t0', 't1', 'count0', 'count1', 'reveal'].forEach((f) => { if (f in x) x[f] = u(x[f]); }); return x; }),
        sentences: c.sentences.filter((s) => s.lvl !== 'havo').map((s) => Object.assign({}, s, { t0: u(s.t0), t1: u(s.t1), words: s.words.map((w) => ({ w: w.w, t0: u(w.t0), t1: u(w.t1) })) })) }));
    },
    skipCh(i) { return SV.n === 'havo' && !!CH[i].vwoAll; },
    prevOK(i) { let j = i - 1; while (j > 0 && NV.skipCh(j)) j--; return Math.max(0, j); },
  };
"""

OVER_JS = r"""
  /* niveau: havo-kaart over het (stilstaande, gedimde) beeld tijdens een havo-alinea; vwo-markering (paarse balk + 'vwo') */
  NV.over = function (g, i, t) {
    const c = CH[i], C = E.C; const r = NV.ins(i, t);
    if (r && r.h.mode === 'panel' && window.HAVO && HAVO[c.key + ':' + r.h.take]) {
      const D = r.h.D, lt = r.lt, a = Math.max(0, Math.min(1, lt / 0.35, (D - lt) / 0.35));
      g.screen(); const cx = g.ctx; cx.save(); cx.globalAlpha = a * 0.88; cx.fillStyle = C.paper; cx.fillRect(0, 0, 1920, 1080); cx.restore();
      for (const x of g.texts) x.alpha *= 1 - a;
      const words = []; c.sentences.forEach((s) => { if (s.take === r.h.take && s.lvl === 'havo') s.words.forEach((w) => words.push({ w: w.w, t0: w.t0 - r.h.Pn, t1: w.t1 - r.h.Pn })); });
      const nm = (x) => x.toLowerCase().replace(/[^\p{L}\p{N}₂⁺\-]/gu, '');
      const W = (word, occ = 1) => { let k = 0; for (const x of words) if (nm(x.w).startsWith(nm(word))) { if (++k === occ) return x.t0; } throw new Error('havo-woord niet gevonden: ' + word); };
      HAVO[c.key + ':' + r.h.take](g, lt, { a, W, D, E, C });
    }
    if (SV.n === 'vwo') {
      const b = (c.blocks || []).find((x) => x.lvl === 'vwo' && t >= x.t0 && t < x.t1);
      if (b) { const a = Math.max(0, Math.min(1, (t - b.t0) / 0.3, (b.t1 - t) / 0.3)); g.screen(); const cx = g.ctx; cx.save(); cx.globalAlpha = a; cx.fillStyle = C.purple; cx.fillRect(0, 0, 8, 1080); cx.restore();
        g.pill('vwo', 30, 48, { size: 26, f: 'mono', fill: C.purpleFill, stroke: C.purple, color: C.ink, alpha: a }); }
    }
  };
"""

NIV_UI_JS = r"""
  // niveau havo/vwo (onthouden in bk-niveau, ook ?niveau=havo)
  const nivBtns = document.querySelectorAll('[data-niv]');
  function zetNiveau(n, save) {
    SV.n = n; window.BKN = n; nivBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.niv === n))); document.body.classList.toggle('havo', n === 'havo');
    if (save) { try { localStorage.setItem('bk-niveau', n); } catch (e) { } }
    zetKnoppen(); updateNow();
    const sb = bkIn(starts[ci] + t); if (sb !== null) { const was = waiting; waiting = false; seekGlobal(sb); if (was || wantPlay) doPlay(); }
  }
  nivBtns.forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.niv === SV.n)); b.addEventListener('click', () => zetNiveau(b.dataset.niv, true)); });
"""

CSS = """
/* niveau havo/vwo (18 okt 2026) */
.bar .vbl { position: absolute; top: 11px; height: 10px; background: #A392D6; opacity: .8; border-radius: 2px; pointer-events: none }
.chlist .p.vw { color: #A392D6 }
.chlist button.off { opacity: .45; cursor: default }
.nowline .segs { display: flex; gap: 8px; flex-wrap: wrap }
.vwob { font: 600 10px/1 var(--f-body); letter-spacing: .1em; text-transform: uppercase; color: #A392D6; border: 1px solid #A392D6; border-radius: 4px; padding: 2px 5px; margin-left: 6px; vertical-align: 1px }
.tr p.vwo, .tr div.vwo, .tr h3.vwo { border-left: 4px solid #A392D6; padding-left: 10px }
.tr p.havo { border-left: 4px solid var(--btn); padding-left: 10px }
body.havo .tr .vwo, body.havo #glossary .term.vwo { display: none }
body:not(.havo) .tr .havo { display: none }
"""


def main(wd, havojs, tweaks):
    src = os.path.join(wd, 'film.src.html')
    s = open(src, encoding='utf-8').read()
    L, li, F = fl.load(src)
    CH = F['chapters']
    tot = sum(c['dur'] for c in CH)
    havo_ins = sum(b['t1'] - b['t0'] for c in CH for b in c.get('blocks', []) if b['lvl'] == 'havo')
    vwo_bl = sum(b['t1'] - b['t0'] for c in CH for b in c.get('blocks', []) if b['lvl'] == 'vwo')
    dv, dh = tot - havo_ins, tot - vwo_bl
    print(f'vwo {mmss(dv)} ({dv:.1f} s) · havo {mmss(dh)} ({dh:.1f} s)')

    # ---------- pagina ----------
    s = rep(s, '<style id="glossary-stijl">' if '<style id="glossary-stijl">' in s else '</head>', CSS.join(['<style>', '</style>\n']) + ('<style id="glossary-stijl">' if '<style id="glossary-stijl">' in s else '</head>'))
    m = re.search(r'<div class="lab">Uitlegfilm · 6 vwo · ([^<]*?) · (\d+:\d\d)</div>', s)
    s = s.replace(m.group(0), f'<div class="lab">Uitlegfilm · havo + vwo · {m.group(1)} · Biologie voor jou thema 8 · vwo {mmss(dv)} · havo {mmss(dh)}</div>')
    s = rep(s, '<span class="lab">Serie Stofwisseling (vwo)</span>', '<span class="lab">Serie Stofwisseling (havo + vwo)</span>')
    s = rep(s, '<div class="seg" role="group" aria-label="Kijkmodus">',
            '<div class="segs"><div class="seg" role="group" aria-label="Niveau" title="Havo: alleen de basis. Vwo: alles, de vwo-delen gemarkeerd (wordt onthouden)"><button type="button" data-niv="havo" aria-pressed="false">Havo</button><button type="button" data-niv="vwo" aria-pressed="true">Vwo</button></div><div class="seg" role="group" aria-label="Kijkmodus">')
    s = rep(s, '<button type="button" data-mode="klas" aria-pressed="false">Klas</button></div>', '<button type="button" data-mode="klas" aria-pressed="false">Klas</button></div></div>')
    # uitleg in 'Over de film': eerste kaart in .cols
    s = rep(s, '<div class="card"><b>Leerling of Klas</b>', '<div class="card"><b>Havo of Vwo</b><br>Met de knop Havo/Vwo kies je je niveau (de keuze wordt onthouden; een link met <code>?niveau=havo</code> opent meteen in havo). Havo ziet de basis: een volledige uitleg op havoniveau, met hier en daar een korte havo-alinea. Vwo ziet alles; de vwo-delen hebben in beeld een paarse balk met \'vwo\' en staan paars op de tijdbalk. Havo: ' + f'{mmss(dh)}, vwo: {mmss(dv)}.' + '</div>\n<div class="card"><b>Leerling of Klas</b>')
    # transcript
    s = transcript(s, F)
    # ---------- speler ----------
    s = rep(s, '  const urlKlas =', "  SV.n = 'vwo'; try { if (localStorage.getItem('bk-niveau') === 'havo') SV.n = 'havo'; } catch (e) { }\n  { const u = new URLSearchParams(location.search); const n = u.get('niveau'); if (n === 'havo' || n === 'vwo') SV.n = n; }\n  document.body.classList.toggle('havo', SV.n === 'havo'); window.BKN = SV.n;   // BKN: niveau voor de scènes (havo verbergt enkele vwo-labels)\n  const urlKlas =")
    s = rep(s, '  function scene(i) {', NV_JS + '  function scene(i) {')
    s = rep(s, 'const ch = CH[i]; const TL = COMMON.makeTL(ch);', 'const ch = CH[i]; const TL = COMMON.makeTL(NV.orig(i));')
    s = rep(s, 'const need = B.sc.sims.filter((r) => !r.ready(t));', 'const st = NV.st(ci, t); const need = B.sc.sims.filter((r) => !r.ready(st));')
    s = rep(s, 'need.forEach((r) => r.advanceTo(t, 24)); if (B.sc.sims.every((r) => r.ready(t)))', 'need.forEach((r) => r.advanceTo(st, 24)); if (B.sc.sims.every((r) => r.ready(st)))')
    s = rep(s, 'g.frame(backW / 1920); B.sc.draw(g, t);', 'g.frame(backW / 1920); B.sc.draw(g, st); NV.over(g, ci, t);')
    s = rep(s, 'renderAt(i, tt) { const B = scene(i); B.sc.sims.forEach((r) => r.advanceTo(tt)); g.frame(backW / 1920); B.sc.draw(g, tt);',
            'renderAt(i, tt) { const B = scene(i), st = NV.st(i, tt); B.sc.sims.forEach((r) => r.advanceTo(st)); g.frame(backW / 1920); B.sc.draw(g, st); NV.over(g, i, tt);')
    s = rep(s, '  /* ---------- hoofdlus ---------- */', OVER_JS + '  /* ---------- hoofdlus ---------- */')
    s = rep(s, "      if (SV.v !== 'uit') return;", "      (c.blocks || []).forEach((b) => { if ((SV.n === 'havo' && b.lvl === 'vwo') || (SV.n === 'vwo' && b.lvl === 'havo')) l.push([o + b.t0, o + b.t1]); });   // niveau\n      if (SV.v !== 'uit') return;")
    s = rep(s, "bar.querySelectorAll('.tick').forEach((d, k) => { d.style.left = (bkF2V(starts[k + 1]) / bkF2V(TOTAL) * 100) + '%'; });",
            "bar.querySelectorAll('.tick').forEach((d, k) => { d.style.left = (bkF2V(starts[k + 1]) / bkF2V(TOTAL) * 100) + '%'; });\n"
            "    bar.querySelectorAll('.vbl').forEach((d) => d.remove());\n"
            "    if (SV.n === 'vwo') CH.forEach((c, i) => (c.blocks || []).forEach((b) => { if (b.lvl !== 'vwo') return; const VT = bkF2V(TOTAL), x0 = bkF2V(starts[i] + b.t0), x1 = bkF2V(starts[i] + b.t1); if (x1 - x0 < 0.3) return;\n"
            "      const d = document.createElement('div'); d.className = 'vbl'; d.title = 'alleen vwo'; d.style.left = (x0 / VT * 100) + '%'; d.style.width = ((x1 - x0) / VT * 100) + '%'; bar.insertBefore(d, bar.querySelector('.fillp')); }));")
    s = rep(s, "const tags = (c.hasQ ? '<span class=\"p\">vraag</span>' : '') + (c.hasV ? '<span class=\"p v\">verdieping</span>' : '');",
            "const vA = !!c.vwoAll, vB = !vA && (c.blocks || []).some((x) => x.lvl === 'vwo'), off = NV.skipCh(i);\n"
            "      const hasQn = c.segments.some((x) => x.kind === 'question' && !(SV.n === 'havo' && (x.lvl === 'vwo' || vA)));\n"
            "      const tags = (hasQn ? '<span class=\"p\">vraag</span>' : '') + (c.hasV ? '<span class=\"p v\">verdieping</span>' : '') + (vA ? '<span class=\"p vw\">alleen vwo</span>' : vB && SV.n === 'vwo' ? '<span class=\"p vw\">vwo-blok</span>' : '');")
    s = rep(s, "b.addEventListener('click', () => { resetQuestionsAfter(i, 0);", "if (off) { b.classList.add('off'); b.setAttribute('aria-disabled', 'true'); b.title = 'Dit hoofdstuk is alleen voor vwo.'; }\n      b.addEventListener('click', () => { if (off) return; resetQuestionsAfter(i, 0);")
    s = rep(s, 'starts[Math.max(0, ci - 1)]', 'starts[NV.prevOK(ci)]')
    s = rep(s, '(t > 2 ? ci : ci - 1)', '(t > 2 ? ci : NV.prevOK(ci))')
    k = s.rfind('  zetKnoppen();\n  renderChList();')
    if k < 0: raise SystemExit('anker zetKnoppen')
    s = s[:k] + NIV_UI_JS + s[k:]
    s = rep(s, 'seek(T) { seekGlobal(T); },', 'seek(T) { seekGlobal(T); }, niveau: () => SV.n, nv: NV, bk: () => BK.k.slice(),')
    # havo-kaarten vóór player.js
    hj = open(havojs, encoding='utf-8').read()
    k = s.find('/* één bestand: de audio zit in de pagina')
    s = s[:k] + hj.rstrip() + '\n' + s[k:]
    if os.path.exists(tweaks):
        TW = json.load(open(tweaks, encoding='utf-8'))
        for old, new in TW.get('rep', []):
            s = rep(s, old, new)
        for term in TW.get('vwoTerms', []):
            s = rep(s, f'<div class="term"><b>{term}</b>', f'<div class="term vwo"><b>{term}</b> <span class="vwob">vwo</span>')
    open(src, 'w', encoding='utf-8').write(s)


def transcript(s, F):
    """data-t naar de nieuwe tijd, vwo-zinnen/-vragen markeren, havo-zinnen invoegen"""
    a = s.index('<section class="doc" id="transcript">'); b = s.index('</section>', a)
    T = s[a:b]
    CH = F['chapters']
    def un(c, t):
        d = 0
        for h in c.get('ins', []):
            if t >= h['Pn'] + h['D'] - 1e-6: d += h['D']
        return t - d
    out = []
    parts = re.split(r'(<h3 class="tr-ch" id="tr\d+">.*?</h3>)', T)
    out.append(parts[0])
    for i in range(1, len(parts), 2):
        hd, body = parts[i], parts[i + 1]
        ci = int(re.search(r'id="tr(\d+)"', hd).group(1)); c = CH[ci]
        if c.get('vwoAll'):
            hd = hd.replace('<h3 class="tr-ch"', '<h3 class="tr-ch vwo"').replace('</h3>', ' <span class="vwob">alleen vwo</span></h3>')
        orig = {}
        for snt in c['sentences']:
            if snt.get('lvl') == 'havo': continue
            orig[round(un(c, snt['t0']), 2)] = snt
        havo = [x for x in c['sentences'] if x.get('lvl') == 'havo']
        ins = c.get('ins', [])
        lines = re.split(r'(?=<p><button class="ts")|(?=<div class="vq">)', body)
        newl = []
        done = set()
        for ln in lines:
            m = re.match(r'<p><button class="ts" type="button" data-ch="(\d+)" data-t="([\d.]+)">[\d:]+</button>', ln)
            if m:
                t0 = float(m.group(2))
                snt = orig.get(round(t0, 2))
                if snt is None:
                    cand = min(orig.values(), key=lambda x: abs(un(c, x['t0']) - t0)); snt = cand if abs(un(c, cand['t0']) - t0) < 0.03 else None
                if snt is None: raise SystemExit(f'transcript: geen zin bij H{ci} t={t0}')
                # havo-invoeging die vóór deze zin hoort
                for h in ins:
                    if h['take'] in done: continue
                    if snt['t0'] >= h['Pn'] + h['D'] - 1e-6:
                        newl.append(havo_lines(ci, [x for x in havo if x['take'] == h['take']])); done.add(h['take'])
                nt = snt['t0']
                ln = ln.replace(m.group(0), f'<p><button class="ts" type="button" data-ch="{ci}" data-t="{nt:.2f}">{mmss_floor(nt)}</button>')
                vw = snt.get('lvl') == 'vwo' or c.get('vwoAll')
                if vw:
                    ln = ln.replace('<p>', '<p class="vwo">', 1)
                    ln = re.sub(r'\s*<span class="verd">[^<]*</span>', '', ln)
                    ln = re.sub(r'</p>(\s*)$', r' <span class="vwob">vwo</span></p>\1', ln)
                newl.append(ln)
            elif ln.startswith('<div class="vq">'):
                # vraag: hoort bij een vwo-blok als de vraag in dat blok valt
                qtxt = H.unescape(re.sub('<[^>]+>', '', ln.split('<br>')[0]).replace('Voorspelvraag:', '').strip())
                q = next((g for g in c['segments'] if g['kind'] == 'question' and H.unescape(g['q']).strip()[:30] == qtxt[:30]), None)
                if q is not None and (q.get('lvl') == 'vwo' or c.get('vwoAll')):
                    ln = ln.replace('<div class="vq">', '<div class="vq vwo">', 1)
                newl.append(ln)
            else:
                newl.append(ln)
        for h in ins:
            if h['take'] not in done:
                newl.append(havo_lines(ci, [x for x in havo if x['take'] == h['take']])); done.add(h['take'])
        out.append(hd); out.append(''.join(newl))
    return s[:a] + ''.join(out) + s[b:]


def mmss_floor(x):
    x = int(x); return f'{x // 60}:{x % 60:02d}'


def havo_lines(ci, sents):
    return ''.join(f'<p class="havo"><button class="ts" type="button" data-ch="{ci}" data-t="{x["t0"]:.2f}">{mmss_floor(x["t0"])}</button>{H.escape(x["text"], quote=False)} <span class="vwob" style="color:var(--btn);border-color:var(--btn)">havo</span></p>\n' for x in sents)


if __name__ == '__main__':
    main(*sys.argv[1:4])

/* Reviewstand voor films (Kamiel 24 okt 2026).
   Aan met ?review=1 (blijft aan in deze browser, uit met ?review=0). Wordt geladen door js/teller.js, alleen op films.
   - klik op het beeld: film pauzeert, stip op die plek, typvak met tijdstip en de gesproken zin; Enter = opslaan en
     verder kijken, Esc = verder zonder opslaan. Toets R zet 'klik = opmerking' tijdelijk uit (om vraagkaarten te beantwoorden).
   - opslag: Firebase edutool, knooppunt review/<push-id> = {film, t, tekst, x, y, zin, status, tijd}; schrijven alleen
     als docent (eenmalig inloggen, zelfde account als Klas live), lezen openbaar zodat Claude het kan ophalen.
     Regels: sessie/database.rules.json, blok "review".
   - strook onder het beeld met alle opmerkingen bij deze film (goud = Kamiel, oranje = Claude uit films/review-claude.json, veld claude; ids in veld verwerkt tellen als verwerkt);
     klik = naar dat moment. */
(function () {
  'use strict';
  if (window.__bkReview) return;
  var q; try { q = new URLSearchParams(location.search).get('review'); } catch (e) { q = null; }
  try {
    if (q === '1') localStorage.setItem('bk-review', '1');
    if (q === '0') localStorage.removeItem('bk-review');
    if (localStorage.getItem('bk-review') !== '1') return;
  } catch (e) { if (q !== '1') return; }
  window.__bkReview = true;

  var DB = 'https://edutool-4b00b-default-rtdb.europe-west1.firebasedatabase.app';
  var KEY = 'AIzaSyDpV3bCs7TKrUY9GY36Zt2UYBvKpuRJ3sU';
  var me = document.currentScript;
  var ROOT_ATTR = (me && me.getAttribute('data-root')) || './';
  var ROOT = new URL(ROOT_ATTR, location.href);
  var PAD = (function () {
    var p = location.pathname, r = ROOT.pathname;
    if (p.indexOf(r) === 0) p = p.slice(r.length);
    p = p.replace(/^\/+/, '');
    try { return decodeURIComponent(p); } catch (e) { return p; }
  })();

  /* ---------- speler uitlezen (twee spelersoorten: FILMDATA met #stage, oud met #cv + __TIMELINE__) ---------- */
  function canvas() { return document.getElementById('stage') || document.getElementById('cv') || document.querySelector('canvas'); }
  function aud() { return document.getElementById('narration') || document.getElementById('aud') || document.querySelector('audio'); }
  function speelt() {
    try { if (typeof state !== 'undefined' && state && 'playing' in state) return !!state.playing; } catch (e) {}
    var a = aud(); return !!(a && !a.paused);
  }
  function knop() { return document.getElementById('play'); }
  function pauzeer() { if (speelt() && knop()) knop().click(); else { var a = aud(); if (a && !a.paused) a.pause(); } }
  function speelVerder() { if (!speelt() && knop()) knop().click(); }
  function nu() {
    try {
      if (typeof state !== 'undefined' && state && state.items) {
        var it = state.items[state.idx];
        var lokaal = (typeof aud2it === 'function') ? aud2it(it, state.local) : state.local;
        return it.start + lokaal;
      }
    } catch (e) {}
    var a = aud(); if (a && window.__TIMELINE__) return a.currentTime;
    var tm = document.getElementById('time'); if (tm) { var m = tm.textContent.split('/')[0].trim().split(':'); return (+m[0]) * 60 + (+m[1] || 0); }
    return a ? a.currentTime : 0;
  }
  function totaal() {
    try { if (typeof state !== 'undefined' && state && state.total) return state.total; } catch (e) {}
    if (window.__TIMELINE__ && window.__TIMELINE__.total) return window.__TIMELINE__.total;
    var tm = document.getElementById('time');
    if (tm && tm.textContent.indexOf('/') > 0) { var m = tm.textContent.split('/')[1].trim().split(':'); return (+m[0]) * 60 + (+m[1] || 0); }
    var a = aud(); return a && isFinite(a.duration) ? a.duration : 0;
  }
  function zin() {
    try {
      if (typeof state !== 'undefined' && state && state.items) {
        var it = state.items[state.idx];
        if (it && it.type === 'speech' && it.seg && it.seg.words) {
          var l = state.local;
          return it.seg.words.filter(function (w) { return w.s >= l - 4 && w.s <= l + 0.6; }).map(function (w) { return w.t; }).join(' ');
        }
        return it && it.type ? '(' + it.type + ')' : '';
      }
      if (window.__TIMELINE__) {
        var t = nu(), uit = [];
        window.__TIMELINE__.paras.forEach(function (p) { (p.words || []).forEach(function (w) { if (w.s >= t - 4 && w.s <= t + 0.6) uit.push(w.w); }); });
        return uit.join(' ');
      }
    } catch (e) {}
    return '';
  }
  function naar(t) {
    try { if (typeof seekGlobal === 'function') { seekGlobal(t); if (typeof updateTimeUI === 'function') updateTimeUI(); return; } } catch (e) {}
    var a = aud(); if (a && window.__TIMELINE__) { a.currentTime = t; return; }
    var s = document.getElementById('seek'), T = totaal();
    if (s && T) { s.value = t / T * (+s.max || 1000); s.dispatchEvent(new Event('input', { bubbles: true })); }
  }
  function mmss(t) { t = Math.max(0, t || 0); var m = Math.floor(t / 60), s = t - m * 60; return m + ':' + (s < 10 ? '0' : '') + s.toFixed(1); }

  /* ---------- inloggen (Firebase REST, docentaccount) ---------- */
  var AUTH = null;
  try { AUTH = JSON.parse(localStorage.getItem('bk-review-auth') || 'null'); } catch (e) {}
  function bewaarAuth(a) { AUTH = a; try { localStorage.setItem('bk-review-auth', JSON.stringify(a)); } catch (e) {} }
  function token() {
    if (!AUTH) return Promise.reject(new Error('login'));
    if (AUTH.exp > Date.now() + 60000) return Promise.resolve(AUTH.id);
    return fetch('https://securetoken.googleapis.com/v1/token?key=' + KEY, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(AUTH.refresh)
    }).then(function (r) { if (!r.ok) throw new Error('login'); return r.json(); })
      .then(function (j) { bewaarAuth({ id: j.id_token, refresh: j.refresh_token, exp: Date.now() + (+j.expires_in) * 1000 }); return AUTH.id; })
      .catch(function () { bewaarAuth(null); throw new Error('login'); });
  }
  function login(email, ww) {
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + KEY, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: ww, returnSecureToken: true })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.idToken) throw new Error(j.error && j.error.message || 'mislukt');
      bewaarAuth({ id: j.idToken, refresh: j.refreshToken, exp: Date.now() + (+j.expiresIn) * 1000 });
    });
  }

  /* ---------- opmerkingen laden ---------- */
  var NOTES = [], CLAUDE = [], VERWERKT = {};
  function laad() {
    var url = DB + '/review.json?orderBy=' + encodeURIComponent('"film"') + '&equalTo=' + encodeURIComponent(JSON.stringify(PAD));
    fetch(url).then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) {
      NOTES = Object.keys(j || {}).map(function (k) { var n = j[k]; n.id = k; if (VERWERKT[k]) n.status = 'verwerkt'; return n; });
      strook();
    }).catch(function () {});
    fetch(new URL('films/review-claude.json', ROOT).href, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (j) {
        CLAUDE = (j && j.claude && j.claude[PAD]) || [];
        ((j && j.verwerkt) || []).forEach(function (id) { VERWERKT[id] = 1; });
        NOTES.forEach(function (n) { if (VERWERKT[n.id]) n.status = 'verwerkt'; });
        strook();
      }).catch(function () {});
  }

  /* ---------- opmaak ---------- */
  var css = '' +
    '.bkrv-balk{position:fixed;top:10px;right:10px;z-index:9997;display:flex;gap:8px;align-items:center;padding:6px 10px;border-radius:999px;' +
      'background:var(--surface,#16233d);color:var(--text,#E8ECF3);border:1px solid var(--goud,#E0B64A);font:600 13px/1 "Source Sans 3",system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.3)}' +
    '.bkrv-balk button{background:none;border:0;color:var(--text2,#9AA3B2);font:inherit;cursor:pointer;padding:2px 4px}.bkrv-balk button:hover{color:var(--text,#E8ECF3)}' +
    '.bkrv-balk .uit{color:var(--koraal,#F08C7A)}' +
    '.bkrv-pin{position:fixed;z-index:9998;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;border:3px solid #fff;background:var(--goud,#E0B64A);box-shadow:0 0 0 2px rgba(0,0,0,.5);pointer-events:none}' +
    '.bkrv-pin.claude{background:#E8853A}' +
    '.bkrv-vak{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;width:min(560px,calc(100vw - 32px));background:var(--surface,#16233d);color:var(--text,#E8ECF3);' +
      'border:1px solid var(--goud,#E0B64A);border-radius:14px;padding:14px;font:15px/1.4 "Source Sans 3",system-ui,sans-serif;box-shadow:0 18px 50px rgba(0,0,0,.45);display:flex;flex-direction:column;gap:8px}' +
    '.bkrv-vak .kop{display:flex;justify-content:space-between;gap:8px;font-size:13px;color:var(--text2,#9AA3B2)}' +
    '.bkrv-vak .kop b{font:600 14px "IBM Plex Mono",ui-monospace,monospace;color:var(--goud,#E0B64A)}' +
    '.bkrv-vak .zin{font-style:italic;font-size:13px;color:var(--text2,#9AA3B2)}' +
    '.bkrv-vak textarea,.bkrv-vak input{width:100%;box-sizing:border-box;background:var(--bg,#0d1628);color:var(--text,#E8ECF3);border:1px solid var(--line2,rgba(255,255,255,.18));' +
      'border-radius:10px;padding:9px 11px;font:16px/1.4 "Source Sans 3",system-ui,sans-serif}' +
    '.bkrv-vak textarea{min-height:70px;resize:vertical}' +
    '.bkrv-vak .rij{display:flex;gap:8px;justify-content:flex-end;align-items:center;flex-wrap:wrap}' +
    '.bkrv-vak .rij span{margin-right:auto;font-size:13px;color:var(--text2,#9AA3B2)}.bkrv-vak .rij span.fout{color:var(--koraal,#F08C7A)}' +
    '.bkrv-vak button{border-radius:999px;padding:8px 14px;font:600 14px/1 "Source Sans 3",system-ui,sans-serif;cursor:pointer;border:1px solid var(--line2,rgba(255,255,255,.18));background:none;color:var(--text,#E8ECF3)}' +
    '.bkrv-vak button.ja{background:var(--goud,#E0B64A);border-color:var(--goud,#E0B64A);color:var(--goud-ink,#1a1406)}' +
    '.bkrv-strook{position:relative;height:18px;margin:6px 0 2px;border-radius:4px;background:var(--line,rgba(255,255,255,.08))}' +
    '.bkrv-strook button{position:absolute;top:2px;width:10px;height:14px;margin-left:-5px;border:0;border-radius:3px;padding:0;cursor:pointer;background:var(--goud,#E0B64A)}' +
    '.bkrv-strook button.claude{background:#E8853A}.bkrv-strook button.klaar{opacity:.3}' +
    '.bkrv-tip{font:13px/1.35 "Source Sans 3",system-ui,sans-serif;color:var(--text2,#9AA3B2);margin:2px 0 6px;min-height:1.2em}' +
    '@media print{.bkrv-balk,.bkrv-vak,.bkrv-pin,.bkrv-strook,.bkrv-tip{display:none!important}}';

  function mk(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function host() { return document.fullscreenElement || document.body; }

  var balk, vak, pin, strookEl, tip, klikAan = true, open = null;

  function balkTekst() {
    if (!balk) return;
    var n = NOTES.filter(function (x) { return x.status !== 'verwerkt'; }).length;
    balk.innerHTML = '<span>Reviewstand · ' + n + ' open</span>' +
      '<button type="button" data-a="klik" title="Toets R">' + (klikAan ? 'Klik = opmerking' : 'Klik = gewoon') + '</button>' +
      (AUTH ? '' : '<button type="button" data-a="in">Inloggen</button>') +
      '<button type="button" data-a="ok" title="Film is goed; door naar de volgende">Goed ✓</button>' +
      '<button type="button" data-a="bekeken" title="Opmerkingen gemaakt; door naar de volgende">Klaar →</button>' +
      '<a href="' + new URL('sessie/review.html', ROOT).href + '" style="color:inherit;text-decoration:none;padding:2px 4px" title="Alle films">Overzicht</a>' +
      '<button type="button" data-a="uit" class="uit" title="Reviewstand uitzetten">Uit</button>';
  }

  /* ---------- status van deze film en door naar de volgende ---------- */
  function sleutel(href) { return href.replace(/[^A-Za-z0-9]/g, '_'); }
  function volgende() {
    return Promise.all([
      fetch(new URL('sessie/reviewlijst.json', ROOT).href, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : {}; }),
      fetch(DB + '/reviewstatus.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ]).then(function (r) {
      var lijst = [], st = r[1] || {};
      ((r[0] && r[0].groepen) || []).forEach(function (g) { g.films.forEach(function (f) { lijst.push(f); }); });
      function nog(f) {
        var s = st[sleutel(f.href)];
        if (f.href === PAD) return false;
        if (s && s.status) return s.status === 'open';
        return !f.repo;
      }
      var i = lijst.findIndex(function (f) { return f.href === PAD; });
      var na = lijst.slice(i + 1).concat(lijst.slice(0, Math.max(0, i)));
      return na.find(nog) || null;
    });
  }
  function rond(st) {
    var knopTekst = balk.querySelector('[data-a="' + st + '"]'); if (knopTekst) knopTekst.textContent = 'Bezig…';
    token().then(function (tk) {
      return fetch(DB + '/reviewstatus/' + sleutel(PAD) + '.json?auth=' + encodeURIComponent(tk), {
        method: 'PUT', body: JSON.stringify({ href: PAD, status: st, tijd: { '.sv': 'timestamp' } })
      });
    }).then(function (r) {
      if (!r.ok) throw new Error('opslaan');
      return volgende();
    }).then(function (f) {
      location.href = f ? new URL(f.href, ROOT).href + '?review=1' : new URL('sessie/review.html', ROOT).href;
    }).catch(function (err) {
      if (err && err.message === 'login') loginVak(function () { rond(st); });
      else { balkTekst(); alertBalk('Status niet opgeslagen. Controleer je verbinding.'); }
    });
  }
  function alertBalk(t) { if (tip) tip.textContent = t; }

  function strook() {
    balkTekst();
    var T = totaal(); if (!strookEl || !T) return;
    strookEl.innerHTML = '';
    NOTES.map(function (n) { return [n, 'kamiel']; }).concat(CLAUDE.map(function (n) { return [n, 'claude']; })).forEach(function (p) {
      var n = p[0], b = mk('button', p[1] + (n.status === 'verwerkt' ? ' klaar' : ''));
      b.type = 'button'; b.style.left = Math.min(100, n.t / T * 100) + '%';
      b.title = mmss(n.t) + ' · ' + (p[1] === 'claude' ? 'Claude: ' : '') + n.tekst;
      b.setAttribute('aria-label', b.title);
      b.addEventListener('click', function () {
        pauzeer(); naar(n.t);
        tip.textContent = mmss(n.t) + ' · ' + (p[1] === 'claude' ? 'Claude: ' : '') + n.tekst;
        toonPin(n.x, n.y, p[1] === 'claude');
      });
      strookEl.appendChild(b);
    });
  }

  function toonPin(x, y, claude) {
    if (pin) { pin.remove(); pin = null; }
    var c = canvas(); if (!c || x == null) return;
    var r = c.getBoundingClientRect();
    pin = mk('div', 'bkrv-pin' + (claude ? ' claude' : ''));
    pin.style.left = (r.left + x * r.width) + 'px'; pin.style.top = (r.top + y * r.height) + 'px';
    host().appendChild(pin);
  }

  function sluit(verder) {
    if (vak) { vak.remove(); vak = null; }
    if (pin) { pin.remove(); pin = null; }
    var was = open && open.speelde; open = null;
    if (verder && was) speelVerder();
  }

  function loginVak(daarna) {
    if (vak) vak.remove();
    vak = mk('form', 'bkrv-vak',
      '<div class="kop"><span>Eenmalig inloggen met je docentaccount (zelfde als Klas live)</span></div>' +
      '<input type="email" id="bkrv-mail" placeholder="E-mailadres" autocomplete="username" required>' +
      '<input type="password" id="bkrv-ww" placeholder="Wachtwoord" autocomplete="current-password" required>' +
      '<div class="rij"><span class="m"></span><button type="button" class="nee">Annuleren</button><button type="submit" class="ja">Inloggen</button></div>');
    host().appendChild(vak);
    vak.querySelector('.nee').onclick = function () { sluit(false); };
    vak.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = vak.querySelector('.m'); m.textContent = 'Bezig…'; m.className = 'm';
      login(vak.querySelector('#bkrv-mail').value.trim(), vak.querySelector('#bkrv-ww').value).then(function () {
        balkTekst(); vak.remove(); vak = null; if (daarna) daarna();
      }).catch(function () { m.textContent = 'Inloggen mislukt. Controleer e-mail en wachtwoord.'; m.className = 'm fout'; });
    });
    vak.querySelector('#bkrv-mail').focus();
  }

  function opmerkingVak(x, y) {
    var speelde = speelt();
    pauzeer();
    var t = +nu().toFixed(2), z = zin();
    open = { t: t, x: x, y: y, zin: z, speelde: speelde };
    if (vak) vak.remove();
    toonPin(x, y, false);
    vak = mk('div', 'bkrv-vak',
      '<div class="kop"><span>Opmerking bij <b></b>' + (x != null ? ' · plek gemarkeerd' : '') + '</span><span>Enter = opslaan · Esc = verder</span></div>' +
      (z ? '<div class="zin"></div>' : '') +
      '<textarea id="bkrv-tekst" placeholder="Wat moet er anders?"></textarea>' +
      '<div class="rij"><span class="m"></span><button type="button" class="nee">Verder kijken</button><button type="button" class="ja">Opslaan</button></div>');
    vak.querySelector('b').textContent = mmss(t);
    if (z) vak.querySelector('.zin').textContent = '"… ' + z + ' …"';
    host().appendChild(vak);
    var ta = vak.querySelector('textarea');
    ta.addEventListener('keydown', function (e) {
      e.stopPropagation();
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); bewaar(); }
      if (e.key === 'Escape') { e.preventDefault(); sluit(true); }
    });
    vak.querySelector('.nee').onclick = function () { sluit(true); };
    vak.querySelector('.ja').onclick = bewaar;
    ta.focus();
    try { var concept = localStorage.getItem('bk-review-concept'); if (concept) { ta.value = concept; localStorage.removeItem('bk-review-concept'); } } catch (e) {}
  }

  function bewaar() {
    if (!vak || !open) return;
    var ta = vak.querySelector('textarea'), tekst = ta.value.trim(), m = vak.querySelector('.m');
    if (!tekst) return;
    var doc = { film: PAD, t: open.t, tekst: tekst.slice(0, 2000), status: 'nieuw', tijd: { '.sv': 'timestamp' } };
    if (open.x != null) { doc.x = open.x; doc.y = open.y; }
    if (open.zin) doc.zin = open.zin.slice(0, 400);
    m.textContent = 'Opslaan…'; m.className = 'm';
    token().then(function (tk) {
      return fetch(DB + '/review.json?auth=' + encodeURIComponent(tk), { method: 'POST', body: JSON.stringify(doc) });
    }).then(function (r) {
      if (!r.ok) throw new Error('opslaan');
      return r.json();
    }).then(function (j) {
      doc.id = j.name; doc.tijd = Date.now(); NOTES.push(doc); strook(); sluit(true);
    }).catch(function (err) {
      if (err && err.message === 'login') {
        try { localStorage.setItem('bk-review-concept', tekst); } catch (e) {}
        var bewaard = open; vak.remove(); vak = null;
        loginVak(function () { open = bewaard; opmerkingVak(bewaard.x, bewaard.y); open.speelde = bewaard.speelde; });
      } else { m.textContent = 'Niet opgeslagen. Controleer je verbinding en probeer opnieuw.'; m.className = 'm fout'; }
    });
  }

  /* ---------- klikken op het beeld ---------- */
  function onKlik(e) {
    if (!klikAan) return;
    var c = canvas(); if (!c || e.target !== c) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var r = c.getBoundingClientRect();
    var x = +((e.clientX - r.left) / r.width).toFixed(3), y = +((e.clientY - r.top) / r.height).toFixed(3);
    opmerkingVak(x, y);
  }

  function start() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    balk = mk('div', 'bkrv-balk'); document.body.appendChild(balk);
    balk.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-a');
      if (a === 'klik') { klikAan = !klikAan; balkTekst(); }
      if (a === 'in') loginVak();
      if (a === 'ok' || a === 'bekeken') { if (speelt()) pauzeer(); rond(a); }
      if (a === 'uit') { try { localStorage.removeItem('bk-review'); } catch (x) {} location.href = location.pathname + location.hash; }
    });
    var c = canvas();
    if (c) {
      ['pointerdown', 'mousedown', 'click', 'touchstart'].forEach(function (n) {
        c.addEventListener(n, function (e) { if (klikAan && e.target === c) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
      });
      c.addEventListener('pointerup', onKlik, true);
      c.style.cursor = 'crosshair';
    }
    var plek = document.querySelector('.controls') || (c && c.parentNode);
    if (plek && plek.parentNode) {
      strookEl = mk('div', 'bkrv-strook'); strookEl.setAttribute('aria-label', 'Reviewopmerkingen in deze film');
      tip = mk('div', 'bkrv-tip');
      plek.parentNode.insertBefore(strookEl, plek.nextSibling);
      plek.parentNode.insertBefore(tip, strookEl.nextSibling);
    }
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'textarea' || tag === 'input') return;
      if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey) { klikAan = !klikAan; balkTekst(); }
      if ((e.key === 'n' || e.key === 'N') && !e.ctrlKey && !e.metaKey) { e.preventDefault(); opmerkingVak(null, null); }
    }, true);
    window.addEventListener('scroll', function () { if (pin && !vak) { pin.remove(); pin = null; } }, { passive: true });
    balkTekst(); laad();
    var tries = 0, wacht = setInterval(function () { if (totaal() || ++tries > 40) { clearInterval(wacht); strook(); } }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

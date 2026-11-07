/* Volgende film (Kamiel 7 nov 2026: 'als je een film hebt gezien kun je doorklikken naar de volgende van dat thema').
   Wordt in films meegeladen door js/teller.js. Leest films/volgende.json (gemaakt met scripts/volgende.py).
   - In de sitebalk komt naast '← Terug naar …' een knop 'Volgende film →' (niet bij de laatste film van de reeks).
   - Is de film (bijna) uitgekeken en valt het geluid stil, dan schuift er een kaart in met de volgende film
     van de reeks (of, bij de laatste film, 'Terug naar <thema>'). Nogmaals kijken kan gewoon; de kaart sluit met ×. De film telt dan ook als gezien (✓ in de filmlijsten).
   - Welke reeks: staat een film in meer reeksen (bv. extra bij Voeding én Wat word jij?), dan wint de reeks
     die past bij de pagina waar je vandaan kwam (thema's of Wat word jij?), daarna die van de '←'-link.
   Testen: ?volgende=toon laat de kaart meteen zien. */
(function () {
  'use strict';
  if (window.__bkVolgende) return;
  window.__bkVolgende = true;
  var me = document.currentScript;
  var rootAttr = (me && me.getAttribute('data-root')) || './';
  var ROOT = new URL(rootAttr, location.href);
  var rootPad = ROOT.pathname;

  function padVan(u) {
    var p = new URL(u, location.href).pathname;
    if (p.indexOf(rootPad) === 0) p = p.slice(rootPad.length);
    p = p.replace(/^\/+/, '');
    if (p === '' || /\/$/.test(p)) p += 'index.html';
    try { return decodeURIComponent(p); } catch (e) { return p; }
  }
  var PAD = padVan(location.href);
  if (!/^films\//.test(PAD) || /presentatie\.html$/.test(PAD) || window.top !== window.self) return;

  function lees(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function schrijf(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function gezienZet(href) {
    var g = {};
    try { g = JSON.parse(lees('gezien') || '{}') || {}; } catch (e) { g = {}; }
    if (!g[href]) { g[href] = 1; schrijf('gezien', JSON.stringify(g)); }
  }
  // 'index.html#gedrag' of 'vervolg.html#marien' uit een url, als die op de site zelf ligt
  function plek(u) {
    try {
      var x = new URL(u, location.href);
      if (x.origin !== location.origin || !x.hash) return '';
      return padVan(x.href) + x.hash;
    } catch (e) { return ''; }
  }

  // Ook bij het luisteren meten, onafhankelijk van teller.js (die stopt vroeg bij uitgezette telling).
  var geluisterd = 0, vorige = new WeakMap(), gekoppeld = new WeakSet(), alle = [];
  function koppel(el) {
    if (gekoppeld.has(el)) return;
    gekoppeld.add(el);
    alle.push(el);
    el.addEventListener('playing', function () { vorige.set(el, el.currentTime); });
    el.addEventListener('timeupdate', function () {
      var t = el.currentTime, v = vorige.get(el);
      vorige.set(el, t);
      if (el.paused || v == null) return;
      var d = t - v;
      if (d > 0 && d <= 2) geluisterd += d;
    });
    ['seeking', 'emptied', 'loadstart'].forEach(function (n) { el.addEventListener(n, function () { vorige.delete(el); }); });
  }
  // Is de film af? De gewone speler (FILMDATA, bijna alle films) heeft een globale 'state':
  // af = gestopt op het laatste stuk, aan het eind daarvan. Andere spelers: het meeste is
  // beluisterd en er speelt al een paar seconden geen geluid meer.
  function filmState() { try { return (typeof state === 'object' && state && state.items) ? state : null; } catch (e) { return null; } } // eslint-disable-line no-undef
  var stil = 0, gespeeld = false;
  function isAf(duur) {
    var st = filmState();
    if (st) {
      // ook als je naar het eind doorspoelt (bv. in de reviewstand): de film moet wel een keer gespeeld hebben
      if (st.playing) gespeeld = true;
      var it = st.items[st.idx];
      return gespeeld && !st.playing && st.idx >= st.items.length - 1 && it && st.local >= (it.dur || 0) - 0.1;
    }
    if (geluisterd < 20) return false;
    var speelt = alle.some(function (el) { return !el.paused && !el.ended; });
    stil = speelt ? 0 : stil + 1;
    return stil >= 4 && (duur > 0 ? geluisterd >= duur * 0.8 : geluisterd >= 120);
  }
  var play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    try { koppel(this); } catch (e) {}
    return play.apply(this, arguments);
  };
  document.addEventListener('play', function (e) { if (e.target instanceof HTMLMediaElement) koppel(e.target); }, true);

  fetch(new URL('films/volgende.json?v=1', ROOT).href).then(function (r) { return r.json(); }).then(function (D) {
    var ids = (D.film || {})[PAD];
    if (!ids || !ids.length) return;
    // De browser geeft de #-plek van de vorige pagina niet mee, wel de pagina zelf (index.html of vervolg.html).
    var back = document.getElementById('back');
    var van = '', terugPlek = back ? plek(back.href) : '';
    try { var rf = new URL(document.referrer); if (rf.origin === location.origin) van = padVan(rf.href); } catch (e) {}
    var rid = ids[0], beste = -1;
    for (var i = 0; i < ids.length; i++) {
      var t = plek(new URL(D.reeksen[ids[i]].terug, ROOT).href), score = 0;
      if (van && t.split('#')[0] === van) score += 2;
      if (t === terugPlek) score += 1;
      if (score > beste) { beste = score; rid = ids[i]; }
    }
    var R = D.reeksen[rid], lijst = R.films, nr = -1;
    for (var k = 0; k < lijst.length; k++) if (lijst[k][0] === PAD) { nr = k; break; }
    if (nr < 0) return;
    var volgende = lijst[nr + 1] || null;
    var duur = (lijst[nr][2] || 0) * 60;
    bouw(R, nr, lijst.length, volgende, duur);
  }).catch(function () {});

  function css() {
    if (document.getElementById('bkvf-css')) return;
    var s = document.createElement('style');
    s.id = 'bkvf-css';
    s.textContent =
      '.bkvf-nav{color:var(--goud,#E0B64A)!important}' +
      '.bkvf{position:fixed;right:20px;bottom:20px;z-index:60;width:min(380px,calc(100vw - 32px));box-sizing:border-box;' +
      'background:var(--bg,#1A2740);color:var(--text,#F2F2EE);border:1px solid var(--goud,#E0B64A);border-radius:16px;' +
      'padding:16px 18px 14px;box-shadow:0 12px 40px rgba(0,0,0,.45);font-family:var(--tekst,system-ui,sans-serif);' +
      'transform:translateY(24px);opacity:0;transition:transform .35s ease,opacity .35s ease}' +
      '.bkvf.aan{transform:none;opacity:1}' +
      '.bkvf .bkvf-kop{font:12px/1.3 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--text2,#9AA3B2);margin:0 28px 6px 0}' +
      '.bkvf .bkvf-titel{font-family:var(--titel,Georgia,serif);font-size:20px;line-height:1.25;margin:0 0 4px}' +
      '.bkvf .bkvf-sub{font-size:14px;color:var(--text2,#9AA3B2);margin:0 0 12px}' +
      '.bkvf .bkvf-ga{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;box-sizing:border-box;min-height:44px;' +
      'border-radius:999px;background:var(--goud,#E0B64A);color:#1A2740;font-weight:600;font-size:16px;text-decoration:none;padding:8px 16px}' +
      '.bkvf .bkvf-ga:hover{filter:brightness(1.08)}' +
      '.bkvf .bkvf-dicht{position:absolute;top:8px;right:8px;width:32px;height:32px;border:0;border-radius:50%;background:transparent;' +
      'color:var(--text2,#9AA3B2);font-size:20px;line-height:32px;cursor:pointer}' +
      '.bkvf .bkvf-dicht:hover{background:rgba(143,160,181,.15)}' +
      '@media (max-width:600px){.bkvf{right:16px;left:16px;bottom:16px;width:auto}.bkvf-nav{display:none!important}}' +
      '@media (prefers-reduced-motion:reduce){.bkvf{transition:none}}';
    (document.head || document.documentElement).appendChild(s);
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function bouw(R, nr, totaal, volgende, duur) {
    css();
    var url = volgende ? new URL(volgende[0], ROOT).href : new URL(R.terug, ROOT).href;
    var naarVolgende = function () { gezienZet(PAD); if (volgende) gezienZet(volgende[0]); };

    // 1. knop in de sitebalk
    var back = document.getElementById('back');
    if (volgende && back && back.parentNode) {
      var a = document.createElement('a');
      a.href = url;
      a.className = 'bkvf-nav';
      a.textContent = 'Volgende film →';
      a.title = 'Film ' + (nr + 2) + ' van ' + totaal + ': ' + volgende[1];
      a.addEventListener('click', naarVolgende);
      back.parentNode.insertBefore(a, back.nextSibling);
    }

    // 2. kaart aan het eind van de film
    var kaart = null, getoond = false;
    function toon() {
      if (getoond) return;
      getoond = true;
      gezienZet(PAD);
      kaart = document.createElement('aside');
      kaart.className = 'bkvf';
      kaart.setAttribute('role', 'dialog');
      kaart.setAttribute('aria-label', volgende ? 'Volgende film' : 'Laatste film van de reeks');
      kaart.innerHTML = volgende
        ? '<p class="bkvf-kop">Volgende in ' + esc(R.titel) + ' · film ' + (nr + 2) + ' van ' + totaal + '</p>' +
          '<p class="bkvf-titel">' + esc(volgende[1]) + '</p>' +
          '<p class="bkvf-sub">' + (volgende[2] ? volgende[2] + ' minuten' : '&nbsp;') + '</p>' +
          '<a class="bkvf-ga" href="' + esc(url) + '">Kijk de volgende film →</a>'
        : '<p class="bkvf-kop">' + esc(R.titel) + ' · film ' + (nr + 1) + ' van ' + totaal + '</p>' +
          '<p class="bkvf-titel">Dit was de laatste film van deze reeks</p>' +
          '<p class="bkvf-sub">Goed gedaan! Kies op de themapagina wat je hierna doet.</p>' +
          '<a class="bkvf-ga" href="' + esc(url) + '">Terug naar ' + esc(R.titel.replace(/^Nieuwsgierig\? · /, '')) + '</a>';
      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'bkvf-dicht';
      x.setAttribute('aria-label', 'Sluiten');
      x.textContent = '×';
      x.addEventListener('click', function () { kaart.classList.remove('aan'); setTimeout(function () { kaart.remove(); }, 400); });
      kaart.appendChild(x);
      kaart.querySelector('.bkvf-ga').addEventListener('click', naarVolgende);
      document.body.appendChild(kaart);
      requestAnimationFrame(function () { requestAnimationFrame(function () { kaart.classList.add('aan'); }); });
    }
    var klok = setInterval(function () { if (getoond) { clearInterval(klok); return; } if (isAf(duur)) toon(); }, 1000);
    if (new URLSearchParams(location.search).get('volgende') === 'toon') toon();
  }
})();

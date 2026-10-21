/* Feedback-knop voor Biologie bij Kamiel (Kamiel 21 okt 2026).
   Wordt op elke pagina geladen door js/teller.js (dat staat al overal), dus geen eigen scripttag nodig.
   - knop 'Feedback?' in de kopbalk (naast licht/donker, of rechts in de sitebalk van films en tools);
     op de telefoon alleen een rond '?'
   - klein zwevend knopje rechtsonder zodra de kopbalk uit beeld is (in films verborgen zolang het geluid speelt)
   - venstertje: soort, tekst, optioneel naam/klas; pagina, paginatitel, #-plek en bij films het
     geluidsfragment + tijdstip gaan automatisch mee
   - opslag: Firebase Realtime Database (project edutool), knooppunt feedback/<push-id>, via de REST-API
     (geen SDK, geen inlog nodig om in te sturen). Lezen kan alleen de docent: sessie/feedback.html.
     Regels: sessie/database.rules.json (blok "feedback").
   - ?feedback=0 of window.BK_GEEN_FEEDBACK = true zet de knop uit op een pagina. */
(function () {
  'use strict';
  if (window.__bkFeedback || window.BK_GEEN_FEEDBACK) return;
  window.__bkFeedback = true;
  try { if (new URLSearchParams(location.search).get('feedback') === '0') return; } catch (e) {}
  if (window.top !== window.self) return; // niet in iframes (voorbeelden, kunst.html)

  var DB = 'https://edutool-4b00b-default-rtdb.europe-west1.firebasedatabase.app';
  var me = document.currentScript;
  var root = new URL((me && me.getAttribute('data-root')) || './', location.href).pathname;
  function pad() {
    var p = location.pathname;
    if (p.indexOf(root) === 0) p = p.slice(root.length);
    p = p.replace(/^\/+/, '');
    if (p === '' || /\/$/.test(p)) p += 'index.html';
    try { return decodeURIComponent(p); } catch (e) { return p; }
  }
  var PAD = pad();
  var IS_FILM = /^films\//.test(PAD) && !/presentatie\.html$/.test(PAD);

  var SOORTEN = [
    ['fout', 'Fout gevonden'],
    ['onduidelijk', 'Onduidelijk'],
    ['idee', 'Idee'],
    ['compliment', 'Compliment']
  ];

  /* ---------- geluid volgen (voor het tijdstip in een film) ---------- */
  var laatste = null, speelt = 0;
  function volg(el) {
    if (!el || el.__bkfb) return;
    el.__bkfb = true;
    el.addEventListener('playing', function () { laatste = el; speelt++; zwevend(); });
    ['pause', 'ended'].forEach(function (n) {
      el.addEventListener(n, function () { speelt = Math.max(0, speelt - 1); zwevend(); });
    });
  }
  if (IS_FILM) {
    var play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      try { volg(this); laatste = this; } catch (e) {}
      return play.apply(this, arguments);
    };
    document.addEventListener('play', function (e) {
      if (e.target instanceof HTMLMediaElement) { volg(e.target); laatste = e.target; }
    }, true);
  }
  function mmss(t) {
    t = Math.max(0, Math.floor(t || 0));
    return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
  }
  function plek() {
    var delen = [];
    if (location.hash && location.hash.length > 1) delen.push(location.hash);
    if (IS_FILM && laatste) {
      var src = laatste.currentSrc || laatste.src || '';
      var naam = src.indexOf('data:') === 0 ? 'ingebed geluid' : decodeURIComponent(src.split('?')[0].split('/').pop() || '');
      delen.push('geluid ' + (naam || '?') + ' @ ' + mmss(laatste.currentTime));
    }
    return delen.join(' · ').slice(0, 200);
  }

  /* ---------- opmaak ---------- */
  var CSS = '' +
    '.bkfb-kop{display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 14px;border-radius:999px;' +
      'border:1px solid var(--line2,rgba(255,255,255,.18));background:none;color:var(--text2,#9AA3B2);' +
      'font:600 14px/1 "Source Sans 3",system-ui,sans-serif;cursor:pointer;white-space:nowrap;flex:none}' +
    '.bkfb-kop:hover,.bkfb-kop:focus-visible{color:var(--text,#E8ECF3);border-color:var(--goud,#E0B64A)}' +
    '.bkfb-kop .bkfb-vr{display:none}' +
    '.sitenav .bkfb-kop{margin-left:auto;height:44px;padding:0 16px;font-size:15px}' +
    '@media (max-width:640px){.bkfb-kop{width:40px;padding:0;justify-content:center}.bkfb-kop .bkfb-woord{display:none}' +
      '.bkfb-kop .bkfb-vr{display:inline;font-size:17px}.sitenav .bkfb-kop{width:44px;padding:0}}' +
    '.bkfb-zweef{position:fixed;right:16px;bottom:16px;z-index:9998;width:44px;height:44px;border-radius:999px;' +
      'border:1px solid var(--line2,rgba(255,255,255,.18));background:var(--surface,#16233d);color:var(--text,#E8ECF3);' +
      'font:700 19px/1 "Source Sans 3",system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.28);' +
      'opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .25s,transform .25s}' +
    '.bkfb-zweef.aan{opacity:.82;transform:none;pointer-events:auto}.bkfb-zweef:hover,.bkfb-zweef:focus-visible{opacity:1;border-color:var(--goud,#E0B64A)}' +
    '.bkfb-dek{position:fixed;inset:0;z-index:9999;background:rgba(5,10,22,.6);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.bkfb-dek[hidden]{display:none}' +
    '.bkfb-venster{width:100%;max-width:460px;max-height:calc(100vh - 32px);overflow:auto;background:var(--surface,#16233d);' +
      'color:var(--text,#E8ECF3);border:1px solid var(--line2,rgba(255,255,255,.18));border-radius:16px;padding:22px 22px 18px;' +
      'font:16px/1.45 "Source Sans 3",system-ui,sans-serif;box-shadow:0 18px 50px rgba(0,0,0,.4)}' +
    '.bkfb-venster h2{margin:0 0 4px;font:600 22px/1.2 Fraunces,Georgia,serif;color:var(--titel,var(--text,#E8ECF3))}' +
    '.bkfb-venster p.bkfb-sub{margin:0 0 14px;color:var(--text2,#9AA3B2);font-size:14px}' +
    '.bkfb-soorten{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}' +
    '.bkfb-soorten button{border:1px solid var(--line2,rgba(255,255,255,.18));background:none;color:var(--text2,#9AA3B2);' +
      'border-radius:999px;padding:7px 12px;font:600 14px/1 "Source Sans 3",system-ui,sans-serif;cursor:pointer}' +
    '.bkfb-soorten button[aria-pressed="true"]{background:var(--goud,#E0B64A);border-color:var(--goud,#E0B64A);color:var(--goud-ink,#1a1406)}' +
    '.bkfb-venster textarea,.bkfb-venster input[type=text]{width:100%;box-sizing:border-box;background:var(--bg,#0d1628);color:var(--text,#E8ECF3);' +
      'border:1px solid var(--line2,rgba(255,255,255,.18));border-radius:10px;padding:10px 12px;font:16px/1.4 "Source Sans 3",system-ui,sans-serif}' +
    '.bkfb-venster textarea{min-height:120px;resize:vertical}' +
    '.bkfb-venster label{display:block;margin:10px 0 0;font-size:14px;color:var(--text2,#9AA3B2)}' +
    '.bkfb-venster label span{display:block;margin:0 0 4px}' +
    '.bkfb-plek{margin:10px 0 0;font:500 12px/1.4 "IBM Plex Mono",ui-monospace,monospace;color:var(--text3,#6F7A8E);word-break:break-all}' +
    '.bkfb-knoppen{display:flex;justify-content:flex-end;gap:8px;margin:16px 0 0}' +
    '.bkfb-knoppen button{border-radius:999px;padding:10px 18px;font:600 15px/1 "Source Sans 3",system-ui,sans-serif;cursor:pointer;' +
      'border:1px solid var(--line2,rgba(255,255,255,.18));background:none;color:var(--text,#E8ECF3)}' +
    '.bkfb-knoppen .bkfb-stuur{background:var(--goud,#E0B64A);border-color:var(--goud,#E0B64A);color:var(--goud-ink,#1a1406)}' +
    '.bkfb-knoppen button:disabled{opacity:.5;cursor:default}' +
    '.bkfb-melding{min-height:1.2em;margin:10px 0 0;font-size:14px}.bkfb-melding.fout{color:var(--koraal,#F08C7A)}' +
    '.bkfb-pot{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}' +
    '.bkfb-teller{float:right;font-size:12px;color:var(--text3,#6F7A8E)}' +
    '@media print{.bkfb-kop,.bkfb-zweef,.bkfb-dek{display:none!important}}';

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  var kopKnop, zweefKnop, dek, kopZichtbaar = false;

  function zwevend() {
    if (!zweefKnop) return;
    var aan = !kopZichtbaar && !(IS_FILM && speelt > 0) && (!dek || dek.hidden);
    zweefKnop.classList.toggle('aan', aan);
  }

  function plaatsKopKnop() {
    kopKnop = el('button', { type: 'button', class: 'bkfb-kop', 'aria-label': 'Feedback insturen', title: 'Feedback insturen' },
      '<span class="bkfb-woord">Feedback?</span><span class="bkfb-vr" aria-hidden="true">?</span>');
    kopKnop.addEventListener('click', open);
    // 1. naast de licht/donker-knop (hoofdpagina, challenges, vervolg, tools, sessie)
    var thema = document.querySelector('header #thema, [data-thema-knop], #thema');
    if (thema && thema.parentNode) {
      var buur = document.getElementById('kunstknop');
      var voor = buur && buur.parentNode === thema.parentNode ? buur : thema;
      thema.parentNode.insertBefore(kopKnop, voor);
      return true;
    }
    // 2. rechts in de sitebalk van een film
    var nav = document.querySelector('nav.sitenav');
    if (nav) { nav.appendChild(kopKnop); return true; }
    kopKnop = null;
    return false;
  }

  function bouw() {
    var st = el('style', { id: 'bkfb-css' });
    st.textContent = CSS;
    document.head.appendChild(st);

    plaatsKopKnop();

    zweefKnop = el('button', { type: 'button', class: 'bkfb-zweef', 'aria-label': 'Feedback insturen', title: 'Feedback insturen' }, '?');
    zweefKnop.addEventListener('click', open);
    document.body.appendChild(zweefKnop);

    if (kopKnop && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (items) {
        kopZichtbaar = items[0].isIntersecting;
        zwevend();
      }).observe(kopKnop);
    }
    zwevend();
  }

  /* ---------- venster ---------- */
  var gekozen = null, vorigeFocus = null;
  function maakVenster() {
    dek = el('div', { class: 'bkfb-dek', hidden: '' });
    dek.innerHTML =
      '<form class="bkfb-venster" role="dialog" aria-modal="true" aria-labelledby="bkfb-titel" novalidate>' +
      '<h2 id="bkfb-titel">Feedback</h2>' +
      '<p class="bkfb-sub">Iets gezien dat niet klopt, onduidelijk is of beter kan? Laat het weten.</p>' +
      '<div class="bkfb-soorten" role="group" aria-label="Soort feedback">' +
        SOORTEN.map(function (s) { return '<button type="button" data-s="' + s[0] + '" aria-pressed="false">' + s[1] + '</button>'; }).join('') +
      '</div>' +
      '<label><span>Wat wil je kwijt? <em class="bkfb-teller">0 / 2000</em></span><textarea name="tekst" maxlength="2000" required></textarea></label>' +
      '<label><span>Naam of klas (mag je leeg laten)</span><input type="text" name="naam" maxlength="60" autocomplete="off"></label>' +
      '<div class="bkfb-pot" aria-hidden="true"><input type="text" name="website" tabindex="-1" autocomplete="off"></div>' +
      '<div class="bkfb-plek"></div>' +
      '<p class="bkfb-melding" aria-live="polite"></p>' +
      '<div class="bkfb-knoppen"><button type="button" class="bkfb-sluit">Annuleren</button><button type="submit" class="bkfb-stuur">Versturen</button></div>' +
      '</form>';
    document.body.appendChild(dek);
    var f = dek.querySelector('form');
    dek.addEventListener('click', function (e) { if (e.target === dek) sluit(); });
    dek.querySelector('.bkfb-sluit').addEventListener('click', sluit);
    dek.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); sluit(); }
      e.stopPropagation(); // geen sneltoetsen van films/lessen tijdens het typen
    });
    dek.addEventListener('keyup', function (e) { e.stopPropagation(); });
    dek.querySelectorAll('.bkfb-soorten button').forEach(function (b) {
      b.addEventListener('click', function () {
        gekozen = b.getAttribute('data-s');
        dek.querySelectorAll('.bkfb-soorten button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
    var ta = f.elements.tekst;
    ta.addEventListener('input', function () { dek.querySelector('.bkfb-teller').textContent = ta.value.length + ' / 2000'; });
    f.addEventListener('submit', function (e) { e.preventDefault(); verstuur(f); });
  }

  function open() {
    if (!dek) maakVenster();
    vorigeFocus = document.activeElement;
    // films pauzeren niet vanzelf: zet het geluid even stil zodat je rustig kunt typen
    if (IS_FILM && laatste && !laatste.paused) { try { laatste.pause(); } catch (e) {} }
    var p = plek();
    dek.querySelector('.bkfb-plek').textContent = 'Gaat mee: ' + PAD + (p ? ' · ' + p : '');
    melding('');
    dek.hidden = false;
    zwevend();
    setTimeout(function () { dek.querySelector('textarea').focus(); }, 30);
  }
  function sluit() {
    if (!dek) return;
    dek.hidden = true;
    zwevend();
    if (vorigeFocus && vorigeFocus.focus) try { vorigeFocus.focus(); } catch (e) {}
  }
  function melding(t, fout) {
    var m = dek.querySelector('.bkfb-melding');
    m.textContent = t;
    m.classList.toggle('fout', !!fout);
  }

  function laatstVerstuurd() { try { return +localStorage.getItem('bk-feedback-tijd') || 0; } catch (e) { return 0; } }

  function verstuur(f) {
    var tekst = f.elements.tekst.value.trim();
    if (f.elements.website.value) { klaar(f); return; } // spambot
    if (!gekozen) { melding('Kies eerst wat voor feedback het is.', true); return; }
    if (tekst.length < 3) { melding('Schrijf even kort wat je bedoelt.', true); f.elements.tekst.focus(); return; }
    if (Date.now() - laatstVerstuurd() < 20000) { melding('Je hebt net al iets gestuurd. Wacht een paar tellen en probeer het dan opnieuw.', true); return; }
    var data = {
      soort: gekozen,
      tekst: tekst.slice(0, 2000),
      naam: f.elements.naam.value.trim().slice(0, 60),
      pagina: PAD.slice(0, 300),
      titel: (document.title || '').slice(0, 200),
      plek: plek(),
      scherm: (window.innerWidth + '×' + window.innerHeight).slice(0, 40),
      thema: (document.documentElement.getAttribute('data-theme') || '').slice(0, 10),
      status: 'nieuw',
      tijd: { '.sv': 'timestamp' }
    };
    var knop = f.querySelector('.bkfb-stuur');
    knop.disabled = true;
    melding('Versturen…');
    fetch(DB + '/feedback.json', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) {
        if (!r.ok) throw new Error('status ' + r.status);
        try { localStorage.setItem('bk-feedback-tijd', String(Date.now())); } catch (e) {}
        klaar(f);
      })
      .catch(function () {
        melding('Versturen lukt nu niet. Probeer het later nog eens, of zeg het in de les.', true);
      })
      .then(function () { knop.disabled = false; });
  }

  function klaar(f) {
    f.reset();
    gekozen = null;
    dek.querySelectorAll('.bkfb-soorten button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    dek.querySelector('.bkfb-teller').textContent = '0 / 2000';
    melding('Dank je! Je feedback is verstuurd.');
    setTimeout(sluit, 1400);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bouw);
  else bouw();
})();

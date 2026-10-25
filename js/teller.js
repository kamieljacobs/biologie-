/* Teller voor Biologie bij Kamiel (GoatCounter, zonder cookies of persoonsgegevens).
   Wordt op elke pagina geladen door scripts/teller.py:
     <script src="<pad>/js/teller.js" data-root="<pad naar de siteroot>" data-duur="<minuten>"></script>
   - telt de pagina, met als pad de plek in de repo (bv. films/dna/1-de-bouw-van-dna.html)
   - telt bij films drie gebeurtenissen (elk hooguit één keer per bezoek):
       start/<pad>        de eerste keer dat er geluid afspeelt
       halverwege/<pad>   na ±45% van de filmduur aan afgespeeld geluid
       uitgekeken/<pad>   na ±85% van de filmduur aan afgespeeld geluid
   - telt niets in een browser waar #toggle-goatcounter is gebruikt, en niets lokaal (file:// of localhost). */
(function () {
  'use strict';
  var CODE = 'https://biologiebijkamiel.goatcounter.com/count';
  var me = document.currentScript;
  if (!me || window.__teller) return;
  window.__teller = true;

  var root = new URL(me.getAttribute('data-root') || './', location.href).pathname;
  function pad() {
    var p = location.pathname;
    if (p.indexOf(root) === 0) p = p.slice(root.length);
    p = p.replace(/^\/+/, '');
    if (p === '' || /\/$/.test(p)) p += 'index.html';
    return decodeURIComponent(p);
  }
  var PAD = pad();

  // Feedback-knop (js/feedback.js) meeladen: teller.js staat al op elke pagina.
  try {
    var fb = document.createElement('script');
    fb.src = new URL('js/feedback.js?v=2', new URL(me.getAttribute('data-root') || './', location.href)).href;
    fb.setAttribute('data-root', me.getAttribute('data-root') || './');
    (document.head || document.documentElement).appendChild(fb);
  } catch (e) {}

  // Terug naar waar je was (js/terug.js): scrollpositie bij terugklikken.
  try {
    var tg = document.createElement('script');
    tg.src = new URL('js/terug.js?v=1', new URL(me.getAttribute('data-root') || './', location.href)).href;
    (document.head || document.documentElement).appendChild(tg);
  } catch (e) {}

  // Kopbalk op de telefoon (js/kopbalk.js): schuift weg bij naar beneden scrollen.
  try {
    if (document.querySelector('header.bar') || document.readyState === 'loading') {
      var kb = document.createElement('script');
      kb.src = new URL('js/kopbalk.js?v=1', new URL(me.getAttribute('data-root') || './', location.href)).href;
      (document.head || document.documentElement).appendChild(kb);
    }
  } catch (e) {}

  // Reviewstand in films (js/review.js): aan met ?review=1, blijft aan tot ?review=0.
  try {
    var rq = new URLSearchParams(location.search).get('review');
    var rAan = rq === '1' || (rq !== '0' && localStorage.getItem('bk-review') === '1');
    if (rq === '0') localStorage.removeItem('bk-review');
    if (rAan && /^films\//.test(PAD) && !/presentatie\.html$/.test(PAD) && window.top === window.self) {
      var rv = document.createElement('script');
      rv.src = new URL('js/review.js?v=2', new URL(me.getAttribute('data-root') || './', location.href)).href;
      rv.setAttribute('data-root', me.getAttribute('data-root') || './');
      (document.head || document.documentElement).appendChild(rv);
    }
  } catch (e) {}

  var DUUR = parseFloat(me.getAttribute('data-duur') || '0') * 60; // seconden

  function uitgezet() {
    try { return localStorage.getItem('skipgc') === 't'; } catch (e) { return false; }
  }

  window.goatcounter = window.goatcounter || {};
  window.goatcounter.path = function () { return PAD; };

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', CODE);
  (document.head || document.documentElement).appendChild(s);

  // Gebeurtenissen: wachten tot count.js geladen is, en elk soort maar één keer per bezoek.
  var gehad = {}, wacht = [];
  function stuur(soort) {
    if (gehad[soort] || uitgezet()) return;
    gehad[soort] = true;
    wacht.push(soort);
    leeg();
  }
  function leeg() {
    if (!window.goatcounter || typeof window.goatcounter.count !== 'function') {
      setTimeout(leeg, 1000);
      return;
    }
    while (wacht.length) {
      var soort = wacht.shift();
      try {
        window.goatcounter.count({ path: soort + '/' + PAD, title: soort + ': ' + document.title, event: true });
      } catch (e) {}
    }
  }

  // Alleen films (pagina's onder films/, geen presentaties) meten het kijken.
  if (!/^films\//.test(PAD) || /presentatie\.html$/.test(PAD)) return;

  var geluisterd = 0, vorige = new WeakMap(), gekoppeld = new WeakSet();
  function tik(el) {
    var t = el.currentTime, v = vorige.get(el);
    vorige.set(el, t);
    if (el.paused || v == null) return;
    var d = t - v;
    if (d > 0 && d <= 2) geluisterd += d; // spoelen telt niet mee
    if (DUUR > 0) {
      if (geluisterd >= DUUR * 0.45) stuur('halverwege');
      if (geluisterd >= DUUR * 0.85) stuur('uitgekeken');
    }
  }
  function koppel(el) {
    if (gekoppeld.has(el)) return;
    gekoppeld.add(el);
    el.addEventListener('playing', function () { vorige.set(el, el.currentTime); stuur('start'); });
    el.addEventListener('timeupdate', function () { tik(el); });
    ['seeking', 'emptied', 'loadstart'].forEach(function (n) {
      el.addEventListener(n, function () { vorige.delete(el); });
    });
  }
  // Films maken hun geluid vaak met new Audio(); die zitten niet in de pagina,
  // dus haken we in op play() zelf.
  var play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    try { koppel(this); } catch (e) {}
    return play.apply(this, arguments);
  };
  document.addEventListener('play', function (e) {
    if (e.target instanceof HTMLMediaElement) { koppel(e.target); stuur('start'); }
  }, true);
})();

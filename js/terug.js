/* Terug naar waar je was (Kamiel 25 okt 2026).
   Wordt meegeladen door js/teller.js, dus werkt op elke pagina.
   - Onthoudt per stap in de geschiedenis hoe ver je naar beneden was gescrold
     (sessionStorage 'bk-scroll'; sleutel = een id in history.state, anders de url).
   - Terugknop/vooruitknop van de browser: ook bij hash-pagina's (index.html#voeding,
     vervolg.html#psychologie) kom je terug op dezelfde hoogte, ook al zet de pagina
     zichzelf bij het opbouwen bovenaan.
   - Een link die begint met '←' (bv. '← Terug naar Voeding' in films): ging je net
     van die pagina hierheen, dan doet de link 'terug' in de geschiedenis; anders opent
     hij de pagina en scrolt naar waar je daar het laatst was. */
(function () {
  'use strict';
  if (window.__bkTerug) return;
  window.__bkTerug = true;

  var SK = 'bk-scroll', MAX = 120;
  function lees() { try { return JSON.parse(sessionStorage.getItem(SK)) || {}; } catch (e) { return {}; } }
  function bewaar(o) {
    try {
      var k = Object.keys(o);
      if (k.length > MAX) k.sort(function (a, b) { return (o[a].t || 0) - (o[b].t || 0); })
        .slice(0, k.length - MAX).forEach(function (x) { delete o[x]; });
      sessionStorage.setItem(SK, JSON.stringify(o));
    } catch (e) {}
  }
  function urlKey(u) { var x = new URL(u || location.href, location.href); return 'u:' + x.pathname.replace(/\/index\.html$/, '/') + x.search + x.hash; }

  // id van de huidige stap in de geschiedenis (in history.state, dat blijft bij terug/vooruit)
  function stapId() {
    var s = history.state;
    if (s && typeof s === 'object' && s.bkId) return s.bkId;
    if (s == null || (typeof s === 'object' && !Array.isArray(s))) {
      try {
        var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
        var n = {}; if (s) for (var k in s) n[k] = s[k];
        n.bkId = id;
        history.replaceState(n, '');
        return id;
      } catch (e) {}
    }
    return null;
  }

  var huidig = stapId(), urlNu = urlKey(), bezig = false, timer = 0, wacht = null;
  function sla(id, url, y) {
    var o = lees(), t = Date.now();
    if (id) o['s:' + id] = { y: y, t: t };
    o[url] = { y: y, t: t };
    bewaar(o);
  }
  function spoel() { clearTimeout(timer); timer = 0; if (wacht) { sla(wacht[0], wacht[1], wacht[2]); wacht = null; } }
  function nu() { spoel(); if (!bezig) sla(huidig, urlNu, Math.round(scrollY)); }

  addEventListener('scroll', function () {
    if (bezig) return;
    wacht = [huidig, urlNu, Math.round(scrollY)];
    clearTimeout(timer);
    timer = setTimeout(spoel, 150);
  }, { passive: true });
  addEventListener('pagehide', nu);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') nu(); });

  // Herstellen: een paar keer, want de pagina bouwt zichzelf op en plaatjes laden nog.
  function herstel(y) {
    if (!(y > 0)) return;
    bezig = true;
    var gestopt = false, pogingen = [0, 50, 150, 350, 700, 1200];
    function stop() { gestopt = true; }
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (e) { addEventListener(e, stop, { once: true, passive: true }); });
    pogingen.forEach(function (ms, i) {
      setTimeout(function () {
        if (!gestopt && Math.abs(scrollY - y) > 2) scrollTo(0, y);
        if (i === pogingen.length - 1) { bezig = false; sla(huidig, urlNu, Math.round(scrollY)); }
      }, ms);
    });
    requestAnimationFrame(function () { if (!gestopt) scrollTo(0, y); });
  }
  function opgeslagen(id, url) {
    var o = lees();
    if (id && o['s:' + id]) return o['s:' + id].y;
    return null;
  }

  // Hash-wissel binnen dezelfde pagina (index.html, vervolg.html, examenatlas.html …)
  addEventListener('hashchange', function () {
    spoel();
    var s = history.state, terugOfVooruit = !!(s && typeof s === 'object' && s.bkId);
    huidig = stapId(); urlNu = urlKey();
    if (terugOfVooruit) herstel(opgeslagen(huidig));
  });

  // Paginalading: via terug/vooruit, of via een '←'-link
  function bijLaden() {
    var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {};
    var o = lees(), y = null;
    if (nav.type === 'back_forward' || nav.type === 'reload') y = opgeslagen(huidig);
    var vlag = null; try { vlag = sessionStorage.getItem('bk-terug'); sessionStorage.removeItem('bk-terug'); } catch (e) {}
    if (y == null && vlag && vlag === urlNu && o[urlNu]) y = o[urlNu].y;
    if (y != null) herstel(y);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(bijLaden, 0); });
  else setTimeout(bijLaden, 0);
  addEventListener('pageshow', function (e) { if (e.persisted) { huidig = stapId(); urlNu = urlKey(); } });

  // '←'-links: terug in de geschiedenis als je net van die pagina kwam
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target && a.target !== '_self' || a.hasAttribute('download')) return;
    if (!/^\s*←/.test(a.textContent || '')) return;
    var doel; try { doel = new URL(a.href, location.href); } catch (x) { return; }
    if (doel.origin !== location.origin) return;
    nu();
    var ref = null; try { ref = document.referrer ? new URL(document.referrer) : null; } catch (x) {}
    var o = lees(), laatst = o['laatst'];
    var kwamVandaan = ref && ref.origin === doel.origin && urlKey(ref.href).split('#')[0] === urlKey(doel.href).split('#')[0];
    if (kwamVandaan && history.length > 1 && laatst && laatst.url === urlKey(doel.href)) {
      e.preventDefault();
      e.stopImmediatePropagation(); // films hebben soms een eigen history.back() op deze link
      history.back();
      return;
    }
    try { sessionStorage.setItem('bk-terug', urlKey(doel.href)); } catch (x) {}
  }, true);

  // onthoud welke pagina je als laatste verliet (voor de '←'-links)
  addEventListener('pagehide', function () { var o = lees(); o['laatst'] = { url: urlNu, t: Date.now() }; bewaar(o); });
})();

/* =====================================================================================
   Speler
   ===================================================================================== */
const cv = document.getElementById('cv'), ctx = cv.getContext('2d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let vwo = true, scr = 0, p = 0, tStap = performance.now(), tScherm = performance.now();
const startTijden = {};
try { const q = new URLSearchParams(location.search).get('niveau'); const sv = localStorage.getItem('niveau'); vwo = q === 'havo' ? false : q === 'vwo' ? true : sv !== 'havo'; } catch (e) {}
const zichtbaar = (i) => SCHERMEN[i].stappen.map((s, k) => k).filter(k => vwo || !SCHERMEN[i].stappen[k].vwo);

function maat() { const r = cv.getBoundingClientRect(); const d = Math.min(2, window.devicePixelRatio || 1); const w = Math.max(320, Math.round(r.width * d)), h = Math.round(w * 9 / 16); if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; } }
function frame(now) {
  maat(); const sc = SCHERMEN[scr], vis = zichtbaar(scr), b = vis[Math.min(p, vis.length - 1)];
  const tb = reduce ? 99 : (now - tStap) / 1000, T = (now - tScherm) / 1000;
  const S = { b, T, vwo,
    on(k, d = 0.9, del = 0) { if (b == null) return 0; const st = sc.stappen[k]; if (!st || (st.vwo && !vwo)) return 0; if (b > k) return 1; if (b < k) return 0; return ease((tb - del) / d); },
    start(k) { return (startTijden[scr + ':' + k] || now) / 1000 - tScherm / 1000; } };
  ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0); ctx.clearRect(0, 0, W, H); ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  if (!sc.geenKop) { text(ctx, sc.titel === 'Start' ? '' : kopVan(sc), 80, 100, fTitel(54), C.text); metaText(ctx, sc.deel, 82, 140, C.meta, 'left', 20); }
  try { sc.teken(ctx, S); } catch (e) { console.error(e); }
  requestAnimationFrame(frame);
}
function kopVan(sc) { return sc.kop || sc.titel; }

const capTxt = document.getElementById('capTxt'), capNot = document.getElementById('capNot'), dots = document.getElementById('dots'), teller = document.getElementById('teller'), chips = document.getElementById('chips');
function tekstKaart() {
  const vis = zichtbaar(scr), k = vis[p], st = SCHERMEN[scr].stappen[k];
  capTxt.innerHTML = (st.vwo ? '<span class="vwo-tag">vwo</span>' : '') + ((!vwo && st.th) ? st.th : st.t);
  capNot.textContent = st.n || '';
  dots.innerHTML = vis.map((kk, i) => `<i class="${i < p ? 'done' : i === p ? 'cur' : ''}${SCHERMEN[scr].stappen[kk].vwo ? ' vwo' : ''}"></i>`).join('');
  teller.textContent = `scherm ${scr + 1}/${SCHERMEN.length} · stap ${p + 1}/${vis.length}`;
  chips.querySelectorAll('.chip[data-i]').forEach(c => c.classList.toggle('cur', +c.dataset.i === scr));
  document.getElementById('terug').disabled = volgendVol(scr - 1, -1) < 0 && p === 0;
  document.getElementById('verder').disabled = volgendVol(scr + 1, 1) < 0 && p === vis.length - 1;
  chips.querySelectorAll('.chip[data-i]').forEach(c => { c.hidden = leeg(+c.dataset.i); });
  try { history.replaceState(null, '', '#' + (scr + 1)); } catch (e) {}
}
function markeer() { startTijden[scr + ':' + zichtbaar(scr)[p]] = performance.now(); }
// een scherm met alleen vwo-stappen telt in havo niet mee (wordt overgeslagen)
const leeg = (i) => zichtbaar(i).length === 0;
function volgendVol(i, d) { while (i >= 0 && i < SCHERMEN.length && leeg(i)) i += d; return (i >= 0 && i < SCHERMEN.length) ? i : -1; }
function verder() { const vis = zichtbaar(scr); if (p < vis.length - 1) { p++; tStap = performance.now(); } else { const v = volgendVol(scr + 1, 1); if (v < 0) return; scr = v; p = 0; tStap = tScherm = performance.now(); } markeer(); tekstKaart(); }
function terug() { if (p > 0) p--; else { const v = volgendVol(scr - 1, -1); if (v < 0) return; scr = v; p = zichtbaar(scr).length - 1; tScherm = performance.now() - 20000; } tStap = performance.now() - 20000; markeer(); tekstKaart(); }
function naarScherm(i) { i = clamp(i, 0, SCHERMEN.length - 1); const d = i < scr ? -1 : 1; let v = volgendVol(i, d); if (v < 0) v = volgendVol(i, -d); if (v < 0) return; scr = v; p = 0; tStap = tScherm = performance.now(); markeer(); tekstKaart(); }
function opnieuw() { tStap = performance.now(); markeer(); }

// chips per scherm, gegroepeerd per deel
(function () { let deel = ''; chips.innerHTML = SCHERMEN.map((s, i) => { let h = ''; if (s.deel !== deel) { deel = s.deel; h += `<span class="chip deel">${deel}</span>`; } return h + `<button type="button" class="chip" data-i="${i}"><span class="n">${i + 1}</span>${s.titel}</button>`; }).join('');
  chips.addEventListener('click', e => { const c = e.target.closest('.chip[data-i]'); if (c) naarScherm(+c.dataset.i); }); })();

function zetNiveau(v) { vwo = v; document.getElementById('lvVwo').setAttribute('aria-pressed', v); document.getElementById('lvHavo').setAttribute('aria-pressed', !v); try { localStorage.setItem('niveau', v ? 'vwo' : 'havo'); } catch (e) {} if (leeg(scr)) { let w = volgendVol(scr, 1); if (w < 0) w = volgendVol(scr, -1); scr = w; p = 0; } p = Math.min(p, zichtbaar(scr).length - 1); tekstKaart(); }
document.getElementById('lvVwo').onclick = () => zetNiveau(true);
document.getElementById('lvHavo').onclick = () => zetNiveau(false);
const lblBtn = document.getElementById('lblBtn');
function wisselNamen() { toonNamen = !toonNamen; lblBtn.setAttribute('aria-pressed', !toonNamen); lblBtn.textContent = toonNamen ? 'Namen verbergen' : 'Namen tonen'; }
lblBtn.onclick = wisselNamen;
function presenteer(aan) {
  document.body.classList.toggle('presenteer', aan); document.body.classList.toggle('muis', false);
  const el = document.documentElement, aanVS = el.requestFullscreen || el.webkitRequestFullscreen, uitVS = document.exitFullscreen || document.webkitExitFullscreen, vs = document.fullscreenElement || document.webkitFullscreenElement;
  try { if (aan && !vs && aanVS) { const r = aanVS.call(el); if (r && r.catch) r.catch(() => {}); } if (!aan && vs && uitVS) { const r = uitVS.call(document); if (r && r.catch) r.catch(() => {}); } } catch (e) {}
}
// groot scherm: knoppen tonen bij muisbeweging, na 2,5 s stil weer verbergen (ook de muiswijzer)
let _muisTimer = 0;
document.addEventListener('mousemove', () => { if (!document.body.classList.contains('presenteer')) return; document.body.classList.add('muis'); document.body.classList.remove('muisweg'); clearTimeout(_muisTimer); _muisTimer = setTimeout(() => { if (!document.querySelector('.knoppen:hover')) { document.body.classList.remove('muis'); document.body.classList.add('muisweg'); } }, 2500); });
function wisselTekst() { const z = document.body.classList.toggle('zondertekst'); const b = document.getElementById('tekstBtn'); if (b) b.textContent = z ? 'Tekst aan' : 'Tekst uit'; try { localStorage.setItem('les-zondertekst', z ? '1' : '0'); } catch (e) {} }
try { if (localStorage.getItem('les-zondertekst') === '1') { document.body.classList.add('zondertekst'); } } catch (e) {}
document.addEventListener('webkitfullscreenchange', () => { if (!document.webkitFullscreenElement) document.body.classList.remove('presenteer'); });
document.getElementById('presBtn').onclick = () => presenteer(true);
document.getElementById('grootBtn').addEventListener('click', e => { e.stopPropagation(); presenteer(true); });
document.getElementById('tekstBtn').onclick = wisselTekst;
document.getElementById('tekstBtn').textContent = document.body.classList.contains('zondertekst') ? 'Tekst aan' : 'Tekst uit';
document.getElementById('stopPres').onclick = () => presenteer(false);
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) document.body.classList.remove('presenteer'); });
document.getElementById('verder').onclick = verder;
document.getElementById('terug').onclick = terug;
document.getElementById('opnieuw').onclick = opnieuw;
document.getElementById('stage').addEventListener('click', verder);
document.addEventListener('keydown', e => {
  if (e.target.closest('input,textarea,select')) return; if (e.altKey || e.ctrlKey || e.metaKey) return;
  const k = e.key;
  if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter') { if (k === 'Enter' && e.target.closest('button')) return; e.preventDefault(); verder(); }
  else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); terug(); }
  else if (k === 'ArrowDown') { e.preventDefault(); naarScherm(scr + 1); }
  else if (k === 'ArrowUp') { e.preventDefault(); naarScherm(scr - 1); }
  else if (k === 'Home') naarScherm(0);
  else if (k === 'r' || k === 'R') opnieuw();
  else if (k === 'l' || k === 'L') wisselNamen();
  else if ((k === 't' || k === 'T') && document.body.classList.contains('presenteer')) wisselTekst();
  else if (k === 'f' || k === 'F') presenteer(!document.body.classList.contains('presenteer'));
  else if (k === 'Escape') presenteer(false);
});
document.addEventListener('themawissel', zetPalet);

(function () { const m = (location.hash.match(/^#(\d+)/) || [])[1]; if (m) { scr = clamp(+m - 1, 0, SCHERMEN.length - 1); } })();
zetNiveau(vwo); markeer(); tekstKaart();
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(frame));
// testhaak (alleen voor controle-screenshots): window.__les.naar(scherm, stap) toont die stap meteen in eindstand
window.__les = { n: () => SCHERMEN.length, stappen: (i) => zichtbaar(i).length, naar(i, k) { scr = clamp(i, 0, SCHERMEN.length - 1); p = clamp(k, 0, zichtbaar(scr).length - 1); tStap = tScherm = performance.now() - 30000; markeer(); tekstKaart(); }, niveau(v) { zetNiveau(v); }, namen(v) { if (toonNamen !== v) wisselNamen(); } };

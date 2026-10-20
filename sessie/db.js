/* Werksessies · databaselaag (Biologie bij Kamiel)
   Eén interface voor twee opslagvormen:
     firebase – Firebase Realtime Database + Authentication (anoniem voor leerlingen, e-mail/wachtwoord voor de docent)
     demo     – alles in localStorage van deze browser; elk tabblad is een eigen leerling (test zonder Firebase, ?demo=1)
   Gegevens:
     sessies/<code>              {eigenaar, gemaakt, film, filmtitel, json, opdrachten[], modus 'vrij'|'samen', vrij (aantal vrijgegeven),
                                  wacht {begrippen, extra, vragen[]}, status 'open'|'bespreken'|'dicht', bespreek {nr, juist, namen}}
     deelnemers/<code>/<uid>     {naam, binnen, gezien}
     antwoorden/<code>/<uid>/<opdracht-id>  {eerste, laatste, pogingen, klaar, tijd}   (eerste/laatste = resultaat van oefenen.js)
     antwoorden/<code>/<uid>/_begrippen     {goed, totaal}
     antwoorden/<code>/<uid>/_vraag<n>      {tekst, tijd} */
import { FIREBASE, DOCENT_UID } from './config.js';

const SDK = 'https://www.gstatic.com/firebasejs/13.0.0/';

export async function maakDb() {
  const demo = !FIREBASE || new URLSearchParams(location.search).has('demo');
  return demo ? demoDb() : firebaseDb();
}

/* ---------------- Firebase ---------------- */
async function firebaseDb() {
  const [appM, authM, dbM] = await Promise.all([
    import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js'), import(SDK + 'firebase-database.js')
  ]);
  const app = appM.initializeApp(FIREBASE);
  const auth = authM.getAuth(app);
  const db = dbM.getDatabase(app);
  const r = (p) => dbM.ref(db, p);
  let gebruiker = null;
  const klaar = new Promise((ok) => { const uit = authM.onAuthStateChanged(auth, (u) => { gebruiker = u; uit(); ok(); }); });
  await klaar;
  return {
    modus: 'firebase',
    uid: () => auth.currentUser && auth.currentUser.uid,
    isDocent: () => !!auth.currentUser && auth.currentUser.uid === DOCENT_UID,
    async docentLogin(email, wachtwoord) { await authM.signInWithEmailAndPassword(auth, email, wachtwoord); return auth.currentUser.uid === DOCENT_UID; },
    async uitloggen() { await authM.signOut(auth); },
    async leerlingLogin() {
      if (!auth.currentUser) await authM.signInAnonymously(auth);
      return auth.currentUser.uid;
    },
    async lees(p) { const s = await dbM.get(r(p)); return s.val(); },
    zet: (p, v) => dbM.set(r(p), v),
    werkBij: (p, v) => dbM.update(r(p), v),
    weg: (p) => dbM.remove(r(p)),
    luister(p, cb) { return dbM.onValue(r(p), (s) => cb(s.val()), (e) => console.warn('luisteren mislukt', p, e)); },
    verbinding(cb) { return dbM.onValue(r('.info/connected'), (s) => cb(!!s.val())); }
  };
}

/* ---------------- demo (localStorage) ---------------- */
function demoDb() {
  const SLEUTEL = 'bk-sessie-demo';
  const luisteraars = new Set();
  const lees = () => { try { return JSON.parse(localStorage.getItem(SLEUTEL) || '{}'); } catch (e) { return {}; } };
  const delen = (p) => String(p).split('/').filter(Boolean);
  const pak = (boom, p) => delen(p).reduce((n, k) => (n == null ? null : (n[k] === undefined ? null : n[k])), boom);
  function plaats(boom, p, v) {
    const d = delen(p); let n = boom;
    for (let i = 0; i < d.length - 1; i++) { if (typeof n[d[i]] !== 'object' || n[d[i]] === null) n[d[i]] = {}; n = n[d[i]]; }
    if (v === null || v === undefined) delete n[d[d.length - 1]]; else n[d[d.length - 1]] = JSON.parse(JSON.stringify(v));
  }
  const kopie = (x) => (x == null ? null : JSON.parse(JSON.stringify(x)));
  function schrijf(f) { const b = lees(); f(b); localStorage.setItem(SLEUTEL, JSON.stringify(b)); meld(); }
  function meld() { const b = lees(); luisteraars.forEach((l) => l.cb(kopie(pak(b, l.p)))); }
  window.addEventListener('storage', (e) => { if (e.key === SLEUTEL) meld(); });
  let uid = null;
  try { uid = sessionStorage.getItem('bk-demo-uid'); } catch (e) { /* geen opslag */ }
  const docent = new URLSearchParams(location.search).has('docent') || /docent\.html$/.test(location.pathname);
  return {
    modus: 'demo',
    uid: () => (docent ? 'demo-docent' : uid),
    isDocent: () => docent,
    async docentLogin() { return true; },
    async uitloggen() { },
    async leerlingLogin() {
      if (!uid) { uid = 'demo-' + Math.random().toString(36).slice(2, 8); try { sessionStorage.setItem('bk-demo-uid', uid); } catch (e) { } }
      return uid;
    },
    async lees(p) { return kopie(pak(lees(), p)); },
    async zet(p, v) { schrijf((b) => plaats(b, p, v)); },
    async werkBij(p, v) { schrijf((b) => Object.keys(v).forEach((k) => plaats(b, p + '/' + k, v[k]))); },
    async weg(p) { schrijf((b) => plaats(b, p, null)); },
    luister(p, cb) { const l = { p, cb }; luisteraars.add(l); setTimeout(() => cb(kopie(pak(lees(), p))), 0); return () => luisteraars.delete(l); },
    verbinding(cb) { cb(true); return () => { }; }
  };
}

/* ---------------- gedeelde hulpjes ---------------- */
export const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// codes zonder letters die op elkaar lijken (geen 0/O, 1/I/L)
export function nieuweCode() {
  const t = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; let c = '';
  for (let i = 0; i < 4; i++) c += t[Math.floor(Math.random() * t.length)];
  return c;
}
export const normCode = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);

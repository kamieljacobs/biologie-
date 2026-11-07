// node extract.js <lib.js> <uit.js> <naam,naam,...> [<uitsluiten.js> ...]
// Haalt uit een bibliotheek alleen de top-level declaraties (en de statements die ze aanvullen) die nodig zijn
// voor de gevraagde namen, in de oorspronkelijke volgorde. Namen die al in de uitsluit-bestanden staan, blijven weg.
const acorn = require('/tmp/acn/node_modules/acorn');
const fs = require('fs');
const [lib, uit, wil, ...uitsl] = process.argv.slice(2);
const src = fs.readFileSync(lib, 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true });
const decls = n => { const out = [];
  if (n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') out.push(n.id.name);
  if (n.type === 'VariableDeclaration') n.declarations.forEach(d => { (function pat(p) { if (!p) return; if (p.type === 'Identifier') out.push(p.name); else if (p.type === 'ObjectPattern') p.properties.forEach(q => pat(q.value || q.argument)); else if (p.type === 'ArrayPattern') p.elements.forEach(pat); })(d.id); });
  return out; };
const refs = n => { const s = new Set(); (function walk(x) { if (!x || typeof x !== 'object') return; if (Array.isArray(x)) { x.forEach(walk); return; }
  if (x.type === 'Identifier') s.add(x.name);
  for (const k in x) { if (k === 'type' || k === 'start' || k === 'end') continue; const v = x[k]; if (v && typeof v === 'object') walk(v); } })(n); return s; };
let basis = new Set(); for (const f of uitsl) { try { const a = acorn.parse(fs.readFileSync(f, 'utf8'), { ecmaVersion: 'latest' }); a.body.forEach(n => decls(n).forEach(d => basis.add(d))); } catch (e) { console.error('parse', f, e.message); } }
const st = ast.body.map((n, i) => ({ i, n, d: decls(n), r: refs(n) }));
// laatste functiedeclaratie per naam wint
const laatste = {}; st.forEach(s => { if (s.n.type === 'FunctionDeclaration') laatste[s.d[0]] = s.i; });
const nodig = new Set(wil.split(',')); const in_ = new Set(); let veranderd = true;
const declNamen = new Set(); st.forEach(s => s.d.forEach(d => declNamen.add(d)));
while (veranderd) { veranderd = false;
  for (const s of st) { if (in_.has(s.i)) continue;
    let neem = false;
    if (s.d.length) { if (s.n.type === 'FunctionDeclaration' && laatste[s.d[0]] !== s.i) continue; neem = s.d.some(d => nodig.has(d) && !basis.has(d)); }
    else { // statement dat iets aanvult (HOND[n] = ..., X.Y = ...): mee als het een opgenomen naam raakt
      const ingenomen = new Set(); st.forEach(t => { if (in_.has(t.i)) t.d.forEach(d => ingenomen.add(d)); });
      neem = [...s.r].some(r => ingenomen.has(r) && declNamen.has(r)); }
    if (neem) { in_.add(s.i); veranderd = true; s.r.forEach(r => { if (declNamen.has(r) && !basis.has(r)) nodig.add(r); }); } } }
const delen = st.filter(s => in_.has(s.i)).map(s => src.slice(s.n.start, s.n.end));
fs.writeFileSync(uit, `// Uittreksel uit ${lib.replace(/^.*?bibliotheek/, 'bibliotheek')} (${new Date().toISOString().slice(0, 10)}): alleen ${wil} en wat die nodig hebben (scripts: extract.js).\n` + delen.join('\n') + '\n');
console.log('statements', delen.length, 'van', st.length, 'bytes', delen.join('\n').length);
const mist = [...nodig].filter(n => !declNamen.has(n) && !basis.has(n));

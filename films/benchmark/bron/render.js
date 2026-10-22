// ===== De vijf varianten van de benchmarkscène =====
// nu        = nulmeting: zoals we nu tekenen en bewegen (prompt v8)
// licht     = diepte en licht: belichting, contactschaduw, scherptediepte, vignet
// principes = animatieprincipes veel verder dan C8: anticipatie, overshoot, naslingeren, squash and stretch
// rijk      = rijkere illustratie: echte darmvlokken met epitheel en microvilli, textuur, arcering
// techniek  = andere techniek: een WebGL-shader geeft elke vorm volume (hoogte uit de vorm, licht per pixel)

const VARIANTEN = [
  { id: 'nu', naam: 'Nu (nulmeting)', kort: 'Nu', uitleg: 'Zoals de films nu getekend en bewogen worden (prompt v8).' },
  { id: 'licht', naam: 'Diepte en licht', kort: 'Licht', uitleg: 'Eén lichtbron linksboven, contactschaduw, achtergrond iets onscherp, randlicht en een vignet. Tekenwerk en beweging zijn gelijk aan Nu.' },
  { id: 'principes', naam: 'Animatieprincipes', kort: 'Beweging', uitleg: 'Anticipatie (eerst iets terug), overshoot en uitdempen, naslingeren van hand en lijf, squash and stretch bij de hap en de knip. Tekenwerk is gelijk aan Nu.' },
  { id: 'rijk', naam: 'Rijkere illustratie', kort: 'Rijk', uitleg: 'Meer detail en textuur: broodje met korst en kaasgaten, darmvlokken met epitheelcellen en microvilli, een enzym als gevouwen keten, fijne arcering in de schaduwkant.' },
  { id: 'techniek', naam: 'Andere techniek', kort: 'Shader', uitleg: 'Zelfde tekening, maar een WebGL-shader maakt er per pixel volume van: hoogte uit de vorm, licht, glans en zachte zelfschaduw.' }
];

function zetVariant(id) { S.id = id; S.anim = id === 'principes' ? 'pro' : 'basis'; S.rijk = id === 'rijk'; }

// ---------- lagen ----------
function laag(w = W, h = H) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
const LG = {};
function lg(naam) { if (!LG[naam]) LG[naam] = laag(); return LG[naam]; }

function tekenFrame(doel, t, id) {
  zetVariant(id); const L = sceneLagen(t);
  if (id === 'nu' || id === 'principes' || id === 'rijk') {
    tekenAchter(doel, t, L); tekenVoor(doel, t, L);
    if (id === 'rijk') arceerVoor(doel, t, L);
    schaalbalk(doel, t, L.c); return;
  }
  // varianten met nabewerking: achter en voor apart
  const A = lg('achter'), V = lg('voor'); const a = A.getContext('2d'), v = V.getContext('2d');
  a.setTransform(1, 0, 0, 1, 0, 0); v.setTransform(1, 0, 0, 1, 0, 0); v.clearRect(0, 0, W, H);
  tekenAchter(a, t, L); tekenVoor(v, t, L);
  if (id === 'licht') belicht(doel, A, V, t, L);
  else if (id === 'techniek') shaderVolume(doel, A, V, t, L);
  schaalbalk(doel, t, L.c);
}

// ---------- variant: diepte en licht ----------
function belicht(doel, A, V, t, L) {
  const c = L.c;
  // 1. achtergrond: iets onscherp (scherptediepte) en een warme lichtbundel van linksboven
  doel.save(); doel.filter = `blur(${(2.2 * L.l1 + 1.2 * L.l3).toFixed(2)}px)`; doel.drawImage(A, 0, 0); doel.restore();
  const g0 = doel.createRadialGradient(W * 0.2, -H * 0.1, 50, W * 0.3, H * 0.2, W * 0.9); g0.addColorStop(0, 'rgba(255,226,170,0.20)'); g0.addColorStop(0.5, 'rgba(255,226,170,0.05)'); g0.addColorStop(1, 'rgba(0,0,0,0)');
  doel.fillStyle = g0; doel.fillRect(0, 0, W, H);
  // 2. contactschaduw onder Noor (alleen niveau 1)
  if (L.l1 > 0.01) { const [vx, vy] = naarScherm(c, NOOR.x + 30, NOOR.y - 4); doel.save(); doel.globalAlpha = 0.55 * L.l1; const rg = doel.createRadialGradient(vx, vy, 0, vx, vy, 230 * c.s); rg.addColorStop(0, 'rgba(0,0,0,0.75)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); doel.fillStyle = rg; doel.save(); doel.translate(vx, vy); doel.scale(1, 0.16); doel.translate(-vx, -vy); doel.beginPath(); doel.arc(vx, vy, 230 * c.s, 0, 6.283); doel.fill(); doel.restore(); doel.restore(); }
  // 3. voorgrond: schaduw op de achterwand, dan licht en donker over de vormen
  const B = lg('licht'), b = B.getContext('2d'); b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H); b.drawImage(V, 0, 0);
  b.globalCompositeOperation = 'source-atop';
  const g1 = b.createLinearGradient(W * 0.15, 0, W * 0.75, H); g1.addColorStop(0, 'rgba(255,236,200,0.30)'); g1.addColorStop(0.4, 'rgba(255,236,200,0.0)'); g1.addColorStop(1, 'rgba(10,14,30,0.6)'); b.fillStyle = g1; b.fillRect(0, 0, W, H);
  b.globalCompositeOperation = 'source-over';
  doel.save(); doel.shadowColor = 'rgba(0,0,0,0.45)'; doel.shadowBlur = 28; doel.shadowOffsetX = 18; doel.shadowOffsetY = 14; doel.drawImage(B, 0, 0); doel.restore();
  // randlicht: dunne lichte rand aan de lichtkant (verschoven kopie, alleen waar de vorm eindigt)
  const R = lg('rand'), r = R.getContext('2d'); r.setTransform(1, 0, 0, 1, 0, 0); r.clearRect(0, 0, W, H); r.drawImage(V, 0, 0); r.globalCompositeOperation = 'source-in'; r.fillStyle = 'rgba(255,232,190,0.55)'; r.fillRect(0, 0, W, H);
  r.globalCompositeOperation = 'destination-out'; r.drawImage(V, 3, 3); r.globalCompositeOperation = 'source-over';
  doel.save(); doel.globalAlpha = 0.8; doel.drawImage(R, 0, 0); doel.restore();
  // 4. in de holte: lichtstof en een zachte gloed rond het enzym
  if (L.l3 > 0.01) { doel.save(); doel.globalAlpha = L.l3; doel.globalCompositeOperation = 'lighter'; for (let i = 0; i < 40; i++) { const w = wander(i + 900, t, 40, 0.15); const x = hash(i * 2.3) * W + w.x, y = hash(i * 4.1) * 900 + w.y, rr = 2 + hash(i) * 5; const g = doel.createRadialGradient(x, y, 0, x, y, rr * 4); g.addColorStop(0, 'rgba(240,220,170,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); doel.fillStyle = g; doel.fillRect(x - rr * 4, y - rr * 4, rr * 8, rr * 8); } doel.restore(); }
  // 5. vignet
  const vg = doel.createRadialGradient(W / 2, H * 0.45, H * 0.35, W / 2, H * 0.5, H * 1.05); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.5)'); doel.fillStyle = vg; doel.fillRect(0, 0, W, H);
}

// ---------- variant: rijkere illustratie ----------
let _arcPat = null;
function arceerPatroon(ctx) { if (_arcPat) return _arcPat; const p = laag(12, 12), g = p.getContext('2d'); g.strokeStyle = 'rgba(10,12,24,0.55)'; g.lineWidth = 1; g.beginPath(); g.moveTo(-2, 14); g.lineTo(14, -2); g.moveTo(-2, 6); g.lineTo(6, -2); g.moveTo(6, 14); g.lineTo(14, 6); g.stroke(); _arcPat = ctx.createPattern(p, 'repeat'); return _arcPat; }
function arceerVoor(doel, t, L) { // arcering in de schaduwkant van Noor (niveau 1): fijne lijntjes, rechtsonder sterker
  if (L.l1 < 0.02) return; const c = L.c; const m = noorMaat(); const M = lg('arc'), g = M.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
  g.save(); g.setTransform(c.s, 0, 0, c.s, c.sx - c.fx * c.s, c.sy - c.fy * c.s); rompPad(g, m); g.restore(); g.save(); g.clip();
  const lg2 = g.createLinearGradient(...naarScherm(c, m.cx - m.breed * 0.2, 0), ...naarScherm(c, m.cx + m.breed * 0.6, 0)); lg2.addColorStop(0, 'rgba(0,0,0,0)'); lg2.addColorStop(1, 'rgba(0,0,0,1)');
  g.fillStyle = arceerPatroon(g); g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'destination-in'; g.fillStyle = lg2; g.fillRect(0, 0, W, H); g.restore();
  doel.save(); doel.globalAlpha = 0.45 * L.l1 * (1 - L.xray * 0.8); doel.drawImage(M, 0, 0); doel.restore();
}
broodjeRijk = function (ctx, s, hap) { // korst, sesam, kaasgaten in de snijkant
  ctx.save(); ctx.fillStyle = 'rgba(120,70,20,0.35)'; ctx.beginPath(); ctx.moveTo(-124 * s, -10 * s); ctx.bezierCurveTo(-120 * s, -92 * s, 120 * s, -92 * s, 124 * s, -10 * s); ctx.bezierCurveTo(110 * s, -70 * s, -110 * s, -70 * s, -124 * s, -10 * s); ctx.fill();
  ctx.fillStyle = '#F4E6C2'; for (let i = 0; i < 14; i++) { const u = hash(i * 3.3) * 2 - 1, v = 0.35 + hash(i * 1.7) * 0.5; ctx.beginPath(); ctx.ellipse(u * 95 * s, -v * 78 * s, 4 * s, 2.2 * s, u, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = 'rgba(160,110,30,0.6)'; [[-70, 1], [-20, 3], [40, 0], [90, 2]].forEach(([x, y]) => { ctx.beginPath(); ctx.ellipse(x * s, y * s, 6 * s, 3 * s, 0, 0, 6.283); ctx.fill(); });
  ctx.strokeStyle = 'rgba(90,55,20,0.5)'; ctx.lineWidth = Math.max(0.8, 1.6 * s); for (let i = 0; i < 9; i++) { const x = -110 + i * 27; ctx.beginPath(); ctx.moveTo(x * s, 30 * s); ctx.lineTo((x + 8) * s, 38 * s); ctx.stroke(); }
  if (hap > 0.5) { ctx.fillStyle = '#EAD7A8'; ctx.beginPath(); ctx.arc(128 * s, -30 * s, 64 * s, 2.0, 4.3); ctx.lineTo(128 * s + Math.cos(4.3) * 56 * s, -30 * s + Math.sin(4.3) * 56 * s); ctx.arc(128 * s, -30 * s, 56 * s, 4.3, 2.0, true); ctx.closePath(); ctx.fill(); }
  ctx.restore(); };
darmRijkL1 = function (ctx, t) { // dunne darm: lichte ribbels dwars op de buis
  const P = anDense(anDunPts(), 200); const HH = AHH(); ctx.save(); ctx.strokeStyle = 'rgba(160,90,70,0.55)'; ctx.lineWidth = 1;
  for (let i = 2; i < P.length - 2; i += 3) { const p = P[i], q = P[i + 1]; const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; const nx = -dy / l * 0.03 * HH, ny = dx / l * 0.03 * HH; ctx.beginPath(); ctx.moveTo(p[0] - nx, p[1] - ny); ctx.lineTo(p[0] + nx, p[1] + ny); ctx.stroke(); }
  ctx.restore(); };
// darmwand met echte vlokken: vingervormige uitstulpingen (± 1 mm), bekleed met één laag cilindrische epitheelcellen
// met een borstelzoom (microvilli) aan de kant van de holte; in de vlok een haarvat en een lymfevat (chylvat).
// Bron: Junqueira h. 15. Bekende fouten: vlokken als bobbeltjes, epitheel van meerdere lagen.
function darmwandRijk(ctx, t, cx, cy, r2, dikte, sq) {
  for (const kant of [-1, 1]) {
    const basis = (x) => cy + kant * (r2 * (1 - 0.35 * clamp(sq(x), 0, 1)));
    // lagen buiten het slijmvlies
    const band = (f0, f1, kleur) => { ctx.beginPath(); for (let i = 0; i <= 80; i++) { const x = -40 + (W + 80) * i / 80; ctx.lineTo(x, basis(x) + kant * dikte * f0); } for (let i = 80; i >= 0; i--) { const x = -40 + (W + 80) * i / 80; ctx.lineTo(x, basis(x) + kant * dikte * f1); } ctx.closePath(); ctx.fillStyle = kleur; ctx.fill(); };
    band(0, 0.4, '#B9767A'); band(0.4, 0.52, '#7E6262'); band(0.52, 0.82, '#9A4A46'); band(0.82, 0.97, '#B5645C'); band(0.97, 1.02, '#E2CEC6');
    // kringspier: doorgesneden vezels met kern
    ctx.fillStyle = 'rgba(70,24,22,0.55)'; for (let x = -20; x < W + 20; x += 14) { const y = basis(x) + kant * dikte * 0.67; ctx.beginPath(); ctx.ellipse(x, y, 4, dikte * 0.12, 0, 0, 6.283); ctx.fill(); }
    // vlokken
    const vh = Math.min(r2 * 0.62, dikte * 1.25), vb = vh * 0.32, stap = vb * 1.25;
    for (let x = -vb + ((cx % stap) - stap); x < W + vb; x += stap) { const y0 = basis(x); const h = vh * (0.85 + 0.15 * hash(Math.round(x / stap) * 7.1)); const top = y0 - kant * h;
      const pad = () => { ctx.beginPath(); ctx.moveTo(x - vb * 0.5, y0); ctx.bezierCurveTo(x - vb * 0.55, y0 - kant * h * 0.7, x - vb * 0.5, top, x, top); ctx.bezierCurveTo(x + vb * 0.5, top, x + vb * 0.55, y0 - kant * h * 0.7, x + vb * 0.5, y0); ctx.closePath(); };
      pad(); ctx.fillStyle = '#C98A86'; ctx.fill();
      // haarvat (rood) en chylvat (geel) in de kern van de vlok
      ctx.save(); pad(); ctx.clip(); ctx.strokeStyle = 'rgba(200,50,50,0.7)'; ctx.lineWidth = Math.max(1.5, vb * 0.07); ctx.beginPath(); ctx.moveTo(x - vb * 0.22, y0); ctx.lineTo(x - vb * 0.22, top + kant * vb * 0.35); ctx.quadraticCurveTo(x, top + kant * vb * 0.1, x + vb * 0.22, top + kant * vb * 0.35); ctx.lineTo(x + vb * 0.22, y0); ctx.stroke();
      ctx.strokeStyle = 'rgba(240,210,110,0.8)'; ctx.lineWidth = Math.max(1.5, vb * 0.08); ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, top + kant * vb * 0.45); ctx.stroke(); ctx.restore();
      // epitheel: één laag cellen langs de rand, elk met een kern
      const N = Math.max(6, Math.round(h / (vb * 0.16))); ctx.strokeStyle = 'rgba(110,50,50,0.55)'; ctx.lineWidth = 1;
      for (let i = 0; i <= N; i++) { for (const z of [-1, 1]) { const u = i / N; const px = x + z * vb * 0.5 * (1 - Math.pow(u, 4) * 0.98), py = y0 - kant * h * u; const ix = x + z * vb * 0.28 * (1 - Math.pow(u, 4)), iy = py + kant * vb * 0.06;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ix, iy); ctx.stroke(); if (i < N && vb > 30) { ctx.fillStyle = 'rgba(90,60,140,0.65)'; ctx.beginPath(); ctx.ellipse((px + ix) / 2, py - kant * h / N * 0.5, vb * 0.035, h / N * 0.22, 0, 0, 6.283); ctx.fill(); } } }
      // borstelzoom (microvilli): fijne haartjes langs de buitenrand
      if (vb > 22) { ctx.strokeStyle = 'rgba(246,222,214,0.85)'; ctx.lineWidth = 1; for (let i = 0; i <= 60; i++) { const u = i / 60; for (const z of [-1, 1]) { const px = x + z * vb * 0.5 * (1 - Math.pow(u, 4) * 0.98), py = y0 - kant * h * u; const nx = z * (1 - u * 0.5), ny = -kant * u * 0.8; const l = Math.hypot(nx, ny) || 1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + nx / l * vb * 0.05, py + ny / l * vb * 0.05); ctx.stroke(); } } }
      pad(); ctx.strokeStyle = 'rgba(250,226,216,0.9)'; ctx.lineWidth = 1.5; ctx.stroke(); }
  }
  lab(ctx, 'darmvlok', cx + 260, cy - r2 * 0.25 - 10, rampB(t, 12.8, 0.6) * (1 - rampB(t, 14.2, 0.5)));
}
// enzym als gevouwen keten (eiwit), met de holte (actieve plek) in goud
function enzymRijk(ctx, x, y, r, o = {}) { const { an = 0, sluit = 0 } = o; ctx.save(); ctx.translate(x, y); ctx.rotate(an);
  enzymKluwen(ctx, 0, 0, r, { an: 0, sluit, col: '#6A7A98' });
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 1.02, 0, 6.283); ctx.clip();
  // helices als lussen + strengen als brede pijlen (lintmodel, versimpeld)
  ctx.strokeStyle = 'rgba(200,214,236,0.75)'; ctx.lineWidth = r * 0.07; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const ox = -r * 0.45 + k * r * 0.12, oy = -r * 0.5 + k * r * 0.42; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = ox + u * r * 0.55, py = oy + Math.sin(u * 6.283 * 3) * r * 0.09; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.fillStyle = 'rgba(224,182,74,0.35)'; for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.moveTo(-r * 0.7, r * 0.15 + k * r * 0.22); ctx.lineTo(-r * 0.05, r * 0.15 + k * r * 0.22); ctx.lineTo(-r * 0.05, r * 0.07 + k * r * 0.22); ctx.lineTo(r * 0.1, r * 0.2 + k * r * 0.22); ctx.lineTo(-r * 0.05, r * 0.33 + k * r * 0.22); ctx.lineTo(-r * 0.05, r * 0.25 + k * r * 0.22); ctx.lineTo(-r * 0.7, r * 0.25 + k * r * 0.22); ctx.closePath(); ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ---------- variant: andere techniek (WebGL-volume) ----------
let GL = null;
function glMaak() {
  const cv = laag(); const gl = cv.getContext('webgl', { premultipliedAlpha: true, preserveDrawingBuffer: true }); if (!gl) return null;
  const vs = `attribute vec2 p; varying vec2 uv; void main(){ uv = p*0.5+0.5; uv.y = 1.0-uv.y; gl_Position = vec4(p,0.,1.); }`;
  // hoogte = vervaagde dekking van de voorgrond; normaal uit de helling; licht linksboven
  const fs = `precision mediump float; varying vec2 uv; uniform sampler2D kleur; uniform sampler2D hoog; uniform vec2 px; uniform float sterk;
    float h(vec2 q){ return texture2D(hoog, q).a; }
    void main(){ vec4 c = texture2D(kleur, uv); if (c.a < 0.004) { gl_FragColor = vec4(0.); return; }
      float hx = h(uv + vec2(px.x*2.,0.)) - h(uv - vec2(px.x*2.,0.)); float hy = h(uv + vec2(0.,px.y*2.)) - h(uv - vec2(0.,px.y*2.));
      vec3 n = normalize(vec3(-hx*sterk, hy*sterk, 1.0)); vec3 l = normalize(vec3(-0.55, 0.6, 0.6)); vec3 v = vec3(0.,0.,1.);
      float dif = clamp(dot(n,l), 0., 1.); float spec = pow(clamp(dot(reflect(-l,n), v),0.,1.), 24.0);
      float ao = smoothstep(0.0, 0.9, h(uv)); // randen iets donkerder (zachte zelfschaduw)
      vec3 base = c.rgb / max(c.a, 0.001);
      vec3 col = base * (0.28 + 0.95*dif) * (0.6 + 0.4*ao) + vec3(1.0,0.95,0.85)*spec*0.45*c.a + base*vec3(0.25,0.12,0.08)*(1.0-dif)*0.35;
      gl_FragColor = vec4(col*c.a, c.a); }`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s)); return s; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const tex = (i) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; };
  const T0 = tex(0), T1 = tex(1);
  gl.uniform1i(gl.getUniformLocation(pr, 'kleur'), 0); gl.uniform1i(gl.getUniformLocation(pr, 'hoog'), 1);
  gl.uniform2f(gl.getUniformLocation(pr, 'px'), 1 / W, 1 / H);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  return { cv, gl, pr, T0, T1, sterk: gl.getUniformLocation(pr, 'sterk') };
}
function shaderVolume(doel, A, V, t, L) {
  doel.drawImage(A, 0, 0);
  if (!GL) GL = glMaak() || 'geen';
  if (GL === 'geen') { doel.drawImage(V, 0, 0); return; }
  // hoogtekaart: vervaagde dekking (een vorm is in het midden het dikst)
  const Hm = lg('hoogte'), h = Hm.getContext('2d'); h.setTransform(1, 0, 0, 1, 0, 0); h.clearRect(0, 0, W, H); h.filter = 'blur(9px)'; h.drawImage(V, 0, 0); h.filter = 'blur(3px)'; h.globalAlpha = 0.6; h.drawImage(V, 0, 0); h.globalAlpha = 1; h.filter = 'none';
  const { gl } = GL; gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, GL.T0); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, V);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, GL.T1); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Hm);
  gl.uniform1f(GL.sterk, 16.0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  doel.save(); doel.shadowColor = 'rgba(0,0,0,0.4)'; doel.shadowBlur = 22; doel.shadowOffsetX = 10; doel.shadowOffsetY = 12; doel.drawImage(GL.cv, 0, 0); doel.restore();
}

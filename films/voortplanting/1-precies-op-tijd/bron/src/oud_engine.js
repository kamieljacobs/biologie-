/* engine.js — tekenhulp voor het 1920×1080-podium (canvas), volgens Part C (beeldstijl).
   Drie looks (Micro, Schema; Macro niet gebruikt in deze film) en één vaste UI-laag.
   Alle tekst gaat via G.text(), zodat de QA elke tekstrechthoek kan controleren. */
(function (root) {
  'use strict';
  const W = 1920, H = 1080, CAPTION_Y = 950;
  const C = {
    /* achtergronden */
    micro: '#121A26', schema: '#1A2740', macroSky: '#1E2E4A', macroHill: '#2F4A3A', macroFront: '#3A5540',
    grain: '#C9B896', grid: '#FFFFFF',
    /* betekeniskleuren (vast voor alle films) */
    gold: '#E0B64A', coral: '#E07A5F', green: '#7FC48F', teal: '#5BA4C9', purple: '#8C7BBF', ochre: '#C9A35C',
    /* tinten (familie van één kleur) */
    tealL: '#9ED0EA', tealD: '#3F7E9C', purpleL: '#BBAFE0', purpleD: '#675694', coralL: '#F0A88F', greenL: '#B4DFBB', ochreL: '#E2C58B', goldL: '#F0D58A',
    /* neutralen */
    ink: '#F2F2EE', ink2: '#9AA3B2', line: '#8FA0B5', fill: '#2A3A58', fill2: '#243247', fillL: '#4A5E82', dim: '#6E7A8C',
    /* celbibliotheek (Micro) */
    nucFill: '#6E5A9E', nucEdge: '#A392D6', mem: '#AFC0D0', mitoFill: '#D88E7A', mitoEdge: '#F0B8A6', vesFill: '#D4A83C', vesEdge: '#F0CC7A',
    cyto: '#1B2638', cytoEdge: '#AFC0D0', cytoL: '#223048',
    good: '#7FC48F', bad: '#E07A5F', white: '#F2F2EE',
  };
  const F = {
    serif: '"Fraunces", Georgia, serif',
    sans: '"Source Sans 3", "Segoe UI", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const c01 = (x) => clamp(x, 0, 1);
  const lerp = (a, b, p) => a + (b - a) * p;
  const easeIO = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const easeO = (p) => 1 - Math.pow(1 - p, 3);
  const easeI = (p) => p * p * p;
  const prog = (t, t0, d) => c01((t - t0) / d);
  const ep = (t, t0, d) => easeIO(prog(t, t0, d));
  const vis = (t, t0, t1, din = 0.45, dout = 0.45) => (t1 == null ? ep(t, t0, din) : Math.min(ep(t, t0, din), 1 - ep(t, t1, dout)));
  const hash = (n) => { let x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const TAU = Math.PI * 2;
  /* kleur met alfa */
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  /* lichtere tint van een vulling (voor de rand) */
  const lighter = (hex, k = 0.35) => { const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, b = n & 255; const f = (v) => Math.round(v + (255 - v) * k); return `rgb(${f(r)},${f(g)},${f(b)})`; };
  const mix = (h1, h2, p) => { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const f = (s) => Math.round(lerp((a >> s) & 255, (b >> s) & 255, p)); return `rgb(${f(16)},${f(8)},${f(0)})`; };

  class G {
    constructor(canvas) { this.cv = canvas; this.ctx = canvas.getContext('2d'); this.texts = []; this.marks = []; this.zones = []; this.look = 'schema'; this.cam = { x: W / 2, y: H / 2, z: 1, sx: W / 2, sy: H / 2 }; }
    frame(scale) {
      const c = this.ctx; c.setTransform(scale, 0, 0, scale, 0, 0); this.scale = scale; this.texts = []; this.marks = []; this.zones = []; this.annots = 0;
      this.cam = { x: W / 2, y: H / 2, z: 1, sx: W / 2, sy: H / 2 };
      c.globalAlpha = 1; c.fillStyle = C.schema; c.fillRect(0, 0, W, H);
    }
    /* achtergrond van een look. micro: blauwzwart met beige korrel (één keer getekend, daarna als beeld geplakt) */
    bg(look, a = 1) {
      const c = this.ctx; this.screen(); this.look = look;
      c.save(); c.globalAlpha = a; c.fillStyle = look === 'micro' ? C.micro : look === 'macro' ? C.macroSky : C.schema; c.fillRect(0, 0, W, H); c.restore();
      /* v2.5 (prompt v8, C2): geen korrel meer op de achtergrond; rustige textuur alleen binnen cellen (cell()) */
    }
    grain(a = 1, dense) {
      const c = this.ctx; if (!G.grainCv && typeof document !== 'undefined') {
        const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d'); x.fillStyle = C.grain;
        for (let i = 0; i < 6500; i++) { const h1 = hash(i * 3 + 1), h2 = hash(i * 3 + 2), h3 = hash(i * 3 + 3); x.globalAlpha = 0.22 + 0.18 * h3; x.beginPath(); x.arc(h1 * W, h2 * H, 0.9 + h3 * 1.2, 0, TAU); x.fill(); }
        G.grainCv = cv;
      }
      if (G.grainCv) { c.save(); c.globalAlpha = a; c.drawImage(G.grainCv, 0, 0); c.restore(); }
    }
    /* raster (alleen bij grafieken): wit op 3 % */
    grid(x0, y0, x1, y1, step = 60, a = 1) { const c = this.ctx; c.save(); c.globalAlpha = 0.03 * a; c.strokeStyle = C.grid; c.lineWidth = 1; c.beginPath(); for (let x = x0; x <= x1; x += step) { c.moveTo(x, y0); c.lineTo(x, y1); } for (let y = y0; y <= y1; y += step) { c.moveTo(x0, y); c.lineTo(x1, y); } c.stroke(); c.restore(); }
    setCam(x, y, z, sx, sy) { this.cam = { x, y, z, sx: sx == null ? W / 2 : sx, sy: sy == null ? H / 2 : sy }; }
    world() { const c = this.ctx, k = this.scale, m = this.cam; c.setTransform(k * m.z, 0, 0, k * m.z, k * (m.sx - m.x * m.z), k * (m.sy - m.y * m.z)); }
    screen() { const k = this.scale; this.ctx.setTransform(k, 0, 0, k, 0, 0); }
    toS(x, y) { const m = this.cam; return [m.sx + (x - m.x) * m.z, m.sy + (y - m.y) * m.z]; }

    font(o) { const w = o.w || (o.f === 'serif' ? 700 : o.f === 'mono' ? 500 : 400); return `${o.it ? 'italic ' : ''}${w} ${o.size || 36}px ${F[o.f || 'sans']}`; }
    measure(s, o) { this.ctx.font = this.font(o); return this.ctx.measureText(s); }
    /* tekst in schermruimte; o: size, f (serif|sans|mono), w, color, align, base, alpha, ls, key, layer */
    text(s, x, y, o = {}) {
      const c = this.ctx; const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01 || s === '' || s == null) return null;
      this.screen(); c.save(); c.globalAlpha = a; c.font = this.font(o); c.fillStyle = o.color || C.ink;
      c.textAlign = o.align || 'left'; c.textBaseline = o.base || 'alphabetic';
      if (o.ls && 'letterSpacing' in c) c.letterSpacing = o.ls + 'px';
      const m = c.measureText(s);
      if (o.halo) { c.lineWidth = o.halo; c.strokeStyle = o.haloColor || 'rgba(14,21,34,0.88)'; c.lineJoin = 'round'; c.strokeText(s, x, y); }
      c.fillText(s, x, y);
      c.restore();
      const w = m.width, asc = m.actualBoundingBoxAscent || (o.size || 36) * 0.75, desc = m.actualBoundingBoxDescent || (o.size || 36) * 0.22;
      let x0 = x; if ((o.align || 'left') === 'center') x0 = x - w / 2; else if (o.align === 'right') x0 = x - w;
      const box = { s, x0, y0: y - asc, x1: x0 + w, y1: y + desc, size: o.size || 36, alpha: a, key: o.key || null, layer: o.layer || 'label' };
      if (o.base === 'middle') { box.y0 = y - (asc + desc) / 2; box.y1 = y + (asc + desc) / 2; }
      if (o.base === 'top') { box.y0 = y; box.y1 = y + asc + desc; }
      this.texts.push(box);
      return box;
    }
    /* meerdere regels (string met \n of array) */
    lines(arr, x, y, lh, o = {}) { if (typeof arr === 'string') arr = arr.split('\n'); let last = null; arr.forEach((l, i) => { last = this.text(l, x, y + i * lh, o) || last; }); return last; }
    /* regels afbreken op breedte */
    wrap(s, maxW, o = {}) { const words = s.split(' '); const out = []; let cur = ''; for (const w of words) { const tst = cur ? cur + ' ' + w : w; if (this.measure(tst, o).width > maxW && cur) { out.push(cur); cur = w; } else cur = tst; } if (cur) out.push(cur); return out; }
    para(s, x, y, maxW, lh, o = {}) { return this.lines(this.wrap(s, maxW, o), x, y, lh, o); }

    /* UI-laag: label in twee regels (naam in Tekst wit, eronder een korte noot in Meta goudgrijs) met verbindingslijn naar het object.
       (ax, ay) = ankerpunt op het object (schermcoördinaten); (lx, ly) = plaats van de tekst. */
    label(name, note, ax, ay, lx, ly, o = {}) {
      const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return null;
      const c = this.ctx; this.screen();
      const size = o.size || 36; let align = o.align || 'left';
      let halo = 0;
      if (ax != null && !o.noline) {
        // geen wijslijnen meer (15 okt 2026): het tekstblok schuift naar het anker toe en staat er direct naast,
        // aan de kant waar het vroeger stond (richting anker -> oude tekstplek), met een donkere rand rond de letters
        const nw = this.measure(name, { size, w: o.w || 600 }).width;
        const tw = note ? this.measure(note, { size: 28, f: 'mono' }).width + note.length * 1.5 : 0;
        const bw = Math.max(nw, tw), asc = size * 0.75, bh = note ? size * 0.95 + 28 * 0.22 + asc : asc + size * 0.22;
        const bx0 = align === 'left' ? lx : align === 'right' ? lx - bw : lx - bw / 2, by0 = ly - asc;
        const cx = bx0 + bw / 2, cy = by0 + bh / 2;
        const dx = cx - ax, dy = cy - ay, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
        const gap = o.gap != null ? o.gap : 14;
        const D = Math.min(L, gap + Math.abs(ux) * bw / 2 + Math.abs(uy) * bh / 2);
        let ncx = ax + ux * D, ncy = ay + uy * D;
        ncx = clamp(ncx, 24 + bw / 2, 1896 - bw / 2); ncy = clamp(ncy, 24 + bh / 2, 1056 - bh / 2);
        lx += ncx - cx; ly += ncy - cy; halo = 7;
      }
      const b1 = this.text(name, lx, ly, { size, color: o.color || C.ink, alpha: a, align, key: o.key, w: o.w || 600, halo });
      let b2 = null; if (note) b2 = this.text(note, lx, ly + size * 0.95, { size: 28, f: 'mono', color: o.noteColor || C.grain, alpha: a, align, ls: 1.5, layer: 'meta', halo: halo ? 6 : 0 });
      if (!b1) return null;
      const box = { x0: Math.min(b1.x0, b2 ? b2.x0 : b1.x0), x1: Math.max(b1.x1, b2 ? b2.x1 : b1.x1), y0: b1.y0, y1: b2 ? b2.y1 : b1.y1 };
      return box;
    }
    /* annotatiehaak: een haak (1,5 px) onder of naast de elementen waar een conclusie over gaat, met één korte zin in dezelfde kleur. Hooguit één tegelijk. */
    annot(x0, x1, y, text, o = {}) {
      const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return;
      const col = o.color || C.green; const c = this.ctx; this.screen(); this.annots++;
      c.save(); c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath();
      const h = o.h || 14, side = o.above ? -1 : 1;
      c.moveTo(x0, y); c.lineTo(x0, y + side * h); c.lineTo(x1, y + side * h); c.lineTo(x1, y); c.stroke(); c.restore();
      const size = o.size || 36; const lh = size * 1.15;
      const lines = this.wrap(text, o.maxW || Math.max(600, x1 - x0 + 300), { size, w: 600 });
      const ty = o.above ? y - h - 14 - (lines.length - 1) * lh : y + h + size + 6;
      lines.forEach((l, i) => this.text(l, (x0 + x1) / 2, ty + i * lh, { size, w: 600, color: col, align: 'center', alpha: a, layer: 'annot' }));
    }
    /* annotatiehaak rechts naast iets (verticale haak) */
    annotV(x, y0, y1, text, o = {}) {
      const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return;
      const col = o.color || C.green; const c = this.ctx; this.screen(); this.annots++;
      c.save(); c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, y0); c.lineTo(x + 14, y0); c.lineTo(x + 14, y1); c.lineTo(x, y1); c.stroke(); c.restore();
      const size = o.size || 36; const lines = this.wrap(text, o.maxW || 420, { size, w: 600 });
      const ty = (y0 + y1) / 2 - (lines.length - 1) * size * 0.58;
      lines.forEach((l, i) => this.text(l, x + 30, ty + i * size * 1.15, { size, w: 600, color: col, alpha: a, layer: 'annot' }));
    }
    /* zoomcirkel: cirkel met gouden rand, inhoud in de doel-look, twee rechte gouden lijnen naar de bron, bijschrift in Meta eronder.
       draw(g) tekent de inhoud in schermruimte, geklemd op de cirkel (middelpunt cx,cy; straal r). */
    zoomCircle(cx, cy, r, sx, sy, sr, look, drawInner, caption, a = 1) {
      if (a <= 0.01) return; const c = this.ctx; this.screen();
      // twee leaderlijnen van de bron (cirkel om sx,sy met straal sr) naar de rand van de grote cirkel
      const ang = Math.atan2(cy - sy, cx - sx); const p = ang + Math.PI / 2;
      c.save(); c.globalAlpha = a; c.strokeStyle = C.gold; c.lineWidth = 1.5;
      for (const s of [-1, 1]) { c.beginPath(); c.moveTo(sx + Math.cos(p) * sr * s, sy + Math.sin(p) * sr * s); c.lineTo(cx + Math.cos(p) * r * s, cy + Math.sin(p) * r * s); c.stroke(); }
      c.beginPath(); c.arc(sx, sy, sr, 0, TAU); c.stroke();
      c.restore();
      c.save(); c.globalAlpha = a; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.clip();
      c.fillStyle = look === 'micro' ? C.micro : C.schema; c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      
      drawInner(this); this.screen(); c.restore();
      c.save(); c.globalAlpha = a; c.strokeStyle = C.gold; c.lineWidth = 1.5; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke(); c.restore();
      if (caption) this.text(caption, cx, cy + r + 40, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: a, ls: 2, layer: 'meta' });
      this.zones.push({ x0: cx - r, y0: cy - r, x1: cx + r, y1: cy + r, kind: 'zoom' });
    }
    /* Meta linksonder: schaal en tijd, buiten de ondertitelzone */
    meta(s, a = 1, i = 0) { return this.text(s, 60, 912 - i * 36, { size: 28, f: 'mono', color: C.grain, alpha: a, ls: 2, layer: 'meta' }); }
    /* schaalbalk (ware schaal voor de structuren in beeld) */
    scaleBar(x, y, px, label, a = 1) { if (a <= 0.01) return; const c = this.ctx; this.screen(); c.save(); c.globalAlpha = a; c.strokeStyle = C.grain; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + px, y); c.moveTo(x, y - 8); c.lineTo(x, y + 8); c.moveTo(x + px, y - 8); c.lineTo(x + px, y + 8); c.stroke(); c.restore(); this.text(label, x + px / 2, y - 14, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: a, ls: 2, layer: 'meta' }); }

    pill(s, x, y, o = {}) {
      const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return null;
      const size = o.size || 32; const m = this.measure(s, { size, w: 600, f: o.f || 'sans' });
      const pw = m.width + size * 1.0, ph = size * 1.5; const c = this.ctx; this.screen();
      let x0 = o.align === 'right' ? x - pw : o.align === 'center' ? x - pw / 2 : x;
      c.save(); c.globalAlpha = a; c.fillStyle = o.fill || C.fill; c.strokeStyle = o.stroke || lighter(o.fill || C.fill, 0.25); c.lineWidth = 1;
      rr(c, x0, y - ph / 2, pw, ph, ph / 2); c.fill(); c.stroke(); c.restore();
      this.text(s, x0 + pw / 2, y + size * 0.36, { size, w: 600, align: 'center', color: o.color || C.ink, alpha: a, f: o.f || 'sans', key: o.key, layer: 'pill' });
      return { x0, x1: x0 + pw, w: pw, y0: y - ph / 2, y1: y + ph / 2 };
    }
    /* pijl, open kop (1,5 px); in een betekeniskleur = die stof of dat signaal stroomt */
    arrow(x1, y1, x2, y2, o = {}) {
      const c = this.ctx; const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return;
      c.save(); c.globalAlpha = a; c.strokeStyle = o.color || C.line; c.lineWidth = o.lw || 1.5; c.lineCap = 'round'; c.lineJoin = 'round';
      if (o.dash) c.setLineDash(o.dash);
      c.beginPath(); c.moveTo(x1, y1); let ang;
      if (o.bend) { const mx = (x1 + x2) / 2 - (y2 - y1) * o.bend, my = (y1 + y2) / 2 + (x2 - x1) * o.bend; c.quadraticCurveTo(mx, my, x2, y2); ang = Math.atan2(y2 - my, x2 - mx); }
      else { c.lineTo(x2, y2); ang = Math.atan2(y2 - y1, x2 - x1); }
      c.stroke(); c.setLineDash([]);
      const h = o.head || 16; c.beginPath(); c.moveTo(x2 - h * Math.cos(ang - 0.5), y2 - h * Math.sin(ang - 0.5)); c.lineTo(x2, y2); c.lineTo(x2 - h * Math.cos(ang + 0.5), y2 - h * Math.sin(ang + 0.5)); c.stroke();
      c.restore();
    }
    /* remstreepje (⊣) aan het eind van een lijn: negatieve werking */
    inhibit(x1, y1, x2, y2, o = {}) {
      const c = this.ctx; const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return;
      c.save(); c.globalAlpha = a; c.strokeStyle = o.color || C.line; c.lineWidth = o.lw || 1.5; c.lineCap = 'round';
      if (o.dash) c.setLineDash(o.dash);
      c.beginPath(); c.moveTo(x1, y1); let ang;
      if (o.bend) { const mx = (x1 + x2) / 2 - (y2 - y1) * o.bend, my = (y1 + y2) / 2 + (x2 - x1) * o.bend; c.quadraticCurveTo(mx, my, x2, y2); ang = Math.atan2(y2 - my, x2 - mx); }
      else { c.lineTo(x2, y2); ang = Math.atan2(y2 - y1, x2 - x1); }
      c.stroke(); c.setLineDash([]); c.lineWidth = (o.lw || 1.5) + 1.5;
      const h = o.head || 14; c.beginPath(); c.moveTo(x2 - h * Math.cos(ang - Math.PI / 2), y2 - h * Math.sin(ang - Math.PI / 2)); c.lineTo(x2 - h * Math.cos(ang + Math.PI / 2), y2 - h * Math.sin(ang + Math.PI / 2)); c.stroke();
      c.restore();
    }
    /* vorm: afgeronde rechthoek of cirkel met 1–1,5 px rand in een lichtere tint van de vulling */
    box(x, y, w, h, o = {}) { const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = this.ctx; c.save(); c.globalAlpha = a; const f = o.fill || C.fill; c.fillStyle = f; c.strokeStyle = o.stroke || lighter(f, o.k == null ? 0.3 : o.k); c.lineWidth = o.lw || 1.2; rr(c, x, y, w, h, o.r == null ? 14 : o.r); c.fill(); c.stroke(); c.restore(); }
    disc(x, y, r, o = {}) { const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = this.ctx; c.save(); c.globalAlpha = a; const f = o.fill || C.fill; c.fillStyle = f; c.strokeStyle = o.stroke || lighter(f, o.k == null ? 0.3 : o.k); c.lineWidth = o.lw || 1.2; c.beginPath(); c.ellipse(x, y, r, o.ry || r, o.rot || 0, 0, TAU); c.fill(); c.stroke(); c.restore(); }
    /* gedimde context: 35 % */
    dimmed(fn, a = 0.35) { const c = this.ctx; c.save(); c.globalAlpha *= a; fn(); c.restore(); }
    mark(kind, x, y, r) { this.marks.push({ kind, x, y, r }); }
  }

  function rr(c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

  /* ---------- bibliotheek: cellen en moleculen (Micro) ---------- */
  /* hormoonmolecuul: kleine afgeronde vorm in zijn betekeniskleur met lichtere rand. kind: 'peptide' (bolletje met kraal) of 'steroid' (ruitje) */
  function hormone(g, x, y, col, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; const r = o.r || 9;
    c.save(); c.globalAlpha = a; c.fillStyle = col; c.strokeStyle = lighter(col, 0.4); c.lineWidth = 1.2;
    if (o.kind === 'steroid') { c.translate(x, y); c.rotate(o.rot || 0.6); rr(c, -r, -r * 0.7, 2 * r, 1.4 * r, r * 0.35); c.fill(); c.stroke(); }
    else { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.stroke(); if (o.kind !== 'plain') { c.beginPath(); c.arc(x + r * 0.55, y - r * 0.55, r * 0.5, 0, TAU); c.fill(); c.stroke(); } }
    c.restore();
  }
  /* receptor: U-vormige holte in de membraan (of in de cel), in de kleur van het hormoon maar gedempt */
  function receptor(g, x, y, col, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; const s = o.s || 1, rot = o.rot || 0;
    c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(rot); c.scale(s, s);
    c.fillStyle = mix(col, C.fill, 0.55); c.strokeStyle = lighter(col, 0.2); c.lineWidth = 1.3;
    c.beginPath(); c.moveTo(-16, -10); c.lineTo(-16, 22); c.lineTo(16, 22); c.lineTo(16, -10); c.arc(0, -10, 16, 0, Math.PI, true); c.closePath(); c.fill(); c.stroke();
    c.restore();
  }
  /* dubbele membraanlijn met regelmatige stippen (fosfolipidekoppen) langs een pad (x0,y0)-(x1,y1) */
  function membraneLine(g, x0, y0, x1, y1, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; const gap = o.gap || 10;
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    c.save(); c.globalAlpha = a; c.strokeStyle = C.mem; c.lineWidth = 1.2; c.fillStyle = C.mem;
    c.beginPath(); c.moveTo(x0 + nx * gap / 2, y0 + ny * gap / 2); c.lineTo(x1 + nx * gap / 2, y1 + ny * gap / 2); c.moveTo(x0 - nx * gap / 2, y0 - ny * gap / 2); c.lineTo(x1 - nx * gap / 2, y1 - ny * gap / 2); c.stroke();
    const n = Math.floor(L / 14); for (let i = 0; i <= n; i++) { const p = i / n; const px = x0 + dx * p, py = y0 + dy * p; for (const s of [-1, 1]) { c.beginPath(); c.arc(px + nx * s * (gap / 2 + 2.5), py + ny * s * (gap / 2 + 2.5), 2.2, 0, TAU); c.fill(); } }
    c.restore();
  }
  /* cel: korrelige vulling, dubbele membraanlijn, kern paars */
  function cell(g, x, y, r, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx;
    c.save(); c.globalAlpha = a; c.fillStyle = o.fill || C.cyto; c.strokeStyle = o.edge || C.cytoEdge; c.lineWidth = 1.4;
    c.beginPath(); if (o.blob) { blobPath(c, x, y, r, o.blob, o.seed || 1); } else c.ellipse(x, y, r, o.ry || r, o.rot || 0, 0, TAU); c.fill(); c.stroke();
    if (!o.single) { c.beginPath(); if (o.blob) blobPath(c, x, y, r - 5, o.blob, o.seed || 1); else c.ellipse(x, y, r - 5, (o.ry || r) - 5, o.rot || 0, 0, TAU); c.stroke(); }
    if (o.texture !== false && r > 30) { c.save(); c.beginPath(); c.ellipse(x, y, r - 7, (o.ry || r) - 7, o.rot || 0, 0, TAU); c.clip(); c.fillStyle = rgba(C.grain, 0.13); const nn = Math.round(Math.min(160, r * r / 420)); for (let i = 0; i < nn; i++) { const h1 = hash(i * 13 + 7 + (o.seed || 0)), h2 = hash(i * 13 + 9 + (o.seed || 0)); const rr2 = (r - 10) * Math.sqrt(h1), th = h2 * TAU; c.beginPath(); c.arc(x + Math.cos(th) * rr2, y + Math.sin(th) * rr2 * ((o.ry || r) / r), 1.4, 0, TAU); c.fill(); } c.restore(); }
    c.restore();
    if (o.nucleus !== false) nucleus(g, x + (o.nx || 0), y + (o.ny || 0), o.nr || r * 0.36, { alpha: a, fill: o.nfill, edge: o.nedge });
  }
  function blobPath(c, x, y, r, amp, seed) { const n = 48; for (let i = 0; i <= n; i++) { const th = i / n * TAU; const rr2 = r * (1 + amp * (Math.sin(th * 3 + seed) * 0.5 + Math.sin(th * 5 + seed * 2.1) * 0.3 + Math.sin(th * 2 + seed * 0.7) * 0.4)); const px = x + Math.cos(th) * rr2, py = y + Math.sin(th) * rr2; if (i === 0) c.moveTo(px, py); else c.lineTo(px, py); } c.closePath(); }
  function nucleus(g, x, y, r, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx;
    c.save(); c.globalAlpha = a; c.fillStyle = o.fill || C.nucFill; c.strokeStyle = o.edge || C.nucEdge; c.lineWidth = 1.3;
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    // dubbele kernmembraan met poriën als onderbrekingen
    for (const d of [0, 4]) { const n = 10; for (let i = 0; i < n; i++) { c.beginPath(); c.arc(x, y, r - d, i / n * TAU + 0.12, (i + 1) / n * TAU - 0.12); c.stroke(); } }
    // licht korrelige vulling
    c.fillStyle = lighter(o.fill || C.nucFill, 0.3); for (let i = 0; i < 26; i++) { const h1 = hash(i * 7 + 3), h2 = hash(i * 7 + 5); const rr2 = (r - 9) * Math.sqrt(h1), th = h2 * TAU; c.beginPath(); c.arc(x + Math.cos(th) * rr2, y + Math.sin(th) * rr2, 1.6, 0, TAU); c.fill(); }
    c.restore();
  }
  /* chromosomen in een kern (paars, lichte rand) */
  function chromosomes(g, x, y, r, n, o = {}) { const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; c.save(); c.globalAlpha = a; c.strokeStyle = o.color || C.purpleL; c.lineWidth = o.lw || 3; c.lineCap = 'round'; for (let i = 0; i < n; i++) { const h1 = hash(i * 11 + 1), h2 = hash(i * 11 + 2), h3 = hash(i * 11 + 3); const px = x + (h1 - 0.5) * r * 1.2, py = y + (h2 - 0.5) * r * 1.2, L = r * 0.35, th = h3 * TAU; c.beginPath(); c.moveTo(px - Math.cos(th) * L, py - Math.sin(th) * L); c.quadraticCurveTo(px + Math.sin(th) * L * 0.5, py - Math.cos(th) * L * 0.5, px + Math.cos(th) * L, py + Math.sin(th) * L); c.stroke(); } c.restore(); }
  /* mitochondrium (boonvorm, dubbele rand, cristae) */
  function mito(g, x, y, L, o = {}) { const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(o.rot || 0); const h = L * 0.5; c.fillStyle = o.fill || C.mitoFill; c.strokeStyle = o.edge || C.mitoEdge; c.lineWidth = 1.2; rr(c, -L / 2, -h / 2, L, h, h / 2); c.fill(); c.stroke(); rr(c, -L / 2 + 4, -h / 2 + 4, L - 8, h - 8, h / 2 - 4); c.stroke(); c.strokeStyle = lighter(o.fill || C.mitoFill, 0.5); for (let i = 0; i < 5; i++) { const px = -L / 2 + 10 + i * (L - 20) / 4; c.beginPath(); c.moveTo(px, -h / 2 + 6); c.lineTo(px, (i % 2 ? -1 : 1) * h * 0.1); c.stroke(); } c.restore(); }
  /* zaadcel: kop (kern paars), middenstuk met mitochondriën (koraal), staart; ang = richting */
  function sperm(g, x, y, ang, s, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; const wig = o.wig == null ? 0 : o.wig;
    c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(ang); c.scale(s, s);
    // staart
    c.strokeStyle = o.edge || C.cytoEdge; c.lineWidth = 1.6 / s + 0.4; c.lineCap = 'round'; c.beginPath(); c.moveTo(-14, 0);
    for (let i = 1; i <= 16; i++) { const px = -14 - i * 5.5; c.lineTo(px, Math.sin(i * 0.9 + wig) * 5 * (i / 16)); } c.stroke();
    // middenstuk (mitochondriën, koraal)
    c.fillStyle = o.midFill || C.mitoFill; c.strokeStyle = o.midEdge || C.mitoEdge; c.lineWidth = 1; rr(c, -16, -3.5, 14, 7, 3); c.fill(); c.stroke();
    // kop
    c.fillStyle = o.fill || C.cytoL; c.strokeStyle = o.edge || C.cytoEdge; c.lineWidth = 1.3; c.beginPath(); c.ellipse(4, 0, 10, 6.5, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = o.nfill || C.nucFill; c.strokeStyle = o.nedge || C.nucEdge; c.beginPath(); c.ellipse(3, 0, 6.5, 4, 0, 0, TAU); c.fill(); c.stroke();
    if (o.acro !== false) { c.strokeStyle = o.acroColor || C.vesEdge; c.fillStyle = rgba(o.acroColor || C.vesEdge, 0.35); c.lineWidth = 1; c.beginPath(); c.ellipse(9, 0, 5, 5.2, 0, -Math.PI / 2, Math.PI / 2); c.fill(); c.stroke(); }
    c.restore();
  }
  /* mens: platte figuur (neutraal #9AA3B2) met simpel gezicht (ogen, mond) in enkele lijnen; rol via betekeniskleur in een sjaal/band */
  function person(g, x, y, h, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; const col = o.color || C.ink2;
    c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(h / 200, h / 200);
    c.fillStyle = col; c.strokeStyle = lighter(col, 0.3); c.lineWidth = 1.4;
    // lichaam
    rr(c, -34, -120, 68, 130, 26); c.fill(); c.stroke();
    if (o.belly) { c.fillStyle = lighter(col, 0.14); c.beginPath(); c.ellipse(10, -62, 26 + 14 * o.belly, 26 + 16 * o.belly, 0, 0, TAU); c.fill(); c.stroke(); c.fillStyle = col; }
    // benen
    rr(c, -30, 6, 24, 60, 8); c.fill(); c.stroke(); rr(c, 6, 6, 24, 60, 8); c.fill(); c.stroke();
    // hoofd
    c.beginPath(); c.arc(0, -158, 32, 0, TAU); c.fill(); c.stroke();
    if (o.hair) { c.fillStyle = o.hair; c.beginPath(); c.arc(0, -164, 33, Math.PI * 1.05, Math.PI * 1.95); c.lineTo(28, -150); c.lineTo(-28, -150); c.closePath(); c.fill(); }
    // gezicht: ogen en mond in enkele lijnen (geen oogwit)
    c.strokeStyle = C.micro; c.lineWidth = 2.6; c.lineCap = 'round';
    c.beginPath(); c.arc(-11, -162, 2.2, 0, TAU); c.fill(); c.fillStyle = C.micro; c.beginPath(); c.arc(-11, -162, 2.6, 0, TAU); c.fill(); c.beginPath(); c.arc(11, -162, 2.6, 0, TAU); c.fill();
    c.beginPath(); if (o.mood === 'flat') { c.moveTo(-9, -146); c.lineTo(9, -146); } else c.arc(0, -150, 10, 0.25 * Math.PI, 0.75 * Math.PI); c.stroke();
    if (o.band) { c.fillStyle = o.band; rr(c, -34, -110, 68, 12, 4); c.fill(); }
    if (o.baby) { c.fillStyle = col; c.strokeStyle = lighter(col, 0.3); c.lineWidth = 1.4; c.beginPath(); c.arc(30, -70, 16, 0, TAU); c.fill(); c.stroke(); rr(c, 14, -60, 32, 36, 10); c.fill(); c.stroke(); c.fillStyle = C.micro; c.beginPath(); c.arc(25, -72, 1.8, 0, TAU); c.fill(); c.beginPath(); c.arc(35, -72, 1.8, 0, TAU); c.fill(); c.strokeStyle = C.micro; c.lineWidth = 1.8; c.beginPath(); c.arc(30, -66, 4, 0.3 * Math.PI, 0.7 * Math.PI); c.stroke(); }
    c.restore();
  }

  /* ---------- UI-laag: kaarten ---------- */
  /* titelkaart: titel in Titel groot linksboven, de puzzelvraag eronder in Tekst, hoofdbeeld rechts in de look van de film; Meta rechtsboven serie en niveau */
  function titleCard(g, a, title, sub, puzzle, meta, drawImage) {
    if (a <= 0.01) return; g.screen(); const c = g.ctx;
    c.save(); c.globalAlpha = a; c.fillStyle = C.schema; c.fillRect(0, 0, W, H); c.restore();
    if (a > 0.5) g.zones.push({ x0: 0, y0: 0, x1: W, y1: H, kind: 'solid' });
    g.text(meta, W - 100, 120, { size: 28, f: 'mono', color: C.grain, ls: 4, align: 'right', alpha: a, layer: 'meta' });
    g.text('UITGELEGD · BIOLOGIE', 120, 120, { size: 28, f: 'mono', color: C.grain, ls: 4, alpha: a, layer: 'meta' });
    g.text(title, 116, 360, { size: 118, f: 'serif', color: C.ink, alpha: a });
    g.text(sub, 118, 470, { size: 64, f: 'serif', color: C.gold, alpha: a });
    g.para(puzzle, 120, 580, 860, 56, { size: 44, color: C.ink2, alpha: a });
    if (drawImage) drawImage(g, a);
  }
  /* hoofdstukkaart (0..dur) met crossfade naar de scène; Schema-achtergrond, nummer in Meta, titel in Titel, minivraag in Tekst */
  function chapterCard(g, t, num, total, title, sub, dur = 3.0) {
    const a = Math.min(ep(t, 0, 0.35), 1 - ep(t, dur - 0.55, 0.55));
    if (a <= 0.01) return 0;
    const c = g.ctx; g.screen(); c.save(); c.globalAlpha = a; c.fillStyle = C.schema; c.fillRect(0, 0, W, H); c.restore();
    if (a > 0.5) g.zones.push({ x0: 0, y0: 0, x1: W, y1: H, kind: 'solid' });
    g.text('HOOFDSTUK ' + num + ' VAN ' + total, 180, 380, { size: 28, f: 'mono', color: C.grain, ls: 5, alpha: a, layer: 'meta' });
    c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.fillRect(182, 401, 120, 4); c.restore();
    const size = title.length > 26 ? 96 : 120;
    g.text(title, 176, 520, { size, f: 'serif', color: C.ink, alpha: a });
    if (sub) g.para(sub, 182, 605, 1400, 52, { size: 42, color: C.ink2, alpha: a });
    return a;
  }
  /* eindkaart: drie kernzinnen met één annotatiehaak, geen beeld */
  function endCard(g, a, lines, note) {
    if (a <= 0.01) return; g.screen(); const c = g.ctx;
    c.save(); c.globalAlpha = a; c.fillStyle = C.schema; c.fillRect(0, 0, W, H); c.restore();
    if (a > 0.5) g.zones.push({ x0: 0, y0: 0, x1: W, y1: H, kind: 'solid' });
    g.text('DRIE DINGEN OM TE ONTHOUDEN', 180, 230, { size: 28, f: 'mono', color: C.grain, ls: 5, alpha: a, layer: 'meta' });
    let y = 330; lines.forEach((s, i) => { const ai = a * ep(a, 0, 1); g.text(String(i + 1), 180, y, { size: 48, f: 'serif', color: C.gold, alpha: a }); const b = g.para(s, 250, y, 1420, 58, { size: 48, color: C.ink, alpha: a }); y = (b ? b.y1 : y) + 70; });
    if (note) g.annot(250, 1670, y - 30, note, { alpha: a, color: C.green, size: 36 });
  }
  /* vraagkaart-achtergrond op het canvas (de kaart zelf is HTML): altijd Schema-navy, wat de look ook is */
  function questionBg(g, a) { if (a <= 0.01) return; const c = g.ctx; g.screen(); c.save(); c.globalAlpha = a; c.fillStyle = C.schema; c.fillRect(0, 0, W, H); c.restore(); if (a > 0.5) g.zones.push({ x0: 0, y0: 0, x1: W, y1: H, kind: 'solid' }); }
  /* onthulling na de vraag: antwoord en uitleg als Schema-kaart met groene annotatiehaak */
  function revealCard(g, a, q, extra) {
    if (a <= 0.01) return; questionBg(g, a);
    const opt = q.opts.find((o) => o.k === q.correct);
    g.text('ANTWOORD', 180, 250, { size: 28, f: 'mono', color: C.grain, ls: 5, alpha: a, layer: 'meta' });
    g.text(q.correct, 180, 360, { size: 96, f: 'serif', color: C.green, alpha: a });
    const b = g.para(opt.text, 300, 330, 1420, 56, { size: 48, color: C.ink, alpha: a });
    const y = (b ? b.y1 : 400) + 40;
    g.annot(300, 1720, y, q.expl, { alpha: a, color: C.green, size: 40, maxW: 1420 });
    if (extra) extra(g, a, y);
  }

  const E = { W, H, CAPTION_Y, C, F, clamp, c01, lerp, easeIO, easeO, easeI, prog, ep, vis, hash, TAU, rgba, lighter, mix, G, rr, hormone, receptor, membraneLine, cell, nucleus, chromosomes, mito, sperm, person, titleCard, chapterCard, endCard, questionBg, revealCard };
  if (typeof module !== 'undefined' && module.exports) module.exports = E; else root.ENG = E;
})(typeof window !== 'undefined' ? window : globalThis);

/* common.js — tijdlijnhulp per hoofdstuk en vaste segmentkaarten */
(function (root) {
  'use strict';
  const E = root.ENG, C = E.C;
  const norm = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}'\-]/gu, '');
  function makeTL(ch) {
    const byN = {}; ch.sentences.forEach((s) => (byN[s.n] = s));
    const cues = [];
    const TL = {
      ch, dur: ch.dur, cues,
      S: (n) => byN[n],
      /* tijd van een woord in zin n (occ-de voorkomen); edge 't0' of 't1' */
      W(n, word, occ = 1, edge = 't0') {
        const s = byN[n]; if (!s) throw new Error('geen zin ' + n + ' in H' + ch.key);
        const w = norm(word); let k = 0;
        for (const x of s.words) { if (norm(x.w) === w || norm(x.w).startsWith(w)) { k++; if (k === occ) return x[edge]; } }
        throw new Error(`woord "${word}" niet gevonden in H${ch.key} r${n}: ${s.text}`);
      },
      E: (n) => byN[n].t1,
      B: (n) => byN[n].t0,
      seg: (kind) => ch.segments.find((g) => g.kind === kind),
      segs: (kind) => ch.segments.filter((g) => g.kind === kind),
      cue(kind, name, t0, t1, extra) { cues.push(Object.assign({ kind, name, t0: +t0.toFixed(3), t1: t1 == null ? null : +t1.toFixed(3) }, extra || {})); return t0; },
    };
    TL.Q = TL.seg('question') || null; TL.R = TL.seg('reveal') || null; TL.card = TL.seg('card') || null; TL.narr = TL.seg('narr');
    return TL;
  }
  /* vaste delen van elk hoofdstuk: hoofdstukkaart vooraf, vraagkaart-achtergrond en onthulling achteraf. Geeft de alfa van de scène terug. */
  function fixed(g, t, TL, num, total, sub) {
    let aScene = 1;
    if (TL.card) { const a = E.chapterCard(g, t, num, total, TL.ch.title, sub, TL.card.t1); if (t < TL.card.t1) aScene = 1 - a; }
    // vraagkaart of onthulling dekt het beeld volledig af: scène niet tekenen (geen verborgen tekst)
    if (TL.Q && t >= TL.Q.t0 + 0.45 && t < (TL.R ? TL.R.t1 - 0.3 : TL.Q.t1)) { after(g, t, TL); return 0; }
    const EN = TL.seg('end'); if (EN && t >= EN.t0 + 0.7 && t < EN.t1) return 0;
    return aScene;
  }
  function after(g, t, TL) {
    if (TL.Q) {
      const q = TL.Q; const aQ = E.vis(t, q.t0, q.reveal, 0.4, 0.3);
      if (aQ > 0.01) E.questionBg(g, aQ);
      if (TL.R) { const aR = E.vis(t, TL.R.t0, TL.R.t1 - 0.3, 0.4, 0.4); if (aR > 0.01) E.revealCard(g, aR, q); }
      return E.vis(t, q.t0, TL.R ? TL.R.t1 - 0.3 : q.t1, 0.4, 0.4);
    }
    return 0;
  }
  const M = { makeTL, fixed, after };
  if (typeof module !== 'undefined' && module.exports) module.exports = M; else root.COMMON = M;
})(typeof window !== 'undefined' ? window : globalThis);


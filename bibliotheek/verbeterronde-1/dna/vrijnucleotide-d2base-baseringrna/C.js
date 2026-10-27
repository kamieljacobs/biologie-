// ---------- VRIJE NUCLEOTIDE (variant C, beeldbank ronde 2, 27 okt 2026): oud (winnaar) + trifosfaat uit B ----------
// Bouwsteen = nucleoside-trifosfaat: suiker + base + drie fosfaatgroepen (α aan de suiker, dan β en γ). o.pp 0 → 1: β en γ breken
// samen af als pyrofosfaat en schuiven een klein stukje weg (blijft dicht bij de nucleotide, dus binnen het beeld).
// RNA-tinten, d2Base en baseRingRNA blijven zoals in de bibliotheek (de oude tinten waren het best te onderscheiden).
// Bron: OpenStax Biology 2e § 14.4 (Open Oregon-uitgave), zie bron.md — trifosfaat/pyrofosfaat: zie daar de status.
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null, pp = 0, rna = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const kl = rna ? D2.rna : D2.oud, klR = rna ? D2.rnaR : D2.oudR, e = ease(clamp(pp, 0, 1));
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, kl, rand || klR, rand ? 3 : 1.5);
  // α-fosfaat aan de suiker, β en γ als staartje (pyrofosfaat) dat bij pp > 0 afbreekt en wegdrijft
  const fos = (X, Y, r) => _bioCirc(ctx, X, Y, r, DNA_BASE.fosfaat, rand || lighten(DNA_BASE.fosfaat, 0.4), rand ? 3 : 1.2);
  ctx.strokeStyle = klR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-22 * s, 8 * s); ctx.stroke();
  fos(-29 * s, 9 * s, 8 * s);
  ctx.save(); ctx.translate(-e * 14 * s, e * 12 * s); ctx.rotate(-e * 0.35); ctx.globalAlpha *= 1 - 0.6 * e;
  if (e < 0.15) { ctx.beginPath(); ctx.moveTo(-36 * s, 10 * s); ctx.lineTo(-40 * s, 11 * s); ctx.stroke(); }
  fos(-47 * s, 12 * s, 8 * s); ctx.beginPath(); ctx.moveTo(-54 * s, 13 * s); ctx.lineTo(-58 * s, 14 * s); ctx.stroke(); fos(-65 * s, 15 * s, 8 * s); ctx.restore();
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand, rna }); ctx.restore(); }

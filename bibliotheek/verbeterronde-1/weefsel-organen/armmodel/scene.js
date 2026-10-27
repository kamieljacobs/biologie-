function scene(ctx){ const T=(f)=>{ try{ f(); }catch(e){ ctx.restore(); console.log('stand faalt: '+e.message); } };
  T(()=>armModel(ctx, 300, 420, 8.5, {e:1.45, statief:690, trekV:1}));
  T(()=>armModel(ctx, 700, 360, 5.2, {e:0.2, knikV:1}));
  T(()=>armModel(ctx, 900, 360, 5.2, {e:1.4, trekA:1}));
  T(()=>armModel(ctx, 1100, 360, 5.2, {e:0.9, hlV:1, dimA:1}));
  T(()=>armModel(ctx, 1210, 670, 2.2, {e:1.2, trekV:1}));
}

/* Rekenkern voor kruisingen · Biologie bij Kamiel
   Gedeeld door tools/kruisingtrainer.html en tools/kruisingslab.html (sinds 7 nov 2026). */
/* ============================================================
   REKENKERN
   Een model = {loci:[locus], sekse:'XY'|'ZW', lab, sep}
   locus = {id, allelen:[...dominantste eerst], toon:{allel:html}, reeks:[naam per allel] (dominantiereeks)
            of tabel:{'x/y':naam, 'x':naam (hemizygoot)}, namen:[volgorde], pre:'bloedgroep ', gesl:true (op X/Z), letaal:['x/x']}
   Een individu schrijf je als tekst: paren gescheiden door spaties, de twee chromosomen door '/',
   gekoppelde allelen door ',', geslachtschromosomen met X:, Z:, Y: of W:.
   Voorbeelden: 'A/a B/b' · 'A,B/a,b' · 'X:R/X:r' · 'X:R/Y:' · 'IA/i D/d' · 'Z:B/W:'
   ============================================================ */
const KRUIS=(()=>{
  function bouw(model){
    const idx={};
    model.loci.forEach((l,li)=>l.allelen.forEach((a,ai)=>{idx[a]={l,li,ai}}));
    model._idx=idx; model.sekse=model.sekse||'XY';
    return model;
  }
  function hap(s){
    s=s.trim();
    if(s==='Y:'||s==='W:') return {chr:s[0],al:[]};
    if(/^[XZ]:/.test(s)) return {chr:s[0],al:s.slice(2).split(',').filter(Boolean)};
    return {chr:'A',al:s.split(',')};
  }
  function geslPaar(p){return p[0].chr!=='A'}
  function lees(model,str){
    const paren=str.trim().split(/\s+/).map(t=>{const [a,b]=t.split('/');return [hap(a),hap(b)]});
    const sleutel=p=>geslPaar(p)?999:Math.min(...p[0].al.map(a=>model._idx[a].li));
    return paren.sort((x,y)=>sleutel(x)-sleutel(y));
  }
  function hapKey(h){return h.chr+':'+h.al.join(',')}
  function vergelijk(model,h1,h2){
    if(h1.chr!==h2.chr){const o={A:0,X:1,Z:1,Y:2,W:2};return o[h1.chr]-o[h2.chr]}
    for(let i=0;i<Math.max(h1.al.length,h2.al.length);i++){
      const a=h1.al[i],b=h2.al[i]; if(a===b) continue;
      return model._idx[a].ai-model._idx[b].ai;
    }
    return 0;
  }
  function gameten(model,paren){
    let uit=[[]];
    paren.forEach(p=>{
      const uniek=[];const gezien=new Set();
      p.forEach(h=>{const k=hapKey(h);if(!gezien.has(k)){gezien.add(k);uniek.push(h)}});
      uniek.sort((a,b)=>vergelijk(model,a,b));
      const n=[];uit.forEach(g=>uniek.forEach(h=>n.push(g.concat([h]))));uit=n;
    });
    return uit;
  }
  // analyse van een paar-lijst (ouder of kind)
  function analyse(model,paren){
    const per={};model.loci.forEach(l=>per[l.id]=[]);
    let gesl=null;
    paren.forEach(p=>{
      if(geslPaar(p)){
        const c=p.map(h=>h.chr).sort().join('');
        gesl=model.sekse==='ZW'?(c==='ZZ'?'m':'v'):(c==='XX'?'v':'m');
      }
      p.forEach(h=>h.al.forEach(a=>per[model._idx[a].l.id].push(a)));
    });
    const sleutels={},fen={};let dood=false;
    model.loci.forEach(l=>{
      const al=per[l.id].slice().sort((a,b)=>model._idx[a].ai-model._idx[b].ai);
      const k=al.join('/');sleutels[l.id]=k;
      if(!al.length){fen[l.id]='';return}
      if(l.tabel) fen[l.id]=l.tabel[k];
      else fen[l.id]=l.reeks[model._idx[al[0]].ai];
      if(l.letaal&&l.letaal.includes(k)) dood=true;
    });
    return {gesl,sleutels,fen,dood};
  }
  function kruis(model,s1,s2){
    const p1=lees(model,s1),p2=lees(model,s2);
    const g1=gameten(model,p1),g2=gameten(model,p2);
    const cellen=g1.map(a=>g2.map(b=>{
      const paren=a.map((h,i)=>[h,b[i]].sort((x,y)=>vergelijk(model,x,y)));
      return Object.assign({paren},analyse(model,paren));
    }));
    return {p1,p2,g1,g2,cellen,alle:cellen.flat(),levend:cellen.flat().filter(c=>!c.dood)};
  }
  // ---- weergave ----
  function toonAllel(model,a){const l=model._idx[a].l;return (l.toon&&l.toon[a])||a}
  function toonHap(model,h){
    if(h.chr==='Y'||h.chr==='W') return h.chr;
    const s=h.al.map(a=>toonAllel(model,a)).join('');
    return h.chr==='A'?s:h.chr+'<sup>'+s+'</sup>';
  }
  function toonPaar(model,p){
    if(geslPaar(p)) return toonHap(model,p[0])+toonHap(model,p[1]);
    if(p[0].al.length>1) return toonHap(model,p[0])+'/'+toonHap(model,p[1]);
    return toonHap(model,p[0])+toonHap(model,p[1]);
  }
  function compact(model,paren){return paren.every(p=>!geslPaar(p)&&p[0].al.length===1&&p.every(h=>h.al.every(a=>a.length===1)))}
  function toonGenotype(model,paren){
    const z=paren.map(p=>p.slice().sort((x,y)=>vergelijk(model,x,y)));
    return '<span class="gt">'+z.map(p=>toonPaar(model,p)).join(compact(model,z)?'':' ')+'</span>';
  }
  function toonGameet(model,g){return '<span class="gt">'+g.map(h=>toonHap(model,h)).join('')+'</span>'}
  function geslTeken(g){return g==='v'?'♀':g==='m'?'♂':''}
  function fenLabel(model,r,metGesl){
    const t=model.loci.filter(l=>r.fen[l.id]!=='').map(l=>(l.pre||'')+r.fen[l.id]).join(model.sep===undefined?' · ':model.sep);
    return (metGesl&&r.gesl?geslTeken(r.gesl)+' ':'')+(model.lab||'')+t;
  }
  // alle mogelijke fenotypeklassen (in vaste volgorde)
  function namenVan(l,hemi){
    let n;
    if(l.reeks) n=l.reeks.slice();
    else n=[...new Set(Object.entries(l.tabel).filter(([k])=>hemi?!k.includes('/'):k.includes('/')).map(([,v])=>v))];
    if(l.namen) n=l.namen.filter(x=>n.includes(x));
    return n;
  }
  function klassen(model,metGesl){
    const uit=[];
    const sexes=metGesl?(model.sekse==='ZW'?['m','v']:['v','m']):[null];
    const homo=model.sekse==='ZW'?'m':'v';
    sexes.forEach(sx=>{
      let combis=[{fen:{},gesl:sx}];
      model.loci.forEach(l=>{
        const hemi=l.gesl&&sx&&sx!==homo;
        let namen=l.gesl&&!sx?[...new Set([...namenVan(l,false),...namenVan(l,true)])]:namenVan(l,hemi);
        if(l.namen) namen=l.namen.filter(x=>namen.includes(x));
        const n=[];combis.forEach(c=>namen.forEach(nm=>n.push({fen:Object.assign({},c.fen,{[l.id]:nm}),gesl:sx})));combis=n;
      });
      uit.push(...combis);
    });
    return uit.map(c=>({fen:c.fen,gesl:c.gesl,label:fenLabel(model,c,metGesl)}));
  }
  function past(r,doel){
    if(!doel) return true;
    if(doel.gesl&&r.gesl!==doel.gesl) return false;
    if(doel.fen) for(const k in doel.fen) if(r.fen[k]!==doel.fen[k]) return false;
    if(doel.gen) for(const k in doel.gen) if(r.sleutels[k]!==doel.gen[k]) return false;
    return true;
  }
  function kans(res,doel,binnen){
    const noemer=res.levend.filter(r=>past(r,binnen));
    return noemer.filter(r=>past(r,doel)).length/noemer.length;
  }
  function verdeling(model,res,metGesl,binnen){
    const kl=klassen(model,metGesl).filter(k=>!binnen||!binnen.gesl||k.gesl===binnen.gesl||!metGesl);
    return kl.map(k=>({label:k.label,n:res.levend.filter(r=>past(r,binnen)&&past(r,{fen:k.fen,gesl:metGesl?k.gesl:null})).length,k}));
  }
  return {bouw,lees,gameten,analyse,kruis,toonGenotype,toonGameet,toonAllel,fenLabel,klassen,kans,verdeling,past,geslTeken};
})();

// node render.js PORT obj:ver[,ver] ...   -> <obj>/_<ver>.png
const { chromium } = require('playwright');
const path = require('path');
const DIR = __dirname, PORT = process.argv[2];
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const log = []; pg.on('console', m => { if (m.type() === 'error') log.push(m.text()); }); pg.on('pageerror', e => log.push(e.message));
  for (const arg of process.argv.slice(3)) { const [obj, vs] = arg.split(':'); for (const v of vs.split(',')) {
    log.length = 0; await pg.goto(`http://127.0.0.1:${PORT}${DIR}/harness.html?obj=${obj}&v=${v}`); await pg.waitForFunction('window.KLAAR', null, { timeout: 60000 });
    const f = await pg.evaluate('FOUTEN'); await pg.locator('#c').screenshot({ path: path.join(DIR, obj, `_${v}.png`) });
    console.log(obj, v, (f.length || log.length) ? 'FOUT ' + JSON.stringify(f.concat(log)).slice(0, 600) : 'ok'); } }
  await b.close();
})();

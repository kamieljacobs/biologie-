// node shoot.js obj optA,optB ...  -> obj/_opt.png ; console errors printed
const { chromium } = require('playwright');
(async () => { const [obj, opts, port] = [process.argv[2], process.argv[3].split(','), process.argv[4]||'8765'];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = []; p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
  const G='/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/genregulatie/';
  for (const o of opts) { await p.goto(`http://localhost:${port}${G}render.html?obj=${obj}&opt=${o}`); await p.waitForFunction('window.KLAAR===1', null, {timeout: 15000});
    await p.locator('#c').screenshot({ path: `${G}${obj}/_${o}.png` }); }
  console.log(errs.length ? 'FOUTEN: ' + errs.join(' | ') : 'geen fouten'); await b.close(); })();

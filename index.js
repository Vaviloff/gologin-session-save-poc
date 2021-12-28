const puppeteer = require('puppeteer-core');
const GoLogin = require('gologin');

const { log, trace } = console;

(async () => {
  const GL = new GoLogin({
    token: process.env.GOLOGIN_TOKEN,
    profile_id: process.env.GOLOGIN_PROFILE_ID,
    uploadCookiesToServer: true,
    extra_params: [
      '--restore-last-session',
    ],    
  });

  const { status, wsUrl } = await GL.start().catch((e) => {
    trace(e);
    return { status: 'failure' };
  });

  if (status !== 'success') {
    log('Invalid status');
    return;
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: wsUrl.toString(),
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  log(await page.content());
  await page.waitForTimeout(1500);
  await browser.close();
  await GL.stopAndCommit({ postings: true });
})();

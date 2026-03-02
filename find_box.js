const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  const cookies = JSON.parse(fs.readFileSync('twitter_cookies.json', 'utf-8'));
  await page.setCookie(...cookies);
  
  console.log('Loading Twitter...');
  await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2'});
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Looking for compose box...');
  
  // Try different selectors
  const selectors = [
    'div[aria-label="Quoi de neuf ?"]',
    'div[aria-label="Tweet text"]',
    'span:contains("Quoi de neuf")',
    '[data-testid="tweetTextbox"]'
  ];
  
  let found = false;
  for (let s of selectors) {
    try {
      await page.waitForSelector(s, {timeout: 2000});
      console.log('Found:', s);
      await page.click(s);
      found = true;
      break;
    } catch(e) {}
  }
  
  if (!found) {
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'twitter_error.png'});
    console.log('Screenshot saved. Check twitter_error.png');
  }
  
  await new Promise(r => setTimeout(r, 10000));
  await browser.close();
})();

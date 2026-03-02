const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Try ClassifiedAds.com
  console.log('Opening ClassifiedAds.com...');
  await page.goto('https://www.classifiedads.com/post-ad', { waitUntil: 'networkidle2'});
  
  console.log('Page loaded. User needs to see if they can post without login.');
  
  await new Promise(r => setTimeout(r, 30000));
  await browser.close();
})();

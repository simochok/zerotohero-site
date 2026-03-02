const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Opening Reddit...');
  await page.goto('https://www.reddit.com/r/AIToolTesting/', { waitUntil: 'networkidle2'});
  
  console.log('Connected to Reddit. User needs to login manually.');
  
  await new Promise(r => setTimeout(r, 60000));
  
  await browser.close();
})();

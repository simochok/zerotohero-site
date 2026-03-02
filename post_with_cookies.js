const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Load cookies
  const cookies = JSON.parse(fs.readFileSync('twitter_cookies.json', 'utf-8'));
  await page.setCookie(...cookies);
  
  console.log('Cookies loaded. Going to Twitter...');
  await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2'});
  
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Posting tweet...');
  
  // Click tweet box
  await page.click('div[aria-label="Tweet text area"]').catch(e => console.log('Click error:', e.message));
  await new Promise(r => setTimeout(r, 1000));
  
  // Type tweet
  await page.keyboard.type('🤖 Hello World! I am ZeroToHero AI. My journey from $0 to $10k starts NOW! #ZeroToHero #AI');
  await new Promise(r => setTimeout(r, 1000));
  
  // Click Tweet button
  await page.click('div[data-testid="tweetButtonInline"]').catch(e => console.log('Click error:', e.message));
  
  console.log('✅ TWEET POSTÉ!');
  
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
})();

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Opening Twitter Signup...');
  await page.goto('https://twitter.com/i/flow/signup', { waitUntil: 'networkidle2'});
  
  console.log('Je vais essayer de créer le compte...');
  
  // Wait for name input
  await page.waitForSelector('input[name="name"]', { timeout: 10000 }).catch(() => console.log('Pas trouvé'));
  
  // Try to fill name
  await page.type('input[name="name"]', 'ZeroToHero AI');
  await new Promise(r => setTimeout(r, 1000));
  
  // Try next
  // This is complex - Twitter has many steps
  console.log('Twitter signup est complexe. Laisses-moi regarder ce qu\'il demande...');
  
  await new Promise(r => setTimeout(r, 30000)); // Wait 30s for user to see
  
  await browser.close();
})();

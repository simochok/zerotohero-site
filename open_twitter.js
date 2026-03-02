const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Go to X login
  await page.goto('https://twitter.com/i/flow/login', { waitUntil: 'networkidle2'});
  
  console.log('📱 Va dans la fenêtre du navigateur et connecte-toi à X.');
  console.log('Dis-moi quand tu es connecté et que tu vois ton fil d\'accueil Twitter!');
  
  // Wait for user to be ready
  await new Promise(r => setTimeout(r, 120000)); 

  await browser.close();
})();

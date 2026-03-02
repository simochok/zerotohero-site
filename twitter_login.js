const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Lancement du navigateur...');
  
  const browser = await puppeteer.launch({
    headless: false, // Show browser so user can login
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Go to X
  await page.goto('https://twitter.com/i/flow/login', { waitUntil: 'networkidle2'});
  
  console.log('📱 Connecte-toi à X dans le navigateur.');
  console.log('Dis-moi quand tu es connecté!');

  // Wait for user to say done
  await new Promise(r => setTimeout(r, 300000)); // Wait 5 minutes max
  
})();

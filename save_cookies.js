const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Opening Twitter...');
  await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2'});
  
  console.log('Va dans la fenêtre Brave et ASSURE-TOI d\'être connecté à Twitter.');
  console.log('Dis "Connecté" quand tu vois ton fil d\'accueil Twitter avec ton compte.');
  
  await new Promise(r => setTimeout(r, 60000)); // Wait 1 min
  
  // Get cookies
  const cookies = await page.cookies();
  fs.writeFileSync('twitter_cookies.json', JSON.stringify(cookies));
  console.log('✅ Cookies sauvegardés!');
  
  await browser.close();
})();

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Opening Twitter...');
  await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2'});
  
  console.log('Va dans la fenêtre Brave et connecte-toi à X.');
  console.log('Dis-moi quand tu es connecté!');
  
  await new Promise(r => setTimeout(r, 120000)); 

  await browser.close();
})();

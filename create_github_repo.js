const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Opening GitHub...');
  await page.goto('https://github.com/new', { waitUntil: 'networkidle2'});
  
  console.log('Je vais créer un nouveau repository pour le site web.');
  console.log('Va dans la fenêtre et crées un nouveau repo appelé "zerotohero-ai" (public).');
  console.log('Dis-moi quand c\'est fait!');
  
  await new Promise(r => setTimeout(r, 60000));
  await browser.close();
})();

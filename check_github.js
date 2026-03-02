const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Checking GitHub...');
  await page.goto('https://github.com', { waitUntil: 'networkidle2'});
  
  console.log('Va dans la fenêtre Brave et CONNECTE-TOI à GitHub si ce n\'est pas fait.');
  console.log('Dis-moi quand tu es connecté!');
  
  await new Promise(r => setTimeout(r, 60000));
  await browser.close();
})();

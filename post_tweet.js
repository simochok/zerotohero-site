const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Go to X home
  await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2'});
  
  console.log('Waiting for page to load...');
  await new Promise(r => setTimeout(r, 5000));

  // Check if we need to login
  const url = page.url();
  if (url.includes('login')) {
    console.log('❌ Pas connecté. Connecte-toi et dis-moi "Connecté".');
  } else {
    console.log('✅ Connecté! Je poste le tweet...');
    
    // Click on tweet box
    await page.click('div[aria-label="Tweet text area"]');
    await new Promise(r => setTimeout(r, 1000));
    
    // Type tweet
    await page.keyboard.type('🤖 Hello World! I am @MohamedCHOKAIR1\'s AI agent. My journey from $0 to $10k starts NOW! #ZeroToHero #AI #Entrepreneur');
    await new Promise(r => setTimeout(r, 1000));
    
    // Click Tweet button
    await page.click('div[data-testid="tweetButtonInline"]');
    
    console.log('✅ TWEET POSTÉ!');
  }

  await new Promise(r => setTimeout(r, 10000));
  await browser.close();
})();

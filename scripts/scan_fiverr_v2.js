const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Added for stability
  });

  console.log('--- Starting Autonomous Fiverr Scan ---');

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Search for "manual data entry" or "convert pdf" - typical high volume manual tasks
  // Sorting by "Best Selling" to find winning gigs
  const url = 'https://www.fiverr.com/search/gigs?query=convert%20pdf%20to%20excel&source=top-bar&search_in=everywhere&search-autocomplete-original-term=convert%20pdf%20to%20excel&sort=best_selling';

  console.log(`Navigating to ${url}...`);
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for ANY gig card content
    await page.waitForSelector('.gig-card-layout', { timeout: 15000 });

    const gigs = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.gig-card-layout')).slice(0, 8); // Top 8
      return cards.map(card => {
        const title = card.querySelector('h3')?.innerText;
        const price = card.querySelector('.price span')?.innerText;
        const rating = card.querySelector('.rating-score')?.innerText;
        const count = card.querySelector('.rating-count')?.innerText; // "(1k+)"
        return { title, price, rating, count };
      });
    });

    console.log('--- SCAN RESULTS ---');
    console.log(JSON.stringify(gigs, null, 2));

  } catch (error) {
    console.error('Scan failed:', error.message);
    // Fallback: Try a different generic search if blocked
  }

  await browser.close();
})();

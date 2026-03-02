const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  // Fiverr Search: "AI Automation" - Price > $50 - Best Selling
  // Note: Fiverr URLs are complex, using a direct search URL for "AI Automation"
  const url = 'https://www.fiverr.com/search/gigs?query=ai%20automation&source=top-bar&search_in=everywhere&search-autocomplete-original-term=ai%20automation&price_range=50-9999&sort=best_selling';
  
  console.log(`Navigating to ${url}...`);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for gig cards to load
    await page.waitForSelector('.gig-card-layout', { timeout: 10000 });

    const gigs = await page.evaluate(() => {
      const cards = document.querySelectorAll('.gig-card-layout');
      const results = [];
      
      cards.forEach(card => {
        const titleEl = card.querySelector('h3 a');
        const priceEl = card.querySelector('.price span');
        const sellerEl = card.querySelector('.seller-name');
        const ratingEl = card.querySelector('.rating-score');
        
        if (titleEl && priceEl) {
          results.push({
            title: titleEl.innerText,
            price: priceEl.innerText,
            seller: sellerEl ? sellerEl.innerText : 'Unknown',
            rating: ratingEl ? ratingEl.innerText : 'N/A',
            link: titleEl.href
          });
        }
      });
      return results.slice(0, 5); // Get top 5
    });

    console.log(JSON.stringify(gigs, null, 2));

  } catch (error) {
    console.error('Error scraping Fiverr:', error.message);
    // Take screenshot on error for debugging
    await page.screenshot({ path: 'fiverr_error.png' });
    console.log('Error screenshot saved to fiverr_error.png');
  }

  await browser.close();
})();

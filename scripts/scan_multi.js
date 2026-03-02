const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const scanSite = async (name, url, selectorConfig) => {
    console.log(`\n--- Scanning ${name} ---`);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      
      // Wait for items to load
      try {
        await page.waitForSelector(selectorConfig.item, { timeout: 15000 });
      } catch (e) {
        console.log(`Timeout waiting for selector: ${selectorConfig.item}`);
      }

      const items = await page.evaluate((config) => {
        const elements = document.querySelectorAll(config.item);
        const results = [];
        
        elements.forEach(el => {
          const title = el.querySelector(config.title)?.innerText?.trim();
          const price = el.querySelector(config.price)?.innerText?.trim();
          const link = el.querySelector(config.link)?.href;
          
          if (title && price) {
            results.push({ title, price, link });
          }
        });
        return results.slice(0, 5); // Top 5
      }, selectorConfig);

      console.log(JSON.stringify(items, null, 2));
      return items;

    } catch (error) {
      console.error(`Error scanning ${name}:`, error.message);
      await page.screenshot({ path: `${name}_error.png` });
    } finally {
      await page.close();
    }
  };

  // 1. Etsy (Digital Downloads > $20)
  await scanSite('Etsy', 
    'https://www.etsy.com/search?q=digital+download&price_bucket=1&order=most_relevant&explicit=1&ship_to=US', 
    {
      item: '.v2-listing-card',
      title: 'h3.wt-text-caption',
      price: '.currency-value',
      link: 'a.listing-link'
    }
  );

  // 2. ProductHunt (Trending Tools)
  await scanSite('ProductHunt', 
    'https://www.producthunt.com/topics/artificial-intelligence', 
    {
      item: '[data-test="post-item"]', 
      title: 'div.text-16.font-semibold', // Approximated
      price: 'div', // PH doesn't show price directly on list usually, catching generic div
      link: 'a' 
    }
  );
  
  // 3. Upwork (High value jobs) - Harder to scrape due to login, skipping for now to avoid ban.

  await browser.close();
})();

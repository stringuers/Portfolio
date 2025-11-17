const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    console.log('Loading http://localhost:4173/Portfolio/...');
    await page.goto('http://localhost:4173/Portfolio/', { waitUntil: 'networkidle2', timeout: 10000 });
    
    // Get section info
    const sections = await page.evaluate(() => {
      const ids = ['hero', 'about', 'skills', 'projects', 'contact'];
      return ids.map(id => {
        const el = document.getElementById(id);
        if (!el) {
          return { id, exists: false };
        }
        
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const text = el.textContent?.substring(0, 50) || '';
        
        return {
          id,
          exists: true,
          textLength: el.textContent?.length || 0,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          height: el.offsetHeight,
          textPreview: text
        };
      });
    });
    
    console.log('\n=== Section Status ===');
    console.log(JSON.stringify(sections, null, 2));
    
    // Check main element
    const mainInfo = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return { exists: false };
      
      const style = window.getComputedStyle(main);
      return {
        exists: true,
        display: style.display,
        width: main.offsetWidth,
        height: main.offsetHeight,
        childCount: main.children.length,
        visibility: style.visibility,
        opacity: style.opacity,
        position: style.position,
        zIndex: style.zIndex
      };
    });
    
    console.log('\n=== Main Element Info ===');
    console.log(JSON.stringify(mainInfo, null, 2));
    
    // Check if page can scroll
    const pageHeight = await page.evaluate(() => {
      return {
        documentHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
        bodyHeight: document.body.offsetHeight,
        maxScroll: document.documentElement.scrollHeight - window.innerHeight
      };
    });
    
    console.log('\n=== Page Height Info ===');
    console.log(JSON.stringify(pageHeight, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (browser) await browser.close();
  }
})();

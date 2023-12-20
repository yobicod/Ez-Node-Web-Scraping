import puppeteer from 'puppeteer';

const scraping = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  // puppeteer open chromium
  const page = await browser.newPage();

  // connected to target endpoint
  console.log(`Connecting to target endpoint...`);
  await page.goto(`http://quotes.toscrape.com/`, {
    waitUntil: `domcontentloaded`,
  });
  console.log('Connected');

  // scraping single element
  //   const contentsFromScraping = await page.evaluate(() => {
  //     const content = document.querySelector('.quote');

  //     const text = content.querySelector('.text').innerText;

  //     const author = content.querySelector('.author').innerText;

  //     return { text, author };
  //   });

  // scraping multiples element
  const contentsFromScraping = await page.evaluate(() => {
    const contentList = document.querySelectorAll('.quote');

    return Array.from(contentList).map((el) => {
      const text = el.querySelector('.text').innerText;
      const author = el.querySelector('.author').innerText;

      return { text, author };
    });
  });
  console.log(
    '🚀 ~ file: index.js:39 ~ contentsFromScraping ~ contentsFromScraping:',
    contentsFromScraping
  );

  // close chromium
  await browser.close();
};

scraping();

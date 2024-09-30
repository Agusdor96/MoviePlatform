const puppeteer = require('puppeteer');

async function scrapImdb () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
  await page.goto('https://www.imdb.com/chart/top/?ref_=nv_mv_250');
  await page.waitForSelector('.ipc-metadata-list-summary-item');
  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    const movies = await page.$$eval('.ipc-metadata-list-summary-item', (items) => {
      return items.map((item) => {
        const title = item.querySelector('h3.ipc-title__text').textContent;
        const year = item.querySelector('.cli-title-metadata-item').textContent;
        const duration = item.querySelector('.cli-title-metadata-item + .cli-title-metadata-item').textContent;
        const rating = item.querySelector('.ipc-rating-star--rating').textContent;
        const poster = item.querySelector('img.ipc-image').src;

        return {
          title,
          year,
          duration,
          rating,
          poster,
        };
      });
    });

    return movies
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = {
  scrapImdb
}

const { google } = require('googleapis');
const puppeteer = require('puppeteer');
const { auth, spreadsheetId } = require ("../config/googleSheetCon.js")
const Movie = require("../models/Movie")

class ScrapService{

    ///////////////////////////// Scrapping el top 250 de imdbn ///////////////////////////////////////////
    async scrapTop250Imdb () {
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

    async saveScrapedMovies(movies) {
        try {
          const scrapedMovies = await Movie.insertMany(movies);
          return scrapedMovies;
        } catch (err) {
          console.error(err);
          throw err;
        }
    }

    ////////////////////////////// Scrapping y actualizacion posters en google sheets /////////////////////////

    async readGoogleSheet(startRow = 2 ) {
        const sheets = google.sheets({ version: 'v4', auth });
        const range = `A${startRow}:K`;
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });
      
        const rows = response.data.values;
        return rows ? rows : [];
    }
    
    async getPoster(title) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
       
        // Genera la URL de búsqueda en IMDb
        const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(title)}&s=tt`;
        await page.goto(searchUrl);
      
        try {
          const resultsSelector = 'ul.ipc-metadata-list li.ipc-metadata-list-summary-item';
          await page.waitForSelector(resultsSelector, { timeout: 60000 });
          const posterUrl = await page.$eval(`${resultsSelector} img`, img => img.src);

          console.log('URL del póster:', posterUrl);

          await browser.close();
          return posterUrl;

        } catch (error) {
          console.error('Error al obtener el póster para el título:', title, error);
          await browser.close();
          return null;
        }
    }
      
    async updateGoogleSheet(rowIndex, posterUrl) {
      const sheets = google.sheets({ version: 'v4', auth });
      
      if (!Number.isInteger(rowIndex) || rowIndex < 1) {
        console.error('Invalid rowIndex:', rowIndex);
        return;
      }
    
      if (!posterUrl || typeof posterUrl !== 'string') {
        console.error('Invalid poster URL:', posterUrl);
        return;
      }
    
      const encodedPosterUrl = encodeURI(posterUrl);  // Codifica la URL si es necesario
    
      const request = {
        spreadsheetId,
        range: `Todas!J${rowIndex}`, 
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[encodedPosterUrl]],
        },
      };
    
      try {
        await sheets.spreadsheets.values.update(request);
        console.log(`Row ${rowIndex} updated with poster URL: ${encodedPosterUrl}`);
      } catch (error) {
        return ('Error updating Google Sheets:', error);
      }
    }

    //////////////////////////// Actualizar las urls de los posters de googleSheets ////////////////////////////////////////////
    
    async readPosterUrls() {
        const sheets = google.sheets({ version: 'v4', auth });
        const range = 'Todas!J2:J1266';
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });
      
        const rows = response.data.values;
        return rows ? rows.map(row => row[0]) : [];
    }
      
    cleanPosterUrl(url) {
        if (!url) return url; 
        return url.replace(/@[^@]+(?=\.[a-z]{3,4}$)/, '@._');
    }
      
    async updatePosterUrls(rowIndex, cleanUrl) {
        const sheets = google.sheets({ version: 'v4', auth });
      
        const request = {
          spreadsheetId,
          range: `Todas!J${rowIndex}`, // Actualiza la fila correspondiente
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[cleanUrl]],
          },
        };
      
        try {
          await sheets.spreadsheets.values.update(request);
          console.log(`Fila ${rowIndex} actualizada con la URL: ${cleanUrl}`);
        } catch (error) {
          console.error('Error al actualizar la URL en Google Sheets:', error);
        }
    }
      
    async processPosterUrls() {
        const urls = await this.readPosterUrls();
      
        for (let i = 0; i < urls.length; i++) {
          const originalUrl = urls[i];
          const cleanUrl = this.cleanPosterUrl(originalUrl);
      
          if (cleanUrl !== originalUrl) {
            await this.updatePosterUrls(i + 2, cleanUrl);
          }
        }
    }
}

module.exports = ScrapService
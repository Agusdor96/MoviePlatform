const MovieService = require("../services/movieService.js");
const ScrapService = require("../services/scrap.service.js");

const movieService = new MovieService()
const scrapService = new ScrapService()

class ScrapController {
    
    async getScrapMovies (req, res){
        const existingMovies = await movieService.getMovies()
        if(existingMovies.length > 10) res.status(409).json({ mensaje: 'Las películas ya están en la base de datos' });
    
        const movies = await scrapService.scrapTop250Imdb()
        const scrapedMovies = await scrapService.saveScrapedMovies(movies)
        res.json(scrapedMovies);
    }

    async getPosters (req, res) {
        const titles = await scrapService.readGoogleSheet();
        for (const [index, title] of titles.entries()) {
          const posterUrl = await scrapService.getPoster(title);
          await scrapService.updateGoogleSheet(index + 2, posterUrl); // +2 porque empieza desde la fila 2
        }
        res.send('Pósters actualizados correctamente.');
    }

    async updatePosterUrls(req, res){
        const result = await scrapService.processPosterUrls()
        res.json(result)
    }

    async getMovieUrls(req, res){
        try {
            await scrapService.scrapeMovies();
            res.send('Scraping completado');
        } catch (error) {
            res.status(500).send('Error durante el scraping');
        }
    }
}

module.exports = ScrapController;
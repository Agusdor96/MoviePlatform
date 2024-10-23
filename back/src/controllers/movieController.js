const MovieService = require("../services/movieService.js");
const ScrapService = require("../services/scrap.service.js");

const scrapService = new ScrapService()
const movieService = new MovieService()

class MovieController {
    async getAllMovies(req, res){
        const {page = 0, limit = 10} = req.query 

        const movies = await movieService.getMovies(page, limit) 
        res.status(200).json(movies)
    }

    async addMovie(req, res){
        const {data} = res.locals
        try{
            const newMovie = await movieService.createMovie(data);
            res.status(201).json(newMovie)
        } catch (err){
            res.status(err.code).json({err});
        }
        
    }

    async deleteMovieService(req, res){
        const { title } = req.params; 
        const deletedMovie = await movieService.deleteMovie(title);
        res.status(200).json(deletedMovie)
    }

    async insertMovieData(req, res){
        const moviesData = await scrapService.readGoogleSheet(startRow);
        const response = await movieService.insertMoviesIntoMongo(moviesData)
        res.status(200).send(`${response.length} documentos fueron insertados`);
      }
}

module.exports = MovieController

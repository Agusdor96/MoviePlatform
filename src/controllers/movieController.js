const MovieService = require("../services/movieService.js");
const ScrapService = require("../services/scrap.service.js");

const scrapService = new ScrapService()
const movieService = new MovieService()

class MovieController {
    async getAllMovies(req, res){
        const {page = 1, limit = 10} = req.query 

        const movies = await movieService.getMovies(page, limit)     
        res.status(200).json(movies)
    }

    async getFilteredMovies(req, res) {
        const { page = 1, limit = 20, ...filters } = req.query;

        const movies = await movieService.getFilteredMovies(page, limit, filters);
        res.status(200).json(movies);
    }

    async getMovieById(req, res){
        const {movieId}  = req.params
 
        const movie = await movieService.getMovieById({ _id: movieId })
        res.redirect(movie.platformLink);
    }

    async addMovie(req, res){
        const {data} = res.locals

        const newMovie = await movieService.createMovie(data);
        res.status(201).json(newMovie) 
    }

    async updateMovie(req, res){
        const {data} = res.locals

        const response = await movieService.updateMovie(data)
        res.status(201).json(response)
    }

    async deleteMovie(req, res){
        const { id } = req.params; 

        const deletedMovie = await movieService.deleteMovie(id);
        res.status(200).json(deletedMovie)
    }

    async insertMovieData(req, res){
        const moviesData = await scrapService.readGoogleSheet(startRow);
        const response = await movieService.insertMoviesIntoMongo(moviesData)
        res.status(200).send(`${response.length} documentos fueron insertados`);
      }
}

module.exports = MovieController

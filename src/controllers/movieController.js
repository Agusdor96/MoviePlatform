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
        const { page = 0, limit = 200, ...filters } = req.query;

        try {
            const movies = await movieService.getFilteredMovies(page, limit, filters);
            res.status(200).json(movies);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener las películas con filtros' });
        }
    }

    async getMovieById(req, res){
        const {movieId}  = req.params
        try{
        const movie = await movieService.getMovieById({ _id: movieId })
            if(!movie || !movie.platformLink){
                res.status(404).json({ message: "Error al obtener link de cineb.rs"}) 
            }
            res.redirect(movie.platformLink);
        } catch(err){
            next(err);
        }
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

    async updateMovie(req, res){
        const {data} = res.locals

        try{
            const response = await movieService.updateMovie(data)
            res.status(201).json(response)
        } catch (err){
            res.status(500).json({err:"error en controlador de actualizacion de la pelicula"});
        }
    }

    async deleteMovie(req, res){
        const { id } = req.params; 
        try{
            const deletedMovie = await movieService.deleteMovie(id);
            res.status(200).json(deletedMovie)
        }catch (err) {
            res.status(409).json({ message: 'Error al eliminar la pelicula' });
        }
    }

    async insertMovieData(req, res){
        const moviesData = await scrapService.readGoogleSheet(startRow);
        const response = await movieService.insertMoviesIntoMongo(moviesData)
        res.status(200).send(`${response.length} documentos fueron insertados`);
      }
}

module.exports = MovieController

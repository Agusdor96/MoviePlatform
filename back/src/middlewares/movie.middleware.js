const { processImage } = require("../helpers/file.helper");
const Exceptions = require("../utils/customExceptions");
const MovieService = require("../services/movieService.js")

const movieService = new MovieService()

class MovieMiddleware{
   async validateAddMovieData(req, res, next) {
        const {imdbPosition, awards, ...movieData} = req.body;
        
        const values = Object.values(movieData);
        for(const value of values){
            if(value === "") return next (Exceptions.BadRequest("Todos los campos deben estar completos"))
        }

        const checkMovie = await movieService.checkMovieExistance(movieData.title, movieData.director)
        if (checkMovie) {
            return next(Exceptions.Conflict("Ya existe una película con el mismo título y director."));
        }

        try{
            const imagePath = await processImage(req.file)
            res.locals.data = {
            ...movieData,
            imdbPosition: imdbPosition ?? null,
            awards: awards ?? "-",
            posterUrl: imagePath
            }
        } catch (err){
            return next(Exceptions.BadRequest("Error al procesar la imagen: " + err.message));
        }
        next() 
    }
}

module.exports = MovieMiddleware
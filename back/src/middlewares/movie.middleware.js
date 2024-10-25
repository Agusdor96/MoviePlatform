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

        const checkMovie = await movieService.checkMovieExistance({title: movieData.title, director: movieData.director})
        if (checkMovie) {
            return next(Exceptions.Conflict("Ya existe una película con el mismo título y director."));
        }

        res.locals.data = {
            ...movieData,
            imdbPosition: imdbPosition ?? null,
            awards: awards ?? "-",
        }

        if(req.file){
            try{
                const imagePath = await processImage(req.file)
                res.locals.data.posterUrl = imagePath

            } catch (err){
                return next(Exceptions.BadRequest("Error al procesar la imagen: " + err.message));
            }
        }
        next() 
    }

   async validateUpdateMovieData(req, res, next) {
        const {...movieData} = req.body;
        const {id} = req.params
        
        if(!movieData && !req.file) return next (Exceptions.BadRequest("No se encontro informacion para actualizar"))

        const checkMovie = await movieService.checkMovieExistance({ _id: id })
        if (!checkMovie) {
            return next(Exceptions.Conflict("No se encontro pelicula con ese id."));
        }

        try{
            const validFields = [
                "title", "director", "mainCharacter", "year",
                "genre", "imdbPosition", "awards", "duration",
                "rating", "posterUrl"
            ];

            const filteredData = {};

            validFields.forEach(field => {
                if (movieData[field] && movieData[field].trim() !== '') { // Verifica que no sea un string vacío
                    filteredData[field] = movieData[field].trim(); // Trim para eliminar espacios
                }
            });
            res.locals.data = { id, filteredData };

            if(req.file){
                try{
                    const imagePath = await processImage(req.file)
                    res.locals.data.posterUrl = imagePath;

                } catch (err){
                    return next(Exceptions.BadRequest("Error al procesar la imagen: " + err.message));
                }
            }
            next() 
        }catch(err){
            return next(Exceptions.InternalServerError("Error en la validación de actualización de película"));
        }
    }
}

module.exports = MovieMiddleware
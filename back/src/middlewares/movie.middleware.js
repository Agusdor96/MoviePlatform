const { processImage } = require("../helpers/file.helper");
const Exceptions = require("../utils/customExceptions");

class MovieMiddleware{
   async validateAddMovieData(req, res, next) {
    const {...movieData} = req.body;
    
    const values = Object.values(movieData);
    for(const value of values){
        if(value === "") return next (Exceptions.BadRequest("Todos los campos deben estar completos"))
    }
    
    const imagePath = await processImage(req.file)

    res.locals.data = {
        ...movieData,
        posterUrl: imagePath
    }
    next()
    }
}

module.exports = MovieMiddleware
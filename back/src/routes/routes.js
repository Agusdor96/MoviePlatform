const {Router} = require ("express")
const movieController = require("../controllers/movieController");


const indexRouter = Router(); //instanciamos al enrutador
indexRouter.get("/movies", movieController.getAllMovies);
indexRouter.post("/movies", movieController.createMovieController);
indexRouter.delete("/movies/:title", movieController.deleteMovieService);

module.exports = indexRouter;



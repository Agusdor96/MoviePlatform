const {Router} = require ("express")
const movieController = require("../controllers/movieController");


const indexRouter = Router();
indexRouter.get("/movies", movieController.getAllMovies);
indexRouter.post("/movies", movieController.createMovieController);
indexRouter.delete("/movies/:title", movieController.deleteMovieService);

indexRouter.get("/movies/scrap", movieController.getScrapMovies);

module.exports = indexRouter;



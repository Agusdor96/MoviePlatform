const { Router } = require("express");
const movieController = require("../controllers/movieController.js");

const moviesRouter = Router()

moviesRouter.get("/movies", movieController.getAllMovies);
moviesRouter.post("/movies", movieController.createMovieController);
moviesRouter.delete("/movies/:title", movieController.deleteMovieService);

module.exports = moviesRouter;
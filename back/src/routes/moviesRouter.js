const { Router } = require("express");
const movieController = require("../controllers/movieController.js");

const moviesRouter = Router()

moviesRouter.get("/", movieController.getAllMovies);
moviesRouter.post("/addMovie", movieController.createMovieController);
moviesRouter.delete("/:title", movieController.deleteMovieService);
moviesRouter.get("/insertIntoMongo", movieController.insertMovieData);

module.exports = moviesRouter;
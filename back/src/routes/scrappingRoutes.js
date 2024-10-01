const { Router } = require("express");
const movieController = require("../controllers/movieController.js");

const scrappingRouter = Router()

scrappingRouter.get("/movies", movieController.getScrapMovies);

module.exports = scrappingRouter;
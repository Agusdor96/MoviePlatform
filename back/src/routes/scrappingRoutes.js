const { Router } = require("express");
const ScrapController = require("../controllers/scrap.controller");

const scrapController = new ScrapController()
const scrappingRouter = Router()

scrappingRouter.get("/movies", scrapController.getScrapMovies);
scrappingRouter.get("/getPoster", scrapController.getPosters);
scrappingRouter.get("/updateUrls", scrapController.updatePosterUrls);


module.exports = scrappingRouter;
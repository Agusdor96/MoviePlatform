const { Router } = require("express");
const MovieController = require("../controllers/movieController.js");
const AuthMiddleware = require("../middlewares/auth.middleware")

const authMidd = new AuthMiddleware()
const movieController = new MovieController()

const moviesRouter = Router()

moviesRouter.get("/", movieController.getAllMovies);
moviesRouter.post("/addMovie", authMidd.validateUserToken, authMidd.validateUserRole(["admin"]), movieController.createMovieController);
moviesRouter.delete("/:title", authMidd.validateUserToken, authMidd.validateUserRole(["admin"]), movieController.deleteMovieService);
moviesRouter.get("/insertIntoMongo", authMidd.validateUserToken, authMidd.validateUserRole(["admin"]), movieController.insertMovieData);

module.exports = moviesRouter;
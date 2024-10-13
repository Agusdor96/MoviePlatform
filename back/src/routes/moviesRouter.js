const { Router } = require("express");
const movieController = require("../controllers/movieController.js");
const AuthMiddleware = require("../middlewares/auth.middleware")

const authMidd = new AuthMiddleware()

const moviesRouter = Router()

moviesRouter.get("/", authMidd.validateUserToken , authMidd.validateUserRole(["admin"]), movieController.getAllMovies);
moviesRouter.post("/addMovie", movieController.createMovieController);
moviesRouter.delete("/:title", movieController.deleteMovieService);
moviesRouter.get("/insertIntoMongo", movieController.insertMovieData);

module.exports = moviesRouter;
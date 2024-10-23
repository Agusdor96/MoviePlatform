const { Router } = require("express");
const MovieController = require("../controllers/movieController.js");
const AuthMiddleware = require("../middlewares/auth.middleware");
const MovieMiddleware = require("../middlewares/movie.middleware.js");
const {multerMidd, multerErrorHandler} = require("../middlewares/multer.middleware.js");


const authMidd = new AuthMiddleware()
const movieController = new MovieController()
const movieMidd = new MovieMiddleware()

const moviesRouter = Router()

moviesRouter.get("/", movieController.getAllMovies);

moviesRouter.post("/addMovie",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    multerMidd.single("posterUrl"),
    multerErrorHandler,
    movieMidd.validateAddMovieData,
    movieController.createMovieController);

moviesRouter.delete("/:title",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    movieController.deleteMovieService);

moviesRouter.get("/insertIntoMongo",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    movieController.insertMovieData);

module.exports = moviesRouter;
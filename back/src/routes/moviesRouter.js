const { Router } = require("express");
const MovieController = require("../controllers/movieController.js");
const AuthMiddleware = require("../middlewares/auth.middleware");
const MovieMiddleware = require("../middlewares/movie.middleware.js");
const {multerMidd, multerErrorHandler, multerUploadMiddleware} = require("../middlewares/multer.middleware.js");


const authMidd = new AuthMiddleware()
const movieController = new MovieController()
const movieMidd = new MovieMiddleware()

const moviesRouter = Router()

moviesRouter.get("/", movieController.getAllMovies);

moviesRouter.get("/filteredMovies", movieController.getFilteredMovies)

moviesRouter.post("/addMovie",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    multerMidd.single("posterUrl"),
    multerErrorHandler,
    movieMidd.validateAddMovieData,
    movieController.addMovie);

moviesRouter.put("/update/:id",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    multerUploadMiddleware("posterUrl"),
    multerErrorHandler,
    movieMidd.validateUpdateMovieData,
    movieController.updateMovie);

moviesRouter.delete("/delete/:id",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    movieController.deleteMovie);

moviesRouter.get("/insertIntoMongo",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    movieController.insertMovieData);

module.exports = moviesRouter;
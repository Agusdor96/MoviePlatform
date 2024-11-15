const {ObjectId} = require("mongodb")
const bcrypt = require('bcryptjs')
const UserService = require("../services/users.service")
const Exceptions = require("../utils/customExceptions")
const MovieService = require("../services/movieService")
const Watchlist = require("../models/Watchlist")
const Watched = require("../models/Watched")

const userService = new UserService()
const movieService = new MovieService()


class UserMiddleware {
    async validateUserSignUp(req, res, next){
        const { email, password} = req.body

        if(!email || !password) throw Exceptions.BadRequest("Los datos deben estar completos")

        const existingEmail = await userService.getUserByEmail({email})
        if(existingEmail) throw Exceptions.Conflict("El email ya existe")

        next()
    }

    async validateUserSignIn(req, res, next){
        const { email, password } = req.body

        const user = await userService.getUserByEmail({email});
        if (!user) throw Exceptions.NotFound("Invalid Credentials")
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw Exceptions.BadRequest("Invalid Credentials")

        res.locals.user = user
        next()

    }

    async validateUpdateWatchlist(req, res, next){
        const {userId, movieId, action} = req.body
        if(!ObjectId.isValid(userId) || !ObjectId.isValid(movieId)) return next(Exceptions.BadRequest("El ID proporcionado no es un objectId de mongoDB valido"))

        if(action !== "ADD" && action !== "REMOVE") return next(Exceptions.BadRequest("El parametro action *debe* ser ADD o REMOVE"))
        
        const user = await userService.getUserById({_id:userId});
        const movie = await movieService.getMovieById({_id:movieId});
        if (!user || !movie) return next(Exceptions.NotFound("no se encuentra user o movie con el idProporcionado"))

        if (action === "ADD") {
            const movieInWatchlist = await Watchlist.findOne({ userId, movieId });
            if (movieInWatchlist) {
                return next(Exceptions.Conflict("La película ya está en la lista de 'Quiero ver'"));
            }
        }
        if(action === "REMOVE"){
            const movieInWatchlist = await Watchlist.findOne({ userId, movieId });
            if (!movieInWatchlist) {
                return next(Exceptions.Conflict("La película no está en la lista de 'Quiero ver'"));
            }
        }
        
        next()
    }

    async validateWatchedMovies(req, res, next){
        const {userId, movieId} = req.body
        if(!ObjectId.isValid(userId) || !ObjectId.isValid(movieId)) return next(Exceptions.BadRequest("El ID proporcionado no es un objectId de mongoDB valido"))
    
        const user = await userService.getUserById({_id:userId});
        const movie = await movieService.getMovieById({_id:movieId});
        if (!user || !movie) return next(Exceptions.NotFound("no se encuentra user o movie con el id Proporcionado"))

        const movieWatched = await Watched.findOne({ userId, movieId });
        if (movieWatched) {
            return next(Exceptions.Conflict("La película ya está en la lista de las peliculas vistas"));
        }

        next()
    }

    async validateUserMovieLists(req, res, next){
        const {userId} = req.params
        if(!ObjectId.isValid(userId)) return next(Exceptions.BadRequest("El ID proporcionado no es un objectId de mongoDB valido"))
        
        const user = await userService.getUserById({_id:userId});
        if(!user) return next(Exceptions.NotFound("no se encuentra user con el idProporcionado"))

        const isWatchlistEndpoint = req.path.includes("watchlist");
        const isWatchedEndpoint = req.path.includes("watched");

        if(isWatchlistEndpoint){
            const hasWatchlistMovies = await Watchlist.exists({ userId });
            if (!hasWatchlistMovies) {
                return next(Exceptions.NotFound("El usuario no ha agregado peliculas a la lista"));
            }
        }

        if(isWatchedEndpoint){
            const hasWatchedMovies = await Watched.exists({ userId });
            if (!hasWatchedMovies) {
                return next(Exceptions.NotFound("El usuario no vio ninguna pelicula"));
            }
        }
        next()
    }
}
module.exports = UserMiddleware
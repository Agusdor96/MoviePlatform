const {ObjectId} = require("mongodb")
const bcrypt = require('bcryptjs')
const UserService = require("../services/users.service")
const Exceptions = require("../utils/customExceptions")
const MovieService = require("../services/movieService")

const userService = new UserService()
const movieService = new MovieService()


class UserMiddleware {

    async validateUserSignUp(req, res, next){
        const { email, password} = req.body
        try {
            if(!email || !password) throw Exceptions.BadRequest("Missing fields")

            const existingEmail = await userService.getUserByEmail({email})
            if(existingEmail) throw Exceptions.Conflict("Email already Exists")

            next()
        } catch (error) {
            next(error);  
        }
    }

    async validateUserSignIn(req, res, next){
        const { email, password } = req.body
        try {
            const user = await userService.getUserByEmail({email});
            if (!user) throw Exceptions.NotFound("Invalid Credentials")
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw Exceptions.BadRequest("Invalid Credentials")

            res.locals.user = user
            next()
        } catch (error) {
            next(error)
        }
    }

    async validateUpdateWatchlist(req, res, next){
        const {userId, movieId, action} = req.body
        if(!ObjectId.isValid(userId || movieId)) return next(Exceptions.BadRequest("El ID proporcionado no es un objectId de mongoDB valido"))

        if(action !== "ADD" && action !== "REMOVE") return next(Exceptions.BadRequest("El parametro action *debe* ser ADD o REMOVE"))
        
        const user = await userService.getUserById({_id:userId});
        const movie = await movieService.getMovieById({_id:movieId});
        if (!user || !movie) throw Exceptions.NotFound("no se encuentra user o movie con el idProporcionado")

        if (user.watchlist.includes(movieId)) {
            return next(Exceptions.Conflict("La película ya está en la lista de 'Quiero ver'"));
        }
        res.locals.data = {
            user,
            movie,
            action
        }
        next()
    }

    async validateWatchedMovies(req, res, next){
        const {userId, movieId} = req.body
        if(!ObjectId.isValid(userId || movieId)) return next(Exceptions.BadRequest("El ID proporcionado no es un objectId de mongoDB valido"))
    
        const user = await userService.getUserById({_id:userId});
        const movie = await movieService.getMovieById({_id:movieId});
        if (!user || !movie) throw Exceptions.NotFound("no se encuentra user o movie con el idProporcionado")

        res.locals.data = {
            user,
            movie,
        }
        next()
    }
}
module.exports = UserMiddleware
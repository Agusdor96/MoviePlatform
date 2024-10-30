const User = require("../models/User");
const Exceptions = require("../utils/customExceptions");
const {ObjectId} = require("mongodb")

class UserService {
    async getUserByEmail(email){
        const user = await User.findOne(email)
        return user || null;
    }

    async getUserById(data){
        if(!ObjectId.isValid(data._id)) throw Exceptions.BadRequest("El ID proporcionado no es un objectId de mongoDB valido")

        const user = await User.findOne(data)
        if(!user) throw Exceptions.NotFound("No se econtro usuario con el id proporcionado")

        const {password, ...wPassword} = user.toObject()
        return wPassword
    }

    async updateWatchlist({user, movie, action}){
        if(action === "ADD"){
            user.watchlist.push(movie._id);
            const response = await user.save();
            if(!response) throw Exceptions.Conflict("Error al agregar pelicula a la watchlist")
            return {message: "Pelicula agregada a la watchlist"}
        }
        if(action === "REMOVE"){
            user.watchlist.pull(movie._id);
            const response = await user.save();
            if(!response) throw Exceptions.Conflict("Error al eliminar pelicula de la watchlist")
            return {message: "Pelicula eliminada de la watchlist"}
        }
    }

    async updateWatchedMovies({user, movie}){
        user.watchlist.pull(movie._id);
        user.watched.push(movie._id);
        const response = await user.save();

        if(!response) throw Exceptions.Conflict("Error al agregar pelicula a la watched")
            
        return {message: "Pelicula agregada a la watched"}
    }

    async createUser(user){
        return await User.create(user)
    }
} 

module.exports = UserService;
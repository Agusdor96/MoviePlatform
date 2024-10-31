const User = require("../models/User");
const Exceptions = require("../utils/customExceptions");
const {ObjectId} = require("mongodb")

class UserService {
    async getAllUsers(){
        const users = await User.find().sort({_id: 1})

        if(!users) throw Exceptions.NotFound("No se encontraron usuarios registrados")
        return users
    }

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

    async getMoviesLists(userId){
        const user = await User.findById(userId)
        .populate('watchlist.movie')
        .populate('watched.movie') 

        const sortedWatchlist = user.watchlist.sort((a, b) => b.addedAt - a.addedAt);
        const sortedWatched = user.watched.sort((a, b) => b.watchedAt - a.watchedAt);

        return {
            watchlist: sortedWatchlist ?? [],
            watched: sortedWatched ?? []
        }
    }

    async updateWatchlist({userId, movieId, action}){
        const user = await User.findById(userId)

        if(action === "ADD"){
            user.watchlist.push({ movie: movieId, addedAt: Date.now() });
            const response = await user.save();
            if(!response) throw Exceptions.Conflict("Error al agregar pelicula a la watchlist")
            return {message: "Pelicula agregada a la watchlist"}
        }
        if(action === "REMOVE"){
            user.watchlist.pull(movieId);
            const response = await user.save();
            if(!response) throw Exceptions.Conflict("Error al eliminar pelicula de la watchlist")
            return {message: "Pelicula eliminada de la watchlist"}
        }
    }

    async updateWatchedMovies({userId, movieId}){
        const user = await User.findById(userId)

        user.watchlist.pull(movieId);
        user.watched.push({ movie: movieId, watchedAt: new Date() });
        const response = await user.save();

        if(!response) throw Exceptions.Conflict("Error al agregar pelicula a la watched")
        return {message: "Pelicula agregada a la watched"}
    }

    async createUser(user){
        return await User.create(user)
    }
} 

module.exports = UserService;
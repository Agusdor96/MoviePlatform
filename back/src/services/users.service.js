const User = require("../models/User");
const Watched = require("../models/Watched");
const Watchlist = require("../models/Watchlist");
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

    async getWatchlist(userId, page, limit){
        const offset = page * limit

        const watchlist = await Watchlist.find({ userId })
            .populate('movieId')
            .skip(offset)
            .limit(limit);

        if(watchlist.length === 0 ) throw Exceptions.NotFound("Se supero la cantidad de peliculas de la lista del usuario")

        const total = await Watchlist.countDocuments({ userId });
        return {
            total,
            page,
            limit,
            movies: watchlist
        };
    }

    async getWatchedMovies(userId, page, limit){
        const offset = page * limit

        const watched = await Watched.find({ userId })
            .populate('movieId')
            .skip(offset)
            .limit(limit);

        if(watched.length === 0 ) throw Exceptions.NotFound("Se supero la cantidad de peliculas de la lista del usuario")

        const total = await Watched.countDocuments({ userId });
        return {
            total,
            page,
            limit,
            movies: watched
        };
    }

    async updateWatchlist({userId, movieId, action}){
        if(action === "ADD"){
            const newWatchlistEntry = new Watchlist({
                userId,
                movieId,
                addedAt: Date.now()
            });
            const response = await newWatchlistEntry.save();
    
            if(!response) throw Exceptions.Conflict("Error al agregar pelicula a la watchlist")
            return {message: "Pelicula agregada a la watchlist"}
        }
        if(action === "REMOVE"){
            const response = await Watchlist.findOneAndDelete({ userId, movieId });

            if(!response) throw Exceptions.Conflict("Error al eliminar pelicula de la watchlist")
            return {message: "Pelicula eliminada de la watchlist"}
        }
    }

    async updateWatchedMovies({userId, movieId}){
        await Watched.findOneAndDelete({ userId, movieId });
        const newWatchedEntry = new Watched({
            userId,
            movieId,
            addedAt: Date.now()
        });
        const response = await newWatchedEntry.save();

        if(!response) throw Exceptions.Conflict("Error al agregar pelicula a la watched")
        return {message: "Pelicula agregada a la watched"}
    }

    async createUser(user){
        return await User.create(user)
    }
} 

module.exports = UserService;
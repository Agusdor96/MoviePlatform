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

    async addMovieToWatchlist({user, movie, action}){
        if(action === "ADD"){
            user.watchlist.push(movie._id);
            await user.save();
        }
    }

    async createUser(user){
        return await User.create(user)
    }
} 

module.exports = UserService;
const UserService = require("../services/users.service")

const userService = new UserService()

class UserController{
    async getAllUsers(req, res, next){
        try{
            const users = await userService.getAllUsers()
            res.status(200).json({users})
        }catch(error){
            next(error)
        }
    }

    async getUserById(req, res, next){
        const {id} = req.params
        try{
            const user = await userService.getUserById({_id: id})
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    async getUserWatchlist(req, res, next){
        const {userId} = req.params
        const {page = 0, limit = 15} = req.query
        try{
            const movies = await userService.getWatchlist(userId, page, limit)
            res.status(200).json({movies})
        }catch (error){
            next(error)
        }
    }

    async getUserWatchedMovies(req, res, next){
        const {userId} = req.params
        const {page = 0, limit = 15} = req.query
        try{
            const movies = await userService.getWatchedMovies(userId, page, limit)
            res.status(200).json({movies})
        }catch (error){
            next(error)
        }
    }

    async updateWatchlist(req, res, next){
        const {...data} = req.body
        try{
            const response = await userService.updateWatchlist(data)
            res.status(200).json({message: response})
        }catch(error){
            next(error)
        }
    }

    async updateWatchedMovies(req, res, next){
        const {...data} = req.body
        try{
            const response = await userService.updateWatchedMovies(data)
            res.status(200).json({message: response})
        }catch(error){
            next(error)
        }
    }
}

module.exports = UserController
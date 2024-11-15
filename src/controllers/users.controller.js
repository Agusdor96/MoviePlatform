const UserService = require("../services/users.service")

const userService = new UserService()

class UserController{
    async getAllUsers(req, res){
        const users = await userService.getAllUsers()
        res.status(200).json({users})
    }

    async getUserById(req, res){
        const {id} = req.params
        
        const user = await userService.getUserById({_id: id})
        res.status(200).json(user)
    }

    async getUserWatchlist(req, res){
        const {userId} = req.params
        const {page = 0, limit = 15} = req.query

        const movies = await userService.getWatchlist(userId, page, limit)
        res.status(200).json({movies})
    }

    async getUserWatchedMovies(req, res){
        const {userId} = req.params
        const {page = 0, limit = 15} = req.query

        const movies = await userService.getWatchedMovies(userId, page, limit)
        res.status(200).json({movies})
    }

    async updateWatchlist(req, res){
        const {...data} = req.body

        const response = await userService.updateWatchlist(data)
        res.status(200).json({message: response})
    }

    async updateWatchedMovies(req, res){
        const {...data} = req.body

        const response = await userService.updateWatchedMovies(data)
        res.status(200).json({message: response})
    }
}

module.exports = UserController
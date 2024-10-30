const UserService = require("../services/users.service")

const userService = new UserService()

class UserController{
    async getUserById(req, res, next){
        const {id} = req.params
        try{
            const user = await userService.getUserById({_id: id})
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    async addToWatchlist(req, res, next){
        const {data} = res.locals
        try{
            await userService.addMovieToWatchlist(data)
        }catch(error){
            next(error)
        }
    }
}

module.exports = UserController
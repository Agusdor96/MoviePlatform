const UserService = require("../services/users.service")
const Exceptions = require("../utils/customExceptions")

const userService = new UserService()

async function validateUserData(req, res, next){
    const {username, email, password} = req.body
    try {
        if(!username || !email || !password) throw Exceptions.badRequest("Missing fields")

        const existingEmail = await userService.getUserByEmail(email)
        if(existingEmail) throw Exceptions.conflict("Email already Exists")

        const existingUsername = await userService.getUserByUsername(username)
        if(existingUsername) throw Exceptions.conflict("Username already Exists")

        next()
    } catch (error) {
        next(error);  
    }
}

module.exports = {
    validateUserData
}
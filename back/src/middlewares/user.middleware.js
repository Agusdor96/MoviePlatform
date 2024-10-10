const UserService = require("../services/users.service")
const Exceptions = require("../utils/customExceptions")

const userService = new UserService()

async function validateUserData(req, res, next){
    const { email, password} = req.body
    try {
        if(!email || !password) throw Exceptions.badRequest("Missing fields")

        const existingEmail = await userService.getUserByEmail(email)
        if(existingEmail) throw Exceptions.conflict("Email already Exists")

        next()
    } catch (error) {
        next(error);  
    }
}

module.exports = {
    validateUserData
}
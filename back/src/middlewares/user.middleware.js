const UserService = require("../services/users.service")
const Exceptions = require("../utils/customExceptions")
const bcrypt = require('bcryptjs')

const userService = new UserService()

class UserMiddleware {

    async validateUserSignUp(req, res, next){
        const { email, password} = req.body
        try {
            if(!email || !password) throw Exceptions.badRequest("Missing fields")

            const existingEmail = await userService.getUserByEmail({email})
            if(existingEmail) throw Exceptions.conflict("Email already Exists")

            next()
        } catch (error) {
            next(error);  
        }
    }

    async validateUserSignIn(req, res, next){
        const { email, password } = req.body
        try {
            const user = await userService.getUserByEmail({email});
            if (!user) throw Exceptions.notFound("Invalid Credentials")
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw Exceptions.badRequest("Invalid Credentials")

            res.locals.user = user
            next()
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    UserMiddleware
}
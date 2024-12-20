const bcrypt = require('bcryptjs');
const UserService = require("./users.service");
const Exceptions = require('../utils/customExceptions');
const tokenHelper = require("../helpers/token.helper.js")
const cookieHelper = require("../helpers/cookie.helper.js")

const userService = new UserService();

class AuthService {
    async createNewUser(newUser) {
        const hashPassword = await bcrypt.hash(newUser.password, 10);
        const user = {
            ...newUser,
            password: hashPassword,
        };

        const createUser = await userService.createUser(user);
        const { password, ...withoutPassword } = createUser.toObject();
        return withoutPassword;
    }

    async userLogIn(user, res){
        const {accessToken, refreshToken} = tokenHelper.generateTokens(user); 
        cookieHelper.setRefreshTokenCookie(res, refreshToken);

        const { password, ...wPassword } = user.toObject();
        return {accessToken, wPassword}
    }

    async userLogOut(res){       
        cookieHelper.clearRefreshTokenCookie(res)
    }
}

module.exports = AuthService

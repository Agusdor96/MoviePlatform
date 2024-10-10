const bcrypt = require('bcryptjs');
const UserService = require("./users.service");
const Exceptions = require('../utils/customExceptions');

const userService = new UserService();
class AuthService {
    async createNewUser(newUser) {
        const hashPassword = await bcrypt.hash(newUser.password, 10);
        const user = {
            ...newUser,
            password: hashPassword,
        };

        try {
            const createUser = await userService.createUser(user);
            const { password, ...withoutPassword } = createUser.toObject();
            return withoutPassword;
        } catch (error) {
            throw Exceptions.internalServerError("Error creating user")
        }
    }
}

module.exports = AuthService

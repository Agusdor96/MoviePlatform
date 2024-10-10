const User = require("../models/User");

class UserService {
    async getUserByEmail(email){
        const user = await User.findOne({email})
        return user || null;
    }

    async createUser(user){
        return await User.create(user)
    }
} 

module.exports = UserService;
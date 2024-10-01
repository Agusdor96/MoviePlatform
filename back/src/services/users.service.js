const User = require("../models/User");
const bcrypt = require('bcryptjs');
const Exceptions = require("../utils/customExceptions");

class UserService {
    async getUserByEmail(email){
        const user = await User.findOne({email})
        return user;
    }

    async getUserByUsername(username){
        const user = await User.findOne({username})
        return user;
    }
    
    async createNewUser(newUser){   
        const existingEmail = await User.findOne({email: newUser.email})
        if(existingEmail) throw Exceptions.conflict("Email already Exists")
            
        const existingUsername = await User.findOne({username: newUser.username})            
        if(existingUsername) throw Exceptions.conflict("Username already Exists")
                
        const hashPassword = await bcrypt.hash(newUser.password, 10);
        const user = {
            ...newUser,
            password: hashPassword
        }

        try {
            const createUser = await User.create(user);  
            const { password, ...withoutPassword } = createUser.toObject();;
            return withoutPassword;   
        } catch (error) {
            console.log(error);
            
        }
    }
} 

module.exports = UserService;
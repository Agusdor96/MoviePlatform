const mongoose = require("mongoose");
const { ROLES } = require("../enums/roles.enum");
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum: Object.values(ROLES),
        default:ROLES.USER
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User;
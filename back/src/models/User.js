const mongoose = require("mongoose");
const { ROLES } = require("../enums/roles.enum");
const Schema = mongoose.Schema

const userSchema = new Schema({
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
    },
    watchlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        }
    ],
    watched: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        }
    ]

})

const User = mongoose.model("User", userSchema)
module.exports = User;
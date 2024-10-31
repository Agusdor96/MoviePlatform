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
    watchlist: [{
        movie: { type: Schema.Types.ObjectId, ref: "Movie" },
        addedAt: { type: Date, default: Date.now }
    }],
    watched: [{
        movie: {type: Schema.Types.ObjectId, ref: "Movie"},
        watchedAt: {type: Date, default: Date.now}
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User;
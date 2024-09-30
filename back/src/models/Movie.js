const mongoose = require("mongoose");
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {type: String, required: true},
    director: {type: String, required: false},  
    year: {type: Number, required: true},
    duration: {type: String, required: true},
    genre: {type: String, required: false},
    rating: {type: String, required: true},
    poster: {type: String, required: true},
    platformLink: {type: String, required: false}
});

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie;
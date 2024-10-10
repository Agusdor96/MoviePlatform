const mongoose = require("mongoose");
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {type: String, required: true, unique: true},
    director: {type: String, required: false}, 
    mainCharacter: {type: String, required: false},
    year: {type: Number, required: true},
    genre: {type: String, required: false},
    imdbPosition: {type: Number, required: false},
    awards: {type: String, required: false},
    duration: {type: String, required: true},
    rating: {type: String, required: true},
    posterUrl: {type: String, required: true},
    platformLink: {type: String, required: false}
});

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie;
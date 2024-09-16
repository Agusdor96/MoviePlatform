const mongoose = require("mongoose");
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {type: String, required: true},
    director: {type: String, required: true},
    year: {type: Number, required: true},
    duration: {type: String, required: true},
    genre: {type: String, required: true},
    rate: {type: String, required: true},
    poster: {type: String, required: true},
    background: {type: String, required: true}
});


const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie;
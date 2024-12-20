const mongoose = require("mongoose");
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {type: String, required: true, unique: true},
    director: {type: String, required: true}, 
    mainCharacter: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    imdbPosition: {type: Number, required: false},
    awards: {type: String, required: false},
    duration: {type: String, required: true},
    rating: {type: String, required: true},
    posterUrl: {type: String, required: true},
    platformLink: {type: String, required: false}
});
movieSchema.index({ title: 1, director: 1 }, { unique: true });
movieSchema.index({ title: 'text', director: 'text', mainCharacter: 'text' });

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie;
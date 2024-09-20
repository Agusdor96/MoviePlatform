const movieService = require("../services/movieService");
const catchAsync = require("../utils/catchAsync");

const getAllMovies = async (req, res) => {
    const movies = await movieService.getMovies(); 
        res.status(200).json(movies)};
        

const createMovieController = async (req, res) => {
    const {title, director, duration, rate, year, poster, genre, background} = req.body;
    const newMovie = await movieService.createMovieService({title, director, duration, rate, year, poster, genre, background});
        res.status(201).json(newMovie)};
        
    
const deleteMovieService = async (req, res) => {
    const { title } = req.params; 
    const deletedMovie = await movieService.deleteMovieService(title);
        res.status(200).json(deletedMovie)};
        

module.exports = {
    getAllMovies: catchAsync(getAllMovies),
    createMovieController: catchAsync(createMovieController),
    deleteMovieService: catchAsync(deleteMovieService),
};

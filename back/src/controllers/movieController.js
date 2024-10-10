const MovieService = require("../services/movieService.js");
const catchAsync = require("../utils/catchAsync");
const ScrapService = require("../services/scrap.service.js");


const scrapService = new ScrapService()
const movieService = new MovieService()

const getAllMovies = async (req, res) => {
    const movies = await movieService.getMovies() 
    res.status(200).json(movies)
}
        
const createMovieController = async (req, res) => {
    const {title, director, duration, rate, year, poster, genre, background} = req.body;
    const newMovie = await movieService.createMovieService({title, director, duration, rate, year, poster, genre, background});
    res.status(201).json(newMovie)
}

const deleteMovieService = async (req, res) => {
    const { title } = req.params; 
    const deletedMovie = await movieService.deleteMovieService(title);
    res.status(200).json(deletedMovie)
}

const insertMovieData = async (req, res) => {
  const moviesData = await scrapService.readGoogleSheet(startRow);
  const response = await movieService.insertMoviesIntoMongo(moviesData)
  res.status(200).send(`${response.length} documentos fueron insertados`);
}

module.exports = {
    getAllMovies: catchAsync(getAllMovies),
    createMovieController: catchAsync(createMovieController),
    deleteMovieService: catchAsync(deleteMovieService),
    insertMovieData: catchAsync(insertMovieData)
};

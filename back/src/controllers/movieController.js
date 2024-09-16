//en este modulo van a estar las funciones que establecen la LOGICA (de las solicitudes) de cada una de las rutas
//¿que hay que hacer cuando recibo una solicitud a /users?
//El controlador sera quien indica que es lo que hay que hacer cuando se reciba la solicitud


// recibe la solicitud de GET /users => 
// 1)vamos a ir a la base de datos a pedir la informacion de los usuarios
// 2) y responder al cliente con la informacion obtenida.

//¿ va a ser el controlador el que va a la base de datos a pedir la info?
//NO, el controlador dice QUE hacer pero NO lo VA a hacer.

// Las funciones que se van a encargar de hacer lo que el controlador dice, son los servicios o funciones de servicio
//El controlador es como un director tecnico, no sale a la cancha.

// 4 Le responde al cliente con un status 200 y un mensajito

// const { findOneAndDelete } = require("../models/Movie");
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

//     async function getMoviesService (req, res){
//             const {title, director, duration, rate, year, poster, genre} = req.body;

//             const newMovie = await createMov({title, director, duration, rate, year, poster, genre});
//             res.status(201).json(newMovie);
// }

    // async function getMovieByTitle(req, res){
    //     const {title} = req.body;
    //     const movie = getMovieByTitle(title);
    // res.status(200).json(movie);
    // }


// async function getMovieById(req, res){
//     const {id} = req.params; 
//     const movie = await getMovieById(id);
//     res.status(200).json(movie)
// }

// module.exports = {getAllMovies, getMoviesService};


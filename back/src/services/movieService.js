const axios = require("axios")
const Movie = require("../models/Movie")

// Aca voy a tener una funcion
//Esta se comunica con la base de datos para pedir la info de los usuarios y
// darle el formato adecuado.
// Funcion que me da datos
//TODAS SON OPERACIONES ASINCRONAS
//En el 99% estas funciones seran del tipo async. Entonces, esta funcion me retorna una promesa que al resolverse me da el valor
//de la informacion
//Mi controller sera async tambien 

module.exports = {
    getMovies : async () => {       
      try{
          const movie = await Movie.find()            
          return movie;
      }catch (err) {
        console.log(err)
      };
    },

    createMovieService : async (movie) =>{
      try{
        const newMovie = await Movie.create(movie); 
        return newMovie;
      }catch (err) {
        console.log(err);   
      }
    },

    deleteMovieService: async (title) => {
      try {
              const deletedMovie = await Movie.findOneAndDelete({ title });
              return deletedMovie;
      } catch (err) {
        console.log(err)
      };
    }
};







// async function getMovieByTitle(title){
//     const movie = await Movie.findOne(title);
//     return movie;

// }

// async function getMovieById(id){
//     const movie = await Movie.findById(id);
//     return movie;

// }

// module.exports = {getMovies, createMov}


// async function getMovies(){
//     try{
//         const api = await axios.get("https://students-api.up.railway.app/movies")
//         return api.data
//     }
//     catch(error){
//     console.log("error en el servicio")
//     }
// }
//  module.exports = getMovies

//con objeto literal
// module.exports = {
//     getMovies : async () => {

//        const movies = [
//    {
//    "title": "Guardians of the Galaxy Vol. 2",
//    "year": 2017,
//    "director": "James Gunn",
//    "duration": "2h 16min",
//    "genre": [
//    "Action",
//    "Adventure",
//    "Comedy"
//    ],
//    "rate": 7.7,
//    "poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
//    },
//    {
//    "title": "Star Wars: Episode IV - A New Hope",
//    "year": 1977,
//    "director": "George Lucas",
//    "duration": "2h 1min",
//    "genre": [
//    "Action",
//    "Adventure",
//    "Fantasy",
//    "Sci-Fi"
//    ],
//    "rate": 8.7,
//    "poster": "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
//    },
//    {
//    "title": "The Lord of the Rings: The Fellowship of the Ring",
//    "year": 2001,
//    "director": "Peter Jackson",
//    "duration": "2h 58min",
//    "genre": [
//    "Action",
//    "Adventure",
//    "Drama",
//    "Fantasy"
//    ],
//    "rate": 8.8,
//    "poster": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
//    }
//    ]
// return movies;
//          }
// }



//con otra sintaxis
// const getMovies = async()=>{
//     try{      
//         const api = await axios.get("https://students-api.up.railway.app/movies");

//         return api.data;
//     } catch (err) {
//         console.log("ERROR en la peticion GET");
//     }
// }

// module.exports = getMovies;






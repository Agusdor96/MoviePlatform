const Movie = require("../models/Movie")

class MovieService {
  async getMovies(page, limit) {
    const offset = page * limit

    try {
      const movies = await Movie.find()
        .sort({ 
          year: -1,
          imdbPosition: 1,
          rating: -1,         
          duration: -1        
        })
        .skip(offset)
        .limit(limit);
      return movies;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createMovie(movie) {
    try {
      const newMovie = await Movie.create(movie);
      return newMovie;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteMovie(title) {
    try {
      const deletedMovie = await Movie.findOneAndDelete({ title });
      return deletedMovie;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async insertMoviesIntoMongo(moviesData){
    const dataToInsert = moviesData.map(movie => ({
      title: movie[0],
      director: movie[1],
      mainCharacter: movie[2],
      year: !isNaN(movie[3]) ? Number(movie[3]) : null,
      genre: movie[4],
      imdbPosition: !isNaN(movie[5]) ? Number(movie[5]) : null,
      awards: movie[6],
      duration: movie[7],
      rating: movie[8],
      posterUrl: movie[9],
      platformLink: movie[10],
    }));

    const insertedMovies = [];
    for (const movieData of dataToInsert) {
      try {
        const movie = new Movie(movieData);
        await movie.save();
        insertedMovies.push(movieData);
      } catch (error) {
        if (error.code === 11000) {
          console.warn(`La película '${movieData.title}' ya existe. Ignorando...`);
        } else {
          console.error('Error al guardar la película:', error);
        }
      }
    }
    return insertedMovies;
  }
}

module.exports = MovieService;




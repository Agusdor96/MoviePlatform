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

  async getFilteredMovies(page, limit, filters) {
    const offset = page * limit;
    const query = {};

    if (filters.search) {
      const exactMatch = await Movie.find({ title: new RegExp(`^${filters.search}$`, 'i') });
      if (exactMatch.length > 0) {
          return exactMatch;
      } else {
          query.title = new RegExp(filters.search, 'i');
      }
    }

    if (filters.director) query.director = new RegExp(filters.director, 'i');
    if (filters.mainCharacter) query.mainCharacter = new RegExp(filters.mainCharacter, 'i');
    if (filters.year) query.year = Number(filters.year);
    if (filters.genre) query.genre = new RegExp(filters.genre, 'i');
    if (filters.imdbPosition) query.imdbPosition = Number(filters.imdbPosition);
    if (filters.duration) query.duration = Number(filters.duration);
    if (filters.rating) query.rating = Number(filters.rating);

    const sortOptions = {};
    const allowedSortFields = ['imdbPosition', 'rating', 'duration'];

    if (filters.sortBy && filters.order) {
      const orderField = filters.sortBy.trim();
      const orderType = filters.order === 'asc' ? 1 : -1;

      if (allowedSortFields.includes(orderField)) {
          sortOptions[orderField] = orderType;
      }
    } else {
      sortOptions.year = 1
    }

    try {
        const movies = await Movie.find(query)
            .sort(sortOptions)
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

  async updateMovie(id, data){
    const movie = await Movie.updateOne({ _id: id }, { $set: data });
    if(movie) return movie
  }

  async deleteMovie(id) {
    try {
      const deletedMovie = await Movie.findOneAndDelete({ _id: id });
      return deletedMovie;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async checkMovieExistance(data) {
    return await Movie.findOne( data );
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




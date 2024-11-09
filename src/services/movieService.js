const Movie = require("../models/Movie");
const Exceptions = require("../utils/customExceptions");
const { deleteFile } = require("../helpers/file.helper.js")

class MovieService {
  async getMovies(page, limit) {
    const offset = page * limit

    const totalMovies = await Movie.countDocuments();

    const movies = await Movie.find()
      .sort({ 
        year: 1,
        imdbPosition: -1,
        rating: -1,         
        duration: -1        
      }).skip(offset).limit(limit);

    return {
      movies,
      totalMovies
    }
  }

  // async getFilteredMovies(page, limit, filters) {
  //   const offset = page * limit;
  //   const query = {};

    
  //   if (filters.search) {
  //     const exactMatch = await Movie.find({ title: new RegExp(`^${filters.search}$`, 'i') });
  //     if (exactMatch.length > 0) {
  //         return exactMatch;
  //     } else {
  //         query.title = new RegExp(filters.search, 'i');
  //     }
  //   }

  //   if (filters.director) query.director = new RegExp(filters.director, 'i');
  //   if (filters.mainCharacter) query.mainCharacter = new RegExp(filters.mainCharacter, 'i');
  //   if (filters.year) query.year = Number(filters.year);
  //   if (filters.genre) query.genre = new RegExp(filters.genre, 'i');
  //   if (filters.imdbPosition) query.imdbPosition = Number(filters.imdbPosition);
  //   if (filters.duration) query.duration = Number(filters.duration);
  //   if (filters.rating) query.rating = Number(filters.rating);

  //   const sortOptions = {};
  //   const allowedSortFields = ['imdbPosition', 'rating', 'duration'];

  //   if (filters.sortBy && filters.order) {
  //     const orderField = filters.sortBy.trim();
  //     const orderType = filters.order === 'asc' ? 1 : -1;

  //     if (allowedSortFields.includes(orderField)) {
  //         sortOptions[orderField] = orderType;
  //     }
  //   } else {
  //     sortOptions.year = 1
  //   }

  //   try {
  //       const totalMovies = await Movie.countDocuments();
  //       const movies = await Movie.find(query)
  //           .sort(sortOptions)
  //           .skip(offset)
  //           .limit(limit);
  //       return {
  //         movies,
  //         totalMovies
  //       }
  //   } catch (err) {
  //       console.error(err);
  //       throw err;
  //   }
  // }

  async getFilteredMovies(page, limit, filters) {
    const offset = page * limit;
    const query = {};

    // Filtro de búsqueda principal
    if (filters.search) {
        const searchRegex = new RegExp(filters.search, 'i');
        query.$or = [
            { title: searchRegex },
            { director: searchRegex },
            { mainCharacter: searchRegex },
            { genre: searchRegex }
        ];
    }

    // Filtros de ordenamiento
    const sortOptions = {};
    const allowedSortFields = ['year', 'imdbPosition', 'rating', 'duration'];

    if (filters.sortBy && filters.order) {
        const orderField = filters.sortBy.trim();
        const orderType = filters.order === 'asc' ? 1 : -1;

        if (allowedSortFields.includes(orderField)) {
            sortOptions[orderField] = orderType;
        }
    } else {
        // Orden predeterminado por año descendente si no se especifica otro orden
        sortOptions.year = -1;
    }
        // Obtener total de películas que coinciden con la búsqueda principal
      const totalMovies = await Movie.countDocuments(query);

      // Obtener películas filtradas, ordenadas y paginadas
      const movies = await Movie.find(query)
          .sort(sortOptions)
          .skip(offset)
          .limit(limit);

      return {
          movies,
          totalMovies
      };
  }

  async createMovie(movie) { 
      const newMovie = await Movie.create(movie);
      return newMovie;
  }

  async updateMovie(data){
    const {id: movieId, filteredData = {}, ...additionalData} = data
    const updateData = { ...filteredData, ...additionalData };
    
    if(updateData.posterUrl){
      const movie = await this.getMovieById({_id:movieId})
      console.log(await deleteFile(movie.posterUrl))
    }

    const response = await Movie.updateOne({ _id: movieId }, { $set: updateData});
    if(response.acknowledged !== true) throw new Exceptions.InternalServerError("Error en el servicio en la actualizacion de la pelicula")
    
    return response
    }

  async deleteMovie(id) {
      const deletedMovie = await Movie.findOneAndDelete({ _id: id });
      return deletedMovie;
  }

  async getMovieById(data) {
    const movie = await Movie.findOne( data );

    if(!movie || !movie.platformLink) throw Exceptions.Conflict("Error al obtener link de cineb.rs") 
    return movie
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




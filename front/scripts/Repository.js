const MovieCard = require("./MovieCard");

class Repository{
    constructor(){
        this.movieCard = [];
        this.id = 1
    }
getAllMovies() {
    return this.movieCard;
}
//no entiendo porque se llama al id desde la instancia y no se pasa como parametro de la funcion
createMovie({title, year, director, duration, genre, rate, poster, background}){
   const newMovie = new MovieCard(this.id, title, year, director, duration, genre, rate, poster, background);
    this.id ++

    switch(newMovie.id){
        case 1:
            newMovie.background = "https://image.tmdb.org/t/p/original/ndXsushIwLMxBlxFgOsLnUxC96F.jpg"
            break;
        case 2:
            newMovie.background = "https://image.tmdb.org/t/p/original/jBFxXKCrViA88hhO59fDx0Av4P.jpg"
            break;
        case 3: 
            newMovie.background = "https://image.tmdb.org/t/p/original/3wiSgRRKokK660O75vJAGmk7FWF.jpg"
            break;
    }

   this.movieCard.push(newMovie);
}
}

module.exports = Repository;
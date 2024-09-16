class MovieCard{ 
    constructor (id, title, year, director, duration, genre, rate, poster, background){
        this.id = id;
        this.title = title;
        this.year = year;
        this.director = director;
        this.duration = duration;
        this.genre = genre;
        this.rate = rate;
        this.poster = poster
        this.background = background;
    }
}

module.exports = MovieCard;
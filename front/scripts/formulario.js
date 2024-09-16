
const axios = require("axios");

function formPage () {

    const movieTitle = document.querySelector("#movieTitle");
    const movieDirector = document.querySelector("#movieDirector");
    const movideDuration = document.querySelector("#movieDuration");
    const movieGenre = document.querySelector("#movieGenre");
    const movieRate = document.querySelector("#movieRate");
    const movieYear = document.querySelector("#movieYear");
    const movieFlyer = document.querySelector("#movieFlyer");
    const movieBackground = document.querySelector("#movieBackground");
    const addButton = document.getElementById("add-button");
    const resetButton = document.getElementById("reset-button");
    const resetForm = document.getElementById("formEntero");


addButton.addEventListener(
    "click",
    // funcion que se va a ejecutar cuando escuche el click
    async () => {
        await handler()
    }
);

resetButton.addEventListener("click", () => {
    resetForm.reset();
});


async function handler(){
    const titleValue = movieTitle.value;
    const directorValue = movieDirector.value;
    const durationValue = movideDuration.value;
    const genreValue = movieGenre.value;
    const rateValue = movieRate.value;
    const yearValue = movieYear.value;
    const flyerValue = movieFlyer.value;
    const backgroundValue = movieBackground.value;
   
   if(titleValue && directorValue && durationValue && genreValue && rateValue && yearValue && flyerValue && backgroundValue) {
    
    await axios.post("http://localhost:3000/movies", {
        "title":titleValue,
        "director": directorValue,
        "year": yearValue,
        "duration":durationValue,
        "genre": genreValue,
        "rate": rateValue,
        "poster": flyerValue,
        "background": backgroundValue,
      });
      return alert("pelicula cargada");   

        } else {
            return alert("faltan datos");
        }
      }; 
    };


module.exports = formPage;


    // Esto crea la pelicula en mi front-end, no en el servidor.
    
    // if(titleValue && directorValue && durationValue && genreValue && rateValue && yearValue && flyerValue) {

    //     repository.createMovie({
    //         title: titleValue,
    //         director: directorValue,
    //         duration: durationValue,
    //         genre: genreValue,
    //         rate: rateValue,
    //         year: yearValue,
    //         poster: flyerValue
    //     })
    
    // fetchMovies ()
    
    // } else {
    //     return alert("faltan datos");
    // }



//Yo requiero al bundle en el index.html y tambien en el formulario.html para que se compilen los archivos js de cada una.
//En tonces que va a pasar? 
//Es probable que si yo requiero de algun elemento html que esta presente en el formulario pero no en el index 
//pero mi script de de javascript lo esta yendo a buscar me voy a encontrar con un problema. 
//Si estoy en el html del formulario pero mi script va a buscar el contenedor de tarjetas, no lo va a
// encontar y va a haber algun problema 
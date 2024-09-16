const axios = require("axios");
const cardHtml = require("./cardHtml");
const Repository = require("./Repository");
const formPage = require("./formulario");


const repository = new Repository();
const contenedorPeliculas = document.getElementById("contenedor");
const movieTitle = document.querySelector("#movieTitle");


const fetchMovies = async () => {
  try {
    const api = await axios.get("http://localhost:3000/movies"); 

    console.log("Datos recibidos de la API:", api.data);

    api.data.forEach((obj) => {
        repository.createMovie(obj);
      } 
    );
    const arregloPelis = repository.getAllMovies();
    contenedorPeliculas.innerHTML = "";

    arregloPelis.forEach((movie) => {
      
    contenedorPeliculas.appendChild(cardHtml(movie));
    });

  } catch (err) {
      console.log("Tuvimos un error estamos en el catch del front, carga con fakeData");
  } 
};

function indexPage () {

  if (movieTitle) {
    formPage()
  } else if (contenedorPeliculas) {
    fetchMovies()
  }
};

indexPage();










// con promesas 
// const promise = axios.get("http://localhost:3000/movies");

// promise

// .then((res) =>{
//   res.data.forEach((obj) => {
//     repository.createMovie(obj);
//   });

//   const arregloPelis = repository.getAllMovies();
//   contenedorPeliculas.innerHTML = "";

//   arregloPelis.forEach((movie) => {
//     contenedorPeliculas.appendChild(cardHtml(movie));
//   });
// })
// .catch((err)=>{
// console.log("algo salio mal");
// })
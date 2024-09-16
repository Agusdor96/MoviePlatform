// Aca vamos a definir las rutas a trasves de las cuales nos podemos comunicar
//las rutas van a recibir las solicitudes   

//Ej: tengo definida la solicitud GET a /movies
// El "¿que?" va a hacer la aplicacion cuando esa solicitud se reciba lo va a definir el controlador.

const {Router} = require ("express")
const movieController = require("../controllers/movieController");


const indexRouter = Router(); //instanciamos al enrutador
indexRouter.get("/movies", movieController.getAllMovies);
indexRouter.post("/movies", movieController.createMovieController);
indexRouter.delete("/movies/:title", movieController.deleteMovieService);


module.exports = indexRouter;
//creando un endpoint para una solicitud de tipo get y post a ("/movies")
// y cuando esa solicitud se reciba se ejecuta la funcion movieController 


// indexRouter.get("/movies/:id", getMovieById);



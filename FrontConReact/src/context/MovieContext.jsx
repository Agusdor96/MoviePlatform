import { createContext, useState, useContext } from "react";
import axios from "axios"

const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
  
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    const addMovie = async (newMovie) => {
      try {
        const response = await axios.post("http://localhost:3000/movies", newMovie);
        setMovies([...movies, response.data]);
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    };
  
    const deleteMovie = async (title) => {
      try {
        await axios.delete(`http://localhost:3000/movie/${title}`);
        setMovies(movies.filter((movie) => movie.title !== title));
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    };
  
    return (
      <MovieContext.Provider value={{ movies, fetchMovies, addMovie, deleteMovie }}>
        {children}
      </MovieContext.Provider>
    );
  };
  
  // Hook para acceder al contexto
  export const useMovies = () => useContext(MovieContext);
  
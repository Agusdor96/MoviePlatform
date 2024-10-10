import { useEffect } from "react";
import { useMovies } from "../context/MovieContext";

const Home = () => {
  const { movies, fetchMovies } = useMovies();

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Top 10 Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
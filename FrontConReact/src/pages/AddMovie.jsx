import { useState } from "react";
import { useMovies } from "../context/MovieContext";

const AddMovie = () => {
  const { addMovie } = useMovies();
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(newMovie);
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newMovie.title}
          onChange={handleChange}
          placeholder="Movie Title"
        />
        <input
          type="text"
          name="description"
          value={newMovie.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
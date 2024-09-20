import { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const { addMovie } = useMovies();
  const navigate = useNavigate();
  
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    year: '',
    duration: '',
    genre: '',
    rate: '',
    poster: '',
    background: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMovie(movieData);
    navigate('/'); // Redirige a la página principal después de agregar la película
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <input type="text" name="director" placeholder="Director" onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year" onChange={handleChange} required />
      <input type="text" name="duration" placeholder="Duration" onChange={handleChange} required />
      <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
      <input type="number" name="rate" placeholder="Rate" onChange={handleChange} required />
      <input type="text" name="poster" placeholder="Poster URL" onChange={handleChange} required />
      <input type="text" name="background" placeholder="Background URL" onChange={handleChange} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
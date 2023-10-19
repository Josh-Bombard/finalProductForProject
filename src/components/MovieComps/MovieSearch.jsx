
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function MovieSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const OMDB_API_KEY = '8a2962f6';

  const searchMovies = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
      setSearchResults(response.data.Search || []);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
    <div className='text-center'>
      <h2>Movie Search</h2>
      <input
        className='query'
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br></br>
      <br></br>
      <div className="row">
  {searchResults.map((movie) => (
    <div key={movie.imdbID} className="col-md-4 mb-4">
      <div className="card">
        <img src={movie.Poster} className="card-img-top" alt={`${movie.Title} Poster`} />
        <div className="card-body">
          <h5 className="card-title">{movie.Title}</h5>
          <p className="card-text">{movie.Year}</p>
          <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">Details</Link>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default MovieSearch;

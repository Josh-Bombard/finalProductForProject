// MovieDetailsFetcher.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetailsFetcher({ imdbID, children }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch movie details using the provided IMDb ID
    axios.get(`http://www.omdbapi.com/?i=${imdbID}`)
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [imdbID]);

  return (
    <div>
      {React.cloneElement(children, { movieDetails })}
    </div>
  );
}

export default MovieDetailsFetcher;

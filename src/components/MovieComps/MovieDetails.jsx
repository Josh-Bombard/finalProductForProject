import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../UserComps/UserContext';
import ReviewForm from '../ReviewComps/ReviewForm';
import { USERS_API } from '../../api\'s/USERS_API';
import { REVIEWS_API } from '../../api\'s/REVIEWS_API';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { imdbID } = useParams();
  const {user} = useUser();
  const [reviews, setReviews] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);

if (user) {
  console.log(`Logged in User in MovieDetails: ${user.name} ${user.id}`)
} else {
  console.log(`No users logged in`)
}


const handleReviewAdded = (newReview) => {
  setReviews([...reviews, newReview]);
};

const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=8a2962f6`);
    setMovieDetails(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

useEffect(() => {

  fetchMovieDetails();
}, [imdbID, user]);

useEffect(() => {
  const fetchMovieReviews = async () => {
    try {
      const response = await axios.get(`${REVIEWS_API}`);
      setMovieReviews(response.data);
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
    }
  };

  if (imdbID) {
    fetchMovieReviews();
  }
}, [imdbID]);


  return (
    <div className='container text-center'>
      <h2>Movie Details</h2>
      {movieDetails ? (
        <div>
          <h3>{movieDetails.Title} ({movieDetails.Year})</h3>
          <img src={movieDetails.Poster}/>
          <p>{movieDetails.Plot}</p>
          <p>Director: {movieDetails.Director}</p>
          <p>Actors: {movieDetails.Actors}</p>
          {/* Add more movie details as needed */}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
      
        <ReviewForm
        onReviewAdded={handleReviewAdded}
        movieTitle={movieDetails?.Title}
        imdbID={imdbID}
        movieReviews={movieReviews}
        user={user}
        fetchDetails={fetchMovieDetails}
      />
      
      
    </div>
  );
}

export default MovieDetails;

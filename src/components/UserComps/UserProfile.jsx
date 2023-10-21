import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetchUserProfile from './fetchUserProfile';
import axios from 'axios';
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { REVIEWS_API } from '../../api\'s/REVIEWS_API';


function UserProfile({ reviews, onDeleteReviewCallback }) {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userMovieDetails, setUserMovieDetails] = useState();
  const [loading, setLoading] = useState(true);

  console.log('Reviews for user: ', reviews)


  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId).then((data) => {
        setUserProfile(data);

        if (reviews) {
          const fetchMovieDetailsForReviews = async () => {
            for (const review of reviews) {
              try {
                const response = await axios.get(
                  `http://www.omdbapi.com/?i=${review.imdbID}&apikey=8a2962f6`
                );
                const userMovieDetails = response.data;
                setUserMovieDetails((prevDetails) => ({
                  ...prevDetails,
                  [review.imdbID]: userMovieDetails,
                }));
              } catch (error) {
                console.error('Error fetching movie details:', error);
              }
            }
            setLoading(false);
          };

          fetchMovieDetailsForReviews();
        } else {
          setLoading(false);
        }
      });
    }
  }, [userId, reviews]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const { user } = userProfile;

  const handleDeleteReview = (review) => {
    console.log('Deleting review:', review);
    axios.delete(REVIEWS_API + `/${review.id}`)
      .then(() => {
        onDeleteReviewCallback(review.id);
        console.log('Review deleted:', review.id);
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };




  return (
    <div className='container text-center'>
      <Card>
      <CardBody>
        <CardTitle className="profile-header">
          <span className="text-user">User</span>
          <span className="text-profile">Profile</span>
        </CardTitle>
        <div className="user-profile-holder">
          <CardTitle tag="h3" className="user-name">
            {user.name}'s Profile
          </CardTitle>
          <CardText className="favorite-movie">
            Favorite Movie: {user.favoriteMovie}
          </CardText>
          <CardText className="review-favorite-movie">
            Review of Favorite Movie: {user.favMovieReview}
          </CardText>
        </div>
      </CardBody>
    </Card>
      
      <h3 className="reviewed-movies-header">Reviewed Movies</h3>
      <div className="movie-card-container">
        {reviews
          ? reviews
            .filter((review) => review.userId === user.id)
            .map((review, index) => (
<Card key={index} className="movie-card">
  {userMovieDetails[review.imdbID] && (
    <CardBody>
      <CardTitle className="movie-title">
        <Link to={`/movie/${review.imdbID}`} className="user-review-link">
          {userMovieDetails[review.imdbID].Title} ({userMovieDetails[review.imdbID].Year})
        </Link>
      </CardTitle>
      <CardImg
        src={userMovieDetails[review.imdbID].Poster}
        alt={userMovieDetails[review.imdbID].Title}
        className="movie-poster"
      />
      <CardText className="review-content">{review.reviewContent}</CardText>
    </CardBody>
  )}
  <Button onClick={() => handleDeleteReview(review)} className="delete-button">Delete</Button>
</Card>
            ))
          : <h1 className='no-review'>No reviewed movies yet</h1>}
      </div>
    </div>
  );
}

export default UserProfile;


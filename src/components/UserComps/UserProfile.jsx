import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchUserProfile from './fetchUserProfile'; // Import your fetchUserProfile function
import ReviewStatus from '../ReviewComps/ReviewStatus';


function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  
  useEffect(() => {
    // Fetch user data and reviewed movies when the component mounts
    fetchUserProfile(userId)
      .then((data) => {
        console.log("Fetched data:", data);
        setUserProfile(data);
      });
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>; // Add loading indicator
  }

  const { user, movies } = userProfile;

  console.log(`User logged in: ${user.name}`)

  return (
    <div className='container text-center'>
      {/* <ReviewForm userId={user.id} /> */}
      <h2>User Profile</h2>
        <div>
          
        </div>
     
      <h3>{user.name}'s Profile</h3>
      <p>Favorite Movie: {user.favoriteMovie}</p>
      <p>Review of Favorite Movie: {user.favMovieReview}</p>

      <h3>Reviewed Movies:</h3>
      <ul>
        {/* {user.reviewedMovies.map((review, index) => (
          <li key={index}>
            <h5>Movie: {review.movieName}</h5>
            <p>Review: {review.reviewContent}</p>
          </li>
        ))} */}
      </ul>
    </div>
   
  );
}

export default UserProfile;

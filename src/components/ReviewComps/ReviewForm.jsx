import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserComps/UserContext';
import { REVIEWS_API } from '../../api\'s/REVIEWS_API';

function ReviewForm({ onReviewAdded, movieTitle, imdbID, movieReviews, fetchDetails }) {
  const {user} = useUser();
  const [reviewContent, setReviewContent] = useState({
    movieTitle: '',
    imdbID: '',
    review: ''
  });

  console.log(movieTitle, imdbID);
  console.log(user)
  console.log(movieReviews)


  const handleReviewSubmit = async () => {
    try {
      // Create an object with user and review data
      const reviewData = {
        name: user.name,
        userId: user.id,
        imdbID,
        movieTitle,
        reviewContent: reviewContent.review // Use the review content from state
      };

      // Make an API call to add the review
      const response = await axios.post(`${REVIEWS_API}`, reviewData);

      // Assuming the API returns the added review data
      const newReview = response.data;

      // Update the user's review list by calling the onReviewAdded function
      onReviewAdded(newReview);

      // Clear the review content
      setReviewContent({
        movieTitle: '',
        imdbID: '',
        review: ''
      });
      fetchDetails();
    } catch (error) {
      console.error('Error adding review:', error);
      console.log(error.response.data);
    }
  };

  return (
    
    <div>
      <div>
        <h3>Reviews for {movieTitle}</h3>
        {movieReviews.map((review, index) =>
          review.imdbID === imdbID ? (
            <div key={index} className="review-section">
              <strong>Reviewer:</strong>
              <p>{review.name}</p>
              <strong>Review:</strong>
              <p>{review.reviewContent}</p>
            </div>
          ) : null
        )}
      </div>
{user && (
  <div>
    <h3>Leave a Review</h3>
    <label>
      Review:
      <textarea
        value={reviewContent.review}
        onChange={(e) => setReviewContent({ ...reviewContent, review: e.target.value })}
      />
    </label>
    <br />
    <button onClick={handleReviewSubmit}>Submit Review</button>
  </div>
)}
    </div>
  );
}

export default ReviewForm;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { REVIEWS_API } from '../../api\'s/REVIEWS_API';

function ReviewStatus({ userid, reviews }) {







  return (
    <>
      {reviews
        ? reviews
          .filter((review) => review.userId === userid) // Filter reviews by matching userID
          .map((review, index) => (
            <span key={index}>
              <Link to={`/movie/${review.imdbID}`} className="review-link">
                {review.movieTitle}
              </Link>
              {index < reviews.length - 1 && ', '}
            </span>
          ))
        : <span>No reviewed movies yet</span>}
    </>
  )
}

export default ReviewStatus;